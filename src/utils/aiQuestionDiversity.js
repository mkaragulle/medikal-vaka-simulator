import { AI_QUESTION_TYPE_POOL, getTopicPoolForBranch, normalizeBranchKey } from '../data/aiTopicPools.js';
import { cases } from '../data/cases.js';
import { normalizeQuestionText, stableHash } from './aiQuestionHistory.js';
import {
  attachQuestionDedupeFields,
  buildQuestionFingerprint,
  findEmbeddedCaseOverlap,
  getQuestionCorrectText,
  getQuestionOptionTexts,
  makeOptionSetSignature,
  similarityScore,
  toPlainText,
} from './questionDeduplication.js';

const TOPIC_RECENT_WINDOW = 8;
const CORRECT_RECENT_WINDOW = 6;
const OPTION_SET_WINDOW = 30;
const SEMANTIC_WINDOW = 50;
const TOPIC_SOFT_WINDOW = 14;
const MAX_HISTORY_FOR_PROMPT = 18;

function safeArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function pickRandom(items = []) {
  if (!items.length) return null;
  return items[Math.floor(Math.random() * items.length)] ?? items[0];
}

const BRANCH_HISTORY_ALIASES = {
  anatomy: ['anatomi'],
  physiology: ['fizyoloji'],
  'histology-embryology': ['histoloji', 'embriyoloji', 'histoloji ve embriyoloji'],
  'medical-biochemistry': ['biyokimya', 'tibbi biyokimya', 'medical biochemistry'],
  'medical-microbiology': ['mikrobiyoloji', 'tibbi mikrobiyoloji', 'medical microbiology'],
  'medical-pathology': ['patoloji', 'tibbi patoloji', 'medical pathology'],
  'medical-pharmacology': ['farmakoloji', 'tibbi farmakoloji', 'medical pharmacology'],
  'internal-medicine': ['iç hastalıkları', 'ic hastaliklari', 'dahiliye', 'internal medicine'],
  pediatrics: ['çocuk sağlığı ve hastalıkları', 'cocuk sagligi ve hastaliklari', 'pediatri', 'çocuk hastalıkları', 'cocuk hastaliklari', 'pediatrics'],
  'general-surgery': ['genel cerrahi', 'cerrahi', 'surgery'],
  'obstetrics-gynecology': ['kadın hastalıkları ve doğum', 'kadin hastaliklari ve dogum', 'obstetri', 'jinekoloji', 'gynecology'],
  'minor-rotations': ['küçük stajlar', 'kucuk stajlar', 'nöroloji', 'noroloji', 'neurology', 'acil', 'minor rotations'],
};

function historyBranchMatches(item = {}, branchKey = 'tus-spot-olgular') {
  if (!item || branchKey === 'tus-spot-olgular') return true;
  const branchText = normalizeQuestionText(`${item.branchId || ''} ${item.branch || ''} ${item.relatedBranch || ''}`);
  if (!branchText) return true;
  const key = normalizeQuestionText(branchKey);
  const aliases = [key, key.replace(/-/g, ' '), ...(BRANCH_HISTORY_ALIASES[branchKey] || [])]
    .map(normalizeQuestionText)
    .filter(Boolean);
  return aliases.some((alias) => branchText.includes(alias) || alias.includes(branchText));
}

function getTopicFromSummary(item = {}) {
  return item.topic || item.selectedTopic || item.aiMeta?.selectedTopic || item.learningTarget || item.title || '';
}

function getCorrectFromSummary(item = {}) {
  return item.correct || item.normalizedCorrect || item.correctAnswer || '';
}

export function inferQuestionTopic(question = {}) {
  const explicit = question.topic || question.selectedTopic || question.aiMeta?.selectedTopic || question.aiMeta?.topic || question.nextQuestionSeed;
  if (explicit && String(explicit).trim().length > 2) return String(explicit).trim();
  const candidates = [
    question.learningTarget,
    question.clinicalFocus,
    question.title,
    question.spotCategory,
    question.chiefComplaint,
  ];
  return candidates.map((item) => String(item || '').replace(/^AI Spot\s*•\s*/i, '').trim()).find((item) => item.length > 2) || 'Genel TUS spot';
}

export function inferSubtopic(question = {}) {
  const text = [question.learningTarget, question.question, question.diagnosis?.answerFeedback?.learningOutcome].filter(Boolean).join(' | ');
  return String(text || inferQuestionTopic(question)).slice(0, 90);
}

function makeSemanticText(question = {}) {
  const fingerprint = buildQuestionFingerprint(question);
  return [
    fingerprint.branch,
    inferQuestionTopic(question),
    fingerprint.questionType,
    fingerprint.title,
    question.demographics || question.patientIntro?.profile || '',
    question.chiefComplaint || question.patientIntro?.presentation || '',
    fingerprint.stem,
    fingerprint.question,
    fingerprint.correct,
    fingerprint.optionTexts.join(' | '),
    fingerprint.learningTarget,
    fingerprint.evidence,
  ].filter(Boolean).map(normalizeQuestionText).join(' | ');
}

export function makeExactQuestionSignature(question = {}) {
  const optionSet = getQuestionOptionTexts(question).map(normalizeQuestionText).sort((a, b) => a.localeCompare(b, 'tr')).join(' | ');
  const payload = [
    question.branchId || question.relatedBranch || question.branchName,
    inferQuestionTopic(question),
    question.questionType || question.aiMeta?.variantAngle,
    question.title,
    question.demographics || question.patientIntro?.profile,
    question.chiefComplaint || question.patientIntro?.presentation,
    question.stem || question.patientIntro?.historySummary,
    question.question || question.diagnosis?.question,
    getQuestionCorrectText(question),
    optionSet,
  ].filter(Boolean).map(normalizeQuestionText).join(' :: ');
  return `exact-${stableHash(payload)}`;
}

export function makeSemanticFingerprint(question = {}) {
  return `sem-${stableHash(makeSemanticText(question))}`;
}

function normalizeHistorySummary(item = {}) {
  const optionTexts = safeArray(item.optionTexts).map(normalizeQuestionText).sort((a, b) => a.localeCompare(b, 'tr'));
  return {
    ...item,
    topic: normalizeQuestionText(getTopicFromSummary(item)),
    correct: normalizeQuestionText(getCorrectFromSummary(item)),
    questionType: normalizeQuestionText(item.questionType || item.variantAngle || item.aiMeta?.variantAngle || ''),
    title: normalizeQuestionText(item.normalizedTitle || item.title || ''),
    stem: normalizeQuestionText(item.normalizedStem || item.stem || ''),
    question: normalizeQuestionText(item.normalizedQuestion || item.question || ''),
    learningTarget: normalizeQuestionText(item.normalizedLearningTarget || item.learningTarget || ''),
    combinedText: normalizeQuestionText(item.combinedText || [item.branch, item.title, item.learningTarget, getCorrectFromSummary(item), toPlainText(item.optionTexts)].filter(Boolean).join(' | ')),
    optionSetSignature: item.optionSetSignature || (optionTexts.length ? stableHash(optionTexts.join(' | ')) : ''),
  };
}

function recentForBranch(context = {}, branchKey = 'tus-spot-olgular', limit = 50) {
  return safeArray(context.recentQuestionSummaries)
    .filter((item) => historyBranchMatches(item, branchKey))
    .slice(0, limit)
    .map(normalizeHistorySummary);
}

export function selectDiversityPlan({ branchFilter = 'random', context = {}, attempt = 1, previousQuestionId = null } = {}) {
  const branchKey = normalizeBranchKey(branchFilter);
  const topicPool = getTopicPoolForBranch(branchFilter);
  const branchHistory = recentForBranch(context, branchKey, 50);
  const recentTopics = new Set(branchHistory.slice(0, TOPIC_RECENT_WINDOW).map((item) => item.topic));
  const softRecentTopics = new Set(branchHistory.slice(0, TOPIC_SOFT_WINDOW).map((item) => item.topic));
  const recentQuestionTypesByTopic = new Map();

  branchHistory.slice(0, 30).forEach((item) => {
    if (!item.topic) return;
    if (!recentQuestionTypesByTopic.has(item.topic)) recentQuestionTypesByTopic.set(item.topic, new Set());
    if (item.questionType) recentQuestionTypesByTopic.get(item.topic).add(item.questionType);
  });

  const normalizedTopicPool = topicPool.map((topic) => ({ raw: topic, key: normalizeQuestionText(topic) }));
  let topicCandidates = normalizedTopicPool.filter((topic) => !recentTopics.has(topic.key));
  if (!topicCandidates.length) topicCandidates = normalizedTopicPool.filter((topic) => !softRecentTopics.has(topic.key));
  if (!topicCandidates.length) topicCandidates = normalizedTopicPool;

  const seedKey = `${branchFilter}|${attempt}|${previousQuestionId || ''}|${Date.now()}|${Math.random()}|${branchHistory.length}`;
  const start = parseInt(stableHash(seedKey).replace(/^q/, ''), 36) % Math.max(1, topicCandidates.length);
  const selectedTopic = topicCandidates[start]?.raw || pickRandom(topicPool) || 'TUS spot klinik karar';
  const selectedTopicKey = normalizeQuestionText(selectedTopic);
  const usedTypes = recentQuestionTypesByTopic.get(selectedTopicKey) || new Set();
  let questionTypeCandidates = AI_QUESTION_TYPE_POOL.filter((type) => !usedTypes.has(normalizeQuestionText(type)));
  if (!questionTypeCandidates.length) questionTypeCandidates = AI_QUESTION_TYPE_POOL;
  const selectedQuestionType = questionTypeCandidates[(start + attempt) % questionTypeCandidates.length] || pickRandom(AI_QUESTION_TYPE_POOL);

  return {
    requestId: `ai-div-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
    branchKey,
    selectedTopic,
    selectedSubtopic: selectedTopic,
    questionType: selectedQuestionType,
    seed: stableHash(`${seedKey}|${selectedTopic}|${selectedQuestionType}`),
    previousTopicWindow: branchHistory.slice(0, 10).map((item) => ({
      topic: getTopicFromSummary(item) || item.title,
      correct: getCorrectFromSummary(item),
      questionType: item.questionType,
    })),
    forbiddenCorrectAnswers: Array.from(new Set(branchHistory.slice(0, CORRECT_RECENT_WINDOW).map((item) => getCorrectFromSummary(item)).filter(Boolean))),
    forbiddenOptionSets: Array.from(new Set(branchHistory.slice(0, OPTION_SET_WINDOW).map((item) => item.optionSetSignature).filter(Boolean))),
  };
}

export function buildAntiRepeatPromptContext(context = {}, diversityPlan = {}) {
  const branchHistory = recentForBranch(context, diversityPlan.branchKey, MAX_HISTORY_FOR_PROMPT);
  const recentTopics = branchHistory.map((item) => getTopicFromSummary(item) || item.title).filter(Boolean).slice(0, 12);
  const recentCorrectAnswers = branchHistory.map((item) => getCorrectFromSummary(item)).filter(Boolean).slice(0, 12);
  const recentQuestionSummaries = branchHistory.slice(0, MAX_HISTORY_FOR_PROMPT).map((item) => ({
    id: item.id,
    branch: item.branch,
    title: item.title || item.normalizedTitle,
    topic: getTopicFromSummary(item) || item.title,
    questionType: item.questionType,
    correct: getCorrectFromSummary(item),
    optionSetSignature: item.optionSetSignature,
    optionTexts: safeArray(item.optionTexts),
    contentSignature: item.contentSignature || item.signature,
    combinedText: item.combinedText,
  }));
  return {
    recentTopics,
    recentCorrectAnswers,
    recentQuestionSummaries,
    forbiddenOptionSets: diversityPlan.forbiddenOptionSets || [],
    selectedTopic: diversityPlan.selectedTopic,
    selectedSubtopic: diversityPlan.selectedSubtopic,
    questionType: diversityPlan.questionType,
    seed: diversityPlan.seed,
    previousTopicWindow: diversityPlan.previousTopicWindow || [],
  };
}

export function validateQuestionDiversity(candidate = {}, context = {}, embeddedCases = cases, options = {}) {
  attachQuestionDedupeFields(candidate);
  const fingerprint = buildQuestionFingerprint(candidate);
  const exactSignature = makeExactQuestionSignature(candidate);
  const semanticFingerprint = makeSemanticFingerprint(candidate);
  const topic = normalizeQuestionText(options.selectedTopic || inferQuestionTopic(candidate));
  const correct = normalizeQuestionText(getQuestionCorrectText(candidate));
  const optionSetSignature = makeOptionSetSignature(getQuestionOptionTexts(candidate));
  const branchKey = normalizeBranchKey(options.branchFilter || candidate.relatedBranch || candidate.branchName || candidate.branchId || 'random');
  const branchHistory = recentForBranch(context, branchKey, SEMANTIC_WINDOW);
  const recentSignatures = safeArray(context.recentSignatures);

  candidate.aiMeta = {
    ...(candidate.aiMeta || {}),
    selectedTopic: options.selectedTopic || inferQuestionTopic(candidate),
    selectedSubtopic: options.selectedSubtopic || inferSubtopic(candidate),
    requestedQuestionType: options.questionType || candidate.questionType,
    exactSignature,
    semanticFingerprint,
    optionSetSignature,
  };

  if (recentSignatures.includes(candidate.contentSignature) || recentSignatures.includes(exactSignature)) {
    return { passed: false, reason: 'same_signature', signature: candidate.contentSignature, similarityScore: 1 };
  }

  const embeddedOverlap = findEmbeddedCaseOverlap(candidate, embeddedCases);
  if (embeddedOverlap) {
    return { passed: false, reason: 'embedded_case_overlap', similarTo: embeddedOverlap.caseId, similarityScore: embeddedOverlap.score || 1, detail: embeddedOverlap.reason };
  }

  const recentTopics = branchHistory.slice(0, TOPIC_RECENT_WINDOW).map((item) => item.topic).filter(Boolean);
  const sameTopicCount = recentTopics.filter((item) => item === topic).length;
  const sameTopicFirstTwo = recentTopics.slice(0, 2).filter((item) => item === topic).length;
  if (topic && (sameTopicFirstTwo >= 1 || sameTopicCount >= 2)) {
    const sameTopicRecent = branchHistory.find((item) => item.topic === topic);
    candidate.aiMeta = {
      ...(candidate.aiMeta || {}),
      diversityWarnings: [
        ...((candidate.aiMeta || {}).diversityWarnings || []),
        { reason: 'same_topic_recently', similarTo: sameTopicRecent?.id || null, count: sameTopicCount },
      ],
    };
  }

  const recentCorrect = branchHistory.slice(0, CORRECT_RECENT_WINDOW).map((item) => item.correct).filter(Boolean);
  if (correct && recentCorrect[0] === correct) {
    return { passed: false, reason: 'same_correct_answer_back_to_back', similarTo: branchHistory[0]?.id, similarityScore: 0.9 };
  }

  for (const recent of branchHistory) {
    if (recent === branchHistory[0] && fingerprint.title && recent.title && fingerprint.title === recent.title) {
      return { passed: false, reason: 'same_title_back_to_back', similarTo: recent.id, similarityScore: 0.9 };
    }
    const sameCorrect = correct && recent.correct === correct;
    const sameOptions = optionSetSignature && recent.optionSetSignature === optionSetSignature;
    const sameQuestionType = !recent.questionType || !fingerprint.questionType || normalizeQuestionText(recent.questionType) === normalizeQuestionText(fingerprint.questionType);
    const titleSimilarity = similarityScore(fingerprint.title, recent.title);
    const stemSimilarity = similarityScore(fingerprint.stem, recent.stem);
    const questionSimilarity = similarityScore(fingerprint.question, recent.question);
    const combinedSimilarity = similarityScore(fingerprint.combinedText, recent.combinedText);
    const targetSimilarity = similarityScore(fingerprint.learningTarget, recent.learningTarget);

    if (sameOptions && sameCorrect && (sameQuestionType || targetSimilarity >= 0.72)) {
      return { passed: false, reason: 'option_set_duplicate', similarTo: recent.id, similarityScore: Math.max(combinedSimilarity, targetSimilarity, 0.95) };
    }
    if (sameQuestionType && sameCorrect && stemSimilarity >= 0.82 && (questionSimilarity >= 0.78 || combinedSimilarity >= 0.86)) {
      return { passed: false, reason: 'semantic_near_duplicate', similarTo: recent.id, similarityScore: Math.max(stemSimilarity, questionSimilarity, combinedSimilarity) };
    }
    if (sameQuestionType && combinedSimilarity >= 0.9 && (sameCorrect || sameOptions || targetSimilarity >= 0.76)) {
      return { passed: false, reason: 'semantic_near_duplicate', similarTo: recent.id, similarityScore: combinedSimilarity };
    }
    if (titleSimilarity >= 0.92 && sameCorrect && (stemSimilarity >= 0.72 || targetSimilarity >= 0.80)) {
      return { passed: false, reason: 'same_title_answer_target', similarTo: recent.id, similarityScore: Math.max(titleSimilarity, stemSimilarity, targetSimilarity) };
    }
  }

  return {
    passed: true,
    reason: null,
    exactSignature,
    semanticFingerprint,
    similarityScore: 0,
  };
}

export function summarizeDiversityDebug(candidate = {}, diversityResult = {}, diversityPlan = {}, extra = {}) {
  return {
    requestId: diversityPlan.requestId,
    attempt: extra.attempt,
    branchId: diversityPlan.branchKey || extra.branchFilter,
    selectedTopic: diversityPlan.selectedTopic,
    selectedSubtopic: diversityPlan.selectedSubtopic,
    questionType: diversityPlan.questionType,
    seed: diversityPlan.seed,
    temperature: extra.temperature,
    previousTopicWindow: diversityPlan.previousTopicWindow || [],
    generatedTitle: candidate.title,
    generatedCorrectAnswer: getQuestionCorrectText(candidate),
    generatedSignature: candidate.contentSignature || candidate.aiMeta?.contentSignature,
    similarityToLast: diversityResult.similarityScore || 0,
    duplicateReason: diversityResult.reason || null,
    rejectedByDiversityGate: diversityResult.passed === false,
    repaired: Boolean(candidate.aiMeta?.remoteRepairUsed || candidate.remoteRepairUsed || candidate.aiMeta?.qualityGateErrors?.length),
    accepted: diversityResult.passed !== false,
  };
}
