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
      materialPacket: body.materialPacket || {},
      filesUploadedCount: body.filesUploadedCount || body.materialPacket?.files?.length || 0,
    });
    let result = await callOpenAIJson({ systemPrompt: GENERATE_LESSON_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: 3600, temperature: 0.2 });
    let validation = validateLessonShape(result.json, { filesUploadedCount: body.filesUploadedCount || body.materialPacket?.files?.length || 0 });
    if (!validation.ok) {
      const retryPrompt = `${prompt}

QUALITY GATE FAILED. Regenerate once and fix these issues before returning JSON:
${validation.errors.join('\n')}`;
      result = await callOpenAIJson({ systemPrompt: GENERATE_LESSON_SYSTEM_PROMPT, userPrompt: retryPrompt, maxTokens: 3600, temperature: 0.15 });
      validation = validateLessonShape(result.json, { filesUploadedCount: body.filesUploadedCount || body.materialPacket?.files?.length || 0 });
    }
    if (!validation.ok) return sendJson(response, 422, { ok: false, error: 'Lesson validation failed', message: 'AI çıktısı kalite kontrolünden geçmedi. Lütfen materyali veya komut kapsamını daraltarak tekrar deneyin.', validation });
    return sendJson(response, 200, { ok: true, provider: 'openai', model: result.model, lesson: result.json, validation });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : 502, { ok: false, error: error.message });
  }
}
