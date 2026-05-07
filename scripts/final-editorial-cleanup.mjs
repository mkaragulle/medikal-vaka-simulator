import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const technicalKeys = new Set(['id','branchId','source','seedId','contentSignature','imageUrl','sourceUrl','sourceName','license','type','priority','correctAnswer','caseType','spotCategory','slug','icon','color','accent']);
function fixPatern(t){
  return t
    .replace(/\bpaternlerinden\b/giu, 'bulgu örüntülerinden')
    .replace(/\bpaternlerinin\b/giu, 'bulgu örüntülerinin')
    .replace(/\bpaternlerinde\b/giu, 'bulgu örüntülerinde')
    .replace(/\bpaternlerinde\b/giu, 'bulgu örüntülerinde')
    .replace(/\bpaternlerinde\b/giu, 'bulgu örüntülerinde')
    .replace(/\bpaternleriyle\b/giu, 'bulgu örüntüleriyle')
    .replace(/\bpaternlerle\b/giu, 'bulgularla')
    .replace(/\bpaternleri\b/giu, 'bulgu örüntüleri')
    .replace(/\bpaterninden\b/giu, 'bulgu örüntüsünden')
    .replace(/\bpaterninin\b/giu, 'bulgu örüntüsünün')
    .replace(/\bpaternini\b/giu, 'bulgu örüntüsünü')
    .replace(/\bpaterninde\b/giu, 'bulgu örüntüsünde')
    .replace(/\bpaternine\b/giu, 'bulgu örüntüsüne')
    .replace(/\bpaternde\b/giu, 'bulgu örüntüsünde')
    .replace(/\bpaterniyle\b/giu, 'bulgu örüntüsüyle')
    .replace(/\bpaterni\b/giu, 'bulgu örüntüsü')
    .replace(/\bpaternle\b/giu, 'bulgu örüntüsüyle')
    .replace(/\bpaterndir\b/giu, 'bulgu örüntüsüdür')
    .replace(/\bpaternidir\b/giu, 'bulgu örüntüsüdür')
    .replace(/\bpaternyi\b/giu, 'bulgu örüntüsünü')
    .replace(/\bpaternnu\b/giu, 'bulgu örüntüsünü')
    .replace(/\bpaternni\b/giu, 'bulgu örüntüsünü')
    .replace(/\bpaternnda\b/giu, 'tabloda')
    .replace(/\bpatern\b/giu, 'bulgu örüntüsü');
}
function polishText(v,key=''){
 if(typeof v!=='string' || technicalKeys.has(key)) return v;
 let t=v;
 t=fixPatern(t);
 t=t
   .replace(/\bklinik bulgu örüntüsü\b/giu,'klinik tablo')
   .replace(/\bbu klinik bulgu örüntüsünü\b/giu,'bu klinik tabloyu')
   .replace(/\bbu klinik tabloyu destekler\b/giu,'bu klinik tabloyu destekler')
   .replace(/\bLaboratuvar bulgu örüntüsü\b/giu,'Laboratuvar bulguları')
   .replace(/\bElektrofizyolojik bulgu örüntüsü\b/giu,'Elektrofizyolojik bulgular')
   .replace(/\bAkut transmural miyokard hasarı bulgu örüntüsünü\b/giu,'Akut transmural miyokard hasarını')
   .replace(/\bReaktivasyon tüberkülozu bulgu örüntüsünü\b/giu,'Reaktivasyon tüberkülozunu')
   .replace(/\bMiyokardiyal nekroz bulgu örüntüsü\b/giu,'Miyokardiyal nekroz')
   .replace(/\bSınırlı kutanöz sistemik skleroz bulgu örüntüsü\b/giu,'Sınırlı kutanöz sistemik skleroz')
   .replace(/\bRomatoid artrit aktivitesini gösteren bulgu örüntüsü\b/giu,'Romatoid artrit aktivitesini gösteren bulgular')
   .replace(/\bklinik yorumda önemlidir\b/giu,'destekler')
   .replace(/\bgüçlü destekler\b/giu,'güçlü biçimde destekler')
   .replace(/\bobjektif olarak destekler\b/giu,'objektif olarak destekler')
   .replace(/\bbu klinik tabloyu destekler\b/giu,'bu klinik tabloyu destekler')
   .replace(/\bTanısal sınıflamayı destekler\b/giu,'Tanısal sınıflamayı netleştirir')
   .replace(/\bTakip planını destekler\b/giu,'Takip planını belirler')
   .replace(/\bToksidromu destekler\b/giu,'Toksidromu destekler')
   .replace(/\bBu klinik tabloda tanıyı esas olarak ([^.]+) destekler\.?/giu, 'Bu klinik tabloda tanı $1 ile desteklenir.')
   .replace(/\bKlinik yüzeyel dermal veya lenfatik enfeksiyon bulgu örüntüsündedir\.?/giu, 'Klinik tablo yüzeyel dermal veya lenfatik enfeksiyonu düşündürür.')
   .replace(/\bKlinik yüzeyel dermal ve lenfatik enfeksiyon bulgu örüntüsündedir\.?/giu, 'Klinik tablo yüzeyel dermal ve lenfatik enfeksiyonu düşündürür.')
   .replace(/\bDallanan bulgu örüntüsünde septalı hifalar görülür\.?/giu, 'Dallanan septalı hifalar görülür.')
   .replace(/\bEozinofil baskınlığı enfeksiyon dışı neonatal döküntü bulgu örüntülerinde görülebilir\.?/giu, 'Eozinofil baskınlığı enfeksiyon dışı neonatal döküntülerde görülebilir.')
   .replace(/\bPediatrik olguda tanı çoğu zaman yaşa özgü bulgularla konur\.?/giu, 'Pediatrik olguda tanı çoğu zaman yaşa özgü bulgularla desteklenir.')
   .replace(/\bKızıl hastalığında klinik döküntü bulgu örüntüsünden etkeni tanıma\.?/giu, 'Kızıl hastalığında döküntü özelliklerinden etkeni tanıma.')
   .replace(/\bHAV IgM ve IgG sonucunun akut enfeksiyon ile geçirilmiş bağışıklıktan ayrılması\b/giu, 'HAV IgM ve IgG sonuçlarıyla akut enfeksiyonun geçirilmiş bağışıklıktan ayrılması')
   .replace(/\bviral hepatit bulgu örüntülerini\b/giu, 'viral hepatit olasılıklarını')
   .replace(/\bOver torsiyonu ani şiddetli ağrı ve akut batın bulgu örüntüsündedir\.?/giu, 'Over torsiyonu ani şiddetli ağrı ve akut batın bulgularıyla seyreder.')
   .replace(/\bVentilasyon korunurken perfüzyon azalması yüksek V\/Q bulgu örüntüsüne yol açar\.?/giu, 'Ventilasyon korunurken perfüzyon azalması yüksek V/Q sonucuna yol açar.')
   .replace(/\bPE klinik kararını DVT kaynağı ve patolojik enfarkt bulgu örüntüleriyle ilişkilendir\.?/giu, 'Pulmoner emboli kararını DVT kaynağı ve patolojik enfarkt bulgularıyla ilişkilendir.')
   .replace(/\s+/g,' ')
   .replace(/\s+([,.;:!?])/g,'$1')
   .replace(/([.!?])\s+([a-zçğıöşü])/gu, (_,p,c)=>`${p} ${c.toLocaleUpperCase('tr')}`)
   .trim();
 return t;
}
function fixKey(k){ return technicalKeys.has(k) ? k : polishText(k); }
function walk(v,key='',stats={strings:0,changed:0,keys:0,keyChanged:0}){
 if(typeof v==='string'){stats.strings++; const a=polishText(v,key); if(a!==v) stats.changed++; return a;}
 if(Array.isArray(v)) return v.map(x=>walk(x,key,stats));
 if(v&&typeof v==='object'){
  const o={};
  for(const [k,x] of Object.entries(v)){
    stats.keys++; const nk=fixKey(k); if(nk!==k) stats.keyChanged++; o[nk]=walk(x,nk,stats);
  }
  return o;
 }
 return v;
}
async function load(file){return import(pathToFileURL(path.join(root,file)).href+`?t=${Date.now()}`)}
const files=[['src/data/cases.js','cases',true],['src/data/aiQuestionSeeds.js','AI_QUESTION_SEEDS'],['src/data/aiBranchQuestionTemplates.js','AI_BRANCH_TEMPLATE_SEEDS'],['src/data/aiSyntheticFallbackTemplates.js','AI_SYNTHETIC_FALLBACK_SEEDS'],['src/data/branches.js','branches']];
const stats={};
for(const [file,name,funcs] of files){
 const mod=await load(file); const st={strings:0,changed:0,keys:0,keyChanged:0}; const data=walk(mod[name],name,st);
 let extra=''; if(funcs) extra=`\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
 fs.writeFileSync(path.join(root,file),`export const ${name} = ${JSON.stringify(data,null,2)};\n${extra}`); stats[name]=st;
}
fs.writeFileSync(path.join(root,'EDITORIAL_FINAL_CLEANUP_RESULT.json'),JSON.stringify({generatedAt:new Date().toISOString(),stats},null,2));
console.log(JSON.stringify(stats,null,2));
