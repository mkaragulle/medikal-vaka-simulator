
import { rawCases, cases } from './src/data/cases.js';
const problems=[];
for (const item of rawCases) {
  if (item.diagnosis?.options?.length !== 5) problems.push(item.id + ': option count');
  if (!item.diagnosis?.options?.includes(item.diagnosis?.correct)) problems.push(item.id + ': correct missing');
  if (item.shuffleOptions !== false) problems.push(item.id + ': shuffle true');
  if (JSON.stringify(item).includes('[object Object]')) problems.push(item.id + ': object');
}
const counts = rawCases.reduce((acc, c) => (acc[c.branchId]=(acc[c.branchId]||0)+1, acc), {});
console.log(JSON.stringify({ rawCases: rawCases.length, cases: cases.length, problems, counts }, null, 2));
