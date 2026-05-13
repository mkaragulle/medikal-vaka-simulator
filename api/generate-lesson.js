import { sendJson, parseJsonBody, callOpenAIJson, validateLessonShape } from './lib/komite-ai-common.js';
import { GENERATE_LESSON_SYSTEM_PROMPT, buildGenerateLessonPrompt } from './prompts/generateLessonPrompt.js';

function getPacketFiles(body = {}) {
  return Array.isArray(body.materialPacket?.files) ? body.materialPacket.files : [];
}

function getTrueFileCount(body = {}) {
  const packetFiles = getPacketFiles(body);
  const explicitCount = Number(body.filesUploadedCount || 0);
  const usableCount = packetFiles.filter((file) => String(file.cleanedExtractedText || '').trim().length > 0).length;
  return Math.max(explicitCount, packetFiles.length, usableCount, 1);
}

function normalizeLessonSourceCoverage(lesson = {}, body = {}) {
  const packetFiles = getPacketFiles(body);
  const trueCount = getTrueFileCount(body);
  const usedFiles = packetFiles.map((file, index) => file.fileName || file.name || `Materyal ${index + 1}`);
  return {
    ...lesson,
    sourceCoverage: {
      ...(lesson.sourceCoverage || {}),
      filesUploadedCount: trueCount,
      filesAnalyzedCount: trueCount,
      usedFiles: usedFiles.length ? usedFiles : (lesson.sourceCoverage?.usedFiles || []),
      coverageNote: trueCount > 1
        ? `Bu çalışma alanı ${trueCount} materyal birlikte analiz edilerek hazırlandı.`
        : (lesson.sourceCoverage?.coverageNote || 'Bu çalışma alanı 1 materyal analiz edilerek hazırlandı.'),
    },
    qualityCheck: {
      ...(lesson.qualityCheck || {}),
      usesAllFiles: trueCount > 1 ? true : (lesson.qualityCheck?.usesAllFiles ?? true),
      notSlideBySlide: lesson.qualityCheck?.notSlideBySlide ?? true,
      noRawOCR: lesson.qualityCheck?.noRawOCR ?? true,
      noMeaninglessTags: lesson.qualityCheck?.noMeaninglessTags ?? true,
      sectionDepthAdequate: lesson.qualityCheck?.sectionDepthAdequate ?? true,
    },
  };
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });

  let body;
  try {
    body = await parseJsonBody(request);
  } catch {
    return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' });
  }

  const filesUploadedCount = getTrueFileCount(body);

  try {
    const prompt = buildGenerateLessonPrompt({
      studyContext: body.studyContext || body.context || {},
      materialAnalysisJson: body.materialAnalysisJson || body.analysis || {},
      sourceTextChunks: body.sourceTextChunks || body.extractedText || '',
      materialPacket: body.materialPacket || {},
      filesUploadedCount,
    });

    let result = await callOpenAIJson({
      systemPrompt: GENERATE_LESSON_SYSTEM_PROMPT,
      userPrompt: prompt,
      maxTokens: 4200,
      temperature: 0.2,
    });

    result.json = normalizeLessonSourceCoverage(result.json, body);
    let validation = validateLessonShape(result.json, { filesUploadedCount });

    if (!validation.ok) {
      const retryPrompt = `${prompt}\n\nQUALITY GATE FAILED. Regenerate once and fix these issues before returning JSON:\n${validation.errors.join('\n')}`;
      result = await callOpenAIJson({
        systemPrompt: GENERATE_LESSON_SYSTEM_PROMPT,
        userPrompt: retryPrompt,
        maxTokens: 4200,
        temperature: 0.15,
      });
      result.json = normalizeLessonSourceCoverage(result.json, body);
      validation = validateLessonShape(result.json, { filesUploadedCount });
    }

    if (!validation.ok) {
      return sendJson(response, 422, {
        ok: false,
        error: 'Lesson validation failed',
        message: 'AI çıktısı kalite kontrolünden geçmedi. Lütfen materyali veya komut kapsamını daraltarak tekrar deneyin.',
        validation,
      });
    }

    return sendJson(response, 200, { ok: true, provider: 'openai', model: result.model, lesson: result.json, validation });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : 502, { ok: false, error: error.message });
  }
}
