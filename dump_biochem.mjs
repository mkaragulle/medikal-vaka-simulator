import fs from 'fs';
import { rawCases } from './src/data/cases.js';
import { TUS_PEARL_TOPICS } from './src/data/tusPearlCards.js';
import { TUS_PEARL_MEDICAL_BIOCHEMISTRY_FIRST74_TEXT_OVERRIDES } from './src/data/tusPearlMedicalBiochemistryFirst74Overrides.js';
import { getGlossaryTerms, normalizeGlossaryText } from './src/utils/glossary.js';
function flat(obj, prefix='', out=[]){
 if(obj==null) return out;
 if(typeof obj==='string'){ if(obj.trim()) out.push({field:prefix, text:obj}); return out; }
 if(typeof obj==='number'||typeof obj==='boolean'){return out;}
 if(Array.isArray(obj)){ obj.forEach((v,i)=>flat(v,`${prefix}[${i}]`,out)); return out; }
 if(typeof obj==='object'){ for(const [k,v] of Object.entries(obj)){ flat(v, prefix?`${prefix}.${k}`:k,out);} }
 return out;
}
const cases=rawCases.filter(c=>c.branchId==='medical-biochemistry'||/Biyokimya|Biochemistry/i.test(c.relatedBranch||''));
const cards=TUS_PEARL_TOPICS.filter(t=>t.branchId==='medical-biochemistry'||/Biyokimya|Biochemistry/i.test(t.subject||''));
let sources=[];
for(const c of cases){ for(const item of flat(c)){ sources.push({sourceArea:'Medical Biochemistry Case', id:c.id, title:c.title, field:item.field, text:item.text}); } }
for(const t of cards){ for(const item of flat(t)){ sources.push({sourceArea:'Medical Biochemistry TUS Pearl Card', id:t.topic, title:t.topic, field:item.field, text:item.text}); } }
for(const [id,ov] of Object.entries(TUS_PEARL_MEDICAL_BIOCHEMISTRY_FIRST74_TEXT_OVERRIDES)){ for(const item of flat(ov)){ sources.push({sourceArea:'Medical Biochemistry Hap Card Override', id, title:id, field:item.field, text:item.text}); } }
const terms=getGlossaryTerms();
const exact=new Set();
for(const e of terms){ exact.add(normalizeGlossaryText(e.term)); for(const a of e.aliases||[]) exact.add(normalizeGlossaryText(a)); }
fs.writeFileSync('/mnt/data/biochemistry_sources_v398.json', JSON.stringify({caseCount:cases.length, cardCount:cards.length, overrideCount:Object.keys(TUS_PEARL_MEDICAL_BIOCHEMISTRY_FIRST74_TEXT_OVERRIDES).length, sourceCount:sources.length, sources, glossaryTerms:terms.length, exactTerms:Array.from(exact)}, null, 2));
console.log({caseCount:cases.length, cardCount:cards.length, overrideCount:Object.keys(TUS_PEARL_MEDICAL_BIOCHEMISTRY_FIRST74_TEXT_OVERRIDES).length, sourceCount:sources.length, glossaryTerms:terms.length, exactTerms:exact.size});
