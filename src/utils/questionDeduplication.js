import {
  makeQuestionSignature,
  makeQuestionTopicSignature,
  normalizeQuestionText,
  stableHash,
} from './aiQuestionHistory.js';

const MAX_SESSION_ID_TRACK = 500;
const sessionGeneratedQuestionIds = new Set();
let runtimeSequence = 0;

function getCryptoObject() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto) return globalThis.crypto;
  return null;
}

function randomToken() {
  const cryptoObject = getCryptoObject();
  if (cryptoObject?.randomUUID) return cryptoObject.randomUUID();
  if (cryptoObject?.getRandomValues) {
    const values = new Uint32Array(4);
    cryptoObject.getRandomValues(values);
    return Array.from(values, (value) => value.toString(36)).join('-');
  }
  return Math.random().toString(36).slice(2, 14);
}

export function createAIQuestionId(prefix = 'ai-spot') {
  let candidate = '';
  let guard = 0;
  do {
    runtimeSequence += 1;
    candidate = `${prefix}-${Date.now().toString(36)}-${runtimeSequence.toString(36)}-${randomToken()}`;
    guard += 1;
  } while (sessionGeneratedQuestionIds.has(candidate) && guard < 20);

  sessionGeneratedQuestionIds.add(candidate);
  if (sessionGeneratedQuestionIds.size > MAX_SESSION_ID_TRACK) {
    const oldest = sessionGeneratedQuestionIds.values().next().value;
    sessionGeneratedQuestionIds.delete(oldest);
  }
  return candidate;
}

export function resetSessionGeneratedQuestionIdsForTests() {
  sessionGeneratedQuestionIds.clear();
  runtimeSequence = 0;
}

export function toPlainText(value = '') {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(toPlainText).filter(Boolean).join(' | ');
  if (typeof value === 'object') {
    return [value.title, value.label, value.text, value.summary, value.explanation, value.description]
      .map(toPlainText)
      .filter(Boolean)
      .join(' | ');
  }
  return String(value);
}

export function tokenizeContent(value = '') {
  const stopWords = new Set([
    've', 'veya', 'ile', 'icin', 'olan', 'olarak', 'hasta', 'olguda', 'bu', 'bir', 'en', 'hangi', 'tablo', 'klinik',
    'patern', 'bulgu', 'veri', 'daha', 'sonra', 'temel', 'uygun', 'secenek', 'destekler', 'gosterir', 'dikkat',
  ]);
  return normalizeQuestionText(value)
    .split(' ')
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

export function similarityScore(a = '', b = '') {
  const tokensA = new Set(tokenizeContent(a));
  const tokensB = new Set(tokenizeContent(b));
  if (!tokensA.size || !tokensB.size) return 0;
  let intersection = 0;
  tokensA.forEach((token) => {
    if (tokensB.has(token)) intersection += 1;
  });
  const union = new Set([...tokensA, ...tokensB]).size || 1;
  const jaccard = intersection / union;
  const containment = intersection / Math.min(tokensA.size, tokensB.size);
  return Math.max(jaccard, containment * 0.82);
}

export function getQuestionCorrectText(question = {}) {
  const topLevelOptions = Array.isArray(question.options) ? question.options : [];
  const topCorrect = topLevelOptions.find((option) => option.id === question.correctAnswer)?.text;
  return question?.diagnosis?.correct || topCorrect || question?.correctAnswer || '';
}

export function getQuestionOptionTexts(question = {}) {
  const diagnosisOptions = Array.isArray(question?.diagnosis?.options) ? question.diagnosis.options : [];
  const topOptions = Array.isArray(question?.options) ? question.options.map((option) => option?.text || option) : [];
  return Array.from(new Set([...diagnosisOptions, ...topOptions].map((item) => String(item || '').trim()).filter(Boolean)));
}

export function makeOptionSetSignature(options = []) {
  const optionTexts = options
    .map((option) => (typeof option === 'string' ? option : option?.text))
    .filter(Boolean)
    .map(normalizeQuestionText)
    .sort((a, b) => a.localeCompare(b, 'tr'));
  return stableHash(optionTexts.join(' | '));
}

export function makeGenerationSignature(question = {}) {
  return makeQuestionSignature(question);
}

export function makeGenerationTopicSignature(question = {}) {
  return makeQuestionTopicSignature(question);
}

export function buildQuestionFingerprint(question = {}) {
  const optionTexts = getQuestionOptionTexts(question);
  const correctText = getQuestionCorrectText(question);
  const evidence = question?.diagnosis?.answerFeedback?.evidenceChain || question?.evidenceChain || [];
  return {
    id: question.id,
    title: normalizeQuestionText(question.title || ''),
    stem: normalizeQuestionText(question.stem || question.patientIntro?.historySummary || ''),
    question: normalizeQuestionText(question.question || ''),
    correct: normalizeQuestionText(correctText),
    optionsSignature: makeOptionSetSignature(optionTexts),
    combinedText: normalizeQuestionText([
      question.title,
      question.stem || question.patientIntro?.historySummary,
      question.question,
      correctText,
      optionTexts.join(' | '),
      toPlainText(evidence),
    ].filter(Boolean).join(' | ')),
  };
}

export function buildEmbeddedCaseFingerprints(embeddedCases = []) {
  return embeddedCases.map((clinicalCase) => {
    const options = clinicalCase?.diagnosis?.options || [];
    const evidence = clinicalCase?.diagnosis?.answerFeedback?.evidenceChain || [];
    return {
      id: clinicalCase.id,
      title: normalizeQuestionText(clinicalCase.title || ''),
      stem: normalizeQuestionText(clinicalCase.stem || clinicalCase.patientIntro?.historySummary || ''),
      question: normalizeQuestionText(clinicalCase.question || clinicalCase.diagnosis?.question || ''),
      correct: normalizeQuestionText(clinicalCase.diagnosis?.correct || ''),
      optionsSignature: makeOptionSetSignature(options),
      combinedText: normalizeQuestionText([
        clinicalCase.title,
        clinicalCase.stem || clinicalCase.patientIntro?.historySummary,
        clinicalCase.question || clinicalCase.diagnosis?.question,
        clinicalCase.diagnosis?.correct,
        options.join(' | '),
        toPlainText(evidence),
      ].filter(Boolean).join(' | ')),
    };
  });
}

export function findEmbeddedCaseOverlap(question = {}, embeddedCases = []) {
  const fingerprint = buildQuestionFingerprint(question);
  const embeddedFingerprints = buildEmbeddedCaseFingerprints(embeddedCases);

  for (const embedded of embeddedFingerprints) {
    const titleExact = fingerprint.title && fingerprint.title === embedded.title;
    const questionExact = fingerprint.question && fingerprint.question === embedded.question;
    const optionSetExact = fingerprint.optionsSignature && fingerprint.optionsSignature === embedded.optionsSignature;
    const sameCorrect = fingerprint.correct && fingerprint.correct === embedded.correct;
    const stemSimilarity = similarityScore(fingerprint.stem, embedded.stem);
    const combinedSimilarity = similarityScore(fingerprint.combinedText, embedded.combinedText);

    if (titleExact) return { caseId: embedded.id, reason: 'title-exact', score: 1 };
    if (questionExact && sameCorrect) return { caseId: embedded.id, reason: 'question-correct-exact', score: 1 };
    if (optionSetExact && sameCorrect) return { caseId: embedded.id, reason: 'option-set-correct-exact', score: 1 };
    if (stemSimilarity >= 0.72) return { caseId: embedded.id, reason: 'stem-too-similar', score: stemSimilarity };
    if (combinedSimilarity >= 0.82) return { caseId: embedded.id, reason: 'combined-too-similar', score: combinedSimilarity };
  }

  return null;
}

export function isDuplicateAgainstRecentContext(question = {}, context = {}) {
  const signature = makeGenerationSignature(question);
  const topicSignature = makeGenerationTopicSignature(question);
  const recentSignatures = context.recentSignatures || [];
  const recentIds = context.recentIds || [];
  const recentSummaries = context.recentQuestionSummaries || [];
  const title = normalizeQuestionText(question.title || '');
  const correct = normalizeQuestionText(getQuestionCorrectText(question));

  if (question.id && recentIds.includes(question.id)) return { reason: 'id-repeat', signature, topicSignature };
  if (signature && recentSignatures.includes(signature)) return { reason: 'signature-repeat', signature, topicSignature };
  if (topicSignature && recentSignatures.includes(topicSignature)) return { reason: 'topic-signature-repeat', signature, topicSignature };

  const nearSummary = recentSummaries.find((item) => {
    const summaryTitle = normalizeQuestionText(item.title || '');
    const summaryCorrect = normalizeQuestionText(item.correct || '');
    return summaryTitle && correct && summaryCorrect === correct && similarityScore(title, summaryTitle) > 0.78;
  });
  if (nearSummary) return { reason: 'recent-summary-too-similar', signature, topicSignature };

  return null;
}

export function validateQuestionNovelty(question = {}, { context = {}, embeddedCases = [] } = {}) {
  const duplicate = isDuplicateAgainstRecentContext(question, context);
  if (duplicate) return { ok: false, errors: [`duplicate:${duplicate.reason}`], ...duplicate };

  const embeddedOverlap = findEmbeddedCaseOverlap(question, embeddedCases);
  if (embeddedOverlap) {
    return {
      ok: false,
      errors: [`embedded-case-overlap:${embeddedOverlap.reason}:${embeddedOverlap.caseId}`],
      embeddedOverlap,
      signature: makeGenerationSignature(question),
      topicSignature: makeGenerationTopicSignature(question),
    };
  }

  return {
    ok: true,
    errors: [],
    signature: makeGenerationSignature(question),
    topicSignature: makeGenerationTopicSignature(question),
  };
}
