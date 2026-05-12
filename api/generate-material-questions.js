import { assertPost, callOpenAIJson, fallbackQuestions, readJsonBody, sendJson, validateQuestionPayload } from './material-ai-utils.js';

function buildPrompt(body) {
  return [
    'Generate exactly 10 Turkish medical education questions from the uploaded material.',
    'Return JSON: {"questions":[...]} only.',
    'Each question has stem, options A-E, correctOptionId, optionFeedback for all options, sourceReferences.',
    'Use same-category plausible distractors, one correct answer, and no answer leakage.',
    `Mode: ${body.studyMode || 'medical-school'}`,
    `Topic: ${body.course || body.tusBranch || body.title || body.fileName || 'Ders materyali'}`,
    `Extracted text: ${(body.extractedText || '').slice(0, 12000)}`,
  ].join('\n');
}

export default async function handler(req, res) {
  if (!assertPost(req, res)) return;
  try {
    const body = await readJsonBody(req);
    const fallback = { questions: fallbackQuestions(body) };
    const result = await callOpenAIJson(buildPrompt(body), fallback);
    const validation = validateQuestionPayload(result.data);
    sendJson(res, result.ok && validation.ok ? 200 : 422, {
      ok: result.ok && validation.ok,
      source: result.source,
      questions: result.data?.questions || fallback.questions,
      validation,
      error: result.error || null,
    });
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message });
  }
}
