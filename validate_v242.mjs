
import { rawCases, getCasesByBranch, getCaseById } from './src/data/cases.js';
const ids = ['v242-peds-001-acik-diski-ve-koyu-idrar','v242-peds-002-kusma-halsizlik-ve-tuz-kaybi','v242-peds-003-mor-noktalar-ve-izole-trombosit-dusuklugu','v242-peds-004-yagli-diski-ve-islak-oksuruk','v242-peds-005-ilk-adetlerden-beri-yogun-kanama'];
const peds = getCasesByBranch('pediatrics');
console.log(JSON.stringify({ raw: rawCases.length, peds: peds.length, ids: ids.map(id => !!getCaseById(id)) }, null, 2));
const forbidden = ['ayırt ettirici açıklama üretilemedi','açıklama üretilemedi','feedback bulunamadı','Bu seçenek için açıklama yok','Doğru.','Yanlış.','çeldiricidir','akla gelebilir','uygun değildir'];
const allIds = new Set();
for (const c of rawCases) {
  if (allIds.has(c.id)) throw new Error('duplicate id ' + c.id);
  allIds.add(c.id);
}
for (const id of ids) {
  const c = getCaseById(id);
  if (!c) throw new Error('missing ' + id);
  if (c.branchId !== 'pediatrics') throw new Error('bad branch ' + id);
  if (c.relatedBranch !== 'Çocuk Sağlığı ve Hastalıkları') throw new Error('bad relatedBranch ' + id);
  if (c.useSyntheticInvestigationBank !== true || c.hideExamSignal !== true || c.shuffleOptions !== false) throw new Error('render flags ' + id);
  if (!c.managementSequence || c.managementSequence.enabled !== false) throw new Error('managementSequence ' + id);
  const opts = c.diagnosis?.options;
  const correct = c.diagnosis?.correct;
  const fb = c.diagnosis?.optionFeedback;
  if (!Array.isArray(opts) || opts.length !== 5) throw new Error('options length ' + id);
  if (!opts.includes(correct)) throw new Error('correct not in options ' + id);
  if (!fb || Object.keys(fb).length !== 5) throw new Error('feedback count ' + id);
  for (const opt of opts) {
    const txt = fb[opt];
    if (!txt || typeof txt !== 'string') throw new Error('missing feedback '+id+' '+opt);
    if ((txt.match(/[.!?]/g)||[]).length < 2) throw new Error('short feedback '+id+' '+opt);
    for (const bad of forbidden) if (txt.includes(bad)) throw new Error('forbidden '+bad+' in '+id);
  }
  const json = JSON.stringify(c);
  for (const bad of forbidden) if (json.includes(bad)) throw new Error('forbidden global '+bad+' in '+id);
}
