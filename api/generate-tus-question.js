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
const QUALITY_RETRY_LIMIT = 1;
const QUALITY_CHECK_KEYS = [
  'singleVisibleQuestion',
  'stemSupportsCorrectAnswer',
  'optionsSamePlane',
  'singleBestAnswer',
  'feedbackNotDuplicated',
  'wrongFeedbackSpecific',
  'certaintyBalanced',
  'contextComplete',
  'tusTipActionable',
];
const GENERIC_TUS_TIP_PATTERN = /^(klinik vaka|tan[ıi]|laboratuvar|mekanizma|tedavi|yönetim|anatomi|mikrobiyoloji|farmakoloji|patoloji|soru|tus)$/iu;
const WEAK_FEEDBACK_PATTERN = /^(doğru cevapt[ıi]r|bu bulgularla uyumludur|klinik olarak daha olas[ıi]d[ıi]r|uygun değildir|öncelikli değildir|bu tabloyu açıklamaz|daha nadirdir)\.?$/iu;
const OVERCERTAIN_PATTERN = /\b(asla|her zaman|kesin olarak dışlan[ıi]r|doğrudan etkisi yoktur|imkans[ıi]zd[ıi]r)\b/iu;

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

function getQualityCheck(rawQuestion = {}) {
  const rawCheck = rawQuestion?.qualityCheck && typeof rawQuestion.qualityCheck === 'object'
    ? rawQuestion.qualityCheck
    : {};
  return QUALITY_CHECK_KEYS.reduce((check, key) => {
    check[key] = rawCheck[key] === true;
    return check;
  }, {});
}

function hasAnswerLeak(stem = '', correctAnswer = '') {
  const answerTokens = tokenize(correctAnswer).filter((word) => word.length >= 5);
  if (answerTokens.length < 2) return false;
  const stemText = normalizeForCompare(stem);
  const hits = answerTokens.filter((word) => stemText.includes(word)).length;
  return hits >= Math.ceil(answerTokens.length * 0.8);
}

function validateGeneratedQuestionQuality(question = {}) {
  const issues = [];
  const allFeedback = Object.values(question.optionFeedback || {}).map(normalizeText).filter(Boolean);
  const wrongFeedback = (question.options || [])
    .filter((option) => option !== question.correctAnswer)
    .map((option) => question.optionFeedback?.[option] || '');

  if (countQuestionMarks(question.stem) !== 1) {
    issues.push('Görünen vaka metninde tam olarak tek soru cümlesi olmalı.');
  }
  if (hasAnswerLeak(question.stem, question.correctAnswer)) {
    issues.push('Soru kökü doğru cevabı metin olarak ele veriyor.');
  }
  if (!question.tusTip || question.tusTip.length < 28 || GENERIC_TUS_TIP_PATTERN.test(question.tusTip)) {
    issues.push('TUS ipucu kısa karar anahtarı olmalı; kategori etiketi gibi kalmamalı.');
  }
  if (!question.scientificBasis || question.scientificBasis.length < 45) {
    issues.push('Bilimsel dayanak alanı somut mekanizma veya klinik gerekçe içermeli.');
  }
  if (OVERCERTAIN_PATTERN.test(`${question.explanation} ${question.tusTip} ${allFeedback.join(' ')}`)) {
    issues.push('Kesinlik dili fazla sert; olasılık, tipik patern veya sınav önceliği düzeyine çekilmeli.');
  }
  if (textSimilarity(question.explanation, question.tusTip) > 0.72) {
    issues.push('Ana açıklama ve TUS ipucu birbirini tekrar etmemeli.');
  }
  if (allFeedback.some((feedback) => feedback.length < 55 || WEAK_FEEDBACK_PATTERN.test(feedback))) {
    issues.push('Her seçenek geri bildirimi seçenek özelinde somut ayırt ettirici gerekçe içermeli.');
  }
  if (wrongFeedback.some((feedback) => textSimilarity(feedback, question.explanation) > 0.78)) {
    issues.push('Yanlış seçenek feedbackleri ana açıklamanın kopyası olmamalı.');
  }
  const duplicatedFeedback = allFeedback.some((feedback, index) => (
    allFeedback.slice(index + 1).some((other) => textSimilarity(feedback, other) > 0.82)
  ));
  if (duplicatedFeedback) {
    issues.push('Seçenek feedbackleri birbirinin kopyası olmamalı.');
  }
  const failedSelfChecks = QUALITY_CHECK_KEYS.filter((key) => question.qualityCheck?.[key] !== true);
  if (failedSelfChecks.length) {
    issues.push(`Final kalite kontrol işaretleri eksik: ${failedSelfChecks.join(', ')}.`);
  }

  return issues;
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
    qualityCheck: getQualityCheck(question),
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
    'Seçeneklerin beşi de aynı mantık düzleminde olsun: tanıysa tanı, etkense etken, ilaçsa ilaç, mekanizmaysa mekanizma, anatomik yapıysa anatomik yapı, yönetimse yönetim.',
    'Birden fazla seçenek savunulabiliyorsa kökü ve seçenekleri baştan yapılandır; açıklamayla kurtarmaya çalışma.',
    'Açıklama, bilimsel dayanak, TUS ipucu ve seçenek feedbackleri birbirinin kopyası olmasın. Her yanlış seçenek kökteki somut veriyle neden geride kaldığını anlatsın.',
    'Kesinlik dilini dengeli kullan: asla/her zaman/kesin dışlanır gibi ifadeleri ancak gerçekten mutlaksa kullan.',
    'Klasik sınav bilgisi ile güncel klinik pratiği karıştırma; hangi bağlam gerekiyorsa kökte açıkça ver.',
    'TUS ipucu kategori etiketi değil, kısa çözüm anahtarı olmalı.',
    '',
    'optionFeedback her seçenek için dolu olmalı; anahtar olarak A-E harflerini veya seçenek metninin aynısını kullanabilirsin.',
    'qualityCheck içindeki tüm alanları ancak gerçekten sağlanıyorsa true yap; biri sağlanmıyorsa soruyu JSON döndürmeden önce baştan düzelt.',
    '',
    'Yalnızca şu JSON nesnesini döndür:',
    '{"branch":"...","difficulty":"...","questionType":"...","stem":"...","prompt":"...","options":["...","...","...","...","..."],"correctAnswer":"seçenek metninin aynısı","explanation":"...","optionFeedback":{"A veya seçenek metni":"..."},"tusTip":"...","scientificBasis":"...","qualityCheck":{"singleVisibleQuestion":true,"stemSupportsCorrectAnswer":true,"optionsSamePlane":true,"singleBestAnswer":true,"feedbackNotDuplicated":true,"wrongFeedbackSpecific":true,"certaintyBalanced":true,"contextComplete":true,"tusTipActionable":true}}',
  ].join('\n');
}

function buildRetryInstruction(issues = []) {
  if (!issues.length) return '';
  return [
    'Önceki çıktı final kalite kontrolünden geçmedi.',
    'Aşağıdaki sorunları örnek yamayla değil, kök-seçenek-feedback yapısını global kalite standardına göre yeniden kurarak düzelt:',
    ...issues.slice(0, 8).map((issue) => `- ${issue}`),
  ].join('\n');
}

async function requestAiQuestion({ apiKey, model, branch, difficulty, qualityIssues = [] }) {
  const messages = [
    {
      role: 'system',
      content: 'Sen TUS düzeyinde özgün, bilimsel doğruluğu yüksek Türkçe tıp soruları yazan kıdemli bir medikal eğitim editörüsün. Sadece geçerli JSON döndür.',
    },
    {
      role: 'user',
      content: [
        buildPrompt({ branch, difficulty }),
        buildRetryInstruction(qualityIssues),
      ].filter(Boolean).join('\n\n'),
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
      temperature: qualityIssues.length ? 0.58 : 0.72,
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
    let qualityIssues = [];
    let lastError = null;

    for (let attempt = 0; attempt <= QUALITY_RETRY_LIMIT; attempt += 1) {
      try {
        const content = await requestAiQuestion({
          apiKey,
          model,
          branch: selectedBranch,
          difficulty: selectedDifficulty,
          qualityIssues,
        });
        const parsed = parseJsonObject(content);
        const question = normalizeGeneratedQuestion(parsed, selectedBranch, selectedDifficulty);
        qualityIssues = validateGeneratedQuestionQuality(question);
        if (!qualityIssues.length) {
          return res.status(200).json({ question });
        }
        lastError = new Error(`AI question failed quality checks: ${qualityIssues.join(' | ')}`);
      } catch (error) {
        lastError = error;
        qualityIssues = [error?.message || 'AI çıktısı güvenli soru formatına dönüştürülemedi.'];
      }
    }

    throw lastError || new Error('AI question failed quality checks.');
  } catch (error) {
    console.error('[generate-tus-question]', error);
    return res.status(500).json({ error: ERROR_MESSAGE });
  }
}
