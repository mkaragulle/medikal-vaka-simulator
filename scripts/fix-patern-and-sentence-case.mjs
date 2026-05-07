import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const technicalKeys = new Set(['id','branchId','source','seedId','contentSignature','imageUrl','sourceUrl','sourceName','license','type','priority','correctAnswer','caseType','spotCategory']);
function fixSentenceCase(text){
  return text.replace(/([.!?])\s+([a-zçğıöşü])/gu, (_, p, c) => `${p} ${c.toLocaleUpperCase('tr')}`);
}
function fixText(value, key=''){
  if(typeof value !== 'string' || technicalKeys.has(key)) return value;
  let t = value;
  t = t
    .replace(/\bpaternlerinden\b/giu, 'bulgu örüntülerinden')
    .replace(/\bpaternlerinin\b/giu, 'bulgu örüntülerinin')
    .replace(/\bpaternleri\b/giu, 'bulgu örüntüleri')
    .replace(/\bpaternini\b/giu, 'bulgu örüntüsünü')
    .replace(/\bpaterninin\b/giu, 'bulgu örüntüsünün')
    .replace(/\bpaterninde\b/giu, 'bulgu örüntüsünde')
    .replace(/\bpaternine\b/giu, 'bulgu örüntüsüne')
    .replace(/\bpaterniyle\b/giu, 'bulgu örüntüsüyle')
    .replace(/\bpaterni\b/giu, 'bulgu örüntüsü')
    .replace(/\bpaternle\b/giu, 'bulgu örüntüsüyle')
    .replace(/\bpaterndir\b/giu, 'bulgu örüntüsüdür')
    .replace(/\bpaternidir\b/giu, 'bulgu örüntüsüdür')
    .replace(/\bpatern\b/giu, 'bulgu örüntüsü')
    .replace(/\bKlinik bulgu örüntüsü\b/g, 'Klinik tablo')
    .replace(/\bklinik bulgu örüntüsü\b/g, 'klinik tablo')
    .replace(/\btemel bulgu örüntüsü\b/g, 'temel bulgu')
    .replace(/\bana bulgu örüntüsü\b/g, 'ana bulgu')
    .replace(/\bHAV IgM ve IgG bulgu örüntüsünün\b/g, 'HAV IgM ve IgG sonucunun')
    .replace(/\bseroloji bulgu örüntüsünün\b/g, 'seroloji sonucunun')
    .replace(/\bmetabolik asidoza solunumsal kompansasyonu DKA tanısının temel bulgu örüntüsüdür\b/g, 'metabolik asidoza solunumsal kompansasyonu gösterir ve DKA tanısını destekler')
    .replace(/\bkarar verdirici bulgu örüntüsü\b/g, 'karar verdirici bulgu')
    .replace(/\bdoğru yanıta götüren bulgu örüntüsü\b/g, 'doğru yanıta götüren bulgu')
    .replace(/\bHavlar tarzda öksürük ve ses kısıklığı krup bulgu örüntüsüdür\b/g, 'Havlar tarzda öksürük ve ses kısıklığı krup lehinedir')
    .replace(/\bbeş günlük ateş bulgu örüntüsüne uymaz\b/g, 'beş günlük ateş tablosuna uymaz')
    .replace(/\bani şiddetli ağrı ve akut batın bulgu örüntüsündedir\b/g, 'ani şiddetli ağrı ve akut batın bulgularıyla seyreder')
    .replace(/\bTipik alkaloz beklenmez\b/g, 'Tipik alkaloz beklenmez');
  t = fixSentenceCase(t);
  return t;
}
function walk(v,key='',stats={strings:0,changed:0}){
  if(typeof v==='string') {stats.strings++; const a=fixText(v,key); if(a!==v) stats.changed++; return a;}
  if(Array.isArray(v)) return v.map(x=>walk(x,key,stats));
  if(v&&typeof v==='object'){const o={}; for(const [k,x] of Object.entries(v)) o[k]=walk(x,k,stats); return o;}
  return v;
}
async function load(file){ return import(pathToFileURL(path.join(root,file)).href+`?t=${Date.now()}`); }
const stats={};
const files=[['src/data/cases.js','cases',true],['src/data/aiQuestionSeeds.js','AI_QUESTION_SEEDS'],['src/data/aiBranchQuestionTemplates.js','AI_BRANCH_TEMPLATE_SEEDS'],['src/data/aiSyntheticFallbackTemplates.js','AI_SYNTHETIC_FALLBACK_SEEDS']];
for(const [file, exportName, funcs] of files){
 const mod=await load(file); const st={strings:0,changed:0}; const arr=walk(mod[exportName],exportName,st); let extra='';
 if(funcs) extra=`\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
 fs.writeFileSync(path.join(root,file),`export const ${exportName} = ${JSON.stringify(arr,null,2)};\n${extra}`); stats[exportName]=st;
}
fs.writeFileSync(path.join(root,'EDITORIAL_PHRASING_SECOND_PASS.json'),JSON.stringify({generatedAt:new Date().toISOString(),stats},null,2));
console.log(JSON.stringify(stats,null,2));
