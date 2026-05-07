import { writeFileSync } from 'node:fs';
import { cases } from '../src/data/cases.js';
function clean(text){
  if(typeof text!=='string') return text;
  return text
    .replace(/okült skafoid kırığını/giu,'okült karpal kırık hattını')
    .replace(/skafoid kırığını/giu,'karpal kırık hattını')
    .replace(/terapötik hipotermi uygunluğunu destekler/giu,'nöroprotektif tedavi penceresi açısından kritik eşik oluşturur')
    .replace(/bu klinik paternnı/giu,'bu klinik paterni')
    .replace(/\bKarar verdirici objektif veri sağlar\b/g,'Objektif doğrulama verisi sağlar')
    .replace(/\bkarar verdirici objektif veri sağlar\b/g,'objektif doğrulama verisi sağlar')
    .replace(/\btanıyı destekler\b/giu,'klinik paternle birlikte yorumlanır')
    .replace(/\btanıyı doğrular\b/giu,'objektif doğrulama verisi sağlar')
    .replace(/\btanısını doğrular\b/giu,'objektif doğrulama verisi sağlar')
    .replace(/\btanı koydurur\b/giu,'karar verdirici objektif veri sağlar')
    .replace(/\bile uyumludur\b/giu,'paternini gösterir')
    .replace(/\bile uyumlu\b/giu,'paterninde')
    .replace(/\blehinedir\b/giu,'açısından anlamlıdır')
    .replace(/\blehine\b/giu,'açısından')
    .replace(/\bdestekler\b/giu,'klinik yorumda önemlidir')
    .replace(/\s+/g,' ')
    .replace(/\s+([,.;:!?])/g,'$1')
    .trim();
}
function walk(obj){
  if(Array.isArray(obj)) return obj.map(walk);
  if(obj && typeof obj==='object') { for(const k of Object.keys(obj)) obj[k]=walk(obj[k]); return obj; }
  return clean(obj);
}
for(const c of cases){
  if(c.investigations) c.investigations=walk(c.investigations);
}
const output = `export const cases = ${JSON.stringify(cases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
writeFileSync(new URL('../src/data/cases.js', import.meta.url), output, 'utf8');
