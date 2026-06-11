import { sendJson, parseJsonBody, callOpenAIJson, verifyCurrentSourceManifest } from './lib/komite-ai-common.js';
import { ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT, buildAnalyzeUploadedMaterialPrompt } from './prompts/analyzeUploadedMaterialPrompt.js';
import { buildOutputCacheKey, compactMaterialSources, createSourceFingerprint, defaultModelForScope, getDurableCachedOutput, logAIUsage, resolveModelForScope, resolveSourceCharLimit, setDurableCachedOutput, withInFlightDedupe } from './lib/ai-token-optimizer.js';

const TASK_NAME = 'materialAnalysis';
const PROMPT_VERSION = 'komite-material-analysis-v3-cost-capped';

function currentKomiteModel() {
  return resolveModelForScope('KOMITE');
}

function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}


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

function compactTextWindow(text = '', maxChars = 12000) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxChars) return clean;
  const part = Math.floor(maxChars / 3);
  const start = clean.slice(0, part);
  const middleStart = Math.max(0, Math.floor(clean.length / 2) - Math.floor(part / 2));
  const middle = clean.slice(middleStart, middleStart + part);
  const end = clean.slice(Math.max(0, clean.length - part));
  return [start, middle, end].join('\n\n');
}

function sourceTextFromMaterialPacket(packet = {}, maxTotalChars = resolveSourceCharLimit('KOMITE_ANALYSIS_MAX_SOURCE_CHARS', 10000, 'KOMITE', TASK_NAME)) {
  const files = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  if (!files.length) return '';
  const perFile = Math.max(3000, Math.floor(maxTotalChars / files.length));
  return files.map((file) => {
    const text = String(file.cleanedExtractedText || file.text || '').trim();
    return compactTextWindow(text, perFile);
  }).join('\n\n').trim();
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }
  try {
    const sourceCheck = verifyCurrentSourceManifest(body);
    if (!sourceCheck.ok) return sendJson(response, 409, { ok: false, error: 'Current source session validation failed', validation: sourceCheck });
    const sourceFingerprint = createSourceFingerprint({ clientFingerprint: body.sourceFingerprint || sourceCheck.fingerprint || '', files: body.materialPacket?.files || [] });
    const currentSourceText = compactMaterialSources(body.materialPacket?.files || [], resolveSourceCharLimit('KOMITE_ANALYSIS_MAX_SOURCE_CHARS', 10000, 'KOMITE', TASK_NAME));
    if (!currentSourceText) return sendJson(response, 422, { ok: false, error: 'Current material packet has no readable text.' });
    const cacheKey = buildOutputCacheKey({ scope: 'KOMITE', task: TASK_NAME, promptVersion: PROMPT_VERSION, model: currentKomiteModel(), sourceFingerprint });
    return await withInFlightDedupe(cacheKey, async () => {
      const cachedOutput = await getDurableCachedOutput(cacheKey);
      if (cachedOutput) {
        logAIUsage({ task: TASK_NAME, model: cachedOutput.model || currentKomiteModel(), cached: true, apiStyle: cachedOutput.apiStyle || 'output_cache' });
        return sendJson(response, 200, { ok: true, cached: true, ...cachedOutput });
      }
      const prompt = buildAnalyzeUploadedMaterialPrompt({ extractedTextOrChunks: currentSourceText });
      const result = await callOpenAIJson({ systemPrompt: ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: envNumber('KOMITE_ANALYSIS_MAX_OUTPUT_TOKENS', 1800), jsonSchema: ANALYSIS_JSON_SCHEMA, scope: 'KOMITE', task: TASK_NAME, promptVersion: PROMPT_VERSION });
      const payload = { provider: 'openai', model: result.model, apiStyle: result.apiStyle, analysis: result.json };
      await setDurableCachedOutput(cacheKey, payload);
      return sendJson(response, 200, { ok: true, cached: false, ...payload });
    });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : (error.status || 502), { ok: false, error: error.message });
  }
}
