import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const casesPath = path.join(root, 'src/data/cases.js');
const { cases } = await import(`${pathToFileURL(casesPath).href}?v=${Date.now()}`);

function cleanText(s){
  return String(s)
    .replace(/Miyokard enfarktüsü şıkkı güçlü çeldirici olabilir/giu, 'Miyokard enfarktüsü şıkkı yanıltıcı olabilir')
    .replace(/Yanlış çeldiricileri/giu, 'Yanlış alternatifleri')
    .replace(/Kazeifikasyon çeldiricidir/giu, 'Kazeifikasyon sarkoidozdan çok tüberküloz lehine beklenir')
    .replace(/çeldiricilerine/giu, 'alternatiflerine')
    .replace(/çeldiricileri/giu, 'alternatifleri')
    .replace(/çeldiriciler/giu, 'alternatifler')
    .replace(/çeldiriciyi/giu, 'alternatifi')
    .replace(/çeldirici/giu, 'alternatif')
    .replace(/\s*;\s*/g, ' ve ')
    .replace(/\s+/g, ' ')
    .trim();
}
function traverse(value){
  if(typeof value==='string') return cleanText(value);
  if(Array.isArray(value)) return value.map(traverse);
  if(value && typeof value==='object'){
    const out={};
    for(const [k,v] of Object.entries(value)) out[cleanText(k)] = traverse(v);
    return out;
  }
  return value;
}
const updated = traverse(cases);
const content = `export const cases = ${JSON.stringify(updated, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync(casesPath, content);
const txt=fs.readFileSync(casesPath,'utf8');
console.log({celdirici:(txt.match(/çeldirici/giu)||[]).length, semicolon:(txt.match(/;/g)||[]).length, weak:(txt.match(/Karar verdirici ipucu|Destekleyici kanıt|Ayırt ettirici ipucu/giu)||[]).length});
