import { rawCases, cases } from './src/data/cases.js';

function validateList(list, label) {
  const problems = [];
  const ids = new Set();
  for (const item of list) {
    if (!item?.id) problems.push(`${label}: missing id`);
    if (ids.has(item.id)) problems.push(`${label}: duplicate id ${item.id}`);
    ids.add(item.id);
    const options = item?.diagnosis?.options || [];
    if (!Array.isArray(options) || options.length !== 5) problems.push(`${label} ${item.id}: option count ${options.length}`);
    if (!options.includes(item?.diagnosis?.correct)) problems.push(`${label} ${item.id}: correct not in options`);
    if (item.shuffleOptions !== false) problems.push(`${label} ${item.id}: shuffleOptions not false`);
    const feedbackSources = [
      item?.diagnosis?.optionFeedback,
      item?.diagnosis?.optionComparison,
      item?.diagnosis?.optionRationales,
      item?.diagnosis?.feedbackByOption,
      item?.diagnosis?.answerFeedback?.optionFeedback,
      item?.diagnosis?.answerFeedback?.feedbackByOption,
      item?.diagnosis?.answerFeedback?.optionComparison,
    ].filter(Boolean);
    for (const option of options) {
      const feedback = feedbackSources.map(src => src?.[option]).find(Boolean);
      if (!String(feedback || '').trim()) problems.push(`${label} ${item.id}: missing feedback for ${option}`);
      if (String(feedback || '').includes('Bu seçenek için ayırt ettirici açıklama üretilemedi')) problems.push(`${label} ${item.id}: generic feedback for ${option}`);
    }
    const json = JSON.stringify(item);
    if (json.includes('[object Object]')) problems.push(`${label} ${item.id}: object object`);
    if (json.includes('Hasta öyküsü, fizik muayene ve objektif veriler birlikte değerlendirilerek en uygun klinik karar seçilir')) problems.push(`${label} ${item.id}: generic clinical focus`);
  }
  return problems;
}

const rawProblems = validateList(rawCases, 'raw');
const sanitizedProblems = validateList(cases, 'sanitized');
const counts = rawCases.reduce((acc, item) => {
  acc[item.relatedBranch] = (acc[item.relatedBranch] || 0) + 1;
  return acc;
}, {});
const branchIds = rawCases.reduce((acc, item) => {
  acc[item.branchId] = (acc[item.branchId] || 0) + 1;
  return acc;
}, {});
const newCases = rawCases.filter(c => c.id.startsWith('v185-new-'));
const newCounts = newCases.reduce((acc, item) => {
  acc[item.relatedBranch] = (acc[item.relatedBranch] || 0) + 1;
  return acc;
}, {});
if (rawProblems.length || sanitizedProblems.length) {
  console.error([...rawProblems, ...sanitizedProblems].join('\n'));
  process.exit(1);
}
console.log(JSON.stringify({ rawCases: rawCases.length, cases: cases.length, newCases: newCases.length, counts, branchIds, newCounts }, null, 2));
