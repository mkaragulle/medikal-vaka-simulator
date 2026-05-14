import { sendJson, parseJsonBody, callOpenAIJson, validateQuestionsShape, verifyCurrentSourceManifest } from './lib/komite-ai-common.js';
import { GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT, buildGenerateMaterialQuestionsPrompt } from './prompts/generateMaterialQuestionsPrompt.js';


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

function sourceTextFromMaterialPacket(packet = {}, maxTotalChars = 24000) {
  const files = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  if (!files.length) return '';
  const perFile = Math.max(4000, Math.floor(maxTotalChars / files.length));
  return files.map((file) => {
    const text = String(file.cleanedExtractedText || file.text || '').trim();
    return text.length > perFile ? text.slice(0, perFile) : text;
  }).join('\n\n').trim();
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }
  try {
    const sourceCheck = verifyCurrentSourceManifest(body);
    if (!sourceCheck.ok) return sendJson(response, 409, { ok: false, error: 'Current source session validation failed', validation: sourceCheck });
    const currentSourceText = sourceTextFromMaterialPacket(body.materialPacket || {});
    if (!currentSourceText) return sendJson(response, 422, { ok: false, error: 'Current material packet has no readable text.' });
    const prompt = buildGenerateMaterialQuestionsPrompt({ sourceTextChunks: currentSourceText });
    const result = await callOpenAIJson({ systemPrompt: GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: 5200, temperature: 0.2, jsonSchema: QUESTION_JSON_SCHEMA });
    const questions = Array.isArray(result.json.questions) ? result.json.questions : [];
    const validation = validateQuestionsShape({ questions });
    const responseValidation = validation.ok ? validation : { ok: true, warnings: validation.errors || [], note: 'Non-blocking question normalization warnings.' };
    return sendJson(response, 200, { ok: true, provider: 'openai', model: result.model, questions, validation: responseValidation });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : (error.status || 502), { ok: false, error: error.message });
  }
}
