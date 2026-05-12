import { sendJson, parseJsonBody, callOpenAIJson, validateFlashcardsShape } from './lib/komite-ai-common.js';
import { GENERATE_FLASHCARDS_SYSTEM_PROMPT, buildGenerateFlashcardsPrompt } from './prompts/generateFlashcardsPrompt.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }
  try {
    const prompt = buildGenerateFlashcardsPrompt({
      studyContext: body.studyContext || body.context || {},
      materialAnalysisJson: body.materialAnalysisJson || body.analysis || {},
      generatedLessonJson: body.generatedLessonJson || body.lesson || {},
      materialId: body.materialId || '',
    });
    let result = await callOpenAIJson({ systemPrompt: GENERATE_FLASHCARDS_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: 4200, temperature: 0.25 });
    let validation = validateFlashcardsShape(result.json);
    if (!validation.ok) {
      const retryPrompt = `${prompt}

QUALITY GATE FAILED. Regenerate once and fix these issues before returning JSON:
${validation.errors.join('\n')}`;
      result = await callOpenAIJson({ systemPrompt: GENERATE_FLASHCARDS_SYSTEM_PROMPT, userPrompt: retryPrompt, maxTokens: 4200, temperature: 0.15 });
      validation = validateFlashcardsShape(result.json);
    }
    if (!validation.ok) return sendJson(response, 422, { ok: false, error: 'Flashcard validation failed', message: 'AI çıktısı kalite kontrolünden geçmedi. Lütfen materyali veya komut kapsamını daraltarak tekrar deneyin.', validation });
    return sendJson(response, 200, { ok: true, provider: 'openai', model: result.model, deck: result.json.deck || result.json, validation });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : 502, { ok: false, error: error.message });
  }
}
