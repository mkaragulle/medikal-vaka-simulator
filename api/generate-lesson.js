import { assertPost, buildLessonPrompt, callOpenAIJson, fallbackLesson, readJsonBody, sendJson } from './material-ai-utils.js';

export default async function handler(req, res) {
  if (!assertPost(req, res)) return;
  try {
    const body = await readJsonBody(req);
    const fallback = fallbackLesson(body);
    const result = await callOpenAIJson(buildLessonPrompt(body), fallback);
    sendJson(res, result.ok ? 200 : 502, { ok: result.ok, source: result.source, lesson: result.data, error: result.error || null });
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message });
  }
}
