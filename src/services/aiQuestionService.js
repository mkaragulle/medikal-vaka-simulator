import { buildRecentQuestionContext, rememberAIQuestion } from '../utils/aiQuestionHistory.js';
import {
  createSimpleFallbackQuestion,
  isTooSimilarToRecent,
  normalizeSimpleAIQuestion,
} from '../utils/simpleAIQuestionAdapter.js';

const runtimeEnv = import.meta.env || {};
const AI_ENDPOINT = runtimeEnv.VITE_AI_QUESTION_ENDPOINT || '/api/generate-ai-question';
const ENABLE_REAL_AI = String(runtimeEnv.VITE_ENABLE_REAL_AI ?? 'true').toLowerCase() !== 'false';
const requestedAIRequestTimeoutMs = Number(runtimeEnv.VITE_AI_REQUEST_TIMEOUT_MS || 180000);
const AI_REQUEST_TIMEOUT_MS = Math.max(65000, Math.min(300000, requestedAIRequestTimeoutMs || 180000));
const AI_REMOTE_RETRY_COUNT = Math.max(1, Math.min(2, Number(runtimeEnv.VITE_AI_REMOTE_RETRY_COUNT || 1))); // keep one visible request by default; backend handles validation
const ENABLE_CLIENT_PREFETCH = String(runtimeEnv.VITE_AI_ENABLE_NEXT_QUESTION_PREFETCH ?? 'false').toLowerCase() === 'true';
const MAX_PREFETCHED_PER_KEY = Math.max(0, Math.min(2, Number(runtimeEnv.VITE_AI_PREFETCH_QUEUE_SIZE || 0)));
const PREFETCH_FIRST_WAIT_MS = Math.max(0, Math.min(4500, Number(runtimeEnv.VITE_AI_PREFETCH_FIRST_WAIT_MS || 1200)));
const FALLBACK_GRACE_WAIT_MS = Math.max(0, Math.min(6500, Number(runtimeEnv.VITE_AI_FALLBACK_GRACE_WAIT_MS || 5000)));
const SHOW_FALLBACK_NOTICE = String(runtimeEnv.VITE_AI_SHOW_FALLBACK_NOTICE ?? 'false').toLowerCase() === 'true';

const prefetchedQuestionQueues = new Map();
const activePrefetches = new Map();

function queueKey(branchFilter = 'random', difficulty = 'Orta') {
  return `${String(branchFilter || 'random').trim()}::${String(difficulty || 'Orta').trim()}`;
}

function getQueue(key) {
  if (!prefetchedQuestionQueues.has(key)) prefetchedQuestionQueues.set(key, []);
  return prefetchedQuestionQueues.get(key);
}

function sleep(ms = 0) {
  return new Promise((resolve) => window.setTimeout(resolve, Math.max(0, Number(ms || 0))));
}

function markFallbackNotice(result, visible = SHOW_FALLBACK_NOTICE) {
  if (!result || !result.question) return result;
  result.showFallbackNotice = Boolean(result.fallback && visible);
  result.question.aiMeta = {
    ...(result.question.aiMeta || {}),
    fallbackNotice: Boolean(result.fallback && visible),
  };
  return result;
}

function takePrefetchedQuestion({ branchFilter, difficulty, context }) {
  const key = queueKey(branchFilter, difficulty);
  const queue = getQueue(key);
  while (queue.length) {
    const item = queue.shift();
    if (item?.question && !isTooSimilarToRecent(item.question, context?.recentQuestionSummaries || [])) {
      const historyItem = rememberAIQuestion(item.question);
      item.question.aiMeta = {
        ...(item.question.aiMeta || {}),
        historyItemId: historyItem.id,
        servedFromClientPrefetch: true,
      };
      return { ...item, prefetched: true };
    }
  }
  return null;
}

async function waitForActivePrefetch({ branchFilter, difficulty, context, timeoutMs = PREFETCH_FIRST_WAIT_MS }) {
  const key = queueKey(branchFilter, difficulty);
  const queued = takePrefetchedQuestion({ branchFilter, difficulty, context });
  if (queued?.ok) return { ...queued, source: queued.source || 'client-prefetch-cache', usedRemoteAI: true };

  const active = activePrefetches.get(key);
  if (!active || Number(timeoutMs || 0) <= 0) return null;

  await Promise.race([active.catch(() => null), sleep(timeoutMs)]);
  const ready = takePrefetchedQuestion({ branchFilter, difficulty, context });
  if (ready?.ok) return { ...ready, source: ready.source || 'client-prefetch-cache', usedRemoteAI: true };
  return null;
}

function storePrefetchedQuestion({ branchFilter, difficulty, result }) {
  if (!result?.ok || !result?.question || result.fallback) return false;
  const key = queueKey(branchFilter, difficulty);
  const queue = getQueue(key);
  if (queue.length >= MAX_PREFETCHED_PER_KEY) return false;
  result.question.aiMeta = { ...(result.question.aiMeta || {}), clientPrefetched: true };
  queue.push(result);
  return true;
}

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

async function fetchOneRemoteQuestion({ previousQuestionId, branchFilter, difficulty = 'Orta', context, attempt }) {
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
        difficulty,
        ...requestContext,
        requestId: `klinikiq-ai-${Date.now()}-${attempt}`,
        attempt,
        antiRepeatNonce: makeAntiRepeatNonce(),
      }),
    });

    let payload = null;
    try { payload = await response.json(); } catch { payload = null; }
    if (!response.ok || !payload?.ok) {
      const error = new Error(getPayloadError(payload, response.status));
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

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
      fallbackNotice: Boolean(isFallback && SHOW_FALLBACK_NOTICE),
      remoteAttempt: attempt,
      serverError: payload.error || null,
    };

    if (!isFallback && isTooSimilarToRecent(normalized, context.recentQuestionSummaries || [])) {
      throw new Error('Yakın geçmişteki sorulara çok benzer üretim reddedildi.');
    }

    return {
      ok: true,
      question: normalized,
      source: normalized.aiMeta.provider,
      usedRemoteAI: !isFallback,
      fallback: isFallback,
      showFallbackNotice: Boolean(isFallback && SHOW_FALLBACK_NOTICE),
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function requestRemoteQuestion({ previousQuestionId, branchFilter, difficulty = 'Orta', context }) {
  if (!canUseRemote()) return null;
  let lastError = null;
  for (let attempt = 1; attempt <= AI_REMOTE_RETRY_COUNT; attempt += 1) {
    try {
      const result = await fetchOneRemoteQuestion({ previousQuestionId, branchFilter, difficulty, context, attempt });
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

function createClientFallback({ branchFilter, difficulty = 'Orta', context, reason }) {
  const question = createSimpleFallbackQuestion({
    branchFilter,
    difficulty,
    recentQuestionSummaries: context?.recentQuestionSummaries || [],
  });
  question.aiMeta = {
    ...(question.aiMeta || {}),
    fallback: true,
    remote: false,
    fallbackNotice: SHOW_FALLBACK_NOTICE,
    fallbackReason: reason?.message || String(reason || ''),
    fallbackStage: 'client-network-or-endpoint-fallback',
  };
  rememberAIQuestion(question);
  return {
    ok: true,
    question,
    source: 'local-safe-fallback',
    usedRemoteAI: false,
    fallback: true,
    showFallbackNotice: SHOW_FALLBACK_NOTICE,
    error: null,
  };
}


export function prefetchNextAIQuestion({ previousQuestionId = null, branchFilter = 'random', difficulty = 'Orta' } = {}) {
  if (!ENABLE_CLIENT_PREFETCH || !canUseRemote()) return null;
  const key = queueKey(branchFilter, difficulty);
  if (activePrefetches.has(key) || getQueue(key).length >= MAX_PREFETCHED_PER_KEY) return activePrefetches.get(key) || null;

  const context = buildRecentQuestionContext(30);
  const promise = (async () => {
    try {
      const result = await fetchOneRemoteQuestion({ previousQuestionId, branchFilter, difficulty, context, attempt: 1 });
      storePrefetchedQuestion({ branchFilter, difficulty, result });
      return result;
    } catch {
      return null;
    } finally {
      activePrefetches.delete(key);
    }
  })();
  activePrefetches.set(key, promise);
  return promise;
}

export async function createAIQuestion({ previousQuestionId = null, branchFilter = 'random', difficulty = 'Orta' } = {}) {
  const context = buildRecentQuestionContext(30);

  const prefetched = takePrefetchedQuestion({ branchFilter, difficulty, context });
  if (prefetched?.ok) return { ...prefetched, source: prefetched.source || 'client-prefetch-cache', usedRemoteAI: true, showFallbackNotice: false };

  // When +1 backup generation is enabled, the backup request may already be in flight.
  // Wait briefly for that existing request instead of starting/serving a visible fallback immediately.
  // This reduces both duplicate cost and the alarming “AI fallback” experience without adding a new API call.
  const activePrefetch = await waitForActivePrefetch({ branchFilter, difficulty, context, timeoutMs: PREFETCH_FIRST_WAIT_MS });
  if (activePrefetch?.ok) return { ...activePrefetch, source: activePrefetch.source || 'client-prefetch-cache', usedRemoteAI: true, showFallbackNotice: false };

  try {
    const remote = await requestRemoteQuestion({ previousQuestionId, branchFilter, difficulty, context });
    if (remote?.ok && !remote.fallback) return remote;

    if (remote?.ok && remote.fallback) {
      // If the visible request received a server fallback while the backup request is still running,
      // give the real backup a short grace window. No extra OpenAI request is created here.
      const recoveredPrefetch = await waitForActivePrefetch({ branchFilter, difficulty, context, timeoutMs: FALLBACK_GRACE_WAIT_MS });
      if (recoveredPrefetch?.ok) return { ...recoveredPrefetch, source: recoveredPrefetch.source || 'client-prefetch-cache', usedRemoteAI: true, showFallbackNotice: false };
      return markFallbackNotice(remote, SHOW_FALLBACK_NOTICE);
    }
  } catch (error) {
    const recoveredPrefetch = await waitForActivePrefetch({ branchFilter, difficulty, context, timeoutMs: FALLBACK_GRACE_WAIT_MS });
    if (recoveredPrefetch?.ok) return { ...recoveredPrefetch, source: recoveredPrefetch.source || 'client-prefetch-cache', usedRemoteAI: true, showFallbackNotice: false };

    if (error?.status === 422 || error?.payload?.manualReviewRequired) {
      return { ok: false, question: null, source: 'server-quality-rejection', usedRemoteAI: false, fallback: false, showFallbackNotice: false, error };
    }
    return createClientFallback({ branchFilter, difficulty, context, reason: error });
  }

  return createClientFallback({ branchFilter, difficulty, context, reason: new Error('AI endpoint returned no usable question') });
}


export function getAIServiceMode() {
  return ENABLE_REAL_AI ? 'openai-cache-bank-prefetch' : 'real-ai-disabled';
}
