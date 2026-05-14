import { sendJson, parseJsonBody, callOpenAIJson, validateFlashcardsShape, verifyCurrentSourceManifest } from './lib/komite-ai-common.js';
import { GENERATE_FLASHCARDS_SYSTEM_PROMPT, buildGenerateFlashcardsPrompt } from './prompts/generateFlashcardsPrompt.js';


function sourceTextFromMaterialPacket(packet = {}) {
  const files = Array.isArray(packet.files) ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim()) : [];
  return files.map((file, index) => {
    const text = String(file.cleanedExtractedText || file.text || '').trim();
    return `[[FILE ${index + 1}]]\nfileName: ${file.fileName || file.name || 'Materyal'}\nfileType: ${file.fileType || file.type || ''}\ncleanedExtractedText:\n${text}`;
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
    const prompt = buildGenerateFlashcardsPrompt({
      studyContext: body.studyContext || body.context || {},
      materialAnalysisJson: body.materialAnalysisJson || body.analysis || {},
      generatedLessonJson: body.generatedLessonJson || body.lesson || {},
      materialPacket: body.materialPacket || {},
      sourceTextChunks: currentSourceText,
      materialId: body.materialId || '',
      sourceManifest: body.sourceManifest || body.studyContext?.sourceManifest || {},
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
