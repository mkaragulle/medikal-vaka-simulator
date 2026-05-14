import { sendJson, parseJsonBody, callOpenAIJson, verifyCurrentSourceManifest } from './lib/komite-ai-common.js';
import { ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT, buildAnalyzeUploadedMaterialPrompt } from './prompts/analyzeUploadedMaterialPrompt.js';


const ANALYSIS_JSON_SCHEMA = {
  name: 'komite_material_analysis_response',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['materialTitle', 'detectedCourseOrTopic', 'sourceQuality', 'lectureStructure', 'keyConcepts', 'mechanisms', 'clinicalRelevance', 'examRelevance', 'figureTableNotes', 'commonConfusions', 'recommendedLessonPlan', 'questionGenerationTargets', 'flashcardGenerationTargets', 'sourceReferences'],
    properties: {
      materialTitle: { type: 'string' },
      detectedCourseOrTopic: { type: 'string' },
      sourceQuality: {
        type: 'object',
        additionalProperties: false,
        required: ['readableText', 'figuresDetected', 'tablesDetected', 'limitations'],
        properties: {
          readableText: { type: 'boolean' },
          figuresDetected: { type: 'boolean' },
          tablesDetected: { type: 'boolean' },
          limitations: { type: 'array', items: { type: 'string' } },
        },
      },
      lectureStructure: { type: 'array', items: { type: 'string' } },
      keyConcepts: { type: 'array', items: { type: 'string' } },
      mechanisms: { type: 'array', items: { type: 'string' } },
      clinicalRelevance: { type: 'array', items: { type: 'string' } },
      examRelevance: { type: 'array', items: { type: 'string' } },
      figureTableNotes: { type: 'array', items: { type: 'string' } },
      commonConfusions: { type: 'array', items: { type: 'string' } },
      recommendedLessonPlan: { type: 'array', items: { type: 'string' } },
      questionGenerationTargets: { type: 'array', items: { type: 'string' } },
      flashcardGenerationTargets: { type: 'array', items: { type: 'string' } },
      sourceReferences: { type: 'array', items: { type: 'string' } },
    },
  },
};

function sourceTextFromMaterialPacket(packet = {}, maxTotalChars = 24000) {
  const files = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  if (!files.length) return '';
  const perFile = Math.max(3000, Math.floor(maxTotalChars / files.length));
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
    const prompt = buildAnalyzeUploadedMaterialPrompt({ extractedTextOrChunks: currentSourceText });
    const result = await callOpenAIJson({ systemPrompt: ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: 2200, temperature: 0.1, jsonSchema: ANALYSIS_JSON_SCHEMA });
    return sendJson(response, 200, { ok: true, provider: 'openai', model: result.model, analysis: result.json });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : (error.status || 502), { ok: false, error: error.message });
  }
}
