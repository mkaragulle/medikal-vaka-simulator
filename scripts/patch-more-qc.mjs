import fs from 'node:fs';
import { cases } from '../src/data/cases.js';
const byId = new Map(cases.map(c=>[c.id,c]));
function slug(text=''){return String(text).toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,72)||'step'}
function step(prefix,order,label,rationale,score=order<=3?2:1){return {id:`${prefix}-r-${order}-${slug(label)}`,label,required:true,correctOrder:order,unsafe:false,score,rationale}}
function dist(prefix,i,label,rationale,unsafe=false){return {id:`${prefix}-d-${i}-${slug(label)}`,label,required:false,correctOrder:null,unsafe,score:unsafe?-2:-1,rationale}}
function setSeq(id,{title,instruction,required,distractors}){const c=byId.get(id); const p=slug(id); c.managementSequence={enabled:true,showInSpot:false,title,instruction,minRequiredSteps:required.length,steps:[...required.map((e,i)=>step(p,i+1,e[0],e[1])),...distractors.map((e,i)=>dist(p,i+1,e[0],e[1],e[2]))]}; const labels=required.map(e=>e[0]); if(c.diagnosis?.answerFeedback){c.diagnosis.answerFeedback.managementSteps=labels;c.diagnosis.answerFeedback.management=labels;} if(c.diagnosis)c.diagnosis.nextStep=labels.join(' ')}
setSeq('cardiovascular-coagulative-necrosis-mi-001',{
 title:'Akut MI ve koagülatif nekroz yönetim sırası',
 instruction:'Klinik STEMI kararını histopatolojik nekroz zamanlamasıyla karıştırmadan sırala.',
 required:[
  ['İskemik göğüs ağrısı ve EKG bulgularını akut koroner oklüzyon açısından hızla değerlendir.','Akut MI’da ilk karar klinik ve EKG ile verilir; histolojik nekroz tanıyı bekletmez.'],
  ['Monitörizasyon, damar yolu ve defibrilatör erişimini hazırla.','Erken dönemde aritmi ve hemodinamik bozulma mortalite nedenidir.'],
  ['Aspirin, P2Y12 inhibitörü ve antikoagülasyonu kanama riskini dışlayarak başla.','Trombüs progresyonunu azaltan tedavi reperfüzyon stratejisiyle birlikte yürütülür.'],
  ['Primer PCI veya uygun reperfüzyon yolunu zaman hedeflerine göre başlat.','Canlı miyokardı kurtarmak için reperfüzyon geciktirilmemelidir.'],
  ['Troponin değişimini ve komplikasyonları izle; tedavi kararını troponin gecikmesine bağlama.','Biyobelirteçler tanıyı destekler ancak ST elevasyonunda reperfüzyonu geciktirmez.'],
  ['Koagülatif nekrozun saatler içinde gelişen morfolojik karşılığını öğrenme hedefi olarak yorumla.','Patoloji bilgisi klinik aciliyeti açıklar; akut tedavinin yerine geçmez.'],
 ],
 distractors:[
  ['Koagülatif nekroz histolojisi görülene kadar reperfüzyonu beklet.','Histolojik kanıt beklemek miyokard kaybını artırır.',true],
  ['ST elevasyonu sırasında elektif efor testi planla.','Akut oklüzyon şüphesinde efor testi uygun değildir.',true],
  ['Ağrı azalınca antitrombotik ve monitorizasyonu sonlandır.','Semptom azalması koroner oklüzyon riskini ortadan kaldırmaz.',true],
 ]
});
setSeq('pulmonology-pulmonary-embolism-dvt-001',{
 title:'Pulmoner emboli ve akciğer enfarktı yönetim sırası',
 instruction:'PE klinik kararını DVT kaynağı ve patolojik enfarkt paternleriyle ilişkilendir.',
 required:[
  ['Ani dispne, plöritik ağrı, taşikardi ve DVT bulgularını birlikte değerlendir.','Klinik olasılık görüntüleme ve antikoagülasyon kararını yönlendirir.'],
  ['Hemodinamik stabilite ve sağ ventrikül yüklenmesi bulgularını sınıfla.','Masif/submasif ayrımı tromboliz veya yoğun bakım gereksinimini belirler.'],
  ['Pretest olasılığa göre D-dimer ya da BT pulmoner anjiyografi stratejisini seç.','Gereksiz testleri azaltmak için tanı yolu klinik olasılıkla başlar.'],
  ['Kontrendikasyon yoksa antikoagülasyonu başlat ve kanama riskini izle.','PE tedavisinin temeli pıhtı progresyonunu önlemektir.'],
  ['Şok veya kalıcı hipotansiyon varsa reperfüzyon tedavisi seçeneğini değerlendir.','Yüksek riskli PE’de tromboliz veya embolektomi hayat kurtarıcı olabilir.'],
  ['DVT kaynağı, provoke edici faktör ve akciğer enfarktı komplikasyonlarını izlem planına ekle.','Nüks önleme ve tedavi süresi altta yatan riskle belirlenir.'],
 ],
 distractors:[
  ['Şok bulgusunda yalnız D-dimer sonucunu bekle.','Yüksek riskli PE’de gecikme mortaliteyi artırır.',true],
  ['Antikoagülasyonu kanama riski ve kontrendikasyon değerlendirmeden rastgele başla.','Tedavi güvenliği için kanama riski değerlendirilmelidir.',true],
  ['DVT bulgularını PE yönetiminden bağımsız kabul et.','Alt ekstremite trombozu embolinin kaynağı ve tedavi süresinin ipucudur.',false],
 ]
});
fs.writeFileSync('src/data/cases.js', `// KlinikIQ vaka verisi: TUS odaklı, klinik karar verdirici ve objektif tetkik sonuçlarıyla yapılandırılmıştır.\n// Bu sürümde yönetim sırası ve tetkik istemleri vaka özelinde sadeleştirilmiştir.\n// Final clinical QA: şablon sızıntıları temizlenmiş, vaka başlığı tekrarı kaldırılmıştır.\n\nexport const cases = ${JSON.stringify(cases,null,2)};\n`);
const report=JSON.parse(fs.readFileSync('FINAL_CLINICAL_MANAGEMENT_QA_REPORT.json','utf8'));
report.rewrittenManagementSequences = (report.rewrittenManagementSequences || 0) + 2;
report.fixedTemplateLeakCases = (report.fixedTemplateLeakCases || 0) + 2;
fs.writeFileSync('FINAL_CLINICAL_MANAGEMENT_QA_REPORT.json',JSON.stringify(report,null,2));
