import { generateAIQuestion } from '../utils/aiQuestionGenerator.js';
import { buildRecentQuestionContext, rememberAIQuestion } from '../utils/aiQuestionHistory.js';
import { normalizeGeneratedAIQuestion, validateAIQuestionCase } from '../utils/validateAIQuestion.js';

const runtimeEnv = import.meta.env || {};
const AI_ENDPOINT = runtimeEnv.VITE_AI_QUESTION_ENDPOINT || '/api/generate-ai-question';
const ENABLE_REAL_AI = String(runtimeEnv.VITE_ENABLE_REAL_AI ?? 'true').toLowerCase() !== 'false';
const AI_REQUEST_TIMEOUT_MS = Number(runtimeEnv.VITE_AI_REQUEST_TIMEOUT_MS || 90000);
const AI_REMOTE_RETRY_COUNT = Math.max(1, Number(runtimeEnv.VITE_AI_REMOTE_RETRY_COUNT || 1));

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

async function fetchRemoteAIQuestion({ previousQuestionId, branchFilter, context, attempt }) {
  const { controller, timeoutId } = withTimeout();
  try {
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        previousQuestionId,
        branchFilter,
        recentIds: context.recentIds,
        recentSignatures: context.recentSignatures,
        recentQuestionSummaries: context.recentQuestionSummaries,
        attempt,
        antiRepeatNonce: makeAntiRepeatNonce(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Remote AI endpoint failed with ${response.status}`);
    }

    const payload = await response.json();
    const rawQuestion = payload.question || payload;
    const normalized = normalizeGeneratedAIQuestion(rawQuestion);
    normalized.source = 'real-ai';
    normalized.aiMeta = {
      ...normalized.aiMeta,
      provider: payload.provider || rawQuestion.provider || 'remote-ai-provider',
      remote: true,
      remoteAttempt: attempt,
    };

    const validation = validateAIQuestionCase(normalized, context.recentSignatures, { context, requestedBranch: branchFilter });
    if (!validation.ok) {
      const error = new Error(`Remote AI validation failed: ${validation.errors.join('; ')}`);
      error.validation = validation;
      throw error;
    }

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
  for (let attempt = 1; attempt <= AI_REMOTE_RETRY_COUNT; attempt += 1) {
    try {
      const normalized = await fetchRemoteAIQuestion({ previousQuestionId, branchFilter, context, attempt });
      rememberAIQuestion(normalized);
      return {
        ok: true,
        question: normalized,
        source: normalized.aiMeta.provider || 'real-ai',
        usedRemoteAI: true,
        fallback: false,
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Remote AI question generation failed');
}

function createLocalFallbackQuestion({ previousQuestionId, branchFilter, context, reason = null }) {
  try {
    const refreshedContext = buildRecentQuestionContext(12);
    const effectiveContext = refreshedContext.recentSignatures?.length ? refreshedContext : context;
    const question = generateAIQuestion({
      previousQuestionId,
      branchFilter,
      context: effectiveContext,
    });
    rememberAIQuestion(question);
    return {
      ok: true,
      question,
      source: question.source || 'local-template-generator',
      usedRemoteAI: false,
      fallback: Boolean(reason),
      error: reason,
    };
  } catch (localError) {
    return {
      ok: false,
      question: null,
      source: 'local-template-generator-error',
      usedRemoteAI: false,
      fallback: false,
      error: localError,
    };
  }
}

export async function createAIQuestion({ previousQuestionId = null, branchFilter = 'random' } = {}) {
  const context = buildRecentQuestionContext(24);

  try {
    const remoteResult = await requestRemoteAIQuestion({ previousQuestionId, branchFilter, context });
    if (remoteResult?.ok) return remoteResult;
  } catch (error) {
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
  return ENABLE_REAL_AI ? 'real-ai-with-validated-anti-repeat-and-local-fallback' : 'local-generator-only';
}
