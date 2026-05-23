import { rawCases } from './src/data/cases.js';
import { getGlossaryTerms, normalizeGlossaryText } from './src/utils/glossary.js';
const terms=getGlossaryTerms();
const aliases=[];
for (const t of terms){
  for(const a of (t.aliases||[t.term])){
    const n=normalizeGlossaryText(a);
    if(n.length>=4 && !['hasta','agri','ates','tani','tedavi','test','pozitif','negatif','normal'].includes(n)) aliases.push({n,term:t.term});
  }
}
aliases.sort((a,b)=>b.n.length-a.n.length);
function countMatches(text){
 const n=normalizeGlossaryText(text||''); if(!n) return 0;
 const used=new Set();
 for(const a of aliases){ if(n.includes(a.n)) used.add(a.term); if(used.size>=20) break;}
 return used.size;
}
const fields=[];
for(const c of rawCases){
 const add=(kind,text)=>fields.push({id:c.id, kind, count:countMatches(text), text:String(text||'')});
 add('title', c.title); add('chiefComplaint', c.chiefComplaint); add('stem', c.stem); add('question', c.question||c.diagnosis?.question); (c.exam||[]).forEach(t=>add('exam',t));
 (c.diagnosis?.options||[]).forEach(t=>add('option',t));
 add('explanation',c.diagnosis?.explanation||c.whyCorrect||'');
 const optComp=c.optionComparison||c.diagnosis?.optionComparison||c.answerFeedback?.optionComparison||{}; Object.entries(optComp).forEach(([k,v])=>{add('optionCompareOption',k); add('optionCompareText',v);});
 const ef=c.answerFeedback?.evidenceChain||c.evidenceChain||[]; ef.forEach(e=>add('evidence',e.text||e));
 (c.investigations||[]).forEach(i=>{ add('investigationLabel',i.label||i.title); add('investigationSummary',i.summary||i.result?.summary); add('investigationMeaning',i.clinicalMeaning||i.result?.interpretation); (i.rows||i.result?.rows||[]).flat().forEach(x=>add('investigationRow',x)); });
}
const byKind={}; for(const f of fields){ const o=byKind[f.kind] ||= {total:0, with:0, matches:0}; o.total++; if(f.count>0)o.with++; o.matches+=f.count;}
console.log('cases',rawCases.length,'terms',terms.length,'fields',fields.length);
for(const [k,o] of Object.entries(byKind).sort()){ console.log(k, o.with+'/'+o.total, 'avg', (o.matches/o.total).toFixed(2)); }
const worst=fields.filter(f=>f.text.length>20 && f.count===0).slice(0,10); console.log('zero samples'); worst.forEach(f=>console.log(f.kind, f.text.slice(0,100)));
