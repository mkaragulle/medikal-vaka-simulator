import { rawCases, cases } from './src/data/cases.js';
import { TUS_PEARL_TOPICS } from './src/data/tusPearlCards.js';
import { TUS_PEARL_SMALL_CLERKSHIPS_FIRST58_TEXT_OVERRIDES } from './src/data/tusPearlSmallClerkshipsFirst58Overrides.js';
import { getGlossaryTerms, normalizeGlossaryText } from './src/utils/glossary.js';
import fs from 'fs';
function collectStrings(obj, path='', out=[]){
 if (obj==null) return out;
 if (typeof obj==='string') { if(obj.trim()) out.push({field:path,text:obj}); return out;}
 if (Array.isArray(obj)) { obj.forEach((v,i)=>collectStrings(v, `${path}[${i}]`, out)); return out;}
 if (typeof obj==='object') { for (const [k,v] of Object.entries(obj)) collectStrings(v, path?`${path}.${k}`:k, out); return out;}
 return out;
}
const allCases=rawCases||cases;
const smallCases=allCases.filter(c=>String(c.relatedBranch||c.branch||'').includes('Küçük Stajlar') || String(c.branchId||'').includes('small'));
const cards=TUS_PEARL_TOPICS.filter(t=>String(t.relatedBranch||t.branch||t.subject||'').includes('Küçük') || String(t.branchId||'').includes('small') || String(t.id||'').includes('minor'));
const fields=[];
for(const c of smallCases){
 for(const s of collectStrings(c)) fields.push({source:'case', id:c.id, title:c.title||c.caseTitle||'', branch:c.relatedBranch||c.branch||'', field:s.field, text:s.text});
}
for(const t of cards){
 for(const s of collectStrings(t)) fields.push({source:'tusPearlCards', id:t.id||t.cardId||t.topic||'', title:t.topic||t.title||'', branch:t.subject||t.relatedBranch||'', field:s.field, text:s.text});
}
for(const [id, ov] of Object.entries(TUS_PEARL_SMALL_CLERKSHIPS_FIRST58_TEXT_OVERRIDES)){
 for(const s of collectStrings(ov)) fields.push({source:'tusPearlSmallClerkshipsFirst58Overrides', id, title:ov.topic||'', branch:'Küçük Stajlar', field:s.field, text:s.text});
}
const glossary=getGlossaryTerms();
const norms=[]; const set=new Set();
for(const e of glossary){ const vals=[e.term,e.normalizedTerm,e.TurkishName,e.EnglishName,...(Array.isArray(e.aliases)?e.aliases:[])].filter(Boolean); for(const v of vals){const n=normalizeGlossaryText(v); if(n&&!set.has(n)){set.add(n); norms.push(n)}}}
fs.mkdirSync('./reports/small_clerkships_glossary_expansion',{recursive:true});
fs.writeFileSync('./reports/small_clerkships_glossary_expansion/small-clerkships-text-fields-v407.json', JSON.stringify(fields,null,2));
fs.writeFileSync('./reports/small_clerkships_glossary_expansion/small-clerkships-active-glossary-norms-v407.json', JSON.stringify({glossaryCount:glossary.length,normCount:norms.length,norms},null,2));
console.log(JSON.stringify({cases:smallCases.length,cards:cards.length,overrides:Object.keys(TUS_PEARL_SMALL_CLERKSHIPS_FIRST58_TEXT_OVERRIDES).length,fields:fields.length,glossary:glossary.length,norms:norms.length},null,2));
