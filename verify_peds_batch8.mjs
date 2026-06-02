
import { rawCases, getCasesByBranch } from './src/data/cases.js';
const newIds = ["v224-peds-clinical-036-dogum-sonrasi-solunum-sikintisi-ve-cokuk-karin", "v224-peds-clinical-037-bas-kontrolu-gelismeyen-gevsek-bebek", "v224-peds-clinical-038-atesiz-kusma-ve-elektrolit-alkalozu", "v224-peds-clinical-039-yalniz-anne-sutu-alan-bebekte-gerileme", "v224-peds-clinical-040-beslenme-sonrasi-letarji-ve-ketonuri"];
const ids = rawCases.map(c => c.id);
const dup = ids.filter((id,i)=>ids.indexOf(id)!==i);
if (dup.length) throw new Error('Duplicate IDs: '+dup.join(','));
for (const id of newIds) {
  const c = rawCases.find(x=>x.id===id);
  if (!c) throw new Error('Missing '+id);
  if (c.branchId !== 'pediatrics' || c.relatedBranch !== 'Çocuk Sağlığı ve Hastalıkları') throw new Error('Bad branch '+id);
  if (!c.managementSequence || c.managementSequence.enabled !== false) throw new Error('Bad managementSequence '+id);
  if (c.useSyntheticInvestigationBank !== true || c.hideExamSignal !== true || c.shuffleOptions !== false) throw new Error('Bad flags '+id);
  if (!c.diagnosis || !c.diagnosis.options.includes(c.diagnosis.correct)) throw new Error('Correct not in options '+id);
  if (c.diagnosis.options.length !== 5) throw new Error('Options length '+id);
  if (!c.diagnosis.answerFeedback || Object.keys(c.diagnosis.answerFeedback).length !== 5) throw new Error('Feedback length '+id);
  if (!Array.isArray(c.investigations) || c.investigations.length < 3) throw new Error('Investigations '+id);
  if (!Array.isArray(c.evidenceChain) || c.evidenceChain.length < 3) throw new Error('Evidence '+id);
}
const peds = getCasesByBranch('pediatrics');
for (const id of newIds) if (!peds.some(c=>c.id===id)) throw new Error('Not visible in pediatrics '+id);
console.log(JSON.stringify({total: rawCases.length, peds: peds.length, added: newIds.length}, null, 2));
