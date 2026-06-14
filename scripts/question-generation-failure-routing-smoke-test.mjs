import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import handler, {
  classifyTusValidationErrors,
  fallbackQuestion,
  questionMatchesRecent,
  repairTusQuestionForPublish,
} from '../api/generate-ai-question.js';
import { runFinalFeedbackQualityGate } from '../server/lib/final-feedback-quality-gate.js';
import { runQuestionQualityGate } from '../server/lib/question-quality-gate.js';
import { createAIQuestion } from '../src/services/aiQuestionService.js';

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

const grounding = classifyTusValidationErrors([
  'explanation-to-stem-grounding:laboratory_data',
]);
assert.equal(grounding.blockingErrors.length, 0, 'grounding mismatch should be repaired before safe fallback');
assert.equal(grounding.repairableErrors.length, 1, 'grounding mismatch should be repairable');
assert.ok(grounding.issues.some((issue) => issue.stage === 'medical_grounding'), 'grounding stage should be logged');

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

async function callTusHandler(body = {}) {
  const request = Readable.from([JSON.stringify(body)]);
  request.method = 'POST';
  return new Promise((resolve) => {
    const response = {
      statusCode: 200,
      headers: {},
      setHeader(key, value) { this.headers[key] = value; },
      end(payload) {
        resolve({ statusCode: this.statusCode, payload: JSON.parse(payload || '{}') });
      },
    };
    void handler(request, response);
  });
}

const originalLiveFlag = process.env.KLINIKIQ_LIVE_TUS_AI;
process.env.KLINIKIQ_LIVE_TUS_AI = 'false';
const disabledLiveResponse = await callTusHandler({ branchFilter: 'random', difficulty: 'Orta' });
if (originalLiveFlag === undefined) delete process.env.KLINIKIQ_LIVE_TUS_AI;
else process.env.KLINIKIQ_LIVE_TUS_AI = originalLiveFlag;
assert.equal(disabledLiveResponse.statusCode, 200, 'live AI disabled should still return a curated question');
assert.equal(disabledLiveResponse.payload.ok, true, 'live AI disabled fallback should be ok');
assert.ok(disabledLiveResponse.payload.question?.stem, 'curated fallback should include a visible stem');

const clientFallbackResponse = await createAIQuestion({ branchFilter: 'random', difficulty: 'Orta' });
assert.equal(clientFallbackResponse.ok, true, 'client should return a local question when remote endpoint is unavailable');
assert.equal(clientFallbackResponse.fallback, true, 'client unavailable remote path should be marked as fallback');
assert.ok(clientFallbackResponse.question?.stem, 'client fallback should include a visible stem');
for (const id of ['A', 'B', 'C', 'D', 'E']) {
  const feedback = clientFallbackResponse.question?.optionFeedback?.[id] || clientFallbackResponse.question?.wrongOptionFeedback?.[id] || '';
  assert.ok(feedback.split(/[.!?]/).filter(Boolean).length >= 2, `client fallback feedback ${id} should be instructional`);
}

const originalWindow = globalThis.window;
const originalFetch = globalThis.fetch;
globalThis.window = {
  setTimeout: globalThis.setTimeout,
  clearTimeout: globalThis.clearTimeout,
  localStorage: {
    getItem: () => null,
    setItem: () => undefined,
    removeItem: () => undefined,
  },
};
globalThis.fetch = async () => {
  throw new Error('simulated network failure');
};
try {
  const clientNetworkFailureResponse = await createAIQuestion({ branchFilter: 'random', difficulty: 'Orta' });
  assert.equal(clientNetworkFailureResponse.ok, true, 'client fetch failure should still return a local question');
  assert.equal(clientNetworkFailureResponse.fallback, true, 'client fetch failure should be marked as fallback');
  assert.ok(clientNetworkFailureResponse.question?.stem, 'client network fallback should include a visible stem');

  globalThis.fetch = async () => ({
    ok: false,
    status: 422,
    json: async () => ({ ok: false, manualReviewRequired: true, error: 'safe fallback failed quality gate' }),
  });
  const clientQualityRejection = await createAIQuestion({ branchFilter: 'random', difficulty: 'Orta' });
  assert.equal(clientQualityRejection.ok, false, 'server manual-review rejection should not be hidden by client fallback');
  assert.equal(clientQualityRejection.fallback, false, 'server manual-review rejection should not become local fallback');
} finally {
  if (originalWindow === undefined) delete globalThis.window;
  else globalThis.window = originalWindow;
  if (originalFetch === undefined) delete globalThis.fetch;
  else globalThis.fetch = originalFetch;
}

console.log('question-generation-failure-routing-smoke-test: ok');
