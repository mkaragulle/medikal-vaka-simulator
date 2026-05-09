import { cases } from '../data/cases.js';
import { generateAIQuestion } from '../utils/aiQuestionGenerator.js';
import { buildRecentQuestionContext, rememberAIQuestion } from '../utils/aiQuestionHistory.js';
import { normalizeGeneratedAIQuestion, validateAIQuestionCase } from '../utils/validateAIQuestion.js';
import {
  buildAntiRepeatPromptContext,
  selectDiversityPlan,
  summarizeDiversityDebug,
  validateQuestionDiversity,
} from '../utils/aiQuestionDiversity.js';

const runtimeEnv = import.meta.env || {};
const AI_ENDPOINT = runtimeEnv.VITE_AI_QUESTION_ENDPOINT || '/api/generate-ai-question';
const ENABLE_REAL_AI = String(runtimeEnv.VITE_ENABLE_REAL_AI ?? 'true').toLowerCase() !== 'false';
const AI_REQUEST_TIMEOUT_MS = Number(runtimeEnv.VITE_AI_REQUEST_TIMEOUT_MS || 90000);
const AI_REMOTE_RETRY_COUNT = Math.max(3, Number(runtimeEnv.VITE_AI_REMOTE_RETRY_COUNT || 4));
const AI_LOCAL_DIVERSITY_RETRY_COUNT = Math.max(2, Number(runtimeEnv.VITE_AI_LOCAL_DIVERSITY_RETRY_COUNT || 4));

function withTimeout(ms = AI_REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), ms);
  return { controller, timeoutId };
}

function makeAntiRepeatNonce() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function isDevRuntime() {
  return Boolean(runtimeEnv.DEV || runtimeEnv.MODE === 'development');
}

function logRemoteAIDebug(event, details = {}) {
  if (!isDevRuntime()) return;
  // eslint-disable-next-line no-console
  console.info('[KlinikIQ AI]', event, details);
}

function buildRemoteValidationContext(context = {}, diversityPlan = {}) {
  const antiRepeat = buildAntiRepeatPromptContext(context, diversityPlan);
  return {
    recentIds: Array.isArray(context.recentIds) ? context.recentIds.slice(0, 30) : [],
    recentSignatures: Array.isArray(context.recentSignatures) ? context.recentSignatures.slice(0, 80) : [],
    recentQuestionSummaries: antiRepeat.recentQuestionSummaries,
    recentTopics: antiRepeat.recentTopics,
    recentCorrectAnswers: antiRepeat.recentCorrectAnswers,
    forbiddenOptionSets: antiRepeat.forbiddenOptionSets,
    selectedTopic: antiRepeat.selectedTopic,
    selectedSubtopic: antiRepeat.selectedSubtopic,
    questionType: antiRepeat.questionType,
    seed: antiRepeat.seed,
    previousTopicWindow: antiRepeat.previousTopicWindow,
  };
}

function getRemotePayloadError(payload, status) {
  if (!payload || typeof payload !== 'object') return `Remote AI endpoint failed with ${status}`;
  const detail = payload.error || payload.message || payload.attempts?.join(' | ');
  return detail ? `Remote AI endpoint failed with ${status}: ${String(detail).slice(0, 420)}` : `Remote AI endpoint failed with ${status}`;
}

function annotateQuestionWithDiversityPlan(question, diversityPlan = {}) {
  question.aiMeta = {
    ...(question.aiMeta || {}),
    requestId: diversityPlan.requestId,
    selectedTopic: diversityPlan.selectedTopic,
    selectedSubtopic: diversityPlan.selectedSubtopic,
    requestedQuestionType: diversityPlan.questionType,
    diversitySeed: diversityPlan.seed,
  };
  question.topic = diversityPlan.selectedTopic;
  question.subtopic = diversityPlan.selectedSubtopic;
  return question;
}

async function fetchRemoteAIQuestion({ previousQuestionId, branchFilter, context, attempt, diversityPlan }) {
  const { controller, timeoutId } = withTimeout();
  const remoteRequestContext = buildRemoteValidationContext(context, diversityPlan);
  try {
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        previousQuestionId,
        branchFilter,
        recentIds: remoteRequestContext.recentIds,
        recentSignatures: remoteRequestContext.recentSignatures,
        recentQuestionSummaries: remoteRequestContext.recentQuestionSummaries,
        recentTopics: remoteRequestContext.recentTopics,
        recentCorrectAnswers: remoteRequestContext.recentCorrectAnswers,
        forbiddenOptionSets: remoteRequestContext.forbiddenOptionSets,
        selectedTopic: remoteRequestContext.selectedTopic,
        selectedSubtopic: remoteRequestContext.selectedSubtopic,
        questionType: remoteRequestContext.questionType,
        seed: remoteRequestContext.seed,
        previousTopicWindow: remoteRequestContext.previousTopicWindow,
        requestId: diversityPlan.requestId,
        attempt,
        antiRepeatNonce: makeAntiRepeatNonce(),
      }),
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      throw new Error(getRemotePayloadError(payload, response.status));
    }

    const rawQuestion = payload?.question || payload;
    const normalized = annotateQuestionWithDiversityPlan(normalizeGeneratedAIQuestion(rawQuestion), diversityPlan);
    normalized.source = 'real-ai';
    normalized.aiMeta = {
      ...normalized.aiMeta,
      provider: payload?.provider || rawQuestion?.provider || 'remote-ai-provider',
      remote: true,
      remoteAttempt: attempt,
      serverRemoteAttempt: payload?.remoteAttempt || rawQuestion?.remoteAttempt || null,
      openRouterModel: rawQuestion?.openRouterModel || payload?.openRouterModel || null,
      serverDiversityRejectedCount: payload?.diversityRejectedCount || 0,
      serverNearDuplicateRejectedCount: payload?.nearDuplicateRejectedCount || 0,
    };

    const validation = validateAIQuestionCase(normalized, remoteRequestContext.recentSignatures, {
      context,
      requestedBranch: branchFilter,
      skipQuality: false,
      trustRemoteAi: true,
      skipSemanticNovelty: true,
    });
    if (!validation.ok) {
      const structuralValidation = validateAIQuestionCase(normalized, remoteRequestContext.recentSignatures, {
        context,
        requestedBranch: branchFilter,
        skipQuality: true,
        trustRemoteAi: true,
        skipSemanticNovelty: true,
      });
      if (!structuralValidation.ok) {
        const error = new Error(`Remote AI client validation failed: ${structuralValidation.errors.join('; ')}`);
        error.validation = structuralValidation;
        throw error;
      }
      normalized.aiMeta = {
        ...(normalized.aiMeta || {}),
        clientQualityWarnings: validation.errors,
        clientQualityGateMode: 'server-trusted-soft-warning',
      };
      logRemoteAIDebug('remote-client-quality-soft-warning', {
        attempt,
        branchFilter,
        warnings: validation.errors,
      });
    }

    const diversityResult = validateQuestionDiversity(normalized, context, cases, {
      branchFilter,
      selectedTopic: diversityPlan.selectedTopic,
      selectedSubtopic: diversityPlan.selectedSubtopic,
      questionType: diversityPlan.questionType,
    });

    logRemoteAIDebug('remote-diversity-result', summarizeDiversityDebug(normalized, diversityResult, diversityPlan, {
      attempt,
      branchFilter,
      temperature: payload?.temperature || rawQuestion?.temperature || null,
    }));

    if (!diversityResult.passed) {
      normalized.aiMeta = {
        ...(normalized.aiMeta || {}),
        clientDiversityWarning: diversityResult.reason,
        clientDiversitySimilarityScore: diversityResult.similarityScore || null,
        clientDiversityGateMode: 'advisory-for-remote-ai',
      };
      logRemoteAIDebug('remote-diversity-soft-warning', {
        attempt,
        branchFilter,
        reason: diversityResult.reason,
        similarityScore: diversityResult.similarityScore || null,
      });
    }

    logRemoteAIDebug('remote-question-accepted', {
      attempt,
      branchFilter,
      requestId: diversityPlan.requestId,
      selectedTopic: diversityPlan.selectedTopic,
      questionType: diversityPlan.questionType,
      provider: normalized.aiMeta.provider,
      model: normalized.aiMeta.openRouterModel,
      title: normalized.title,
    });
    return normalized;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function requestRemoteAIQuestion({ previousQuestionId, branchFilter, context }) {
  if (!ENABLE_REAL_AI || typeof window === 'undefined') {
    return null;
  }

  let lastError = null;
  const diversityAttempts = [];
  for (let attempt = 1; attempt <= AI_REMOTE_RETRY_COUNT; attempt += 1) {
    const diversityPlan = selectDiversityPlan({ branchFilter, context, attempt, previousQuestionId });
    try {
      const normalized = await fetchRemoteAIQuestion({ previousQuestionId, branchFilter, context, attempt, diversityPlan });
      const historyItem = rememberAIQuestion(normalized);
      normalized.aiMeta = {
        ...(normalized.aiMeta || {}),
        diversityAttempts,
        historyItemId: historyItem.id,
      };
      return {
        ok: true,
        question: normalized,
        source: normalized.aiMeta.provider || 'real-ai',
        usedRemoteAI: true,
        fallback: false,
      };
    } catch (error) {
      lastError = error;
      const rejectRecord = {
        attempt,
        requestId: diversityPlan.requestId,
        selectedTopic: diversityPlan.selectedTopic,
        questionType: diversityPlan.questionType,
        message: error?.message || String(error),
        duplicateReason: error?.diversity?.reason || error?.validation?.errors?.[0] || null,
        similarityScore: error?.diversity?.similarityScore || null,
        redirectedToDifferentTopic: attempt < AI_REMOTE_RETRY_COUNT,
      };
      diversityAttempts.push(rejectRecord);
      logRemoteAIDebug('remote-attempt-failed', rejectRecord);
    }
  }

  const finalError = lastError || new Error('Remote AI question generation failed');
  finalError.diversityAttempts = diversityAttempts;
  throw finalError;
}

function createEmergencyLocalQuestion({ previousQuestionId, branchFilter, context, reason = null, errors = [] }) {
  const emergencyContexts = [
    { recentIds: [], recentSignatures: [], recentQuestionSummaries: [] },
    buildSignatureOnlyContext(context || {}, 12),
    { ...(context || {}), recentQuestionSummaries: [], recentIds: [], recentSignatures: [] },
  ];
  const branchAttempts = [branchFilter, 'random'].filter((item, index, list) => item && list.indexOf(item) === index);

  for (const fallbackBranch of branchAttempts) {
    for (let attempt = 0; attempt < emergencyContexts.length; attempt += 1) {
      try {
        const question = generateAIQuestion({
          previousQuestionId,
          branchFilter: fallbackBranch,
          context: emergencyContexts[attempt],
        });
        const validation = validateAIQuestionCase(question, [], {
          context: emergencyContexts[attempt],
          requestedBranch: fallbackBranch,
          trustRemoteAi: true,
          skipSemanticNovelty: true,
          skipQuality: false,
        });
        if (!validation.ok) {
          errors.push({ attempt: `emergency-${fallbackBranch}-${attempt + 1}`, reason: validation.errors.join('; ') });
          continue;
        }
        rememberAIQuestion(question);
        question.aiMeta = {
          ...(question.aiMeta || {}),
          emergencyFallback: true,
          localDiversityAttempts: errors,
          fallbackReason: reason?.message || String(reason || ''),
        };
        return {
          ok: true,
          question,
          source: question.source || 'local-emergency-template-generator',
          usedRemoteAI: false,
          fallback: true,
          error: reason,
        };
      } catch (emergencyError) {
        errors.push({ attempt: `emergency-${fallbackBranch}-${attempt + 1}`, reason: emergencyError?.message || String(emergencyError) });
      }
    }
  }
  return null;
}

function createLocalFallbackQuestion({ previousQuestionId, branchFilter, context, reason = null }) {
  const errors = [];
  for (let attempt = 1; attempt <= AI_LOCAL_DIVERSITY_RETRY_COUNT; attempt += 1) {
    try {
      const refreshedContext = buildRecentQuestionContext(50);
      const effectiveContext = refreshedContext.recentSignatures?.length ? refreshedContext : context;
      const diversityPlan = selectDiversityPlan({ branchFilter, context: effectiveContext, attempt: attempt + 100, previousQuestionId });
      const question = generateAIQuestion({
        previousQuestionId,
        branchFilter,
        context: effectiveContext,
      });
      const diversityResult = validateQuestionDiversity(question, effectiveContext, cases, { branchFilter });
      logRemoteAIDebug('local-fallback-diversity-result', summarizeDiversityDebug(question, diversityResult, diversityPlan, {
        attempt,
        branchFilter,
      }));
      if (!diversityResult.passed) {
        errors.push({ attempt, reason: diversityResult.reason, similarityScore: diversityResult.similarityScore });
        continue;
      }
      rememberAIQuestion(question);
      question.aiMeta = {
        ...(question.aiMeta || {}),
        localDiversityAttempts: errors,
      };
      return {
        ok: true,
        question,
        source: question.source || 'local-template-generator',
        usedRemoteAI: false,
        fallback: Boolean(reason),
        error: reason,
      };
    } catch (localError) {
      errors.push({ attempt, reason: localError?.message || String(localError) });
    }
  }

  const emergencyFallback = createEmergencyLocalQuestion({ previousQuestionId, branchFilter, context, reason, errors });
  if (emergencyFallback) return emergencyFallback;

  return {
    ok: false,
    question: null,
    source: 'local-template-generator-error',
    usedRemoteAI: false,
    fallback: false,
    error: reason || new Error(`Local fallback diversity attempts failed: ${errors.map((item) => item.reason).join('; ')}`),
  };
}

export async function createAIQuestion({ previousQuestionId = null, branchFilter = 'random' } = {}) {
  const context = buildRecentQuestionContext(50);

  try {
    const remoteResult = await requestRemoteAIQuestion({ previousQuestionId, branchFilter, context });
    if (remoteResult?.ok) return remoteResult;
  } catch (error) {
    logRemoteAIDebug('remote-exhausted-using-local-fallback', {
      branchFilter,
      message: error?.message || String(error),
      diversityAttempts: error?.diversityAttempts || null,
    });
    return createLocalFallbackQuestion({
      previousQuestionId,
      branchFilter,
      context,
      reason: error,
    });
  }

  return createLocalFallbackQuestion({ previousQuestionId, branchFilter, context });
}

export function getAIServiceMode() {
  return ENABLE_REAL_AI ? 'real-ai-with-diversity-gate-topic-rotation-and-local-fallback' : 'local-generator-only';
}
