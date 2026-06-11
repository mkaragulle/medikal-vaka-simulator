import { sendJson, parseJsonBody, callOpenAIJson, validateQuestionsShape, verifyCurrentSourceManifest } from '../server/lib/komite-ai-common.js';
import { GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT, buildGenerateMaterialQuestionsPrompt } from '../server/prompts/generateMaterialQuestionsPrompt.js';
import { buildOutputCacheKey, compactMaterialSources, createSourceFingerprint, defaultModelForScope, getDurableCachedOutput, logAIUsage, resolveModelForScope, resolveSourceCharLimit, setDurableCachedOutput, withInFlightDedupe } from '../server/lib/ai-token-optimizer.js';


const TASK_NAME = 'materialQuestions';
const PROMPT_VERSION = 'komite-material-questions-v3-cost-capped';

function currentKomiteModel() {
  return resolveModelForScope('KOMITE');
}

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

function sourceTextFromMaterialPacket(packet = {}, maxTotalChars = resolveSourceCharLimit('KOMITE_QUESTIONS_MAX_SOURCE_CHARS', 14000, 'KOMITE', TASK_NAME)) {
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
    const currentSourceText = compactMaterialSources(body.materialPacket?.files || [], resolveSourceCharLimit('KOMITE_QUESTIONS_MAX_SOURCE_CHARS', 14000, 'KOMITE', TASK_NAME));
    if (!currentSourceText) return sendJson(response, 422, { ok: false, error: 'Current material packet has no readable text.' });
    const cacheKey = buildOutputCacheKey({ scope: 'KOMITE', task: TASK_NAME, promptVersion: PROMPT_VERSION, model: currentKomiteModel(), sourceFingerprint });
    return await withInFlightDedupe(cacheKey, async () => {
      const cachedOutput = await getDurableCachedOutput(cacheKey);
      if (cachedOutput) {
        logAIUsage({ task: TASK_NAME, model: cachedOutput.model || currentKomiteModel(), cached: true, apiStyle: cachedOutput.apiStyle || 'output_cache' });
        return sendJson(response, 200, { ok: true, cached: true, ...cachedOutput });
      }
      const prompt = buildGenerateMaterialQuestionsPrompt({ sourceTextChunks: currentSourceText });
      const result = await callOpenAIJson({ systemPrompt: GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: envNumber('KOMITE_QUESTIONS_MAX_OUTPUT_TOKENS', 4200), jsonSchema: QUESTION_JSON_SCHEMA, scope: 'KOMITE', task: TASK_NAME, promptVersion: PROMPT_VERSION });
      const questions = Array.isArray(result.json.questions) ? result.json.questions : [];
      const validation = validateQuestionsShape({ questions });
      const responseValidation = validation.ok ? validation : { ok: true, warnings: validation.errors || [], note: 'Non-blocking question normalization warnings.' };
      const payload = { provider: 'openai', model: result.model, apiStyle: result.apiStyle, questions, validation: responseValidation };
      await setDurableCachedOutput(cacheKey, payload);
      return sendJson(response, 200, { ok: true, cached: false, ...payload });
    });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : (error.status || 502), { ok: false, error: error.message });
  }
}
