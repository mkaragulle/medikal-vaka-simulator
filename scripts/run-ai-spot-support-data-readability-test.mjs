import fs from 'node:fs';
import { getAISpotSupportDataGroups, applyAISpotDuplicateDataGate } from '../src/utils/aiSpotNarrative.js';

const question = applyAISpotDuplicateDataGate({
  id: 'qa-support-readability',
  relatedBranch: 'TUS',
  questionType: 'diagnosis',
  title: 'Nötr destek veri paneli',
  stem: 'Kısa klinik bağlam, objektif veriler ayrı panelde gösterilecek şekilde değerlendirilir.',
  compactObjectiveData: [
    { label: 'Serolojik veriler', value: 'Belirteç A: Pozitif — Anormal. Belirteç B: Düşük — Anormal.' },
    { label: 'Belirteç A', value: 'Pozitif — Anormal.' },
    { label: 'Belirteç B', value: 'Düşük — Anormal.' },
    { label: 'Görüntüleme', value: 'Uzun ama klinik olarak gerekli objektif radyolojik bulgu, yorum cümlesi olmadan verilmiştir.' },
  ],
  question: 'Bu olguda en uygun seçenek hangisidir?',
});

const groups = getAISpotSupportDataGroups(question);
const items = groups.flatMap((group) => group.items.map((item) => ({ group: group.title, ...item })));
const keys = items.map((item) => `${item.label.toLocaleLowerCase('tr')}|${item.value.toLocaleLowerCase('tr')}`);
const duplicateKeys = keys.filter((key, index) => keys.indexOf(key) !== index);
const clippedStatus = items.filter((item) => /—|–|\.\.\.|…|\banormal\b$/iu.test(`${item.label} ${item.value}`));
const css = fs.readFileSync('src/index.css', 'utf8');
const hasReadabilityOverride = /AI Spot support data readability guard/.test(css)
  && /text-overflow:\s*clip\s*!important/.test(css)
  && /white-space:\s*normal\s*!important/.test(css)
  && /overflow-wrap:\s*anywhere\s*!important/.test(css);

const ok = duplicateKeys.length === 0 && clippedStatus.length === 0 && hasReadabilityOverride;
const report = {
  ok,
  generatedAt: new Date().toISOString(),
  itemCount: items.length,
  items,
  duplicateKeys,
  clippedStatus,
  hasReadabilityOverride,
};
fs.writeFileSync('AI_SPOT_SUPPORT_DATA_READABILITY_TEST_REPORT.json', JSON.stringify(report, null, 2));
fs.writeFileSync('AI_SPOT_SUPPORT_DATA_READABILITY_TEST_REPORT.md', [
  '# AI Spot Support Data Readability Test',
  '',
  `Sonuç: ${ok ? 'Başarılı' : 'Başarısız'}`,
  `Madde sayısı: ${items.length}`,
  `Tekrar: ${duplicateKeys.length}`,
  `Kırpılmış/statü kırıntısı: ${clippedStatus.length}`,
  `CSS okunabilirlik koruması: ${hasReadabilityOverride ? 'var' : 'yok'}`,
  '',
].join('\n'));

if (!ok) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}
console.log(`AI Spot support data readability passed with ${items.length} normalized items.`);
