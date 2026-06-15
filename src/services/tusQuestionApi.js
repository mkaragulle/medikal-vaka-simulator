export const TUS_GENERATION_ERROR_MESSAGE = 'Soru üretimi şu anda tamamlanamadı. Lütfen tekrar deneyin.';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

function compactText(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeForCompare(value = '') {
  return compactText(value)
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

function visibleStemIncludesPrompt(stem = '', prompt = '') {
  const normalizedStem = normalizeForCompare(stem);
  const normalizedPrompt = normalizeForCompare(prompt);
  return Boolean(normalizedStem && normalizedPrompt && normalizedStem.includes(normalizedPrompt));
}

function buildVisibleStem(stem = '', prompt = '') {
  const cleanStem = compactText(stem);
  const cleanPrompt = compactText(prompt);
  if (!cleanPrompt || visibleStemIncludesPrompt(cleanStem, cleanPrompt) || cleanStem.includes('?')) {
    return cleanStem;
  }
  return compactText(`${cleanStem} ${cleanPrompt}`);
}

function normalizeDifficulty(value = 'Orta') {
  return ['Kolay', 'Orta', 'Zor'].includes(value) ? value : 'Orta';
}

function getFeedbackByOption(optionFeedback = {}, option = '', index = 0) {
  const letter = OPTION_LETTERS[index];
  const direct = optionFeedback?.[option] || optionFeedback?.[letter] || optionFeedback?.[letter?.toLowerCase()];
  if (typeof direct === 'string') return compactText(direct);
  return compactText(direct?.explanation || direct?.text || direct?.summary || '');
}

function normalizeGeneratedTusQuestion(payload) {
  const source = payload?.question && typeof payload.question === 'object' ? payload.question : payload;
  const branch = compactText(source?.branch) || 'TUS';
  const difficulty = normalizeDifficulty(source?.difficulty);
  const options = Array.isArray(source?.options)
    ? source.options.map((option) => compactText(typeof option === 'string' ? option : option?.text)).filter(Boolean)
    : [];
  const uniqueOptions = Array.from(new Set(options));
  const rawCorrect = compactText(source?.correctAnswer || source?.correct || source?.answer);
  const letterMatch = rawCorrect.match(/^[A-E]$/iu);
  const correctAnswer = letterMatch ? uniqueOptions[rawCorrect.toLocaleUpperCase('tr').charCodeAt(0) - 65] : rawCorrect;
  const exactCorrect = uniqueOptions.find((option) => option === correctAnswer)
    || uniqueOptions.find((option) => option.toLocaleLowerCase('tr') === correctAnswer.toLocaleLowerCase('tr'));
  const questionStem = compactText(source?.prompt || source?.questionText || source?.questionStem);
  const narrativeStem = buildVisibleStem(source?.stem || source?.narrativeStem || source?.case, questionStem);
  const explanation = compactText(source?.explanation || source?.mainExplanation || source?.rationale);
  const rawOptionFeedback = source?.optionFeedback || source?.feedback || source?.optionExplanations || {};

  if (uniqueOptions.length !== 5 || !exactCorrect || !narrativeStem || !questionStem || !explanation) {
    throw new Error('Invalid TUS question payload.');
  }

  const optionComparison = uniqueOptions.reduce((feedback, option, index) => {
    feedback[option] = getFeedbackByOption(rawOptionFeedback, option, index);
    if (!feedback[option]) throw new Error('Missing option feedback.');
    return feedback;
  }, {});
  const whyWrong = uniqueOptions.reduce((feedback, option) => {
    if (option !== exactCorrect) feedback[option] = optionComparison[option];
    return feedback;
  }, {});
  const tusTip = compactText(source?.tusTip || source?.examTip || source?.tip);
  const scientificBasis = compactText(source?.scientificBasis || source?.evidence || source?.sourceLogic);
  const questionType = compactText(source?.questionType || source?.type || 'TUS sorusu');
  const id = `ai-tus-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const answerFeedback = {
    summary: explanation,
    whyCorrect: optionComparison[exactCorrect] || explanation,
    rationale: explanation,
    correctOptionFeedback: optionComparison[exactCorrect] || explanation,
    optionComparison,
    optionFeedback: optionComparison,
    answerFeedbackByOption: optionComparison,
    whyWrong,
    examPearl: tusTip,
    pearls: tusTip ? [{ label: 'Sınav notu', text: tusTip }] : [],
    clinicalPearls: scientificBasis ? [{ label: 'Bilimsel dayanak', text: scientificBasis }] : [],
    evidenceChain: scientificBasis ? [{ title: 'Bilimsel dayanak', text: scientificBasis, source: 'ai' }] : [],
    coreKnowledge: scientificBasis,
    learningOutcome: compactText(source?.learningOutcome || `${branch} alanında TUS düzeyi ayırt ettirici bilgiyi pekiştirme.`),
  };

  return {
    id,
    caseType: 'spot',
    branchId: 'tus-spot-olgular',
    branchName: 'TUS Spot Sorusu',
    relatedBranch: branch,
    title: `${branch} · ${difficulty} TUS sorusu`,
    difficulty,
    difficultyTag: difficulty,
    clinicalFocus: questionType,
    learningTarget: questionType,
    questionType,
    answerTarget: questionType,
    narrativeStem,
    stem: narrativeStem,
    question: questionStem,
    prompt: questionStem,
    explanation,
    coreKnowledge: scientificBasis,
    examPearl: tusTip,
    evidenceChain: answerFeedback.evidenceChain,
    optionComparison,
    whyWrong,
    answerFeedback,
    diagnosis: {
      correct: exactCorrect,
      options: uniqueOptions,
      question: questionStem,
      explanation,
      pearls: answerFeedback.pearls,
      optionComparison,
      optionFeedback: optionComparison,
      answerFeedbackByOption: optionComparison,
      whyWrong,
      answerFeedback,
    },
    shuffleOptions: false,
    sourceType: 'ai-generated-tus-question',
    generatedAt: Date.now(),
  };
}

export async function generateTusQuestion({ branch, difficulty, signal } = {}) {
  const response = await fetch('/api/generate-tus-question', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ branch, difficulty }),
    signal,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.error || TUS_GENERATION_ERROR_MESSAGE);
  }

  try {
    return normalizeGeneratedTusQuestion(payload);
  } catch (error) {
    console.error('[tus-question-api]', error);
    throw new Error(TUS_GENERATION_ERROR_MESSAGE);
  }
}
