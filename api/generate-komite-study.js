const DEFAULT_MODEL = 'gpt-5.1';
const ERROR_MESSAGE = 'Sistem şu anda konu anlatımını oluşturamadı. Lütfen tekrar deneyin.';
const A4 = { width: 595.28, height: 841.89 };
const MARGIN = { top: 44, right: 46, bottom: 46, left: 46 };
const CONTENT_WIDTH = A4.width - MARGIN.left - MARGIN.right;
const MAX_TITLE_LENGTH = 60;

const CALLOUT_META = {
  main_idea: {
    title: 'Ana fikir',
    fill: [0.9, 0.96, 1],
    stroke: [0.04, 0.32, 0.58],
    titleColor: [0.03, 0.22, 0.45],
  },
  clinical_logic: {
    title: 'Klinik mantık',
    fill: [0.94, 0.93, 1],
    stroke: [0.36, 0.28, 0.85],
    titleColor: [0.25, 0.2, 0.65],
  },
  exam_tip: {
    title: 'Sınav ipucu',
    fill: [1, 0.97, 0.86],
    stroke: [0.86, 0.5, 0.05],
    titleColor: [0.55, 0.3, 0.02],
  },
  dont_confuse: {
    title: 'Karıştırma',
    fill: [1, 0.93, 0.92],
    stroke: [0.8, 0.18, 0.22],
    titleColor: [0.62, 0.08, 0.12],
  },
  warning: {
    title: 'Dikkat',
    fill: [1, 0.95, 0.88],
    stroke: [0.86, 0.35, 0.05],
    titleColor: [0.62, 0.22, 0.02],
  },
  update_note: {
    title: 'Güncellik notu',
    fill: [0.95, 0.97, 0.99],
    stroke: [0.38, 0.45, 0.55],
    titleColor: [0.2, 0.25, 0.32],
  },
  final_review: {
    title: 'Final tekrar',
    fill: [0.9, 0.98, 0.94],
    stroke: [0.05, 0.6, 0.35],
    titleColor: [0.02, 0.45, 0.25],
  },
};

const FORBIDDEN_SOURCE_LANGUAGE = /\b(?:slayt|sunum|bu sayfada|hocanın slaytında|yüklenen dosyada|pdf'?de|pdf’de|dokümanda|dokumanda|dosyada belirtildiği gibi|kaynak metinde|kaynakta)\b/giu;

function compactText(value = '') {
  return String(value || '').replace(/\r/g, '\n').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

function stripForbiddenSourceLanguage(value = '') {
  return compactText(value)
    .replace(FORBIDDEN_SOURCE_LANGUAGE, '')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function stripMarkdownArtifacts(value = '') {
  return stripForbiddenSourceLanguage(value)
    .replace(/^```(?:json|html|markdown)?/iu, '')
    .replace(/```$/u, '')
    .replace(/`([^`]+)`/gu, '$1')
    .replace(/^#{1,6}\s*/gmu, '')
    .replace(/>\s*\[![^\]]+\]\s*/giu, '')
    .replace(/\[![^\]]+\]/gu, '')
    .replace(/^\s*[-*+]\s+/gmu, '')
    .replace(/^\s*\?\s+/gmu, '')
    .replace(/\*\*([^*]+)\*\*/gu, '$1')
    .replace(/\*([^*]+)\*/gu, '$1')
    .replace(/\s*\|\s*/gu, ' / ')
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
    'Kullanıcının yüklediği materyalleri bağımsız, Türkçe, bilimsel, sınav odaklı ve web arayüzünde tek parça scroll edilecek PDF kalitesinde bir konu anlatımına dönüştür.',
    'Amacın özet çıkarmak değildir; öğrencinin konuyu gerçekten anlamasını sağlayan detaylı, klinik mantığı güçlü ve çalışılabilir ders notu üretmelisin.',
    '',
    'ÇIKTI YALNIZCA GEÇERLİ JSON NESNESİ OLSUN. Markdown, HTML, kod bloğu, üretim raporu veya açıklama yazma.',
    'Ham Markdown kesinlikle kullanma: ##, ###, ####, > [!Ana fikir], > [!Sınav ipucu], Markdown tablo çizgileri, ham tire listesi veya ok karakteriyle yazılmış düz akış üretme. Ana çıktı PDF değildir; kontrollü JSON, frontend tarafından tek uzun HTML ders dokümanı olarak render edilecektir.',
    '',
    'JSON şeması:',
    safeJson({
      title: 'Kısa konu adı, en fazla 60 karakter',
      subtitle: 'Konu anlatımı, klinik mantık ve sınav odaklı tekrar',
      sections: [
        {
          title: 'Ana bölüm başlığı',
          mainIdea: 'Bu bölümün kısa ana fikri',
          blocks: [
            { type: 'paragraph', content: 'Akıcı ve bilimsel paragraf metni' },
            { type: 'callout', variant: 'clinical_logic', content: 'Kısa kutu metni' },
            { type: 'mechanism_flow', title: 'Mekanizma özeti', steps: ['İlk olay', 'Ara süreç', 'Klinik sonuç'] },
            { type: 'table', title: 'Tablo başlığı', columns: ['Özellik', 'Durum A', 'Durum B'], rows: [['Mekanizma', 'Açıklama', 'Açıklama']] },
            { type: 'bullet_list', title: 'Kısa liste başlığı', items: ['Liste maddesi'] },
          ],
        },
      ],
      examFocus: ['Somut sınav odaklı bilgi'],
      doNotConfuse: [
        {
          confusingPoint: 'Karışan nokta',
          correctDistinction: 'Doğru ayrım',
          memoryMessage: 'Akılda kalacak mesaj',
        },
      ],
      learningObjectives: ['Bu anlatım sonunda öğrenci konunun temel mekanizmasını açıklayabilir.'],
      finalReview: ['Tek sayfalık final tekrar maddesi'],
      qualityNote: '',
    }),
    '',
    'İçerik kuralları:',
    '- title kısa ve temiz olmalı; ilk paragrafı, dosya adını veya uzun otomatik başlığı title yapma.',
    '- Ayrı kapak, A4 sayfa mantığı veya PDF viewer varsayımı üretme; içerik tek parça scroll edilen web dokümanı gibi çalışılabilir olmalı.',
    '- Kaynak formatını hatırlatan "slayt", "sunum", "bu sayfada", "dokümanda", "PDF’de", "yüklü dosyada" gibi ifadeler kullanma.',
    '- Dosya sırasını körü körüne takip etme; öğrenme akışına göre 6-8 güçlü ana konu bölümü oluştur.',
    '- sections alanına sadece ana konu anlatımı bölümlerini koy. En Yüksek Getirili Sınav Bilgileri, Karıştırılmaması Gerekenler ve Tek Sayfalık Final Tekrar bölümlerini sections içine koyma; bunları yalnız examFocus, doNotConfuse ve finalReview alanlarında ver.',
    '- İlk ana bölüm mutlaka temel tanım, büyük resim ve normal fizyolojiyi kurmalı. Konuya doğrudan komplikasyon, sınıflama veya ileri mekanizma ile başlama.',
    '- Her ana bölümde konuya uygunsa tanım, normal işleyiş, mekanizma/patofizyoloji, klinik bağlantı, tanı/laboratuvar, ayırıcı düşünme, yönetim ve sınav odağını derinlikli işle.',
    '- Her ana bölüm en az 2 öğretici paragraf veya 1 öğretici paragraf + 1 destekleyici blok içersin. Kısa kart özeti gibi kalma.',
    '- Klinik bulgu yazdığında mümkünse nedenini açıkla; tedavi yazdığında neden o tedavinin verildiğini açıkla; tanı eşiği yazdığında nasıl yorumlanacağını açıkla.',
    '- Komite düzeyi için temel bilgileri korurken sınavda ayırt ettiren klinik mantığı da ekle. Örneğin diyabet gibi bir konuda DKA için sadece bulguları değil; tanı üçlüsü, potasyum/sıvı mantığı, insülinin neden gerekli olduğu ve serebral ödem gibi kritik güvenlik noktalarını da işle.',
    '- Tekrar eden bilgileri birleştir; fakat bilimsel detay, sayısal eşik, tanı kriteri, sınıflama ve tedavi prensibini azaltma.',
    '- Eski veya tartışmalı bilgi fark edersen kısa bir update_note callout olarak belirt.',
    '- Ana anlatım paragraf formunda ilerlesin; tüm metni listeye çevirme.',
    '- Bilgi kutuları kısa ve amacına uygun olsun. Kutu içine yeni bölüm, tablo veya uzun liste koyma.',
    '- Tablolar yalnız tanı kriteri, ayırıcı tanı, sınıflama, tedavi karşılaştırması veya laboratuvar yorumu gerçekten kolaylaştırıyorsa kullanılsın.',
    '- Her table block için rows içindeki her satır columns ile aynı sayıda hücre taşısın.',
    '- Mekanizma akışlarını sadece mechanism_flow block olarak ver; steps içine ok, tire, yıldız veya soru işareti koyma.',
    '- learningObjectives alanını 3-5 net hedefle doldur.',
    '- Konu anlatımı sonunda examFocus, doNotConfuse ve finalReview alanlarını mutlaka doldur.',
    '',
    'Callout variant seçenekleri:',
    'main_idea, clinical_logic, exam_tip, dont_confuse, warning, update_note, final_review',
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
  const source = String(text || '').trim().replace(/^```(?:json)?/iu, '').replace(/```$/u, '').trim();
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

async function requestLessonDocument({ apiKey, model, prompt, sourcePayload }) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        { role: 'system', content: 'Yalnızca geçerli JSON üret. Markdown, HTML, kod bloğu veya kaynak işleme açıklaması yazma.' },
        { role: 'user', content: prompt },
      ],
      max_output_tokens: Number.parseInt(process.env.OPENAI_KOMITE_MAX_TOKENS || process.env.OPENAI_KOMITE_PDF_MAX_TOKENS || '', 10) || 16000,
      temperature: Number.parseFloat(process.env.OPENAI_KOMITE_TEMPERATURE || process.env.OPENAI_TEMPERATURE || '0.2'),
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
  return normalizeLessonDocument(parseJsonObject(text), sourcePayload);
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

function removeRepeatedLead(value = '') {
  const words = compactText(value).split(/\s+/u);
  for (let size = 1; size <= 5; size += 1) {
    if (words.length >= size * 2) {
      const first = words.slice(0, size).join(' ').toLocaleLowerCase('tr');
      const second = words.slice(size, size * 2).join(' ').toLocaleLowerCase('tr');
      if (first === second) return words.slice(0, size).concat(words.slice(size * 2)).join(' ');
    }
  }
  return value;
}

function limitAtWord(value = '', max = MAX_TITLE_LENGTH) {
  const clean = compactText(value).replace(/[.,;:!?-]+$/u, '').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max + 1);
  const boundary = Math.max(cut.lastIndexOf(' '), cut.lastIndexOf('/'));
  return (boundary > 18 ? cut.slice(0, boundary) : clean.slice(0, max)).replace(/[.,;:!?-]+$/u, '').trim();
}

function cleanTitleCandidate(value = '') {
  const noRepeat = removeRepeatedLead(stripMarkdownArtifacts(value))
    .replace(/\s+[A-ZÇĞİÖŞÜa-zçğıöşü].{80,}$/u, (match) => (match.length > 90 ? '' : match))
    .replace(/\s{2,}/g, ' ')
    .trim();
  const firstClause = noRepeat.split(/[.!?]\s/u)[0] || noRepeat;
  return limitAtWord(firstClause, MAX_TITLE_LENGTH);
}

function sanitizeTitle(value = '', fallback = 'Komite konu anlatımı') {
  const fallbackTitle = cleanTitleCandidate(fallback);
  const rawTitle = stripMarkdownArtifacts(value);
  const comparableRaw = rawTitle.toLocaleLowerCase('tr').normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const comparableFallback = fallbackTitle.toLocaleLowerCase('tr').normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  if (fallbackTitle && comparableFallback && comparableRaw.startsWith(comparableFallback)) return fallbackTitle;
  const candidates = [value, fallback].map(cleanTitleCandidate).filter(Boolean);
  const chosen = candidates.find((candidate) => candidate.length >= 3 && candidate.length <= MAX_TITLE_LENGTH) || 'Komite konu anlatımı';
  return limitAtWord(chosen, MAX_TITLE_LENGTH);
}

function isGenericSectionTitle(value = '') {
  const clean = stripMarkdownArtifacts(value).toLocaleLowerCase('tr');
  return !clean
    || /^bölüm\s*\d+$/iu.test(clean)
    || /^b.?l.?m\s*\d+$/iu.test(clean)
    || /^section\s*\d+$/iu.test(clean)
    || /^(temel açıklama|klinik tablo|mekanizma|mekanizma \/ patofizyoloji|patofizyoloji|tanı \/ laboratuvar)$/iu.test(clean);
}

function sanitizeSectionTitle(value = '', section = {}, index = 0, documentTitle = '') {
  if (!isGenericSectionTitle(value)) return limitAtWord(stripMarkdownArtifacts(value), 86);
  const firstBlockTitle = Array.isArray(section.blocks)
    ? section.blocks.map((block) => block?.title || block?.heading || '').find((title) => !isGenericSectionTitle(title))
    : '';
  if (firstBlockTitle) return limitAtWord(stripMarkdownArtifacts(firstBlockTitle), 86);
  const idea = stripMarkdownArtifacts(section.mainIdea || '');
  if (idea) return limitAtWord(idea, 74);
  const stems = [
    'Temel kavram ve klinik çerçeve',
    'Mekanizma ve patofizyolojik mantık',
    'Klinik bulguların yorumlanması',
    'Tanı, laboratuvar ve ayırıcı düşünme',
    'Yönetim, tedavi ve sınav odağı',
  ];
  return stems[index] || `${documentTitle || 'Konu'}: çalışma odağı`;
}

function normalizeVariant(value = '') {
  const clean = stripMarkdownArtifacts(value).toLocaleLowerCase('tr').replace(/[\s-]+/gu, '_');
  if (CALLOUT_META[clean]) return clean;
  if (/ana|main/iu.test(clean)) return 'main_idea';
  if (/klinik|clinical/iu.test(clean)) return 'clinical_logic';
  if (/sınav|sinav|exam|ipucu/iu.test(clean)) return 'exam_tip';
  if (/karıştır|karistir|confuse/iu.test(clean)) return 'dont_confuse';
  if (/dikkat|uyarı|uyari|warning|güvenlik|guvenlik/iu.test(clean)) return 'warning';
  if (/güncellik|guncellik|update/iu.test(clean)) return 'update_note';
  if (/final|tekrar|review/iu.test(clean)) return 'final_review';
  return 'main_idea';
}

function splitLongCallout(block) {
  const content = stripMarkdownArtifacts(block.content || block.text || '');
  if (content.length <= 520) return [{ ...block, content }];
  const sentences = content.split(/(?<=[.!?])\s+/u);
  const lead = limitAtWord(sentences.shift() || content, 260);
  const rest = compactText([content.slice(lead.length), ...sentences].join(' '));
  return [
    { ...block, content: lead },
    rest ? { type: 'paragraph', content: rest } : null,
  ].filter(Boolean);
}

function stripStep(value = '') {
  return stripMarkdownArtifacts(value)
    .replace(/^(?:\d+[.)]\s*)/u, '')
    .replace(/^(?:->|=>|→|⇒|>|-|\?)+\s*/u, '')
    .replace(/\s*(?:->|=>|→|⇒|>)\s*$/u, '')
    .trim();
}

function normalizeTableBlock(block = {}) {
  let columns = Array.isArray(block.columns) ? block.columns.map(stripMarkdownArtifacts).filter(Boolean) : [];
  let rows = Array.isArray(block.rows) ? block.rows : [];
  if (!columns.length && rows.length && Array.isArray(rows[0])) {
    columns = rows[0].map(stripMarkdownArtifacts).filter(Boolean);
    rows = rows.slice(1);
  }
  if (!columns.length || !rows.length) return [];
  const maxColumns = Math.min(5, Math.max(1, columns.length));
  columns = columns.slice(0, maxColumns);
  rows = rows
    .filter((row) => Array.isArray(row) || typeof row === 'string')
    .map((row) => {
      const cells = Array.isArray(row) ? row.map(stripMarkdownArtifacts) : String(row).split('|').map(stripMarkdownArtifacts);
      const normalized = cells.length > maxColumns
        ? cells.slice(0, maxColumns - 1).concat(cells.slice(maxColumns - 1).join(' / '))
        : cells.slice(0, maxColumns);
      while (normalized.length < maxColumns) normalized.push('');
      return normalized;
    })
    .filter((row) => row.some(Boolean))
    .slice(0, 36);
  if (!rows.length) return [];
  return [{
    type: 'table',
    title: stripMarkdownArtifacts(block.title || ''),
    columns,
    rows,
  }];
}

function coerceItemsArray(value = null, keys = ['items', 'content']) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object') {
    for (const key of keys) {
      if (Array.isArray(value[key])) return value[key];
    }
  }
  return [];
}

function normalizeConfusionItems(items = []) {
  return coerceItemsArray(items, ['items', 'cards', 'content'])
    .map((item) => {
      if (typeof item === 'string') {
        const clean = stripMarkdownArtifacts(item);
        return clean ? {
          confusingPoint: clean,
          correctDistinction: '',
          memoryMessage: '',
        } : null;
      }
      const confusingPoint = stripMarkdownArtifacts(item?.confusingPoint || item?.karisanNokta || item?.title || '');
      const correctDistinction = stripMarkdownArtifacts(item?.correctDistinction || item?.dogruAyrim || item?.distinction || '');
      const memoryMessage = stripMarkdownArtifacts(item?.memoryMessage || item?.akildaKalacakMesaj || item?.message || '');
      if (!confusingPoint && !correctDistinction && !memoryMessage) return null;
      const unique = new Set([confusingPoint, correctDistinction, memoryMessage].filter(Boolean).map((text) => text.toLocaleLowerCase('tr')));
      if (unique.size < 2 && [confusingPoint, correctDistinction, memoryMessage].filter(Boolean).length >= 2) return null;
      return { confusingPoint, correctDistinction, memoryMessage };
    })
    .filter(Boolean)
    .slice(0, 8);
}

function specialSectionKind(title = '') {
  const clean = stripMarkdownArtifacts(title).toLocaleLowerCase('tr');
  if (/en yüksek|getirili|sınav bilgileri|exam focus|high yield/iu.test(clean)) return 'examFocus';
  if (/karıştır|karistir|do not confuse|confuse/iu.test(clean)) return 'doNotConfuse';
  if (/tek sayfalık|final tekrar|final review|one page/iu.test(clean)) return 'finalReview';
  return '';
}

function extractPlainItemsFromBlocks(blocks = []) {
  const items = [];
  (Array.isArray(blocks) ? blocks : []).forEach((block) => {
    if (Array.isArray(block?.items)) items.push(...block.items.map(stripMarkdownArtifacts));
    if (typeof block?.content === 'string') {
      const clean = stripMarkdownArtifacts(block.content);
      if (clean) items.push(clean);
    }
    if (Array.isArray(block?.steps)) items.push(...block.steps.map(stripMarkdownArtifacts));
  });
  return items.filter(Boolean);
}

function normalizeBlock(block = {}) {
  const type = stripMarkdownArtifacts(block.type || '').toLocaleLowerCase('tr');
  if (type === 'paragraph' || type === 'p' || !type) {
    const content = stripMarkdownArtifacts(block.content || block.text || '');
    return content ? [{ type: 'paragraph', content }] : [];
  }
  if (type === 'callout' || type === 'box') {
    const variant = normalizeVariant(block.variant || block.title || block.label || '');
    return splitLongCallout({
      type: 'callout',
      variant,
      title: CALLOUT_META[variant].title,
      content: block.content || block.text || '',
    }).flatMap((item) => (item.type === 'paragraph' ? normalizeBlock(item) : [item]));
  }
  if (type === 'list' || type === 'bullet_list' || type === 'bullets') {
    const title = stripMarkdownArtifacts(block.title || '');
    const items = (Array.isArray(block.items) ? block.items : [])
      .map(stripMarkdownArtifacts)
      .filter(Boolean)
      .slice(0, 24);
    return items.length ? [{ type: 'bullet_list', title, items }] : [];
  }
  if (type === 'numbered_list' || type === 'ordered_list') {
    const title = stripMarkdownArtifacts(block.title || '');
    const items = (Array.isArray(block.items) ? block.items : [])
      .map(stripMarkdownArtifacts)
      .filter(Boolean)
      .slice(0, 24);
    return items.length ? [{ type: 'numbered_list', title, items }] : [];
  }
  if (type === 'definition_card') {
    const title = stripMarkdownArtifacts(block.title || block.term || 'Tanım');
    const content = stripMarkdownArtifacts(block.content || block.definition || block.text || '');
    return content ? [{ type: 'definition_card', title, content }] : [];
  }
  if (type === 'comparison_card') {
    const title = stripMarkdownArtifacts(block.title || 'Karşılaştırma');
    const leftTitle = stripMarkdownArtifacts(block.leftTitle || block.conceptA || block.left || 'A');
    const rightTitle = stripMarkdownArtifacts(block.rightTitle || block.conceptB || block.right || 'B');
    const leftContent = stripMarkdownArtifacts(block.leftContent || block.a || block.contentA || '');
    const rightContent = stripMarkdownArtifacts(block.rightContent || block.b || block.contentB || '');
    return (leftContent || rightContent) ? [{ type: 'comparison_card', title, leftTitle, rightTitle, leftContent, rightContent }] : [];
  }
  if (type === 'mini_case') {
    const title = stripMarkdownArtifacts(block.title || 'Mini klinik örnek');
    const content = stripMarkdownArtifacts(block.content || block.case || block.text || '');
    return content ? [{ type: 'mini_case', title, content }] : [];
  }
  if (type === 'divider') return [{ type: 'divider' }];
  if (type === 'mechanism_flow' || type === 'flow' || type === 'mechanism') {
    const rawSteps = Array.isArray(block.steps)
      ? block.steps
      : String(block.content || block.text || '').split(/(?:->|=>|→|⇒|\?)/u);
    const steps = rawSteps.map(stripStep).filter(Boolean).slice(0, 12);
    if (steps.length >= 2) {
      return [{ type: 'mechanism_flow', title: stripMarkdownArtifacts(block.title || 'Mekanizma özeti'), steps }];
    }
    const content = stripMarkdownArtifacts(block.content || block.text || steps.join(' '));
    return content ? [{ type: 'paragraph', content }] : [];
  }
  if (type === 'table') return normalizeTableBlock(block);
  if (type === 'confusion_cards') {
    const cards = normalizeConfusionItems(block.items || block.cards || []);
    return cards.length ? [{ type: 'confusion_cards', cards }] : [];
  }
  const fallback = stripMarkdownArtifacts(block.content || block.text || block.title || '');
  return fallback ? [{ type: 'paragraph', content: fallback }] : [];
}

function normalizeLessonDocument(raw = {}, payload = {}) {
  const metadata = payload.metadata || {};
  const titleFallback = metadata.course || metadata.committee || 'Komite konu anlatımı';
  const title = sanitizeTitle(raw.title, titleFallback);
  const subtitle = stripMarkdownArtifacts(raw.subtitle || 'Konu anlatımı, klinik mantık ve sınav odaklı tekrar');
  const rawSections = Array.isArray(raw.sections) ? raw.sections : [];
  const specialSections = rawSections.filter((section) => specialSectionKind(section?.title));
  const coreSections = rawSections.filter((section) => !specialSectionKind(section?.title));
  const sections = coreSections
    .map((section, index) => {
      const sectionTitle = sanitizeSectionTitle(section?.title || '', section || {}, index, title);
      const mainIdea = stripMarkdownArtifacts(section?.mainIdea || section?.main_idea || '');
      const blocks = [];
      if (mainIdea) {
        blocks.push({
          type: 'callout',
          variant: 'main_idea',
          title: CALLOUT_META.main_idea.title,
          content: mainIdea,
        });
      }
      (Array.isArray(section?.blocks) ? section.blocks : []).forEach((block) => {
        blocks.push(...normalizeBlock(block));
      });
      return blocks.length ? { id: slugify(sectionTitle), title: sectionTitle, mainIdea, blocks } : null;
    })
    .filter(Boolean)
    .slice(0, 10);

  const learningObjectives = coerceItemsArray(raw.learningObjectives || raw.learning_objectives || raw.objectives, ['items', 'content'])
    .map(stripMarkdownArtifacts)
    .filter(Boolean)
    .slice(0, 6);
  const specialItems = specialSections.reduce((acc, section) => {
    const kind = specialSectionKind(section?.title);
    acc[kind] = [...(acc[kind] || []), ...extractPlainItemsFromBlocks(section?.blocks)];
    return acc;
  }, {});
  const examFocus = [...coerceItemsArray(raw.examFocus, ['items', 'content']), ...(specialItems.examFocus || [])]
    .map(stripMarkdownArtifacts).filter(Boolean).slice(0, 18);
  const doNotConfuse = normalizeConfusionItems(raw.doNotConfuse || raw.dontConfuse || raw.do_not_confuse || specialItems.doNotConfuse || []);
  const finalReview = [...coerceItemsArray(raw.finalReview, ['items', 'content']), ...(specialItems.finalReview || [])]
    .map(stripMarkdownArtifacts).filter(Boolean).slice(0, 24);

  if (examFocus.length) {
    sections.push({
      title: 'En Yüksek Getirili Sınav Bilgileri',
      blocks: [{ type: 'bullet_list', title: '', items: examFocus }],
    });
  }
  if (doNotConfuse.length) {
    sections.push({
      title: 'Karıştırılmaması Gerekenler',
      blocks: [{ type: 'confusion_cards', cards: doNotConfuse }],
    });
  }
  if (finalReview.length) {
    sections.push({
      title: 'Tek Sayfalık Final Tekrar',
      blocks: [
        {
          type: 'callout',
          variant: 'final_review',
          title: CALLOUT_META.final_review.title,
          content: 'Bu bölüm, sınav öncesi son tekrar için en yüksek getirili bilgileri tek yerde toplar.',
        },
        { type: 'bullet_list', title: '', items: finalReview },
      ],
    });
  }

  const normalized = {
    title,
    subtitle,
    language: 'tr',
    level: stripMarkdownArtifacts(raw.level || (metadata.classYear ? `${metadata.classYear}. sınıf komite düzeyi` : 'Tıp fakültesi komite düzeyi')),
    estimatedStudyTime: stripMarkdownArtifacts(raw.estimatedStudyTime || (sections.length >= 7 ? '60-90 dk' : '35-60 dk')),
    sourceQualityNote: stripMarkdownArtifacts(raw.sourceQualityNote || raw.qualityNote || ''),
    learningObjectives,
    sections,
    roadmap: sections.map((section) => ({ id: section.id, title: section.title })),
    outline: sections.map((section) => ({ id: section.id, title: section.title })),
    examFocus: { id: 'exam-focus', title: 'En Yüksek Getirili Sınav Bilgileri', items: examFocus },
    doNotConfuse: { id: 'do-not-confuse', title: 'Karıştırılmaması Gerekenler', items: doNotConfuse.map((item) => ({ wrongIdea: item.confusingPoint, correctDistinction: item.correctDistinction, memoryHook: item.memoryMessage })) },
    finalReview: { id: 'final-review', title: 'Tek Sayfalık Final Tekrar', content: finalReview },
    highYieldPoints: examFocus,
    commonConfusions: doNotConfuse.map((item) => [item.confusingPoint, item.correctDistinction, item.memoryMessage].filter(Boolean).join(' — ')),
  };
  validateLessonDocument(normalized);
  return normalized;
}

function collectDocumentText(document = {}) {
  const chunks = [document.title, document.subtitle, document.qualityNote];
  (document.sections || []).forEach((section) => {
    chunks.push(section.title);
    (section.blocks || []).forEach((block) => {
      chunks.push(block.title, block.content);
      if (Array.isArray(block.items)) chunks.push(...block.items);
      chunks.push(block.leftTitle, block.rightTitle, block.leftContent, block.rightContent);
      if (Array.isArray(block.steps)) chunks.push(...block.steps);
      if (Array.isArray(block.columns)) chunks.push(...block.columns);
      if (Array.isArray(block.rows)) block.rows.forEach((row) => chunks.push(...row));
      if (Array.isArray(block.cards)) {
        block.cards.forEach((card) => chunks.push(card.confusingPoint, card.correctDistinction, card.memoryMessage));
      }
    });
  });
  return chunks.filter(Boolean).join('\n');
}

function validateLessonDocument(document = {}) {
  if (!document.title || document.title.length > MAX_TITLE_LENGTH) throw new Error('Invalid title for Komite lesson.');
  if (!Array.isArray(document.sections) || !document.sections.length) throw new Error('Komite lesson has no sections.');
  const text = collectDocumentText(document);
  const forbidden = /(^|\n)\s*#{2,6}\s|>\s*\[!|```|\|[^|\n]{2,}\|/u;
  if (forbidden.test(text)) throw new Error('Komite lesson still contains raw Markdown markers.');
  if (/^\s*Bölüm\s+\d+\s*$/imu.test(text)) throw new Error('Komite lesson contains generic section titles.');
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
    .replace(/[→⇒➜]/g, '->')
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
    else bytes.push(32);
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

function rgb(values = [0, 0, 0], op = 'rg') {
  return `${values.map((item) => Number(item).toFixed(3)).join(' ')} ${op}`;
}

function buildPdfFromDocument(document = {}, payload = {}) {
  const metadata = payload.metadata || {};
  const sourceFiles = getSourceFiles(payload.materialPacket || {}).map((file) => ({ fileName: file.fileName, fileType: file.fileType }));
  const lessonId = `komite-pdf-${Date.now().toString(36)}`;
  const outline = [];
  const highYieldAnchors = [];
  const pages = [];
  let current = [];
  let pageNo = 1;
  let y = A4.height - MARGIN.top;

  const rect = (x, top, w, h, fill, stroke = null) => {
    if (fill) current.push(rgb(fill, 'rg'));
    if (stroke) current.push(rgb(stroke, 'RG'));
    current.push(`${x.toFixed(2)} ${(top - h).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re ${stroke ? 'B' : 'f'}`);
  };
  const textLine = (text, x, baseline, size = 10, font = 'F1', color = [0.12, 0.16, 0.22]) => {
    current.push(`${rgb(color, 'rg')} BT /${font} ${size} Tf ${x.toFixed(2)} ${baseline.toFixed(2)} Td <${textToPdfHex(text)}> Tj ET`);
  };
  const startPage = () => {
    current = [];
    y = A4.height - MARGIN.top;
    rect(0, A4.height, A4.width, A4.height, [1, 1, 1]);
  };
  const finishPage = () => {
    current.push(`0.45 0.50 0.58 rg BT /F1 8 Tf 286 26 Td <${textToPdfHex(String(pageNo))}> Tj ET`);
    pages.push(current.join('\n'));
    pageNo += 1;
  };
  const ensure = (height = 24) => {
    if (y - height < MARGIN.bottom) {
      finishPage();
      startPage();
    }
  };
  const paragraph = (text, { size = 10.6, leading = 15.2, x = MARGIN.left, width = CONTENT_WIDTH, color = [0.12, 0.16, 0.22] } = {}) => {
    const lines = wrapText(text, size, width);
    ensure(lines.length * leading + 8);
    lines.forEach((line) => {
      textLine(line, x, y, size, 'F1', color);
      y -= leading;
    });
    y -= 5;
  };
  const smallHeading = (text, x = MARGIN.left, width = CONTENT_WIDTH) => {
    const lines = wrapText(text, 11.5, width);
    ensure(lines.length * 15 + 8);
    lines.forEach((line) => {
      textLine(line, x, y, 11.5, 'F2', [0.04, 0.28, 0.52]);
      y -= 15;
    });
    y -= 2;
  };
  const renderList = (items = [], title = '') => {
    if (title) smallHeading(title);
    items.forEach((item) => {
      const lines = wrapText(item, 10.1, CONTENT_WIDTH - 18);
      ensure(lines.length * 14 + 6);
      rect(MARGIN.left + 2, y + 4, 3, 3, [0.05, 0.45, 0.72]);
      lines.forEach((line, index) => {
        textLine(line, MARGIN.left + 16, y, 10.1, 'F1', [0.12, 0.16, 0.22]);
        y -= index === lines.length - 1 ? 14.5 : 13.2;
      });
    });
    y -= 4;
  };
  const renderCallout = (block = {}) => {
    const variant = normalizeVariant(block.variant || block.title);
    const meta = CALLOUT_META[variant] || CALLOUT_META.main_idea;
    const label = meta.title;
    const bodyLines = wrapText(block.content, 9.8, CONTENT_WIDTH - 24);
    const height = 28 + bodyLines.length * 13.5;
    ensure(height + 8);
    rect(MARGIN.left, y + 7, CONTENT_WIDTH, height, meta.fill, meta.stroke);
    textLine(label, MARGIN.left + 12, y - 9, 10.3, 'F2', meta.titleColor);
    let boxY = y - 25;
    bodyLines.forEach((line) => {
      textLine(line, MARGIN.left + 12, boxY, 9.8, 'F1', [0.14, 0.18, 0.25]);
      boxY -= 13.5;
    });
    y -= height + 11;
  };
  const renderFlow = (block = {}) => {
    smallHeading(block.title || 'Mekanizma özeti');
    block.steps.forEach((step, index) => {
      const lines = wrapText(step, 9.8, CONTENT_WIDTH - 52);
      const rowHeight = Math.max(28, lines.length * 12.5 + 12);
      ensure(rowHeight + 8);
      if (index > 0) rect(MARGIN.left + 13, y + 10, 2, 9, [0.68, 0.78, 0.9]);
      rect(MARGIN.left, y + 5, 30, rowHeight, [0.9, 0.97, 1], [0.08, 0.46, 0.72]);
      textLine(String(index + 1), MARGIN.left + 10, y - 12, 10, 'F2', [0.04, 0.28, 0.52]);
      rect(MARGIN.left + 38, y + 5, CONTENT_WIDTH - 38, rowHeight, [0.98, 1, 1], [0.82, 0.88, 0.94]);
      let rowY = y - 12;
      lines.forEach((line) => {
        textLine(line, MARGIN.left + 48, rowY, 9.8, 'F1', [0.12, 0.16, 0.22]);
        rowY -= 12.5;
      });
      y -= rowHeight + 7;
    });
    y -= 3;
  };
  const renderTable = (block = {}) => {
    if (block.title) smallHeading(block.title);
    const colCount = Math.max(1, block.columns.length);
    const colWidth = CONTENT_WIDTH / colCount;
    const rows = [block.columns, ...block.rows];
    rows.forEach((row, rowIndex) => {
      const cellLines = row.map((cell) => wrapText(cell, rowIndex === 0 ? 7.9 : 7.7, colWidth - 8));
      const rowHeight = Math.max(23, Math.max(...cellLines.map((lines) => lines.length)) * 10.5 + 10);
      ensure(rowHeight + 5);
      row.forEach((cell, colIndex) => {
        const x = MARGIN.left + colIndex * colWidth;
        const isHeader = rowIndex === 0;
        rect(x, y + 4, colWidth, rowHeight, isHeader ? [0.05, 0.45, 0.72] : rowIndex % 2 ? [0.97, 0.99, 1] : [1, 1, 1], [0.77, 0.84, 0.9]);
        let cellY = y - 9;
        cellLines[colIndex].forEach((line) => {
          textLine(line, x + 4, cellY, isHeader ? 7.9 : 7.7, isHeader ? 'F2' : 'F1', isHeader ? [1, 1, 1] : [0.12, 0.16, 0.22]);
          cellY -= 10.5;
        });
      });
      y -= rowHeight;
    });
    y -= 12;
  };
  const renderConfusionCards = (cards = []) => {
    cards.forEach((card) => {
      const rows = [
        ['Karışan nokta', card.confusingPoint],
        ['Doğru ayrım', card.correctDistinction],
        ['Akılda kalacak mesaj', card.memoryMessage],
      ].filter((row) => row[1]);
      const lineGroups = rows.map(([label, value]) => ({
        label,
        lines: wrapText(value, 9.5, CONTENT_WIDTH - 120),
      }));
      const height = 18 + lineGroups.reduce((sum, group) => sum + Math.max(18, group.lines.length * 12.5), 0);
      ensure(height + 8);
      rect(MARGIN.left, y + 7, CONTENT_WIDTH, height, [1, 0.97, 0.96], [0.8, 0.18, 0.22]);
      let cardY = y - 12;
      lineGroups.forEach((group) => {
        textLine(group.label, MARGIN.left + 12, cardY, 9.2, 'F2', [0.62, 0.08, 0.12]);
        let valueY = cardY;
        group.lines.forEach((line) => {
          textLine(line, MARGIN.left + 116, valueY, 9.5, 'F1', [0.14, 0.18, 0.25]);
          valueY -= 12.5;
        });
        cardY -= Math.max(18, group.lines.length * 12.5);
      });
      y -= height + 10;
    });
  };
  const renderBlock = (block = {}) => {
    if (block.type === 'paragraph') paragraph(block.content);
    else if (block.type === 'callout') renderCallout(block);
    else if (block.type === 'list' || block.type === 'bullet_list' || block.type === 'numbered_list') renderList(block.items, block.title);
    else if (block.type === 'definition_card' || block.type === 'mini_case') renderCallout({ variant: block.type === 'mini_case' ? 'clinical_logic' : 'main_idea', content: `${block.title ? `${block.title}: ` : ''}${block.content || ''}` });
    else if (block.type === 'comparison_card') renderTable({ title: block.title || 'Karşılaştırma', columns: [block.leftTitle || 'A', block.rightTitle || 'B'], rows: [[block.leftContent || '', block.rightContent || '']] });
    else if (block.type === 'mechanism_flow') renderFlow(block);
    else if (block.type === 'table') renderTable(block);
    else if (block.type === 'confusion_cards') renderConfusionCards(block.cards);
  };
  const renderSection = (section = {}) => {
    ensure(74);
    const pageNumber = pageNo;
    const item = {
      id: slugify(section.title),
      title: section.title,
      level: 1,
      pageNumber,
    };
    if (/en yüksek getirili|sınav|karıştırılmaması|tek sayfalık final/iu.test(section.title)) highYieldAnchors.push(item);
    else outline.push(item);
    rect(MARGIN.left - 7, y + 14, 4, 26, [0.05, 0.45, 0.72]);
    wrapText(section.title, 15.5, CONTENT_WIDTH).forEach((line) => {
      textLine(line, MARGIN.left, y, 15.5, 'F2', [0.04, 0.11, 0.23]);
      y -= 20;
    });
    y -= 5;
    section.blocks.forEach(renderBlock);
  };

  startPage();
  const titleLines = wrapText(document.title, 19, CONTENT_WIDTH).slice(0, 2);
  titleLines.forEach((line) => {
    textLine(line, MARGIN.left, y, 19, 'F2', [0.04, 0.11, 0.23]);
    y -= 24;
  });
  paragraph(document.subtitle, { size: 10.5, leading: 14.5, color: [0.28, 0.34, 0.43] });
  const metaLine = [metadata.classYear ? `${metadata.classYear}. sınıf` : '', metadata.committee, metadata.learningTarget].filter(Boolean).join(' / ');
  if (metaLine) paragraph(metaLine, { size: 9.5, leading: 13, color: [0.38, 0.44, 0.52] });

  if (document.sections.length) {
    ensure(70);
    rect(MARGIN.left, y + 8, CONTENT_WIDTH, 38 + Math.min(document.sections.length, 8) * 14, [0.96, 0.98, 1], [0.82, 0.88, 0.94]);
    textLine('Yol haritası', MARGIN.left + 12, y - 9, 10.8, 'F2', [0.04, 0.28, 0.52]);
    y -= 25;
    document.sections.slice(0, 8).forEach((section, index) => {
      const label = `${index + 1}. ${section.title}`;
      textLine(limitAtWord(label, 86), MARGIN.left + 14, y, 9.2, 'F1', [0.16, 0.22, 0.3]);
      y -= 14;
    });
    y -= 12;
  }

  document.sections.forEach(renderSection);
  if (current.length) finishPage();

  const manifest = {
    lessonId,
    title: document.title,
    subtitle: document.subtitle,
    language: 'tr',
    level: 'Tıp fakültesi komite düzeyi',
    estimatedStudyTime: outline.length >= 7 ? 'Yaklaşık 60-90 dakika' : 'Yaklaşık 35-60 dakika',
    pdfUrl: '',
    createdAt: new Date().toISOString(),
    sourceFiles,
    outline: outline.slice(0, 16),
    highYieldAnchors: highYieldAnchors.length ? highYieldAnchors : outline.slice(-3),
    qualityNote: document.qualityNote || '',
  };
  const pdfBuffer = createPdfBuffer(pages, { title: document.title });
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
      return res.status(410).json({ error: 'Komite konu anlatımı akışı yalnızca Ders Anlatımı için kullanılabilir.', code: 'KOMITE_LESSON_ONLY' });
    }
    const payload = body.payload || body;
    const { files } = buildSourceContext(payload);
    if (!files.length) return res.status(400).json({ error: 'Yüklenen materyalde konu anlatımı oluşturmaya yetecek okunabilir metin bulunamadı.', code: 'NO_SOURCE_TEXT' });

    const prompt = buildPrompt(payload);
    const model = process.env.OPENAI_KOMITE_MODEL || process.env.OPENAI_MODEL || DEFAULT_MODEL;
    const document = await requestLessonDocument({ apiKey, model, prompt, sourcePayload: payload });
    const sourceFiles = getSourceFiles(payload.materialPacket || {}).map((file) => ({ fileName: file.fileName, fileType: file.fileType }));
    const createdAt = new Date().toISOString();
    const lessonId = `komite-lesson-${Date.now().toString(36)}`;
    const manifest = {
      lessonId,
      title: document.title,
      subtitle: document.subtitle,
      language: document.language || 'tr',
      level: document.level || 'Tıp fakültesi komite düzeyi',
      estimatedStudyTime: document.estimatedStudyTime || '',
      pdfUrl: '',
      createdAt,
      sourceFiles,
      outline: document.outline || document.roadmap || [],
      highYieldAnchors: [],
      qualityNote: document.sourceQualityNote || '',
    };

    return res.status(200).json({
      lesson: {
        id: lessonId,
        type: 'lessonDocument',
        status: 'completed',
        title: document.title,
        subtitle: document.subtitle,
        language: document.language || 'tr',
        level: document.level || manifest.level,
        estimatedStudyTime: document.estimatedStudyTime || manifest.estimatedStudyTime,
        sourceQualityNote: document.sourceQualityNote || manifest.qualityNote,
        learningObjectives: document.learningObjectives || [],
        sections: document.sections,
        roadmap: document.roadmap,
        outline: document.outline,
        examFocus: document.examFocus,
        doNotConfuse: document.doNotConfuse,
        finalReview: document.finalReview,
        highYieldPoints: document.highYieldPoints,
        commonConfusions: document.commonConfusions,
        pdfUrl: '',
        pdfDataUrl: '',
        manifest,
        createdAt,
        sourceFiles,
      },
    });
  } catch (error) {
    console.error('[generate-komite-scroll-lesson]', error);
    return res.status(500).json({ error: ERROR_MESSAGE, code: 'KOMITE_LESSON_GENERATION_FAILED' });
  }
}
