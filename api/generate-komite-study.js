const DEFAULT_MODEL = 'gpt-5.1';
const ERROR_MESSAGE = 'Sistem şu anda konu anlatımını oluşturamadı. Lütfen tekrar deneyin.';
const A4 = { width: 595.28, height: 841.89 };
const MARGIN = { top: 58, right: 52, bottom: 58, left: 52 };
const CONTENT_WIDTH = A4.width - MARGIN.left - MARGIN.right;

function compactText(value = '') {
  return String(value || '').replace(/\r/g, '\n').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

function stripForbiddenSourceLanguage(value = '') {
  return compactText(value)
    .replace(/\b(?:slayt|sunum|bu sayfada|hocanın slaytında|yüklenen dosyada|pdf'de yazdığına göre|dokümanda belirtildiği gibi)\b/giu, '')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function safeJson(value = null) {
  try {
    return JSON.stringify(value);
  } catch {
    return 'null';
  }
}

function getSourceFiles(materialPacket = {}) {
  return (Array.isArray(materialPacket.files) ? materialPacket.files : [])
    .slice(0, 10)
    .map((file) => ({
      fileName: compactText(file.fileName || file.name || 'Materyal'),
      fileType: compactText(file.fileType || file.type || 'file'),
      text: compactText(file.cleanedExtractedText || file.text || ''),
      detectedStructure: Array.isArray(file.detectedStructure) ? file.detectedStructure.slice(0, 12) : [],
      emphasisNotes: Array.isArray(file.emphasisNotes) ? file.emphasisNotes.slice(0, 8) : [],
      charCount: Number(file.charCount || String(file.cleanedExtractedText || file.text || '').length || 0),
    }))
    .filter((file) => file.text.length > 80);
}

function buildSourceContext(payload = {}) {
  const files = getSourceFiles(payload.materialPacket || {});
  const totalBudget = 120_000;
  const perFile = files.length ? Math.max(8_000, Math.floor(totalBudget / files.length)) : totalBudget;
  const sourceBlocks = files.map((file, index) => {
    const text = file.text.length > perFile
      ? `${file.text.slice(0, Math.floor(perFile * 0.72)).trim()}\n\n[Kaynak metnin devamından seçilmiş son bölüm]\n${file.text.slice(-Math.floor(perFile * 0.24)).trim()}`
      : file.text;
    return [
      `[[KAYNAK_${index + 1}]]`,
      `Dosya türü: ${file.fileType}`,
      file.detectedStructure.length ? `Okunabilen yapı izleri: ${safeJson(file.detectedStructure)}` : '',
      file.emphasisNotes.length ? `Vurgu notları: ${safeJson(file.emphasisNotes)}` : '',
      text,
    ].filter(Boolean).join('\n');
  });
  return { files, sourceText: sourceBlocks.join('\n\n') };
}

function buildPrompt(payload = {}) {
  const { files, sourceText } = buildSourceContext(payload);
  const metadata = payload.metadata || {};
  const metaBlock = [
    `Sınıf: ${metadata.classYear || 'Belirtilmedi'}`,
    `Komite: ${metadata.committee || 'Belirtilmedi'}`,
    `Ders / konu: ${metadata.course || 'Belirtilmedi'}`,
    `Çalışma hedefi: ${metadata.learningTarget || 'Komite sınavı'}`,
    `Üniversite: ${metadata.university || 'Belirtilmedi'}`,
    `Kaynak sayısı: ${files.length}`,
  ].join('\n');

  return [
    'Sen KlinikIQ Komite modülü için çalışan kıdemli bir tıp eğitimi editörü, klinik akıl yürütme anlatıcısı ve öğretici içerik mimarısın.',
    'Kullanıcının yüklediği materyalleri bağımsız, Türkçe, bilimsel, sınav odaklı ve PDF kalitesinde bir konu anlatımına dönüştür.',
    'ÇIKTI YALNIZCA MARKDOWN OLSUN. JSON, kod bloğu, üretim raporu veya açıklama yazma.',
    '',
    'Temel kurallar:',
    '- Özet çıkarma; öğrencinin konuyu gerçekten anlayacağı detaylı konu anlatımı yaz.',
    '- Kaynak formatını hatırlatan "slayt", "sunum", "bu sayfada", "dokümanda", "yüklenen dosyada" gibi ifadeler kullanma.',
    '- Dosya sırasını körü körüne takip etme; öğrenme akışına göre 5-8 güçlü ana bölüm oluştur.',
    '- Tekrar eden bilgileri birleştir; sayısal değerleri, tanı kriterlerini, tedavi sürelerini ve klinik ayrımları koru.',
    '- Eski veya tartışmalı bilgi fark edersen ana anlatımı bozmadan kısa "Güncellik notu" ekle.',
    '- Ana anlatım paragraf formunda ilerlesin; gerekli yerlerde kısa maddeleme, sade tablo ve kısa mekanizma zinciri kullan.',
    '- Her ana bölüm kısa bir "Ana fikir:" paragrafıyla başlasın.',
    '- Tablolar yalnız tanı kriteri, ayırıcı tanı, sınıflama, tedavi karşılaştırması veya laboratuvar yorumu gerçekten kolaylaştırıyorsa kullanılsın.',
    '- Mekanizma şemalarını kısa neden-sonuç zinciri olarak yaz; metnin yerini almasın.',
    '- PDF sonunda mutlaka şu üç bölüm olsun: "En yüksek getirili sınav bilgileri", "Karıştırılmaması gerekenler", "Tek sayfalık final tekrar".',
    '',
    'Markdown biçimi:',
    '- İlk satır "# Konu başlığı" olsun.',
    '- Ardından kısa bir giriş paragrafı yaz.',
    '- Ana bölümler "##" ile, önemli alt başlıklar "###" ile başlasın.',
    '- Bilgi kutuları için satıra şu biçimde başla: "> [!Ana fikir]", "> [!Klinik mantık]", "> [!Sınav ipucu]", "> [!Karıştırma]", "> [!Dikkat]", "> [!Güncellik notu]" veya "> [!Final tekrar]".',
    '- Tabloları sade Markdown tablo olarak yaz.',
    '- Kaynak adı, dosya adı, sayfa numarası veya üretim açıklaması ekleme.',
    '',
    'İyi anlatım standardı:',
    'İnsülin eksikliğinde glukoz hücre içine yeterince giremez ve karaciğer glukoz üretimi artar. Kan glukozu böbreğin geri emilim kapasitesini aştığında glukoz idrara geçer. Glukoz idrarda osmotik etki oluşturur ve suyu beraberinde sürükler. Bu süreç poliüriye, sıvı kaybına ve polidipsiye yol açar.',
    '',
    'Meta bilgi:',
    metaBlock,
    '',
    'Okunmuş materyal metni:',
    sourceText,
  ].join('\n');
}

function parseJsonObject(text = '') {
  const source = String(text || '').trim();
  try {
    return JSON.parse(source);
  } catch {
    const match = source.match(/\{[\s\S]*\}/u);
    if (!match) throw new Error('AI response is not JSON.');
    return JSON.parse(match[0]);
  }
}

function extractResponseText(payload = {}) {
  if (typeof payload.output_text === 'string') return payload.output_text;
  if (typeof payload.choices?.[0]?.message?.content === 'string') return payload.choices[0].message.content;
  const contentItems = Array.isArray(payload.output) ? payload.output.flatMap((item) => item?.content || []) : [];
  return contentItems.map((content) => content?.text || content?.output_text || '').filter(Boolean).join('\n');
}

async function requestMarkdown({ apiKey, model, prompt }) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        { role: 'system', content: 'Yalnızca istenen Markdown ders metnini üret. JSON, kod bloğu veya kaynak işleme açıklaması yazma.' },
        { role: 'user', content: prompt },
      ],
      max_output_tokens: Number.parseInt(process.env.OPENAI_KOMITE_PDF_MAX_TOKENS || '', 10) || 12000,
      temperature: Number.parseFloat(process.env.OPENAI_KOMITE_TEMPERATURE || process.env.OPENAI_TEMPERATURE || '0.25'),
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error?.message || `OpenAI request failed: ${response.status}`);
  }
  if (payload.status === 'incomplete') {
    const reason = payload?.incomplete_details?.reason || 'unknown';
    throw new Error(`OpenAI response incomplete: ${reason}`);
  }
  const text = extractResponseText(payload);
  if (!text) throw new Error('OpenAI response did not include text output.');
  return stripForbiddenSourceLanguage(text.replace(/^```(?:markdown)?/iu, '').replace(/```$/u, '').trim());
}

function slugify(value = '') {
  return String(value || '')
    .toLocaleLowerCase('tr')
    .replace(/[ğ]/g, 'g')
    .replace(/[ü]/g, 'u')
    .replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i')
    .replace(/[ö]/g, 'o')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70) || 'bolum';
}

function parseMarkdown(markdown = '') {
  const lines = String(markdown || '').replace(/\r/g, '\n').split('\n');
  const blocks = [];
  let paragraph = [];
  let table = [];
  let list = [];
  let quote = [];

  const flushParagraph = () => {
    const text = compactText(paragraph.join(' '));
    if (text) blocks.push({ type: 'p', text });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: 'list', items: list });
    list = [];
  };
  const flushTable = () => {
    if (table.length >= 2) {
      const rows = table.map((line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => compactText(cell)));
      blocks.push({ type: 'table', rows: rows.filter((row) => !row.every((cell) => /^:?-{3,}:?$/u.test(cell))) });
    }
    table = [];
  };
  const flushQuote = () => {
    if (!quote.length) return;
    const first = quote[0] || '';
    const labelMatch = first.match(/^\[!(.+?)\]\s*(.*)$/u);
    blocks.push({
      type: 'box',
      label: labelMatch?.[1] || 'Not',
      text: compactText([labelMatch?.[2] || first, ...quote.slice(1)].join(' ')),
    });
    quote = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushTable();
    flushQuote();
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushAll();
      return;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/u);
    if (heading) {
      flushAll();
      blocks.push({ type: 'heading', level: heading[1].length, text: stripForbiddenSourceLanguage(heading[2].replace(/\*\*/g, '')) });
      return;
    }
    if (/^\|.+\|$/u.test(line)) {
      flushParagraph();
      flushList();
      flushQuote();
      table.push(line);
      return;
    }
    if (/^>\s?/u.test(line)) {
      flushParagraph();
      flushList();
      flushTable();
      quote.push(line.replace(/^>\s?/u, ''));
      return;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/u) || line.match(/^\d+[.)]\s+(.+)$/u);
    if (bullet) {
      flushParagraph();
      flushTable();
      flushQuote();
      list.push(stripForbiddenSourceLanguage(bullet[1]));
      return;
    }
    flushList();
    flushTable();
    flushQuote();
    paragraph.push(stripForbiddenSourceLanguage(line.replace(/\*\*/g, '')));
  });
  flushAll();
  return blocks.filter((block) => block.type !== 'p' || block.text);
}

const TURKISH_BYTE_MAP = new Map([
  ['Ğ', 128], ['ğ', 129], ['Ş', 130], ['ş', 131], ['İ', 132], ['ı', 133],
]);

function textToPdfHex(value = '') {
  const normalized = String(value || '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/β/g, 'beta')
    .replace(/α/g, 'alfa');
  const bytes = [];
  for (const char of normalized) {
    if (TURKISH_BYTE_MAP.has(char)) {
      bytes.push(TURKISH_BYTE_MAP.get(char));
      continue;
    }
    const code = char.charCodeAt(0);
    if (code <= 255) bytes.push(code);
    else bytes.push('?'.charCodeAt(0));
  }
  return bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function estimateTextWidth(text = '', fontSize = 10) {
  return String(text || '').split('').reduce((sum, char) => {
    if ('ilIıİ.,;:!|'.includes(char)) return sum + fontSize * 0.28;
    if ('mwMWĞŞÖÜ'.includes(char)) return sum + fontSize * 0.82;
    if (char === ' ') return sum + fontSize * 0.32;
    return sum + fontSize * 0.52;
  }, 0);
}

function wrapText(text = '', fontSize = 10, maxWidth = CONTENT_WIDTH) {
  const words = compactText(text).split(/\s+/u).filter(Boolean);
  const lines = [];
  let current = '';
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (estimateTextWidth(next, fontSize) <= maxWidth || !current) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function colorForBox(label = '') {
  const lower = label.toLocaleLowerCase('tr');
  if (/sınav|ipucu/iu.test(lower)) return { fill: [1, 0.97, 0.86], stroke: [0.86, 0.5, 0.05], title: [0.55, 0.3, 0.02] };
  if (/karıştır|dikkat/iu.test(lower)) return { fill: [1, 0.92, 0.9], stroke: [0.82, 0.19, 0.23], title: [0.65, 0.08, 0.13] };
  if (/klinik/iu.test(lower)) return { fill: [0.94, 0.93, 1], stroke: [0.36, 0.28, 0.85], title: [0.25, 0.2, 0.65] };
  if (/final/iu.test(lower)) return { fill: [0.9, 0.98, 0.94], stroke: [0.05, 0.6, 0.35], title: [0.02, 0.45, 0.25] };
  if (/güncellik/iu.test(lower)) return { fill: [0.95, 0.97, 0.99], stroke: [0.38, 0.45, 0.55], title: [0.2, 0.25, 0.32] };
  return { fill: [0.9, 0.97, 1], stroke: [0.04, 0.42, 0.75], title: [0.02, 0.25, 0.52] };
}

function rgb(values = [0, 0, 0], op = 'rg') {
  return `${values.map((item) => Number(item).toFixed(3)).join(' ')} ${op}`;
}

function buildPdfFromMarkdown(markdown = '', payload = {}) {
  const blocks = parseMarkdown(markdown);
  const metadata = payload.metadata || {};
  const sourceFiles = getSourceFiles(payload.materialPacket || {}).map((file) => ({ fileName: file.fileName, fileType: file.fileType }));
  const lessonId = `komite-pdf-${Date.now().toString(36)}`;
  const titleBlock = blocks.find((block) => block.type === 'heading' && block.level === 1);
  const title = titleBlock?.text || metadata.course || metadata.committee || 'Komite konu anlatımı';
  const subtitle = 'Konu anlatımı, klinik mantık ve sınav odaklı tekrar';
  const outline = [];
  const highYieldAnchors = [];
  const pages = [];
  let current = [];
  let y = A4.height - MARGIN.top;
  let pageNo = 1;

  const addPage = () => {
    current.push(`0.45 0.50 0.58 rg BT /F1 8 Tf 278 28 Td <${textToPdfHex(String(pageNo))}> Tj ET`);
    pages.push(current.join('\n'));
    current = [];
    pageNo += 1;
    y = A4.height - MARGIN.top;
  };
  const ensure = (height = 24) => {
    if (y - height < MARGIN.bottom) addPage();
  };
  const rect = (x, top, w, h, fill, stroke = null) => {
    if (fill) current.push(rgb(fill, 'rg'));
    if (stroke) current.push(rgb(stroke, 'RG'));
    current.push(`${x.toFixed(2)} ${(top - h).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re ${stroke ? 'B' : 'f'}`);
  };
  const textLine = (text, x, baseline, size = 10, font = 'F1', color = [0.12, 0.16, 0.22]) => {
    current.push(`${rgb(color, 'rg')} BT /${font} ${size} Tf ${x.toFixed(2)} ${baseline.toFixed(2)} Td <${textToPdfHex(text)}> Tj ET`);
  };
  const paragraph = (text, { size = 10.5, leading = 15, x = MARGIN.left, width = CONTENT_WIDTH, color = [0.12, 0.16, 0.22] } = {}) => {
    const lines = wrapText(text, size, width);
    ensure(lines.length * leading + 8);
    lines.forEach((line) => {
      textLine(line, x, y, size, 'F1', color);
      y -= leading;
    });
    y -= 5;
  };

  rect(0, A4.height, A4.width, A4.height, [0.97, 0.98, 1]);
  textLine('KlinikIQ Komite', MARGIN.left, A4.height - 95, 12, 'F2', [0.04, 0.28, 0.52]);
  wrapText(title, 24, CONTENT_WIDTH).slice(0, 3).forEach((line) => {
    textLine(line, MARGIN.left, y - 105, 24, 'F2', [0.04, 0.11, 0.23]);
    y -= 31;
  });
  y = Math.min(y - 95, A4.height - 230);
  paragraph(subtitle, { size: 13, leading: 18, color: [0.28, 0.34, 0.43] });
  const metaLine = [metadata.classYear ? `${metadata.classYear}. sınıf` : '', metadata.committee, metadata.learningTarget].filter(Boolean).join(' · ');
  if (metaLine) paragraph(metaLine, { size: 10.5, leading: 15, color: [0.32, 0.38, 0.48] });
  addPage();

  blocks.forEach((block) => {
    if (block.type === 'heading') {
      const isTitle = block.level === 1;
      if (isTitle && pageNo > 2) return;
      const fontSize = block.level === 1 ? 20 : block.level === 2 ? 16 : 12.5;
      const height = block.level === 1 ? 42 : block.level === 2 ? 34 : 25;
      ensure(height);
      if (block.level === 2 || block.level === 3) {
        const item = {
          id: slugify(block.text),
          title: block.text,
          level: block.level - 1,
          pageNumber: pageNo,
        };
        if (/en yüksek getirili|sınavda dikkat|karıştırılmaması|tek sayfalık final/iu.test(block.text)) highYieldAnchors.push(item);
        else outline.push(item);
      }
      if (block.level === 2) {
        rect(MARGIN.left - 7, y + 14, 4, 23, [0.05, 0.45, 0.72]);
      }
      wrapText(block.text, fontSize, CONTENT_WIDTH).forEach((line) => {
        textLine(line, MARGIN.left, y, fontSize, 'F2', block.level === 3 ? [0.05, 0.32, 0.52] : [0.04, 0.11, 0.23]);
        y -= fontSize + 7;
      });
      y -= block.level === 2 ? 8 : 4;
      return;
    }
    if (block.type === 'p') {
      paragraph(block.text);
      return;
    }
    if (block.type === 'list') {
      const lines = block.items.flatMap((item) => wrapText(item, 10.2, CONTENT_WIDTH - 18).map((line, index) => ({ line, index })));
      ensure(lines.length * 14 + 10);
      block.items.forEach((item) => {
        const itemLines = wrapText(item, 10.2, CONTENT_WIDTH - 18);
        itemLines.forEach((line, index) => {
          textLine(index === 0 ? '•' : '', MARGIN.left, y, 10.2, 'F2', [0.05, 0.45, 0.72]);
          textLine(line, MARGIN.left + 16, y, 10.2, 'F1', [0.12, 0.16, 0.22]);
          y -= 14;
        });
      });
      y -= 6;
      return;
    }
    if (block.type === 'box') {
      const colors = colorForBox(block.label);
      const titleLines = wrapText(block.label, 10.5, CONTENT_WIDTH - 24);
      const bodyLines = wrapText(block.text, 10, CONTENT_WIDTH - 24);
      const h = 18 + (titleLines.length * 13) + (bodyLines.length * 14) + 12;
      ensure(h + 8);
      rect(MARGIN.left, y + 8, CONTENT_WIDTH, h, colors.fill, colors.stroke);
      let boxY = y - 9;
      titleLines.forEach((line) => {
        textLine(line, MARGIN.left + 12, boxY, 10.5, 'F2', colors.title);
        boxY -= 13;
      });
      bodyLines.forEach((line) => {
        textLine(line, MARGIN.left + 12, boxY - 2, 10, 'F1', [0.14, 0.18, 0.25]);
        boxY -= 14;
      });
      y -= h + 12;
      return;
    }
    if (block.type === 'table' && block.rows.length) {
      const colCount = Math.max(...block.rows.map((row) => row.length));
      const colWidth = CONTENT_WIDTH / Math.max(1, colCount);
      block.rows.forEach((row, rowIndex) => {
        const cellLines = row.map((cell) => wrapText(cell, 8.2, colWidth - 10));
        const rowHeight = Math.max(24, Math.max(...cellLines.map((lines) => lines.length)) * 11 + 10);
        ensure(rowHeight + 4);
        row.forEach((cell, colIndex) => {
          const x = MARGIN.left + colIndex * colWidth;
          rect(x, y + 4, colWidth, rowHeight, rowIndex === 0 ? [0.05, 0.45, 0.72] : rowIndex % 2 ? [0.97, 0.98, 1] : [1, 1, 1], [0.78, 0.84, 0.9]);
          cellLines[colIndex].slice(0, 4).forEach((line, lineIndex) => {
            textLine(line, x + 5, y - 10 - lineIndex * 11, 8.2, rowIndex === 0 ? 'F2' : 'F1', rowIndex === 0 ? [1, 1, 1] : [0.12, 0.16, 0.22]);
          });
        });
        y -= rowHeight;
      });
      y -= 12;
    }
  });
  if (current.length) addPage();

  const manifest = {
    lessonId,
    title,
    subtitle,
    language: 'tr',
    level: 'Tıp fakültesi komite düzeyi',
    estimatedStudyTime: outline.length >= 7 ? 'Yaklaşık 60-90 dakika' : 'Yaklaşık 35-60 dakika',
    pdfUrl: '',
    createdAt: new Date().toISOString(),
    sourceFiles,
    outline: outline.slice(0, 16),
    highYieldAnchors: highYieldAnchors.length ? highYieldAnchors : outline.slice(-3),
    qualityNote: '',
  };
  const pdfBuffer = createPdfBuffer(pages, { title });
  return { pdfBuffer, manifest };
}

function createPdfBuffer(pageStreams = [], info = {}) {
  const objects = [];
  const add = (body) => {
    objects.push(body);
    return objects.length;
  };
  const fontEncoding = '<< /Type /Encoding /BaseEncoding /WinAnsiEncoding /Differences [128 /Gbreve /gbreve /Scedilla /scedilla /Idotaccent /dotlessi] >>';
  const font1 = add(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding ${fontEncoding} >>`);
  const font2 = add(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding ${fontEncoding} >>`);
  const contentIds = pageStreams.map((stream) => add(`<< /Length ${Buffer.byteLength(stream, 'binary')} >>\nstream\n${stream}\nendstream`));
  const pageIds = contentIds.map((contentId) => add(`<< /Type /Page /Parent 0 0 R /MediaBox [0 0 ${A4.width} ${A4.height}] /Resources << /Font << /F1 ${font1} 0 R /F2 ${font2} 0 R >> >> /Contents ${contentId} 0 R >>`));
  const pagesId = add(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);
  pageIds.forEach((pageId) => {
    objects[pageId - 1] = objects[pageId - 1].replace('/Parent 0 0 R', `/Parent ${pagesId} 0 R`);
  });
  const catalogId = add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  const infoId = add(`<< /Title <${textToPdfHex(info.title || 'Komite konu anlatımı')}> /Producer <${textToPdfHex('KlinikIQ Komite PDF')}> >>`);

  let pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf, 'binary'));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf, 'binary');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(pdf, 'binary');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: ERROR_MESSAGE });

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is missing.');
    const body = typeof req.body === 'string' ? parseJsonObject(req.body) : req.body || {};
    if (body.kind && body.kind !== 'lesson') {
      return res.status(410).json({ error: 'Komite PDF konu anlatımı akışı yalnızca Ders Anlatımı için kullanılabilir.', code: 'KOMITE_PDF_ONLY' });
    }
    const payload = body.payload || body;
    const { files } = buildSourceContext(payload);
    if (!files.length) return res.status(400).json({ error: 'Yüklenen materyalde konu anlatımı oluşturmaya yetecek okunabilir metin bulunamadı.', code: 'NO_SOURCE_TEXT' });

    const prompt = buildPrompt(payload);
    const model = process.env.OPENAI_KOMITE_MODEL || process.env.OPENAI_MODEL || DEFAULT_MODEL;
    const markdown = await requestMarkdown({ apiKey, model, prompt });
    const { pdfBuffer, manifest } = buildPdfFromMarkdown(markdown, payload);
    const pdfDataUrl = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;
    manifest.pdfUrl = pdfDataUrl;

    return res.status(200).json({
      lesson: {
        id: manifest.lessonId,
        type: 'pdfLesson',
        status: 'completed',
        title: manifest.title,
        subtitle: manifest.subtitle,
        pdfUrl: pdfDataUrl,
        pdfDataUrl,
        manifest,
        markdownPreview: markdown.slice(0, 1800),
        createdAt: manifest.createdAt,
        sourceFiles: manifest.sourceFiles,
      },
    });
  } catch (error) {
    console.error('[generate-komite-pdf-lesson]', error);
    return res.status(500).json({ error: ERROR_MESSAGE, code: 'KOMITE_PDF_GENERATION_FAILED' });
  }
}
