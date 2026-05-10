import { normalizeSimpleAIQuestion, isTooSimilarToRecent, createSimpleFallbackQuestion } from '../src/utils/simpleAIQuestionAdapter.js';

const sample = normalizeSimpleAIQuestion({
  title: 'Klinik karar yorumu',
  relatedBranch: 'İç Hastalıkları',
  difficulty: 'Orta',
  learningTarget: 'Tek karar noktasını yorumlama.',
  demographics: '45 yaş kadın',
  setting: 'Poliklinik',
  chiefComplaint: 'Halsizlik',
  stem: 'Kırk beş yaşında kadın hasta son haftalarda artan halsizlik nedeniyle değerlendirilir. Öyküde yeni başlayan bir yakınma tanımlanır. Muayene bulguları klinik karar için objektif verilerle birlikte yorumlanır.',
  question: 'Bu olguda en uygun seçenek hangisidir?',
  options: [
    { id: 'A', text: 'Birinci seçenek' },
    { id: 'B', text: 'İkinci seçenek' },
    { id: 'C', text: 'Üçüncü seçenek' },
    { id: 'D', text: 'Dördüncü seçenek' },
    { id: 'E', text: 'Beşinci seçenek' },
  ],
  correctAnswer: 'A',
  explanation: 'Olgudaki veriler birinci seçeneği destekler. Diğer seçenekler aynı karar düzeyini karşılamaz.',
  evidenceChain: ['Öykü bulgusu karar noktasını destekler.', 'Muayene bulgusu ayırıcı değerlendirmeye katkı sağlar.', 'Objektif veri seçenekleri karşılaştırmayı sağlar.'],
  examPearl: 'TUS sorularında soru kökünün hedeflediği karar düzeyi önce belirlenir.',
});

if (!sample.diagnosis?.correct) throw new Error('correct answer missing');
if (!sample.contentSignature) throw new Error('signature missing');
if (!isTooSimilarToRecent(sample, [{ title: sample.title }])) throw new Error('similarity check failed');
const fallback = createSimpleFallbackQuestion({ branchFilter: 'random', recentQuestionSummaries: [] });
if (!fallback.diagnosis?.options?.length) throw new Error('fallback failed');
console.log('simple-ai-pipeline-smoke-test PASS');
