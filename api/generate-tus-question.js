const BRANCH_OPTIONS = [
  'Çocuk Sağlığı ve Hastalıkları',
  'Kadın Hastalıkları ve Doğum',
  'İç Hastalıkları',
  'Genel Cerrahi',
  'Tıbbi Mikrobiyoloji',
  'Tıbbi Farmakoloji',
  'Tıbbi Biyokimya',
  'Tıbbi Patoloji',
  'Fizyoloji',
  'Anatomi',
  'Histoloji ve Embriyoloji',
  'Küçük Stajlar',
];

const DIFFICULTY_OPTIONS = ['Kolay', 'Orta', 'Zor'];
const ERROR_MESSAGE = 'Soru üretimi şu anda tamamlanamadı. Lütfen tekrar deneyin.';
const DEFAULT_MODEL = 'gpt-5.4-nano';
const DEFAULT_BATCH_SIZE = 4;
const MAX_BATCH_SIZE = 5;
const OPTION_MATCH_MIN_SCORE = 0.72;
const OPTION_MATCH_MIN_MARGIN = 0.14;
const QUESTION_POOL = new Map();

const TUS_EDITOR_SYSTEM_PROMPT = [
  'Sen TUS (Tıpta Uzmanlık Sınavı) kalitesinde, bilimsel doğruluğu ve öğreticiliği yüksek, öğretici ve anlaşılır Türkçe tıp soruları yazan kıdemli bir medikal eğitim editörüsün. Sadece geçerli JSON döndür.',
  'Hedef: seçilen branş ve zorluğa uygun olan ve doğru cevabı kökteki bulgularla bilimsel biçimde desteklenen, sade ve öğretici TUS kalitesinde özgün soru üretmek.',
  'stem kullanıcıya görünen tek vaka metnidir; doğal klinik paragraf gibi ilerlesin (anemnaz/öykü/hikayeleştirme önemli) ve sonda tek soru cümlesi olsun. prompt yalnızca o son soru cümlesidir.',
  'Soru tipi ile seçenek düzlemi aynı kalmalı, seçenekler çeldirici ve bilimsel bir mantığa sahip olmalı: tanıysa tanılar, etkense etkenler, komplikasyonsa komplikasyonlar, mekanizmaysa mekanizmalar, tedaviyse tedaviler, anatomik yapıysa aynı düzeyde anatomik yapılardan oluşmalıdır.',
  'Doğru cevap soru metninde verilen yaş, bağlam, muayene, laboratuvar, görüntüleme, mikrobiyoloji, risk faktörü veya mekanizma verilerinin birlikte yorumuyla seçilmeli.',
  'Ortak bulgular tek başına yetmez; ateş, halsizlik, karın ağrısı, inflamasyon yüksekliği, lenfadenopati veya kilo kaybı kullanılıyorsa bunları benzer seçeneklerden ayıran seçici bilimsel ve gerçekci veriyle destekle.',
  'Tıbbi terminoloji temiz ve anlaşılır olsun: BT, MRG, USG, patoloji, mikrobiyoloji, anatomi ve embriyoloji terimlerini modaliteye ve alana uygun kullan.',
  'Çeldiriciler gerçek klinikte karşılığı olan, sınav seçeneği gibi doğal ve elenebilir seçenekler olsun. Eş anlamlı, terminolojik varyant veya sadece kelime tercihiyle ayrılan seçenekleri birlikte kullanma.',
  'Metinler gerekçeli, öğretici ve bilimsel olsun.',
  'explanation doğru cevabı kökteki bulgulara doğrudan bağlasın ve güzelce açıklasın. scientificBasis sorunun kararını açıklayan biyolojik/klinik mekanizmayı versin; explanation veya optionFeedback kopyası olmasın.',
  'optionFeedback en öğretici alandır. Doğru seçenek feedbacki veri kombinasyonunu ve karar noktasını söylesin. Yanlış seçenek feedbacki seçenek-özel, detaylı, öğreticiliği yüksek, bilimsel ve gerçek tıbbi gerekçe içersin: hangi durumda doğru olurdu, bu kökte hangi kritik veri eksik veya ters?',
  'Kesinlik dilini dengeli kullan; asla/her zaman/olmaz/görülmez/kesin dışlanır gibi ifadeleri yalnız gerçekten mutlaksa yaz.',
  'JSON oluşturmadan önce sessizce denetle: doğru cevap kökteki tüm bulgularla gerçekten destekleniyor mu, kökte doğru cevabı zayıflatan veya başka cevabı daha güçlü yapan veri var mı, birden fazla savunulabilir doğru cevap oluşuyor mu, mekanizma klasik ve güvenilir mi, bilimsel bilgiler kendi içinde uyumlu mu, feedbackler seçenek özelinde gerçek tıbbi gerekçe veriyor mu? Sorun varsa kök, seçenek ve feedbackleri birlikte yeniden kur.',
].join('\n');

const TUS_QUESTION_RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['questions'],
  properties: {
    questions: {
      type: 'array',
      minItems: 1,
      maxItems: MAX_BATCH_SIZE,
      items: {
        type: 'object',
        additionalProperties: false,
        required: [
          'branch',
          'difficulty',
          'questionType',
          'stem',
          'prompt',
          'options',
          'correctAnswer',
          'explanation',
          'optionFeedback',
          'tusTip',
          'scientificBasis',
        ],
        properties: {
          branch: { type: 'string' },
          difficulty: { type: 'string' },
          questionType: { type: 'string' },
          stem: { type: 'string' },
          prompt: { type: 'string' },
          options: {
            type: 'array',
            minItems: 5,
            maxItems: 5,
            items: { type: 'string' },
          },
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
          tusTip: { type: 'string' },
          scientificBasis: { type: 'string' },
        },
      },
    },
  },
};

function normalizeText(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeForCompare(value = '') {
  return normalizeText(value)
    .toLocaleLowerCase('tr')
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^a-z0-9+\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripOptionMarker(value = '') {
  return normalizeText(value).replace(/^[A-Ea-e][\s).:;-]+/u, '').trim();
}

function tokenize(value = '') {
  const stopWords = new Set(['olan', 'icin', 'veya', 'daha', 'gore', 'hangi', 'hangisi', 'nedir', 'degildir', 'bir', 'bu']);
  return normalizeForCompare(value)
    .split(/\s+/u)
    .filter((word) => word.length > 3 && !stopWords.has(word));
}

function textSimilarity(left = '', right = '') {
  const leftTokens = new Set(tokenize(left));
  const rightTokens = new Set(tokenize(right));
  if (!leftTokens.size || !rightTokens.size) return 0;
  let overlap = 0;
  leftTokens.forEach((word) => {
    if (rightTokens.has(word)) overlap += 1;
  });
  return overlap / Math.min(leftTokens.size, rightTokens.size);
}

function scoreOptionMatch(option = '', candidate = '') {
  const cleanOption = stripOptionMarker(option);
  const cleanCandidate = stripOptionMarker(candidate);
  const normalizedOption = normalizeForCompare(cleanOption);
  const normalizedCandidate = normalizeForCompare(cleanCandidate);
  if (!normalizedOption || !normalizedCandidate) return 0;
  if (normalizedOption === normalizedCandidate) return 1;
  if (normalizedOption.includes(normalizedCandidate) || normalizedCandidate.includes(normalizedOption)) {
    return Math.min(normalizedOption.length, normalizedCandidate.length) / Math.max(normalizedOption.length, normalizedCandidate.length);
  }
  return textSimilarity(cleanOption, cleanCandidate);
}

function findMatchingOption(options = [], candidate = '') {
  const ranked = options
    .map((option) => ({ option, score: scoreOptionMatch(option, candidate) }))
    .sort((left, right) => right.score - left.score);
  const best = ranked[0];
  const runnerUp = ranked[1];
  if (!best) return '';
  if (best.score >= 0.96) return best.option;
  if (best.score >= OPTION_MATCH_MIN_SCORE && best.score - (runnerUp?.score || 0) >= OPTION_MATCH_MIN_MARGIN) {
    return best.option;
  }
  return '';
}

function countQuestionMarks(value = '') {
  return (String(value || '').match(/\?/g) || []).length;
}

function stemAlreadyHasPrompt(stem = '', prompt = '') {
  const normalizedStem = normalizeForCompare(stem);
  const normalizedPrompt = normalizeForCompare(prompt);
  if (!normalizedStem || !normalizedPrompt) return false;
  return normalizedStem.includes(normalizedPrompt) || textSimilarity(stem, prompt) > 0.82;
}

function buildVisibleStem(stem = '', prompt = '') {
  const cleanStem = normalizeText(stem);
  const cleanPrompt = normalizeText(prompt);
  if (!cleanPrompt || stemAlreadyHasPrompt(cleanStem, cleanPrompt) || countQuestionMarks(cleanStem) > 0) {
    return cleanStem;
  }
  return normalizeText(`${cleanStem} ${cleanPrompt}`);
}

function normalizeDifficulty(value = 'Orta') {
  return DIFFICULTY_OPTIONS.includes(value) ? value : 'Orta';
}

function resolveBranch(value = 'Rastgele') {
  const normalized = normalizeText(value);
  if (!normalized || normalized === 'Rastgele' || normalized === 'random') {
    return BRANCH_OPTIONS[Math.floor(Math.random() * BRANCH_OPTIONS.length)];
  }
  return BRANCH_OPTIONS.includes(normalized) ? normalized : BRANCH_OPTIONS[Math.floor(Math.random() * BRANCH_OPTIONS.length)];
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

function readFeedbackText(value) {
  if (typeof value === 'string') return normalizeText(value);
  return normalizeText(value?.explanation || value?.text || value?.summary || '');
}

function getFeedbackValue(rawFeedback, option, index) {
  if (Array.isArray(rawFeedback)) return rawFeedback[index];
  if (!rawFeedback || typeof rawFeedback !== 'object') return '';
  const letter = String.fromCharCode(65 + index);
  const direct = rawFeedback[option]
    || rawFeedback[stripOptionMarker(option)]
    || rawFeedback[letter]
    || rawFeedback[letter.toLowerCase()];
  if (direct) return direct;

  const normalizedOption = normalizeForCompare(stripOptionMarker(option));
  const matchingKey = Object.keys(rawFeedback).find((key) => normalizeForCompare(stripOptionMarker(key)) === normalizedOption);
  return matchingKey ? rawFeedback[matchingKey] : '';
}

function normalizeOptionFeedback(rawFeedback, options) {
  return options.reduce((feedback, option, index) => {
    feedback[option] = readFeedbackText(getFeedbackValue(rawFeedback, option, index));
    return feedback;
  }, {});
}

function shuffleItems(items = []) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

function distributeCorrectAnswer(options, correctAnswer, optionFeedback) {
  const correctOption = options.find((option) => option === correctAnswer);
  if (!correctOption) {
    return {
      orderedOptions: options,
      orderedFeedback: options.reduce((feedback, option) => {
        feedback[option] = optionFeedback[option];
        return feedback;
      }, {}),
    };
  }
  const distractors = shuffleItems(options.filter((option) => option !== correctAnswer));
  const correctIndex = Math.floor(Math.random() * options.length);
  const orderedOptions = Array.from({ length: options.length }, (_, index) => {
    if (index === correctIndex) return correctOption;
    return distractors.shift();
  });
  const orderedFeedback = orderedOptions.reduce((feedback, option) => {
    feedback[option] = optionFeedback[option];
    return feedback;
  }, {});
  return { orderedOptions, orderedFeedback };
}

function normalizeGeneratedQuestion(rawQuestion, branch, difficulty) {
  const question = rawQuestion?.question && typeof rawQuestion.question === 'object' ? rawQuestion.question : rawQuestion;
  const options = Array.isArray(question?.options)
    ? question.options.map((option) => normalizeText(typeof option === 'string' ? option : option?.text)).filter(Boolean)
    : [];
  const uniqueOptions = Array.from(new Set(options));
  const correctAnswerRaw = normalizeText(question?.correctAnswer || question?.correct || question?.answer);
  const letterMatch = correctAnswerRaw.match(/^[A-E]$/iu);
  const correctAnswer = letterMatch ? uniqueOptions[correctAnswerRaw.toLocaleUpperCase('tr').charCodeAt(0) - 65] : correctAnswerRaw;
  const exactCorrectAnswer = findMatchingOption(uniqueOptions, correctAnswer);
  const rawStem = normalizeText(question?.stem || question?.narrativeStem || question?.case || question?.context);
  const prompt = normalizeText(question?.prompt || question?.questionText || question?.questionStem);
  const stem = buildVisibleStem(rawStem, prompt);
  const explanation = normalizeText(question?.explanation || question?.mainExplanation || question?.rationale);
  const optionFeedback = normalizeOptionFeedback(
    question?.optionFeedback || question?.feedback || question?.optionExplanations,
    uniqueOptions,
  );

  if (uniqueOptions.length !== 5 || !exactCorrectAnswer || !stem || !prompt || !explanation) {
    throw new Error('AI response failed validation.');
  }
  if (uniqueOptions.some((option) => !optionFeedback[option])) {
    throw new Error('AI response has missing option feedback.');
  }

  const { orderedOptions, orderedFeedback } = distributeCorrectAnswer(uniqueOptions, exactCorrectAnswer, optionFeedback);

  return {
    branch,
    difficulty,
    questionType: normalizeText(question?.questionType || question?.type || 'TUS sorusu'),
    stem,
    prompt,
    options: orderedOptions,
    correctAnswer: exactCorrectAnswer,
    explanation,
    optionFeedback: orderedFeedback,
    tusTip: normalizeText(question?.tusTip || question?.examTip || question?.tip),
    scientificBasis: normalizeText(question?.scientificBasis || question?.evidence || question?.sourceLogic),
  };
}

function normalizeGeneratedQuestions(rawQuestion, branch, difficulty) {
  const source = rawQuestion?.questions || rawQuestion?.items || rawQuestion?.questionBatch;
  const rawQuestions = Array.isArray(source) ? source : [rawQuestion?.question || rawQuestion];
  const normalizedQuestions = [];

  rawQuestions.forEach((item) => {
    try {
      normalizedQuestions.push(normalizeGeneratedQuestion(item, branch, difficulty));
    } catch (error) {
      if (rawQuestions.length === 1) throw error;
    }
  });

  if (!normalizedQuestions.length) {
    throw new Error('AI response did not contain a valid question.');
  }

  return normalizedQuestions;
}

function parseBoundedInteger(value, defaultValue, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return defaultValue;
  return Math.min(max, Math.max(min, parsed));
}

function getQuestionBatchSize() {
  return parseBoundedInteger(process.env.OPENAI_QUESTION_BATCH_SIZE, DEFAULT_BATCH_SIZE, 1, MAX_BATCH_SIZE);
}

function getMaxTokens(questionCount) {
  const defaultValue = Math.min(10000, Math.max(1800, questionCount * 1800));
  return parseBoundedInteger(process.env.OPENAI_MAX_TOKENS, defaultValue, 1200, 12000);
}

function getTemperature() {
  const parsed = Number.parseFloat(process.env.OPENAI_TEMPERATURE);
  if (!Number.isFinite(parsed)) return 0.45;
  return Math.min(1, Math.max(0.1, parsed));
}

function getResponseFormat() {
  if (process.env.OPENAI_RESPONSE_FORMAT === 'json_object') {
    return { type: 'json_object' };
  }
  return {
    type: 'json_schema',
    json_schema: {
      name: 'tus_question_batch',
      strict: true,
      schema: TUS_QUESTION_RESPONSE_SCHEMA,
    },
  };
}

function getPoolKey({ model, branch, difficulty }) {
  return `${model}::${branch}::${difficulty}`;
}

function takePooledQuestion(poolKey) {
  const pooledQuestions = QUESTION_POOL.get(poolKey);
  if (!pooledQuestions?.length) return null;
  const question = pooledQuestions.shift();
  if (!pooledQuestions.length) QUESTION_POOL.delete(poolKey);
  return question;
}

function storePooledQuestions(poolKey, questions = []) {
  if (!questions.length) return;
  const existing = QUESTION_POOL.get(poolKey) || [];
  QUESTION_POOL.set(poolKey, existing.concat(questions).slice(0, MAX_BATCH_SIZE * 2));
}

function buildPrompt({ branch, difficulty, questionCount }) {
  return [
    `Branş: ${branch}`,
    `Zorluk: ${difficulty}`,
    `Soru sayısı: ${questionCount}`,
    'Aynı JSON içinde questions dizisi döndür. Her question nesnesinde branch, difficulty, questionType, stem, prompt, options, correctAnswer, explanation, optionFeedback, tusTip ve scientificBasis alanları dolu olsun.',
    'options dizisindeki metinlerin başına A), B) gibi seçenek harfi ekleme.',
    'optionFeedback anahtarları A, B, C, D, E olsun ve A=options[0], B=options[1], C=options[2], D=options[3], E=options[4] sırasıyla eşleşsin.',
    'correctAnswer, options dizisindeki doğru seçenek metninin bire bir aynısı olsun; harf (A-E), seçenek ön eki veya benzer/parafraz metin yazma.',
  ].join('\n');
}

function buildMessages({ branch, difficulty, questionCount }) {
  return [
    {
      role: 'system',
      content: TUS_EDITOR_SYSTEM_PROMPT,
    },
    {
      role: 'user',
      content: buildPrompt({ branch, difficulty, questionCount }),
    },
  ];
}

function buildOpenAiPayload({ model, messages, questionCount, responseFormat, includeOptionalFields = true }) {
  const requestPayload = {
    model,
    max_completion_tokens: getMaxTokens(questionCount),
    messages,
  };
  if (includeOptionalFields) {
    requestPayload.temperature = getTemperature();
  }
  if (responseFormat) {
    requestPayload.response_format = responseFormat;
  }
  if (includeOptionalFields) {
    requestPayload.prompt_cache_key = process.env.OPENAI_PROMPT_CACHE_KEY || 'klinikiq-tus-question-v3';
    if (process.env.OPENAI_PROMPT_CACHE_RETENTION) {
      requestPayload.prompt_cache_retention = process.env.OPENAI_PROMPT_CACHE_RETENTION;
    }
    if (process.env.OPENAI_SERVICE_TIER) {
      requestPayload.service_tier = process.env.OPENAI_SERVICE_TIER;
    }
  }
  return requestPayload;
}

async function postOpenAiCompletion({ apiKey, requestPayload }) {
  const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload),
  });

  const responseText = await aiResponse.text();
  let payload = null;
  try {
    payload = responseText ? JSON.parse(responseText) : null;
  } catch {
    payload = null;
  }

  if (!aiResponse.ok) {
    const detail = payload?.error?.message || responseText || `HTTP ${aiResponse.status}`;
    const error = new Error(`OpenAI request failed: ${aiResponse.status} ${detail}`);
    error.status = aiResponse.status;
    throw error;
  }

  const choice = payload?.choices?.[0];
  if (choice?.finish_reason === 'length') {
    const error = new Error('OpenAI response was truncated.');
    error.retryWithSingleQuestion = true;
    throw error;
  }

  const content = choice?.message?.content;
  if (!normalizeText(content)) {
    throw new Error('OpenAI response did not include content.');
  }
  return content;
}

async function requestAiQuestions({ apiKey, model, branch, difficulty, questionCount }) {
  const messages = buildMessages({ branch, difficulty, questionCount });
  const responseFormat = getResponseFormat();
  const attempts = [
    { responseFormat, includeOptionalFields: true },
    { responseFormat, includeOptionalFields: false },
  ];
  if (responseFormat?.type !== 'json_object') {
    attempts.push({ responseFormat: { type: 'json_object' }, includeOptionalFields: false });
  }
  attempts.push({ responseFormat: null, includeOptionalFields: false });

  let lastError = null;
  for (let index = 0; index < attempts.length; index += 1) {
    const attempt = attempts[index];
    const requestPayload = buildOpenAiPayload({
      model,
      messages,
      questionCount,
      responseFormat: attempt.responseFormat,
      includeOptionalFields: attempt.includeOptionalFields,
    });

    try {
      return await postOpenAiCompletion({ apiKey, requestPayload });
    } catch (error) {
      lastError = error;
      const canRetryCompatibility = error?.status === 400 && index < attempts.length - 1;
      if (!canRetryCompatibility) throw error;
    }
  }
  throw lastError || new Error('OpenAI request failed.');
}

function parseAndNormalizeQuestions(content, branch, difficulty) {
  const parsed = parseJsonObject(content);
  return normalizeGeneratedQuestions(parsed, branch, difficulty);
}

function shouldRetryAsSingleQuestion(error, questionCount) {
  if (questionCount <= 1) return false;
  if (error?.retryWithSingleQuestion) return true;
  if (error?.status && error.status !== 400) return false;
  return /JSON|validation|feedback|valid question|content/i.test(error?.message || '');
}

async function generateNormalizedQuestions({ apiKey, model, branch, difficulty, questionCount }) {
  try {
    const content = await requestAiQuestions({
      apiKey,
      model,
      branch,
      difficulty,
      questionCount,
    });
    return parseAndNormalizeQuestions(content, branch, difficulty);
  } catch (error) {
    if (!shouldRetryAsSingleQuestion(error, questionCount)) throw error;
    console.warn('[generate-tus-question] Batch generation failed; retrying a single question.', error);
    const content = await requestAiQuestions({
      apiKey,
      model,
      branch,
      difficulty,
      questionCount: 1,
    });
    return parseAndNormalizeQuestions(content, branch, difficulty);
  }
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
    const selectedBranch = resolveBranch(requestBody?.branch);
    const selectedDifficulty = normalizeDifficulty(requestBody?.difficulty);
    const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
    const poolKey = getPoolKey({ model, branch: selectedBranch, difficulty: selectedDifficulty });
    const pooledQuestion = takePooledQuestion(poolKey);
    if (pooledQuestion) {
      return res.status(200).json({ question: pooledQuestion });
    }

    const questionCount = getQuestionBatchSize();
    const questions = await generateNormalizedQuestions({
      apiKey,
      model,
      branch: selectedBranch,
      difficulty: selectedDifficulty,
      questionCount,
    });
    const [question, ...remainingQuestions] = questions;
    storePooledQuestions(poolKey, remainingQuestions);

    return res.status(200).json({ question });
  } catch (error) {
    console.error('[generate-tus-question]', error);
    return res.status(500).json({ error: ERROR_MESSAGE });
  }
}
