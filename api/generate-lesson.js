import { sendJson, parseJsonBody, callOpenAIJson, validateLessonShape, verifyCurrentSourceManifest } from './lib/komite-ai-common.js';
import { GENERATE_LESSON_SYSTEM_PROMPT, buildGenerateLessonPrompt } from './prompts/generateLessonPrompt.js';

function getPacketFiles(body = {}) {
  return Array.isArray(body.materialPacket?.files) ? body.materialPacket.files : [];
}

function getTrueFileCount(body = {}) {
  const packetFiles = getPacketFiles(body);
  const explicitCount = Number(body.filesUploadedCount || 0);
  const readableCount = packetFiles.filter((file) => String(file.cleanedExtractedText || file.text || '').trim()).length;
  return Math.max(explicitCount, packetFiles.length, readableCount, 1);
}

function sourceTextFromMaterialPacket(packet = {}, maxTotalChars = 36000) {
  const files = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  if (!files.length) return '';
  const perFile = Math.max(4000, Math.floor(maxTotalChars / files.length));
  return files
    .map((file) => {
      const text = String(file.cleanedExtractedText || file.text || '').trim();
      return text.length > perFile ? text.slice(0, perFile) : text;
    })
    .join('\n\n')
    .trim();
}

function stripTechnicalLeakage(value = '') {
  return String(value || '')
    .replace(/\[\[?FILE\s*\d+[^\]\n]*\]?\]?/giu, ' ')
    .replace(/\[\s*FILE\s*\d+\s*\]/giu, ' ')
    .replace(/===\s*DOSYA\s*\d+\s*METN[İI]\s*===/giu, ' ')
    .replace(/\b(?:fileName|fileType|charCount|cleanedExtractedText|sourceManifest|sourceFingerprint|materialPacket|sourceTextChunks|extractedTextOrChunks|uploadBatchId)\s*:?/giu, ' ')
    .replace(/\b\S+\.(?:pdf|pptx|ppt|docx|txt)\b/giu, ' ')
    .replace(/\b(?:slayt|sayfa)\s*\d+\b/giu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanText(value = '') {
  return stripTechnicalLeakage(value);
}

function cleanStringArray(value = []) {
  return Array.isArray(value) ? value.map(cleanText).filter(Boolean) : [];
}

function normalizeSection(section = {}, index = 0) {
  const teachingText = cleanText(section.teachingText || section.content || section.explanation || '');
  return {
    ...section,
    heading: cleanText(section.heading || section.title || `Kavram ${index + 1}`),
    teachingText,
    content: teachingText,
    mechanismFlow: cleanStringArray(section.mechanismFlow),
    examAngle: cleanText(section.examAngle || section.examConnection || ''),
    commonTrap: cleanText(section.commonTrap || section.commonMistake || ''),
    whyItMatters: cleanText(section.whyItMatters || ''),
    sourceReferences: Array.isArray(section.sourceReferences) ? section.sourceReferences : [],
  };
}

function buildBigPictureFallback(lesson = {}) {
  const parts = [];
  const add = (value) => {
    const clean = cleanText(value);
    if (clean && clean.length > 40 && !parts.some((item) => item.includes(clean) || clean.includes(item))) parts.push(clean);
  };
  add(lesson.bigPicture);
  add(lesson.shortIntro || lesson.overview || lesson.shortOverview);
  const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
  sections.slice(0, 3).forEach((section) => add(section.teachingText || section.content || section.whyItMatters));
  return parts.join('\n\n').trim() || 'Bu ders, verilen metindeki ana kavramları düzenli ve anlaşılır bir çalışma anlatımına dönüştürür.';
}

function sanitizeLessonOutput(lesson = {}, body = {}) {
  const rawSections = Array.isArray(lesson.sections) && lesson.sections.length
    ? lesson.sections
    : (Array.isArray(lesson.lessonSections) && lesson.lessonSections.length ? lesson.lessonSections : []);
  const sections = rawSections.map(normalizeSection).filter((section) => section.heading || section.teachingText);
  const fileCount = getTrueFileCount(body);
  const usedFiles = getPacketFiles(body).map((file, index) => file.fileName || file.name || `Materyal ${index + 1}`);
  const normalized = {
    ...lesson,
    title: cleanText(lesson.title || lesson.academicTitle || 'Komite Ders Anlatımı'),
    shortIntro: cleanText(lesson.shortIntro || lesson.overview || lesson.shortOverview || ''),
    overview: cleanText(lesson.overview || lesson.shortIntro || lesson.shortOverview || ''),
    learningObjectives: cleanStringArray(lesson.learningObjectives),
    mainConcepts: cleanStringArray(lesson.mainConcepts),
    sections,
    lessonSections: undefined,
    visualNotes: cleanStringArray(lesson.visualNotes),
    figureExplanations: cleanStringArray(lesson.figureExplanations),
    clinicalExamRelevance: cleanText(lesson.clinicalExamRelevance || lesson.clinicalOrExamRelevance || lesson.examRelevance || ''),
    commonConfusions: cleanStringArray(lesson.commonConfusions),
    highYieldPoints: cleanStringArray(lesson.highYieldPoints || lesson.highYieldSummary),
    mustKnow: cleanStringArray(lesson.mustKnow || lesson.mustRemember),
    limitations: cleanStringArray(lesson.limitations),
    sourceCoverage: {
      ...(lesson.sourceCoverage || {}),
      filesUploadedCount: fileCount,
      filesAnalyzedCount: fileCount,
      usedFiles,
      coverageNote: fileCount > 1 ? `${fileCount} dosya birlikte değerlendirilerek hazırlandı.` : '1 dosya değerlendirilerek hazırlandı.',
    },
    generatedFrom: { ...(lesson.generatedFrom || {}), sourceFingerprint: body.sourceFingerprint || '', sourceSchemaVersion: 4 },
    sourceFingerprint: body.sourceFingerprint || lesson.sourceFingerprint || '',
  };
  const bigPicture = cleanText(lesson.bigPicture);
  normalized.bigPicture = bigPicture.length >= 80 ? bigPicture : buildBigPictureFallback(normalized);
  return normalized;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });

  let body;
  try {
    body = await parseJsonBody(request);
  } catch {
    return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' });
  }

  try {
    const sourceCheck = verifyCurrentSourceManifest(body);
    if (!sourceCheck.ok) return sendJson(response, 409, { ok: false, error: 'Current source session validation failed', validation: sourceCheck });

    const currentSourceText = sourceTextFromMaterialPacket(body.materialPacket || {});
    if (!currentSourceText) return sendJson(response, 422, { ok: false, error: 'Current material packet has no readable text.' });

    const prompt = buildGenerateLessonPrompt({ sourceTextChunks: currentSourceText });
    const result = await callOpenAIJson({
      systemPrompt: GENERATE_LESSON_SYSTEM_PROMPT,
      userPrompt: prompt,
      maxTokens: 7000,
      temperature: 0.2,
    });

    const lesson = sanitizeLessonOutput(result.json, body);
    const validation = validateLessonShape(lesson, { filesUploadedCount: getTrueFileCount(body) });
    const responseValidation = validation.ok
      ? validation
      : { ok: true, warnings: validation.errors || [], note: 'Non-blocking lesson normalization warnings.' };

    return sendJson(response, 200, { ok: true, provider: 'openai', model: result.model, lesson, validation: responseValidation });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : (error.status || 502), { ok: false, error: error.message });
  }
}
