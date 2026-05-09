import { sanitizeMeasurementText } from './clinicalFormatters.js';

const GENERIC_PREANSWER_PHRASES = [
  /spot bilgi[^.?!]*(?:[.?!]|$)/giu,
  /tus işareti[^.?!]*(?:[.?!]|$)/giu,
  /sınav notu[^.?!]*(?:[.?!]|$)/giu,
  /kritik ipucu[^.?!]*(?:[.?!]|$)/giu,
  /ayırt ettirici ipuçları?\s*[:：-]?/giu,
  /risk bağlamı\s*[:：-]?/giu,
  /karar verdirici ipucu\s*[:：-]?/giu,
  /destekleyici kanıt\s*[:：-]?/giu,
  /klinik gerekçe\s*[:：-]?/giu,
  /kanıt zinciri\s*[:：-]?/giu,
  /neden doğru\s*[:：-]?/giu,
  /neden yanlış\s*[:：-]?/giu,
];

const GENERIC_INVESTIGATION_SENTENCES = [
  /sonuç[, ]+öykü ve muayene bulgularıyla birlikte değerlendirilir/iu,
  /klinik bağlamda değerlendirilir/iu,
  /objektif karar verisi/iu,
  /beklenen ana ipuçları/iu,
  /tanıyı destekler/iu,
  /tanısını destekler/iu,
  /tanısını doğrular/iu,
  /ile uyumludur/iu,
];

const TITLE_FALLBACK_BY_TYPE = {
  diagnosis: 'Klinik olgu yorumu',
  treatment: 'İlk yaklaşım kararı',
  test: 'Tetkik verisi yorumu',
  mechanism: 'Mekanizma odaklı TUS sorusu',
  spot: 'TUS spot karar sorusu',
};

function asText(value = '') {
  return sanitizeMeasurementText(String(value || ''))
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

function normalizeComparable(value = '') {
  return asText(value)
    .toLocaleLowerCase('tr')
    .replace(/[.,;:!?()[\]{}"'`´]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sentenceCase(value = '') {
  const text = asText(value);
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
}

function ensureSentence(value = '') {
  const text = sentenceCase(value).replace(/[\s,;:]+$/u, '');
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function removeCorrectAnswer(text = '', correct = '') {
  const cleaned = asText(text);
  const correctText = asText(correct);
  if (!cleaned || !correctText || correctText.length < 4) return cleaned;
  const escaped = correctText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return cleaned.replace(new RegExp(escaped, 'giu'), 'etken');
}

function stripPreAnswerTeaching(value = '', correct = '') {
  let text = removeCorrectAnswer(value, correct);
  GENERIC_PREANSWER_PHRASES.forEach((pattern) => {
    text = text.replace(pattern, ' ');
  });
  text = text
    .replace(/\bdoğru yanıta götüren\b[^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\bbu nedenle doğru yanıt\b[^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\ben olası tanı .*?dır\b/giu, 'en olası seçenek değerlendirilmelidir')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

function addUniqueSentence(sentences, sentence, correct = '') {
  const clean = stripPreAnswerTeaching(ensureSentence(sentence), correct);
  if (!clean || clean.length < 8) return sentences;
  const key = normalizeComparable(clean);
  const duplicate = sentences.some((item) => {
    const itemKey = normalizeComparable(item);
    return itemKey.includes(key) || key.includes(itemKey);
  });
  if (!duplicate) sentences.push(clean);
  return sentences;
}

function formatVitalLabel(label = '') {
  const key = String(label || '').trim();
  if (key === 'TA') return 'kan basıncı';
  if (/spo/i.test(key)) return 'SpO₂';
  return key.toLocaleLowerCase('tr');
}

function isMeaningfulVital(value = '') {
  const text = normalizeComparable(value);
  return Boolean(text) && !/^(stabil|normal|normal aralikta|normal aralıkta|afebril|yok|korunmus|korunmuş)$/u.test(text);
}

function buildVitalsSentence(vitals = {}) {
  const entries = Object.entries(vitals || {})
    .filter(([, value]) => isMeaningfulVital(value))
    .map(([label, value]) => `${formatVitalLabel(label)} ${asText(value)}`);
  if (!entries.length) return '';
  return `Vital bulgularda ${entries.join(', ')} saptanıyor`;
}

function buildExamSentence(exam = []) {
  const cleanExam = (Array.isArray(exam) ? exam : [])
    .map(asText)
    .filter((item) => item && !GENERIC_INVESTIGATION_SENTENCES.some((pattern) => pattern.test(item)))
    .slice(0, 3);
  if (!cleanExam.length) return '';
  return `Fizik muayenede ${cleanExam.join(', ')} saptanıyor`;
}

function rowToInlineText(row = []) {
  if (!Array.isArray(row)) return '';
  const [name, result, reference, status] = row.map(asText);
  if (!name || !result) return '';
  const refText = reference ? `, referans ${reference}` : '';
  const statusText = status && !/normal|nötr|notr/i.test(status) ? `, ${status.toLocaleLowerCase('tr')}` : '';
  return `${name} ${result}${refText}${statusText}`;
}

function buildInvestigationPart(item = {}, correct = '') {
  const label = asText(item.label || item.name || item.title);
  const rows = Array.isArray(item.rows) ? item.rows.map(rowToInlineText).filter(Boolean).slice(0, 4) : [];
  const findings = Array.isArray(item.findings) ? item.findings.map(asText).filter(Boolean).slice(0, 3) : [];
  const summary = asText(item.summary || item.result || item.interpretation);
  const pieces = rows.length ? rows : findings.length ? findings : [summary].filter(Boolean);
  const cleanPieces = pieces
    .filter((part) => !GENERIC_INVESTIGATION_SENTENCES.some((pattern) => pattern.test(part)))
    .map((part) => stripPreAnswerTeaching(part, correct))
    .filter(Boolean);
  if (!cleanPieces.length) return '';
  const prefix = label && !normalizeComparable(cleanPieces.join(' ')).includes(normalizeComparable(label)) ? `${label}: ` : '';
  return `${prefix}${cleanPieces.join('; ')}`;
}

function buildInvestigationSentence(investigations = [], correct = '') {
  const parts = (Array.isArray(investigations) ? investigations : [])
    .map((item) => buildInvestigationPart(item, correct))
    .filter(Boolean)
    .slice(0, 2);
  if (!parts.length) return '';
  return `Objektif değerlendirmede ${parts.join('; ')} bildiriliyor`;
}

function splitNarrativeParagraphs(value = '') {
  const text = asText(value);
  if (!text) return [];
  const sentences = text.match(/[^.!?]+[.!?]?/g)?.map((item) => item.trim()).filter(Boolean) || [text];
  const paragraphs = [];
  let current = '';

  sentences.forEach((sentence) => {
    const next = current ? `${current} ${ensureSentence(sentence)}` : ensureSentence(sentence);
    if (next.length > 520 && current) {
      paragraphs.push(current);
      current = ensureSentence(sentence);
    } else {
      current = next;
    }
  });
  if (current) paragraphs.push(current);
  return paragraphs.slice(0, 3);
}

export function buildSafeAISpotTitle(question = {}) {
  const correct = question.diagnosis?.correct || question.correctAnswerText || '';
  const originalTitle = asText(question.title || '');
  const comparableOriginalTitle = normalizeComparable(originalTitle);
  const comparableCorrect = normalizeComparable(correct);
  const rawTitle = stripPreAnswerTeaching(originalTitle, correct);
  const comparableTitle = normalizeComparable(rawTitle);
  const type = String(question.questionType || '').toLocaleLowerCase('tr');
  const fallback = TITLE_FALLBACK_BY_TYPE[type] || TITLE_FALLBACK_BY_TYPE.spot;
  if (!originalTitle || originalTitle.length < 6) return fallback;
  if (comparableCorrect && comparableOriginalTitle.includes(comparableCorrect)) return fallback;
  if (!rawTitle || rawTitle.length < 6) return fallback;
  if (/tanisi|tanısı|tedavisi|yönetimi|yonetimi|ilk ilac|ilk ilaç|etkeni$/u.test(comparableTitle)) return fallback;
  return rawTitle.length > 78 ? `${rawTitle.slice(0, 75).trim()}…` : rawTitle;
}

export function buildAISpotContextLine(question = {}) {
  const branch = asText(question.relatedBranch || question.branchName || 'TUS Spot');
  const type = String(question.questionType || '').toLocaleLowerCase('tr');
  if (type === 'test') return `${branch} bağlamında objektif veriyi yorumlama pratiği.`;
  if (type === 'treatment') return `${branch} bağlamında ilk yaklaşım ve yönetim kararı.`;
  if (type === 'mechanism') return `${branch} bağlamında mekanizma ve klinik ilişki sorusu.`;
  if (type === 'diagnosis') return `${branch} bağlamında kısa klinik olgu yorumu.`;
  return `${branch} bağlamında tek köklü TUS spot sorusu.`;
}

export function buildAISpotNarrativeStem(question = {}) {
  const correct = question.diagnosis?.correct || question.correctAnswerText || '';
  const baseSentences = [];
  const base = question.narrativeStem || question.primaryStem || question.stem || question.patientIntro?.historySummary || '';
  splitNarrativeParagraphs(stripPreAnswerTeaching(base, correct)).join(' ').match(/[^.!?]+[.!?]?/g)?.forEach((sentence) => {
    addUniqueSentence(baseSentences, sentence, correct);
  });

  const vitalsSentence = buildVitalsSentence(question.vitals || question.findings?.vitals || {});
  addUniqueSentence(baseSentences, vitalsSentence, correct);

  const examSentence = buildExamSentence(question.exam || question.findings?.exam || []);
  addUniqueSentence(baseSentences, examSentence, correct);

  const investigations = question.investigations || question.findings?.investigations || [];
  const investigationSentence = buildInvestigationSentence(investigations, correct);
  addUniqueSentence(baseSentences, investigationSentence, correct);

  const questionPrompt = stripPreAnswerTeaching(question.question || question.diagnosis?.question || '', correct)
    .replace(/^[Bb]u olguda\s*,?\s*/u, 'Bu olguda ');

  const body = baseSentences.join(' ');
  const prompt = ensureSentence(questionPrompt || 'Bu tablo için en uygun seçenek hangisidir?');
  const bodyComparable = normalizeComparable(body);
  const promptComparable = normalizeComparable(prompt);
  const combined = bodyComparable.includes(promptComparable) ? body : `${body} ${prompt}`;

  return splitNarrativeParagraphs(combined || prompt);
}

export function getAISpotPreviewDiagnostics(question = {}) {
  const paragraphs = buildAISpotNarrativeStem(question);
  const text = paragraphs.join(' ');
  return {
    paragraphCount: paragraphs.length,
    hasLegacyBoxLabels: /profil|başvuru|risk bağlamı|ayırt ettirici ipuçları|kısa klinik öykü özeti/iu.test(text),
    containsCorrectAnswerText: Boolean(question.diagnosis?.correct && normalizeComparable(text).includes(normalizeComparable(question.diagnosis.correct))),
  };
}
