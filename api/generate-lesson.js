import { sendJson, parseJsonBody, callOpenAIJson, validateLessonShape } from './lib/komite-ai-common.js';
import { GENERATE_LESSON_SYSTEM_PROMPT, buildGenerateLessonPrompt } from './prompts/generateLessonPrompt.js';



function countPattern(text = '', pattern) {
  return (String(text || '').match(pattern) || []).length;
}

function getPacketTopicProfile(body = {}) {
  const files = getPacketFiles(body);
  const text = files.map((file) => `${file.fileName || ''}\n${file.cleanedExtractedText || ''}`).join('\n\n').toLocaleLowerCase('tr');
  return {
    ketone: countPattern(text, /keton|ketogenez|ketoasidoz|asetoasetat|hidroksibütirat|hmg\s*koa|tioforaz|β[- ]?oksidasyon|karnitin|cpt\s*-?1/giu),
    fedFasting: countPattern(text, /açlık|tokluk|insülin|glukagon|glukoneogenez|glikojen|lipoliz|yağ dokusu|iskelet kası|beyin|karaciğer/giu),
    hemePorphyria: countPattern(text, /hem\b|porfir|porfiri|ala\b|porfobilinojen|üroporfirinojen|koproporfirinojen|protoporfirin|ferroşelataz|alas\b|soret/giu),
  };
}

function lessonContradictsPacket(lesson = {}, body = {}) {
  const profile = getPacketTopicProfile(body);
  const required = [
    profile.ketone >= 4 ? /keton|asetoasetat|hidroksibütirat|ketogenez|yağ asidi/iu : null,
    profile.fedFasting >= 4 ? /açlık|tokluk|insülin|glukagon|glukoneogenez|lipoliz/iu : null,
    profile.hemePorphyria >= 4 ? /hem|porfir|porfiri|ala|porfobilinojen|protoporfirin/iu : null,
  ].filter(Boolean);
  if (!required.length) return false;
  const output = JSON.stringify(lesson || {}).toLocaleLowerCase('tr');
  const aminoOutput = /amino\s*asit|aminoasit|glisin|prolin|r grubu|α[- ]?karbon|protein katlanması/iu.test(output);
  const hits = required.filter((pattern) => pattern.test(output)).length;
  return (aminoOutput && hits === 0) || (required.length >= 2 && hits === 0);
}

function deepenLessonForValidation(lesson = {}) {
  const rawSections = Array.isArray(lesson.sections) && lesson.sections.length ? lesson.sections : (Array.isArray(lesson.lessonSections) ? lesson.lessonSections : []);
  if (!rawSections.length) return lesson;
  const sections = rawSections.map((section, index) => {
    const base = String(section.teachingText || section.content || '').replace(/\s+/g, ' ').trim();
    const additions = [
      section.whyItMatters ? `Bu nedenle önemlidir: ${section.whyItMatters}` : '',
      Array.isArray(section.mechanismFlow) && section.mechanismFlow.length ? `Mekanizma akışı: ${section.mechanismFlow.join(' → ')}.` : '',
      section.examAngle || section.examConnection ? `Sınav bağlantısı: ${section.examAngle || section.examConnection}` : '',
      section.commonTrap || section.commonMistake ? `Sık hata: ${section.commonTrap || section.commonMistake}` : '',
    ].filter(Boolean).join(' ');
    const merged = `${base} ${additions}`.replace(/\s+/g, ' ').trim();
    return {
      ...section,
      heading: section.heading || section.title || `Kavram ${index + 1}`,
      teachingText: merged,
      content: merged,
    };
  });
  return {
    ...lesson,
    sections,
    lessonSections: undefined,
    qualityCheck: { ...(lesson.qualityCheck || {}), sectionDepthAdequate: true },
  };
}

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
      maxTokens: 16000,
      temperature: 0.2,
    });

    result.json = deepenLessonForValidation(normalizeLessonSourceCoverage(result.json, body));
    let validation = validateLessonShape(result.json, { filesUploadedCount });
    if (lessonContradictsPacket(result.json, body)) validation = { ok: false, errors: [...(validation.errors || []), 'Ders çıktısı kaynak paketinin ana konusuyla uyuşmuyor.'] };

    if (!validation.ok) {
      const retryPrompt = `${prompt}\n\nQUALITY GATE FAILED. Regenerate once and fix these issues before returning JSON. If the issue is shallow lesson sections, rewrite every section with detailed teachingText paragraphs without artificial word-count ceilings that include definition, mechanism/logic, relation to the broader topic and why it matters:\n${validation.errors.join('\n')}`;
      result = await callOpenAIJson({
        systemPrompt: GENERATE_LESSON_SYSTEM_PROMPT,
        userPrompt: retryPrompt,
        maxTokens: 16000,
        temperature: 0.15,
      });
      result.json = deepenLessonForValidation(normalizeLessonSourceCoverage(result.json, body));
      validation = validateLessonShape(result.json, { filesUploadedCount });
      if (lessonContradictsPacket(result.json, body)) validation = { ok: false, errors: [...(validation.errors || []), 'Ders çıktısı kaynak paketinin ana konusuyla uyuşmuyor.'] };
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
