
import { rawCases, cases, getCasesByBranch } from './src/data/cases.js';
const ids = new Set();
let dup=[];
for (const c of rawCases){ if(ids.has(c.id)) dup.push(c.id); ids.add(c.id); }
const newIds = [
'v323-gc-001-kunt-travmada-pankreas-govde-yaralanmasi',
'v323-gc-002-sol-kolon-kanserinde-stent-koprusu',
'v323-gc-003-kompanse-sirozda-soliter-karaciger-kitlesi',
'v323-gc-004-persistan-meme-basi-egzamasi',
'v323-gc-005-terminal-ileit-apse-darlik'
];
const badWords=['Bu seçenek için ayırt ettirici açıklama üretilemedi','Açıklama üretilemedi','Feedback bulunamadı','Bu seçenek için açıklama yok','Doğru.','Yanlış.','Uygun değildir.','Çeldiricidir.','Akla gelebilir.'];
let errors=[];
for(const id of newIds){
  const c=rawCases.find(x=>x.id===id);
  if(!c){errors.push('missing '+id); continue;}
  if(c.branchId!=='general-surgery') errors.push(id+' branch');
  if(!c.managementSequence || c.managementSequence.enabled!==false) errors.push(id+' managementSequence');
  if(c.useSyntheticInvestigationBank!==true || c.hideExamSignal!==true || c.shuffleOptions!==false) errors.push(id+' flags');
  const opts=c.diagnosis?.options || [];
  const fb=c.diagnosis?.optionFeedback || {};
  if(opts.length!==5) errors.push(id+' opts '+opts.length);
  if(Object.keys(fb).length!==5) errors.push(id+' fb count '+Object.keys(fb).length);
  if(!opts.includes(c.diagnosis?.correct)) errors.push(id+' correct not option');
  for(const o of opts){ if(!fb[o] || String(fb[o]).trim().length<80) errors.push(id+' feedback missing/short '+o); }
  const allText=JSON.stringify(c);
  for(const w of badWords){ if(allText.includes(w)) errors.push(id+' bad placeholder '+w); }
}
console.log(JSON.stringify({rawCases:rawCases.length,cases:cases.length,generalSurgery:getCasesByBranch('general-surgery').length,duplicates:dup,newIds,errors},null,2));
if(dup.length || errors.length) process.exit(1);
