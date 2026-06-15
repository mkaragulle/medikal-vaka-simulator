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

  return {
    branch,
    difficulty,
    questionType: normalizeText(question?.questionType || question?.type || 'TUS sorusu'),
    stem,
    prompt,
    options: uniqueOptions,
    correctAnswer: exactCorrectAnswer,
    explanation,
    optionFeedback,
    tusTip: normalizeText(question?.tusTip || question?.examTip || question?.tip),
    scientificBasis: normalizeText(question?.scientificBasis || question?.evidence || question?.sourceLogic),
  };
}

function buildPrompt({ branch, difficulty }) {
  return [
    `Branş: ${branch}`,
    `Zorluk: ${difficulty}`,
    '',
    'Özgün, tek doğru cevaplı, TUS mantığına uygun bir Türkçe soru üret.',
    'stem kullanıcıya görünecek tek soru metnidir: vaka/bilgi bağlamı + sonda yalnızca bir net soru cümlesi içersin. prompt aynı soru cümlesini metadata olarak taşısın; ayrı ikinci soru gibi yazma.',
    'Doğru cevap kökteki yaş, bağlam, muayene, laboratuvar, görüntüleme, risk faktörü veya mekanizma verilerinden zorunlu olarak çıkmalı. Kökte verilmeyen ayrıntıyı ana gerekçe yapma.',
    'Yaş, hasta grubu, risk faktörü, hastalık süresi ve klinik bağlam doğru cevapla uyumlu olmalı; genel tıbbi bilgi kökteki bağlamla çelişiyorsa soruyu kullanma.',
    'Kök cevabı desteklesin ama cevabı doğrudan ilan etmesin: tanıyı/etkeni/ilacı/anatomik yapıyı neredeyse tarif eden aşırı belirleyici veya yapay veri kullanma.',
    'Tek bir açık veriyle cevabı kilitleme; ayırt ettirici ama doğal iki-üç veriyi birlikte kullandır, gereksiz ipucu yığma.',
    'Seçeneklerin beşi de aynı mantık düzleminde olsun: tanıysa tanı, etkense etken, ilaçsa ilaç, mekanizmaysa mekanizma, anatomik yapıysa anatomik yapı, yönetimse yönetim.',
    'Aynı anlama gelen, eş anlamlı kullanılan, terminolojik varyant olan veya sadece kelime tercihiyle ayrılan iki seçeneği aynı soruda birlikte kullanma. Öğrenciyi Latin/Türkçe ad, eski/yeni ad veya yakın eş ad seçmeye zorlama.',
    'Seçenekler karşılıklı dışlayıcı ve sınav seçeneği gibi doğal olmalı; uydurma birleşik tanı, bozuk terminoloji, bariz alakasız kategori veya yapay seçenek kullanma.',
    'Yanlış seçenekler bariz alakasız değil, gerçekçi çeldirici olsun; ancak kökteki verilerle bilimsel olarak elenebilsin. Alakasız sistem, kategori veya komplikasyonla kolay eleme yaptırma. Birden fazla seçenek savunulabiliyorsa kökü ve seçenekleri baştan yapılandır.',
    'explanation ana gerekçeyi ve karar paternini anlatsın; seçenekleri tek tek listeleyen veya optionFeedback metinlerini tekrar eden bir paragraf olmasın.',
    'scientificBasis biyolojik/klinik mekanizmayı açıklasın; optionFeedback veya explanation cümlelerini kopyalamasın.',
    'optionFeedback alanı Seçenekleri nasıl elemeliydin bölümünü besler ve en öğretici alan kabul edilir.',
    'Her optionFeedback 2-3 net cümle olsun: doğruysa kökteki hangi veri kombinasyonuyla öne çıktığını ve hangi karar noktasıyla ayrıldığını açıkla; yanlışsa o seçeneğin hangi durumda doğru olabileceğini, mevcut kökte hangi veriyle geride kaldığını ve doğru seçenekten temel farkını söyle.',
    'optionFeedback içinde yalnızca “doğru cevaptır”, “uymaz”, “tipik değildir”, “daha az olasıdır”, “ön planda değildir”, “bu tabloyu açıklamaz” gibi genel ifadeler kullanma; bu ifadeler varsa hemen yanında somut bilimsel gerekçe ve kök verisi bağlantısı bulunmalı.',
    'Her seçenek feedbacki ayrı bir klinik, laboratuvar, mekanizma, anatomik düzey, epidemiyolojik bağlam, tanısal yöntem veya patofizyolojik fark kazandırsın; aynı genel cümle küçük değişikliklerle tekrar edilmesin.',
    'Doğru seçenek feedbacki explanation metninin kopyası olmamalı; seçenek eleme mantığına özel, tekrar kullanılabilir bir çözüm kuralı vermeli.',
    'Doğru cevap açıklaması, mekanizma, ayırıcı ayrım ve optionFeedback aynı fikri farklı başlıklar altında tekrar etmesin; her alan yeni bir öğretici katkı versin.',
    'Feedbackler ansiklopedik paragrafa dönüşmeden, öğrencinin benzer soruda tekrar kullanabileceği ayırıcı tanı/eleme bilgisini vermelidir.',
    'Kesinlik dilini dengeli kullan: asla/her zaman/kesin dışlanır gibi ifadeleri ancak gerçekten mutlaksa kullan.',
    'Klasik sınav bilgisi ile güncel klinik pratiği karıştırma; hangi bağlam gerekiyorsa kökte açıkça ver.',
    'TUS ipucu kategori etiketi değil, kısa çözüm anahtarı olmalı.',
    'JSON yazmadan önce iç editör kontrolü yap: eş anlamlı seçenek var mı, tek doğru cevap güvenli mi, kök cevabı destekleyip ifşa etmiyor mu, yaş/bağlam uyumlu mu, çeldiriciler gerçekçi ama elenebilir mi, feedbackler seçenek özelinde mi, kesinlik dili dengeli mi, tekrar var mı. Herhangi biri başarısızsa aynı çıktıyı düzeltmeye çalışma; kök, seçenekler ve feedbackleri birlikte yeniden kur. Bu kontrolü JSON içinde ayrı alan olarak yazma.',
    '',
    'optionFeedback her seçenek için dolu olmalı; anahtar olarak A-E harflerini veya seçenek metninin aynısını kullanabilirsin.',
    '',
    'Yalnızca şu JSON nesnesini döndür:',
    '{"branch":"...","difficulty":"...","questionType":"...","stem":"...","prompt":"...","options":["...","...","...","...","..."],"correctAnswer":"seçenek metninin aynısı","explanation":"...","optionFeedback":{"A veya seçenek metni":"..."},"tusTip":"...","scientificBasis":"..."}',
  ].join('\n');
}

async function requestAiQuestion({ apiKey, model, branch, difficulty }) {
  const messages = [
    {
      role: 'system',
      content: 'Sen TUS düzeyinde özgün, bilimsel doğruluğu yüksek Türkçe tıp soruları yazan kıdemli bir medikal eğitim editörüsün. Sadece geçerli JSON döndür.',
    },
    {
      role: 'user',
      content: buildPrompt({ branch, difficulty }),
    },
  ];

  const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.68,
      max_tokens: 2100,
      response_format: { type: 'json_object' },
      messages,
    }),
  });

  if (!aiResponse.ok) {
    throw new Error(`OpenAI request failed: ${aiResponse.status}`);
  }

  const payload = await aiResponse.json();
  return payload?.choices?.[0]?.message?.content;
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
    const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
    const content = await requestAiQuestion({
      apiKey,
      model,
      branch: selectedBranch,
      difficulty: selectedDifficulty,
    });
    const parsed = parseJsonObject(content);
    const question = normalizeGeneratedQuestion(parsed, selectedBranch, selectedDifficulty);

    return res.status(200).json({ question });
  } catch (error) {
    console.error('[generate-tus-question]', error);
    return res.status(500).json({ error: ERROR_MESSAGE });
  }
}
