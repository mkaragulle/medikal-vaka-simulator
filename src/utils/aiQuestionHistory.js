const RECENT_AI_QUESTION_IDS_KEY = 'klinikiq-recent-ai-question-ids-v4';
const RECENT_AI_QUESTION_SIGNATURES_KEY = 'klinikiq-recent-ai-question-signatures-v4';
const AI_QUESTION_HISTORY_KEY = 'klinikiq-ai-question-history-v4';
const LEGACY_RECENT_AI_QUESTION_IDS_KEYS = ['klinikiq-recent-ai-question-ids-v3', 'klinikiq-recent-ai-question-ids-v2'];
const LEGACY_RECENT_AI_QUESTION_SIGNATURES_KEYS = ['klinikiq-recent-ai-question-signatures-v3', 'klinikiq-recent-ai-question-signatures-v2'];
const LEGACY_AI_QUESTION_HISTORY_KEYS = ['klinikiq-ai-question-history-v3', 'klinikiq-ai-question-history-v2'];
const MAX_RECENT_IDS = 180;
const MAX_RECENT_SIGNATURES = 360;
const MAX_HISTORY_ITEMS = 180;

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeRead(key, fallback) {
  if (!canUseStorage()) return fallback;
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
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private mode; generation must still work.
  }
}

export function normalizeQuestionText(value = '') {
  return String(value)
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

function isGeneratedRuntimeId(value = '') {
  const text = String(value || '').trim().toLocaleLowerCase('tr');
  return !text
    || text.startsWith('ai-generated-remote')
    || text.startsWith('ai-generated-local')
    || /^ai-generated-[a-z0-9-]+-\d{10,}/i.test(text)
    || /^remote-[a-z0-9-]+-\d{10,}/i.test(text);
}

function getStableSourceKey(question = {}) {
  const candidates = [
    question?.sourceCaseId,
    question?.aiMeta?.sourceCaseId,
    question?.aiMeta?.sourceSeedId,
    question?.seedId,
  ];
  return candidates.find((candidate) => candidate && !isGeneratedRuntimeId(candidate)) || '';
}

function getCorrectText(question = {}) {
  return question?.diagnosis?.correct || question?.correctAnswer || '';
}

function getOptionTexts(question = {}) {
  const diagnosisOptions = Array.isArray(question?.diagnosis?.options) ? question.diagnosis.options : [];
  const rawOptions = Array.isArray(question?.options) ? question.options : [];
  const optionTexts = rawOptions.map((option) => option?.text || option).filter(Boolean);
  return Array.from(new Set([...diagnosisOptions, ...optionTexts].map((item) => String(item || '').trim()).filter(Boolean)))
    .sort((a, b) => normalizeQuestionText(a).localeCompare(normalizeQuestionText(b), 'tr'));
}

function getEvidenceItemText(item) {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return [item.title, item.label, item.text, item.summary, item.explanation].filter(Boolean).join(': ');
}

function getEvidenceText(question = {}) {
  const feedbackEvidence = question?.diagnosis?.answerFeedback?.evidenceChain;
  const rawEvidence = Array.isArray(question?.evidenceChain) ? question.evidenceChain : [];
  const evidence = Array.isArray(feedbackEvidence) ? feedbackEvidence : rawEvidence;
  return evidence.slice(0, 5).map(getEvidenceItemText).filter(Boolean).join(' | ');
}

export function makeQuestionSignature(question = {}) {
  const correct = getCorrectText(question);
  const stableSourceKey = getStableSourceKey(question);
  const optionText = getOptionTexts(question).join(' | ');
  const evidenceText = getEvidenceText(question);
  const payload = [
    stableSourceKey,
    question?.title,
    question?.stem,
    question?.question,
    correct,
    question?.learningTarget || question?.clinicalFocus,
    optionText,
    evidenceText,
  ].filter(Boolean).join(' | ');
  return stableHash(payload);
}

export function makeQuestionTopicSignature(question = {}) {
  const correct = getCorrectText(question);
  const payload = [
    question?.relatedBranch || question?.branchName || question?.branchId,
    question?.title,
    question?.learningTarget || question?.clinicalFocus,
    correct,
  ].filter(Boolean).join(' | ');
  return `topic-${stableHash(payload)}`;
}

export function makeSeedSignature(seed = {}) {
  const correctOption = Array.isArray(seed.options)
    ? seed.options.find((option) => option.id === seed.correctAnswer)?.text
    : '';
  return stableHash([
    seed.seedId,
    seed.sourceCaseId,
    seed.title,
    seed.stem,
    seed.question,
    correctOption,
    seed.learningTarget,
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

export function rememberAIQuestion(question = {}) {
  const questionId = question.id || question.seedId || question.sourceCaseId;
  const stableSeedId = getStableSourceKey(question) || null;
  const signature = makeQuestionSignature(question);
  const topicSignature = makeQuestionTopicSignature(question);
  const signatures = Array.from(new Set([signature, topicSignature].filter(Boolean)));
  const title = question.title || question.learningTarget || 'AI spot soru';
  const branch = question.relatedBranch || question.branchName || 'TUS';
  const correct = getCorrectText(question);

  if (questionId || stableSeedId) {
    const recentIds = getRecentAIQuestionIds();
    const idCandidates = [questionId, stableSeedId].filter(Boolean);
    const updatedIds = [
      ...idCandidates,
      ...recentIds.filter((id) => !idCandidates.includes(id)),
    ].slice(0, MAX_RECENT_IDS);
    safeWrite(RECENT_AI_QUESTION_IDS_KEY, updatedIds);
  }

  if (signatures.length) {
    const recentSignatures = getRecentAIQuestionSignatures();
    const updatedSignatures = [
      ...signatures,
      ...recentSignatures.filter((item) => !signatures.includes(item)),
    ].slice(0, MAX_RECENT_SIGNATURES);
    safeWrite(RECENT_AI_QUESTION_SIGNATURES_KEY, updatedSignatures);
  }

  const history = getAIQuestionHistory();
  const historyItem = {
    id: questionId || signature,
    seedId: stableSeedId,
    signature,
    topicSignature,
    title,
    branch,
    correct,
    createdAt: Date.now(),
  };
  const updatedHistory = [
    historyItem,
    ...history.filter((item) => item.id !== historyItem.id && item.signature !== signature && item.topicSignature !== topicSignature),
  ].slice(0, MAX_HISTORY_ITEMS);
  safeWrite(AI_QUESTION_HISTORY_KEY, updatedHistory);
  return historyItem;
}

export function buildRecentQuestionContext(limit = 12) {
  const history = getAIQuestionHistory().slice(0, limit);
  return {
    recentIds: getRecentAIQuestionIds(),
    recentSignatures: getRecentAIQuestionSignatures(),
    recentQuestionSummaries: history.map((item) => ({
      id: item.id,
      seedId: item.seedId,
      title: item.title,
      branch: item.branch,
      correct: item.correct,
      signature: item.signature,
      topicSignature: item.topicSignature,
    })),
  };
}

export function clearAIQuestionHistory() {
  if (!canUseStorage()) return;
  [
    RECENT_AI_QUESTION_IDS_KEY,
    RECENT_AI_QUESTION_SIGNATURES_KEY,
    AI_QUESTION_HISTORY_KEY,
    ...LEGACY_RECENT_AI_QUESTION_IDS_KEYS,
    ...LEGACY_RECENT_AI_QUESTION_SIGNATURES_KEYS,
    ...LEGACY_AI_QUESTION_HISTORY_KEYS,
  ].forEach((key) => window.localStorage.removeItem(key));
}
