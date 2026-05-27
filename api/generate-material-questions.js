import { sendJson, parseJsonBody, callOpenAIJson, validateQuestionsShape, verifyCurrentSourceManifest } from './lib/komite-ai-common.js';
import { sourceTextFromMaterialPacket, getSourceFingerprintFromBody, buildGenerationCacheKey, getCachedGeneration, setCachedGeneration, logAIUsage } from './lib/ai-token-optimizer.js';
import { GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT, buildGenerateMaterialQuestionsPrompt } from './prompts/generateMaterialQuestionsPrompt.js';


const PROMPT_VERSION = 'komite-material-questions-v2-token-cache';

const QUESTION_JSON_SCHEMA = {
  name: 'komite_questions_response',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['questions'],
    properties: {
      questions: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['id', 'questionNumber', 'difficulty', 'learningTarget', 'stem', 'supportingData', 'question', 'options', 'correctOptionId', 'explanation', 'optionFeedback', 'learningPoint', 'memoryNote'],
          properties: {
            id: { type: 'string' },
            questionNumber: { type: 'number' },
            difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
            learningTarget: { type: 'string' },
            stem: { type: 'string' },
            supportingData: { type: 'array', items: { type: 'string' } },
            question: { type: 'string' },
            options: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['id', 'text'],
                properties: {
                  id: { type: 'string', enum: ['A', 'B', 'C', 'D', 'E'] },
                  text: { type: 'string' },
                },
              },
            },
            correctOptionId: { type: 'string', enum: ['A', 'B', 'C', 'D', 'E'] },
            explanation: { type: 'string' },
            optionFeedback: {
              type: 'object',
              additionalProperties: false,
              required: ['A', 'B', 'C', 'D', 'E'],
              properties: { A: { type: 'string' }, B: { type: 'string' }, C: { type: 'string' }, D: { type: 'string' }, E: { type: 'string' } },
            },
            learningPoint: { type: 'string' },
            memoryNote: { type: 'string' },
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
    const currentSourceText = sourceTextFromMaterialPacket(body.materialPacket || {}, envNumber('KOMITE_QUESTIONS_MAX_SOURCE_CHARS', 14000));
    if (!currentSourceText) return sendJson(response, 422, { ok: false, error: 'Current material packet has no readable text.' });
    const cacheKey = buildGenerationCacheKey({ scope: 'KOMITE', task: 'questions', promptVersion: PROMPT_VERSION, model: process.env.KOMITE_OPENAI_MODEL || process.env.OPENAI_MODEL || '', sourceFingerprint, extra: currentSourceText.slice(0, 4000) });
    const cached = getCachedGeneration(cacheKey);
    if (cached) {
      logAIUsage({ scope: 'KOMITE', task: 'questions', model: cached.model || '', apiStyle: cached.apiStyle || 'cache', sourceFingerprint, cacheHit: true });
      return sendJson(response, 200, { ...cached, cached: true });
    }
    const prompt = buildGenerateMaterialQuestionsPrompt({ sourceTextChunks: currentSourceText });
    const result = await callOpenAIJson({ systemPrompt: GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: envNumber('KOMITE_QUESTIONS_MAX_OUTPUT_TOKENS', 4200), jsonSchema: QUESTION_JSON_SCHEMA, scope: 'KOMITE', task: 'questions', promptVersion: PROMPT_VERSION, sourceFingerprint });
    const questions = Array.isArray(result.json.questions) ? result.json.questions : [];
    const validation = validateQuestionsShape({ questions });
    const responseValidation = validation.ok ? validation : { ok: true, warnings: validation.errors || [], note: 'Non-blocking question normalization warnings.' };
    const payload = { ok: true, provider: 'openai', model: result.model, apiStyle: result.apiStyle, questions, validation: responseValidation, usage: result.usage || null };
    setCachedGeneration(cacheKey, payload);
    return sendJson(response, 200, payload);
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : (error.status || 502), { ok: false, error: error.message });
  }
}
