export const KOMITE_GENERATION_ERROR_MESSAGE = 'Sistem şu anda konu anlatımını oluşturamadı. Lütfen tekrar deneyin.';

function compactText(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function cleanPdfTitle(value = '', fallback = 'Komite konu anlatımı') {
  const cleaned = compactText(value)
    .replace(/^#{1,6}\s*/u, '')
    .replace(/>\s*\[![^\]]+\]\s*/gu, '')
    .replace(/\s*\|\s*/gu, ' / ')
    .trim();
  if (!cleaned) return fallback;
  if (cleaned.length <= 60) return cleaned;
  const cut = cleaned.slice(0, 61);
  const boundary = cut.lastIndexOf(' ');
  return (boundary > 18 ? cut.slice(0, boundary) : cleaned.slice(0, 60)).replace(/[.,;:!?-]+$/u, '').trim();
}

const SECTION_TITLE_FALLBACKS = [
  'Temel kavramlar ve klinik çerçeve',
  'Mekanizma ve patofizyolojik süreçler',
  'Klinik bulgular ve tanısal yaklaşım',
  'Ayırıcı tanı ve belirleyici özellikler',
  'Tedavi stratejisi, izlem ve komplikasyonlar',
];

function cleanLessonSectionTitle(section = {}, index = 0, lessonTitle = '') {
  const raw = compactText(section.title)
    .replace(/^#{1,6}\s*/u, '')
    .replace(/[.!?;:]+$/u, '')
    .trim();
  const generic = !raw || /^(?:bölüm|section|part)\s*\d+$/iu.test(raw);
  if (!generic) return raw.length > 72 ? `${raw.slice(0, 69).trim()}...` : raw;

  const blockTitle = (Array.isArray(section.blocks) ? section.blocks : [])
    .map((block) => compactText(block?.title))
    .find((title) => title && !/^(?:mekanizma özeti|tablo|liste|not)$/iu.test(title));
  if (blockTitle) return blockTitle.length > 72 ? `${blockTitle.slice(0, 69).trim()}...` : blockTitle;

  if (index === 0 && lessonTitle) return `${lessonTitle}: Temel kavramlar ve klinik çerçeve`;
  return SECTION_TITLE_FALLBACKS[index] || `${lessonTitle || 'Konu'}: Klinik çalışma odağı`;
}

function normalizeManifest(rawManifest = {}, pdfUrl = '') {
  const outline = Array.isArray(rawManifest.outline)
    ? rawManifest.outline
      .map((item, index) => ({
        id: compactText(item.id) || `bolum-${index + 1}`,
        title: compactText(item.title),
        level: Number(item.level) || 1,
        pageNumber: Math.max(1, Number(item.pageNumber) || 1),
      }))
      .filter((item) => item.title)
      .slice(0, 24)
    : [];
  const highYieldAnchors = Array.isArray(rawManifest.highYieldAnchors)
    ? rawManifest.highYieldAnchors
      .map((item, index) => ({
        id: compactText(item.id) || `odak-${index + 1}`,
        title: compactText(item.title),
        pageNumber: Math.max(1, Number(item.pageNumber) || 1),
      }))
      .filter((item) => item.title)
      .slice(0, 8)
    : [];

  return {
    lessonId: compactText(rawManifest.lessonId) || `komite-pdf-${Date.now().toString(36)}`,
    title: cleanPdfTitle(rawManifest.title),
    subtitle: compactText(rawManifest.subtitle) || 'Konu anlatımı, klinik mantık ve sınav odaklı tekrar',
    language: rawManifest.language || 'tr',
    level: rawManifest.level || 'Tıp fakültesi komite düzeyi',
    estimatedStudyTime: compactText(rawManifest.estimatedStudyTime),
    pdfUrl: compactText(rawManifest.pdfUrl || pdfUrl),
    createdAt: rawManifest.createdAt || new Date().toISOString(),
    sourceFiles: Array.isArray(rawManifest.sourceFiles) ? rawManifest.sourceFiles : [],
    outline,
    highYieldAnchors,
    qualityNote: compactText(rawManifest.qualityNote),
  };
}

function normalizeLessonSections(rawSections = [], lessonTitle = '') {
  return (Array.isArray(rawSections) ? rawSections : [])
    .map((section, index) => ({
      id: compactText(section.id) || `section-${index + 1}`,
      title: cleanLessonSectionTitle(section, index, lessonTitle),
      mainIdea: compactText(section.mainIdea || section.main_idea),
      blocks: Array.isArray(section.blocks) ? section.blocks : [],
      topicGroupId: compactText(section.topicGroupId),
      topicGroupTitle: compactText(section.topicGroupTitle),
    }))
    .filter((section) => section.title && section.blocks.length)
    .slice(0, 14);
}

function normalizeLessonItems(value = null, keys = ['items', 'content']) {
  if (Array.isArray(value)) return value.map(compactText).filter(Boolean);
  if (value && typeof value === 'object') {
    for (const key of keys) {
      if (Array.isArray(value[key])) return value[key].map(compactText).filter(Boolean);
    }
  }
  return [];
}

function normalizeLessonConfusions(value = null) {
  const items = Array.isArray(value) ? value : Array.isArray(value?.items) ? value.items : [];
  return items
    .map((item) => ({
      confusingPoint: compactText(item?.confusingPoint || item?.wrongIdea || item?.title),
      correctDistinction: compactText(item?.correctDistinction || item?.correct || item?.distinction),
      memoryMessage: compactText(item?.memoryMessage || item?.memoryHook || item?.message),
    }))
    .filter((item) => item.confusingPoint || item.correctDistinction || item.memoryMessage)
    .slice(0, 10);
}

function normalizeTopicGroups(rawGroups = [], lessonTitle = '') {
  return (Array.isArray(rawGroups) ? rawGroups : [])
    .map((group, index) => {
      const firstSectionTitle = cleanLessonSectionTitle(group?.sections?.[0] || {}, 0, lessonTitle);
      const title = cleanPdfTitle(group?.title, firstSectionTitle || lessonTitle || 'Komite konu paketi');
      const id = compactText(group?.id) || `topic-group-${index + 1}`;
      const sections = normalizeLessonSections(group?.sections, title).map((section) => ({
        ...section,
        id: section.id.startsWith(`${id}-`) ? section.id : `${id}-${section.id}`,
        topicGroupId: id,
        topicGroupTitle: title,
      }));
      if (!sections.length) return null;
      return {
        id,
        title,
        mainIdea: compactText(group?.mainIdea || group?.main_idea),
        studyDirection: compactText(group?.studyDirection || group?.study_direction),
        coverageWeight: ['high', 'medium', 'low'].includes(group?.coverageWeight) ? group.coverageWeight : 'medium',
        sections,
        examFocus: normalizeLessonItems(group?.examFocus),
        doNotConfuse: normalizeLessonConfusions(group?.doNotConfuse || group?.dontConfuse),
        finalReview: normalizeLessonItems(group?.finalReview),
      };
    })
    .filter(Boolean)
    .slice(0, 8);
}

function normalizeScrollableLesson(rawLesson = {}) {
  const document = rawLesson.document || rawLesson.lessonDocument || rawLesson;
  const title = cleanPdfTitle(document.title || rawLesson.title, 'Komite konu anlatımı');
  const subtitle = compactText(document.subtitle || rawLesson.subtitle) || 'Konu anlatımı, klinik mantık ve sınav odaklı tekrar';
  const documentSections = normalizeLessonSections(document.sections, title);
  const topicGroups = normalizeTopicGroups(document.topicGroups || rawLesson.topicGroups, title);
  const groupedSectionIds = new Set(topicGroups.flatMap((group) => group.sections.map((section) => section.id)));
  const sections = topicGroups.length
    ? topicGroups.flatMap((group) => group.sections).concat(documentSections.filter((section) => !groupedSectionIds.has(section.id) && !section.topicGroupId))
    : documentSections;
  if (!sections.length) throw new Error(KOMITE_GENERATION_ERROR_MESSAGE);
  const pdfUrl = compactText(rawLesson.pdfUrl || rawLesson.pdfDataUrl || document.pdfUrl || document.pdfDataUrl);
  const lessonMode = topicGroups.length > 1 || document.lessonMode === 'multi_topic_bundle' ? 'multi_topic_bundle' : 'single_topic';
  const topicSectionIds = new Set(topicGroups.flatMap((group) => group.sections.map((section) => section.id)));
  const outline = lessonMode === 'multi_topic_bundle'
    ? topicGroups.flatMap((group) => [
      { id: group.id, title: group.title, level: 1, topicGroupId: group.id },
      ...group.sections.map((section) => ({ id: section.id, title: section.title, level: 2, topicGroupId: group.id })),
    ]).concat(sections.filter((section) => !topicSectionIds.has(section.id)).map((section) => ({ id: section.id, title: section.title, level: 1 })))
    : sections.map((section) => ({ id: section.id, title: section.title, level: 1 }));
  return {
    id: compactText(rawLesson.id || document.id) || `komite-lesson-${Date.now().toString(36)}`,
    type: 'lessonDocument',
    status: 'completed',
    title,
    subtitle,
    lessonMode,
    sourceAnalysis: document.sourceAnalysis || rawLesson.sourceAnalysis || null,
    topicGroups,
    language: document.language || 'tr',
    level: compactText(document.level || rawLesson.level) || 'Tıp fakültesi komite düzeyi',
    estimatedStudyTime: compactText(document.estimatedStudyTime || rawLesson.estimatedStudyTime),
    sourceQualityNote: compactText(document.sourceQualityNote || document.qualityNote || rawLesson.qualityNote),
    sections,
    roadmap: outline,
    outline,
    examFocus: document.examFocus || rawLesson.examFocus || null,
    doNotConfuse: document.doNotConfuse || rawLesson.doNotConfuse || null,
    finalReview: document.finalReview || rawLesson.finalReview || null,
    globalExamFocus: normalizeLessonItems(document.globalExamFocus || rawLesson.globalExamFocus),
    globalDoNotConfuse: normalizeLessonConfusions(document.globalDoNotConfuse || rawLesson.globalDoNotConfuse),
    globalFinalReview: normalizeLessonItems(document.globalFinalReview || rawLesson.globalFinalReview),
    highYieldPoints: Array.isArray(rawLesson.highYieldPoints) ? rawLesson.highYieldPoints : [],
    commonConfusions: Array.isArray(rawLesson.commonConfusions) ? rawLesson.commonConfusions : [],
    pdfUrl,
    pdfDataUrl: pdfUrl.startsWith('data:') ? pdfUrl : '',
    createdAt: rawLesson.createdAt || document.createdAt || new Date().toISOString(),
    sourceFiles: Array.isArray(rawLesson.sourceFiles || document.sourceFiles) ? (rawLesson.sourceFiles || document.sourceFiles) : [],
  };
}

function normalizePdfLesson(rawLesson = {}) {
  if (rawLesson?.type === 'lessonDocument' || rawLesson?.document || rawLesson?.sections) {
    return normalizeScrollableLesson(rawLesson);
  }
  const pdfUrl = compactText(rawLesson.pdfUrl || rawLesson.pdfDataUrl);
  if (!pdfUrl || !/^data:application\/pdf;base64,|^https?:\/\//iu.test(pdfUrl)) {
    throw new Error(KOMITE_GENERATION_ERROR_MESSAGE);
  }
  const manifest = normalizeManifest(rawLesson.manifest || {}, pdfUrl);
  return {
    id: compactText(rawLesson.id) || manifest.lessonId,
    type: 'pdfLesson',
    status: 'completed',
    title: cleanPdfTitle(rawLesson.title, manifest.title),
    subtitle: compactText(rawLesson.subtitle) || manifest.subtitle,
    pdfUrl,
    pdfDataUrl: pdfUrl.startsWith('data:') ? pdfUrl : '',
    manifest: { ...manifest, pdfUrl },
    createdAt: rawLesson.createdAt || manifest.createdAt,
    sourceFiles: Array.isArray(rawLesson.sourceFiles) ? rawLesson.sourceFiles : manifest.sourceFiles,
  };
}

export async function generateKomiteStudyContent({ kind = 'lesson', payload, signal } = {}) {
  if (kind !== 'lesson') {
    throw new Error('Bu yeni akış yalnızca Ders Anlatımı üretir.');
  }

  const response = await fetch('/api/generate-komite-study', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind: 'lesson', payload }),
    signal,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(compactText(data.error) || KOMITE_GENERATION_ERROR_MESSAGE);
    error.code = data.code || response.status;
    throw error;
  }
  return { lesson: normalizePdfLesson(data.lesson || data) };
}
