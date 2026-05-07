const RECENT_AI_QUESTION_IDS_KEY = 'klinikiq-recent-ai-question-ids-v5';
const RECENT_AI_QUESTION_SIGNATURES_KEY = 'klinikiq-recent-ai-question-signatures-v5';
const AI_QUESTION_HISTORY_KEY = 'klinikiq-ai-question-history-v5';
const LEGACY_RECENT_AI_QUESTION_IDS_KEYS = ['klinikiq-recent-ai-question-ids-v4', 'klinikiq-recent-ai-question-ids-v3', 'klinikiq-recent-ai-question-ids-v2'];
const LEGACY_RECENT_AI_QUESTION_SIGNATURES_KEYS = ['klinikiq-recent-ai-question-signatures-v4', 'klinikiq-recent-ai-question-signatures-v3', 'klinikiq-recent-ai-question-signatures-v2'];
const LEGACY_AI_QUESTION_HISTORY_KEYS = ['klinikiq-ai-question-history-v4', 'klinikiq-ai-question-history-v3', 'klinikiq-ai-question-history-v2'];
const MAX_RECENT_IDS = 240;
const MAX_RECENT_SIGNATURES = 720;
const MAX_HISTORY_ITEMS = 240;

const memoryStore = new Map();

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeRead(key, fallback) {
  if (!canUseStorage()) return memoryStore.has(key) ? memoryStore.get(key) : fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  if (!canUseStorage()) {
    memoryStore.set(key, value);
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    memoryStore.set(key, value);
  }
}

export function normalizeQuestionText(value = '') {
  return String(value ?? '')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/[âîû]/g, (match) => ({ â: 'a', î: 'i', û: 'u' }[match] || match))
    .replace(/[^a-z0-9çğıöşü\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stableHash(value = '') {
  const text = normalizeQuestionText(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `q${(hash >>> 0).toString(36)}`;
}

function flattenText(value = '') {
  if (!value) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(flattenText).filter(Boolean).join(' | ');
  if (typeof value === 'object') {
    return [
      value.title,
      value.label,
      value.name,
      value.text,
      value.summary,
      value.explanation,
      value.description,
      value.result,
      value.interpretation,
      value.value,
      value.findings,
      value.rows,
    ].map(flattenText).filter(Boolean).join(' | ');
  }
  return String(value);
}

function isGeneratedRuntimeId(value = '') {
  const text = String(value || '').trim().toLocaleLowerCase('tr');
  return !text
    || text.startsWith('ai-generated-remote')
    || text.startsWith('ai-generated-local')
    || text.startsWith('ai-spot-')
    || /^remote-[a-z0-9-]+-\d{10,}/i.test(text);
}

function getStableSourceKey(question = {}) {
  const candidates = [
    question?.sourceCaseId,
    question?.aiMeta?.sourceCaseId,
    question?.aiMeta?.sourceSeedId,
    question?.seedId,
    question?.sourceSeedId,
  ];
  return candidates.find((candidate) => candidate && !isGeneratedRuntimeId(candidate)) || '';
}

function getCorrectText(question = {}) {
  if (question?.diagnosis?.correct) return question.diagnosis.correct;
  const rawOptions = Array.isArray(question?.options) ? question.options : [];
  const correctId = String(question?.correctAnswer || '').trim().toUpperCase();
  const option = rawOptions.find((item) => String(item?.id || '').toUpperCase() === correctId);
  if (option?.text) return option.text;
  return question?.correctAnswerText || question?.correctAnswer || '';
}

function getOptionTexts(question = {}) {
  const diagnosisOptions = Array.isArray(question?.diagnosis?.options) ? question.diagnosis.options : [];
  const rawOptions = Array.isArray(question?.options) ? question.options : [];
  const optionTexts = rawOptions.map((option) => option?.text || option).filter(Boolean);
  return Array.from(new Set([...diagnosisOptions, ...optionTexts].map((item) => String(item || '').trim()).filter(Boolean)))
    .sort((a, b) => normalizeQuestionText(a).localeCompare(normalizeQuestionText(b), 'tr'));
}

function getExamPearlText(question = {}) {
  return flattenText([
    question?.examPearl,
    question?.examPearls,
    question?.diagnosis?.pearls,
    question?.diagnosis?.answerFeedback?.pearls,
    question?.diagnosis?.answerFeedback?.clinicalPearls,
  ]);
}

function getEvidenceText(question = {}) {
  return flattenText([
    question?.evidenceChain,
    question?.diagnosis?.answerFeedback?.evidenceChain,
    question?.findings,
    question?.exam,
    question?.vitals,
    question?.investigations,
  ]);
}

export function makeQuestionSignature(question = {}) {
  const correct = getCorrectText(question);
  const optionText = getOptionTexts(question).join(' | ');
  const payload = [
    question?.relatedBranch || question?.branchName || question?.branchId,
    question?.spotCategory || question?.subtopic,
    question?.learningTarget || question?.clinicalFocus,
    question?.questionType,
    question?.title,
    question?.demographics || question?.patientIntro?.profile,
    question?.setting,
    question?.chiefComplaint || question?.patientIntro?.presentation,
    question?.stem || question?.patientIntro?.historySummary,
    question?.question || question?.diagnosis?.question,
    correct,
    optionText,
    getEvidenceText(question),
    getExamPearlText(question),
  ].filter(Boolean).join(' :: ');
  return `cs-${stableHash(payload)}`;
}

export function makeQuestionTopicSignature(question = {}) {
  const correct = getCorrectText(question);
  const payload = [
    question?.relatedBranch || question?.branchName || question?.branchId,
    question?.spotCategory || question?.subtopic,
    question?.learningTarget || question?.clinicalFocus,
    question?.questionType,
    correct,
    getExamPearlText(question),
  ].filter(Boolean).join(' :: ');
  return `topic-${stableHash(payload)}`;
}

export function makeSeedSignature(seed = {}) {
  const correctOption = Array.isArray(seed.options)
    ? seed.options.find((option) => option.id === seed.correctAnswer)?.text
    : '';
  return stableHash([
    seed.seedId,
    seed.sourceCaseId,
    seed.relatedBranch,
    seed.spotCategory,
    seed.title,
    seed.stem,
    seed.question,
    correctOption,
    seed.learningTarget,
    seed.examPearl,
  ].filter(Boolean).join(' | '));
}

function readWithLegacy(primaryKey, legacyKeys = []) {
  const primary = safeRead(primaryKey, []);
  if (Array.isArray(primary) && primary.length) return primary;
  for (const key of legacyKeys) {
    const legacy = safeRead(key, []);
    if (Array.isArray(legacy) && legacy.length) return legacy;
  }
  return [];
}

export function getRecentAIQuestionIds() {
  return readWithLegacy(RECENT_AI_QUESTION_IDS_KEY, LEGACY_RECENT_AI_QUESTION_IDS_KEYS);
}

export function getRecentAIQuestionSignatures() {
  return readWithLegacy(RECENT_AI_QUESTION_SIGNATURES_KEY, LEGACY_RECENT_AI_QUESTION_SIGNATURES_KEYS);
}

export function getAIQuestionHistory() {
  return readWithLegacy(AI_QUESTION_HISTORY_KEY, LEGACY_AI_QUESTION_HISTORY_KEYS);
}

function makeHistoryItem(question = {}) {
  const questionId = question.id || question.seedId || question.sourceCaseId;
  const stableSeedId = getStableSourceKey(question) || null;
  const contentSignature = question.contentSignature || question.semanticFingerprint || question.dedupeKey || makeQuestionSignature(question);
  const topicSignature = question.topicSignature || question.aiMeta?.topicSignature || makeQuestionTopicSignature(question);
  const title = question.title || question.learningTarget || 'Kısa klinik soru';
  const branch = question.relatedBranch || question.branchName || 'TUS';
  const correct = getCorrectText(question);
  const optionTexts = getOptionTexts(question);
  const stem = question.stem || question.patientIntro?.historySummary || '';
  const questionText = question.question || question.diagnosis?.question || '';

  return {
    id: questionId || contentSignature,
    seedId: stableSeedId,
    contentSignature,
    generationSignature: question.generationSignature || contentSignature,
    signature: contentSignature,
    topicSignature,
    title,
    branch,
    learningTarget: question.learningTarget || question.clinicalFocus || '',
    questionType: question.questionType || '',
    correct,
    optionSetSignature: stableHash(optionTexts.join(' | ')),
    optionTexts,
    normalizedStem: normalizeQuestionText(stem),
    normalizedQuestion: normalizeQuestionText(questionText),
    normalizedTitle: normalizeQuestionText(title),
    normalizedCorrect: normalizeQuestionText(correct),
    normalizedLearningTarget: normalizeQuestionText(question.learningTarget || question.clinicalFocus || ''),
    combinedText: normalizeQuestionText([
      branch,
      title,
      stem,
      questionText,
      correct,
      optionTexts.join(' | '),
      getEvidenceText(question),
      getExamPearlText(question),
    ].filter(Boolean).join(' | ')),
    createdAt: Date.now(),
  };
}

export function rememberAIQuestion(question = {}) {
  const historyItem = makeHistoryItem(question);
  const idCandidates = [historyItem.id, historyItem.seedId].filter(Boolean);
  if (idCandidates.length) {
    const recentIds = getRecentAIQuestionIds();
    const updatedIds = [
      ...idCandidates,
      ...recentIds.filter((id) => !idCandidates.includes(id)),
    ].slice(0, MAX_RECENT_IDS);
    safeWrite(RECENT_AI_QUESTION_IDS_KEY, updatedIds);
  }

  const signatures = Array.from(new Set([
    historyItem.contentSignature,
    historyItem.generationSignature,
    historyItem.signature,
    historyItem.topicSignature,
    historyItem.optionSetSignature,
  ].filter(Boolean)));
  if (signatures.length) {
    const recentSignatures = getRecentAIQuestionSignatures();
    const updatedSignatures = [
      ...signatures,
      ...recentSignatures.filter((item) => !signatures.includes(item)),
    ].slice(0, MAX_RECENT_SIGNATURES);
    safeWrite(RECENT_AI_QUESTION_SIGNATURES_KEY, updatedSignatures);
  }

  const history = getAIQuestionHistory();
  const updatedHistory = [
    historyItem,
    ...history.filter((item) => item.id !== historyItem.id && item.contentSignature !== historyItem.contentSignature && item.signature !== historyItem.signature),
  ].slice(0, MAX_HISTORY_ITEMS);
  safeWrite(AI_QUESTION_HISTORY_KEY, updatedHistory);
  return historyItem;
}

export function buildRecentQuestionContext(limit = 50) {
  const history = getAIQuestionHistory().slice(0, limit);
  return {
    recentIds: getRecentAIQuestionIds(),
    recentSignatures: getRecentAIQuestionSignatures(),
    recentQuestionSummaries: history.map((item) => ({ ...item })),
  };
}

export function clearAIQuestionHistory() {
  [
    RECENT_AI_QUESTION_IDS_KEY,
    RECENT_AI_QUESTION_SIGNATURES_KEY,
    AI_QUESTION_HISTORY_KEY,
    ...LEGACY_RECENT_AI_QUESTION_IDS_KEYS,
    ...LEGACY_RECENT_AI_QUESTION_SIGNATURES_KEYS,
    ...LEGACY_AI_QUESTION_HISTORY_KEYS,
  ].forEach((key) => {
    memoryStore.delete(key);
    if (canUseStorage()) window.localStorage.removeItem(key);
  });
}
