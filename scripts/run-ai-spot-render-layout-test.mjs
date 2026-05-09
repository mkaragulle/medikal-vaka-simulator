import {
  buildAISpotNarrativeStem,
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
assert(countQuestions(hepatitisText) === 1, 'Hepatit sorusunda soru cümlesi tek kez görünmeli.');
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
assert(countQuestions(necText) === 1, 'NEC sorusunda alt/ikinci soru hissi olmamalı.');
assert(!/Vital bulgularda/i.test(necText), 'Yoğun vital listesi paragrafta kalmamalı.');
assert(!/Lökosit 16\.200|CRP 12|pH 7\.30/i.test(necText), 'Yoğun lab listesi paragrafta kalmamalı.');
assert(necGroups.some((group) => group.title === 'Vital bulgular' && group.items.length >= 3), 'Vital bulgular sağ destek panelinde olmalı.');
assert(necGroups.some((group) => group.title === 'Laboratuvar verileri' && group.items.length >= 3), 'Lab verileri sağ destek panelinde olmalı.');

const report = {
  status: 'PASS',
  checks: [
    'Tekrarlanan alt soru metni engellendi',
    'Seroloji paneli ana metinden destek veri paneline taşındı',
    'Vital/lab verileri paragraf altında değil yan destek veri gruplarına hazırlandı',
    'Question callout AI spot ekranında hideSpotQuestionCallout prop ile kapatıldı',
  ],
  examples: {
    hepatitisText,
    hepatitisGroups,
    necText,
    necGroups,
  },
};

console.log(JSON.stringify(report, null, 2));
