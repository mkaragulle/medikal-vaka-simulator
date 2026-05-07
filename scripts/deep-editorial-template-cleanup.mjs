import fs from 'node:fs';
import { cases } from '../src/data/cases.js';
import { AI_QUESTION_SEEDS } from '../src/data/aiQuestionSeeds.js';
import { AI_BRANCH_TEMPLATE_SEEDS } from '../src/data/aiBranchQuestionTemplates.js';
import { AI_SYNTHETIC_FALLBACK_SEEDS } from '../src/data/aiSyntheticFallbackTemplates.js';
import { branches } from '../src/data/branches.js';
const files = [
  ['src/data/cases.js','cases',cases],
  ['src/data/aiQuestionSeeds.js','AI_QUESTION_SEEDS',AI_QUESTION_SEEDS],
  ['src/data/aiBranchQuestionTemplates.js','AI_BRANCH_TEMPLATE_SEEDS',AI_BRANCH_TEMPLATE_SEEDS],
  ['src/data/aiSyntheticFallbackTemplates.js','AI_SYNTHETIC_FALLBACK_SEEDS',AI_SYNTHETIC_FALLBACK_SEEDS],
  ['src/data/branches.js','branches',branches],
];
const technicalKeys = new Set(['id','branchId','source','seedId','contentSignature','imageUrl','sourceUrl','sourceName','license','type','priority','correctAnswer','caseType','spotCategory','slug','icon','color','accent']);
let strings=0, changed=0;
function sentenceCaseAfterHowever(s){
  return s.replace(/Ancak\s+([A-ZÇĞİÖŞÜ])/g, (m,c)=>'Ancak '+c.toLocaleLowerCase('tr'));
}
function cleanText(v,key=''){
  if (typeof v !== 'string' || technicalKeys.has(key)) return v;
  let t=v, o=v;
  // Residual English or hybrid medical wording in visible content.
  t=t
    .replace(/\bmuffled voice\b/giu,'boğuk ses')
    .replace(/\bWheezing\b/gu,'Hışıltılı solunum')
    .replace(/\bwheezing\b/giu,'hışıltılı solunum')
    .replace(/\brash\b/giu,'döküntü')
    .replace(/\bairway\b/giu,'hava yolu')
    .replace(/\bscreening\b/giu,'tarama')
    .replace(/\bfollow[-\s]?up\b/giu,'izlem')
    .replace(/\bmanagement\b/giu,'yönetim')
    .replace(/\btrigger\b/giu,'tetikleyici')
    .replace(/\btarget\s+veya\s+pseudokidney\b/giu,'hedef veya psödoböbrek')
    .replace(/\btarget sign\b/giu,'hedef bulgusu')
    .replace(/\bpseudokidney\b/giu,'psödoböbrek')
    .replace(/\bNursemaid elbow\b/giu,'Radius başı subluksasyonu')
    .replace(/\bRelapsing ve remitting multipl skleroz\b/giu,'Ataklarla seyreden multipl skleroz')
    .replace(/\brelapsing-remitting multipl skleroz\b/giu,'ataklarla seyreden multipl skleroz')
    .replace(/\bRelapsing-remitting multipl skleroz\b/gu,'Ataklarla seyreden multipl skleroz');
  // Broken/generated learning outcome wording.
  t=t.replace(/Ana ipucunu \(([^.]+)\.?/giu, (m, clue)=>`Karar ${clue.trim()} bulgusuna dayanır.`);
  t=t.replace(/Ana ipucu ([^.]+?) bilgisidir\. Bu bilgi doğru sınav kararını destekler\./giu, (m, clue)=>`Karar ${clue.trim()} bilgisine dayanır.`);
  t=t.replace(/Ana ipucu ([^.]+?) bilgisidir\./giu, (m, clue)=>`Karar ${clue.trim()} bilgisine dayanır.`);
  // Template-like wrong option feedback.
  t=t.replace(/^(.+?) benzer başlıklarda düşünülebilir\. Ancak (.+?) bu olguda daha belirleyicidir\. Bu seçenek (.+?) için beklenen temel bulgunün önceliğini açıklamaz\.$/giu,
    (m,opt,clue)=>`${opt.trim()} bazı olgularda gündeme gelebilir. Ancak ${clue.trim()} bu olguda daha belirleyicidir. Bu nedenle bu seçenek öncelikli yanıt değildir.`);
  t=t.replace(/^(.+?) benzer başlıklarda düşünülebilir\. Ancak (.+?) bu olguda daha belirleyicidir\.$/giu,
    (m,opt,clue)=>`${opt.trim()} bazı olgularda gündeme gelebilir. Ancak ${clue.trim()} bu olguda daha belirleyicidir.`);
  // Repetitive final formula.
  t=t.replace(/Bu nedenle en uygun seçim ([^.]+?) olur\./giu, (m,ans)=>`Bu nedenle en uygun yanıt ${ans.trim()} seçeneğidir.`);
  t=t.replace(/Bu nedenle en iyi seçim ([^.]+?) olur\./giu, (m,ans)=>`Bu nedenle en uygun yanıt ${ans.trim()} seçeneğidir.`);
  // Specific option-pair and label normalization.
  const pairs = [
    ['Gansiklovir. Foskarnet','Gansiklovir ve foskarnet'],
    ['Asiklovir. Ribavirin','Asiklovir ve ribavirin'],
    ['Oseltamivir. Tenofovir','Oseltamivir ve tenofovir'],
    ['Famsiklovir. Valasiklovir','Famsiklovir ve valasiklovir'],
    ['Gansiklovir - Foskarnet','Gansiklovir ve foskarnet'],
    ['Asiklovir - Ribavirin','Asiklovir ve ribavirin'],
    ['Oseltamivir - Tenofovir','Oseltamivir ve tenofovir'],
    ['Famsiklovir - Valasiklovir','Famsiklovir ve valasiklovir'],
  ];
  for(const [a,b] of pairs) t=t.split(a).join(b);
  t=t.replace(/TUS spot İlerleyici gri cevher hastalığıdır metabolik yaklaşım sırası/giu,'TUS spot adrenolökodistrofi yaklaşım sırası');
  t=t.replace(/İlerleyici gri cevher hastalığıdır/g,'İlerleyici gri cevher tutulumu tipiktir');
  t=t.replace(/gri cevher hastalığı ifadesi/giu,'gri cevher tutulumu ifadesi');
  t=t.replace(/beyaz cevher hastalığı yapar/giu,'beyaz cevher tutulumu yapar');
  // Replace artificial wording with direct clinical wording.
  t=t.replace(/doğru sınav kararı/giu,'klinik karar');
  t=t.replace(/temel bulgunün/giu,'temel bulgunun');
  t=t.replace(/bulgunün/giu,'bulgunun');
  t=t.replace(/paternlerinden/giu,'bulgu örüntülerinden')
     .replace(/paternlerinin/giu,'bulgu örüntülerinin')
     .replace(/paternlerinde/giu,'bulgu örüntülerinde')
     .replace(/paternleriyle/giu,'bulgu örüntüleriyle')
     .replace(/paternleri/giu,'bulgu örüntüleri')
     .replace(/paterninden/giu,'bulgu örüntüsünden')
     .replace(/paterninin/giu,'bulgu örüntüsünün')
     .replace(/paternini/giu,'bulgu örüntüsünü')
     .replace(/paterninde/giu,'bulgu örüntüsünde')
     .replace(/paternine/giu,'bulgu örüntüsüne')
     .replace(/paterniyle/giu,'bulgu örüntüsüyle')
     .replace(/paterni/giu,'bulgu örüntüsü')
     .replace(/paternle/giu,'bulgu örüntüsüyle')
     .replace(/paterndir/giu,'bulgu örüntüsüdür')
     .replace(/\bpatern\b/giu,'bulgu örüntüsü');
  t=t.replace(/\bklinik bulgu örüntüsü\b/giu,'klinik tablo');
  t=t.replace(/\bseroloji bulgu örüntüsü\b/giu,'seroloji yorumu');
  t=t.replace(/\btetkik bulgu örüntüsü\b/giu,'tetkik yorumu');
  // Remove repeated labels and separators.
  t=t.replace(/^(Sınav incisi|Sınav bilgisi|Ayırt ettirici ipucu|Ayırıcı nokta|Klinik gerekçe|Kanıt zinciri|Yönetim|İlk yaklaşım|Klinik not)\s*[|:]\s*/iu,'');
  t=t.replace(/\s*\|\s*/g,' ');
  t=t.replace(/\s+([.,;:])/g,'$1').replace(/\s{2,}/g,' ').trim();
  t=sentenceCaseAfterHowever(t);
  if(t!==o){ changed++; }
  strings++;
  return t;
}
function walk(v,key=''){
  if (typeof v==='string') return cleanText(v,key);
  if (Array.isArray(v)) return v.map((x)=>walk(x,key));
  if (v && typeof v==='object') {
    const out={};
    for (const [k,val] of Object.entries(v)) out[k]=walk(val,k);
    return out;
  }
  return v;
}
for(const [file, exportName, data] of files){
  const next=walk(data);
  fs.writeFileSync(file, `export const ${exportName} = ${JSON.stringify(next,null,2)};\n`);
}
fs.writeFileSync('EDITORIAL_DEEP_TEMPLATE_CLEANUP_RESULT.json', JSON.stringify({generatedAt:new Date().toISOString(),strings,changed},null,2));
console.log({strings,changed});
