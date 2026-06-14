import JSZip from 'jszip';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const MAX_EXTRACTED_CHARS = 80_000;
const MAX_PDF_PAGES = 90;

export function getKomiteFileExtension(fileName = '') {
  const ext = String(fileName || '').split('.').pop()?.toLowerCase() || '';
  return ext && ext !== fileName ? ext : '';
}

function normalizeWhitespace(text = '') {
  return String(text || '')
    .replace(/\u0000/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function capText(text = '', max = MAX_EXTRACTED_CHARS) {
  const value = normalizeWhitespace(text);
  if (value.length <= max) return value;
  return `${value.slice(0, max).trim()}\n\n[Not: Metin ${max} karakterle sınırlandı; materyalin devamı güvenlik ve performans için kesildi.]`;
}

function sortSlideFiles(a, b) {
  const getNo = (name) => Number(String(name).match(/slide(\d+)\.xml$/i)?.[1] || 0);
  return getNo(a) - getNo(b);
}

function textFromXml(xml = '', { paragraphTag = null, textTag = 't' } = {}) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  const parserError = doc.getElementsByTagName('parsererror')?.[0];
  if (parserError) return '';

  if (paragraphTag) {
    const paragraphs = Array.from(doc.getElementsByTagNameNS('*', paragraphTag));
    const lines = paragraphs.map((paragraph) => Array.from(paragraph.getElementsByTagNameNS('*', textTag))
      .map((node) => node.textContent || '')
      .join('')
      .trim())
      .filter(Boolean);
    return normalizeWhitespace(lines.join('\n'));
  }

  return normalizeWhitespace(Array.from(doc.getElementsByTagNameNS('*', textTag))
    .map((node) => node.textContent || '')
    .join(' '));
}

async function extractTxt(file) {
  const raw = await file.text();
  const text = capText(raw);
  return {
    ok: text.length > 0,
    text,
    detectedStructure: text ? [{ type: 'text', label: file.name, charCount: text.length }] : [],
    figures: [],
    limitations: [],
    notice: text ? 'Metin dosyası başarıyla okundu.' : 'Metin dosyası boş görünüyor.',
  };
}

async function extractPdf(file) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer), verbosity: 0 }).promise;
  const totalPages = pdf.numPages || 0;
  const pageCount = Math.min(totalPages, MAX_PDF_PAGES);
  const pageTexts = [];
  const detectedStructure = [];

  for (let pageNo = 1; pageNo <= pageCount; pageNo += 1) {
    const page = await pdf.getPage(pageNo);
    const content = await page.getTextContent();
    const lines = [];
    let lastY = null;
    let currentLine = [];

    for (const item of content.items || []) {
      const str = String(item.str || '').trim();
      if (!str) continue;
      const y = Math.round(item.transform?.[5] || 0);
      if (lastY !== null && Math.abs(y - lastY) > 6 && currentLine.length) {
        lines.push(currentLine.join(' ').replace(/\s+/g, ' ').trim());
        currentLine = [];
      }
      currentLine.push(str);
      lastY = y;
    }
    if (currentLine.length) lines.push(currentLine.join(' ').replace(/\s+/g, ' ').trim());
    const pageText = normalizeWhitespace(lines.join('\n'));
    if (pageText) {
      pageTexts.push(`[Sayfa ${pageNo}]\n${pageText}`);
      detectedStructure.push({ type: 'page', page: pageNo, charCount: pageText.length, preview: pageText.slice(0, 180) });
    }
  }

  const limitations = [];
  if (totalPages > MAX_PDF_PAGES) limitations.push(`PDF ${totalPages} sayfa; ilk ${MAX_PDF_PAGES} sayfa ayrıştırıldı.`);
  if (!pageTexts.length) limitations.push('PDF içinde okunabilir metin katmanı bulunamadı; taranmış görsel PDF olabilir.');

  const text = capText(pageTexts.join('\n\n'));
  return {
    ok: text.length > 120,
    text,
    detectedStructure,
    figures: [],
    limitations,
    notice: text.length > 120 ? `${pageTexts.length} PDF sayfasından okunabilir metin çıkarıldı.` : 'PDF metni okunamadı veya çok kısa çıktı.',
  };
}

async function extractDocx(file) {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const xmlFiles = [
    'word/document.xml',
    ...Object.keys(zip.files).filter((name) => /^word\/(footnotes|endnotes|header\d+|footer\d+)\.xml$/i.test(name)),
  ].filter((name, index, list) => zip.file(name) && list.indexOf(name) === index);

  const parts = [];
  const detectedStructure = [];
  for (const name of xmlFiles) {
    const xml = await zip.file(name).async('string');
    const partText = textFromXml(xml, { paragraphTag: 'p', textTag: 't' });
    if (partText) {
      const label = name === 'word/document.xml' ? 'Ana belge' : name.replace(/^word\//, '').replace(/\.xml$/i, '');
      parts.push(`[${label}]\n${partText}`);
      detectedStructure.push({ type: 'docx-part', label, charCount: partText.length, preview: partText.slice(0, 180) });
    }
  }

  const text = capText(parts.join('\n\n'));
  const limitations = text ? [] : ['DOCX içinde okunabilir paragraf metni bulunamadı.'];
  return {
    ok: text.length > 120,
    text,
    detectedStructure,
    figures: [],
    limitations,
    notice: text.length > 120 ? 'DOCX metni başarıyla ayrıştırıldı.' : 'DOCX metni okunamadı veya çok kısa çıktı.',
  };
}

async function extractPptx(file) {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const slideNames = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/i.test(name))
    .sort(sortSlideFiles);

  const parts = [];
  const detectedStructure = [];
  for (const name of slideNames) {
    const slideNo = Number(name.match(/slide(\d+)\.xml$/i)?.[1] || detectedStructure.length + 1);
    const xml = await zip.file(name).async('string');
    const slideText = textFromXml(xml, { textTag: 't' });
    if (slideText) {
      parts.push(`[Slayt ${slideNo}]\n${slideText}`);
      detectedStructure.push({ type: 'slide', slide: slideNo, charCount: slideText.length, preview: slideText.slice(0, 180) });
    }
  }

  const noteNames = Object.keys(zip.files)
    .filter((name) => /^ppt\/notesSlides\/notesSlide\d+\.xml$/i.test(name))
    .sort(sortSlideFiles);
  for (const name of noteNames) {
    const noteNo = Number(name.match(/notesSlide(\d+)\.xml$/i)?.[1] || 0);
    const xml = await zip.file(name).async('string');
    const noteText = textFromXml(xml, { textTag: 't' });
    if (noteText) parts.push(`[Slayt ${noteNo} notu]\n${noteText}`);
  }

  const text = capText(parts.join('\n\n'));
  const limitations = [];
  if (!slideNames.length) limitations.push('PPTX içinde slayt XML yapısı bulunamadı.');
  if (!text) limitations.push('PPTX slaytlarından okunabilir metin çıkarılamadı.');
  limitations.push('Bu sürüm metin katmanını okur; slayt görsellerini/piksel içeriğini yorumlamaz.');

  return {
    ok: text.length > 120,
    text,
    detectedStructure,
    figures: [],
    limitations,
    notice: text.length > 120 ? `${detectedStructure.length} slayttan okunabilir metin çıkarıldı.` : 'PPTX metni okunamadı veya çok kısa çıktı.',
  };
}

export async function extractKomiteFile(file) {
  if (!file) {
    return { ok: false, text: '', detectedStructure: [], figures: [], limitations: ['Dosya seçilmedi.'], notice: '' };
  }
  const ext = getKomiteFileExtension(file.name);
  try {
    if (['txt', 'md'].includes(ext)) return await extractTxt(file);
    if (ext === 'pdf') return await extractPdf(file);
    if (ext === 'docx') return await extractDocx(file);
    if (ext === 'pptx') return await extractPptx(file);
    return {
      ok: false,
      text: '',
      detectedStructure: [],
      figures: [],
      limitations: [`${ext || 'Bu'} dosya türü için otomatik metin ayrıştırma desteklenmiyor.`],
      notice: 'Desteklenmeyen dosya türü; metni elle yapıştırabilirsin.',
    };
  } catch (error) {
    return {
      ok: false,
      text: '',
      detectedStructure: [],
      figures: [],
      limitations: [error?.message || 'Dosya ayrıştırma sırasında hata oluştu.'],
      notice: 'Dosya otomatik okunamadı; metni elle yapıştırabilirsin.',
    };
  }
}
