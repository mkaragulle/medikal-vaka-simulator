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
  /hasta özeti\s*[:：-]?/giu,
  /profil\s*[:：-]?/giu,
  /başvuru\s*[:：-]?/giu,
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

const VITAL_LABELS = ['TA', 'Nabız', 'Solunum', 'Ateş', 'SpO₂'];
const VITAL_RELEVANCE_KEYWORDS = /şok|sepsis|septik|anafilaksi|hipotansiyon|hipotansif|taşikardi|taşikardik|bradikardi|hipoksi|hipoksemi|dispne|solunum yetmezliği|ketoasidoz|dka|dehidratasyon|kanama|travma|yenidoğan|neonatal|prematüre|resüsitasyon|hemodinamik|acil|ateş|febril|menenjit|pnömoni|pulmoner emboli/iu;
const OBJECTIVE_LABEL_HINT = /lökosit|lokosit|wbc|crp|pH|ph|hco₃|hco3|laktat|glukoz|glukoz|sodyum|potasyum|kreatinin|troponin|d-dimer|d dimer|platelet|trombosit|hemoglobin|alt|ast|bilirubin|kültür|kultur|oksidaz|dnaz|gram|seroloji|igg|igm|hbsag|anti|pcr|gaz|ultrasonografi|grafi|bt|mr|histoloji|patoloji/iu;

const TITLE_FALLBACK_BY_TYPE = {
  diagnosis: 'Klinik olgu yorumu',
  treatment: 'İlk yaklaşım kararı',
  test: 'Tetkik verisi yorumu',
  mechanism: 'Mekanizma odaklı TUS sorusu',
  spot: 'TUS spot karar sorusu',
};

function baseCleanText(value = '') {
  return sanitizeMeasurementText(String(value || ''))
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .trim();
}

export function normalizeAiNarrativeText(value = '') {
  let text = baseCleanText(value);
  text = text
    .replace(/\b(\d{1,2})\s*g\s*w\s*['’]?\s*(?:da|de|daki|deki)?\b/giu, '$1. gebelik haftasında')
    .replace(/\b(\d{1,2})\s*gw\s*['’]?\s*(?:da|de|daki|deki)?\b/giu, '$1. gebelik haftasında')
    .replace(/\b(\d{1,2})\s*haftalık\s+gestasyon/giu, '$1. gebelik haftası')
    .replace(/\b(\d{1,3})\s*gün\s+yaşındaki\b/giu, '$1 günlük')
    .replace(/\b(\d{1,3})\s+günlük\s+yaşındaki\b/giu, '$1 günlük')
    .replace(/\b(\d{1,3})\s*ay\s+yaşındaki\b/giu, '$1 aylık')
    .replace(/\b(\d{1,3})\s*yaş\s+yaşındaki\b/giu, '$1 yaşındaki')
    .replace(/(\d{1,2}\. gebelik haftasında)\s+doğmuş/giu, '$1 doğan')
    .replace(/(\d{1,2}\. gebelik haftasında doğan),\s+(\d+ günlük)/giu, '$1 $2')
    .replace(/peristaltik sesler(?:in)?\s+azalması/giu, 'barsak seslerinde azalma')
    .replace(/barsak sesleri\s+azalması/giu, 'barsak seslerinde azalma')
    .replace(/peristaltik seslerde\s+azalma/giu, 'barsak seslerinde azalma')
    .replace(/peristaltik sesler(?:in)?/giu, 'barsak sesleri')
    .replace(/\bWheezing\b/g, 'hışıltılı solunum')
    .replace(/\bwheezing\b/g, 'hışıltılı solunum')
    .replace(/\bgörü(?:\.{2,}|…)\b/giu, 'görülüyor')
    .replace(/\bgörü\.?(?=\s+(?:Vital|Fizik|Objektif|Laboratuvar|Abdominal)|$)/giu, 'görülüyor.')
    .replace(/\s*(?:\.{3}|…)\s*/g, ' ')
    .replace(/\bAbdominal ultrasonografi\s*[:：]\s*/giu, 'Abdominal görüntülemede ')
    .replace(/\bObjektif değerlendirmede\s*/giu, 'Laboratuvar değerlendirmesinde ')
    .replace(/\bVital bulgularda\s+vital bulgularda\b/giu, 'Vital bulgularda')
    .replace(/,\s*referans\s*[^,.;]+(?:,\s*(?:yüksek|düşük|normal|patolojik|pozitif|negatif|artmış|azalmış))?/giu, '')
    .replace(/;\s*referans\s*[^,.;]+(?:,\s*(?:yüksek|düşük|normal|patolojik|pozitif|negatif|artmış|azalmış))?/giu, '')
    .replace(/\b(\d+)\.\s+(?=\d{3}\b)/g, '$1.')
    .replace(/\b(\d{2})\.\s+(?=gebelik haftasında)/giu, '$1. ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return text;
}

function asText(value = '') {
  return normalizeAiNarrativeText(value);
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

function ensureQuestion(value = '') {
  const text = sentenceCase(value).replace(/[\s,;:.]+$/u, '');
  if (!text) return 'Bu olguda en uygun seçenek aşağıdakilerden hangisidir?';
  return /[?]$/u.test(text) ? text : `${text}?`;
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
    .replace(/\bbu tablo\s+[^.?!]{0,60}\s+düşündürür\b[^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return normalizeAiNarrativeText(text);
}

function splitSentences(value = '') {
  const text = normalizeAiNarrativeText(value);
  if (!text) return [];
  return text
    .split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ])/u)
    .map((item) => item.trim())
    .filter(Boolean);
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

function normalizeDataLabel(label = '') {
  const raw = String(label || '').trim();
  if (/^spo2$/iu.test(raw)) return 'SpO₂';
  if (/^kan basıncı$/iu.test(raw)) return 'TA';
  if (/^ateş|ates$/iu.test(raw)) return 'Ateş';
  if (/^solunum sayısı$/iu.test(raw)) return 'Solunum';
  return raw;
}

function normalizeDataValue(value = '') {
  return normalizeAiNarrativeText(value)
    .replace(/\s*\((?:referans|normal)[^)]+\)/giu, '')
    .replace(/,\s*(?:referans|normal aralık)\s*[^,.;]+/giu, '')
    .replace(/,\s*(?:yüksek|düşük|normal|patolojik|pozitif|negatif|artmış|azalmış)$/giu, '')
    .trim();
}

function normalizeCompactDataItem(item = {}) {
  if (typeof item === 'string') {
    const [label, ...rest] = item.split(/[:：]/u);
    return rest.length ? { label: normalizeDataLabel(label), value: normalizeDataValue(rest.join(':')) } : null;
  }
  const label = normalizeDataLabel(item.label || item.name || item.parameter || item.title || '');
  const value = normalizeDataValue(item.value || item.result || item.text || '');
  if (!label || !value) return null;
  return { label, value };
}

function uniqueCompactItems(items = [], max = 6) {
  const seen = new Set();
  const out = [];
  items.map(normalizeCompactDataItem).filter(Boolean).forEach((item) => {
    const key = normalizeComparable(`${item.label} ${item.value}`);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  });
  return out.slice(0, max);
}

function isMeaningfulVital(value = '') {
  const text = normalizeComparable(value);
  return Boolean(text) && !/^(stabil|normal|normal aralikta|normal aralıkta|afebril|yok|korunmus|korunmuş|olağan|fizyolojik)$/u.test(text);
}

function vitalLooksAbnormal(label = '', value = '') {
  const text = normalizeComparable(`${label} ${value}`);
  if (/hipotans|hipertans|taşikard|tasikard|bradikard|takipne|hipoksi|desat|febril|ateş|ates|şok|sok/.test(text)) return true;
  if (/^ta$/i.test(label) && /\b([3-9][0-9]|1[0-8][0-9])\/[0-9]{2,3}\s*mmhg\b/.test(text)) return true;
  if (/nabız|nabiz/.test(text)) {
    const n = Number.parseFloat((text.match(/\b\d+(?:\.\d+)?\b/) || [])[0]);
    if (Number.isFinite(n) && (n > 120 || n < 50)) return true;
  }
  if (/solunum/.test(text)) {
    const n = Number.parseFloat((text.match(/\b\d+(?:\.\d+)?\b/) || [])[0]);
    if (Number.isFinite(n) && n > 28) return true;
  }
  if (/ateş|ates/.test(text)) {
    const n = Number.parseFloat((text.match(/\b\d+(?:\.\d+)?\b/) || [])[0]);
    if (Number.isFinite(n) && n >= 38) return true;
  }
  if (/spo/.test(text)) {
    const n = Number.parseFloat((text.match(/\b\d+(?:\.\d+)?\b/) || [])[0]);
    if (Number.isFinite(n) && n < 95) return true;
  }
  return false;
}

function shouldExposeVitals(question = {}, candidateItems = []) {
  if (Array.isArray(question.compactVitals) && question.compactVitals.length) return true;
  if (!candidateItems.length) return false;
  const bundle = normalizeAiNarrativeText([
    question.title,
    question.relatedBranch,
    question.learningTarget,
    question.questionType,
    question.chiefComplaint,
    question.narrativeStem,
    question.stem,
    question.question,
  ].filter(Boolean).join(' '));
  return VITAL_RELEVANCE_KEYWORDS.test(bundle) || candidateItems.some((item) => vitalLooksAbnormal(item.label, item.value));
}

export function getAISpotCompactVitals(question = {}) {
  const explicit = uniqueCompactItems(question.compactVitals || question.compactVitalData || [], 5);
  if (explicit.length) return explicit;
  const vitals = question.vitals || question.findings?.vitals || {};
  const items = VITAL_LABELS
    .map((label) => ({ label, value: vitals[label] || vitals[label.replace('₂', '2')] || '' }))
    .filter((item) => isMeaningfulVital(item.value));
  return shouldExposeVitals(question, items) ? uniqueCompactItems(items, 5) : [];
}

function rowToCompactItem(row = []) {
  if (!Array.isArray(row)) return null;
  const [name, result] = row.map(asText);
  if (!name || !result) return null;
  const value = normalizeDataValue(result);
  if (!OBJECTIVE_LABEL_HINT.test(`${name} ${value}`) && !/\d/.test(value)) return null;
  return { label: name, value };
}

function findingToCompactItem(text = '') {
  const clean = normalizeAiNarrativeText(text);
  if (!clean || GENERIC_INVESTIGATION_SENTENCES.some((pattern) => pattern.test(clean))) return null;
  const colon = clean.match(/^([^:：]{2,28})[:：]\s*(.+)$/u);
  if (colon) return { label: colon[1], value: normalizeDataValue(colon[2]) };
  const lab = clean.match(/\b(lökosit|lokosit|wbc|crp|pH|ph|hco₃|hco3|laktat|glukoz|kreatinin|troponin|d-dimer|platelet|trombosit|hemoglobin)\s+([^,.;]+)/iu);
  if (lab) return { label: lab[1].replace(/^ph$/iu, 'pH'), value: normalizeDataValue(lab[2]) };
  return null;
}

export function getAISpotCompactObjectiveData(question = {}) {
  const explicit = uniqueCompactItems(question.compactObjectiveData || question.compactObjective || [], 6);
  if (explicit.length) return explicit;
  const investigations = question.investigations || question.findings?.investigations || [];
  const items = [];
  (Array.isArray(investigations) ? investigations : []).forEach((item) => {
    if (Array.isArray(item.rows)) item.rows.forEach((row) => {
      const compact = rowToCompactItem(row);
      if (compact) items.push(compact);
    });
    if (Array.isArray(item.findings)) item.findings.forEach((finding) => {
      const compact = findingToCompactItem(finding);
      if (compact) items.push(compact);
    });
    const compactSummary = findingToCompactItem(item.summary || item.result || '');
    if (compactSummary) items.push(compactSummary);
  });
  return uniqueCompactItems(items, 6);
}

function removeDenseVitalSentences(text = '', shouldRemove = false) {
  if (!shouldRemove) return text;
  return splitSentences(text)
    .filter((sentence) => {
      const score = ['kan basıncı', 'ta ', 'nabız', 'solunum', 'ateş', 'spo'].reduce((acc, token) => acc + (normalizeComparable(sentence).includes(token.trim()) ? 1 : 0), 0);
      return !(score >= 3 || /^vital bulgularda/iu.test(sentence));
    })
    .join(' ');
}

function simplifyInlineObjectiveText(text = '') {
  return normalizeAiNarrativeText(text)
    .replace(/\bLaboratuvar değerlendirmesinde\s+([^.!?]{0,260})\s+bildiriliyor[.!?]?/giu, (_, body) => `Laboratuvar değerlendirmesinde ${body} saptanıyor.`)
    .replace(/\bObjektif değerlendirmede\s+([^.!?]{0,260})\s+bildiriliyor[.!?]?/giu, (_, body) => `Laboratuvar değerlendirmesinde ${body} saptanıyor.`)
    .replace(/\b(?:yüksek|düşük|normal|patolojik)\s*;\s*/giu, '; ')
    .replace(/\s*;\s*/g, ', ')
    .replace(/,\s*,/g, ',')
    .replace(/\s+/g, ' ')
    .trim();
}


function looksLikeDenseObjectiveSentence(sentence = '') {
  const comparable = normalizeComparable(sentence);
  const objectiveHits = ['lökosit', 'lokosit', 'crp', 'ph', 'hco', 'laktat', 'glukoz', 'troponin', 'd dimer', 'kreatinin'].reduce((acc, token) => acc + (comparable.includes(token) ? 1 : 0), 0);
  return objectiveHits >= 2 || /abdominal görüntülemede\s+lökosit/iu.test(sentence) || /^laboratuvar değerlendirmesinde/i.test(sentence) && objectiveHits >= 1;
}

function limitNarrativeLength(sentences = [], questionPrompt = '') {
  const prompt = ensureQuestion(questionPrompt || 'Bu olguda en uygun seçenek aşağıdakilerden hangisidir?');
  const selected = [];
  let words = 0;
  sentences.forEach((sentence) => {
    const count = sentence.split(/\s+/).filter(Boolean).length;
    if (selected.length < 5 && words + count <= 185) {
      selected.push(sentence);
      words += count;
    }
  });
  const promptComparable = normalizeComparable(prompt);
  if (!selected.some((sentence) => normalizeComparable(sentence).includes(promptComparable))) {
    selected.push(prompt);
  }
  return selected;
}

function splitTusParagraphsFromSentences(sentences = []) {
  if (!sentences.length) return ['Bu olguda en uygun seçenek aşağıdakilerden hangisidir?'];
  const last = sentences[sentences.length - 1] || '';
  const hasQuestion = /\?$/u.test(last) || /aşağıdakilerden hangisidir\??$/iu.test(last);
  const bodySentences = hasQuestion ? sentences.slice(0, -1) : sentences;
  const question = hasQuestion ? ensureQuestion(last) : '';
  const body = bodySentences.join(' ').trim();
  if (!body) return [question || ensureQuestion(last)];
  if (body.length < 620) return question ? [body, question] : [body];
  const midpoint = Math.ceil(bodySentences.length / 2);
  const paragraphs = [bodySentences.slice(0, midpoint).join(' '), bodySentences.slice(midpoint).join(' ')].filter(Boolean);
  if (question) paragraphs.push(question);
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
  return rawTitle.length > 74 ? `${rawTitle.slice(0, 71).trim()}…` : rawTitle;
}

export function buildAISpotContextLine(question = {}) {
  const branch = asText(question.relatedBranch || question.branchName || 'TUS Spot');
  const type = String(question.questionType || '').toLocaleLowerCase('tr');
  if (type === 'test') return `${branch} bağlamında TUS tarzı veri yorumu.`;
  if (type === 'treatment') return `${branch} bağlamında ilk yaklaşım kararı.`;
  if (type === 'mechanism') return `${branch} bağlamında mekanizma sorusu.`;
  if (type === 'diagnosis') return `${branch} bağlamında kısa klinik olgu yorumu.`;
  return `${branch} bağlamında tek köklü TUS spot sorusu.`;
}

export function buildAISpotNarrativeStem(question = {}) {
  const correct = question.diagnosis?.correct || question.correctAnswerText || '';
  const vitalsBox = getAISpotCompactVitals(question);
  const objectiveBox = getAISpotCompactObjectiveData(question);
  const baseRaw = question.narrativeStem || question.primaryStem || question.stem || question.patientIntro?.historySummary || '';
  let cleanBase = stripPreAnswerTeaching(baseRaw, correct);
  cleanBase = removeDenseVitalSentences(cleanBase, vitalsBox.length > 0);
  cleanBase = simplifyInlineObjectiveText(cleanBase);

  const baseSentences = [];
  splitSentences(cleanBase).forEach((sentence) => {
    if (/^vital bulgularda/iu.test(sentence) && vitalsBox.length) return;
    if (objectiveBox.length && looksLikeDenseObjectiveSentence(sentence)) return;
    if (/^objektif değerlendirmede/iu.test(sentence)) return;
    addUniqueSentence(baseSentences, sentence, correct);
  });

  if (baseSentences.length < 2) {
    const history = Array.isArray(question.history || question.findings?.history) ? (question.history || question.findings?.history) : [];
    history.slice(0, 2).forEach((item) => addUniqueSentence(baseSentences, item, correct));
    const exam = Array.isArray(question.exam || question.findings?.exam) ? (question.exam || question.findings?.exam) : [];
    exam.slice(0, 2).forEach((item) => addUniqueSentence(baseSentences, `Fizik muayenede ${item}`, correct));
  }

  const questionPrompt = stripPreAnswerTeaching(question.question || question.diagnosis?.question || '', correct)
    .replace(/^[Bb]u olguda\s*,?\s*/u, 'Bu olguda ');
  const finalSentences = limitNarrativeLength(baseSentences, questionPrompt);
  return splitTusParagraphsFromSentences(finalSentences);
}

export function getAISpotPreviewDiagnostics(question = {}) {
  const paragraphs = buildAISpotNarrativeStem(question);
  const text = paragraphs.join(' ');
  return {
    paragraphCount: paragraphs.length,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    compactVitalsCount: getAISpotCompactVitals(question).length,
    compactObjectiveCount: getAISpotCompactObjectiveData(question).length,
    hasLegacyBoxLabels: /profil|başvuru|risk bağlamı|ayırt ettirici ipuçları|kısa klinik öykü özeti/iu.test(text),
    containsCorrectAnswerText: Boolean(question.diagnosis?.correct && normalizeComparable(text).includes(normalizeComparable(question.diagnosis.correct))),
  };
}
