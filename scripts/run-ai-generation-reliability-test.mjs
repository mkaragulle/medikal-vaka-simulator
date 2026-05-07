import fs from 'node:fs';
import { generateAIQuestion } from '../src/utils/aiQuestionGenerator.js';
import { rememberAIQuestion, buildRecentQuestionContext, clearAIQuestionHistory, normalizeQuestionText } from '../src/utils/aiQuestionHistory.js';
import { validateAIQuestionCase } from '../src/utils/validateAIQuestion.js';
import { branches } from '../src/data/branches.js';
import { similarityScore, getQuestionOptionTexts, getQuestionCorrectText, buildQuestionFingerprint } from '../src/utils/questionDeduplication.js';

clearAIQuestionHistory();

const sameBranch = 'Çocuk Sağlığı ve Hastalıkları';
const branchList = branches
  .filter((branch) => branch.id !== 'tus-spot-olgular')
  .map((branch) => branch.name || branch.shortName || branch.id)
  .filter(Boolean);

const results = [];
const seenSignatures = new Set();
const seenOptionOnly = new Map();
let previousQuestionId = null;
let duplicateRejected = 0;
let repairCount = 0;
let fallbackCount = 0;
let errorStateCount = 0;
let validationFailures = 0;
let signatureRepeats = 0;
let optionOnlyRepeats = 0;
let tooSimilarRepeats = 0;

function optionOnlyKey(question) {
  return [
    question.relatedBranch || question.branchName || '',
    getQuestionCorrectText(question),
    getQuestionOptionTexts(question).map(normalizeQuestionText).sort().join('|'),
  ].map(normalizeQuestionText).join('::');
}

for (let index = 0; index < 100; index += 1) {
  const branchFilter = index < 50 ? sameBranch : branchList[(index - 50) % branchList.length] || 'random';
  const context = buildRecentQuestionContext(50);
  const startedAt = Date.now();
  try {
    const question = generateAIQuestion({ previousQuestionId, branchFilter, context });
    const validation = validateAIQuestionCase(question, context.recentSignatures, { context, requestedBranch: branchFilter });
    if (!validation.ok) validationFailures += 1;
    const signature = question.contentSignature || question.semanticFingerprint || question.dedupeKey;
    if (signature && seenSignatures.has(signature)) signatureRepeats += 1;
    if (signature) seenSignatures.add(signature);

    const optKey = optionOnlyKey(question);
    const previousSameOption = seenOptionOnly.get(optKey);
    let optionOnlyRepeat = false;
    if (previousSameOption) {
      const currentFp = buildQuestionFingerprint(question);
      const stemSimilarity = similarityScore(currentFp.stem, previousSameOption.stem);
      const questionSimilarity = similarityScore(currentFp.question, previousSameOption.question);
      optionOnlyRepeat = stemSimilarity >= 0.92 && questionSimilarity >= 0.92;
      if (optionOnlyRepeat) optionOnlyRepeats += 1;
    } else {
      seenOptionOnly.set(optKey, buildQuestionFingerprint(question));
    }

    for (const previous of results.filter((item) => item.ok)) {
      const currentFp = buildQuestionFingerprint(question);
      const sim = similarityScore(currentFp.combinedText, previous.fingerprint.combinedText);
      if (sim >= 0.985 && currentFp.correct === previous.fingerprint.correct) {
        tooSimilarRepeats += 1;
        break;
      }
    }

    const summary = question.aiMeta?.rejectionSummary || {};
    duplicateRejected += Object.entries(summary).reduce((total, [key, value]) => total + (/duplicate|embedded-case-overlap|yakın geçmiş/i.test(key) ? Number(value) || 0 : 0), 0);
    if (question.aiMeta?.repairAttempted) repairCount += 1;
    if (question.aiMeta?.fallbackUsed || /fallback|relaxed/i.test(question.aiMeta?.generationStage || '')) fallbackCount += 1;

    rememberAIQuestion(question);
    previousQuestionId = question.id;
    results.push({
      no: index + 1,
      ok: true,
      branchFilter,
      branch: question.relatedBranch || question.branchName,
      title: question.title,
      correct: question.diagnosis?.correct,
      stage: question.aiMeta?.generationStage,
      attempt: question.aiMeta?.generationAttempt,
      rejectedBeforeSuccess: question.aiMeta?.rejectedCandidatesBeforeSuccess || 0,
      signature,
      validationOk: validation.ok,
      validationErrors: validation.errors,
      ms: Date.now() - startedAt,
      fingerprint: buildQuestionFingerprint(question),
    });
  } catch (error) {
    errorStateCount += 1;
    results.push({
      no: index + 1,
      ok: false,
      branchFilter,
      error: error.message,
      generationErrors: (error.generationErrors || []).slice(-12),
      ms: Date.now() - startedAt,
    });
  }
}

const stageCounts = results.reduce((accumulator, item) => {
  const stage = item.stage || (item.ok ? 'unknown' : 'error');
  accumulator[stage] = (accumulator[stage] || 0) + 1;
  return accumulator;
}, {});

const report = {
  testName: 'AI question generation reliability and anti-repeat test',
  total: 100,
  sameBranchTests: 50,
  distributedBranchTests: 50,
  passed: results.filter((item) => item.ok).length,
  errorStateCount,
  validationFailures,
  uniqueContentSignatures: seenSignatures.size,
  signatureRepeats,
  optionOnlyRepeats,
  tooSimilarRepeats,
  duplicateRejected,
  repairCount,
  fallbackCount,
  stageCounts,
  averageMs: Math.round(results.reduce((sum, item) => sum + item.ms, 0) / results.length),
  results: results.map(({ fingerprint, ...rest }) => rest),
};
fs.writeFileSync('AI_QUESTION_GENERATION_100_RELIABILITY_REPORT.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (errorStateCount || validationFailures || signatureRepeats || optionOnlyRepeats || tooSimilarRepeats) process.exitCode = 1;
