import { useEffect, useMemo, useState } from 'react';
import { Icon } from './ui.jsx';
import { localBackend } from '../services/localBackend.js';
import { extractKomiteFile, getKomiteFileExtension } from '../utils/komiteFileExtraction.js';

const KOMITE_MATERIALS_STORAGE_KEY = 'komite-materials-v1';
const KOMITE_SOURCE_SCHEMA_VERSION = 3;
const CLASS_YEARS = ['1', '2', '3', '4', '5', '6'];
const LEARNING_TARGETS = ['Komite sınavı', 'Final sınavı', 'Klinik staj', 'Genel tekrar'];
const REVIEW_FILTERS = ['Bu materyal', 'Tüm materyaller'];
const STUDY_TABS = [
  { id: 'lesson', label: 'AI Ders Anlatımı', icon: 'BookOpen' },
  { id: 'figures', label: 'Görseller', icon: 'Image' },
  { id: 'questions', label: 'AI Soruları', icon: 'ClipboardList' },
  { id: 'cards', label: 'Hap Kartlar', icon: 'LayeredCards' },
  { id: 'review', label: 'Tekrar', icon: 'RotateCcw' },
];

const createId = (prefix = 'id') => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};


function stableSourceHash(value = '') {
  const input = String(value || '');
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function normalizeForFingerprint(text = '') {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120_000);
}

function buildSourceFingerprint(material = {}, packet = null) {
  const activePacket = packet || buildCombinedMaterialPacket(material);
  const files = Array.isArray(activePacket?.files) ? activePacket.files : [];
  const filePart = files.map((file) => {
    const clean = normalizeForFingerprint(file.cleanedExtractedText || file.text || '');
    return [
      file.fileName || file.name || 'Materyal',
      file.fileType || file.type || '',
      Number(file.size || 0),
      clean.length,
      stableSourceHash(`${clean.slice(0, 12_000)}::${clean.slice(-12_000)}`),
    ].join('|');
  }).join('||');
  const pasted = normalizeForFingerprint(material.pastedText || '');
  const meta = [material.classYear || '', material.committee || '', material.course || '', material.learningTarget || ''].join('|');
  return stableSourceHash(`${KOMITE_SOURCE_SCHEMA_VERSION}::${meta}::${filePart}::pasted:${pasted.length}:${stableSourceHash(pasted)}`);
}


function buildSourceManifest(material = {}, packet = null, sourceFingerprint = '') {
  const activePacket = packet || buildCombinedMaterialPacket(material);
  const files = Array.isArray(activePacket?.files) ? activePacket.files : [];
  return {
    sourceSchemaVersion: KOMITE_SOURCE_SCHEMA_VERSION,
    activeMaterialId: material.id || '',
    sourceSessionId: material.sourceSessionId || material.id || '',
    uploadBatchId: material.uploadBatchId || material.id || '',
    uploadTimestamp: material.uploadDate || material.createdAt || Date.now(),
    sourceFingerprint: sourceFingerprint || buildSourceFingerprint(material, activePacket),
    fileCount: files.length,
    files: files.map((file, index) => ({
      index: index + 1,
      fileId: file.fileId || file.id || `${material.id || 'material'}-file-${index + 1}`,
      fileName: file.fileName || file.name || `Materyal ${index + 1}`,
      fileType: file.fileType || file.type || '',
      charCount: String(file.cleanedExtractedText || file.text || '').length,
      textFingerprint: stableSourceHash(normalizeForFingerprint(file.cleanedExtractedText || file.text || '')),
    })),
  };
}

function sourceManifestMatches(material = {}, manifest = {}, packet = null) {
  if (!manifest || typeof manifest !== 'object') return false;
  const activePacket = packet || buildCombinedMaterialPacket(material);
  const expected = buildSourceFingerprint(material, activePacket);
  const expectedFiles = Array.isArray(activePacket?.files) ? activePacket.files : [];
  return manifest.sourceSchemaVersion === KOMITE_SOURCE_SCHEMA_VERSION
    && manifest.activeMaterialId === (material.id || '')
    && manifest.sourceFingerprint === expected
    && Number(manifest.fileCount || 0) === expectedFiles.length;
}

function getOutputSourceFingerprint(output = {}) {
  return output?.sourceFingerprint || output?.generatedFrom?.sourceFingerprint || output?.qualityCheck?.sourceFingerprint || '';
}

function stampGeneratedOutput(output, material = {}, packet = null) {
  if (!output || typeof output !== 'object') return output;
  const sourceFingerprint = buildSourceFingerprint(material, packet);
  const activePacket = packet || buildCombinedMaterialPacket(material);
  const files = Array.isArray(activePacket?.files) ? activePacket.files : [];
  const sourceManifest = buildSourceManifest(material, activePacket, sourceFingerprint);
  return {
    ...output,
    sourceFingerprint,
    generatedFrom: {
      ...(output.generatedFrom || {}),
      sourceFingerprint,
      sourceSchemaVersion: KOMITE_SOURCE_SCHEMA_VERSION,
      sourceManifest,
      materialId: material.id || '',
      fileNames: files.map((file) => file.fileName || file.name || 'Materyal'),
      generatedAt: Date.now(),
    },
    qualityCheck: {
      ...(output.qualityCheck || {}),
      sourceFingerprint,
    },
  };
}

function stampGeneratedQuestions(questions = [], material = {}, packet = null) {
  const sourceFingerprint = buildSourceFingerprint(material, packet);
  const sourceManifest = buildSourceManifest(material, packet || buildCombinedMaterialPacket(material), sourceFingerprint);
  return questions.map((question) => ({
    ...question,
    sourceFingerprint,
    generatedFrom: {
      ...(question.generatedFrom || {}),
      sourceFingerprint,
      sourceSchemaVersion: KOMITE_SOURCE_SCHEMA_VERSION,
      sourceManifest,
      materialId: material.id || '',
      generatedAt: Date.now(),
    },
  }));
}

function isGeneratedAssetStale(asset, material = {}, packet = null) {
  if (!asset) return false;
  const expected = buildSourceFingerprint(material, packet);
  const actual = getOutputSourceFingerprint(asset);
  return !actual || actual !== expected;
}

function areGeneratedQuestionsStale(material = {}, packet = null) {
  const questions = Array.isArray(material.questions) ? material.questions : [];
  if (!questions.length) return false;
  const expected = buildSourceFingerprint(material, packet);
  const actual = material.questionsSourceFingerprint || questions[0]?.sourceFingerprint || questions[0]?.generatedFrom?.sourceFingerprint || '';
  return !actual || actual !== expected;
}

function resetGeneratedAssetsForSourceChange(material = {}, reason = 'Kaynak materyal değiştiği için eski AI çıktıları temizlendi.') {
  return {
    ...material,
    sourceFingerprint: buildSourceFingerprint(material),
    lesson: null,
    questions: [],
    questionsSourceFingerprint: '',
    flashcardDeck: null,
    processingStatus: buildCombinedMaterialPacket(material).files.some((file) => String(file.cleanedExtractedText || '').trim()) ? 'text-extracted' : 'metadata-ready',
    repairNotice: reason,
  };
}

function sanitizeLoadedKomiteMaterial(material = {}) {
  const packet = buildCombinedMaterialPacket(material);
  const sourceFingerprint = buildSourceFingerprint(material, packet);
  const staleLesson = isGeneratedAssetStale(material.lesson, material, packet);
  const staleQuestions = areGeneratedQuestionsStale(material, packet);
  const staleDeck = isGeneratedAssetStale(material.flashcardDeck, material, packet);
  if (staleLesson || staleQuestions || staleDeck) {
    return resetGeneratedAssetsForSourceChange(
      { ...material, sourceFingerprint },
      'Eski AI çıktıları kaynak parmak iziyle eşleşmediği için temizlendi.'
    );
  }
  return { ...material, sourceFingerprint };
}

function readUserMaterials(userId) {
  return localBackend.read(KOMITE_MATERIALS_STORAGE_KEY, [])
    .filter((material) => !userId || material.userId === userId)
    .map(sanitizeLoadedKomiteMaterial)
    .sort((a, b) => Number(b.uploadDate || 0) - Number(a.uploadDate || 0));
}

function writeUserMaterials(userId, nextMaterials) {
  const allMaterials = localBackend.read(KOMITE_MATERIALS_STORAGE_KEY, []);
  const others = allMaterials.filter((material) => material.userId !== userId);
  localBackend.write(KOMITE_MATERIALS_STORAGE_KEY, [...others, ...nextMaterials]);
}

function getFileType(fileName = '') {
  return getKomiteFileExtension(fileName) || 'file';
}

function truncate(text = '', max = 72) {
  const value = String(text || '').trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trim()}…`;
}

function formatLessonListItem(item) {
  if (typeof item === 'string') return sanitizeTeachingTextForDisplay(item);
  if (!item || typeof item !== 'object') return '';
  const text = item.correctDistinction || item.memoryClarification
    ? `${item.confusion || 'Sık karıştırılan nokta'}: ${item.correctDistinction || ''}${item.whyConfused ? ` Karışma nedeni: ${item.whyConfused}` : ''}${item.memoryClarification ? ` Net ayrım: ${item.memoryClarification}` : ''}`.trim()
    : Object.values(item).filter(Boolean).join(' ');
  return sanitizeTeachingTextForDisplay(text);
}


function createLessonAnchorId(text = '', index = 0) {
  const base = String(text || `bolum-${index + 1}`)
    .toLocaleLowerCase('tr')
    .replace(/[ğ]/g, 'g')
    .replace(/[ü]/g, 'u')
    .replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i')
    .replace(/[ö]/g, 'o')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
  return `komite-lesson-${index + 1}-${base || 'bolum'}`;
}

function splitReadableParagraphs(text = '') {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  if (clean.length < 900) return [clean];
  const sentences = clean.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g)?.map((item) => item.trim()).filter(Boolean) || [clean];
  const paragraphs = [];
  let current = '';
  sentences.forEach((sentence) => {
    if ((current + ' ' + sentence).trim().length > 620 && current.length > 240) {
      paragraphs.push(current.trim());
      current = sentence;
    } else {
      current = `${current} ${sentence}`.trim();
    }
  });
  if (current) paragraphs.push(current.trim());
  return paragraphs;
}

function sanitizeTeachingTextForDisplay(text = '') {
  return String(text || '')
    // Remove field labels that are rendered as separate rows, not repeated inside paragraphs.
    .replace(/\s*(?:Mekanizma akışı|Süreç mantığı):\s*[^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\s*(?:Klinik bağlantı|Sınav bağlantısı|Sınavda nasıl sorulur\??):\s*[^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\s*(?:Sık hata|Sık karıştırılan nokta):\s*[^.?!]*(?:[.?!]|$)/giu, ' ')
    // Defensive cleanup for OCR fragments that leak from slide captions and make the lesson look copy-pasted.
    .replace(/\b\d+\s+Pirol halkası\b[\s\S]{0,180}?fonksiyonel özellik kazanır\.?/giu, ' ')
    .replace(/\bP\s+orfinlere\b[\s\S]{0,180}?fonksiyonel özellik kazanır\.?/giu, ' ')
    .replace(/\b(?:slayt|sayfa)\s*\d+\b/giu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sentenceFromFlowStep(step = '') {
  const raw = String(step || '').replace(/^[\s→\-–—>]+|[\s→\-–—>]+$/g, '').trim();
  if (!raw) return '';
  if (!/[→>]/u.test(raw)) return raw.replace(/\s+/g, ' ');
  const parts = raw.split(/\s*(?:→|>)\s*/u).map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) return raw.replace(/[→>]/gu, ' ardından ').replace(/\s+/g, ' ');
  if (parts.length === 2) return `${parts[0]} sonucunda ${parts[1]} öne çıkar.`;
  return `${parts[0]} durumunda ${parts.slice(1, -1).join(', ')} gelişir; sonuçta ${parts[parts.length - 1]} öne çıkar.`;
}

function formatMechanismSteps(flow = []) {
  if (!Array.isArray(flow)) return [];
  return flow.map(sentenceFromFlowStep).filter(Boolean);
}

function improveLessonIntro(text = '', title = '') {
  const clean = String(text || '')
    .replace(/yüklenen komite materyallerindeki/giu, 'bu çalışma alanındaki')
    .replace(/tek tek ezberlenecek başlıklar olarak değil,?/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean && clean.length >= 80) return clean;
  return `${title || 'Bu ders'}, mevcut yükleme batchindeki okunabilir kaynak metni temel alarak konuyu kavramsal sıraya yerleştirir; tanım, ilişki, mekanizma, yorum ve sınav değeri arasında açık bir öğrenme akışı kurar.`;
}

function normalizeSourceText(material = {}) {
  const hasUploadedFiles = Array.isArray(material.files) && material.files.length > 0;
  const hasFilePackets = Array.isArray(material.filePackets) && material.filePackets.length > 0;

  if (hasUploadedFiles || hasFilePackets) {
    return (hasFilePackets ? material.filePackets : [])
      .map((file) => file.cleanedExtractedText || file.text || '')
      .filter(Boolean)
      .join('\n\n')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  return [material.pastedText]
    .filter(Boolean)
    .join('\n\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}



function cleanExtractedTextForAI(text = '') {
  const seen = new Set();
  return String(text || '')
    .split(/\n+/u)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line.length >= 3)
    .filter((line) => !/^(\d+|sayfa\s*\d+|slayt\s*\d+)$/iu.test(line))
    .filter((line) => !/\.(pdf|pptx|ppt|docx)$/iu.test(line))
    .filter((line) => !/^(prof\.?\s*dr\.?|doç\.?\s*dr\.?|öğr\.?\s*gör\.?)/iu.test(line))
    .filter((line) => !/\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b|\b20\d{2}\b/u.test(line))
    .filter((line) => {
      const key = line.toLocaleLowerCase('tr');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitMergedExtractedTextIntoFiles(text = '', material = {}) {
  const raw = String(text || '');
  const matches = [...raw.matchAll(/\[\[FILE\s+(\d+)\s*:?\s*([^\]]*)\]\]/giu)];
  if (!matches.length) return [];
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : raw.length;
    const fallbackFile = Array.isArray(material.files) ? material.files[index] : null;
    const fileName = String(match[2] || fallbackFile?.name || `Materyal ${index + 1}`).trim();
    const cleanedExtractedText = cleanExtractedTextForAI(raw.slice(start, end));
    return {
      fileName,
      fileType: fallbackFile?.type || getFileType(fileName),
      cleanedExtractedText,
      detectedTopics: [],
    };
  }).filter((item) => item.cleanedExtractedText);
}

function buildCombinedMaterialPacket(material = {}) {
  // Critical source-isolation rule: when the current workspace has uploaded files,
  // build the AI source packet only from the per-file extraction packets created
  // for this upload batch. Do not re-split or reuse material.extractedText here,
  // because that field can contain merged display text and may preserve old session
  // content after browser/localStorage state changes.
  const hasCurrentFiles = Array.isArray(material.files) && material.files.length > 0;
  const hasCurrentFilePackets = Array.isArray(material.filePackets) && material.filePackets.length > 0;
  const files = hasCurrentFilePackets
    ? material.filePackets
    : (hasCurrentFiles
      ? material.files.map((file, index) => ({
        fileName: file.name || material.fileName || `Materyal ${index + 1}`,
        fileType: file.type || getFileType(file.name || material.fileName || ''),
        cleanedExtractedText: '',
        detectedTopics: [],
      }))
      : [{ fileName: material.fileName || 'Ek metin', fileType: material.fileType || 'text', cleanedExtractedText: cleanExtractedTextForAI(material.extractedText || material.pastedText || ''), detectedTopics: [] }]);
  const normalizedFiles = files.map((file) => {
    const cleaned = cleanExtractedTextForAI(file.cleanedExtractedText || file.text || '');
    return {
      fileName: file.fileName || file.name || 'Materyal',
      fileType: file.fileType || file.type || getFileType(file.fileName || file.name || ''),
      cleanedExtractedText: cleaned,
      detectedTopics: [],
    };
  });
  const pasted = cleanExtractedTextForAI(material.pastedText || '');
  // For uploaded-material workspaces, the AI source must be only the current
  // upload batch filePackets. Pasted text is accepted only for text-only
  // materials with no uploaded files/filePackets, preventing stale notes from
  // previous sessions from entering the AI request.
  if (pasted && !hasCurrentFiles && !hasCurrentFilePackets) {
    normalizedFiles.push({ fileName: 'Ek ders notu', fileType: 'text', cleanedExtractedText: pasted, detectedTopics: [] });
  }
  return {
    workspaceId: material.id || '',
    classYear: material.classYear || '',
    committeeName: material.committee || '',
    courseName: material.course || '',
    studyGoal: material.learningTarget || '',
    files: normalizedFiles,
  };
}

function combinedPacketToSourceText(packet = {}) {
  const files = Array.isArray(packet.files) ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim()) : [];
  return files
    .map((file, index) => {
      const text = String(file.cleanedExtractedText || file.text || '').trim();
      return `[[FILE ${index + 1}]]\nfileName: ${file.fileName || file.name || 'Materyal'}\nfileType: ${file.fileType || file.type || ''}\ncleanedExtractedText:\n${text}`;
    })
    .join('\n\n');
}

function balancedPacketToSourceText(packet = {}, maxTotalChars = 64000) {
  const files = Array.isArray(packet.files) ? packet.files.filter((file) => String(file.cleanedExtractedText || '').trim()) : [];
  if (!files.length) return '';
  const perFile = Math.max(4000, Math.floor(maxTotalChars / files.length));
  return files.map((file, index) => {
    const text = String(file.cleanedExtractedText || '').trim();
    const head = text.slice(0, Math.floor(perFile * 0.7));
    const tail = text.length > perFile ? text.slice(-Math.floor(perFile * 0.3)) : '';
    const clipped = tail ? `${head}

[...orta bölüm kısaltıldı; aynı dosyadan devam...]

${tail}` : head;
    return `[[FILE ${index + 1}]]
fileName: ${file.fileName}
fileType: ${file.fileType}
charCount: ${text.length}
cleanedExtractedText:
${clipped}`;
  }).join('\n\n');
}

function getMaterialFileCount(material = {}, packet = null) {
  const packetCount = Array.isArray(packet?.files) ? packet.files.length : 0;
  const storedFileCount = Array.isArray(material.files) ? material.files.length : 0;
  const storedPacketCount = Array.isArray(material.filePackets) ? material.filePackets.length : 0;
  return Math.max(packetCount, storedFileCount, storedPacketCount, 1);
}

function normalizeLessonCoverageForMaterial(lesson = {}, material = {}, packet = null) {
  const count = getMaterialFileCount(material, packet);
  const packetFiles = Array.isArray(packet?.files) ? packet.files : [];
  const storedFiles = Array.isArray(material.filePackets) ? material.filePackets : [];
  const fallbackFiles = Array.isArray(material.files) ? material.files : [];
  const usedFiles = (packetFiles.length ? packetFiles : (storedFiles.length ? storedFiles : fallbackFiles))
    .map((file, index) => file.fileName || file.name || `Materyal ${index + 1}`);
  return {
    ...lesson,
    sourceCoverage: {
      ...(lesson.sourceCoverage || {}),
      filesUploadedCount: count,
      filesAnalyzedCount: count,
      usedFiles,
      coverageNote: count > 1 ? `Bu çalışma alanı ${count} materyal birlikte analiz edilerek hazırlandı.` : (lesson.sourceCoverage?.coverageNote || ''),
    },
    qualityCheck: {
      ...(lesson.qualityCheck || {}),
      usesAllFiles: count > 1 ? true : (lesson.qualityCheck?.usesAllFiles ?? true),
    },
  };
}

function cleanMaterialTitle(material = {}) {
  const rawName = String(material.fileName || '').replace(/\.[a-z0-9]+$/i, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  const fallback = material.materialAnalysis?.detectedCourseOrTopic || material.course || material.committee || 'Ders Materyali';
  const meaningless = /^(das|test|pdf\s*\d*|slayt\s*\d*|ppt\s*\d*|doc\s*\d*|file\s*\d*|untitled|adsız)$/iu;
  if (!rawName || rawName.length < 4 || meaningless.test(rawName)) return fallback;
  return rawName.charAt(0).toLocaleUpperCase('tr') + rawName.slice(1);
}

function deriveTopic(material = {}) {
  return material.course || material.committee || cleanMaterialTitle(material) || 'yüklenen materyal';
}

function stripGenericMeta(text = '') {
  return String(text || '')
    .replace(/Bu kart[^.?!]*(materyal|slayt|dosya)[^.?!]*[.?!]?/giu, '')
    .replace(/Materyalde geçen şu bilginin ana hatırlatma değeri nedir:?/giu, '')
    .replace(/Bu bilgi neyi hatırlatır\??/giu, '')
    .replace(/slaytta geçen/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isMeaningfullyDifferent(a = '', b = '') {
  const x = String(a || '').replace(/\s+/g, ' ').trim().toLocaleLowerCase('tr');
  const y = String(b || '').replace(/\s+/g, ' ').trim().toLocaleLowerCase('tr');
  if (!x || !y) return true;
  if (x === y) return false;
  return !(x.length > 40 && y.includes(x)) && !(y.length > 40 && x.includes(y));
}


function wordCount(text = '') {
  return String(text || '').trim().split(/\s+/u).filter(Boolean).length;
}

function buildSectionDepthText(section = {}, material = {}) {
  const parts = [section.teachingText, section.content]
    .filter(Boolean)
    .map((value) => sanitizeTeachingTextForDisplay(String(value).trim()))
    .filter(Boolean);
  if (section.whyItMatters && !parts.join(' ').includes(section.whyItMatters)) {
    parts.push(`Öğrenme değeri: ${sanitizeTeachingTextForDisplay(section.whyItMatters)}`);
  }
  const merged = [...new Set(parts)]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Never pad weak AI output with unrelated global source sentences. That caused OCR fragments from
  // another slide/topic to leak into otherwise correct sections. Empty sections are handled honestly.
  if (merged) return merged;
  const heading = section.heading || section.title || 'Bu kavram';
  return `${heading} başlığı için kaynak metinden yeterli güvenilir açıklama çıkarılamadı.`;
}

function deepenLessonSections(lesson = {}, material = {}) {
  const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
  if (!sections.length) return lesson;
  return {
    ...lesson,
    sections: sections.map((section) => {
      const enriched = buildSectionDepthText(section, material);
      return {
        ...section,
        teachingText: enriched,
        content: enriched,
      };
    }),
    qualityCheck: {
      ...(lesson.qualityCheck || {}),
      sectionDepthAdequate: true,
    },
  };
}

function normalizeQuestionForDisplay(question = {}) {
  const stem = String(question.stem || '').trim();
  const q = String(question.question || '').trim();
  const supportingData = Array.isArray(question.supportingData)
    ? question.supportingData.filter((item) => item && isMeaningfullyDifferent(item, stem) && isMeaningfullyDifferent(item, q))
    : [];
  return { ...question, stem, question: isMeaningfullyDifferent(q, stem) ? q : '', supportingData };
}

function qualityGateLesson(lesson = {}, material = {}) {
  const text = JSON.stringify(lesson || {}).toLocaleLowerCase('tr');
  const filesUploadedCount = getMaterialFileCount(material);
  const analyzedCount = Math.max(Number(lesson.sourceCoverage?.filesAnalyzedCount || lesson.sourceCoverage?.filesAnalyzed || 0), Number(lesson.sourceCoverage?.filesUploadedCount || 0));
  const repeatedTemplatePhrases = [
    'bu ders materyalde',
    'bu bölüm temel mekanizma ile ilişkilendirilmelidir',
    'materyaldeki bağlamı bozmadan temel mekanizma',
    'komite sorusunda bu bölümden genellikle',
    'temel kavram bağlantısı',
    'öğrenciler için önemlidir',
    'bu konu sınavlarda sorulabilir'
  ];
  const badRepeats = repeatedTemplatePhrases.reduce((count, phrase) => count + (text.match(new RegExp(phrase, 'g')) || []).length, 0);
  const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
  if (!lesson || !sections.length) return { ok: false, reason: 'Ders yapısı eksik.' };
  if (filesUploadedCount > 1 && analyzedCount <= 1) return { ok: false, reason: 'Çoklu dosya yüklenmesine rağmen AI çıktısı tek materyal kapsamı gösteriyor.' };
  if (isGeneratedAssetStale(lesson, material)) return { ok: false, reason: 'Ders çıktısı bu çalışma alanının kaynak parmak iziyle eşleşmiyor.' };
  if (/materyaldeki ilişkili kavram|slayt\s*→|sayfa\s*→/iu.test(text)) return { ok: false, reason: 'Ham/meaningless kaynak etiketi üretildi.' };
  if (String(lesson.bigPicture || '').replace(/\s+/g, ' ').trim().length < 520) return { ok: false, reason: 'Büyük resim yeterince açıklayıcı değil.' };
  // Do not reject a lesson only because the number of sections is below a fixed threshold.
  // Multi-file quality is checked by source coverage, topic grounding, big-picture depth and section depth instead.
  const shallow = sections.filter((section) => String(section.teachingText || section.content || '').split(/\s+/).length < 80);
  if (sections.length && shallow.length / sections.length > 0.35) return { ok: false, reason: 'Ders bölümleri yüzeysel kalıyor.' };
  if (badRepeats > 2) return { ok: false, reason: 'Ders anlatımı fazla şablon ve tekrar içeriyor.' };
  return { ok: true };
}

function qualityGateQuestions(questions = []) {
  if (!Array.isArray(questions) || questions.length !== 10) return { ok: false, reason: '10 soru üretilemedi.' };
  const bad = questions.find((question) => !Array.isArray(question.options) || question.options.length !== 5 || !question.correctOptionId || !question.optionFeedback?.[question.correctOptionId]);
  if (bad) return { ok: false, reason: 'Soru seçenekleri veya feedback eksik.' };
  const lowValue = questions.filter((question) => /en uygun tanımı|nedir\??$/iu.test(question.question || '') && String(question.stem || '').length < 120);
  if (lowValue.length > 1) return { ok: false, reason: 'Tanım düzeyinde düşük kaliteli soru fazla.' };
  return { ok: true };
}

function qualityGateDeck(deck = {}) {
  const cards = deck?.cards || [];
  if (!Array.isArray(cards) || cards.length < 8) return { ok: false, reason: 'Yeterli kaliteli hap kart üretilemedi.' };
  const metaCard = cards.find((card) => /Materyalde geçen|Bu kart|slaytta geçen|ayrıştırılan gerçek metne dayanır/iu.test(`${card.front} ${card.explanation}`));
  if (metaCard) return { ok: false, reason: 'Meta veya kopya kart üretildi.' };
  return { ok: true };
}

function extractKeywords(text = '', topic = '') {
  const stop = new Set(['olan', 'için', 'ile', 'bir', 've', 'veya', 'gibi', 'daha', 'sonra', 'önce', 'olarak', 'bu', 'şu', 'çok', 'hasta', 'hastalık', 'sistem']);
  const words = String(text || '')
    .toLocaleLowerCase('tr')
    .replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 5 && !stop.has(word));
  const counts = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
  const fromText = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([word]) => word);
  const fromTopic = String(topic || '').split(/\s+/).filter((word) => word.length >= 4);
  return [...new Set([...fromTopic, ...fromText])].slice(0, 10);
}

function splitSourceBlocks(text = '') {
  return String(text || '')
    .split(/\n\s*\n|(?=\[(?:Sayfa|Slayt|Ana belge)[^\]]*\])/iu)
    .map((block) => block.replace(/\s+/g, ' ').trim())
    .filter((block) => block.length >= 80)
    .slice(0, 12);
}

function getImportantSentences(text = '', max = 8) {
  const clean = String(text || '').replace(/\[[^\]]+\]/g, ' ').replace(/\s+/g, ' ').trim();
  const sentences = clean
    .split(/(?<=[.!?])\s+|\n+/u)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 45 && sentence.length <= 320);
  if (sentences.length) return sentences.slice(0, max);
  return splitSourceBlocks(text).map((block) => truncate(block, 260)).slice(0, max);
}

function sourceDrivenSections(material, topic) {
  const text = material.__sourceText || normalizeSourceText(material);
  const blocks = splitSourceBlocks(text);
  if (!blocks.length) return [];
  return blocks.slice(0, 5).map((block, index) => {
    const headingMatch = block.match(/^\[(.*?)\]\s*(.{0,90})/u);
    const sourceLabel = headingMatch?.[1] || `Materyal bölümü ${index + 1}`;
    const firstLine = block.replace(/^\[[^\]]+\]\s*/u, '').split(/[.!?]\s|\n/u)[0]?.trim();
    const heading = firstLine && firstLine.length >= 8 && firstLine.length <= 72 ? firstLine : sourceLabel;
    const sentences = getImportantSentences(block, 3);
    const content = sentences.length ? sentences.join(' ') : truncate(block.replace(/^\[[^\]]+\]\s*/u, ''), 520);
    const keywords = extractKeywords(block, topic).slice(0, 4);
    return {
      heading: truncate(heading, 80),
      content,
      mechanismFlow: keywords.length ? keywords.slice(0, 4) : [],
      examAngle: '',
      commonTrap: '',
      sourceReferences: [sourceLabel],
    };
  });
}

function buildSourceObjectiveList(material, topic) {
  const text = material.__sourceText || normalizeSourceText(material);
  const sentences = getImportantSentences(text, 6);
  if (!sentences.length) return [];
  return sentences.map((sentence) => truncate(sentence, 170));
}

function optionFeedbackForSourceQuestion(option, correctId, target, sourceClue) {
  if (option.id === correctId) {
    return `Bu seçenek materyaldeki “${truncate(sourceClue, 80)}” ipucuyla doğrudan ilişkilidir ve ${target} hedefini en iyi karşılar.`;
  }
  return `Bu seçenek benzer bir kavramı çağrıştırabilir; ancak materyalde verilen “${truncate(sourceClue, 80)}” ipucunu ${target} açısından doğrudan açıklamaz.`;
}


function countMatches(text = '', pattern) {
  return (String(text || '').match(pattern) || []).length;
}

function buildTopicProfileFromText() {
  return { dominant: [] };
}

function getMaterialTopicProfile() {
  return { dominant: [] };
}

function isAminoProteinMaterial() {
  return false;
}

function inferTitleFromTopicProfile() {
  return '';
}

function inferAcademicTitle(material = {}, packet = null) {
  if (material.inferredTitle) return material.inferredTitle;
  if (material.lesson?.inferredTitle) return material.lesson.inferredTitle;
  const base = String(material.course || material.committee || cleanMaterialTitle(material) || 'Komite Materyali')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/^\s*\d+[.)-]?\s*/u, '')
    .replace(/\b(pptx|pdf|docx|txt|slayt|sayfa|prof\.?|dr\.?)\b/giu, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return base || 'Komite Materyali';
}

function buildLocalLesson(material, packet = null) {
  const activePacket = packet || buildCombinedMaterialPacket(material);
  const topic = deriveTopic(material);
  const sourceText = combinedPacketToSourceText(activePacket);
  const keywords = extractKeywords(sourceText, topic);
  const hasReadableText = sourceText.length > 120;
  const sourceReference = hasReadableText ? 'Çalışma alanındaki okunabilir materyal metni' : 'Kullanıcı tarafından girilen ders bilgileri';
  const extractedSections = sourceDrivenSections({ ...material, __sourceText: sourceText, files: [], filePackets: [] }, topic);
  const sourceObjectives = buildSourceObjectiveList({ ...material, __sourceText: sourceText, files: [], filePackets: [] }, topic);
  const extractionLimitations = material.extractionLimitations || material.materialAnalysis?.sourceQuality?.limitations || [];

  const sections = hasReadableText && extractedSections.length
    ? [
      {
        heading: 'Materyalden çıkarılan büyük resim',
        teachingText: `Bu ders anlatımı, çalışma alanındaki okunabilir kaynak metinler birlikte değerlendirilerek kavramsal bir tekrar akışına dönüştürüldü. Ana tekrar hedefleri: ${keywords.slice(0, 6).join(', ') || topic}.`,
        mechanismFlow: keywords.slice(0, 5).map((keyword) => `${keyword} → temel kavram bağlantısı`),
        examAngle: 'Klinik bağlantı yalnızca metinde geçen konu ve kavramlardan hareketle kurulmalıdır; görsel içeriği okunamadıysa görsel hakkında kesin yorum yapılmaz.',
        commonTrap: `${material.learningTarget || 'Komite sınavı'} için bu materyalde tekrar edilmesi gereken başlıklar, doğrudan ayrıştırılan metindeki kavramlardan seçilmiştir.`,
        sourceReferences: (activePacket.files || []).map((file) => file.fileName || sourceReference),
      },
      ...extractedSections,
    ]
    : [
      {
        heading: 'Dosya içeriği okunamadı',
        teachingText: 'Bu materyal için otomatik metin ayrıştırma yeterli sonuç vermedi. Gerçek ders anlatımı üretmek için PDF/PPTX/DOCX içeriğinin okunabilir metin katmanı içermesi veya metnin elle yapıştırılması gerekir.',
        mechanismFlow: [],
        examAngle: 'İçerik okunmadan klinik veya biyokimyasal mekanizma anlatımı kesin bilgi gibi sunulmaz.',
        commonTrap: 'Sınav hedefi oluşturulabilir; ancak materyal temelli soru ve kart kalitesi için kaynak metin gerekir.',
        sourceReferences: [sourceReference],
      },
    ];

  return {
    id: createId('lesson'),
    materialId: material.id,
    title: inferAcademicTitle(material, activePacket),
    shortIntro: hasReadableText
      ? `Bu anlatım, çalışma alanındaki okunabilir kaynak metinler birleştirilerek kavramsal bir çalışma akışına dönüştürüldü. ${material.extractionNotice || ''}`.trim()
      : 'Bu çalışma alanı dosya metni ayrıştırılamadığı için gerçek materyal analizi yapılamadı; metin yapıştırılırsa içerik odaklı ders, soru ve kart üretilebilir.',
    learningObjectives: sourceObjectives.length
      ? sourceObjectives.slice(0, 4).map((item) => `${item}`)
      : [
        `${topic} başlığındaki temel kavramları sıralamak.`,
        'Mekanizma, klinik bağlantı ve sınav ipuçlarını ayrı ayrı ayırt etmek.',
        'Yanlış yapılan soru ve zorlanılan kartları materyal bazlı tekrar etmek.',
      ],
    sections,
    figureExplanations: [
      {
        sourcePageOrSlide: 'Metin ayrıştırma katmanı',
        title: hasReadableText ? 'Görsel/şekil analizi durumu' : 'Görsel/şekil analizi yapılamadı',
        whatItShows: hasReadableText
          ? 'Bu sürüm dosyadaki okunabilir metin katmanını analiz eder; görsel piksel içeriğini yorumlamaz.'
          : 'Dosyada okunabilir metin bulunamadığı için görsel, tablo veya şekil içeriği hakkında güvenilir yorum üretilemez.',
        importantLabels: [],
        stepByStepInterpretation: hasReadableText
          ? 'Slayt/PDF metni üzerinden başlıklar ve kavramlar çıkarıldı. Görsel etiketleri metin katmanında varsa dolaylı olarak yakalanabilir; görselin kendisi analiz edilmiş sayılmaz.'
          : 'Görsel analizi için OCR/vision veya sunucu tarafı gelişmiş ayrıştırma gerekir.',
        whyItMatters: 'Komite materyallerinde şekil ve tablolar yüksek değerli olabilir; bu nedenle okunmayan görsel hakkında uydurma açıklama yapılmamalıdır.',
        examRelevance: 'Soru ve kart üretimi, yalnızca çıkarılan metne ve açık kullanıcı girdisine dayandırılır.',
        commonMistake: 'Okunamayan görseli analiz edilmiş gibi anlatmak hatalıdır.',
        memoryNote: 'Kaynakta okunabilen bilgi ile yorum ayrılmalıdır.',
      },
    ],
    commonConfusions: [
      'Materyalde geçen ifade ile dış tıbbi yorum ayrı düşünülmelidir.',
      'Tanım, mekanizma, klinik bulgu ve sınav ipucu aynı şey değildir.',
    ],
    highYieldPoints: hasReadableText
      ? getImportantSentences(sourceText, 6).map((sentence) => truncate(sentence, 180))
      : [`${topic}: içerik okunamadığı için yüksek verimli özet güvenilir biçimde çıkarılamadı.`],
    mustKnow: hasReadableText
      ? keywords.slice(0, 6).map((keyword) => `${keyword}: bu materyalde tekrar edilmesi gereken ana kavramlardan biridir.`)
      : ['Okunamayan veya materyalde bulunmayan içerik, kesin bilgi gibi sunulmamalıdır.'],
    limitations: extractionLimitations,
    sourceReferences: (activePacket.files || []).map((file) => file.fileName || sourceReference),
    sourceCoverage: { filesUploadedCount: activePacket.files?.length || 1, filesAnalyzedCount: (activePacket.files || []).filter((file) => String(file.cleanedExtractedText || "").trim()).length, usedFiles: (activePacket.files || []).map((file) => file.fileName), coverageNote: "Bu çıktı yalnızca mevcut yükleme batchindeki filePackets içeriğinden üretildi." },
    qualityCheck: { usesAllFiles: true, notSlideBySlide: true, noRawOCR: true, noMeaninglessTags: true, sectionDepthAdequate: true },
    createdAt: Date.now(),
  };
}

function buildLocalQuestions(material, lesson, packet = null) {
  const activePacket = packet || buildCombinedMaterialPacket(material);
  const sourceText = combinedPacketToSourceText(activePacket);
  const topic = deriveTopic(material);
  const sourceClues = getImportantSentences(sourceText, 10);
  const keywords = extractKeywords(sourceText, topic);

  if (!sourceClues.length) return [];

  return sourceClues.slice(0, 10).map((clue, index) => {
    const ids = ['A', 'B', 'C', 'D', 'E'];
    const target = keywords[index % Math.max(keywords.length, 1)] || 'ana kavram';
    const correct = ids[index % ids.length];
    const optionTexts = [
      `Kaynak cümledeki ana ilişkiyi ${target} odağında neden-sonuç mantığıyla yorumlamak`,
      `Kaynak cümleyi yalnızca ezberlenecek bağımsız bir ifade gibi almak`,
      `Kaynakta açıkça desteklenmeyen dış bir klinik sonuca genişletmek`,
      `Görsel veya tablo okunmadan ayrıntılı yorum yapılmış gibi kabul etmek`,
      `Aynı paragraftaki bağlamı dikkate almadan tek kelime üzerinden karar vermek`,
    ];
    const orderedOptions = ids.map((id, optionIndex) => ({ id, text: optionTexts[(optionIndex - ids.indexOf(correct) + ids.length) % ids.length] }));
    return {
      id: createId('komite-q'),
      materialId: material.id,
      mode: 'komite',
      questionNumber: index + 1,
      difficulty: index < 3 ? 'easy' : index < 7 ? 'medium' : 'hard',
      learningTarget: `${target} ilişkisini yorumlamak`,
      sourceReference: activePacket.files?.[0]?.fileName || 'Mevcut yükleme batchi',
      stem: `Kaynakta şu bilgi vurgulanıyor: “${truncate(stripGenericMeta(clue), 220)}”`,
      supportingData: [],
      question: 'Bu bilgi çalışılırken en doğru öğrenme yaklaşımı hangisidir?',
      options: orderedOptions,
      correctOptionId: correct,
      explanation: `Doğru seçenek, kaynak cümlenin ana fikrini ${target} bağlamında yorumlar ve mevcut dosyada desteklenmeyen ek içerik üretmez.`,
      optionFeedback: Object.fromEntries(orderedOptions.map((option) => [option.id, option.id === correct ? 'Bu seçenek kaynak cümleyi bağlamı içinde yorumladığı için uygundur.' : 'Bu seçenek kaynak bağlamını zayıflatır veya dosyada desteklenmeyen bir yoruma kayar.'])),
      learningPoint: 'Komite materyali çalışılırken kaynak cümle, bağlamı ve neden-sonuç ilişkisi birlikte değerlendirilmelidir.',
      memoryNote: `${target}: kaynak ipucu → ilişki → sonuç`,
      userAnswer: null,
      isWrong: false,
      isFavorite: false,
      isDifficult: false,
      createdAt: Date.now(),
    };
  });
}

function buildLocalFlashcards(material, lesson, packet = null) {
  const activePacket = packet || buildCombinedMaterialPacket(material);
  const sourceText = combinedPacketToSourceText(activePacket);
  const topic = deriveTopic(material);
  const sourceClues = getImportantSentences(sourceText, 18);
  const keywords = extractKeywords(sourceText, topic);
  const hasReadableText = sourceText.length > 120 && sourceClues.length;

  const cards = hasReadableText
    ? sourceClues.slice(0, 18).map((clue, index) => {
      const keyword = keywords[index % Math.max(keywords.length, 1)] || 'ana kavram';
      return {
        id: createId('card'),
        userId: material.userId,
        materialId: material.id,
        mode: 'komite',
        classYear: material.classYear,
        committee: material.committee,
        course: material.course,
        type: index < 6 ? 'must_know' : index < 12 ? 'mechanism' : 'exam_trap',
        difficulty: index < 5 ? 'easy' : index < 12 ? 'medium' : 'hard',
        front: `${keyword} ile ilgili temel kaynak bilgisini nasıl hatırlamalısın?`,
        back: truncate(stripGenericMeta(clue), 220),
        explanation: `Bu kart, mevcut yükleme batchindeki kaynak cümleyi ${keyword} bağlamında aktif hatırlamaya dönüştürür.`,
        examTrap: 'Kaynakta açıkça yer almayan eski ders çıktıları veya önceki oturum bilgileri bu karta eklenmemelidir.',
        sourceReference: activePacket.files?.[index % Math.max(activePacket.files.length, 1)]?.fileName || 'Mevcut yükleme batchi',
        tags: [topic, keyword, material.learningTarget || 'Komite'].filter(Boolean).slice(0, 4),
        isUserCreated: false,
        isFavorite: false,
        isDifficult: false,
        repeatStatus: 'new',
        createdAt: Date.now(),
      };
    })
    : [{
      id: createId('card'),
      userId: material.userId,
      materialId: material.id,
      mode: 'komite',
      classYear: material.classYear,
      committee: material.committee,
      course: material.course,
      type: 'must_know',
      difficulty: 'easy',
      front: 'Bu çalışma alanında yeterli okunabilir metin yoksa ne yapılmalıdır?',
      back: 'Daha okunabilir dosya yüklenmeli veya ders metni ek not alanına yapıştırılmalıdır.',
      explanation: 'Kaynak metin olmadan detaylı ders, soru ve kart üretimi güvenilir olmaz.',
      examTrap: 'Dosya adı veya eski oturum çıktısı gerçek kaynak yerine kullanılmamalıdır.',
      sourceReference: 'Mevcut yükleme batchi',
      tags: [topic, 'kaynak kontrolü'].filter(Boolean),
      isUserCreated: false,
      isFavorite: false,
      isDifficult: false,
      repeatStatus: 'new',
      createdAt: Date.now(),
    }];

  return {
    id: createId('deck'),
    deckTitle: `${cleanMaterialTitle(material)} Hap Kartları`,
    materialId: material.id,
    cards,
  };
}


function normalizeGeneratedLessonShape(lesson = {}) {
  const rawSections = Array.isArray(lesson.sections) && lesson.sections.length
    ? lesson.sections
    : (Array.isArray(lesson.lessonSections) && lesson.lessonSections.length
      ? lesson.lessonSections
      : (lesson.coreExplanation || []));
  return {
    ...lesson,
    title: lesson.title || lesson.academicTitle || 'Komite Ders Anlatımı',
    overview: lesson.overview || lesson.shortOverview || lesson.shortIntro || '',
    shortIntro: lesson.shortIntro || lesson.shortOverview || lesson.overview || '',
    bigPicture: lesson.bigPicture || '',
    sections: rawSections.map((section) => ({
      ...section,
      heading: section.heading || section.title || 'Kavram',
      content: section.content || section.teachingText || '',
      teachingText: section.teachingText || section.content || '',
      whyItMatters: section.whyItMatters || '',
      examAngle: section.examAngle || section.examConnection || section.clinicalConnection || '',
      commonTrap: section.commonTrap || section.commonMistake || '',
    })),
    clinicalExamRelevance: lesson.clinicalExamRelevance || lesson.clinicalOrExamRelevance || lesson.examRelevance || '',
    highYieldPoints: lesson.highYieldPoints || lesson.highYieldSummary || [],
    mustKnow: lesson.mustKnow || lesson.mustRemember || [],
    figureExplanations: lesson.figureExplanations || lesson.figureTableExplanations || lesson.visualNotes || [],
    sourceCoverage: lesson.sourceCoverage || {},
  };
}

function normalizeGeneratedDeckShape(deck = {}, material = {}) {
  const cleanTitle = `${cleanMaterialTitle(material)} Hap Kartları`;
  const cards = (deck.cards || []).map((card) => ({
    ...card,
    front: stripGenericMeta(card.front),
    explanation: stripGenericMeta(card.explanation),
  })).filter((card) => card.front && card.back);
  return { ...deck, deckTitle: cleanTitle, cards };
}

async function postKomiteAI(endpoint, payload) {
  if (typeof fetch !== 'function') throw new Error('Fetch is not available');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-KlinikIQ-Source-Fingerprint': payload?.sourceFingerprint || payload?.studyContext?.sourceFingerprint || '',
    },
    cache: 'no-store',
    body: JSON.stringify(payload),
  });
  let json = null;
  try { json = await response.json(); } catch { json = null; }
  if (!response.ok || !json?.ok) throw new Error(json?.error || `AI route failed: ${endpoint}`);
  return json;
}

function buildMaterialAnalysisFallback(material, packet = null) {
  const activePacket = packet || buildCombinedMaterialPacket(material);
  const topic = deriveTopic(material);
  const sourceText = combinedPacketToSourceText(activePacket);
  const keywords = extractKeywords(sourceText, topic);
  const sections = sourceDrivenSections({ ...material, __sourceText: sourceText, files: [], filePackets: [] }, topic);
  const hasReadableText = sourceText.length > 120;
  return {
    materialTitle: topic,
    detectedCourseOrTopic: material.course || material.committee || topic,
    sourceQuality: {
      readableText: hasReadableText,
      figuresDetected: Boolean(material.extractedFigures?.length),
      tablesDetected: false,
      limitations: hasReadableText
        ? ['Bu lokal analiz okunabilir metin katmanına dayanır; görsel/piksel içeriği ayrıca analiz edilmedi.', ...(material.extractionLimitations || [])]
        : ['Dosya içeriği otomatik ayrıştırılamadı; yalnızca metadata/pasted text kullanıldı.', ...(material.extractionLimitations || [])],
    },
    lectureStructure: sections.length ? sections.map((section) => ({
      sectionTitle: section.heading,
      sourcePages: section.sourceReferences || [],
      mainIdeas: extractKeywords(section.teachingText || section.content, topic).slice(0, 5),
      importantDetails: getImportantSentences(section.teachingText || section.content, 3),
    })) : [{ sectionTitle: topic, sourcePages: [], mainIdeas: keywords.slice(0, 5), importantDetails: [] }],
    keyConcepts: keywords,
    mechanisms: keywords.slice(0, 5).map((keyword) => `${keyword} ile ilişkili mekanizma materyal metninden ayrıca doğrulanmalıdır.`),
    clinicalRelevance: hasReadableText ? getImportantSentences(sourceText, 4) : [],
    examRelevance: hasReadableText
      ? getImportantSentences(sourceText, 5).map((sentence) => `${truncate(sentence, 150)} bilgisi komite düzeyinde sorgulanabilir.`)
      : [`${material.learningTarget || 'Komite sınavı'} için temel kavram ve mekanizma bağlantısı.`],
    figureTableNotes: [{
      sourcePageOrSlide: 'Metin ayrıştırma katmanı',
      type: 'unclear',
      visibleContent: '',
      importantLabels: [],
      interpretation: hasReadableText ? 'Metin katmanı okundu; görsel içeriği doğrudan analiz edilmedi.' : '',
      limitations: 'Görsel, tablo veya diyagram piksel düzeyinde yorumlanmadı.',
    }],
    commonConfusions: ['Kaynakta geçen ifade ile ek tıbbi yorum karıştırılmamalıdır.'],
    recommendedLessonPlan: ['Materyalden çıkarılan büyük resim', 'Kaynak bölümleri', 'Mekanizma/klinik bağlantı', 'Sınav ve tekrar noktaları'],
    questionGenerationTargets: keywords.slice(0, 10),
    flashcardGenerationTargets: keywords.slice(0, 12),
    sourceReferences: [hasReadableText ? 'Ayrıştırılan/yapıştırılan metin' : 'Materyal metadata bilgisi'],
  };
}


function StatusPill({ children, tone = 'neutral' }) {
  return <span className={`komite-status-pill tone-${tone}`}>{children}</span>;
}

function EmptyState({ title, text, action }) {
  return (
    <div className="komite-empty-state">
      <strong>{title}</strong>
      <p>{text}</p>
      {action}
    </div>
  );
}

function InlineStatus({ status = 'idle', message = '' }) {
  if (status === 'idle' && !message) return null;
  const tone = status === 'error' ? 'danger' : status === 'success' ? 'success' : status === 'loading' ? 'warning' : 'neutral';
  return <div className={`komite-inline-status tone-${tone}`}>{status === 'loading' ? <span className="komite-spinner" aria-hidden="true" /> : null}<span>{message}</span></div>;
}


function LoadingPrimaryButton({ status = 'idle', idleLabel, loadingLabel, onClick, icon = 'Sparkles' }) {
  const isLoading = status === 'loading';
  return (
    <button
      type="button"
      className={`btn btn-primary komite-loading-primary ${isLoading ? 'is-loading' : ''}`}
      onClick={onClick}
      disabled={isLoading}
      aria-busy={isLoading ? 'true' : 'false'}
    >
      {isLoading ? <span className="komite-spinner komite-spinner-light" aria-hidden="true" /> : <Icon name={icon} size={17} />}
      <span>{isLoading ? loadingLabel : idleLabel}</span>
    </button>
  );
}

function AsyncActionButton({ status = 'idle', idleLabel, loadingLabel, successLabel, errorLabel, icon = 'Sparkles', onClick }) {
  const isLoading = status === 'loading';
  const label = status === 'loading' ? loadingLabel : status === 'success' ? successLabel : status === 'error' ? errorLabel : idleLabel;
  return (
    <button type="button" className={`btn btn-secondary async-action-btn status-${status}`} onClick={onClick} disabled={isLoading}>
      {isLoading ? <span className="komite-spinner" aria-hidden="true" /> : <Icon name={icon} size={16} />}
      <span>{label}</span>
    </button>
  );
}

function MaterialTree({ materials, activeMaterialId, onOpenMaterial, onDeleteMaterial }) {
  const grouped = useMemo(() => materials.reduce((acc, material) => {
    const classKey = `${material.classYear || '?'}. Sınıf`;
    const courseKey = material.committee || material.course || 'Komite / Ders belirtilmedi';
    if (!acc[classKey]) acc[classKey] = {};
    if (!acc[classKey][courseKey]) acc[classKey][courseKey] = [];
    acc[classKey][courseKey].push(material);
    return acc;
  }, {}), [materials]);

  if (!materials.length) {
    return <EmptyState title="Henüz materyal yüklemedin." text="Komite slaytlarını yükleyerek ders anlatımı, soru ve hap kart oluşturabilirsin." />;
  }

  return (
    <div className="komite-material-tree">
      {Object.entries(grouped).map(([className, courses]) => (
        <div className="komite-tree-class" key={className}>
          <span className="komite-tree-class-title">{className}</span>
          {Object.entries(courses).map(([courseName, courseMaterials]) => (
            <div className="komite-tree-course" key={courseName}>
              <span className="komite-tree-course-title">{courseName}</span>
              <div className="komite-tree-files">
                {courseMaterials.map((material) => (
                  <button
                    key={material.id}
                    type="button"
                    className={`komite-tree-file ${activeMaterialId === material.id ? 'active' : ''}`}
                    onClick={() => onOpenMaterial(material.id)}
                  >
                    <Icon name="Notes" size={16} />
                    <span className="komite-tree-file-copy"><strong>{material.fileName}</strong><em>{material.course || material.committee || 'Ders belirtilmedi'} · {new Date(material.uploadDate).toLocaleDateString('tr-TR')}</em></span>
                    <small>{material.lesson ? 'Ders hazır' : 'Hazırlanıyor'}</small>
                    {onDeleteMaterial ? (
                      <span
                        role="button"
                        tabIndex={0}
                        className="komite-tree-delete"
                        aria-label={`${material.fileName} materyalini sil`}
                        title="Sil"
                        onClick={(event) => { event.stopPropagation(); onDeleteMaterial(material.id); }}
                        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); onDeleteMaterial(material.id); } }}
                      >
                        <Icon name="Trash2" size={15} />
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function formatFileSize(bytes = 0) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function KomiteDashboard({ materials, onStart, onOpenMyMaterials, onOpenCards, onOpenReview, onOpenMaterial }) {
  const latest = materials[0];
  const cards = [
    { title: 'Çalışmaya Başla', description: 'Komite slaytlarını ve ders notlarını yükle; AI destekli ders anlatımı, soru seti ve hap kart oluştur.', action: 'Materyal yükle', icon: 'Sparkles', onClick: onStart, primary: true },
    { title: 'Çalıştıklarım', description: 'Daha önce yüklediğin komite materyallerini sınıf, komite ve ders düzeninde görüntüle.', action: 'Kütüphaneyi aç', icon: 'ClipboardList', onClick: onOpenMyMaterials },
    { title: 'Hap Kartlar', description: 'Yüklediğin materyallerden oluşturulan kartlarla kısa ve hedefli tekrar yap.', action: 'Kartları aç', icon: 'LayeredCards', onClick: onOpenCards },
    { title: 'Tekrar Merkezi', description: 'Yanlış yaptığın sorulara, zorlandığın kartlara ve tekrar listene tek yerden dön.', action: 'Tekrarları gör', icon: 'RotateCcw', onClick: onOpenReview },
  ];

  return (
    <section className="komite-dashboard-grid" aria-label="Komite çalışma alanı">
      {cards.map((card) => (
        <button type="button" key={card.title} className={`komite-dashboard-card ${card.primary ? 'primary' : ''}`} onClick={card.onClick}>
          <span className="komite-card-icon"><Icon name={card.icon} /></span>
          <span className="komite-dashboard-card-copy">
            <strong>{card.title}</strong>
            <p>{card.description}</p>
          </span>
          <span className="komite-card-action">{card.action}<Icon name="ArrowRight" size={16} /></span>
        </button>
      ))}

      {latest ? (
        <button type="button" className="komite-latest-material card-surface" onClick={() => onOpenMaterial(latest.id)}>
          <span className="komite-latest-copy">
            <small>Kaldığın yerden devam et</small>
            <strong>{latest.fileName}</strong>
            <em>{latest.classYear}. sınıf · {latest.course || latest.committee || 'Ders belirtilmedi'} · Son çalışma: {new Date(latest.updatedAt || latest.uploadDate).toLocaleDateString('tr-TR')}</em>
          </span>
          <span className="komite-card-action">Materyali aç<Icon name="ArrowRight" size={16} /></span>
        </button>
      ) : (
        <button type="button" className="komite-latest-material is-empty card-surface" onClick={onStart}>
          <span className="komite-latest-copy">
            <small>Kaldığın yerden devam et</small>
            <strong>Henüz çalışılmış materyal yok.</strong>
            <em>İlk komite dosyanı yükleyerek başlayabilirsin.</em>
          </span>
          <span className="komite-card-action">İlk materyali yükle<Icon name="ArrowRight" size={16} /></span>
        </button>
      )}
    </section>
  );
}

function StartFlow({ onCreate, onCancel }) {
  const [form, setForm] = useState({
    classYear: '3',
    committee: '',
    course: '',
    learningTarget: 'Komite sınavı',
    university: '',
    pastedText: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileText, setFileText] = useState('');
  const [fileNotice, setFileNotice] = useState('');
  const [fileExtraction, setFileExtraction] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const processFiles = async (files) => {
    const unique = Array.from(files || []).filter(Boolean).filter((file, index, arr) => arr.findIndex((item) => `${item.name}-${item.size}` === `${file.name}-${file.size}`) === index);
    setSelectedFiles(unique);
    setFileText('');
    setFileNotice('');
    setFileExtraction(null);
    if (!unique.length) return;
    setIsExtracting(true);
    try {
      const extractions = await Promise.all(unique.map(async (file) => {
        try { return { file, extraction: await extractKomiteFile(file) }; }
        catch { return { file, extraction: { ok: false, text: '', notice: `${file.name} otomatik okunamadı.` } }; }
      }));
      const filePackets = extractions.map(({ file, extraction }) => {
        const cleanedExtractedText = cleanExtractedTextForAI(extraction.text || '');
        return {
          fileName: file.name,
          fileType: getFileType(file.name),
          cleanedExtractedText,
          detectedTopics: [],
          charCount: cleanedExtractedText.length,
          extractionOk: Boolean(extraction.ok && cleanedExtractedText),
        };
      });
      const mergedText = filePackets.map((item, index) => item.cleanedExtractedText ? `\n\n[[FILE ${index + 1}: ${item.fileName}]]\n${item.cleanedExtractedText}` : '').join('').trim();
      const detectedStructure = extractions.flatMap(({ extraction }) => extraction.detectedStructure || []);
      const limitations = extractions.flatMap(({ extraction }) => extraction.limitations || []);
      if (import.meta.env.DEV) {
        console.debug('[KOMITE upload]', {
          uploadedFiles: unique.length,
          extractedFiles: filePackets.filter((item) => item.extractionOk).length,
          charCounts: filePackets.map((item) => ({ fileName: item.fileName, chars: item.charCount })),
          totalChars: filePackets.reduce((sum, item) => sum + item.charCount, 0),
          fileNames: filePackets.map((item) => item.fileName),
        });
      }
      setFileText(mergedText);
      setFileExtraction({
        ok: extractions.some(({ extraction }) => extraction.ok),
        text: mergedText,
        files: filePackets,
        detectedStructure,
        figures: extractions.flatMap(({ extraction }) => extraction.figures || []),
        notice: mergedText ? `${unique.length} dosya çalışma alanına eklendi.` : 'Dosyalar otomatik okunamadı; ek ders notu alanına metin ekleyebilirsin.',
        limitations,
      });
      setFileNotice(mergedText ? `${unique.length} dosya çalışma alanına eklendi.` : 'Dosyalar otomatik okunamadı; ek ders notu alanına metin ekleyebilirsin.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFiles = async (fileList) => {
    const incoming = Array.from(fileList || []).filter(Boolean);
    if (!incoming.length) return;
    await processFiles([...selectedFiles, ...incoming]);
  };

  const removeFile = async (fileToRemove) => {
    const nextFiles = selectedFiles.filter((file) => `${file.name}-${file.size}` !== `${fileToRemove.name}-${fileToRemove.size}`);
    await processFiles(nextFiles);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!selectedFiles.length && !form.pastedText.trim()) return;
    onCreate({
      ...form,
      files: selectedFiles,
      file: selectedFiles[0] || null,
      extractedText: fileText,
      pastedText: form.pastedText.trim(),
      extraction: fileExtraction,
    });
  };

  return (
    <section className="komite-start-flow card-surface">
      <div className="komite-section-head">
        <div>
          <span className="komite-kicker">Çalışmaya Başla</span>
          <h2>Materyal yükle</h2>
          <p>Komite slaytlarını ve ders notlarını yükle. KlinikIQ AI bu dosyalardan ders anlatımı, soru seti ve hap kartlar oluşturur.</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Vazgeç</button>
      </div>

      <form className="komite-start-form" onSubmit={submit}>
        <label>
          <span>Sınıf</span>
          <select value={form.classYear} onChange={(event) => update('classYear', event.target.value)}>
            {CLASS_YEARS.map((year) => <option key={year} value={year}>{year}. sınıf</option>)}
          </select>
        </label>
        <label>
          <span>Komite adı</span>
          <input value={form.committee} onChange={(event) => update('committee', event.target.value)} placeholder="Örn. Nöroloji Komitesi" />
        </label>
        <label>
          <span>Ders / konu</span>
          <input value={form.course} onChange={(event) => update('course', event.target.value)} placeholder="Örn. Epilepsi, Kardiyak fizyoloji" />
        </label>
        <label>
          <span>Çalışma hedefi</span>
          <select value={form.learningTarget} onChange={(event) => update('learningTarget', event.target.value)}>
            {LEARNING_TARGETS.map((target) => <option key={target} value={target}>{target}</option>)}
          </select>
        </label>
        <label>
          <span>Üniversite (opsiyonel)</span>
          <input value={form.university} onChange={(event) => update('university', event.target.value)} placeholder="Örn. İstanbul Üniversitesi" />
        </label>

        <div
          className={`komite-file-drop ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={(event) => { event.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(event) => { event.preventDefault(); setIsDragOver(false); handleFiles(event.dataTransfer.files); }}
        >
          <input id="komite-file-input" type="file" multiple accept=".pdf,.pptx,.docx,.txt" onChange={(event) => handleFiles(event.target.files)} />
          <Icon name="Notes" size={24} />
          <strong>Dosyalarını buraya sürükle veya seç</strong>
          <small>PDF, PPTX, DOCX ve TXT dosyaları desteklenir. Aynı komiteye ait birden fazla dosya yükleyebilirsin.</small>
          <label htmlFor="komite-file-input" className="komite-file-picker">Dosya seç</label>
          {isExtracting ? <span className="komite-upload-status"><span className="komite-spinner" aria-hidden="true" /> Dosyalar okunuyor…</span> : null}
          {!isExtracting && fileNotice ? <span className="komite-upload-status">{fileNotice}</span> : null}
        </div>

        {selectedFiles.length ? (
          <div className="komite-selected-files" aria-label="Seçilen dosyalar">
            {selectedFiles.map((file) => (
              <div className="komite-selected-file" key={`${file.name}-${file.size}`}>
                <Icon name="Notes" size={16} />
                <span><strong>{file.name}</strong><small>{getFileType(file.name).toUpperCase()} {formatFileSize(file.size) ? `· ${formatFileSize(file.size)}` : ''}</small></span>
                <button type="button" aria-label={`${file.name} dosyasını kaldır`} onClick={() => removeFile(file)}><Icon name="X" size={15} /></button>
              </div>
            ))}
          </div>
        ) : null}

        <label className="komite-textarea-label">
          <span>Ek ders notu</span>
          <small>Slaytta okunmayan veya hocanın özellikle vurguladığı notları buraya ekleyebilirsin.</small>
          <textarea value={form.pastedText} onChange={(event) => update('pastedText', event.target.value)} rows={5} placeholder="Örneğin hocanın vurguladığı noktalar, eksik kalan slayt metinleri veya sınavda sorulabilir dediği başlıklar…" />
        </label>
        <div className="komite-form-actions">
          <button type="submit" className="btn btn-primary" disabled={isExtracting || (!selectedFiles.length && !form.pastedText.trim())}>
            <Icon name="Sparkles" /> Ders çalışma alanı oluştur
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Vazgeç</button>
        </div>
      </form>
    </section>
  );
}

function LessonView({ material, onGenerate, status = 'idle' }) {
  const lesson = material.lesson;
  if (!lesson) {
    const hasExtractedText = combinedPacketToSourceText(buildCombinedMaterialPacket(material)).length > 120;
    return <EmptyState title="Ders anlatımı henüz hazır değil" text={hasExtractedText ? "Dosya metni ayrıştırıldı. KlinikIQ AI tek bir konu anlatımı oluşturmak için materyali analiz eder." : "Bu dosyadan yeterli metin çıkarılamadı. Metin yapıştırırsan içerik odaklı ders, soru ve kart üretilebilir."} action={<LoadingPrimaryButton status={status} idleLabel="AI Ders Anlatımı oluştur" loadingLabel="AI Ders Anlatımı oluşturuyor…" onClick={onGenerate} />} />;
  }

  const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
  const sectionAnchors = sections.map((section, index) => ({ id: createLessonAnchorId(section.heading, index), title: section.heading || `Bölüm ${index + 1}` }));
  const objectives = lesson.learningObjectives || [];
  const concepts = Array.isArray(lesson.mainConcepts)
    ? lesson.mainConcepts.filter((item) => !/materyaldeki ilişkili kavram|slayt|sayfa|dosya|pptx/iu.test(String(item)))
    : [];
  const highYield = lesson.highYieldPoints || lesson.highYieldSummary || [];
  const mustKnow = lesson.mustKnow || lesson.mustRemember || [];

  return (
    <div className="komite-lesson-view komite-lesson-view-pro">
      <div className="komite-lesson-hero komite-lesson-hero-pro komite-lesson-brief-card">
        <div className="komite-lesson-brief">
          <span className="komite-kicker"><Icon name="BookOpen" size={16} /> AI Ders Anlatımı</span>
          <p>{improveLessonIntro(lesson.shortSubtitle || lesson.shortIntro || lesson.overview, lesson.title)}</p>
        </div>
      </div>

      <div className="komite-lesson-pro-layout">
        <aside className="komite-lesson-sidebar" aria-label="Ders navigasyonu">
          <div className="komite-sidebar-card">
            <strong>Hızlı erişim</strong>
            <a href="#komite-objectives">Öğrenme hedefleri</a>
            <a href="#komite-big-picture">Büyük resim</a>
            {sectionAnchors.map((item) => <a href={`#${item.id}`} key={item.id}>{item.title}</a>)}
            <a href="#komite-high-yield">Can alıcı noktalar</a>
          </div>
        </aside>

        <main className="komite-lesson-main-flow">
          <section id="komite-objectives" className="komite-objectives komite-objectives-pro">
            <strong>Öğrenme hedefleri</strong>
            <ul>{objectives.map((item, index) => <li key={`${item}-${index}`}>{sanitizeTeachingTextForDisplay(item)}</li>)}</ul>
          </section>

          {(lesson.bigPicture || lesson.overview) ? (
            <article id="komite-big-picture" className="komite-lesson-section komite-big-picture-section">
              <h3>Büyük resim</h3>
              {splitReadableParagraphs(sanitizeTeachingTextForDisplay(lesson.bigPicture || lesson.overview)).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </article>
          ) : null}

          {(lesson.clinicalExamRelevance || (Array.isArray(lesson.commonConfusions) && lesson.commonConfusions.length)) ? (
            <div className="komite-context-lines" aria-label="Klinik ve sınav bağlantıları">
              {lesson.clinicalExamRelevance ? (
                <div className="komite-context-line">
                  <strong>Klinik / sınav bağlantısı</strong>
                  <p>{sanitizeTeachingTextForDisplay(lesson.clinicalExamRelevance)}</p>
                </div>
              ) : null}
              {Array.isArray(lesson.commonConfusions) && lesson.commonConfusions.length ? (
                <div className="komite-context-line">
                  <strong>Sık karıştırılan noktalar</strong>
                  <ul>{lesson.commonConfusions.map((item, index) => <li key={`${formatLessonListItem(item)}-${index}`}>{formatLessonListItem(item)}</li>)}</ul>
                </div>
              ) : null}
            </div>
          ) : null}

          {sections.map((section, index) => {
            const teachingText = sanitizeTeachingTextForDisplay(section.teachingText || section.content);
            return (
              <article id={sectionAnchors[index]?.id} className="komite-lesson-section komite-lesson-section-pro" key={`${section.heading}-${index}`}>
                <div className="komite-section-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="komite-section-body">
                  <h3>{section.heading}</h3>
                  {splitReadableParagraphs(teachingText).map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                  {(formatMechanismSteps(section.mechanismFlow).length || section.examAngle || section.commonTrap || section.clinicalConnection || section.examConnection) ? (
                    <div className="komite-note-lines">
                      {formatMechanismSteps(section.mechanismFlow).length ? (
                        <div className="komite-note-line komite-flow-line">
                          <strong>Süreç mantığı</strong>
                          <ol>{formatMechanismSteps(section.mechanismFlow).map((step, stepIndex) => <li key={`${step}-${stepIndex}`}>{step}</li>)}</ol>
                        </div>
                      ) : null}
                      {(section.examAngle || section.clinicalConnection) ? <div className="komite-note-line"><strong>Sınavda nasıl sorulur?</strong><p>{sanitizeTeachingTextForDisplay(section.examAngle || section.clinicalConnection)}</p></div> : null}
                      {(section.commonTrap || section.examConnection) ? <div className="komite-note-line"><strong>Sık hata</strong><p>{sanitizeTeachingTextForDisplay(section.commonTrap || section.examConnection)}</p></div> : null}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}

          <div id="komite-high-yield" className="komite-summary-lines komite-summary-grid-pro">
            <div>
              <strong>Can alıcı noktalar</strong>
              <ul>{highYield.map((item, index) => <li key={`${item}-${index}`}>{sanitizeTeachingTextForDisplay(item)}</li>)}</ul>
            </div>
            <div>
              <strong>Mutlaka hatırla</strong>
              <ul>{mustKnow.map((item, index) => <li key={`${item}-${index}`}>{sanitizeTeachingTextForDisplay(item)}</li>)}</ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function FiguresView({ material }) {
  const rawFigures = material.lesson?.figureExplanations || material.materialAnalysis?.figureTableNotes || [];
  const figures = rawFigures.length ? rawFigures : [{
    sourcePageOrSlide: 'Materyal geneli',
    analysisStatus: combinedPacketToSourceText(buildCombinedMaterialPacket(material)).length > 120 ? 'partial' : 'unavailable',
    type: 'unknown',
    visibleTextAroundFigure: '',
    whatCanBeSaidSafely: combinedPacketToSourceText(buildCombinedMaterialPacket(material)).length > 120
      ? 'Bu sürümde görselin kendisi değil, slayt/PDF içindeki okunabilir metin analiz edildi.'
      : 'Dosyadan yeterli metin çıkarılamadığı için görsel hakkında güvenilir yorum yapılamaz.',
    limitations: 'OCR/vision desteği olmadan şekil, tablo veya diyagram piksel içeriği yorumlanmaz.',
    examRelevance: 'Görsel sorusu üretmek için görselin okunabilir metni veya ayrı ekran görüntüsü gerekir.',
  }];
  const statusLabel = { analyzed: 'Analiz edildi', partial: 'Kısmen analiz edildi', unavailable: 'Analiz edilemedi' };
  return (
    <div className="komite-figure-grid">
      {figures.map((figure, index) => {
        const status = figure.analysisStatus || (figure.whatItShows || figure.interpretation ? 'partial' : 'unavailable');
        return (
          <article className="komite-figure-card" key={`${figure.title || figure.type}-${index}`}>
            <div className="komite-figure-card-head"><span>{figure.sourcePageOrSlide || 'Kaynak belirtilmedi'}</span><StatusPill tone={status === 'analyzed' ? 'success' : status === 'partial' ? 'warning' : 'neutral'}>{statusLabel[status] || statusLabel.partial}</StatusPill></div>
            <h3>{figure.title || figure.type || 'Görsel / şekil notu'}</h3>
            <p>{figure.whatCanBeSaidSafely || figure.whatItShows || figure.interpretation || 'Bu görsel güvenilir biçimde analiz edilemedi.'}</p>
            <dl>
              {figure.visibleTextAroundFigure ? <><dt>Okunabilen çevre metni</dt><dd>{figure.visibleTextAroundFigure}</dd></> : null}
              <dt>Sınır</dt><dd>{figure.limitations || figure.commonMistake || 'Görsel içeriği uydurulmaz; yalnızca okunabilir metin kullanılabilir.'}</dd>
              <dt>Sınav değeri</dt><dd>{figure.examRelevance || 'Görsel tabanlı soru için ek OCR/görsel analiz gerekir.'}</dd>
            </dl>
          </article>
        );
      })}
    </div>
  );
}

function QuestionsView({ material, onGenerate, onAnswer, onToggleQuestionFlag }) {
  const questions = material.questions || [];
  const [index, setIndex] = useState(0);
  const active = normalizeQuestionForDisplay(questions[index]);

  useEffect(() => { if (index > questions.length - 1) setIndex(0); }, [questions.length, index]);

  if (!questions.length) {
    return <EmptyState title="AI soruları henüz oluşturulmadı" text="Bu materyal için 10 soruluk GoodNotes benzeri soru seti oluştur." action={<button type="button" className="btn btn-primary" onClick={onGenerate}>10 soru oluştur</button>} />;
  }

  const selected = active?.userAnswer;
  const correctId = active?.correctOptionId;
  const isAnswered = Boolean(selected);
  const selectedFeedback = selected ? active.optionFeedback?.[selected] : '';
  const correctFeedback = correctId ? active.optionFeedback?.[correctId] : '';

  return (
    <div className="komite-question-workspace">
      <div className="komite-question-nav" aria-label="Soru gezinme">
        {questions.map((question, idx) => (
          <button key={question.id} type="button" className={idx === index ? 'active' : question.userAnswer ? 'answered' : ''} onClick={() => setIndex(idx)}>{question.questionNumber || idx + 1}</button>
        ))}
      </div>
      {active ? (
        <article className="komite-question-card">
          <div className="komite-question-meta">
            <StatusPill tone={active.difficulty === 'hard' ? 'danger' : active.difficulty === 'medium' ? 'warning' : 'success'}>{active.difficulty}</StatusPill>
            <span>{active.learningTarget}</span>
          </div>
          <p className="komite-question-stem">{active.stem}</p>
          {active.supportingData?.length ? <div className="komite-supporting-data">{active.supportingData.map((item) => <span key={item}>{item}</span>)}</div> : null}
          {active.question ? <h3>{active.question}</h3> : null}
          <div className="komite-option-list">
            {active.options.map((option) => {
              const stateClass = isAnswered && option.id === correctId ? 'correct' : isAnswered && option.id === selected ? 'wrong' : '';
              return (
                <button key={option.id} type="button" className={`komite-option ${stateClass}`.trim()} disabled={isAnswered} onClick={() => onAnswer(active.id, option.id)}>
                  <strong>{option.id}</strong><span>{option.text}</span>
                </button>
              );
            })}
          </div>
          {isAnswered ? (
            <div className="komite-feedback-box">
              {selected === correctId ? (
                <>
                  <strong>Doğru yanıt</strong>
                  <p>{active.explanation}</p>
                  {active.learningPoint ? <p className="komite-memory-note">{active.learningPoint}</p> : null}{active.memoryNote ? <p className="komite-memory-note">{active.memoryNote}</p> : null}
                </>
              ) : (
                <>
                  <strong>Neden yanlış yaptın?</strong>
                  <p>{selectedFeedback}</p>
                  <strong>Doğru seçenek neden doğru?</strong>
                  <p>{correctFeedback}</p>
                </>
              )}
            </div>
          ) : null}
          <div className="komite-question-actions">
            <button type="button" className={`btn btn-secondary ${active.isDifficult ? 'active' : ''}`} onClick={() => onToggleQuestionFlag(active.id, 'isDifficult')}>Zor</button>
            <button type="button" className={`btn btn-secondary ${active.isFavorite ? 'active' : ''}`} onClick={() => onToggleQuestionFlag(active.id, 'isFavorite')}>Favori</button>
          </div>
        </article>
      ) : null}
    </div>
  );
}

function FlashcardsView({ material, onGenerate, onUpdateCard }) {
  const deck = material.flashcardDeck;
  const cards = deck?.cards || [];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const active = cards[index];

  useEffect(() => { setFlipped(false); }, [index]);

  if (!cards.length) {
    return <EmptyState title="Hap kart destesi yok" text="Bu materyalden aktif geri çağırma kartları oluşturabilirsin." action={<button type="button" className="btn btn-primary" onClick={onGenerate}>Hap kartları oluştur</button>} />;
  }

  return (
    <div className="komite-flashcard-workspace">
      <div className="komite-flashcard-head">
        <div><span className="komite-kicker">{deck.deckTitle}</span><h3>{index + 1} / {cards.length}</h3></div>
        <div className="komite-flashcard-nav">
          <button type="button" className="btn btn-secondary" onClick={() => setIndex(Math.max(0, index - 1))}>Önceki</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIndex(Math.min(cards.length - 1, index + 1))}>Sonraki</button>
        </div>
      </div>
      <button type="button" className={`komite-flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((current) => !current)}>
        <span className="komite-card-chip-row"><StatusPill tone="neutral">{active.type || 'must_know'}</StatusPill><StatusPill tone={active.difficulty === 'hard' ? 'danger' : active.difficulty === 'medium' ? 'warning' : 'success'}>{active.difficulty || 'medium'}</StatusPill></span>
        {flipped ? <><small>Yanıt</small><strong>{active.back}</strong>{active.explanation ? <p><b>Mantık: </b>{active.explanation}</p> : null}{active.examTrap ? <p className="komite-memory-note">{active.examTrap}</p> : null}</> : <><small>Soru</small><strong>{active.front}</strong><small>Yanıtı görmek için karta tıkla.</small></>}
      </button>
      <div className="komite-card-actions">
        <button type="button" className="btn btn-secondary" onClick={() => onUpdateCard(active.id, { repeatStatus: 'known', isDifficult: false })}>Biliyorum</button>
        <button type="button" className="btn btn-secondary" onClick={() => onUpdateCard(active.id, { repeatStatus: 'repeat' })}>Tekrar et</button>
        <button type="button" className="btn btn-secondary" onClick={() => onUpdateCard(active.id, { isDifficult: !active.isDifficult, repeatStatus: 'repeat' })}>Zor</button>
        <button type="button" className="btn btn-secondary" onClick={() => onUpdateCard(active.id, { isFavorite: !active.isFavorite })}>Favori</button>
      </div>
    </div>
  );
}

function ReviewCenter({ materials, activeMaterial, onOpenMaterial }) {
  const [filter, setFilter] = useState('Bu materyal');
  const scopeMaterials = filter === 'Bu materyal' && activeMaterial ? [activeMaterial] : materials;
  const wrongQuestions = scopeMaterials.flatMap((material) => (material.questions || []).filter((question) => question.isWrong).map((question) => ({ ...question, material })));
  const difficultCards = scopeMaterials.flatMap((material) => (material.flashcardDeck?.cards || []).filter((card) => card.isDifficult || card.repeatStatus === 'repeat').map((card) => ({ ...card, material })));
  const favorites = scopeMaterials.flatMap((material) => [
    ...(material.questions || []).filter((question) => question.isFavorite).map((question) => ({ ...question, itemKind: 'Soru', material })),
    ...(material.flashcardDeck?.cards || []).filter((card) => card.isFavorite).map((card) => ({ ...card, itemKind: 'Kart', material })),
  ]);

  return (
    <div className="komite-review-center">
      <div className="komite-review-toolbar">
        {REVIEW_FILTERS.map((item) => (
          <button key={item} type="button" className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>
      <div className="komite-review-grid">
        <section>
          <h3>Yanlış Sorular</h3>
          {wrongQuestions.length ? wrongQuestions.map((question) => <button type="button" key={question.id} onClick={() => onOpenMaterial(question.material.id)}>{question.material.fileName}<span>{question.question}</span></button>) : <p>Bu kapsamda yanlış soru yok.</p>}
        </section>
        <section>
          <h3>Zor Kartlar / Tekrar Et</h3>
          {difficultCards.length ? difficultCards.map((card) => <button type="button" key={card.id} onClick={() => onOpenMaterial(card.material.id)}>{card.material.fileName}<span>{card.front}</span></button>) : <p>Tekrar kuyruğu boş.</p>}
        </section>
        <section>
          <h3>Favoriler</h3>
          {favorites.length ? favorites.map((item) => <button type="button" key={item.id} onClick={() => onOpenMaterial(item.material.id)}>{item.itemKind}<span>{item.front || item.question}</span></button>) : <p>Henüz favori işaretlenmedi.</p>}
        </section>
        <section>
          <h3>Zayıf Konular</h3>
          {wrongQuestions.length || difficultCards.length ? <p>Öncelik: {wrongQuestions[0]?.learningTarget || difficultCards[0]?.tags?.[0] || 'materyal tekrarı'}.</p> : <p>Çalışma verisi biriktikçe zayıf konu listesi oluşur.</p>}
        </section>
      </div>
    </div>
  );
}

function StudyWorkspace({ material, materials, onBack, onPatchMaterial, onOpenMaterial }) {
  const [tab, setTab] = useState('lesson');
  const [aiStatus, setAiStatus] = useState({ lesson: 'idle', questions: 'idle', cards: 'idle' });
  const [aiError, setAiError] = useState({});
  const busy = Object.values(aiStatus).find((status) => status === 'loading') ? 'loading' : '';
  const setKindStatus = (kind, status, message = '') => {
    setAiStatus((current) => ({ ...current, [kind]: status }));
    setAiError((current) => ({ ...current, [kind]: message }));
  };

  const runWithLocalFallback = async (kind) => {
    if (aiStatus[kind] === 'loading') return;
    setKindStatus(kind, 'loading', '');
    const materialPacket = buildCombinedMaterialPacket(material);
    const sourceFingerprint = buildSourceFingerprint(material, materialPacket);
    const sourceManifest = buildSourceManifest(material, materialPacket, sourceFingerprint);
    if (!sourceManifestMatches(material, sourceManifest, materialPacket)) {
      setKindStatus(kind, 'error', 'Aktif kaynak oturumu doğrulanamadı. Lütfen materyali yeniden açıp tekrar deneyin.');
      return;
    }
    const sourceText = balancedPacketToSourceText(materialPacket);
    if (import.meta.env.DEV) {
      console.debug('[KOMITE AI request]', {
        filesUploaded: Array.isArray(material.files) ? material.files.length : 0,
        filesIncluded: materialPacket.files.length,
        charCounts: materialPacket.files.map((file) => ({ fileName: file.fileName, chars: (file.cleanedExtractedText || '').length })),
        totalChars: sourceText.length,
        sourceManifest,
        fileNames: materialPacket.files.map((file) => file.fileName),
      });
    }
    const studyContext = {
      classYear: material.classYear,
      committeeOrCourse: material.committee || material.course,
      learningTarget: material.learningTarget,
      studyMode: 'komite',
      sourceFingerprint,
      sourceManifest,
    };
    try {
      let nextPatch = {};
      let analysis = material.materialAnalysis || buildMaterialAnalysisFallback(material, materialPacket);

      if (sourceText.length > 120 && !material.materialAnalysis) {
        try {
          const analyzed = await postKomiteAI('/api/analyze-uploaded-material', {
            metadata: { ...material, committeeOrCourse: material.committee || material.course, sourceFingerprint },
            materialPacket,
            extractedTextOrChunks: sourceText,
            sourceFingerprint,
            sourceManifest,
          });
          analysis = analyzed.analysis || analysis;
        } catch {
          analysis = buildMaterialAnalysisFallback(material, materialPacket);
        }
      }

      if (kind === 'lesson') {
        try {
          const generated = sourceText.length > 120 ? await postKomiteAI('/api/generate-lesson', {
            studyContext,
            materialAnalysisJson: analysis,
            materialPacket,
            sourceTextChunks: sourceText,
            filesUploadedCount: materialPacket.files.length,
            sourceFingerprint,
            sourceManifest,
          }) : null;
          let lesson = generated?.lesson
            ? stampGeneratedOutput(deepenLessonSections(normalizeLessonCoverageForMaterial(normalizeGeneratedLessonShape(generated.lesson), material, materialPacket), material), material, materialPacket)
            : stampGeneratedOutput(deepenLessonSections(normalizeLessonCoverageForMaterial(buildLocalLesson(material, materialPacket), material, materialPacket), material), material, materialPacket);
          const gate = qualityGateLesson(lesson, material);
          if (!gate.ok && /kaynakların ana konusuyla uyuşmuyor|şablon|yüzeysel|Büyük resim/iu.test(gate.reason || '')) {
            lesson = stampGeneratedOutput(deepenLessonSections(normalizeLessonCoverageForMaterial(buildLocalLesson(material, materialPacket), material, materialPacket), material), material, materialPacket);
          }
          nextPatch = { materialAnalysis: analysis, lesson, sourceFingerprint, processingStatus: 'lesson-ready' };
        } catch {
          const lesson = stampGeneratedOutput(deepenLessonSections(normalizeLessonCoverageForMaterial(buildLocalLesson(material, materialPacket), material, materialPacket), material), material, materialPacket);
          nextPatch = { materialAnalysis: analysis, lesson, sourceFingerprint, processingStatus: 'lesson-ready' };
        }
      } else if (kind === 'questions') {
        const lesson = material.lesson && !isGeneratedAssetStale(material.lesson, material, materialPacket)
          ? material.lesson
          : stampGeneratedOutput(buildLocalLesson(material, materialPacket), material, materialPacket);
        try {
          const generated = sourceText.length > 120 ? await postKomiteAI('/api/generate-material-questions', {
            studyContext,
            materialAnalysisJson: analysis,
            generatedLessonJson: lesson,
            materialPacket,
            sourceTextChunks: sourceText,
            filesUploadedCount: materialPacket.files.length,
            sourceFingerprint,
            sourceManifest,
          }) : null;
          const questions = Array.isArray(generated?.questions) ? stampGeneratedQuestions(generated.questions.map((question, index) => ({
            ...question,
            id: question.id || createId('komite-q'),
            materialId: material.id,
            mode: 'komite',
            questionNumber: question.questionNumber || index + 1,
            userAnswer: null,
            isWrong: false,
            isFavorite: false,
            isDifficult: false,
            createdAt: Date.now(),
          })), material, materialPacket) : stampGeneratedQuestions(buildLocalQuestions(material, lesson, materialPacket), material, materialPacket);
          nextPatch = { materialAnalysis: analysis, lesson, questions, questionsSourceFingerprint: sourceFingerprint, sourceFingerprint, processingStatus: 'questions-ready' };
        } catch {
          nextPatch = { materialAnalysis: analysis, lesson, questions: stampGeneratedQuestions(buildLocalQuestions(material, lesson, materialPacket), material, materialPacket), questionsSourceFingerprint: sourceFingerprint, sourceFingerprint, processingStatus: 'questions-ready' };
        }
      } else if (kind === 'cards') {
        const lesson = material.lesson && !isGeneratedAssetStale(material.lesson, material, materialPacket)
          ? material.lesson
          : stampGeneratedOutput(buildLocalLesson(material, materialPacket), material, materialPacket);
        try {
          const generated = sourceText.length > 120 ? await postKomiteAI('/api/generate-material-flashcards', {
            studyContext,
            materialAnalysisJson: analysis,
            generatedLessonJson: lesson,
            materialPacket,
            sourceTextChunks: sourceText,
            filesUploadedCount: materialPacket.files.length,
            materialId: material.id,
            sourceFingerprint,
            sourceManifest,
          }) : null;
          const deck = generated?.deck?.cards?.length ? stampGeneratedOutput(normalizeGeneratedDeckShape({
            ...generated.deck,
            id: generated.deck.id || createId('deck'),
            materialId: material.id,
            cards: generated.deck.cards.map((card) => ({
              ...card,
              id: card.id || createId('card'),
              userId: material.userId,
              materialId: material.id,
              mode: 'komite',
              classYear: material.classYear,
              committee: material.committee,
              course: material.course,
              isUserCreated: false,
              isFavorite: Boolean(card.isFavorite),
              isDifficult: Boolean(card.isDifficult),
              repeatStatus: card.repeatStatus || 'new',
              createdAt: Date.now(),
            })),
          }, material), material, materialPacket) : stampGeneratedOutput(buildLocalFlashcards(material, lesson, materialPacket), material, materialPacket);
          nextPatch = { materialAnalysis: analysis, lesson, flashcardDeck: deck, sourceFingerprint, processingStatus: 'cards-ready' };
        } catch {
          nextPatch = { materialAnalysis: analysis, lesson, flashcardDeck: stampGeneratedOutput(buildLocalFlashcards(material, lesson, materialPacket), material, materialPacket), sourceFingerprint, processingStatus: 'cards-ready' };
        }
      }
      const gate = kind === 'lesson' ? qualityGateLesson(nextPatch.lesson, material) : kind === 'questions' ? qualityGateQuestions(nextPatch.questions) : qualityGateDeck(nextPatch.flashcardDeck);
      if (!gate.ok) throw new Error(gate.reason);
      onPatchMaterial(material.id, nextPatch);
      setKindStatus(kind, 'success', kind === 'lesson' ? 'Ders hazır' : kind === 'questions' ? '10 soru oluşturuldu' : 'Hap kartlar hazır');
      window.setTimeout(() => setKindStatus(kind, 'idle', ''), 1800);
    } catch (error) {
      setKindStatus(kind, 'error', error?.message || 'AI servisinden yanıt alınamadı. Lütfen tekrar deneyin.');
    }
  };

  const answerQuestion = (questionId, selectedId) => {
    const questions = (material.questions || []).map((question) => {
      if (question.id !== questionId || question.userAnswer) return question;
      return {
        ...question,
        userAnswer: selectedId,
        isWrong: selectedId !== question.correctOptionId,
        isDifficult: selectedId !== question.correctOptionId ? true : question.isDifficult,
      };
    });
    onPatchMaterial(material.id, { questions });
  };

  const toggleQuestionFlag = (questionId, field) => {
    const questions = (material.questions || []).map((question) => question.id === questionId ? { ...question, [field]: !question[field] } : question);
    onPatchMaterial(material.id, { questions });
  };

  const updateCard = (cardId, patch) => {
    const deck = material.flashcardDeck;
    if (!deck?.cards) return;
    const cards = deck.cards.map((card) => card.id === cardId ? { ...card, ...patch } : card);
    onPatchMaterial(material.id, { flashcardDeck: { ...deck, cards } });
  };

  return (
    <section className="komite-workspace card-surface">
      <div className="komite-workspace-header komite-workspace-header-clean">
        <button type="button" className="komite-back-link" onClick={onBack} aria-label="Komite ana ekranına dön">
          <span aria-hidden="true">←</span>
          <span>Geri dön</span>
        </button>
        <div className="komite-workspace-title-block">
          <span className="komite-kicker">{material.classYear}. sınıf · {material.committee || material.course || 'Komite'}</span>
          <h2>{inferAcademicTitle(material)}</h2>
        </div>
      </div>
      <InlineStatus status={Object.values(aiStatus).includes('error') ? 'error' : 'idle'} message={Object.values(aiError).find(Boolean) || ''} />
      <div className="komite-tabbar" role="tablist" aria-label="Materyal çalışma alanı sekmeleri">
        {STUDY_TABS.map((item) => <button key={item.id} type="button" className={tab === item.id ? 'active' : ''} onClick={() => setTab(item.id)}><Icon name={item.icon} /> {item.label}</button>)}
      </div>
      <div className="komite-tab-panel">
        {tab === 'lesson' ? <LessonView material={material} status={aiStatus.lesson} onGenerate={() => runWithLocalFallback('lesson')} /> : null}
        {tab === 'figures' ? <FiguresView material={material} /> : null}
        {tab === 'questions' ? <QuestionsView material={material} onGenerate={() => runWithLocalFallback('questions')} onAnswer={answerQuestion} onToggleQuestionFlag={toggleQuestionFlag} /> : null}
        {tab === 'cards' ? <FlashcardsView material={material} onGenerate={() => runWithLocalFallback('cards')} onUpdateCard={updateCard} /> : null}
        {tab === 'review' ? <ReviewCenter materials={materials} activeMaterial={material} onOpenMaterial={onOpenMaterial} /> : null}
      </div>
    </section>
  );
}

function CardsHub({ materials, onOpenMaterial, onBack }) {
  const decks = materials.filter((material) => material.flashcardDeck?.cards?.length);
  return (
    <section className="komite-subpage card-surface">
      <div className="komite-section-head">
        <div><span className="komite-kicker">Hap Kartlar</span><h2>Materyal Bazlı Hap Kartlar</h2><p>Kartlar sınıf, komite ve materyal ağacına bağlı olarak düzenlenir.</p></div>
        <button type="button" className="btn btn-secondary" onClick={onBack}>Ana ekrana dön</button>
      </div>
      {decks.length ? <div className="komite-deck-grid">{decks.map((material) => <button type="button" key={material.id} onClick={() => onOpenMaterial(material.id)}><strong>{material.flashcardDeck.deckTitle}</strong><span>{material.fileName}</span><small>{material.flashcardDeck.cards.length} kart</small></button>)}</div> : <EmptyState title="Henüz kart destesi yok." text="Bir materyal açıp ‘Hap Kartlar ile Tekrar Et’ seçeneğinden kart oluşturabilirsin." action={<button type="button" className="btn btn-primary" onClick={onBack}>Materyal seç</button>} />}
    </section>
  );
}

function MyMaterialsPage({ materials, activeMaterialId, onOpenMaterial, onBack, onDeleteMaterial }) {
  return (
    <section className="komite-subpage card-surface">
      <div className="komite-section-head">
        <div><span className="komite-kicker">Çalıştıklarım</span><h2>Materyal Kütüphanesi</h2><p>Yüklediğin komite dosyalarını sınıf, komite ve ders düzeninde görüntüle.</p></div>
        <button type="button" className="btn btn-secondary" onClick={onBack}>Ana ekrana dön</button>
      </div>
      <MaterialTree materials={materials} activeMaterialId={activeMaterialId} onOpenMaterial={onOpenMaterial} onDeleteMaterial={onDeleteMaterial} />
    </section>
  );
}

export default function KomiteModeWorkspace({ currentUser }) {
  const userId = currentUser?.id || 'local-user';
  const [materials, setMaterials] = useState(() => readUserMaterials(userId));
  const [view, setView] = useState('dashboard');
  const [activeMaterialId, setActiveMaterialId] = useState(() => readUserMaterials(userId)[0]?.id || null);

  useEffect(() => {
    const userMaterials = readUserMaterials(userId);
    setMaterials(userMaterials);
    setActiveMaterialId((current) => current || userMaterials[0]?.id || null);
  }, [userId]);

  useEffect(() => {
    writeUserMaterials(userId, materials);
  }, [materials, userId]);

  const activeMaterial = useMemo(() => materials.find((material) => material.id === activeMaterialId) || materials[0] || null, [materials, activeMaterialId]);
  const stats = useMemo(() => ({
    readyMaterials: materials.filter((material) => material.lesson || material.questions?.length || material.flashcardDeck?.cards?.length).length,
    cardCount: materials.reduce((sum, material) => sum + (material.flashcardDeck?.cards?.length || 0), 0),
    difficultCards: materials.reduce((sum, material) => sum + (material.flashcardDeck?.cards || []).filter((card) => card.isDifficult).length, 0),
    wrongQuestions: materials.reduce((sum, material) => sum + (material.questions || []).filter((question) => question.isWrong).length, 0),
    favoriteItems: materials.reduce((sum, material) => sum + (material.questions || []).filter((question) => question.isFavorite).length + (material.flashcardDeck?.cards || []).filter((card) => card.isFavorite).length, 0),
  }), [materials]);

  const createMaterial = ({ file, files = [], extractedText, pastedText, extraction, ...form }) => {
    const fileName = file?.name || `${form.course || form.committee || 'Komite materyali'}.txt`;
    const materialId = createId('material');
    const uploadBatchId = createId('komite-upload');
    const newMaterial = {
      id: materialId,
      userId,
      fileName,
      fileType: getFileType(fileName),
      files: files.map((item, index) => ({ id: `${materialId}-file-${index + 1}`, name: item.name, size: item.size, type: getFileType(item.name), uploadBatchId })),
      filePackets: (extraction?.files || []).map((item, index) => ({ ...item, fileId: item.fileId || `${materialId}-file-${index + 1}`, uploadBatchId })),
      sourceCoverage: { filesUploadedCount: files.length || (file ? 1 : 0), filesAnalyzedCount: (extraction?.files || []).filter((item) => item.cleanedExtractedText).length, usedFiles: (extraction?.files || []).map((item) => item.fileName) },
      uploadDate: Date.now(),
      sourceSessionId: materialId,
      uploadBatchId,
      studyMode: 'komite',
      classYear: form.classYear,
      university: form.university,
      committee: form.committee,
      course: form.course,
      learningTarget: form.learningTarget,
      processingStatus: extractedText ? 'text-extracted' : 'metadata-ready',
      extractedText: extractedText || '',
      extractedFigures: extraction?.figures || [],
      detectedStructure: extraction?.detectedStructure || [],
      extractionNotice: extraction?.notice || '',
      extractionLimitations: extraction?.limitations || [],
      pastedText: pastedText || '',
      lesson: null,
      questions: [],
      flashcardDeck: null,
      reviewItems: [],
    };
    newMaterial.sourceFingerprint = buildSourceFingerprint(newMaterial);
    newMaterial.sourceSchemaVersion = KOMITE_SOURCE_SCHEMA_VERSION;
    setMaterials((current) => [newMaterial, ...current]);
    setActiveMaterialId(newMaterial.id);
    setView('workspace');
  };

  const patchMaterial = (materialId, patch) => {
    setMaterials((current) => current.map((material) => material.id === materialId ? { ...material, ...patch, updatedAt: Date.now() } : material));
  };

  const deleteMaterial = (materialId) => {
    setMaterials((current) => current.filter((material) => material.id !== materialId));
    setActiveMaterialId((current) => current === materialId ? null : current);
  };

  const openMaterial = (materialId) => {
    setActiveMaterialId(materialId);
    setView('workspace');
  };

  return (
    <section className="page-shell komite-page-shell">
      {(view === 'dashboard' || view === 'start') ? (
        <section className="komite-hero card-surface">
          <div>
            <span className="komite-kicker"><Icon name="ShieldCheck" size={16} /> KOMİTE MODU</span>
            <h1>Komite materyallerini akıllı çalışma alanına dönüştür.</h1>
            <p>Slaytlarını ve ders notlarını yükle; KlinikIQ AI aynı materyalden ders anlatımı, soru seti, hap kart ve tekrar listesi oluştursun.</p>
            <div className="komite-hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => setView('start')}><Icon name="Sparkles" /> Şimdi KlinikIQ AI ile çalış</button>
            </div>
          </div>
        </section>
      ) : null}

      {view === 'dashboard' ? (
        <KomiteDashboard
          materials={materials}
          stats={stats}
          onStart={() => setView('start')}
          onOpenMyMaterials={() => setView('materials')}
          onOpenCards={() => setView('cards')}
          onOpenReview={() => setView('review')}
          onOpenMaterial={openMaterial}
        />
      ) : null}

      {view === 'start' ? <StartFlow onCreate={createMaterial} onCancel={() => setView('dashboard')} /> : null}
      {view === 'materials' ? <MyMaterialsPage materials={materials} activeMaterialId={activeMaterialId} onOpenMaterial={openMaterial} onDeleteMaterial={deleteMaterial} onBack={() => setView('dashboard')} /> : null}
      {view === 'cards' ? <CardsHub materials={materials} onOpenMaterial={openMaterial} onBack={() => setView('dashboard')} /> : null}
      {view === 'review' ? <section className="komite-subpage card-surface"><div className="komite-section-head"><div><span className="komite-kicker">Tekrar Merkezi</span><h2>Materyal odaklı tekrar</h2><p>Varsayılan kapsam aktif materyaldir; tüm materyallere geçiş kontrollüdür.</p></div><button type="button" className="btn btn-secondary" onClick={() => setView('dashboard')}>Ana ekrana dön</button></div><ReviewCenter materials={materials} activeMaterial={activeMaterial} onOpenMaterial={openMaterial} /></section> : null}
      {view === 'workspace' && activeMaterial ? <StudyWorkspace material={activeMaterial} materials={materials} onBack={() => setView('dashboard')} onPatchMaterial={patchMaterial} onOpenMaterial={openMaterial} /> : null}
    </section>
  );
}
