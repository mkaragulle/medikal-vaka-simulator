import { rememberAIQuestion } from '../utils/aiQuestionHistory.js';
import { createSimpleFallbackQuestion, normalizeSimpleAIQuestion } from '../utils/simpleAIQuestionAdapter.js';

const runtimeEnv = import.meta.env || {};
const AI_ENDPOINT = runtimeEnv.VITE_AI_QUESTION_ENDPOINT || '/api/generate-ai-question';
const ENABLE_REAL_AI = String(runtimeEnv.VITE_ENABLE_REAL_AI ?? 'true').toLowerCase() !== 'false';
const AI_REQUEST_TIMEOUT_MS = Number(runtimeEnv.VITE_AI_REQUEST_TIMEOUT_MS || 90000);
const ENABLE_CLIENT_FALLBACK = String(runtimeEnv.VITE_AI_ENABLE_CLIENT_FALLBACK ?? 'false').toLowerCase() === 'true';
const SHOW_FALLBACK_NOTICE = String(runtimeEnv.VITE_AI_SHOW_FALLBACK_NOTICE ?? 'false').toLowerCase() === 'true';

function withTimeout(ms = AI_REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutMs = Math.max(1000, Number(ms || AI_REQUEST_TIMEOUT_MS));
  const timeoutId = window.setTimeout(() => {
    const error = new DOMException(`AI isteği ${Math.round(timeoutMs / 1000)} saniye içinde tamamlanamadı.`, 'AbortError');
    try { controller.abort(error); } catch { controller.abort(); }
  }, timeoutMs);
  return { controller, timeoutId, timeoutMs };
}

function isAbortLikeError(error) {
  return error?.name === 'AbortError'
    || /aborted|abort|signal is aborted|timeout|timed out/i.test(String(error?.message || error || ''));
}

function canUseRemote() {
  return ENABLE_REAL_AI && typeof window !== 'undefined' && typeof fetch === 'function';
}

function readPayloadError(payload, status) {
  if (payload && typeof payload === 'object') {
    return payload.error || payload.message || payload.detail || `AI endpoint ${status}`;
  }
  return `AI endpoint ${status}`;
}

async function fetchRemoteQuestion({ previousQuestionId, branchFilter, difficulty = 'Orta' }) {
  if (!canUseRemote()) throw new Error('Gerçek AI bağlantısı kapalı veya tarayıcı fetch desteği yok.');

  const { controller, timeoutId } = withTimeout();
  try {
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ previousQuestionId, branchFilter, difficulty }),
    });

    let payload = null;
    try { payload = await response.json(); } catch { payload = null; }
    if (!response.ok || !payload?.ok) throw new Error(readPayloadError(payload, response.status));

    const rawQuestion = payload.question || payload;
    const isFallback = Boolean(payload.fallback || rawQuestion.fallback || String(payload.provider || rawQuestion.provider || '').toLowerCase().includes('fallback'));
    const question = normalizeSimpleAIQuestion(rawQuestion, {
      provider: payload.provider || rawQuestion.provider || 'openai',
      model: rawQuestion.openAIModel || payload.model || null,
      remote: !isFallback,
      fallback: isFallback,
      branchFilter,
      difficulty,
    });

    const historyItem = rememberAIQuestion(question);
    question.aiMeta = {
      ...(question.aiMeta || {}),
      provider: payload.provider || question.aiMeta?.provider || 'openai',
      remote: !isFallback,
      fallback: isFallback,
      historyItemId: historyItem.id,
      serverError: payload.error || null,
    };

    return {
      ok: true,
      question,
      source: question.aiMeta.provider,
      usedRemoteAI: !isFallback,
      fallback: isFallback,
      showFallbackNotice: Boolean(isFallback && SHOW_FALLBACK_NOTICE),
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function createClientFallback({ branchFilter, difficulty = 'Orta', reason }) {
  const question = createSimpleFallbackQuestion({ branchFilter, difficulty });
  question.aiMeta = {
    ...(question.aiMeta || {}),
    fallback: true,
    remote: false,
    fallbackNotice: SHOW_FALLBACK_NOTICE,
    fallbackReason: reason?.message || String(reason || ''),
  };
  rememberAIQuestion(question);
  return {
    ok: true,
    question,
    source: 'local-safe-fallback',
    usedRemoteAI: false,
    fallback: true,
    showFallbackNotice: SHOW_FALLBACK_NOTICE,
    error: reason || null,
  };
}

export function prefetchNextAIQuestion() {
  // V411: hidden prefetch is intentionally disabled for predictable cost.
  return null;
}

export async function createAIQuestion({ previousQuestionId = null, branchFilter = 'random', difficulty = 'Orta' } = {}) {
  try {
    return await fetchRemoteQuestion({ previousQuestionId, branchFilter, difficulty });
  } catch (error) {
    const normalizedError = isAbortLikeError(error)
      ? new Error('AI isteği zaman aşımına uğradı. Bu kalite gate veya fallback hatası değildir; model yanıtı süre içinde tamamlayamadı. Tekrar deneyin veya VITE_AI_REQUEST_TIMEOUT_MS / TUS_OPENAI_PER_REQUEST_TIMEOUT_MS değerlerini artırın.')
      : error;
    if (ENABLE_CLIENT_FALLBACK) return createClientFallback({ branchFilter, difficulty, reason: normalizedError });
    return {
      ok: false,
      question: null,
      source: 'openai-error',
      usedRemoteAI: false,
      fallback: false,
      showFallbackNotice: false,
      error: normalizedError,
    };
  }
}

export function getAIServiceMode() {
  return ENABLE_REAL_AI ? 'openai-skeleton-feedback-v437' : 'real-ai-disabled';
}
