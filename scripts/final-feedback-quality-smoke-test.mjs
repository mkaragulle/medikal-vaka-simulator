import assert from 'node:assert/strict';
import { compactMaterialSources } from '../server/lib/ai-token-optimizer.js';
import {
  applyFinalFeedbackQualityGate,
  repairFinalFeedbackLocally,
  runFinalFeedbackQualityGate,
} from '../server/lib/final-feedback-quality-gate.js';

const validQuestion = {
  relatedBranch: 'Ic Hastaliklari',
  difficulty: 'Orta',
  learningTarget: 'Hiponatreminin osmolaliteye gore siniflanmasi',
  answerTarget: 'diagnosis',
  stem: 'Yetmis yasindaki kadin hasta iki gundur halsizlik, bulanti ve dikkat azalmasi nedeniyle acile getirilir. Oykude tiazid kullanimi vardir. Muayenede mukozalar kuru, belirgin fokal norolojik defisit yoktur.',
  compactVitals: [{ label: 'Kan basinci', value: '105/70 mmHg' }, { label: 'Nabiz', value: '96/dk' }],
  compactObjectiveData: [
    { label: 'Serum sodyum', value: '122 mEq/L' },
    { label: 'Serum osmolalitesi', value: 'Dusuk' },
    { label: 'Glukoz', value: '96 mg/dL' },
  ],
  question: 'Bu olguda laboratuvar paternini en iyi aciklayan tani hangisidir?',
  options: [
    { id: 'A', text: 'Hipotonik hiponatremi' },
    { id: 'B', text: 'Hipertonik hiponatremi' },
    { id: 'C', text: 'Izotonik pseudohiponatremi' },
    { id: 'D', text: 'Hipernatremik dehidratasyon' },
    { id: 'E', text: 'Primer hiperkalemi' },
  ],
  correctAnswer: 'A',
  explanation: 'Dusuk serum sodyumuna dusuk serum osmolalitesinin eslik etmesi hipotonik hiponatremiyi destekler. Normal glukoz, ek ozmotik solutla aciklanan farkli bir mekanizmanin bu kokte on planda olmadigini gosterir. Bu nedenle karar, sodyum dusuklugu ile osmolalite dusuklugunun birlikte yorumlanmasina dayanir.',
  optionFeedback: {
    A: 'Hipotonik hiponatremi, dusuk serum osmolalitesiyle birlikte gercek sodyum dusuklugunu temsil eder. Bu olguda serum sodyumunun 122 mEq/L ve osmolalitenin dusuk verilmesi dogru secenegi kokle dogrudan destekler.',
    B: 'Hipertonik hiponatremi genellikle belirgin hiperglisemi veya mannitol gibi ozmotik solut varliginda dusunulur. Bu olguda glukozun normal ve serum osmolalitesinin dusuk verilmesi hipertonik mekanizmayi geri planda birakir.',
    C: 'Izotonik pseudohiponatremi, olcum artefakti veya hiperlipidemi gibi durumlarda osmolalitenin genellikle normal kaldigi bir tablodur. Bu kokte osmolalitenin dusuk olmasi pseudohiponatremiden cok gercek hipotonik hiponatremiyi destekler.',
    D: 'Hipernatremik dehidratasyon, sodyumun yuksek oldugu ve su kaybinin baskin hale geldigi klinik paternle beklenir. Bu hastada sodyum 122 mEq/L olarak dusuk verildigi icin bu secenek mevcut laboratuvar paternini aciklamaz.',
    E: 'Primer hiperkalemi potasyum yuksekligi ve buna bagli elektrofizyolojik risklerle iliskili bir elektrolit bozuklugudur. Soruda karar verdiren veri sodyum ve osmolalite oldugundan primer hiperkalemi dogru klinik hedef degildir.',
  },
  evidenceChain: [
    'Serum sodyum 122 mEq/L olarak dusuktur.',
    'Serum osmolalitesi dusuktur.',
    'Glukoz normaldir.',
  ],
  examPearl: 'Hiponatremide ilk ayrim serum osmolalitesidir; dusuk osmolalite gercek hipotonik tabloyu destekler.',
};

function clone(overrides = {}) {
  return JSON.parse(JSON.stringify({ ...validQuestion, ...overrides }));
}

function expectFinalPass(question, label) {
  const result = runFinalFeedbackQualityGate(question);
  assert.equal(result.publishable, true, `${label} should pass: ${result.errors.join('; ')}`);
  return result;
}

function expectFinalFail(question, codeFragment, label) {
  const result = runFinalFeedbackQualityGate(question);
  assert.equal(result.publishable, false, `${label} should fail`);
  assert.ok(
    result.errors.some((error) => error.includes(codeFragment)),
    `${label} should include ${codeFragment}, got: ${result.errors.join('; ')}`,
  );
  return result;
}

expectFinalPass(validQuestion, 'strong final feedback question');

expectFinalFail(clone({
  optionFeedback: {
    ...validQuestion.optionFeedback,
    B: 'Oncelik tasimaz.',
  },
}), 'final-option-feedback-needs-two-sentences:B', 'surface feedback');

expectFinalFail(clone({
  optionFeedback: {
    ...validQuestion.optionFeedback,
    C: validQuestion.optionFeedback.B,
  },
}), 'final-option-feedback-duplicated:B-C', 'duplicated feedback');

expectFinalFail(clone({
  optionFeedback: {
    ...validQuestion.optionFeedback,
    B: 'Bu yanıt belirli bir tanı, test, tedavi veya mekanizma eksenini temsil eder. Kökte bu ekseni doğrudan güçlendiren özgül bulgu dizisi baskın değildir.',
  },
}), 'final-option-feedback-template:B', 'forbidden template feedback');

expectFinalFail(clone({
  optionFeedback: {
    ...validQuestion.optionFeedback,
    D: 'Bu olguda IgG ve IgA düşüklüğü ile aşı antikor yanıtının zayıf olması humoral immün yetmezliği destekler. Neisseria enfeksiyonları ve kompleman taraması da aynı bağışıklık ekseninde düşünülebilir.',
  },
}), 'final-feedback-cross-topic-contamination:humoral-immunodeficiency', 'cross-topic feedback contamination');

expectFinalFail(clone({
  explanation: 'Hastada trombosit sayisinin 18.000/mm3 olmasi immun trombositopeniyi destekler. Bu laboratuvar paterninde hiponatremi ana karar noktasi degildir.',
}), 'base-repairable:explanation-to-stem-grounding', 'absent lab grounding');

const broken = clone({
  optionFeedback: {
    ...validQuestion.optionFeedback,
    E: 'Da platelet yuksekligi primer hiperkalemiyi aciklamaz. Bu nedenle da kokte verilen sodyum-osmolalite paterni elektrolit hedefini hiponatremiye tasir.',
  },
});
const brokenGate = runFinalFeedbackQualityGate(broken);
assert.equal(brokenGate.publishable, false, 'broken Turkish should fail before local repair');
const repaired = repairFinalFeedbackLocally(broken, brokenGate);
assert.ok(repaired.applied.includes('final-feedback-language:E'), 'local language repair should be applied');
assert.match(repaired.question.optionFeedback.E, /trombosit/i, 'English medical term should be localized');
assert.doesNotMatch(repaired.question.optionFeedback.E, /\bDa\b/, 'orphan connector should be repaired');

const truncated = expectFinalFail(clone({
  explanation: 'Dusuk sodyum ve dusuk osmolalite hipotonik hiponatremiyi destekler...',
}), 'base-repairable:truncated-text', 'truncated explanation');
assert.equal(truncated.decision, 'repair_required', 'truncated output should trigger repair before cache/publish');

const applied = applyFinalFeedbackQualityGate(validQuestion);
assert.equal(applied.gate.publishable, true, 'apply helper should keep valid question publishable');

const longSource = Array.from({ length: 120 }, (_, index) => (
  index === 42
    ? 'Acil serviste gogus agrisi olan hastada inferior derivasyonlarda ST elevasyonu, V4R elevasyonu, hipotansiyon ve temiz akciger sag ventrikul infarktini dusundurur; nitrat preloadu azaltarak hipotansiyonu agirlastirabilir.'
    : `Genel arka plan cumlesi ${index}: bu bolum konunun tarihcesini ve tekrarlayan genel bilgilerini anlatir.`
)).join(' ');
const compacted = compactMaterialSources([{ cleanedExtractedText: longSource }], 900, { task: 'materialQuestions' });
assert.ok(compacted.length <= 980, 'task-aware compaction should respect source budget with section label overhead');
assert.match(compacted, /V4R|nitrat|hipotansiyon/i, 'task-aware compaction should keep critical clinical decision text');

console.log('final-feedback-quality-smoke-test: ok');
