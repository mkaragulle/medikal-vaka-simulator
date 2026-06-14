import {
  OPTIMIZED_TUS_SYSTEM_PROMPT,
  buildRecentCompact,
  buildUserPrompt,
  normalizeDifficulty,
} from '../server/prompts/tus-question-prompt.js';
import { applyCostProfileToMaxTokens, buildOutputCacheKey, buildPromptCacheConfig, buildQuestionBankKey, callOpenAIWithPromptCacheFallback, addQuestionToBank, defaultModelForScope, defaultReasoningEffortForProfile, defaultVerbosityForProfile, detailModeForProfile, envFlag, getAICostProfile, getDurableCachedOutput, getQuestionBankItems, logAIUsage, resolveModelForScope, setDurableCachedOutput, withInFlightDedupe } from '../server/lib/ai-token-optimizer.js';
import { applyFinalFeedbackQualityGate, runFinalFeedbackQualityGate } from '../server/lib/final-feedback-quality-gate.js';
import { normalizeQuestionQualityFields, repairQuestionQualityIssues, runQuestionQualityGate } from '../server/lib/question-quality-gate.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const PROMPT_VERSION = 'klinikiq-tus-v50-global-publisher-quality-gate';
const SCHEMA_VERSION = 'simple-ai-spot-v2';
const SYSTEM_PROMPT = OPTIMIZED_TUS_SYSTEM_PROMPT;
const TASK_NAME = 'tusSpotQuestion';

function currentTusModel() {
  return resolveModelForScope('TUS');
}

function useQuestionBank() {
  return envFlag('KLINIKIQ_AI_QUESTION_BANK', true);
}

const LEGACY_BLOCKING_REVIEW_CODES = new Set([
  'unsupported_post_answer_data',
  'stem_correct_answer_conflict',
  'stem_contains_question_fragment',
  'answer_leak_in_pre_answer_text',
  'truncated_or_broken_text',
]);

function legacyBlockingReviewIssues(question = {}) {
  const issues = Array.isArray(question.aiMeta?.globalQualityReview?.issues)
    ? question.aiMeta.globalQualityReview.issues
    : [];
  return issues.filter((issue) => issue?.severity === 'reject' && LEGACY_BLOCKING_REVIEW_CODES.has(issue.code));
}

function legacyHardBlockingValidationErrors(errors = []) {
  return errors.filter((message) =>
    /branch eksik|stem eksik|question net soru cümlesi değil|tam 5 seçenek yok|correctAnswer A-E değil|correctAnswer seçeneklerle eşleşmiyor|imkansız veya bozuk klinik değer/iu.test(message)
  );
}

function classifyTusValidationError(message = '') {
  const text = normalize(message);
  const raw = String(message || '');
  let stage = 'legacy_validation';
  let severity = 'warning';
  let action = 'allow_with_note';

  if (/bos cikti|bo[sÅ] cikti|output token|token limit|max output|max tokens|incomplete|json|parse|invalid json|schema repair|model-json/.test(text)) {
    stage = 'json_schema_or_token_output';
    severity = 'repairable';
    action = 'repair_or_regenerate_with_more_output_budget';
  } else if (/branch|stem eksik|question net|tam 5|se[cÃ§]enek yok|correctanswer|options-not-five|correct-answer-id-invalid|correct-answer-text-missing/.test(text)) {
    stage = 'schema';
    severity = /branch eksik|stem eksik|correctanswer/.test(text) ? 'blocking' : 'repairable';
    action = severity === 'blocking' ? 'regenerate' : 'repair_schema';
  } else if (/imkans|bozuk klinik de[gÄ]er|clinical value|medical contradiction|stem correct answer conflict|celiski|conflict/.test(text)) {
    stage = 'scientific_accuracy';
    severity = 'blocking';
    action = 'regenerate';
  } else if (/unsupported|grounding|kritik|stemde|kanit zinciri|evidence|post answer data/.test(text)) {
    stage = 'medical_grounding';
    severity = /unsupported|global quality reject|reject/.test(text) ? 'blocking' : 'repairable';
    action = severity === 'blocking' ? 'regenerate' : 'repair';
  } else if (/answer leak|dogru cevabi ele|cevabi fazla ele|objective direction/.test(text)) {
    stage = 'answer_leak';
    severity = 'blocking';
    action = 'regenerate';
  } else if (/bozuk turk|makine|ceviri|tus ipucu|broken ending|orphan connector|truncated|kesik|uc nokta/.test(text)) {
    stage = 'tus_language';
    severity = 'repairable';
    action = 'repair';
  } else if (/feedback|explanation|exampearl|jenerik|yasak|placeholder|surface/.test(text)) {
    stage = 'feedback_quality';
    severity = 'repairable';
    action = 'repair';
  } else if (/yakin|gecmis|ayn|duplicate|tekrar|option set|se[cÃ§]enek seti|ogrenme hedefi|soru kok/.test(text)) {
    stage = 'repeat_control';
    severity = 'repairable';
    action = 'regenerate_different_pattern';
  } else if (/stem sufficiency|soru kokunde|klinik olgu yetersiz|gorunur klinik patern|critical data|kavram/.test(text)) {
    stage = 'stem_quality';
    severity = 'repairable';
    action = 'regenerate_richer_stem';
  } else if (/se[cÃ§]enekler ayn|kavramsal kategori|option axis|distractor/.test(text)) {
    stage = 'option_architecture';
    severity = 'repairable';
    action = 'regenerate_options';
  } else if (/global-quality:reject:/u.test(raw)) {
    stage = 'global_quality_review';
    severity = 'blocking';
    action = 'regenerate';
  }

  return { message: raw, stage, severity, action };
}

export function classifyTusValidationErrors(errors = []) {
  const issues = Array.from(new Set(asArray(errors).filter(Boolean))).map(classifyTusValidationError);
  return {
    issues,
    blockingErrors: issues.filter((issue) => issue.severity === 'blocking').map((issue) => issue.message),
    repairableErrors: issues.filter((issue) => issue.severity === 'repairable').map((issue) => issue.message),
    warnings: issues.filter((issue) => issue.severity === 'warning').map((issue) => issue.message),
    stages: issues.reduce((acc, issue) => {
      acc[issue.stage] = acc[issue.stage] || { warning: 0, repairable: 0, blocking: 0 };
      acc[issue.stage][issue.severity] += 1;
      return acc;
    }, {}),
  };
}

function logQuestionGenerationGate(context = {}) {
  console.warn(JSON.stringify({
    event: 'ai-question-generation-gate',
    at: new Date().toISOString(),
    ...context,
  }));
}

function buildRetryQualityFeedback(failure = {}) {
  const issues = asArray(failure.issues).length
    ? failure.issues
    : classifyTusValidationErrors(failure.validationErrors || [failure.message].filter(Boolean)).issues;
  const stageSummary = issues
    .map((issue) => `${issue.stage}/${issue.severity}: ${issue.message}`)
    .slice(0, 8)
    .join(' | ');
  if (!stageSummary) return cleanText(failure.message || '');
  return [
    `Hata seviyesi: ${failure.severity || 'repairable'}.`,
    `Takilan asamalar: ${stageSummary}.`,
    'Repairable hatalarda ayni soru iskeletini yuzeysel savunma; kok, secenek feedbacki veya dil sorununu hedefli duzelt. Repeat-control hatasinda ayni hedefi farkli klinik patern, farkli ayirt ettirici veri ve farkli distractor duzlemiyle yeniden kur.',
  ].join(' ');
}

function buildFinalUserFailureReason(failureDetails = []) {
  const allText = normalize(asArray(failureDetails).flatMap((failure) => [
    failure.message,
    ...(failure.validationErrors || []),
    ...(failure.issues || []).map((issue) => issue.message),
  ]).filter(Boolean).join(' | '));
  if (/explanation may support other option|cift dogru|iki secenek|multiple correct|ayni derecede/.test(allText)) {
    return 'Çift doğru seçenek riski giderilemedi.';
  }
  if (/stem correct answer conflict|kok.*cevap|cevap.*celis|conflict/.test(allText)) {
    return 'Kök ile doğru cevap arasındaki çelişki güvenli biçimde çözülemedi.';
  }
  if (/correctanswer|correct answer|dogru cevap|correct-option|answer key|cevap guvenli/.test(allText)) {
    return 'Doğru cevap güvenli belirlenemedi.';
  }
  if (/scientific|medical contradiction|imkans|bozuk klinik deger|tibbi|unsafe/.test(allText)) {
    return 'Güvenli tıbbi içerik oluşturulamadı.';
  }
  if (/json|parse|schema|token|output|incomplete/.test(allText)) {
    return 'Model çıktısı geçerli ve eksiksiz soru şemasına dönüştürülemedi.';
  }
  if (/feedback|explanation|tus language|turk|dil|repair/.test(allText)) {
    return 'Açıklama ve seçenek feedbackleri kalite standardına güvenli biçimde tamamlanamadı.';
  }
  return 'Güvenli ve tek doğru cevaplı soru oluşturulamadı.';
}

function summarizeQualityFailure({ gate, legacyBlocking = [], validationBlocking = [] } = {}) {
  return [
    ...(gate?.blockingErrors || []),
    ...(gate?.repairableErrors || []),
    ...legacyBlocking.map((issue) => `${issue.code}: ${issue.message || ''}`.trim()),
    ...validationBlocking,
  ].filter(Boolean);
}

function logFallbackTrigger(context = {}) {
  const payload = {
    event: 'ai-safe-fallback-trigger',
    at: new Date().toISOString(),
    ...context,
  };
  console.warn(JSON.stringify(payload));
}


const ALLOWED_BRANCHES = [
  'İç Hastalıkları',
  'Çocuk Sağlığı ve Hastalıkları',
  'Genel Cerrahi',
  'Kadın Hastalıkları ve Doğum',
  'Nöroloji',
  'Kardiyoloji',
  'Tıbbi Mikrobiyoloji',
  'Tıbbi Farmakoloji',
  'Acil Tıp',
  'Romatoloji',
  'Göğüs Hastalıkları',
  'Ortopedi',
  'Anatomi',
  'Histoloji ve Embriyoloji',
  'Tıbbi Biyokimya',
  'Tıbbi Patoloji',
];


function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

function parseJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 600_000) {
        reject(new Error('Request body too large'));
        request.destroy();
      }
    });
    request.on('end', () => {
      if (!body) return resolve({});
      try { return resolve(JSON.parse(body)); } catch (error) { return reject(error); }
    });
    request.on('error', reject);
  });
}

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?:\.\.\.|…)+/g, '')
    .trim();
}

function ensureSentence(value = '') {
  const text = cleanGeneratedText(value).replace(/[\s,;:]+$/u, '');
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function ensureQuestion(value = '') {
  const text = cleanGeneratedText(value).replace(/[\s,;:.]+$/u, '');
  if (!text) return 'Bu olguda en uygun seçenek hangisidir?';
  return /\?$/u.test(text) ? text : `${text}?`;
}

function normalize(value = '') {
  return cleanText(value)
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/[âîû]/g, (match) => ({ â: 'a', î: 'i', û: 'u' }[match] || match))
    .replace(/[^a-z0-9çğıöşü\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}


function normalizeMedicalTurkishLanguage(value = '') {
  return String(value ?? '')
    .replace(/\bçocuklık\b/giu, 'çocukluk')
    .replace(/\barthraljia\b/giu, 'artralji')
    .replace(/\barthralji\b/giu, 'artralji')
    .replace(/\bplatelet\b/giu, 'trombosit')
    .replace(/\bhematuri\b/giu, 'hematüri')
    .replace(/\bproteinuri\b/giu, 'proteinüri')
    .replace(/\bpurpurasi\b/giu, 'purpurası')
    .replace(/\bkoagulasyon\b/giu, 'koagülasyon')
    .replace(/\blökosit\s+sayisi\b/giu, 'lökosit sayısı')
    .replace(/\btrombosit\s+sayisi\b/giu, 'trombosit sayısı')
    .replace(/\bProteinüri\b/gu, 'proteinüri')
    .replace(/\bHematuri\b/gu, 'hematüri');
}

function stableHash(value = '') {
  const text = normalize(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `q${(hash >>> 0).toString(36)}`;
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function repairTurkishConnectorArtifacts(value = '') {
  return cleanText(value)
    // Model/token repair can occasionally leave a sentence starting with a bare Turkish clitic: "Da/De ...".
    // Keep the medical content, but turn the orphan connector into a natural clinical reference.
    .replace(/(^|[.!?]\s+)(?:Da|De)\s+(?=[a-zçğıöşü0-9%/>])/gu, '$1Bu olguda ')
    .replace(/(^|[.!?]\s+)(?:da|de)\s+(?=[a-zçğıöşü0-9%/>])/gu, '$1Bu olguda ')
    .replace(/\b(?:Da|De|da|de)\s+(?=renin\/aldosteron\b)/gu, 'Bu olguda ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanGeneratedText(value = '') {
  return normalizeMedicalTurkishLanguage(repairTurkishConnectorArtifacts(value))
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .trim();
}

function splitSentencesSafe(value = '') {
  const protectedText = cleanGeneratedText(value)
    .replace(/(\d)\.\s?(\d)/g, '$1§DOT§$2')
    .replace(/\b(Dr|Prof|Doç|Doç\.|vs|vb)\.\s+/giu, (m) => m.replace('.', '§DOT§'));
  const parts = protectedText.match(/[^.!?]+[.!?]?/g) || [protectedText];
  return parts.map((part) => part.replace(/§DOT§/g, '.').trim()).filter(Boolean);
}

function isQuestionLikeStemFragment(value = '') {
  const text = cleanGeneratedText(value);
  const n = normalize(text);
  if (!text) return false;
  const hasDecisionCue = /\b(?:hangi|hangisidir|hangisi|nedir|en uygun|en olasi|en duyarlı|ilk|sonraki|kesin tani|tanisal|laboratuvar|test|tetkik|inceleme|yaklasim|tedavi|mudahale|mekanizma|komplikasyon)\b/u.test(n);
  const hasCaseCue = /\b(?:bu olguda|bu hastada|bu bebekte|bu cocukta|bu prezentasyonda|bu tabloda|asagidakilerden)\b/u.test(n);
  if (hasCaseCue && hasDecisionCue) return true;
  if (/\?$/.test(text) && hasDecisionCue) return true;
  if (/\b(?:yapilmasi gereken|yapılması gereken|istenmesi gereken|bakılması gereken|secilmesi gereken|seçilmesi gereken)\.?$/iu.test(text)) return true;
  if (/\b(?:en duyarlı|en duyarli|en spesifik|ilk yapılması gereken|ilk yapilmasi gereken)[^.?!]{0,80}\.?$/iu.test(text) && hasCaseCue) return true;
  return false;
}

function stemHasQuestionFragment(value = '') {
  return splitSentencesSafe(value).some(isQuestionLikeStemFragment);
}

function stripQuestionLikeTailFromStem(stem = '', question = '') {
  const sentences = splitSentencesSafe(stem);
  if (!sentences.length) return '';
  const kept = [];
  sentences.forEach((sentence, index) => {
    const isLast = index === sentences.length - 1;
    if (isLast && isQuestionLikeStemFragment(sentence)) return;
    kept.push(sentence);
  });
  let output = kept.join(' ').trim();
  if (!output && cleanGeneratedText(question)) output = sentences.filter((sentence) => !isQuestionLikeStemFragment(sentence)).join(' ').trim();
  return output || cleanGeneratedText(stem);
}

function isGenericQuestion(value = '') {
  const n = normalize(value);
  return !n || /^(bu olguda|bu hastada)?\s*(en uygun secenek|tek en iyi yanit|en uygun yanit)\s+hangisidir$/.test(n);
}

function cleanStemQuestionPair(stem = '', question = '') {
  const rawStem = cleanGeneratedText(stem);
  let rawQuestion = cleanGeneratedText(question);
  const sentences = splitSentencesSafe(rawStem);
  const last = sentences[sentences.length - 1] || '';
  if (isQuestionLikeStemFragment(last)) {
    if (isGenericQuestion(rawQuestion) && /\?$/u.test(last) && /hangi|hangisidir|nedir/iu.test(last)) {
      rawQuestion = last;
    }
    return { stem: stripQuestionLikeTailFromStem(rawStem, rawQuestion), question: rawQuestion };
  }
  return { stem: rawStem, question: rawQuestion };
}

function chooseBranch(branchFilter = 'random') {
  const raw = String(branchFilter || 'random').trim();
  if (!raw || ['random', 'rastgele', 'Rastgele'].includes(raw)) {
    return ALLOWED_BRANCHES[Math.floor(Math.random() * ALLOWED_BRANCHES.length)];
  }
  return raw;
}

function normalizeOptions(rawOptions = []) {
  const arr = Array.isArray(rawOptions) ? rawOptions : [];
  return OPTION_IDS.map((id, index) => {
    const source = arr.find((item) => String(item?.id || '').toUpperCase() === id) ?? arr[index];
    const text = cleanText(typeof source === 'string' ? source : source?.text || source?.label || '');
    return { id, text };
  }).filter((item) => item.text);
}

function compactItems(items = [], _max = Number.POSITIVE_INFINITY) {
  const seen = new Set();
  const out = [];
  asArray(items).forEach((item) => {
    const label = cleanText(typeof item === 'string' ? item.split(/[:：]/u)[0] : item?.label || item?.name || item?.parameter || item?.title || '');
    const value = cleanText(typeof item === 'string' ? item.split(/[:：]/u).slice(1).join(':') : item?.value || item?.result || item?.text || '');
    if (!label || !value) return;
    const key = normalize(`${label} ${value}`);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ label, value });
  });
  return out;
}

function makeSignature(question = {}) {
  const options = normalizeOptions(question.options).map((item) => item.text).sort().join(' | ');
  const correct = normalizeOptions(question.options).find((item) => item.id === String(question.correctAnswer || '').toUpperCase())?.text || '';
  return `simple-${stableHash([
    question.relatedBranch,
    question.learningTarget,
    question.stem,
    question.question,
    correct,
    options,
  ].filter(Boolean).join(' :: '))}`;
}

function getCorrectText(question = {}) {
  const options = normalizeOptions(question.options);
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  return options.find((item) => item.id === correctId)?.text || '';
}


function containsAnswerLeak(text = '', correct = '') {
  const value = normalize(text);
  const answer = normalize(correct);
  if (!value || !answer || answer.length < 5) return false;
  if (value.includes(answer)) return true;
  const answerWords = answer.split(/\s+/u).filter((word) => word.length >= 4);
  if (answerWords.length >= 2) {
    const hits = answerWords.filter((word) => value.includes(word)).length;
    return hits >= Math.ceil(answerWords.length * 0.8);
  }
  return false;
}

function getPreAnswerDataText(question = {}) {
  return [
    question.stem,
    question.question,
    ...compactItems(question.compactVitals || question.vitals || [], 5).flatMap((item) => [item.label, item.value]),
    ...compactItems(question.compactObjectiveData || question.objectiveData || [], 8).flatMap((item) => [item.label, item.value]),
  ].filter(Boolean).join(' | ');
}


function getPostAnswerReasoningText(question = {}) {
  return [
    question.explanation,
    question.examPearl,
    ...asArray(question.evidenceChain),
    ...Object.values(question.wrongOptionFeedback || question.optionFeedback || question.optionRationales || {}),
    ...asArray(question.managementSteps),
  ].filter(Boolean).join(' | ');
}

const STEM_GROUNDING_RULES = [
  {
    id: 'trombosit-sayisi',
    visible: /\b(?:trombosit|plt|platelet|trombositopeni)\b/iu,
    claim: /\b(?:trombosit|plt|platelet|trombositopeni)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:trombosit|plt|platelet)[^.?!]{0,70}(?:normal|normaldir|normal sınırlarda|normal sinir|korunmuş|korunmustur|düşük değil|dusuk degil)|(?:normal|korunmuş|korunmus)[^.?!]{0,40}(?:trombosit|plt|platelet)/iu.test(text)) return 'Tam kan sayımında trombosit sayısı normaldir.';
      if (/(?:trombositopeni|(?:trombosit|plt|platelet)[^.?!]{0,60}(?:düşük|dusuk|azalmış|azalmis))/iu.test(text)) return 'Tam kan sayımında trombosit sayısı düşüktür.';
      return '';
    },
  },
  {
    id: 'koagulasyon-testleri',
    visible: /\b(?:pt|aPTT|aptt|inr|koagülasyon|koagulasyon|pıhtılaşma|pihtilasma)\b/iu,
    claim: /\b(?:pt|aPTT|aptt|inr|koagülasyon|koagulasyon|pıhtılaşma|pihtilasma)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:pt|aPTT|aptt|inr|koagülasyon|koagulasyon|pıhtılaşma|pihtilasma)[^.?!]{0,80}(?:normal|normaldir|normal sınırlarda|bozuk değil|bozuk degil)|(?:normal|bozuk değildir|bozuk degildir)[^.?!]{0,50}(?:pt|aPTT|aptt|inr|koagülasyon|koagulasyon)/iu.test(text)) return 'PT ve aPTT normal sınırlardadır.';
      if (/(?:pt|aPTT|aptt|inr|koagülasyon|koagulasyon)[^.?!]{0,80}(?:uzamış|uzamis|yüksek|yuksek|bozuk)/iu.test(text)) return 'Koagülasyon testlerinde bozulma vardır.';
      return '';
    },
  },
  {
    id: 'lokosit-crp',
    visible: /\b(?:lökosit|lokosit|wbc|crp|sedimentasyon|esr)\b/iu,
    claim: /\b(?:lökosit|lokosit|wbc|crp|sedimentasyon|esr)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:lökosit|lokosit|wbc|crp|sedimentasyon|esr)[^.?!]{0,90}(?:normal|belirgin yüksek değil|belirgin yuksek degil|yüksek değildir|yuksek degildir)|(?:normal|belirgin yüksek değildir|belirgin yuksek degildir)[^.?!]{0,60}(?:lökosit|lokosit|wbc|crp)/iu.test(text)) return 'Lökosit sayısı ve CRP belirgin yüksek değildir.';
      if (/(?:lökosit|lokosit|wbc|crp|sedimentasyon|esr)[^.?!]{0,90}(?:yüksek|yuksek|artmış|artmis|lökositoz|lokositoz)/iu.test(text)) return 'Laboratuvarda inflamasyon/enfeksiyon belirteçleri yüksektir.';
      return '';
    },
  },
  {
    id: 'renal-fonksiyon',
    visible: /\b(?:kreatinin|üre|ure|bun|böbrek fonksiyon|bobrek fonksiyon)\b/iu,
    claim: /\b(?:kreatinin|üre|ure|bun|böbrek fonksiyon|bobrek fonksiyon)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:kreatinin|üre|ure|bun|böbrek fonksiyon|bobrek fonksiyon)[^.?!]{0,80}(?:normal|korunmuş|korunmus|bozuk değil|bozuk degil)/iu.test(text)) return 'Böbrek fonksiyon testleri normaldir.';
      if (/(?:kreatinin|üre|ure|bun)[^.?!]{0,80}(?:yüksek|yuksek|artmış|artmis)|(?:böbrek|bobrek)[^.?!]{0,50}(?:yetmezlik|bozuk)/iu.test(text)) return 'Böbrek fonksiyon testlerinde bozulma vardır.';
      return '';
    },
  },
  {
    id: 'idrar-bulgusu',
    visible: /\b(?:idrar|hematüri|hematuri|proteinüri|proteinuri|piyüri|piyuri|lökositüri|lokositurı|silendir)\b/iu,
    claim: /\b(?:idrar|hematüri|hematuri|proteinüri|proteinuri|piyüri|piyuri|lökositüri|silendir)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:hematüri|hematuri|proteinüri|proteinuri|piyüri|piyuri|lökositüri|silendir)[^.?!]{0,70}(?:yok|saptanmaz|negatif|eşlik etmez|eslik etmez)/iu.test(text)) return 'İdrar incelemesinde belirgin hematüri veya proteinüri saptanmaz.';
      if (/(?:hematüri|hematuri|proteinüri|proteinuri|piyüri|piyuri|lökositüri|silendir)[^.?!]{0,70}(?:var|saptanır|saptanir|pozitif|eşlik eder|eslik eder)/iu.test(text)) return 'İdrar incelemesinde patolojik bulgu saptanır.';
      return '';
    },
  },
  {
    id: 'ates',
    visible: /\b(?:ateş|ates|febril|afebril|sıcaklık|sicaklik|°c)\b/iu,
    claim: /\b(?:ateş|ates|febril|afebril)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:ateş|ates)[^.?!]{0,45}(?:yok|yoktur|saptanmaz)|\bafebril\b/iu.test(text)) return 'Ateşi yoktur.';
      if (/(?:ateş|ates|febril)[^.?!]{0,45}(?:var|yüksek|yuksek|saptanır|saptanir)/iu.test(text)) return 'Ateşi vardır.';
      return '';
    },
  },
  {
    id: 'hemodinami',
    visible: /\b(?:kan basıncı|kan basinci|tansiyon|hipotansiyon|hemodinamik|şok|sok|kapiller dolum)\b/iu,
    claim: /\b(?:hipotansiyon|hemodinamik|şok|sok|stabil|kapiller dolum)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:hipotansiyon|şok|sok)[^.?!]{0,55}(?:yok|saptanmaz|eşlik etmez|eslik etmez)|hemodinamik[^.?!]{0,40}stabil|genel durum[^.?!]{0,50}stabil/iu.test(text)) return 'Kan basıncı yaşına göre normaldir ve hemodinamik olarak stabildir.';
      if (/(?:hipotansiyon|şok|sok|kapiller dolum)[^.?!]{0,60}(?:var|uzamış|uzamis|bozuk|saptanır|saptanir)/iu.test(text)) return 'Perfüzyon bulgularında bozulma vardır.';
      return '';
    },
  },
  {
    id: 'hipoksi',
    visible: /\b(?:spo2|spo₂|satürasyon|saturasyon|hipoksi|oksijen)\b/iu,
    claim: /\b(?:spo2|spo₂|satürasyon|saturasyon|hipoksi)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:hipoksi)[^.?!]{0,45}(?:yok|saptanmaz)|(?:spo2|spo₂|satürasyon|saturasyon)[^.?!]{0,60}(?:normal|korunmuş|korunmus)/iu.test(text)) return 'Oksijen satürasyonu normal sınırlardadır.';
      if (/(?:hipoksi)[^.?!]{0,45}(?:var|saptanır)|(?:spo2|spo₂|satürasyon|saturasyon)[^.?!]{0,60}(?:düşük|dusuk|azalmış|azalmis)/iu.test(text)) return 'Oksijen satürasyonu düşüktür.';
      return '';
    },
  },
  {
    id: 'toksik-gorunum',
    visible: /\b(?:toksik|genel durumu|letarji|bilinç|bilinc)\b/iu,
    claim: /\b(?:toksik|genel durumu|letarji|bilinç|bilinc)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:toksik)[^.?!]{0,40}(?:değil|degil|görünüm yok|gorunum yok)|genel durumu[^.?!]{0,40}stabil/iu.test(text)) return 'Genel durumu stabildir ve toksik görünümde değildir.';
      if (/(?:toksik|letarji|bilinç|bilinc)[^.?!]{0,60}(?:var|bozuk|kötü|kotu|azalma|değişikliği|degisikligi)/iu.test(text)) return 'Genel durumunda bozulma vardır.';
      return '';
    },
  },
  {
    id: 'meningeal-bulgu',
    visible: /\b(?:ense sertliği|ense sertligi|meningeal|kernig|brudzinski)\b/iu,
    claim: /\b(?:ense sertliği|ense sertligi|meningeal|kernig|brudzinski)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:ense sertliği|ense sertligi|meningeal)[^.?!]{0,60}(?:yok|negatif|saptanmaz)/iu.test(text)) return 'Meningeal irritasyon bulgusu yoktur.';
      if (/(?:ense sertliği|ense sertligi|meningeal)[^.?!]{0,60}(?:var|pozitif|saptanır|saptanir)/iu.test(text)) return 'Meningeal irritasyon bulgusu vardır.';
      return '';
    },
  },
  {
    id: 'organomegali',
    visible: /\b(?:hepatomegali|splenomegali|hepatosplenomegali|organomegali)\b/iu,
    claim: /\b(?:hepatomegali|splenomegali|hepatosplenomegali|organomegali)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:hepatomegali|splenomegali|hepatosplenomegali|organomegali)[^.?!]{0,60}(?:yok|saptanmaz|eşlik etmez|eslik etmez)/iu.test(text)) return 'Hepatosplenomegali saptanmaz.';
      if (/(?:hepatomegali|splenomegali|hepatosplenomegali|organomegali)[^.?!]{0,60}(?:var|saptanır|saptanir|eşlik eder|eslik eder)/iu.test(text)) return 'Hepatosplenomegali saptanır.';
      return '';
    },
  },
  {
    id: 'norolojik-defisit',
    visible: /\b(?:nörolojik|norolojik|fokal defisit|parezi|duyu kaybı|duyu kaybi|konfüzyon|konfuzyon)\b/iu,
    claim: /\b(?:nörolojik|norolojik|fokal defisit|parezi|duyu kaybı|duyu kaybi|konfüzyon|konfuzyon)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:nörolojik|norolojik|fokal defisit)[^.?!]{0,60}(?:yok|saptanmaz|eşlik etmez|eslik etmez)/iu.test(text)) return 'Fokal nörolojik defisit saptanmaz.';
      if (/(?:nörolojik|norolojik|fokal defisit|parezi|duyu kaybı|duyu kaybi)[^.?!]{0,60}(?:var|saptanır|saptanir|eşlik eder|eslik eder)/iu.test(text)) return 'Fokal nörolojik bulgu saptanır.';
      return '';
    },
  },
  {
    id: 'goruntuleme-bulgusu',
    visible: /\b(?:grafi|akciğer grafisi|akciger grafisi|bt|mrg|mr|usg|ultrason|tomografi|görüntüleme|goruntuleme)\b/iu,
    claim: /\b(?:grafi|akciğer grafisi|akciger grafisi|bt|mrg|mr|usg|ultrason|tomografi|görüntüleme|goruntuleme)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:grafi|bt|mrg|mr|usg|ultrason|tomografi|görüntüleme|goruntuleme)[^.?!]{0,90}(?:normal|patoloji yok|belirgin patoloji izlenmez|özellik saptanmaz|ozellik saptanmaz)/iu.test(text)) return 'Görüntülemede belirgin ek patoloji izlenmez.';
      return '';
    },
  },
  {
    id: 'mikrobiyoloji-patoloji',
    visible: /\b(?:kültür|kultur|pcr|boyama|gram|biyopsi|histoloji|immünohistokimya|immunohistokimya|ihk|patoloji)\b/iu,
    claim: /\b(?:kültür|kultur|pcr|boyama|gram|biyopsi|histoloji|immünohistokimya|immunohistokimya|ihk|patoloji)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:kültür|kultur|pcr|boyama|gram)[^.?!]{0,80}(?:negatif|üreme yok|ureme yok|saptanmaz)/iu.test(text)) return 'Mikrobiyolojik incelemede etken gösterilemez.';
      return '';
    },
  },
  {
    id: 'oyku-risk-faktoru',
    visible: /\b(?:immünsüpresyon|immunosupresyon|ilaç|ilac|seyahat|travma|temas|aşı|asi|antibiyotik|steroid|antikoagülan|antikoagulan)\b/iu,
    claim: /\b(?:immünsüpresyon|immunosupresyon|ilaç|ilac|seyahat|travma|temas|aşı|asi|antibiyotik|steroid|antikoagülan|antikoagulan)\b/iu,
    sentence(post) {
      const text = cleanText(post);
      if (/(?:immünsüpresyon|immunosupresyon|seyahat|travma|temas|ilaç|ilac|antibiyotik|steroid|antikoagülan|antikoagulan)[^.?!]{0,80}(?:yok|saptanmaz|kullanmıyor|kullanmiyor|öyküsü yok|oykusu yok)/iu.test(text)) return 'Öyküde belirgin ilaç kullanımı, immünsüpresyon, seyahat, travma veya enfeksiyon teması bildirilmez.';
      return '';
    },
  },
];

function appendUniqueStemSentence(stem = '', sentence = '') {
  const base = ensureSentence(stem);
  const cleanSentence = ensureSentence(sentence);
  if (!cleanSentence) return base;
  if (normalize(base).includes(normalize(cleanSentence).slice(0, 36))) return base;
  return [base, cleanSentence].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}

function groundingVisibleText(question = {}) {
  return normalize([
    question.demographics,
    question.setting,
    question.chiefComplaint,
    question.stem,
    question.question,
    ...compactItems(question.compactVitals || question.vitals || [], 8).flatMap((item) => [item.label, item.value]),
    ...compactItems(question.compactObjectiveData || question.objectiveData || [], 12).flatMap((item) => [item.label, item.value]),
  ].filter(Boolean).join(' | '));
}


function hasPatientSpecificCriticalClaim(post = '', claimPattern = null) {
  const text = cleanGeneratedText(post);
  if (!text || !claimPattern?.test?.(text)) return false;
  const sentences = splitSentencesSafe(text).filter((sentence) => claimPattern.test(sentence));
  if (!sentences.length) return false;
  return sentences.some((sentence) => {
    const n = normalize(sentence);
    const patientCue = /\b(?:bu olgu|bu hasta|bu bebek|bu çocuk|bu cocuk|bu vakada|olguda|hastada|bebekte|çocukta|cocukta|burada|verilen|mevcut olgu|klinikte|muayenede|laboratuvarda|tetkikte|incelemede|sonuçlarda|sonuclarda|kök|kok)\b/u.test(n);
    const resultCue = /\b(?:normal|düşük|dusuk|yüksek|yuksek|artmış|artmis|azalmış|azalmis|pozitif|negatif|saptanır|saptanir|saptanmaz|yok|var|izlenir|izlenmez|gösterir|gosterir|mevcut|eşlik eder|eslik eder|eşlik etmez|eslik etmez)\b/u.test(n);
    const generalDiseaseCue = /\b(?:de|da|inde|ında|tipik|beklenir|görülür|gorulur|olabilir|genellikle|klasik olarak)\b/u.test(n) && !patientCue;
    return patientCue || (resultCue && !generalDiseaseCue);
  });
}

function applyStemDataGrounding(question = {}) {
  const repaired = { ...question };
  let visible = groundingVisibleText(repaired);
  const post = cleanGeneratedText(getPostAnswerReasoningText(repaired));
  const added = [];
  for (const rule of STEM_GROUNDING_RULES) {
    if (!hasPatientSpecificCriticalClaim(post, rule.claim)) continue;
    if (rule.visible.test(visible)) continue;
    const sentence = cleanGeneratedText(rule.sentence(post));
    if (!sentence) continue;
    repaired.stem = appendUniqueStemSentence(repaired.stem, sentence);
    added.push(rule.id);
    visible = groundingVisibleText(repaired);
  }
  if (added.length) {
    repaired.aiMeta = { ...(repaired.aiMeta || {}), groundedStemAdditions: Array.from(new Set([...(repaired.aiMeta?.groundedStemAdditions || []), ...added])) };
  }
  return repaired;
}

function findUnsupportedCriticalDataClaims(question = {}) {
  const visible = groundingVisibleText(question);
  const post = cleanGeneratedText(getPostAnswerReasoningText(question));
  const unsupported = [];
  for (const rule of STEM_GROUNDING_RULES) {
    if (!hasPatientSpecificCriticalClaim(post, rule.claim)) continue;
    if (rule.visible.test(visible)) continue;
    if (cleanGeneratedText(rule.sentence(post))) continue;
    unsupported.push(rule.id);
  }
  return Array.from(new Set(unsupported));
}


function questionDemandLevel(question = {}) {
  const text = normalize([question.question, question.answerTarget, question.learningTarget].filter(Boolean).join(' '));
  if (/ilk|oncelikli|acil|tedavi|mudahale|yaklasim|yonetim|profilaksi|kesin tani|dogrulama|confirm|definitif/.test(text)) return 'high';
  if (/tani|olasi|mekanizma|komplikasyon|lokalizasyon|yorum/.test(text)) return 'standard';
  return 'standard';
}

function stemDecisionSupportSignals(question = {}) {
  const visible = normalize(getPreAnswerDataText(question));
  const signals = [];
  if (/\b(?:yas|yaş|gunluk|günlük|haftalik|haftalık|aylik|aylık|erkek|kadin|kadın|bebek|cocuk|çocuk|ergen|eriskin|erişkin|gebe|gebelik|yenidogan|yenidoğan)\b/.test(visible)) signals.push('profile');
  if (/\b(?:saat|gun|gün|hafta|ay|yil|yıl|son|akut|kronik|tekrarlayan|ilerleyen|baslayan|başlayan|azalan|artan)\b/.test(visible)) signals.push('timeCourse');
  if (/\b(?:ates|ateş|agri|ağrı|kusma|ishal|kanama|dokuntu|döküntü|dispne|öksürük|oksuruk|senkop|nobet|nöbet|sarilik|sarılık|halsizlik|bilinc|bilinç)\b/.test(visible)) signals.push('symptoms');
  if (/\b(?:muayene|hassasiyet|sertlik|defisit|purpura|ödem|odem|artralji|hepatomegali|splenomegali|meningeal|solunum sesi|üfürüm|ufurum|klitoris|genital|turgor)\b/.test(visible)) signals.push('exam');
  if (/\b(?:nabiz|nabız|kan basinci|kan basıncı|tansiyon|spo2|spo₂|satürasyon|saturasyon|ateşi|atesi|\d+\s*°c|hipotansiyon|taşikardi|tasikardi)\b/.test(visible)) signals.push('vitals');
  if (/\b(?:trombosit|plt|lökosit|lokosit|hb|hemoglobin|crp|esr|sedimentasyon|kreatinin|sodyum|potasyum|glukoz|ph|hco3|laktat|amonyak|idrar|hematüri|hematuri|proteinüri|proteinuri|pt|aptt|inr|17\s*-?ohp|troponin)\b/.test(visible)) signals.push('lab');
  if (/\b(?:grafi|bt|mrg|mr|usg|ultrason|ekg|eko|tomografi|görüntüleme|goruntuleme|biyopsi|kültür|kultur|pcr|boyama)\b/.test(visible)) signals.push('objectiveTest');
  if (/\b(?:ilaç|ilac|steroid|antibiyotik|travma|seyahat|temas|aşı|asi|immünsüpresyon|immunosupresyon|aile öyküsü|aile oykusu)\b/.test(visible)) signals.push('riskContext');
  return Array.from(new Set(signals));
}

function detectOverconfidentClinicalLanguage(value = '') {
  const text = cleanGeneratedText(value);
  if (!text) return false;
  return /\b(?:asla|kesinlikle|hiçbir zaman|hicbir zaman|tamamen dışlanır|tamamen dislanir|mutlaka|daima)\b/iu.test(text);
}

function assessOptionCategoryConsistency(question = {}) {
  const options = normalizeOptions(question.options);
  const categories = options.map((option) => optionCategory(option.text));
  const meaningful = categories.filter((category) => category !== 'other');
  if (options.length !== 5) return { ok: false, detail: 'beş seçenek yok' };
  if (!meaningful.length) return { ok: true, detail: 'kategori çıkarılamadı' };
  const counts = meaningful.reduce((acc, category) => ({ ...acc, [category]: (acc[category] || 0) + 1 }), {});
  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const offAxis = meaningful.length - (dominant?.[1] || 0);
  return { ok: offAxis <= 1, detail: `dominant=${dominant?.[0] || 'other'} offAxis=${offAxis}` };
}

function assessGlobalTusQuestionQuality(question = {}) {
  const issues = [];
  const signals = stemDecisionSupportSignals(question);
  const demand = questionDemandLevel(question);
  const unsupported = findUnsupportedCriticalDataClaims(question);
  const feedbackQuality = hasFeedbackQuality(question, normalizeOptions(question.options), String(question.correctAnswer || '').toUpperCase());
  const feedbackSpecificity = assessFeedbackSpecificity(question);
  const category = assessOptionCategoryConsistency(question);
  const optionAxis = assessQuestionOptionAxis(question);
  const caseUse = assessCaseIsNotDecorative(question);
  const difficultyReview = assessDifficultyLabel(question);
  const answerConflicts = detectStemCorrectAnswerConflict(question);
  const preAnswer = getPreAnswerDataText(question);
  const postAnswer = getPostAnswerReasoningText(question);
  const correctText = getCorrectText(question);

  if (!hasVisibleClinicalPattern(question)) issues.push({ code: 'stem_no_visible_clinical_pattern', severity: 'reject', message: 'Soru kökü görünür klinik patern içermiyor.' });
  if (signals.length < (demand === 'high' ? 4 : 3)) issues.push({ code: 'stem_insufficient_decision_data', severity: 'revision_required', message: 'Soru kökü doğru cevabı tartışmasız seçtirecek kadar karar verdirici veri içermeyebilir.', signals });
  if (unsupported.length) issues.push({ code: 'unsupported_post_answer_data', severity: 'reject', message: `Açıklama/feedback kökte görünmeyen kritik veriye dayanıyor: ${unsupported.join(', ')}.` });
  if (!hasEvidenceBasedOnVisibleStem(question)) issues.push({ code: 'evidence_not_grounded_in_stem', severity: 'revision_required', message: 'Kanıt zinciri ana metindeki görünür verilere yeterince dayanmıyor.' });
  if (isBroadQuestionWording(question.question) && !hasClinicalContext(question)) issues.push({ code: 'broad_question_without_context', severity: 'revision_required', message: 'Soru hedefi geniş; klinik bağlam daraltılmamış.' });
  if (!category.ok) issues.push({ code: 'option_category_mismatch', severity: 'revision_required', message: `Seçenekler aynı karar kategorisinde değil (${category.detail}).` });
  if (!optionAxis.ok) issues.push({ code: 'question_option_axis_mismatch', severity: 'revision_required', message: `Soru hedefi ile seçenek türleri uyumsuz olabilir (${optionAxis.detail}).` });
  if (!feedbackQuality.ok) issues.push({ code: 'weak_or_missing_option_feedback', severity: 'revision_required', message: feedbackQuality.errors.join('; ') });
  if (!feedbackSpecificity.ok) issues.push({ code: 'superficial_or_ungrounded_feedback', severity: 'revision_required', message: feedbackSpecificity.errors.join('; ') });
  if (answerConflicts.length) issues.push({ code: 'stem_correct_answer_conflict', severity: 'reject', message: `Kök ile doğru cevap arasında olası veri çelişkisi var: ${answerConflicts.join(', ')}.` });
  if (!caseUse.ok) issues.push({ code: 'clinical_vignette_as_decoration', severity: 'revision_required', message: 'Klinik olgu doğru cevabı seçtiren gerekçeye yeterince bağlanmıyor; olgu süs gibi kalmış olabilir.', detail: caseUse });
  if (!difficultyReview.ok) issues.push({ code: 'difficulty_label_mismatch', severity: difficultyReview.severity || 'revision_required', message: difficultyReview.detail });
  if (stemHasQuestionFragment(question.stem)) issues.push({ code: 'stem_contains_question_fragment', severity: 'reject', message: 'Soru kökü içinde soru cümlesi veya yarım karar kırıntısı var.' });
  if (correctText && containsAnswerLeak(preAnswer, correctText)) issues.push({ code: 'answer_leak_in_pre_answer_text', severity: 'reject', message: 'Soru kökü/veri paneli doğru cevabı fazla açık ediyor.' });
  if (hasDuplicateFeedbackSentences(question)) issues.push({ code: 'duplicate_feedback_sentences', severity: 'revision_required', message: 'Feedback veya açıklama içinde tekrar eden cümle var.' });
  if (hasTruncatedText([question.stem, question.question, question.explanation, postAnswer].filter(Boolean).join(' '))) issues.push({ code: 'truncated_or_broken_text', severity: 'reject', message: 'Kesik, üç noktalı veya yarım kalmış metin var.' });
  if (detectOverconfidentClinicalLanguage(postAnswer)) issues.push({ code: 'overconfident_clinical_language', severity: 'revision_required', message: 'Açıklama/feedback klinik bağlama göre aşırı kesin dil içeriyor.' });
  if (hasMalformedTurkishClinicalWording(question)) issues.push({ code: 'malformed_turkish_medical_language', severity: 'revision_required', message: 'Bozuk Türkçe veya standart dışı tıbbi ifade var.' });

  const severities = new Set(issues.map((issue) => issue.severity));
  const decision = severities.has('reject') ? 'reject' : (severities.has('revision_required') ? 'revision_required' : 'addable');
  return {
    ok: decision === 'addable',
    decision,
    signals,
    demand,
    feedbackSpecificity,
    optionAxis,
    caseUse,
    difficultyReview,
    answerConflicts,
    issues,
    summary: issues.length ? issues.map((issue) => `${issue.code}: ${issue.message}`) : ['global kalite kontrol geçti'],
  };
}

function attachGlobalQualityReview(question = {}) {
  const review = assessGlobalTusQuestionQuality(question);
  question.aiMeta = {
    ...(question.aiMeta || {}),
    globalQualityReview: review,
    qualityDecision: review.decision,
    publishable: review.decision === 'addable',
  };
  return question;
}

function isDirectionalAnswer(text = '') {
  const value = normalize(text);
  if (!value || value.length > 40) return false;
  return /^(artar|artis olur|artmistir|azalir|azalis olur|azalmistir|degismez|degisiklik olmaz|normal kalir)$/iu.test(value);
}

function isDirectionChangeQuestion(question = {}) {
  const text = normalize([question.question, question.learningTarget, question.answerTarget].filter(Boolean).join(' '));
  return /nasil degisir|beklenen degisiklik|ne olur|artar mi|azalir mi|degismez mi|artim hacmi|kalp debisi|debi|filtrasyon|sekresyon|emilim|rezorpsiyon|basinc|hacim|konsantrasyon/.test(text);
}

function hasObjectiveDirectionLeak(question = {}, correctText = '') {
  if (!isDirectionalAnswer(correctText) || !isDirectionChangeQuestion(question)) return false;
  const objectiveItems = compactItems(question.compactObjectiveData || question.objectiveData || [], 8);
  if (!objectiveItems.length) return false;
  const objectiveText = normalize(objectiveItems.map((item) => `${item.label} ${item.value}`).join(' | '));
  const correct = normalize(correctText);
  if (/^artar|^artis|^artmis/.test(correct) && /arttigi|artmis|artar|artis|yukselmis|yuksek|fazla|artmi/.test(objectiveText)) return true;
  if (/^azalir|^azalis|^azalmis/.test(correct) && /azaldigi|azalmis|azalir|azalis|dusmus|dusuk|azalmi/.test(objectiveText)) return true;
  if (/^degismez|^degisiklik olmaz|^normal kalir/.test(correct) && /normal|korunmus|degismez|degisiklik yok/.test(objectiveText)) return true;
  return false;
}

function hasPhysiologyDeterminantPanel(question = {}) {
  const text = normalize([
    question.relatedBranch,
    question.learningTarget,
    question.answerTarget,
    question.question,
  ].filter(Boolean).join(' '));
  if (!/fizyoloji|physiology|mekanizma|mechanism|artim hacmi|stroke volume|kalp debisi|frank starling|preload|afterload|venoz donus/.test(text)) return false;
  const objectiveText = normalize(compactItems(question.compactObjectiveData || question.objectiveData || [], 8).map((item) => `${item.label} ${item.value}`).join(' | '));
  if (!objectiveText) return false;
  const determinant = /dolum|preload|afterload|kontraktilite|venoz donus|miyokard|ejeksiyon|komplians|basinc|hacim/.test(objectiveText);
  const interpretive = /arttigi|azaldigi|artmis|azalmis|normal oldugu|korundugu|yuksek|dusuk|artis|azalis/.test(objectiveText);
  return determinant && interpretive && isDirectionChangeQuestion(question);
}

function isMechanismDirectionTarget(question = {}) {
  const text = normalize([
    question.learningTarget,
    question.answerTarget,
    question.question,
  ].filter(Boolean).join(' '));
  return /mekanizma|mechanism|neden|patofizyoloji|prensip|principle|yorum|interpretation|yorumlama/.test(text);
}

function hasUnwantedDirectionOnlyQuestion(question = {}, correctText = '') {
  if (!isDirectionalAnswer(correctText) || !isDirectionChangeQuestion(question)) return false;
  return !isMechanismDirectionTarget(question);
}

function hasIncompleteObjectiveData(question = {}) {
  const items = compactItems(question.compactObjectiveData || question.objectiveData || [], 8);
  return items.some((item) => {
    const label = cleanText(item.label);
    const value = cleanText(item.value);
    if (!label || !value) return true;
    if (hasTruncatedText(`${label} ${value}`)) return true;
    if (normalize(label) === normalize(value)) return true;
    if (value.length < 3) return true;
    if (/^[<>~≈]?\d+(?:[.,]\d+)?$/u.test(value)) return true;
    if (/^[-–—:;,/]+$/u.test(value)) return true;
    return false;
  });
}

function hasDuplicateFeedbackSentences(question = {}) {
  const pieces = [
    question.explanation,
    question.examPearl,
    ...asArray(question.evidenceChain),
    ...Object.values(question.wrongOptionFeedback || question.optionFeedback || {}),
  ].filter(Boolean);
  const seen = new Set();
  for (const piece of pieces) {
    const sentences = cleanText(piece).split(/(?<=[.!?])\s+/u).map(normalize).filter((sentence) => sentence.length > 24);
    for (const sentence of sentences) {
      if (seen.has(sentence)) return true;
      seen.add(sentence);
    }
  }
  return false;
}

function isManagementTarget(answerTarget = '') {
  return /^(first_step|next_step|treatment|prevention|management|emergency|emergency_approach|initial_management)$/iu.test(cleanText(answerTarget));
}

function collectStrings(value, output = []) {
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectStrings(item, output));
  return output;
}

function stripFeedbackLabel(value = '') {
  return cleanText(value)
    .replace(/^(?:TUS\s*ipucu|Spot\s*bilgi|Hap\s*bilgi|Sınav\s*notu)\s*[:：-]\s*/iu, '')
    .trim();
}

const FORBIDDEN_PHRASES = [
  /hedeflenen karar/iu,
  /hedeflenen klinik karar/iu,
  /klinik hedef/iu,
  /hedefi(?:ni)? .*karşılar/iu,
  /tanısal yönü öne çıkarır/iu,
  /ile birlikte değerlendirildiğinde .*hedef/iu,
  /destekler ile birlikte değerlendirildiğinde/iu,
  /^\s*(?:yanlış|doğru|uygun|uygun değildir)\.?\s*$/iu,
  /farklı klinik tabloda uygun olabilir/iu,
  /olgudaki ana ipuçlarını tek başına açıklamaz/iu,
  /klinik bağlamda değerlendirilir/iu,
  /bu nedenle doğru cevap budur/iu,
  /kanıt\s*[1-9]/iu,
  /verilen öğrenme hedefi/iu,
  /yanıt ekseni/iu,
  /bu alternatifin eksik kaldığı karar noktas/i,
  /seçenekler arasındaki karar düzeyini daraltır/iu,
  /^\s*yanlıştır\b/iu,
  /doğru cevaba götür/iu,
  /doğru yanıta götür/iu,
  /cevap .* içinde yer al/iu,
  /bu tabloda/iu,
  /verilerle en iyi uyumludur/iu,
  /tek en iyi yanıt değildir/iu,
  /diğer seçeneklerden ayrılır/iu,
  /olgudaki veriler birlikte değerlendirildiğinde/iu,
  /bu seçenek bu soru hedefi/iu,
  /bu klinik hedef için uygundur/iu,
  /^\s*(?:n|h)\.?\s*$/iu,
  /^\s*tanıyı destekler\.?\s*$/iu,
  /^\s*nonspesifiktir\.?\s*$/iu,
  /^\s*spesifik değildir\.?\s*$/iu,
  /^\s*destekleyicidir\.?\s*$/iu,
  /^\s*yetersizdir\.?\s*$/iu,
  /doğru seçenek/iu,
  /doğru cevap/iu,
  /bu seçenek doğrudur/iu,
  /bu seçenek doğrudur çünkü/iu,
  /hedeflenen karar/iu,
  /klinik hedef/iu,
  /öncelikli değildir\.?$/iu,
  /oncelikli degildir\.?$/iu,
  /klinik bağlamda yeterince açıklamaz/iu,
  /klinik baglamda yeterince aciklamaz/iu,
  /temel karar noktasını desteklemez/iu,
  /temel karar noktasini desteklemez/iu,
  /bu seçenek öncelikli değildir/iu,
  /bu secenek oncelikli degildir/iu,
  /yeterince açıklamaz/iu,
  /yeterince aciklamaz/iu,
  /öncelikli karar noktasını yeterince açıklamaz/iu,
  /oncelikli karar noktasini yeterince aciklamaz/iu,
];

function hasTruncatedText(text = '') {
  const value = cleanText(text);
  if (!value) return false;
  if (/\.{3}|…/u.test(text)) return true;
  if (/\b(?:ve|veya|ile|çünkü|ancak|fakat|bu nedenle|olarak|için)$/iu.test(value)) return true;
  if (/\b[a-zçğıöşü]{1,2}\.$/iu.test(value) && value.length > 40) return true;
  return false;
}

function getFeedbackText(question = {}, id = '') {
  return cleanText(question.wrongOptionFeedback?.[id] || question.optionFeedback?.[id] || question.optionRationales?.[id] || '');
}

function hasMechanismLanguage(text = '') {
  return /patofizyoloji|mekanizma|reseptör|reseptor|agonist|antagonist|enzim|kanal|pompa|transport|kotransport|inhib|aktiv|blok|sentez|metabolizma|feedback|hormon|kompleman|koagülasyon|koagulasyon|membran|iyon|affinite|afinite|farmakolojik|fizyolojik|biyokimyasal/iu.test(cleanText(text));
}

function isMechanismSensitive(question = {}) {
  return /mechanism|mekanizma|farmakoloji|fizyoloji|biyokimya|ilaç|ilac|enzim|reseptör|reseptor/iu.test([
    question.answerTarget,
    question.relatedBranch,
    question.learningTarget,
    question.question,
  ].filter(Boolean).join(' '));
}

function hasDecisionLanguage(text = '') {
  return /ilk|öncel|acil|stabil|hava yolu|solunum|dolaşım|hemodinami|kültür|kultur|beklenmeden|geciktirilmez|kontrendike|endike|ayırıcı|ayirici|dışlanır|dislanir|doğrular|dogrular|destekler|gösterir|gosterir|beklenir|düşündürür|dusundurur|açıklar|aciklar/iu.test(cleanText(text));
}

function isBroadQuestionWording(questionText = '') {
  return /en önemli|en uygun|ilk yaklaşım|ilk müdahale|öncelikli|komplikasyon|ciddi seyir|risk göstergesi|marker|belirteç/iu.test(cleanText(questionText));
}

function hasClinicalContext(question = {}) {
  const text = cleanText([question.stem, question.question, question.setting].filter(Boolean).join(' '));
  return /acil|ilk|başlangıç|baslangic|stabil|hemodinami|tanı|tani|tedavi|izlem|tarama|profilaksi|gebelik|çocuk|erişkin|postop|travma|zehirlenme|saat|gün|hafta|akut|kronik/iu.test(text);
}

function isGenericFeedback(text = '') {
  const value = cleanText(text);
  if (!value) return true;
  if (hasTruncatedText(value)) return true;
  return FORBIDDEN_PHRASES.some((pattern) => pattern.test(value));
}

function isAnatomyFeedbackContext(question = {}) {
  const text = normalize([
    question.relatedBranch,
    question.learningTarget,
    question.answerTarget,
    question.question,
    question.stem,
  ].filter(Boolean).join(' '));
  return /anatomi|sinir|nervus|nerve|pleksus|pleksusu|kanal|foramen|innervasyon|duyu kaybi|motor defisit|kas gucsuzlugu/.test(text);
}

function hasIsolatedFeedbackAbbreviation(text = '', question = {}) {
  const value = cleanText(text);
  if (!value) return true;
  if (/^\s*(?:n|h|m)\.?\s*$/iu.test(value)) return true;
  if (/^\s*[A-ZÇĞİÖŞÜa-zçğıöşü]\.?\s*$/u.test(value)) return true;
  if (/^\s*(?:N|n)\.\s*[A-ZÇĞİÖŞÜa-zçğıöşü-]*\.?\s*$/u.test(value)) return true;
  if (isAnatomyFeedbackContext(question) && /\b(?:N|n)\.\s*[A-ZÇĞİÖŞÜa-zçğıöşü-]+/u.test(value)) return true;
  if (isAnatomyFeedbackContext(question) && /\b(?:m|M)\.\s*[A-ZÇĞİÖŞÜa-zçğıöşü-]+/u.test(value)) return true;
  return false;
}

function hasWrongOptionContrast(text = '') {
  const value = cleanText(text);
  // Keep this as a quality signal, not a hard blocker. Good Turkish feedback may be
  // concise and still useful without using a fixed phrase such as "bu olguda".
  const hasContrastConnector = /burada|bu olguda|bu vakada|oysa|ancak|fakat|ama|verilen|eşlik etmez|eslik etmez|desteklenmez|uymaz|yoktur|değildir|degildir|öncelik değildir|oncelik degildir/iu.test(value);
  const hasUseCaseOrClinicalCue = /düşünülür|dusunulur|beklenir|uygundur|seçilir|secilir|kullanılır|kullanilir|önceliklidir|endikedir|doğru olur|dogru olur|tipiktir|görülür|gorulur|tanıda|tedavide|izlemde|tarama|profilaksi|acilde|stabil|şok|sok|hipotansiyon|ateş|ates|ağrı|agri|laboratuvar|ekg|grafi|seroloji|kültür|kultur/iu.test(value);
  return hasContrastConnector || hasUseCaseOrClinicalCue;
}


function clinicalAnchorTokens(question = {}) {
  const visible = normalize(getPreAnswerDataText(question));
  const stop = new Set('hasta olgu cocuk bebek eriskin kadin erkek birlikte nedeniyle olarak olan icin ile ve veya bir bu su verilen klinik bulgu bulgular destekler uygun secenek tani tedavi test mekanizma ilk sonraki karar soruda vakada burada'.split(' '));
  return Array.from(new Set(visible.split(/\s+/u).filter((token) => token.length >= 5 && !stop.has(token))));
}

function hasFeedbackStemAnchor(text = '', question = {}) {
  const feedback = normalize(text);
  if (!feedback) return false;
  const anchors = clinicalAnchorTokens(question);
  if (!anchors.length) return hasWrongOptionContrast(text);
  const hits = anchors.filter((token) => feedback.includes(token)).length;
  if (hits >= 1) return true;
  return /bu olguda|bu vakada|verilen|burada|oysa|ancak|fakat|ama|eşlik|eslik|saptan|yok|var|normal|düşük|dusuk|yüksek|yuksek|pozitif|negatif|laboratuvar|muayene|öykü|oyku|tetkik|görüntüleme|goruntuleme/iu.test(text);
}

function isSuperficialFeedback(text = '', question = {}) {
  const value = cleanText(text);
  const n = normalize(value);
  if (!value) return true;
  if (isGenericFeedback(value) || hasIsolatedFeedbackAbbreviation(value, question)) return true;
  const sentences = splitSentencesSafe(value);
  const genericOnly = [
    /^bu secenek oncelikli degildir$/u,
    /^bu secenek klinik baglamda yeterince aciklamaz$/u,
    /^temel karar noktasini desteklemez$/u,
    /^verilen klinik baglamda oncelikli karar noktasini yeterince aciklamaz$/u,
    /^bu secenek verilen klinik baglamda oncelikli degildir$/u,
    /^klinik baglamda yeterince aciklamaz$/u,
  ].some((pattern) => pattern.test(n));
  if (genericOnly) return true;
  const hasSpecificMedicalContent = /trombosit|koagülasyon|koagulasyon|pt|aptt|inr|crp|lökosit|lokosit|kreatinin|sodyum|potasyum|glukoz|ph|hco3|ateş|ates|hipotansiyon|hipoksi|döküntü|dokuntu|artralji|karın|karin|kusma|ishal|kültür|kultur|biyopsi|ekg|bt|mr|usg|grafi|enzim|reseptör|reseptor|mekanizma|komplikasyon|tedavi|tanı|tani|test|tarama|profilaksi|immün|immun|vaskülit|vaskulit|menenjit|sepsis|şok|sok|anemi|hemoliz|antikor|hormon|renal|böbrek|bobrek/iu.test(value);
  if (!hasSpecificMedicalContent && sentences.length <= 1 && /uygun|öncelikli|oncelikli|desteklemez|açıklamaz|aciklamaz|düşündürmez|dusundurmez/.test(n)) return true;
  return false;
}

function assessFeedbackSpecificity(question = {}) {
  const errors = [];
  const options = normalizeOptions(question.options);
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  options.forEach((option) => {
    const feedback = getFeedbackText(question, option.id);
    if (!feedback) {
      errors.push(`seçenek ${option.id} feedback yok`);
      return;
    }
    if (isSuperficialFeedback(feedback, question)) errors.push(`seçenek ${option.id} feedback yüzeysel/fallback gibi`);
    if (option.id !== correctId && !hasFeedbackStemAnchor(feedback, question)) errors.push(`seçenek ${option.id} feedback kökteki veriye yeterince bağlanmıyor`);
    if (option.id !== correctId && !hasWrongOptionContrast(feedback)) errors.push(`seçenek ${option.id} feedback hangi bağlamda yanlış olduğunu açıklamıyor`);
  });
  return { ok: errors.length === 0, errors };
}

function optionAxisFromQuestion(question = {}) {
  const text = normalize([question.answerTarget, question.question, question.learningTarget].filter(Boolean).join(' '));
  if (/tedavi|yaklasim|mudahale|yonetim|profilaksi|ilk basamak|sonraki adim|ilk adim/.test(text)) return 'treatment';
  if (/test|tetkik|laboratuvar|görüntüleme|goruntuleme|dogrula|kesin tani|tarama|tanisal/.test(text)) return 'test';
  if (/mekanizma|patofizyoloji|reseptor|enzim|transport|inhibisyon|aktivasyon/.test(text)) return 'mechanism';
  if (/tani|olasi tani|en olasi|komplikasyon/.test(text)) return 'diagnosis';
  return 'other';
}

function assessQuestionOptionAxis(question = {}) {
  const axis = optionAxisFromQuestion(question);
  if (axis === 'other') return { ok: true, axis, detail: 'soru ekseni çıkarılamadı' };
  const options = normalizeOptions(question.options);
  const categories = options.map((option) => optionCategory(option.text));
  const mismatches = options.filter((option, idx) => categories[idx] !== 'other' && categories[idx] !== axis).map((option) => option.id);
  return { ok: mismatches.length <= 1, axis, mismatches, detail: `axis=${axis} mismatches=${mismatches.join(',') || 'yok'}` };
}

function detectStemCorrectAnswerConflict(question = {}) {
  const visible = normalize(getPreAnswerDataText(question));
  const correct = normalize(getCorrectText(question));
  const conflicts = [];
  if (!visible || !correct) return conflicts;
  const pairs = [
    ['hipotansiyon', /hipotansiyon|sok|hemodinamik bozuk|kan basinci dusuk/u, /hipotansiyon yok|hemodinamik stabil|kan basinci normal/u],
    ['hipoksi', /hipoksi|spo2 dusuk|saturasyon dusuk/u, /hipoksi yok|saturasyon normal|spo2 normal/u],
    ['ates', /ates|febril/u, /ates yok|afebril/u],
    ['trombosit', /trombositopeni|trombosit dusuk/u, /trombosit normal|trombosit sayisi normal/u],
    ['renal', /bobrek yetmez|kreatinin yuksek|renal bozuk/u, /bobrek fonksiyon normal|kreatinin normal/u],
    ['koagulasyon', /koagulasyon bozuk|pt uzamis|aptt uzamis|inr yuksek/u, /pt normal|aptt normal|koagulasyon normal/u],
  ];
  pairs.forEach(([id, positive, negative]) => {
    const correctPositive = positive.test(correct);
    const correctNegative = negative.test(correct);
    const stemPositive = positive.test(visible);
    const stemNegative = negative.test(visible);
    if ((correctPositive && stemNegative) || (correctNegative && stemPositive)) conflicts.push(id);
  });
  return conflicts;
}

function assessCaseIsNotDecorative(question = {}) {
  const stem = normalize(getPreAnswerDataText(question));
  const post = normalize(getPostAnswerReasoningText(question));
  const correct = normalize(getCorrectText(question));
  const signals = stemDecisionSupportSignals(question);
  const correctInQuestionOnly = correct && !stem.includes(correct) && post.includes(correct);
  const evidenceGrounded = hasEvidenceBasedOnVisibleStem(question);
  const stemAnchors = clinicalAnchorTokens(question).filter((token) => token.length >= 6);
  const postHits = stemAnchors.filter((token) => post.includes(token)).length;
  const decorative = correctInQuestionOnly && signals.length < 3 && postHits === 0;
  return { ok: !decorative && evidenceGrounded, decorative, signals, postAnchorHits: postHits };
}

function inferEffectiveDifficulty(question = {}) {
  const signals = stemDecisionSupportSignals(question).length;
  const stem = normalize(getPreAnswerDataText(question));
  const correct = normalize(getCorrectText(question));
  const answerLeak = correct && containsAnswerLeak(stem, correct);
  const hasManySpecificData = signals >= 6;
  const asksSimpleDiagnosis = /en olasi tani|tani hangisi|hangisi tani/.test(normalize(question.question || ''));
  if (answerLeak || (hasManySpecificData && asksSimpleDiagnosis)) return 'Kolay';
  if (signals <= 2) return 'Eksik';
  if (signals >= 5 && /mekanizma|sonraki|ilk|tedavi|test|yorum/.test(normalize([question.question, question.answerTarget].join(' ')))) return 'Zor/Orta';
  return 'Orta';
}

function assessDifficultyLabel(question = {}) {
  const requested = normalizeDifficulty(question.difficulty || 'Orta');
  const inferred = inferEffectiveDifficulty(question);
  if (inferred === 'Eksik') return { ok: false, severity: 'revision_required', detail: 'zorluk veri eksikliğinden kaynaklanıyor; bu kaliteli zor soru değildir' };
  if (requested === 'Zor' && inferred === 'Kolay') return { ok: false, severity: 'revision_required', detail: 'kök çok doğrudan tanı koyduruyor; Zor etiketi uyumsuz olabilir' };
  return { ok: true, inferred, requested };
}

function hasFeedbackQuality(question = {}, options = [], correctId = '') {
  const errors = [];
  const correctFeedback = getFeedbackText(question, correctId);
  if (!correctFeedback || isGenericFeedback(correctFeedback) || hasIsolatedFeedbackAbbreviation(correctFeedback, question)) errors.push('doğru seçenek açıklaması eksik veya zayıf');
  options.forEach((option) => {
    const feedback = getFeedbackText(question, option.id);
    if (!feedback) errors.push(`seçenek ${option.id} feedback eksik`);
    else if (isGenericFeedback(feedback) || hasIsolatedFeedbackAbbreviation(feedback, question)) errors.push(`seçenek ${option.id} feedback eksik veya zayıf`);
  });
  return { ok: errors.length === 0, errors };
}

function hasPearlQuality(text = '') {
  const value = cleanText(text);
  if (!value || isGenericFeedback(value)) return false;
  // A pearl should be memorable, but no character/word/sentence limit is enforced.
  return hasMechanismLanguage(value) || hasDecisionLanguage(value) || /→|=|:|ise|daima|önce|sonra|en çok|tipik/iu.test(value);
}

function hasExplanationQuality(question = {}, correctText = '') {
  const explanation = cleanText(question.explanation);
  if (!explanation || isGenericFeedback(explanation)) return false;
  if (hasTruncatedText(explanation)) return false;
  if (isMechanismSensitive(question)) return hasMechanismLanguage(explanation) || hasMechanismLanguage(question.examPearl);
  return true;
}

function optionCategory(text = '') {
  const value = normalize(text);
  if (/tedavi|vermek|baslamak|uygulamak|cerrahi|antibiyotik|antidot|oksijen|sivi|rehidratasyon|insulin|glukoz|adrenalin|epinefrin|antikoagulan|kortikosteroid|immunglobulin|diyaliz/.test(value)) return 'treatment';
  if (/test|tetkik|olcumu|seroloji|kultur|pcr|bt|mr|usg|ekg|grafi|biyopsi|tarama|panel|enzim|marker/.test(value)) return 'test';
  if (/mekanizma|reseptor|inhibisyon|aktivasyon|transport|kotransport|enzim|kanal|patofizyoloji|yan etki/.test(value)) return 'mechanism';
  if (/enfeksiyonu|sendromu|hastaligi|tanisi|pnomoni|menenjit|ketoasidoz|konvulziyon|anemi|tiroidit|embol|infarkt|sepsis|sok|astim|sle|lupus|hepatit/.test(value)) return 'diagnosis';
  return 'other';
}


function isBasicScienceBranch(branch = '') {
  const value = normalize(branch);
  return /anatomi|histoloji|embriyoloji|biyokimya|fizyoloji/.test(value);
}

function countClinicalCueGroups(question = {}) {
  const text = normalize([
    question.demographics,
    question.setting,
    question.chiefComplaint,
    question.stem,
  ].filter(Boolean).join(' '));

  const groups = [
    /\b(?:\d+\s*(?:yaş|yas|aylık|aylik|günlük|gunluk|haftalık|haftalik)|yenidogan|yenidoğan|bebek|çocuk|cocuk|ergen|kadın|kadin|erkek|gebe|postpartum)\b/u,
    /\b(?:saat|gün|gun|hafta|ay|yıl|yildir|gündür|gundur|başlayan|baslayan|sonra|önce|once|akut|kronik|tekrarlayan|uzun süren|uzun suren)\b/u,
    /\b(?:ateş|ates|ağrı|agri|öksürük|oksuruk|dispne|nefes darlığı|nefes darligi|kusma|ishal|sarılık|sarilik|ödem|odem|döküntü|dokuntu|kanama|nöbet|nobet|senkop|halsizlik|kilo kaybı|kilo kaybi|emme güçlüğü|emme guclugu|beslenememe|baş ağrısı|bas agrisi|çarpıntı|carpinti)\b/u,
    /\b(?:muayene|oskulasyon|palpasyon|defans|rebound|ral|ronkus|wheezing|hışıltı|hisilti|üfürüm|ufurum|hepatomegali|splenomegali|lenfadenopati|döküntü|dokuntu|bilinç|bilinc|letarji|hipotoni|rijidite|trismus|ödem|odem|solunum sıkıntısı|solunum sikintisi)\b/u,
    /\b(?:tansiyon|kan basıncı|kan basinci|nabız|nabiz|taşikardi|tasikardi|bradikardi|solunum sayısı|solunum sayisi|spo2|spo₂|satürasyon|saturasyon|ateşi|atesi|hipotansiyon|hipoksi|şok|sok)\b/u,
    /\b(?:hemoglobin|lökosit|lokosit|trombosit|crp|sedimentasyon|glukoz|sodyum|potasyum|kalsiyum|kreatinin|üre|ure|ast|alt|bilirubin|troponin|ph|hco3|pco2|po2|laktat|amonyak|keton|proteinüri|proteinuri|hematüri|hematuri|mmol|mg\/dl|iu\/l|µmol|umol|z-skor|z skor)\b/u,
    /\b(?:grafi|akciğer grafisi|akciger grafisi|ultrason|usg|bt|mr|mrg|ekg|eko|ekokardiyografi|biyopsi|kültür|kultur|pcr|seroloji|idrar tahlili|periferik yayma|tomografi)\b/u,
    /\b(?:öyküsünde|oykusunde|aile öyküsü|aile oykusu|travma|ilaç|ilac|aşı|asi|temas|seyahat|prematüre|premature|doğum|dogum|gebelik|ameliyat|operasyon|risk faktörü|risk faktoru)\b/u,
    /\b(?:yok|saptanmadı|saptanmadi|tariflemiyor|eşlik etmiyor|eslik etmiyor|normal|negatif|stabil|hipoksi yok|solunum sıkıntısı yok|solunum sikintisi yok)\b/u,
  ];

  return groups.reduce((count, pattern) => count + (pattern.test(text) ? 1 : 0), 0);
}

function hasSufficientClinicalVignette(question = {}) {
  const errors = [];
  const stem = cleanText(question.stem || '');
  const combined = cleanText([
    question.demographics,
    question.setting,
    question.chiefComplaint,
    stem,
  ].filter(Boolean).join(' '));

  const hasPatientContext = /\b(?:\d+\s*(?:yaş|yas|aylık|aylik|günlük|gunluk|haftalık|haftalik)|yenidoğan|yenidogan|bebek|çocuk|cocuk|ergen|kadın|kadin|erkek|hasta|gebe)\b/iu.test(combined);
  if (!hasPatientContext) {
    errors.push('klinik olgu yetersiz: yaş/cinsiyet veya hasta bağlamı eksik');
  }

  const questionText = normalize(question.question || '');
  const requiresDecisionContext = /tedavi|müdahale|mudahale|yaklaşım|yaklasim|ilk|acil|öncelikli|oncelikli|tanı|tani|test|tetkik|doğrula|dogrula|yönetim|yonetim|hangisi/.test(questionText);
  const hasDecisionData = /ateş|ates|ağrı|agri|muayene|laboratuvar|grafi|usg|bt|mr|ekg|eko|kültür|kultur|pcr|seroloji|ph|hco3|glukoz|sodyum|potasyum|kreatinin|troponin|laktat|amonyak|hipotansiyon|hipoksi|bilinç|bilinc|nöbet|nobet|stabil|şok|sok|z-skor|z skor|risk|kontrendikasyon|doz|düzey|duzey|değer|deger|pozitif|negatif/iu.test(combined);
  if (requiresDecisionContext && !hasDecisionData) {
    errors.push('klinik olgu yetersiz: soruyu çözdürecek laboratuvar/muayene/görüntüleme veya karar verdirici veri eksik');
  }

  const isTreatmentQuestion = /tedavi|müdahale|mudahale|yaklaşım|yaklasim|ilk|acil|öncelikli|oncelikli|yönetim|yonetim|profilaksi/.test(questionText);
  const hasTreatmentTimingOrSeverity = /stabil|unstabil|hipotansiyon|şok|sok|hipoksi|solunum sıkıntısı|solunum sikintisi|bilinç|bilinc|nöbet|nobet|ağır|agir|hafif|orta|yüksek|yuksek|düşük|dusuk|hızla|hizla|saat|gün|gun|hafta|başlangıç|baslangic|sonra|önce|once|risk|kontrendikasyon|düzey|duzey|mg\/dl|mmol|µmol|umol|z-skor|z skor|başlanmış|baslanmis|yanıt|yanit/.test(normalize(combined));
  if (isTreatmentQuestion && !hasTreatmentTimingOrSeverity) {
    errors.push('klinik olgu yetersiz: tedavi/ilk yaklaşım için şiddet, stabilite, zamanlama veya eşik bilgisi eksik');
  }

  return errors;
}

function hasEvidenceBasedOnVisibleStem(question = {}) {
  const visible = normalize([
    question.demographics,
    question.setting,
    question.chiefComplaint,
    question.stem,
  ].filter(Boolean).join(' '));
  const evidence = asArray(question.evidenceChain).map((item) => normalize(item)).filter(Boolean);
  if (!evidence.length) return false;
  const clinicalTokens = /ateş|ates|ağrı|agri|muayene|laboratuvar|grafi|bt|mr|usg|ekg|eko|kültür|kultur|pcr|seroloji|sodyum|potasyum|glukoz|ph|hco3|amonyak|troponin|laktat|hipotansiyon|hipoksi|nöbet|nobet|bilinç|bilinc|öykü|oyku|z-skor|z skor|mmol|mg\/dl|µmol|umol/;
  return evidence.every((item) => {
    if (!clinicalTokens.test(item)) return true;
    const words = item.split(/\s+/u).filter((word) => word.length >= 5 && !/^(bulgu|olgu|hasta|klinik|destekler|uyumludur|gösterir|gosterir|nedeniyle|birlikte)$/u.test(word));
    return words.some((word) => visible.includes(word));
  });
}

function tokenSimilarity(left = '', right = '') {
  const leftTokens = new Set(normalize(left).split(/\s+/u).filter((token) => token.length >= 4));
  const rightTokens = new Set(normalize(right).split(/\s+/u).filter((token) => token.length >= 4));
  if (!leftTokens.size || !rightTokens.size) return 0;
  let overlap = 0;
  leftTokens.forEach((token) => {
    if (rightTokens.has(token)) overlap += 1;
  });
  return overlap / Math.max(leftTokens.size, rightTokens.size);
}

function optionSetSignature(value = {}) {
  const fromOptions = normalizeOptions(value.options)
    .map((item) => item.text)
    .filter(Boolean);
  const fromSummary = asArray(value.optionTexts)
    .map((item) => cleanText(item?.text || item))
    .filter(Boolean);
  const items = fromOptions.length ? fromOptions : fromSummary;
  return normalize(items.slice().sort().join(' | ') || value.optionSetSignature || '');
}

function questionLikeCorrectText(value = {}) {
  return normalize(
    getCorrectText(value)
    || value.correctAnswerText
    || value.correct
    || value.correctAnswer
    || ''
  );
}

function questionLikeStem(value = {}) {
  return normalize(value.stem || value.normalizedStem || value.questionStem || '');
}

function questionLikeTarget(value = {}) {
  return normalize([
    value.relatedBranch || value.branch,
    value.answerTarget || value.questionType,
    value.learningTarget,
    value.question,
  ].filter(Boolean).join(' | '));
}

function validateQuestion(question = {}, recentQuestionSummaries = []) {
  const errors = [];
  const options = normalizeOptions(question.options);
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  const correctText = getCorrectText({ ...question, options });
  const allText = collectStrings(question).join(' | ');

  if (!question.relatedBranch || cleanText(question.relatedBranch).length < 3) errors.push('branch eksik');
  if (!question.stem || !cleanText(question.stem)) errors.push('stem eksik');
  if (isGenericOrPlaceholderStem(question.stem)) errors.push('stem placeholder veya klinik bağlamdan yoksun');
  if (!hasVisibleClinicalPattern(question)) errors.push('soru kökünde görünür klinik patern yok');
  errors.push(...hasSufficientClinicalVignette(question));
  if (!hasEvidenceBasedOnVisibleStem(question)) errors.push('kanıt zinciri ana metindeki görünür verilere dayanmıyor');
  const unsupportedCriticalClaims = findUnsupportedCriticalDataClaims(question);
  if (unsupportedCriticalClaims.length) errors.push(`kritik gerekçe stemde görünmüyor: ${unsupportedCriticalClaims.join(', ')}`);
  const globalReview = assessGlobalTusQuestionQuality(question);
  globalReview.issues
    .filter((issue) => issue.severity === 'reject')
    .forEach((issue) => errors.push(`global-quality:${issue.severity}:${issue.code}:${issue.message}`));
  if (!question.question || !/\?$/u.test(ensureQuestion(question.question))) errors.push('question net soru cümlesi değil');
  if (stemHasQuestionFragment(question.stem)) errors.push('stem içinde soru cümlesi veya yarım soru kırıntısı var');
  if (options.length !== 5) errors.push('tam 5 seçenek yok');
  if (!OPTION_IDS.includes(correctId)) errors.push('correctAnswer A-E değil');
  if (!correctText) errors.push('correctAnswer seçeneklerle eşleşmiyor');
  if (!question.explanation || !cleanText(question.explanation)) errors.push('explanation eksik');
  if (!Array.isArray(question.evidenceChain) || !question.evidenceChain.length) errors.push('evidenceChain eksik');
  if (!question.examPearl || !cleanText(question.examPearl)) errors.push('examPearl eksik');
  if (hasTruncatedText(allText)) errors.push('kesik veya üç noktalı metin var');
  if (!hasExplanationQuality(question, correctText)) errors.push('doğru cevap açıklaması klinik/mekanistik gerekçe içermiyor');
  if (!hasPearlQuality(question.examPearl)) errors.push('TUS ipucu karar cümlesi değil');
  const feedbackQuality = hasFeedbackQuality(question, options, correctId);
  if (!feedbackQuality.ok) errors.push(...feedbackQuality.errors);
  if (isMechanismSensitive(question) && !hasMechanismLanguage([question.explanation, question.examPearl, question.wrongOptionFeedback?.[correctId], question.optionFeedback?.[correctId]].filter(Boolean).join(' '))) errors.push('mekanizma hassasiyeti zayıf');
  if (isBroadQuestionWording(question.question) && !hasClinicalContext(question)) errors.push('soru hedefi geniş, klinik bağlam daraltılmamış');
  FORBIDDEN_PHRASES.forEach((pattern) => {
    if (pattern.test(allText)) errors.push('jenerik/yasak feedback kalıbı var');
  });

  if (correctText && containsAnswerLeak(getPreAnswerDataText(question), correctText)) errors.push('soru kökü/veri paneli doğru cevabı ele veriyor');
  if (hasObjectiveDirectionLeak(question, correctText)) errors.push('veri paneli yön/değişim cevabını fazla ele veriyor');
  if (hasPhysiologyDeterminantPanel(question)) errors.push('fizyoloji sorusunda veri paneli sonucu belirleyen yorumu doğrudan veriyor');
  if (hasUnwantedDirectionOnlyQuestion(question, correctText)) errors.push('basit artar/azalır/değişmez sorusu mekanizma hedefi olmadan üretilmiş');
  if (hasIncompleteObjectiveData(question)) errors.push('eksik veya tamamlanmamış objektif veri değeri var');
  if (hasImpossibleClinicalValue(question)) errors.push('imkansız veya bozuk klinik değer/ifade var');
  if (hasMalformedTurkishClinicalWording(question)) errors.push('bozuk Türkçe veya makine çevirisi klinik ifade var');
  if (hasAmbiguousHyperammonemiaEmergencyTarget(question)) errors.push('hiperamonyemi acil tedavi sorusunda eşik/şiddet/zamanlama bilgisi eksik');
  if (asArray(question.evidenceChain).some((item) => containsAnswerLeak(item, correctText))) errors.push('kanıt zinciri doğru cevabı doğrudan söylüyor');
  if (hasDuplicateFeedbackSentences(question)) errors.push('feedback içinde tekrar eden cümle var');
  if (!isManagementTarget(question.answerTarget) && asArray(question.managementSteps).length) errors.push('bu soru tipinde yönetim basamağı gereksiz');

  const categories = options.map((option) => optionCategory(option.text)).filter((category) => category !== 'other');
  const dominant = categories.sort((a, b) => categories.filter((x) => x === b).length - categories.filter((x) => x === a).length)[0];
  if (dominant && categories.filter((category) => category !== dominant).length >= 2) errors.push('seçenekler aynı kavramsal kategoride değil');

  const correctNorm = normalize(correctText);
  const stemNorm = questionLikeStem(question);
  const repeatOptionSetNorm = optionSetSignature({ ...question, options });
  const optionSetNorm = `${repeatOptionSetNorm} ${stableHash(stemNorm.slice(0, 160))}`;
  const repeatTargetNorm = normalize([question.relatedBranch, question.answerTarget, question.learningTarget, correctText].filter(Boolean).join(' | '));
  const currentTargetNorm = stableHash(`${repeatTargetNorm} ${stemNorm.slice(0, 160)}`);
  asArray(recentQuestionSummaries).slice(0, 12).forEach((recent) => {
    const recentBranch = normalize(recent.branch || recent.relatedBranch || recent.branchName || '');
    const sameBranch = !recentBranch || !normalize(question.relatedBranch) || recentBranch === normalize(question.relatedBranch);
    const recentCorrect = questionLikeCorrectText(recent);
    if (correctNorm && recentCorrect === correctNorm && optionSetNorm && normalize(asArray(recent.optionTexts).slice().sort().join(' | ') || recent.optionSetSignature) === optionSetNorm) errors.push('yakın geçmişte aynı doğru cevap ve seçenek seti var');
    const recentStem = normalize(recent.stem || recent.normalizedStem || '');
    if (stemNorm.length > 100 && recentStem.length > 100 && (stemNorm.includes(recentStem.slice(0, 100)) || recentStem.includes(stemNorm.slice(0, 100)))) errors.push('yakın geçmişte aynı soru kökü var');
    const recentTargetNorm = normalize([recent.branch || recent.relatedBranch, recent.answerTarget || recent.questionType, recent.learningTarget, recent.correct || recent.correctAnswer || recent.correctAnswerText].filter(Boolean).join(' | '));
    const recentOptionSet = optionSetSignature(recent);
    const stemOverlap = tokenSimilarity(stemNorm, recentStem);
    const targetOverlap = tokenSimilarity(repeatTargetNorm, recentTargetNorm);
    const sameOptionSet = repeatOptionSetNorm && recentOptionSet && repeatOptionSetNorm === recentOptionSet;
    if (correctNorm && recentCorrect === correctNorm && sameOptionSet && Math.max(stemOverlap, targetOverlap) >= 0.72) errors.push('yakÄ±n geÃ§miÅŸte aynÄ± doÄŸru cevap ve seÃ§enek seti var');
    if (stemNorm.length > 100 && recentStem.length > 100 && stemOverlap >= 0.86) errors.push('yakÄ±n geÃ§miÅŸte aynÄ± soru kÃ¶kÃ¼ var');
    if (sameBranch && correctNorm && recentCorrect === correctNorm && repeatTargetNorm && recentTargetNorm && targetOverlap >= 0.9 && stemOverlap >= 0.45) errors.push('yakÄ±n geÃ§miÅŸte aynÄ± Ã¶ÄŸrenme hedefi var');
    if (sameBranch && correctNorm && recentCorrect === correctNorm && currentTargetNorm && recentTargetNorm && (currentTargetNorm.includes(recentTargetNorm) || recentTargetNorm.includes(currentTargetNorm))) errors.push('yakın geçmişte aynı öğrenme hedefi var');
  });

  const uniqueErrors = Array.from(new Set(errors));
  const classified = classifyTusValidationErrors(uniqueErrors);
  return {
    ok: classified.blockingErrors.length === 0 && classified.repairableErrors.length === 0,
    errors: uniqueErrors,
    blockingErrors: classified.blockingErrors,
    repairableErrors: classified.repairableErrors,
    warnings: classified.warnings,
    issues: classified.issues,
    stages: classified.stages,
    options,
    correctText,
  };
}


function formatInlineClinicalData(items = [], prefix = '') {
  const rows = asArray(items)
    .map((item) => {
      if (typeof item === 'string') return cleanText(item);
      const label = cleanText(item?.label || item?.name || item?.parameter || item?.title || '');
      const value = cleanText(item?.value || item?.result || item?.text || item?.finding || '');
      if (!label && !value) return '';
      if (!value) return label;
      return `${label}: ${value}`;
    })
    .filter(Boolean)
    .filter((line) => !/^(görüntüleme|destekleyici veriler|laboratuvar|fizik muayene|eko|ekokardiyografi)$/iu.test(line));
  if (!rows.length) return '';
  return ensureSentence(`${prefix}${rows.join('; ')}`);
}

function integrateCompactDataIntoStem(stem = '', vitals = [], objectiveData = []) {
  const base = ensureSentence(cleanGeneratedText(stem || ''));
  const vitalSentence = formatInlineClinicalData(vitals, 'Ek klinik verilerde ');
  const objectiveSentence = formatInlineClinicalData(objectiveData, 'Tetkik ve destekleyici bulgularda ');
  return [base, vitalSentence, objectiveSentence]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function uniqueSentences(value = '') {
  const seen = new Set();
  return splitSentencesSafe(value)
    .map((sentence) => ensureSentence(sentence))
    .filter((sentence) => {
      const key = normalize(sentence);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function visibleRepairEvidence(question = {}) {
  const rows = [
    ...compactItems(question.compactVitals || question.vitals || [], 5).map((item) => `${item.label}: ${item.value}`),
    ...compactItems(question.compactObjectiveData || question.objectiveData || [], 8).map((item) => `${item.label}: ${item.value}`),
  ].map(cleanText).filter(Boolean);
  const stemSentences = uniqueSentences(question.stem || '').slice(0, 2);
  const evidence = Array.from(new Set([...rows, ...stemSentences])).slice(0, 4);
  const summary = evidence.length
    ? evidence.join('; ')
    : 'soru kökündeki hasta bağlamı ve karar verdirici klinik bilgiler';
  return { evidence, summary };
}

function optionConceptSentence(optionText = '') {
  const option = cleanText(optionText || 'Bu seçenek');
  return `${option}, sınav sorularında kendi özgün klinik paternini, mekanizmasını veya karar basamağını temsil eden ayrı bir seçenektir.`;
}

function buildGroundedFeedback({ option, correctId, correctText, evidenceSummary }) {
  const optionText = cleanText(option?.text || '');
  if (option?.id === correctId) {
    return [
      `${optionText}, kökte verilen ${evidenceSummary} bulgu bütünlüğünü en iyi birleştiren seçenektir.`,
      `Bu nedenle doğru cevap, yalnızca isim olarak değil kökteki görünür verilerin birlikte desteklediği klinik karar noktası olarak değerlendirilir.`,
    ].join(' ');
  }
  const contrastById = {
    A: `Ayırıcı nokta, ${optionText} için beklenen belirleyici işaretlerin kökte ana eksen olarak verilmemesi; mevcut görünür verilerin ${correctText} lehine gruplanmasıdır.`,
    B: `Bu seçenek ile ${correctText} arasındaki fark, kökteki verilerin ${optionText} için tipik karar yolunu değil doğru cevabın klinik eksenini desteklemesidir.`,
    C: `${optionText} ancak kendi tanısal veya mekanistik ipuçları kökte baskın olduğunda güç kazanır; bu soruda görünür bulgular ${correctText} seçeneğini daha tutarlı kılar.`,
    D: `Bu olguda ${optionText} seçeneğini öne çıkaracak ayrı bir bulgu dizisi kurulmamıştır; soru kökü karar verdirici verileri ${correctText} çevresinde toplar.`,
    E: `${optionText} farklı bir klinik karar hattını temsil eder; kökteki hasta bağlamı ve objektif veriler bu hattı değil ${correctText} yanıtını destekleyen ekseni kurar.`,
  };
  return [
    optionConceptSentence(optionText),
    `Bu olguda karar verdiren ${evidenceSummary} bilgileri ${correctText} yönünde daha tutarlı bir bütünlük kurar.`,
    contrastById[option?.id] || `${optionText} bu kökte doğru cevabın taşıdığı klinik ekseni karşılamaz; temel ayrım görünür verilerin ${correctText} lehine birleşmesidir.`,
  ].join(' ');
}

export function repairTusQuestionForPublish(rawQuestion = {}, repairReasons = []) {
  const question = { ...rawQuestion };
  const options = normalizeOptions(question.options);
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  const correctText = getCorrectText({ ...question, options });
  const applied = [];
  if (!options.length || !OPTION_IDS.includes(correctId) || !correctText) {
    return { question, applied, blocked: true };
  }

  question.stem = integrateCompactDataIntoStem(
    stripQuestionLikeTailFromStem(question.stem || question.questionStem || '', question.question || ''),
    question.compactVitals || question.vitals || [],
    question.compactObjectiveData || question.objectiveData || [],
  );
  question.question = ensureQuestion(question.question || 'Bu olguda en uygun seçenek hangisidir?');

  const { evidence, summary } = visibleRepairEvidence(question);
  const evidenceSummary = cleanText(summary);
  question.explanation = [
    `${correctText}, kökte verilen ${evidenceSummary} bulgu bütünlüğünü en iyi açıklayan seçenektir.`,
    `Açıklama yalnızca kökte görünen verilere dayanır; seçenekler arasındaki temel ayrım bu görünür klinik eksenin ${correctText} lehine kurulmasıdır.`,
  ].join(' ');

  const feedback = {};
  options.forEach((option) => {
    feedback[option.id] = buildGroundedFeedback({ option, correctId, correctText, evidenceSummary });
  });
  question.optionFeedback = feedback;
  question.wrongOptionFeedback = feedback;
  question.evidenceChain = evidence.length
    ? evidence.map((item) => ensureSentence(item))
    : [`Kök, ${correctText} lehine yorumlanacak görünür klinik bağlam içerir.`];
  question.examPearl = `${correctText} sorularında doğru yanıt, kökteki görünür bulguların birlikte kurduğu karar ekseniyle seçilmelidir; açıklamada kök dışı hasta verisi kullanılmamalıdır.`;
  question.semanticFingerprint = makeSignature(question);
  question.aiMeta = {
    ...(question.aiMeta || {}),
    localPublishRepair: {
      attempted: true,
      reasons: repairReasons,
      correctAnswerPreserved: correctId,
    },
  };
  applied.push('stem-explanation-feedback-evidence-rebuilt');
  return { question, applied, blocked: false };
}

function canAttemptLocalPublishRepair(error = '') {
  return !/options-not-five|correct-answer-id-invalid|correct-answer-text-missing|correctAnswer A-E|correctAnswer seçeneklerle eşleşmiyor|tam 5 seçenek yok/iu.test(String(error || ''));
}


function isGenericOrPlaceholderStem(stem = '') {
  const value = normalize(stem);
  if (!value) return true;
  return [
    /kisa klinik baglam/,
    /karar verdirici bulgular birlikte degerlendirilir/,
    /klinik veriler birlikte degerlendirilir/,
    /bu bulgulara gore$/,
    /bu olguda en uygun secenek hangisidir$/,
    /kisa klinik olgu verileri/,
    /hasta degerlendirilir$/,
  ].some((pattern) => pattern.test(value));
}

function hasVisibleClinicalPattern(question = {}) {
  const stem = cleanText(question.stem || '');
  const branch = normalize(question.relatedBranch || '');
  const questionText = normalize(question.question || '');
  const combined = normalize([question.demographics, question.setting, question.chiefComplaint, question.stem].filter(Boolean).join(' '));
  const hasAgeOrPatient = /\b(?:yaş|yas|aylık|aylik|günlük|gunluk|haftalık|haftalik|yenidoğan|yenidogan|bebek|çocuk|cocuk|ergen|kadın|kadin|erkek|hasta|geb[eelikli]*)\b/.test(combined);
  const hasClinicalFinding = /ateş|ates|ağrı|agri|öksürük|oksuruk|dispne|kusma|ishal|ödem|odem|döküntü|dokuntu|kanama|sarılık|sarilik|nöbet|nobet|halsizlik|kilo|büyüme|buyume|muayene|hipotansiyon|taşikardi|tasikardi|laboratuvar|sodyum|potasyum|glukoz|ph|hco3|kreatinin|lökosit|lokosit|trombosit|hemoglobin|troponin|ekg|usg|bt|mr|grafi|biyopsi|kültür|kultur|öykü|oyku/.test(combined);
  const asksFromFindings = /bu bulgulara gore|bu olguda|verilen bulgular|asagidaki testlerden|hangi test|hangi tedavi|hangi tani|hangisi/.test(questionText);
  if (asksFromFindings && (!hasAgeOrPatient || !hasClinicalFinding)) return false;
  if (/cocuk sagligi|pediatri/.test(branch) && !/(aylık|aylik|yaş|yas|günlük|gunluk|yenidoğan|yenidogan|bebek|çocuk|cocuk|ergen)/iu.test(stem)) return false;
  return true;
}

function hasImpossibleClinicalValue(question = {}) {
  const text = collectStrings(question).join(' | ');
  const normalized = cleanText(text);

  const feverMatches = [...normalized.matchAll(/(?:ateş|ates|sıcaklık|sicaklik)[^0-9-]{0,24}(-?\d{1,2}(?:[.,]\d)?)/giu)];
  for (const match of feverMatches) {
    const value = Number.parseFloat(String(match[1]).replace(',', '.'));
    if (Number.isFinite(value) && (value < 30 || value > 45)) return true;
  }

  const spo2Matches = [...normalized.matchAll(/(?:spo₂|spo2|satürasyon|saturasyon)[^0-9]{0,24}%?\s*(\d{1,3})/giu)];
  for (const match of spo2Matches) {
    const value = Number.parseFloat(match[1]);
    if (Number.isFinite(value) && (value < 40 || value > 100)) return true;
  }

  if (/\byapılanmada\b|\byapilanmada\b|\bsağ koroner arter Z-skoru 3\b.*\bZ-skoru 3\.5\b/iu.test(normalized)) return true;
  if (/(?:ekokardiyografi|eko|bt|mr|usg|laboratuvar|destekleyici veriler)\s*[|;]\s*(?:ekokardiyografi|eko|bt|mr|usg|laboratuvar|destekleyici veriler)/iu.test(normalized)) return true;
  return false;
}


function hasMalformedTurkishClinicalWording(question = {}) {
  const rawText = collectStrings(question).join(' | ');
  const value = normalize(rawText);
  const forbidden = [
    /yogunlasma kaybi/,
    /konsantrasyon kaybi/,
    /konsantre olma kaybi/,
    /hasta degerlendirildi(?:\.|$)/,
    /klinik veriler birlikte degerlendirilir/,
    /karar verdirici bulgular birlikte degerlendirilir/,
    /kisa klinik baglam/,
    /amonyak seviyesinin yol acacagi norotoksisite/,
  ];
  if (forbidden.some((pattern) => pattern.test(value))) return true;

  const sentences = cleanText(rawText).split(/(?<=[.!?])\s+/u).map((item) => item.trim()).filter(Boolean);
  return sentences.some((sentence) => {
    const normalizedSentence = normalize(sentence);
    if (!normalizedSentence) return false;
    if (/\b(?:sikayet|bulgu|tetkik|muayene|laboratuvar|goruntuleme)\b\s*[:|]\s*$/u.test(normalizedSentence)) return true;
    if (/\b(?:nedeniyle|ile|ve|veya|fakat|ancak|olarak|sonucu)\s*$/u.test(normalizedSentence)) return true;
    if (/^(?:da|de)\s+[a-z0-9]/u.test(normalizedSentence)) return true;
    if (/\bda renin\/aldosteron\b/u.test(normalizedSentence)) return true;
    return false;
  });
}

function hasAmbiguousHyperammonemiaEmergencyTarget(question = {}) {
  const rawText = collectStrings(question).join(' | ');
  const value = normalize(rawText);
  const stem = normalize([question.stem, question.compactVitals, question.compactObjectiveData].filter(Boolean).join(' | '));
  const questionText = normalize(question.question || '');
  const optionsText = normalize(asArray(question.options).map((option) => typeof option === 'string' ? option : option?.text || '').join(' | '));

  const isHyperammonemia = /hiperamonyemi|amonyak|ure siklus|urea siklus|ornitin transkarbamilaz|karbamoil fosfat|n asetilglutamat|nags/.test(value);
  if (!isHyperammonemia) return false;

  const asksEmergencyChoice = /acil|en hizli|ilk|oncelikli|tedavi|mudahale|yonetim|azaltacak|dusurecek|giderecek/.test(questionText);
  const hasDialysisOption = /hemodiyaliz|diyaliz|hemofiltrasyon|peritoneal diyaliz/.test(optionsText);
  const hasScavengerOption = /benzoat|fenilbutirat|fenilasetat|nitrojen scavenger|azot baglayici/.test(optionsText);
  const hasAnticatabolicOption = /dekstroz|glukoz|lipid|protein kes|protein alimini kes/.test(optionsText);
  const comparesTreatmentBundle = [hasDialysisOption, hasScavengerOption, hasAnticatabolicOption].filter(Boolean).length >= 2;
  if (!asksEmergencyChoice && !comparesTreatmentBundle) return false;

  const hasAmmoniaValue = /amonyak[^0-9<>]{0,40}(?:>|≥|>=)?\s*\d{2,4}|\d{2,4}\s*(?:umol|µmol|mikromol|μmol)\s*\/\s*l[^|.]{0,40}amonyak/u.test(rawText.toLocaleLowerCase('tr'));
  const hasSevereNeuro = /koma|nobet|ensefalopati|bilinc bulanikligi|bilinc degisikligi|letarji|somnolans|hipotoni|serebral odem|deserebrasyon|solunum depresyonu/.test(stem);
  const hasVeryHighQualifier = /cok yuksek amonyak|agir hiperamonyemi|ciddi hiperamonyemi|hizla yukselen amonyak|tedaviye ragmen yukselen|agir ensefalopati/.test(stem);
  const hasTimingContext = /protein alimi kesil|dekstroz baslan|azot baglayici|sodyum benzoat|fenilbutirat|ilk destek tedavisine ragmen|baslangic tedavisine ragmen/.test(stem);

  if (/en hizli|hemodiyaliz|diyaliz|nörotoksisite|norotoksisite/.test(value) && !(hasAmmoniaValue || hasVeryHighQualifier) && !hasSevereNeuro) return true;
  if (comparesTreatmentBundle && asksEmergencyChoice && !(hasAmmoniaValue || hasVeryHighQualifier || hasTimingContext)) return true;
  return false;
}

function sanitizeQuestion(question = {}, branch, requestedDifficulty = '') {
  const options = normalizeOptions(question.options);
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  const correctText = options.find((item) => item.id === correctId)?.text || options[0]?.text || '';
  const answerTarget = cleanText(question.answerTarget || question.questionIntent || '');
  const allowManagementSteps = isManagementTarget(answerTarget);
  const rawCompactVitals = compactItems(question.compactVitals || question.vitals || [], 5);
  const rawCompactObjectiveData = compactItems(question.compactObjectiveData || question.objectiveData || [], 8);
  const stemQuestionPair = cleanStemQuestionPair(question.stem, question.question);
  const integratedStem = integrateCompactDataIntoStem(stemQuestionPair.stem, rawCompactVitals, rawCompactObjectiveData);
  const sanitizedQuestionText = stemQuestionPair.question || question.question;
  const sanitized = {
    id: cleanText(question.id) || `ai-spot-openai-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    source: 'real-ai',
    caseType: 'ai-spot',
    relatedBranch: cleanText(question.relatedBranch || branch),
    difficulty: normalizeDifficulty(requestedDifficulty || question.difficulty || 'Orta'),
    learningTarget: cleanText(question.learningTarget || ''),
    answerTarget,
    demographics: cleanText(question.demographics || ''),
    setting: cleanText(question.setting || ''),
    chiefComplaint: cleanText(question.chiefComplaint || ''),
    stem: isGenericOrPlaceholderStem(integratedStem) ? '' : integratedStem,
    compactVitals: rawCompactVitals,
    compactObjectiveData: rawCompactObjectiveData,
    question: ensureQuestion(sanitizedQuestionText),
    options,
    correctAnswer: OPTION_IDS.includes(correctId) ? correctId : (options[0]?.id || 'A'),
    explanation: ensureSentence(cleanGeneratedText(question.explanation || question.whyCorrect || '')),
    wrongOptionFeedback: OPTION_IDS.reduce((acc, id) => {
      const rawFeedback = cleanGeneratedText(question.wrongOptionFeedback?.[id] || question.optionFeedback?.[id] || question.optionRationales?.[id] || '');
      acc[id] = ensureSentence(rawFeedback);
      return acc;
    }, {}),
    evidenceChain: asArray(question.evidenceChain).map(ensureSentence).filter(Boolean),
    examPearl: ensureSentence(stripFeedbackLabel(cleanGeneratedText(question.examPearl || question.teachingPoint))),
    managementSteps: allowManagementSteps ? asArray(question.managementSteps).map(ensureSentence).filter(Boolean) : [],
  };
  const grounded = applyStemDataGrounding(sanitized);
  Object.assign(sanitized, grounded);
  Object.assign(sanitized, normalizeQuestionQualityFields(sanitized));
  sanitized.correctAnswerText = correctText;
  sanitized.aiMeta = {
    ...(sanitized.aiMeta || {}),
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    pipelineAudit: {
      compactVitalsInputCount: rawCompactVitals.length,
      compactObjectiveDataInputCount: rawCompactObjectiveData.length,
      compactDataIntegratedIntoStem: true,
      postAnswerGroundingOk: findUnsupportedCriticalDataClaims(sanitized).length === 0,
      frontendShouldNotTruncate: true,
    },
  };
  attachGlobalQualityReview(sanitized);
  sanitized.semanticFingerprint = makeSignature(sanitized);
  return sanitized;
}

const FALLBACK_BANK = [
  {
    relatedBranch: 'İç Hastalıkları', difficulty: 'Orta', learningTarget: 'Laboratuvar verisini klinik bağlamla birlikte yorumlama.', answerTarget: 'lab_interpretation', demographics: 'Erişkin hasta', setting: 'Acil servis', chiefComplaint: 'Halsizlik', stem: 'Erişkin hasta son günlerde artan halsizlik ve dikkat azalması nedeniyle değerlendirilir. Öyküde sıvı alımında azalma vardır. Muayenede belirgin fokal nörolojik defisit saptanmaz.', compactObjectiveData: [{ label: 'Serum sodyum', value: '122 mEq/L' }, { label: 'Serum osmolalitesi', value: 'Düşük' }], question: 'Bu olgudaki laboratuvar paternini en iyi açıklayan seçenek hangisidir?', options: [{ id: 'A', text: 'Hipotonik hiponatremi' }, { id: 'B', text: 'Hipertonik hiponatremi' }, { id: 'C', text: 'İzotonik psödohiponatremi' }, { id: 'D', text: 'Hipernatremik dehidratasyon' }, { id: 'E', text: 'Primer hiperkalemi' }], correctAnswer: 'A', explanation: 'Düşük sodyum düzeyine düşük serum osmolalitesinin eşlik etmesi hipotonik hiponatremiyi destekler. Sonraki ayrım volüm durumu ve idrar elektrolitleriyle yapılır.', wrongOptionFeedback: { A: 'Bu seçenek düşük osmolalite ile birlikte gerçek hipotonik tabloyu açıklar.', B: 'Bu seçenek osmotik olarak aktif ek solüt varlığında düşünülür; burada düşük osmolalite verilmiştir.', C: 'Psödohiponatremide serum osmolalitesi genellikle normaldir; bu veri burada desteklenmez.', D: 'Hipernatremik tabloda serum sodyumu yüksek beklenir; burada düşük sodyum vardır.', E: 'Potasyum bozukluğu bu panelin ana açıklaması değildir.' }, evidenceChain: ['Serum sodyumu düşüktür.', 'Serum osmolalitesi düşüktür.', 'Bilinç değişikliği semptomatik tabloyu destekler.'], examPearl: 'Hiponatremi yorumunda ilk ayrım serum osmolalitesidir; düşük osmolalite gerçek hipotonik hiponatremiyi gösterir.', managementSteps: [] },
  {
    relatedBranch: 'Çocuk Sağlığı ve Hastalıkları', difficulty: 'Orta', learningTarget: 'Pediatrik acilde risk bulgularını ayırt etme.', answerTarget: 'first_step', demographics: 'Küçük çocuk', setting: 'Çocuk acil', chiefComplaint: 'Ateş ve halsizlik', stem: 'Küçük çocuk ateş ve beslenmede azalma nedeniyle acile getirilir. Aile çocuğun son saatlerde daha halsiz olduğunu belirtir. Muayenede kapiller dolum süresi uzamış ve cilt turgoru azalmıştır.', compactVitals: [{ label: 'Ateş', value: '39 °C' }, { label: 'Nabız', value: 'Taşikardik' }], question: 'Bu olguda öncelikle değerlendirilmesi gereken klinik öncelik hangisidir?', options: [{ id: 'A', text: 'Perfüzyon ve hidrasyon durumu' }, { id: 'B', text: 'Uzun dönem büyüme izlemi' }, { id: 'C', text: 'Rutin aşı takvimi planı' }, { id: 'D', text: 'Elektif dermatoloji değerlendirmesi' }, { id: 'E', text: 'Okul çağı psikososyal taraması' }], correctAnswer: 'A', explanation: 'Ateşli çocukta halsizlik, uzamış kapiller dolum ve turgor azalması dolaşım ve hidrasyon değerlendirmesini öncelikli kılar. Diğer seçenekler akut acil karar düzeyini karşılamaz.', wrongOptionFeedback: { A: 'Bu seçenek akut risk değerlendirmesinin merkezindedir.', B: 'Büyüme izlemi önemlidir; ancak akut perfüzyon bulguları varken ilk öncelik değildir.', C: 'Aşı takvimi koruyucu sağlık başlığıdır; bu acil başvurunun ilk kararını açıklamaz.', D: 'Elektif değerlendirme akut sistemik bulguların önüne geçmez.', E: 'Psikososyal tarama bu akut perfüzyon sorununu yanıtlamaz.' }, evidenceChain: ['Beslenme azalmıştır.', 'Kapiller dolum süresi uzamıştır.', 'Cilt turgoru azalmıştır.'], examPearl: 'Pediatrik acilde genel durum ve perfüzyon bulguları tanısal ayrıntılardan önce değerlendirilir.', managementSteps: ['Hava yolu, solunum ve dolaşım hızlıca değerlendirilir.', 'Perfüzyon ve hidrasyon bulgularına göre sıvı planı yapılır.'] },
];

function enhanceFallbackQuestionQuality(question = {}) {
  const correctText = normalize(getCorrectText(question));
  if (/hipotonik hiponatremi/.test(correctText)) {
    question.explanation = 'Serum sodyumunun düşük olması ve buna düşük serum osmolalitesinin eşlik etmesi gerçek hipotonik hiponatremi paternini destekler. Bu olguda dikkat azalması semptomatik hiponatremi bağlamı kurar; sonraki klinik ayrım volüm durumu ve idrar elektrolitleriyle yapılır.';
    question.wrongOptionFeedback = {
      A: 'Hipotonik hiponatremi, düşük serum sodyumuna düşük serum osmolalitesinin eşlik ettiği gerçek hiponatremi tablosunu temsil eder. Bu olguda sodyum 122 mEq/L ve osmolalite düşük verildiği için seçenek kökteki laboratuvar paternini doğrudan açıklar.',
      B: 'Hipertonik hiponatremi, hiperglisemi veya mannitol gibi osmotik aktif solütlerin serum osmolalitesini yükselttiği durumlarda düşünülür. Bu olguda serum osmolalitesi düşük verildiği için tablo hipertonik değil, hipotonik hiponatremi yönündedir.',
      C: 'İzotonik psödohiponatremi, serum sodyumu düşük ölçülse bile serum osmolalitesinin genellikle normal kaldığı ölçüm/pseudo bozukluklarıyla ilişkilidir. Burada osmolalitenin düşük olması gerçek hipotonik süreci destekler ve psödohiponatremiyi geri plana iter.',
      D: 'Hipernatremik dehidratasyonda temel laboratuvar beklentisi serum sodyumunun yüksek olmasıdır. Bu olguda sodyum 122 mEq/L olarak düşük verildiğinden dehidratasyon öyküsü olsa bile seçenek ana laboratuvar paternini açıklamaz.',
      E: 'Primer hiperkalemi, potasyum yüksekliği ve buna bağlı kardiyak ya da nöromüsküler risk üzerinden yorumlanan farklı bir elektrolit bozukluğudur. Kökte potasyum yüksekliği değil sodyum-osmolalite uyumsuzluğu verildiği için karar noktası hiponatremi sınıflaması ve osmolalite ayrımıdır.',
    };
    question.optionFeedback = question.wrongOptionFeedback;
    question.evidenceChain = [
      'Serum sodyumu 122 mEq/L olarak düşüktür.',
      'Serum osmolalitesi düşük verilmiştir.',
      'Dikkat azalması semptomatik hiponatremi bağlamını destekler.',
    ];
    question.examPearl = 'Hiponatremide ilk sınıflama serum osmolalitesine göre yapılır; düşük osmolalite gerçek hipotonik hiponatremiyi destekler.';
  } else if (/perf[uü]zyon|hidrasyon/.test(correctText)) {
    question.explanation = 'Ateşli ve halsiz çocukta uzamış kapiller dolum ile cilt turgorunda azalma, dolaşım ve hidrasyon değerlendirmesini ilk klinik öncelik yapar. Bu bulgular akut risk triyajını belirlediği için elektif veya koruyucu sağlık başlıkları bu başvuruda ilk adım değildir.';
    question.wrongOptionFeedback = {
      A: 'Perfüzyon ve hidrasyon durumu, ateşli çocukta dolaşım yeterliliği ve sıvı açığı riskini değerlendiren akut klinik önceliktir. Bu olguda uzamış kapiller dolum ve azalmış cilt turgoru verildiği için doğru karar noktası bu seçenektir.',
      B: 'Uzun dönem büyüme izlemi pediatrik takipte önemlidir ve kronik gelişim değerlendirmesinde kullanılır. Ancak kökte akut ateş, halsizlik, uzamış kapiller dolum ve turgor azalması bulunduğundan ilk öncelik büyüme izlemi değil dolaşım-hidrasyon değerlendirmesidir.',
      C: 'Rutin aşı takvimi planı koruyucu sağlık hizmetinin parçasıdır ve stabil çocuğun izlemlerinde ele alınır. Bu başvuruda akut perfüzyon ve hidrasyon bulguları ön planda olduğu için aşı planı ilk klinik karar değildir.',
      D: 'Elektif dermatoloji değerlendirmesi cilt bulgularının acil sistemik risk taşımadığı durumlarda düşünülebilir. Burada karar verdiren bulgular kapiller dolum uzaması ve turgor azalmasıdır; bu nedenle elektif değerlendirme akut önceliği karşılamaz.',
      E: 'Okul çağı psikososyal taraması gelişimsel ve sosyal izlemin parçasıdır. Bu olguda çocuk acile ateş ve halsizlikle getirilmiş, muayenede perfüzyon-hidrasyon riski verilmiştir; bu nedenle tarama yaklaşımı doğru ilk adım değildir.',
    };
    question.optionFeedback = question.wrongOptionFeedback;
    question.evidenceChain = [
      'Ateş ve halsizlik akut başvuru bağlamı oluşturur.',
      'Kapiller dolum süresi uzamıştır.',
      'Cilt turgorunun azalması hidrasyon riskini destekler.',
    ];
    question.examPearl = 'Pediatrik acilde ilk öncelik genel durum, dolaşım ve hidrasyon riskini belirleyen bulguları hızla değerlendirmektir.';
  }
  return question;
}

export function fallbackQuestion({ branchFilter, difficulty = 'Orta', recentQuestionSummaries }) {
  const branch = chooseBranch(branchFilter);
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const recentCorrectAnswers = new Set(asArray(recentQuestionSummaries).map((item) => normalize(item.correct || item.correctAnswer || item.correctAnswerText || '')));
  const candidates = FALLBACK_BANK.filter((item) => normalize(branchFilter).includes(normalize(item.relatedBranch)) || normalize(item.relatedBranch).includes(normalize(branchFilter)) || ['random', 'rastgele', ''].includes(normalize(branchFilter)));
  const pool = candidates.length ? candidates : FALLBACK_BANK;
  const selected = pool.find((item) => !recentCorrectAnswers.has(normalize(getCorrectText(item)))) || pool[Math.floor(Math.random() * pool.length)];
  return enhanceFallbackQuestionQuality(sanitizeQuestion({ ...selected, difficulty: selectedDifficulty, id: `ai-spot-fallback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, branch, selectedDifficulty));
}

function getJsonCandidate(text = '') {
  const trimmed = String(text || '').trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

function parseModelJson(text = '') {
  return JSON.parse(getJsonCandidate(text));
}

function extractChatText(payload = {}) {
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.map((item) => item?.text || item?.content || '').join('\n');
  return '';
}

function extractResponsesText(payload = {}) {
  if (typeof payload.output_text === 'string') return payload.output_text;
  const chunks = [];
  asArray(payload.output).forEach((item) => asArray(item.content).forEach((part) => {
    if (typeof part.text === 'string') chunks.push(part.text);
    if (typeof part.output_text === 'string') chunks.push(part.output_text);
  }));
  return chunks.join('\n');
}

function tusQuestionDetailMode() {
  const mode = detailModeForProfile('TUS');
  return mode === 'concise' ? 'standard' : mode;
}

function buildPrompt({ branch, target, difficulty = 'Orta', recentQuestionSummaries = [], sourceText = '', attempt = 1, antiRepeatNonce = '', detailMode = tusQuestionDetailMode(), qualityFeedback = '' }) {
  const answerTarget = cleanText(target || '');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const recentCompact = buildRecentCompact(recentQuestionSummaries);
  return buildUserPrompt({
    branch,
    target: answerTarget,
    difficulty: selectedDifficulty,
    recentCompact,
    attempt,
    sourceText,
    antiRepeatNonce: antiRepeatNonce || Date.now(),
    detailMode,
    qualityFeedback,
  });
}

function createAbortSignal(timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return { signal: controller.signal, cancel: () => clearTimeout(timeout) };
}

function shouldUseResponsesApi(model = '', explicitStyle = '') {
  const style = String(explicitStyle || '').toLowerCase();
  if (style === 'responses' || style === 'response') return true;
  if (style === 'chat' || style === 'chat_completions') return false;
  return /^gpt-5/i.test(String(model || '')) || /^o\d/i.test(String(model || ''));
}

function modelSupportsReasoningEffort(model = '') {
  return /^gpt-5/i.test(String(model || '')) || /^o\d/i.test(String(model || ''));
}

function safeReasoningEffort(value = '') {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'minimal') return 'low';
  if (/^(none|low|medium|high|xhigh)$/.test(normalized)) return normalized;
  return 'low';
}

function safeVerbosity(value = '') {
  return /^(low|medium|high)$/i.test(String(value || '')) ? String(value).toLowerCase() : 'medium';
}

async function callOpenAI(prompt, { detailMode = tusQuestionDetailMode() } = {}) {
  const startedAt = Date.now();
  const apiKey = process.env.TUS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const model = currentTusModel();
  const baseUrl = (process.env.TUS_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const requestedTimeoutMs = Number(process.env.TUS_OPENAI_PER_REQUEST_TIMEOUT_MS || process.env.OPENAI_PER_REQUEST_TIMEOUT_MS || 48000);
  const timeoutMs = Math.max(35000, Math.min(52000, requestedTimeoutMs || 48000));
  const requestedMaxTokens = Number(process.env.TUS_OPENAI_MAX_OUTPUT_TOKENS || process.env.OPENAI_MAX_OUTPUT_TOKENS || 0);
  const maxTokens = requestedMaxTokens > 0 ? Math.max(3600, requestedMaxTokens) : applyCostProfileToMaxTokens('TUS', TASK_NAME, 4200);
  // TUS üretiminde global OPENAI_API_STYLE değerini zorunlu kabul etmiyoruz.
  // Daha önce global responses ayarı + düşük token limiti, output kesilince endpoint'in local fallback dönmesine yol açabiliyordu.
  // TUS_OPENAI_API_STYLE açıkça verilmediyse modelin en stabil varsayılan akışını kullan.
  const explicitStyle = process.env.TUS_OPENAI_API_STYLE || '';
  const useResponses = shouldUseResponsesApi(model, explicitStyle);
  const style = useResponses ? 'responses' : 'chat';
  const reasoningEffort = safeReasoningEffort(process.env.TUS_OPENAI_REASONING_EFFORT || process.env.OPENAI_REASONING_EFFORT || defaultReasoningEffortForProfile('TUS'));
  const verbosity = safeVerbosity(process.env.TUS_OPENAI_VERBOSITY || process.env.OPENAI_VERBOSITY || defaultVerbosityForProfile('TUS'));
  const { signal, cancel } = createAbortSignal(timeoutMs);
  try {
    const promptCacheConfig = buildPromptCacheConfig('TUS', TASK_NAME, PROMPT_VERSION);
    const body = useResponses
      ? {
          model,
          instructions: SYSTEM_PROMPT,
          input: prompt,
          text: { format: { type: 'json_object' }, verbosity },
          ...(modelSupportsReasoningEffort(model) ? { reasoning: { effort: reasoningEffort } } : {}),
          max_output_tokens: maxTokens,
          store: false,
          truncation: 'auto',
          ...promptCacheConfig,
        }
      : {
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
          max_completion_tokens: maxTokens,
          ...promptCacheConfig,
        };
    if (!useResponses && modelSupportsReasoningEffort(model)) {
      body.reasoning_effort = reasoningEffort;
    }
    const apiResult = await callOpenAIWithPromptCacheFallback({
      body,
      endpointType: useResponses ? 'responses' : 'chat_completions',
      task: TASK_NAME,
      openai: (bodyToSend) => fetch(`${baseUrl}${useResponses ? '/responses' : '/chat/completions'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify(bodyToSend),
        signal,
      }),
    });
    if (!apiResult.ok) {
      const error = new Error(`OpenAI ${apiResult.status}: ${String(apiResult.text || '').slice(0, 500)}`);
      error.status = apiResult.status;
      throw error;
    }
    const data = JSON.parse(apiResult.text || '{}');
    logAIUsage({ task: TASK_NAME, model: data.model || model, usage: data.usage || null, cached: false, apiStyle: style, promptVersion: PROMPT_VERSION, durationMs: Date.now() - startedAt });
    const text = useResponses ? extractResponsesText(data) : extractChatText(data);
    if (!String(text || '').trim()) {
      const reason = data?.incomplete_details?.reason || data?.status || 'empty_output';
      const error = new Error(`OpenAI boş çıktı döndürdü (${reason}). Output token limitini artırın veya reasoning effort değerini low/none kullanın.`);
      error.validationErrors = [`token/output incomplete: ${reason}`];
      error.qualitySeverity = 'repairable';
      throw error;
    }
    let question;
    try {
      question = parseModelJson(text);
    } catch (parseError) {
      const error = new Error(`model-json-parse-failed: ${parseError?.message || parseError}`);
      error.validationErrors = ['json parse/schema repair required'];
      error.qualitySeverity = 'repairable';
      throw error;
    }
    return { question, model: data.model || model, mode: style };
  } finally {
    cancel();
  }
}

async function generateRemote({ branch, target, difficulty, recentQuestionSummaries, sourceText = '', attempt, antiRepeatNonce, detailMode = tusQuestionDetailMode(), qualityFeedback = '' }) {
  const prompt = buildPrompt({ branch, target, difficulty, recentQuestionSummaries, sourceText, attempt, antiRepeatNonce, detailMode, qualityFeedback });
  const result = await callOpenAI(prompt, { detailMode });
  if (!result) throw new Error('OPENAI_API_KEY tanımlı değil; AI üretim yapılamadı.');
  const sanitized = sanitizeQuestion(result.question, branch, difficulty);
  sanitized.provider = 'openai';
  sanitized.openAIModel = result.model;
  sanitized.openAIMode = result.mode;
  sanitized.promptVersion = PROMPT_VERSION;
  sanitized.schemaVersion = SCHEMA_VERSION;
  sanitized.aiMeta = { ...(sanitized.aiMeta || {}), costProfile: getAICostProfile('TUS'), detailMode };
  let publisherGate = runQuestionQualityGate(sanitized, { version: PROMPT_VERSION });
  let repairApplied = [];
  if (publisherGate.canAttemptRepair) {
    const repaired = repairQuestionQualityIssues(sanitized, publisherGate);
    repairApplied = repaired.applied || [];
    if (repairApplied.length) {
      Object.assign(sanitized, repaired.question);
      publisherGate = runQuestionQualityGate(sanitized, { version: PROMPT_VERSION });
    }
  }
  const finalFeedbackResult = applyFinalFeedbackQualityGate(sanitized, {
    version: `${PROMPT_VERSION}:final-feedback`,
    baseVersion: PROMPT_VERSION,
  });
  const finalFeedbackRepairApplied = finalFeedbackResult.repairApplied || [];
  if (finalFeedbackRepairApplied.length) {
    Object.assign(sanitized, finalFeedbackResult.question);
    publisherGate = runQuestionQualityGate(sanitized, { version: PROMPT_VERSION });
  }
  let finalFeedbackGate = finalFeedbackResult.gate;
  let localPublishRepairApplied = [];
  const localRepairReasons = [
    ...publisherGate.repairableErrors,
    ...finalFeedbackGate.repairableErrors,
    ...publisherGate.blockingErrors.filter(canAttemptLocalPublishRepair),
    ...finalFeedbackGate.blockingErrors.filter(canAttemptLocalPublishRepair),
  ];
  if (localRepairReasons.length) {
    const repaired = repairTusQuestionForPublish(sanitized, localRepairReasons);
    localPublishRepairApplied = repaired.applied || [];
    if (!repaired.blocked && localPublishRepairApplied.length) {
      Object.assign(sanitized, repaired.question);
      publisherGate = runQuestionQualityGate(sanitized, { version: PROMPT_VERSION });
      const refreshedFinalFeedback = applyFinalFeedbackQualityGate(sanitized, {
        version: `${PROMPT_VERSION}:final-feedback`,
        baseVersion: PROMPT_VERSION,
      });
      if ((refreshedFinalFeedback.repairApplied || []).length) {
        Object.assign(sanitized, refreshedFinalFeedback.question);
        publisherGate = runQuestionQualityGate(sanitized, { version: PROMPT_VERSION });
      }
      finalFeedbackGate = refreshedFinalFeedback.gate;
      localPublishRepairApplied.push(...(refreshedFinalFeedback.repairApplied || []).map((item) => `post-local-${item}`));
    }
  }
  sanitized.aiMeta = {
    ...(sanitized.aiMeta || {}),
    backendQualityGate: {
      ok: publisherGate.ok,
      decision: publisherGate.decision,
      errors: publisherGate.errors,
      blockingErrors: publisherGate.blockingErrors,
      repairableErrors: publisherGate.repairableErrors,
      warnings: publisherGate.warnings,
      cues: publisherGate.cues,
      demand: publisherGate.demand,
      version: publisherGate.version,
      repairApplied,
    },
    finalFeedbackQualityGate: {
      ok: finalFeedbackGate.ok,
      decision: finalFeedbackGate.decision,
      errors: finalFeedbackGate.errors,
      blockingErrors: finalFeedbackGate.blockingErrors,
      repairableErrors: finalFeedbackGate.repairableErrors,
      warnings: finalFeedbackGate.warnings,
      version: finalFeedbackGate.version,
      repairApplied: finalFeedbackRepairApplied,
      localPublishRepairApplied,
      baseGate: finalFeedbackGate.baseGate,
    },
    publishable: publisherGate.publishable && finalFeedbackGate.publishable,
  };
  if (publisherGate.blockingErrors.length) {
    const error = new Error(`Backend quality gate failed: ${publisherGate.errors.join('; ')}`);
    error.validationErrors = publisherGate.errors;
    error.qualitySeverity = 'blocking';
    error.question = sanitized;
    throw error;
  }
  if (finalFeedbackGate.blockingErrors.length) {
    const error = new Error(`Final feedback quality gate failed: ${finalFeedbackGate.blockingErrors.join('; ')}`);
    error.validationErrors = finalFeedbackGate.blockingErrors;
    error.qualitySeverity = 'blocking';
    error.question = sanitized;
    throw error;
  }
  if (publisherGate.repairableErrors.length) {
    const error = new Error(`Backend quality gate needs targeted repair: ${publisherGate.repairableErrors.join('; ')}`);
    error.validationErrors = publisherGate.repairableErrors;
    error.qualitySeverity = 'repairable';
    error.question = sanitized;
    throw error;
  }
  if (finalFeedbackGate.repairableErrors.length) {
    const error = new Error(`Final feedback quality gate needs targeted repair: ${finalFeedbackGate.repairableErrors.join('; ')}`);
    error.validationErrors = finalFeedbackGate.repairableErrors;
    error.qualitySeverity = 'repairable';
    error.question = sanitized;
    throw error;
  }
  let validation = validateQuestion(sanitized, recentQuestionSummaries);
  sanitized.aiMeta = {
    ...(sanitized.aiMeta || {}),
    legacyValidationGate: {
      ok: validation.ok,
      stages: validation.stages,
      issues: validation.issues,
      blockingErrors: validation.blockingErrors,
      repairableErrors: validation.repairableErrors,
      warnings: validation.warnings,
    },
  };
  if (!validation.ok) {
    const hardBlockingErrors = legacyHardBlockingValidationErrors(validation.errors);

    if (hardBlockingErrors.length) {
      const error = new Error(hardBlockingErrors.join('; '));
      error.validationErrors = hardBlockingErrors;
      error.qualitySeverity = 'blocking';
      error.question = sanitized;
      throw error;
    }

    const validationRepairReasons = [
      ...validation.repairableErrors,
      ...validation.blockingErrors.filter(canAttemptLocalPublishRepair),
    ];
    if (validationRepairReasons.length) {
      const repaired = repairTusQuestionForPublish(sanitized, validationRepairReasons);
      if (!repaired.blocked && (repaired.applied || []).length) {
        Object.assign(sanitized, repaired.question);
        publisherGate = runQuestionQualityGate(sanitized, { version: PROMPT_VERSION });
        const refreshedFinalFeedback = applyFinalFeedbackQualityGate(sanitized, {
          version: `${PROMPT_VERSION}:final-feedback`,
          baseVersion: PROMPT_VERSION,
        });
        if ((refreshedFinalFeedback.repairApplied || []).length) {
          Object.assign(sanitized, refreshedFinalFeedback.question);
          publisherGate = runQuestionQualityGate(sanitized, { version: PROMPT_VERSION });
        }
        finalFeedbackGate = refreshedFinalFeedback.gate;
        validation = validateQuestion(sanitized, recentQuestionSummaries);
        sanitized.aiMeta = {
          ...(sanitized.aiMeta || {}),
          legacyValidationGate: {
            ok: validation.ok,
            stages: validation.stages,
            issues: validation.issues,
            blockingErrors: validation.blockingErrors,
            repairableErrors: validation.repairableErrors,
            warnings: validation.warnings,
            localPublishRepairApplied: repaired.applied,
          },
        };
      }
    }

    if (publisherGate.blockingErrors.length || finalFeedbackGate.blockingErrors.length || validation.blockingErrors.length || validation.repairableErrors.length) {
      const error = new Error(`Legacy validation needs targeted repair: ${validation.repairableErrors.join('; ')}`);
      error.validationErrors = [
        ...publisherGate.blockingErrors,
        ...finalFeedbackGate.blockingErrors,
        ...validation.blockingErrors,
        ...validation.repairableErrors,
      ];
      error.qualitySeverity = (publisherGate.blockingErrors.length || finalFeedbackGate.blockingErrors.length || validation.blockingErrors.length) ? 'blocking' : 'repairable';
      error.question = sanitized;
      throw error;
    }

    sanitized.qualityNotes = validation.warnings;
    sanitized.qualityGate = 'publisher-passed-with-legacy-warnings';
  } else {
    sanitized.qualityGate = (publisherGate.warnings.length || finalFeedbackGate.warnings.length) ? 'publisher-passed-with-warnings' : 'strict-passed';
  }
  const legacyBlocking = legacyBlockingReviewIssues(sanitized);
  if (legacyBlocking.length) {
    const errors = summarizeQualityFailure({ gate: publisherGate, legacyBlocking });
    const error = new Error(errors.join('; ') || 'Question failed blocking legacy quality review.');
    error.validationErrors = errors;
    error.qualitySeverity = 'blocking';
    error.question = sanitized;
    throw error;
  }
  const legacyReview = sanitized.aiMeta?.globalQualityReview;
  if (legacyReview?.decision && legacyReview.decision !== 'addable') {
    sanitized.qualityNotes = Array.from(new Set([
      ...(sanitized.qualityNotes || []),
      ...(legacyReview.summary || []),
    ]));
  }
  sanitized.qualityGate = sanitized.qualityNotes?.length || publisherGate.warnings.length || finalFeedbackGate.warnings.length
    ? 'publisher-passed-with-warnings'
    : 'strict-publisher-passed';
  return sanitized;
}


export function questionMatchesRecent(question = {}, recentQuestionSummaries = []) {
  const signature = normalize(question.semanticFingerprint || question.id || '');
  const correct = questionLikeCorrectText(question);
  const target = questionLikeTarget(question);
  const stem = questionLikeStem(question);
  const options = optionSetSignature(question);
  return asArray(recentQuestionSummaries).some((item) => {
    const itemSignature = normalize(item.semanticFingerprint || item.id || item.questionId || '');
    if (signature && itemSignature && signature === itemSignature) return true;
    const itemCorrect = questionLikeCorrectText(item);
    const itemTarget = questionLikeTarget(item);
    const itemStem = questionLikeStem(item);
    const itemOptions = optionSetSignature(item);
    const stemOverlap = tokenSimilarity(stem, itemStem);
    const targetOverlap = tokenSimilarity(target, itemTarget);
    const sameAnswer = correct && itemCorrect && correct === itemCorrect;
    const sameOptions = options && itemOptions && options === itemOptions;
    if (stem.length > 100 && itemStem.length > 100 && stemOverlap >= 0.86) return true;
    if (sameAnswer && sameOptions && Math.max(stemOverlap, targetOverlap) >= 0.72) return true;
    if (sameAnswer && targetOverlap >= 0.9 && stemOverlap >= 0.45) return true;
    return false;
  });
}

async function getReusableBankQuestion({ branch, target, difficulty, recentQuestionSummaries }) {
  if (!useQuestionBank()) return null;
  const model = currentTusModel();
  const bankKey = buildQuestionBankKey({ scope: 'TUS', branch, difficulty, target, promptVersion: PROMPT_VERSION, model });
  const items = await getQuestionBankItems(bankKey, { maxItems: 40 });
  const reusable = items.find((item) => {
    if (questionMatchesRecent(item, recentQuestionSummaries)) return false;
    const candidate = sanitizeQuestion({ ...item, id: `ai-spot-bank-check-${Date.now()}` }, branch, difficulty);
    const validation = validateQuestion(candidate, recentQuestionSummaries);
    const publisherGate = runQuestionQualityGate(candidate, { version: PROMPT_VERSION });
    const finalFeedbackGate = runFinalFeedbackQualityGate(candidate, { version: `${PROMPT_VERSION}:final-feedback`, baseVersion: PROMPT_VERSION });
    const validationBlocking = legacyHardBlockingValidationErrors(validation.errors || []);
    if (
      publisherGate.publishable
      && finalFeedbackGate.publishable
      && !validationBlocking.length
      && !(validation.blockingErrors || []).length
      && !(validation.repairableErrors || []).length
      && !legacyBlockingReviewIssues(candidate).length
    ) return true;
    return false;
  });
  if (!reusable) return null;
  const cloned = sanitizeQuestion({ ...reusable, id: `ai-spot-bank-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, branch, difficulty);
  cloned.provider = 'openai-question-bank';
  cloned.cached = true;
  cloned.openAIModel = reusable.openAIModel || model;
  cloned.promptVersion = reusable.promptVersion || PROMPT_VERSION;
  cloned.schemaVersion = reusable.schemaVersion || SCHEMA_VERSION;
  cloned.aiMeta = { ...(cloned.aiMeta || {}), questionBank: true, cached: true };
  return cloned;
}

async function storeReusableQuestion({ branch, target, difficulty, question }) {
  if (!useQuestionBank() || !question || question.fallback) return false;
  if (legacyBlockingReviewIssues(question).length) return false;
  const publisherGate = runQuestionQualityGate(question, { version: PROMPT_VERSION });
  const finalFeedbackGate = runFinalFeedbackQualityGate(question, { version: `${PROMPT_VERSION}:final-feedback`, baseVersion: PROMPT_VERSION });
  const validation = validateQuestion(question, []);
  if (!publisherGate.publishable || !finalFeedbackGate.publishable || !validation.ok) return false;
  const model = question.openAIModel || currentTusModel();
  const bankKey = buildQuestionBankKey({ scope: 'TUS', branch, difficulty, target, promptVersion: PROMPT_VERSION, model });
  return addQuestionToBank(bankKey, question);
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }

  const branch = chooseBranch(body.branchFilter);
  const requestedDifficulty = normalizeDifficulty(body.difficulty || body.requestedDifficulty || body.aiDifficulty || 'Orta');
  const recentQuestionSummaries = asArray(body.recentQuestionSummaries).slice(0, 12);
  const remoteAttempts = Math.max(1, Math.min(3, Number(process.env.REMOTE_AI_ATTEMPTS || process.env.TUS_REMOTE_AI_ATTEMPTS || 3)));
  const repairRegenerationBudget = Math.max(0, Math.min(2, Number(process.env.TUS_REPAIR_REGENERATION_ATTEMPTS || 1)));
  const blockingRegenerationBudget = Math.max(0, Math.min(2, Number(process.env.TUS_BLOCKING_REGENERATION_ATTEMPTS || 1)));
  const errors = [];
  const failureDetails = [];
  const target = body.target || body.answerTarget || '';
  const sourceText = cleanText(body.sourceText || body.userSourceText || body.referenceText || '');
  const model = currentTusModel();
  const oneShotCacheKey = buildOutputCacheKey({
    scope: 'TUS',
    task: TASK_NAME,
    promptVersion: PROMPT_VERSION,
    model,
    sourceFingerprint: `${branch}:${requestedDifficulty}:${target || 'general'}:${sourceText.slice(0, 160)}`, 
    extra: { recent: recentQuestionSummaries.map((item) => item?.semanticFingerprint || item?.id || item?.learningTarget || '').slice(0, 6) },
  });

  return await withInFlightDedupe(oneShotCacheKey, async () => {
    const reusable = await getReusableBankQuestion({ branch, target, difficulty: requestedDifficulty, recentQuestionSummaries });
    if (reusable) {
      logAIUsage({ task: `${TASK_NAME}:questionBank`, model: reusable.openAIModel || model, cached: true, apiStyle: 'question_bank', promptVersion: PROMPT_VERSION, sourceFingerprint: oneShotCacheKey, finalOutput: true });
      return sendJson(response, 200, {
        ok: true,
        provider: 'openai-question-bank',
        cached: true,
        fallback: false,
        question: reusable,
      });
    }

    const cachedPayload = await getDurableCachedOutput(oneShotCacheKey);
    if (cachedPayload?.question && !questionMatchesRecent(cachedPayload.question, recentQuestionSummaries)) {
      const cachedGate = runQuestionQualityGate(cachedPayload.question, { version: PROMPT_VERSION });
      const cachedFinalGate = runFinalFeedbackQualityGate(cachedPayload.question, { version: `${PROMPT_VERSION}:final-feedback`, baseVersion: PROMPT_VERSION });
      const cachedValidation = validateQuestion(cachedPayload.question, recentQuestionSummaries);
      if (cachedGate.publishable && cachedFinalGate.publishable && cachedValidation.ok && !legacyBlockingReviewIssues(cachedPayload.question).length) {
        logAIUsage({ task: `${TASK_NAME}:outputCache`, model: cachedPayload.question.openAIModel || model, cached: true, apiStyle: 'output_cache', promptVersion: PROMPT_VERSION, sourceFingerprint: oneShotCacheKey, finalOutput: true, validator: { cachedGate: cachedGate.decision, finalFeedbackGate: cachedFinalGate.decision, legacyValidation: cachedValidation.stages } });
        return sendJson(response, 200, { ok: true, cached: true, fallback: false, provider: cachedPayload.provider || 'openai-output-cache', question: cachedPayload.question });
      }
    }

    if (!envFlag('KLINIKIQ_LIVE_TUS_AI', true)) {
      return sendJson(response, 503, {
        ok: false,
        error: 'Live AI generation is disabled; no learner-facing fallback question is served.',
        manualReviewRequired: true,
        fallback: false,
      });
    }

    const detailMode = tusQuestionDetailMode();
    let qualityFeedback = '';
    let repairExtensionsUsed = 0;
    let blockingExtensionsUsed = 0;
    for (let attempt = 1; attempt <= remoteAttempts + repairExtensionsUsed + blockingExtensionsUsed; attempt += 1) {
      try {
        const question = await generateRemote({ branch, target, difficulty: requestedDifficulty, recentQuestionSummaries, sourceText, attempt, antiRepeatNonce: body.antiRepeatNonce, detailMode, qualityFeedback });
        await storeReusableQuestion({ branch, target, difficulty: requestedDifficulty, question });
        await setDurableCachedOutput(oneShotCacheKey, { provider: 'openai-output-cache', question });
        return sendJson(response, 200, {
          ok: true,
          provider: 'openai',
          fallback: false,
          question,
        });
      } catch (error) {
        const message = error?.message || String(error);
        const classified = classifyTusValidationErrors(error?.validationErrors?.length ? error.validationErrors : [message]);
        const severity = error?.qualitySeverity || (classified.blockingErrors.length ? 'blocking' : (classified.repairableErrors.length ? 'repairable' : 'warning'));
        const failure = {
          attempt,
          severity,
          message,
          validationErrors: error?.validationErrors || [],
          stages: classified.stages,
          issues: classified.issues,
        };
        errors.push(message);
        failureDetails.push(failure);
        logQuestionGenerationGate({
          branch,
          difficulty: requestedDifficulty,
          attempt,
          severity,
          stages: classified.stages,
          issues: classified.issues.slice(0, 8),
        });
        if (severity === 'repairable' && attempt >= remoteAttempts && repairExtensionsUsed < repairRegenerationBudget) {
          repairExtensionsUsed += 1;
        }
        if (severity === 'blocking' && attempt >= remoteAttempts && blockingExtensionsUsed < blockingRegenerationBudget) {
          blockingExtensionsUsed += 1;
        }
        qualityFeedback = buildRetryQualityFeedback(failure);
      }
    }

  const hasBlockingFailure = failureDetails.some((failure) => failure.severity === 'blocking');
  const safeFallbackEnabled = String(process.env.AI_ENABLE_SAFE_FALLBACK || 'false').toLowerCase() === 'true';
  if (safeFallbackEnabled && hasBlockingFailure) {
    logFallbackTrigger({
      branch,
      difficulty: requestedDifficulty,
      reason: errors[0] || 'unknown',
      failures: failureDetails.slice(0, 3),
    });
    const question = fallbackQuestion({ branchFilter: branch, difficulty: requestedDifficulty, recentQuestionSummaries });
    const fallbackGate = runQuestionQualityGate(question, { version: PROMPT_VERSION });
    const fallbackFinalGate = runFinalFeedbackQualityGate(question, { version: `${PROMPT_VERSION}:final-feedback`, baseVersion: PROMPT_VERSION });
    const fallbackValidation = validateQuestion(question, recentQuestionSummaries);
    if (!fallbackGate.publishable || !fallbackFinalGate.publishable || !fallbackValidation.ok || legacyBlockingReviewIssues(question).length) {
      logFallbackTrigger({
        branch,
        difficulty: requestedDifficulty,
        reason: 'local-safe-fallback-suppressed-by-quality-gate',
        failures: [...fallbackGate.errors, ...fallbackFinalGate.errors, ...(fallbackValidation.errors || [])],
      });
      return sendJson(response, 422, {
        ok: false,
        provider: 'local-safe-fallback',
        fallback: false,
        safeFallback: false,
        manualReviewRequired: true,
        error: 'Safe fallback was suppressed because it did not pass the publisher quality gate.',
        attempts: errors.slice(0, 3),
        attemptDetails: failureDetails.slice(0, 3),
        fallbackQualityGate: {
          decision: fallbackGate.decision,
          errors: fallbackGate.errors,
          warnings: fallbackGate.warnings,
        },
        fallbackFinalFeedbackQualityGate: {
          decision: fallbackFinalGate.decision,
          errors: fallbackFinalGate.errors,
          warnings: fallbackFinalGate.warnings,
        },
        fallbackValidationGate: {
          stages: fallbackValidation.stages,
          errors: fallbackValidation.errors,
        },
      });
    }
    const primaryError = errors[0] || null;
    question.provider = 'local-safe-fallback';
    question.fallback = true;
    question.aiMeta = {
      ...(question.aiMeta || {}),
      fallback: true,
      remote: false,
      remoteFailureReason: primaryError,
      remoteFailureAttempts: errors.slice(0, 3),
      promptVersion: PROMPT_VERSION,
    };
    logFallbackTrigger({
      branch,
      difficulty: requestedDifficulty,
      reason: 'local-safe-fallback-passed-quality-gate',
      failures: failureDetails.slice(0, 3),
    });
    return sendJson(response, 200, {
      ok: true,
      provider: 'local-safe-fallback',
      fallback: true,
      safeFallback: true,
      manualReviewRequired: false,
      error: null,
      attempts: errors.slice(0, 3),
      attemptDetails: failureDetails.slice(0, 3),
      question,
    });
  }
  if (safeFallbackEnabled && !hasBlockingFailure) {
    logFallbackTrigger({
      branch,
      difficulty: requestedDifficulty,
      reason: 'safe-fallback-skipped-repairable-only',
      failures: failureDetails.slice(0, 3),
    });
  }

    const failureStageSummary = failureDetails.reduce((acc, failure) => {
      Object.entries(failure.stages || {}).forEach(([stage, counts]) => {
        acc[stage] = acc[stage] || { warning: 0, repairable: 0, blocking: 0 };
        acc[stage].warning += counts.warning || 0;
        acc[stage].repairable += counts.repairable || 0;
        acc[stage].blocking += counts.blocking || 0;
      });
      return acc;
    }, {});
    const userError = buildFinalUserFailureReason(failureDetails);
    logQuestionGenerationGate({
      branch,
      difficulty: requestedDifficulty,
      finalFailure: true,
      hasBlockingFailure,
      stages: failureStageSummary,
      attempts: failureDetails.length,
    });
    return sendJson(response, 422, {
      ok: false,
      error: userError,
      manualReviewRequired: true,
      fallback: false,
      attempts: errors.slice(0, 4),
      attemptDetails: failureDetails.slice(0, 4),
      stageSummary: failureStageSummary,
    });
  });
}
