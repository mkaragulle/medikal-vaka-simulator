import { sendJson, parseJsonBody, callOpenAIJson, validateFlashcardsShape, verifyCurrentSourceManifest } from './lib/komite-ai-common.js';
import { sourceTextFromMaterialPacket, getSourceFingerprintFromBody, buildGenerationCacheKey, getCachedGeneration, setCachedGeneration, logAIUsage } from './lib/ai-token-optimizer.js';
import { GENERATE_FLASHCARDS_SYSTEM_PROMPT, buildGenerateFlashcardsPrompt } from './prompts/generateFlashcardsPrompt.js';


const PROMPT_VERSION = 'komite-flashcards-v2-token-cache';

const FLASHCARD_JSON_SCHEMA = {
  name: 'komite_flashcards_response',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['deck'],
    properties: {
      deck: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'deckTitle', 'materialId', 'cards'],
        properties: {
          id: { type: 'string' },
          deckTitle: { type: 'string' },
          materialId: { type: 'string' },
          cards: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['id', 'type', 'difficulty', 'front', 'back', 'explanation', 'sourceReference', 'tags', 'isFavorite', 'isDifficult', 'repeatStatus'],
              properties: {
                id: { type: 'string' },
                type: { type: 'string' },
                difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
                front: { type: 'string' },
                back: { type: 'string' },
                explanation: { type: 'string' },
                sourceReference: { type: 'string' },
                tags: { type: 'array', items: { type: 'string' } },
                isFavorite: { type: 'boolean' },
                isDifficult: { type: 'boolean' },
                repeatStatus: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
};

function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }
  try {
    const sourceCheck = verifyCurrentSourceManifest(body);
    if (!sourceCheck.ok) return sendJson(response, 409, { ok: false, error: 'Current source session validation failed', validation: sourceCheck });
    const sourceFingerprint = getSourceFingerprintFromBody(body);
    const currentSourceText = sourceTextFromMaterialPacket(body.materialPacket || {}, envNumber('KOMITE_FLASHCARDS_MAX_SOURCE_CHARS', 12000));
    if (!currentSourceText) return sendJson(response, 422, { ok: false, error: 'Current material packet has no readable text.' });
    const cacheKey = buildGenerationCacheKey({ scope: 'KOMITE', task: 'flashcards', promptVersion: PROMPT_VERSION, model: process.env.KOMITE_OPENAI_MODEL || process.env.OPENAI_MODEL || '', sourceFingerprint, extra: currentSourceText.slice(0, 4000) });
    const cached = getCachedGeneration(cacheKey);
    if (cached) {
      logAIUsage({ scope: 'KOMITE', task: 'flashcards', model: cached.model || '', apiStyle: cached.apiStyle || 'cache', sourceFingerprint, cacheHit: true });
      return sendJson(response, 200, { ...cached, cached: true });
    }
    const prompt = buildGenerateFlashcardsPrompt({ sourceTextChunks: currentSourceText });
    const result = await callOpenAIJson({ systemPrompt: GENERATE_FLASHCARDS_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: envNumber('KOMITE_FLASHCARDS_MAX_OUTPUT_TOKENS', 3200), jsonSchema: FLASHCARD_JSON_SCHEMA, scope: 'KOMITE', task: 'flashcards', promptVersion: PROMPT_VERSION, sourceFingerprint });
    const deck = result.json.deck || result.json;
    const validation = validateFlashcardsShape(deck);
    const responseValidation = validation.ok ? validation : { ok: true, warnings: validation.errors || [], note: 'Non-blocking flashcard normalization warnings.' };
    const payload = { ok: true, provider: 'openai', model: result.model, apiStyle: result.apiStyle, deck, validation: responseValidation, usage: result.usage || null };
    setCachedGeneration(cacheKey, payload);
    return sendJson(response, 200, payload);
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : (error.status || 502), { ok: false, error: error.message });
  }
}
