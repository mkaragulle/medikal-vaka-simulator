import {
  buildAISpotNarrativeStem,
  getAISpotCompactObjectiveData,
  getAISpotCompactVitals,
} from '../src/utils/aiSpotNarrative.js';

const cases = [
  {
    name: 'Prematüre bebek / NEC okunabilirlik',
    question: {
      id: 'ai-spot-readability-nec',
      title: 'Prematüre bebekte ani karın şişliği',
      relatedBranch: 'Çocuk Sağlığı ve Hastalıkları',
      questionType: 'diagnosis',
      stem: "28 gw'da doğmuş, 7 gün yaşındaki prematüre bebekte ani karın şişliği, peristaltik seslerin azalması, hafif kanlı aspirasyon ve 2 gün önce başlayan formül sütü sonrası kusma görü.... Vital bulgularda kan basıncı 68/42 mmHg, nabız 150/dk, solunum 55/dk, ateş 38. 2 °C, SpO2 %94 saptanıyor. Fizik muayenede karın şişliği, peristaltik seslerde azalma, hafif rektal kan saptanıyor. Objektif değerlendirmede abdominal ultrasonografi: Lökosit 16. 200/mm³, referans 4.000-10.000/mm³, yüksek; CRP 12 mg/L, referans 0-5 mg/L, yüksek; pH 7.30, referans 7.35-7.45, düşük bildiriliyor.",
      question: 'Bu bebekte en olası tanı aşağıdakilerden hangisidir?',
      vitals: { TA: '68/42 mmHg', Nabız: '150/dk', Solunum: '55/dk', Ateş: '38.2 °C', 'SpO₂': '%94' },
      investigations: [{ rows: [['Lökosit', '16.200/mm³', '4.000-10.000/mm³', 'Yüksek'], ['CRP', '12 mg/L', '0-5 mg/L', 'Yüksek'], ['pH', '7.30', '7.35-7.45', 'Düşük']] }],
      diagnosis: { correct: 'Nekrotizan enterokolit' },
    },
    expectVitals: true,
    expectObjective: true,
  },
  {
    name: 'Mikrobiyoloji etken sorusu',
    question: {
      id: 'ai-spot-readability-micro',
      title: 'Dirençli bakteriyemi etkeni',
      relatedBranch: 'Tıbbi Mikrobiyoloji',
      questionType: 'test',
      stem: 'Daha önce çeşitli enfeksiyonlar nedeniyle çok sayıda antibiyotik tedavisi aldığı öğrenilen 65 yaşındaki kadın hasta, yüksek ateş ve titreme yakınmalarıyla hastaneye yatırılıyor. Hastadan alınan kan kültüründe oksidaz negatif, DNaz pozitif, non-fermenter gram negatif basil izole ediliyor. İn vitro duyarlılık testinde etkenin sefalosporinlere, karbapenemlere, aminoglikozitlere ve florokinolonlara dirençli, trimetoprim-sulfametoksazole duyarlı olduğu bildiriliyor.',
      question: 'Bu tabloya yol açması en olası bakteri aşağıdakilerden hangisidir?',
      vitals: { TA: 'Stabil', Nabız: 'Normal aralıkta', Solunum: 'Normal aralıkta', Ateş: 'Afebril', 'SpO₂': 'Normal' },
      diagnosis: { correct: 'Stenotrophomonas maltophilia' },
    },
    expectVitals: false,
    expectObjective: true,
  },
  {
    name: 'Acil yönetim vital kutusu',
    question: {
      id: 'ai-spot-readability-emergency',
      title: 'Acil serviste yaygın ürtiker ve hipotansiyon',
      relatedBranch: 'Acil Tıp',
      questionType: 'treatment',
      stem: 'Arı sokmasından kısa süre sonra yaygın ürtiker, dudaklarda şişlik ve nefes darlığı gelişen 24 yaşındaki hasta acil servise getiriliyor. Hasta hipotansif ve taşikardik görünümde, akciğer oskültasyonunda yaygın hışıltılı solunum duyuluyor.',
      question: 'Bu hastada ilk uygulanması gereken hayat kurtarıcı ilaç aşağıdakilerden hangisidir?',
      vitals: { TA: '80/50 mmHg', Nabız: '132/dk', Solunum: '30/dk', Ateş: '36.8 °C', 'SpO₂': '%91' },
      diagnosis: { correct: 'İntramüsküler adrenalin/epinefrin' },
    },
    expectVitals: true,
    expectObjective: false,
  },
];

const results = cases.map(({ name, question, expectVitals, expectObjective }) => {
  const paragraphs = buildAISpotNarrativeStem(question);
  const text = paragraphs.join(' ');
  const vitals = getAISpotCompactVitals(question);
  const objective = getAISpotCompactObjectiveData(question);
  const failures = [];
  if (/gw\b|görü\.\.\.|38\.\s+2|16\.\s+200|referans\s+4\.000/i.test(text)) failures.push('bozuk kısaltma/ölçüm/referans temizlenmedi');
  if (/Profil:|Risk bağlamı:|Ayırt ettirici ipuçları:|Objektif değerlendirmede:/i.test(text)) failures.push('legacy/objektif başlık sızıntısı var');
  if (expectVitals && vitals.length === 0) failures.push('beklenen vital kutusu oluşmadı');
  if (!expectVitals && vitals.length > 0) failures.push('gereksiz vital kutusu oluştu');
  if (expectObjective && objective.length === 0) failures.push('beklenen objektif veri kutusu oluşmadı');
  if (!expectObjective && objective.length > 0) failures.push('gereksiz objektif veri kutusu oluştu');
  return {
    name,
    ok: failures.length === 0,
    failures,
    paragraphCount: paragraphs.length,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    vitalsCount: vitals.length,
    objectiveCount: objective.length,
    preview: text,
  };
});

const failed = results.filter((item) => !item.ok);
console.log(JSON.stringify({ ok: failed.length === 0, results }, null, 2));
if (failed.length) process.exit(1);
