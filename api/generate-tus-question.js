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
const DEFAULT_BATCH_SIZE = 2;
const MAX_BATCH_SIZE = 4;
const QUESTION_POOL = new Map();

const TUS_EDITOR_SYSTEM_PROMPT = [
  'Sen bilimsel doğruluğu yüksek, klasik TUS mantığında, öğretici ve anlaşılır Türkçe tıp soruları yazan kıdemli bir medikal eğitim editörüsün. Sadece geçerli JSON döndür.',
  'Hedef: seçilen branş ve zorlukta kısa, tutarlı, tek doğru cevabı net ve açıklaması öğretici bir soru üretmek. Karmaşıklık kalite göstergesi değildir; netlik, doğruluk ve öğreticilik önceliklidir.',
  'Önce tek öğrenme hedefini ve doğru cevabı belirle; sonra yalnız bu hedefi güvenle destekleyen en az gerekli veriyi köke ekle. Veriyi sonradan doğru cevaba uydurma.',
  'Her soru tek bir ana beceriyi sınasın. Aynı soruda tanı, mekanizma, tedavi, evreleme ve ileri belirteç bilgisini gereksiz yere birleştirme.',
  'Kök kullanıcıya görünen doğal klinik paragraftır; sonda tek soru cümlesi olsun. prompt yalnızca bu son soru cümlesidir.',
  'Soru tipi ile seçenek düzlemi aynı kalsın: tanıysa tanılar, etkense etkenler, mekanizmaysa mekanizmalar, tedaviyse tedaviler, anatomik yapıysa aynı düzeyde anatomik yapılar.',
  'Kök verileri doğru cevabı gerçekten desteklesin. Yaş, klinik bağlam, muayene, laboratuvar, görüntüleme, mikrobiyoloji, patoloji, anatomi, fizyoloji ve farmakoloji bilgileri kendi içinde tutarlı olsun.',
  'Bir bulgu doğru cevabı zayıflatıyor, başka seçeneği doğru cevap kadar güçlendiriyor veya açıklamada zorla savunma gerektiriyorsa o bulguyu kullanma; soruyu daha sade ve güvenli kur.',
  'Klasik TUS bilgisi önceliklidir. Emin olmadığın nadir alt tip, tartışmalı yaklaşım, uç mekanizma, ileri belirteç veya çok özel sendrom yerine temel ve güvenilir ayırt ettiricileri seç.',
  'Mikrobiyolojide Gram boyama, şekil, oksidaz, katalaz, laktoz fermentasyonu, H2S, üreaz, indol, hareketlilik, asit-fastlık, kültür, pigment, seroloji ve virülans bilgileri etkenle çelişmesin; emin değilsen bu ayrıntıları ekleme.',
  'Histoloji, dermatopatoloji ve patolojide ayrılma düzeyi, hücre tipi, doku kökeni, nekroz, inflamasyon paterni, boyanma paterni ve morfoloji tanıyla uyumlu olsun; histolojik bulgu başka tanıyı güçlendiriyorsa sadeleştir.',
  'İmmünohistokimya belirteçleri yalnız tanıya gerçek katkı sağlıyorsa kullanılsın; CD, CK, ALK, ER/PR, p53, DOG1, CD117, CDX2 ve benzeri belirteçleri klinik bağlam, morfoloji ve tümör kökeniyle uyumlu değilse ekleme.',
  'Anatomide sinir, damar, bağ, kas, foramen, seyir, komşuluk, köken ve hedef yapı ilişkileri anatomik olarak mümkün, sade ve seçici olsun; bir yapıyı yanlış komşuluk ilişkisiyle tarif etme.',
  'Fizyoloji ve biyokimyada hormon, reseptör, ikinci haberci, enzim, redoks, renal yanıt, asit-baz ve elektrolit mekanizmalarında neden-sonuç yönü açık ve tartışmasız doğru olsun.',
  'Evreleme sorulacaksa gerekli T, N ve M bilgisi veya ilgili hastalığın temel evre karar verileri kökte net bulunsun. Bu veriler yoksa evreleme yerine tanı ya da mekanizma sorusu yaz.',
  'Tedavi sorulacaksa klinik stabilite, aciliyet, risk düzeyi, evre, kontrendikasyon ve temel karar verdirici bilgi kökte yeterli olsun. Bu bilgiler yoksa kesin tedavi seçtirme; daha temel yaklaşım, tanı veya mekanizma sorusu kur.',
  'Yanlış seçenekler gerçekçi TUS çeldiricileri olsun; fakat kökteki veriler yanlış seçeneklerden birini de doğru cevap kadar desteklemesin. Eş anlamlı veya yalnız kelime farkıyla ayrılan seçenekleri birlikte kullanma.',
  'Final kullanıcıya görünen explanation, optionFeedback, tusTip ve scientificBasis dili doğal TUS çözüm dili gibi olsun; teknik editör dili yerine bağlama uygun olarak soruda verilen bulgular, bu hasta veya bu tablo gibi ifadeler tercih edilir.',
  'explanation klinik paragrafı uzun uzun tekrar etmeden, seçici bulguların neden doğru cevaba götürdüğünü ve yanlış seçeneklerin temel ayrımını kısa anlatır; hatalı veriyi savunmaya çalışmaz.',
  'optionFeedback seçenek özelinde olsun: her seçeneğin sorudaki veri ve karar mantığına göre neden uygun ya da neden elendiğini gerçek tıbbi gerekçeyle açıkla; gereksiz uzun ders notuna dönüştürme.',
  'tusTip kısa sınav ipucu versin. scientificBasis açıklamayı kopyalamasın; kararın dayandığı kısa biyolojik, klinik, anatomik veya mekanistik temeli versin.',
  'JSON oluşturmadan önce sessizce kontrol et: tek öğrenme hedefi var mı, kök doğru cevabı güvenle destekliyor mu, iki savunulabilir cevap oluştu mu, mekanizma yönü doğru mu, belirteç/mikrobiyoloji/histoloji/anatomi bilgisi uyumlu mu, tedavi/evreleme için gerekli karar verisi var mı? Sorun varsa daha sade soru üret.',
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

function normalizeOptionFeedback(rawFeedback, options) {
  if (!rawFeedback || typeof rawFeedback !== 'object' || Array.isArray(rawFeedback)) return {};
  return options.reduce((feedback, option, index) => {
    const letter = String.fromCharCode(65 + index);
    const value = rawFeedback[option] || rawFeedback[letter] || rawFeedback[letter.toLowerCase()];
    feedback[option] = normalizeText(typeof value === 'string' ? value : value?.explanation || value?.text || '');
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
  const exactCorrectAnswer = uniqueOptions.find((option) => option === correctAnswer)
    || uniqueOptions.find((option) => option.toLocaleLowerCase('tr') === correctAnswer.toLocaleLowerCase('tr'));
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
  const defaultValue = Math.min(6000, Math.max(3000, questionCount * 1600));
  return parseBoundedInteger(process.env.OPENAI_MAX_TOKENS, defaultValue, 2000, 8000);
}

function getTemperature() {
  const parsed = Number.parseFloat(process.env.OPENAI_TEMPERATURE);
  if (!Number.isFinite(parsed)) return 0.35;
  return Math.min(0.8, Math.max(0.1, parsed));
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

function getServiceTier() {
  const tier = normalizeText(process.env.OPENAI_SERVICE_TIER).toLowerCase();
  if (!tier || tier === 'flex') return null;
  return ['auto', 'default', 'priority', 'scale'].includes(tier) ? tier : null;
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
    'Alan isimlerini değiştirme. optionFeedback anahtarları A, B, C, D, E olsun ve options sırasıyla eşleşsin. correctAnswer, options içindeki metnin aynısı olsun.',
    'Bu üretimde klasik TUS bilgisi, tek öğrenme hedefi, kök-cevap tutarlılığı, tek doğru cevap ve seçenek özelinde kısa öğretici feedback önceliklidir.',
    'Sorudaki veriyi açıklamada zorla savunma; doğru cevaba uygun, minimal ve seçici veriyle baştan tutarlı soru kur.',
    'Emin olmadığın belirteç, mikrobiyolojik özellik, histolojik ayrım, anatomi ilişkisi, mekanizma yönü, evreleme veya tedavi ayrıntısını ekleme; soruyu daha sade ve güvenilir kur.',
  ].join('\n');
}

async function requestAiQuestions({ apiKey, model, branch, difficulty, questionCount }) {
  const messages = [
    {
      role: 'system',
      content: TUS_EDITOR_SYSTEM_PROMPT,
    },
    {
      role: 'user',
      content: buildPrompt({ branch, difficulty, questionCount }),
    },
  ];
  const requestPayload = {
    model,
    temperature: getTemperature(),
    max_completion_tokens: getMaxTokens(questionCount),
    response_format: getResponseFormat(),
    prompt_cache_key: process.env.OPENAI_PROMPT_CACHE_KEY || 'klinikiq-tus-question-v7-natural-explanation-style',
    messages,
  };
  if (process.env.OPENAI_PROMPT_CACHE_RETENTION) {
    requestPayload.prompt_cache_retention = process.env.OPENAI_PROMPT_CACHE_RETENTION;
  }
  const serviceTier = getServiceTier();
  if (serviceTier) {
    requestPayload.service_tier = serviceTier;
  }

  const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload),
  });

  if (!aiResponse.ok) {
    let detail = '';
    try {
      detail = await aiResponse.text();
    } catch {
      detail = '';
    }
    throw new Error(`OpenAI request failed: ${aiResponse.status}${detail ? ` - ${detail.slice(0, 500)}` : ''}`);
  }

  const payload = await aiResponse.json();
  return payload?.choices?.[0]?.message?.content;
}

async function generateQuestionsWithFallback({ apiKey, model, branch, difficulty, questionCount }) {
  try {
    const content = await requestAiQuestions({
      apiKey,
      model,
      branch,
      difficulty,
      questionCount,
    });
    return normalizeGeneratedQuestions(parseJsonObject(content), branch, difficulty);
  } catch (error) {
    console.warn('[generate-tus-question] primary generation failed', {
      message: error?.message,
      branch,
      difficulty,
      questionCount,
    });

    if (questionCount <= 1) throw error;

    const fallbackContent = await requestAiQuestions({
      apiKey,
      model,
      branch,
      difficulty,
      questionCount: 1,
    });
    return normalizeGeneratedQuestions(parseJsonObject(fallbackContent), branch, difficulty);
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
    const questions = await generateQuestionsWithFallback({
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
