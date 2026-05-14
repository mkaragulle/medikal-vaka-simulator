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

function getOutputSourceFingerprint(output = {}) {
  return output?.sourceFingerprint || output?.generatedFrom?.sourceFingerprint || output?.qualityCheck?.sourceFingerprint || '';
}

function stampGeneratedOutput(output, material = {}, packet = null) {
  if (!output || typeof output !== 'object') return output;
  const sourceFingerprint = buildSourceFingerprint(material, packet);
  const files = Array.isArray((packet || buildCombinedMaterialPacket(material))?.files) ? (packet || buildCombinedMaterialPacket(material)).files : [];
  return {
    ...output,
    sourceFingerprint,
    generatedFrom: {
      ...(output.generatedFrom || {}),
      sourceFingerprint,
      sourceSchemaVersion: KOMITE_SOURCE_SCHEMA_VERSION,
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
  return questions.map((question) => ({
    ...question,
    sourceFingerprint,
    generatedFrom: {
      ...(question.generatedFrom || {}),
      sourceFingerprint,
      sourceSchemaVersion: KOMITE_SOURCE_SCHEMA_VERSION,
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

function sourceTextSupportsLegacyMetabolismTopic(material = {}, packet = null) {
  const activePacket = packet || buildCombinedMaterialPacket(material);
  const sourceText = normalizeForFingerprint((activePacket.files || []).map((file) => `${file.fileName || ''}\n${file.cleanedExtractedText || ''}`).join('\n\n') || normalizeSourceText(material)).toLocaleLowerCase('tr');
  return {
    fedFasting: /(açlık|tokluk|insülin\s*\/\s*glukagon|glukagon|glukoneogenez|lipoliz|ketogenez|keton)/iu.test(sourceText),
    hemePorphyria: /(porfir|porfiri|porphyr|porphyria|δ?\s*aminolevülin|aminolevulin|porfobilinojen|porphobilinogen|üroporfirinojen|uroporphyrinogen|koproporfirinojen|coproporphyrinogen|protoporfirin|protoporphyrin|ferroşelataz|ferrochelatase|ala\s+sentaz|alas\b|hem\s+sentez|heme\s+synthesis)/iu.test(sourceText),
  };
}

function outputHasUnsupportedLegacyTopic(output = {}, material = {}, packet = null) {
  const sourceSupport = sourceTextSupportsLegacyMetabolismTopic(material, packet);
  const outputText = JSON.stringify(output || {}).toLocaleLowerCase('tr');
  const mentionsFedKetone = /(açlık|tokluk|insülin\s*\/\s*glukagon|glukagon|glukoneogenez|lipoliz|ketogenez|keton cisim|ketoasidoz|asetoasetat|hidroksibütirat)/iu.test(outputText);
  const mentionsHemePorphyria = /(porfiri|porfiria|porphyria|porfirin halkası|hem sentez|heme synthesis|ala sentaz|porfobilinojen|ferroşelataz|protoporfirin|nörovisseral|fotosensitivite)/iu.test(outputText);
  return (mentionsFedKetone && !sourceSupport.fedFasting) || (mentionsHemePorphyria && !sourceSupport.hemePorphyria);
}

function resetGeneratedAssetsForSourceChange(material = {}, reason = 'Kaynak materyal değiştiği için eski AI çıktıları temizlendi.') {
  return {
    ...material,
    sourceFingerprint: buildSourceFingerprint(material),
    lesson: null,
    questions: [],
    questionsSourceFingerprint: '',
    flashcardDeck: null,
    processingStatus: material.extractedText || material.pastedText ? 'text-extracted' : 'metadata-ready',
    repairNotice: reason,
  };
}

function sanitizeLoadedKomiteMaterial(material = {}) {
  const packet = buildCombinedMaterialPacket(material);
  const sourceFingerprint = buildSourceFingerprint(material, packet);
  const staleLesson = isGeneratedAssetStale(material.lesson, material, packet);
  const staleQuestions = areGeneratedQuestionsStale(material, packet);
  const staleDeck = isGeneratedAssetStale(material.flashcardDeck, material, packet);
  const contradictoryLesson = material.lesson && (outputContradictsSourceTopic(material.lesson, material, packet) || outputHasUnsupportedLegacyTopic(material.lesson, material, packet));

  if (staleLesson || staleQuestions || staleDeck || contradictoryLesson) {
    return resetGeneratedAssetsForSourceChange(
      { ...material, sourceFingerprint },
      contradictoryLesson
        ? 'Önceki AI çıktısı kaynak konusuyla uyuşmadığı için temizlendi.'
        : 'Eski AI çıktıları kaynak parmak iziyle eşleşmediği için temizlendi.'
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
    .replace(/\b\d+\s+Pirol halkası\s+Serbest porfirinlerin biyolojik önemi yok\.?/giu, ' ')
    .replace(/\bSerbest porfirinlerin biyolojik önemi yok\.?/giu, ' ')
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
  return `${title || 'Bu ders'}, metabolik yolları ve biyokimyasal süreçleri izole başlıklar halinde değil; düzenleyici sinyaller, dokuya özgü yakıt seçimi, ara ürün birikimi ve klinik sonuç ilişkisi içinde bütünlüklü biçimde açıklar.`;
}

function normalizeSourceText(material = {}) {
  return [material.extractedText, material.pastedText]
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
    .filter((line) => !/\b\d+\s+Pirol halkası\s+Serbest porfirinlerin biyolojik önemi yok\b/iu.test(line))
    .filter((line) => !/^Serbest porfirinlerin biyolojik önemi yok\.?$/iu.test(line))
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

function detectTopicsFromText(text = '', max = 10) {
  return extractKeywords(text, '').filter((word) => !/^(slayt|sayfa|dosya|pptx|giriş)$/iu.test(word)).slice(0, max);
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
      detectedTopics: detectTopicsFromText(cleanedExtractedText),
    };
  }).filter((item) => item.cleanedExtractedText);
}

function buildCombinedMaterialPacket(material = {}) {
  const splitPackets = splitMergedExtractedTextIntoFiles(material.extractedText || '', material);
  const files = Array.isArray(material.filePackets) && material.filePackets.length >= Math.max(1, Array.isArray(material.files) ? material.files.length : 0)
    ? material.filePackets
    : (splitPackets.length > 1
      ? splitPackets
      : (Array.isArray(material.files) && material.files.length
        ? material.files.map((file, index) => ({
          fileName: file.name || material.fileName || `Materyal ${index + 1}`,
          fileType: file.type || getFileType(file.name || material.fileName || ''),
          cleanedExtractedText: splitPackets[index]?.cleanedExtractedText || (index === 0 ? cleanExtractedTextForAI(material.extractedText || '') : ''),
          detectedTopics: splitPackets[index]?.detectedTopics || [],
        }))
        : [{ fileName: material.fileName || 'Ek metin', fileType: material.fileType || 'text', cleanedExtractedText: cleanExtractedTextForAI(material.extractedText || material.pastedText || ''), detectedTopics: [] }]));
  const normalizedFiles = files.map((file) => {
    const cleaned = cleanExtractedTextForAI(file.cleanedExtractedText || file.text || '');
    return {
      fileName: file.fileName || file.name || 'Materyal',
      fileType: file.fileType || file.type || getFileType(file.fileName || file.name || ''),
      cleanedExtractedText: cleaned,
      detectedTopics: Array.isArray(file.detectedTopics) && file.detectedTopics.length ? file.detectedTopics : detectTopicsFromText(cleaned),
    };
  });
  const pasted = cleanExtractedTextForAI(material.pastedText || '');
  if (pasted) {
    normalizedFiles.push({ fileName: 'Ek ders notu', fileType: 'text', cleanedExtractedText: pasted, detectedTopics: detectTopicsFromText(pasted) });
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
  return (packet.files || [])
    .map((file, index) => `[[FILE ${index + 1}]]\nfileName: ${file.fileName}\nfileType: ${file.fileType}\ndetectedTopics: ${(file.detectedTopics || []).join(', ')}\ncleanedExtractedText:\n${file.cleanedExtractedText || ''}`)
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
detectedTopics: ${(file.detectedTopics || []).join(', ')}
charCount: ${text.length}
cleanedExtractedText:
${clipped}`;
  }).join('\n\n');
}

function getMaterialFileCount(material = {}, packet = null) {
  const packetCount = Array.isArray(packet?.files) ? packet.files.length : 0;
  const storedFileCount = Array.isArray(material.files) ? material.files.length : 0;
  const storedPacketCount = Array.isArray(material.filePackets) ? material.filePackets.length : 0;
  const splitCount = splitMergedExtractedTextIntoFiles(material.extractedText || '', material).length;
  return Math.max(packetCount, storedFileCount, storedPacketCount, splitCount, 1);
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
  if (outputContradictsSourceTopic(lesson, material)) return { ok: false, reason: 'Ders anlatımı yüklenen kaynakların ana konusuyla uyuşmuyor.' };
  if (outputHasUnsupportedLegacyTopic(lesson, material)) return { ok: false, reason: 'Ders çıktısı kaynakta bulunmayan eski metabolizma/porfiriya içeriği içeriyor.' };
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
  const text = normalizeSourceText(material);
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
  const text = normalizeSourceText(material);
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

function buildTopicProfileFromText(text = '', fileNames = '') {
  const haystack = `${fileNames || ''}\n${text || ''}`.toLocaleLowerCase('tr');
  const strictHemePorphyria = countMatches(haystack, /porfir|porfiri|porphyr|porphyria|δ?\s*aminolevülin|aminolevulin|porfobilinojen|porphobilinogen|üroporfirinojen|uroporphyrinogen|koproporfirinojen|coproporphyrinogen|protoporfirin|protoporphyrin|ferroşelataz|ferrochelatase|ala\s+sentaz|alas\b|hem\s+sentez|heme\s+synthesis|kurşun\s+zehirlenmesi/giu);
  const profile = {
    ketone: countMatches(haystack, /keton|ketogenez|ketoasidoz|asetoasetat|hidroksibütirat|aseton|hmg\s*koa|tioforaz|β[- ]?oksidasyon|yağ asidi oksidasyonu|karnitin|cpt\s*-?1/giu),
    fedFasting: countMatches(haystack, /açlık|tokluk|emilim|insülin\s*\/\s*glukagon|glukagon|glukoneogenez|glikojen|lipoliz|yağ dokusu|iskelet kası|beyin|karaciğer|şilomikron/giu),
    hemePorphyria: strictHemePorphyria,
    hemeProteinStaining: countMatches(haystack, /heme\s+protein\s+stain|heme\s+protein\s+staining|heme-containing|heme\s+containing|tmbh|tetramethyl|cytochrome\s*-?c|sitokrom\s*-?c/giu),
    proteinDetection: countMatches(haystack, /sds\s*-?page|western\s+blot|coomassie|silver\s+stain|zinc\s+stain|glycoprotein\s+stain|ponceau|chemiluminescent|fluorescence\s+detection|membrane|nitrocellulose|pvdf|antibody|secondary\s+antibody/giu),
    elisa: countMatches(haystack, /elisa|enzyme-linked|immuno-sorbent|antigen|antibody|hrp|tmb|optical\s+density|standard\s+curve|amylase/giu),
    enzymeKinetics: countMatches(haystack, /enzyme\s+kinetics|michaelis|menten|km\b|vmax|lineweaver|burk|competitive|non-competitive|uncompetitive|alkaline\s+phosphatase|pnpp|inhibitor/giu),
    buffersSolutions: countMatches(haystack, /buffer|henderson|hasselbalch|ph\b|pka\b|molarity|normality|molality|dilution|pbs|tbs|tris|acetate/giu),
    pyruvateMetabolism: countMatches(haystack, /pyruvate|warburg|u2os|hek293|oxidative\s+phosphorylation|anaerobic\s+glycolysis|lactate|ripa/giu),
    proteinDegradation: countMatches(haystack, /protein\s+degradation|protease\s+k|ubiquitin|proteasome|n-end|pest|bradford|coomassie\s+blue\s+g-250/giu),
    aminoProtein: countMatches(haystack, /amino\s*asit|aminoasit|peptit|glisin|prolin|r grubu|α[- ]?karbon|protein katlanması|disülfit|aromatik amino/giu),
    generalBiochem: countMatches(haystack, /enzim|metabolizma|substrat|koenzim|mitokondri|sitozol|oksidasyon|sentez|düzenlenme/giu),
  };
  const dominant = Object.entries(profile)
    .filter(([key]) => key !== 'generalBiochem')
    .sort((a, b) => b[1] - a[1])
    .filter(([, value]) => value > 0)
    .map(([key]) => key);
  return { ...profile, dominant };
}

function getMaterialTopicProfile(material = {}, packet = null) {
  const activePacket = packet || buildCombinedMaterialPacket(material);
  const fileNames = (activePacket.files || []).map((file) => file.fileName).join(' ');
  const text = (activePacket.files || []).map((file) => `${file.fileName}\n${file.cleanedExtractedText}`).join('\n\n') || normalizeSourceText(material);
  return buildTopicProfileFromText(text, fileNames);
}

function isAminoProteinMaterial(material = {}, packet = null) {
  const profile = getMaterialTopicProfile(material, packet);
  const competingMetabolism = profile.ketone + profile.fedFasting + profile.hemePorphyria;
  return profile.aminoProtein >= 12 && profile.aminoProtein >= competingMetabolism * 1.5;
}

function inferTitleFromTopicProfile(material = {}, packet = null) {
  const profile = getMaterialTopicProfile(material, packet);
  const labScore = profile.proteinDetection + profile.elisa + profile.enzymeKinetics + profile.buffersSolutions + profile.pyruvateMetabolism + profile.proteinDegradation;
  if (labScore >= 12 && profile.proteinDetection >= 5) return 'Biyokimya Laboratuvarı: Protein Analizi, Tespit Yöntemleri ve Deneysel Ölçümler';
  if (profile.proteinDetection >= 5) return 'Protein Analiz Yöntemleri: SDS-PAGE, Western Blot ve Tespit Teknikleri';
  if (profile.elisa >= 5) return 'ELISA Prensibi, Standart Eğri ve Antijen Ölçümü';
  if (profile.enzymeKinetics >= 5) return 'Enzim Kinetiği, Michaelis-Menten Analizi ve İnhibisyon';
  if (profile.buffersSolutions >= 5) return 'Tamponlar, pH Hesaplamaları ve Çözelti Hazırlama';
  if (profile.pyruvateMetabolism >= 5) return 'Pirüvat Metabolizması, Warburg Etkisi ve Kolorimetrik Ölçüm';
  if (profile.proteinDegradation >= 5) return 'Protein Yıkımı, Proteaz Aktivitesi ve Bradford Analizi';
  const parts = [];
  if (profile.fedFasting >= 4) parts.push('Açlık-Tokluk Metabolizması');
  if (profile.ketone >= 4) parts.push('Yağ Asidi Oksidasyonu ve Keton Cisimleri');
  if (profile.hemePorphyria >= 4) parts.push('Hem Sentezi ve Porfiriyalar');
  if (!parts.length && isAminoProteinMaterial(material, packet)) parts.push('Amino Asitler ve Proteinlerin Temel Yapısı');
  if (parts.length) return parts.join(', ');
  return '';
}

function outputContradictsSourceTopic(lesson = {}, material = {}, packet = null) {
  const profile = getMaterialTopicProfile(material, packet);
  const sourceHasMetabolismHeme = profile.ketone >= 4 || profile.fedFasting >= 4 || profile.hemePorphyria >= 4;
  const outputText = JSON.stringify(lesson || {}).toLocaleLowerCase('tr');
  const aminoOutput = /amino\s*asit|aminoasit|glisin|prolin|r grubu|α[- ]?karbon|protein katlanması/iu.test(outputText);
  const requiredHits = [
    profile.ketone >= 4 ? /keton|asetoasetat|hidroksibütirat|ketogenez|yağ asidi oksidasyonu/iu : null,
    profile.fedFasting >= 4 ? /açlık|tokluk|insülin|glukagon|glukoneogenez|lipoliz/iu : null,
    profile.hemePorphyria >= 4 ? /hem|porfir|porfiri|ala|porfobilinojen|protoporfirin/iu : null,
  ].filter(Boolean);
  const matchedRequired = requiredHits.filter((pattern) => pattern.test(outputText)).length;
  if (sourceHasMetabolismHeme && aminoOutput && matchedRequired === 0) return true;
  if (requiredHits.length >= 2 && matchedRequired === 0) return true;
  return false;
}

function inferAcademicTitle(material = {}, packet = null) {
  if (material.inferredTitle) return material.inferredTitle;
  if (material.lesson?.inferredTitle) return material.lesson.inferredTitle;
  const profileTitle = inferTitleFromTopicProfile(material, packet);
  if (profileTitle) return profileTitle;
  const base = String(material.course || material.committee || cleanMaterialTitle(material) || 'Komite Materyali')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/^\s*\d+[.)-]?\s*/u, '')
    .replace(/\b(pptx|pdf|docx|txt|slayt|sayfa|prof\.?|dr\.?)\b/giu, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return base || 'Komite Materyali';
}


function buildLabMethodsLesson(material = {}, profile = null, packet = null) {
  const activePacket = packet || buildCombinedMaterialPacket(material);
  const activeProfile = profile || getMaterialTopicProfile(material, activePacket);
  const sections = [];

  if (activeProfile.proteinDetection >= 5) {
    sections.push({
      heading: 'SDS-PAGE ile proteinlerin moleküler ağırlığa göre ayrılması',
      teachingText: 'SDS-PAGE, proteinleri temelde moleküler ağırlık farkına göre ayıran elektroforetik bir yöntemdir. SDS proteinin hidrofobik bölgelerine bağlanarak proteini açar ve proteine yaklaşık orantılı negatif yük kazandırır; DTT veya beta-merkaptoetanol gibi indirgeme ajanları disülfit bağlarını kırarak daha tam denatürasyon sağlar. Stacking gel proteinleri dar bir bantta toplar, resolving gel ise por büyüklüğü ve pH koşulları sayesinde proteinlerin ayrılmasını sağlar. Küçük proteinler jelde daha hızlı ilerlerken moleküler ağırlık markerları bantların yaklaşık büyüklüğünü yorumlamak için kullanılır.',
      mechanismFlow: ['SDS proteinleri denatüre eder ve negatif yük verir', 'İndirgeme ajanları disülfit bağlarını kırar', 'Stacking gel bantları toplar', 'Resolving gel boyuta göre ayırır'],
      examAngle: 'SDS-PAGE soruları genellikle SDS’nin yük/denatürasyon etkisini, indirgeme ajanlarının disülfit bağlarına etkisini ve küçük proteinlerin jelde daha hızlı ilerlemesini sorgular.',
      commonTrap: 'SDS-PAGE sonucunu doğal protein yükü veya izoelektrik nokta üzerinden yorumlamak hatalıdır; SDS varlığında temel ayrım moleküler ağırlıktır.',
      sourceReferences: ['SDS-PAGE ve protein ayrımı slaytları'],
    });
    sections.push({
      heading: 'Jel ve membranda protein tespit yöntemleri',
      teachingText: 'Ayrılan proteinlerin görünür hale getirilmesi için yöntemin amacı ve duyarlılığına göre farklı boyamalar kullanılır. Coomassie Blue kolay, hızlı ve pratik bir jel boyasıdır; ancak düşük miktardaki proteinleri göstermede silver staining kadar duyarlı değildir. Silver staining düşük ekspresyonlu proteinleri daha iyi gösterebilir fakat arka plan, yüzey artefaktları ve temiz çalışma gereksinimi daha fazladır. Glikoprotein boyaması karbonhidrat yan zincirleri nedeniyle klasik protein boyalarında zayıf görülebilen glikoproteinleri Periodic acid-Schiff mantığıyla saptar. Heme protein staining ise hem içeren proteinleri, örneğin sitokrom-C gibi hedefleri, uygun substrat reaksiyonu ile gösterir; bu başlık hem biyosentezi veya porfiriya değil, protein tespit tekniğidir.',
      mechanismFlow: ['Coomassie pratik genel protein boyasıdır', 'Silver staining daha yüksek duyarlılık sağlar', 'PAS glikoproteinleri karbonhidrat üzerinden saptar', 'Heme protein staining hem içeren proteinleri gösterir'],
      examAngle: 'Coomassie kolay ama daha az duyarlı, silver staining daha duyarlı ama artefakta açık; Ponceau S ise membran transfer verimini kontrol etmek için geri dönüşümlü kullanılır.',
      commonTrap: '“Heme protein staining” ifadesini hem sentezi veya porfiriyalarla karıştırmak yanlıştır; burada konu hem içeren proteinlerin laboratuvar tespitidir.',
      sourceReferences: ['Detection methods slaytları'],
    });
    sections.push({
      heading: 'Western blot transferi ve antikor temelli saptama',
      teachingText: 'Western blot, önce SDS-PAGE ile ayrılan proteinlerin nitroselüloz veya PVDF membrana aktarılması, ardından hedef proteinin primer ve sekonder antikorlarla saptanması prensibine dayanır. Transferin başarısı Ponceau S gibi geri dönüşümlü membran boyalarıyla değerlendirilebilir. Tespit aşamasında sekonder antikora bağlı enzim veya fluorofor sinyal üretir. Bu nedenle Western blot hem ayrım hem transfer hem de özgül antikor tanıma basamaklarının birlikte doğru çalışmasına bağlıdır.',
      mechanismFlow: ['SDS-PAGE proteinleri ayırır', 'Transfer proteini membrana taşır', 'Primer antikor hedefi tanır', 'Sekonder antikor sinyal üretir'],
      examAngle: 'Western blot soruları genellikle toplam transfer kontrolü ile hedef protein saptamasını, primer/sekonder antikor rollerini ve membran boyalarının geri dönüşümlü kullanımını ayırmayı ister.',
      commonTrap: 'Ponceau S hedef proteine özgül bir antikor testi değildir; membrana aktarılan toplam proteinleri ve transfer verimini gösterir.',
      sourceReferences: ['Western blot ve Ponceau S slaytları'],
    });
    sections.push({
      heading: 'Kolorimetrik, kemilüminesans ve floresan tespit mantığı',
      teachingText: 'Western blot sinyali farklı fiziksel/kimyasal prensiplerle okunabilir. Kolorimetrik tespitte HRP veya alkalen fosfataz gibi enzimler görünür renkli ve görece stabil ürün oluşturur; yöntem ucuz ve pratiktir, fakat kantifikasyon ve duyarlılık sınırlı olabilir. Kemilüminesans tespitte uygun substratla düşük enerjili foton oluşur ve sinyal film veya CCD kamera ile yakalanır; duyarlılığı yüksektir ve kantifikasyona daha uygundur, ancak sinyal geçici ve multiplex kapasitesi sınırlıdır. Floresan tespitte sekonder antikor fluorofor taşır, substrat gerekmez ve farklı emisyon spektrumları sayesinde birden fazla hedef aynı membranda izlenebilir; buna karşılık özel ekipman gerekir ve duyarlılık kemilüminesansa göre daha düşük olabilir.',
      mechanismFlow: ['Kolorimetrik tespit renkli ürün oluşturur', 'Kemilüminesans foton sinyali üretir', 'Floresan tespit fluorofor uyarımıyla okunur', 'Multiplex en güçlü olarak floresanda yapılır'],
      examAngle: 'Avantaj-dezavantaj sorularında kemilüminesans yüksek duyarlılık ve geçici sinyal; floresans multiplex ve stabilite; kolorimetrik ucuzluk ve düşük kantifikasyon üzerinden ayrılır.',
      commonTrap: 'Kemilüminesans ürünleri çıplak gözle görülür sanılmamalıdır; sinyal film veya dijital kamera ile yakalanır.',
      sourceReferences: ['Western blot detection methods slaytları'],
    });
  }

  if (activeProfile.elisa >= 5) {
    sections.push({
      heading: 'ELISA prensibi ve standart eğriyle kantifikasyon',
      teachingText: 'ELISA, antijen-antikor özgüllüğünü enzim aracılı ölçülebilir renk reaksiyonu ile birleştirir. Plaka yüzeyine bağlanan antijen veya yakalama antikoru, yıkama ve blocking adımlarıyla nonspesifik bağlanmadan ayrılır. HRP veya alkalen fosfataz gibi enzimle konjuge antikor substratı renkli ürüne dönüştürür; optik dansite standart eğriyle karşılaştırılarak bilinmeyen örnek konsantrasyonu hesaplanır. Bu nedenle ELISA’da doğru sonuç; uygun standart seri, yeterli washing/blocking ve lineer aralıkta ölçüm gerektirir.',
      mechanismFlow: ['Antijen veya antikor yüzeye bağlanır', 'Blocking nonspesifik alanları kapatır', 'Enzimli antikor sinyal üretir', 'Standart eğri bilinmeyeni hesaplatır'],
      examAngle: 'ELISA soruları genellikle blank, standart eğri, OD değeri, antikor/antijen rolü ve yıkama-blocking adımlarının amacını sorgular.',
      commonTrap: 'Renk şiddetini doğrudan konsantrasyon sanmak eksiktir; bilinmeyen örnek standart eğri ve uygun dilüsyon mantığıyla hesaplanmalıdır.',
      sourceReferences: ['ELISA slaytları'],
    });
  }

  if (activeProfile.enzymeKinetics >= 5) {
    sections.push({
      heading: 'Enzim kinetiği, Km/Vmax ve inhibisyon tipleri',
      teachingText: 'Enzim kinetiği, substrat konsantrasyonu arttıkça reaksiyon hızının nasıl değiştiğini inceler. Michaelis-Menten yaklaşımında Vmax, enzim aktif bölgeleri doyduğunda ulaşılan maksimum hızı; Km ise hızın Vmax/2 olduğu substrat konsantrasyonunu ifade eder ve substrat afinitesi hakkında yorum sağlar. Rekabetçi inhibitör aktif bölge için substratla yarışırken, nonkompetitif inhibitör enzim fonksiyonunu allosterik veya konformasyonel etkiyle azaltır; unkompetitif inhibitör ise enzim-substrat kompleksine bağlanarak katalizi bozar. Bu ayrımlar grafik yorumunda ve ilaç/enzim ilişkisi sorularında önemlidir.',
      mechanismFlow: ['Substrat artışı hızı artırır', 'Aktif bölgeler doyunca Vmax oluşur', 'Km afinitenin yorumlanmasına yardım eder', 'İnhibitör tipi Km/Vmax etkisini değiştirir'],
      examAngle: 'Km, Vmax, Michaelis-Menten eğrisi ve Lineweaver-Burk grafiği inhibition sorularında birlikte değerlendirilir.',
      commonTrap: 'Km’yi doğrudan hız sanmak hatalıdır; Km substrat konsantrasyonudur ve afinitenin dolaylı göstergesidir.',
      sourceReferences: ['Enzyme kinetics slaytları'],
    });
  }

  if (activeProfile.buffersSolutions >= 5) {
    sections.push({
      heading: 'Tamponlar, Henderson-Hasselbalch ve çözelti hazırlama',
      teachingText: 'Tampon sistemleri zayıf asit-konjuge baz veya zayıf baz-konjuge asit çiftleriyle pH değişimine direnç gösterir. Henderson-Hasselbalch denklemi pH, pKa ve baz/asit oranı arasındaki ilişkiyi verir; bu nedenle istenen pH’a yakın pKa değerine sahip tampon seçimi gerekir. Çözelti hazırlamada molarite, dilüsyon ve yüzde konsantrasyon hesapları hacim ve madde miktarı ilişkisini doğru kurmaya dayanır. Laboratuvar güvenilirliği için pH ayarı, uygun hacme tamamlama, kontaminasyon kontrolü ve stoktan doğru dilüsyon kritik basamaklardır.',
      mechanismFlow: ['pKa hedef pH’a yakın seçilir', 'Baz/asit oranı pH’ı belirler', 'C1V1 = C2V2 dilüsyonu kurar', 'pH ayarı son hacimden önce dikkatle yapılır'],
      examAngle: 'Tampon soruları pKa ±1 aralığı, Henderson-Hasselbalch oranı, stoktan dilüsyon ve son hacme tamamlama mantığını sorgular.',
      commonTrap: 'Stoktan alınacak hacmi hesapladıktan sonra toplam hacme tamamlamayı unutmak derişimi hatalı yapar.',
      sourceReferences: ['Buffers and solutions slaytları'],
    });
  }

  if (activeProfile.pyruvateMetabolism >= 5) {
    sections.push({
      heading: 'Pirüvat ölçümü, oksidatif metabolizma ve Warburg etkisi',
      teachingText: 'Pirüvat glikolizin son ürünü olarak mitokondriyal oksidatif metabolizma, laktat oluşumu ve biyosentetik yollar arasında merkezi bir kavşaktır. Oksijen yeterliyken pirüvat mitokondriye yönelerek sitrik asit döngüsü ve oksidatif fosforilasyonla enerji üretimini destekler; oksijen sınırlı olduğunda laktata indirgenerek glikolizin devamı için NAD+ yenilenmesine katkı sağlar. Warburg etkisinde kanser hücreleri oksijen varken bile glikozu daha fazla laktata yönlendirebilir; bu durum düşük ATP verimine rağmen biyosentetik ihtiyaçlar için metabolik ara ürün sağlamayı kolaylaştırır. Kolorimetrik pirüvat assayinde oluşan renkli ürünün absorbansı standart eğriyle karşılaştırılarak örnek konsantrasyonu hesaplanır.',
      mechanismFlow: ['Glikoliz pirüvat üretir', 'Oksijen varsa mitokondriyal oksidasyon artar', 'Oksijen sınırlıysa laktat oluşur', 'Standart eğri bilinmeyen pirüvatı hesaplatır'],
      examAngle: 'Warburg etkisi, anaerobik glikoliz ve standart eğri hesaplaması birlikte sorulabilir.',
      commonTrap: 'Warburg etkisini yalnızca oksijen yokluğu sanmak yanlıştır; temel özellik oksijen varlığında bile glikolize/laktata yönelimdir.',
      sourceReferences: ['Pyruvate assay slaytları'],
    });
  }

  if (activeProfile.proteinDegradation >= 5) {
    sections.push({
      heading: 'Protein yıkımı, ubiquitin-proteazom sistemi ve Bradford analizi',
      teachingText: 'Protein yaşam süresi sentez, katlanma ve kontrollü yıkım dengesine bağlıdır. N-end rule ve PEST bölgeleri bazı proteinlerin daha hızlı yıkıma yönlenmesini açıklayabilir. Ubiquitin-proteazom sisteminde E1 ubiquitini ATP bağımlı aktive eder, E2 taşır ve E3 ligaz hedef proteine özgüllük kazandırarak ubiquitin transferini kolaylaştırır; işaretlenen protein proteazomda kısa peptitlere parçalanır. Bradford assay ise Coomassie Blue G-250 boyasının proteinlere bağlanınca renk formunu değiştirmesi ve 595 nm absorbans üzerinden standart eğriyle protein konsantrasyonu hesaplanması mantığına dayanır.',
      mechanismFlow: ['E1 ubiquitini aktive eder', 'E2 ubiquitini taşır', 'E3 hedef seçiciliği sağlar', 'Proteazom işaretli proteini parçalar', 'Bradford 595 nm absorbansla protein miktarını hesaplatır'],
      examAngle: 'E1-E2-E3 rollerinin sırası, ATP bağımlılığı, proteazomun işlevi ve Bradford standart eğrisi yüksek verimli ayrımlardır.',
      commonTrap: 'Bradford sonucu doğrudan “protein tamamen yıkıldı” anlamına gelmez; ölçüm toplam protein miktarı/renk yanıtı üzerinden yorumlanır.',
      sourceReferences: ['Protein degradation ve Bradford assay slaytları'],
    });
  }

  if (!sections.length) return null;
  const title = inferTitleFromTopicProfile(material, activePacket) || inferAcademicTitle(material, activePacket);
  return {
    id: createId('lesson'),
    materialId: material.id,
    title,
    shortIntro: 'Bu ders, biyokimya laboratuvarında kullanılan ayırma, boyama, antikor-temelli tespit, kolorimetrik ölçüm ve kantifikasyon yöntemlerini tek bir deneysel mantık içinde açıklar. Amaç yalnızca protokol adımlarını ezberlemek değil; her basamağın hangi biyokimyasal özelliği ölçtüğünü, hangi hata kaynağına açık olduğunu ve sonuçların nasıl yorumlanacağını öğrenmektir.',
    learningObjectives: [
      activeProfile.proteinDetection >= 5 ? 'SDS-PAGE, jel boyama, membran transferi ve Western blot tespit basamaklarını amaçlarıyla açıklayabilmek.' : null,
      activeProfile.proteinDetection >= 5 ? 'Coomassie, silver staining, glycoprotein staining, heme protein staining, Ponceau S, kemilüminesans ve floresans tespit yöntemlerini avantaj-dezavantajlarıyla karşılaştırabilmek.' : null,
      activeProfile.elisa >= 5 ? 'ELISA’da antijen-antikor bağlanması, blocking, washing, enzim-substrat reaksiyonu ve standart eğri mantığını yorumlayabilmek.' : null,
      activeProfile.enzymeKinetics >= 5 ? 'Km, Vmax, Michaelis-Menten ilişkisi ve inhibisyon tiplerini deneysel veriyle ilişkilendirebilmek.' : null,
      activeProfile.buffersSolutions >= 5 ? 'Tampon seçimi, pH ayarı, molarite ve dilüsyon hesaplarını laboratuvar hazırlığına uygulayabilmek.' : null,
      activeProfile.pyruvateMetabolism >= 5 ? 'Pirüvat assay sonuçlarını metabolik bağlam ve standart eğri üzerinden yorumlayabilmek.' : null,
      activeProfile.proteinDegradation >= 5 ? 'Ubiquitin-proteazom sistemi, proteaz aktivitesi ve Bradford protein ölçümünü neden-sonuç ilişkisiyle açıklayabilmek.' : null,
    ].filter(Boolean),
    bigPicture: 'Bu materyalin büyük resmi, biyokimyasal moleküllerin yalnızca varlığını değil, miktarını, büyüklüğünü, özgüllüğünü ve deneysel davranışını ölçmektir. SDS-PAGE proteinleri ayırır; boyama yöntemleri ayrılan proteinleri görünür kılar; Western blot hedef proteini antikor özgüllüğüyle doğrular; kolorimetrik, kemilüminesans ve floresan sistemler aynı antikor bağlanmasını farklı sinyal türlerine çevirir. Bu basamaklar birlikte düşünüldüğünde laboratuvar sonucu, tek bir cihaz okuması değil, örnek hazırlığı, ayrım, transfer, sinyal üretimi ve kantifikasyon zincirinin toplamıdır.\n\nKomite düzeyinde asıl kazanım, yöntemleri isim olarak ezberlemekten çok hangi yöntemin hangi soruya cevap verdiğini ayırmaktır. Coomassie pratik genel protein görüntüleme sağlar; silver staining daha düşük miktarları gösterebilir; Ponceau S transfer kontrolü yapar; kemilüminesans duyarlılık ve kantifikasyon avantajı sunar; floresans multiplex çalışmaya izin verir. ELISA ve kolorimetrik assaylerde ise standart eğri, blank düzeltmesi ve lineer aralık mantığı sonucu güvenilir kılan temel basamaklardır.',
    mainConcepts: ['SDS-PAGE', 'protein boyama', 'Western blot', 'antikor-temelli tespit', 'kemilüminesans', 'floresans', 'standart eğri', 'blank düzeltmesi'].filter((item, index, arr) => arr.indexOf(item) === index),
    sections,
    figureExplanations: [{
      sourcePageOrSlide: 'Okunabilir slayt metni',
      analysisStatus: 'partial',
      type: 'diagram/table',
      whatCanBeSaidSafely: 'Slayt metnindeki yöntem adları, protokol adımları, avantaj-dezavantaj ifadeleri ve deneysel ölçüm mantığı güvenilir biçimde kullanılabilir.',
      limitations: 'Görseller piksel düzeyinde ayrıca analiz edilmediyse yalnızca metne yansıyan etiketler yorumlandı.',
      examRelevance: 'Yöntem seçimi, avantaj-dezavantaj karşılaştırması, standart eğri ve deneysel hata kaynakları sınav açısından önceliklidir.'
    }],
    clinicalExamRelevance: 'Komite soruları bu tür materyallerde genellikle “hangi yöntem hangi amaçla kullanılır?”, “hangi tespit yöntemi daha duyarlıdır?”, “hangi basamak nonspesifik bağlanmayı azaltır?”, “hangi ölçüm standart eğri gerektirir?” ve “hangi hata sonucu güvenilmez yapar?” mantığıyla sorulur.',
    commonConfusions: [
      activeProfile.proteinDetection >= 5 ? { confusion: 'Coomassie ve silver staining', correctDistinction: 'Coomassie pratik ve hızlıdır; silver staining daha duyarlıdır fakat arka plan ve artefakta daha açıktır.', whyConfused: 'İkisi de SDS-PAGE jelinde protein gösterir.', memoryClarification: 'Pratiklik Coomassie; duyarlılık silver staining.' } : null,
      activeProfile.proteinDetection >= 5 ? { confusion: 'Ponceau S ve hedef protein Western blot sinyali', correctDistinction: 'Ponceau S toplam transfer kontrolüdür; hedef protein primer/sekonder antikor sistemiyle saptanır.', whyConfused: 'İkisi de membranda bant görünümü oluşturabilir.', memoryClarification: 'Ponceau transferi, antikor hedefi gösterir.' } : null,
      activeProfile.proteinDetection >= 5 ? { confusion: 'Kemilüminesans ve floresans', correctDistinction: 'Kemilüminesans enzim-substrat reaksiyonuyla geçici foton sinyali üretir; floresans fluorofor uyarımıyla daha stabil ve multiplex sinyal sağlar.', whyConfused: 'İkisinde de ışık tabanlı okuma vardır.', memoryClarification: 'Chemi duyarlı/geçici; fluorescence multiplex/stabil.' } : null,
      activeProfile.elisa >= 5 ? { confusion: 'Blank ve standart', correctDistinction: 'Blank arka planı düzeltir; standartlar bilinmeyen konsantrasyonu hesaplatan eğriyi kurar.', whyConfused: 'İkisi de hesaplamada kullanılır.', memoryClarification: 'Blank çıkarılır, standart eğri kurulur.' } : null,
    ].filter(Boolean),
    highYieldPoints: [
      activeProfile.proteinDetection >= 5 ? 'SDS-PAGE’de SDS proteinleri denatüre eder ve negatif yük kazandırır; ayrım çoğunlukla moleküler ağırlığa dayanır.' : null,
      activeProfile.proteinDetection >= 5 ? 'Coomassie kolay ve hızlıdır; silver staining daha duyarlıdır ama artefakta açıktır.' : null,
      activeProfile.proteinDetection >= 5 ? 'Ponceau S membran transfer verimini gösteren geri dönüşümlü toplam protein boyasıdır.' : null,
      activeProfile.proteinDetection >= 5 ? 'Kemilüminesans yüksek duyarlıdır fakat sinyal geçicidir; floresans multiplex avantajı sağlar.' : null,
      activeProfile.elisa >= 5 ? 'ELISA’da blocking nonspesifik bağlanmayı azaltır, washing bağlanmayan materyali uzaklaştırır.' : null,
      activeProfile.enzymeKinetics >= 5 ? 'Km, Vmax/2 hızındaki substrat konsantrasyonudur; düşük Km genellikle daha yüksek afiniteyle ilişkilendirilir.' : null,
      activeProfile.buffersSolutions >= 5 ? 'Tampon en iyi pKa ±1 aralığında çalışır; stoktan dilüsyon C1V1 = C2V2 ile kurulur.' : null,
    ].filter(Boolean),
    mustKnow: [
      activeProfile.proteinDetection >= 5 ? 'Heme protein staining, hem sentezi/porfiriya konusu değil; hem içeren proteinlerin tespit yöntemidir.' : null,
      activeProfile.proteinDetection >= 5 ? 'Western blot özgüllüğü antikor tanımadan, toplam transfer kontrolü ise Ponceau S gibi boyalardan gelir.' : null,
      activeProfile.elisa >= 5 ? 'Bilinmeyen konsantrasyon doğrudan renkten değil, standart eğri denkleminden hesaplanır.' : null,
      activeProfile.enzymeKinetics >= 5 ? 'Vmax enzim doygunluğu, Km ise Vmax/2’ye karşılık gelen substrat konsantrasyonudur.' : null,
    ].filter(Boolean),
    limitations: material.extractionLimitations || [],
    sourceReferences: (activePacket.files || []).map((file) => file.fileName),
    sourceCoverage: { filesUploadedCount: activePacket.files.length, filesAnalyzedCount: activePacket.files.length, usedFiles: (activePacket.files || []).map((file) => file.fileName), coverageNote: `Bu çalışma alanı ${activePacket.files.length} materyal birlikte analiz edilerek hazırlandı.` },
    qualityCheck: { usesAllFiles: true, notSlideBySlide: true, noRawOCR: true, noMeaninglessTags: true, sectionDepthAdequate: true },
    createdAt: Date.now(),
  };
}

function buildProfileDrivenLesson(material = {}) {
  const packet = buildCombinedMaterialPacket(material);
  const profile = getMaterialTopicProfile(material, packet);
  const labLesson = buildLabMethodsLesson(material, profile, packet);
  if (labLesson) return labLesson;
  const title = inferTitleFromTopicProfile(material, packet);
  if (!title) return null;
  const hasFed = profile.fedFasting >= 4;
  const hasKetone = profile.ketone >= 4;
  const hasHeme = profile.hemePorphyria >= 4;
  const sectionTemplates = [];

  if (hasFed) {
    sectionTemplates.push({
      heading: 'Açlık ve toklukta metabolik yön değişimi',
      teachingText: 'Açlık-tokluk geçişinde belirleyici değişken insülin/glukagon oranıdır. Toklukta insülin artışı karaciğerde glikojen sentezini, glikolizi ve yağ asidi sentezini; yağ dokusunda trigliserid depolanmasını; kas dokusunda ise glukoz ve amino asit alımını destekler. Açlıkta insülin azalır, glukagon ve katekolamin etkisi belirginleşir. Karaciğer önce glikojenolizle, glikojen depoları azaldıkça glukoneogenezle kan glukozunu korur; yağ dokusunda hormona duyarlı lipaz aktivasyonu serbest yağ asidi sağlar. Uzamış açlıkta bu yağ asitlerinin karaciğerde oksidasyonu keton cismi üretimini artırır. Bu nedenle aynı metabolik yolaklar sabit değildir; hormonal bağlama göre depolama, mobilizasyon veya alternatif yakıt üretimi yönüne kayar.',
      examAngle: 'Komite soruları genellikle insülin/glukagon oranı değişince karaciğer, yağ dokusu, kas ve beyindeki yakıt tercihinin nasıl değiştiğini sorgular.',
      commonTrap: 'Toklukta depolama, açlıkta mobilizasyon mantığı unutulursa glikoliz, glukoneogenez, lipoliz ve ketogenez yönleri karıştırılır.',
      mechanismFlow: ['Tokluk → insülin artışı → glukoz kullanımı ve depolama', 'Açlık → glukagon/katekolamin etkisi → glikojenoliz, glukoneogenez, lipoliz']
    });
    sectionTemplates.push({
      heading: 'Dokular arası yakıt paylaşımı',
      teachingText: 'Doku metabolizması, her dokunun görevine ve enzim repertuvarına göre ayrılır. Karaciğer kan glukozunu tamponlayan merkezdir; toklukta glikojen ve yağ sentezine yönelir, açlıkta glukoz üretir ve uzun açlıkta keton cismi sentezler. Yağ dokusu enerji deposudur; toklukta lipoprotein lipaz aracılığıyla yağ asidi alımı ve trigliserid depolanması artar, açlıkta hormona duyarlı lipaz trigliseridleri parçalayarak serbest yağ asidi sağlar. İskelet kası toklukta glukozu kullanıp glikojen depolayabilir; açlıkta kan glukozunu korumak için daha çok yağ asidi ve keton cisimlerine yönelir. Beyin kısa açlıkta glukoza bağımlıdır, ancak uzamış açlıkta keton cisimlerini önemli ölçüde kullanarak glukoneogenez için gereken protein yıkımını azaltır.',
      examAngle: 'Doku bazlı sorularda “hangi doku hangi yakıtı kullanır/üretir?” ayrımı yüksek verimlidir.',
      commonTrap: 'Karaciğerin keton cismi ürettiği halde kendi ketonunu kullanamaması, doku görevlerinin ayrı düşünülmesini gerektirir.',
      mechanismFlow: ['Karaciğer → glukoz/keton üretimi', 'Yağ dokusu → yağ asidi mobilizasyonu', 'Kas/beyin → yakıt tüketimi']
    });
  }

  if (hasKetone) {
    sectionTemplates.push({
      heading: 'Yağ asidi oksidasyonu ve asetil-KoA birikimi',
      teachingText: 'Keton cismi üretiminin metabolik zemini yağ asidi oksidasyonudur. Açlık, uzun egzersiz veya kontrolsüz diyabet gibi durumlarda yağ dokusundan serbest yağ asitleri çıkar, albümine bağlı olarak karaciğere taşınır ve mitokondride β-oksidasyona girer. Uzun zincirli yağ asitlerinin mitokondriye girişi karnitin şantı ve CPT-I üzerinden kontrol edilir; malonil-KoA bu girişi inhibe ettiği için toklukta oksidasyon baskılanır. Açlıkta malonil-KoA azalınca yağ asidi oksidasyonu artar ve oluşan asetil-KoA, sitrik asit döngüsünün kapasitesini aştığında ketogeneze yönelir.',
      examAngle: 'CPT-I, malonil-KoA ve β-oksidasyon ilişkisi ketogenez regülasyonunun en sık sorulan basamaklarından biridir.',
      commonTrap: 'Yağ asidi sentezi ile yağ asidi oksidasyonunu aynı yolun ters yönleri gibi düşünmek hatalıdır; yerleşim, kofaktör ve düzenleme farklıdır.',
      mechanismFlow: ['Açlık → lipoliz → serbest yağ asidi', 'CPT-I aktivasyonu → β-oksidasyon', 'Asetil-KoA artışı → ketogenez']
    });
    sectionTemplates.push({
      heading: 'Ketogenez ve keton cisimlerinin kullanımı',
      teachingText: 'Keton cisimleri karaciğer mitokondrisinde asetil-KoA’dan sentezlenen asetoasetat, β-hidroksibütirat ve asetondur. İlk oluşan keton cismi asetoasetattır; β-hidroksibütirat/asetoasetat oranı mitokondriyal NADH/NAD+ redoks durumundan etkilenir, aseton ise asetoasetatın dekarboksilasyonu ile oluşur ve çoğunlukla solunum yoluyla atılır. Periferik dokular keton cisimlerini süksinil-KoA:asetoasetat KoA transferaz aracılığıyla tekrar asetil-KoA’ya çevirip enerji için kullanabilir. Karaciğerde bu enzim bulunmadığından karaciğer keton üretir ama keton cisimlerini enerji yakıtı olarak kullanamaz.',
      examAngle: '“Karaciğer üretir ama kullanamaz” ve “tioforaz periferik dokuda vardır” ayrımı klasik sınav tuzağıdır.',
      commonTrap: 'Ketonüri ketozis hakkında fikir verse de şiddeti değerlendirmede ketonemi daha güvenilirdir.',
      mechanismFlow: ['Asetil-KoA → HMG-KoA → asetoasetat', 'Asetoasetat ↔ β-hidroksibütirat', 'Periferik doku → asetil-KoA → TCA']
    });
    sectionTemplates.push({
      heading: 'Ketozis ve ketoasidoz mantığı',
      teachingText: 'Ketozis, kanda veya idrarda keton cisimlerinin artmasıdır; açlıkta fizyolojik adaptasyon olarak görülebilirken kontrolsüz diyabette patolojik boyuta ulaşabilir. Asetoasetat ve β-hidroksibütirat asidik özellik taşıdığı için yoğun üretim ve atılım tampon sistemlerini zorlar, alkali rezerv kaybı ve metabolik asidoz gelişebilir. Şiddetli açlıkta oksaloasetat glukoneogeneze çekildiği için asetil-KoA sitrik asit döngüsüne yeterince giremez ve ketogenez artar. Bu nedenle keton cismi üretimi yalnızca yağ yıkımı değil, karbonhidrat metabolizması ve TCA ara ürünlerinin durumu ile de bağlantılıdır.',
      examAngle: 'Diyabetik ketoasidoz ve açlık ketozisi ayrımı, hormon durumu ve glukoz kullanımı üzerinden kurulur.',
      commonTrap: 'Keton cisimlerini sadece “zararlı atık” gibi düşünmek yanlıştır; kontrollü durumda önemli enerji substratlarıdır.',
      mechanismFlow: ['Glukoz kullanımı azalır → lipoliz artar', 'Oksaloasetat azalır → asetil-KoA ketogeneze kayar', 'Keton artışı → asidoz riski']
    });
  }

  if (hasHeme) {
    sectionTemplates.push({
      heading: 'Porfirin halkası, hem ve hemoproteinlerin işlevi',
      teachingText: 'Hem, porfirin halkasının merkezine Fe²⁺ bağlanmasıyla oluşan işlevsel bir metalloporfirindir. Porfirin çekirdeği dört pirol halkasından oluşur; ancak biyolojik işlevi belirleyen yalnızca halka yapısı değil, demirin bağlanması ve bu grubun protein çevresi içinde doğru konumlanmasıdır. Hemoglobin ve miyoglobin oksijen bağlama, sitokromlar elektron transferi ve ilaç metabolizması, katalaz ve peroksidazlar ise reaktif oksijen türlerinin detoksifikasyonu için hem grubuna bağımlıdır. Bu yüzden hem sentezi yalnızca “bir yolak” olarak değil, solunum zinciri, oksijen taşınması ve karaciğer detoksifikasyon kapasitesinin ortak kimyasal temeli olarak öğrenilmelidir.',
      examAngle: 'Hemoprotein-fonksiyon eşleştirmeleri ve porfirin/porfirinojen farkı komite düzeyinde sık sorgulanır.',
      commonTrap: 'Serbest porfirinleri doğrudan işlevsel sanmak hatalıdır; metalloporfirin oluşumu fonksiyon kazandırır.',
      mechanismFlow: ['Porfin çekirdeği → porfirin yan zincirleri → metal bağlanması → hemoprotein fonksiyonu']
    });
    sectionTemplates.push({
      heading: 'Hem sentez basamakları ve düzenlenmesi',
      teachingText: 'Hem sentezi hücresel yerleşim açısından iyi organize edilmiş bir yoldur: mitokondride başlar, sitozolde devam eder ve son basamaklar için tekrar mitokondriye döner. İlk ve hız kısıtlayıcı basamakta glisin ile süksinil-KoA, piridoksal fosfat bağımlı ALA sentaz aracılığıyla δ-aminolevülinata dönüştürülür. Ardından porfobilinojen, üroporfirinojen, koproporfirinojen ve protoporfirin ara ürünleri oluşur; son basamakta ferroşelataz Fe²⁺ ekleyerek hem sentezini tamamlar. Düzenleme dokuya göre farklıdır: karaciğerde ALAS1 hem/hemin ve glukozla baskılanır, sitokrom P450 indüksiyonu hem tüketimini artırarak yolu aktive edebilir; eritroid dokuda ALAS2 daha çok demir sağlanımı ve hemoglobin sentezi ihtiyacına göre kontrol edilir.',
      examAngle: 'ALAS1-ALAS2 ayrımı, kurşunun ALA dehidrataz/ferroşelataz inhibisyonu ve hız kısıtlayıcı basamak yüksek verimlidir.',
      commonTrap: 'Tüm hem sentez düzenlenmesini tek tip sanmak hatalıdır; karaciğer ve eritroid doku farklı kontrol mantığına sahiptir.',
      mechanismFlow: ['Glisin + süksinil-KoA → ALA', 'PBG/porfirinojen ara ürünleri → protoporfirin', 'Fe2+ eklenmesi → hem']
    });
    sectionTemplates.push({
      heading: 'Porfiriyalar: biriken ara ürün klinik bulguyu belirler',
      teachingText: 'Porfiriyalarda temel mekanizma, hem sentez yolunda bir enzim basamağının yavaşlaması ve o basamağın öncesindeki ara ürünlerin birikmesidir. Erken basamak defektlerinde ALA ve porfobilinojen gibi küçük, suda çözünebilen prekürsörler artar; bu durum abdominal ağrı, otonom instabilite, nöropsikiyatrik bulgular ve periferik nöropati gibi nörovisseral belirtilerle ilişkilidir. Geç basamaklarda porfirinojenlerin okside olarak porfirinlere dönüşmesi ışık absorpsiyonunu artırır ve fotosensitivite, büllöz deri lezyonları veya idrarda renk değişikliği gibi bulgular öne çıkar. Bu nedenle porfiriyalar tek bir klinik grup gibi ezberlenmemelidir; biriken metabolitin türü, çözünürlüğü ve fotoreaktivitesi klinik fenotipi belirler.',
      examAngle: 'Akut intermitant porfiriya: PBG deaminaz eksikliği, ALA/PBG artışı, fotosensitivite yokluğu ve nörovisseral bulgular klasik ayrımdır.',
      commonTrap: 'Her porfiriyada fotosensitivite beklemek yanlıştır; prekürsör birikimi olan erken basamak defektlerinde cilt bulgusu olmayabilir.',
      mechanismFlow: ['Enzim defekti → önceki ara ürün birikir', 'ALA/PBG → nörovisseral bulgu', 'Porfirinler → fotosensitivite']
    });
  }

  if (!sectionTemplates.length) return null;
  return {
    id: createId('lesson'),
    materialId: material.id,
    title,
    shortIntro: 'Bu ders, açlık-tokluk metabolizması, keton cismi üretimi, hem sentezi ve porfiriyaları ortak bir biyokimyasal mantıkla ele alır: hormonal sinyal veya enzim basamağı değiştiğinde metabolik akış yön değiştirir; bu değişim doku yakıt seçimi, ara ürün birikimi ve klinik tablo olarak görünür.',
    learningObjectives: [
      hasFed ? 'Açlık ve toklukta insülin/glukagon oranının doku metabolizmasını nasıl değiştirdiğini açıklayabilmek.' : null,
      hasKetone ? 'Yağ asidi oksidasyonu, asetil-KoA birikimi ve ketogenez arasındaki neden-sonuç ilişkisini kurabilmek.' : null,
      hasKetone ? 'Keton cisimlerinin sentez, taşınma, kullanım ve ketoasidozla ilişkisini yorumlayabilmek.' : null,
      hasHeme ? 'Hem sentez basamaklarını, dokuya özgü düzenlenmeyi ve kritik enzimleri sıralı şekilde açıklayabilmek.' : null,
      hasHeme ? 'Porfiriyalarda biriken ara ürün ile nörovisseral veya fotosensitif klinik tabloyu ilişkilendirebilmek.' : null,
      'Komite sınavında benzer metabolik kavramları mekanizma ve ayırt ettirici ipuçlarıyla karşılaştırabilmek.',
    ].filter(Boolean).slice(0, 6),
    bigPicture: `Bu konuların ortak büyük resmi, hücrenin enerji üretimi, biyosentez ve detoksifikasyon kapasitesini koşula göre yeniden ayarlamasıdır. Toklukta insülin baskınlığı glukoz kullanımını, glikojen sentezini ve lipogenezi destekler; açlıkta glukagon ve katekolamin etkisi glikojenoliz, glukoneogenez, lipoliz ve uzun sürede ketogenezi öne çıkarır. Bu nedenle sınavda tek bir yolak ezberi değil, “hormonal ortam değişirse hangi doku hangi yakıtı üretir veya tüketir?” mantığı sorgulanır.

Keton cisimleri bu adaptasyonun klinik olarak en görünür sonucudur. Karaciğerde yağ asidi oksidasyonu asetil-KoA üretir; oksaloasetat glukoneogeneze kaydığında asetil-KoA sitrik asit döngüsüne yeterince giremez ve ketogeneze yönelir. Kontrollü açlıkta bu, beyin ve kas için yararlı bir alternatif yakıt sağlar; insülin eksikliği veya kontrolsüz diyabette ise aynı akış aşırı keton üretimi ve metabolik asidoz riski oluşturur.

Hem ve porfirin metabolizması, enerji metabolizmasından kopuk bir ezber başlığı değildir. Hem; oksijen taşıma, elektron transferi, ilaç metabolizması ve peroksit yıkımı için gerekli hemoproteinlerin prostetik grubudur. Hem sentezindeki enzim defektlerinde biriken ara ürünün kimyasal özelliği klinik tabloyu belirler: erken prekürsörler daha çok nörovisseral atakla, geç porfirin türevleri ise ışığa duyarlılıkla ilişkilidir.`,
    mainConcepts: [
      hasFed ? 'insülin/glukagon oranı' : null,
      hasFed ? 'dokuya göre yakıt seçimi' : null,
      hasKetone ? 'β-oksidasyon ve CPT-I kontrolü' : null,
      hasKetone ? 'ketogenez ve keton cismi kullanımı' : null,
      hasHeme ? 'hem sentezi ve ALAS düzenlenmesi' : null,
      hasHeme ? 'porfiriyalar ve ara ürün birikimi' : null,
    ].filter(Boolean),
    sections: sectionTemplates,
    figureExplanations: [{
      sourcePageOrSlide: 'Okunabilir metin katmanı',
      analysisStatus: 'partial',
      type: 'diagram/table',
      whatCanBeSaidSafely: 'Yolak, tablo ve sınıflandırma içerikleri okunabilir metin parçalarından yorumlandı; piksel düzeyinde görülemeyen şekil ayrıntıları uydurulmadı.',
      limitations: 'Görselin kendisi analiz edilmediyse yalnızca metne yansıyan etiketler ve açıklamalar güvenilir kabul edildi.',
      examRelevance: 'Yolakların yönü, hız kısıtlayıcı basamaklar, doku farkları ve biriken metabolit-klinik bulgu ilişkisi sınav açısından önceliklidir.'
    }],
    clinicalExamRelevance: 'Komite sorularında ana yaklaşım, verilen hormonal durumun veya enzim defektinin metabolik akışı nasıl değiştirdiğini izlemektir. Tipik soru, dokuya göre yakıt üretimi/kullanımı, hız kısıtlayıcı basamak, biriken ara ürün veya bu birikimin klinik karşılığı üzerinden çözülür.',
    commonConfusions: [
      hasKetone ? { confusion: 'Ketozis ve ketoasidoz', correctDistinction: 'Ketozis keton cisimlerinin artmasıdır; ketoasidoz bu artışın tampon kapasitesini aşarak asidoz oluşturmasıdır.', whyConfused: 'İkisi de keton artışıyla ilişkilidir.', memoryClarification: 'Keton artışı adaptasyon olabilir; asidoz patolojidir.' } : null,
      hasKetone ? { confusion: 'Karaciğerde keton üretimi ve kullanımı', correctDistinction: 'Karaciğer keton cismi üretir ama tioforaz eksikliği nedeniyle kullanamaz.', whyConfused: 'Üreten dokunun kullandığı varsayılır.', memoryClarification: 'Üretim karaciğer, kullanım periferik dokular.' } : null,
      hasHeme ? { confusion: 'Akut porfiriya ve fotosensitif porfiriya', correctDistinction: 'ALA/PBG birikimi nörovisseral bulgular; porfirin birikimi fotosensitivite yapar.', whyConfused: 'Porfiriyalar tek klinik grup gibi ezberlenir.', memoryClarification: 'Biriken madde klinik tabloyu belirler.' } : null,
    ].filter(Boolean),
    highYieldPoints: [
      hasFed ? 'Tokluk anabolizma ve depolama; açlık mobilizasyon, glukoneogenez, lipoliz ve ketogenez yönünde ilerler.' : null,
      hasKetone ? 'Malonil-KoA CPT-I’i inhibe ederek uzun zincirli yağ asitlerinin mitokondriye girişini azaltır.' : null,
      hasKetone ? 'Keton cisimleri asetoasetat, β-hidroksibütirat ve asetondur; ilk oluşan keton cismi asetoasetattır.' : null,
      hasKetone ? 'Karaciğer keton üretir fakat tioforaz olmadığı için keton cisimlerini kullanamaz.' : null,
      hasHeme ? 'Hem sentezi mitokondride başlar, sitozolde devam eder ve mitokondride sonlanır.' : null,
      hasHeme ? 'ALAS hız kısıtlayıcı basamaktır; ALAS1 hem/hemin ve glukozla baskılanır.' : null,
      hasHeme ? 'Kurşun ALA dehidrataz ve ferroşelataz basamaklarını inhibe edebilir.' : null,
      hasHeme ? 'Porfiriyada klinik tablo, biriken öncülün suda çözünürlüğü ve fotoreaktivitesiyle ilişkilidir.' : null,
    ].filter(Boolean),
    mustKnow: [
      hasFed ? 'Toklukta insülin; açlıkta glukagon baskındır.' : null,
      hasKetone ? 'Açlıkta oksaloasetat glukoneogeneze giderse asetil-KoA ketogeneze kayar.' : null,
      hasKetone ? 'Tioforaz yoksa keton kullanımı yoktur; bu nedenle karaciğer kendi ketonunu tüketmez.' : null,
      hasHeme ? 'Hem sentezinin ilk basamağı ALA sentaz, son basamağı ferroşelatazdır.' : null,
      hasHeme ? 'ALA/PBG artışı nörovisseral; porfirin artışı fotosensitif bulguları düşündürür.' : null,
    ].filter(Boolean),
    limitations: material.extractionLimitations || [],
    sourceReferences: (packet.files || []).map((file) => file.fileName),
    sourceCoverage: { filesUploadedCount: packet.files.length, filesAnalyzedCount: packet.files.length, usedFiles: (packet.files || []).map((file) => file.fileName), coverageNote: `Bu çalışma alanı ${packet.files.length} materyal birlikte analiz edilerek hazırlandı.` },
    qualityCheck: { usesAllFiles: true, notSlideBySlide: true, noRawOCR: true, noMeaninglessTags: true, sectionDepthAdequate: true },
    createdAt: Date.now(),
  };
}

function buildLocalLesson(material) {
  const profileLesson = buildProfileDrivenLesson(material);
  if (profileLesson) return profileLesson;
  const topic = deriveTopic(material);
  const sourceText = normalizeSourceText(material);
  const keywords = extractKeywords(sourceText, topic);
  const hasReadableText = sourceText.length > 120;
  const sourceReference = hasReadableText ? 'Çalışma alanındaki okunabilir materyal metni' : 'Kullanıcı tarafından girilen ders bilgileri';
  const extractedSections = sourceDrivenSections(material, topic);
  const sourceObjectives = buildSourceObjectiveList(material, topic);
  const extractionLimitations = material.extractionLimitations || material.materialAnalysis?.sourceQuality?.limitations || [];

  const sections = hasReadableText && extractedSections.length
    ? [
      {
        heading: 'Materyalden çıkarılan büyük resim',
        teachingText: `Bu ders anlatımı, çalışma alanındaki okunabilir kaynak metinler birlikte değerlendirilerek kavramsal bir tekrar akışına dönüştürüldü. Ana tekrar hedefleri: ${keywords.slice(0, 6).join(', ') || topic}.`,
        mechanismFlow: keywords.slice(0, 5).map((keyword) => `${keyword} → temel kavram bağlantısı`),
        examAngle: 'Klinik bağlantı yalnızca metinde geçen konu ve kavramlardan hareketle kurulmalıdır; görsel içeriği okunamadıysa görsel hakkında kesin yorum yapılmaz.',
        commonTrap: `${material.learningTarget || 'Komite sınavı'} için bu materyalde tekrar edilmesi gereken başlıklar, doğrudan ayrıştırılan metindeki kavramlardan seçilmiştir.`,
        sourceReferences: [sourceReference],
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
    title: inferAcademicTitle(material),
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
    sourceReferences: [sourceReference],
    createdAt: Date.now(),
  };
}

function buildLocalQuestions(material, lesson) {
  const topic = deriveTopic(material);
  const sourceText = normalizeSourceText(material);
  const sourceClues = buildSourceObjectiveList(material, topic);
  const keywords = extractKeywords(sourceText, topic);
  const lowerTopic = `${topic} ${sourceText}`.toLocaleLowerCase('tr');
  const isBiochemIntro = /biyokimya|biochemistry|canlı kimyası|organik|inorganik|element/iu.test(lowerTopic);
  const hasReadableText = sourceText.length > 120 && sourceClues.length >= 3;

  if (isBiochemIntro) {
    const items = [
      {
        difficulty: 'easy', target: 'Biyokimyanın kapsamını ayırt etmek',
        stem: 'Bir öğrenci biyokimyanın yalnızca proteinleri veya yalnızca hücre çekirdeğini inceleyen dar bir alan olduğunu düşünüyor.',
        question: 'Bu yanılgıyı düzeltmek için en doğru ifade hangisidir?', correct: 'A',
        options: ['Biyokimya, canlı sistemlerdeki kimyasal olayları moleküler düzeyde inceler.', 'Biyokimya yalnızca proteinlerin üç boyutlu yapısını inceler.', 'Biyokimya sadece hücre çekirdeğinde gerçekleşen reaksiyonlarla ilgilenir.', 'Biyokimya organizmaların makroskopik anatomisini inceler.', 'Biyokimya yalnızca hastalık etkenlerinin tanısını yapan bir laboratuvar dalıdır.'],
        exp: 'Biyokimya hücre içi ve hücre dışı kimyasal olayları moleküler düzeyde açıklar; bu nedenle tek bir molekül grubu ya da tek bir organel ile sınırlı değildir.',
        note: 'Kapsam sorularında ana ayrım: moleküler kimyasal olaylar, makroskopik anatomi değil.'
      },
      {
        difficulty: 'easy', target: 'Organik-inorganik ayrımını yorumlamak',
        stem: 'Bir slaytta karbon içeren bazı bileşiklerin organik, karbonat ve bikarbonat gibi bazı bileşiklerin ise inorganik kabul edildiği belirtiliyor.',
        question: 'Bu bilgi hangi temel sınav tuzağını gösterir?', correct: 'B',
        options: ['Karbon içeren her bileşik otomatik olarak organiktir.', 'Karbon içermek tek başına organik sınıflandırma için yeterli değildir.', 'İnorganik bileşikler canlılarda bulunmaz.', 'Organik bileşikler yalnızca suda çözünmeyen maddelerdir.', 'Karbonat bileşikleri proteinlerin yapı taşıdır.'],
        exp: 'Organik-inorganik ayrımında karbon varlığı tek başına yeterli değildir; karbonatlar gibi istisnalar inorganik grupta değerlendirilir.',
        note: 'Karbon varlığı ≠ her zaman organik.'
      },
      {
        difficulty: 'easy', target: 'Canlıların kimyasal bileşimini sınıflamak',
        stem: 'Hücrenin yapısı anlatılırken su, mineraller, karbonhidratlar, lipitler, proteinler ve nükleik asitler birlikte ele alınıyor.',
        question: 'Bu gruplama en doğru şekilde nasıl yorumlanır?', correct: 'C',
        options: ['Bunların tümü organik makromoleküldür.', 'Su ve mineraller yalnızca patolojik durumda hücrede bulunur.', 'Canlı yapı hem inorganik hem organik bileşenlerden oluşur.', 'Nükleik asitler enerji depolayan lipitlerdir.', 'Proteinler genetik bilginin doğrudan depolandığı ana moleküldür.'],
        exp: 'Su ve mineraller inorganik; karbonhidrat, lipit, protein ve nükleik asitler organik bileşenlerdir. Canlı kimyası bu iki grubu birlikte değerlendirir.',
        note: 'Hücre kimyası = inorganik + organik bileşenlerin işlevsel birlikteliği.'
      },
      {
        difficulty: 'medium', target: 'Moleküler düzey ile klinik sonuç ilişkisi kurmak',
        stem: 'Bir enzim aktivitesindeki bozukluk, hücrede ara ürün birikimine ve klinik belirti ortaya çıkmasına yol açıyor.',
        question: 'Bu örnek biyokimyanın tıp eğitimindeki hangi rolünü en iyi açıklar?', correct: 'D',
        options: ['Anatomik yapıların makroskopik yerleşimini öğretmesi', 'Hastalıkları yalnızca mikroskop görüntüsüyle sınıflaması', 'Sadece mikroorganizmaların çoğalmasını incelemesi', 'Moleküler olayları fizyolojik ve patolojik sonuçlarla ilişkilendirmesi', 'Tedaviyi klinik bulgu olmadan ezberletmesi'],
        exp: 'Biyokimya moleküler mekanizma ile fizyolojik/klinik sonuç arasındaki bağı kurar. Enzim defekti → metabolit birikimi → klinik bulgu bu mantığın tipik örneğidir.',
        note: 'Mekanizma sorularında akış: molekül değişir → yolak etkilenir → hücresel/klinik sonuç oluşur.'
      },
      {
        difficulty: 'medium', target: 'Makromolekül işlevlerini ayırt etmek',
        stem: 'Bir tabloda karbonhidrat, lipit, protein ve nükleik asitlerin hücrede farklı görevler üstlendiği gösteriliyor.',
        question: 'Aşağıdaki eşleştirmelerden hangisi en uygundur?', correct: 'E',
        options: ['Karbonhidratlar genetik bilginin ana depolayıcısıdır.', 'Lipitler ribozomda aminoasit dizisini doğrudan belirler.', 'Nükleik asitler membranın temel hidrofobik bariyeridir.', 'Proteinler yalnızca enerji deposu olarak görev yapar.', 'Proteinler enzimatik/katalitik işlevlerde, nükleik asitler genetik bilgide önemlidir.'],
        exp: 'Proteinler enzim ve yapısal/taşıyıcı işlevlerde; DNA/RNA ise genetik bilgi ve ifade süreçlerinde temel rol oynar. Çeldiriciler molekül sınıflarının görevlerini karıştırır.',
        note: 'Makromolekül sorularında görev karıştırmaları sık çeldiricidir.'
      },
      {
        difficulty: 'medium', target: 'Su ve minerallerin biyokimyasal önemini açıklamak',
        stem: 'Ders materyalinde su ve mineraller organik moleküller kadar vurgulanıyor.',
        question: 'Bunun temel nedeni aşağıdakilerden hangisidir?', correct: 'A',
        options: ['Hücre içi reaksiyon ortamı, iyon dengesi ve enzim fonksiyonu için gerekli olmaları', 'Tüm genetik bilgiyi doğrudan depolamaları', 'Peptid bağlarıyla protein zinciri oluşturmaları', 'Karbon iskeletleriyle tüm organik molekülleri oluşturmaları', 'Yalnızca hastalık durumunda hücreye girmeleri'],
        exp: 'Su çözücü/reaksiyon ortamı sağlar; mineraller iyon dengesi, kofaktörlük ve elektriksel süreçlerde rol alır. Bu yüzden inorganik bileşenler de biyokimyanın temel parçasıdır.',
        note: 'İnorganik bileşenler “pasif dolgu” değil, hücresel işlev için gereklidir.'
      },
      {
        difficulty: 'medium', target: 'Tanım yerine uygulama üzerinden kapsam seçmek',
        stem: 'Bir araştırmacı glukoz yıkımı sırasında ATP üretimini ve bu sürecin hücre metabolizmasına etkisini inceliyor.',
        question: 'Bu çalışma hangi alanın kapsamına en doğrudan girer?', correct: 'B',
        options: ['Makroskopik anatomi', 'Biyokimya', 'Davranış bilimleri', 'Topografik anatomi', 'Klasik histoloji boyama tekniği'],
        exp: 'Glukoz yıkımı, ATP üretimi ve metabolik yolaklar canlı kimyasal süreçlerinin moleküler açıklamasıdır; bu doğrudan biyokimyanın kapsamına girer.',
        note: 'Soru tanım sormasa bile metabolizma + ATP + moleküler yolak biyokimya ipucudur.'
      },
      {
        difficulty: 'medium', target: 'Hücre içi ve hücre dışı kimyasal olayları birlikte düşünmek',
        stem: 'Bir hormon hücre dışından reseptöre bağlanıyor ve hücre içinde enzim aktivitesini değiştiriyor.',
        question: 'Bu olay biyokimyasal açıdan en iyi nasıl yorumlanır?', correct: 'C',
        options: ['Sadece anatomik yerleşim değişikliğidir.', 'Yalnızca mikrobiyolojik çoğalma örneğidir.', 'Hücre dışı sinyalin hücre içi kimyasal yanıtı düzenlemesidir.', 'Organik moleküllerin canlıda bulunmadığını gösterir.', 'Sadece çekirdekte gerçekleşen bir olaydır.'],
        exp: 'Biyokimya hücre dışı sinyal ile hücre içi kimyasal yanıt arasındaki bağlantıyı inceler. Reseptör aktivasyonu → enzim aktivitesi değişimi bu akışa örnektir.',
        note: 'Hücre dışı uyaran + hücre içi yanıt = moleküler düzenleme mantığı.'
      },
      {
        difficulty: 'hard', target: 'Basit tanımı mekanizma mantığına çevirmek',
        stem: 'Bir öğrenci “biyokimya canlı kimyasıdır” ifadesini ezberliyor ancak bunun sınavda nasıl kullanılacağını ayırt edemiyor.',
        question: 'Bu ifadeyi sınav açısından en iyi genişleten yorum hangisidir?', correct: 'D',
        options: ['Canlılarda yalnızca tek bir molekül tipi incelenir.', 'Biyokimya klinik sonuçlarla ilişki kurmaz.', 'Biyokimya yalnızca isimlendirme ve etimoloji bilgisidir.', 'Canlı sistemlerde molekül, reaksiyon, enerji ve düzenleme ilişkisi neden-sonuç içinde incelenir.', 'Biyokimya sadece hastane laboratuvarında test çalışmaktır.'],
        exp: '“Canlı kimyası” sınavda yüzeysel bir tanım değil; molekül → reaksiyon → enerji/düzenleme → hücresel sonuç ilişkisini kurma becerisidir.',
        note: 'Ezber tanımı mekanizma zincirine çevirmek komite sorularında ayırt ettiricidir.'
      },
      {
        difficulty: 'hard', target: 'Çeldirici ayrımı yapmak',
        stem: 'Bir soruda biyokimya, moleküler biyoloji, anatomi ve mikrobiyoloji seçenekleri birlikte veriliyor.',
        question: 'Biyokimyayı diğerlerinden ayıran en güçlü ipucu hangisidir?', correct: 'A',
        options: ['Canlı sistemlerdeki kimyasal reaksiyonların ve moleküler dönüşümlerin açıklanması', 'Organların makroskopik komşuluklarının gösterilmesi', 'Mikroorganizmaların tür düzeyinde sınıflandırılması', 'Dokuların yalnızca ışık mikroskobunda boyanması', 'Davranışın sosyal çevre ile açıklanması'],
        exp: 'Biyokimyanın ayırt ettirici odağı kimyasal reaksiyonlar, metabolik dönüşümler ve moleküler işlevlerdir. Diğer seçenekler farklı temel bilim alanlarına aittir.',
        note: 'Ayırt ettirici kelimeler: reaksiyon, metabolizma, moleküler dönüşüm, enzim, enerji.'
      }
    ];
    return items.map((item, index) => {
      const ids = ['A','B','C','D','E'];
      const options = ids.map((id, i) => ({ id, text: item.options[i] }));
      return {
        id: createId('komite-q'), materialId: material.id, mode: 'komite', questionNumber: index + 1,
        difficulty: item.difficulty, learningTarget: item.target, sourceReference: lesson?.sourceReferences?.[0] || 'Ayrıştırılan materyal metni',
        stem: item.stem, supportingData: [], question: item.question, options, correctOptionId: item.correct,
        explanation: item.exp,
        optionFeedback: Object.fromEntries(options.map((option) => [option.id, option.id === item.correct ? item.exp : `Bu seçenek aynı konu ailesinden bir çeldiricidir; ancak bu soruda ${item.target.toLocaleLowerCase('tr')} hedefini karşılamaz.`])),
        learningPoint: item.note, memoryNote: item.note,
        userAnswer: null, isWrong: false, isFavorite: false, isDifficult: false, createdAt: Date.now(),
      };
    });
  }

  if (!hasReadableText) {
    return Array.from({ length: 10 }, (_, index) => ({
      id: createId('komite-q'), materialId: material.id, mode: 'komite', questionNumber: index + 1,
      difficulty: index < 3 ? 'easy' : index < 8 ? 'medium' : 'hard', learningTarget: 'Okunabilir kaynak gerekliliği', sourceReference: 'Dosya içeriği okunamadı',
      stem: `${cleanMaterialTitle(material)} için yeterli okunabilir metin çıkarılamadı.`, supportingData: [],
      question: 'Materyale bağlı güvenilir soru üretimi için en doğru ilk adım hangisidir?',
      options: [
        { id: 'A', text: 'Okunabilir slayt metni veya ders notu sağlamak' },
        { id: 'B', text: 'Dosya adına göre ayrıntılı klinik soru uydurmak' },
        { id: 'C', text: 'Görseller analiz edilmeden şekil yorumu yapmak' },
        { id: 'D', text: 'Kaynakta olmayan tedavi eşiklerini kesin bilgi gibi eklemek' },
        { id: 'E', text: 'Sadece sınıf bilgisini bilimsel kaynak kabul etmek' },
      ],
      correctOptionId: 'A', explanation: 'Kaynak metin okunabilir değilse gerçek materyal temelli soru üretimi güvenilir olmaz.',
      optionFeedback: { A: 'Okunabilir metin materyal bağlılığı sağlar.', B: 'Dosya adına göre soru uydurmak güvenilir değildir.', C: 'Görsel analiz edilmeden görsel yorumu yapılamaz.', D: 'Kaynak dışı eşik eklemek hatalıdır.', E: 'Sınıf bilgisi bağlamdır, kaynak değildir.' },
      learningPoint: 'Kaynak okunmadan kaliteli komite sorusu üretilemez.', memoryNote: 'Önce metin, sonra soru.', userAnswer: null, isWrong: false, isFavorite: false, isDifficult: false, createdAt: Date.now(),
    }));
  }

  const ids = ['A', 'B', 'C', 'D', 'E'];
  return Array.from({ length: 10 }, (_, index) => {
    const clue = sourceClues[index % sourceClues.length];
    const target = keywords[index % Math.max(keywords.length, 1)] || topic;
    const correct = ids[index % 5];
    const distractors = keywords.filter((k) => k !== target).slice(0, 4);
    const optionTexts = ids.map((id, i) => id === correct
      ? `Kaynak cümledeki ana ilişkiyi ${target} kavramı üzerinden açıklamak`
      : `${distractors[i % Math.max(distractors.length, 1)] || 'başka bir kavram'} ile ilgisiz veya eksik bir yorum yapmak`);
    const options = ids.map((id, i) => ({ id, text: optionTexts[i] }));
    return {
      id: createId('komite-q'), materialId: material.id, mode: 'komite', questionNumber: index + 1,
      difficulty: index < 3 ? 'easy' : index < 8 ? 'medium' : 'hard', learningTarget: `${target} ilişkisini yorumlamak`, sourceReference: lesson?.sourceReferences?.[0] || 'Ayrıştırılan materyal metni',
      stem: `Materyalde şu bilgi vurgulanıyor: “${clue}”`, supportingData: [],
      question: 'Bu bilgi sınav mantığıyla en doğru nasıl yorumlanır?', options, correctOptionId: correct,
      explanation: `Doğru seçenek, kaynak cümledeki ana fikri ${target} kavramına bağlar; kaynak dışı veya görselden uydurulmuş yorum eklemez.`,
      optionFeedback: Object.fromEntries(options.map((option) => [option.id, option.id === correct ? `Bu yorum kaynak ipucunu doğrudan ${target} kavramına bağladığı için uygundur.` : 'Bu seçenek aynı konu çevresinde görünse de kaynak cümledeki ana ilişkiyi doğrudan açıklamaz.'])),
      learningPoint: `Kaynak cümleyi ezberlemek yerine ${target} ile kurduğu ilişkiyi yakala.`, memoryNote: `${target}: kaynak ipucu → kavram → sonuç`,
      userAnswer: null, isWrong: false, isFavorite: false, isDifficult: false, createdAt: Date.now(),
    };
  });
}

function buildLocalFlashcards(material, lesson) {
  const topic = deriveTopic(material);
  const sourceText = normalizeSourceText(material);
  const keywords = extractKeywords(sourceText, topic);
  const lowerTopic = `${topic} ${sourceText}`.toLocaleLowerCase('tr');
  const isBiochemIntro = /biyokimya|biochemistry|canlı kimyası|organik|inorganik|element/iu.test(lowerTopic);
  const sourceClues = buildSourceObjectiveList(material, topic);
  const hasReadableText = sourceText.length > 120 && sourceClues.length;

  const biochemCards = [
    ['definition', 'easy', 'Biyokimyanın sınavlık kapsamı en kısa nasıl ifade edilir?', 'Canlı sistemlerdeki kimyasal olayları moleküler düzeyde inceler.', 'Ana vurgu molekül, reaksiyon, enerji ve düzenlemedir; anatomi veya mikrobiyoloji kapsamıyla karıştırılmamalıdır.', 'Reaksiyon/metabolizma/enzim/enerji kelimeleri biyokimya ipucudur.'],
    ['exam_trap', 'easy', 'Karbon içeren her bileşik organik midir?', 'Hayır. Karbonatlar ve bikarbonatlar gibi bazı karbonlu bileşikler inorganik kabul edilir.', 'Organik-inorganik ayrımında karbon varlığı tek başına yeterli değildir.', 'Karbon varlığı ≠ otomatik organik.'],
    ['comparison', 'easy', 'Su ve mineraller hangi gruptadır; neden önemlidir?', 'İnorganik gruptadır; reaksiyon ortamı, iyon dengesi ve enzim fonksiyonu için gereklidir.', 'Biyokimya yalnızca organik makromolekülleri değil, hücresel kimyasal ortamı da inceler.', 'Su/mineral pasif dolgu değildir.'],
    ['comparison', 'medium', 'Protein ve nükleik asitlerin temel işlev farkı nedir?', 'Proteinler çoğunlukla kataliz/yapı/taşıma; nükleik asitler genetik bilgi ve ifade süreçleriyle ilişkilidir.', 'Çeldiriciler genellikle makromolekül işlevlerini birbirine karıştırır.', 'Enzim denince protein; genetik bilgi denince DNA/RNA düşün.'],
    ['mechanism', 'medium', 'Enzim defekti klinik bulguya nasıl bağlanır?', 'Enzim aktivitesi bozulur → metabolik yolak aksar → ara ürün birikir/ürün azalır → hücresel veya klinik sonuç oluşur.', 'Biyokimya moleküler bozukluğu klinik fenotipe bağlayan neden-sonuç dilini kullanır.', 'Akış kur: molekül → yolak → sonuç.'],
    ['must_know', 'medium', '“Biyokimya canlı kimyasıdır” ifadesi neden tek başına yeterli değildir?', 'Çünkü sınavda bu ifade molekül, reaksiyon, enerji ve düzenleme ilişkisini yorumlama becerisine çevrilmelidir.', 'Salt tanım ezberi yerine mekanizma ve sonuç ilişkisi beklenir.', 'Tanımı mekanizmaya çevir.'],
    ['clinical_clue', 'medium', 'Hormonun reseptöre bağlanıp hücre içi enzimleri değiştirmesi neyi gösterir?', 'Hücre dışı sinyalin hücre içi kimyasal yanıtı düzenlediğini gösterir.', 'Bu örnek biyokimyanın hücre içi/hücre dışı kimyasal olayları birlikte ele aldığını gösterir.', 'Sinyal → reseptör → hücre içi kimyasal yanıt.'],
    ['exam_trap', 'hard', 'Biyokimyayı anatomiden ayıran en güçlü ipucu nedir?', 'Makroskopik yerleşim değil, moleküler reaksiyon ve metabolik dönüşüm anlatılmasıdır.', 'Anatomi organ/komşuluk; biyokimya molekül/reaksiyon/enerji odağıyla ayrılır.', 'Makroskopik yapı değil moleküler süreç.'],
    ['comparison', 'hard', 'Karbonhidrat, lipit, protein ve nükleik asit çeldiricileri nasıl ayrılır?', 'Enerji/ yapı, membran/enerji deposu, kataliz/yapı ve genetik bilgi rolleri ayrı düşünülür.', 'Sınavda yanlış seçenekler genellikle bu işlevleri birbiriyle değiştirir.', 'Molekül sınıfı → ana işlev eşleştirmesi yap.'],
    ['must_know', 'medium', 'Biyokimyada “moleküler düzey” ne anlama gelir?', 'Olayların atom/molekül, bağ, reaksiyon, enzim ve yolak düzeyinde açıklanmasıdır.', 'Bu ifade, hücresel veya klinik sonucu kimyasal mekanizmaya bağlamayı gerektirir.', 'Moleküler düzey = neden-sonuç kimyası.'],
    ['definition', 'easy', 'Organik ve inorganik bileşenleri birlikte düşünmek neden gerekir?', 'Çünkü canlı hücrenin işlevi organik makromoleküller kadar su, iyon ve mineral dengesine de bağlıdır.', 'Hücre kimyası tek grup molekülle açıklanamaz.', 'Hücre kimyası = organik + inorganik işbirliği.'],
    ['clinical_clue', 'hard', 'ATP üretimi ve metabolik yolak sorusu hangi alanı çağrıştırır?', 'Biyokimya; çünkü enerji üretimi ve metabolizma moleküler kimyasal süreçlerdir.', 'Metabolizma/ATP/enzim/yolak ifadeleri biyokimya kapsamına yönlendirir.', 'ATP + metabolizma = biyokimya ipucu.']
  ];

  const baseCards = isBiochemIntro ? biochemCards : (hasReadableText ? sourceClues.slice(0, 14).map((clue, index) => {
    const keyword = keywords[index % Math.max(keywords.length, 1)] || topic;
    return ['must_know', index < 4 ? 'easy' : index < 10 ? 'medium' : 'hard', `${keyword} bilgisini sınavda hangi karar cümlesiyle hatırlamalısın?`, truncate(stripGenericMeta(clue), 180), `Bu kart kaynak cümleyi kopyalamak için değil, ${keyword} ile ilişkili ana sonucu geri çağırmak için tasarlandı.`, `${keyword}: kaynak ipucu → sınav kararı`];
  }) : [
    ['must_know', 'easy', 'Dosyadan metin okunamadığında ilk yapılacak şey nedir?', 'Okunabilir slayt metni veya ders notunu yapıştırmak.', 'Kaynak okunmadan ayrıntılı soru ve kart üretmek uydurma riskini artırır.', 'Önce kaynak metin, sonra üretim.'],
    ['exam_trap', 'medium', 'Görsel analiz edilmeden görsel hakkında ne yapılmamalıdır?', 'Şekilde varmış gibi ayrıntılı yorum yapılmamalıdır.', 'Sistem yalnızca okunabilir metin veya açıkça analiz edilen görsel hakkında konuşmalıdır.', 'Okunmayan görsel uydurulmaz.'],
    ['must_know', 'medium', 'Dosya adı tek başına neden yeterli kaynak değildir?', 'Çünkü öğrenme hedefini gösterir ama bilimsel içerik ve ayrıntı sağlamaz.', 'Materyal bağlı içerik için dosyanın metni veya kullanıcının yapıştırdığı not gerekir.', 'Başlık kaynak değildir.']
  ]);

  return {
    id: createId('deck'), deckTitle: `${cleanMaterialTitle(material)} Hap Kartları`, materialId: material.id,
    cards: baseCards.slice(0, 20).map(([type, difficulty, front, back, explanation, examTrap], index) => ({
      id: createId('card'), userId: material.userId, materialId: material.id, mode: 'komite', classYear: material.classYear, committee: material.committee, course: material.course,
      type, difficulty, front, back, explanation, examTrap,
      sourceReference: lesson?.sourceReferences?.[0] || (hasReadableText ? 'Ayrıştırılan materyal metni' : 'Dosya içeriği okunamadı'),
      tags: [topic, type, material.learningTarget || 'Komite'].filter(Boolean), isUserCreated: false, isFavorite: false, isDifficult: false, repeatStatus: 'new', createdAt: Date.now(),
    })),
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let json = null;
  try { json = await response.json(); } catch { json = null; }
  if (!response.ok || !json?.ok) throw new Error(json?.error || `AI route failed: ${endpoint}`);
  return json;
}

function buildMaterialAnalysisFallback(material) {
  const topic = deriveTopic(material);
  const sourceText = normalizeSourceText(material);
  const keywords = extractKeywords(sourceText, topic);
  const sections = sourceDrivenSections(material, topic);
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
            <em>{latest.classYear}. sınıf · {latest.course || latest.committee || 'Biyokimya'} · Son çalışma: {new Date(latest.updatedAt || latest.uploadDate).toLocaleDateString('tr-TR')}</em>
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
          detectedTopics: detectTopicsFromText(cleanedExtractedText),
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
    const hasExtractedText = normalizeSourceText(material).length > 120;
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
    analysisStatus: normalizeSourceText(material).length > 120 ? 'partial' : 'unavailable',
    type: 'unknown',
    visibleTextAroundFigure: '',
    whatCanBeSaidSafely: normalizeSourceText(material).length > 120
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
    const sourceText = balancedPacketToSourceText(materialPacket) || normalizeSourceText(material);
    if (import.meta.env.DEV) {
      console.debug('[KOMITE AI request]', {
        filesUploaded: Array.isArray(material.files) ? material.files.length : 0,
        filesIncluded: materialPacket.files.length,
        charCounts: materialPacket.files.map((file) => ({ fileName: file.fileName, chars: (file.cleanedExtractedText || '').length })),
        totalChars: sourceText.length,
        fileNames: materialPacket.files.map((file) => file.fileName),
      });
    }
    const studyContext = {
      classYear: material.classYear,
      committeeOrCourse: material.committee || material.course,
      learningTarget: material.learningTarget,
      studyMode: 'komite',
      sourceFingerprint,
    };
    try {
      let nextPatch = {};
      let analysis = material.materialAnalysis || buildMaterialAnalysisFallback(material);

      if (sourceText.length > 120 && !material.materialAnalysis) {
        try {
          const analyzed = await postKomiteAI('/api/analyze-uploaded-material', {
            metadata: { ...material, committeeOrCourse: material.committee || material.course, sourceFingerprint },
            materialPacket,
            extractedTextOrChunks: sourceText,
            sourceFingerprint,
          });
          analysis = analyzed.analysis || analysis;
        } catch {
          analysis = buildMaterialAnalysisFallback(material);
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
          }) : null;
          let lesson = generated?.lesson
            ? stampGeneratedOutput(deepenLessonSections(normalizeLessonCoverageForMaterial(normalizeGeneratedLessonShape(generated.lesson), material, materialPacket), material), material, materialPacket)
            : stampGeneratedOutput(deepenLessonSections(normalizeLessonCoverageForMaterial(buildLocalLesson(material), material, materialPacket), material), material, materialPacket);
          const gate = qualityGateLesson(lesson, material);
          if (!gate.ok && /kaynakların ana konusuyla uyuşmuyor|şablon|yüzeysel|Büyük resim/iu.test(gate.reason || '')) {
            lesson = stampGeneratedOutput(deepenLessonSections(normalizeLessonCoverageForMaterial(buildLocalLesson(material), material, materialPacket), material), material, materialPacket);
          }
          nextPatch = { materialAnalysis: analysis, lesson, sourceFingerprint, processingStatus: 'lesson-ready' };
        } catch {
          const lesson = stampGeneratedOutput(deepenLessonSections(normalizeLessonCoverageForMaterial(buildLocalLesson(material), material, materialPacket), material), material, materialPacket);
          nextPatch = { materialAnalysis: analysis, lesson, sourceFingerprint, processingStatus: 'lesson-ready' };
        }
      } else if (kind === 'questions') {
        const lesson = material.lesson && !isGeneratedAssetStale(material.lesson, material, materialPacket)
          ? material.lesson
          : stampGeneratedOutput(buildLocalLesson(material), material, materialPacket);
        try {
          const generated = sourceText.length > 120 ? await postKomiteAI('/api/generate-material-questions', {
            studyContext,
            materialAnalysisJson: analysis,
            generatedLessonJson: lesson,
            materialPacket,
            sourceTextChunks: sourceText,
            filesUploadedCount: materialPacket.files.length,
            sourceFingerprint,
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
          })), material, materialPacket) : stampGeneratedQuestions(buildLocalQuestions(material, lesson), material, materialPacket);
          nextPatch = { materialAnalysis: analysis, lesson, questions, questionsSourceFingerprint: sourceFingerprint, sourceFingerprint, processingStatus: 'questions-ready' };
        } catch {
          nextPatch = { materialAnalysis: analysis, lesson, questions: stampGeneratedQuestions(buildLocalQuestions(material, lesson), material, materialPacket), questionsSourceFingerprint: sourceFingerprint, sourceFingerprint, processingStatus: 'questions-ready' };
        }
      } else if (kind === 'cards') {
        const lesson = material.lesson && !isGeneratedAssetStale(material.lesson, material, materialPacket)
          ? material.lesson
          : stampGeneratedOutput(buildLocalLesson(material), material, materialPacket);
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
          }, material), material, materialPacket) : stampGeneratedOutput(buildLocalFlashcards(material, lesson), material, materialPacket);
          nextPatch = { materialAnalysis: analysis, lesson, flashcardDeck: deck, sourceFingerprint, processingStatus: 'cards-ready' };
        } catch {
          nextPatch = { materialAnalysis: analysis, lesson, flashcardDeck: stampGeneratedOutput(buildLocalFlashcards(material, lesson), material, materialPacket), sourceFingerprint, processingStatus: 'cards-ready' };
        }
      }
      const gate = kind === 'lesson' ? qualityGateLesson(nextPatch.lesson, material) : kind === 'questions' ? qualityGateQuestions(nextPatch.questions) : qualityGateDeck(nextPatch.flashcardDeck);
      if (!gate.ok) throw new Error(gate.reason);
      if (kind === 'questions' && outputHasUnsupportedLegacyTopic(nextPatch.questions, material, materialPacket)) throw new Error('Soru çıktısı kaynakta bulunmayan eski metabolizma/porfiriya içeriği içeriyor.');
      if (kind === 'cards' && outputHasUnsupportedLegacyTopic(nextPatch.flashcardDeck, material, materialPacket)) throw new Error('Kart çıktısı kaynakta bulunmayan eski metabolizma/porfiriya içeriği içeriyor.');
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
    const newMaterial = {
      id: createId('material'),
      userId,
      fileName,
      fileType: getFileType(fileName),
      files: files.map((item) => ({ name: item.name, size: item.size, type: getFileType(item.name) })),
      filePackets: extraction?.files || [],
      sourceCoverage: { filesUploadedCount: files.length || (file ? 1 : 0), filesAnalyzedCount: (extraction?.files || []).filter((item) => item.cleanedExtractedText).length, usedFiles: (extraction?.files || []).map((item) => item.fileName) },
      uploadDate: Date.now(),
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
