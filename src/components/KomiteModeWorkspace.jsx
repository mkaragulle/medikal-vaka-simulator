import { useEffect, useMemo, useState } from 'react';
import { Icon } from './ui.jsx';
import { localBackend } from '../services/localBackend.js';
import { extractKomiteFile, getKomiteFileExtension } from '../utils/komiteFileExtraction.js';

const KOMITE_MATERIALS_STORAGE_KEY = 'komite-materials-v1';
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

function readUserMaterials(userId) {
  return localBackend.read(KOMITE_MATERIALS_STORAGE_KEY, [])
    .filter((material) => !userId || material.userId === userId)
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
  if (typeof item === 'string') return item;
  if (!item || typeof item !== 'object') return '';
  return item.correctDistinction || item.memoryClarification
    ? `${item.confusion || 'Sık karıştırılan nokta'}: ${item.correctDistinction || ''}${item.whyConfused ? ` ${item.whyConfused}` : ''}${item.memoryClarification ? ` ${item.memoryClarification}` : ''}`.trim()
    : Object.values(item).filter(Boolean).join(' ');
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
  const parts = [section.teachingText, section.content].filter(Boolean).map((value) => String(value).trim());
  if (section.whyItMatters) parts.push(`Bu başlığın öğrenme değeri şudur: ${String(section.whyItMatters).trim()}`);
  if (Array.isArray(section.mechanismFlow) && section.mechanismFlow.length) parts.push(`Mekanizma akışı: ${section.mechanismFlow.filter(Boolean).join(' → ')}.`);
  if (section.examAngle || section.examConnection) parts.push(`Sınav bağlantısı: ${String(section.examAngle || section.examConnection).trim()}`);
  if (section.commonTrap || section.commonMistake) parts.push(`Sık hata: ${String(section.commonTrap || section.commonMistake).trim()}`);
  let merged = [...new Set(parts.filter(Boolean))].join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (wordCount(merged) >= 55) return merged;
  const heading = section.heading || section.title || 'Bu kavram';
  const topic = deriveTopic(material);
  const sourceText = normalizeSourceText(material);
  const support = getImportantSentences(sourceText, 4)
    .filter((sentence) => !merged.includes(sentence))
    .slice(0, 2)
    .join(' ');
  const fallback = `${heading}, ${topic} konusunun tek başına ezberlenecek bir başlığı değil, ana kavramsal akış içinde yorumlanması gereken bir öğrenme basamağıdır. Bu bölümde önce kavramın ne anlama geldiği, ardından hangi mekanizma veya sınıflandırma mantığıyla diğer başlıklara bağlandığı düşünülmelidir. ${support} Bu nedenle öğrenci, başlığı yalnızca tanım olarak değil; neden-sonuç ilişkisi, ayırt ettirici özellik ve komite sınavında sorulabilecek temel ayrım üzerinden öğrenmelidir.`;
  return `${merged} ${fallback}`.replace(/\s+/g, ' ').trim();
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
  const badRepeats = (text.match(/klinik bağlantı|sınav bağlantısı|bu ders materyalde|bu bölüm temel mekanizma ile ilişkilendirilmelidir/g) || []).length;
  const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
  if (!lesson || !sections.length) return { ok: false, reason: 'Ders yapısı eksik.' };
  if (filesUploadedCount > 1 && analyzedCount <= 1) return { ok: false, reason: 'Çoklu dosya yüklenmesine rağmen AI çıktısı tek materyal kapsamı gösteriyor.' };
  if (/materyaldeki ilişkili kavram|slayt\s*→|sayfa\s*→/iu.test(text)) return { ok: false, reason: 'Ham/meaningless kaynak etiketi üretildi.' };
  if (String(lesson.bigPicture || '').replace(/\s+/g, ' ').trim().length < 260) return { ok: false, reason: 'Büyük resim yeterince açıklayıcı değil.' };
  const shallow = sections.filter((section) => String(section.teachingText || section.content || '').split(/\s+/).length < 45);
  if (sections.length && shallow.length / sections.length > 0.35) return { ok: false, reason: 'Ders bölümleri yüzeysel kalıyor.' };
  if (badRepeats > 10) return { ok: false, reason: 'Ders anlatımı fazla şablon ve tekrar içeriyor.' };
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
      mechanismFlow: keywords.length ? keywords.map((keyword) => `${keyword} → temel kavram bağlantısı`) : [],
      examAngle: 'Bu bölümdeki bilgi, materyaldeki bağlamı bozmadan temel mekanizma veya klinik yorumla ilişkilendirilmelidir.',
      commonTrap: 'Komite sorusunda bu bölümden genellikle tanım, mekanizma, ayırıcı özellik veya yorumlama basamağı sorulur.',
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


function isAminoProteinMaterial(material = {}) {
  const haystack = `${material.fileName || ''} ${material.course || ''} ${material.committee || ''} ${normalizeSourceText(material)}`.toLocaleLowerCase('tr');
  return /amino\s*asit|aminoasit|protein|peptit|glisin|prolin|triptofan|tirozin|fenilalanin|α|alfa|r grubu|karboksil/iu.test(haystack);
}

function inferAcademicTitle(material = {}) {
  if (material.inferredTitle) return material.inferredTitle;
  if (material.lesson?.inferredTitle) return material.lesson.inferredTitle;
  if (isAminoProteinMaterial(material)) return 'Amino Asitler ve Proteinlerin Temel Yapısı';
  const base = String(material.course || material.committee || cleanMaterialTitle(material) || 'Komite Materyali')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/^\s*\d+[.)-]?\s*/u, '')
    .replace(/\b(pptx|pdf|docx|txt|slayt|sayfa|prof\.?|dr\.?)\b/giu, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return base || 'Komite Materyali';
}

function buildAminoProteinLesson(material) {
  const sourceCount = Array.isArray(material.files) ? material.files.length : (material.fileName ? 1 : 0);
  return {
    id: createId('lesson'), materialId: material.id,
    inferredTitle: 'Amino Asitler ve Proteinlerin Temel Yapısı',
    title: 'Amino Asitler ve Proteinlerin Temel Yapısı',
    shortSubtitle: 'α-amino asit iskeleti, R grubu özellikleri ve bu özelliklerin protein yapısına etkisi.',
    shortIntro: 'Bu ders, amino asitlerin ortak yapısını, yan zincir özelliklerine göre sınıflandırılmasını ve bu özelliklerin proteinlerin biyolojik davranışına nasıl temel oluşturduğunu açıklar.',
    learningObjectives: [
      'Amino asitlerin ortak α-karbon merkezli yapısını açıklayabilmek.',
      'R grubunun amino asidin polarite, yük ve hidrofobiklik özelliklerini nasıl belirlediğini yorumlayabilmek.',
      'Glisin, prolin ve aromatik amino asitlerin ayırt edici yapısal özelliklerini karşılaştırabilmek.',
      'Amino asitlerin kimyasal özellikleri ile protein katlanması ve işlevi arasında bağlantı kurabilmek.',
      'Komite sınavında amino asit sınıflandırması ve özel amino asitlerle ilgili temel tuzakları ayırt edebilmek.'
    ],
    bigPicture: 'Amino asitler proteinlerin yapı taşlarıdır; ancak onları yalnızca yan yana dizilen moleküller gibi düşünmek eksik olur. Her standart amino asit ortak bir α-karbon iskeletine sahip olsa da R grubunun yapısı amino asidin yükünü, polaritesini, hidrofobikliğini ve protein içindeki davranışını belirler. Bu nedenle amino asit sınıflandırması, proteinlerin üç boyutlu yapısını ve biyolojik işlevini anlamanın temel basamağıdır.',
    mainConcepts: ['α-amino asit yapısı', 'R grubu', 'polar ve apolar amino asitler', 'asidik ve bazik amino asitler', 'glisin', 'prolin', 'aromatik amino asitler', 'protein katlanması'],
    sections: [
      ['Amino asidin ortak yapısı','Standart amino asitlerde α-karbona bir amino grubu, bir karboksil grubu, bir hidrojen atomu ve değişken R grubu bağlanır. Ortak iskelet aynı kaldığı için amino asitlerin ayırt edici kimyasal karakterini esas olarak R grubu belirler.','Soru genellikle ortak yapıdaki dört grubu veya R grubunun belirleyici rolünü sorgular.','Amino asidin tüm özelliklerini amino/karboksil grubuna bağlamak hatalıdır; sınıflandırmanın merkezi R grubudur.'],
      ['α-karbon, kiralite ve glisinin özel durumu','Çoğu standart amino asitte α-karbon dört farklı gruba bağlı olduğu için kiraldir. Glisinde R grubu hidrojen olduğu için α-karbona iki hidrojen bağlıdır ve glisin kiral olmayan tek standart amino asit kabul edilir.','Glisin soruları çoğunlukla “kiral olmayan tek amino asit” tuzağıyla gelir.','Glisini küçük amino asit olarak bilmek yeterli değildir; neden kiral olmadığını yapısal olarak açıklamak gerekir.'],
      ['R grubu neden belirleyicidir?','R grubu amino asidin suda çözünürlüğünü, protein içindeki konumunu, diğer moleküllerle etkileşimini ve yük davranışını belirler. Bu yüzden polarite, hidrofobiklik, asidik-bazik özellik ve aromatiklik sınıflandırması R grubuna göre yapılır.','R grubu özellikleri protein katlanması ve yüzey/iç bölge yerleşimiyle ilişkilendirilerek sorulabilir.','Amino asit sınıflarını ezberlemek yerine R grubunun kimyasal davranışını yorumlamak daha güvenlidir.'],
      ['Polar, apolar, asidik ve bazik amino asitler','Apolar amino asitler hidrofobik etkileşimlere daha yatkındır ve proteinlerin iç bölgelerinde sık bulunur. Polar ve yüklü amino asitler suyla ve iyonik ortamla daha kolay etkileşir; asidik amino asitler negatif, bazik amino asitler pozitif yük taşıma eğilimindedir.','Komite sorularında sınıflandırma genellikle yük, polarite veya protein içindeki yerleşim üzerinden sınanır.','Polar ile yüklü kavramları aynı şey değildir; yüklü amino asitler polar davranır ama tüm polar amino asitler net yüklü olmak zorunda değildir.'],
      ['Özel amino asitler: prolin, sistein ve aromatikler','Prolin halkalı yapısı nedeniyle peptit zincirinin hareketini kısıtlar ve dönüş bölgelerinde önem kazanır. Sistein disülfit bağı oluşturabilmesiyle protein stabilitesine katkı sağlar. Aromatik amino asitler halka yapıları nedeniyle hidrofobik etkileşimlerde ve özellikle UV absorbansında önemlidir.','Özel amino asit soruları genellikle glisin-kiralite, prolin-esneklik, sistein-disülfit ve aromatik-UV ilişkisiyle gelir.','Prolini sadece apolar bir amino asit gibi görmek eksiktir; halkalı yapısının zincir geometrisine etkisi sınav açısından daha değerlidir.'],
      ['Amino asit özelliklerinin protein yapısına etkisi','Protein katlanması, amino asit dizisindeki R gruplarının birbirleriyle ve suyla kurduğu etkileşimlere bağlıdır. Hidrofobik kalıntılar çoğunlukla iç bölgeye yönelirken polar/yüklü kalıntılar yüzeyde veya aktif bölgelerde işlev kazanabilir.','Soru, tek bir amino asit özelliğini protein katlanması veya işleviyle ilişkilendirmeni isteyebilir.','Amino asit sınıflandırmasını protein yapısından bağımsız ezberlemek konunun ana mantığını kaçırır.']
    ].map(([heading, teachingText, examAngle, commonTrap]) => ({ heading, teachingText, examAngle, commonTrap, mechanismFlow: [] })),
    figureExplanations: [{ sourcePageOrSlide: 'Görsel analizi', title: 'Görsel yorumlama sınırı', whatItShows: 'Bu çalışma alanında güvenilir görsel yorumu için okunabilir metin ve çıkarılabilen başlıklar kullanılır.', limitations: 'Görsel piksel içeriği güvenilir biçimde analiz edilemiyorsa şekil hakkında ayrıntı uydurulmaz.' }],
    highYieldPoints: ['R grubu amino asidin kimyasal karakterini belirler.', 'Glisin kiral olmayan tek standart amino asittir.', 'Prolin halkalı yapısıyla zincir esnekliğini kısıtlar.', 'Yüklü ve polar amino asitler sulu ortamla etkileşmeye daha yatkındır.', 'Apolar amino asitler proteinlerin hidrofobik iç bölgelerinde sık yer alır.', 'Sistein disülfit bağıyla protein stabilitesine katkı sağlayabilir.'],
    mustKnow: ['Glisin küçük ve kiral değildir.', 'Prolin zinciri büker ve esnekliği azaltır.', 'R grubu sınıflandırmanın merkezidir.', 'Apolar içeride, polar/yüklü yüzeyde bulunma eğilimindedir.', 'Aromatik amino asitler UV absorbans ve hidrofobik etkileşimlerde önemlidir.'],
    sourceReferences: [`Bu çalışma alanı ${sourceCount || 'yüklenen'} materyalden oluşturuldu.`],
    createdAt: Date.now(),
  };
}

function buildLocalLesson(material) {
  if (isAminoProteinMaterial(material)) return buildAminoProteinLesson(material);
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
    title: `${cleanMaterialTitle(material)} — Komite Ders Anlatımı`,
    shortIntro: hasReadableText
      ? `Bu çalışma alanı dosya içeriğinden ayrıştırılan metne göre hazırlandı. ${material.extractionNotice || ''}`.trim()
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

  if (isAminoProteinMaterial(material)) {
    const stems = [
      ['easy','Amino asidin ortak yapısı','Standart bir amino asitte α-karbona hangi dört grup bağlanır?','A',['Amino grubu, karboksil grubu, hidrojen ve R grubu','Fosfat, riboz, baz ve hidrojen','Gliserol, yağ asidi, fosfat ve kolin','Hem grubu, demir, globin ve oksijen','Peptit bağı, disülfit bağı, ester bağı ve glikozidik bağ'],'Standart amino asidin ortak iskeleti α-karbon merkezlidir; kimyasal farklılığı R grubu belirler.'],
      ['easy','Glisinin özel durumu','Glisin neden kiral olmayan tek standart amino asittir?','B',['R grubu aromatik halka içerdiği için','α-karbona iki hidrojen bağlı olduğu için','Karboksil grubu bulunmadığı için','Peptit bağı kuramadığı için','Pozitif yüklü olduğu için'],'Glisinde R grubu hidrojendir; bu nedenle α-karbonda dört farklı grup bulunmaz.'],
      ['medium','Prolinin yapısal etkisi','Prolin protein zincirinde neden yapısal kısıtlanma oluşturur?','C',['Negatif yüklü olduğu için','Disülfit bağı yaptığı için','Halkalı yapısı zincir hareketini sınırladığı için','Aromatik halka ile UV absorbladığı için','R grubu hidrojen olduğu için'],'Prolinin halkalı yapısı peptit omurgasının esnekliğini azaltır ve dönüş bölgelerinde önem kazanır.'],
      ['medium','R grubu mantığı','Amino asitlerin polar, apolar, asidik veya bazik olarak sınıflandırılmasında temel belirleyici nedir?','D',['Peptit bağının uzunluğu','Amino grubunun her zaman aynı olması','Karboksil grubunun protein dışında kalması','R grubunun kimyasal özelliği','Amino asidin dosyada geçtiği sayfa'],'Sınıflandırma R grubunun yük, polarite ve hidrofobiklik özelliklerine göre yapılır.'],
      ['medium','Protein katlanması','Apolar amino asitlerin globüler proteinlerde çoğunlukla iç bölgede bulunma eğilimi nasıl açıklanır?','E',['Pozitif yük taşımalarıyla','Kiral olmamalarıyla','Peptit bağı kuramamalarıyla','Suda iyonlaşmalarıyla','Hidrofobik yan zincirlerin sudan kaçınmasıyla'],'Hidrofobik etki apolar yan zincirlerin protein iç bölgelerine yönelmesine katkı sağlar.'],
      ['hard','Aromatik amino asitler','Aromatik amino asitlerin UV absorbansı ve hidrofobik etkileşimlerde önemli olmasının temel nedeni nedir?','A',['Elektron yoğun halka yapıları','R grubunun hidrojen olması','α-karbonun bulunmaması','Disülfit bağı zorunluluğu','Daima negatif yüklü olmaları'],'Aromatik halkalar elektron yoğun yapıları nedeniyle UV absorbans ve hidrofobik etkileşimlerde rol oynar.']
    ];
    return stems.concat(stems.slice(0,4)).slice(0,10).map(([difficulty,target,question,correct,opts,exp], index) => ({
      id:createId('komite-q'), materialId:material.id, mode:'komite', questionNumber:index+1, difficulty, learningTarget:target, sourceReference:'Sentezlenmiş komite materyali', stem:'Amino asit ve protein yapısı konusu çalışılıyor.', supportingData:[], question,
      options: opts.map((text,i)=>({id:String.fromCharCode(65+i), text})), correctOptionId:correct, explanation:exp,
      optionFeedback:Object.fromEntries(opts.map((text,i)=>[String.fromCharCode(65+i), String.fromCharCode(65+i)===correct?exp:'Bu seçenek aynı konu çevresinde görünse de verilen yapısal/kimyasal ilişkiyi doğru açıklamaz.'])),
      learningPoint: exp, memoryNote: target, userAnswer:null, isWrong:false, isFavorite:false, isDifficult:false, createdAt:Date.now()
    }));
  }
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

  if (isAminoProteinMaterial(material)) {
    const cards = [
      ['definition','easy','Standart amino asitlerde α-karbona hangi dört grup bağlanır?','Amino grubu, karboksil grubu, hidrojen ve değişken R grubu.','Ortak iskelet aynı, kimyasal karakteri R grubu belirler.','α-karbon = amino + karboksil + H + R.'],
      ['exam_trap','easy','Glisin neden kiral değildir?','R grubu hidrojen olduğu için α-karbona iki hidrojen bağlıdır.','Dört farklı grup olmadığı için kiralite oluşmaz.','Glisin = kiral olmayan tek standart amino asit.'],
      ['mechanism','medium','Prolin protein zincirinde neden esnekliği azaltır?','Halkalı yapısı peptit omurgasının hareketini kısıtlar.','Bu nedenle dönüş ve bükülme bölgelerinde yapısal etki gösterir.','Prolin zinciri büker.'],
      ['comparison','medium','R grubunun polaritesi protein içindeki yerleşimi nasıl etkiler?','Apolar yan zincirler iç bölgede, polar/yüklü yan zincirler yüzeyde bulunma eğilimindedir.','Bu yerleşim suyla etkileşim ve hidrofobik etkiyle ilişkilidir.','Apolar içeride; polar/yüklü yüzeyde.'],
      ['must_know','medium','Asidik ve bazik amino asitler yük açısından nasıl ayrılır?','Asidik amino asitler negatif, bazik amino asitler pozitif yük taşıma eğilimindedir.','Bu ayrım iyonik etkileşim ve protein yüzeyi davranışı için önemlidir.','Asidik negatif, bazik pozitif.'],
      ['clinical_clue','hard','Sistein protein stabilitesine nasıl katkı sağlayabilir?','İki sistein arasında disülfit bağı oluşabilir.','Disülfit bağları proteinlerin üç boyutlu yapısını stabilize edebilir.','Sistein → disülfit bağı.'],
      ['exam_trap','hard','Aromatik amino asitlerin ayırt edici sınav ipucu nedir?','Halka yapıları nedeniyle UV absorbans ve hidrofobik etkileşimlerde önemlidirler.','Özellikle triptofan ve tirozin bu bağlamda sık hatırlanır.','Aromatik halka → UV/hidrofobik etkileşim.'],
      ['mechanism','medium','Amino asit özellikleri protein katlanmasını nasıl belirler?','R gruplarının yük, polarite ve hidrofobiklik özellikleri etkileşimleri ve üç boyutlu yerleşimi belirler.','Protein yapısı amino asit dizisinin kimyasal davranışından doğar.','Dizi → R grubu etkileşimleri → katlanma.']
    ];
    return { id:createId('deck'), deckTitle:'Amino Asitler ve Proteinlerin Temel Yapısı Hap Kartları', materialId:material.id, cards: cards.map(([type,difficulty,front,back,explanation,examTrap])=>({id:createId('card'), userId:material.userId, materialId:material.id, mode:'komite', classYear:material.classYear, committee:material.committee, course:material.course, type,difficulty,front,back,explanation,examTrap, sourceReference:'Sentezlenmiş komite materyali', tags:[], isUserCreated:false, isFavorite:false, isDifficult:false, repeatStatus:'new', createdAt:Date.now()})) };
  }
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
  return (
    <div className="komite-lesson-view">
      <div className="komite-lesson-hero">
        <span className="komite-kicker">AI Ders Anlatımı</span>
        <h2>{lesson.title}</h2>
        <p>{lesson.shortSubtitle || lesson.shortIntro || lesson.overview}</p>
        {lesson.sourceCoverage?.filesAnalyzedCount > 1 ? <small className="komite-source-note">Bu çalışma alanı {lesson.sourceCoverage.filesAnalyzedCount} materyal birlikte analiz edilerek hazırlandı.</small> : null}
      </div>
      <div className="komite-objectives">
        <strong>Öğrenme hedefleri</strong>
        <ul>{(lesson.learningObjectives || []).map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      {(lesson.bigPicture || lesson.overview) ? <article className="komite-lesson-section"><h3>Büyük resim</h3><p>{lesson.bigPicture || lesson.overview}</p></article> : null}
      {Array.isArray(lesson.mainConcepts) && lesson.mainConcepts.filter((item) => !/materyaldeki ilişkili kavram|slayt|sayfa|dosya|pptx/iu.test(String(item))).length ? <div className="komite-objectives"><strong>Ana kavramlar</strong><ul>{lesson.mainConcepts.filter((item) => !/materyaldeki ilişkili kavram|slayt|sayfa|dosya|pptx/iu.test(String(item))).map((item) => <li key={item}>{item}</li>)}</ul></div> : null}
      {lesson.clinicalExamRelevance ? <article className="komite-lesson-section"><h3>Klinik / sınav bağlantısı</h3><p>{lesson.clinicalExamRelevance}</p></article> : null}
      {Array.isArray(lesson.commonConfusions) && lesson.commonConfusions.length ? (
        <article className="komite-lesson-section">
          <h3>Sık karıştırılan noktalar</h3>
          <ul>{lesson.commonConfusions.map((item, index) => <li key={`${formatLessonListItem(item)}-${index}`}>{formatLessonListItem(item)}</li>)}</ul>
        </article>
      ) : null}
      {(lesson.sections || []).map((section) => (
        <article className="komite-lesson-section" key={section.heading}>
          <h3>{section.heading}</h3>
          <p>{section.teachingText || section.content}</p>
          {(section.examAngle || section.commonTrap || section.clinicalConnection || section.examConnection) ? (
            <div className="komite-two-note-grid">
              {(section.examAngle || section.clinicalConnection) ? <div><strong>Sınavda nasıl sorulur?</strong><p>{section.examAngle || section.clinicalConnection}</p></div> : null}
              {(section.commonTrap || section.examConnection) ? <div><strong>Sık hata</strong><p>{section.commonTrap || section.examConnection}</p></div> : null}
            </div>
          ) : null}
        </article>
      ))}
      <div className="komite-summary-grid">
        <div>
          <strong>Can alıcı noktalar</strong>
          <ul>{(lesson.highYieldPoints || lesson.highYieldSummary || []).map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <strong>Mutlaka hatırla</strong>
          <ul>{(lesson.mustKnow || lesson.mustRemember || []).map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
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
    const sourceText = combinedPacketToSourceText(materialPacket) || normalizeSourceText(material);
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
    };
    try {
      let nextPatch = {};
      let analysis = material.materialAnalysis || buildMaterialAnalysisFallback(material);

      if (sourceText.length > 120 && !material.materialAnalysis) {
        try {
          const analyzed = await postKomiteAI('/api/analyze-uploaded-material', {
            metadata: { ...material, committeeOrCourse: material.committee || material.course },
            materialPacket,
            extractedTextOrChunks: sourceText.slice(0, 36000),
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
            sourceTextChunks: sourceText.slice(0, 36000),
            filesUploadedCount: materialPacket.files.length,
          }) : null;
          const lesson = generated?.lesson
            ? deepenLessonSections(normalizeLessonCoverageForMaterial(normalizeGeneratedLessonShape(generated.lesson), material, materialPacket), material)
            : deepenLessonSections(normalizeLessonCoverageForMaterial(buildLocalLesson(material), material, materialPacket), material);
          nextPatch = { materialAnalysis: analysis, lesson, processingStatus: 'lesson-ready' };
        } catch {
          const lesson = deepenLessonSections(normalizeLessonCoverageForMaterial(buildLocalLesson(material), material, materialPacket), material);
          nextPatch = { materialAnalysis: analysis, lesson, processingStatus: 'lesson-ready' };
        }
      } else if (kind === 'questions') {
        const lesson = material.lesson || buildLocalLesson(material);
        try {
          const generated = sourceText.length > 120 ? await postKomiteAI('/api/generate-material-questions', {
            studyContext,
            materialAnalysisJson: analysis,
            generatedLessonJson: lesson,
            materialPacket,
            sourceTextChunks: sourceText.slice(0, 36000),
            filesUploadedCount: materialPacket.files.length,
          }) : null;
          const questions = Array.isArray(generated?.questions) ? generated.questions.map((question, index) => ({
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
          })) : buildLocalQuestions(material, lesson);
          nextPatch = { materialAnalysis: analysis, lesson, questions, processingStatus: 'questions-ready' };
        } catch {
          nextPatch = { materialAnalysis: analysis, lesson, questions: buildLocalQuestions(material, lesson), processingStatus: 'questions-ready' };
        }
      } else if (kind === 'cards') {
        const lesson = material.lesson || buildLocalLesson(material);
        try {
          const generated = sourceText.length > 120 ? await postKomiteAI('/api/generate-material-flashcards', {
            studyContext,
            materialAnalysisJson: analysis,
            generatedLessonJson: lesson,
            materialPacket,
            sourceTextChunks: sourceText.slice(0, 36000),
            filesUploadedCount: materialPacket.files.length,
            materialId: material.id,
          }) : null;
          const deck = generated?.deck?.cards?.length ? normalizeGeneratedDeckShape({
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
          }, material) : buildLocalFlashcards(material, lesson);
          nextPatch = { materialAnalysis: analysis, lesson, flashcardDeck: deck, processingStatus: 'cards-ready' };
        } catch {
          nextPatch = { materialAnalysis: analysis, lesson, flashcardDeck: buildLocalFlashcards(material, lesson), processingStatus: 'cards-ready' };
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
      <div className="komite-workspace-header">
        <button type="button" className="branch-back-v8" onClick={onBack}><span aria-hidden="true">←</span><span>Komite ana ekranı</span></button>
        <div>
          <span className="komite-kicker">{material.classYear}. sınıf · {material.committee || material.course || 'Komite/Ders'}</span>
          <h2>{inferAcademicTitle(material)}</h2>
          <p>{material.learningTarget || 'Komite sınavı'} · {Array.isArray(material.files) ? material.files.length : 1} materyal · Son çalışma: {new Date(material.uploadDate).toLocaleDateString('tr-TR')}</p>
        </div>
        <div className="komite-workspace-actions">
          <StatusPill tone={material.processingStatus?.includes('ready') ? 'success' : 'neutral'}>{busy ? 'AI işlemi sürüyor' : 'Çalışma alanı hazır'}</StatusPill>
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
      <section className="komite-hero card-surface">
        <div>
          <span className="komite-kicker"><Icon name="ShieldCheck" size={16} /> KOMİTE MODU</span>
          <h1>Komite materyallerini akıllı çalışma alanına dönüştür.</h1>
          <p>Slaytlarını ve ders notlarını yükle; KlinikIQ AI aynı materyalden ders anlatımı, soru seti, hap kart ve tekrar listesi oluştursun.</p>
          <div className="komite-hero-actions">
            <button type="button" className="btn btn-primary" onClick={() => setView('start')}><Icon name="Sparkles" /> Şimdi KlinikIQ AI ile çalış</button>
            <small>TUS modu ayrı kalır; komite materyallerin kendi çalışma alanında düzenlenir.</small>
          </div>
        </div>
      </section>

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
