import { generateAIQuestion } from '../utils/aiQuestionGenerator.js';
import { buildRecentQuestionContext, rememberAIQuestion } from '../utils/aiQuestionHistory.js';
import { normalizeGeneratedAIQuestion, validateAIQuestionCase } from '../utils/validateAIQuestion.js';

const runtimeEnv = import.meta.env || {};
const AI_ENDPOINT = runtimeEnv.VITE_AI_QUESTION_ENDPOINT || '/api/generate-ai-question';
const ENABLE_REAL_AI = String(runtimeEnv.VITE_ENABLE_REAL_AI || 'false').toLowerCase() === 'true';
const AI_REQUEST_TIMEOUT_MS = Number(runtimeEnv.VITE_AI_REQUEST_TIMEOUT_MS || 9000);

function withTimeout(ms = AI_REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), ms);
  return { controller, timeoutId };
}

async function requestRemoteAIQuestion({ previousQuestionId, branchFilter, context }) {
  if (!ENABLE_REAL_AI || typeof window === 'undefined') {
    return null;
  }

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
    };

    const validation = validateAIQuestionCase(normalized, context.recentSignatures);
    if (!validation.ok) {
      throw new Error(`Remote AI validation failed: ${validation.errors.join('; ')}`);
    }

    rememberAIQuestion(normalized);
    return {
      ok: true,
      question: normalized,
      source: normalized.aiMeta.provider || 'real-ai',
      usedRemoteAI: true,
      fallback: false,
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function createLocalFallbackQuestion({ previousQuestionId, branchFilter, context, reason = null }) {
  const question = generateAIQuestion({ previousQuestionId, branchFilter, context });
  rememberAIQuestion(question);
  return {
    ok: true,
    question,
    source: question.source || 'mock-local-generator',
    usedRemoteAI: false,
    fallback: Boolean(reason),
    error: reason,
  };
}

export async function createAIQuestion({ previousQuestionId = null, branchFilter = 'random' } = {}) {
  const context = buildRecentQuestionContext(14);

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
  return ENABLE_REAL_AI ? 'real-ai-with-local-fallback' : 'local-generator-only';
}
