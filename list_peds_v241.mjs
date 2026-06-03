import { rawCases, getCasesByBranch } from './src/data/cases.js';
const peds=getCasesByBranch('pediatrics');
console.log('raw', rawCases.length, 'peds', peds.length);
for (const c of peds) console.log(`${c.id}\t${c.title}\t${c.subtitle||''}\t${c.branchId||c.branch}\t${c.relatedBranch||''}`);
console.log('last10');
for (const c of peds.slice(-10)) console.log(JSON.stringify({id:c.id,title:c.title,subtitle:c.subtitle,correct:c.diagnosis?.correctAnswer||c.correctAnswer, options:c.diagnosis?.options||c.options},null,2));
