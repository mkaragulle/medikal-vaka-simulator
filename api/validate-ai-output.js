import { assertPost, readJsonBody, sendJson, validateQuestionPayload } from './material-ai-utils.js';

export default async function handler(req, res) {
  if (!assertPost(req, res)) return;
  try {
    const body = await readJsonBody(req);
    const validation = validateQuestionPayload(body);
    sendJson(res, validation.ok ? 200 : 422, { ok: validation.ok, validation });
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message });
  }
}
