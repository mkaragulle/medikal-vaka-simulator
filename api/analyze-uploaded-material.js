import { sendJson, parseJsonBody, callOpenAIJson } from './lib/komite-ai-common.js';
import { ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT, buildAnalyzeUploadedMaterialPrompt } from './prompts/analyzeUploadedMaterialPrompt.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }
  try {
    const prompt = buildAnalyzeUploadedMaterialPrompt({
      metadata: body.metadata || body,
      extractedTextOrChunks: body.extractedTextOrChunks || body.extractedText || body.text || '',
      detectedStructureOrFigures: body.detectedStructureOrFigures || body.figures || '',
      materialPacket: body.materialPacket || {},
    });
    const result = await callOpenAIJson({ systemPrompt: ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: 2800, temperature: 0.15 });
    return sendJson(response, 200, { ok: true, provider: 'openai', model: result.model, analysis: result.json });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : 502, { ok: false, error: error.message });
  }
}
