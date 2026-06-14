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
  const stem = normalizeText(question?.stem || question?.narrativeStem || question?.case || question?.context);
  const prompt = normalizeText(question?.prompt || question?.questionText || question?.questionStem);
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
    'Soru tipi branşa göre klinik vaka, pür bilgi, mekanizma, tanı, tedavi, laboratuvar yorumu, patofizyoloji, mikrobiyoloji, farmakoloji, anatomi veya histoloji-embriyoloji olabilir.',
    'Seçenekler aynı kategoride, dengeli ve öğretici çeldirici olsun. Kök doğru cevabı ele vermesin.',
    'Açıklama öğretici olsun; her seçenek için ayrı bilimsel geri bildirim ver. Gerçek TUS veya soru bankası sorusu kopyalama.',
    '',
    'optionFeedback her seçenek için dolu olmalı; anahtar olarak A-E harflerini veya seçenek metninin aynısını kullanabilirsin.',
    '',
    'Yalnızca şu JSON nesnesini döndür:',
    '{"branch":"...","difficulty":"...","questionType":"...","stem":"...","prompt":"...","options":["...","...","...","...","..."],"correctAnswer":"seçenek metninin aynısı","explanation":"...","optionFeedback":{"A veya seçenek metni":"..."},"tusTip":"...","scientificBasis":"..."}',
  ].join('\n');
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

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.72,
        max_tokens: 1900,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'Sen TUS düzeyinde özgün, bilimsel doğruluğu yüksek Türkçe tıp soruları yazan kıdemli bir medikal eğitim editörüsün. Sadece geçerli JSON döndür.',
          },
          {
            role: 'user',
            content: buildPrompt({ branch: selectedBranch, difficulty: selectedDifficulty }),
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`OpenAI request failed: ${aiResponse.status}`);
    }

    const payload = await aiResponse.json();
    const content = payload?.choices?.[0]?.message?.content;
    const parsed = parseJsonObject(content);
    const question = normalizeGeneratedQuestion(parsed, selectedBranch, selectedDifficulty);

    return res.status(200).json({ question });
  } catch (error) {
    console.error('[generate-tus-question]', error);
    return res.status(500).json({ error: ERROR_MESSAGE });
  }
}
