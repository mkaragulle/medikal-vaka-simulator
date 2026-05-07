import { writeFileSync } from 'node:fs';
import { cases } from '../src/data/cases.js';
const replaceDeep=(node,rules)=>{if(typeof node==='string'){let v=node; for(const [re,rep] of rules)v=v.replace(re,rep); return v;} if(Array.isArray(node))return node.map(x=>replaceDeep(x,rules)); if(node&&typeof node==='object')Object.keys(node).forEach(k=>{node[k]=replaceDeep(node[k],rules)}); return node;};
replaceDeep(cases, [
  [/ALT yüksekliği ve safra taşı biliyer nedeni öne çıkarır/g, 'ALT 186 U/L yüksekliği ve safra taşı biliyer nedeni öne çıkarır'],
  [/Safra kesesi taşı ve ALT yüksekliği biliyer etiyolojiyi destekler/g, 'Safra kesesi taşı ve ALT 186 U/L yüksekliği biliyer etiyolojiyi destekler'],
  [/D-dimer yüksekliği ve BT pulmoner anjiyografide dolum defekti/g, 'D-dimer 2.400 ng/mL FEU yüksekliği ve BT pulmoner anjiyografide dolum defekti'],
  [/D-dimer yüksekliği\./g, 'D-dimer 2.400 ng/mL FEU düzeyi klinik olasılıkla birlikte destekleyicidir.'],
  [/Troponin yüksekliği\./g, 'Troponin I yüksekliği EKG ve klinikle birlikte miyokart hasarını destekler.'],
  [/AST\/ALT yüksekliği karaciğer etkilenmesini destekler/g, 'AST 88 U/L ve ALT 96 U/L yüksekliği karaciğer etkilenmesini destekler'],
]);
// Fix exact troponin and white cell units if any missed.
replaceDeep(cases, [[/ng\/mL ng\/L/g, 'ng/mL'], [/\/µL\/mm³/g, '/mm³'], [/1000–4800\/mm³/g, '1.000–4.800/mm³'], [/>1500\/mm³/g, '>1.500/mm³']]);
writeFileSync('src/data/cases.js', `export const cases = ${JSON.stringify(cases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`);
