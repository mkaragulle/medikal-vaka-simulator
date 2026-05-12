import { assertPost, readJsonBody, sendJson } from './material-ai-utils.js';

export default async function handler(req, res) {
  if (!assertPost(req, res)) return;
  try {
    const body = await readJsonBody(req);
    const fileName = body.fileName || 'uploaded-material.pdf';
    sendJson(res, 200, {
      ok: true,
      materialAnalysis: {
        fileName,
        processingStatus: 'Ready',
        extractedText: body.extractedText || '',
        extractedFigures: [],
        limitations: body.extractedText ? [] : ['Bu prototip API gerçek PDF/PPTX parse işlemi yapmaz; frontend meta veri ve ileride eklenecek extractor çıktısını gönderir.'],
        studyMode: body.studyMode || 'medical-school',
      },
    });
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message });
  }
}
