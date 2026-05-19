import fs from 'fs';
import { rawCases } from './src/data/cases.js';
const badRe=/odağına yönelik|lehine klinik bulgular araştırılır|Vital bulgular ve sistem muayenesi|Klinik karar,|Yakınmanın başlangıç|Klinik bağlama göre|Objektif sonuç|Hedef görüntüleme|Hedef laboratuvar|TUS spot olgu|Kısa olgu/i;
const branchRisk={
 'İç Hastalıkları':['Semptom süresi, vital bulgular ve organ etkilenimi birlikte okunarak aciliyet düzeyi belirlenir.','Hedef laboratuvar veya görüntüleme sonucu, öyküdeki ana yakınmayı klinik karara bağlar.'],
 'Çocuk Sağlığı ve Hastalıkları':['Çocuk hastada yaş, beslenme durumu, ateş süresi ve genel görünüm hastalığın ağırlığını belirler.','Muayene bulgusu ile seçilen tetkik sonucu birlikte değerlendirildiğinde tanısal yön netleşir.'],
 'Genel Cerrahi':['Ağrının başlangıcı, lokalizasyonu ve periton bulguları cerrahi aciliyetin temel belirleyicileridir.','Görüntüleme ve laboratuvar verileri ameliyat gereksinimi veya konservatif izlem kararını netleştirir.'],
 'Kadın Hastalıkları ve Doğum':['Gebelik durumu, kanama paterni, ağrı karakteri ve fetal/anne stabilitesi birlikte değerlendirilir.','Beta-hCG, ultrasonografi veya obstetrik muayene bulgusu tanısal kararın merkezindedir.'],
 'Küçük Stajlar':['Nörolojik, psikiyatrik, göz, KBB, deri veya ortopedik odak sistematik muayeneyle ayırt edilir.','Fokal muayene bulgusu, yatak başı test veya görüntüleme sonucu kararın yönünü belirler.'],
 'Tıbbi Mikrobiyoloji':['Maruziyet öyküsü, inkübasyon süresi ve klinik sendrom olası etkeni daraltır.','Kültür, seroloji, mikroskopi veya hızlı test sonucu etken seçimini destekler.'],
 'Tıbbi Biyokimya':['Klinik fenotip, metabolik kriz zamanı ve karakteristik laboratuvar paterni birlikte yorumlanır.','Amino asit, organik asit, elektrolit veya enzim göstergesi tanısal ipucunu verir.'],
 'Tıbbi Patoloji':['Morfolojik patern ve doku düzeyindeki hasar mekanizması tanısal ayrımı sağlar.','Histokimyasal, immünohistokimyasal veya mikroskobik bulgu patolojik tanıyı güçlendirir.'],
 'Tıbbi Farmakoloji':['İlaç maruziyeti, zamanlama ve toksisite bulgusu birlikte değerlendirilir.','Antidot veya tedavi seçimi toksidromun baskın fizyolojik etkisine göre belirlenir.'],
 'Anatomi':['Yakınmanın dağılımı, cerrahi/travma ilişkisi ve muayene bulgusu anatomik yapıyı lokalize eder.','Motor, duyu veya landmark bulgusu doğru sinir-damar ilişkisiyle eşleştirilmelidir.'],
 'Fizyoloji':['Uyarı ve kompansatuvar yanıt arasındaki ilişki fizyolojik mekanizmayı gösterir.','Ölçülen parametre, mekanizmanın yönünü ve hangi sistemin baskın çalıştığını ayırt ettirir.'],
 'Histoloji ve Embriyoloji':['Klinik bulgu, embriyolojik köken veya doku hücresiyle ilişkilendirilerek yorumlanır.','Mikroskobik yapı, gelişimsel mekanizma veya hücre tipi tanı için belirleyicidir.'],
 'TUS Spot Olgular':['Yaşamı tehdit eden bulgu varsa ilk karar tanısal kesinleşmeden önce güvenli basamakla verilir.','Öykü, muayene ve seçilmiş tetkik sonucu tek bir öncelikli tanı veya yaklaşımı desteklemelidir.']
};
const specialRisk={
 'Uzamış ateş ve koroner tutulum riski':['Kawasaki hastalığında tedavi gecikirse koroner arter anevrizması riski artar.','Ateşin beş günden uzun sürmesi ve mukokutanöz bulguların birlikte olması IVIG ile erken tedaviyi öncelikli kılar.'],
 'Travma hastasında ilk basamak':['Travmada ilk değerlendirme tanıdan önce yaşamı tehdit eden hava yolu, solunum ve dolaşım sorunlarını bulmaya yöneliktir.','ABC yaklaşımı atlanırsa görüntüleme veya ayrıntılı öykü hayat kurtarıcı müdahaleyi geciktirebilir.'],
 'Hipotansiyon ve juguler venöz dolgunluk':['Hipotansiyon, juguler venöz dolgunluk ve kalp seslerinin derinden duyulması obstrüktif şok düşündürür.','Yatak başı ekokardiyografi tamponad kararını hızla doğrulayarak perikardiyosentez gereksinimini belirler.'],
 'Ortopne ve yaygın rallerle gelen dispne':['Ani dispne, ortopne ve yaygın raller sol kalp kaynaklı pulmoner konjesyonu düşündürür.','Oksijenasyon, kan basıncı ve akciğer grafisi başlangıç tedavisinin hızını belirler.'],
 'Baskı tarzında göğüs ağrısı ve anterior derivasyon değişiklikleri':['Sol kola yayılan baskı tarzı ağrı ve komşu derivasyonlarda ST elevasyonu akut koroner oklüzyon düşündürür.','Reperfüzyon kararı troponin sonucunu beklemeden EKG ve klinik tabloyla verilmelidir.'],
 'Yırtılır tarzda göğüs-sırt ağrısı ve nabız farkı':['Ani yırtılır göğüs-sırt ağrısı ve nabız/basınç farkı akut aort sendromu açısından yüksek risklidir.','Kontrastlı BT anjiyografi, intimal flep ve diseksiyon yayılımını göstererek tedavi planını belirler.']
};
function norm(s){return String(s||'').toLocaleLowerCase('tr-TR').trim();}
function clean(s){return String(s||'').replace(/\s+/g,' ').replace(/(\d+)\.\s+(\d+)/g,'$1.$2').trim();}
function uniq(arr){const seen=new Set(); return arr.map(clean).filter(Boolean).filter(x=>{const k=norm(x); if(seen.has(k))return false; seen.add(k); return true;});}
let out=rawCases.map(c=>JSON.parse(JSON.stringify(c)));
for(const c of out){
  const correct=c.diagnosis?.correct||c.answerTarget||'doğru yanıt';
  const br=c.relatedBranch;
  // Risk: keep good special, else branch-level if bad/wrong/generic.
  const curRisk=uniq(c.patientIntro?.riskContext||[]);
  if(specialRisk[c.title]) c.patientIntro.riskContext=specialRisk[c.title];
  else if(curRisk.length<2 || curRisk.some(x=>badRe.test(x)) || /Cerrahi\/travma ilişkisi/.test(curRisk.join(' ')) && !['Anatomi'].includes(br) || /Uyarı ve kompansatuvar/.test(curRisk.join(' ')) && br!=='Fizyoloji') c.patientIntro.riskContext=branchRisk[br]||branchRisk['TUS Spot Olgular'];
  // Clues: never preserve old generic clue; prefer investigation summaries + one diagnosis-specific clue.
  const forbidden=new Set([...(c.patientIntro.riskContext||[]),...(c.exam||[]),c.stem,c.patientIntro?.historySummary].map(norm));
  let clues=uniq([...(c.patientIntro?.distinctiveClues||[]),...(c.availableInvestigations||[]).map(x=>x.summary)]).filter(x=>!badRe.test(x)&&!forbidden.has(norm(x))&&!norm(c.stem).includes(norm(x)));
  if(clues.length<2){
    clues.push(`${correct}, mevcut öykü ve objektif bulguları seçenekler içinde en tutarlı biçimde açıklar.`);
    const first=(c.availableInvestigations||[]).find(x=>x.summary&&!badRe.test(x.summary));
    if(first) clues.push(`${first.label} sonucunun ${first.summary.charAt(0).toLocaleLowerCase('tr-TR')+first.summary.slice(1)} kararı güçlendirir.`);
    else clues.push('Çeldiricilerde beklenen karşı bulgular bu olguda ön planda değildir.');
  }
  c.patientIntro.distinctiveClues=uniq(clues).slice(0,2);
  // If clues still bad, force.
  if(c.patientIntro.distinctiveClues.some(x=>badRe.test(x))){
    c.patientIntro.distinctiveClues=[`${correct}, mevcut öykü ve objektif bulguları seçenekler içinde en tutarlı biçimde açıklar.`, 'Çeldiricilerde beklenen karşı bulgular bu olguda ön planda değildir.'];
  }
  // Clean investigations labels/summaries.
  for(const inv of c.availableInvestigations||[]){
    inv.label=clean(inv.label).replace(/Hedef pediatrik görüntüleme/g,'Pediatrik hedef görüntüleme').replace(/Hedefe yönelik/g,'Tanıya yönelik');
    inv.summary=clean(inv.summary).replace(/Tanıyla uyumlu/g,'karar verdirici').replace(/Klinik tabloya uygun/g,'klinik karar açısından anlamlı');
    if(inv.result){ inv.result.title=inv.label; inv.result.summary=inv.summary; inv.result.interpretation=inv.summary; }
  }
  // Explanation updated.
  const first=c.availableInvestigations?.[0];
  const evidence=[c.stem,c.exam?.[0],first?`${first.label} sonucunda ${first.summary.charAt(0).toLocaleLowerCase('tr-TR')+first.summary.slice(1)}`:''].filter(Boolean);
  const explanation=`${evidence.join(' ')} Bu nedenle en uygun seçenek ${correct} olur.`;
  if(c.diagnosis){
    c.diagnosis.explanation=explanation; c.diagnosis.whyCorrect=explanation; c.diagnosis.evidenceChain=evidence.slice(0,3).map(text=>({text,weight:'high',source:'case'}));
    c.diagnosis.answerFeedback={}; c.diagnosis.feedbackByOption={};
    for(const opt of c.diagnosis.options||[]){const msg=opt===correct?explanation:`${opt}, mevcut öykü-muayene-tetkik bütünlüğünü ${correct} kadar iyi açıklamaz.`; c.diagnosis.answerFeedback[opt]=msg; c.diagnosis.feedbackByOption[opt]={explanation:msg,keyClues:c.patientIntro.distinctiveClues};}
    c.diagnosis.optionFeedback=c.diagnosis.feedbackByOption;
  }
}
// final recursive cleanup for badRe remnants in clues/risk only.
for(const c of out){
  if(c.patientIntro){
    c.patientIntro.riskContext=uniq(c.patientIntro.riskContext||[]).filter(x=>!badRe.test(x)).slice(0,2);
    if(c.patientIntro.riskContext.length<2) c.patientIntro.riskContext=branchRisk[c.relatedBranch]||branchRisk['TUS Spot Olgular'];
    c.patientIntro.distinctiveClues=uniq(c.patientIntro.distinctiveClues||[]).filter(x=>!badRe.test(x)).slice(0,2);
    if(c.patientIntro.distinctiveClues.length<2) c.patientIntro.distinctiveClues=[`${c.diagnosis?.correct||'Doğru seçenek'}, öykü ve objektif bulguların aynı yönde olmasıyla öne çıkar.`, 'Karıştırıcı seçeneklerde beklenen ayırıcı bulgular bu olguda baskın değildir.'];
  }
}
const body=`import { applyTusLanguageStandardToCase } from '../utils/tusLanguageStandard.js';\n\nexport const rawCases = ${JSON.stringify(out,null,2)};\n\nconst sanitizedCases = rawCases.map(applyTusLanguageStandardToCase);\n\nexport const cases = sanitizedCases;\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync('./src/data/cases.js',body);
console.log('clean final',out.length);
