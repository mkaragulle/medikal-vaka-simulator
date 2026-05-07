import { generateAIQuestion } from '../src/utils/aiQuestionGenerator.js';
import { buildRecentQuestionContext, rememberAIQuestion, clearAIQuestionHistory, normalizeQuestionText } from '../src/utils/aiQuestionHistory.js';
import { cases } from '../src/data/cases.js';
import { makeOptionSetSignature, getQuestionOptionTexts } from '../src/utils/questionDeduplication.js';
import { validateBranchFit } from '../src/utils/aiBranchRules.js';
import { writeFileSync } from 'node:fs';


function createSeededRandom(seed) {
  let state = seed >>> 0;
  return function seededRandom() {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

Math.random = createSeededRandom(20260507);

const SAME_BRANCH = 'Çocuk Sağlığı ve Hastalıkları';
const DISTRIBUTED_BRANCHES = [
  'Tıbbi Mikrobiyoloji',
  'Tıbbi Farmakoloji',
  'Tıbbi Biyokimya',
  'İç Hastalıkları',
  'Çocuk Sağlığı ve Hastalıkları',
  'Kadın Hastalıkları ve Doğum',
  'Fizyoloji',
  'Histoloji ve Embriyoloji',
  'Anatomi',
  'Genel Cerrahi',
  'Küçük Stajlar',
  'Tıbbi Patoloji',
];

function isOnlyOptionOrderChange(current, previous) {
  if (!previous) return false;
  const sameOptions = makeOptionSetSignature(getQuestionOptionTexts(current)) === makeOptionSetSignature(getQuestionOptionTexts(previous));
  const sameCorrect = normalizeQuestionText(current.diagnosis?.correct || '') === normalizeQuestionText(previous.diagnosis?.correct || '');
  const sameStem = normalizeQuestionText(current.stem || '') === normalizeQuestionText(previous.stem || '');
  const sameQuestion = normalizeQuestionText(current.question || '') === normalizeQuestionText(previous.question || '');
  return current.id !== previous.id && sameOptions && sameCorrect && sameStem && sameQuestion;
}

function caseText(clinicalCase) {
  return normalizeQuestionText([
    clinicalCase.title,
    clinicalCase.scenario,
    clinicalCase.opening,
    clinicalCase.story,
    clinicalCase.summary,
    clinicalCase.diagnosis?.correct,
    ...(clinicalCase.diagnosis?.options || []),
  ].filter(Boolean).join(' '));
}

const embeddedCaseTexts = (cases || []).map((clinicalCase) => ({
  id: clinicalCase.id,
  text: caseText(clinicalCase),
}));

function hasExactEmbeddedCopy(question) {
  const qTitle = normalizeQuestionText(question.title || '');
  const qStem = normalizeQuestionText(question.stem || question.scenario || '');
  const qCorrect = normalizeQuestionText(question.diagnosis?.correct || '');
  return embeddedCaseTexts.some((clinicalCase) => (
    qTitle && qStem && qCorrect &&
    clinicalCase.text.includes(qTitle) &&
    clinicalCase.text.includes(qStem) &&
    clinicalCase.text.includes(qCorrect)
  ));
}

async function runBatch({ count, branchForIndex }) {
  const produced = [];
  const report = {
    requested: count,
    generated: 0,
    errors: 0,
    rejectedCandidates: 0,
    duplicateRejectedCandidates: 0,
    qualityRejectedCandidates: 0,
    repairUsed: 0,
    fallbackUsed: 0,
    embeddedExactCopies: 0,
    branchFailures: 0,
    repeatedContentSignatures: 0,
    onlyOptionOrderChanges: 0,
    maxGenerationMs: 0,
    averageGenerationMs: 0,
    stages: {},
    branches: {},
    errorDetails: [],
  };
  let previousQuestionId = null;
  let totalMs = 0;

  for (let index = 0; index < count; index += 1) {
    const branchFilter = branchForIndex(index);
    const context = buildRecentQuestionContext(30);
    const startedAt = Date.now();
    try {
      const question = generateAIQuestion({ previousQuestionId, branchFilter, context });
      const elapsedMs = Date.now() - startedAt;
      totalMs += elapsedMs;
      report.maxGenerationMs = Math.max(report.maxGenerationMs, elapsedMs);

      const branchFit = validateBranchFit(question, branchFilter);
      if (!branchFit.ok) report.branchFailures += 1;
      if (hasExactEmbeddedCopy(question)) report.embeddedExactCopies += 1;
      if (produced.some((item) => item.contentSignature === question.contentSignature)) report.repeatedContentSignatures += 1;
      if (produced.some((item) => isOnlyOptionOrderChange(question, item))) report.onlyOptionOrderChanges += 1;

      report.rejectedCandidates += question.aiMeta?.rejectedCandidateCount || 0;
      report.duplicateRejectedCandidates += question.aiMeta?.duplicateRejectedCandidateCount || 0;
      report.qualityRejectedCandidates += question.aiMeta?.qualityRejectedCandidateCount || 0;
      if ((question.aiMeta?.qualityGateRawErrors || []).length) report.repairUsed += 1;
      if (/fallback/i.test(question.aiMeta?.generationStage || question.source || '')) report.fallbackUsed += 1;

      const stage = question.aiMeta?.generationStage || 'unknown';
      report.stages[stage] = (report.stages[stage] || 0) + 1;
      report.branches[branchFilter] = (report.branches[branchFilter] || 0) + 1;
      produced.push(question);
      rememberAIQuestion(question);
      previousQuestionId = question.id;
      report.generated += 1;
    } catch (error) {
      report.errors += 1;
      report.errorDetails.push({
        index: index + 1,
        branchFilter,
        message: error.message,
        generationErrors: error.generationErrors || [],
      });
    }
  }

  report.averageGenerationMs = report.generated ? Math.round(totalMs / report.generated) : 0;
  return { report, produced };
}

clearAIQuestionHistory();
const sameBranch = await runBatch({ count: 50, branchForIndex: () => SAME_BRANCH });
clearAIQuestionHistory();
const distributed = await runBatch({ count: 50, branchForIndex: (index) => DISTRIBUTED_BRANCHES[index % DISTRIBUTED_BRANCHES.length] });

const combined = {
  generatedAt: new Date().toISOString(),
  methodology: '100 local AI-question generations: 50 in one branch and 50 distributed across branches. Each accepted question had passed the generator quality gate; this script additionally checks exact contentSignature repetition, option-order-only repetition, branch fit, exact embedded-case copy, error state, stage, repair/fallback usage and rejected-candidate counters recorded by the generator.',
  sameBranch: sameBranch.report,
  distributed: distributed.report,
  total: {
    requested: sameBranch.report.requested + distributed.report.requested,
    generated: sameBranch.report.generated + distributed.report.generated,
    errors: sameBranch.report.errors + distributed.report.errors,
    rejectedCandidates: sameBranch.report.rejectedCandidates + distributed.report.rejectedCandidates,
    duplicateRejectedCandidates: sameBranch.report.duplicateRejectedCandidates + distributed.report.duplicateRejectedCandidates,
    qualityRejectedCandidates: sameBranch.report.qualityRejectedCandidates + distributed.report.qualityRejectedCandidates,
    repairUsed: sameBranch.report.repairUsed + distributed.report.repairUsed,
    fallbackUsed: sameBranch.report.fallbackUsed + distributed.report.fallbackUsed,
    embeddedExactCopies: sameBranch.report.embeddedExactCopies + distributed.report.embeddedExactCopies,
    branchFailures: sameBranch.report.branchFailures + distributed.report.branchFailures,
    repeatedContentSignatures: sameBranch.report.repeatedContentSignatures + distributed.report.repeatedContentSignatures,
    onlyOptionOrderChanges: sameBranch.report.onlyOptionOrderChanges + distributed.report.onlyOptionOrderChanges,
    maxGenerationMs: Math.max(sameBranch.report.maxGenerationMs, distributed.report.maxGenerationMs),
    averageGenerationMs: Math.round(((sameBranch.report.averageGenerationMs * sameBranch.report.generated) + (distributed.report.averageGenerationMs * distributed.report.generated)) / Math.max(1, sameBranch.report.generated + distributed.report.generated)),
  },
  sample: [...sameBranch.produced.slice(0, 5), ...distributed.produced.slice(0, 5)].map((q) => ({
    id: q.id,
    branch: q.relatedBranch,
    title: q.title,
    questionType: q.questionType,
    correct: q.diagnosis?.correct,
    signature: q.contentSignature,
    stage: q.aiMeta?.generationStage,
    seed: q.aiMeta?.sourceSeedId,
  })),
};

writeFileSync('AI_QUESTION_GENERATION_RELIABILITY_100_TEST_REPORT.json', `${JSON.stringify(combined, null, 2)}\n`);
process.stderr.write(`AI reliability test completed: ${combined.total.generated}/${combined.total.requested} generated, errors=${combined.total.errors}, duplicateRejected=${combined.total.duplicateRejectedCandidates}, fallback=${combined.total.fallbackUsed}\n`);
process.reallyExit(0);
