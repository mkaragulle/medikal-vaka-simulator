import { cases } from './src/data/cases.js';
import { TUS_PEARL_CARDS } from './src/data/tusPearlCards.js';
import { TUS_PEARL_INTERNAL_MEDICINE_FIRST50_TEXT_OVERRIDES } from './src/data/tusPearlInternalMedicineFirst50Overrides.js';
import { TUS_PEARL_INTERNAL_MEDICINE_SECOND50_TEXT_OVERRIDES } from './src/data/tusPearlInternalMedicineSecond50Overrides.js';
import { TUS_PEARL_INTERNAL_MEDICINE_THIRD59_TEXT_OVERRIDES } from './src/data/tusPearlInternalMedicineThird59Overrides.js';
import { getGlossaryTerms, normalizeGlossaryText } from './src/utils/glossary.js';
import fs from 'node:fs';

function pushStrings(obj, base, out){
  if (obj == null) return;
  if (typeof obj === 'string') {
    const t = obj.replace(/\s+/g,' ').trim();
    if (t) out.push({path: base, text: t});
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v,i)=>pushStrings(v, `${base}[${i}]`, out));
    return;
  }
  if (typeof obj === 'object') {
    for (const [k,v] of Object.entries(obj)) {
      pushStrings(v, base ? `${base}.${k}` : k, out);
    }
  }
}

const internalCases = cases.filter(c => c.branch === 'internal-medicine' || c.relatedBranch === 'internal-medicine' || c.branchId === 'internal-medicine' || c.relatedBranches?.includes?.('internal-medicine') || c.category === 'İç Hastalıkları' || c.branchName === 'İç Hastalıkları');
const internalCards = TUS_PEARL_CARDS.filter(c => c.branch === 'internal-medicine' || c.relatedBranch === 'internal-medicine' || c.branchId === 'internal-medicine' || c.relatedBranches?.includes?.('internal-medicine') || c.category === 'İç Hastalıkları' || c.section === 'İç Hastalıkları');
const overrides = [
  ...Object.entries(TUS_PEARL_INTERNAL_MEDICINE_FIRST50_TEXT_OVERRIDES).map(([id,obj])=>({id,...obj, __overrideSet:'first50'})),
  ...Object.entries(TUS_PEARL_INTERNAL_MEDICINE_SECOND50_TEXT_OVERRIDES).map(([id,obj])=>({id,...obj, __overrideSet:'second50'})),
  ...Object.entries(TUS_PEARL_INTERNAL_MEDICINE_THIRD59_TEXT_OVERRIDES).map(([id,obj])=>({id,...obj, __overrideSet:'third59'})),
];
const texts=[];
for (const c of internalCases){ const arr=[]; pushStrings(c, `src/data/cases.js::${c.id||c.title}`, arr); texts.push(...arr.map(x=>({...x, sourceFilePath:'src/data/cases.js', sourceArea:'İç Hastalıkları', recordId:c.id||c.title, recordType:'clinicalCase'}))); }
for (const c of internalCards){ const arr=[]; pushStrings(c, `src/data/tusPearlCards.js::${c.id||c.title||c.front}`, arr); texts.push(...arr.map(x=>({...x, sourceFilePath:'src/data/tusPearlCards.js', sourceArea:'İç Hastalıkları', recordId:c.id||c.title||c.front, recordType:'tusPearlCard'}))); }
for (const c of overrides){ const arr=[]; pushStrings(c, `src/data/tusPearlInternalMedicine*Overrides.js::${c.id}`, arr); texts.push(...arr.map(x=>({...x, sourceFilePath:`src/data/tusPearlInternalMedicine${c.__overrideSet}Overrides.js`, sourceArea:'İç Hastalıkları', recordId:c.id, recordType:'hapCardOverride'}))); }
const glossary = getGlossaryTerms();
const norms = new Set();
for (const g of glossary){
  [g.term,g.canonicalTerm,g.displayTerm,g.normalizedTerm,...(g.aliases||[]),...(g.normalizedAliases||[])].filter(Boolean).forEach(v=>norms.add(normalizeGlossaryText(v)));
}
fs.mkdirSync('reports/internal_medicine_glossary_expansion',{recursive:true});
fs.writeFileSync('reports/internal_medicine_glossary_expansion/internal-medicine-text-fields-v403.json', JSON.stringify({counts:{internalCases:internalCases.length, internalCards:internalCards.length, overrides:overrides.length, textFields:texts.length, activeGlossaryTerms:glossary.length, activeGlossaryNorms:norms.size}, texts}, null, 2));
fs.writeFileSync('reports/internal_medicine_glossary_expansion/internal-medicine-active-glossary-norms-v403.json', JSON.stringify([...norms].sort(), null, 2));
console.log(JSON.stringify({internalCases:internalCases.length, internalCards:internalCards.length, overrides:overrides.length, textFields:texts.length, activeGlossaryTerms:glossary.length, activeGlossaryNorms:norms.size}, null, 2));
