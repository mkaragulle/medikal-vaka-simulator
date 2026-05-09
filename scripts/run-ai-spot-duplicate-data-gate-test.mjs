import fs from 'node:fs';
import {
  applyAISpotDuplicateDataGate,
  buildAISpotNarrativeStem,
  getAISpotSupportDataGroups,
} from '../src/utils/aiSpotNarrative.js';

const scenarios = [
  {
    name: 'SLE aktivite izlemi',
    rawNeedles: ['Laboratuvar:', 'ANA pozitif', 'anti-dsDNA 120', 'C3 düşük'],
    expectedLabels: ['ANA', 'Anti-dsDNA', 'C3'],
    question: {
      id: 'qa-sle-activity',
      relatedBranch: 'İç Hastalıkları',
      questionType: 'test',
      title: 'SLE aktivite izlemi',
      narrativeStem: 'Hastanın eklem ağrısı ve yüz döküntüsü 2 haftadır artmış, sabah tutukluğu 1 saat sürmekte. Fizik muayenede bilateral el bileklerinde şişlik ve sıcaklık artışı görülmekte. Laboratuvar: ANA pozitif, anti-dsDNA 120 IU/ml (norm <30), complement C3 düşük. Doktor, hastalığın aktivitesini izlemek için hangi ölçüt en uygundur?',
      question: 'Bu hastada hastalık aktivitesini izlemek için en uygun laboratuvar ölçütü hangisidir?',
    },
  },
  {
    name: 'Akut hepatit serolojisi',
    rawNeedles: ['Serolojide', 'HBsAg pozitif', 'anti-HBc IgM pozitif', 'HBV DNA 5.0'],
    expectedLabels: ['HBsAg', 'Anti-HBc IgM', 'HBV DNA'],
    question: {
      id: 'qa-hbv-serology',
      relatedBranch: 'Enfeksiyon Hastalıkları',
      questionType: 'diagnosis',
      title: 'Sarılık ve hepatit serolojisi',
      narrativeStem: 'Yirmi sekiz yaşındaki erkek hasta halsizlik ve sarılık yakınmasıyla başvurur. Serolojide HBsAg pozitif, anti-HBc IgM pozitif, HBV DNA 5.0 log IU/mL saptanıyor. Bu hastada en olası tanı hangisidir?',
      question: 'Bu hastada en olası tanı aşağıdakilerden hangisidir?',
    },
  },
  {
    name: 'Sepsis vital ve laboratuvar ayrımı',
    rawNeedles: ['Vital bulgularda', 'TA 68/42', 'lökosit 16.200', 'laktat 5.1', 'CRP 120'],
    expectedLabels: ['TA', 'Nabız', 'Ateş', 'lökosit', 'laktat', 'CRP'],
    question: {
      id: 'qa-sepsis-vitals',
      relatedBranch: 'Acil Tıp',
      questionType: 'treatment',
      title: 'Septik şokta ilk yaklaşım',
      narrativeStem: 'Yetmiş yaşındaki hasta ateş ve bilinç bulanıklığı ile acile getirilir. Vital bulgularda TA 68/42 mmHg, nabız 150/dk, ateş 38.2 °C saptanır. Laboratuvar: lökosit 16.200/mm³, laktat 5.1 mmol/L, CRP 120 mg/L. Bu hastada ilk yaklaşım hangisidir?',
      question: 'Bu hastada ilk yaklaşım aşağıdakilerden hangisidir?',
    },
  },
  {
    name: 'Hiperkalemi elektrolit ve EKG ayrımı',
    rawNeedles: ['Serum K+', '6.8 mEq/L', 'EKG’de', 'sivri T dalgaları'],
    expectedLabels: ['K⁺', 'EKG'],
    question: {
      id: 'qa-hyperkalemia-ecg',
      relatedBranch: 'İç Hastalıkları',
      questionType: 'treatment',
      title: 'Elektrolit bozukluğunda öncelik',
      narrativeStem: 'Spironolakton kullanan 45 yaşındaki erkek hasta halsizlik ve kas güçsüzlüğü ile başvurur. Serum K+ 6.8 mEq/L saptanır. EKG’de sivri T dalgaları ve QRS genişlemesi görülür. Bu hastada öncelikli tedavi hangisidir?',
      question: 'Bu hastada öncelikli tedavi aşağıdakilerden hangisidir?',
    },
  },
];

function flatLabels(groups) {
  return groups.flatMap((group) => group.items.map((item) => item.label));
}

function includesLoose(haystack, needle) {
  const norm = (value) => String(value || '')
    .toLocaleLowerCase('tr')
    .replace(/ıu\/ml/g, 'iu/ml')
    .replace(/[^a-z0-9çğıöşüµ⁺₂\/\.]+/giu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return norm(haystack).includes(norm(needle));
}

const results = scenarios.map((scenario) => {
  const gated = applyAISpotDuplicateDataGate(scenario.question);
  const groups = getAISpotSupportDataGroups(gated);
  const visibleStem = buildAISpotNarrativeStem(gated).join(' ');
  const labels = flatLabels(groups);
  const duplicateLeaks = scenario.rawNeedles.filter((needle) => includesLoose(visibleStem, needle));
  const missingLabels = scenario.expectedLabels.filter((label) => !labels.some((item) => includesLoose(item, label) || includesLoose(label, item)));
  return {
    name: scenario.name,
    ok: duplicateLeaks.length === 0 && missingLabels.length === 0,
    visibleStem,
    supportGroups: groups,
    duplicateLeaks,
    missingLabels,
  };
});

const ok = results.every((item) => item.ok);
const report = {
  ok,
  generatedAt: new Date().toISOString(),
  scenarioCount: results.length,
  passed: results.filter((item) => item.ok).length,
  failed: results.filter((item) => !item.ok).length,
  results,
};
fs.writeFileSync('AI_SPOT_DUPLICATE_DATA_GATE_TEST_REPORT.json', JSON.stringify(report, null, 2));
fs.writeFileSync('AI_SPOT_DUPLICATE_DATA_GATE_TEST_REPORT.md', [
  '# AI Spot Duplicate Data Gate Test',
  '',
  `Sonuç: ${ok ? 'Başarılı' : 'Başarısız'}`,
  `Senaryo: ${report.passed}/${report.scenarioCount}`,
  '',
  ...results.map((item) => `- ${item.ok ? '✅' : '❌'} ${item.name}: duplicate=${item.duplicateLeaks.join(', ') || 'yok'}; missing=${item.missingLabels.join(', ') || 'yok'}`),
  '',
].join('\n'));
if (!ok) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}
console.log(`AI Spot duplicate data gate passed ${report.passed}/${report.scenarioCount} scenarios.`);
