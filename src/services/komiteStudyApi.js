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
    }))
    .filter((section) => section.title && section.blocks.length)
    .slice(0, 14);
}

function normalizeScrollableLesson(rawLesson = {}) {
  const document = rawLesson.document || rawLesson.lessonDocument || rawLesson;
  const title = cleanPdfTitle(document.title || rawLesson.title, 'Komite konu anlatımı');
  const subtitle = compactText(document.subtitle || rawLesson.subtitle) || 'Konu anlatımı, klinik mantık ve sınav odaklı tekrar';
  const sections = normalizeLessonSections(document.sections, title);
  if (!sections.length) throw new Error(KOMITE_GENERATION_ERROR_MESSAGE);
  const pdfUrl = compactText(rawLesson.pdfUrl || rawLesson.pdfDataUrl || document.pdfUrl || document.pdfDataUrl);
  const outline = sections.map((section) => ({ id: section.id, title: section.title }));
  return {
    id: compactText(rawLesson.id || document.id) || `komite-lesson-${Date.now().toString(36)}`,
    type: 'lessonDocument',
    status: 'completed',
    title,
    subtitle,
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
