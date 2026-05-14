import { sendJson, parseJsonBody, callOpenAIJson, validateQuestionsShape, verifyCurrentSourceManifest } from './lib/komite-ai-common.js';
import { GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT, buildGenerateMaterialQuestionsPrompt } from './prompts/generateMaterialQuestionsPrompt.js';

function sourceTextFromMaterialPacket(packet = {}, maxTotalChars = 32000) {
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
    const result = await callOpenAIJson({ systemPrompt: GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: 3600, temperature: 0.25 });
    const questions = Array.isArray(result.json.questions) ? result.json.questions : [];
    const validation = validateQuestionsShape({ questions });
    const responseValidation = validation.ok ? validation : { ok: true, warnings: validation.errors || [], note: 'Non-blocking question normalization warnings.' };
    return sendJson(response, 200, { ok: true, provider: 'openai', model: result.model, questions, validation: responseValidation });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : (error.status || 502), { ok: false, error: error.message });
  }
}
