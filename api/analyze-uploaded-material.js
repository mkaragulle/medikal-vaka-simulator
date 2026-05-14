import { sendJson, parseJsonBody, callOpenAIJson, verifyCurrentSourceManifest } from './lib/komite-ai-common.js';
import { ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT, buildAnalyzeUploadedMaterialPrompt } from './prompts/analyzeUploadedMaterialPrompt.js';


function sourceTextFromMaterialPacket(packet = {}) {
  const files = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  return files
    .map((file) => String(file.cleanedExtractedText || file.text || '').trim())
    .join('\n\n')
    .trim();
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
    const prompt = buildAnalyzeUploadedMaterialPrompt({
      metadata: body.metadata || body,
      extractedTextOrChunks: currentSourceText,
      detectedStructureOrFigures: body.detectedStructureOrFigures || body.figures || '',
      materialPacket: body.materialPacket || {},
      sourceManifest: body.sourceManifest || {},
    });
    const result = await callOpenAIJson({ systemPrompt: ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: 2800, temperature: 0.15 });
    return sendJson(response, 200, { ok: true, provider: 'openai', model: result.model, analysis: result.json });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : 502, { ok: false, error: error.message });
  }
}
