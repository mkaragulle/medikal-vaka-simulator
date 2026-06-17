const ERROR_MESSAGE = 'Komite çalışma içeriği şu anda oluşturulamadı. Lütfen tekrar deneyin.';
const DEFAULT_MODEL = 'gpt-5.4-mini';
const FALLBACK_MODEL = 'gpt-5.4-nano';

const KIND_LIMITS = {
  lesson: { maxSourceChars: 18_000, maxTokens: 6800 },
  questions: { maxSourceChars: 26_000, maxTokens: 6200 },
  cards: { maxSourceChars: 22_000, maxTokens: 5200 },
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

const KOMITE_SYSTEM_PROMPT = [
  'Sen tıp fakültesi komite materyallerini Türkçe, bilimsel, öğretici ve sınav odaklı konu anlatımına dönüştüren kıdemli bir medikal eğitim editörüsün. Sadece geçerli JSON döndür.',
  'Yüklenen materyalleri konu-bağımsız analiz eder, her ana dosyayı adil biçimde temsil eder, farklı konuları gereksiz birleştirmezsin.',
  'Slaytlardaki tanım, sınıflama, algoritma, tablo, görsel, tanı, tedavi ve sınavlık ayrımları öğretici ders anlatımına çevirirsin.',
  'Kuru özet yapmaz, gereksiz tekrar oluşturmaz, boş kutu üretmez ve tokeni verimli kullanırsın.',
  'Öğrenme hedeflerini başlık tekrarına dönüştürme; her hedef materyalin gerçek içeriğine göre özgün, tamamlanmış, akıcı ve ölçülebilir olsun.',
  'Boş kutu, placeholder, yarım cümle, OCR kalıntısı, grup/chunk ifadesi veya mekanik tekrar üretme.',
  'Tablo, algoritma ve görsel içeren materyallerde bunların ana mesajını ders anlatımına çevir; final tekrar maddelerini tekilleştir.',
  'Materyalde net olmayan veya görsel olarak okunamayan bir noktayı kesin bilgi gibi yazma; uydurma kaynak, çalışma veya guideline adı verme.',
  'Komite/TUS ayrımı önemlidir: bu çıktı yalnızca Komite çalışma alanı içindir, TUS soru üretim üslubuna veya TUS veri akışına bağlı değildir.',
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

function cleanOutputText(value = '', { allowShort = false } = {}) {
  const text = compactLine(value)
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\beksiklikt\b/giu, 'eksikliği')
    .replace(/\bmikroo\b/giu, 'mikro')
    .replace(/\bmikrositoğu\b/giu, 'mikrositozu')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/^\s*['"]?\s*sorusudur\.?\s*/iu, '')
    .replace(/\b(?:Ana konu belirtilmedi|Konu belirtilmedi|Unknown topic|Grup\s*\d+|Chunk\s*\d+)\b/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return '';
  if (/^[,.;:!?'"`-]+$/u.test(text)) return '';
  if (!allowShort && text.split(/\s+/u).length < 3) return '';
  if (/^(ve|veya|ile|için|çünkü|ancak|fakat|ise|de|da)\b/iu.test(text)) return '';
  if (/[,:;(-]\s*$/u.test(text)) return '';
  return text;
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

function isProduction() {
  return process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
}

function serializeError(error = {}) {
  return {
    name: error?.name || 'Error',
    message: error?.message || String(error || 'Unknown error'),
    status: error?.status || error?.code || '',
    param: error?.param || '',
    type: error?.type || '',
    attempts: Array.isArray(error?.attempts) ? error.attempts.join(', ') : '',
    stack: error?.stack || '',
  };
}

function classifyError(error = {}) {
  const message = String(error?.message || '').toLowerCase();
  if (error?.status === 'incomplete' || message.includes('incomplete')) return 'AI_INCOMPLETE';
  if (error?.status === 401 || error?.status === 403 || message.includes('api key')) return 'OPENAI_AUTH';
  if (isModelAccessError(error)) return 'OPENAI_MODEL';
  if (isRecoverableOpenAiConfigError(error)) return 'OPENAI_PARAM';
  if (message.includes('no usable source text')) return 'NO_SOURCE_TEXT';
  if (message.includes('json')) return 'AI_JSON';
  return 'KOMITE_AI';
}

function safePromptCacheKey(value = '', fallback = '') {
  const clean = String(value || fallback || '')
    .replace(/[^a-zA-Z0-9:_-]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
    .replace(/^-|-$/g, '');
  return clean || fallback;
}

function getReasoningEffort() {
  const raw = String(process.env.OPENAI_KOMITE_REASONING_EFFORT || 'low').trim().toLowerCase();
  return ['none', 'minimal', 'low', 'medium', 'high', 'xhigh'].includes(raw) ? raw : 'low';
}

function getModelCandidates(primaryModel = '') {
  const configuredFallback = process.env.OPENAI_KOMITE_FALLBACK_MODEL || FALLBACK_MODEL;
  return unique([primaryModel, configuredFallback, FALLBACK_MODEL].filter(Boolean));
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

function wrapLessonPayload(parsed = {}) {
  if (!parsed || typeof parsed !== 'object') return parsed;
  if (parsed.lesson) return parsed;
  if (parsed.data && typeof parsed.data === 'object') return { lesson: parsed.data };
  if (parsed.result && typeof parsed.result === 'object') return { lesson: parsed.result };
  if (parsed.content && typeof parsed.content === 'object') return { lesson: parsed.content };
  return { lesson: parsed };
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
  const clean = compactLine(candidate)
    .replace(/^(?:sayfa|slayt|tablo|not|vurgu)\s*[:.-]?\s*/iu, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean && !/ana konu|belirtilmedi|net çıkarılamadı/iu.test(clean)) return clean;
  return fileTitle || `Materyal ${Number(file.index || 0) + 1}`;
}

function filterLines(sentences = [], pattern, maxItems = 5) {
  return unique(sentences.filter((line) => pattern.test(line))).slice(0, maxItems);
}

function buildMustRepresentItems({ headings = [], definitions = [], classifications = [], diagnostics = [], treatments = [], visuals = [], highYield = [], scored = [] }) {
  return unique([
    ...headings.slice(0, 2),
    ...definitions.slice(0, 2),
    ...classifications.slice(0, 2),
    ...diagnostics.slice(0, 2),
    ...treatments.slice(0, 2),
    ...visuals.slice(0, 2),
    ...highYield.slice(0, 3),
    ...scored.slice(0, 3),
  ]).slice(0, 10);
}

function buildFileDigest(file = {}, fileIndex = 0) {
  const text = normalizeText(file.cleanedExtractedText || file.text || '');
  const fullCharCount = Number(file.fullCharCount || file.charCount || text.length || 0);
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
  const classificationLines = filterLines(sentences, /\b(?:sınıflandır|sınıflama|evre|grade|stage|skor|risk|algoritma|akış|karar|yaklaşım|kriter|ölçüt|tip|type|grup|kategori)\b/iu, 6);
  const diagnosticLines = filterLines(sentences, /\b(?:tanı|test|laboratuvar|lab|görüntüleme|grafi|ultrason|usg|bt|mr|mri|tomografi|biyopsi|kültür|seroloji|pcr|marker|belirteç|duyarlılık|özgüllük|bulgu)\b/iu, 6);
  const treatmentLines = filterLines(sentences, /\b(?:tedavi|yönetim|yaklaşım|izlem|ilaç|antibiyotik|cerrahi|operasyon|profilaksi|rehabilitasyon|management|therapy|treat)\b/iu, 6);
  const examLines = filterLines(sentences, /\b(?:sınav|komite|önemli|dikkat|ayırt|fark|karşılaştır|tipik|en sık|ilk|tanı|tedavi|mekanizma|algoritma|sınıflama)\b/iu, 6);
  const confusionLines = filterLines(sentences, /\b(?:karış|ayırıcı|fark|versus|vs\.?|benzer|ayırt|karşılaştır)\b/iu, 4);
  const definitionLines = filterLines(sentences, /\b(?:tanım|olarak adlandırılır|denir|ifade eder|kavram|nedir|oluşur)\b/iu, 5);
  const textQuality = text.length > 2500 ? 'iyi' : text.length > 500 ? 'kısmi' : text.length > 80 ? 'zayıf' : 'çok zayıf';
  const detectedTopic = inferMainTopic(file, headings, text);
  const tablesAndVisualNotes = unique([...visuals, ...tableStructures]).slice(0, 5);
  const highYieldExamPoints = unique([...examLines, ...emphasis, ...classificationLines.slice(0, 2), ...diagnosticLines.slice(0, 2), ...treatmentLines.slice(0, 2)]).slice(0, 7);
  const mustRepresent = buildMustRepresentItems({
    headings,
    definitions: definitionLines,
    classifications: classificationLines,
    diagnostics: diagnosticLines,
    treatments: treatmentLines,
    visuals: tablesAndVisualNotes,
    highYield: highYieldExamPoints,
    scored,
  });

  return {
    fileName: file.fileName || file.name || `Materyal ${fileIndex + 1}`,
    detectedTopic,
    detectedMainTopic: detectedTopic,
    sourceQuality: textQuality,
    extractedTextQuality: textQuality,
    mainHeadings: headings.slice(0, 7),
    keyHeadings: headings.slice(0, 7),
    coreFacts: unique(scored).slice(0, 6),
    coreDefinitions: unique(definitionLines).slice(0, 4),
    importantDefinitions: unique(definitionLines).slice(0, 4),
    classificationOrAlgorithm: unique(classificationLines).slice(0, 5),
    diagnosticOrLabPoints: unique(diagnosticLines).slice(0, 5),
    treatmentOrManagementPoints: unique(treatmentLines).slice(0, 5),
    tablesAndVisualNotes,
    tablesAndVisuals: tablesAndVisualNotes,
    highlightedOrEmphasizedPoints: unique(emphasis).slice(0, 4),
    highYieldExamPoints,
    examRelevantPoints: highYieldExamPoints,
    commonConfusions: unique(confusionLines).slice(0, 3),
    mustRepresent,
    extractedTextLength: text.length,
    charCount: Number(file.charCount || text.length || 0),
    fullCharCount,
    extractionWarnings: fullCharCount > text.length + 500
      ? [`Materyal çok uzun olduğu için API bağlamına öğretici excerpt taşındı; özgün metin uzunluğu yaklaşık ${fullCharCount} karakter, gönderilen öğretici excerpt ${text.length} karakter.`]
      : [],
  };
}

function formatFileDigest(digest = {}) {
  return [
    `fileName: ${digest.fileName}`,
    `detectedTopic: ${digest.detectedTopic}`,
    `sourceQuality: ${digest.sourceQuality}; extractedTextLength: ${digest.extractedTextLength}; originalTextLength: ${digest.fullCharCount || digest.charCount}`,
    digest.extractionWarnings?.length ? `extractionWarnings:\n${safeStringifyList(digest.extractionWarnings, 2, 180)}` : '',
    digest.mainHeadings?.length ? `mainHeadings:\n${safeStringifyList(digest.mainHeadings, 7, 120)}` : '',
    digest.coreDefinitions?.length ? `coreDefinitions:\n${safeStringifyList(digest.coreDefinitions, 4, 190)}` : '',
    digest.classificationOrAlgorithm?.length ? `classificationOrAlgorithm:\n${safeStringifyList(digest.classificationOrAlgorithm, 5, 190)}` : '',
    digest.diagnosticOrLabPoints?.length ? `diagnosticOrLabPoints:\n${safeStringifyList(digest.diagnosticOrLabPoints, 5, 190)}` : '',
    digest.treatmentOrManagementPoints?.length ? `treatmentOrManagementPoints:\n${safeStringifyList(digest.treatmentOrManagementPoints, 5, 190)}` : '',
    digest.tablesAndVisualNotes?.length ? `tablesAndVisualNotes:\n${safeStringifyList(digest.tablesAndVisualNotes, 5, 190)}` : '',
    digest.highYieldExamPoints?.length ? `highYieldExamPoints:\n${safeStringifyList(digest.highYieldExamPoints, 7, 190)}` : '',
    digest.commonConfusions?.length ? `commonConfusions:\n${safeStringifyList(digest.commonConfusions, 4, 180)}` : '',
    digest.mustRepresent?.length ? `mustRepresent:\n${safeStringifyList(digest.mustRepresent, 10, 170)}` : '',
  ].filter(Boolean).join('\n');
}

function extractVisualHints(packet = {}) {
  const packetFigures = Array.isArray(packet.figures) ? packet.figures : [];
  const fileFigures = (Array.isArray(packet.files) ? packet.files : []).flatMap((file) => (
    Array.isArray(file.figures)
      ? file.figures.map((figure) => ({ sourceFile: file.fileName || figure.sourceFile || '', ...figure }))
      : []
  ));
  return [...packetFigures, ...fileFigures].slice(0, 8);
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
    splitSourceIntoChunks(file.cleanedExtractedText || file.text || '', kind === 'lesson' ? 1200 : 2200).forEach((text, chunkIndex) => {
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
    splitSourceIntoChunks(file.cleanedExtractedText || file.text || '', kind === 'lesson' ? 1200 : 2400).forEach((text, chunkIndex) => {
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
    emphasisContext: safeStringifyList(emphasisNotes, kind === 'lesson' ? 8 : 14, kind === 'lesson' ? 260 : 420),
    structureContext: safeStringifyList(structures, kind === 'lesson' ? 6 : 12, kind === 'lesson' ? 220 : 320),
    sourceManifest: safeStringifyList(fileDigests.map((digest) => `${digest.fileName} | ${digest.detectedTopic} | kaynak kalitesi: ${digest.sourceQuality} | ${digest.charCount} karakter`), 12, 260),
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
    'Görev: Aşağıdaki materyal digestlerini kullanarak komite sınavına yönelik çalışılabilir bir ders anlatımı oluştur.',
    'Çıktı yalnızca geçerli JSON olsun. Markdown, açıklama, kod bloğu veya JSON dışı metin yazma.',
    'Yanıtı token-verimli ama yüzeysel olmayan bir düzeyde tut. Gereksiz ansiklopedi yazma; fakat dosyalardaki ana sınavlık bilgileri ezme.',
    'Dosya sayısı ve konu dağılımına göre 4-6 ana bölüm üret. Farklı ana konuları sırf kısaltmak için aynı başlıkta birleştirme.',
    '',
    'Zorunlu JSON şekli:',
    '{"lesson":{"title":"","shortIntro":"","overview":"","learningObjectives":[],"sections":[{"heading":"","level":2,"teachingText":"","mechanismFlow":[],"algorithmSteps":[],"tableInsights":[],"comparisonPoints":[],"visualNotes":[],"miniReview":[],"clinicalConnection":"","examAngle":"","commonTrap":"","keyBoxes":[],"sourceRefs":[]}],"highYieldPoints":[],"mustKnow":[],"finalReview":[],"figureExplanations":[],"materialCoverage":[],"coverageSummary":""}}',
    '',
    'Kapsam kuralları:',
    '- Her MATERIAL_DIGEST için detectedTopic ve mustRepresent alanlarını özellikle dikkate al.',
    '- Hiçbir ana dosyayı sessizce yok sayma; her dosyayı ya uygun bölümün sourceRefs alanında ya da materialCoverage içinde temsil et.',
    '- Sadece gerçekten aynı konuya ait dosyaları birleştir; ilişkisiz dosyaları ayrı ana bölüm yap.',
    '- Bir dosya metin kalitesi çok zayıfsa bunu coverageSummary içinde kısa ve dürüstçe belirt.',
    '- Bir dosyadan yakalanan tek bilgiyi ait olmadığı bölüme taşıma; bağlamı belirsiz bilgiyi kesin hüküm gibi kullanma.',
    '- detectedTopic boş/placeholder olmasın; gerekirse dosya adından temiz konu adı üret.',
    '',
    'Ders anlatımı kalite hedefi:',
    '- Her bölümde mümkünse büyük resim, temel kavram, sınıflama/mekanizma, klinik-pratik bağlantı, tanı/test/lab veya yönetim bilgisi ve sınav ayırt ettiricisi işlensin; materyalde yoksa uydurma.',
    '- classificationOrAlgorithm, diagnosticOrLabPoints, treatmentOrManagementPoints ve tablesAndVisualNotes alanları varsa bunları teachingText içinde ayrı küçük açıklama olarak derse dönüştür.',
    '- Tablo/görsel/şema bilgisi sadece “var” diye geçilmesin; ne öğrettiği ve sınavda nasıl sorulabileceği açıklansın.',
    '- tableInsights alanını yalnızca tablo/sınıflama/karşılaştırma varsa doldur; tablonun ana mesajını ve ayırt ettirdiği farkı açıkla.',
    '- algorithmSteps alanını yalnızca karar akışı, tanısal yaklaşım, tedavi basamağı veya patofizyolojik süreç varsa adım adım doldur.',
    '- comparisonPoints alanını yalnızca karıştırılabilecek iki veya daha fazla kavram varsa doldur; her maddede doğru ayrımı net yaz.',
    '- visualNotes alanını yalnızca okunabilir görsel/şema/grafik bilgisi varsa doldur; görünmeyen piksel içeriğini uydurma.',
    '- miniReview alanına bölüm sonunda hatırlanacak 3-5 kısa ama anlamlı tekrar maddesi yaz.',
    '- keyBoxes yalnızca gerçekten dolu ve anlamlıysa üret. Boş "Akılda tut", boş "Sınav notu" veya sadece başlık içeren kutu üretme.',
    '- highYieldPoints ayırt ettirici sınav bilgisini, mustKnow son gün hatırlanacak çekirdek bilgiyi, finalReview ise kısa kontrol listesini taşısın; aynı cümleyi listelerde tekrarlama.',
    '- Öğrenme hedefleri başlıkların mekanik tekrarı olmasın; her hedef özgün, tamamlanmış, ölçülebilir ve akıcı Türkçe ile yazılsın.',
    '- Çıktıyı göndermeden önce yarım cümleleri, OCR kalıntılarını, placeholder ifadeleri, boş kutuları ve tekrar eden final maddelerini temizle.',
    '- commonTrap alanını yalnızca gerçekten sık karışan nokta varsa doldur; yoksa boş string bırak.',
    '- materialCoverage kısa olsun: dosya adı, ana konu, hangi bölümde temsil edildiği ve kısa not.',
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

function buildLessonBatchPrompt({ metadata, context, batchIndex = 0, totalBatches = 1 }) {
  return [
    `Görev: Komite ders anlatımının ${batchIndex + 1}/${totalBatches} numaralı materyal bölümünü üret.`,
    'Çıktı yalnızca geçerli JSON olsun. Markdown, açıklama veya kod bloğu yazma.',
    'Bu çağrı yalnızca aşağıdaki MATERIAL_DIGEST dosyalarını anlatır; başka dosyaların konusunu uydurma.',
    '',
    'Zorunlu JSON şekli:',
    '{"lesson":{"sections":[{"heading":"","level":2,"teachingText":"","mechanismFlow":[],"algorithmSteps":[],"tableInsights":[],"comparisonPoints":[],"visualNotes":[],"miniReview":[],"clinicalConnection":"","examAngle":"","commonTrap":"","keyBoxes":[],"sourceRefs":[]}],"highYieldPoints":[],"mustKnow":[],"finalReview":[],"figureExplanations":[],"materialCoverage":[],"coverageSummary":""}}',
    '',
    'Kalite kuralları:',
    '- Her dosyanın detectedTopic ve mustRepresent maddeleri anlatımda görünür biçimde temsil edilsin.',
    '- Tek materyalde birden fazla ana başlık varsa 2-4 ayrı section yaz; tek dosyayı yüzeysel tek paragrafta bırakma.',
    '- Farklı ana konuları aynı heading altında ezme; gerekirse aynı dosya için birden fazla section yaz.',
    '- classificationOrAlgorithm, diagnosticOrLabPoints, treatmentOrManagementPoints ve tablesAndVisualNotes alanları varsa teachingText içinde açıkça derse dönüştür.',
    '- Tablo varsa karşılaştırma mantığını "Tablonun ana mesajı" gibi doğal bir cümleyle açıkla; algoritma varsa karar basamaklarını sırayla anlat; görsel/şema varsa ne öğrettiğini güvenli biçimde belirt.',
    '- tableInsights alanını tablo/sınıflama/karşılaştırma mesajı varsa doldur; algorithmSteps alanını karar akışı veya süreç varsa adım adım doldur.',
    '- comparisonPoints alanında sık karışan kavramları yan yana ayır; visualNotes alanında yalnızca güvenli görsel/şema mesajını yaz.',
    '- miniReview alanına bölüm sonunda sınav öncesi bakılacak 3-5 net madde yaz.',
    '- teachingText kuru özet olmasın: büyük resmi kur, kavramı açıkla, sınıflama/algoritma mantığını anlat, tanı-lab-yönetim bağlantısını materyalde varsa işle.',
    '- keyBoxes yalnızca gerçekten dolu ve anlamlıysa üret; etiketleri mümkünse "Kritik güvenlik", "Dikkat / sık hata", "Sınav ipucu" veya "Bilgi / bağlam" işlevlerinden biri olsun. Boş "Akılda tut" veya sadece başlık içeren kutu üretme.',
    '- highYieldPoints sınavda ayırt ettiren bilgileri, mustKnow çekirdek hatırlatma bilgisini, finalReview kısa kontrol maddelerini taşısın; aynı cümleyi tekrar etme.',
    '- Çıktıyı göndermeden önce metin düzeyinde temizle: yarım cümleleri, bozuk OCR parçalarını, placeholder ifadeleri ve tekrar eden final maddelerini kaldır.',
    '- Öğrenme hedefi üretmen gerekirse başlığı tekrar eden kalıp cümle yazma; materyalin gerçek içeriğine dayanan tamamlanmış ve ölçülebilir hedef yaz.',
    '',
    'Meta bilgi:',
    buildMetadataBlock(metadata),
    '',
    context.sourceManifest ? `Bu çağrıdaki kaynaklar:\n${context.sourceManifest}` : '',
    context.materialDigestContext ? `Materyal digestleri:\n${context.materialDigestContext}` : '',
    context.emphasisContext ? `Okunabilen vurgu/notlar:\n${context.emphasisContext}` : '',
    context.structureContext ? `Algılanan yapı/tablo/slayt izleri:\n${context.structureContext}` : '',
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

function dedupeStrings(items = [], maxItems = 60) {
  const seen = new Set();
  const result = [];
  (Array.isArray(items) ? items : []).forEach((item) => {
    const text = cleanOutputText(item);
    const key = text.toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ');
    const nearDuplicate = [...seen].some((seenKey) => key.length > 42 && seenKey.length > 42 && (key.includes(seenKey) || seenKey.includes(key)));
    if (!text || seen.has(key) || nearDuplicate) return;
    seen.add(key);
    result.push(text);
  });
  return result.slice(0, maxItems);
}

function normalizeOutputList(value = [], maxItems = 6) {
  const items = Array.isArray(value) ? value : value ? [value] : [];
  return dedupeStrings(items.map((item) => {
    if (!item || typeof item !== 'object') return item;
    return item.text || item.content || item.message || item.point || item.summary || item.description || Object.values(item).filter(Boolean).join(' ');
  }), maxItems);
}

function lessonFromParsedPayload(parsed = {}) {
  if (parsed?.lesson && typeof parsed.lesson === 'object') return parsed.lesson;
  if (parsed?.data && typeof parsed.data === 'object') return parsed.data;
  if (parsed?.result && typeof parsed.result === 'object') return parsed.result;
  return parsed && typeof parsed === 'object' ? parsed : {};
}

function normalizeGeneratedSection(section = {}, fallbackIndex = 0) {
  const heading = cleanOutputText(section.heading || section.title, { allowShort: true }) || `Konu bölümü ${fallbackIndex + 1}`;
  const teachingText = cleanOutputText(section.teachingText || section.content || section.summary || section.coreExplanation);
  if (!teachingText) return null;
  return {
    heading,
    level: Number(section.level) || 2,
    teachingText,
    content: teachingText,
    mechanismFlow: Array.isArray(section.mechanismFlow) ? dedupeStrings(section.mechanismFlow, 5) : [],
    algorithmSteps: normalizeOutputList(section.algorithmSteps || section.algorithmFlow || section.decisionSteps || section.decisionFlow, 7),
    tableInsights: normalizeOutputList(section.tableInsights || section.tableNotes || section.tablesAndVisualNotes || section.classificationTable, 5),
    comparisonPoints: normalizeOutputList(section.comparisonPoints || section.comparisons || section.differentials || section.commonConfusions, 5),
    visualNotes: normalizeOutputList(section.visualNotes || section.figureNotes || section.schemaNotes || section.visualInsights, 5),
    miniReview: normalizeOutputList(section.miniReview || section.sectionReview || section.takeHomeMessages || section.keyTakeaways, 5),
    clinicalConnection: cleanOutputText(section.clinicalConnection || section.clinicalOrPracticalConnection),
    examAngle: cleanOutputText(section.examAngle || section.examFocus || section.examConnection),
    commonTrap: cleanOutputText(section.commonTrap || section.commonConfusions),
    keyBoxes: Array.isArray(section.keyBoxes)
      ? section.keyBoxes
        .map((box) => ({ label: cleanOutputText(box?.label || box?.title, { allowShort: true }), text: cleanOutputText(box?.text || box?.content || box?.body) }))
        .filter((box, index, all) => box.text.length >= 18 && box.text.split(/\s+/u).length >= 4 && all.findIndex((candidate) => candidate.text === box.text) === index)
        .slice(0, 2)
      : [],
    sourceRefs: Array.isArray(section.sourceRefs || section.relatedSourceFiles)
      ? dedupeStrings(section.sourceRefs || section.relatedSourceFiles, 8)
      : [],
  };
}

function stripJsonNoise(text = '') {
  return compactLine(String(text || '')
    .replace(/```(?:json)?/giu, ' ')
    .replace(/[{}[\]",]+/gu, ' ')
    .replace(/\b(?:lesson|sections|heading|teachingText|content|highYieldPoints|mustKnow|finalReview|materialCoverage|coverageSummary|sourceRefs|keyBoxes|label|text)\b\s*:?/giu, ' '));
}

function fallbackLessonFragmentFromDigest({ context = {}, partialText = '', batchIndex = 0 }) {
  const digest = Array.isArray(context.fileDigests) ? context.fileDigests[0] : null;
  const topic = compactLine(digest?.detectedTopic || digest?.detectedMainTopic || digest?.fileName || `Materyal ${batchIndex + 1}`);
  const mustRepresent = Array.isArray(digest?.mustRepresent) ? digest.mustRepresent : [];
  const coreDefinitions = Array.isArray(digest?.coreDefinitions) ? digest.coreDefinitions : [];
  const classifications = Array.isArray(digest?.classificationOrAlgorithm) ? digest.classificationOrAlgorithm : [];
  const diagnostics = Array.isArray(digest?.diagnosticOrLabPoints) ? digest.diagnosticOrLabPoints : [];
  const treatments = Array.isArray(digest?.treatmentOrManagementPoints) ? digest.treatmentOrManagementPoints : [];
  const visuals = Array.isArray(digest?.tablesAndVisualNotes) ? digest.tablesAndVisualNotes : [];
  const highYield = Array.isArray(digest?.highYieldExamPoints) ? digest.highYieldExamPoints : [];
  const partial = stripJsonNoise(partialText).slice(0, 1800);
  const teachingParts = [
    `${topic} başlığı bu materyalde öne çıkan ana çalışma alanıdır.`,
    coreDefinitions.length ? `Temel kavramlar: ${coreDefinitions.slice(0, 3).join(' ')}` : '',
    classifications.length ? `Sınıflama/algoritma mantığı: ${classifications.slice(0, 3).join(' ')}` : '',
    diagnostics.length ? `Tanı-test-laboratuvar bağlantısı: ${diagnostics.slice(0, 3).join(' ')}` : '',
    treatments.length ? `Tedavi/yönetim bağlantısı: ${treatments.slice(0, 3).join(' ')}` : '',
    visuals.length ? `Tablo/görsel mesajı: ${visuals.slice(0, 2).join(' ')}` : '',
    partial ? `AI yanıtından kurtarılan ek anlatım: ${partial}` : '',
    mustRepresent.length ? `Mutlaka temsil edilen noktalar: ${mustRepresent.slice(0, 5).join(' ')}` : '',
  ].filter(Boolean);

  return {
    lesson: {
      sections: [{
        heading: topic,
        level: 2,
        teachingText: teachingParts.join(' '),
        mechanismFlow: dedupeStrings(classifications, 4),
        algorithmSteps: dedupeStrings([...classifications, ...diagnostics, ...treatments], 6),
        tableInsights: dedupeStrings(visuals, 4),
        comparisonPoints: dedupeStrings(digest?.commonConfusions || [], 4),
        visualNotes: dedupeStrings(visuals, 4),
        miniReview: dedupeStrings(mustRepresent.length ? mustRepresent : highYield, 5),
        clinicalConnection: compactLine(diagnostics[0] || treatments[0] || ''),
        examAngle: compactLine(highYield[0] || mustRepresent[0] || ''),
        commonTrap: compactLine(digest?.commonConfusions?.[0] || ''),
        keyBoxes: highYield[0] ? [{ label: 'Sınavda ayırt ettiren nokta', text: highYield[0] }] : [],
        sourceRefs: [digest?.fileName].filter(Boolean),
      }],
      highYieldPoints: dedupeStrings(highYield.length ? highYield : mustRepresent, 8),
      mustKnow: dedupeStrings(mustRepresent, 8),
      finalReview: dedupeStrings([topic, ...mustRepresent.slice(0, 4)], 6),
      figureExplanations: [],
      materialCoverage: [{
        fileName: digest?.fileName || topic,
        detectedTopic: topic,
        detectedMainTopic: topic,
        representedIn: topic,
        coverageNote: 'Bu materyalden ayrıştırılan ana başlıklar, vurgular ve okunabilen açıklamalar ders bölümüne dönüştürüldü; bazı ayrıntılar teknik nedenle sınırlı temsil edilmiş olabilir.',
      }],
      coverageSummary: `${topic} materyali ayrıştırılan ana başlıklar ve okunabilen içerik üzerinden temsil edildi.`,
    },
  };
}

function buildLessonBatches(files = []) {
  const sourceFiles = (Array.isArray(files) ? files : []).filter((file) => compactLine(file.cleanedExtractedText || file.text));
  const noteFiles = sourceFiles.filter((file) => file.isUserNote);
  const regularFiles = sourceFiles.filter((file) => !file.isUserNote).slice(0, 10);
  const batchSize = 1;
  const batches = [];
  for (let index = 0; index < regularFiles.length; index += batchSize) {
    batches.push([...noteFiles.slice(0, 1), ...regularFiles.slice(index, index + batchSize)]);
  }
  if (!batches.length && noteFiles.length) batches.push(noteFiles.slice(0, 1));
  return batches;
}

function mergeLessonFragments({ fragments = [], metadata = {}, allDigests = [] }) {
  const sections = [];
  const highYieldPoints = [];
  const mustKnow = [];
  const finalReview = [];
  const figureExplanations = [];
  const materialCoverage = [];
  const coverageSummaryParts = [];

  fragments.forEach((fragment) => {
    const lesson = lessonFromParsedPayload(fragment);
    (Array.isArray(lesson.sections) ? lesson.sections : []).forEach((section) => {
      const normalized = normalizeGeneratedSection(section, sections.length);
      if (normalized) sections.push(normalized);
    });
    highYieldPoints.push(...(Array.isArray(lesson.highYieldPoints) ? lesson.highYieldPoints : []));
    mustKnow.push(...(Array.isArray(lesson.mustKnow) ? lesson.mustKnow : []));
    finalReview.push(...(Array.isArray(lesson.finalReview) ? lesson.finalReview : []));
    figureExplanations.push(...(Array.isArray(lesson.figureExplanations) ? lesson.figureExplanations : []));
    materialCoverage.push(...(Array.isArray(lesson.materialCoverage) ? lesson.materialCoverage : []));
    if (lesson.coverageSummary) coverageSummaryParts.push(lesson.coverageSummary);
  });

  const coveredFiles = new Set(materialCoverage.map((item) => cleanOutputText(item.fileName, { allowShort: true }).toLocaleLowerCase('tr')).filter(Boolean));
  allDigests.forEach((digest) => {
    const fileName = cleanOutputText(digest.fileName, { allowShort: true });
    if (!fileName || coveredFiles.has(fileName.toLocaleLowerCase('tr'))) return;
    materialCoverage.push({
      fileName,
      detectedTopic: cleanOutputText(digest.detectedTopic || digest.detectedMainTopic || fileName, { allowShort: true }),
      detectedMainTopic: cleanOutputText(digest.detectedTopic || digest.detectedMainTopic || fileName, { allowShort: true }),
      representedIn: sections.find((section) => section.sourceRefs?.includes(fileName))?.heading || '',
      coverageNote: digest.mustRepresent?.length ? dedupeStrings(digest.mustRepresent, 2).join(' ') : 'Bu materyal özet düzeyinde işlendi.',
    });
  });

  const courseTitle = compactLine(metadata.course || metadata.committee || 'Komite ders anlatımı');
  const objectiveCandidates = sections.map((section) => {
    const focus = section.examAngle || section.clinicalConnection || section.commonTrap || section.teachingText;
    const focusText = cleanOutputText(focus).split(/(?<=[.!?])\s+/u).find((item) => cleanOutputText(item)) || cleanOutputText(focus);
    const shortFocus = cleanOutputText(focusText).replace(/[.!?]+$/u, '').slice(0, 130);
    if (shortFocus && shortFocus.toLocaleLowerCase('tr') !== section.heading.toLocaleLowerCase('tr')) {
      return `${section.heading} konusunu ${shortFocus} odağında klinik, mekanistik ve sınav bağlamıyla yorumlayabilmek.`;
    }
    return `${section.heading} konusundaki temel kavramları, ayırt ettirici noktaları ve materyalde vurgulanan sınav bağlantılarını açıklayabilmek.`;
  });
  const learningObjectives = dedupeStrings(objectiveCandidates, 10);
  const highYieldClean = dedupeStrings(highYieldPoints, 18);
  const mustKnowClean = dedupeStrings(mustKnow, 14).filter((item) => !new Set(highYieldClean.map((point) => point.toLocaleLowerCase('tr'))).has(item.toLocaleLowerCase('tr')));
  const reviewExclude = new Set([...highYieldClean, ...mustKnowClean].map((item) => item.toLocaleLowerCase('tr')));
  const finalReviewClean = dedupeStrings(finalReview, 14).filter((item) => !reviewExclude.has(item.toLocaleLowerCase('tr')));
  return {
    lesson: {
      title: courseTitle,
      inferredTitle: courseTitle,
      shortIntro: `${courseTitle} materyallerinden dosya bazlı çıkarılan ana konular, sınav ayırt ettiricileri ve çalışma notları aşağıda yapılandırıldı.`,
      overview: 'Ders anlatımı her materyalin ana konusunu ayrı veya ilişkili bölümlerde temsil edecek şekilde oluşturuldu; tanım, sınıflama, algoritma, tablo/görsel, tanı ve yönetim bilgileri materyalde bulunduğu ölçüde işlendi.',
      bigPicture: 'Önce her dosyanın ana konusu ayrıldı, ardından ilişkili başlıklar birleştirildi; farklı konular tek başlıkta ezilmedi.',
      learningObjectives,
      sections,
      highYieldPoints: highYieldClean,
      mustKnow: mustKnowClean,
      finalReview: finalReviewClean,
      figureExplanations: figureExplanations.slice(0, 18),
      materialCoverage,
      coverageSummary: dedupeStrings(coverageSummaryParts, 8).join(' '),
      commonConfusions: dedupeStrings(sections.map((section) => section.commonTrap), 10),
      mainConcepts: dedupeStrings(allDigests.map((digest) => digest.detectedTopic || digest.detectedMainTopic), 12),
      clinicalExamRelevance: 'Komite sınavı açısından ayırt ettirici tanım, sınıflama, algoritma, tanı-laboratuvar ve yönetim noktaları bölümlerin sınav odağı içinde vurgulandı.',
    },
  };
}

async function requestKomiteLessonContent({ apiKey, model, metadata, materialPacket }) {
  const files = Array.isArray(materialPacket.files) ? materialPacket.files : [];
  const batches = buildLessonBatches(files);
  if (!batches.length) throw new Error('No usable source text.');
  const allDigests = files.map((file, index) => buildFileDigest(file, index));
  const batchNames = batches.map((batchFiles, index) => {
    const regular = batchFiles.find((file) => !file.isUserNote) || batchFiles[0];
    return regular?.fileName || regular?.name || `Materyal ${index + 1}`;
  });

  const settled = await Promise.allSettled(batches.map(async (batchFiles, batchIndex) => {
    const batchPacket = {
      ...materialPacket,
      files: batchFiles,
      figures: materialPacket.figures,
      detectedStructure: materialPacket.detectedStructure,
    };
    const context = buildMaterialContext({ kind: 'lesson', metadata, materialPacket: batchPacket });
    const prompt = buildLessonBatchPrompt({ metadata, context, batchIndex, totalBatches: batches.length });
    try {
      const content = await requestKomiteContent({ apiKey, model, kind: 'lesson', prompt, maxTokens: 9000 });
      return parseJsonObject(content);
    } catch (error) {
      if (error?.status === 'incomplete') {
        console.warn('[generate-komite-study:salvage-incomplete-batch]', { batchIndex: batchIndex + 1, message: error.message });
        return fallbackLessonFragmentFromDigest({ context, partialText: error.partialContent || '', batchIndex });
      }
      throw error;
    }
  }));

  const fragments = [];
  const failed = [];
  settled.forEach((result, index) => {
    if (result.status === 'fulfilled') fragments.push(result.value);
    else failed.push({ fileName: batchNames[index], reason: result.reason?.message || 'unknown' });
  });
  if (!fragments.length) {
    const error = new Error(`OpenAI response incomplete: lesson files failed (${failed.map((item) => item.fileName).join(', ')})`);
    error.status = 'incomplete';
    throw error;
  }
  const merged = mergeLessonFragments({ fragments, metadata, allDigests });
  if (failed.length) {
    merged.lesson.coverageSummary = `${merged.lesson.coverageSummary} Şu materyallerden yeterli ders bölümü üretilemedi: ${failed.map((item) => item.fileName).join(', ')}. Ayrıştırılan metin yetersiz olabilir veya içerik üretimi tamamlanamamış olabilir.`.trim();
  }
  return merged;
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

function getMaxTokens(kind, override = null) {
  const overrideNumber = Number.parseInt(override, 10);
  if (Number.isFinite(overrideNumber)) return Math.min(9000, Math.max(1600, overrideNumber));
  const fallback = KIND_LIMITS[kind]?.maxTokens || 6500;
  const parsed = Number.parseInt(process.env.OPENAI_KOMITE_MAX_TOKENS || '', 10);
  if (!Number.isFinite(parsed)) return fallback;
  const minimumByKind = kind === 'lesson' ? 6200 : kind === 'questions' ? 5000 : 4200;
  return Math.min(9000, Math.max(minimumByKind, parsed));
}

function getTemperature() {
  const parsed = Number.parseFloat(process.env.OPENAI_KOMITE_TEMPERATURE || process.env.OPENAI_TEMPERATURE || '');
  if (!Number.isFinite(parsed)) return null;
  return Math.min(1, Math.max(0.1, parsed));
}

function getTextFormat(kind) {
  if (kind === 'lesson' || process.env.OPENAI_KOMITE_RESPONSE_FORMAT === 'json_object') {
    return { type: 'json_object' };
  }
  return {
    type: 'json_schema',
    name: `komite_${kind}`,
    strict: true,
    schema: RESPONSE_SCHEMAS[kind],
  };
}

function buildOpenAiRequestPayload({ model, kind, prompt, simplified = false, maxTokens = null }) {
  const requestPayload = {
    model,
    input: [
      { role: 'system', content: KOMITE_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    max_output_tokens: getMaxTokens(kind, maxTokens),
  };
  if (!simplified) requestPayload.text = { format: getTextFormat(kind) };
  if (!simplified && kind === 'lesson') requestPayload.reasoning = { effort: 'minimal' };

  if (!simplified && process.env.OPENAI_KOMITE_ENABLE_ADVANCED_PARAMS === '1') {
    const temperature = getTemperature();
    if (temperature !== null) requestPayload.temperature = temperature;
    const cacheKey = safePromptCacheKey(process.env.OPENAI_KOMITE_PROMPT_CACHE_KEY, `klinikiq-komite-${kind}-v2`);
    if (cacheKey) requestPayload.prompt_cache_key = cacheKey;
    if (process.env.OPENAI_PROMPT_CACHE_RETENTION) {
      requestPayload.prompt_cache_retention = process.env.OPENAI_PROMPT_CACHE_RETENTION;
    }
    if (process.env.OPENAI_SERVICE_TIER) {
      requestPayload.service_tier = process.env.OPENAI_SERVICE_TIER;
    }
    requestPayload.reasoning = { effort: getReasoningEffort() };
  }
  return requestPayload;
}

function isModelAccessError(error = {}) {
  const message = String(error?.message || '').toLowerCase();
  return error?.status === 404
    || error?.type === 'model_not_found'
    || /model.*(not found|does not exist|do not have access|not have access|unsupported)/i.test(message);
}

function isRecoverableOpenAiConfigError(error = {}) {
  const message = String(error?.message || '').toLowerCase();
  return error?.status === 400 && (
    /unsupported parameter|unknown parameter|not supported|invalid.*temperature|prompt_cache|service_tier|reasoning|text\.format|response_format/i.test(message)
    || ['temperature', 'prompt_cache_key', 'prompt_cache_retention', 'service_tier', 'reasoning', 'text.format'].includes(String(error?.param || ''))
  );
}

async function sendOpenAiRequest({ apiKey, requestPayload }) {
  const aiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload),
  });

  let payload = null;
  try {
    payload = await aiResponse.json();
  } catch {
    payload = null;
  }
  if (!aiResponse.ok) {
    const message = payload?.error?.message || payload?.error || `OpenAI request failed: ${aiResponse.status}`;
    const error = new Error(`OpenAI request failed: ${aiResponse.status} ${message}`);
    error.status = aiResponse.status;
    error.type = payload?.error?.type || '';
    error.param = payload?.error?.param || '';
    throw error;
  }
  if (payload?.status === 'incomplete') {
    const reason = payload?.incomplete_details?.reason || payload?.incomplete_details || 'unknown';
    const partialContent = extractResponseText(payload);
    if (partialContent) {
      try {
        parseJsonObject(partialContent);
        console.warn('[generate-komite-study:using-parseable-incomplete]', { reason });
        return partialContent;
      } catch {
        // A partial non-JSON response cannot be safely shown as a lesson.
      }
    }
    const error = new Error(`OpenAI response incomplete: ${reason}`);
    error.status = 'incomplete';
    error.partialContent = partialContent || '';
    throw error;
  }

  const content = extractResponseText(payload);
  if (!content) throw new Error('OpenAI response did not include text output.');
  return content;
}

async function requestKomiteContent({ apiKey, model, kind, prompt, maxTokens = null }) {
  const attempts = [];
  const modelCandidates = getModelCandidates(model);

  for (const candidateModel of modelCandidates) {
    for (const simplified of [false, true]) {
      try {
        attempts.push(`${candidateModel}${simplified ? ':simplified' : ''}`);
        return await sendOpenAiRequest({
          apiKey,
          requestPayload: buildOpenAiRequestPayload({ model: candidateModel, kind, prompt, simplified, maxTokens }),
        });
      } catch (error) {
        error.attempts = attempts.slice();
        if (!simplified && isRecoverableOpenAiConfigError(error)) {
          console.warn('[generate-komite-study:retry-simplified]', serializeError(error));
          continue;
        }
        if (!simplified && kind === 'lesson' && error?.status === 'incomplete') {
          throw error;
        }
        if (isModelAccessError(error)) {
          console.warn('[generate-komite-study:retry-model]', serializeError(error));
          break;
        }
        throw error;
      }
    }
  }

  const error = new Error(`OpenAI request failed for all configured Komite models: ${attempts.join(', ')}`);
  error.status = 'model_fallback_failed';
  throw error;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: ERROR_MESSAGE });
  }

  const debugContext = {
    kind: '',
    model: '',
    fileCount: 0,
    approximateSourceChars: 0,
    promptChars: 0,
  };

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is missing.');

    const requestBody = readRequestBody(req);
    const kind = ['lesson', 'questions', 'cards'].includes(requestBody?.kind) ? requestBody.kind : '';
    if (!kind) throw new Error('Invalid komite generation kind.');
    debugContext.kind = kind;
    debugContext.fileCount = Number(requestBody?.debugMeta?.fileCount || requestBody?.materialPacket?.files?.length || 0);
    debugContext.approximateSourceChars = Number(requestBody?.debugMeta?.approximateSourceChars || 0);

    const metadata = requestBody.metadata || {};
    const materialPacket = requestBody.materialPacket || {};
    const model = process.env.OPENAI_KOMITE_MODEL || process.env.OPENAI_MODEL || DEFAULT_MODEL;
    debugContext.model = model;

    if (kind === 'lesson') {
      const responsePayload = await requestKomiteLessonContent({ apiKey, model, metadata, materialPacket });
      return res.status(200).json({
        kind,
        sourceFingerprint: requestBody.sourceFingerprint || '',
        ...responsePayload,
      });
    }

    const prompt = buildPrompt({
      kind,
      metadata,
      materialPacket,
      existingLesson: requestBody.existingLesson || null,
    });
    debugContext.promptChars = prompt.length;

    const content = await requestKomiteContent({ apiKey, model, kind, prompt });
    const parsed = parseJsonObject(content);
    const responsePayload = kind === 'lesson' ? wrapLessonPayload(parsed) : parsed;

    return res.status(200).json({
      kind,
      sourceFingerprint: requestBody.sourceFingerprint || '',
      ...responsePayload,
    });
  } catch (error) {
    const serialized = serializeError(error);
    const errorCode = classifyError(error);
    console.error('[generate-komite-study]', { ...debugContext, errorCode, error: serialized });
    return res.status(500).json({
      error: ERROR_MESSAGE,
      errorCode,
      ...(!isProduction() ? { debugReason: serialized.message, debugType: serialized.name } : {}),
    });
  }
}
