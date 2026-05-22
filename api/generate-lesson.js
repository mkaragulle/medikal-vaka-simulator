import { sendJson, parseJsonBody, callOpenAIText, validateLessonShape, verifyCurrentSourceManifest } from './lib/komite-ai-common.js';
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

function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

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

function sourceTextFromMaterialPacket(packet = {}, maxTotalChars = envNumber('KOMITE_MAX_SOURCE_CHARS', 16000)) {
  const files = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  if (!files.length) return '';
  const perFile = Math.max(4000, Math.floor(maxTotalChars / files.length));
  return files
    .map((file) => {
      const text = String(file.cleanedExtractedText || file.text || '').trim();
      return compactTextWindow(text, perFile);
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


function stripMarkdownMarks(value = '') {
  return cleanText(String(value || '')
    .replace(/^#{1,6}\s*/u, '')
    .replace(/^[-*+]\s+/u, '')
    .replace(/^\d+[.)]\s+/u, '')
    .replace(/\*\*/gu, '')
    .trim());
}

function splitPlainLessonIntoBlocks(rawText = '') {
  const text = String(rawText || '')
    .replace(/```[\s\S]*?```/gu, (block) => block.replace(/```(?:markdown|md|text)?/giu, '').replace(/```/gu, ''))
    .replace(/\r/g, '')
    .trim();
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const blocks = [];
  let current = null;
  const pushCurrent = () => {
    if (current && (current.heading || current.text.length)) blocks.push(current);
    current = null;
  };
  // Only explicit Markdown headings and structural labels are treated as sections.
  // Numbered/list-style lines remain inside the current section, preventing tiny one-line cards.
  const isHeading = (line) => /^#{1,4}\s+/.test(line) || /^(öğrenme hedefleri|büyük resim|can alıcı noktalar|mutlaka hatırla)\b/i.test(line);
  for (const line of lines) {
    if (isHeading(line)) {
      pushCurrent();
      current = { heading: stripMarkdownMarks(line), text: [] };
    } else {
      if (!current) current = { heading: '', text: [] };
      current.text.push(line);
    }
  }
  pushCurrent();
  return blocks;
}

function listItemsFromBlockText(value = '') {
  return String(value || '')
    .split(/\n|(?:^|\s)[•-]\s+/u)
    .map((item) => stripMarkdownMarks(item))
    .filter((item) => item.length > 8)
    .slice(0, 12);
}

function firstSentences(value = '', limit = 2) {
  const clean = cleanText(value);
  const sentences = clean.split(/(?<=[.!?])\s+/u).filter(Boolean);
  return (sentences.length ? sentences.slice(0, limit).join(' ') : clean).trim();
}

function normalizeComparableText(value = '') {
  return cleanText(value).toLocaleLowerCase('tr').replace(/[^a-z0-9çğıöşü\s]/giu, ' ').replace(/\s+/g, ' ').trim();
}

function uniqueStringList(items = [], limit = 12) {
  const seen = new Set();
  const output = [];
  items.forEach((item) => {
    const clean = cleanText(item);
    if (!clean) return;
    const key = normalizeComparableText(clean);
    if (!key || seen.has(key)) return;
    seen.add(key);
    output.push(clean);
  });
  return output.slice(0, limit);
}

function normalizeLessonTitle(value = '') {
  const clean = cleanText(value)
    .replace(/\b\S+\.(?:pdf|pptx|ppt|docx|txt)\b/giu, ' ')
    .replace(/\s*\(\s*\d+\s*\)\s*$/u, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clean || 'Komite Ders Anlatımı';
}

function normalizeSectionText(value = '') {
  const pieces = String(value || '')
    .split(/\n+/u)
    .map((item) => cleanText(item))
    .filter(Boolean);
  return uniqueStringList(pieces, 40).join('\n');
}

function shouldMergeIntoPrevious(section = {}, previous = null) {
  if (!previous) return false;
  const heading = cleanText(section.heading);
  const body = cleanText(section.teachingText);
  if (!heading) return false;
  const same = normalizeComparableText(heading) === normalizeComparableText(body);
  if (same) return true;
  if (body.length < 90 && heading.length >= 18) return true;
  if (/^[•\-*]\s*/u.test(heading)) return true;
  return false;
}

function mergeCompactSections(sections = []) {
  const output = [];
  sections.forEach((section) => {
    const normalized = {
      ...section,
      heading: cleanText(section.heading),
      teachingText: normalizeSectionText(section.teachingText || section.content),
      content: normalizeSectionText(section.teachingText || section.content),
    };
    const previous = output[output.length - 1];
    if (shouldMergeIntoPrevious(normalized, previous)) {
      const line = normalized.teachingText && normalizeComparableText(normalized.teachingText) !== normalizeComparableText(normalized.heading)
        ? `${normalized.heading}: ${normalized.teachingText}`
        : normalized.heading;
      previous.teachingText = normalizeSectionText(`${previous.teachingText}\n- ${line}`);
      previous.content = previous.teachingText;
      return;
    }
    output.push(normalized);
  });
  return output.slice(0, 9);
}

function buildLessonFromPlainText(rawText = '', body = {}, sourceText = '') {
  const blocks = splitPlainLessonIntoBlocks(rawText);
  const sourcePreview = firstSentences(sourceText, 3);
  let title = '';
  let shortIntro = '';
  let bigPicture = '';
  let learningObjectives = [];
  let highYieldPoints = [];
  let mustKnow = [];
  const sections = [];

  for (const block of blocks) {
    const heading = stripMarkdownMarks(block.heading);
    const text = normalizeSectionText(block.text.join('\n'));
    if (!heading && !shortIntro && text) { shortIntro = firstSentences(text, 2); continue; }
    if (!title && heading && !/öğrenme hedefleri|büyük resim|can alıcı noktalar|mutlaka hatırla/i.test(heading)) {
      title = normalizeLessonTitle(heading);
      if (text && !shortIntro) shortIntro = firstSentences(text, 2);
      continue;
    }
    if (/öğrenme hedefleri/i.test(heading)) {
      learningObjectives = uniqueStringList(listItemsFromBlockText(block.text.join('\n')), 10);
      if (!learningObjectives.length && text) learningObjectives = [firstSentences(text, 1)];
      continue;
    }
    if (/büyük resim/i.test(heading)) { bigPicture = text; continue; }
    if (/can alıcı noktalar/i.test(heading)) { highYieldPoints = uniqueStringList(listItemsFromBlockText(block.text.join('\n')), 10); continue; }
    if (/mutlaka hatırla/i.test(heading)) { mustKnow = uniqueStringList(listItemsFromBlockText(block.text.join('\n')), 8); continue; }
    if (heading || text) {
      sections.push({
        heading: heading || `Ana bölüm ${sections.length + 1}`,
        teachingText: text || heading,
        mechanismFlow: [],
        examAngle: '',
        commonTrap: '',
        whyItMatters: '',
        sourceReferences: [],
      });
    }
  }

  const cleanedSections = mergeCompactSections(sections);
  if (!title) title = 'Komite Ders Anlatımı';
  title = normalizeLessonTitle(title);
  if (!shortIntro) shortIntro = firstSentences(rawText, 2) || sourcePreview || 'Bu ders anlatımı, yüklenen kaynak metinden hazırlanmıştır.';
  if (!bigPicture) {
    const firstUseful = cleanedSections.map((section) => section.teachingText).find((text) => text && text.length > 80);
    bigPicture = firstSentences(firstUseful || rawText || sourcePreview, 4);
  }
  if (!learningObjectives.length) {
    learningObjectives = ['Kaynak metindeki ana kavramları mantıklı bir sırayla açıklayabilmek.', 'Temel ilişkileri ve ayırt edici noktaları çalışma sırasında kullanabilmek.'];
  }
  if (!cleanedSections.length) {
    cleanedSections.push({ heading: 'Kaynak metnin ana anlatımı', teachingText: cleanText(rawText) || sourcePreview, mechanismFlow: [], examAngle: '', commonTrap: '', whyItMatters: '', sourceReferences: [] });
  }
  if (!highYieldPoints.length) highYieldPoints = uniqueStringList(cleanedSections.slice(0, 5).map((section) => firstSentences(section.teachingText, 1)), 8);
  if (!mustKnow.length) mustKnow = highYieldPoints.slice(0, 6);

  return sanitizeLessonOutput({
    title,
    shortIntro,
    overview: shortIntro,
    learningObjectives: uniqueStringList(learningObjectives, 10),
    bigPicture,
    mainConcepts: cleanedSections.slice(0, 7).map((section) => section.heading).filter(Boolean),
    sections: cleanedSections,
    visualNotes: [],
    figureExplanations: [],
    clinicalExamRelevance: '',
    commonConfusions: [],
    highYieldPoints,
    mustKnow,
    limitations: [],
  }, body);
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
    const result = await callOpenAIText({
      systemPrompt: GENERATE_LESSON_SYSTEM_PROMPT,
      userPrompt: prompt,
      maxTokens: envNumber('KOMITE_LESSON_MAX_OUTPUT_TOKENS', 4800),
      scope: 'KOMITE',
    });

    const lesson = buildLessonFromPlainText(result.text, body, currentSourceText);
    const validation = validateLessonShape(lesson, { filesUploadedCount: getTrueFileCount(body) });
    const responseValidation = validation.ok
      ? validation
      : { ok: true, warnings: validation.errors || [], note: 'Non-blocking lesson normalization warnings.' };

    return sendJson(response, 200, { ok: true, provider: 'openai', model: result.model, lesson, validation: responseValidation });
  } catch (error) {
    return sendJson(response, error.code === 'missing_api_key' ? 501 : (error.status || 502), { ok: false, error: error.message });
  }
}
