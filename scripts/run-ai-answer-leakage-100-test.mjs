import { writeFileSync } from 'node:fs';
import { AI_QUESTION_SEEDS } from '../src/data/aiQuestionSeeds.js';
import { AI_BRANCH_TEMPLATE_SEEDS } from '../src/data/aiBranchQuestionTemplates.js';
import { AI_SYNTHETIC_FALLBACK_SEEDS } from '../src/data/aiSyntheticFallbackTemplates.js';
import { TUS_PEARL_AI_SEEDS } from '../src/data/tusPearlCards.js';
import { buildAIQuestionCase, buildCaseDerivedAISeeds } from '../src/utils/aiQuestionGenerator.js';
import { runAnswerLeakageGate } from '../src/utils/answerLeakageGate.js';

const TARGET = 100;
const seedPool = [
  ...AI_QUESTION_SEEDS,
  ...AI_BRANCH_TEMPLATE_SEEDS,
  ...AI_SYNTHETIC_FALLBACK_SEEDS,
  ...TUS_PEARL_AI_SEEDS,
  ...buildCaseDerivedAISeeds(),
].filter(Boolean);

const results = [];
let failures = 0;
let generationErrors = 0;

for (let index = 0; index < TARGET; index += 1) {
  const seed = seedPool[index % seedPool.length];
  try {
    const question = buildAIQuestionCase(seed, {
      source: 'qa-ai-answer-leakage-candidate-builder',
      attempt: index,
      context: { recentIds: [], recentSignatures: [], recentQuestionSummaries: [] },
      branchFilter: 'random',
    });
    const gate = runAnswerLeakageGate(question);
    if (!gate.ok) failures += 1;
    results.push({
      index: index + 1,
      seedId: seed.seedId,
      id: question.id,
      title: question.title,
      correct: question.diagnosis?.correct,
      checkedTextCount: gate.checkedTextCount,
      ok: gate.ok,
      errors: gate.errors,
      warnings: gate.warnings,
    });
  } catch (error) {
    generationErrors += 1;
    results.push({
      index: index + 1,
      seedId: seed?.seedId,
      ok: false,
      generationError: error?.message || String(error),
      generationErrors: error?.generationErrors || [],
    });
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  scope: 'local-ai-question-candidate-builder-with-quality-gate',
  targetCount: TARGET,
  generatedCount: results.filter((item) => !item.generationError).length,
  passedCount: results.filter((item) => item.ok && !item.generationError).length,
  leakageFailures: failures,
  generationErrors,
  pass: failures === 0 && generationErrors === 0,
  results,
};

writeFileSync('AI_ANSWER_LEAKAGE_100_TEST_REPORT.json', JSON.stringify(report, null, 2));
writeFileSync('AI_ANSWER_LEAKAGE_100_TEST_REPORT.md', [
  '# AI Answer Leakage 100 Test Report',
  '',
  `Generated at: ${report.generatedAt}`,
  `Scope: ${report.scope}`,
  `Target count: ${report.targetCount}`,
  `Generated count: ${report.generatedCount}`,
  `Passed count: ${report.passedCount}`,
  `Leakage failures: ${report.leakageFailures}`,
  `Generation errors: ${report.generationErrors}`,
  '',
  `Result: ${report.pass ? 'PASS' : 'FAIL'}`,
].join('\n'));

console.log(JSON.stringify({
  pass: report.pass,
  targetCount: report.targetCount,
  generatedCount: report.generatedCount,
  passedCount: report.passedCount,
  leakageFailures: report.leakageFailures,
  generationErrors: report.generationErrors,
}, null, 2));

if (!report.pass) process.exit(1);
