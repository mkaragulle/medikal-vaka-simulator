import { cases } from './src/data/cases.js';
import { TUS_PEARL_TOPICS } from './src/data/tusPearlCards.js';
import { getGlossaryTerms, normalizeGlossaryText } from './src/utils/glossary.js';
import fs from 'fs';
const surgCases = cases.filter(c => (c.branchId||'').includes('general-surgery') || String(c.relatedBranch||'').toLowerCase().includes('genel cerrahi') || String(c.relatedBranch||'').toLowerCase().includes('general surgery'));
const surgCards = TUS_PEARL_TOPICS.filter(c => (c.branchId||'').includes('general-surgery') || String(c.subject||'').toLowerCase().includes('genel cerrahi') || String(c.relatedBranch||'').toLowerCase().includes('genel cerrahi'));
function collectStrings(obj, path='', out=[]){
 if (obj==null) return out;
 if (typeof obj === 'string') { if(obj.trim()) out.push({path, text: obj}); return out; }
 if (Array.isArray(obj)) { obj.forEach((v,i)=>collectStrings(v, `${path}[${i}]`, out)); return out; }
 if (typeof obj === 'object') { for (const [k,v] of Object.entries(obj)) collectStrings(v, path?`${path}.${k}`:k, out); }
 return out;
}
const textFields=[];
for (const c of surgCases) for (const s of collectStrings(c)) textFields.push({source:'case', id:c.id, title:c.title, field:s.path, text:s.text});
for (const c of surgCards) for (const s of collectStrings(c)) textFields.push({source:'tusPearlCards', id:c.topic||c.mainQuestion, title:c.topic, field:s.path, text:s.text});
const glossary = getGlossaryTerms();
const norms = new Set();
const entries = [];
for (const e of glossary){
 const vals=[e.term,e.normalizedTerm,e.TurkishName,e.EnglishName,...(Array.isArray(e.aliases)?e.aliases:[])].filter(Boolean);
 for(const v of vals) norms.add(normalizeGlossaryText(v));
 entries.push({id:e.id, term:e.term, aliases:e.aliases, norm: normalizeGlossaryText(e.term)});
}
fs.writeFileSync('./reports/general-surgery-source-fields-v405-pre.json', JSON.stringify({cases:surgCases.length,cards:surgCards.length,textFields:textFields.length, fields:textFields.slice(0,5)}, null,2));
fs.writeFileSync('./reports/general-surgery-text-fields-v405.json', JSON.stringify(textFields, null,2));
fs.writeFileSync('./reports/general-surgery-active-glossary-norms-v405.json', JSON.stringify({count: glossary.length, norms:[...norms], sample:entries.slice(0,10)}, null,2));
console.log(JSON.stringify({cases:surgCases.length,cards:surgCards.length,textFields:textFields.length,glossaryEntries:glossary.length,norms:norms.size}, null, 2));
