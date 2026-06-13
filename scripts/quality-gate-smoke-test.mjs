import assert from 'node:assert/strict';
import {
  normalizeQuestionQualityFields,
  repairQuestionQualityIssues,
  runQuestionQualityGate,
} from '../server/lib/question-quality-gate.js';

const baseQuestion = {
  relatedBranch: 'İç Hastalıkları',
  difficulty: 'Orta',
  learningTarget: 'Hiponatreminin osmolaliteye göre sınıflanması',
  answerTarget: 'diagnosis',
  stem: 'Yetmiş yaşındaki kadın hasta iki gündür halsizlik, bulantı ve dikkat azalması nedeniyle acile getirilir. Öyküde tiazid kullanımı vardır. Muayenede mukozalar kuru, belirgin fokal nörolojik defisit yoktur.',
  compactVitals: [{ label: 'Kan basıncı', value: '105/70 mmHg' }, { label: 'Nabız', value: '96/dk' }],
  compactObjectiveData: [
    { label: 'Serum sodyum', value: '122 mEq/L' },
    { label: 'Serum osmolalitesi', value: 'Düşük' },
    { label: 'Glukoz', value: '96 mg/dL' },
  ],
  question: 'Bu olguda laboratuvar paternini en iyi açıklayan tanı hangisidir?',
  options: [
    { id: 'A', text: 'Hipotonik hiponatremi' },
    { id: 'B', text: 'Hipertonik hiponatremi' },
    { id: 'C', text: 'İzotonik psödohiponatremi' },
    { id: 'D', text: 'Hipernatremik dehidratasyon' },
    { id: 'E', text: 'Primer hiperkalemi' },
  ],
  correctAnswer: 'A',
  explanation: 'Hastada düşük serum sodyumuna düşük serum osmolalitesinin eşlik etmesi hipotonik hiponatremiyi destekler. Normal glukoz hipertonik hiponatremi lehine güçlü bir ozmotik neden olmadığını gösterir.',
  wrongOptionFeedback: {
    A: 'Hipotonik hiponatremi, bu olguda düşük sodyum ve düşük serum osmolalitesinin birlikte verilmesiyle en iyi desteklenen seçenektir.',
    B: 'Hipertonik hiponatremi belirgin hiperglisemi veya mannitol gibi ozmotik solütlerle beklenir; bu olguda glukoz normal ve osmolalite düşüktür.',
    C: 'İzotonik psödohiponatremide serum osmolalitesi genellikle normal kalır; burada osmolalitenin düşük verilmesi bu seçeneği zayıflatır.',
    D: 'Hipernatremik dehidratasyonda serum sodyumu yüksek beklenir; bu hastada sodyum 122 mEq/L olarak düşüktür.',
    E: 'Primer hiperkalemi potasyum yüksekliğiyle ilişkilidir; verilen objektif veriler sodyum-osmolalite paternini açıklamaktadır.',
  },
  evidenceChain: [
    'Serum sodyum 122 mEq/L olarak düşüktür.',
    'Serum osmolalitesi düşüktür.',
    'Glukoz normaldir.',
  ],
  examPearl: 'Hiponatremide ilk ayrım serum osmolalitesidir; düşük osmolalite gerçek hipotonik tabloyu destekler.',
};

function clone(overrides = {}) {
  return JSON.parse(JSON.stringify({ ...baseQuestion, ...overrides }));
}

function expectPass(question, label) {
  const result = runQuestionQualityGate(question);
  assert.equal(result.ok, true, `${label} should pass: ${result.errors.join('; ')}`);
  return result;
}

function expectFail(question, codeFragment, label) {
  const result = runQuestionQualityGate(question);
  assert.equal(result.ok, false, `${label} should fail`);
  assert.ok(
    result.errors.some((error) => error.includes(codeFragment)),
    `${label} should include ${codeFragment}, got: ${result.errors.join('; ')}`,
  );
  return result;
}

expectPass(baseQuestion, 'strong grounded question');

expectFail(clone({
  wrongOptionFeedback: {
    ...baseQuestion.wrongOptionFeedback,
    B: 'Bu seçenek klinik bağlamda öncelikli değildir.',
  },
}), 'option-feedback-placeholder-or-weak:B', 'placeholder feedback');

expectFail(clone({
  explanation: 'Hastada trombosit sayısının 18.000/mm³ olması immün trombositopeniyi destekler.',
}), 'explanation-to-stem-grounding:laboratory_data', 'explanation uses absent lab data');

expectFail(clone({
  correctAnswer: 'B',
  explanation: 'Bu olguda düşük sodyum ve düşük osmolalite hipotonik hiponatremiyi destekler; hipertonik hiponatremi seçilmez.',
  wrongOptionFeedback: {
    ...baseQuestion.wrongOptionFeedback,
    B: 'Hipertonik hiponatremi ozmotik solüt varlığında beklenir; bu olguda verilen veriler bunu desteklemez.',
  },
}), 'correct-option-feedback-contradicts-answer', 'wrong correct answer');

expectFail(clone({
  stem: 'Erişkin hasta halsizlik nedeniyle başvurur.',
  compactVitals: [],
  compactObjectiveData: [],
}), 'stem-sufficiency-failed', 'critical data missing');

expectFail(clone({
  difficulty: 'Zor',
  stem: 'Yetmiş yaşındaki hasta halsizlik nedeniyle değerlendirilir. Muayenede genel durum stabildir.',
  compactVitals: [],
  compactObjectiveData: [{ label: 'Serum sodyum', value: '122 mEq/L' }],
}), 'difficulty-hard-but-stem-data-thin', 'difficulty calibration');

expectFail(clone({
  explanation: 'Düşük sodyum ve düşük osmolalite hipotonik hiponatremiyi destekler...',
}), 'truncated-text', 'truncated text');

expectFail(clone({
  wrongOptionFeedback: {
    ...baseQuestion.wrongOptionFeedback,
    C: baseQuestion.wrongOptionFeedback.B,
  },
}), 'option-feedback-duplicated:B-C', 'duplicated feedback');

const normalized = normalizeQuestionQualityFields(clone({
  questionStem: '',
  correctOptionId: 'A',
  vitalSigns: [{ label: 'Ateş', value: '38.4 °C' }],
  laboratoryData: [{ label: 'CRP', value: '90 mg/L' }],
}));
assert.equal(normalized.correctAnswer, 'A', 'schema alias correctOptionId should map to correctAnswer');
assert.ok(normalized.compactVitals.length >= 1, 'vitalSigns should remain visible');
assert.ok(normalized.compactObjectiveData.some((item) => item.label === 'CRP'), 'laboratoryData should remain visible');

expectFail(clone({
  wrongOptionFeedback: {
    ...baseQuestion.wrongOptionFeedback,
    D: 'Bu nedenle uygun değildir.',
  },
}), 'option-feedback-placeholder-or-weak:D', 'empty eliminator phrase');

const punctuationRepairSource = clone({
  wrongOptionFeedback: {
    ...baseQuestion.wrongOptionFeedback,
    E: 'Primer hiperkalemi potasyum yüksekliğiyle ilişkilidir; verilen objektif veriler sodyum-osmolalite paternini açıklar',
  },
});
const punctuationGate = runQuestionQualityGate(punctuationRepairSource);
assert.equal(punctuationGate.decision, 'repair_required', 'missing feedback punctuation should be repairable');
const punctuationRepair = repairQuestionQualityIssues(punctuationRepairSource, punctuationGate);
assert.ok(punctuationRepair.applied.includes('feedback-punctuation:E'), 'feedback punctuation repair should be applied');
assert.equal(runQuestionQualityGate(punctuationRepair.question).ok, true, 'punctuation repair should make the question publishable');

const warningOnly = runQuestionQualityGate(clone({ learningTarget: '', answerTarget: '', diagnosisTarget: '' }));
assert.equal(warningOnly.ok, true, 'missing target metadata should be a warning, not a fallback trigger');
assert.ok(warningOnly.warnings.some((item) => item.includes('diagnosis-target-or-learning-objective-missing')), 'target warning should be reported');

console.log('quality-gate-smoke-test: ok');
