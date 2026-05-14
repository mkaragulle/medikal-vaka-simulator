const TR_LOCALE = 'tr';
const MAX_EXPLANATION_LENGTH = 520;
const MAX_FEEDBACK_LENGTH = 280;
const MAX_EVIDENCE_ITEMS = 5;
const MAX_MANAGEMENT_ITEMS = 4;

const MECHANICAL_LABEL_PATTERN = /^(?:kan[ıi]t\s*\d+|[Kk]linik\s*gerekçe|neden\s*doğru|neden\s*yanlış|tus\s*işareti|hap\s*bilgi|spot\s*bilgi|sınav\s*notu|seçenek\s*karşılaştırması|çeldirici\s*açıklaması|doğru\s*seçenek\s*açıklaması|laboratuvar\s*paterni|objektif\s*karar\s*verisi|[İIıi]lk\s*karar|[Tt]edavi\s*önceliği)\s*[:：|\-.]\s*/iu;

const EMPTY_TEMPLATE_PATTERNS = [
  /bu seçenek farklı tabloda uygun olabilir/iu,
  /bu nedenle en iyi yanıt/iu,
  /klinik kararı güçlendiren temel ipucudur/iu,
  /bazı klinik durumlarda gündeme gelebilir/iu,
  /belirli klinik koşullarda doğru olabilir/iu,
  /ancak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır/iu,
  /bu olgudaki ayırt ettirici bulgularla desteklenmemektedir/iu,
  /klinik bağlamda değerlendirilir/iu,
  /bu veri klinik bağlamda değerlendirilir/iu,
  /doğru cevabı destekleyen ana ipucudur/iu,
  /doğru yanıta götüren ana bulgudur/iu,
  /olgudaki ana bulgular doğru yanıta/iu,
  /beklenen ana ipuçları bu tabloda baskın değildir/iu,
  /objektif bulguların karar basamağını desteklemesi/iu,
  /verilen öğrenme hedefi/iu,
  /yanıt ekseni/iu,
  /öğrenci ayırt eder/iu,
  /sonuçlar tek bir tanı adını yazmaz/iu,
  /patern ve mekanizma birlikte yorumlanmalıdır/iu,
  /morfolojik patern\s*[:.]/iu,
];

const BROKEN_END_PATTERN = /(?:ve|veya|ile|için|açısından|sağlayarak|yaparak|ederek|tanısını|paternini|basamağını)$/iu;

function normalizeSpaces(value = '') {
  return String(value ?? '')
    .replace(/\s+/gu, ' ')
    .replace(/\s+([,.;:!?])/gu, '$1')
    .replace(/([,;:!?])(?=\S)/gu, '$1 ')
    .trim();
}

function ensureSentence(value = '') {
  const text = normalizeSpaces(value).replace(/[,:;|\-–—\s]+$/u, '').trim();
  if (!text) return '';
  const punctuated = /[.!?]$/u.test(text) ? text : `${text}.`;
  return punctuated.replace(/(^|[.!?]\s+)([a-zçğıöşü])/gu, (_, prefix, letter) => `${prefix}${letter.toLocaleUpperCase(TR_LOCALE)}`);
}

function splitSentences(value = '') {
  return normalizeSpaces(value)
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => ensureSentence(sentence))
    .filter(Boolean);
}

function asciiKey(value = '') {
  return normalizeSpaces(value)
    .toLocaleLowerCase(TR_LOCALE)
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^a-z0-9+/% ]+/g, ' ')
    .replace(/\b(?:ve|veya|ile|icin|olan|olarak|hasta|hastada|olgu|olguda|klinik|dogru|yanit|cevap|secenek|alternatif|tus|spot|hangi|uygun|en|ilk|bu)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function textSimilarity(a = '', b = '') {
  const aWords = new Set(asciiKey(a).split(' ').filter((word) => word.length > 2));
  const bWords = new Set(asciiKey(b).split(' ').filter((word) => word.length > 2));
  if (!aWords.size || !bWords.size) return 0;
  let intersection = 0;
  aWords.forEach((word) => { if (bWords.has(word)) intersection += 1; });
  return intersection / Math.min(aWords.size, bWords.size);
}

function isTooSimilar(value = '', context = [], threshold = 0.84) {
  const key = asciiKey(value);
  if (!key) return true;
  return context.some((item) => {
    const otherKey = asciiKey(item);
    if (!otherKey) return false;
    if (key.length > 26 && otherKey.includes(key)) return true;
    if (otherKey.length > 26 && key.includes(otherKey)) return true;
    return textSimilarity(key, otherKey) >= threshold;
  });
}

function stripMechanicalLabel(value = '') {
  return normalizeSpaces(value)
    .replace(MECHANICAL_LABEL_PATTERN, '')
    .replace(/\b(?:kan[ıi]t\s*\d+|[Kk]linik\s*gerekçe|neden\s*doğru|neden\s*yanlış|spot\s*bilgi|sınav\s*notu|[İIıi]lk\s*karar|[Tt]edavi\s*önceliği)\s*[:：|\-.]\s*/giu, '')
    .trim();
}

function removeTemplateLanguage(value = '') {
  let text = stripMechanicalLabel(value)
    .replace(/\bçeldirici\b/giu, 'alternatif')
    .replace(/\bÇeldirici\b/giu, 'Alternatif')
    .replace(/\bdoğru cevap\b/giu, 'uygun yanıt')
    .replace(/\bDoğru cevap\b/giu, 'Uygun yanıt')
    .replace(/\bdoğru seçenek\b/giu, 'uygun seçenek')
    .replace(/\bDoğru seçenek\b/giu, 'Uygun seçenek')
    .replace(/\bdoğru cevabı destekleyen ana ipucudur\b/giu, 'klinik kararı güçlendiren temel ipucudur')
    .replace(/\bdoğru yanıta götüren ana bulgudur\b/giu, 'klinik kararı güçlendiren temel bulgudur')
    .replace(/\bklinik bağlamda değerlendirilir\b/giu, 'öykü ve objektif verilerle birlikte yorumlanır')
    .replace(/\bBu veri klinik bağlamda değerlendirilir\b/giu, 'Bu veri öykü ve objektif bulgularla birlikte yorumlanır')
    .replace(/\bLaboratuvar paterni\b/giu, 'Laboratuvar bulgusu')
    .replace(/\bObjektif karar verisi\b/giu, 'Objektif bulgu')
    .replace(/\bİlk karar\b/giu, 'Öncelikli yaklaşım')
    .replace(/\bTedavi önceliği\b/giu, 'Tedavi basamağı')
    .replace(/\bverilen öğrenme hedefi\b/giu, 'ölçülen klinik bilgi')
    .replace(/\byanıt ekseni\b/giu, 'klinik karar noktası')
    .replace(/\s*;\s*/gu, '. ')
    .replace(/\s+/gu, ' ')
    .trim();

  EMPTY_TEMPLATE_PATTERNS.forEach((pattern) => {
    text = text.replace(pattern, '').replace(/\s+/gu, ' ').trim();
  });

  return normalizeSpaces(text);
}

function truncateAtSentence(value = '', limit = MAX_FEEDBACK_LENGTH) {
  const text = ensureSentence(value);
  if (text.length <= limit) return text;
  const sentences = splitSentences(text);
  const out = [];
  for (const sentence of sentences) {
    const candidate = normalizeSpaces([...out, sentence].join(' '));
    if (candidate.length > limit) break;
    out.push(sentence);
  }
  if (out.length) return ensureSentence(out.join(' '));
  const cut = text.slice(0, limit).replace(/\s+\S*$/u, '').replace(/[,:;\-–—\s]+$/u, '').trim();
  return ensureSentence(cut || text.slice(0, limit));
}

function isBrokenOrEmpty(value = '') {
  const text = normalizeSpaces(value);
  if (text.length < 24) return true;
  if (BROKEN_END_PATTERN.test(text.replace(/[.!?]$/u, ''))) return true;
  return EMPTY_TEMPLATE_PATTERNS.some((pattern) => pattern.test(text));
}

function collectTexts(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectTexts(item, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectTexts(item, out));
  return out;
}

function optionIdList(question = {}) {
  return (Array.isArray(question.options) ? question.options : [])
    .map((option, index) => ({
      id: String(option?.id || ['A', 'B', 'C', 'D', 'E'][index] || '').toUpperCase(),
      text: normalizeSpaces(option?.text || option || ''),
    }))
    .filter((option) => option.id && option.text);
}

function correctOptionText(question = {}) {
  const id = String(question.correctAnswer || question.c || '').toUpperCase();
  return optionIdList(question).find((option) => option.id === id)?.text || '';
}

function rawClues(question = {}) {
  const feedback = question.diagnosis?.answerFeedback || {};
  return [
    ...(Array.isArray(question.evidenceChain) ? question.evidenceChain : []),
    ...(Array.isArray(feedback.evidenceChain) ? feedback.evidenceChain : []),
    ...(Array.isArray(question.patientIntro?.distinctiveClues) ? question.patientIntro.distinctiveClues : []),
    ...(Array.isArray(question.findings?.exam) ? question.findings.exam : []),
    ...(Array.isArray(question.findings?.history) ? question.findings.history : []),
    question.stem,
    question.learningTarget,
  ]
    .map((item) => normalizeSpaces(typeof item === 'string' ? item : `${item?.title || ''} ${item?.text || item?.summary || ''}`))
    .filter(Boolean);
}

function pickClues(question = {}, limit = 3) {
  const clues = [];
  rawClues(question).forEach((item) => {
    const cleaned = truncateAtSentence(removeTemplateLanguage(item), 170);
    if (!cleaned || isBrokenOrEmpty(cleaned)) return;
    if (isTooSimilar(cleaned, clues, 0.82)) return;
    clues.push(cleaned);
  });
  return clues.slice(0, limit);
}

function buildCorrectFallback(question = {}) {
  const clues = pickClues(question, 2);
  const correct = correctOptionText(question);
  const clueText = clues.length ? clues.map((item) => item.replace(/[.!?]$/u, '')).join(' ve ') : 'verilen öykü, muayene ve objektif veriler';
  const answer = correct ? `${correct} seçeneğini` : 'uygun yanıtı';
  return `${clueText} birlikte değerlendirildiğinde ${answer} diğer alternatiflerden daha tutarlı kılar.`;
}

function buildWrongFallback(optionText = '', question = {}) {
  const clues = pickClues(question, 2);
  const clueText = clues.length ? clues[0].replace(/[.!?]$/u, '') : 'olgudaki ayırt ettirici ipuçları';
  const option = optionText ? `${optionText} ilk bakışta aynı karar alanında düşünülebilir` : 'Bu alternatif ilk bakışta düşünülebilir';
  return `${option}; ancak ${clueText} bu seçeneği öncelikli yanıt yapacak yeterli desteği sağlamaz.`;
}

function cleanFeedbackText(value = '', { fallback = '', limit = MAX_FEEDBACK_LENGTH, context = [] } = {}) {
  let text = removeTemplateLanguage(value);
  const sentences = [];
  splitSentences(text).forEach((sentence) => {
    const cleaned = ensureSentence(removeTemplateLanguage(sentence));
    if (!cleaned || isBrokenOrEmpty(cleaned)) return;
    if (isTooSimilar(cleaned, [...context, ...sentences], 0.88)) return;
    sentences.push(cleaned);
  });
  text = sentences.join(' ');
  if (!text || isBrokenOrEmpty(text)) text = fallback;
  return truncateAtSentence(removeTemplateLanguage(text), limit);
}

function cleanEvidenceItem(value = '', question = {}, context = []) {
  const text = cleanFeedbackText(value, {
    fallback: '',
    limit: 185,
    context,
  });
  if (!text) return '';
  if (/^kanıt\s*\d+\.?$/iu.test(text)) return '';
  return text;
}

function cleanEvidenceChain(question = {}) {
  const context = [];
  const output = [];
  rawClues(question).forEach((item) => {
    const cleaned = cleanEvidenceItem(item, question, context);
    if (!cleaned || isTooSimilar(cleaned, [...context, ...output], 0.82)) return;
    output.push(cleaned);
    context.push(cleaned);
  });
  if (output.length < 3) {
    pickClues(question, 4).forEach((clue) => {
      if (!isTooSimilar(clue, output, 0.82)) output.push(clue);
    });
  }
  return output.slice(0, MAX_EVIDENCE_ITEMS);
}

function cleanExamPearl(question = {}, context = []) {
  const feedback = question.diagnosis?.answerFeedback || {};
  const raw = question.examPearl || (Array.isArray(question.examPearls) ? question.examPearls[0] : '') || feedback.spotPearl || feedback.pearls?.[0] || feedback.clinicalPearls?.[0] || '';
  const fallback = 'TUS tipi sorularda karar, tek bir ezber cümlesinden çok olgudaki ayırt ettirici ipuçlarının aynı klinik eksende birleşmesiyle verilir.';
  const cleaned = cleanFeedbackText(raw, { fallback, limit: 240, context });
  if (isTooSimilar(cleaned, context, 0.82)) return fallback;
  return cleaned;
}

function cleanManagementSteps(question = {}, context = []) {
  const feedback = question.diagnosis?.answerFeedback || {};
  const rawSteps = Array.isArray(question.managementSteps) && question.managementSteps.length
    ? question.managementSteps
    : (Array.isArray(feedback.managementSteps) ? feedback.managementSteps : []);
  const steps = [];
  rawSteps.forEach((step) => {
    const text = typeof step === 'string' ? step : `${step?.title || ''} ${step?.text || step?.description || ''}`;
    const cleaned = cleanFeedbackText(text, { fallback: '', limit: 160, context: [...context, ...steps] });
    if (!cleaned || isTooSimilar(cleaned, steps, 0.84)) return;
    steps.push(cleaned);
  });
  return steps.slice(0, MAX_MANAGEMENT_ITEMS);
}

function cleanWrongFeedbackMap(question = {}, context = []) {
  const feedback = question.wrongOptionFeedback && typeof question.wrongOptionFeedback === 'object' ? question.wrongOptionFeedback : {};
  const options = optionIdList(question);
  const correctId = String(question.correctAnswer || '').toUpperCase();
  const output = {};
  options.forEach((option) => {
    const fallback = option.id === correctId ? buildCorrectFallback(question) : buildWrongFallback(option.text, question);
    output[option.id] = cleanFeedbackText(feedback[option.id] || feedback[option.text] || '', {
      fallback,
      limit: MAX_FEEDBACK_LENGTH,
      context,
    });
  });
  return output;
}

function cleanPearlArray(items = [], context = []) {
  const output = [];
  (Array.isArray(items) ? items : []).forEach((item) => {
    const raw = typeof item === 'string' ? item : `${item?.label || item?.title || ''} ${item?.text || item?.description || ''}`;
    const cleaned = cleanFeedbackText(raw, { fallback: '', limit: 220, context: [...context, ...output] });
    if (cleaned) output.push(cleaned);
  });
  return output.slice(0, 3);
}

export function applyFeedbackQualityStandardToQuestion(question = {}) {
  const repaired = { ...question };
  const evidenceChain = cleanEvidenceChain(repaired);
  const explanation = cleanFeedbackText(repaired.explanation || repaired.diagnosis?.answerFeedback?.whyCorrect || repaired.diagnosis?.explanation || '', {
    fallback: buildCorrectFallback(repaired),
    limit: MAX_EXPLANATION_LENGTH,
    context: evidenceChain,
  });
  const examPearl = cleanExamPearl(repaired, [explanation, ...evidenceChain]);
  const managementSteps = cleanManagementSteps(repaired, [explanation, examPearl, ...evidenceChain]);
  const wrongOptionFeedback = cleanWrongFeedbackMap(repaired, [explanation, examPearl, ...evidenceChain, ...managementSteps]);

  repaired.explanation = explanation;
  repaired.evidenceChain = evidenceChain.length >= 3 ? evidenceChain : pickClues(repaired, 3);
  repaired.examPearl = examPearl;
  repaired.examPearls = [examPearl];
  repaired.managementSteps = managementSteps;
  repaired.wrongOptionFeedback = wrongOptionFeedback;

  const answerFeedback = repaired.diagnosis?.answerFeedback || {};
  const feedbackPearls = cleanPearlArray(answerFeedback.pearls || answerFeedback.clinicalPearls || repaired.examPearls || [], [explanation, ...repaired.evidenceChain]);
  repaired.diagnosis = {
    ...(repaired.diagnosis || {}),
    explanation,
    answerFeedback: {
      ...answerFeedback,
      whyCorrect: explanation,
      evidenceChain: repaired.evidenceChain,
      pearls: feedbackPearls.length ? feedbackPearls : [examPearl],
      clinicalPearls: feedbackPearls.length ? feedbackPearls : [examPearl],
      managementSteps,
      whyWrong: Object.fromEntries(optionIdList(repaired)
        .filter((option) => option.id !== String(repaired.correctAnswer || '').toUpperCase())
        .map((option) => [option.text, wrongOptionFeedback[option.id] || buildWrongFallback(option.text, repaired)])),
    },
  };

  return repaired;
}

export function validateFeedbackQualityStandard(question = {}) {
  const errors = [];
  const texts = collectTexts({
    explanation: question.explanation,
    evidenceChain: question.evidenceChain,
    examPearl: question.examPearl,
    managementSteps: question.managementSteps,
    wrongOptionFeedback: question.wrongOptionFeedback,
    answerFeedback: question.diagnosis?.answerFeedback,
  });
  texts.forEach((text) => {
    const normalized = normalizeSpaces(text);
    if (!normalized) return;
    if (MECHANICAL_LABEL_PATTERN.test(normalized)) errors.push(`mechanical-feedback-label:${normalized.slice(0, 100)}`);
    if (EMPTY_TEMPLATE_PATTERNS.some((pattern) => pattern.test(normalized))) errors.push(`empty-template-feedback:${normalized.slice(0, 100)}`);
    if (BROKEN_END_PATTERN.test(normalized.replace(/[.!?]$/u, ''))) errors.push(`broken-feedback-sentence:${normalized.slice(0, 100)}`);
  });
  const evidence = Array.isArray(question.evidenceChain) ? question.evidenceChain : [];
  if (evidence.length < 3) errors.push('feedback-evidence-chain-too-short');
  const wrong = question.wrongOptionFeedback || {};
  optionIdList(question).forEach((option) => {
    const text = normalizeSpaces(wrong[option.id] || '');
    if (!text || text.length < 45) errors.push(`feedback-option-too-short:${option.id}`);
  });
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)) };
}

export const FEEDBACK_QUALITY_STANDARD_VERSION = 'feedback-standard-v1.0-topic-agnostic';
