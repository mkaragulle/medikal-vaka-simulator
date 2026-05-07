import { cases } from '../src/data/cases.js';
import { AI_QUESTION_SEEDS } from '../src/data/aiQuestionSeeds.js';
import { AI_BRANCH_TEMPLATE_SEEDS } from '../src/data/aiBranchQuestionTemplates.js';
import { AI_SYNTHETIC_FALLBACK_SEEDS } from '../src/data/aiSyntheticFallbackTemplates.js';
const bad = /Sınav incisi\s*[|:]|Ayırıcı nokta\s*:|Mekanizma\s*:|İlk adım\s*:|Karar verdirici ipucu\s*:|Destekleyici kanıt\s*:|Ana patern\s*:|Klinik yaklaşım\s*:|Olgu verisi\s*:|Ek destek\s*:|benzer seçenekleri ayıran ana patern|doğru seçenek verilen|soru patern yorumlama|klinik bağlam içinde|sonuçlar tek bir tanı adını yazmaz|öğrenci bu ayrımı|verilen öğrenme hedefi|ana karar tek öğrenme hedefine|wheezing|rash|tripod position|airway|sepsis workup|follow-up|\|/iu;
const skip = new Set(['id','branchId','imageUrl','sourceUrl','source','seedId','type','priority','caseType','spotCategory','correctAnswer','license']);
function walk(v, name, path=[], out=[]) {
  if (typeof v === 'string') {
    if (bad.test(v)) out.push({name,path:path.join('.'),text:v.slice(0,180)});
  } else if (Array.isArray(v)) v.forEach((x,i)=>walk(x,name,[...path,i],out));
  else if (v && typeof v==='object') Object.entries(v).forEach(([k,x])=>{ if(!skip.has(k)) walk(x,name,[...path,k],out); });
  return out;
}
const all = [ ['cases', cases], ['AI_QUESTION_SEEDS', AI_QUESTION_SEEDS], ['AI_BRANCH_TEMPLATE_SEEDS', AI_BRANCH_TEMPLATE_SEEDS], ['AI_SYNTHETIC_FALLBACK_SEEDS', AI_SYNTHETIC_FALLBACK_SEEDS] ];
const out = all.flatMap(([name,data])=>walk(data,name));
console.log(JSON.stringify({count: out.length, examples: out.slice(0,100)}, null, 2));
