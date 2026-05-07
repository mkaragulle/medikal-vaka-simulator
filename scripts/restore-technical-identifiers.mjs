import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const casesPath = path.join(root, 'src/data/cases.js');
const { cases } = await import(`${pathToFileURL(casesPath).href}?v=${Date.now()}`);
function techLower(value){ return String(value).replace(/^İ/u,'i').replace(/^I/u,'i').toLowerCase(); }
const technicalKeys = new Set(['id','branchId','caseId','sourceCaseId','seedId','sourceSeedId','topicSignature','contentSignature','generationSignature']);
function traverse(value, key=''){
  if (typeof value === 'string') {
    if (key === 'branchId') return techLower(value);
    if (technicalKeys.has(key)) {
      if (key === 'id' && /^[A-E]$/.test(value)) return value; // option id
      return techLower(value);
    }
    return value;
  }
  if (Array.isArray(value)) return value.map((item) => traverse(item, key));
  if (value && typeof value === 'object') {
    for (const k of Object.keys(value)) value[k] = traverse(value[k], k);
    return value;
  }
  return value;
}
const updated = traverse(structuredClone(cases));
fs.writeFileSync(casesPath, `export const cases = ${JSON.stringify(updated, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`);
console.log('restored identifiers');
