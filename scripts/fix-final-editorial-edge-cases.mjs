import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const __dirname=path.dirname(fileURLToPath(import.meta.url)); const root=path.resolve(__dirname,'..'); const casesPath=path.join(root,'src/data/cases.js');
const { cases } = await import(`${pathToFileURL(casesPath).href}?v=${Date.now()}`);
function find(id){ return cases.find((c)=>c.id===id); }
const hiv = find('infectious-diseases-hiv-aids-001');
if (hiv) {
  hiv.patientIntro.riskContext = ['Hücresel immünite baskılanması fırsatçı enfeksiyon riskini artırır.', 'Cinsel temas, kan teması ve önceki test öyküsü tanısal yaklaşımı etkiler.'];
  hiv.patientIntro.distinctiveClues = ['Kilo kaybı, gece terlemesi, oral kandidiyazis ve kronik diyare ileri immünsüpresyonu düşündürür.', 'HIV Ag/Ab pozitifliği enfeksiyon taramasında ana objektif bulgudur.', 'Yüksek viral yük aktif viral replikasyonu gösterir.', 'CD4 110/µL düzeyi fırsatçı enfeksiyon riskini belirgin artırır.'];
  hiv.patientIntro.historySummary = 'Kilo kaybı, gece terlemesi, oral kandidiyazis ve kronik diyareye HIV Ag/Ab pozitifliği, yüksek viral yük ve düşük CD4 düzeyi eşlik eder.';
  hiv.stem = hiv.patientIntro.historySummary;
  hiv.diagnosis.answerFeedback.evidenceChain = [
    { title: 'Öykü ipucu', text: 'Kilo kaybı, gece terlemesi, oral kandidiyazis ve kronik diyare ileri immünsüpresyonu düşündürür.' },
    { title: 'Laboratuvar paterni', text: 'HIV Ag/Ab pozitifliği enfeksiyon taramasını destekler.' },
    { title: 'Viral yük', text: 'Yüksek viral yük aktif viral replikasyonu gösterir.' },
    { title: 'CD4 düzeyi', text: 'CD4 110/µL fırsatçı enfeksiyon riskini belirgin artırır.' },
  ];
}
const aiha = find('tus-spot-pdf-aiha-direct-coombs-001');
if (aiha) {
  aiha.stem = '58 yaşındaki kadın hasta kısa sürede gelişen halsizlik, sararma ve çarpıntı yakınmalarıyla başvurur. Kanama öyküsü yoktur. Retikülositoz, LDH yüksekliği, indirekt bilirubin artışı ve direkt antiglobulin testi pozitifliği hemolitik süreci destekler.';
  aiha.patientIntro.historySummary = 'Kanama öyküsü olmadan gelişen sararma, retikülositoz, LDH yüksekliği ve indirekt bilirubin artışı hemolizi düşündürür.';
  aiha.patientIntro.distinctiveClues = ['Hemoliz bulguları ve direkt Coombs IgG/C3 pozitifliği otoimmün hemolitik anemi lehinedir.', 'Halsizlik, sararma ve çarpıntı akut anemi kliniğini destekler.', 'Retikülositoz kemik iliği yanıtını gösterir.', 'Kanama öyküsünün olmaması hemolitik süreci öne çıkarır.'];
  aiha.diagnosis.answerFeedback.evidenceChain = [
    { title: 'Klinik ipucu', text: 'Sarılık ve çarpıntıya hemoliz laboratuvarı eşlik eder.' },
    { title: 'Retikülositoz', text: 'Retikülositoz kemik iliği yanıtını gösterir.' },
    { title: 'Direkt antiglobulin testi', text: 'IgG veya C3 pozitifliği otoimmün hemolizi destekler.' },
    { title: 'Dışlatıcı öykü', text: 'Kanama öyküsünün olmaması hemolitik süreci öne çıkarır.' },
  ];
}
const sle = find('tus-spot-pdf-sle-activity-dsdna-complement-001');
if (sle) {
  sle.stem = '28 yaşındaki kadın hasta fotosensitivite, malar döküntü, el küçük eklemlerinde ağrı ve son haftalarda bacaklarda hafif şişlik yakınmalarıyla romatoloji kontrolüne gelir. Anti-dsDNA yüksekliği ve C3/C4 düşüklüğü hastalık aktivitesini destekler.';
  sle.patientIntro.riskContext = ['SLE’de renal tutulum ve kompleman tüketimi hastalık aktivitesi açısından önemlidir.', 'Fotosensitivite ve malar döküntü sistemik otoimmün alevlenme bağlamı oluşturur.'];
  sle.patientIntro.historySummary = 'Fotosensitivite, malar döküntü, artralji ve bacaklarda hafif şişlik SLE aktivitesi açısından uyarıcıdır.';
  sle.patientIntro.distinctiveClues = ['Fotosensitivite, malar döküntü ve artralji SLE paternini destekler.', 'Bacaklarda hafif şişlik renal aktivite açısından uyarıcıdır.', 'Anti-dsDNA yüksekliği hastalık aktivitesini destekler.', 'C3 ve C4 düşüklüğü kompleman tüketimini gösterir.'];
}
const hie = find('tus-spot-pdf-hie-therapeutic-hypothermia-001');
if (hie) {
  hie.stem = 'Term yenidoğan doğumda resüsitasyon gerektirir ve sonraki saatlerde letarji, tonus azalması ve zayıf emme gelişir. pH 6.9 ve baz açığı -15 ağır metabolik asidozu gösterir.';
  hie.patientIntro.historySummary = 'Doğumda resüsitasyon, ağır metabolik asidoz ve ensefalopati bulguları orta-ağır hipoksik iskemik ensefalopatiyi düşündürür.';
  hie.patientIntro.riskContext = ['Term yenidoğanda perinatal asfiksi nörolojik sekel riskini artırır.', 'İlk 6 saat nöroprotektif tedavi penceresi açısından kritiktir.'];
  hie.patientIntro.distinctiveClues = ['Term bebekte perinatal asfiksi ve ağır asidoz HİE riskini artırır.', 'Doğumda resüsitasyon gereksinimi perinatal asfiksiyi düşündürür.', 'Letarji, tonus azalması ve zayıf emme ensefalopati bulgularıdır.', 'pH 6.9 ve baz açığı -15 ağır metabolik asidozu gösterir.'];
  hie.diagnosis.answerFeedback.evidenceChain = [
    { title: 'Öykü ipucu', text: 'Doğumda resüsitasyon gereksinimi perinatal asfiksiyi düşündürür.' },
    { title: 'Muayene bulgusu', text: 'Letarji, tonus azalması ve zayıf emme ensefalopati bulgularıdır.' },
    { title: 'Laboratuvar paterni', text: 'pH 6.9 ve baz açığı -15 ağır metabolik asidozu gösterir.' },
    { title: 'Tedavi penceresi', text: 'Term bebekte orta-ağır HİE nöroprotektif tedavi endikasyonudur.' },
  ];
}
function traverse(value){
  if(typeof value==='string') return value.replace(/\bPH\s+(\d+)\.\s*(\d+)/g, 'pH $1.$2').replace(/\bpH\s+(\d+)\.\s+(\d+)/g, 'pH $1.$2');
  if(Array.isArray(value)) return value.map(traverse);
  if(value&&typeof value==='object'){ for(const k of Object.keys(value)) value[k]=traverse(value[k]); return value;}
  return value;
}
const updated = traverse(cases);
fs.writeFileSync(casesPath, `export const cases = ${JSON.stringify(updated, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`);
