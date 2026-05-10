import assert from 'node:assert/strict';
import { applySingleBestAnswerStandard, validateSingleBestAnswerGate } from '../src/utils/singleBestAnswerGate.js';

const ambiguousTreatmentQuestion = {
  title: 'Klinik karar düzeyi ayrımı',
  relatedBranch: 'TUS Spot Olgular',
  learningTarget: 'Tek en iyi yanıt mantığı',
  demographics: 'Erişkin hasta',
  chiefComplaint: 'Akut başvuru',
  stem: 'Erişkin hasta akut başlangıçlı yakınma nedeniyle değerlendirilir. Muayene ve objektif veri paneli, hızlı klinik karar gerektiren bir tabloya işaret eder. Bulgular aynı anda destek tedavisi ve hedefe yönelik yaklaşım gerektirebilecek niteliktedir.',
  compactVitals: [{ label: 'Genel durum', value: 'Yakın izlem gerektiriyor' }],
  compactObjectiveData: [{ label: 'Objektif veri', value: 'Karar düzeyini daraltan pozitif bulgu' }],
  findings: { history: ['Akut başlangıç'], exam: ['Yakın izlem gerektiren muayene bulgusu'], vitals: {}, investigations: [] },
  question: 'En uygun tedavi hangisidir?',
  options: [
    { id: 'A', text: 'Hedefe yönelik özgül tedavi uygulamak' },
    { id: 'B', text: 'Oksijen desteği ve monitorizasyon sağlamak' },
    { id: 'C', text: 'Uzun dönem izlem planlamak' },
    { id: 'D', text: 'Farklı karar kategorisine ait test istemek' },
    { id: 'E', text: 'Yalnız gözlem yapmak' },
  ],
  correctAnswer: 'A',
  explanation: 'Objektif veri ve akut klinik bağlam birlikte değerlendirildiğinde doğru karar hedefe yönelik tedavi düzeyindedir.',
  wrongOptionFeedback: {
    A: 'Doğru.',
    B: 'Bu seçenek farklı klinik tabloda uygun olabilir.',
    C: 'Bu seçenek bazı klinik durumlarda gündeme gelebilir.',
    D: 'Olgudaki ana ipuçlarını tek başına açıklamaz.',
    E: 'Bu seçenek uygun değildir.',
  },
  evidenceChain: ['Kanıt 1', 'Objektif veri: karar düzeyini daraltır'],
  examPearl: 'Tek en iyi yanıt, soru kökünün hedeflediği karar düzeyine göre seçilir.',
  managementSteps: ['Destek ve hedefe yönelik yaklaşım ayrıştırılır.'],
};

const repaired = applySingleBestAnswerStandard(ambiguousTreatmentQuestion);
assert.notEqual(repaired.question, ambiguousTreatmentQuestion.question, 'generic question should be narrowed');
assert.ok(repaired.answerTarget, 'answerTarget must be attached');
assert.equal(repaired.optionClinicalRoles.A, 'primary_correct');
assert.equal(repaired.optionClinicalRoles.B, 'adjunct_correct_but_not_asked');
assert.ok(!/farklı klinik tabloda uygun olabilir/iu.test(repaired.wrongOptionFeedback.B), 'generic wrong feedback must be removed');
assert.ok(repaired.evidenceChain.every((item) => /^Veri:/iu.test(item) && /Anlamı:/iu.test(item)), 'evidence must use source-bound format');

const validation = validateSingleBestAnswerGate(repaired);
assert.equal(validation.ok, true, validation.errors.join('\n'));

const stillBad = validateSingleBestAnswerGate(ambiguousTreatmentQuestion);
assert.equal(stillBad.ok, false, 'unrepaired ambiguous item should fail');
assert.ok(stillBad.errors.some((error) => /dar|birlikte|jenerik/iu.test(error)), 'failure should mention ambiguity or generic feedback');

console.log(JSON.stringify({ ok: true, gate: validation.version, repairedQuestion: repaired.question, roles: repaired.optionClinicalRoles }, null, 2));
