import { normalizeQuestionQualityFields, runQuestionQualityGate } from './question-quality-gate.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const TR_LOCALE = 'tr';

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/gu, ' ')
    .replace(/\s+([,.;:!?])/gu, '$1')
    .replace(/([,;:!?])(?=\S)/gu, '$1 ')
    .trim();
}

function normalizeForAudit(value = '') {
  return cleanText(value)
    .toLocaleLowerCase(TR_LOCALE)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/gu, '')
    .replace(/ı/gu, 'i')
    .replace(/ğ/gu, 'g')
    .replace(/ü/gu, 'u')
    .replace(/ş/gu, 's')
    .replace(/ö/gu, 'o')
    .replace(/ç/gu, 'c')
    .replace(/[^a-z0-9+/%°\s-]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function splitSentences(value = '') {
  const text = cleanText(value)
    .replace(/(\d)\.(\d)/gu, '$1<dot>$2')
    .replace(/\b(Dr|Prof|Doç|vs|vb)\.\s+/giu, (match) => match.replace('.', '<dot>'));
  const parts = text.match(/[^.!?]+[.!?]+|[^.!?]+$/gu) || [];
  return parts
    .map((part) => part.replace(/<dot>/gu, '.').trim())
    .filter(Boolean);
}

function sentenceCount(value = '') {
  return splitSentences(value).filter((sentence) => /[.!?]$/u.test(sentence)).length;
}

function wordCount(value = '') {
  return normalizeForAudit(value).split(/\s+/u).filter(Boolean).length;
}

const SURFACE_PHRASE_PATTERNS = [
  /\boncelik tasimaz\b/u,
  /\byeterli veri yoktur\b/u,
  /\bklinik baglami aciklamaz\b/u,
  /\bklinik baglamda oncelikli degildir\b/u,
  /\boncelikli karar noktasini aciklamaz\b/u,
  /\btemel karar noktasini aciklamaz\b/u,
  /\btemel karar noktasini desteklemez\b/u,
  /\bbu secenek uygun degildir\b/u,
  /\bbu tabloyu aciklamaz\b/u,
  /\btipik degildir\b/u,
  /\bdesteklemez\b/u,
  /\bdislanir\b/u,
  /\bayirici tanida dusunulmez\b/u,
  /\bdogru degildir\b/u,
  /\byanlis secenektir\b/u,
  /\bbu nedenle cevap degildir\b/u,
  /\bveri bulunmamaktadir\b/u,
  /\bdaha az olasidir\b/u,
  /\bverilen bulgularla yeterince uyumlu degildir\b/u,
];


const FORBIDDEN_TEMPLATE_FEEDBACK_PATTERNS = [
  /bu yanit belirli bir tani test tedavi veya mekanizma eksenini temsil eder/u,
  /bu yanit belirli bir tani.*eksenini temsil eder/u,
  /kokte bu ekseni dogrudan guclendiren ozgul bulgu dizisi baskin degildir/u,
  /hangi veri kumesinin daha secici oldugudur/u,
  /daha guclu kalir/u,
  /bulgu butunlug/u,
  /gorunur veriler/u,
  /gorunur veri/u,
  /klinik karar ekseni/u,
  /klinik karar noktasi/u,
  /kendi ozgun klinik patern/u,
  /kendi tanisal veya mekanistik ipuclari/u,
  /tanisal veya mekanistik ipuclari kokte baskin/u,
  /dogru cevabin klinik eksenini destekler/u,
  /temel ayrim.*lehine birles/u,
];

const CROSS_TOPIC_CLUSTERS = [
  {
    id: 'humoral-immunodeficiency',
    terms: ['igg', 'iga', 'igm', 'immunoglobulin', 'immun yetmezlik', 'humoral', 'b hucresi', 'cd19', 'asi antikor', 'spesifik antikor', 'pnömokok antikor', 'tetanoz antikor', 'neisseria', 'ch50', 'ah50', 'dhr', 'nbt'],
  },
  {
    id: 'diabetes-mody',
    terms: ['mody', 'monojenik', 'glukokinaz', 'hnf1a', 'hnf4a', 'c peptid', 'c-peptid', 'anti gad', 'otoantikor', 'keton', 'ketoasidoz', 'hba1c', 'polidipsi', 'poliuri'],
  },
  {
    id: 'nephrotic-glomerular',
    terms: ['nefrotik', 'proteinuri', 'hipoalbuminemi', 'hiperlipidemi', 'minimal degisiklik', 'fsgs', 'fokal segmental', 'membranoz', 'membranoproliferatif', 'mpgn', 'postenfeksiyoz', 'glomerulonefrit', 'kompleman', 'podosit', 'ayakcik', 'subepitelyal', 'subendotelyal', 'mezangial'],
  },
  {
    id: 'intussusception-abdomen',
    terms: ['intussusepsiyon', 'invajinasyon', 'currant jelly', 'kanli mukus', 'kolik agri', 'sosis seklinde', 'palpabl kitle', 'hedef bulgusu', 'apandisit', 'meckel', 'volvulus', 'gastroenterit', 'bilious', 'safra'],
  },
  {
    id: 'congenital-hypothyroidism',
    terms: ['konjenital hipotiroidi', 'hipotiroidi', 'tsh', 'serbest t4', 'ft4', 'kabizlik', 'hipotoni', 'makroglossi', 'kuru sac', 'seyrek sac', 'uzamis sarilik', 'primer hipotiroidi', 'guatr'],
  },
  {
    id: 'adrenal-axis',
    terms: ['adrenal yetmezlik', 'kortizol', 'acth', 'hiperpigmentasyon', 'hipoglisemi', 'hiponatremi', 'hiperkalemi'],
  },
  {
    id: 'cystic-fibrosis',
    terms: ['kistik fibrozis', 'ter testi', 'mekonyum ileusu', 'pankreatik yetmezlik', 'tekrarlayan akciger enfeksiyonu', 'cftr'],
  },
];

function includesNormalizedTerm(text = '', term = '') {
  const haystack = normalizeForAudit(text);
  const needle = normalizeForAudit(term);
  if (!needle) return false;
  return haystack.includes(needle);
}

function clusterHits(text = '', cluster = {}) {
  return (cluster.terms || []).filter((term) => includesNormalizedTerm(text, term));
}

function topicLockText(question = {}) {
  return [
    question.relatedBranch,
    question.branch,
    question.learningTarget,
    question.answerTarget,
    question.diagnosisTarget,
    question.question,
    question.questionStem,
    question.stem,
    question.correctAnswerText,
    ...(question.options || []).map((option) => option?.text || ''),
    ...(question.compactObjectiveData || []).flatMap((item) => [item.label, item.value]),
    ...(question.objectiveData || []).flatMap((item) => [item.label, item.value]),
  ].filter(Boolean).join(' | ');
}

function supportedTopicClusters(question = {}) {
  const lockText = topicLockText(question);
  const supported = new Set();
  CROSS_TOPIC_CLUSTERS.forEach((cluster) => {
    if (clusterHits(lockText, cluster).length >= 1) supported.add(cluster.id);
  });
  return supported;
}

function detectCrossTopicContamination(question = {}) {
  const supported = supportedTopicClusters(question);
  const postAnswer = [
    question.explanation,
    question.examPearl,
    ...(Array.isArray(question.evidenceChain) ? question.evidenceChain : []),
    ...Object.values(question.optionFeedback || question.wrongOptionFeedback || {}),
  ].filter(Boolean).join(' | ');
  const contamination = [];
  CROSS_TOPIC_CLUSTERS.forEach((cluster) => {
    if (supported.has(cluster.id)) return;
    const hits = clusterHits(postAnswer, cluster);
    const uniqueHits = Array.from(new Set(hits.map((item) => normalizeForAudit(item))));
    if (uniqueHits.length >= 2) contamination.push(`${cluster.id}:${uniqueHits.slice(0, 4).join(',')}`);
    if (uniqueHits.length >= 1 && ['humoral-immunodeficiency', 'diabetes-mody'].includes(cluster.id)) {
      // These clusters are common carry-over residues in the current generator and
      // should not appear at all unless the current question lock supports them.
      contamination.push(`${cluster.id}:${uniqueHits.slice(0, 4).join(',')}`);
    }
  });
  return Array.from(new Set(contamination));
}

function hasForbiddenTemplateFeedback(value = '') {
  const normalized = normalizeForAudit(value);
  return FORBIDDEN_TEMPLATE_FEEDBACK_PATTERNS.some((pattern) => pattern.test(normalized));
}

function feedbackCopiesStem(value = '', question = {}) {
  const normalizedFeedback = normalizeForAudit(value);
  if (!normalizedFeedback || normalizedFeedback.length < 80) return false;
  const stemSentences = splitSentences([
    question.questionStem,
    question.stem,
    question.question,
  ].filter(Boolean).join(' '))
    .map(normalizeForAudit)
    .filter((sentence) => sentence.length >= 60);
  return stemSentences.some((sentence) => normalizedFeedback.includes(sentence.slice(0, 60)));
}

function feedbackRepeatsOptionName(value = '', optionText = '') {
  const normalizedFeedback = normalizeForAudit(value);
  const normalizedOption = normalizeForAudit(optionText);
  if (!normalizedFeedback || !normalizedOption || normalizedOption.length < 8) return false;
  const firstSentence = normalizeForAudit(splitSentences(value)[0] || '');
  const count = normalizedFeedback.split(normalizedOption).length - 1;
  return count >= 3;
}

const BROKEN_TURKISH_PATTERNS = [
  /^(?:da|de)\s+\S/u,
  /(?:^|[.!?]\s+)(?:da|de)\s+\S/u,
  /\bdaki(?:\s|$)/u,
  /\bbu nedenle da\b/u,
  /\bbu nedenle ile uyumlu degildir\b/u,
  /\bile uyumlu degildir\b/u,
  /\b(?:ancak|fakat|cunku|çünkü|ve|veya|ile|icin|için)\.?$/u,
];

const DEBUG_OR_META_PATTERNS = [
  /\b(?:debug|validator|schema|json|fallback|placeholder|quality gate|internal)\b/u,
  /^(?:[A-E]\s*)?(?:gerekcesi|gerekçe|geri bildirim|feedback)\s*[:：-]/u,
  /^dogru cevap\s*[:：-]/u,
  /^yanlis cevap\s*[:：-]/u,
  /\b(?:uretilemedi|eklenemedi|bulunamadi|manuel inceleme)\b/u,
];

const CLINICAL_ANCHOR_RE = /\b(?:yas|erkek|kadin|gebe|gebelik|gun|hafta|ay|yil|ates|agri|nobet|bilinc|dispne|oksuruk|kanama|sarilik|muayene|defans|rebound|odem|ufurum|purpura|fokal|noro|kan basinci|tansiyon|nabiz|saturasyon|hipotansiyon|hipertansiyon|tasikardi|bradikardi|lökosit|lokosit|crp|hemoglobin|trombosit|glukoz|sodyum|potasyum|kreatinin|ure|ph|hco3|laktat|troponin|proteinuri|hematuri|osmolalite|ekg|usg|bt|mrg|mr|grafi|tomografi|kultur|pcr|gram|biyopsi|histoloji|patoloji|enzim|reseptor|mekanizma|komplikasyon|tedavi|tani|test|tetkik|ayirici|klinik|laboratuvar|goruntuleme|organ|doku|hormon|inflamasyon|enfeksiyon)\b/gu;

const COMMON_OPTION_WORDS = new Set([
  'primer', 'sekonder', 'akut', 'kronik', 'erken', 'gec', 'hafif', 'agir', 'sendromu',
  'hastaligi', 'tedavisi', 'testi', 'tanisi', 'yetmezligi', 'bozuklugu',
]);

const TURKISH_MEDICAL_REPAIRS = [
  [/\bproteinuria\b/giu, 'proteinüri'],
  [/\bplatelet\b/giu, 'trombosit'],
  [/\bintracranial\b/giu, 'intrakraniyal'],
  [/\bmeningeal infection\b/giu, 'menenjit veya meningoensefalit'],
  [/\brenal failure\b/giu, 'böbrek yetmezliği'],
  [/\bliver enzymes\b/giu, 'karaciğer enzimleri'],
  [/\bseizure\b/giu, 'nöbet'],
  [/\bhypertension\b/giu, 'hipertansiyon'],
  [/\bfocal deficit\b/giu, 'fokal nörolojik defisit'],
  [/\bhematuri\b/giu, 'hematüri'],
  [/\bkoagulasyon\b/giu, 'koagülasyon'],
];

function countClinicalAnchors(value = '') {
  const normalized = normalizeForAudit(value);
  const matches = normalized.match(CLINICAL_ANCHOR_RE) || [];
  return new Set(matches).size;
}

function hasSurfaceOnlyPhrase(value = '') {
  const normalized = normalizeForAudit(value);
  const hasPhrase = SURFACE_PHRASE_PATTERNS.some((pattern) => pattern.test(normalized));
  if (!hasPhrase) return false;
  return sentenceCount(value) < 2 || wordCount(value) < 24 || countClinicalAnchors(value) < 2;
}

function hasBrokenTurkish(value = '') {
  const normalized = normalizeForAudit(value);
  return BROKEN_TURKISH_PATTERNS.some((pattern) => pattern.test(normalized));
}

function hasDebugResidue(value = '') {
  const normalized = normalizeForAudit(value);
  return DEBUG_OR_META_PATTERNS.some((pattern) => pattern.test(normalized));
}

function hasEnglishMedicalMix(value = '') {
  return TURKISH_MEDICAL_REPAIRS.some(([pattern]) => pattern.test(String(value || '')));
}

function optionWords(optionText = '') {
  return normalizeForAudit(optionText)
    .split(/\s+/u)
    .filter((word) => word.length >= 5 && !COMMON_OPTION_WORDS.has(word));
}

function optionSpecificEnough(feedback = '', optionText = '') {
  const normalized = normalizeForAudit(feedback);
  const words = optionWords(optionText);
  const optionHits = words.filter((word) => normalized.includes(word)).length;
  if (optionHits >= Math.min(2, Math.max(1, words.length))) return true;
  return countClinicalAnchors(feedback) >= 2 && sentenceCount(feedback) >= 2 && wordCount(feedback) >= 24;
}

function sharesVisibleClinicalAnchor(feedback = '', question = {}) {
  const visible = normalizeForAudit([
    question.questionStem,
    question.stem,
    question.question,
    ...(question.compactVitals || []).flatMap((item) => [item.label, item.value]),
    ...(question.compactObjectiveData || []).flatMap((item) => [item.label, item.value]),
    ...(question.vitalSigns || []).flatMap((item) => [item.label, item.value]),
    ...(question.objectiveData || []).flatMap((item) => [item.label, item.value]),
    ...(question.laboratoryData || []).flatMap((item) => [item.label, item.value]),
    ...(question.imagingData || []).flatMap((item) => [item.label, item.value]),
    ...(question.microbiologyData || []).flatMap((item) => [item.label, item.value]),
    ...(question.pathologyData || []).flatMap((item) => [item.label, item.value]),
  ].filter(Boolean).join(' '));
  const feedbackTerms = new Set((normalizeForAudit(feedback).match(CLINICAL_ANCHOR_RE) || []).filter((term) => term.length >= 4));
  let shared = 0;
  feedbackTerms.forEach((term) => { if (visible.includes(term)) shared += 1; });
  return shared >= 1 || /bu olguda|bu hastada|olguda|hastada|verilen|kokte|kök/u.test(feedback);
}

function normalizedSimilarityKey(value = '') {
  return normalizeForAudit(value)
    .split(/\s+/u)
    .filter((word) => word.length > 3)
    .join(' ');
}

function tooSimilar(a = '', b = '') {
  const left = new Set(normalizedSimilarityKey(a).split(/\s+/u).filter(Boolean));
  const right = new Set(normalizedSimilarityKey(b).split(/\s+/u).filter(Boolean));
  if (!left.size || !right.size) return false;
  let overlap = 0;
  left.forEach((word) => { if (right.has(word)) overlap += 1; });
  return overlap / Math.min(left.size, right.size) >= 0.86;
}

function validateExplanation(question = {}) {
  const errors = [];
  const explanation = cleanText(question.explanation || '');
  if (!explanation) {
    errors.push('final-explanation-missing');
    return errors;
  }
  if (sentenceCount(explanation) < 2 || wordCount(explanation) < 28) errors.push('final-explanation-too-thin');
  if (hasBrokenTurkish(explanation)) errors.push('final-explanation-broken-turkish');
  if (hasSurfaceOnlyPhrase(explanation)) errors.push('final-explanation-surface-phrase');
  if (hasForbiddenTemplateFeedback(explanation)) errors.push('final-explanation-template-feedback');
  if (feedbackCopiesStem(explanation, question)) errors.push('final-explanation-copies-stem');
  if (hasDebugResidue(explanation)) errors.push('final-explanation-meta-residue');
  if (hasEnglishMedicalMix(explanation)) errors.push('final-explanation-english-medical-term');
  return errors;
}

function validateOptionFeedback(question = {}) {
  const errors = [];
  const feedback = question.optionFeedback || question.wrongOptionFeedback || {};
  const texts = [];
  OPTION_IDS.forEach((id) => {
    const optionText = question.options?.find((option) => option.id === id)?.text || '';
    const text = cleanText(feedback[id] || '');
    const suffix = `:${id}`;
    if (!text) {
      errors.push(`final-option-feedback-missing${suffix}`);
      return;
    }
    texts.push([id, text]);
    if (sentenceCount(text) < 2) errors.push(`final-option-feedback-needs-two-sentences${suffix}`);
    if (wordCount(text) < 24) errors.push(`final-option-feedback-too-thin${suffix}`);
    if (hasBrokenTurkish(text)) errors.push(`final-option-feedback-broken-turkish${suffix}`);
    if (hasSurfaceOnlyPhrase(text)) errors.push(`final-option-feedback-surface-phrase${suffix}`);
    if (hasForbiddenTemplateFeedback(text)) errors.push(`final-option-feedback-template${suffix}`);
    if (feedbackCopiesStem(text, question)) errors.push(`final-option-feedback-copies-stem${suffix}`);
    if (feedbackRepeatsOptionName(text, optionText)) errors.push(`final-option-feedback-option-name-repeat${suffix}`);
    if (hasDebugResidue(text)) errors.push(`final-option-feedback-meta-residue${suffix}`);
    if (hasEnglishMedicalMix(text)) errors.push(`final-option-feedback-english-medical-term${suffix}`);
    if (!optionSpecificEnough(text, optionText)) errors.push(`final-option-feedback-not-option-specific${suffix}`);
    if (id === question.correctAnswer && !sharesVisibleClinicalAnchor(text, question)) errors.push(`final-correct-feedback-not-grounded${suffix}`);
  });
  for (let i = 0; i < texts.length; i += 1) {
    for (let j = i + 1; j < texts.length; j += 1) {
      if (tooSimilar(texts[i][1], texts[j][1])) errors.push(`final-option-feedback-duplicated:${texts[i][0]}-${texts[j][0]}`);
    }
  }
  return errors;
}

function classifyFinalFeedbackErrors(errors = []) {
  const blocking = [];
  const repairable = [];
  const warnings = [];
  Array.from(new Set(errors)).forEach((error) => {
    if (/^base-blocking:/u.test(error)) blocking.push(error);
    else repairable.push(error);
  });
  return { blocking, repairable, warnings };
}

function publicBaseGate(baseGate = {}) {
  return {
    decision: baseGate.decision,
    publishable: baseGate.publishable,
    blockingErrors: baseGate.blockingErrors || [],
    repairableErrors: baseGate.repairableErrors || [],
    warnings: baseGate.warnings || [],
    cues: baseGate.cues || [],
    demand: baseGate.demand,
    version: baseGate.version,
  };
}

export function runFinalFeedbackQualityGate(rawQuestion = {}, options = {}) {
  const question = normalizeQuestionQualityFields(rawQuestion);
  const baseGate = options.skipBaseGate
    ? { blockingErrors: [], repairableErrors: [], warnings: [], decision: 'skipped', publishable: true, version: 'skipped' }
    : runQuestionQualityGate(question, { version: options.baseVersion || options.version || 'final-feedback-base-gate' });

  const errors = [
    ...baseGate.blockingErrors.map((error) => `base-blocking:${error}`),
    ...baseGate.repairableErrors.map((error) => `base-repairable:${error}`),
    ...validateExplanation(question),
    ...validateOptionFeedback(question),
    ...detectCrossTopicContamination(question).map((item) => `final-feedback-cross-topic-contamination:${item}`),
  ];
  const classified = classifyFinalFeedbackErrors(errors);
  const warnings = Array.from(new Set([...(baseGate.warnings || []), ...classified.warnings]));
  const publishErrors = [...classified.blocking, ...classified.repairable];
  const decision = classified.blocking.length
    ? 'blocked'
    : (classified.repairable.length ? 'repair_required' : 'publishable');

  return {
    ok: publishErrors.length === 0,
    publishable: publishErrors.length === 0,
    decision,
    canAttemptRepair: classified.repairable.length > 0 && classified.blocking.length === 0,
    blockingErrors: classified.blocking,
    repairableErrors: classified.repairable,
    errors: publishErrors,
    warnings,
    baseGate: publicBaseGate(baseGate),
    question,
    version: options.version || 'final-feedback-quality-gate-v1',
  };
}

function ensureTerminalPunctuation(value = '') {
  const text = cleanText(value).replace(/[\s,;:]+$/u, '');
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function stripMechanicalPrefix(value = '') {
  return cleanText(value)
    .replace(/^\s*(?:[A-E]\s*)?(?:gerekçesi|gerekce|geri bildirim|feedback)\s*[:：-]\s*/iu, '')
    .replace(/^\s*(?:doğru cevap|dogru cevap|yanlış cevap|yanlis cevap)\s*[:：-]\s*/iu, '')
    .trim();
}

function repairLanguageArtifacts(value = '') {
  let text = stripMechanicalPrefix(value);
  TURKISH_MEDICAL_REPAIRS.forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });
  return ensureTerminalPunctuation(text
    .replace(/(^|[.!?]\s+)(?:Da|De|da|de)\s+(?=\S)/gu, '$1Bu olguda ')
    .replace(/\bbu nedenle da\b/giu, 'bu nedenle')
    .replace(/\bBu nedenle da\b/gu, 'Bu nedenle')
    .replace(/\bbu nedenle ile uyumlu değildir\b/giu, 'bu nedenle bu tabloyla uyumlu değildir')
    .replace(/\bile uyumlu değildir\b/giu, 'bu tabloyla uyumlu değildir')
    .replace(/\s+/gu, ' '));
}

function repairFeedbackMap(question = {}, applied = []) {
  const feedback = { ...(question.optionFeedback || question.wrongOptionFeedback || {}) };
  OPTION_IDS.forEach((id) => {
    const original = feedback[id] || '';
    const repaired = repairLanguageArtifacts(original);
    if (repaired && repaired !== original) {
      feedback[id] = repaired;
      applied.push(`final-feedback-language:${id}`);
    }
  });
  return feedback;
}

export function repairFinalFeedbackLocally(rawQuestion = {}, gateResult = {}) {
  const question = normalizeQuestionQualityFields(rawQuestion);
  const applied = [];
  const originalExplanation = question.explanation || '';
  const repairedExplanation = repairLanguageArtifacts(originalExplanation);
  if (repairedExplanation && repairedExplanation !== originalExplanation) {
    question.explanation = repairedExplanation;
    applied.push('final-explanation-language');
  }
  const repairedFeedback = repairFeedbackMap(question, applied);
  question.optionFeedback = repairedFeedback;
  question.wrongOptionFeedback = repairedFeedback;
  question.aiMeta = {
    ...(question.aiMeta || {}),
    finalFeedbackRepair: {
      attempted: Boolean(gateResult?.repairableErrors?.length || gateResult?.warnings?.length),
      applied,
    },
  };
  return { question, applied };
}

export function applyFinalFeedbackQualityGate(rawQuestion = {}, options = {}) {
  let question = normalizeQuestionQualityFields(rawQuestion);
  let gate = runFinalFeedbackQualityGate(question, options);
  let repairApplied = [];
  if (gate.canAttemptRepair) {
    const repaired = repairFinalFeedbackLocally(question, gate);
    repairApplied = repaired.applied || [];
    if (repairApplied.length) {
      question = repaired.question;
      gate = runFinalFeedbackQualityGate(question, options);
    }
  }
  return { question, gate, repairApplied };
}
