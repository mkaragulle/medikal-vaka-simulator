import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const __dirname=path.dirname(fileURLToPath(import.meta.url)); const root=path.resolve(__dirname,'..'); const casesPath=path.join(root,'src/data/cases.js');
const { cases } = await import(`${pathToFileURL(casesPath).href}?v=${Date.now()}`);
const labelKeys = new Set(['title','label','heading','name','shortDiagnosisMeta','diagnosisMeta','correctDiagnosis','spotCategory','difficulty','setting','demographics','profile','presentation']);
function traverse(value,key=''){
 if(typeof value==='string') return labelKeys.has(key) ? value.replace(/[.!?]+$/u,'').trim() : value;
 if(Array.isArray(value)) return value.map(v=>traverse(v,key));
 if(value&&typeof value==='object'){ for(const k of Object.keys(value)) value[k]=traverse(value[k],k); return value;}
 return value;
}
const updated=traverse(structuredClone(cases));
fs.writeFileSync(casesPath, `export const cases = ${JSON.stringify(updated, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`);
