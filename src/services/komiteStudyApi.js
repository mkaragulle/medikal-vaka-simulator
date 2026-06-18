export const KOMITE_GENERATION_ERROR_MESSAGE = 'Sistem şu anda konu anlatımını oluşturamadı. Lütfen tekrar deneyin.';

function compactText(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim();
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
    title: compactText(rawManifest.title) || 'Komite konu anlatımı',
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

function normalizePdfLesson(rawLesson = {}) {
  const pdfUrl = compactText(rawLesson.pdfUrl || rawLesson.pdfDataUrl);
  if (!pdfUrl || !/^data:application\/pdf;base64,|^https?:\/\//iu.test(pdfUrl)) {
    throw new Error(KOMITE_GENERATION_ERROR_MESSAGE);
  }
  const manifest = normalizeManifest(rawLesson.manifest || {}, pdfUrl);
  return {
    id: compactText(rawLesson.id) || manifest.lessonId,
    type: 'pdfLesson',
    status: 'completed',
    title: compactText(rawLesson.title) || manifest.title,
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
    throw new Error('Bu yeni akış yalnızca PDF konu anlatımı üretir.');
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
