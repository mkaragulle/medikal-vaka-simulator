const ERROR_MESSAGE = 'Komite çalışma içeriği şu anda oluşturulamadı. Lütfen tekrar deneyin.';
const DEFAULT_MODEL = 'gpt-5.4-nano';

const KIND_LIMITS = {
  lesson: { maxSourceChars: 34_000, maxTokens: 6200 },
  questions: { maxSourceChars: 34_000, maxTokens: 6200 },
  cards: { maxSourceChars: 30_000, maxTokens: 5200 },
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

const KOMITE_SYSTEM_PROMPT = [
  'Sen tıp fakültesi komite materyallerini Türkçe, bilimsel, öğretici ve sınav odaklı ders anlatımına dönüştüren kıdemli bir medikal eğitim editörüsün. Sadece geçerli JSON döndür.',
  'Yüklenen tüm materyalleri konu-bağımsız şekilde analiz eder, her ana dosyayı temsil eder, hiçbir materyali sessizce atlamazsın.',
  'Çıktın kuru özet değil; öğrencinin konuyu anlamasını sağlayan yapılandırılmış ders anlatımıdır. Gereksiz tekrar yapmaz, tokeni verimli kullanır, ama kapsam ve doğruluktan ödün vermezsin.',
  'Bilimsel doğruluğu temel tıbbi bilgiyle kalibre et. Resmi kılavuzlar, NCBI Bookshelf, PubMed derleme/özetleri, MSD/Merck Manual, CDC/WHO ve akademik kaynak mantığıyla uyumlu düşün; fakat uydurma kaynak, çalışma veya guideline adı verme.',
  'Materyalde net olmayan veya görsel olarak okunamayan bir noktayı kesin bilgi gibi yazma. Görsel piksel içeriği verilmediyse yalnızca okunabilen çevre metni, tablo metni, başlık, alt yazı ve slayt bağlamından çıkarım yap.',
  'Dil profesyonel, öğrenci dostu, açık ve sınav odaklı olsun. Şablon kokan tekrar, bağlam dışı ipucu, aşırı uzun paragraf ve tartışmalı kesinlikten kaçın.',
  'Komite/TUS ayrımı önemlidir: bu çıktı Komite çalışma alanı içindir, TUS soru üretim üslubuna veya TUS veri akışına bağlı değildir.',
].join('\n');

const figureSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'sourceFile',
    'pageOrSlide',
    'sourcePageOrSlide',
    'type',
    'title',
    'whatCanBeSaidSafely',
    'visibleTextAroundFigure',
    'limitations',
    'examRelevance',
    'relatedTopic',
    'analysisStatus',
  ],
  properties: {
    sourceFile: { type: 'string' },
    pageOrSlide: { type: 'string' },
    sourcePageOrSlide: { type: 'string' },
    type: { type: 'string' },
    title: { type: 'string' },
    whatCanBeSaidSafely: { type: 'string' },
    visibleTextAroundFigure: { type: 'string' },
    limitations: { type: 'string' },
    examRelevance: { type: 'string' },
    relatedTopic: { type: 'string' },
    analysisStatus: { type: 'string', enum: ['analyzed', 'partial', 'unavailable'] },
  },
};

const LESSON_RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['lesson'],
  properties: {
    lesson: {
      type: 'object',
      additionalProperties: false,
      required: [
        'title',
        'inferredTitle',
        'shortIntro',
        'overview',
        'bigPicture',
        'learningObjectives',
        'mainConcepts',
        'clinicalExamRelevance',
        'commonConfusions',
        'sections',
        'highYieldPoints',
        'mustKnow',
        'finalReview',
        'figureExplanations',
        'materialCoverage',
        'coverageSummary',
      ],
      properties: {
        title: { type: 'string' },
        inferredTitle: { type: 'string' },
        shortIntro: { type: 'string' },
        overview: { type: 'string' },
        bigPicture: { type: 'string' },
        learningObjectives: { type: 'array', minItems: 3, maxItems: 6, items: { type: 'string' } },
        mainConcepts: { type: 'array', minItems: 3, maxItems: 8, items: { type: 'string' } },
        clinicalExamRelevance: { type: 'string' },
        commonConfusions: { type: 'array', minItems: 1, maxItems: 6, items: { type: 'string' } },
        sections: {
          type: 'array',
          minItems: 3,
          maxItems: 6,
          items: {
            type: 'object',
            additionalProperties: false,
            required: [
              'heading',
              'level',
              'teachingText',
              'mechanismFlow',
              'clinicalConnection',
              'examAngle',
              'commonTrap',
              'keyBoxes',
              'sourceRefs',
            ],
            properties: {
              heading: { type: 'string' },
              level: { type: 'integer' },
              teachingText: { type: 'string' },
              mechanismFlow: { type: 'array', minItems: 0, maxItems: 4, items: { type: 'string' } },
              clinicalConnection: { type: 'string' },
              examAngle: { type: 'string' },
              commonTrap: { type: 'string' },
              keyBoxes: {
                type: 'array',
                minItems: 0,
                maxItems: 2,
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['label', 'text'],
                  properties: {
                    label: { type: 'string' },
                    text: { type: 'string' },
                  },
                },
              },
              sourceRefs: { type: 'array', minItems: 0, maxItems: 6, items: { type: 'string' } },
            },
          },
        },
        highYieldPoints: { type: 'array', minItems: 5, maxItems: 9, items: { type: 'string' } },
        mustKnow: { type: 'array', minItems: 4, maxItems: 8, items: { type: 'string' } },
        finalReview: { type: 'array', minItems: 4, maxItems: 8, items: { type: 'string' } },
        figureExplanations: { type: 'array', minItems: 0, maxItems: 5, items: figureSchema },
        materialCoverage: {
          type: 'array',
          minItems: 0,
          maxItems: 12,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['fileName', 'detectedMainTopic', 'representedIn', 'coverageNote'],
            properties: {
              fileName: { type: 'string' },
              detectedMainTopic: { type: 'string' },
              representedIn: { type: 'string' },
              coverageNote: { type: 'string' },
            },
          },
        },
        coverageSummary: { type: 'string' },
      },
    },
  },
};

const QUESTIONS_RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['questions'],
  properties: {
    questions: {
      type: 'array',
      minItems: 10,
      maxItems: 10,
      items: {
        type: 'object',
        additionalProperties: false,
        required: [
          'stem',
          'question',
          'options',
          'correctAnswer',
          'explanation',
          'optionFeedback',
          'difficulty',
          'learningTarget',
          'sourceTopic',
          'supportingData',
          'learningPoint',
          'memoryNote',
        ],
        properties: {
          stem: { type: 'string' },
          question: { type: 'string' },
          options: { type: 'array', minItems: 5, maxItems: 5, items: { type: 'string' } },
          correctAnswer: { type: 'string' },
          explanation: { type: 'string' },
          optionFeedback: {
            type: 'object',
            additionalProperties: false,
            required: ['A', 'B', 'C', 'D', 'E'],
            properties: {
              A: { type: 'string' },
              B: { type: 'string' },
              C: { type: 'string' },
              D: { type: 'string' },
              E: { type: 'string' },
            },
          },
          difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
          learningTarget: { type: 'string' },
          sourceTopic: { type: 'string' },
          supportingData: { type: 'array', minItems: 0, maxItems: 4, items: { type: 'string' } },
          learningPoint: { type: 'string' },
          memoryNote: { type: 'string' },
        },
      },
    },
  },
};

const CARDS_RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['flashcardDeck'],
  properties: {
    flashcardDeck: {
      type: 'object',
      additionalProperties: false,
      required: ['deckTitle', 'cards'],
      properties: {
        deckTitle: { type: 'string' },
        cards: {
          type: 'array',
          minItems: 10,
          maxItems: 24,
          items: {
            type: 'object',
            additionalProperties: false,
            required: [
              'front',
              'back',
              'explanation',
              'examTrap',
              'type',
              'difficulty',
              'tags',
              'importance',
              'sourceTopic',
            ],
            properties: {
              front: { type: 'string' },
              back: { type: 'string' },
              explanation: { type: 'string' },
              examTrap: { type: 'string' },
              type: { type: 'string' },
              difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
              tags: { type: 'array', minItems: 1, maxItems: 4, items: { type: 'string' } },
              importance: { type: 'string' },
              sourceTopic: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

const RESPONSE_SCHEMAS = {
  lesson: LESSON_RESPONSE_SCHEMA,
  questions: QUESTIONS_RESPONSE_SCHEMA,
  cards: CARDS_RESPONSE_SCHEMA,
};

function normalizeText(value = '') {
  return String(value || '')
    .replace(/\u0000/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function compactLine(value = '') {
  return normalizeText(value).replace(/\s+/g, ' ').trim();
}

function readRequestBody(req) {
  if (!req?.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
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

function extractResponseText(payload) {
  if (typeof payload?.output_text === 'string') return payload.output_text;
  if (typeof payload?.choices?.[0]?.message?.content === 'string') return payload.choices[0].message.content;
  const contentItems = Array.isArray(payload?.output)
    ? payload.output.flatMap((item) => item?.content || [])
    : [];
  return contentItems
    .map((content) => {
      if (typeof content === 'string') return content;
      if (typeof content?.text === 'string') return content.text;
      if (typeof content?.output_text === 'string') return content.output_text;
      return '';
    })
    .filter(Boolean)
    .join('\n')
    .trim();
}

function tokenize(value = '') {
  return compactLine(value)
    .toLocaleLowerCase('tr')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/u)
    .filter((word) => word.length > 3)
    .slice(0, 80);
}

function unique(items = []) {
  return Array.from(new Set(items.map((item) => compactLine(item)).filter(Boolean)));
}

function buildKeywordSet(metadata = {}, files = []) {
  const seed = [
    metadata.classYear,
    metadata.committee,
    metadata.course,
    metadata.learningTarget,
    metadata.university,
    ...(files || []).filter((file) => file?.isUserNote).map((file) => file.cleanedExtractedText || ''),
  ].join(' ');
  return new Set(tokenize(seed));
}

function splitSourceIntoChunks(text = '', maxChunkChars = 2600) {
  const clean = normalizeText(text);
  if (!clean) return [];
  const blocks = clean
    .split(/\n(?=\[(?:Sayfa|Slayt|Ana belge|Başlık|Tablo|Not|Vurgu|Ders notu|Kaynak)\b)|\n\s*\n/u)
    .map((block) => normalizeText(block))
    .filter(Boolean);
  const chunks = [];
  blocks.forEach((block) => {
    if (block.length <= maxChunkChars) {
      chunks.push(block);
      return;
    }
    for (let index = 0; index < block.length; index += maxChunkChars) {
      chunks.push(block.slice(index, index + maxChunkChars).trim());
    }
  });
  return chunks;
}

function scoreChunk(chunk = '', keywordSet = new Set()) {
  const tokens = tokenize(chunk);
  let score = 0;
  tokens.forEach((token) => {
    if (keywordSet.has(token)) score += 3;
  });
  if (/\b(?:kritik|önemli|sınav|vurg|dikkat|tablo|şekil|algoritma|akış|klinik|mekanizma|tanı|tedavi|ayırıcı)\b/iu.test(chunk)) score += 4;
  if (/^\[(?:Sayfa|Slayt|Başlık|Tablo|Vurgu|Not)\b/iu.test(chunk)) score += 1;
  return score;
}

function safeStringifyList(items = [], maxItems = 10, maxChars = 380) {
  return unique(items)
    .slice(0, maxItems)
    .map((item) => `- ${item.length > maxChars ? `${item.slice(0, maxChars).trim()}...` : item}`)
    .join('\n');
}

function sentenceCandidates(text = '') {
  const clean = normalizeText(text);
  if (!clean) return [];
  const lines = clean.split(/\n+/u).map(compactLine).filter((line) => line.length >= 18);
  const sentenceLike = clean.match(/[^.!?;:\n]{24,260}[.!?;:]?/gu)?.map(compactLine) || [];
  return unique([...lines, ...sentenceLike])
    .filter((item) => item.length >= 18 && item.length <= 320)
    .slice(0, 220);
}

function scoreEducationalLine(line = '') {
  let score = 0;
  if (/\b(?:tanım|mekanizma|klinik|tanı|tedavi|yaklaşım|sınıflandır|tablo|şekil|algoritma|karşılaştır|ayırıcı|fark|önemli|dikkat|sınav|komite|laboratuvar|görüntüleme|test|bulgu|komplikasyon|patogenez|fizyopatoloji)\b/iu.test(line)) score += 4;
  if (/[:;]\s*\S+/u.test(line)) score += 1;
  if (/\b(?:art[ıi]r|azal|neden|sonuç|ilişkili|bağlı|gösterir|düşündürür|ayırt)\b/iu.test(line)) score += 2;
  if (line.length > 70 && line.length < 240) score += 1;
  return score;
}

function extractHeadingCandidates(file = {}, text = '') {
  const structureHeadings = Array.isArray(file.detectedStructure)
    ? file.detectedStructure
      .filter((item) => /heading|slide|page|docx-part|table/i.test(String(item.type || '')))
      .map((item) => compactLine(item.preview || item.label || ''))
    : [];
  const bracketHeadings = [...String(text || '').matchAll(/\[(Sayfa|Slayt|Ana belge|Başlık|Tablo|Vurgu|Not)[^\]]{0,90}\]/giu)]
    .map((match) => compactLine(match[0].replace(/^\[|\]$/g, '')));
  const visualHeadings = Array.isArray(file.figures)
    ? file.figures.map((figure) => compactLine(figure.title || figure.caption || figure.type || ''))
    : [];
  const lineHeadings = String(text || '')
    .split(/\n+/u)
    .map(compactLine)
    .filter((line) => line.length >= 5 && line.length <= 95)
    .filter((line) => /^[A-ZÇĞİÖŞÜ0-9][A-ZÇĞİÖŞÜ0-9\s:,-]{5,90}$/u.test(line) || /^(?:\d+[.)-]\s*)?[A-ZÇĞİÖŞÜ][^.!?]{4,80}$/u.test(line))
    .slice(0, 16);
  return unique([...structureHeadings, ...bracketHeadings, ...visualHeadings, ...lineHeadings]).slice(0, 10);
}

function inferMainTopic(file = {}, headings = [], text = '') {
  const fileTitle = compactLine(file.fileName || '').replace(/\.[a-z0-9]+$/iu, '').replace(/[_-]+/g, ' ');
  const candidate = headings.find((heading) => heading.length >= 6 && !/^(sayfa|slayt|tablo|not|vurgu)\b/iu.test(heading))
    || fileTitle
    || compactLine(text).slice(0, 90);
  return candidate || 'Ana konu net çıkarılamadı';
}

function buildFileDigest(file = {}, fileIndex = 0) {
  const text = normalizeText(file.cleanedExtractedText || file.text || '');
  const headings = extractHeadingCandidates(file, text);
  const sentences = sentenceCandidates(text);
  const scored = sentences
    .map((line, index) => ({ line, index, score: scoreEducationalLine(line) + Math.max(0, 5 - index) * 0.15 }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.line);
  const emphasis = Array.isArray(file.emphasisNotes)
    ? file.emphasisNotes.map((note) => compactLine(note.text || note)).filter(Boolean)
    : [];
  const visuals = Array.isArray(file.figures)
    ? file.figures.map((figure) => compactLine(`${figure.type || 'Görsel/tablo'}: ${figure.title || figure.visibleTextAroundFigure || figure.description || ''}`)).filter(Boolean)
    : [];
  const tableStructures = Array.isArray(file.detectedStructure)
    ? file.detectedStructure
      .filter((item) => /table/i.test(String(item.type || '')))
      .map((item) => compactLine(`${item.label || 'Tablo'}: ${item.preview || ''}`))
      .filter(Boolean)
    : [];
  const examLines = sentences.filter((line) => /\b(?:sınav|komite|önemli|dikkat|ayırt|fark|karşılaştır|tipik|en sık|ilk|tanı|tedavi|mekanizma)\b/iu.test(line));
  const confusionLines = sentences.filter((line) => /\b(?:karış|ayırıcı|fark|versus|vs\.?|benzer|ayırt)\b/iu.test(line));
  const definitionLines = sentences.filter((line) => /\b(?:tanım|olarak adlandırılır|denir|ifade eder|kavram)\b/iu.test(line));
  const textQuality = text.length > 2500 ? 'iyi' : text.length > 500 ? 'kısmi' : text.length > 80 ? 'zayıf' : 'çok zayıf';

  return {
    fileName: file.fileName || file.name || `Materyal ${fileIndex + 1}`,
    detectedMainTopic: inferMainTopic(file, headings, text),
    keyHeadings: headings.slice(0, 8),
    coreFacts: unique(scored).slice(0, 8),
    importantDefinitions: unique(definitionLines).slice(0, 4),
    tablesAndVisuals: unique([...visuals, ...tableStructures]).slice(0, 6),
    highlightedOrEmphasizedPoints: unique(emphasis).slice(0, 6),
    examRelevantPoints: unique(examLines).slice(0, 6),
    commonConfusions: unique(confusionLines).slice(0, 4),
    extractedTextQuality: textQuality,
    charCount: Number(file.charCount || text.length || 0),
  };
}

function formatFileDigest(digest = {}) {
  return [
    `fileName: ${digest.fileName}`,
    `detectedMainTopic: ${digest.detectedMainTopic}`,
    `extractedTextQuality: ${digest.extractedTextQuality}; charCount: ${digest.charCount}`,
    digest.keyHeadings?.length ? `keyHeadings:\n${safeStringifyList(digest.keyHeadings, 8, 120)}` : '',
    digest.coreFacts?.length ? `coreFacts:\n${safeStringifyList(digest.coreFacts, 8, 220)}` : '',
    digest.importantDefinitions?.length ? `importantDefinitions:\n${safeStringifyList(digest.importantDefinitions, 4, 220)}` : '',
    digest.tablesAndVisuals?.length ? `tablesAndVisuals:\n${safeStringifyList(digest.tablesAndVisuals, 6, 220)}` : '',
    digest.highlightedOrEmphasizedPoints?.length ? `highlightedOrEmphasizedPoints:\n${safeStringifyList(digest.highlightedOrEmphasizedPoints, 6, 220)}` : '',
    digest.examRelevantPoints?.length ? `examRelevantPoints:\n${safeStringifyList(digest.examRelevantPoints, 6, 220)}` : '',
    digest.commonConfusions?.length ? `commonConfusions:\n${safeStringifyList(digest.commonConfusions, 4, 220)}` : '',
  ].filter(Boolean).join('\n');
}

function extractVisualHints(packet = {}) {
  const packetFigures = Array.isArray(packet.figures) ? packet.figures : [];
  const fileFigures = (Array.isArray(packet.files) ? packet.files : []).flatMap((file) => (
    Array.isArray(file.figures)
      ? file.figures.map((figure) => ({ sourceFile: file.fileName || figure.sourceFile || '', ...figure }))
      : []
  ));
  return [...packetFigures, ...fileFigures].slice(0, 16);
}

function buildMaterialContext({ kind, metadata = {}, materialPacket = {} }) {
  const limits = KIND_LIMITS[kind] || KIND_LIMITS.lesson;
  const files = Array.isArray(materialPacket.files) ? materialPacket.files : [];
  const fileDigests = files.map((file, fileIndex) => buildFileDigest(file, fileIndex));
  const keywordSet = buildKeywordSet(metadata, files);
  const highPriorityFiles = files.filter((file) => file?.isUserNote);
  const regularFiles = files.filter((file) => !file?.isUserNote);
  const chunks = [];

  highPriorityFiles.forEach((file, fileIndex) => {
    splitSourceIntoChunks(file.cleanedExtractedText || file.text || '', kind === 'lesson' ? 1800 : 2200).forEach((text, chunkIndex) => {
      chunks.push({
        source: `${file.fileName || 'Ek ders notu'} · ${chunkIndex + 1}`,
        text,
        score: 100 - fileIndex,
        priority: 'high',
        fileIndex,
      });
    });
  });

  regularFiles.forEach((file, fileIndex) => {
    splitSourceIntoChunks(file.cleanedExtractedText || file.text || '', kind === 'lesson' ? 1900 : 2400).forEach((text, chunkIndex) => {
      chunks.push({
        source: `${file.fileName || `Materyal ${fileIndex + 1}`} · bölüm ${chunkIndex + 1}`,
        text,
        score: scoreChunk(text, keywordSet) + Math.max(0, 2 - chunkIndex),
        priority: 'normal',
        fileIndex,
        chunkIndex,
      });
    });
  });

  const normalChunks = chunks.filter((chunk) => chunk.priority !== 'high');
  const firstUsefulByFile = [];
  regularFiles.forEach((_, fileIndex) => {
    const best = normalChunks
      .filter((chunk) => chunk.fileIndex === fileIndex)
      .sort((a, b) => b.score - a.score)[0];
    if (best) firstUsefulByFile.push(best);
  });
  const firstKeys = new Set(firstUsefulByFile.map((chunk) => `${chunk.fileIndex}:${chunk.chunkIndex}`));
  const selected = [
    ...chunks.filter((chunk) => chunk.priority === 'high'),
    ...firstUsefulByFile,
    ...normalChunks
      .filter((chunk) => !firstKeys.has(`${chunk.fileIndex}:${chunk.chunkIndex}`))
      .sort((a, b) => b.score - a.score),
  ];

  let usedChars = 0;
  const sourceParts = [];
  selected.forEach((chunk) => {
    if (usedChars >= limits.maxSourceChars) return;
    const remaining = limits.maxSourceChars - usedChars;
    const clippedText = chunk.text.length > remaining ? chunk.text.slice(0, remaining).trim() : chunk.text;
    if (!clippedText) return;
    sourceParts.push(`[Kaynak: ${chunk.source}]\n${clippedText}`);
    usedChars += clippedText.length;
  });

  const visualHints = extractVisualHints(materialPacket);
  const emphasisNotes = files.flatMap((file) => (
    Array.isArray(file.emphasisNotes)
      ? file.emphasisNotes.map((note) => `${file.fileName || 'Materyal'}: ${note.text || note}`)
      : []
  ));
  const structures = files.flatMap((file) => (
    Array.isArray(file.detectedStructure)
      ? file.detectedStructure.map((item) => `${file.fileName || 'Materyal'}: ${item.label || item.type || ''} ${item.preview || ''}`)
      : []
  ));

  return {
    sourceText: sourceParts.join('\n\n'),
    materialDigestContext: fileDigests.map((digest, index) => `[[MATERIAL_DIGEST_${index + 1}]]\n${formatFileDigest(digest)}`).join('\n\n'),
    visualContext: visualHints.map((figure, index) => [
      `${index + 1}. ${figure.sourceFile || 'Materyal'} ${figure.sourcePageOrSlide || figure.pageOrSlide || ''}`,
      `Tür: ${figure.type || 'görsel/tablo ipucu'}`,
      `Başlık: ${figure.title || ''}`,
      `Okunabilen metin: ${compactLine(figure.visibleTextAroundFigure || figure.description || figure.preview || '').slice(0, 520)}`,
      figure.limitations ? `Sınır: ${figure.limitations}` : '',
    ].filter(Boolean).join('\n')).join('\n\n'),
    emphasisContext: safeStringifyList(emphasisNotes, 14, 420),
    structureContext: safeStringifyList(structures, 12, 320),
    sourceManifest: safeStringifyList(fileDigests.map((digest) => `${digest.fileName} | ${digest.detectedMainTopic} | metin kalitesi: ${digest.extractedTextQuality} | ${digest.charCount} karakter`), 12, 260),
    fileDigests,
  };
}

function buildMetadataBlock(metadata = {}) {
  return [
    `Sınıf: ${metadata.classYear || 'Belirtilmedi'}`,
    `Komite: ${metadata.committee || 'Belirtilmedi'}`,
    `Ders / konu: ${metadata.course || 'Belirtilmedi'}`,
    `Çalışma hedefi: ${metadata.learningTarget || 'Komite sınavı'}`,
    `Üniversite: ${metadata.university || 'Belirtilmedi'}`,
  ].join('\n');
}

function buildLessonPrompt({ metadata, context }) {
  return [
    'Görev: Kullanıcının yüklediği materyallerden kapsamlı ama token-verimli bir komite ders anlatımı oluştur.',
    'Çıktı yalnızca schema ile uyumlu JSON olsun.',
    '',
    'Kapsam kuralları:',
    '- Önce her MATERIAL_DIGEST kartındaki dosyanın ana konusunu ve eğitim değerini dikkate al.',
    '- Hiçbir ana dosyayı sessizce yok sayma. Her dosya sections içindeki uygun bir bölümde sourceRefs ile temsil edilsin.',
    '- Aynı konuya ait dosyaları birleştir; farklı konuları ayrı ana bölümlere ayır.',
    '- Bir dosya metin kalitesi çok zayıf olduğu için temsil edilemiyorsa bunu materialCoverage.coverageNote ve coverageSummary içinde kısa ve dürüstçe belirt.',
    '- Bir dosyadan yakalanan tek bilgiyi ait olmadığı bölüme taşıma; bağlamı belirsiz bilgiyi kesin hüküm gibi kullanma.',
    '',
    'Ders anlatımı kalite hedefi:',
    '- Sadece özetleme yapma; mantığı kur, bağlantıları açıkla, sınavda ayırt ettiren bilgileri göster, sık karıştırılan noktaları netleştir.',
    '- Tanım, mekanizma/mantık, klinik veya pratik bağlantı, laboratuvar/görüntüleme/test bağlantısı ve sınav odağı uygun yerlerde kurulsun.',
    '- Tablo varsa düz metne gömmek yerine karşılaştırma mantığını açıkla. Görsel/şema varsa sadece okunabilen bağlamdan eğitim yorumu yap.',
    '- Vurgulu/not olarak yakalanan içerikleri yüksek öncelikli kabul et; fakat her paragrafı kutuya dönüştürme.',
    '- 3-6 ana bölüm yaz. Bölümler yoğun ama akıcı olsun; uzun ansiklopedik paragraf, mekanik kalıp tekrarları ve dosya adı tekrarından kaçın.',
    '- mechanismFlow alanını yalnızca gerçekten süreç/mekanizma varsa doldur; her bölümde aynı kalıbı kullanma.',
    '- highYieldPoints ve mustKnow aynı cümleleri tekrar etmesin; biri ayırt ettirici sınav bilgisi, diğeri son tekrar hafızası gibi çalışsın.',
    '',
    'Meta bilgi:',
    buildMetadataBlock(metadata),
    '',
    context.sourceManifest ? `Kaynak listesi:\n${context.sourceManifest}` : '',
    context.materialDigestContext ? `Dosya başına yoğun materyal özetleri:\n${context.materialDigestContext}` : '',
    context.emphasisContext ? `Okunabilen vurgu/notlar:\n${context.emphasisContext}` : '',
    context.structureContext ? `Algılanan yapı/tablo/slayt izleri:\n${context.structureContext}` : '',
    context.visualContext ? `Görsel/tablo ipuçları:\n${context.visualContext}` : '',
    '',
    `Seçilmiş temiz materyal metni:\n${context.sourceText}`,
  ].filter(Boolean).join('\n\n');
}

function buildQuestionsPrompt({ metadata, context, existingLesson }) {
  const lessonHint = existingLesson ? JSON.stringify(existingLesson).slice(0, 9000) : '';
  return [
    'Görev: Bu komite çalışma alanı için 10 adet öğretici, tek doğru cevaplı, beş seçenekli soru üret.',
    'Çıktı yalnızca schema ile uyumlu JSON olsun.',
    '',
    'Soru seti tüm MATERIAL_DIGEST kartlarındaki ana başlıkları dengeli temsil etsin; materyalde temsil edilmeyen konuya soru yazma.',
    'Soru seti dengeli olsun: temel kavram, mekanizma, klinik bağlantı, ayırıcı bilgi, tablo/görsel yorumu uygunsa, net komite bilgisi.',
    'Sorular belirsiz, aşırı zor veya tartışmalı olmasın. Seçenekler aynı düzlemde ve paralel olsun.',
    'Her yanlış seçenek için kısa ama seçenek-özel öğretici feedback yaz.',
    '',
    'Meta bilgi:',
    buildMetadataBlock(metadata),
    '',
    context.materialDigestContext ? `Dosya başına yoğun materyal özetleri:\n${context.materialDigestContext}` : '',
    lessonHint ? `Önceden oluşturulmuş ders anlatımı özeti:\n${lessonHint}` : '',
    context.emphasisContext ? `Okunabilen vurgu/notlar:\n${context.emphasisContext}` : '',
    context.visualContext ? `Görsel/tablo ipuçları:\n${context.visualContext}` : '',
    '',
    `Seçilmiş temiz materyal metni:\n${context.sourceText}`,
  ].filter(Boolean).join('\n\n');
}

function buildCardsPrompt({ metadata, context, existingLesson }) {
  const lessonHint = existingLesson ? JSON.stringify(existingLesson).slice(0, 9000) : '';
  return [
    'Görev: Bu komite çalışma alanı için aktif hatırlamayı destekleyen hap kart destesi üret.',
    'Çıktı yalnızca schema ile uyumlu JSON olsun.',
    '',
    'En az 10 kart üret; konu genişse 16-20 karta çıkabilirsin ama gereksiz şişirme yapma.',
    'Kartlar tüm MATERIAL_DIGEST kartlarındaki ana başlıkları dengeli temsil etsin. Yüzeysel "X nedir?" kartları olmasın; ayırıcı bilgi, mekanizma, klinik bağlantı, sık karışan kavram veya sınavda doğru seçeneğe götüren ipucu odaklı olsun.',
    '',
    'Meta bilgi:',
    buildMetadataBlock(metadata),
    '',
    context.materialDigestContext ? `Dosya başına yoğun materyal özetleri:\n${context.materialDigestContext}` : '',
    lessonHint ? `Önceden oluşturulmuş ders anlatımı özeti:\n${lessonHint}` : '',
    context.emphasisContext ? `Okunabilen vurgu/notlar:\n${context.emphasisContext}` : '',
    context.visualContext ? `Görsel/tablo ipuçları:\n${context.visualContext}` : '',
    '',
    `Seçilmiş temiz materyal metni:\n${context.sourceText}`,
  ].filter(Boolean).join('\n\n');
}

function summarizeExistingLesson(lesson = null) {
  if (!lesson) return null;
  return {
    title: lesson.title || lesson.inferredTitle || '',
    overview: lesson.overview || lesson.shortIntro || '',
    sections: Array.isArray(lesson.sections)
      ? lesson.sections.map((section) => ({
        heading: section.heading || '',
        examAngle: section.examAngle || '',
        commonTrap: section.commonTrap || '',
      })).slice(0, 10)
      : [],
    highYieldPoints: Array.isArray(lesson.highYieldPoints) ? lesson.highYieldPoints.slice(0, 12) : [],
    commonConfusions: Array.isArray(lesson.commonConfusions) ? lesson.commonConfusions.slice(0, 8) : [],
  };
}

function buildPrompt({ kind, metadata, materialPacket, existingLesson }) {
  const context = buildMaterialContext({ kind, metadata, materialPacket });
  if (!context.sourceText || context.sourceText.length < 80) {
    throw new Error('No usable source text.');
  }
  if (kind === 'questions') return buildQuestionsPrompt({ metadata, context, existingLesson: summarizeExistingLesson(existingLesson) });
  if (kind === 'cards') return buildCardsPrompt({ metadata, context, existingLesson: summarizeExistingLesson(existingLesson) });
  return buildLessonPrompt({ metadata, context });
}

function getMaxTokens(kind) {
  const fallback = KIND_LIMITS[kind]?.maxTokens || 6500;
  const parsed = Number.parseInt(process.env.OPENAI_KOMITE_MAX_TOKENS || '', 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(9000, Math.max(1600, parsed));
}

function getTemperature() {
  const parsed = Number.parseFloat(process.env.OPENAI_KOMITE_TEMPERATURE || process.env.OPENAI_TEMPERATURE || '');
  if (!Number.isFinite(parsed)) return null;
  return Math.min(1, Math.max(0.1, parsed));
}

function getTextFormat(kind) {
  if (process.env.OPENAI_KOMITE_RESPONSE_FORMAT === 'json_object') {
    return { type: 'json_object' };
  }
  return {
    type: 'json_schema',
    name: `komite_${kind}`,
    strict: true,
    schema: RESPONSE_SCHEMAS[kind],
  };
}

async function requestKomiteContent({ apiKey, model, kind, prompt }) {
  const requestPayload = {
    model,
    input: [
      { role: 'system', content: KOMITE_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    max_output_tokens: getMaxTokens(kind),
    text: { format: getTextFormat(kind) },
    prompt_cache_key: process.env.OPENAI_KOMITE_PROMPT_CACHE_KEY || `klinikiq-komite-${kind}-v1`,
  };
  const temperature = getTemperature();
  if (temperature !== null) requestPayload.temperature = temperature;
  if (process.env.OPENAI_PROMPT_CACHE_RETENTION) {
    requestPayload.prompt_cache_retention = process.env.OPENAI_PROMPT_CACHE_RETENTION;
  }
  if (process.env.OPENAI_SERVICE_TIER) {
    requestPayload.service_tier = process.env.OPENAI_SERVICE_TIER;
  }

  const aiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload),
  });

  const payload = await aiResponse.json();
  if (!aiResponse.ok) {
    const message = payload?.error?.message || payload?.error || `OpenAI request failed: ${aiResponse.status}`;
    throw new Error(`OpenAI request failed: ${aiResponse.status} ${message}`);
  }
  if (payload?.status === 'incomplete') {
    const reason = payload?.incomplete_details?.reason || payload?.incomplete_details || 'unknown';
    throw new Error(`OpenAI response incomplete: ${reason}`);
  }

  const content = extractResponseText(payload);
  if (!content) throw new Error('OpenAI response did not include text output.');
  return content;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: ERROR_MESSAGE });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is missing.');

    const requestBody = readRequestBody(req);
    const kind = ['lesson', 'questions', 'cards'].includes(requestBody?.kind) ? requestBody.kind : '';
    if (!kind) throw new Error('Invalid komite generation kind.');

    const metadata = requestBody.metadata || {};
    const materialPacket = requestBody.materialPacket || {};
    const prompt = buildPrompt({
      kind,
      metadata,
      materialPacket,
      existingLesson: requestBody.existingLesson || null,
    });

    const model = process.env.OPENAI_KOMITE_MODEL || process.env.OPENAI_MODEL || DEFAULT_MODEL;
    const content = await requestKomiteContent({ apiKey, model, kind, prompt });
    const parsed = parseJsonObject(content);

    return res.status(200).json({
      kind,
      sourceFingerprint: requestBody.sourceFingerprint || '',
      ...parsed,
    });
  } catch (error) {
    console.error('[generate-komite-study]', error);
    return res.status(500).json({ error: ERROR_MESSAGE });
  }
}
