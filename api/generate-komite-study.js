const ERROR_MESSAGE = 'Komite çalışma içeriği şu anda oluşturulamadı. Lütfen tekrar deneyin.';
const DEFAULT_MODEL = 'gpt-5.4-mini';
const FALLBACK_MODEL = 'gpt-5.4-nano';

const KIND_LIMITS = {
  lesson: { maxSourceChars: 28_000, maxTokens: 9000 },
  questions: { maxSourceChars: 26_000, maxTokens: 6200 },
  cards: { maxSourceChars: 22_000, maxTokens: 5200 },
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

const KOMITE_SYSTEM_PROMPT = [
  'Sen tıp fakültesi komite materyallerini Türkçe, bilimsel, öğretici ve sınav odaklı konu anlatımına dönüştüren kıdemli bir medikal eğitim editörüsün. Sadece geçerli JSON döndür.',
  'Yüklenen materyalleri konu-bağımsız analiz eder, her ana dosyayı adil biçimde temsil eder, farklı konuları gereksiz birleştirmezsin.',
  'Slaytlardaki tanım, sınıflama, algoritma, tablo, okunabilir şema/caption metni, tanı, tedavi ve sınavlık ayrımları öğretici ders anlatımına çevirirsin.',
  'Kuru özet yapmaz, gereksiz tekrar oluşturmaz, boş kutu üretmez ve tokeni verimli kullanırsın.',
  'Öğrenme hedeflerini başlık tekrarına dönüştürme; her hedef materyalin gerçek içeriğine göre özgün, tamamlanmış, akıcı ve ölçülebilir olsun.',
  'Boş kutu, placeholder, yarım cümle, OCR kalıntısı, grup/chunk ifadesi, dosya işleme raporu veya mekanik tekrar üretme.',
  'Ders anlatımına “dosya bazlı çıkarıldı”, “materyal temsil edildi”, “aşağıda yapılandırıldı” gibi teknik giriş cümleleriyle başlama; doğrudan konuya gir.',
  'Tablo ve algoritma içeren materyallerde bunların ana mesajını ders anlatımına çevir; ayrıştırılamayan piksel içeriğini yorumlama.',
  'Metin olarak ayrıştırılamayan görsel içeriğini yorumlama; materyalde net olmayan noktayı kesin bilgi gibi yazma, uydurma kaynak, çalışma veya guideline adı verme.',
  'Komite/TUS ayrımı önemlidir: bu çıktı yalnızca Komite çalışma alanı içindir, TUS soru üretim üslubuna veya TUS veri akışına bağlı değildir.',
].join('\n');

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
        commonConfusions: { type: 'array', minItems: 0, maxItems: 6, items: { type: 'string' } },
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
            },
          },
        },
        highYieldPoints: { type: 'array', minItems: 5, maxItems: 9, items: { type: 'string' } },
        mustKnow: { type: 'array', minItems: 4, maxItems: 8, items: { type: 'string' } },
        finalReview: { type: 'array', minItems: 4, maxItems: 8, items: { type: 'string' } },
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

const TECHNICAL_LESSON_NOTE_PATTERN = /\b(?:dosya bazl[ıi]|dosya işleme|materyal(?:ler)?(?:inden|in)?\s+(?:ana konusu|çıkarılan|temsil)|materyaller temsil edildi|çalışma notları yapılandırıldı|ana konular aşağıda yapılandırıldı|aşağıda yapılandırıldı|temsil edildi|materyal kapsam|coverageSummary|materialCoverage|sourceManifest|sourceFingerprint|source coverage|output structure|MATERIAL_DIGEST|chunk|grup\s*\d+|üretim süreci|teknik nedenle|extraction warning|extraction|ayrıştırılan metin|API bağlamı|öğretici excerpt|görsel sekmesi için|ana konu belirtildi|her dosyanın ana konusu|ilişkili başlıklar birleştirildi|farklı konular tek başlıkta ezilmedi)\b/iu;
const RAW_SOURCE_LINE_PATTERN = /^(?:[A-ZÇĞİÖŞÜ0-9][A-ZÇĞİÖŞÜ0-9\s/():,._-]{10,}|(?:prof\.?|doç\.?|dr\.?|öğr\.?\s*gör\.?)\b|.*\.(?:pdf|pptx|ppt|docx|txt)\b)/iu;
const BAD_OBJECTIVE_PATTERN = /\b(?:odağında klinik, mekanistik ve sınav bağlamıyla yorumlayabilmek|temel öğrenme mantığını açıklayabilmek|bilgisini açıklamak ve soruda ayırt etmek|dosya bazlı|materyal(?:ler)?inden|sınavda .* sorulabilir odağında)\b/iu;
const GENERIC_HEADING_PATTERN = /^(?:bölüm|konu bölümü|section|part)\s*\d+$/iu;
const GENERIC_SUBHEADING_PATTERN = /^(?:akış|tablo|ayrım|şema|bilgi|özet|klinik|tedavi|sınav ipucu|kritik güvenlik|sık hata|bilgi kutusu|akılda tut|son kontrol|mini tekrar|görsel yorumu|tablonun ana mesajı|şema açıklaması|süreç mantığı)$/iu;

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

function cleanOutputText(value = '', { allowShort = false } = {}) {
  let text = compactLine(value)
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
  text = stripTechnicalLessonSentences(text);
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
  const lineHeadings = String(text || '')
    .split(/\n+/u)
    .map(compactLine)
    .filter((line) => line.length >= 5 && line.length <= 95)
    .filter((line) => /^[A-ZÇĞİÖŞÜ0-9][A-ZÇĞİÖŞÜ0-9\s:,-]{5,90}$/u.test(line) || /^(?:\d+[.)-]\s*)?[A-ZÇĞİÖŞÜ][^.!?]{4,80}$/u.test(line))
    .slice(0, 16);
  return unique([...structureHeadings, ...bracketHeadings, ...lineHeadings]).slice(0, 10);
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
  const tableStructures = Array.isArray(file.detectedStructure)
    ? file.detectedStructure
      .filter((item) => /table|algorithm|schema|flow|caption|figure/i.test(String(`${item.type || ''} ${item.label || ''}`)))
      .map((item) => compactLine(`${item.label || item.type || 'Tablo/şema metni'}: ${item.preview || ''}`))
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
  const tablesAndVisualNotes = unique(tableStructures).slice(0, 5);
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

function formatLessonTopicCard(digest = {}) {
  return [
    `Konu: ${digest.detectedTopic}`,
    digest.mainHeadings?.length ? `Doğal alt başlık adayları:\n${safeStringifyList(digest.mainHeadings, 6, 120)}` : '',
    digest.coreDefinitions?.length ? `Temel kavramlar:\n${safeStringifyList(digest.coreDefinitions, 4, 190)}` : '',
    digest.classificationOrAlgorithm?.length ? `Sınıflama, süreç veya algoritma bilgisi:\n${safeStringifyList(digest.classificationOrAlgorithm, 5, 190)}` : '',
    digest.diagnosticOrLabPoints?.length ? `Tanı, test veya laboratuvar bağlantıları:\n${safeStringifyList(digest.diagnosticOrLabPoints, 5, 190)}` : '',
    digest.treatmentOrManagementPoints?.length ? `Tedavi veya yönetim bağlantıları:\n${safeStringifyList(digest.treatmentOrManagementPoints, 5, 190)}` : '',
    digest.tablesAndVisualNotes?.length ? `Okunabilen tablo, algoritma veya şema bilgisi:\n${safeStringifyList(digest.tablesAndVisualNotes, 5, 190)}` : '',
    digest.highYieldExamPoints?.length ? `Sınavda ayırt ettiren noktalar:\n${safeStringifyList(digest.highYieldExamPoints, 7, 190)}` : '',
    digest.commonConfusions?.length ? `Sık karışabilecek ayrımlar:\n${safeStringifyList(digest.commonConfusions, 4, 180)}` : '',
    digest.mustRepresent?.length ? `Mutlaka işlenecek bilgiler:\n${safeStringifyList(digest.mustRepresent, 10, 170)}` : '',
  ].filter(Boolean).join('\n');
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
    sourceParts.push(kind === 'lesson' ? clippedText : `[Kaynak: ${chunk.source}]\n${clippedText}`);
    usedChars += clippedText.length;
  });

  const emphasisNotes = files.flatMap((file) => (
    Array.isArray(file.emphasisNotes)
      ? file.emphasisNotes.map((note) => (kind === 'lesson' ? `${note.text || note}` : `${file.fileName || 'Materyal'}: ${note.text || note}`))
      : []
  ));
  const structures = files.flatMap((file) => (
    Array.isArray(file.detectedStructure)
      ? file.detectedStructure.map((item) => (kind === 'lesson' ? `${item.label || item.type || ''} ${item.preview || ''}` : `${file.fileName || 'Materyal'}: ${item.label || item.type || ''} ${item.preview || ''}`))
      : []
  ));

  return {
    sourceText: sourceParts.join('\n\n'),
    materialDigestContext: fileDigests
      .map((digest, index) => kind === 'lesson'
        ? `[[KONU_KARTI_${index + 1}]]\n${formatLessonTopicCard(digest)}`
        : `[[MATERIAL_DIGEST_${index + 1}]]\n${formatFileDigest(digest)}`)
      .join('\n\n'),
    emphasisContext: safeStringifyList(emphasisNotes, kind === 'lesson' ? 8 : 14, kind === 'lesson' ? 260 : 420),
    structureContext: safeStringifyList(structures, kind === 'lesson' ? 6 : 12, kind === 'lesson' ? 220 : 320),
    sourceManifest: kind === 'lesson' ? '' : safeStringifyList(fileDigests.map((digest) => `${digest.fileName} | ${digest.detectedTopic} | kaynak kalitesi: ${digest.sourceQuality} | ${digest.charCount} karakter`), 12, 260),
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
  const lessonDigestContext = String(context.materialDigestContext || '').replace(/\[\[MATERIAL_DIGEST_(\d+)\]\]/gu, '[[KONU_KARTI_$1]]');
  return [
    'Görev: Aşağıdaki konu kartlarını ve temiz kaynak metnini kullanarak komite sınavına yönelik çalışılabilir bir ders anlatımı oluştur.',
    'Çıktı yalnızca geçerli JSON olsun. Markdown, açıklama, kod bloğu veya JSON dışı metin yazma.',
    'Yanıtı token-verimli ama yüzeysel olmayan bir düzeyde tut. Gereksiz ansiklopedi yazma; fakat dosyalardaki ana sınavlık bilgileri ezme.',
    'Konu dağılımına göre 4-6 ana bölüm üret. Farklı ana konuları sırf kısaltmak için aynı başlıkta birleştirme.',
    '',
    'Zorunlu JSON şekli:',
    '{"lesson":{"title":"","shortIntro":"","overview":"","learningObjectives":[],"sections":[{"heading":"","level":2,"subHeadings":[],"teachingText":"","mechanismFlow":[],"algorithmSteps":[],"tableInsights":[],"comparisonPoints":[],"visualNotes":[],"clinicalConnection":"","examAngle":"","commonTrap":"","keyBoxes":[]}],"highYieldPoints":[],"mustKnow":[],"finalReview":[],"commonConfusions":[],"mainConcepts":[],"clinicalExamRelevance":""}}',
    '',
    'Kapsam kuralları:',
    '- Her konu kartındaki konu adını ve mutlaka işlenecek bilgileri özellikle dikkate al.',
    '- Hiçbir ana konuyu sessizce yok sayma; her konuyu uygun ana bölüm veya alt başlık içinde öğretici biçimde işle.',
    '- Sadece gerçekten aynı konuya ait dosyaları birleştir; ilişkisiz dosyaları ayrı ana bölüm yap.',
    '- Kaynak metin kalitesi zayıfsa kesin olmayan ayrıntıyı uydurma; üretim veya kapsam raporu yazma.',
    '- Bir kaynak bölümünden yakalanan tek bilgiyi ait olmadığı bölüme taşıma; bağlamı belirsiz bilgiyi kesin hüküm gibi kullanma.',
    '- Konu adı boş veya placeholder olmasın; gerekirse kaynak başlığını doğal Türkçe konu adına dönüştür.',
    '',
    'Ders anlatımı kalite hedefi:',
    '- Ders anlatımı teknik girişle başlamasın. "Dosya bazlı çıkarıldı", "materyal temsil edildi", "aşağıda yapılandırıldı" veya üretim sürecini anlatan cümle yazma.',
    '- shortIntro ve bigPicture yalnızca konuya özgü öğrenme çerçevesi içersin; sistemin dosyaları nasıl işlediğini anlatmasın.',
    '- Her bölümde mümkünse büyük resim, temel kavram, sınıflama/mekanizma, klinik-pratik bağlantı, tanı/test/lab veya yönetim bilgisi ve sınav ayırt ettiricisi işlensin; materyalde yoksa uydurma.',
    '- Her ana section tek paragrafla geçiştirilmesin. Geniş bir konuysa teachingText en az birkaç açıklayıcı paragraf içersin; tanım, mekanizma, klinik/pratik yansıma ve sınav ayrımı arasında bağ kur.',
    '- subHeadings alanına yalnızca gerçek öğrenme alt başlıklarını yaz. "Akış", "Tablo", "Ayrım", "Şema", "Bilgi", "Özet", "Klinik", "Tedavi" gibi tek kelimelik bileşen adı yazma.',
    '- Geniş bir bölümde subHeadings, öğrencinin bölüm içinde hangi basamakları okuyacağını göstermeli: temel mantık, mekanizma, tanı/ayırıcı düşünme, yönetim veya sınav ayrımı gibi konuya özgü başlıklar.',
    '- classificationOrAlgorithm, diagnosticOrLabPoints, treatmentOrManagementPoints ve tablesAndVisualNotes alanları varsa bunları teachingText içinde ayrı küçük açıklama olarak derse dönüştür.',
    '- Metin olarak ayrıştırılmış tablo, algoritma veya şema/caption bilgisi sadece “var” diye geçilmesin; ne öğrettiği ve sınavda nasıl sorulabileceği açıklansın.',
    '- tableInsights, algorithmSteps, comparisonPoints, visualNotes ve keyBoxes alanlarını her bölümde zorunlu doldurma; yalnızca gerçekten öğrenme değeri varsa kullan.',
    '- tableInsights alanını yalnızca tablo/sınıflama/karşılaştırma varsa doldur; tablonun ana mesajını ve ayırt ettirdiği farkı açıkla.',
    '- algorithmSteps alanını yalnızca gerçek karar akışı, tanısal yaklaşım, tedavi basamağı veya patofizyolojik süreç varsa adım adım doldur; tek kelimelik keyword dizisi yazma.',
    '- comparisonPoints alanını yalnızca karıştırılabilecek iki veya daha fazla kavram varsa doldur; her maddede doğru ayrımı net yaz.',
    '- visualNotes alanını yalnızca metinleşmiş şema, algoritma veya caption notu varsa doldur; görüntünün kendisini yorumlama ve görünmeyen piksel içeriğini uydurma.',
    '- keyBoxes yalnızca gerçekten dolu ve anlamlıysa üret. Boş "Akılda tut", boş "Sınav notu" veya sadece başlık içeren kutu üretme.',
    '- Bölüm içi ayrı mini tekrar üretme; tekrar bilgilerini yalnızca finalReview, highYieldPoints ve mustKnow alanlarında tek merkezde topla.',
    '- highYieldPoints ana konulara göre yüksek verimli tekrar bilgisini, mustKnow son gün hatırlanacak çekirdek bilgiyi, finalReview ise kısa kontrol listesini taşısın; aynı cümleyi listelerde tekrarlama.',
    '- commonConfusions içindeki her madde "Karışan nokta: ... Doğru ayrım: ... Akılda kalacak mesaj: ..." yapısına yakın, akıcı tek metin olsun.',
    '- Öğrenme hedefleri başlıkların mekanik tekrarı olmasın; her hedef özgün, tamamlanmış, ölçülebilir ve akıcı Türkçe ile yazılsın.',
    '- Öğrenme hedeflerinde "... odağında klinik, mekanistik ve sınav bağlamıyla yorumlayabilmek" gibi yapay kalıp kullanma.',
    '- Ham slayt başlığı, dosya adı, öğretim üyesi adı, büyük harfli kaynak satırı veya bozuk OCR başlığını heading olarak kullanma; bunları doğal ders başlığına dönüştür.',
    '- Çıktıyı göndermeden önce yarım cümleleri, OCR kalıntılarını, placeholder ifadeleri, boş kutuları ve tekrar eden final maddelerini temizle.',
    '- commonTrap alanını yalnızca gerçekten sık karışan nokta varsa doldur; yoksa boş string bırak.',
    '- Kaynak işleme, kapsam raporu, dosya temsil raporu veya üretim raporu alanı yazma.',
    '',
    'Meta bilgi:',
    buildMetadataBlock(metadata),
    '',
    lessonDigestContext ? `Konu kartları:\n${lessonDigestContext}` : '',
    context.emphasisContext ? `Okunabilen vurgu/notlar:\n${context.emphasisContext}` : '',
    context.structureContext ? `Okunabilen tablo/algoritma/şema metinleri:\n${context.structureContext}` : '',
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
    'Soru seti dengeli olsun: temel kavram, mekanizma, klinik bağlantı, ayırıcı bilgi, metinleşmiş tablo/algoritma yorumu uygunsa, net komite bilgisi.',
    'Sorular belirsiz, aşırı zor veya tartışmalı olmasın. Seçenekler aynı düzlemde ve paralel olsun.',
    'Her yanlış seçenek için kısa ama seçenek-özel öğretici feedback yaz.',
    '',
    'Meta bilgi:',
    buildMetadataBlock(metadata),
    '',
    context.materialDigestContext ? `Dosya başına yoğun materyal özetleri:\n${context.materialDigestContext}` : '',
    lessonHint ? `Önceden oluşturulmuş ders anlatımı özeti:\n${lessonHint}` : '',
    context.emphasisContext ? `Okunabilen vurgu/notlar:\n${context.emphasisContext}` : '',
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
    '',
    `Seçilmiş temiz materyal metni:\n${context.sourceText}`,
  ].filter(Boolean).join('\n\n');
}

function buildLessonBatchPrompt({ metadata, context, batchIndex = 0, totalBatches = 1 }) {
  const lessonDigestContext = String(context.materialDigestContext || '').replace(/\[\[MATERIAL_DIGEST_(\d+)\]\]/gu, '[[KONU_KARTI_$1]]');
  return [
    `Görev: Komite ders anlatımının ${batchIndex + 1}/${totalBatches} numaralı materyal bölümünü üret.`,
    'Çıktı yalnızca geçerli JSON olsun. Markdown, açıklama veya kod bloğu yazma.',
    'Bu çağrı yalnızca aşağıdaki konu kartlarını anlatır; başka dosyaların konusunu uydurma.',
    '',
    'Zorunlu JSON şekli:',
    '{"lesson":{"sections":[{"heading":"","level":2,"subHeadings":[],"teachingText":"","mechanismFlow":[],"algorithmSteps":[],"tableInsights":[],"comparisonPoints":[],"visualNotes":[],"clinicalConnection":"","examAngle":"","commonTrap":"","keyBoxes":[]}],"highYieldPoints":[],"mustKnow":[],"finalReview":[],"commonConfusions":[]}}',
    '',
    'Kalite kuralları:',
    '- Teknik üretim raporu yazma. "Bu materyal temsil edildi", "dosya bazlı çıkarıldı", "aşağıda yapılandırıldı" gibi cümleler yasaktır.',
    '- Her dosyanın detectedTopic ve mustRepresent maddeleri anlatımda görünür biçimde temsil edilsin.',
    '- Tek materyalde birden fazla ana başlık varsa 2-4 ayrı section yaz; tek dosyayı yüzeysel tek paragrafta bırakma.',
    '- Farklı ana konuları aynı heading altında ezme; gerekirse aynı dosya için birden fazla section yaz.',
    '- Her section öğretici derinlik taşısın: teachingText genellikle 2-4 açıklayıcı paragraf düzeyinde olsun; yalnızca 2-3 cümlelik özetle yetinme.',
    '- Her section için subHeadings alanına 2-5 gerçek alt konu başlığı yaz; bunlar bölüm içi öğrenme basamakları olsun, bileşen/tag adı olmasın.',
    '- teachingText içinde subHeadings ile uyumlu akış kur: önce kavramı açıkla, sonra mekanizma veya sınıflamayı anlat, ardından klinik/tanı/yönetim ve sınav ayrımına bağla.',
    '- classificationOrAlgorithm, diagnosticOrLabPoints, treatmentOrManagementPoints ve tablesAndVisualNotes alanları varsa teachingText içinde açıkça derse dönüştür.',
    '- Tablo varsa karşılaştırma mantığını doğal bir cümleyle açıkla; algoritma varsa karar basamaklarını sırayla anlat; metinleşmiş şema/caption varsa yalnızca okunabilen mesajını işle.',
    '- tableInsights, algorithmSteps, comparisonPoints ve visualNotes alanlarını yalnızca gerçekten gerekli olduğunda doldur; her bölümde zorunlu bileşen üretme.',
    '- algorithmSteps tek kelimelik keyword dizisi olmasın; her adım ne olduğunu ve neden önemli olduğunu açıklasın.',
    '- comparisonPoints alanında sık karışan kavramları yan yana ayır; visualNotes alanında yalnızca metin olarak ayrıştırılmış şema/algoritma/caption mesajını yaz.',
    '- teachingText kuru özet olmasın: büyük resmi kur, kavramı açıkla, sınıflama/algoritma mantığını anlat, tanı-lab-yönetim bağlantısını materyalde varsa işle.',
    '- keyBoxes yalnızca gerçekten dolu ve anlamlıysa üret; etiketleri mümkünse "Kritik güvenlik", "Dikkat / sık hata", "Sınav ipucu" veya "Bilgi / bağlam" işlevlerinden biri olsun. Boş "Akılda tut" veya sadece başlık içeren kutu üretme.',
    '- Bölüm içinde ayrı mini tekrar üretme; tekrar ve sınav hazırlığını finalReview, highYieldPoints ve mustKnow alanlarında tek merkezde topla.',
    '- highYieldPoints sınavda ayırt ettiren bilgileri, mustKnow çekirdek hatırlatma bilgisini, finalReview kısa kontrol maddelerini taşısın; aynı cümleyi tekrar etme.',
    '- Çıktıyı göndermeden önce metin düzeyinde temizle: yarım cümleleri, bozuk OCR parçalarını, placeholder ifadeleri ve tekrar eden final maddelerini kaldır.',
    '- Öğrenme hedefi üretmen gerekirse başlığı tekrar eden kalıp cümle yazma; materyalin gerçek içeriğine dayanan tamamlanmış ve ölçülebilir hedef yaz.',
    '- Ham dosya adı, öğretim üyesi adı, sunum başlığı veya büyük harfli kaynak satırını heading olarak kullanma.',
    '- Kaynak işleme, kapsam raporu, dosya temsil raporu veya üretim raporu yazma.',
    '',
    'Meta bilgi:',
    buildMetadataBlock(metadata),
    '',
    lessonDigestContext ? `Konu kartları:\n${lessonDigestContext}` : '',
    context.emphasisContext ? `Okunabilen vurgu/notlar:\n${context.emphasisContext}` : '',
    context.structureContext ? `Okunabilen tablo/algoritma/şema metinleri:\n${context.structureContext}` : '',
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

function lessonCompareKey(value = '') {
  return cleanOutputText(value, { allowShort: true })
    .toLocaleLowerCase('tr')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function naturalizeRawLessonHeading(value = '', fallback = '') {
  const raw = cleanOutputText(value, { allowShort: true });
  const fallbackClean = cleanOutputText(fallback, { allowShort: true });
  if (!raw) return fallbackClean || '';
  const withoutPresenter = raw
    .replace(/\b(?:prof\.?|doç\.?|dr\.?|öğr\.?\s*gör\.?)\s+[A-ZÇĞİÖŞÜa-zçğıöşü .-]{2,80}$/u, '')
    .replace(/\b\S+\.(?:pdf|pptx|ppt|docx|txt)\b/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
  const sourceLike = RAW_SOURCE_LINE_PATTERN.test(raw) || /[/|_]{1,}/u.test(raw);
  if (!sourceLike && !GENERIC_HEADING_PATTERN.test(withoutPresenter) && !TECHNICAL_LESSON_NOTE_PATTERN.test(withoutPresenter)) return withoutPresenter;
  const parts = withoutPresenter
    .split(/\s*(?:\/|\||-|–|—|:)\s*/u)
    .map((part) => cleanOutputText(part, { allowShort: true }))
    .filter((part) => part && !/^(?:sunum|lecture|slide|slayt|başlık|title)$/iu.test(part))
    .slice(0, 3);
  const joined = parts.join(' ');
  const normalized = joined
    .replace(/\bPHYSIOPATHOLOGY\b/giu, 'Patofizyoloji')
    .replace(/\bPATHOPHYSIOLOGY\b/giu, 'Patofizyoloji')
    .replace(/\bTREATMENT\b/giu, 'Tedavi yaklaşımı')
    .replace(/\bMANAGEMENT\b/giu, 'Yönetim yaklaşımı')
    .replace(/\bDIAGNOSIS\b/giu, 'Tanı yaklaşımı')
    .replace(/\bCLASSIFICATION\b/giu, 'Sınıflama mantığı')
    .replace(/\bCRITERIA\b/giu, 'Tanı ölçütleri')
    .replace(/\bSIGNS?\s+AND\s+SYMPTOMS\b/giu, 'Klinik bulgular')
    .replace(/\bTYPE\b/giu, 'Tip')
    .replace(/\bDM\b/gu, 'DM')
    .replace(/\s+/g, ' ')
    .trim();
  if (!normalized || GENERIC_HEADING_PATTERN.test(normalized) || TECHNICAL_LESSON_NOTE_PATTERN.test(normalized)) return fallbackClean || '';
  if (/^[A-ZÇĞİÖŞÜ0-9\s/():,._-]{10,}$/u.test(normalized)) {
    return normalized.toLocaleLowerCase('tr').replace(/(^|\s)(\p{L})/gu, (_, space, letter) => `${space}${letter.toLocaleUpperCase('tr')}`);
  }
  return normalized;
}

function isUsefulProcessStep(item = '') {
  const text = cleanOutputText(item);
  if (!text || GENERIC_SUBHEADING_PATTERN.test(text)) return false;
  const wordCount = text.split(/\s+/u).length;
  if (wordCount < 7) return false;
  return /(?:çünkü|bu nedenle|sonuçta|böylece|ardından|sonrasında|neden|yol aç|geliş|oluş|artar|azalır|yansır|klinik|laboratuvar|tanı|tedavi|yönetim|karar|mekanizma|bulgu|risk|komplikasyon|→|>)/iu.test(text);
}

function normalizeProcessList(value = [], maxItems = 6) {
  return normalizeOutputList(value, maxItems).filter(isUsefulProcessStep);
}

function lessonFromParsedPayload(parsed = {}) {
  if (parsed?.lesson && typeof parsed.lesson === 'object') return parsed.lesson;
  if (parsed?.data && typeof parsed.data === 'object') return parsed.data;
  if (parsed?.result && typeof parsed.result === 'object') return parsed.result;
  return parsed && typeof parsed === 'object' ? parsed : {};
}

function normalizeGeneratedSection(section = {}, fallbackIndex = 0) {
  const rawHeading = naturalizeRawLessonHeading(section.heading || section.title, '');
  const heading = rawHeading && !GENERIC_HEADING_PATTERN.test(rawHeading)
    ? rawHeading
    : `Komite konusu ${fallbackIndex + 1}`;
  const teachingText = cleanOutputText(section.teachingText || section.content || section.summary || section.coreExplanation);
  if (!teachingText) return null;
  return {
    heading,
    level: Number(section.level) || 2,
    subHeadings: normalizeOutputList(section.subHeadings || section.subtopics || section.learningSubtopics || section.outline, 5)
      .filter((item) => !GENERIC_SUBHEADING_PATTERN.test(item))
      .filter((item) => !GENERIC_HEADING_PATTERN.test(item)),
    teachingText,
    content: teachingText,
    mechanismFlow: normalizeProcessList(section.mechanismFlow, 5),
    algorithmSteps: normalizeProcessList(section.algorithmSteps || section.algorithmFlow || section.decisionSteps || section.decisionFlow, 7),
    tableInsights: normalizeOutputList(section.tableInsights || section.tableNotes || section.tablesAndVisualNotes || section.classificationTable, 5),
    comparisonPoints: normalizeOutputList(section.comparisonPoints || section.comparisons || section.differentials || section.commonConfusions, 5),
    visualNotes: normalizeOutputList(section.visualNotes || section.schemaNotes, 4),
    miniReview: [],
    clinicalConnection: cleanOutputText(section.clinicalConnection || section.clinicalOrPracticalConnection),
    examAngle: cleanOutputText(section.examAngle || section.examFocus || section.examConnection),
    commonTrap: cleanOutputText(section.commonTrap || section.commonConfusions),
    keyBoxes: Array.isArray(section.keyBoxes)
      ? section.keyBoxes
        .map((box) => ({ label: cleanOutputText(box?.label || box?.title, { allowShort: true }), text: cleanOutputText(box?.text || box?.content || box?.body) }))
        .filter((box, index, all) => {
          if (box.text.length < 18 || box.text.split(/\s+/u).length < 4) return false;
          if (/kritik güvenlik/iu.test(box.label) && !/\b(?:acil|hayati|kontrendike|risk|şok|kanama|hava yolu|resüsitasyon|mortalite|toksisite|doz|hasta güvenliği|öncelik)\b/iu.test(box.text)) return false;
          return all.findIndex((candidate) => candidate.text === box.text) === index;
        })
        .slice(0, 2)
      : [],
  };
}

function buildServerLearningObjective(section = {}) {
  const heading = cleanOutputText(section.heading, { allowShort: true }) || 'Bu konu';
  const subtopics = Array.isArray(section.subHeadings)
    ? section.subHeadings.slice(0, 2).map((item) => cleanOutputText(item, { allowShort: true })).filter(Boolean).join(' ve ')
    : '';
  if (subtopics) {
    return `${heading} bölümünde ${subtopics} başlıklarının aynı klinik veya mekanistik çerçevede nasıl bağlandığını açıklayabilmek.`;
  }
  if (section.algorithmSteps?.length || section.mechanismFlow?.length) {
    return `${heading} mekanizmasının bulgu, laboratuvar sonucu, tanı basamağı veya yönetim kararına nasıl yansıdığını neden-sonuç ilişkisiyle kurabilmek.`;
  }
  if (section.comparisonPoints?.length || section.commonTrap) {
    return `${heading} ile karışabilecek durumları ayırt ettiren klinik, laboratuvar veya kavramsal ipuçlarını kullanabilmek.`;
  }
  if (section.clinicalConnection || section.examAngle) {
    return `${heading} bilgisini vaka kurgusunda tanı, ayırıcı tanı, yönetim veya sınav sorusu mantığına bağlayabilmek.`;
  }
  return `${heading} konusunun temel kavramlarını ve sınavda ayırt ettiren bağlantılarını gerekçesiyle açıklayabilmek.`;
}

function isUsableLearningObjective(item = '') {
  const text = cleanOutputText(item);
  if (!text || text.split(/\s+/u).length < 5) return false;
  if (BAD_OBJECTIVE_PATTERN.test(text) || TECHNICAL_LESSON_NOTE_PATTERN.test(text) || RAW_SOURCE_LINE_PATTERN.test(text)) return false;
  return !/[,:;(-]\s*$/u.test(text);
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
  const schemaNotes = Array.isArray(digest?.tablesAndVisualNotes) ? digest.tablesAndVisualNotes : [];
  const highYield = Array.isArray(digest?.highYieldExamPoints) ? digest.highYieldExamPoints : [];
  const partial = stripJsonNoise(partialText).slice(0, 1800);
  const teachingParts = [
    `${topic} başlığında önce temel kavramlar kurulur; ardından sınıflama, tanı, yönetim ve sınav ayırt ettiricileri neden-sonuç ilişkisiyle öğrenme sırasına yerleştirilir.`,
    coreDefinitions.length ? `Temel kavramlar: ${coreDefinitions.slice(0, 3).join(' ')}` : '',
    classifications.length ? `Sınıflama/algoritma mantığı: ${classifications.slice(0, 3).join(' ')}` : '',
    diagnostics.length ? `Tanı-test-laboratuvar bağlantısı: ${diagnostics.slice(0, 3).join(' ')}` : '',
    treatments.length ? `Tedavi/yönetim bağlantısı: ${treatments.slice(0, 3).join(' ')}` : '',
    schemaNotes.length ? `Okunabilen sınıflama, tablo veya algoritma bilgisi: ${schemaNotes.slice(0, 2).join(' ')}` : '',
    partial ? partial : '',
    mustRepresent.length ? `Öğrencinin bu bölümden özellikle çıkarması gereken noktalar: ${mustRepresent.slice(0, 5).join(' ')}` : '',
  ].filter(Boolean);

  return {
    lesson: {
      sections: [{
        heading: topic,
        level: 2,
        subHeadings: dedupeStrings([
          coreDefinitions.length ? 'Temel kavram ve ana çerçeve' : '',
          classifications.length ? 'Mekanizma, sınıflama veya süreç mantığı' : '',
          diagnostics.length ? 'Tanı ve ayırıcı düşünme' : '',
          treatments.length ? 'Yönetim veya yaklaşım bağlantısı' : '',
          highYield.length ? 'Sınavda ayırt ettiren bilgi' : '',
        ], 5),
        teachingText: teachingParts.join(' '),
        mechanismFlow: normalizeProcessList(classifications, 4),
        algorithmSteps: normalizeProcessList([...classifications, ...diagnostics, ...treatments], 6),
        tableInsights: dedupeStrings(schemaNotes, 4),
        comparisonPoints: dedupeStrings(digest?.commonConfusions || [], 4),
        visualNotes: dedupeStrings(schemaNotes, 4),
        miniReview: [],
        clinicalConnection: compactLine(diagnostics[0] || treatments[0] || ''),
        examAngle: compactLine(highYield[0] || mustRepresent[0] || ''),
        commonTrap: compactLine(digest?.commonConfusions?.[0] || ''),
        keyBoxes: highYield[0] ? [{ label: 'Sınavda ayırt ettiren nokta', text: highYield[0] }] : [],
      }],
      highYieldPoints: dedupeStrings(highYield.length ? highYield : mustRepresent, 8),
      mustKnow: dedupeStrings(mustRepresent, 8),
      finalReview: dedupeStrings([topic, ...mustRepresent.slice(0, 4)], 6),
      commonConfusions: dedupeStrings(digest?.commonConfusions || [], 4),
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
  const commonConfusions = [];

  fragments.forEach((fragment) => {
    const lesson = lessonFromParsedPayload(fragment);
    (Array.isArray(lesson.sections) ? lesson.sections : []).forEach((section) => {
      const normalized = normalizeGeneratedSection(section, sections.length);
      if (normalized) sections.push(normalized);
    });
    highYieldPoints.push(...(Array.isArray(lesson.highYieldPoints) ? lesson.highYieldPoints : []));
    mustKnow.push(...(Array.isArray(lesson.mustKnow) ? lesson.mustKnow : []));
    finalReview.push(...(Array.isArray(lesson.finalReview) ? lesson.finalReview : []));
    commonConfusions.push(...(Array.isArray(lesson.commonConfusions) ? lesson.commonConfusions : []));
  });

  const courseTitle = compactLine(metadata.course || metadata.committee || 'Komite ders anlatımı');
  const objectiveCandidates = sections.map(buildServerLearningObjective).filter(isUsableLearningObjective);
  const learningObjectives = dedupeStrings(objectiveCandidates, 5);
  const highYieldClean = dedupeStrings(highYieldPoints, 18);
  const mustKnowClean = dedupeStrings(mustKnow, 14).filter((item) => !new Set(highYieldClean.map((point) => point.toLocaleLowerCase('tr'))).has(item.toLocaleLowerCase('tr')));
  const reviewExclude = new Set([...highYieldClean, ...mustKnowClean].map((item) => item.toLocaleLowerCase('tr')));
  const finalReviewClean = dedupeStrings(finalReview, 14).filter((item) => !reviewExclude.has(item.toLocaleLowerCase('tr')));
  return {
    lesson: {
      title: courseTitle,
      inferredTitle: courseTitle,
      shortIntro: '',
      overview: '',
      bigPicture: '',
      learningObjectives,
      sections,
      highYieldPoints: highYieldClean,
      mustKnow: mustKnowClean,
      finalReview: finalReviewClean,
      commonConfusions: dedupeStrings([...commonConfusions, ...sections.map((section) => section.commonTrap)], 10),
      mainConcepts: dedupeStrings(allDigests.map((digest) => digest.detectedTopic || digest.detectedMainTopic), 12),
      clinicalExamRelevance: '',
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
