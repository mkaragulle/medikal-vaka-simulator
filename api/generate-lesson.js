import { sendJson, parseJsonBody, callOpenAIJson, validateLessonShape } from './lib/komite-ai-common.js';
import { GENERATE_LESSON_SYSTEM_PROMPT, buildGenerateLessonPrompt } from './prompts/generateLessonPrompt.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }
  try {
    const prompt = buildGenerateLessonPrompt({
      studyContext: body.studyContext || body.context || {},
      materialAnalysisJson: body.materialAnalysisJson || body.analysis || {},
      sourceTextChunks: body.sourceTextChunks || body.extractedText || '',
    });
    const result = await callOpenAIJson({ systemPrompt: GENERATE_LESSON_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: 3600, temperature: 0.2 });
    const validation = validateLessonShape(result.json);
    if (!validation.ok) return sendJson(response, 422, { ok: false, error: 'Lesson validation failed', validation });
    return sendJson(response, 200, { ok: true, provider: 'openai', model: result.model, lesson: result.json, validation });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : 502, { ok: false, error: error.message });
  }
}
