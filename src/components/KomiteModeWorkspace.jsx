import { useEffect, useMemo, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { Icon } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';
import { localBackend } from '../services/localBackend.js';
import { generateKomiteStudyContent, KOMITE_GENERATION_ERROR_MESSAGE } from '../services/komiteStudyApi.js';
import { extractKomiteFile, getKomiteFileExtension } from '../utils/komiteFileExtraction.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const KOMITE_MATERIALS_STORAGE_KEY = 'komite-materials-v1';
const KOMITE_SOURCE_SCHEMA_VERSION = 3;
const CLASS_YEARS = ['1', '2', '3', '4', '5', '6'];
const LEARNING_TARGETS = ['Komite sınavı', 'Final sınavı', 'Klinik staj', 'Genel tekrar'];
const REVIEW_FILTERS = ['Bu materyal', 'Tüm materyaller'];
const STUDY_TABS = [
  { id: 'lesson', label: 'Ders Anlatımı', icon: 'BookOpen' },
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

function parseCommonConfusionCard(item = '') {
  const text = formatLessonListItem(item);
  const labeled = {
    confusion: text.match(/karışan nokta\s*:\s*([\s\S]*?)(?=\s+doğru ayrım\s*:|\s+akılda kalacak mesaj\s*:|$)/iu)?.[1],
    distinction: text.match(/doğru ayrım\s*:\s*([\s\S]*?)(?=\s+akılda kalacak mesaj\s*:|$)/iu)?.[1],
    memory: text.match(/akılda kalacak mesaj\s*:\s*([\s\S]*)$/iu)?.[1],
  };
  const cleanLabeled = Object.fromEntries(Object.entries(labeled).map(([key, value]) => [key, sanitizeTeachingTextForDisplay(value || '')]));
  if (cleanLabeled.confusion || cleanLabeled.distinction || cleanLabeled.memory) {
    return refineCommonConfusionCard({
      confusion: cleanLabeled.confusion || 'Sık karışan ayrım',
      distinction: cleanLabeled.distinction || text,
      memory: cleanLabeled.memory || cleanLabeled.distinction || text,
    }, text);
  }
  const [lead, ...rest] = text.split(/\s*:\s*/u);
  if (rest.length && lead.split(/\s+/u).length <= 10) {
    const distinction = rest.join(': ').trim();
    return refineCommonConfusionCard({
      confusion: sanitizeTeachingTextForDisplay(lead),
      distinction: sanitizeTeachingTextForDisplay(distinction),
      memory: sanitizeTeachingTextForDisplay(distinction.split(/(?<=[.!?])\s+/u).slice(-1)[0] || distinction),
    }, text);
  }
  const firstSentence = text.split(/(?<=[.!?])\s+/u).find(Boolean) || text;
  return refineCommonConfusionCard({
    confusion: sanitizeTeachingTextForDisplay(firstSentence),
    distinction: text,
    memory: sanitizeTeachingTextForDisplay(text.split(/(?<=[.!?])\s+/u).slice(-1)[0] || text),
  }, text);
}

function compareLessonText(value = '') {
  return sanitizeTeachingTextForDisplay(value).toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
}

function refineCommonConfusionCard(card = {}, sourceText = '') {
  const confusion = sanitizeTeachingTextForDisplay(card.confusion || '');
  const distinction = sanitizeTeachingTextForDisplay(card.distinction || '');
  const memory = sanitizeTeachingTextForDisplay(card.memory || '');
  const sameConfusionDistinction = compareLessonText(confusion) && compareLessonText(confusion) === compareLessonText(distinction);
  const sameDistinctionMemory = compareLessonText(distinction) && compareLessonText(distinction) === compareLessonText(memory);
  if (!sameConfusionDistinction && !sameDistinctionMemory) return { confusion, distinction, memory };
  const sentences = sanitizeTeachingTextForDisplay(sourceText).split(/(?<=[.!?])\s+/u).map((item) => item.trim()).filter((item) => item.split(/\s+/u).length >= 4);
  const first = sentences[0] || confusion || 'Karıştırılabilecek nokta';
  const second = sentences.find((item) => compareLessonText(item) !== compareLessonText(first)) || distinction || first;
  const last = sentences.slice().reverse().find((item) => compareLessonText(item) !== compareLessonText(first) && compareLessonText(item) !== compareLessonText(second)) || memory || second;
  return {
    confusion: sentenceCaseText(first.replace(/^(?:karışan nokta|sık karışan ayrım)\s*[:：-]\s*/iu, '')),
    distinction: sentenceCaseText(second.replace(/^(?:doğru ayrım|net ayrım)\s*[:：-]\s*/iu, '')),
    memory: sentenceCaseText(last.replace(/^(?:akılda kalacak mesaj|net mesaj)\s*[:：-]\s*/iu, '')),
  };
}

function sentenceCaseText(text = '') {
  const clean = sanitizeTeachingTextForDisplay(text).replace(/[.!?]+$/u, '').trim();
  if (!clean) return '';
  return `${clean.charAt(0).toLocaleUpperCase('tr')}${clean.slice(1)}.`;
}

function isGenericLessonTitle(text = '') {
  const clean = sanitizeTeachingTextForDisplay(text);
  return !clean || GENERIC_COMPONENT_TITLE_PATTERN.test(clean) || TECHNICAL_LESSON_NOTE_PATTERN.test(clean) || RAW_SOURCE_LINE_PATTERN.test(clean);
}

function stripObjectiveLead(text = '', heading = '') {
  const escapedHeading = String(heading || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return sanitizeTeachingTextForDisplay(text)
    .replace(escapedHeading ? new RegExp(`^${escapedHeading}\\s*(?:konusunda|bölümünde|kapsamında|ile)?\\s*`, 'iu') : /^$/u, '')
    .replace(/^\s*(?:bu konu|bu bölüm|bu başlık)\s*(?:ile|için|kapsamında)?\s*/iu, '')
    .replace(/^\s*→\s*/u, '')
    .trim();
}

function formatLearningObjectiveForDisplay(item = '', index = 0, sections = []) {
  const clean = sanitizeTeachingTextForDisplay(item);
  if (!clean) return '';
  const heading = sections[index]?.displayHeading || sections[index]?.heading || sections[0]?.displayHeading || '';
  if (/→/u.test(clean)) {
    const [topicPart, ...rest] = clean.split(/\s*→\s*/u);
    const topic = isGenericLessonTitle(topicPart) ? heading : sanitizeTeachingTextForDisplay(topicPart);
    const body = stripObjectiveLead(rest.join(' '), topic || heading);
    if (!body) return sentenceCaseText(topic);
    if (topic && !isGenericLessonTitle(topic) && !new RegExp(`^${String(topic).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'iu').test(body)) {
      return sentenceCaseText(`${topic} kapsamında ${body.charAt(0).toLocaleLowerCase('tr')}${body.slice(1)}`);
    }
    return sentenceCaseText(body);
  }
  const trimmed = stripObjectiveLead(clean, heading);
  if (!trimmed) return '';
  return sentenceCaseText(trimmed);
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

function cleanLessonHeadingForDisplay(value = '', fallback = '') {
  const raw = sanitizeTeachingTextForDisplay(value);
  const fallbackClean = sanitizeTeachingTextForDisplay(fallback);
  const fallbackUsable = fallbackClean && !isGenericLessonTitle(fallbackClean) ? fallbackClean : '';
  if (!raw) return fallbackUsable;
  const withoutPresenter = raw
    .replace(/\b(?:prof\.?|doç\.?|dr\.?|öğr\.?\s*gör\.?)\s+[A-ZÇĞİÖŞÜa-zçğıöşü .-]{2,80}$/u, '')
    .replace(/\b\S+\.(?:pdf|pptx|ppt|docx|txt)\b/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
  const sourceLike = RAW_SOURCE_LINE_PATTERN.test(raw) || /[/|_]{1,}/u.test(raw);
  if (!sourceLike && !GENERIC_COMPONENT_TITLE_PATTERN.test(withoutPresenter) && !TECHNICAL_LESSON_NOTE_PATTERN.test(withoutPresenter)) return withoutPresenter;
  const normalized = withoutPresenter
    .split(/\s*(?:\/|\||-|–|—|:)\s*/u)
    .map((part) => sanitizeTeachingTextForDisplay(part))
    .filter((part) => part && !/^(?:sunum|lecture|slide|slayt|başlık|title)$/iu.test(part))
    .slice(0, 3)
    .join(' ')
    .replace(/\bPHYSIOPATHOLOGY\b/giu, 'Patofizyoloji')
    .replace(/\bPATHOPHYSIOLOGY\b/giu, 'Patofizyoloji')
    .replace(/\bTREATMENT\b/giu, 'Tedavi yaklaşımı')
    .replace(/\bMANAGEMENT\b/giu, 'Yönetim yaklaşımı')
    .replace(/\bDIAGNOSIS\b/giu, 'Tanı yaklaşımı')
    .replace(/\bCLASSIFICATION\b/giu, 'Sınıflama mantığı')
    .replace(/\bCRITERIA\b/giu, 'Tanı ölçütleri')
    .replace(/\bSIGNS?\s+AND\s+SYMPTOMS\b/giu, 'Klinik bulgular')
    .replace(/\bTYPE\b/giu, 'Tip')
    .replace(/\s+/g, ' ')
    .trim();
  if (!normalized || GENERIC_COMPONENT_TITLE_PATTERN.test(normalized) || TECHNICAL_LESSON_NOTE_PATTERN.test(normalized)) return fallbackUsable;
  if (/^[A-ZÇĞİÖŞÜ0-9\s/():,._-]{10,}$/u.test(normalized)) {
    return normalized.toLocaleLowerCase('tr').replace(/(^|\s)(\p{L})/gu, (_, space, letter) => `${space}${letter.toLocaleUpperCase('tr')}`);
  }
  return normalized;
}

function inferLessonHeadingFromContent(section = {}, index = 0) {
  const candidates = [
    ...(Array.isArray(section.subHeadings) ? section.subHeadings : []),
    ...(Array.isArray(section.keySubtopics) ? section.keySubtopics : []),
    section.examAngle,
    section.clinicalConnection,
    section.teachingText,
    section.content,
  ];
  for (const candidate of candidates) {
    const clean = sanitizeTeachingTextForDisplay(candidate);
    const firstSentence = clean.split(/(?<=[.!?])\s+/u).find(Boolean) || clean;
    const compact = firstSentence
      .replace(/^\s*(?:şu şekilde sorulur|sınavda|klinik olarak|temel olarak)\s*[:：-]?\s*/iu, '')
      .split(/\s+/u)
      .slice(0, 10)
      .join(' ')
      .replace(/[.;:,!?]+$/u, '')
      .trim();
    if (compact.split(/\s+/u).length >= 3 && compact.length <= 96 && !isGenericLessonTitle(compact)) return compact;
  }
  return `Komite konusu ${index + 1}`;
}

function subHeadingHasContent(subHeading = '', section = {}, teachingText = '') {
  const clean = sanitizeTeachingTextForDisplay(subHeading);
  if (isGenericLessonTitle(clean)) return false;
  const normalizedSub = clean.toLocaleLowerCase('tr');
  const normalizedText = sanitizeTeachingTextForDisplay(teachingText || section.teachingText || section.content).toLocaleLowerCase('tr');
  if (normalizedText.includes(normalizedSub) && normalizedText.split(/\s+/u).length >= 35) return true;
  if (/\b(?:mekanizma|patofizyoloji|neden|sonuç|fizyoloji)\b/iu.test(clean) && (section.mechanismFlow?.length || section.algorithmSteps?.length)) return true;
  if (/\b(?:klinik|bulgu|semptom|tablo)\b/iu.test(clean) && section.clinicalConnection) return true;
  if (/\b(?:tanı|laboratuvar|eşik|kriter|test)\b/iu.test(clean) && section.tableInsights?.length) return true;
  if (/\b(?:ayırıcı|ayrım|karış|fark)\b/iu.test(clean) && (section.comparisonPoints?.length || section.commonTrap)) return true;
  if (/\b(?:tedavi|yönetim|yaklaşım|prensip)\b/iu.test(clean) && (section.algorithmSteps?.length || section.keyBoxes?.length)) return true;
  return false;
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

const TECHNICAL_LESSON_NOTE_PATTERN = /\b(?:dosya bazl[ıi]|dosya işleme|materyal(?:ler)?(?:inden|in)?\s+(?:ana konusu|çıkarılan|temsil)|materyaller temsil edildi|çalışma notları yapılandırıldı|ana konular aşağıda yapılandırıldı|aşağıda yapılandırıldı|temsil edildi|materyal kapsam|coverageSummary|materialCoverage|sourceManifest|sourceFingerprint|source coverage|output structure|MATERIAL_DIGEST|chunk|grup\s*\d+|üretim süreci|teknik nedenle|extraction warning|extraction|ayrıştırılan metin|API bağlamı|öğretici excerpt|görsel sekmesi için|ana konu belirtildi|her dosyanın ana konusu|ilişkili başlıklar birleştirildi|farklı konular tek başlıkta ezilmedi)\b/iu;
const RAW_SOURCE_LINE_PATTERN = /^(?:[A-ZÇĞİÖŞÜ0-9][A-ZÇĞİÖŞÜ0-9\s/():,._-]{10,}|(?:prof\.?|doç\.?|dr\.?|öğr\.?\s*gör\.?)\b|.*\.(?:pdf|pptx|ppt|docx|txt)\b)/iu;
const GENERIC_COMPONENT_TITLE_PATTERN = /^(?:akış|tablo|ayrım|şema|bilgi|özet|görsel yorumu|şema açıklaması|tablonun ana mesajı|süreç mantığı|son kontrol|mini tekrar|sık hata|sınav ipucu|kritik güvenlik|bilgi kutusu|akılda tut|temel açıklama|klinik tablo|mekanizma\s*\/?\s*patofizyoloji|tanı\s*\/?\s*laboratuvar|tedavi prensipleri|ayırıcı düşünme|bölüm\s*\d+|konu bölümü\s*\d+|section\s*\d+|part\s*\d+|bu konu)$/iu;

function stripTechnicalLessonSentences(text = '') {
  return String(text || '')
    .split(/(?<=[.!?])\s+|\n+/u)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !TECHNICAL_LESSON_NOTE_PATTERN.test(part))
    .filter((part) => !RAW_SOURCE_LINE_PATTERN.test(part))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitizeTeachingTextForDisplay(text = '') {
  const clean = String(text || '')
    .replace(/\[\[?FILE\s*\d+[^\]\n]*\]?\]?/giu, ' ')
    .replace(/\[\s*FILE\s*\d+\s*\]/giu, ' ')
    .replace(/===\s*DOSYA\s*\d+\s*METN[İI]\s*===/giu, ' ')
    .replace(/\b(?:fileName|fileType|charCount|cleanedExtractedText|sourceManifest|sourceFingerprint|materialPacket|sourceTextChunks|extractedTextOrChunks|uploadBatchId)\s*:?/giu, ' ')
    .replace(/\b\S+\.(?:pdf|pptx|ppt|docx|txt)\b/giu, ' ')
    .replace(/\b(?:slayt|sayfa)\s*\d+\b/giu, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return stripTechnicalLessonSentences(clean);
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
  let table = [];
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
  const flushTable = () => {
    if (!table.length) return;
    if (table.length >= 2 && table.some((line) => /\|\s*:?-{3,}:?\s*\|/u.test(line))) {
      blocks.push({ type: 'table', lines: table });
    } else {
      paragraph.push(table.join(' '));
    }
    table = [];
  };
  lines.forEach((line) => {
    if (/^\|.+\|$/u.test(line)) {
      flushParagraph();
      flushList();
      table.push(line);
      return;
    }
    flushTable();
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
  flushTable();
  flushParagraph();
  flushList();
  return blocks;
}

function markdownTableRows(lines = []) {
  const rows = lines
    .map((line) => line.trim().replace(/^\||\|$/gu, '').split('|').map((cell) => sanitizeTeachingTextForDisplay(cell)))
    .filter((row) => row.length > 1);
  if (rows.length < 2) return null;
  const separatorIndex = rows.findIndex((row) => row.every((cell) => /^:?-{3,}:?$/u.test(cell)));
  if (separatorIndex < 1) return null;
  return {
    head: rows[separatorIndex - 1],
    body: rows.slice(separatorIndex + 1),
  };
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
    if (block.type === 'table') {
      const table = markdownTableRows(block.lines);
      if (!table) return null;
      return (
        <div className="komite-markdown-table-wrap" key={`table-${index}`}>
          <table className="komite-markdown-table">
            <thead>
              <tr>{table.head.map((cell, cellIndex) => <th key={`${cell}-${cellIndex}`}><InlineLessonText text={cell} revealMode={revealMode} maxTerms={2} /></th>)}</tr>
            </thead>
            <tbody>
              {table.body.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}><InlineLessonText text={cell} revealMode={revealMode} maxTerms={2} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return <p key={`p-${index}`}><InlineLessonText text={block.text} revealMode={revealMode} maxTerms={maxTerms} /></p>;
  });
}

function sentenceFromFlowStep(step = '') {
  const raw = String(step || '').replace(/^[\s→\-–—>]+|[\s→\-–—>]+$/g, '').trim();
  if (!raw) return '';
  if (raw.split(/\s+/u).length < 7 && !/[.:;→>]/u.test(raw)) return '';
  if (GENERIC_COMPONENT_TITLE_PATTERN.test(raw)) return '';
  if (!/[→>]/u.test(raw)) {
    const clean = raw.replace(/\s+/g, ' ');
    if (!/(?:çünkü|bu nedenle|sonuçta|böylece|ardından|sonrasında|neden|yol aç|geliş|oluş|artar|azalır|yansır|klinik|laboratuvar|tanı|tedavi|yönetim|karar|mekanizma|bulgu|risk|komplikasyon)/iu.test(clean)) return '';
    return clean;
  }
  const parts = raw.split(/\s*(?:→|>)\s*/u).map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) return raw.replace(/[→>]/gu, ' → ').replace(/\s+/g, ' ');
  if (parts.some((part) => part.split(/\s+/u).length < 2)) return '';
  return parts.join(' → ');
}

function formatMechanismSteps(flow = []) {
  if (!Array.isArray(flow)) return [];
  return displayList(flow.map(sentenceFromFlowStep).filter(Boolean), 6);
}

const LESSON_SECTION_ACCENTS = [
  { accent: '#14b8a6', soft: 'rgba(20, 184, 166, 0.12)' },
  { accent: '#38bdf8', soft: 'rgba(56, 189, 248, 0.12)' },
  { accent: '#a78bfa', soft: 'rgba(167, 139, 250, 0.13)' },
  { accent: '#f59e0b', soft: 'rgba(245, 158, 11, 0.12)' },
  { accent: '#22c55e', soft: 'rgba(34, 197, 94, 0.12)' },
  { accent: '#f472b6', soft: 'rgba(244, 114, 182, 0.12)' },
];

function lessonAccentStyle(index = 0) {
  const accent = LESSON_SECTION_ACCENTS[index % LESSON_SECTION_ACCENTS.length];
  return {
    '--komite-section-accent': accent.accent,
    '--komite-section-accent-soft': accent.soft,
  };
}

function displayList(value = [], maxItems = 8, exclude = []) {
  const items = Array.isArray(value) ? value : value ? [value] : [];
  const seen = new Set();
  const excludedKeys = (Array.isArray(exclude) ? exclude : [exclude])
    .map((item) => sanitizeTeachingTextForDisplay(item).toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const output = [];
  items.forEach((item) => {
    const text = sanitizeTeachingTextForDisplay(typeof item === 'string' ? item : item?.text || item?.content || item?.summary || Object.values(item || {}).filter(Boolean).join(' '));
    const key = text.toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
    if (TECHNICAL_LESSON_NOTE_PATTERN.test(text) || RAW_SOURCE_LINE_PATTERN.test(text) || GENERIC_COMPONENT_TITLE_PATTERN.test(text)) return;
    const duplicatesExcluded = excludedKeys.some((excludedKey) => key.length > 42 && excludedKey.length > 42 && (key.includes(excludedKey) || excludedKey.includes(key)));
    const duplicatesSeen = [...seen].some((seenKey) => key.length > 42 && seenKey.length > 42 && (key.includes(seenKey) || seenKey.includes(key)));
    if (!text || text.split(/\s+/u).length < 3 || seen.has(key) || duplicatesSeen || duplicatesExcluded) return;
    seen.add(key);
    output.push(text);
  });
  return output.slice(0, maxItems);
}

function keyBoxTone(label = '') {
  const clean = String(label || '').toLocaleLowerCase('tr');
  if (/güvenlik|acil|kontrendike|risk|hayati/iu.test(clean)) return 'safety';
  if (/hata|dikkat|karış|tuzak|yanlış/iu.test(clean)) return 'warning';
  if (/sınav|ayırt|ipucu|puan/iu.test(clean)) return 'exam';
  return 'info';
}

function displayKeyBoxes(boxes = [], exclude = []) {
  const excludedKeys = (Array.isArray(exclude) ? exclude : [exclude])
    .map((item) => sanitizeTeachingTextForDisplay(item).toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const seen = new Set();
  return (Array.isArray(boxes) ? boxes : [])
    .map((box) => ({
      label: sanitizeTeachingTextForDisplay(box?.label || box?.title || 'Komite için kritik'),
      text: sanitizeTeachingTextForDisplay(box?.text || box?.content || box?.body || box?.description),
    }))
    .filter((box) => {
      const key = box.text.toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
      const duplicatesExcluded = excludedKeys.some((excludedKey) => key.length > 42 && excludedKey.length > 42 && (key.includes(excludedKey) || excludedKey.includes(key)));
      if (!box.text || box.text.split(/\s+/u).length < 5 || TECHNICAL_LESSON_NOTE_PATTERN.test(box.text) || seen.has(key) || duplicatesExcluded) return false;
      if (/kritik güvenlik/iu.test(box.label) && !/\b(?:acil|hayati|kontrendike|risk|şok|kanama|hava yolu|resüsitasyon|mortalite|toksisite|doz|hasta güvenliği|öncelik)\b/iu.test(box.text)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 3);
}

function SectionInsightBlock({ title, items = [], icon = 'Lightbulb', tone = 'info', ordered = false }) {
  const cleanItems = displayList(items, 7);
  if (!cleanItems.length) return null;
  const ListTag = ordered ? 'ol' : 'ul';
  return (
    <div className={`komite-learning-block ${tone}`.trim()}>
      <div className="komite-learning-block-head">
        <Icon name={icon} size={17} />
        <strong>{title}</strong>
      </div>
      <ListTag>
        {cleanItems.map((item, index) => <li key={`${title}-${item}-${index}`}><InlineLessonText text={item} maxTerms={3} /></li>)}
      </ListTag>
    </div>
  );
}

function improveLessonIntro(text = '', title = '') {
  const clean = sanitizeTeachingTextForDisplay(text)
    .replace(/yüklenen komite materyallerindeki/giu, 'bu çalışma alanındaki')
    .replace(/tek tek ezberlenecek başlıklar olarak değil,?/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean && clean.length >= 80 && !TECHNICAL_LESSON_NOTE_PATTERN.test(clean) && !/^(ders anlatımı|büyük resim)$/iu.test(clean)) return clean;
  return '';
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

function scoreKomiteTeachingLine(line = '') {
  let score = 0;
  if (/^\[(?:Sayfa|Slayt|Başlık|Baslik|Tablo|Vurgu|Not)\b/iu.test(line)) score += 6;
  if (/\b(?:tanım|tanı|test|laboratuvar|görüntüleme|tedavi|yönetim|sınıflama|sınıflandır|algoritma|akış|tablo|şekil|klinik|mekanizma|patofizyoloji|ayırıcı|komplikasyon|önemli|dikkat|sınav|vurg)\b/iu.test(line)) score += 5;
  if (/[|]\s|:\s+\S/u.test(line)) score += 2;
  if (line.length >= 45 && line.length <= 260) score += 1;
  return score;
}

function buildTeachingExcerptForGeneration(text = '', maxChars = 220_000) {
  const clean = String(text || '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  if (clean.length <= maxChars) return clean;

  const lines = clean.split(/\n+/u).map((line) => line.trim()).filter(Boolean);
  const headBudget = Math.floor(maxChars * 0.24);
  const tailBudget = Math.floor(maxChars * 0.08);
  const scoredBudget = maxChars - headBudget - tailBudget - 800;
  const head = clean.slice(0, headBudget).trim();
  const tail = clean.slice(Math.max(0, clean.length - tailBudget)).trim();
  const selected = lines
    .map((line, index) => ({ line, index, score: scoreKomiteTeachingLine(line) + Math.max(0, 12 - index) * 0.05 }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const kept = [];
  const seen = new Set();
  let used = 0;
  selected.forEach((item) => {
    const normalized = item.line.toLocaleLowerCase('tr').replace(/\s+/g, ' ').slice(0, 180);
    if (seen.has(normalized)) return;
    if (used + item.line.length > scoredBudget) return;
    seen.add(normalized);
    kept.push(item);
    used += item.line.length + 1;
  });

  const middle = kept
    .sort((a, b) => a.index - b.index)
    .map((item) => item.line)
    .join('\n');

  return [
    head,
    '[Not: Materyal çok uzun olduğu için başlık, tablo, algoritma, tanı, tedavi, vurgu ve sınavlık satırlar öncelikli korunmuştur.]',
    middle,
    tail ? `[Son kısım]\n${tail}` : '',
  ].filter(Boolean).join('\n\n').slice(0, maxChars).trim();
}

function compactArrayForGeneration(items = [], maxItems = 12) {
  return Array.isArray(items) ? items.slice(0, maxItems) : [];
}

function compactMaterialPacketForGeneration(packet = {}, kind = 'lesson') {
  const sourceFiles = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  if (kind === 'lesson') {
    const lessonFiles = sourceFiles.slice(0, 10);
    const noteFiles = lessonFiles.filter((file) => file.isUserNote);
    const regularFiles = lessonFiles.filter((file) => !file.isUserNote);
    const maxLessonPayloadChars = 2_600_000;
    const noteBudget = noteFiles.length ? Math.min(260_000, Math.floor(maxLessonPayloadChars * 0.14 / noteFiles.length)) : 0;
    const remainingBudget = maxLessonPayloadChars - (noteBudget * noteFiles.length);
    const regularBudget = regularFiles.length ? Math.max(90_000, Math.floor(remainingBudget / regularFiles.length)) : remainingBudget;
    const files = [
      ...noteFiles.map((file) => ({ file, budget: Math.max(40_000, noteBudget) })),
      ...regularFiles.map((file) => ({ file, budget: regularBudget })),
    ].map(({ file, budget }) => {
      const rawText = String(file.cleanedExtractedText || file.text || '').trim();
      return {
        fileName: file.fileName || file.name || 'Materyal',
        fileType: file.fileType || file.type || 'file',
        cleanedExtractedText: buildTeachingExcerptForGeneration(rawText, budget),
        fullCharCount: rawText.length,
        detectedTopics: compactArrayForGeneration(file.detectedTopics, 14),
        detectedStructure: compactArrayForGeneration(file.detectedStructure, 30),
        emphasisNotes: compactArrayForGeneration(file.emphasisNotes, 18),
        charCount: Number(file.charCount || rawText.length || 0),
        extractionOk: Boolean(file.extractionOk || file.cleanedExtractedText),
        isUserNote: Boolean(file.isUserNote),
      };
    });

    return {
      workspaceId: packet.workspaceId || '',
      classYear: packet.classYear || '',
      committeeName: packet.committeeName || '',
      courseName: packet.courseName || '',
      studyGoal: packet.studyGoal || '',
      university: packet.university || '',
      detectedStructure: compactArrayForGeneration(packet.detectedStructure, 40),
      files,
    };
  }
  const maxTotalChars = kind === 'lesson' ? 18_000 : kind === 'questions' ? 26_000 : 24_000;
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
    const unique = Array.from(files || []).filter(Boolean).filter((file, index, arr) => arr.findIndex((item) => `${item.name}-${item.size}` === `${file.name}-${file.size}`) === index).slice(0, 10);
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
          emphasisNotes: extraction.emphasisNotes || [],
          charCount: cleanedExtractedText.length,
          extractionOk: Boolean(extraction.ok && cleanedExtractedText),
        };
      });
      const mergedText = filePackets.map((item) => item.cleanedExtractedText || '').filter(Boolean).join('\n\n').trim();
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
          <p>Komite materyallerini ekle; çalışma alanı açıldıktan sonra tek parça, scroll edilebilir konu anlatımını Ders Anlatımı sekmesinden oluşturabilirsin. PDF çıktısı indirme seçeneği olarak korunur.</p>
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

function pdfDataUrlToBytes(url = '') {
  if (!String(url).startsWith('data:')) return null;
  const base64 = String(url).split(',')[1] || '';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function CommitteePdfSidebar({ manifest = {}, currentPage = 1, onGoToPage }) {
  const outline = Array.isArray(manifest.outline) ? manifest.outline : [];
  const anchors = Array.isArray(manifest.highYieldAnchors) ? manifest.highYieldAnchors : [];
  const items = [
    { id: 'start', title: 'Kapak / Başlangıç', pageNumber: 1, level: 1 },
    ...outline,
    ...anchors.map((item) => ({ ...item, level: 1, highYield: true })),
  ];
  return (
    <aside className="komite-pdf-sidebar" aria-label="Ders anlatımı hızlı erişim">
      <div className="komite-pdf-sidebar-card">
        <strong>Hızlı erişim</strong>
        {manifest.estimatedStudyTime ? <small>{manifest.estimatedStudyTime}</small> : null}
        <div className="komite-pdf-nav-list">
          {items.slice(0, 24).map((item) => {
            const page = Math.max(1, Number(item.pageNumber) || 1);
            return (
              <button
                type="button"
                key={`${item.id}-${page}`}
                className={`${page === currentPage ? 'active' : ''} ${item.highYield ? 'high-yield' : ''}`.trim()}
                style={{ '--depth': Math.max(0, Number(item.level || 1) - 1) }}
                onClick={() => onGoToPage(page)}
              >
                <span>{item.title}</span>
                <em>{page}</em>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function CommitteePdfLessonViewer({ lesson = {} }) {
  const manifest = lesson.manifest || {};
  const pdfUrl = lesson.pdfUrl || lesson.pdfDataUrl || manifest.pdfUrl || '';
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(1.08);
  const [status, setStatus] = useState('loading');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageTexts, setPageTexts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setPdfDoc(null);
    setPageTexts([]);
    const bytes = pdfDataUrlToBytes(pdfUrl);
    const loadingTask = pdfjsLib.getDocument(bytes ? { data: bytes } : { url: pdfUrl });
    loadingTask.promise
      .then((doc) => {
        if (cancelled) return null;
        setPdfDoc(doc);
        setPageCount(doc.numPages || 0);
        setPageNumber(1);
        setStatus('ready');
        return Promise.all(Array.from({ length: doc.numPages || 0 }, async (_item, index) => {
          const page = await doc.getPage(index + 1);
          const content = await page.getTextContent();
          return (content.items || []).map((textItem) => textItem.str || '').join(' ');
        }));
      })
      .then((texts) => {
        if (!cancelled && Array.isArray(texts)) setPageTexts(texts);
      })
      .catch((error) => {
        console.error('[komite-pdf-viewer]', error);
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
      loadingTask.destroy?.();
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return undefined;
    let cancelled = false;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    renderTaskRef.current?.cancel?.();
    pdfDoc.getPage(pageNumber)
      .then((page) => {
        if (cancelled) return null;
        const viewport = page.getViewport({ scale: zoom });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        const task = page.render({ canvasContext: context, viewport });
        renderTaskRef.current = task;
        return task.promise;
      })
      .catch((error) => {
        if (error?.name !== 'RenderingCancelledException') console.error('[komite-pdf-render]', error);
      });
    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel?.();
    };
  }, [pdfDoc, pageNumber, zoom]);

  const goToPage = (nextPage) => {
    const target = Math.min(Math.max(1, Number(nextPage) || 1), pageCount || 1);
    setPageNumber(target);
  };

  const searchPdf = () => {
    const query = searchQuery.trim().toLocaleLowerCase('tr');
    if (!query || !pageTexts.length) return;
    const start = Math.max(0, pageNumber - 1);
    const ordered = [...pageTexts.slice(start + 1), ...pageTexts.slice(0, start + 1)];
    const foundOffset = ordered.findIndex((text) => text.toLocaleLowerCase('tr').includes(query));
    if (foundOffset < 0) return;
    goToPage(((start + 1 + foundOffset) % pageTexts.length) + 1);
  };

  if (!pdfUrl) {
    return <EmptyState title="Konu anlatımı bulunamadı" text="Bu ders kaydında görüntülenecek konu anlatımı yok. Konu anlatımını yeniden oluşturmayı deneyebilirsin." />;
  }

  return (
    <div className="komite-pdf-lesson-view">
      <CommitteePdfSidebar manifest={manifest} currentPage={pageNumber} onGoToPage={goToPage} />
      <main className="komite-pdf-main">
        <div className="komite-pdf-toolbar">
          <div>
            <strong>{manifest.title || lesson.title || 'Komite konu anlatımı'}</strong>
            <small>{manifest.subtitle || lesson.subtitle || 'Konu anlatımı'}</small>
          </div>
          <div className="komite-pdf-controls">
            <button type="button" onClick={() => goToPage(pageNumber - 1)} disabled={pageNumber <= 1} aria-label="Önceki sayfa"><Icon name="ChevronLeft" size={16} /></button>
            <span>{pageNumber} / {pageCount || '-'}</span>
            <button type="button" onClick={() => goToPage(pageNumber + 1)} disabled={pageCount ? pageNumber >= pageCount : true} aria-label="Sonraki sayfa"><Icon name="ChevronRight" size={16} /></button>
            <button type="button" onClick={() => setZoom((value) => Math.max(0.72, value - 0.12))} aria-label="Uzaklaştır">-</button>
            <button type="button" onClick={() => setZoom((value) => Math.min(1.7, value + 0.12))} aria-label="Yakınlaştır">+</button>
            <a href={pdfUrl} download={`${(manifest.title || 'komite-konu-anlatimi').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') || 'komite-konu-anlatimi'}.pdf`}>
              <Icon name="Download" size={16} /> PDF
            </a>
          </div>
        </div>
        <div className="komite-pdf-search">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') searchPdf(); }}
            placeholder="PDF içinde ara"
          />
          <button type="button" onClick={searchPdf}>Ara</button>
        </div>
        <div className="komite-pdf-stage" data-status={status}>
          {status === 'loading' ? <div className="komite-pdf-loading"><span className="komite-spinner" aria-hidden="true" /> PDF hazırlanıyor…</div> : null}
          {status === 'error' ? <EmptyState title="PDF görüntülenemedi" text="PDF oluşturuldu ancak görüntüleyici dosyayı açamadı. İndirme bağlantısını deneyebilirsin." action={<a className="btn btn-primary" href={pdfUrl} download="komite-konu-anlatimi.pdf">PDF indir</a>} /> : null}
          <canvas ref={canvasRef} aria-label="Komite Konu anlatımı" />
        </div>
      </main>
    </div>
  );
}

function getScrollableLessonDocument(lesson = {}) {
  const document = lesson.document || lesson.lessonDocument || lesson;
  if (!document || document.type === 'pdfLesson') return null;
  const sections = Array.isArray(document.sections) ? document.sections : [];
  if (!sections.length) return null;
  return {
    ...document,
    title: document.title || lesson.title || 'Komite konu anlatımı',
    subtitle: document.subtitle || lesson.subtitle || 'Konu anlatımı, klinik mantık ve sınav odaklı tekrar',
    sections,
    pdfUrl: document.pdfUrl || lesson.pdfUrl || lesson.pdfDataUrl || '',
  };
}

function blockText(block = {}) {
  const chunks = [block.title, block.content, block.leftTitle, block.rightTitle, block.leftContent, block.rightContent];
  if (Array.isArray(block.items)) chunks.push(...block.items);
  if (Array.isArray(block.steps)) chunks.push(...block.steps);
  if (Array.isArray(block.columns)) chunks.push(...block.columns);
  if (Array.isArray(block.rows)) block.rows.forEach((row) => chunks.push(...row));
  if (Array.isArray(block.cards)) block.cards.forEach((card) => chunks.push(card.confusingPoint, card.correctDistinction, card.memoryMessage));
  return chunks.filter(Boolean).join(' ');
}

function sectionText(section = {}) {
  return [section.title, section.mainIdea, ...(Array.isArray(section.blocks) ? section.blocks.map(blockText) : [])].filter(Boolean).join(' ');
}

function calloutClass(variant = '') {
  const key = String(variant || 'main_idea').replace(/[^a-z_]/g, '');
  return `komite-scroll-callout ${key || 'main_idea'}`;
}

function calloutLabel(block = {}) {
  const map = {
    main_idea: 'Ana fikir',
    clinical_logic: 'Klinik mantık',
    exam_tip: 'Sınav ipucu',
    dont_confuse: 'Karıştırma',
    warning: 'Dikkat',
    update_note: 'Güncellik notu',
    final_review: 'Final tekrar',
  };
  return block.title || map[block.variant] || 'Not';
}

function lessonSectionTone(title = '') {
  const clean = String(title || '').toLocaleLowerCase('tr');
  if (/en yüksek|getirili|sınav bilgileri|sinav bilgileri|sınavda|sinavda/iu.test(clean)) return 'exam-focus';
  if (/karıştır|karistir|ayırıcı|ayirici/iu.test(clean)) return 'confusion-focus';
  if (/tek sayfalık|tek sayfalik|final tekrar|son tekrar/iu.test(clean)) return 'final-focus';
  if (/tedavi|yönetim|yonetim|yaklaşım|yaklasim/iu.test(clean)) return 'treatment-focus';
  if (/tanı|tani|laboratuvar|kriter/iu.test(clean)) return 'diagnosis-focus';
  return '';
}

function ScrollLessonBlock({ block = {} }) {
  if (block.type === 'paragraph') {
    return <p className="komite-scroll-paragraph"><GlossaryText text={block.content || ''} enabled revealMode="postAnswer" maxTerms={5} /></p>;
  }
  if (block.type === 'callout') {
    return (
      <aside className={calloutClass(block.variant)}>
        <strong>{calloutLabel(block)}</strong>
        <p><GlossaryText text={block.content || ''} enabled revealMode="postAnswer" maxTerms={4} /></p>
      </aside>
    );
  }
  if (block.type === 'bullet_list' || block.type === 'list') {
    const items = Array.isArray(block.items) ? block.items : [];
    return items.length ? (
      <div className="komite-scroll-list-block">
        {block.title ? <h4>{block.title}</h4> : null}
        <ul>{items.map((item, index) => <li key={`${item}-${index}`}><GlossaryText text={item} enabled revealMode="postAnswer" maxTerms={3} /></li>)}</ul>
      </div>
    ) : null;
  }
  if (block.type === 'numbered_list') {
    const items = Array.isArray(block.items) ? block.items : [];
    return items.length ? (
      <div className="komite-scroll-list-block numbered">
        {block.title ? <h4>{block.title}</h4> : null}
        <ol>{items.map((item, index) => <li key={`${item}-${index}`}><GlossaryText text={item} enabled revealMode="postAnswer" maxTerms={3} /></li>)}</ol>
      </div>
    ) : null;
  }
  if (block.type === 'mechanism_flow') {
    const steps = Array.isArray(block.steps) ? block.steps : [];
    return steps.length ? (
      <div className="komite-scroll-flow">
        {block.title ? <h4>{block.title}</h4> : null}
        <div className="komite-scroll-flow-steps">
          {steps.map((step, index) => (
            <div className="komite-scroll-flow-step" key={`${step}-${index}`}>
              <span>{index + 1}</span>
              <p><GlossaryText text={step} enabled revealMode="postAnswer" maxTerms={3} /></p>
            </div>
          ))}
        </div>
      </div>
    ) : null;
  }
  if (block.type === 'table') {
    const columns = Array.isArray(block.columns) ? block.columns : [];
    const rows = Array.isArray(block.rows) ? block.rows : [];
    return columns.length && rows.length ? (
      <div className="komite-scroll-table-block">
        {block.title ? <h4>{block.title}</h4> : null}
        <div className="komite-scroll-table-wrap">
          <table>
            <thead><tr>{columns.map((column, index) => <th key={`${column}-${index}`}>{column}</th>)}</tr></thead>
            <tbody>{rows.map((row, rowIndex) => <tr key={`row-${rowIndex}`}>{columns.map((_column, colIndex) => <td key={`cell-${rowIndex}-${colIndex}`}>{row?.[colIndex] || ''}</td>)}</tr>)}</tbody>
          </table>
        </div>
        {block.note ? <p className="komite-scroll-table-note"><GlossaryText text={block.note} enabled revealMode="postAnswer" maxTerms={2} /></p> : null}
      </div>
    ) : null;
  }
  if (block.type === 'confusion_cards') {
    const cards = Array.isArray(block.cards) ? block.cards : [];
    return cards.length ? (
      <div className="komite-scroll-confusion-grid">
        {cards.map((card, index) => (
          <article className="komite-scroll-confusion-card" key={`${card.confusingPoint || 'karisma'}-${index}`}>
            {card.confusingPoint ? <p><b>Karışan nokta</b><span>{card.confusingPoint}</span></p> : null}
            {card.correctDistinction ? <p><b>Doğru ayrım</b><span>{card.correctDistinction}</span></p> : null}
            {card.memoryMessage ? <p><b>Akılda kalacak mesaj</b><span>{card.memoryMessage}</span></p> : null}
          </article>
        ))}
      </div>
    ) : null;
  }
  if (block.type === 'definition_card' || block.type === 'mini_case') {
    return (
      <aside className={`komite-scroll-card-block ${block.type}`}>
        <strong>{block.title || (block.type === 'mini_case' ? 'Mini klinik örnek' : 'Tanım')}</strong>
        <p><GlossaryText text={block.content || ''} enabled revealMode="postAnswer" maxTerms={4} /></p>
      </aside>
    );
  }
  if (block.type === 'comparison_card') {
    return (
      <div className="komite-scroll-comparison-card">
        {block.title ? <h4>{block.title}</h4> : null}
        <div>
          <article><strong>{block.leftTitle || 'A'}</strong><p>{block.leftContent}</p></article>
          <article><strong>{block.rightTitle || 'B'}</strong><p>{block.rightContent}</p></article>
        </div>
      </div>
    );
  }
  if (block.type === 'divider') return <hr className="komite-scroll-divider" />;
  const fallback = block.content || block.text || '';
  return fallback ? <p className="komite-scroll-paragraph"><GlossaryText text={fallback} enabled revealMode="postAnswer" maxTerms={4} /></p> : null;
}

function CommitteeScrollableLessonView({ lesson = {} }) {
  const lessonDoc = getScrollableLessonDocument(lesson);
  const [activeId, setActiveId] = useState('');
  const [query, setQuery] = useState('');
  const sections = useMemo(() => {
    const raw = Array.isArray(lessonDoc?.sections) ? lessonDoc.sections : [];
    return raw.map((section, index) => ({
      ...section,
      id: section.id || createLessonAnchorId(section.title, index),
      textIndex: sectionText(section).toLocaleLowerCase('tr'),
    }));
  }, [lessonDoc]);
  const navItems = useMemo(() => sections.map((section) => ({ id: section.id, title: section.title })), [sections]);

  useEffect(() => {
    if (!navItems.length || typeof IntersectionObserver === 'undefined') return undefined;
    const nodes = navItems.map((item) => window.document?.getElementById?.(item.id)).filter(Boolean);
    if (!nodes.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
      if (visible?.target?.id) setActiveId(visible.target.id);
    }, { rootMargin: '-16% 0px -72% 0px', threshold: [0, 0.12, 0.3] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [navItems.map((item) => item.id).join('|')]);

  const scrollToId = (id) => {
    const node = window.document?.getElementById?.(id);
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const runSearch = () => {
    const clean = query.trim().toLocaleLowerCase('tr');
    if (!clean) return;
    const target = sections.find((section) => section.textIndex.includes(clean));
    if (target) scrollToId(target.id);
  };

  if (!lessonDoc) return null;
  const pdfUrl = lessonDoc.pdfUrl || lesson.pdfUrl || lesson.pdfDataUrl || '';
  const printLesson = () => {
    if (typeof window === 'undefined') return;
    const previousTitle = window.document?.title;
    try {
      if (window.document) window.document.title = lessonDoc.title || 'Komite konu anlatımı';
      window.print();
    } finally {
      window.setTimeout(() => {
        if (window.document && previousTitle) window.document.title = previousTitle;
      }, 250);
    }
  };

  return (
    <div className="komite-scroll-lesson-view">
      <aside className="komite-scroll-sidebar" aria-label="Ders hızlı erişim">
        <div className="komite-scroll-sidebar-card">
          <strong>Hızlı erişim</strong>
          {lessonDoc.estimatedStudyTime ? <small>{lessonDoc.estimatedStudyTime}</small> : null}
          <nav>
            {navItems.slice(0, 18).map((item) => (
              <button type="button" key={item.id} className={activeId === item.id ? 'active' : ''} onClick={() => scrollToId(item.id)}>
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="komite-scroll-main">
        <header className="komite-scroll-toolbar">
          <div>
            <strong>{lessonDoc.title}</strong>
            <small>{lessonDoc.subtitle}</small>
          </div>
          <div className="komite-scroll-toolbar-actions">
            <div className="komite-scroll-search">
              <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') runSearch(); }} placeholder="Ders içinde ara" />
              <button type="button" onClick={runSearch}>Ara</button>
            </div>
            <button type="button" className="komite-scroll-pdf-link" onClick={printLesson} title="Bu ekrandaki temiz HTML konu anlatımını PDF olarak kaydet"><Icon name="Download" size={16} /> PDF indir</button>
          </div>
        </header>

        <article className="komite-scroll-document">
          <section className="komite-scroll-intro-card">
            <h2>{lessonDoc.title}</h2>
            <p>{lessonDoc.subtitle}</p>
            {lessonDoc.sourceQualityNote ? <div className="komite-scroll-quality-note"><b>Güncellik notu</b><span>{lessonDoc.sourceQualityNote}</span></div> : null}
          </section>

          {sections.map((section, index) => (
            <section id={section.id} className={`komite-scroll-section ${lessonSectionTone(section.title)}`.trim()} key={section.id} style={lessonAccentStyle(index)}>
              <div className="komite-scroll-section-kicker">{String(index + 1).padStart(2, '0')}</div>
              <h3>{section.title}</h3>
              {section.mainIdea ? <aside className="komite-scroll-callout main_idea"><strong>Ana fikir</strong><p>{section.mainIdea}</p></aside> : null}
              {(Array.isArray(section.blocks) ? section.blocks : [])
                .filter((block, blockIndex) => !(blockIndex === 0 && block.type === 'callout' && block.variant === 'main_idea' && block.content === section.mainIdea))
                .map((block, blockIndex) => <ScrollLessonBlock block={block} key={`${section.id}-block-${blockIndex}`} />)}
            </section>
          ))}
        </article>
      </main>
    </div>
  );
}

function LessonView({ material, onGenerate, status = 'idle' }) {
  const lesson = material.lesson;
  const sections = Array.isArray(lesson?.sections)
    ? lesson.sections.map((section, index) => {
      const inferredHeading = inferLessonHeadingFromContent(section, index);
      return {
        ...section,
        displayHeading: cleanLessonHeadingForDisplay(section.heading || section.title, inferredHeading) || inferredHeading,
      };
    })
    : [];
  const sectionAnchors = sections
    .map((section, index) => ({ id: createLessonAnchorId(section.displayHeading, index), title: section.displayHeading || `Komite konusu ${index + 1}` }));
  const sectionNavigationItems = sections.map((section, index) => {
    const teachingText = sanitizeTeachingTextForDisplay(section.teachingText || section.content);
    const subItems = displayList(section.subHeadings || section.keySubtopics || [], 4)
      .filter((item) => !GENERIC_COMPONENT_TITLE_PATTERN.test(item))
      .filter((item) => subHeadingHasContent(item, section, teachingText))
      .map((title, subIndex) => ({
        id: `${sectionAnchors[index]?.id || `komite-lesson-${index + 1}`}-sub-${subIndex + 1}`,
        title,
        number: `${index + 1}.${subIndex + 1}`,
      }));
    return { id: sectionAnchors[index]?.id, title: section.displayHeading || `Komite konusu ${index + 1}`, subItems, sectionIndex: index };
  });
  const bigPictureText = sanitizeTeachingTextForDisplay(lesson?.bigPicture || lesson?.overview || '');
  const clinicalExamText = sanitizeTeachingTextForDisplay(lesson?.clinicalExamRelevance || '');
  const navigationItems = sectionNavigationItems
    .filter((item) => item.title && !GENERIC_COMPONENT_TITLE_PATTERN.test(item.title))
    .filter((item) => !/^(öğrenme hedefleri|büyük resim|konu çerçevesi|can alıcı noktalar|mutlaka hatırla|final pekiştirme)$/iu.test(item.title));
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
    return <EmptyState title="Ders anlatımı henüz hazır değil" text={hasExtractedText ? "Materyal hazır. Profesyonel konu anlatımına dönüştürmek için butona basabilirsin." : "Bu materyalden çalışılabilir metin alınamadı. Daha okunabilir dosya yükleyebilir veya metni ek not alanına yapıştırabilirsin."} action={<LoadingPrimaryButton status={status} idleLabel="Ders anlatımına dönüştür" loadingLabel="Ders anlatımı hazırlanıyor…" onClick={onGenerate} />} />;
  }

  const rawObjectives = Array.isArray(lesson.learningObjectives) ? lesson.learningObjectives : [];
  const objectiveIntro = rawObjectives.length && /(:|：)$|^Bu konunun sonunda\b/iu.test(String(rawObjectives[0] || '').trim())
    ? sanitizeTeachingTextForDisplay(rawObjectives[0])
    : '';
  const objectives = objectiveIntro ? rawObjectives.slice(1) : rawObjectives;
  const cleanObjectivesRaw = displayList(objectives, 5)
    .filter((item) => !/\bodağında klinik, mekanistik ve sınav bağlamıyla yorumlayabilmek\b/iu.test(item))
    .map((item, index) => formatLearningObjectiveForDisplay(item, index, sections))
    .filter(Boolean);
  const cleanObjectives = cleanObjectivesRaw.length
    ? cleanObjectivesRaw
    : sections.slice(0, 4).map((section) => sentenceCaseText(`${section.displayHeading || 'Bu başlık'} kapsamında temel kavramları, mekanizma ilişkilerini ve sınav açısından ayırt ettiren noktaları gerekçesiyle açıklayabilmek`));
  const concepts = Array.isArray(lesson.mainConcepts)
    ? lesson.mainConcepts.filter((item) => !/materyaldeki ilişkili kavram|slayt|sayfa|dosya|pptx/iu.test(String(item)))
    : [];
  const sectionReviewItems = sections.flatMap((section) => Array.isArray(section.miniReview) ? section.miniReview : []);
  const highYield = displayList([
    ...(Array.isArray(lesson.highYieldPoints || lesson.highYieldSummary) ? (lesson.highYieldPoints || lesson.highYieldSummary) : []),
    ...(Array.isArray(lesson.mustKnow || lesson.mustRemember) ? (lesson.mustKnow || lesson.mustRemember) : []),
    ...(Array.isArray(lesson.finalReview) ? lesson.finalReview : []),
    ...sectionReviewItems,
  ], 16);
  const commonReview = displayList([
    ...(Array.isArray(lesson.commonConfusions) ? lesson.commonConfusions : []),
    ...sections.map((section) => section.commonTrap),
  ], 8, highYield);
  const examScenarios = displayList(sections.map((section) => section.examAngle || section.clinicalConnection), 8, [...highYield, ...commonReview]);
  const commonReviewCards = commonReview
    .map((item) => ({ source: item, card: parseCommonConfusionCard(item) }))
    .filter(({ card }) => {
      const parts = [card.confusion, card.distinction, card.memory].map(compareLessonText).filter(Boolean);
      return new Set(parts).size >= 2;
    });
  const hasFinalPrep = highYield.length || commonReviewCards.length || examScenarios.length;

  if (lesson?.type === 'lessonDocument' || (Array.isArray(lesson?.sections) && lesson?.sections?.[0]?.blocks)) {
    return <CommitteeScrollableLessonView lesson={lesson} />;
  }
  if (lesson?.type === 'pdfLesson') {
    return <CommitteePdfLessonViewer lesson={lesson} />;
  }

  return (
    <div className="komite-lesson-view komite-lesson-view-pro">
      {improveLessonIntro(lesson.shortSubtitle || lesson.shortIntro || lesson.overview, lesson.title) ? (
        <div className="komite-lesson-hero komite-lesson-hero-pro komite-lesson-brief-card">
          <div className="komite-lesson-brief">
            <p><GlossaryText text={improveLessonIntro(lesson.shortSubtitle || lesson.shortIntro || lesson.overview, lesson.title)} enabled revealMode="postAnswer" maxTerms={4} /></p>
          </div>
        </div>
      ) : null}

      <div className="komite-lesson-pro-layout">
        <aside className="komite-lesson-sidebar" aria-label="Ders navigasyonu">
          <div className="komite-sidebar-card">
            <strong>Hızlı erişim</strong>
            {navigationItems.slice(0, 14).map((item) => (
              <div className="komite-sidebar-nav-item" key={item.id} style={Number.isFinite(item.sectionIndex) ? lessonAccentStyle(item.sectionIndex) : undefined}>
                <a className={activeAnchorId === item.id ? 'active' : ''} href={`#${item.id}`}>
                  {Number.isFinite(item.sectionIndex) ? <span className="komite-sidebar-section-dot" aria-hidden="true" /> : null}
                  <span>{item.title}</span>
                </a>
                {Array.isArray(item.subItems) && item.subItems.length ? (
                  <div className="komite-sidebar-subitems">
                    {item.subItems.slice(0, 5).map((subItem) => <a key={`${item.id}-${subItem.id}`} href={`#${subItem.id}`}>{`${subItem.number} ${subItem.title}`}</a>)}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </aside>

        <main className="komite-lesson-main-flow">
          <section id="komite-objectives" className="komite-objectives komite-objectives-pro">
            <strong>Öğrenme hedefleri</strong>
            {objectiveIntro ? <p className="komite-objective-intro"><InlineLessonText text={objectiveIntro} /></p> : null}
            <ul>{cleanObjectives.map((item, index) => <li key={`${item}-${index}`}><InlineLessonText text={item} /></li>)}</ul>
          </section>

          {bigPictureText && bigPictureText.length >= 80 ? (
            <article id="komite-big-picture" className="komite-lesson-section komite-big-picture-section">
              <h3>Konu çerçevesi</h3>
              <LessonText text={bigPictureText} />
            </article>
          ) : null}

          {clinicalExamText && clinicalExamText.length >= 60 ? (
            <div className="komite-context-lines" aria-label="Klinik ve sınav bağlantıları">
              <div className="komite-context-line">
                <strong>Klinik / sınav bağlantısı</strong>
                <p><GlossaryText text={clinicalExamText} enabled revealMode="postAnswer" maxTerms={4} /></p>
              </div>
            </div>
          ) : null}

          {sections.map((section, index) => {
            const teachingText = sanitizeTeachingTextForDisplay(section.teachingText || section.content);
            const rawFlowSteps = formatMechanismSteps([
              ...(Array.isArray(section.algorithmSteps) ? section.algorithmSteps : []),
              ...(Array.isArray(section.mechanismFlow) ? section.mechanismFlow : []),
            ]).filter((item) => !displayList([teachingText], 1).some((main) => item.length > 42 && main.includes(item)));
            const expandedFlowSteps = rawFlowSteps.flatMap((item) => {
              if (!/[→>]/u.test(item)) return [item];
              return item.split(/\s*(?:→|>)\s*/u).map((part) => sanitizeTeachingTextForDisplay(part)).filter((part) => part.split(/\s+/u).length >= 2);
            });
            const flowSteps = expandedFlowSteps.length >= 2 ? expandedFlowSteps : rawFlowSteps;
            const tableInsights = displayList(section.tableInsights, 4, [teachingText, section.examAngle, section.clinicalConnection])
              .filter((item) => /\b(?:tablo|sınıflama|karşılaştır|fark|ayır|patern|grup|tip|evre|skor|kriter)\b/iu.test(item));
            const comparisonPoints = displayList(section.comparisonPoints, 4, [teachingText, section.commonTrap]);
            const visualNotes = displayList(section.visualNotes, 4, [teachingText, ...tableInsights])
              .filter((item) => /\b(?:şema|algoritma|akış|caption|başlık|okunabilen|karar|süreç)\b/iu.test(item));
            const subHeadings = displayList(section.subHeadings || section.subtopics || [], 5)
              .filter((item) => !GENERIC_COMPONENT_TITLE_PATTERN.test(item))
              .filter((item) => subHeadingHasContent(item, section, teachingText));
            const keyBoxes = displayKeyBoxes(section.keyBoxes, [teachingText, section.examAngle, section.commonTrap, section.clinicalConnection]);
            return (
              <article id={sectionAnchors[index]?.id} className="komite-lesson-section komite-lesson-section-pro" key={`${section.heading}-${index}`} style={lessonAccentStyle(index)}>
                <div className="komite-section-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="komite-section-body">
                  <h3>{section.displayHeading}</h3>
                  {subHeadings.length ? (
                    <div className="komite-section-subtopic-list" aria-label="Bölüm alt başlıkları">
                      {subHeadings.map((subHeading, subIndex) => <span id={`${sectionAnchors[index]?.id || `komite-lesson-${index + 1}`}-sub-${subIndex + 1}`} key={`${subHeading}-${subIndex}`}>{`${index + 1}.${subIndex + 1} ${subHeading}`}</span>)}
                    </div>
                  ) : null}
                  <div className="komite-lesson-subsection">
                    <LessonText text={teachingText} />
                  </div>
                  {keyBoxes.length ? (
                    <div className="komite-key-box-grid">
                      {keyBoxes.map((box, boxIndex) => (
                        <div className={`komite-key-box ${keyBoxTone(box.label)}`} key={`${box.label || 'not'}-${boxIndex}`}>
                          <strong>{box.label || 'Kritik nokta'}</strong>
                          <p><GlossaryText text={sanitizeTeachingTextForDisplay(box.text)} enabled revealMode="postAnswer" maxTerms={3} /></p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {(tableInsights.length || comparisonPoints.length || visualNotes.length) ? (
                    <div className="komite-learning-block-grid">
                      <SectionInsightBlock title="Tanı ve laboratuvar mantığı" items={tableInsights} icon="MinorGrid" tone="table" />
                      <SectionInsightBlock title="Ayırt ettiren noktalar" items={comparisonPoints} icon="Target" tone="compare" />
                      <SectionInsightBlock title="Materyaldeki tablo veya görsel bilgisi" items={visualNotes} icon="Eye" tone="visual" />
                    </div>
                  ) : null}
                  {(flowSteps.length || section.examAngle || section.commonTrap || section.clinicalConnection || section.examConnection) ? (
                    <div className="komite-note-lines">
                      {flowSteps.length ? (
                        <div className="komite-note-line komite-flow-line">
                          <strong>Neden-sonuç zinciri</strong>
                          <div className="komite-mechanism-chain">{flowSteps.map((step, stepIndex) => (
                            <span className="komite-mechanism-step" key={`${step}-${stepIndex}`}>
                              <GlossaryText text={step} enabled revealMode="postAnswer" maxTerms={3} />
                              {stepIndex < flowSteps.length - 1 ? <em aria-hidden="true">→</em> : null}
                            </span>
                          ))}</div>
                        </div>
                      ) : null}
                      {section.clinicalConnection ? <div className="komite-note-line"><strong>Klinik yansıma</strong><p><GlossaryText text={sanitizeTeachingTextForDisplay(section.clinicalConnection)} enabled revealMode="postAnswer" maxTerms={3} /></p></div> : null}
                      {section.examAngle ? <div className="komite-note-line komite-exam-tip-line"><strong>Sınavda nasıl sorulur?</strong><p><GlossaryText text={sanitizeTeachingTextForDisplay(section.examAngle)} enabled revealMode="postAnswer" maxTerms={3} /></p></div> : null}
                      {(section.commonTrap || section.examConnection) ? <div className="komite-note-line komite-common-error-line"><strong>Sık yapılan hata</strong><p><GlossaryText text={sanitizeTeachingTextForDisplay(section.commonTrap || section.examConnection)} enabled revealMode="postAnswer" maxTerms={3} /></p></div> : null}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}

          {hasFinalPrep ? (
          <div id="komite-high-yield" className="komite-summary-lines komite-summary-grid-pro">
            {highYield.length ? (
              <div>
                <strong>Yüksek verimli tekrar</strong>
                <ul>{highYield.map((item, index) => <li key={`${item}-${index}`}><InlineLessonText text={sanitizeTeachingTextForDisplay(item)} /></li>)}</ul>
              </div>
            ) : null}
            {commonReviewCards.length ? (
              <div>
                <strong>Sık karışanlar</strong>
                <div className="komite-confusion-card-list">
                  {commonReviewCards.map(({ source, card }, index) => {
                    return (
                      <article className="komite-confusion-card" key={`${source}-${index}`}>
                        <span>Karışan nokta</span>
                        <p><InlineLessonText text={card.confusion} /></p>
                        <span>Doğru ayrım</span>
                        <p><InlineLessonText text={card.distinction} /></p>
                        <span>Akılda kalacak mesaj</span>
                        <p><InlineLessonText text={card.memory} /></p>
                      </article>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {examScenarios.length ? (
              <div>
                <strong>Sınavda nasıl sorulur?</strong>
                <ul>{examScenarios.map((item, index) => <li key={`${item}-${index}`}><InlineLessonText text={item} /></li>)}</ul>
              </div>
            ) : null}
          </div>
          ) : null}
        </main>
      </div>
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
    ...(Array.isArray(material.lesson?.finalReview) ? material.lesson.finalReview : Array.isArray(material.lesson?.finalReview?.content) ? material.lesson.finalReview.content : []).map((item) => ({ text: item, kind: 'Son gün', material })),
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

  useEffect(() => {
    if (!STUDY_TABS.some((item) => item.id === tab)) setTab('lesson');
  }, [tab]);

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
      setModuleActionStatus(kind, 'error', 'Bu çalışma alanında konu anlatımı oluşturmak için yeterli okunabilir metin yok.');
      return;
    }

    setModuleActionStatus(kind, 'loading', kind === 'lesson' ? 'Ders anlatımı hazırlanıyor…' : kind === 'questions' ? 'Sorular bu PDF akışında üretilmez.' : 'Hap kartlar bu PDF akışında üretilmez.');
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
      setModuleActionStatus(kind, 'success', kind === 'lesson' ? 'Ders anlatımı hazır.' : 'İçerik hazır.');
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
