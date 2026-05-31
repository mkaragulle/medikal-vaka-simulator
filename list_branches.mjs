import { cases } from './src/data/cases.js';
const m={};
for(const c of cases){ const b=c.relatedBranch||c.branch||c.subject||'NONE'; m[b]=(m[b]||0)+1; }
console.log(Object.entries(m).sort((a,b)=>b[1]-a[1]).map(x=>x.join(': ')).join('\n'));
