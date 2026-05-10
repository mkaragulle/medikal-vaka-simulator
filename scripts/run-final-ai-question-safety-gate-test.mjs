import assert from 'node:assert/strict';
import {
  applyFinalAIQuestionSafetyStandard,
  validateFinalAIQuestionSafetyGate,
  detectDoubleCorrectOptions,
  detectTruncatedText,
  normalizeEvidenceLabels,
  validateOptionCategoryConsistency,
} from '../src/utils/finalAIQuestionSafetyGate.js';

const baseQuestion = {
  id: 'fixture-final-safety-1',
  source: 'real-ai',
  caseType: 'ai-spot',
  title: 'Klinik karar sorusu',
  relatedBranch: 'TUS',
  difficulty: 'Orta',
  learningTarget: 'Tedavi önceliği ayrımı',
  answerTarget: 'first_life_saving_step',
  demographics: '34 yaşında kadın',
  setting: 'Acil servis',
  chiefComplaint: 'Ani kötüleşme',
  stem: '34 yaşındaki kadın hasta acil serviste ani klinik kötüleşme nedeniyle değerlendiriliyor. Muayenede solunum sıkıntısı ve dolaşım bozukluğu düşündüren bulgular saptanıyor. Objektif veriler acil müdahale gerektiren bir tabloyla uyumludur.',
  compactVitals: [{ label: 'TA', value: '78/46 mmHg' }, { label: 'SpO₂', value: '%89' }],
  compactObjectiveData: [{ label: 'Laktat', value: '4.8 mmol/L' }, { label: 'Laktat', value: '4.8 mmol/L — Anormal' }],
  findings: {
    history: ['Ani klinik kötüleşme nedeniyle acile başvuru'],
    exam: ['Solunum sıkıntısı ve zayıf periferik perfüzyon'],
    vitals: { TA: '78/46 mmHg', Nabız: '128/dk', Solunum: '30/dk', Ateş: '37.8 °C', 'SpO₂': '%89' },
    investigations: [],
  },
  question: 'En uygun yaklaşım hangisidir?',
  options: [
    { id: 'A', text: 'Hava yolu ve dolaşım stabilizasyonunu başlatmak' },
    { id: 'B', text: 'Semptomatik destek tedavisi eklemek' },
    { id: 'C', text: 'Uzun dönem izlem planlamak' },
    { id: 'D', text: 'Tek başına klinik gözlem kararı almak' },
    { id: 'E', text: 'Kontrendike olabilecek geciktirici yaklaşımı seçmek' },
  ],
  correctAnswer: 'A',
  optionClinicalRoles: { A: 'primary_correct', B: 'adjunct_correct_but_not_asked', C: 'later_step', D: 'later_step', E: 'contraindicated_or_harmful' },
  explanation: 'Solunum sıkıntısı ve dolaşım bozukluğu birlikte acil önceliği belirler. Bu nedenle doğru cevap budur. Bu nedenle doğru cevap budur.',
  wrongOptionFeedback: {
    A: 'Bu nedenle doğru cevap budur.',
    B: 'Farklı klinik tabloda uygun olabilir.',
    C: 'Olgudaki ana ipuçlarını tek başına açıklamaz.',
    D: 'Klinik bağlamda değerlendirilir.',
    E: 'Bu seçenek uygun değildir.',
  },
  evidenceChain: ['Kanıt 1: TA 78/46 mmHg', 'Kanıt 2: SpO₂ %89', 'Solunum sıkıntısı ve zayıf periferik perfüzyon'],
  examPearl: 'Bu nedenle doğru cevap budur.',
  managementSteps: ['Uygun destek tedaviler uygulanır.', 'Tedavi klinik yanıta göre düzenlenir.'],
};

const rawDoubleCorrect = detectDoubleCorrectOptions(baseQuestion);
assert.equal(rawDoubleCorrect.hasRisk, true, 'generic treatment stem with adjunct/later options must be ambiguous');

const repaired = applyFinalAIQuestionSafetyStandard(baseQuestion);
assert.notEqual(repaired.question, baseQuestion.question, 'generic question should be narrowed');
assert.equal(repaired.compactObjectiveData.length, 1, 'duplicate support data should be compacted');
assert.ok(repaired.semanticFingerprint, 'semantic fingerprint should be attached');
assert.ok(repaired.wrongOptionFeedback.B.includes('yardımcı') || repaired.wrongOptionFeedback.B.includes('ek rol'), 'adjunct option should be explained with nuance');
assert.ok(!/Farklı klinik tabloda uygun olabilir|Klinik bağlamda değerlendirilir|Bu nedenle doğru cevap budur/iu.test(JSON.stringify(repaired)), 'generic feedback phrases should be removed');
assert.ok(repaired.evidenceChain.every((item) => /^Veri: (Öykü|Muayene|Vital|Laboratuvar|Seroloji|Görüntüleme|EKG|Mikrobiyoloji|Mekanizma) — /u.test(item) && /Anlamı:/u.test(item)), 'evidence should use typed source-bound format');

const validation = validateFinalAIQuestionSafetyGate(repaired);
assert.equal(validation.ok, true, validation.errors.join('; '));
assert.equal(detectTruncatedText('Bu açıklama çünkü').truncated, true, 'broken ending should be detected');
assert.equal(detectTruncatedText('Tamamlanmış akademik cümle.').truncated, false, 'complete sentence should pass');
assert.equal(validateOptionCategoryConsistency(repaired.options).ok, true, 'option categories should be consistent after repair');
assert.ok(normalizeEvidenceLabels(['TA 78/46 mmHg'], repaired)[0].includes('Vital'), 'evidence label should be inferred from real clue');

console.log('FINAL_AI_QUESTION_SAFETY_GATE_TEST_PASS');
