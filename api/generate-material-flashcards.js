import { sendJson, parseJsonBody, callOpenAIJson, validateFlashcardsShape, verifyCurrentSourceManifest } from '../server/lib/komite-ai-common.js';
import { GENERATE_FLASHCARDS_SYSTEM_PROMPT, buildGenerateFlashcardsPrompt } from '../server/prompts/generateFlashcardsPrompt.js';
import { buildOutputCacheKey, compactMaterialSources, createSourceFingerprint, defaultModelForScope, getDurableCachedOutput, logAIUsage, resolveModelForScope, resolveSourceCharLimit, setDurableCachedOutput, withInFlightDedupe } from '../server/lib/ai-token-optimizer.js';


const TASK_NAME = 'materialFlashcards';
const PROMPT_VERSION = 'komite-material-flashcards-v3-cost-capped';

function currentKomiteModel() {
  return resolveModelForScope('KOMITE');
}

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

function compactTextWindow(text = '', maxChars = 12000) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxChars) return clean;
  const part = Math.floor(maxChars / 3);
  const start = clean.slice(0, part);
  const middleStart = Math.max(0, Math.floor(clean.length / 2) - Math.floor(part / 2));
  const middle = clean.slice(middleStart, middleStart + part);
  const end = clean.slice(Math.max(0, clean.length - part));
  return [start, middle, end].join('\n\n');
}

function sourceTextFromMaterialPacket(packet = {}, maxTotalChars = resolveSourceCharLimit('KOMITE_FLASHCARDS_MAX_SOURCE_CHARS', 12000, 'KOMITE', TASK_NAME)) {
  const files = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  if (!files.length) return '';
  const perFile = Math.max(4000, Math.floor(maxTotalChars / files.length));
  return files.map((file) => {
    const text = String(file.cleanedExtractedText || file.text || '').trim();
    return compactTextWindow(text, perFile);
  }).join('\n\n').trim();
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }
  try {
    const sourceCheck = verifyCurrentSourceManifest(body);
    if (!sourceCheck.ok) return sendJson(response, 409, { ok: false, error: 'Current source session validation failed', validation: sourceCheck });
    const sourceFingerprint = createSourceFingerprint({ clientFingerprint: body.sourceFingerprint || sourceCheck.fingerprint || '', files: body.materialPacket?.files || [] });
    const currentSourceText = compactMaterialSources(body.materialPacket?.files || [], resolveSourceCharLimit('KOMITE_FLASHCARDS_MAX_SOURCE_CHARS', 12000, 'KOMITE', TASK_NAME));
    if (!currentSourceText) return sendJson(response, 422, { ok: false, error: 'Current material packet has no readable text.' });
    const cacheKey = buildOutputCacheKey({ scope: 'KOMITE', task: TASK_NAME, promptVersion: PROMPT_VERSION, model: currentKomiteModel(), sourceFingerprint });
    return await withInFlightDedupe(cacheKey, async () => {
      const cachedOutput = await getDurableCachedOutput(cacheKey);
      if (cachedOutput) {
        logAIUsage({ task: TASK_NAME, model: cachedOutput.model || currentKomiteModel(), cached: true, apiStyle: cachedOutput.apiStyle || 'output_cache' });
        return sendJson(response, 200, { ok: true, cached: true, ...cachedOutput });
      }
      const prompt = buildGenerateFlashcardsPrompt({ sourceTextChunks: currentSourceText });
      const result = await callOpenAIJson({ systemPrompt: GENERATE_FLASHCARDS_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: envNumber('KOMITE_FLASHCARDS_MAX_OUTPUT_TOKENS', 3200), jsonSchema: FLASHCARD_JSON_SCHEMA, scope: 'KOMITE', task: TASK_NAME, promptVersion: PROMPT_VERSION });
      const deck = result.json.deck || result.json;
      const validation = validateFlashcardsShape(deck);
      const responseValidation = validation.ok ? validation : { ok: true, warnings: validation.errors || [], note: 'Non-blocking flashcard normalization warnings.' };
      const payload = { provider: 'openai', model: result.model, apiStyle: result.apiStyle, deck, validation: responseValidation };
      await setDurableCachedOutput(cacheKey, payload);
      return sendJson(response, 200, { ok: true, cached: false, ...payload });
    });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : (error.status || 502), { ok: false, error: error.message });
  }
}
