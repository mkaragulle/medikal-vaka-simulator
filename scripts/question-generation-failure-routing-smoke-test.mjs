import assert from 'node:assert/strict';
import {
  classifyTusValidationErrors,
  fallbackQuestion,
  questionMatchesRecent,
  repairTusQuestionForPublish,
} from '../api/generate-ai-question.js';
import { runFinalFeedbackQualityGate } from '../server/lib/final-feedback-quality-gate.js';
import { runQuestionQualityGate } from '../server/lib/question-quality-gate.js';

const language = classifyTusValidationErrors([
  'bozuk Türkçe veya makine çevirisi klinik ifade var',
]);
assert.equal(language.blockingErrors.length, 0, 'small TUS language issues should not be blocking');
assert.equal(language.repairableErrors.length, 1, 'TUS language issues should be repairable');
assert.ok(language.issues.some((issue) => issue.stage === 'tus_language'), 'TUS language stage should be logged');

const scientific = classifyTusValidationErrors([
  'imkansız veya bozuk klinik değer/ifade var',
]);
assert.equal(scientific.blockingErrors.length, 1, 'impossible clinical values should block');
assert.ok(scientific.issues.some((issue) => issue.stage === 'scientific_accuracy'), 'scientific stage should be logged');

const duplicate = classifyTusValidationErrors([
  'yakın geçmişte aynı öğrenme hedefi var',
]);
assert.equal(duplicate.blockingErrors.length, 0, 'repeat control should not be a hard failure');
assert.equal(duplicate.repairableErrors.length, 1, 'repeat control should trigger controlled regeneration');
assert.ok(duplicate.issues.some((issue) => issue.stage === 'repeat_control'), 'repeat stage should be logged');

const tokenOutput = classifyTusValidationErrors([
  'token/output incomplete: max_output_tokens',
  'model-json-parse-failed: Unexpected end of JSON input',
]);
assert.equal(tokenOutput.blockingErrors.length, 0, 'token/JSON truncation should not be treated as medical-quality blocking');
assert.equal(tokenOutput.repairableErrors.length, 2, 'token/JSON truncation should trigger repair/regeneration');
assert.ok(tokenOutput.issues.every((issue) => issue.stage === 'json_schema_or_token_output'), 'token/JSON stage should be logged separately');

const baseQuestion = {
  id: 'new-question',
  relatedBranch: 'İç Hastalıkları',
  learningTarget: 'Hiponatremide osmolalite yorumlama',
  answerTarget: 'diagnosis',
  stem: 'Yetmiş yaşındaki kadın hasta halsizlik ve dikkat azalması nedeniyle acile getirilir. Öyküde tiazid kullanımı vardır. Laboratuvarda serum sodyumu 122 mEq/L ve serum osmolalitesi düşüktür.',
  question: 'Bu olguda laboratuvar paternini en iyi açıklayan tanı hangisidir?',
  options: [
    { id: 'A', text: 'Hipotonik hiponatremi' },
    { id: 'B', text: 'Hipertonik hiponatremi' },
    { id: 'C', text: 'İzotonik psödohiponatremi' },
    { id: 'D', text: 'Hipernatremik dehidratasyon' },
    { id: 'E', text: 'Primer hiperkalemi' },
  ],
  correctAnswer: 'A',
};

const differentPatternRecent = [{
  id: 'recent-different-pattern',
  branch: 'İç Hastalıkları',
  learningTarget: 'Hiponatremide osmolalite yorumlama',
  correct: 'Hipotonik hiponatremi',
  stem: 'Genç erkek hasta maraton sonrası halsizlik yaşar. Bol su içmiştir; serum sodyumu düşüktür ancak seçenekler farklı volüm bozuklukları üzerinden sorgulanır.',
  optionTexts: ['Hipotonik hiponatremi', 'Primer adrenal yetmezlik', 'SIADH', 'Psikojenik polidipsi', 'Hipovolemik hiponatremi'],
}];

assert.equal(
  questionMatchesRecent(baseQuestion, differentPatternRecent),
  false,
  'same correct answer and learning target alone should not reject a different clinical pattern',
);

const samePatternRecent = [{
  id: 'recent-same-pattern',
  branch: 'İç Hastalıkları',
  learningTarget: 'Hiponatremide osmolalite yorumlama',
  correct: 'Hipotonik hiponatremi',
  stem: baseQuestion.stem,
  optionTexts: baseQuestion.options.map((item) => item.text),
}];

assert.equal(
  questionMatchesRecent(baseQuestion, samePatternRecent),
  true,
  'same stem pattern with same answer and option axis should still be blocked as a true duplicate',
);

const safeFallback = fallbackQuestion({
  branchFilter: 'İç Hastalıkları',
  difficulty: 'Orta',
  recentQuestionSummaries: [],
});
const fallbackPublisherGate = runQuestionQualityGate(safeFallback);
const fallbackFinalGate = runFinalFeedbackQualityGate(safeFallback);
assert.equal(fallbackPublisherGate.publishable, true, `safe fallback should pass publisher gate: ${fallbackPublisherGate.errors.join('; ')}`);
assert.equal(fallbackFinalGate.publishable, true, `safe fallback should pass final feedback gate: ${fallbackFinalGate.errors.join('; ')}`);

const shallowFeedbackQuestion = {
  ...baseQuestion,
  explanation: 'Hipotonik hiponatremi doğru cevaptır.',
  wrongOptionFeedback: {
    A: 'Doğrudur.',
    B: 'Uygun değildir.',
    C: 'Uygun değildir.',
    D: 'Uygun değildir.',
    E: 'Uygun değildir.',
  },
  optionFeedback: {
    A: 'Doğrudur.',
    B: 'Uygun değildir.',
    C: 'Uygun değildir.',
    D: 'Uygun değildir.',
    E: 'Uygun değildir.',
  },
};
const repaired = repairTusQuestionForPublish(shallowFeedbackQuestion, ['option-feedback-placeholder-or-weak:B']);
assert.equal(repaired.blocked, false, 'repair should preserve valid answer/options');
assert.ok(repaired.applied.includes('stem-explanation-feedback-evidence-rebuilt'), 'repair should rebuild stem/explanation/feedback');
const repairedPublisherGate = runQuestionQualityGate(repaired.question);
const repairedFinalGate = runFinalFeedbackQualityGate(repaired.question);
assert.equal(repairedPublisherGate.publishable, true, `repaired shallow question should pass publisher gate: ${repairedPublisherGate.errors.join('; ')}`);
assert.equal(repairedFinalGate.publishable, true, `repaired shallow question should pass final feedback gate: ${repairedFinalGate.errors.join('; ')}`);
assert.equal(repaired.question.correctAnswer, shallowFeedbackQuestion.correctAnswer, 'repair must preserve correct answer');

console.log('question-generation-failure-routing-smoke-test: ok');
