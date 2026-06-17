import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';
import { localBackend } from '../services/localBackend.js';
import { generateKomiteStudyContent, KOMITE_GENERATION_ERROR_MESSAGE } from '../services/komiteStudyApi.js';
import { extractKomiteFile, getKomiteFileExtension } from '../utils/komiteFileExtraction.js';

const KOMITE_MATERIALS_STORAGE_KEY = 'komite-materials-v1';
const KOMITE_SOURCE_SCHEMA_VERSION = 3;
const CLASS_YEARS = ['1', '2', '3', '4', '5', '6'];
const LEARNING_TARGETS = ['Komite sınavı', 'Final sınavı', 'Klinik staj', 'Genel tekrar'];
const REVIEW_FILTERS = ['Bu materyal', 'Tüm materyaller'];
const STUDY_TABS = [
  { id: 'lesson', label: 'Ders Anlatımı', icon: 'BookOpen' },
  { id: 'figures', label: 'Görseller', icon: 'Image' },
  { id: 'questions', label: 'Sorular', icon: 'ClipboardList' },
  { id: 'cards', label: 'Hap Kartlar', icon: 'LayeredCards' },
  { id: 'review', label: 'Tekrar', icon: 'RotateCcw' },
];


function KomiteFormDropdown({ label, value, options = [], onChange, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selectedOption = options.find((option) => String(option.value) === String(value)) || options[0] || null;

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className={`komite-field-card komite-custom-select-field ${open ? 'open' : ''}`.trim()} ref={rootRef}>
      <span>{label}</span>
      <button
        type="button"
        className="komite-custom-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel || label}
        onClick={() => setOpen((current) => !current)}
      >
        <strong>{selectedOption?.label || 'Seçiniz'}</strong>
        <span className="komite-custom-select-chevron" aria-hidden="true"><Icon name="ChevronDown" size={16} /></span>
      </button>
      {open ? (
        <div className="komite-custom-select-menu" role="listbox" aria-label={ariaLabel || label}>
          {options.map((option) => {
            const active = String(option.value) === String(value);
            return (
              <button
                type="button"
                key={option.value}
                className={`komite-custom-select-option ${active ? 'active' : ''}`.trim()}
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {active ? <Icon name="CheckCircle" size={16} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

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










function removeLegacyProvenanceFields(material = {}) {
  const cleaned = { ...(material || {}) };
  delete cleaned.materialAnalysis;
  delete cleaned.questionsSourceFingerprint;
  return cleaned;
}

function sanitizeLoadedKomiteMaterial(material = {}) {
  const cleaned = removeLegacyProvenanceFields(material) || {};
  const packet = buildCombinedMaterialPacket(cleaned);
  return { ...cleaned, sourceFingerprint: buildSourceFingerprint(cleaned, packet) };
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
  const clean = String(text || '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  if (!clean) return [];
  const chunks = clean.split(/\n\s*\n/u).map((item) => item.trim()).filter(Boolean);
  const paragraphs = [];
  chunks.forEach((chunk) => {
    if (chunk.length < 900) {
      paragraphs.push(chunk);
      return;
    }
    const sentences = chunk.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g)?.map((item) => item.trim()).filter(Boolean) || [chunk];
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
  });
  return paragraphs;
}

function sanitizeTeachingTextForDisplay(text = '') {
  return String(text || '')
    .replace(/\[\[?FILE\s*\d+[^\]\n]*\]?\]?/giu, ' ')
    .replace(/\[\s*FILE\s*\d+\s*\]/giu, ' ')
    .replace(/===\s*DOSYA\s*\d+\s*METN[İI]\s*===/giu, ' ')
    .replace(/\b(?:fileName|fileType|charCount|cleanedExtractedText|sourceManifest|sourceFingerprint|materialPacket|sourceTextChunks|extractedTextOrChunks|uploadBatchId)\s*:?/giu, ' ')
    .replace(/\b\S+\.(?:pdf|pptx|ppt|docx|txt)\b/giu, ' ')
    .replace(/\b(?:slayt|sayfa)\s*\d+\b/giu, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitInlineListMarkers(text = '') {
  return String(text || '')
    .replace(/:\s+-\s+/gu, ':\n- ')
    .replace(/\s+-\s+(?=(?:\*\*)?[A-ZÇĞİÖŞÜ0-9])/gu, '\n- ')
    .replace(/\s+•\s+/gu, '\n- ');
}

function normalizeInlineDefinitionBreaks(text = '') {
  return String(text || '')
    .replace(/([^\n.!?:;])\s+(?=\*\*[^*]{2,80}:\*\*)/gu, '$1.\n')
    .replace(/([.!?])\s+(?=\*\*[^*]{2,80}:\*\*)/gu, '$1\n')
    .replace(/([^\n.!?:;])\s+(?=\*\*[^*]{2,80}\*\*\s+(?:ise|de|da)\b)/giu, '$1.\n')
    .replace(/([.!?])\s+(?=\*\*[^*]{2,80}\*\*\s+(?:ise|de|da)\b)/giu, '$1\n');
}

function extractBulletTail(text = '') {
  const clean = String(text || '').trim();
  const match = clean.match(/^(.{12,120}?)(\s+(?:Bu|Bunun|Böylece|Dolayısıyla|Bu nedenle|Buna karşılık|Ancak|Örneğin|Ayrıca)\s+.+)$/u);
  if (!match) return { item: clean, tail: '' };
  const item = match[1].replace(/[.;:,]$/u, '').trim();
  const tail = match[2].trim();
  if (!item || item.split(/\s+/u).length > 9) return { item: clean, tail: '' };
  return { item, tail };
}

function isContinuationBullet(text = '', listLength = 0) {
  const clean = String(text || '').trim();
  if (listLength < 2) return false;
  return /^(?:Bu|Bunun|Böylece|Dolayısıyla|Bu nedenle|Buna karşılık|Ancak|Örneğin|Ayrıca)\b/u.test(clean);
}

function lessonTextBlocks(text = '') {
  const prepared = normalizeInlineDefinitionBreaks(splitInlineListMarkers(sanitizeTeachingTextForDisplay(text)));
  const lines = prepared.split(/\n+/u).map((line) => line.trim()).filter(Boolean);
  const blocks = [];
  let paragraph = [];
  let list = [];
  const flushParagraph = () => {
    if (!paragraph.length) return;
    splitReadableParagraphs(paragraph.join(' ')).forEach((item) => blocks.push({ type: 'p', text: item }));
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    blocks.push({ type: 'ul', items: list });
    list = [];
  };
  lines.forEach((line) => {
    const bullet = line.match(/^(?:[-*•]|\d+[.)])\s+(.+)$/u)?.[1];
    if (bullet) {
      flushParagraph();
      const clean = sanitizeTeachingTextForDisplay(bullet).replace(/[.;:]?$/u, '').trim();
      if (!clean) return;
      if (isContinuationBullet(clean, list.length)) {
        flushList();
        paragraph.push(clean);
        return;
      }
      const { item, tail } = extractBulletTail(clean);
      if (item) list.push(item);
      if (tail) {
        flushList();
        paragraph.push(tail);
      }
      return;
    }
    flushList();
    paragraph.push(line);
  });
  flushParagraph();
  flushList();
  return blocks;
}

function InlineLessonText({ text, revealMode = 'postAnswer', maxTerms = 4 }) {
  const parts = String(text || '').split(/(\*\*[^*]+\*\*)/u).filter(Boolean);
  return parts.map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/u)?.[1];
    if (bold) {
      return (
        <strong key={`${bold}-${index}`}>
          <GlossaryText text={bold} enabled revealMode={revealMode} maxTerms={Math.min(maxTerms, 2)} />
        </strong>
      );
    }
    return <GlossaryText key={`${part}-${index}`} text={part} enabled revealMode={revealMode} maxTerms={maxTerms} />;
  });
}

function LessonText({ text, revealMode = 'postAnswer', maxTerms = 4 }) {
  return lessonTextBlocks(text).map((block, index) => {
    if (block.type === 'ul') {
      return <ul key={`list-${index}`}>{block.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}><InlineLessonText text={item} revealMode={revealMode} maxTerms={maxTerms} /></li>)}</ul>;
    }
    return <p key={`p-${index}`}><InlineLessonText text={block.text} revealMode={revealMode} maxTerms={maxTerms} /></p>;
  });
}

function sentenceFromFlowStep(step = '') {
  const raw = String(step || '').replace(/^[\s→\-–—>]+|[\s→\-–—>]+$/g, '').trim();
  if (!raw) return '';
  if (!/[→>]/u.test(raw)) return raw.replace(/\s+/g, ' ');
  const parts = raw.split(/\s*(?:→|>)\s*/u).map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) return raw.replace(/[→>]/gu, ' → ').replace(/\s+/g, ' ');
  return parts.join(' → ');
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
  return `${title || 'Bu ders'}, konuyu anlaşılır bir sıraya yerleştirir; temel kavramları, ilişkileri ve öğrenme açısından önemli noktaları açık bir anlatımla özetler.`;
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



function cleanExtractedTextForMaterial(text = '') {
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
    const storedFile = Array.isArray(material.files) ? material.files[index] : null;
    const fileName = String(match[2] || storedFile?.name || `Materyal ${index + 1}`).trim();
    const cleanedExtractedText = cleanExtractedTextForMaterial(raw.slice(start, end));
    return {
      fileName,
      fileType: storedFile?.type || getFileType(fileName),
      cleanedExtractedText,
      detectedTopics: [],
    };
  }).filter((item) => item.cleanedExtractedText);
}

function buildCombinedMaterialPacket(material = {}) {
  // Critical source-isolation rule: when the current workspace has uploaded files,
  // build the material packet only from the per-file extraction packets created
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
      : [{ fileName: material.fileName || 'Ek metin', fileType: material.fileType || 'text', cleanedExtractedText: cleanExtractedTextForMaterial(material.extractedText || material.pastedText || ''), detectedTopics: [] }]);
  const normalizedFiles = files.map((file) => {
    const cleaned = cleanExtractedTextForMaterial(file.cleanedExtractedText || file.text || '');
    return {
      fileName: file.fileName || file.name || 'Materyal',
      fileType: file.fileType || file.type || getFileType(file.fileName || file.name || ''),
      cleanedExtractedText: cleaned,
      detectedTopics: Array.isArray(file.detectedTopics) ? file.detectedTopics : [],
      detectedStructure: Array.isArray(file.detectedStructure) ? file.detectedStructure : [],
      figures: Array.isArray(file.figures) ? file.figures : [],
      emphasisNotes: Array.isArray(file.emphasisNotes) ? file.emphasisNotes : [],
      charCount: Number(file.charCount || cleaned.length || 0),
      extractionOk: Boolean(file.extractionOk || cleaned),
    };
  });
  const pasted = cleanExtractedTextForMaterial(material.pastedText || '');
  if (pasted) {
    normalizedFiles.unshift({
      fileName: 'Ek ders notu',
      fileType: 'text',
      cleanedExtractedText: pasted,
      detectedTopics: [],
      detectedStructure: [{ type: 'user-note', label: 'Ek ders notu', charCount: pasted.length, preview: pasted.slice(0, 180) }],
      figures: [],
      emphasisNotes: [{ source: 'Ek ders notu', text: pasted.slice(0, 900), importance: 'high' }],
      charCount: pasted.length,
      extractionOk: true,
      isUserNote: true,
    });
  }
  return {
    workspaceId: material.id || '',
    classYear: material.classYear || '',
    committeeName: material.committee || '',
    courseName: material.course || '',
    studyGoal: material.learningTarget || '',
    university: material.university || '',
    figures: Array.isArray(material.extractedFigures) ? material.extractedFigures : [],
    detectedStructure: Array.isArray(material.detectedStructure) ? material.detectedStructure : [],
    files: normalizedFiles,
  };
}

function combinedPacketToSourceText(packet = {}) {
  const files = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  return files
    .map((file) => String(file.cleanedExtractedText || file.text || '').trim())
    .join('\n\n')
    .trim();
}

function balancedPacketToSourceText(packet = {}, maxTotalChars = 36000) {
  const files = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  if (!files.length) return '';
  const perFile = Math.max(4000, Math.floor(maxTotalChars / files.length));
  return files.map((file) => {
    const text = String(file.cleanedExtractedText || file.text || '').trim();
    return text.length > perFile ? text.slice(0, perFile) : text;
  }).join('\n\n').trim();
}

function getMaterialFileCount(material = {}, packet = null) {
  const packetCount = Array.isArray(packet?.files) ? packet.files.length : 0;
  const storedFileCount = Array.isArray(material.files) ? material.files.length : 0;
  const storedPacketCount = Array.isArray(material.filePackets) ? material.filePackets.length : 0;
  return Math.max(packetCount, storedFileCount, storedPacketCount, 1);
}

function clipTextForGeneration(text = '', maxChars = 8000) {
  const clean = String(text || '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  if (clean.length <= maxChars) return clean;
  return `${clean.slice(0, maxChars).trim()}\n\n[Not: Bu kaynak parçası token tasarrufu için kısaltıldı.]`;
}

function compactArrayForGeneration(items = [], maxItems = 12) {
  return Array.isArray(items) ? items.slice(0, maxItems) : [];
}

function compactMaterialPacketForGeneration(packet = {}, kind = 'lesson') {
  const sourceFiles = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  const maxTotalChars = kind === 'lesson' ? 14_000 : kind === 'questions' ? 26_000 : 24_000;
  const noteFiles = sourceFiles.filter((file) => file.isUserNote);
  const regularFiles = sourceFiles.filter((file) => !file.isUserNote);
  const noteBudget = Math.min(6000, Math.max(2500, Math.floor(maxTotalChars * 0.18)));
  const usedByNotes = noteFiles.reduce((sum, file) => sum + Math.min(noteBudget, String(file.cleanedExtractedText || file.text || '').length), 0);
  const remainingBudget = Math.max(8000, maxTotalChars - usedByNotes);
  const perRegularFile = regularFiles.length ? Math.max(1200, Math.floor(remainingBudget / regularFiles.length)) : remainingBudget;

  const files = [
    ...noteFiles.map((file) => ({ ...file, cleanedExtractedText: clipTextForGeneration(file.cleanedExtractedText || file.text || '', noteBudget) })),
    ...regularFiles.map((file) => ({ ...file, cleanedExtractedText: clipTextForGeneration(file.cleanedExtractedText || file.text || '', perRegularFile) })),
  ].map((file) => ({
    fileName: file.fileName || file.name || 'Materyal',
    fileType: file.fileType || file.type || 'file',
    cleanedExtractedText: file.cleanedExtractedText || '',
    detectedTopics: compactArrayForGeneration(file.detectedTopics, 8),
    detectedStructure: compactArrayForGeneration(file.detectedStructure, 8),
    figures: compactArrayForGeneration(file.figures, 6),
    emphasisNotes: compactArrayForGeneration(file.emphasisNotes, 6),
    charCount: Number(file.charCount || String(file.cleanedExtractedText || '').length || 0),
    extractionOk: Boolean(file.extractionOk || file.cleanedExtractedText),
    isUserNote: Boolean(file.isUserNote),
  }));

  return {
    workspaceId: packet.workspaceId || '',
    classYear: packet.classYear || '',
    committeeName: packet.committeeName || '',
    courseName: packet.courseName || '',
    studyGoal: packet.studyGoal || '',
    university: packet.university || '',
    figures: compactArrayForGeneration(packet.figures, 10),
    detectedStructure: compactArrayForGeneration(packet.detectedStructure, 10),
    files,
  };
}

function summarizeLessonForGeneration(lesson = null) {
  if (!lesson) return null;
  return {
    title: lesson.title || lesson.inferredTitle || '',
    overview: lesson.overview || lesson.shortIntro || lesson.bigPicture || '',
    learningObjectives: Array.isArray(lesson.learningObjectives) ? lesson.learningObjectives.slice(0, 8) : [],
    sections: Array.isArray(lesson.sections)
      ? lesson.sections.map((section) => ({
        heading: section.heading || '',
        examAngle: section.examAngle || '',
        commonTrap: section.commonTrap || '',
        clinicalConnection: section.clinicalConnection || '',
      })).slice(0, 10)
      : [],
    highYieldPoints: Array.isArray(lesson.highYieldPoints) ? lesson.highYieldPoints.slice(0, 12) : [],
    commonConfusions: Array.isArray(lesson.commonConfusions) ? lesson.commonConfusions.slice(0, 8) : [],
  };
}

function buildKomiteGenerationPayload(material = {}, kind = 'lesson') {
  const packet = buildCombinedMaterialPacket(material);
  const materialPacket = compactMaterialPacketForGeneration(packet, kind);
  const approximateSourceChars = Array.isArray(materialPacket.files)
    ? materialPacket.files.reduce((sum, file) => sum + String(file.cleanedExtractedText || '').length, 0)
    : 0;
  return {
    sourceFingerprint: buildSourceFingerprint(material, packet),
    metadata: {
      classYear: material.classYear || '',
      committee: material.committee || '',
      course: material.course || '',
      learningTarget: material.learningTarget || '',
      university: material.university || '',
    },
    materialPacket,
    debugMeta: {
      fileCount: Array.isArray(materialPacket.files) ? materialPacket.files.length : 0,
      approximateSourceChars,
      kind,
    },
    existingLesson: kind === 'questions' || kind === 'cards' ? summarizeLessonForGeneration(material.lesson) : null,
  };
}




function cleanMaterialTitle(material = {}) {
  const rawName = String(material.fileName || '').replace(/\.[a-z0-9]+$/i, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  const defaultTitle = material.course || material.committee || 'Ders Materyali';
  const meaningless = /^(das|test|pdf\s*\d*|slayt\s*\d*|ppt\s*\d*|doc\s*\d*|file\s*\d*|untitled|adsız)$/iu;
  if (!rawName || rawName.length < 4 || meaningless.test(rawName)) return defaultTitle;
  return rawName.charAt(0).toLocaleUpperCase('tr') + rawName.slice(1);
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





function normalizeQuestionForDisplay(question = {}) {
  const stem = String(question.stem || '').trim();
  const q = String(question.question || '').trim();
  const supportingData = Array.isArray(question.supportingData)
    ? question.supportingData.filter((item) => item && isMeaningfullyDifferent(item, stem) && isMeaningfullyDifferent(item, q))
    : [];
  return { ...question, stem, question: isMeaningfullyDifferent(q, stem) ? q : '', supportingData };
}















function inferAcademicTitle(material = {}, packet = null) {
  if (material.inferredTitle) return material.inferredTitle;
  if (material.lesson?.inferredTitle) return material.lesson.inferredTitle;
  const lessonTitle = String(material.lesson?.title || material.lesson?.academicTitle || '').trim();
  const base = String(lessonTitle || material.course || material.committee || cleanMaterialTitle(material) || 'Komite Materyali')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/^\s*\d+[.)-]?\s*/u, '')
    .replace(/\b(pptx|pdf|docx|txt|slayt|sayfa|prof\.?|dr\.?|file|document|manual|pure\s+text|text\s+only|one\s+page|two\s+page|three\s+page|\d+\s*page)\b/giu, '')
    .replace(/\s*\(\s*\d+\s*\)\s*$/u, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return base || 'Komite Materyali';
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
  const grouped = useMemo(() => {
    const classMap = materials.reduce((acc, material) => {
      const classYear = String(material.classYear || '?');
      const classKey = `${classYear}. Sınıf`;
      const committeeKey = material.committee || material.course || 'Komite / Ders belirtilmedi';
      if (!acc[classKey]) acc[classKey] = { classYear, committees: {} };
      if (!acc[classKey].committees[committeeKey]) acc[classKey].committees[committeeKey] = [];
      acc[classKey].committees[committeeKey].push(material);
      return acc;
    }, {});

    return Object.entries(classMap)
      .sort(([, a], [, b]) => {
        const aYear = Number(a.classYear);
        const bYear = Number(b.classYear);
        if (Number.isFinite(aYear) && Number.isFinite(bYear)) return aYear - bYear;
        return String(a.classYear).localeCompare(String(b.classYear), 'tr');
      })
      .map(([className, classData]) => ({
        className,
        classYear: classData.classYear,
        committees: Object.entries(classData.committees)
          .sort(([a], [b]) => a.localeCompare(b, 'tr'))
          .map(([committeeName, committeeMaterials]) => ({
            committeeName,
            materials: [...committeeMaterials].sort((a, b) => (b.uploadDate || 0) - (a.uploadDate || 0)),
          })),
      }));
  }, [materials]);

  const activePath = useMemo(() => {
    const active = materials.find((material) => material.id === activeMaterialId) || materials[0] || null;
    if (!active) return null;
    return {
      className: `${active.classYear || '?'}. Sınıf`,
      committeeName: active.committee || active.course || 'Komite / Ders belirtilmedi',
    };
  }, [activeMaterialId, materials]);

  const [expandedClasses, setExpandedClasses] = useState(() => activePath?.className ? { [activePath.className]: true } : {});
  const [expandedCommittees, setExpandedCommittees] = useState(() => activePath ? { [`${activePath.className}::${activePath.committeeName}`]: true } : {});

  useEffect(() => {
    if (!activePath) return;
    setExpandedClasses((current) => ({ ...current, [activePath.className]: true }));
    setExpandedCommittees((current) => ({ ...current, [`${activePath.className}::${activePath.committeeName}`]: true }));
  }, [activePath]);

  if (!materials.length) {
    return <EmptyState title="Henüz materyal yüklemedin." text="Komite slaytlarını yükleyerek ders anlatımı, soru ve hap kart oluşturabilirsin." />;
  }

  return (
    <div className="komite-material-library" aria-label="Materyal kütüphanesi">
      <div className="komite-material-tree">
        {grouped.map(({ className, committees }) => {
          const classOpen = expandedClasses[className] ?? className === activePath?.className;

          return (
            <section className={`komite-tree-class ${classOpen ? 'open' : ''}`.trim()} key={className}>
              <button
                type="button"
                className="komite-tree-class-trigger"
                onClick={() => setExpandedClasses((current) => ({ ...current, [className]: !classOpen }))}
                aria-expanded={classOpen}
              >
                <span className="komite-tree-class-icon"><Icon name="BookOpen" size={18} /></span>
                <span className="komite-tree-class-copy">
                  <strong>{className}</strong>
                </span>
                <Icon name={classOpen ? 'ChevronUp' : 'ChevronDown'} size={17} />
              </button>

              {classOpen ? (
                <div className="komite-tree-committee-list">
                  {committees.map(({ committeeName, materials: committeeMaterials }, index) => {
                    const committeeKey = `${className}::${committeeName}`;
                    const committeeOpen = expandedCommittees[committeeKey] ?? committeeKey === `${activePath?.className}::${activePath?.committeeName}`;
                    const displayedCommitteeName = committeeName || `${index + 1}. Komite`;

                    return (
                      <div className={`komite-tree-course ${committeeOpen ? 'open' : ''}`.trim()} key={committeeKey}>
                        <button
                          type="button"
                          className="komite-tree-course-trigger"
                          onClick={() => setExpandedCommittees((current) => ({ ...current, [committeeKey]: !committeeOpen }))}
                          aria-expanded={committeeOpen}
                        >
                          <span className="komite-tree-course-badge">{String(index + 1).padStart(2, '0')}</span>
                          <span className="komite-tree-course-copy">
                            <strong>{displayedCommitteeName}</strong>
                          </span>
                          <Icon name={committeeOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
                        </button>

                        {committeeOpen ? (
                          <div className="komite-tree-files">
                            {committeeMaterials.map((material) => (
                              <button
                                key={material.id}
                                type="button"
                                className={`komite-tree-file ${activeMaterialId === material.id ? 'active' : ''}`}
                                onClick={() => onOpenMaterial(material.id)}
                              >
                                <span className="komite-tree-file-icon"><Icon name="Notes" size={16} /></span>
                                <span className="komite-tree-file-copy">
                                  <strong>{inferAcademicTitle(material) || material.fileName}</strong>
                                  <em>{material.course || material.fileName} · {new Date(material.uploadDate).toLocaleDateString('tr-TR')}</em>
                                </span>
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
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  );
}


function CardDeckTree({ materials, onOpenMaterial }) {
  const grouped = useMemo(() => {
    const classMap = materials.reduce((acc, material) => {
      const classYear = String(material.classYear || '?');
      const classKey = `${classYear}. Sınıf`;
      const committeeKey = material.committee || material.course || 'Komite / Ders belirtilmedi';
      if (!acc[classKey]) acc[classKey] = { classYear, committees: {} };
      if (!acc[classKey].committees[committeeKey]) acc[classKey].committees[committeeKey] = [];
      acc[classKey].committees[committeeKey].push(material);
      return acc;
    }, {});

    return Object.entries(classMap)
      .sort(([, a], [, b]) => {
        const aYear = Number(a.classYear);
        const bYear = Number(b.classYear);
        if (Number.isFinite(aYear) && Number.isFinite(bYear)) return aYear - bYear;
        return String(a.classYear).localeCompare(String(b.classYear), 'tr');
      })
      .map(([className, classData]) => ({
        className,
        classYear: classData.classYear,
        committees: Object.entries(classData.committees)
          .sort(([a], [b]) => a.localeCompare(b, 'tr'))
          .map(([committeeName, committeeMaterials]) => ({
            committeeName,
            materials: [...committeeMaterials].sort((a, b) => (b.uploadDate || 0) - (a.uploadDate || 0)),
          })),
      }));
  }, [materials]);

  const [expandedClasses, setExpandedClasses] = useState(() => grouped.reduce((acc, item) => ({ ...acc, [item.className]: true }), {}));
  const [expandedCommittees, setExpandedCommittees] = useState(() => {
    const initial = {};
    grouped.forEach((item) => item.committees.forEach((committee) => {
      initial[`${item.className}::${committee.committeeName}`] = true;
    }));
    return initial;
  });

  useEffect(() => {
    setExpandedClasses((current) => {
      const next = { ...current };
      grouped.forEach((item) => {
        if (next[item.className] === undefined) next[item.className] = true;
      });
      return next;
    });
    setExpandedCommittees((current) => {
      const next = { ...current };
      grouped.forEach((item) => item.committees.forEach((committee) => {
        const key = `${item.className}::${committee.committeeName}`;
        if (next[key] === undefined) next[key] = true;
      }));
      return next;
    });
  }, [grouped]);

  return (
    <div className="komite-card-library" aria-label="Hap kart kütüphanesi">
      <div className="komite-card-tree">
        {grouped.map(({ className, committees }) => {
          const classOpen = expandedClasses[className] ?? true;
          return (
            <section className={`komite-card-class ${classOpen ? 'open' : ''}`.trim()} key={className}>
              <button
                type="button"
                className="komite-card-class-trigger"
                onClick={() => setExpandedClasses((current) => ({ ...current, [className]: !classOpen }))}
                aria-expanded={classOpen}
              >
                <span className="komite-card-class-icon"><Icon name="LayeredCards" size={18} /></span>
                <span className="komite-card-class-copy"><strong>{className}</strong></span>
                <Icon name={classOpen ? 'ChevronUp' : 'ChevronDown'} size={17} />
              </button>

              {classOpen ? (
                <div className="komite-card-committee-list">
                  {committees.map(({ committeeName, materials: committeeMaterials }, index) => {
                    const committeeKey = `${className}::${committeeName}`;
                    const committeeOpen = expandedCommittees[committeeKey] ?? true;
                    const displayedCommitteeName = committeeName || `${index + 1}. Komite`;
                    return (
                      <div className={`komite-card-course ${committeeOpen ? 'open' : ''}`.trim()} key={committeeKey}>
                        <button
                          type="button"
                          className="komite-card-course-trigger"
                          onClick={() => setExpandedCommittees((current) => ({ ...current, [committeeKey]: !committeeOpen }))}
                          aria-expanded={committeeOpen}
                        >
                          <span className="komite-card-course-badge">{String(index + 1).padStart(2, '0')}</span>
                          <span className="komite-card-course-copy"><strong>{displayedCommitteeName}</strong></span>
                          <Icon name={committeeOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
                        </button>

                        {committeeOpen ? (
                          <div className="komite-card-decks">
                            {committeeMaterials.map((material) => (
                              <button
                                type="button"
                                key={material.id}
                                className="komite-card-deck-row"
                                onClick={() => onOpenMaterial(material.id)}
                              >
                                <span className="komite-card-deck-icon"><Icon name="LayeredCards" size={16} /></span>
                                <span className="komite-card-deck-copy">
                                  <strong>{material.flashcardDeck?.deckTitle || `${inferAcademicTitle(material)} Hap Kartları`}</strong>
                                  <em>{inferAcademicTitle(material) || material.fileName}</em>
                                </span>
                                <span className="komite-card-deck-action">Çalış <Icon name="ArrowRight" size={15} /></span>
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function formatFileSize(bytes = 0) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function KomiteDashboard({ onStart, onOpenMyMaterials, onOpenCards, onOpenReview }) {
  const cards = [
    {
      title: 'Çalışmaya Başla',
      description: 'Slayt veya not yükle; KlinikIQ materyallerinden ders anlatımı, soru, hap kart ve tekrar akışını gerektiğinde oluştursun.',
      action: 'Materyal Yükle',
      icon: 'Sparkles',
      onClick: onStart,
      primary: true,
    },
    {
      title: 'Çalıştıklarım',
      description: 'Yüklediğin dosyaları sınıf, komite ve ders düzeninde daha düzenli şekilde görüntüle.',
      action: 'Dosyaları Aç',
      icon: 'ClipboardList',
      onClick: onOpenMyMaterials,
    },
    {
      title: 'Hap Kartlar',
      description: 'Kayıtlı kartlarla kısa, hedefli ve dengeli tekrar oturumları başlat.',
      action: 'Kartları Aç',
      icon: 'LayeredCards',
      onClick: onOpenCards,
    },
    {
      title: 'Tekrar Merkezi',
      description: 'Yanlışlarını, zorlandığın kartları ve tekrar listeni tek ekranda takip et.',
      action: 'Tekrarları Gör',
      icon: 'RotateCcw',
      onClick: onOpenReview,
    },
  ];

  return (
    <section className="komite-dashboard-grid komite-dashboard-grid-v60" aria-label="Komite çalışma alanı">
      {cards.map((card) => (
        <button type="button" key={card.title} className={`komite-dashboard-card komite-dashboard-card-v60 ${card.primary ? 'primary' : ''}`} onClick={card.onClick}>
          <span className="komite-card-icon komite-card-icon-v60"><Icon name={card.icon} size={22} /></span>
          <span className="komite-dashboard-card-copy komite-dashboard-card-copy-v60">
            <strong>{card.title}</strong>
            <p>{card.description}</p>
          </span>
          <span className="komite-card-action komite-card-action-v60">{card.action}<Icon name="ArrowRight" size={16} /></span>
        </button>
      ))}
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
        const cleanedExtractedText = cleanExtractedTextForMaterial(extraction.text || '');
        return {
          fileName: file.name,
          fileType: getFileType(file.name),
          cleanedExtractedText,
          detectedTopics: extraction.detectedTopics || [],
          detectedStructure: extraction.detectedStructure || [],
          figures: extraction.figures || [],
          emphasisNotes: extraction.emphasisNotes || [],
          charCount: cleanedExtractedText.length,
          extractionOk: Boolean(extraction.ok && cleanedExtractedText),
        };
      });
      const mergedText = filePackets.map((item) => item.cleanedExtractedText || '').filter(Boolean).join('\n\n').trim();
      const detectedStructure = extractions.flatMap(({ extraction }) => extraction.detectedStructure || []);
      const limitations = extractions.flatMap(({ extraction }) => extraction.limitations || []);
      const figures = extractions.flatMap(({ file, extraction }) => (extraction.figures || []).map((figure) => ({ sourceFile: file.name, ...figure })));
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
        figures,
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
    <section className="komite-start-flow card-surface komite-upload-redesign">
      <div className="komite-upload-hero">
        <div className="komite-upload-hero-copy">
          <h2>Materyal yükle</h2>
          <p>Komite materyallerini ekle; çalışma alanı açıldıktan sonra ders anlatımı, soru ve hap kartları ilgili sekmelerden AI ile oluşturabilirsin.</p>
        </div>
        <button type="button" className="btn btn-secondary komite-upload-cancel-top" onClick={onCancel}>Vazgeç</button>
      </div>

      <form className="komite-start-form komite-start-form-redesign" onSubmit={submit}>
        <div className="komite-upload-grid">
          <KomiteFormDropdown
            label="Sınıf"
            value={form.classYear}
            options={CLASS_YEARS.map((year) => ({ value: year, label: `${year}. sınıf` }))}
            onChange={(nextValue) => update('classYear', nextValue)}
            ariaLabel="Sınıf seçimi"
          />

          <label className="komite-field-card">
            <span>Komite adı</span>
            <input value={form.committee} onChange={(event) => update('committee', event.target.value)} placeholder="Örn. Nöroloji Komitesi" />
          </label>

          <label className="komite-field-card">
            <span>Ders / konu</span>
            <input value={form.course} onChange={(event) => update('course', event.target.value)} placeholder="Örn. Epilepsi, Kardiyak fizyoloji" />
          </label>

          <KomiteFormDropdown
            label="Çalışma hedefi"
            value={form.learningTarget}
            options={LEARNING_TARGETS.map((target) => ({ value: target, label: target }))}
            onChange={(nextValue) => update('learningTarget', nextValue)}
            ariaLabel="Çalışma hedefi seçimi"
          />

          <label className="komite-field-card komite-span-2">
            <span>Üniversite (opsiyonel)</span>
            <input value={form.university} onChange={(event) => update('university', event.target.value)} placeholder="Örn. İstanbul Üniversitesi" />
          </label>
        </div>

        <div
          className={`komite-file-drop komite-file-drop-redesign ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={(event) => { event.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(event) => { event.preventDefault(); setIsDragOver(false); handleFiles(event.dataTransfer.files); }}
        >
          <input id="komite-file-input" type="file" multiple accept=".pdf,.pptx,.docx,.txt" onChange={(event) => handleFiles(event.target.files)} />
          <div className="komite-file-drop-content">
            <div className="komite-file-drop-icon"><Icon name="Notes" size={26} /></div>
            <div className="komite-file-drop-copy">
              <strong>Dosyalarını ekle</strong>
              <p>PDF, PPTX, DOCX ve TXT dosyalarını sürükle-bırak yapabilir veya dosya seçerek yükleyebilirsin.</p>
              <div className="komite-file-drop-note" role="note">
                <span className="komite-file-drop-note-icon"><Icon name="Sparkles" size={16} /></span>
                <span>Aynı komite veya aynı konu başlığındaki dokümanları birlikte yüklemek, KlinikIQ'nun bağlantıları daha doğru kurmasını ve daha tutarlı çıktılar üretmesini sağlar.</span>
              </div>
            </div>
            <div className="komite-file-drop-actions">
              <label htmlFor="komite-file-input" className="komite-file-picker">Dosya seç</label>
              {isExtracting ? <span className="komite-upload-status"><span className="komite-spinner" aria-hidden="true" /> Dosyalar okunuyor…</span> : null}
              {!isExtracting ? (fileNotice ? <span className="komite-upload-status">{fileNotice}</span> : <span className="komite-upload-status komite-upload-muted">Henüz dosya seçilmedi.</span>) : null}
            </div>
          </div>
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

        <label className="komite-textarea-label komite-notes-panel">
          <span>Ek ders notu</span>
          <textarea value={form.pastedText} onChange={(event) => update('pastedText', event.target.value)} rows={5} placeholder="Örneğin hocanın vurguladığı noktalar, eksik kalan slayt içerikleri veya sınavda özellikle önemli olduğunu düşündüğün başlıklar…" />
        </label>

        <div className="komite-form-actions komite-upload-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Vazgeç</button>
          <button type="submit" className="btn btn-primary" disabled={isExtracting || (!selectedFiles.length && !form.pastedText.trim())}>
            <Icon name="Sparkles" /> Ders çalışma alanı oluştur
          </button>
        </div>
      </form>
    </section>
  );
}

function LessonView({ material, onGenerate, status = 'idle' }) {
  const lesson = material.lesson;
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  const sectionAnchors = sections
    .map((section, index) => ({ id: createLessonAnchorId(section.heading, index), title: section.heading || `Bölüm ${index + 1}` }));
  const navigationItems = [
    { id: 'komite-objectives', title: 'Öğrenme hedefleri' },
    ...(lesson?.bigPicture || lesson?.overview ? [{ id: 'komite-big-picture', title: 'Büyük resim' }] : []),
    ...sectionAnchors.filter((item) => item.title && !/^(öğrenme hedefleri|büyük resim|can alıcı noktalar|mutlaka hatırla)$/iu.test(item.title)),
    { id: 'komite-high-yield', title: 'En yüksek verim' },
  ].filter((item) => item.id && item.title);
  const [activeAnchorId, setActiveAnchorId] = useState(navigationItems[0]?.id || '');

  useEffect(() => {
    if (!lesson || !navigationItems.length || typeof IntersectionObserver === 'undefined') return undefined;
    const nodes = navigationItems.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!nodes.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
      if (visible?.target?.id) setActiveAnchorId(visible.target.id);
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.15, 0.35] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [lesson, navigationItems.map((item) => item.id).join('|')]);

  if (!lesson) {
    const hasExtractedText = combinedPacketToSourceText(buildCombinedMaterialPacket(material)).length > 120;
    return <EmptyState title="Ders anlatımı henüz hazır değil" text={hasExtractedText ? "Dosya metni ayrıştırıldı. Ders anlatımını AI ile oluşturmak için butona basabilirsin." : "Bu dosyadan yeterli metin çıkarılamadı. Daha okunabilir dosya yükleyebilir veya metni ek not alanına yapıştırabilirsin."} action={<LoadingPrimaryButton status={status} idleLabel="Ders Anlatımı oluştur" loadingLabel="Ders Anlatımı oluşturuyor…" onClick={onGenerate} />} />;
  }

  const rawObjectives = Array.isArray(lesson.learningObjectives) ? lesson.learningObjectives : [];
  const objectiveIntro = rawObjectives.length && /(:|：)$|^Bu konunun sonunda\b/iu.test(String(rawObjectives[0] || '').trim())
    ? sanitizeTeachingTextForDisplay(rawObjectives[0])
    : '';
  const objectives = objectiveIntro ? rawObjectives.slice(1) : rawObjectives;
  const concepts = Array.isArray(lesson.mainConcepts)
    ? lesson.mainConcepts.filter((item) => !/materyaldeki ilişkili kavram|slayt|sayfa|dosya|pptx/iu.test(String(item)))
    : [];
  const highYield = lesson.highYieldPoints || lesson.highYieldSummary || [];
  const mustKnow = lesson.mustKnow || lesson.mustRemember || [];
  const materialCoverage = Array.isArray(lesson.materialCoverage) ? lesson.materialCoverage : [];
  const coverageSummary = sanitizeTeachingTextForDisplay(lesson.coverageSummary || '');

  return (
    <div className="komite-lesson-view komite-lesson-view-pro">
      <div className="komite-lesson-hero komite-lesson-hero-pro komite-lesson-brief-card">
        <div className="komite-lesson-brief">
          <span className="komite-kicker"><Icon name="BookOpen" size={16} /> Ders Anlatımı</span>
          <p><GlossaryText text={improveLessonIntro(lesson.shortSubtitle || lesson.shortIntro || lesson.overview, lesson.title)} enabled revealMode="postAnswer" maxTerms={4} /></p>
        </div>
      </div>

      <div className="komite-lesson-pro-layout">
        <aside className="komite-lesson-sidebar" aria-label="Ders navigasyonu">
          <div className="komite-sidebar-card">
            <strong>Hızlı erişim</strong>
            {navigationItems.slice(0, 12).map((item) => <a className={activeAnchorId === item.id ? 'active' : ''} href={`#${item.id}`} key={item.id}>{item.title}</a>)}
          </div>
        </aside>

        <main className="komite-lesson-main-flow">
          <section id="komite-objectives" className="komite-objectives komite-objectives-pro">
            <strong>Öğrenme hedefleri</strong>
            {objectiveIntro ? <p className="komite-objective-intro"><InlineLessonText text={objectiveIntro} /></p> : null}
            <ul>{objectives.map((item, index) => <li key={`${item}-${index}`}><InlineLessonText text={sanitizeTeachingTextForDisplay(item)} /></li>)}</ul>
          </section>

          {(lesson.bigPicture || lesson.overview) ? (
            <article id="komite-big-picture" className="komite-lesson-section komite-big-picture-section">
              <h3>Büyük resim</h3>
              <LessonText text={lesson.bigPicture || lesson.overview} />
            </article>
          ) : null}

          {(lesson.clinicalExamRelevance || (Array.isArray(lesson.commonConfusions) && lesson.commonConfusions.length)) ? (
            <div className="komite-context-lines" aria-label="Klinik ve sınav bağlantıları">
              {lesson.clinicalExamRelevance ? (
                <div className="komite-context-line">
                  <strong>Klinik / sınav bağlantısı</strong>
                  <p><GlossaryText text={sanitizeTeachingTextForDisplay(lesson.clinicalExamRelevance)} enabled revealMode="postAnswer" maxTerms={4} /></p>
                </div>
              ) : null}
              {Array.isArray(lesson.commonConfusions) && lesson.commonConfusions.length ? (
                <div className="komite-context-line">
                  <strong>Sık karıştırılan noktalar</strong>
                  <ul>{lesson.commonConfusions.map((item, index) => <li key={`${formatLessonListItem(item)}-${index}`}><GlossaryText text={formatLessonListItem(item)} enabled revealMode="postAnswer" maxTerms={3} /></li>)}</ul>
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
                  {Array.isArray(section.sourceRefs) && section.sourceRefs.length ? (
                    <div className="komite-section-source-refs" aria-label="Bu bölümün kaynak materyalleri">
                      {section.sourceRefs.slice(0, 6).map((sourceRef, sourceIndex) => <span key={`${sourceRef}-${sourceIndex}`}>{sourceRef}</span>)}
                    </div>
                  ) : null}
                  <LessonText text={teachingText} />
                  {Array.isArray(section.keyBoxes) && section.keyBoxes.length ? (
                    <div className="komite-key-box-grid">
                      {section.keyBoxes.slice(0, 4).map((box, boxIndex) => (
                        <div className="komite-key-box" key={`${box.label || 'not'}-${boxIndex}`}>
                          <strong>{box.label || 'Akılda tut'}</strong>
                          <p><GlossaryText text={sanitizeTeachingTextForDisplay(box.text)} enabled revealMode="postAnswer" maxTerms={3} /></p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {(formatMechanismSteps(section.mechanismFlow).length || section.examAngle || section.commonTrap || section.clinicalConnection || section.examConnection) ? (
                    <div className="komite-note-lines">
                      {formatMechanismSteps(section.mechanismFlow).length ? (
                        <div className="komite-note-line komite-flow-line">
                          <strong>Süreç mantığı</strong>
                          <ol>{formatMechanismSteps(section.mechanismFlow).map((step, stepIndex) => <li key={`${step}-${stepIndex}`}><GlossaryText text={step} enabled revealMode="postAnswer" maxTerms={3} /></li>)}</ol>
                        </div>
                      ) : null}
                      {(section.examAngle || section.clinicalConnection) ? <div className="komite-note-line"><strong>Sınavda nasıl sorulur?</strong><p><GlossaryText text={sanitizeTeachingTextForDisplay(section.examAngle || section.clinicalConnection)} enabled revealMode="postAnswer" maxTerms={3} /></p></div> : null}
                      {(section.commonTrap || section.examConnection) ? <div className="komite-note-line"><strong>Sık hata</strong><p><GlossaryText text={sanitizeTeachingTextForDisplay(section.commonTrap || section.examConnection)} enabled revealMode="postAnswer" maxTerms={3} /></p></div> : null}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}

          <div id="komite-high-yield" className="komite-summary-lines komite-summary-grid-pro">
            <div>
              <strong>Can alıcı noktalar</strong>
              <ul>{highYield.map((item, index) => <li key={`${item}-${index}`}><InlineLessonText text={sanitizeTeachingTextForDisplay(item)} /></li>)}</ul>
            </div>
            <div>
              <strong>Mutlaka hatırla</strong>
              <ul>{mustKnow.map((item, index) => <li key={`${item}-${index}`}><InlineLessonText text={sanitizeTeachingTextForDisplay(item)} /></li>)}</ul>
            </div>
          </div>
          {(coverageSummary || materialCoverage.length) ? (
            <section className="komite-coverage-summary" aria-label="Materyal kapsam özeti">
              <strong>Materyal kapsam özeti</strong>
              {coverageSummary ? <p><GlossaryText text={coverageSummary} enabled revealMode="postAnswer" maxTerms={3} /></p> : null}
              {materialCoverage.length ? (
                <div className="komite-coverage-list">
                  {materialCoverage.map((item, index) => (
                    <div className="komite-coverage-item" key={`${item.fileName || 'materyal'}-${index}`}>
                      <span>{item.fileName || `Materyal ${index + 1}`}</span>
                      <em>{item.detectedMainTopic || 'Ana konu belirtilmedi'}</em>
                      <small>{item.representedIn ? `${item.representedIn}: ` : ''}{item.coverageNote || 'Bu materyal ders anlatımında temsil edildi.'}</small>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}

function FiguresView({ material }) {
  const packet = buildCombinedMaterialPacket(material);
  const lessonFigures = Array.isArray(material.lesson?.figureExplanations) ? material.lesson.figureExplanations : [];
  const extractedFigures = [
    ...(Array.isArray(material.extractedFigures) ? material.extractedFigures : []),
    ...(Array.isArray(packet.files) ? packet.files.flatMap((file) => (file.figures || []).map((figure) => ({ sourceFile: file.fileName, ...figure }))) : []),
  ];
  const rawFigures = lessonFigures.length ? lessonFigures : extractedFigures;
  const figures = rawFigures.map((figure, index) => ({
    sourcePageOrSlide: figure.sourcePageOrSlide || [figure.sourceFile, figure.pageOrSlide].filter(Boolean).join(' · ') || 'Materyal geneli',
    analysisStatus: figure.analysisStatus || (lessonFigures.length ? 'partial' : 'unavailable'),
    type: figure.type || 'görsel / tablo ipucu',
    title: figure.title || figure.caption || 'Görsel / tablo notu',
    visibleTextAroundFigure: figure.visibleTextAroundFigure || figure.visibleText || figure.preview || '',
    whatCanBeSaidSafely: figure.whatCanBeSaidSafely || figure.description || figure.interpretation || 'Bu öğe için okunabilen başlık, çevre metni veya tablo izi bulundu; ayrıntılı AI yorumu için Ders Anlatımı oluşturabilirsin.',
    limitations: figure.limitations || 'Görselin piksel içeriği uydurulmadı; yalnızca okunabilen metin ve dosya bağlamı kullanıldı.',
    examRelevance: figure.examRelevance || 'Bu öğe, ilişkili konu anlatımı içinde tablo/görsel sorusu veya ayırıcı bilgiye dönüşebilir.',
  }));
  const statusLabel = { analyzed: 'Analiz edildi', partial: 'Kısmen analiz edildi', unavailable: 'Analiz edilemedi' };
  if (!figures.length) {
    const hasExtractedText = combinedPacketToSourceText(packet).length > 120;
    return <EmptyState title="Görsel yorumu yok" text={hasExtractedText ? "Bu materyalde okunabilir tablo, şekil başlığı veya görsel açıklaması yakalanmadı. Ders anlatımı oluşturulduğunda metinden güvenli görsel bağlantıları varsa burada gösterilir." : "Dosyadan yeterli metin ya da görsel ipucu çıkarılamadı. OCR gerektiren taranmış görseller için metni ek not alanına ekleyebilirsin."} />;
  }
  return (
    <div className="komite-figure-grid">
      {figures.map((figure, index) => {
        const status = figure.analysisStatus || (figure.whatItShows || figure.interpretation ? 'partial' : 'unavailable');
        return (
          <article className="komite-figure-card" key={`${figure.title || figure.type}-${index}`}>
            <div className="komite-figure-card-head"><span>{figure.sourcePageOrSlide || 'Kaynak belirtilmedi'}</span><StatusPill tone={status === 'analyzed' ? 'success' : status === 'partial' ? 'warning' : 'neutral'}>{statusLabel[status] || statusLabel.partial}</StatusPill></div>
            <h3>{figure.title || figure.type || 'Görsel / şekil notu'}</h3>
            <p><GlossaryText text={figure.whatCanBeSaidSafely || figure.whatItShows || figure.interpretation || 'Bu görsel güvenilir biçimde analiz edilemedi.'} enabled revealMode="postAnswer" maxTerms={3} /></p>
            <dl>
              {figure.visibleTextAroundFigure ? <><dt>Okunabilen çevre metni</dt><dd>{figure.visibleTextAroundFigure}</dd></> : null}
              <dt>Sınır</dt><dd><GlossaryText text={figure.limitations || figure.commonMistake || 'Görsel içeriği uydurulmaz; yalnızca okunabilir metin kullanılabilir.'} enabled revealMode="postAnswer" maxTerms={2} /></dd>
              <dt>Sınav değeri</dt><dd><GlossaryText text={figure.examRelevance || 'Görsel tabanlı soru için ek OCR/görsel analiz gerekir.'} enabled revealMode="postAnswer" maxTerms={2} /></dd>
            </dl>
          </article>
        );
      })}
    </div>
  );
}

function QuestionsView({ material, onGenerate, onAnswer, onToggleQuestionFlag, status = 'idle' }) {
  const questions = material.questions || [];
  const [index, setIndex] = useState(0);
  const active = normalizeQuestionForDisplay(questions[index]);

  useEffect(() => { if (index > questions.length - 1) setIndex(0); }, [questions.length, index]);

  if (!questions.length) {
    return <EmptyState title="Sorular henüz hazır değil" text="Yüklenen materyal ve varsa ders anlatımı temelinde 10 öğretici komite sorusu oluşturabilirsin." action={<LoadingPrimaryButton status={status} idleLabel="10 soru oluştur" loadingLabel="Sorular oluşturuluyor…" onClick={onGenerate} icon="ClipboardList" />} />;
  }

  const selected = active?.userAnswer;
  const correctId = active?.correctOptionId;
  const isAnswered = Boolean(selected);
  const selectedFeedback = selected ? active.optionFeedback?.[selected] : '';
  const correctFeedback = correctId ? active.optionFeedback?.[correctId] : '';
  const glossaryRevealMode = isAnswered ? 'postAnswer' : 'preAnswer';

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
            <span><GlossaryText text={active.learningTarget || ''} enabled revealMode={glossaryRevealMode} maxTerms={2} /></span>
          </div>
          <p className="komite-question-stem"><GlossaryText text={active.stem} enabled revealMode={glossaryRevealMode} maxTerms={3} /></p>
          {active.supportingData?.length ? <div className="komite-supporting-data">{active.supportingData.map((item) => <span key={item}><GlossaryText text={item} enabled revealMode={glossaryRevealMode} maxTerms={2} /></span>)}</div> : null}
          {active.question ? <h3><GlossaryText text={active.question} enabled revealMode={glossaryRevealMode} maxTerms={3} /></h3> : null}
          <div className="komite-option-list">
            {active.options.map((option) => {
              const stateClass = isAnswered && option.id === correctId ? 'correct' : isAnswered && option.id === selected ? 'wrong' : '';
              return (
                <button key={option.id} type="button" className={`komite-option ${stateClass}`.trim()} disabled={isAnswered} onClick={() => onAnswer(active.id, option.id)}>
                  <strong>{option.id}</strong><span><GlossaryText text={option.text} enabled revealMode={glossaryRevealMode} maxTerms={2} /></span>
                </button>
              );
            })}
          </div>
          {isAnswered ? (
            <div className="komite-feedback-box">
              {selected === correctId ? (
                <>
                  <strong>Doğru yanıt</strong>
                  <p><GlossaryText text={active.explanation} enabled revealMode="postAnswer" maxTerms={4} /></p>
                  {active.learningPoint ? <p className="komite-memory-note"><GlossaryText text={active.learningPoint} enabled revealMode="postAnswer" maxTerms={3} /></p> : null}{active.memoryNote ? <p className="komite-memory-note"><GlossaryText text={active.memoryNote} enabled revealMode="postAnswer" maxTerms={3} /></p> : null}
                </>
              ) : (
                <>
                  <strong>Neden yanlış yaptın?</strong>
                  <p><GlossaryText text={selectedFeedback} enabled revealMode="postAnswer" maxTerms={3} /></p>
                  <strong>Doğru seçenek neden doğru?</strong>
                  <p><GlossaryText text={correctFeedback} enabled revealMode="postAnswer" maxTerms={3} /></p>
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

function FlashcardsView({ material, onGenerate, onUpdateCard, status = 'idle' }) {
  const deck = material.flashcardDeck;
  const cards = deck?.cards || [];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const active = cards[index];

  useEffect(() => { setFlipped(false); }, [index]);

  if (!cards.length) {
    return <EmptyState title="Hap kart destesi yok" text="Bu materyalden aktif geri çağırma kartları oluşturabilirsin." action={<LoadingPrimaryButton status={status} idleLabel="Hap kartları oluştur" loadingLabel="Hap kartlar oluşturuluyor…" onClick={onGenerate} icon="LayeredCards" />} />;
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
        {flipped ? <><small>Yanıt</small><strong><GlossaryText text={active.back} enabled revealMode="postAnswer" maxTerms={3} /></strong>{active.explanation ? <p><b>Mantık: </b><GlossaryText text={active.explanation} enabled revealMode="postAnswer" maxTerms={3} /></p> : null}{active.examTrap ? <p className="komite-memory-note"><GlossaryText text={active.examTrap} enabled revealMode="postAnswer" maxTerms={3} /></p> : null}</> : <><small>Soru</small><strong><GlossaryText text={active.front} enabled revealMode="preAnswer" maxTerms={3} /></strong><small>Yanıtı görmek için karta tıkla.</small></>}
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

function ReviewItemButton({ icon = 'Activity', eyebrow = '', title = '', meta = '', onClick }) {
  return (
    <button type="button" className="komite-review-item" onClick={onClick}>
      <span className="komite-review-item-icon"><Icon name={icon} size={16} /></span>
      <span className="komite-review-item-copy">
        {eyebrow ? <em>{eyebrow}</em> : null}
        <strong>{title || 'Tekrar öğesi'}</strong>
        {meta ? <small>{meta}</small> : null}
      </span>
      <Icon name="ArrowRight" size={15} />
    </button>
  );
}

function ReviewPanel({ icon, title, description, count, emptyText, children }) {
  return (
    <section className="komite-review-panel">
      <div className="komite-review-panel-head">
        <span className="komite-review-panel-icon"><Icon name={icon} size={17} /></span>
        <span className="komite-review-panel-title">
          <strong>{title}</strong>
          <small>{description}</small>
        </span>
      </div>
      <div className="komite-review-panel-body">
        {count ? children : <p className="komite-review-empty">{emptyText}</p>}
      </div>
    </section>
  );
}

function ReviewCenter({ materials, activeMaterial, onOpenMaterial }) {
  const scopeMaterials = activeMaterial ? [activeMaterial] : materials;
  const wrongQuestions = scopeMaterials.flatMap((material) => (material.questions || []).filter((question) => question.isWrong).map((question) => ({ ...question, material })));
  const difficultCards = scopeMaterials.flatMap((material) => (material.flashcardDeck?.cards || []).filter((card) => card.isDifficult || card.repeatStatus === 'repeat').map((card) => ({ ...card, material })));
  const favorites = scopeMaterials.flatMap((material) => [
    ...(material.questions || []).filter((question) => question.isFavorite).map((question) => ({ ...question, itemKind: 'Soru', material })),
    ...(material.flashcardDeck?.cards || []).filter((card) => card.isFavorite).map((card) => ({ ...card, itemKind: 'Kart', material })),
  ]);
  const weakFocusItems = [
    ...wrongQuestions.map((question) => question.learningTarget || question.topic || question.material.course || question.material.committee || inferAcademicTitle(question.material)),
    ...difficultCards.map((card) => card.tags?.[0] || card.type || card.material.course || card.material.committee || inferAcademicTitle(card.material)),
  ].filter(Boolean);
  const weakFocus = [...new Set(weakFocusItems.map((item) => String(item).replace(/\s+/g, ' ').trim()).filter(Boolean))].slice(0, 4);
  const lessonReviewItems = scopeMaterials.flatMap((material) => [
    ...(material.lesson?.finalReview || []).map((item) => ({ text: item, kind: 'Son gün', material })),
    ...(material.lesson?.highYieldPoints || []).slice(0, 4).map((item) => ({ text: item, kind: 'Yüksek verim', material })),
    ...(material.lesson?.commonConfusions || []).slice(0, 3).map((item) => ({ text: formatLessonListItem(item), kind: 'Sık karışır', material })),
  ]).filter((item) => item.text);
  return (
    <div className="komite-review-center komite-review-center-v141">
      <div className="komite-review-hero komite-review-hero-clean">
        <div className="komite-review-hero-copy">
          <span className="komite-review-hero-icon"><Icon name="RotateCcw" size={18} /></span>
          <div>
            <strong>Hedefli tekrar akışı</strong>
            <p>Yanlış sorularını, zor kartlarını ve favorilerini sade bir çalışma akışında tekrar et.</p>
          </div>
        </div>
      </div>

      <div className="komite-review-grid komite-review-grid-v141">
        <ReviewPanel icon="BookOpen" title="Son Gün Tekrarı" description="Ders anlatımından gelen yüksek verimli tekrar notları." count={lessonReviewItems.length} emptyText="Ders anlatımı oluşturulunca son gün tekrar notları burada görünür.">
          {lessonReviewItems.slice(0, 5).map((item, index) => (
            <ReviewItemButton
              key={`${item.text}-${index}`}
              icon="BookOpen"
              eyebrow={`${item.kind} · ${inferAcademicTitle(item.material)}`}
              title={item.text}
              meta="AI ders anlatımı"
              onClick={() => onOpenMaterial(item.material.id)}
            />
          ))}
        </ReviewPanel>

        <ReviewPanel icon="AlertTriangle" title="Yanlış Sorular" description="Kaçırdığın soruları hedefli tekrar et." count={wrongQuestions.length} emptyText="Bu kapsamda yanlış soru yok.">
          {wrongQuestions.slice(0, 4).map((question) => (
            <ReviewItemButton
              key={question.id}
              icon="ClipboardList"
              eyebrow={inferAcademicTitle(question.material)}
              title={question.question}
              meta={question.learningTarget || 'Soru tekrarı'}
              onClick={() => onOpenMaterial(question.material.id)}
            />
          ))}
        </ReviewPanel>

        <ReviewPanel icon="RotateCcw" title="Zor Kartlar / Tekrar Et" description="Zorlandığın kartları tekrar kuyruğunda tut." count={difficultCards.length} emptyText="Tekrar kuyruğu boş.">
          {difficultCards.slice(0, 4).map((card) => (
            <ReviewItemButton
              key={card.id}
              icon="LayeredCards"
              eyebrow={inferAcademicTitle(card.material)}
              title={card.front}
              meta={card.type || card.tags?.[0] || 'Hap kart'}
              onClick={() => onOpenMaterial(card.material.id)}
            />
          ))}
        </ReviewPanel>

        <ReviewPanel icon="CheckCircle" title="Favoriler" description="İşaretlediğin soru ve kartlara hızlı eriş." count={favorites.length} emptyText="Henüz favori işaretlenmedi.">
          {favorites.slice(0, 4).map((item) => (
            <ReviewItemButton
              key={item.id}
              icon={item.itemKind === 'Kart' ? 'LayeredCards' : 'ClipboardList'}
              eyebrow={`${item.itemKind} · ${inferAcademicTitle(item.material)}`}
              title={item.front || item.question}
              meta="Favori tekrar öğesi"
              onClick={() => onOpenMaterial(item.material.id)}
            />
          ))}
        </ReviewPanel>

        <section className="komite-review-panel komite-review-focus-panel">
          <div className="komite-review-panel-head">
            <span className="komite-review-panel-icon"><Icon name="Target" size={17} /></span>
            <span className="komite-review-panel-title">
              <strong>Zayıf Odak</strong>
              <small>Çalışma verisine göre önceliklendir.</small>
            </span>
          </div>
          {weakFocus.length ? (
            <div className="komite-review-focus-list">
              {weakFocus.map((item) => <span key={item}>{item}</span>)}
            </div>
          ) : (
            <p className="komite-review-empty">Çalışma verisi biriktikçe zayıf odak listesi oluşur.</p>
          )}
        </section>
      </div>
    </div>
  );
}

function StudyWorkspace({ material, materials, onBack, onPatchMaterial, onOpenMaterial }) {
  const [tab, setTab] = useState('lesson');
  const [actionStatus, setActionStatus] = useState({ lesson: 'idle', questions: 'idle', cards: 'idle' });
  const [actionMessage, setActionMessage] = useState({});
    const setModuleActionStatus = (kind, status, message = '') => {
    setActionStatus((current) => ({ ...current, [kind]: status }));
    setActionMessage((current) => ({ ...current, [kind]: message }));
  };

  const generateContent = async (kind) => {
    if (actionStatus[kind] === 'loading') return;
    const alreadyReady = (kind === 'lesson' && material.lesson)
      || (kind === 'questions' && material.questions?.length)
      || (kind === 'cards' && material.flashcardDeck?.cards?.length);
    if (alreadyReady) {
      setModuleActionStatus(kind, 'success', 'Bu içerik zaten hazır.');
      window.setTimeout(() => setModuleActionStatus(kind, 'idle', ''), 2200);
      return;
    }

    const packet = buildCombinedMaterialPacket(material);
    if (combinedPacketToSourceText(packet).length < 80) {
      setModuleActionStatus(kind, 'error', 'Bu çalışma alanında AI içeriği oluşturmak için yeterli okunabilir metin yok.');
      return;
    }

    setModuleActionStatus(kind, 'loading', kind === 'lesson' ? 'Ders anlatımı oluşturuluyor…' : kind === 'questions' ? 'Sorular oluşturuluyor…' : 'Hap kartlar oluşturuluyor…');
    try {
      const payload = buildKomiteGenerationPayload(material, kind);
      const result = await generateKomiteStudyContent({ kind, payload });
      if (kind === 'lesson') {
        onPatchMaterial(material.id, { lesson: result.lesson });
      } else if (kind === 'questions') {
        onPatchMaterial(material.id, { questions: result.questions });
      } else if (kind === 'cards') {
        onPatchMaterial(material.id, { flashcardDeck: result.flashcardDeck });
      }
      setModuleActionStatus(kind, 'success', 'İçerik hazır.');
      window.setTimeout(() => setModuleActionStatus(kind, 'idle', ''), 1800);
    } catch (error) {
      console.error('[komite-generate]', error);
      const supportCode = error?.code ? ` Kod: ${error.code}` : '';
      setModuleActionStatus(kind, 'error', `${error?.message || KOMITE_GENERATION_ERROR_MESSAGE}${supportCode}`);
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
      <InlineStatus status={Object.values(actionStatus).includes('error') ? 'error' : 'idle'} message={Object.values(actionMessage).find(Boolean) || ''} />
      <div className="komite-tabbar" role="tablist" aria-label="Materyal çalışma alanı sekmeleri">
        {STUDY_TABS.map((item) => <button key={item.id} type="button" className={tab === item.id ? 'active' : ''} onClick={() => setTab(item.id)}><Icon name={item.icon} /> {item.label}</button>)}
      </div>
      <div className="komite-tab-panel">
        {tab === 'lesson' ? <LessonView material={material} status={actionStatus.lesson} onGenerate={() => generateContent('lesson')} /> : null}
        {tab === 'figures' ? <FiguresView material={material} /> : null}
        {tab === 'questions' ? <QuestionsView material={material} status={actionStatus.questions} onGenerate={() => generateContent('questions')} onAnswer={answerQuestion} onToggleQuestionFlag={toggleQuestionFlag} /> : null}
        {tab === 'cards' ? <FlashcardsView material={material} status={actionStatus.cards} onGenerate={() => generateContent('cards')} onUpdateCard={updateCard} /> : null}
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
        <div><h2>Hap Kart Kütüphanesi</h2><p>Oluşturduğun kartları sınıf, komite ve materyal düzeyinde düzenli şekilde bul ve çalış.</p></div>
        <button type="button" className="btn btn-secondary" onClick={onBack}>Ana ekrana dön</button>
      </div>
      {decks.length ? <CardDeckTree materials={decks} onOpenMaterial={onOpenMaterial} /> : <EmptyState title="Henüz kart destesi yok." text="Bir materyal açıp Hap Kartlar sekmesinden kart alanını görüntüleyebilirsin." action={<button type="button" className="btn btn-primary" onClick={onBack}>Materyal seç</button>} />}
    </section>
  );
}

function MyMaterialsPage({ materials, activeMaterialId, onOpenMaterial, onBack, onDeleteMaterial }) {
  return (
    <section className="komite-subpage card-surface">
      <div className="komite-section-head">
        <div><h2>Materyal Kütüphanesi</h2><p>Tıp eğitimin boyunca oluşturduğun dersleri sınıf, komite ve konu başlığı düzeyinde hızlıca bul.</p></div>
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
        <section className="home-hero-v8 home-hero-premium-v10 tus-hero-redesign card-surface" aria-label="KlinikIQ Komite çalışma alanı">
          <div className="tus-hero-soft-grid" aria-hidden="true" />
          <div className="tus-hero-dot-field" aria-hidden="true" />

          <div className="home-hero-v10-main tus-hero-main-redesign">
            <div className="home-hero-copy-v8 home-hero-copy-v10 tus-hero-copy-redesign">
              <span className="tus-hero-kicker"><Icon name="Trophy" /> Komite Çalışma Alanı</span>
              <h1 className="home-brand-title-v10 tus-hero-title-redesign">
                KlinikIQ <span>Komite</span>
              </h1>
              <p>
                Komite materyallerini tek yerde topla; ders anlatımı, soru, hap kart ve tekrar akışını aynı panelde düzenli şekilde takip et.
              </p>
              <div className="home-hero-proof-row-v10 tus-hero-proof-redesign" aria-label="Klinik öğrenme özellikleri">
                <span><Icon name="Brain" /><strong>Ders Anlatımı</strong></span>
                <span><Icon name="ClipboardCheck" /><strong>Soru Çalışma Alanı</strong></span>
                <span><Icon name="Sparkles" /><strong>Hap Kartlar</strong></span>
              </div>
            </div>

            <aside className="home-action-panel-v10 tus-action-panel-redesign" aria-label="Ana çalışma aksiyonları">
              <div className="home-actions-v8 home-actions-v10 tus-actions-redesign">
                <button type="button" className="btn btn-primary tus-primary-action-redesign" onClick={() => setView('start')}>
                  <span className="tus-action-icon"><Icon name="Sparkles" /></span>
                  <span>Ders Materyali Yükle</span>
                  <Icon name="ArrowRight" />
                </button>
                <button type="button" className="btn btn-secondary tus-secondary-action-redesign" onClick={() => setView('materials')}>
                  <span className="tus-action-icon"><Icon name="ClipboardList" /></span>
                  <span>Tüm Çalıştıklarım</span>
                  <Icon name="ArrowRight" />
                </button>
                <button type="button" className="btn btn-secondary tus-hero-action tus-tus-action-redesign" onClick={() => setView('review')}>
                  <span className="tus-action-icon"><Icon name="RotateCcw" /></span>
                  <span>Tekrar Merkezine Git</span>
                  <Icon name="ArrowRight" />
                </button>
              </div>
            </aside>
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
      {view === 'review' ? <section className="komite-subpage card-surface komite-review-page"><div className="komite-section-head"><div><h2>Materyal odaklı tekrar</h2><p>Yanlış sorularını, zor kartlarını ve favorilerini materyal ağacına bağlı şekilde tekrar et.</p></div><button type="button" className="btn btn-secondary" onClick={() => setView('dashboard')}>Ana ekrana dön</button></div><ReviewCenter materials={materials} activeMaterial={activeMaterial} onOpenMaterial={openMaterial} /></section> : null}
      {view === 'workspace' && activeMaterial ? <StudyWorkspace material={activeMaterial} materials={materials} onBack={() => setView('dashboard')} onPatchMaterial={patchMaterial} onOpenMaterial={openMaterial} /> : null}
    </section>
  );
}
