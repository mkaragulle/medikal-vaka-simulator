import {
  buildAISpotNarrativeStem,
  buildAISpotQuestionPrompt,
  getAISpotSupportDataGroups,
} from '../src/utils/aiSpotNarrative.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function countQuestions(text) {
  return (text.match(/\?/g) || []).length;
}

const hepatitisQuestion = {
  id: 'test-hepatitis-serology',
  caseType: 'ai-spot',
  branchId: 'tus-spot-olgular',
  title: 'Serolojik veri yorumu',
  relatedBranch: 'Enfeksiyon Hastalıkları',
  questionType: 'test',
  stem: 'Hafif sarılık, karın ağrısı ve yorgunluk şikayetleri ile başvuran hastada serolojik incelemede HBsAg pozitif, anti-HBs negatif, anti-HBc IgM pozitif, HBeAg negatif, anti-HBe pozitif ve HBV DNA 5.0 log IU/mL saptanıyor. Bu tablo en olası olarak aşağıdakilerden hangisi ile uyumludur?',
  question: 'Bu tablo en olası olarak aşağıdakilerden hangisi ile uyumludur?',
  diagnosis: { correct: 'Akut hepatit B enfeksiyonu' },
};

const hepatitisText = buildAISpotNarrativeStem(hepatitisQuestion).join(' ');
const hepatitisGroups = getAISpotSupportDataGroups(hepatitisQuestion);
assert(countQuestions(hepatitisText) === 0, 'Hepatit soru cümlesi sol metinde görünmemeli.');
assert(buildAISpotQuestionPrompt(hepatitisQuestion) === 'Bu tablo en olası olarak aşağıdakilerden hangisi ile uyumludur?', 'Hepatit soru cümlesi şıkların üzerindeki prompta taşınmalı.');
assert(!/HBsAg|Anti-HBs|Anti-HBc|HBeAg|HBV DNA/i.test(hepatitisText), 'Seroloji paneli ana metinden sağ destek veriye taşınmalı.');
assert(hepatitisGroups.some((group) => group.title === 'Serolojik veriler' && group.items.length >= 5), 'Seroloji grubu sağ destek veride olmalı.');

const necQuestion = {
  id: 'test-nec-support',
  caseType: 'ai-spot',
  branchId: 'tus-spot-olgular',
  title: 'Prematüre bebekte karın distansiyonu',
  relatedBranch: 'Çocuk Sağlığı ve Hastalıkları',
  questionType: 'diagnosis',
  stem: "28 gw'da doğmuş, 7 gün yaşındaki prematüre bebekte enteral beslenmenin artırılmasından sonra karın distansiyonu, beslenme intoleransı ve hafif rektal kanama gelişiyor. Vital bulgularda kan basıncı 68/42 mmHg, nabız 150/dk, solunum 55/dk, ateş 38.2 °C, SpO₂ %94 saptanıyor. Laboratuvar sonuçları: Lökosit 16.200/mm³, CRP 12 mg/L, pH 7.30. Abdominal görüntülemede barsak duvarında gaz görünümü bildiriliyor. Bu bebekte en olası tanı aşağıdakilerden hangisidir?",
  question: 'Bu bebekte en olası tanı aşağıdakilerden hangisidir?',
  diagnosis: { correct: 'Nekrotizan enterokolit' },
};

const necParagraphs = buildAISpotNarrativeStem(necQuestion);
const necText = necParagraphs.join(' ');
const necGroups = getAISpotSupportDataGroups(necQuestion);
assert(necParagraphs.length <= 2, 'NEC metni en fazla iki paragraf olmalı.');
assert(countQuestions(necText) === 0, 'NEC soru cümlesi sol metinde görünmemeli.');
assert(buildAISpotQuestionPrompt(necQuestion) === 'Bu bebekte en olası tanı aşağıdakilerden hangisidir?', 'NEC soru cümlesi şıkların üzerindeki prompta taşınmalı.');
assert(!/Vital bulgularda/i.test(necText), 'Yoğun vital listesi paragrafta kalmamalı.');
assert(!/Lökosit 16\.200|CRP 12|pH 7\.30/i.test(necText), 'Yoğun lab listesi paragrafta kalmamalı.');
assert(necGroups.some((group) => group.title === 'Vital bulgular' && group.items.length >= 3), 'Vital bulgular sağ destek panelinde olmalı.');
assert(necGroups.some((group) => group.title === 'Laboratuvar verileri' && group.items.length >= 3), 'Lab verileri sağ destek panelinde olmalı.');


const anaphylaxisQuestion = {
  id: 'test-anaphylaxis-prompt-placement',
  caseType: 'ai-spot',
  branchId: 'tus-spot-olgular',
  title: 'Acil serviste solunum sıkıntısı',
  relatedBranch: 'Acil Tıp',
  questionType: 'treatment',
  stem: '25 yaşında kadın, geçmişte alerjik reaksiyon öyküsü yok, anafilaksi ilk yaklaşımı nedeniyle Klinik değerlendirme. Düşük kan basıncı ve solunum sıkıntısı. Hızlı ilerleyen deri ve mukozal ödem. Bu hastada ilk yapılması gereken en uygun müdahale nedir?',
  diagnosis: { correct: 'İntramüsküler adrenalin' },
};
const anaphylaxisText = buildAISpotNarrativeStem(anaphylaxisQuestion).join(' ');
const anaphylaxisPrompt = buildAISpotQuestionPrompt(anaphylaxisQuestion);
assert(!/ilk yapılması gereken en uygun müdahale nedir/i.test(anaphylaxisText), 'Anafilaksi soru cümlesi sol metinden kaldırılmalı.');
assert(/ilk yapılması gereken en uygun müdahale nedir\?/i.test(anaphylaxisPrompt), 'Anafilaksi soru cümlesi şıkların üzerinde prompt olarak kalmalı.');

const report = {
  status: 'PASS',
  checks: [
    'Soru cümlesi sol metinden ayrılıp şıkların üstündeki tek prompt alanına taşındı',
    'Seroloji paneli ana metinden destek veri paneline taşındı',
    'Vital/lab verileri paragraf altında değil yan destek veri gruplarına hazırlandı',
    'Question callout AI spot ekranında tekrar açıldı; sol metinden duplicate soru kaldırıldı',
  ],
  examples: {
    hepatitisText,
    hepatitisGroups,
    necText,
    necGroups,
  },
};

console.log(JSON.stringify(report, null, 2));
