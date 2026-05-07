import {
  makeQuestionSignature,
  makeQuestionTopicSignature,
  normalizeQuestionText,
  stableHash,
} from './aiQuestionHistory.js';

const MAX_SESSION_ID_TRACK = 700;
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
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(toPlainText).filter(Boolean).join(' | ');
  if (typeof value === 'object') {
    return [
      value.title,
      value.label,
      value.name,
      value.text,
      value.summary,
      value.explanation,
      value.description,
      value.result,
      value.interpretation,
      value.value,
      value.findings,
      value.rows,
    ].map(toPlainText).filter(Boolean).join(' | ');
  }
  return String(value);
}

export function tokenizeContent(value = '') {
  const stopWords = new Set([
    've', 'veya', 'ile', 'icin', 'olan', 'olarak', 'hasta', 'olguda', 'olgu', 'bu', 'bir', 'en', 'hangi', 'tablo', 'klinik',
    'patern', 'bulgu', 'veri', 'daha', 'sonra', 'temel', 'uygun', 'secenek', 'destekler', 'gosterir', 'dikkat', 'spot',
    'tus', 'kisa', 'karar', 'ayirici', 'dogru', 'yanit', 'soru', 'hedef', 'basvuran', 'degerlendirilen', 'birlikte',
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
  return Math.max(jaccard, containment * 0.86);
}

export function getQuestionCorrectText(question = {}) {
  const topLevelOptions = Array.isArray(question.options) ? question.options : [];
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  const topCorrect = topLevelOptions.find((option) => String(option?.id || '').toUpperCase() === correctId)?.text;
  return question?.diagnosis?.correct || topCorrect || question?.correctAnswerText || question?.correctAnswer || '';
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
  return `opts-${stableHash(optionTexts.join(' | '))}`;
}

export function makeGenerationSignature(question = {}) {
  return makeQuestionSignature(question);
}

export function makeGenerationTopicSignature(question = {}) {
  return makeQuestionTopicSignature(question);
}

export function buildQuestionContentSignature(question = {}) {
  return makeQuestionSignature(question);
}

export function attachQuestionDedupeFields(question = {}) {
  const contentSignature = buildQuestionContentSignature(question);
  const topicSignature = makeGenerationTopicSignature(question);
  const optionSetSignature = makeOptionSetSignature(getQuestionOptionTexts(question));
  question.contentSignature = contentSignature;
  question.dedupeKey = contentSignature;
  question.semanticFingerprint = contentSignature;
  question.generationSignature = contentSignature;
  question.topicSignature = topicSignature;
  question.aiMeta = {
    ...(question.aiMeta || {}),
    signature: contentSignature,
    contentSignature,
    generationSignature: contentSignature,
    semanticFingerprint: contentSignature,
    dedupeKey: contentSignature,
    topicSignature,
    optionSetSignature,
  };
  return question;
}

function getEvidenceText(question = {}) {
  return toPlainText([
    question.evidenceChain,
    question.examPearls,
    question.examPearl,
    question?.diagnosis?.answerFeedback?.evidenceChain,
    question?.diagnosis?.answerFeedback?.pearls,
    question?.findings,
    question?.exam,
    question?.vitals,
    question?.investigations,
  ]);
}

export function buildQuestionFingerprint(question = {}) {
  const optionTexts = getQuestionOptionTexts(question);
  const correctText = getQuestionCorrectText(question);
  const stem = question.stem || question.patientIntro?.historySummary || '';
  const questionText = question.question || question.diagnosis?.question || '';
  const learningTarget = question.learningTarget || question.clinicalFocus || '';
  const title = question.title || '';
  const evidence = getEvidenceText(question);
  const optionSetSignature = makeOptionSetSignature(optionTexts);
  const contentSignature = question.contentSignature || question.semanticFingerprint || question.dedupeKey || buildQuestionContentSignature(question);

  return {
    id: question.id,
    contentSignature,
    generationSignature: question.generationSignature || contentSignature,
    topicSignature: question.topicSignature || question.aiMeta?.topicSignature || makeGenerationTopicSignature(question),
    branch: normalizeQuestionText(question.relatedBranch || question.branchName || question.branchId || ''),
    title: normalizeQuestionText(title),
    stem: normalizeQuestionText(stem),
    question: normalizeQuestionText(questionText),
    learningTarget: normalizeQuestionText(learningTarget),
    correct: normalizeQuestionText(correctText),
    questionType: normalizeQuestionText(question.questionType || question.aiMeta?.variantAngle || ''),
    optionsSignature: optionSetSignature,
    optionTexts: optionTexts.map(normalizeQuestionText).sort((a, b) => a.localeCompare(b, 'tr')),
    evidence: normalizeQuestionText(evidence),
    combinedText: normalizeQuestionText([
      question.relatedBranch || question.branchName || question.branchId,
      title,
      learningTarget,
      stem,
      questionText,
      correctText,
      optionTexts.join(' | '),
      evidence,
    ].filter(Boolean).join(' | ')),
  };
}

const embeddedFingerprintCache = new WeakMap();

export function buildEmbeddedCaseFingerprints(embeddedCases = []) {
  if (embeddedCases && typeof embeddedCases === 'object' && embeddedFingerprintCache.has(embeddedCases)) {
    return embeddedFingerprintCache.get(embeddedCases);
  }
  const fingerprints = embeddedCases.map((clinicalCase) => {
    const options = clinicalCase?.diagnosis?.options || [];
    const evidence = clinicalCase?.diagnosis?.answerFeedback?.evidenceChain || [];
    return buildQuestionFingerprint({
      id: clinicalCase.id,
      branchId: clinicalCase.branchId,
      relatedBranch: clinicalCase.relatedBranch,
      title: clinicalCase.title || '',
      stem: clinicalCase.stem || clinicalCase.patientIntro?.historySummary || '',
      question: clinicalCase.question || clinicalCase.diagnosis?.question || '',
      learningTarget: clinicalCase.learningTarget || clinicalCase.clinicalFocus || clinicalCase.diagnosis?.answerFeedback?.learningOutcome || '',
      options: options.map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
      correctAnswerText: clinicalCase.diagnosis?.correct || '',
      correctAnswer: clinicalCase.diagnosis?.correct || '',
      evidenceChain: evidence,
      examPearls: clinicalCase.diagnosis?.pearls || clinicalCase.diagnosis?.answerFeedback?.pearls || [],
      diagnosis: {
        correct: clinicalCase.diagnosis?.correct || '',
        options,
        question: clinicalCase.diagnosis?.question || '',
        answerFeedback: clinicalCase.diagnosis?.answerFeedback || {},
      },
    });
  });
  if (embeddedCases && typeof embeddedCases === 'object') embeddedFingerprintCache.set(embeddedCases, fingerprints);
  return fingerprints;
}

export function findEmbeddedCaseOverlap(question = {}, embeddedCases = []) {
  const fingerprint = buildQuestionFingerprint(question);
  const embeddedFingerprints = buildEmbeddedCaseFingerprints(embeddedCases);

  for (const embedded of embeddedFingerprints) {
    const titleExact = fingerprint.title && fingerprint.title === embedded.title;
    const questionExact = fingerprint.question && fingerprint.question === embedded.question;
    const optionSetExact = fingerprint.optionsSignature && fingerprint.optionsSignature === embedded.optionsSignature;
    const sameCorrect = fingerprint.correct && fingerprint.correct === embedded.correct;
    const sameLearningTarget = fingerprint.learningTarget && fingerprint.learningTarget === embedded.learningTarget;
    const stemSimilarity = similarityScore(fingerprint.stem, embedded.stem);
    const questionSimilarity = similarityScore(fingerprint.question, embedded.question);
    const combinedSimilarity = similarityScore(fingerprint.combinedText, embedded.combinedText);
    const targetSimilarity = similarityScore(fingerprint.learningTarget, embedded.learningTarget);

    const conceptOnlySource = question.aiMeta?.sourceConceptOnly || /concept-template|synthetic-template/i.test(String(question.source || ''));
    if (titleExact && stemSimilarity >= (conceptOnlySource ? 0.72 : 0.55)) return { caseId: embedded.id, reason: 'title-stem-overlap', score: stemSimilarity };
    if (questionExact && sameCorrect && stemSimilarity >= 0.45) return { caseId: embedded.id, reason: 'question-correct-exact', score: 1 };
    if (optionSetExact && sameCorrect && (sameLearningTarget || targetSimilarity >= 0.72) && (stemSimilarity >= 0.58 || questionSimilarity >= 0.74 || combinedSimilarity >= 0.82)) return { caseId: embedded.id, reason: 'option-target-correct-overlap', score: Math.max(stemSimilarity, questionSimilarity, targetSimilarity) };
    if (stemSimilarity >= (conceptOnlySource ? 0.82 : 0.76) && (sameCorrect || targetSimilarity >= 0.74)) return { caseId: embedded.id, reason: 'stem-target-too-similar', score: stemSimilarity };
    if (questionSimilarity >= 0.86 && sameCorrect && (stemSimilarity >= 0.42 || sameLearningTarget)) return { caseId: embedded.id, reason: 'question-too-similar', score: questionSimilarity };
    if (combinedSimilarity >= (conceptOnlySource ? 0.92 : 0.88)) return { caseId: embedded.id, reason: 'combined-too-similar', score: combinedSimilarity };
  }

  return null;
}

function recentSummaryFingerprint(summary = {}) {
  return {
    id: summary.id,
    contentSignature: summary.contentSignature || summary.signature || summary.generationSignature,
    topicSignature: summary.topicSignature,
    title: normalizeQuestionText(summary.normalizedTitle || summary.title || ''),
    stem: normalizeQuestionText(summary.normalizedStem || summary.stem || ''),
    question: normalizeQuestionText(summary.normalizedQuestion || summary.question || ''),
    learningTarget: normalizeQuestionText(summary.normalizedLearningTarget || summary.learningTarget || ''),
    correct: normalizeQuestionText(summary.normalizedCorrect || summary.correct || ''),
    questionType: normalizeQuestionText(summary.questionType || summary.variantAngle || ''),
    optionsSignature: summary.optionSetSignature,
    combinedText: normalizeQuestionText(summary.combinedText || [summary.branch, summary.title, summary.learningTarget, summary.correct, toPlainText(summary.optionTexts)].filter(Boolean).join(' | ')),
  };
}

export function isDuplicateAgainstRecentContext(question = {}, context = {}) {
  const fingerprint = buildQuestionFingerprint(question);
  const signature = fingerprint.contentSignature;
  const topicSignature = fingerprint.topicSignature;
  const recentSignatures = context.recentSignatures || [];
  const recentIds = context.recentIds || [];
  const recentSummaries = (context.recentQuestionSummaries || []).map(recentSummaryFingerprint);

  if (question.id && recentIds.includes(question.id)) return { reason: 'id-repeat', signature, topicSignature };
  if (signature && recentSignatures.includes(signature)) return { reason: 'content-signature-repeat', signature, topicSignature };
  // Same topic or same correct answer alone is allowed; full content, stem/question and option-set overlap decide duplication.

  for (const recent of recentSummaries) {
    if (!recent.contentSignature && !recent.combinedText) continue;
    if (recent.contentSignature && recent.contentSignature === signature) return { reason: 'history-content-signature-repeat', signature, topicSignature };

    const sameCorrect = recent.correct && recent.correct === fingerprint.correct;
    const sameLearningTarget = recent.learningTarget && recent.learningTarget === fingerprint.learningTarget;
    const sameOptions = recent.optionsSignature && recent.optionsSignature === fingerprint.optionsSignature;
    const sameQuestionType = !recent.questionType || !fingerprint.questionType || recent.questionType === fingerprint.questionType;
    const titleSimilarity = similarityScore(fingerprint.title, recent.title);
    const stemSimilarity = similarityScore(fingerprint.stem, recent.stem);
    const questionSimilarity = similarityScore(fingerprint.question, recent.question);
    const targetSimilarity = similarityScore(fingerprint.learningTarget, recent.learningTarget);
    const combinedSimilarity = similarityScore(fingerprint.combinedText, recent.combinedText);

    if (sameQuestionType && sameOptions && sameCorrect && (sameLearningTarget || targetSimilarity >= 0.78) && (stemSimilarity >= 0.97 || (questionSimilarity >= 0.98 && combinedSimilarity >= 0.98) || combinedSimilarity >= 0.985)) {
      return { reason: 'same-options-correct-target', signature, topicSignature, score: Math.max(stemSimilarity, questionSimilarity, targetSimilarity) };
    }
    if (stemSimilarity >= 0.94 && questionSimilarity >= 0.90) {
      return { reason: 'stem-question-too-similar', signature, topicSignature, score: Math.max(stemSimilarity, questionSimilarity) };
    }
    if (stemSimilarity >= (sameQuestionType ? 0.97 : 0.98) && (sameCorrect || sameLearningTarget || sameOptions)) {
      return { reason: 'stem-too-similar-with-shared-axis', signature, topicSignature, score: stemSimilarity };
    }
    if (sameQuestionType && questionSimilarity >= 0.96 && sameCorrect && (sameLearningTarget || sameOptions) && stemSimilarity >= 0.88) {
      return { reason: 'question-too-similar-with-same-answer', signature, topicSignature, score: questionSimilarity };
    }
    if ((sameQuestionType && combinedSimilarity >= 0.97 && (sameCorrect || sameLearningTarget || sameOptions)) || (!sameQuestionType && combinedSimilarity >= 0.985 && sameCorrect && sameOptions)) {
      return { reason: 'combined-semantic-repeat', signature, topicSignature, score: combinedSimilarity };
    }
    if (sameQuestionType && titleSimilarity >= 0.96 && sameCorrect && sameLearningTarget && stemSimilarity >= 0.90) {
      return { reason: 'same-title-answer-target', signature, topicSignature, score: titleSimilarity };
    }
  }

  return null;
}

export function validateQuestionNovelty(question = {}, { context = {}, embeddedCases = [] } = {}) {
  attachQuestionDedupeFields(question);
  const duplicate = isDuplicateAgainstRecentContext(question, context);
  if (duplicate) return { ok: false, errors: [`duplicate:${duplicate.reason}`], ...duplicate };

  const embeddedOverlap = findEmbeddedCaseOverlap(question, embeddedCases);
  if (embeddedOverlap) {
    return {
      ok: false,
      errors: [`embedded-case-overlap:${embeddedOverlap.reason}:${embeddedOverlap.caseId}`],
      embeddedOverlap,
      signature: question.contentSignature,
      topicSignature: question.topicSignature || question.aiMeta?.topicSignature,
    };
  }

  return {
    ok: true,
    errors: [],
    signature: question.contentSignature,
    topicSignature: question.topicSignature || question.aiMeta?.topicSignature,
  };
}
