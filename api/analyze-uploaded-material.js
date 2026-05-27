import { sendJson, parseJsonBody, callOpenAIJson, verifyCurrentSourceManifest } from './lib/komite-ai-common.js';
import { sourceTextFromMaterialPacket, getSourceFingerprintFromBody, buildGenerationCacheKey, getCachedGeneration, setCachedGeneration, logAIUsage } from './lib/ai-token-optimizer.js';
import { ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT, buildAnalyzeUploadedMaterialPrompt } from './prompts/analyzeUploadedMaterialPrompt.js';

function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}


const PROMPT_VERSION = 'komite-analysis-v2-token-cache';

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

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }
  try {
    const sourceCheck = verifyCurrentSourceManifest(body);
    if (!sourceCheck.ok) return sendJson(response, 409, { ok: false, error: 'Current source session validation failed', validation: sourceCheck });
    const sourceFingerprint = getSourceFingerprintFromBody(body);
    const currentSourceText = sourceTextFromMaterialPacket(body.materialPacket || {}, envNumber('KOMITE_ANALYSIS_MAX_SOURCE_CHARS', 10000));
    if (!currentSourceText) return sendJson(response, 422, { ok: false, error: 'Current material packet has no readable text.' });
    const cacheKey = buildGenerationCacheKey({ scope: 'KOMITE', task: 'analysis', promptVersion: PROMPT_VERSION, model: process.env.KOMITE_OPENAI_MODEL || process.env.OPENAI_MODEL || '', sourceFingerprint, extra: currentSourceText.slice(0, 4000) });
    const cached = getCachedGeneration(cacheKey);
    if (cached) {
      logAIUsage({ scope: 'KOMITE', task: 'analysis', model: cached.model || '', apiStyle: cached.apiStyle || 'cache', sourceFingerprint, cacheHit: true });
      return sendJson(response, 200, { ...cached, cached: true });
    }
    const prompt = buildAnalyzeUploadedMaterialPrompt({ extractedTextOrChunks: currentSourceText });
    const result = await callOpenAIJson({ systemPrompt: ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: envNumber('KOMITE_ANALYSIS_MAX_OUTPUT_TOKENS', 1800), jsonSchema: ANALYSIS_JSON_SCHEMA, scope: 'KOMITE', task: 'analysis', promptVersion: PROMPT_VERSION, sourceFingerprint });
    const payload = { ok: true, provider: 'openai', model: result.model, apiStyle: result.apiStyle, analysis: result.json, usage: result.usage || null };
    setCachedGeneration(cacheKey, payload);
    return sendJson(response, 200, payload);
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : (error.status || 502), { ok: false, error: error.message });
  }
}
