import { sendJson, parseJsonBody, callOpenAIJson, validateLessonShape, validateQuestionsShape, validateFlashcardsShape } from './lib/komite-ai-common.js';
import { VALIDATE_AI_OUTPUT_SYSTEM_PROMPT, buildValidateAIOutputPrompt } from './prompts/validateAIOutputPrompt.js';

function localValidate(outputType, output) {
  if (outputType === 'questions') return validateQuestionsShape(output);
  if (outputType === 'flashcards') return validateFlashcardsShape(output);
  if (outputType === 'lesson') return validateLessonShape(output);
  return { ok: true, errors: [] };
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }

  const outputType = body.outputType || '';
  const generatedOutputJson = body.generatedOutputJson || body.output || {};
  const local = localValidate(outputType, generatedOutputJson);
  if (!local.ok && String(process.env.AI_VALIDATION_ENABLED || 'true').toLowerCase() !== 'true') {
    return sendJson(response, 200, { ok: false, severity: 'reject', errors: local.errors, warnings: [], retryInstruction: 'Local structural validation failed.' });
  }

  if (String(process.env.AI_VALIDATION_ENABLED || 'true').toLowerCase() !== 'true') {
    return sendJson(response, 200, { ok: local.ok, severity: local.ok ? 'pass' : 'reject', errors: local.errors, warnings: [] });
  }

  try {
    const prompt = buildValidateAIOutputPrompt({
      outputType,
      studyContext: body.studyContext || {},
      materialAnalysisJson: body.materialAnalysisJson || {},
      generatedOutputJson,
    });
    const result = await callOpenAIJson({ systemPrompt: VALIDATE_AI_OUTPUT_SYSTEM_PROMPT, userPrompt: prompt, maxTokens: 1200, temperature: 0.1 });
    return sendJson(response, 200, { ok: Boolean(result.json.ok) && local.ok, provider: 'openai', model: result.model, validation: { ...result.json, localErrors: local.errors } });
  } catch (error) {
    return sendJson(response, 200, {
      ok: local.ok,
      severity: local.ok ? 'minor' : 'reject',
      errors: local.errors,
      warnings: [error.message],
      retryInstruction: local.ok ? '' : 'Previous output failed validation. Regenerate a medically precise Turkish output with complete scientific feedback, source grounding and one clearly best answer.',
    });
  }
}
