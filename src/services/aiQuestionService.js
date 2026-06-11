import { rememberAIQuestion } from '../utils/aiQuestionHistory.js';
import { normalizeSimpleAIQuestion } from '../utils/simpleAIQuestionAdapter.js';

const runtimeEnv = import.meta.env || {};
const AI_ENDPOINT = runtimeEnv.VITE_AI_QUESTION_ENDPOINT || '/api/generate-ai-question';
const ENABLE_REAL_AI = String(runtimeEnv.VITE_ENABLE_REAL_AI ?? 'true').toLowerCase() !== 'false';
const AI_REQUEST_TIMEOUT_MS = Number(runtimeEnv.VITE_AI_REQUEST_TIMEOUT_MS || 90000);

function withTimeout(ms = AI_REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutMs = Math.max(1000, Number(ms || AI_REQUEST_TIMEOUT_MS));
  const timeoutId = window.setTimeout(() => {
    const error = new DOMException(`AI isteği ${Math.round(timeoutMs / 1000)} saniye içinde tamamlanamadı.`, 'AbortError');
    try { controller.abort(error); } catch { controller.abort(); }
  }, timeoutMs);
  return { controller, timeoutId };
}

function isAbortLikeError(error) {
  return error?.name === 'AbortError'
    || /aborted|abort|signal is aborted|timeout|timed out/i.test(String(error?.message || error || ''));
}

function canUseRemote() {
  return ENABLE_REAL_AI && typeof window !== 'undefined' && typeof fetch === 'function';
}

function readPayloadError(payload, status) {
  if (payload && typeof payload === 'object') return payload.error || payload.message || payload.detail || `AI endpoint ${status}`;
  return `AI endpoint ${status}`;
}

async function fetchRemoteQuestion({ previousQuestionId, branchFilter, difficulty = 'Orta' }) {
  if (!canUseRemote()) throw new Error('Gerçek TUS AI Spot bağlantısı kapalı veya tarayıcı fetch desteği yok.');

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
    const question = normalizeSimpleAIQuestion(rawQuestion, {
      provider: payload.provider || rawQuestion.provider || 'openai',
      model: rawQuestion.openAIModel || payload.model || null,
      remote: true,
      fallback: false,
      branchFilter,
      difficulty,
    });

    const historyItem = rememberAIQuestion(question);
    question.aiMeta = {
      ...(question.aiMeta || {}),
      provider: payload.provider || question.aiMeta?.provider || 'openai',
      remote: true,
      fallback: false,
      historyItemId: historyItem.id,
      sourceChecked: Boolean(payload.sourceChecked || rawQuestion.aiMeta?.sourceChecked),
      sourceUrls: payload.sourceUrls || rawQuestion.aiMeta?.sourceUrls || [],
    };

    return { ok: true, question, source: question.aiMeta.provider, usedRemoteAI: true, fallback: false, showFallbackNotice: false };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function prefetchNextAIQuestion() {
  return null;
}

export async function createAIQuestion({ previousQuestionId = null, branchFilter = 'random', difficulty = 'Orta' } = {}) {
  try {
    return await fetchRemoteQuestion({ previousQuestionId, branchFilter, difficulty });
  } catch (error) {
    const normalizedError = isAbortLikeError(error)
      ? new Error('TUS AI Spot soru üretimi zaman aşımına uğradı. Lütfen tekrar deneyin veya VITE_AI_REQUEST_TIMEOUT_MS / TUS_OPENAI_PER_REQUEST_TIMEOUT_MS değerlerini artırın.')
      : error;
    return { ok: false, question: null, source: 'openai-error', usedRemoteAI: false, fallback: false, showFallbackNotice: false, error: normalizedError };
  }
}

export function getAIServiceMode() {
  return ENABLE_REAL_AI ? 'tus-ai-spot-only' : 'real-ai-disabled';
}
