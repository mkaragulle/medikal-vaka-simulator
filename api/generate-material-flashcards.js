import { assertPost, callOpenAIJson, fallbackFlashcards, readJsonBody, sendJson } from './material-ai-utils.js';

function buildPrompt(body) {
  return [
    'Generate Turkish active-recall flashcards from uploaded medical material.',
    'Return JSON: {"flashcards":[{"front":"","back":"","explanation":"","sourceReference":""}]} only.',
    'Cards must teach active recall, not keyword lists.',
    `Mode: ${body.studyMode || 'medical-school'}`,
    `Topic: ${body.course || body.tusBranch || body.title || body.fileName || 'Ders materyali'}`,
    `Extracted text: ${(body.extractedText || '').slice(0, 12000)}`,
  ].join('\n');
}

export default async function handler(req, res) {
  if (!assertPost(req, res)) return;
  try {
    const body = await readJsonBody(req);
    const fallback = { flashcards: fallbackFlashcards(body) };
    const result = await callOpenAIJson(buildPrompt(body), fallback);
    sendJson(res, result.ok ? 200 : 502, { ok: result.ok, source: result.source, flashcards: result.data?.flashcards || fallback.flashcards, error: result.error || null });
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message });
  }
}
