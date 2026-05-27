import { rawCases } from './src/data/cases.js';
console.log(rawCases.length);
const counts={}; for(const c of rawCases) counts[c.caseType]=(counts[c.caseType]||0)+1; console.log(counts);
const standard=rawCases.filter(c=>c.caseType==='standard');
console.log('standard', standard.length);
const sample=standard[0]; console.log(Object.keys(sample));
