import fs from 'fs';
import { cases } from './src/data/cases.js';
import { TUS_PEARL_CARDS } from './src/data/tusPearlCards.js';
function collect(obj, path='', out=[]){
  if(obj==null) return out;
  if(typeof obj==='string') { if(obj.trim()) out.push({path, text: obj}); return out; }
  if(Array.isArray(obj)) { obj.forEach((v,i)=>collect(v, path+'['+i+']', out)); return out; }
  if(typeof obj==='object') { for(const [k,v] of Object.entries(obj)) collect(v, path?path+'.'+k:k, out); }
  return out;
}
const anatomyCases=cases.filter(c=>String(c.branchId).includes('anatomy')||String(c.relatedBranch||'').toLowerCase().includes('anatomi')||String(c.questionType||'').includes('anatomy')||String(c.answerTarget||'').includes('anatomy'));
const anatomyCards=TUS_PEARL_CARDS.filter(c=>c.branchId==='anatomy'||c.subject==='Anatomi');
let lines=[];
for(const c of anatomyCases){ for(const item of collect(c)) lines.push(`[CASE ${c.id}] ${item.path}: ${item.text.replace(/\n/g,' ')}`); }
for(const c of anatomyCards){ for(const item of collect(c)) lines.push(`[CARD ${c.id}] ${item.path}: ${item.text.replace(/\n/g,' ')}`); }
fs.writeFileSync('/mnt/data/anatomy_text_sources.txt', lines.join('\n'), 'utf8');
console.log(lines.length);
