import { buildRecentQuestionContext, rememberAIQuestion } from '../utils/aiQuestionHistory.js';
import {
  createSimpleFallbackQuestion,
  isTooSimilarToRecent,
  normalizeSimpleAIQuestion,
} from '../utils/simpleAIQuestionAdapter.js';

const runtimeEnv = import.meta.env || {};
const AI_ENDPOINT = runtimeEnv.VITE_AI_QUESTION_ENDPOINT || '/api/generate-ai-question';
const ENABLE_REAL_AI = String(runtimeEnv.VITE_ENABLE_REAL_AI ?? 'true').toLowerCase() !== 'false';
const AI_REQUEST_TIMEOUT_MS = Number(runtimeEnv.VITE_AI_REQUEST_TIMEOUT_MS || 45000);
const AI_REMOTE_RETRY_COUNT = Math.max(1, Math.min(2, Number(runtimeEnv.VITE_AI_REMOTE_RETRY_COUNT || 1)));

function withTimeout(ms = AI_REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), ms);
  return { controller, timeoutId };
}

function makeAntiRepeatNonce() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function canUseRemote() {
  return ENABLE_REAL_AI && typeof window !== 'undefined' && typeof fetch === 'function';
}

function getPayloadError(payload, status) {
  if (!payload || typeof payload !== 'object') return `AI endpoint failed with ${status}`;
  return payload.error || payload.message || payload.attempts?.join(' | ') || `AI endpoint failed with ${status}`;
}

function buildRequestContext(context = {}) {
  return {
    recentIds: Array.isArray(context.recentIds) ? context.recentIds.slice(0, 20) : [],
    recentSignatures: Array.isArray(context.recentSignatures) ? context.recentSignatures.slice(0, 40) : [],
    recentQuestionSummaries: Array.isArray(context.recentQuestionSummaries)
      ? context.recentQuestionSummaries.slice(0, 10)
      : [],
  };
}

async function fetchOneRemoteQuestion({ previousQuestionId, branchFilter, context, attempt }) {
  const { controller, timeoutId } = withTimeout();
  const requestContext = buildRequestContext(context);
  try {
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        previousQuestionId,
        branchFilter,
        ...requestContext,
        requestId: `klinikiq-ai-${Date.now()}-${attempt}`,
        attempt,
        antiRepeatNonce: makeAntiRepeatNonce(),
      }),
    });

    let payload = null;
    try { payload = await response.json(); } catch { payload = null; }
    if (!response.ok || !payload?.ok) throw new Error(getPayloadError(payload, response.status));

    const rawQuestion = payload.question || payload;
    const isFallback = Boolean(payload.fallback || payload.safeFallback || rawQuestion.fallback || String(payload.provider || rawQuestion.provider || '').toLowerCase().includes('fallback'));
    const normalized = normalizeSimpleAIQuestion(rawQuestion, {
      provider: payload.provider || rawQuestion.provider || 'openai',
      model: rawQuestion.openAIModel || payload.model || null,
      remote: !isFallback,
      fallback: isFallback,
      branchFilter,
    });

    normalized.aiMeta = {
      ...(normalized.aiMeta || {}),
      provider: payload.provider || rawQuestion.provider || normalized.aiMeta?.provider || 'openai',
      remote: !isFallback,
      fallback: isFallback,
      remoteAttempt: attempt,
      serverError: payload.error || null,
    };

    if (isTooSimilarToRecent(normalized, context.recentQuestionSummaries || [])) {
      throw new Error('Yakın geçmişteki sorulara çok benzer üretim reddedildi.');
    }

    return {
      ok: true,
      question: normalized,
      source: normalized.aiMeta.provider,
      usedRemoteAI: !isFallback,
      fallback: isFallback,
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function requestRemoteQuestion({ previousQuestionId, branchFilter, context }) {
  if (!canUseRemote()) return null;
  let lastError = null;
  for (let attempt = 1; attempt <= AI_REMOTE_RETRY_COUNT; attempt += 1) {
    try {
      const result = await fetchOneRemoteQuestion({ previousQuestionId, branchFilter, context, attempt });
      if (result?.ok) {
        const historyItem = rememberAIQuestion(result.question);
        result.question.aiMeta = { ...(result.question.aiMeta || {}), historyItemId: historyItem.id };
        return result;
      }
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('AI üretimi başarısız oldu.');
}

function createClientFallback({ branchFilter, context, reason }) {
  const question = createSimpleFallbackQuestion({
    branchFilter,
    recentQuestionSummaries: context?.recentQuestionSummaries || [],
  });
  question.aiMeta = {
    ...(question.aiMeta || {}),
    fallback: true,
    remote: false,
    fallbackReason: reason?.message || String(reason || ''),
  };
  rememberAIQuestion(question);
  return {
    ok: true,
    question,
    source: 'local-safe-fallback',
    usedRemoteAI: false,
    fallback: true,
    error: reason || null,
  };
}

export async function createAIQuestion({ previousQuestionId = null, branchFilter = 'random' } = {}) {
  const context = buildRecentQuestionContext(30);
  try {
    const remote = await requestRemoteQuestion({ previousQuestionId, branchFilter, context });
    if (remote?.ok) return remote;
  } catch (error) {
    if (String(runtimeEnv.VITE_AI_ENABLE_CLIENT_FALLBACK ?? 'true').toLowerCase() === 'false') {
      return { ok: false, question: null, source: 'openai-error', usedRemoteAI: false, fallback: false, error };
    }
    return createClientFallback({ branchFilter, context, reason: error });
  }
  return createClientFallback({ branchFilter, context, reason: null });
}

export function getAIServiceMode() {
  return ENABLE_REAL_AI ? 'simple-openai-one-call-with-safe-fallback' : 'safe-local-fallback-only';
}
