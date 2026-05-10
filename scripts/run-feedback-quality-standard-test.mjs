import { applyFeedbackQualityStandardToQuestion, validateFeedbackQualityStandard } from '../src/utils/feedbackQualityStandard.js';

const candidate = {
  id: 'feedback-standard-test',
  source: 'real-ai',
  caseType: 'ai-spot',
  title: 'Nötr klinik karar başlığı',
  relatedBranch: 'Karma TUS spot',
  learningTarget: 'Tek karar ekseninde seçenekleri ayırt etmek',
  stem: 'Kısa klinik olguda başvuru, muayene ve objektif veri aynı karar ekseninde birlikte değerlendirilir.',
  question: 'Bu olguda en uygun seçenek hangisidir?',
  options: [
    { id: 'A', text: 'Birinci seçenek' },
    { id: 'B', text: 'İkinci seçenek' },
    { id: 'C', text: 'Üçüncü seçenek' },
    { id: 'D', text: 'Dördüncü seçenek' },
    { id: 'E', text: 'Beşinci seçenek' },
  ],
  correctAnswer: 'A',
  explanation: 'Klinik gerekçe: Doğru cevabı destekleyen ana ipucudur. Bu nedenle en iyi yanıt.',
  evidenceChain: ['Kanıt 1', 'Başvuru yakınması seçenek ayrımını başlatır', 'Muayene bulgusu klinik kararı güçlendirir', 'Objektif veri aynı eksende destek sağlar'],
  examPearl: 'Spot bilgi: Klinik bağlamda değerlendirilir.',
  managementSteps: ['İlk karar: Hastanın acil bulguları değerlendirilir.', 'Tedavi önceliği: Sonraki basamak planlanır.'],
  wrongOptionFeedback: {
    A: 'Doğru seçenek.',
    B: 'Bu seçenek farklı tabloda uygun olabilir.',
    C: 'Bazı klinik durumlarda gündeme gelebilir.',
    D: 'Ancak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır.',
    E: 'Klinik bağlamda değerlendirilir.',
  },
};

const repaired = applyFeedbackQualityStandardToQuestion(candidate);
const validation = validateFeedbackQualityStandard(repaired);

if (!validation.ok) {
  console.error(JSON.stringify({ ok: false, errors: validation.errors, repaired }, null, 2));
  process.exit(1);
}

const allText = JSON.stringify(repaired);
const forbidden = [/Kanıt\s*1/iu, /Klinik gerekçe:/iu, /farklı tabloda uygun olabilir/iu, /klinik bağlamda değerlendirilir/iu, /Tedavi önceliği/iu, /İlk karar/iu];
const leaked = forbidden.filter((pattern) => pattern.test(allText)).map(String);
if (leaked.length) {
  console.error(JSON.stringify({ ok: false, leaked, repaired }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  version: 'feedback-standard-v1.0-topic-agnostic',
  evidenceCount: repaired.evidenceChain.length,
  wrongFeedbackCount: Object.keys(repaired.wrongOptionFeedback).length,
}, null, 2));
