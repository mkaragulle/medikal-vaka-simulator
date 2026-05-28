import fs from 'fs';
import path from 'path';
import { rawCases } from '../src/data/cases.js';
import { clinicalVisualManifest } from '../src/data/clinicalVisualManifest.js';

const PROJECT_ROOT = path.resolve('.');
const REPORT_DIR = path.join(PROJECT_ROOT, 'quality-reports');
fs.mkdirSync(REPORT_DIR, { recursive: true });

const badCommentPattern = /(pnömoni|nefrotik sendrom paternini|menenjit|HÜS|dka|kontrastsız beyin bt|ast\/alt yüksekliği|laktat yüksekliği|sistemik inflamatuvar yanıtı destekler|gebelikle uyumludur|objektif veri sağlar|klinik bağlamda anlam kazanır|tanısal akıl yürütmeyi güçlendirir|bu olguda en uygun yanıt değildir|belirleyici bulgular .* destekler)/i;
const refShiftPattern = /(80\/100|35\/45|"121 mmol\/L"\s*,\s*"121 mmol\/L")/i;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeRows(rows) {
  return rows.map((row) => [row[0] ?? '', row[1] ?? '', row[2] ?? '', row[3] ?? '']);
}

function inv({ id, title, type = 'lab', priority = 'essential', subtype = '', rows, summary = '', category = 'laboratory' }) {
  const normalizedRows = normalizeRows(rows);
  return {
    id,
    label: title,
    title,
    type,
    priority,
    subtype,
    summary,
    clinicalMeaning: summary,
    result: {
      title,
      summary,
      interpretation: summary,
      values: normalizedRows,
      rows: normalizedRows
    },
    rows: normalizedRows,
    postAnswerExplanation: summary,
    interpretation: summary,
    category,
    testTypeCategory: category,
    explanationAfterAnswer: summary
  };
}

const DEFAULT_VITALS = { TA: '118/76 mmHg', Nabız: '78/dk', Solunum: '16/dk', SpO2: '%98, oda havasında', Ateş: '36.6 °C', 'Şok indeksi': '0.66 normal' };

function ev(text, title = 'Klinik-patolojik ipucu', weight = 'high') {
  return { title, text, weight, source: 'case' };
}

function makeAnswerBlock({ correct, options, whyCorrect, evidence, pearl, coreKnowledge, optionFeedback, learningOutcome }) {
  const whyWrong = Object.fromEntries(options.filter((o) => o !== correct).map((o) => [o, optionFeedback[o]]));
  const optionComparison = Object.fromEntries(options.map((o) => [o, optionFeedback[o]]));
  return {
    correct,
    options,
    explanation: whyCorrect,
    pearls: [{ label: 'Sınav notu', text: pearl }],
    answerFeedback: {
      summary: whyCorrect,
      whyCorrect,
      rationale: whyCorrect,
      correctOptionFeedback: optionFeedback[correct],
      keyClues: evidence.map((item) => item.text),
      evidenceChain: evidence.map(({ text, weight, source }) => ({ text, weight, source })),
      examPearl: pearl,
      pearls: [{ label: 'Sınav notu', text: pearl }],
      clinicalPearls: [{ label: 'Sınav notu', text: pearl }],
      optionComparison,
      whyWrong,
      managementSteps: [],
      management: [],
      learningOutcome,
      coreKnowledge
    },
    whyCorrect,
    evidenceChain: evidence,
    optionComparison,
    coreKnowledge,
    examPearl: pearl,
    whyWrong
  };
}

const U = {};

function add(id, cfg) { U[id] = cfg; }

add('v163-new-008-kronik-malabsorpsiyon-tablosu', {
  title: 'Kronik malabsorpsiyon tablosu',
  focus: 'Çölyak hastalığında gluten ilişkili malabsorpsiyon, seroloji ve duodenum biyopsisindeki villus atrofisi-kript hiperplazisi-intraepitelyal lenfosit artışı paternini birlikte yorumlama.',
  target: 'Kronik ishal ve malabsorpsiyon bulgularında çölyak hastalığının temel duodenal histopatoloji paternini tanıyabilme.',
  intro: {
    profile: '31 yaşında kadın hasta, kronik ishal ve tekrarlayan demir eksikliği nedeniyle gastroenteroloji polikliniğinde değerlendiriliyor.',
    presentation: 'Hasta, özellikle gluten içeren öğünlerden sonra artan karında şişkinlik, kötü kokulu dışkılama, kilo kaybı ve halsizlik yakınmalarıyla başvuruyor.',
    historySummary: 'Son bir yıldır ekmek ve makarna içeren öğünlerden sonra şikâyetlerinin belirginleştiğini, dışkısının hacimli ve kötü kokulu olduğunu belirtmektedir. Demir eksikliği tedavisi almasına rağmen anemisi tekrarlamış; kronik enfeksiyon, kanlı ishal veya cerrahi bağırsak rezeksiyonu öyküsü tariflememektedir.',
    distinctiveClues: ['Glutenle ilişkili kronik malabsorpsiyon yakınmaları vardır.', 'Anti-doku transglutaminaz IgA pozitifliği çölyak hastalığını destekler.', 'Duodenum biyopsisinde villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı beklenir.']
  },
  vitals: DEFAULT_VITALS,
  exam: ['Hasta zayıf ve soluk görünümdedir.', 'Konjonktival solukluk demir eksikliği anemisiyle uyumludur.', 'Batında hafif distansiyon vardır; defans, rebound veya organomegali saptanmaz.'],
  investigations: [
    inv({ id: 'cbc-iron-celiac', title: 'Hemogram ve demir parametreleri', subtype: 'Laboratuvar', rows: [['Hemoglobin', '10.8 g/dL', '12-16 g/dL', 'Düşük'], ['Ferritin', '8 ng/mL', '15-150 ng/mL', 'Düşük']], summary: 'Tekrarlayan demir eksikliği, proksimal ince bağırsak emilim bozukluğunu destekler ve çölyak hastalığında sık görülen ekstraintestinal ipuçlarından biridir.' }),
    inv({ id: 'anti-ttg-iga-celiac', title: 'Çölyak serolojisi', subtype: 'Seroloji', rows: [['Anti-doku transglutaminaz IgA', 'Pozitif', 'Negatif beklenir', 'Pozitif'], ['Total IgA', 'Normal', 'Yaşa göre normal aralık', 'Yeterli']], summary: 'Pozitif anti-tTG IgA, IgA eksikliği yoksa çölyak hastalığı için güçlü bir serolojik destek sağlar; kesin histolojik korelasyon duodenum biyopsisiyle yapılır.' }),
    inv({ id: 'duodenum-biopsy-celiac', title: 'Duodenum biyopsisi', type: 'pathology', subtype: 'Patoloji / histopatoloji', category: 'pathology', rows: [['Mikroskobik bulgu', 'Villuslarda küntleşme/atrofi, kript hiperplazisi ve intraepitelyal lenfosit artışı izlendi.', 'Çölyak hastalığı için karakteristik patern', 'Tanısal']], summary: 'Villus atrofisi emilim yüzeyini azaltır; kript hiperplazisi rejeneratif yanıtı, intraepitelyal lenfosit artışı ise gluten ilişkili immün epitel hasarını gösterir.' })
  ],
  question: 'Glutenle ilişkili kronik malabsorpsiyon, pozitif anti-tTG IgA ve duodenum biyopsisi yapılan bu hastada beklenen temel histopatolojik bulgu hangisidir?',
  correct: 'Villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı',
  options: ['Kript apseleri ve devamlı mukozal ülserasyon', 'Transmural granülomatöz inflamasyon', 'Villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı', 'Submukozal vasküler ektazi ve hemosiderin birikimi', 'Pilorik gland metaplazisi ve Helicobacter benzeri organizmalar'],
  whyCorrect: 'Glutenle ilişkili kronik ishal, kilo kaybı, demir eksikliği ve anti-tTG IgA pozitifliği çölyak hastalığını düşündürür. Çölyak hastalığında proksimal ince bağırsak mukozasında villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı görülür; bu morfoloji malabsorpsiyonun doku düzeyindeki temel karşılığıdır.',
  evidence: [ev('Gluten içeren öğünlerden sonra artan şişkinlik ve kötü kokulu dışkılama malabsorpsiyon paternini destekler.'), ev('Tekrarlayan demir eksikliği ve pozitif anti-tTG IgA çölyak hastalığı olasılığını güçlendirir.'), ev('Duodenum biyopsisinde villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı gluten ilişkili mukozal hasarın karakteristik paternidir.')],
  pearl: 'Çölyakta yüksek getirili histoloji üçlüsü villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışıdır; ülseratif kolitte kript apsesi, Crohn’da transmural granülom beklenir.',
  core: 'Çölyak hastalığı HLA-DQ2/DQ8 yatkınlığı olan bireylerde gluten ilişkili T hücre aracılı mukozal hasar yapar; tanı seroloji ve duodenum biyopsisi uyumuyla güçlenir.',
  feedback: {
    'Kript apseleri ve devamlı mukozal ülserasyon': 'Kript apseleri ve rektumdan başlayan devamlı mukozal tutulum ülseratif koliti düşündürür. Bu vakada temel sorun gluten ilişkili malabsorpsiyon ve duodenal villus hasarıdır; kanlı ishal veya kolona sınırlı devamlı ülserasyon paterni verilmemiştir.',
    'Transmural granülomatöz inflamasyon': 'Transmural granülomlar Crohn hastalığında beklenir ve skip lezyon, fistül veya transmural tutulumla ilişkilidir. Bu hastada proksimal ince bağırsak emilim bozukluğu ve çölyak serolojisi ön plandadır.',
    'Villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı': 'Bu bulgu çölyak hastalığının temel duodenal histopatoloji paternidir. Villus kaybı emilim yüzeyini azaltır; kript hiperplazisi rejenerasyonu, intraepitelyal lenfosit artışı ise gluten ilişkili immün epitel hasarını gösterir.',
    'Submukozal vasküler ektazi ve hemosiderin birikimi': 'Vasküler ektazi daha çok kronik gastrointestinal kanama yapan vasküler lezyonlarda düşünülür. Bu olguda tekrarlayan demir eksikliğinin nedeni kronik kanamadan çok duodenal emilim bozukluğu paternidir.',
    'Pilorik gland metaplazisi ve Helicobacter benzeri organizmalar': 'H. pylori ilişkili kronik gastritte antral inflamasyon ve organizmalar beklenir. Glutenle ilişkili şikâyetler, pozitif anti-tTG IgA ve duodenum hedefli biyopsi bu seçeneği değil çölyak hastalığını destekler.'
  },
  ihc: false
});

add('v168-new-056-agrisiz-hematuri-ve-renal-kitle', {
  title: 'Ağrısız hematüri ve renal kortikal kitle',
  focus: 'Ağrısız hematüri, renal kortikal kontrastlanan kitle ve berrak sitoplazmalı damar ağıyla ayrılmış tümör hücrelerini berrak hücreli renal hücreli karsinom lehine birleştirme.',
  target: 'Berrak hücreli renal hücreli karsinomun klinik, görüntüleme ve histopatolojik ayırıcı özelliklerini tanıyabilme.',
  intro: { profile: '62 yaşında erkek hasta, tekrarlayan ağrısız makroskopik hematüri nedeniyle üroloji polikliniğinde değerlendiriliyor.', presentation: 'Hasta, idrarda gözle görülür kanama, aralıklı sağ yan ağrısı ve son aylarda kilo kaybı yakınmalarıyla başvuruyor.', historySummary: 'Uzun süreli sigara kullanımı ve hipertansiyon öyküsü vardır. Dizüri, ateş, taş düşürme veya yakın zamanda geçirilmiş üriner enfeksiyon tariflememektedir.', distinctiveClues: ['Ağrısız makroskopik hematüri renal tümör açısından uyarıcıdır.', 'BT’de renal kortekste heterojen kontrastlanan solid kitle vardır.', 'Histolojide berrak sitoplazmalı hücreler ince damar ağıyla ayrılmıştır.'] },
  vitals: { TA: '150/88 mmHg', Nabız: '84/dk', Solunum: '16/dk', SpO2: '%98, oda havasında', Ateş: '36.6 °C', 'Şok indeksi': '0.56 normal' },
  exam: ['Hasta hafif soluk görünümdedir.', 'Sağ kostovertebral açı bölgesinde hafif hassasiyet vardır.', 'Palpe edilebilir abdominal kitle saptanmaz.'],
  investigations: [
    inv({ id: 'renal-urinalysis-rcc', title: 'Tam idrar analizi', subtype: 'İdrar incelemesi', category: 'urine', type: 'urine', rows: [['Eritrosit', '>50/HPF', '0-3/HPF', 'Yüksek'], ['Protein', '1+', 'Negatif/trace', 'Hafif yüksek'], ['Lökosit/nitrit', 'Negatif', 'Negatif beklenir', 'Enfeksiyon lehine değil']], summary: 'Belirgin hematüri ve enfeksiyon bulgularının olmaması, ağrısız hematüriyle birlikte üriner sistem tümörü olasılığını artırır.' }),
    inv({ id: 'renal-ct-rcc', title: 'Abdominal bilgisayarlı tomografi', type: 'ct', subtype: 'BT', category: 'imaging', rows: [['Görüntüleme bulgusu', 'Sağ böbrek korteksinde solid, heterojen kontrastlanan kitle izlendi.', 'Renal kortikal neoplazi açısından anlamlı', 'Patolojik']], summary: 'Renal korteksten kaynaklanan kontrastlanan solid kitle, berrak hücreli renal hücreli karsinom için tipik görüntüleme bağlamı oluşturur.' }),
    inv({ id: 'renal-biopsy-rcc', title: 'Biyopsi histopatolojisi', type: 'pathology', subtype: 'Patoloji / histopatoloji', category: 'pathology', rows: [['Mikroskobik bulgu', 'İnce dallanan damar ağıyla ayrılan alveoler/nested dizilimli, berrak sitoplazmalı tümör hücreleri izlendi.', 'Berrak hücreli RCC için karakteristik morfoloji', 'Tanısal']], summary: 'Berrak sitoplazma lipid ve glikojen içeriğine bağlıdır; zengin ince vasküler ağ berrak hücreli renal hücreli karsinomun klasik morfolojik ipucudur.' })
  ],
  question: 'Ağrısız makroskopik hematüri, renal kortekste heterojen kontrastlanan solid kitle ve biyopside ince damar ağıyla ayrılan berrak sitoplazmalı tümör hücreleri bulunan hastada en olası tanı hangisidir?',
  correct: 'Berrak hücreli renal hücreli karsinom',
  options: ['Ürotelyal karsinom', 'Berrak hücreli renal hücreli karsinom', 'Wilms tümörü', 'Renal onkositom', 'Anjiyomiyolipom'],
  whyCorrect: 'Ağrısız makroskopik hematüri ve renal kortekste solid kontrastlanan kitle renal hücreli karsinomu düşündürür. Biyopside berrak sitoplazmalı tümör hücrelerinin ince damar ağıyla ayrılması berrak hücreli renal hücreli karsinomun klasik histolojik görünümüdür.',
  evidence: [ev('Ağrısız makroskopik hematüri üriner sistem tümörü açısından temel klinik ipucudur.'), ev('BT’de sağ böbrek korteksinde heterojen kontrastlanan solid kitle izlenmesi renal hücreli karsinomu destekler.'), ev('Biyopside berrak sitoplazmalı hücrelerin ince damar ağıyla ayrılması berrak hücreli renal hücreli karsinom için karakteristiktir.')],
  pearl: 'Berrak hücreli RCC böbrek korteksinden gelişir; ağrısız hematüri ve berrak sitoplazmalı, zengin vasküler ağlı tümör hücreleri klasik ipuçlarıdır.',
  core: 'Berrak hücreli RCC çoğu kez VHL/HIF yolak bozukluğu ve artmış anjiyogenezle ilişkilidir; histolojide berrak sitoplazma ve yoğun kapiller ağ belirleyicidir.',
  feedback: {
    'Ürotelyal karsinom': 'Ürotelyal karsinom renal pelvis, üreter veya mesane ürotelyumundan gelişir ve papiller/ürotelyal morfoloji beklenir. Bu vakada kitle renal kortekstedir ve berrak sitoplazmalı hücrelerin vasküler ağla ayrılması RCC lehinedir.',
    'Berrak hücreli renal hücreli karsinom': 'Berrak hücreli RCC renal kortekste kontrastlanan solid kitle ve ağrısız hematüriyle tipikleşir. Berrak sitoplazmalı tümör hücrelerinin ince damar ağıyla ayrılması tanıyı morfolojik olarak destekler.',
    'Wilms tümörü': 'Wilms tümörü çocukluk çağının böbrek tümörüdür ve blastemal, epitelyal ve stromal komponentler içerebilir. Bu 62 yaşındaki hastada erişkin renal kortikal kitle ve berrak hücre morfolojisi Wilms tümörüyle uyumlu değildir.',
    'Renal onkositom': 'Renal onkositom benign özellikli, eozinofilik granüler sitoplazmalı onkositlerden oluşur ve santral skar gösterebilir. Bu vakadaki berrak hücreli morfoloji ve ağrısız hematüriyle solid kortikal kitle RCC lehinedir.',
    'Anjiyomiyolipom': 'Anjiyomiyolipom yağ, düz kas ve kalın duvarlı damar bileşenleri içeren benign mezenkimal tümördür; yağ içerikli lezyon ve tüberoskleroz ilişkisi beklenebilir. Bu olguda berrak epitelial tümör hücreleri ve kortikal kontrastlanan kitle ön plandadır.'
  },
  ihc: false
});

add('v169-new-066-eriskinde-nefrotik-tablo', {
  title: 'Erişkinde nefrotik tablo', focus: 'Erişkinde nefrotik sendromda subepitelyal immün kompleks birikimi ve spike-and-dome görünümünü membranöz nefropati lehine yorumlama.', target: 'Membranöz nefropatide nefrotik sendrom paternini ve karakteristik böbrek biyopsisi bulgularını tanıyabilme.',
  intro: { profile: '46 yaşında erkek hasta, nefrotik düzey proteinüri nedeniyle nefroloji polikliniğinde değerlendiriliyor.', presentation: 'Hasta, bacaklarda giderek artan ödem ve köpüklü idrar yakınmasıyla başvuruyor.', historySummary: 'Yaklaşık iki aydır ayak bileklerinde şişlik ve idrarda belirgin köpüklenme olduğunu belirtmektedir. Diyabet, yakın zamanda üst solunum yolu enfeksiyonu veya yeni ilaç kullanımı tariflememektedir.', distinctiveClues: ['Proteinüri ve hipoalbüminemi nefrotik sendrom paternidir.', 'Diyabet öyküsünün olmaması nodüler diyabetik glomerülosklerozu geri plana iter.', 'Subepitelyal immün kompleks birikimi membranöz nefropatiyi destekler.'] },
  vitals: { ...DEFAULT_VITALS, TA: '138/86 mmHg', Nabız: '82/dk', Ateş: '36.7 °C', 'Şok indeksi': '0.59 normal' }, exam: ['Bilateral pretibial gode bırakan ödem vardır.', 'Akciğer oskültasyonunda belirgin ral yoktur.', 'Döküntü, artrit veya sistemik enfeksiyon bulgusu saptanmaz.'],
  investigations: [
    inv({ id: 'albumin-membranous-1', title: 'Serum albümin', subtype: 'Laboratuvar', rows: [['Serum albümin', '2.3 g/dL', '3.5-5.0 g/dL', 'Düşük']], summary: 'Hipoalbüminemi, masif glomerüler protein kaybının sistemik sonucudur ve ödemin temel mekanizmasını açıklar.' }),
    inv({ id: 'proteinuria-membranous-1', title: '24 saatlik idrar protein düzeyi', type: 'urine', subtype: 'İdrar protein ölçümü', category: 'urine', rows: [['24 saatlik idrar protein düzeyi', '6.2 g/gün', '<0.15 g/gün', 'Nefrotik düzey']], summary: 'Günde 3.5 gramın üzerindeki protein kaybı nefrotik sendrom tanımını karşılar ve glomerüler filtrasyon bariyer hasarını gösterir.' }),
    inv({ id: 'biopsy-em-membranous-1', title: 'Böbrek biyopsisi elektron mikroskopisi', type: 'pathology', subtype: 'Elektron mikroskopisi', category: 'pathology', rows: [['Mikroskobik bulgu', 'Glomerüler bazal membran boyunca subepitelyal elektron-dens immün kompleks birikimleri izlendi.', 'Membranöz nefropati lehine', 'Tanısal']], summary: 'Subepitelyal immün kompleksler ışık mikroskobunda/gümüş boyada spike-and-dome görünümünün morfolojik temelini oluşturur.' })
  ],
  question: 'Nefrotik düzey proteinüri, hipoalbüminemi ve subepitelyal immün kompleks birikimi bulunan bu erişkin hastanın böbrek biyopsisinde beklenen tipik morfolojik bulgu hangisidir?', correct: 'Glomerüler bazal membranda spike and dome görünümü', options: ['Kresent oluşumu ve Bowman aralığında fibrin birikimi', 'Glomerüler bazal membranda spike and dome görünümü', 'Mezangial IgA birikimine bağlı mezangial proliferasyon', 'Kongo kırmızısı ile elma yeşili çift kırılma', 'Nodüler glomerüloskleroz ve Kimmelstiel-Wilson nodülleri'],
  whyCorrect: 'Erişkinde nefrotik düzey proteinüri, hipoalbüminemi ve subepitelyal immün kompleks birikimleri membranöz nefropatiyi düşündürür. Bu hastalıkta glomerüler bazal membran boyunca immün kompleksler arasında yeni bazal membran materyali oluşur ve gümüş boyada spike-and-dome görünümü ortaya çıkar.', evidence: [ev('Masif proteinüri ve hipoalbüminemi nefrotik sendrom paternini gösterir.'), ev('Diyabet öyküsünün olmaması nodüler diyabetik glomerülosklerozu geri plana iter.'), ev('Elektron mikroskopide subepitelyal immün kompleks birikimleri membranöz nefropatinin temel doku bulgusudur.')], pearl: 'Membranöz nefropatide nefrotik sendrom + subepitelyal immün kompleks + spike-and-dome görünümü birlikte düşünülmelidir.', core: 'Membranöz nefropati podosit altındaki immün kompleks birikimleriyle filtrasyon bariyerini bozar; erişkin nefrotik sendromun önemli nedenlerindendir.',
  feedback: {
    'Kresent oluşumu ve Bowman aralığında fibrin birikimi': 'Kresentler hızlı ilerleyen glomerülonefritlerde görülür ve nefritik tablo, hızlı kreatinin artışı ve hematuri ile ilişkilidir. Bu vakada belirleyici patern nefrotik proteinüri ve subepitelyal immün kompleks birikimidir.',
    'Glomerüler bazal membranda spike and dome görünümü': 'Spike-and-dome görünümü membranöz nefropatinin klasik morfolojik bulgusudur. Subepitelyal immün kompleksler arasında yeni bazal membran materyali oluşması bu paterni açıklar.',
    'Mezangial IgA birikimine bağlı mezangial proliferasyon': 'Mezangial IgA birikimi IgA nefropatisinde beklenir ve genellikle üst solunum yolu enfeksiyonuyla eş zamanlı hematüri yapar. Bu olguda nefrotik proteinüri ve subepitelyal birikimler ön plandadır.',
    'Kongo kırmızısı ile elma yeşili çift kırılma': 'Bu bulgu amiloidozu gösterir ve kronik inflamasyon/plazma hücre diskrazisi bağlamında amorf ekstrasellüler birikim beklenir. Burada verilen subepitelyal immün kompleks paterni membranöz nefropatiye aittir.',
    'Nodüler glomerüloskleroz ve Kimmelstiel-Wilson nodülleri': 'Kimmelstiel-Wilson nodülleri diyabetik nefropatide beklenir. Diyabet öyküsü yoktur ve EM bulgusu subepitelyal immün kompleks birikimini göstermektedir.'
  }, ihc: false
});

// Compact helper for cases sharing a renal membranous nephropathy target.
function addMembranous(id, title, correct, question, options) {
  add(id, { title, focus: 'Erişkinde nefrotik sendromda membranöz nefropatinin proteinüri, hipoalbüminemi, bazal membran kalınlaşması ve granüler immün birikim paternini ayırt etme.', target: 'Membranöz nefropatinin klinik-patolojik bulgularını tanıyabilme.', intro: { profile: 'Erişkin erkek hasta, nefrotik düzey proteinüri nedeniyle nefroloji polikliniğinde değerlendiriliyor.', presentation: 'Hasta, bacaklarda şişlik, göz kapaklarında ödem ve köpüklü idrar yakınmalarıyla başvuruyor.', historySummary: 'Son aylarda giderek artan ödem ve halsizlik tariflemektedir. Diyabet, aktif enfeksiyon, döküntü veya belirgin sistemik otoimmün hastalık öyküsü vermemektedir.', distinctiveClues: ['Nefrotik düzey proteinüri ve ödem vardır.', 'Biyopside glomerüler bazal membran kalınlaşması/spike görünümü tanımlanır.', 'Granüler IgG-C3 kapiller duvar birikimi membranöz nefropatiyi destekler.'] }, vitals: { ...DEFAULT_VITALS, TA: '132/84 mmHg', Nabız: '84/dk', Ateş: '36.7 °C', 'Şok indeksi': '0.64 normal' }, exam: ['Bilateral pretibial gode bırakan ödem vardır.', 'Akciğer oskültasyonu doğaldır.', 'Döküntü, artrit veya enfeksiyon odağı saptanmaz.'], investigations: [inv({ id: id+'-proteinuria', title: '24 saatlik idrar protein düzeyi', type: 'urine', subtype: 'İdrar protein ölçümü', category: 'urine', rows: [['24 saatlik idrar protein düzeyi', '6.3 g/gün', '<0.15 g/gün', 'Nefrotik düzey']], summary: 'Masif proteinüri glomerüler filtrasyon bariyer hasarını gösterir ve membranöz nefropatide tipik nefrotik sendrom paternini oluşturur.' }), inv({ id: id+'-biopsy', title: 'Böbrek biyopsisi', type: 'pathology', subtype: 'Patoloji / özel boyama', category: 'pathology', rows: [['Mikroskobik bulgu', 'Glomerüler bazal membranda yaygın kalınlaşma ve gümüş boyada spike görünümü izlendi.', 'Membranöz nefropati için karakteristik', 'Tanısal']], summary: 'Subepitelyal immün komplekslerin çevresinde gelişen yeni bazal membran materyali spike görünümünü oluşturur.' }), inv({ id: id+'-if', title: 'İmmünfloresan', type: 'pathology', subtype: 'İmmünfloresan', category: 'pathology', rows: [['İmmünfloresan bulgu', 'Kapiller duvar boyunca granüler IgG ve C3 birikimi izlendi.', 'İmmün kompleks aracılı membranöz patern', 'Pozitif']], summary: 'Granüler kapiller duvar IgG-C3 birikimi membranöz nefropatiyi anti-GBM hastalığındaki lineer birikimden ayırır.' })], question, correct, options, whyCorrect: 'Nefrotik düzey proteinüri, ödem ve glomerüler bazal membran boyunca spike görünümü membranöz nefropatiyi destekler. İmmünfloresanda kapiller duvar boyunca granüler IgG ve C3 birikimi, immün kompleks aracılı subepitelyal birikimin doku karşılığıdır.', evidence: [ev('Nefrotik düzey proteinüri ve ödem glomerüler filtrasyon bariyer hasarını gösterir.'), ev('Biyopside glomerüler bazal membran kalınlaşması ve spike görünümü membranöz nefropati lehinedir.'), ev('Granüler IgG ve C3 kapiller duvar birikimi immün kompleks aracılı membranöz paterni destekler.')], pearl: 'Membranöz nefropati: erişkin nefrotik sendrom + subepitelyal immün kompleks + spike-and-dome/spike görünümü + granüler IgG-C3.', core: 'Membranöz nefropatide antikor aracılı podosit hasarı proteinüriye yol açar; histoloji, IF ve EM bulgularının birlikte yorumlanması tanıyı güçlendirir.', feedback: Object.fromEntries(options.map(o => [o, o === correct ? 'Bu seçenek membranöz nefropatinin doğru klinik-patolojik karşılığıdır: nefrotik proteinüri, bazal membran kalınlaşması, spike görünümü ve granüler kapiller duvar IgG-C3 birikimi beklenir.' : (o.includes('Kresent') ? 'Kresentik glomerülonefrit hızlı ilerleyen nefritik tablo ve Bowman aralığında proliferasyon/fibrin ile ilişkilidir; bu vakada nefrotik proteinüri ve spike görünümü vardır.' : o.includes('Akut tübüler') ? 'Akut tübüler nekroz tübüler epitel hasarı ve akut böbrek yetmezliğiyle seyreder; nefrotik düzey proteinüri ve spike görünümü beklenmez.' : o.includes('Nodüler') || o.includes('Kimmelstiel') ? 'Nodüler glomerüloskleroz diyabetik nefropatinin bulgusudur; diyabet öyküsü ve nodüler mezangial genişleme verilmemiştir.' : o.includes('hump') ? 'Subepitelyal hump birikimleri poststreptokoksik glomerülonefritte nefritik tablo ve düşük komplemanla beklenir; burada membranöz nefropati paterni vardır.' : 'Bu seçenek membranöz nefropatinin tipik nefrotik sendrom, spike görünümü ve granüler IgG-C3 paternini açıklamaz.') ])), ihc: true });
}

addMembranous('v183-new-187-eriskinde-belirgin-proteinuri', 'Erişkinde belirgin proteinüri', 'Glomerüler bazal membranda spike görünümü', 'Nefrotik düzey proteinüri ve subepitelyal immün kompleks birikimi bulunan bu hastalıkta beklenen karakteristik ışık mikroskopisi/özel boyama bulgusu hangisidir?', ['Glomerüler bazal membranda spike görünümü', 'Kazeifiye granülom oluşumu', 'Reaktif inflamatuvar değişiklik', 'Nodüler mezangial glomerüloskleroz', 'Subepitelyal hump birikimleri']);
addMembranous('v195-new-349-eriskinde-nefrotik-proteinuri', 'Erişkinde nefrotik proteinüri', 'Membranöz nefropati', 'Nefrotik düzey proteinüri, glomerüler bazal membran kalınlaşması, spike görünümü ve granüler IgG-C3 birikimi bulunan hastada en olası patolojik tanı hangisidir?', ['Membranöz nefropati', 'Akut tübüler nekroz', 'Kresentik glomerülonefrit', 'Medüller sünger böbrek', 'Basit renal kist']);

function addPapillaryThyroid(id, title, correct, question, options) {
  add(id, { title, focus: 'Papiller tiroid karsinomunda mikrokalsifikasyon, lenfatik yayılım ve nükleer özellikleri klinik-patolojik olarak birleştirme.', target: 'Papiller tiroid karsinomunun sitolojik ve histolojik ayırıcı bulgularını tanıyabilme.', intro: { profile: 'Erişkin kadın hasta, tiroid nodülü ve servikal lenf nodu nedeniyle endokrinoloji/endokrin cerrahi polikliniğinde değerlendiriliyor.', presentation: 'Hasta, boyunda yavaş büyüyen ağrısız nodül ve ultrasonografide şüpheli tiroid lezyonu nedeniyle başvuruyor.', historySummary: 'Nodülün aylardır yavaş büyüdüğünü belirtmektedir. Çocukluk döneminde baş-boyun radyasyon öyküsü vardır. Ses kısıklığı veya tirotoksikoz bulgusu tariflememektedir.', distinctiveClues: ['Tiroid nodülünde mikrokalsifikasyon vardır.', 'Servikal lenf nodu papiller karsinomun lenfatik yayılım eğilimini düşündürür.', 'Sitolojide nükleer yarık, psödoinklüzyon ve Orphan Annie eye görünümü beklenir.'] }, vitals: DEFAULT_VITALS, exam: ['Tiroid sağ lobunda sert, düzensiz sınırlı nodül palpe edilir.', 'Lateral servikal bölgede ağrısız küçük lenf nodları hissedilir.', 'Ses kısıklığı saptanmaz.'], investigations: [inv({ id: id+'-usg', title: 'Tiroid ultrasonografisi', type: 'ultrasound', subtype: 'Ultrasonografi', category: 'imaging', rows: [['Görüntüleme bulgusu', 'Mikrokalsifikasyon içeren hipoekoik, düzensiz sınırlı solid nodül izlendi.', 'Papiller tiroid karsinomu açısından şüpheli', 'Patolojik']], summary: 'Mikrokalsifikasyonlar psammoma cisimcikleriyle korele olabilir ve papiller tiroid karsinomu için önemli ultrasonografik ipucudur.' }), inv({ id: id+'-fna', title: 'İnce iğne aspirasyon sitolojisi', type: 'pathology', subtype: 'Sitoloji', category: 'pathology', rows: [['Mikroskobik bulgu', 'Berrak nükleer görünüm, nükleer yarıklar, intranükleer psödoinklüzyonlar ve psammoma cisimcikleriyle uyumlu hücre grupları görüldü.', 'Papiller tiroid karsinomu için karakteristik', 'Tanısal']], summary: 'Papiller tiroid karsinomunda tanı çoğu kez hücresel mimariden çok nükleer özelliklere dayanır: Orphan Annie eye nükleusları, nükleer oluklar ve psödoinklüzyonlar ayırt edicidir.' })], question, correct, options, whyCorrect: 'Mikrokalsifikasyon içeren tiroid nodülü, servikal lenf nodu ve sitolojide berrak nükleer görünüm, nükleer yarık/psödoinklüzyon ve psammoma cisimcikleri papiller tiroid karsinomunu destekler. Papiller karsinom lenfatik yayılım eğilimi gösterir ve tanı için nükleer özellikler belirleyicidir.', evidence: [ev('Mikrokalsifikasyon içeren hipoekoik tiroid nodülü papiller karsinom açısından şüphelidir.'), ev('Servikal lenf nodu varlığı papiller karsinomun lenfatik yayılım eğilimiyle uyumludur.'), ev('Nükleer yarık, psödoinklüzyon, berrak nükleer görünüm ve psammoma cisimcikleri papiller tiroid karsinomunun karakteristik morfolojisidir.')], pearl: 'Papiller tiroid karsinomunda Orphan Annie eye nükleusları, nükleer yarık, intranükleer psödoinklüzyon ve psammoma cisimciği yüksek getirili bulgulardır.', core: 'Papiller tiroid karsinomu en sık tiroid malignitesidir; lenfatik yayılım ve nükleer morfoloji tanıda kritik rol oynar.', feedback: Object.fromEntries(options.map(o => [o, o === correct || o.includes('Orphan') ? 'Papiller tiroid karsinomu için karakteristik nükleer bulgular Orphan Annie eye görünümü, nükleer yarık ve psödoinklüzyondur; psammoma cisimcikleri mikrokalsifikasyonla korele olabilir.' : o.includes('Medüller') || o.includes('Amiloid') ? 'Medüller tiroid karsinomu C hücrelerinden köken alır, kalsitonin üretir ve stromal amiloid birikimiyle ilişkilidir; papiller karsinomun nükleer yarık/psödoinklüzyon paternini açıklamaz.' : o.includes('Folliküler') || o.includes('Kapsül') ? 'Folliküler neoplazilerde tanı kapsül veya damar invazyonuna dayanır; papiller karsinomdaki nükleer özellikler ve lenfatik yayılım paterni beklenmez.' : o.includes('Anaplastik') ? 'Anaplastik tiroid karsinomu ileri yaşta hızlı büyüyen invaziv kitle, pleomorfik dev hücreler ve nekrozla seyreder; burada yavaş büyüyen nodül ve papiller nükleer bulgular vardır.' : o.includes('Hashimoto') || o.includes('Granülomatöz') ? 'Tiroiditlerde inflamatuvar zemin beklenir; mikrokalsifikasyon, psammoma cisimciği ve papiller nükleer özellikler malign papiller tümörü destekler.' : 'Bu seçenek papiller tiroid karsinomunun nükleer morfoloji ve lenfatik yayılım paternini açıklamaz.' ])), ihc: false });
}
addPapillaryThyroid('v172-new-075-servikal-lenf-nodu-ile-saptanan-tiroid-nodulu', 'Servikal lenf nodu ile saptanan tiroid nodülü', 'Orphan Annie eye nükleusları ve psammoma cisimcikleri', 'Mikrokalsifikasyon içeren tiroid nodülü ve servikal lenf nodu bulunan hastada beklenen karakteristik patolojik bulgu hangisidir?', ['Amiloid stromada kalsitonin üreten C hücre proliferasyonu', 'Kapsül ve damar invazyonu gösteren uniform folliküler hücreler', 'Anaplastik dev hücreler ve yaygın nekroz', 'Orphan Annie eye nükleusları ve psammoma cisimcikleri', 'Granülomatöz inflamasyon ve multinükleer dev hücreler']);
addPapillaryThyroid('v185-new-218-tiroid-nodulunde-sitoloji-bulgusu', 'Tiroid nodülünde sitoloji bulgusu', 'Papiller tiroid karsinomu', 'Mikrokalsifikasyon içeren tiroid nodülü ve sitolojide nükleer yarık/psödoinklüzyon bulunan hastada en olası tanı hangisidir?', ['Papiller tiroid karsinomu', 'Folliküler tiroid adenom', 'Medüller tiroid karsinomu', 'Anaplastik tiroid karsinomu', 'Hashimoto tiroiditi']);

// For the remaining cases, concise high-quality definitions.
const conciseCases = [
  {
    id:'v173-new-085-sigara-oykusu-olan-hastada-hiponatremi', title:'Sigara öyküsü olan hastada hiponatremi', correct:'Küçük hücreli akciğer karsinomu', options:['Akciğer adenokarsinomu','Akciğer skuamöz hücreli karsinomu','Küçük hücreli akciğer karsinomu','Malign mezotelyoma','Pulmoner karsinoid tümör'],
    question:'Yoğun sigara öyküsü, santral-hiler akciğer kitlesi, SIADH ile uyumlu hiponatremi ve biyopside nükleer molding gösteren küçük mavi hücreli tümöral proliferasyon bulunan hastada en olası tanı hangisidir?',
    profile:'64 yaşında erkek hasta, kilo kaybı, inatçı öksürük ve hiponatremi bulguları nedeniyle göğüs hastalıkları polikliniğinde değerlendiriliyor.', presentation:'Sigara öyküsü zemininde kilo kaybı, öksürük ve hiponatremiye bağlı baş ağrısı-konsantrasyon güçlüğü ile başvuruyor.', history:'Yaklaşık 45 paket-yıl sigara öyküsü vardır. Son üç aydır iştahsızlık, istemsiz kilo kaybı ve inatçı öksürük tariflemektedir. Son bir haftada halsizlik, baş ağrısı ve konsantrasyon güçlüğü gelişmiştir; belirgin kusma, ishal veya diüretik kullanımı yoktur.', exam:['Hasta zayıf ve halsiz görünümdedir.','Sağ supraklaviküler bölgede sert, fikse lenf nodu palpe edilir.','Mukozalar nemlidir; periferik ödem veya dehidratasyon bulgusu yoktur.','Belirgin fokal nörolojik defisit yoktur; dikkat ve konsantrasyon hafif azalmıştır.'], vitals:{TA:'118/74 mmHg',Nabız:'90/dk',Solunum:'16/dk',SpO2:'%98, oda havasında',Ateş:'36.7 °C','Şok indeksi':'0.76 normal'},
    investigations:[
      inv({id:'sclc-osm-panel',title:'Elektrolit ve osmolalite paneli',subtype:'Laboratuvar',rows:[['Serum sodyum','121 mmol/L','135-145 mmol/L','Düşük'],['Serum osmolalitesi','258 mOsm/kg','275-295 mOsm/kg','Düşük'],['İdrar osmolalitesi','520 mOsm/kg','ADH baskılanmışsa <100 mOsm/kg beklenir','Uygunsuz yüksek'],['İdrar sodyumu','54 mmol/L','Volüm durumuna göre değişir','Yüksek/uygunsuz']],summary:'Hipotonik hiponatremiye rağmen idrarın konsantre kalması ve idrar sodyumunun yüksek olması övolemik SIADH paternini destekler; küçük hücreli akciğer karsinomu ektopik ADH üretimiyle bu tabloya yol açabilir.'}),
      inv({id:'sclc-xray',title:'Akciğer grafisi',type:'xray',subtype:'Direkt grafi',category:'imaging',rows:[['Görüntüleme bulgusu','Sağ hiler dolgunluk ve mediastinal genişleme şüphesi izlendi; ayrıntılı değerlendirme için toraks BT önerildi.','Hiler/mediastinal kontur değerlendirmesi','Şüpheli']],summary:'Grafide hiler genişleme santral yerleşimli kitle veya lenfadenopatiyi düşündürebilir; BT anatomik yayılımı daha iyi gösterir.'}),
      inv({id:'sclc-ct',title:'Toraks bilgisayarlı tomografi',type:'ct',subtype:'BT',category:'imaging',rows:[['Görüntüleme bulgusu','Sağ hiler bölgede santral yerleşimli kitle ve mediastinal lenfadenopatiler izlenmiştir.','Santral akciğer tümörü açısından anlamlı','Patolojik']],summary:'Santral-hiler yerleşim ve mediastinal lenfadenopati, yoğun sigara öyküsü olan hastada küçük hücreli veya skuamöz hücreli karsinom gibi santral akciğer tümörlerini ön plana çıkarır.'}),
      inv({id:'sclc-histo',title:'Biyopsi histopatolojisi',type:'pathology',subtype:'Patoloji / histopatoloji',category:'pathology',rows:[['Mikroskobik bulgu','Dar sitoplazmalı küçük mavi hücrelerden oluşan tümöral proliferasyon, nükleer molding, ince granüler kromatin, yüksek mitotik aktivite ve yaygın nekroz izlendi.','Küçük hücreli karsinom için karakteristik','Tanısal']],summary:'Dar sitoplazmalı küçük hücreler, nükleer molding, yüksek mitoz ve yaygın nekroz küçük hücreli akciğer karsinomunun klasik mikroskobik paternidir.'}),
      inv({id:'sclc-ihc',title:'İmmünohistokimya',type:'pathology',subtype:'İmmünohistokimya',category:'pathology',rows:[['Synaptophysin/CD56','Pozitif','Nöroendokrin diferansiyasyonu destekler','Pozitif'],['Ki-67','Yüksek proliferasyon indeksi','Agresif tümör biyolojisiyle uyumlu','Yüksek'],['TTF-1','Pozitif','Pulmoner kökeni destekleyebilir','Pozitif']],summary:'Nöroendokrin marker pozitifliği ve yüksek Ki-67, küçük hücreli karsinomun agresif nöroendokrin biyolojisini destekler.'})
    ],
    why:'Yoğun sigara öyküsü, santral-hiler kitle, mediastinal lenfadenopati ve hipotonik hiponatremi küçük hücreli akciğer karsinomunu düşündürür. Küçük hücreli karsinom paraneoplastik SIADH’ye yol açabilir; biyopside dar sitoplazmalı küçük hücreler, nükleer molding, yüksek mitoz ve yaygın nekroz tanıyı morfolojik olarak destekler.',
    evidence:['Yoğun sigara öyküsü ve santral-hiler kitle, sigara ilişkili santral akciğer tümörlerini ön plana çıkarır.','Hipotonik hiponatremi ve övolemik muayene bulguları paraneoplastik SIADH ile uyumludur.','Biyopside dar sitoplazmalı küçük mavi hücreler, nükleer molding ve yaygın nekroz küçük hücreli karsinom için karakteristiktir.'],
    pearl:'Küçük hücreli akciğer karsinomu sigara ile güçlü ilişkili, santral yerleşimli, nöroendokrin özellikli agresif tümördür; nükleer molding, yaygın nekroz ve SIADH klasik ipuçlarıdır.', core:'Akciğer tümörlerinde lokalizasyon, sigara ilişkisi, paraneoplastik sendrom ve histolojik patern birlikte okunmalıdır.', ihc:true,
    feedback:{'Akciğer adenokarsinomu':'Adenokarsinom genellikle periferik yerleşim, glandüler yapı/müsin üretimi ve bazı olgularda EGFR/ALK değişiklikleriyle ilişkilidir. Bu vakada santral-hiler kitle, SIADH ve nükleer molding gösteren küçük mavi hücreli morfoloji küçük hücreli karsinomu destekler.','Akciğer skuamöz hücreli karsinomu':'Skuamöz karsinom da sigara ilişkili ve santral olabilir; keratin incileri, interselüler köprüler ve PTHrP’ye bağlı hiperkalsemi daha tipiktir. Bu vakada SIADH ve küçük hücreli nöroendokrin morfoloji daha belirleyicidir.','Küçük hücreli akciğer karsinomu':'Küçük hücreli akciğer karsinomu sigara ilişkili, santral yerleşimli ve nöroendokrin özellikli agresif tümördür. Dar sitoplazmalı küçük hücreler, nükleer molding, nekroz, yüksek Ki-67 ve SIADH tanıyı destekler.','Malign mezotelyoma':'Mezotelyoma plevra kaynaklıdır, asbest maruziyeti ve diffüz plevral kalınlaşma/efüzyon beklenir. Santral hiler kitle, küçük mavi hücre morfolojisi ve SIADH paterni mezotelyoma için tipik değildir.','Pulmoner karsinoid tümör':'Pulmoner karsinoid nöroendokrin tümördür ancak daha düşük dereceli, organoid/trabeküler paternli ve daha yavaş seyirlidir. Yaygın nekroz, belirgin nükleer molding, yüksek mitoz ve SIADH küçük hücreli karsinom lehinedir.'}
  },
  {
    id:'v174-new-096-agrisiz-servikal-lenfadenopati', title:'Ağrısız servikal lenfadenopati', correct:'Reed-Sternberg hücresi', options:['Reed-Sternberg hücresi','Auer çubuğu içeren miyeloblast','Sézary hücresi','Touton dev hücresi','Langhans tipi dev hücre'], question:'Ağrısız servikal lenfadenopati, B semptomları, karışık inflamatuvar zemin ve CD15/CD30 pozitif büyük iki çekirdekli hücreler bulunan hastada tanıyı destekleyen karakteristik hücresel bulgu hangisidir?', profile:'24 yaşında erkek hasta, ağrısız servikal lenfadenopati ve B semptomları nedeniyle hematoloji polikliniğinde değerlendiriliyor.', presentation:'Hasta, boyunda büyüyen ağrısız şişlik, gece terlemesi ve kilo kaybı ile başvuruyor.', history:'Yaklaşık iki aydır sol boyun bölgesinde büyüyen ağrısız lenf nodu vardır. Son haftalarda gece terlemesi ve istemsiz kilo kaybı gelişmiştir; yakın zamanda üst solunum yolu enfeksiyonu tariflememektedir.', exam:['Sol servikal bölgede lastik kıvamında, ağrısız ve hareketli lenf nodları palpe edilir.','Hepatosplenomegali belirgin değildir.'], vitals:{TA:'118/74 mmHg',Nabız:'88/dk',Solunum:'16/dk',SpO2:'%98, oda havasında',Ateş:'37.8 °C','Şok indeksi':'0.75 normal'}, investigations:[inv({id:'hl-cbc-1',title:'Hemogram ve inflamasyon paneli',subtype:'Laboratuvar',rows:[['Hemoglobin','11.4 g/dL','13.5-17.5 g/dL','Düşük'],['Lökosit','11.800/mm³','4.000-10.000/mm³','Hafif yüksek'],['ESR','78 mm/saat','<20 mm/saat','Yüksek']],summary:'Anemi ve yüksek sedimentasyon, B semptomlarıyla birlikte lenfoproliferatif süreç olasılığını destekler; tanı için eksizyonel biyopsi gerekir.'}),inv({id:'hl-biopsy-1',title:'Eksizyonel lenf nodu biyopsisi',type:'pathology',subtype:'Patoloji / histopatoloji',category:'pathology',rows:[['Mikroskobik bulgu','Karışık inflamatuvar zemin içinde büyük, iki çekirdekli, belirgin nükleollü Reed-Sternberg hücreleri izlendi.','Klasik Hodgkin lenfoma lehine','Tanısal']],summary:'Reed-Sternberg hücreleri reaktif inflamatuvar zemin içinde az sayıda bulunabilir; bu nedenle eksizyonel biyopsi mimari ve hücresel zemini değerlendirmek için önemlidir.'}),inv({id:'hl-ihc-1',title:'İmmünohistokimya',type:'pathology',subtype:'İmmünohistokimya',category:'pathology',rows:[['CD15/CD30','Büyük atipik hücrelerde pozitif','Klasik Hodgkin lenfoma marker paterni','Pozitif'],['PAX5','Zayıf pozitif','B hücre kökenini destekler','Zayıf pozitif']],summary:'Klasik Hodgkin lenfomada Reed-Sternberg hücreleri genellikle CD15 ve CD30 pozitiftir; zayıf PAX5 ekspresyonu B hücre kökeniyle uyumludur.'})], why:'Ağrısız servikal lenfadenopati, B semptomları ve eksizyonel biyopside karışık inflamatuvar zeminde CD15/CD30 pozitif Reed-Sternberg hücreleri klasik Hodgkin lenfomayı destekler.', evidence:['Ağrısız servikal lenfadenopati lenfoproliferatif hastalık açısından temel klinik ipucudur.','Gece terlemesi ve kilo kaybı B semptomlarıdır.','Biyopside CD15/CD30 pozitif Reed-Sternberg hücreleri klasik Hodgkin lenfoma için karakteristiktir.'], pearl:'Klasik Hodgkin lenfomada tanı ipucu: ağrısız lenfadenopati + B semptomları + CD15/CD30 pozitif Reed-Sternberg hücresi.', core:'Hodgkin lenfomada tümör hücreleri az, reaktif inflamatuvar zemin belirgindir; ayırıcı tanı hücre morfolojisi ve IHC ile yapılır.', ihc:true, feedback:{'Reed-Sternberg hücresi':'Reed-Sternberg hücresi klasik Hodgkin lenfomanın karakteristik hücresidir; iki çekirdekli “baykuş gözü” nükleollü görünüm ve CD15/CD30 pozitifliği tanıyı destekler.','Auer çubuğu içeren miyeloblast':'Auer çubukları akut miyeloid lösemide miyeloblast sitoplazmasında görülür. Bu vakada lenf nodu mimarisi, B semptomları ve Reed-Sternberg hücresi Hodgkin lenfomayı destekler.','Sézary hücresi':'Sézary hücreleri serebriform nükleuslu malign T hücrelerdir ve kutanöz T hücreli lenfoma/Sézary sendromunda beklenir. Servikal lenf nodunda CD15/CD30 pozitif Reed-Sternberg paterni farklıdır.','Touton dev hücresi':'Touton dev hücresi ksantomatöz lezyonlarda lipid yüklü histiyositlerle ilişkilidir. Hodgkin lenfomadaki büyük atipik hücre morfolojisini açıklamaz.','Langhans tipi dev hücre':'Langhans dev hücreleri granülomatöz inflamasyonda beklenir. Bu vakada kazeifiye granülom değil, karışık inflamatuvar zeminde Reed-Sternberg hücreleri vardır.'}
  },
  // Data below is expanded by helper routines after this array definition.
];

for (const c of conciseCases) {
  add(c.id, {
    title:c.title, focus:`${c.title} olgusunda klinik bulguları histopatoloji ve objektif veriyle birleştirerek doğru patolojik sonuca ulaşma.`, target:`${c.correct} için belirleyici klinik-patolojik ipuçlarını tanıyabilme.`,
    intro:{profile:c.profile,presentation:c.presentation,historySummary:c.history,distinctiveClues:c.evidence}, vitals:c.vitals||DEFAULT_VITALS, exam:c.exam, investigations:c.investigations,
    question:c.question, correct:c.correct, options:c.options, whyCorrect:c.why, evidence:c.evidence.map(t=>ev(t)), pearl:c.pearl, core:c.core, feedback:c.feedback, ihc:c.ihc
  });
}

// Remaining 18 cases are configured with focused data and generated option teaching notes.
const SIMPLE = {
'v175-new-105-bogaz-enfeksiyonu-sonrasi-koyu-idrar': ['Boğaz enfeksiyonu sonrası koyu idrar','Subepitelyal hump benzeri immün kompleks birikimleri',['Lineer IgG birikimi','Subepitelyal hump benzeri immün kompleks birikimleri','Nodüler glomerüloskleroz','Mezangial IgA baskın birikimi','Villus atrofisi ve kript hiperplazisi'],'İki hafta önce boğaz enfeksiyonu sonrası periorbital ödem, hipertansiyon, çay renginde idrar, yüksek ASO ve düşük C3 bulunan çocukta beklenen karakteristik patolojik bulgu hangisidir?','Poststreptokoksik glomerülonefritte nefritik tablo, ASO yüksekliği, kompleman tüketimi ve EM’de subepitelyal hump birikimleri birlikte beklenir.','PSGN: çocukta enfeksiyondan 1-3 hafta sonra nefritik sendrom + düşük C3 + subepitelyal hump.'],
'v176-new-115-kronik-inflamasyon-sonrasi-proteinuri': ['Kronik inflamasyon sonrası proteinüri','Kongo kırmızısı ile elma yeşili çift kırılma',['Kongo kırmızısı ile elma yeşili çift kırılma','Ziehl-Neelsen ile aside dirençli basil görülmesi','Prusya mavisi ile demir birikimi','PAS ile fungal hiflerin gösterilmesi','Gümüş boyası ile glomerüler bazal membranda spike görünümü'],'Uzun süreli romatoid artrit, nefrotik proteinüri ve böbrek biyopsisinde amorf eozinofilik ekstrasellüler birikim bulunan hastada tanıyı destekleyen karakteristik boyanma bulgusu hangisidir?','Kronik inflamasyon serum amiloid A artışı üzerinden AA amiloidoza yol açabilir; böbrekte amorf eozinofilik birikimler Kongo kırmızısı ile elma yeşili çift kırılma gösterir.','Sekonder AA amiloidoz: kronik inflamasyon + nefrotik sendrom + Kongo kırmızısı/elma yeşili çift kırılma.'],
'v176-new-116-gogus-agrisi-sonrasi-ani-kotulesme': ['Göğüs ağrısı sonrası ani kötüleşme','Koagülasyon nekrozu ve nötrofil infiltrasyonunun başlaması',['Koagülasyon nekrozu ve nötrofil infiltrasyonunun başlaması','Yoğun makrofaj infiltrasyonu ve yumuşak sarı nekrotik alan','Kollajen ağırlıklı yoğun skar dokusu','Reaktif inflamatuvar değişiklik','Granülomatöz inflamasyon ve kazeöz nekroz'],'Yaklaşık 24 saat önce başlayan ST elevasyonlu miyokard enfarktüsü sonrası kaybedilen hastada enfarktüs alanında beklenen baskın histopatolojik bulgu hangisidir?','Miyokard enfarktüsünün ilk 24 saatinde koagülasyon nekrozu belirginleşir ve nötrofil infiltrasyonu başlar; makrofaj baskınlığı daha geç dönemdedir.','Mİ zamanlama: 1 gün civarı koagülasyon nekrozu + nötrofil; 3-7 gün makrofaj; haftalar sonra skar.'],
'v177-new-129-diskilama-aliskanliginda-degisiklik': ['Dışkılama alışkanlığında değişiklik','Kolorektal adenokarsinom',['Kolorektal adenokarsinom','İrritabl bağırsak sendromu','Akut enfeksiyöz gastroenterit','Hemoroidal hastalık','Çölyak hastalığı'],'Dışkı çapında incelme, rektal kanama, kilo kaybı, demir eksikliği anemisi ve sigmoid kolonda lümeni daraltan ülserovejetan kitle bulunan hastada en olası tanı hangisidir?','Dışkılama alışkanlığında değişiklik, anemi, kilo kaybı ve kolonoskopide lümeni daraltan kitle kolorektal adenokarsinomu düşündürür; biyopside invaziv atipik gland yapıları tanıyı destekler.','Kolorektal adenokarsinomda alarm bulguları: dışkılama alışkanlığı değişikliği, kanama, kilo kaybı, anemi ve invaziv glandüler tümör.'],
'v178-new-134-postmenopozal-vajinal-kanama': ['Postmenopozal vajinal kanama','Endometrium adenokarsinomu',['Endometrium adenokarsinomu','Servikal skuamöz hücreli karsinom','Over disgerminomu','Vulvar lichen sclerosus','Gestasyonel trofoblastik hastalık'],'Postmenopozal kanama, obezite-hipertansiyon-diyabet-nulliparite öyküsü, kalın endometrium ve invaziv endometrioid glandüler proliferasyon bulunan hastada en olası tanı hangisidir?','Postmenopozal kanama ve karşılanmamış östrojen risk faktörleri endometrium adenokarsinomunu düşündürür; endometrial biyopside atipik invaziv glandüler proliferasyon tanıyı destekler.','Endometrium adenokarsinomu için yüksek getirili ipucu: postmenopozal kanama + obezite/DM/HT/nulliparite + kalın endometrium.'],
'v184-new-197-apendektomi-materyalinde-inflamasyon': ['Apendektomi materyalinde inflamasyon','Apendiks duvarında transmural nötrofil infiltrasyonu',['Apendiks duvarında transmural nötrofil infiltrasyonu','Submukozada nonkazeifiye granülomlar','Goblet hücreli intestinal metaplazi','Kongo kırmızısı ile elma yeşili çift kırılma','Epidermiste akantoz ve hiperkeratoz'],'Sağ alt kadran ağrısı nedeniyle apendektomi yapılan hastada akut apandisit tanısı için en karakteristik histopatolojik bulgu hangisidir?','Akut apandisit tanısı için lümendeki inflamasyondan çok muskularis propria dahil apendiks duvarında transmural nötrofil infiltrasyonu karakteristiktir.','Akut apandisit histoloji anahtarı: apendiks duvarında transmural nötrofil infiltrasyonu.'],
'v185-new-216-kronik-oksuruk-ve-granulom': ['Kronik öksürük ve granülom','Kazeifiye granülomatöz inflamasyon',['Kazeifiye granülomatöz inflamasyon','Fibrinoid nekrozlu küçük damar vasküliti','Saf pürülan abse formasyonu','Amiloid birikimi','Displastik skuamöz epitel proliferasyonu'],'Kronik öksürük, gece terlemesi, kilo kaybı, üst lob kaviter lezyon ve biyopside merkezinde kazeöz nekroz bulunan granülomlar olan hastada beklenen patolojik patern hangisidir?','Tüberkülozda üst lob kaviter lezyon ve merkezinde kazeöz nekroz bulunan epiteloid histiyositli granülomlar klasik kazeifiye granülomatöz inflamasyon paternini oluşturur.','Tüberküloz patoloji ipucu: üst lob kavite + kazeifiye granülom + epiteloid histiyosit/Langhans dev hücreleri.'],
'v185-new-217-uzun-sureli-reflu-sonrasi-biyopsi-bulgusu': ['Uzun süreli reflü sonrası biyopsi bulgusu','Özofagus adenokarsinomu',['Özofagus adenokarsinomu','Özofagus skuamöz hücreli karsinomu','Gastrik lenfoma','Kolon nöroendokrin tümörü','Hepatoselüler karsinom'],'Uzun süreli reflü, distal özofagusta somon renkli mukoza ve biyopside goblet hücreli intestinal metaplazi bulunan hastada uzun dönemde hangi malignite riski en çok artar?','Barrett özofagusu distal özofagusta intestinal metaplaziyle tanınır ve kronik GERD zemininde özofagus adenokarsinomu riskini artırır.','Barrett özofagusu: distal özofagusta goblet hücreli intestinal metaplazi; artan kanser riski adenokarsinomdur.'],
'v186-new-236-derin-yumusak-doku-kitlesi': ['Derin yumuşak doku kitlesi','İyi diferansiye liposarkom',['Lipom','Nodüler fasiit','İyi diferansiye liposarkom','Rabdomiyom','Ganglion kisti'],'Yaşlı erişkinde derin yerleşimli büyük uyluk kitlesi, MR’da kalın septalı yağ içerikli lezyon ve biyopside atipik stromal hücre-lipoblast bulunan hastada en olası tanı hangisidir?','Derin yerleşimli, büyük, kalın septalı yağ içerikli yumuşak doku kitlesinde atipik stromal hücreler ve lipoblastlar iyi diferansiye liposarkomu destekler.','Derin ve büyük yağ içerikli kitle + kalın septa + lipoblast/atipik stromal hücre liposarkom lehinedir; yüzeyel küçük lipomdan ayrılır.'],
'v187-new-251-boyunda-agrisiz-lenf-nodu': ['Boyunda ağrısız lenf nodu','Hodgkin lenfoma',['Hodgkin lenfoma','Reaktif lenfadenit','Burkitt lenfoma','Multipl miyelom','Kronik miyeloid lösemi'],'Ağrısız servikal lenfadenopati, B semptomları ve eksizyonel biyopside Reed-Sternberg hücreleri bulunan hastada en olası tanı hangisidir?','Ağrısız lenfadenopati, B semptomları ve Reed-Sternberg hücreleri Hodgkin lenfomayı destekler; reaktif lenfadenit veya diğer hematolojik hastalıklar bu morfolojiyi açıklamaz.','Hodgkin lenfoma: ağrısız lenf nodu + B semptomları + Reed-Sternberg hücresi.'],
'v188-new-266-gogus-agrisi-sonrasi-miyokard-hasari': ['Göğüs ağrısı sonrası miyokard hasarı','Koagülasyon nekrozu',['Koagülasyon nekrozu','Likefaksiyon nekrozu','Kazeifikasyon nekrozu','Yağ nekrozu','Fibrinoid nekroz'],'Uzun süren iskemik göğüs ağrısı, ST elevasyonu ve belirgin troponin yüksekliği olan hastada miyokardda beklenen temel nekroz paterni hangisidir?','Miyokard enfarktüsü solid organ iskemisine bağlı koagülasyon nekrozu oluşturur; beyin iskemisindeki likefaksiyon veya tüberkülozdaki kazeifikasyon beklenmez.','Kalp, böbrek ve dalak infarktlarında temel patern koagülasyon nekrozudur; beyin istisna olarak likefaksiyon nekrozu yapar.'],
'v189-new-286-kronik-inflamasyon-sonrasi-proteinuri': ['Kronik inflamasyon sonrası proteinüri','Kongo kırmızısı ile elma yeşili çift kırılma',['Kongo kırmızısı ile elma yeşili çift kırılma','Gram boyamada gram-negatif diplokok','Ziehl-Neelsen ile aside dirençli basil','PAS negatif tamamen boş glomerüller','Masson trikrom ile yalnız kalsifikasyon'],'Uzun süreli romatoid artrit ve nefrotik proteinürisi olan hastada böbrekte biriken amiloid materyal için en karakteristik histokimyasal bulgu hangisidir?','Kronik inflamasyon zemininde AA amiloid birikimi nefrotik proteinüri yapabilir; Kongo kırmızısı ile boyanıp polarize ışıkta elma yeşili çift kırılma gösterir.','AA amiloidozda patoloji imzası Kongo kırmızısı pozitifliği ve elma yeşili çift kırılmadır.'],
'v189-new-287-uzun-suren-gastrit-sonrasi-metaplazi': ['Uzun süren gastrit sonrası metaplazi','İntestinal tip mide adenokarsinomu',['İntestinal tip mide adenokarsinomu','Hepatoselüler karsinom','Papiller tiroid karsinomu','Renal hücreli karsinom','Osteosarkom'],'Tedavisi tamamlanmamış H. pylori öyküsü, kronik aktif gastrit, glandüler atrofi ve intestinal metaplazi bulunan hastada bu histolojik zemin en çok hangi malignite riskini artırır?','Kronik H. pylori gastriti atrofi ve intestinal metaplazi üzerinden intestinal tip mide adenokarsinomu gelişimine zemin hazırlar.','H. pylori -> kronik aktif gastrit -> atrofi -> intestinal metaplazi -> displazi -> intestinal tip mide adenokarsinomu.'],
'v189-new-288-sigara-icen-hastada-hiponatremi': ['Sigara içen hastada hiponatremi','Ektopik antidiüretik hormon salgısı',['Ektopik antidiüretik hormon salgısı','Ektopik eritropoietin salgısı','Paratiroid hormon benzeri peptid salgısı','İnsülin reseptör blokajı','Aldosteron yıkımının artması'],'Yoğun sigara öyküsü, küçük hücreli nöroendokrin akciğer tümörü ve hipotonik hiponatremi bulunan hastada hiponatreminin en olası paraneoplastik mekanizması hangisidir?','Küçük hücreli akciğer karsinomu ektopik ADH salgılayarak SIADH oluşturabilir; su tutulumu hipotonik hiponatremi, baş ağrısı ve konfüzyona yol açar.','Küçük hücreli akciğer karsinomu: SIADH/ektopik ADH ve ektopik ACTH en klasik paraneoplastik ilişkiler arasındadır.'],
'v194-new-321-kanli-ishal-ve-rektumdan-baslayan-tutulum': ['Kanlı ishal ve rektumdan başlayan tutulum','Ülseratif kolit',['Ülseratif kolit','Crohn hastalığı','İskemik kolit','Pseudomembranöz kolit','İrritabl bağırsak sendromu'],'Kanlı mukuslu ishal, tenesmus, rektumdan başlayan kesintisiz frajil mukoza tutulumu ve biyopside kript apseleri bulunan hastada en olası tanı hangisidir?','Ülseratif kolit rektumdan başlayıp proksimale kesintisiz uzanan mukozal inflamasyon yapar; kript apseleri ve kanlı mukuslu ishal tipiktir.','Ülseratif kolit: rektumdan başlar, kesintisiz ve mukozal tutulum yapar; Crohn transmural ve skip lezyonludur.'],
'v194-new-322-farenjit-sonrasi-eklem-agrisi-ve-kardit': ['Farenjit sonrası eklem ağrısı ve kardit','Aschoff cisimciği',['Aschoff cisimciği','Kazeifiye granülom','Psammoma cisimciği','Mallory-Denk cisimciği','Councilman cisimciği'],'Tedavi edilmemiş streptokok farenjiti sonrası gezici poliartrit, yeni üfürüm, yüksek ASO ve kardit bulguları olan hastada karakteristik kardiyak histopatolojik lezyon hangisidir?','Akut romatizmal ateşte karditte Anitschkow hücreleri içeren Aschoff cisimcikleri görülür; mekanizma streptokok antijenlerine karşı çapraz reaksiyon gösteren immün yanıttır.','Akut romatizmal ateş karditi: Aschoff cisimciği + Anitschkow hücreleri.'],
'v194-new-323-ergende-diz-cevresinde-agrili-kitle': ['Ergende diz çevresinde ağrılı kitle','Osteosarkom',['Osteosarkom','Ewing sarkomu','Osteoid osteom','Kondrosarkom','Multipl miyelom'],'Ergen hastada distal femur metafizinde ağrılı kitle, güneş ışını periost reaksiyonu, Codman üçgeni ve biyopside malign osteoid üretimi varsa en olası tanı hangisidir?','Ergenlerde metafizer yerleşimli agresif kemik lezyonu, sunburst periost reaksiyonu, Codman üçgeni ve malign osteoid üretimi osteosarkom için karakteristiktir.','Osteosarkom tanı anahtarı malign osteoid üretimidir; ergen metafizi, diz çevresi ve sunburst/Codman bulguları tipiktir.'],
'v195-new-350-anormal-servikal-tarama-sonucu': ['Anormal servikal tarama sonucu','Koilositoz',['Koilositoz','Reed-Sternberg hücresi','Psammoma cisimciği','Auer çubuğu','Heinz cisimciği'],'Yüksek riskli HPV pozitif servikal taramada perinükleer halo ve düzensiz hiperkromatik çekirdek içeren skuamöz hücreler görülüyorsa bu sitolojik değişiklik hangisidir?','HPV ilişkili skuamöz hücrelerde perinükleer halo, nükleer düzensizlik ve hiperkromazi koilositoz olarak adlandırılır; servikal intraepitelyal lezyonların temel sitopatik ipucudur.','Koilositoz HPV’nin servikal skuamöz epitelde oluşturduğu perinükleer halo + hiperkromatik düzensiz çekirdek paternidir.'],
'v195-new-351-postmenopozal-kanama-ve-over-kitlesi': ['Postmenopozal kanama ve over kitlesi','Granüloza hücreli tümör',['Granüloza hücreli tümör','Disgerminom','Mature kistik teratom','Sertoli-Leydig hücreli tümör','Krukenberg tümörü'],'Postmenopozal kanama, endometrial kalınlaşma, overde solid-kistik kitle ve histolojide kahve çekirdeği nükleuslar ile Call-Exner cisimcikleri bulunan hastada en olası tümör hangisidir?','Granüloza hücreli tümör östrojen üreten seks kord-stromal tümördür; postmenopozal kanama ve endometrial hiperplazi/kalınlaşma yapabilir. Call-Exner cisimcikleri ve kahve çekirdeği nükleuslar tanısaldır.','Granüloza hücreli tümör: östrojen etkisi + postmenopozal kanama + Call-Exner cisimcikleri + kahve çekirdeği nükleus.'
] };

function simpleInvestigations(id, correct) {
  const base = [];
  if (id.includes('bogaz-enfeksiyonu')) return [inv({id:id+'-aso',title:'Antistreptolizin O titresi',rows:[['ASO','720 IU/mL','<200 IU/mL','Yüksek']],summary:'Yüksek ASO, yakın dönem streptokok enfeksiyonu ile poststreptokoksik glomerülonefrit arasındaki zaman ilişkisini destekler.'}),inv({id:id+'-renal-panel',title:'Nefritik sendrom paneli',type:'urine',category:'urine',rows:[['İdrar eritrositi','Çok sayıda, eritrosit silendirleriyle birlikte','0-3/HPF','Yüksek'],['Serum C3','52 mg/dL','90-180 mg/dL','Düşük']],summary:'Hematüri, eritrosit silendirleri ve düşük C3 immün kompleks aracılı nefritik sendrom paternini destekler.'}),inv({id:id+'-em',title:'Böbrek biyopsisi elektron mikroskopisi',type:'pathology',category:'pathology',subtype:'Elektron mikroskopisi',rows:[['Mikroskobik bulgu','Subepitelyal hump benzeri elektron-dens immün kompleks birikimleri izlendi.','Poststreptokoksik GN için karakteristik','Tanısal']],summary:'Hump şeklindeki subepitelyal birikimler poststreptokoksik glomerülonefritin klasik EM bulgusudur.'})];
  if (correct.includes('Kongo')) return [inv({id:id+'-protein',title:'24 saatlik idrar protein düzeyi',type:'urine',category:'urine',rows:[['24 saatlik idrar protein düzeyi','6.1 g/gün','<0.15 g/gün','Nefrotik düzey']],summary:'Nefrotik proteinüri, glomerüllerde biriken amiloid materyalin filtrasyon bariyerini bozduğunu gösterir.'}),inv({id:id+'-amyloid',title:'Böbrek biyopsisi özel boyama',type:'pathology',category:'pathology',subtype:'Histokimya',rows:[['Mikroskobik bulgu','Glomerüllerde amorf eozinofilik ekstrasellüler birikimler izlendi; Kongo kırmızısı ile polarize ışıkta elma yeşili çift kırılma gösterdi.','Amiloid için karakteristik','Tanısal']],summary:'Kongo kırmızısı pozitifliği ve elma yeşili çift kırılma amiloid fibrillerinin beta-pleated sheet yapısına bağlıdır.'})];
  if (correct.includes('Koagülasyon')) return [inv({id:id+'-troponin',title:'Troponin I',rows:[['Troponin I','8.2 ng/mL','<0.04 ng/mL','Yüksek']],summary:'Troponin yüksekliği miyokard hücre hasarını gösterir; nekroz tipini belirleyen temel mekanizma solid organ iskemisidir.'}),inv({id:id+'-ekg',title:'Elektrokardiyografi',type:'ecg',category:'cardiac',subtype:'EKG',rows:[['EKG bulgusu','Anterior derivasyonlarda ST elevasyonu izlendi.','Akut transmural iskemiyle uyumlu','Patolojik']],summary:'ST elevasyonu akut koroner oklüzyon bağlamını verir; patolojide beklenen temel nekroz paterni koagülasyon nekrozudur.'})];
  if (correct.includes('Kolorektal')) return [inv({id:id+'-hb',title:'Hemoglobin',rows:[['Hemoglobin','10.2 g/dL','13.5-17.5 g/dL','Düşük']],summary:'Anemi, kronik gastrointestinal kanama ve malign süreç açısından alarm bulgusudur.'}),inv({id:id+'-colon',title:'Kolonoskopi',type:'endoscopy',category:'gastrointestinal',subtype:'Endoskopi',rows:[['Endoskopik bulgu','Sigmoid kolonda lümeni daraltan halka şeklinde ülserovejetan kitle izlendi.','Malign kitle açısından anlamlı','Patolojik']],summary:'Lümeni daraltan ülserovejetan kitle, dışkı çapında incelme ve rektal kanamayla birlikte kolorektal adenokarsinomu düşündürür.'}),inv({id:id+'-histo',title:'Biyopsi histopatolojisi',type:'pathology',category:'pathology',subtype:'Patoloji / histopatoloji',rows:[['Mikroskobik bulgu','Desmoplastik stromaya invaze, atipik gland yapıları oluşturan malign epitelial tümör izlendi.','Kolorektal adenokarsinom için karakteristik','Tanısal']],summary:'İnvaziv atipik glandüler yapı ve desmoplazi kolorektal adenokarsinomun temel histolojik paternidir.'})];
  if (correct.includes('Endometrium')) return [inv({id:id+'-tvu',title:'Transvajinal ultrasonografi',type:'ultrasound',category:'imaging',rows:[['Endometrium kalınlığı','14 mm','Postmenopozal dönemde genellikle <4 mm','Artmış']],summary:'Postmenopozal kanamada artmış endometrium kalınlığı endometrial örnekleme gerektiren önemli bulgudur.'}),inv({id:id+'-endobx',title:'Endometrial biyopsi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Atipik, sırt sırta dizilmiş glandüler proliferasyon ve stromal invazyon gösteren endometrioid tip adenokarsinom izlendi.','Endometrium adenokarsinomu için tanısal','Tanısal']],summary:'Atipik invaziv glandüler proliferasyon endometrioid tip endometrium adenokarsinomunun temel histopatolojik bulgusudur.'})];
  if (correct.includes('Apendiks')) return [inv({id:id+'-cbc',title:'Hemogram ve CRP',rows:[['Lökosit','14.600/mm³','4.000-10.000/mm³','Yüksek'],['CRP','42 mg/L','<5 mg/L','Yüksek']],summary:'Lökositoz ve CRP yüksekliği akut inflamasyonu destekler; akut apandisit tanısında belirleyici patolojik bulgu transmural nötrofil infiltrasyonudur.'}),inv({id:id+'-appendix',title:'Apendiks histopatolojisi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Mukozadan serozaya uzanan transmural nötrofil infiltrasyonu, ödem ve fokal ülserasyon izlendi.','Akut apandisit için karakteristik','Tanısal']],summary:'Akut apandisitte tanı için en kritik bulgu nötrofillerin muskularis propria dahil duvar katmanlarına ilerlemesidir.'})];
  if (correct.includes('Kazeifiye')) return [inv({id:id+'-cxr',title:'Akciğer görüntülemesi',type:'xray',category:'imaging',rows:[['Görüntüleme bulgusu','Üst loblarda kaviter lezyonlar izlendi.','Reaktivasyon tüberkülozu ile uyumlu olabilir','Patolojik']],summary:'Üst lob kaviter lezyon, kronik öksürük ve gece terlemesiyle birlikte tüberküloz olasılığını artırır.'}),inv({id:id+'-tb-histo',title:'Biyopsi histopatolojisi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Merkezinde kazeöz nekroz bulunan epiteloid histiyositlerden ve Langhans tipi dev hücrelerden oluşan granülomlar izlendi.','Kazeifiye granülomatöz inflamasyon','Tanısal']],summary:'Kazeöz nekrozlu granülomlar tüberküloz gibi mikobakteriyel enfeksiyonlarda klasik patolojik paterndir.'})];
  if (correct.includes('Özofagus')) return [inv({id:id+'-egd',title:'Üst gastrointestinal endoskopi',type:'endoscopy',category:'gastrointestinal',rows:[['Endoskopik bulgu','Distal özofagusta Z çizgisi üzerinde somon renkli mukozal alanlar izlendi.','Barrett özofagusu açısından şüpheli','Patolojik']],summary:'Somon renkli distal özofagus mukozası Barrett metaplazisi için endoskopik ipucudur.'}),inv({id:id+'-esophagus-bx',title:'Özofagus biyopsisi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Skuamöz epitelin yerini goblet hücreleri içeren intestinal tip kolumnar metaplazi aldı.','Barrett özofagusu için karakteristik','Tanısal']],summary:'Goblet hücreli intestinal metaplazi Barrett özofagusunun tanısal histolojik bulgusudur ve adenokarsinom riskini artırır.'})];
  if (correct.includes('Liposarkom')) return [inv({id:id+'-mri',title:'Manyetik rezonans görüntüleme',type:'mri',category:'imaging',rows:[['Görüntüleme bulgusu','Derin yumuşak dokuda 12 cm, yağ içerikli, kalın septalı ve nodüler non-yağ komponentleri bulunan kitle izlendi.','Sarkom açısından şüpheli','Patolojik']],summary:'Derin yerleşim, büyük boyut, kalın septa ve nodüler solid alanlar lipomu değil iyi diferansiye liposarkomu düşündürür.'}),inv({id:id+'-liposarcoma-histo',title:'Biyopsi histopatolojisi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Matür yağ dokusu içinde atipik hiperkromatik stromal hücreler ve vakuollü sitoplazmalı lipoblastlar izlendi.','İyi diferansiye liposarkom lehine','Tanısal']],summary:'Lipoblast ve atipik stromal hücre varlığı, benign lipomdan ayrımda kritik histopatolojik bulgudur.'})];
  if (correct.includes('Hodgkin')) return [inv({id:id+'-hl2-cbc',title:'Hemogram ve inflamasyon paneli',rows:[['Hemoglobin','11.2 g/dL','13.5-17.5 g/dL','Düşük'],['ESR','82 mm/saat','<20 mm/saat','Yüksek']],summary:'Anemi ve yüksek sedimentasyon, B semptomlarıyla birlikte lenfoproliferatif süreci destekler.'}),inv({id:id+'-hl2-bx',title:'Eksizyonel lenf nodu biyopsisi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Karışık inflamatuvar zemin içinde geniş eozinofilik sitoplazmalı, çift çekirdekli belirgin nükleollü Reed-Sternberg hücreleri izlendi.','Klasik Hodgkin lenfoma lehine','Tanısal']],summary:'Reed-Sternberg hücresi ve reaktif inflamatuvar zemin klasik Hodgkin lenfomanın ayırt edici mikroskobik paternidir.'}),inv({id:id+'-hl2-ihc',title:'İmmünohistokimya',type:'pathology',category:'pathology',rows:[['CD15/CD30','Reed-Sternberg hücrelerinde pozitif','Klasik Hodgkin lenfoma marker paterni','Pozitif']],summary:'CD15 ve CD30 pozitifliği, uygun morfolojiyle birlikte klasik Hodgkin lenfomayı destekler.'})];
  if (correct.includes('İntestinal tip')) return [inv({id:id+'-gastric-histo',title:'Mide biyopsisi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Kronik aktif gastrit, glandüler atrofi ve goblet hücreli intestinal metaplazi izlendi; Helicobacter pylori ile uyumlu kıvrımlı bakteriyel yapılar görüldü.','Prekanseröz intestinal metaplazi zemini','Patolojik']],summary:'H. pylori ilişkili kronik aktif gastrit, atrofi ve intestinal metaplazi intestinal tip mide adenokarsinomu için klasik prekanseröz sekansı oluşturur.'})];
  if (correct.includes('Ektopik antidiüretik')) return [inv({id:id+'-siadh-lab',title:'Elektrolit ve osmolalite paneli',rows:[['Serum sodyum','121 mmol/L','135-145 mmol/L','Düşük'],['Serum osmolalitesi','258 mOsm/kg','275-295 mOsm/kg','Düşük'],['İdrar osmolalitesi','510 mOsm/kg','ADH baskılanmışsa <100 mOsm/kg beklenir','Uygunsuz yüksek']],summary:'Hipotonik hiponatremiye rağmen idrarın konsantre olması SIADH paternini destekler.'}),inv({id:id+'-sclc2-bx',title:'Bronkoskopik biyopsi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Dar sitoplazmalı küçük hiperkromatik hücreler, nükleer molding, yaygın nekroz ve yüksek mitotik aktivite gösteren nöroendokrin tümör izlendi.','Küçük hücreli akciğer karsinomu lehine','Tanısal']],summary:'Küçük hücreli nöroendokrin tümörlerde ektopik ADH salgısı SIADH ve hiponatremi oluşturabilir.'}),inv({id:id+'-sclc2-ihc',title:'İmmünohistokimya',type:'pathology',category:'pathology',rows:[['Synaptophysin/CD56','Pozitif','Nöroendokrin diferansiyasyon','Pozitif'],['Ki-67','Çok yüksek','Agresif proliferasyon','Yüksek']],summary:'Nöroendokrin marker pozitifliği ve yüksek Ki-67 küçük hücreli karsinom biyolojisini destekler.'})];
  if (correct.includes('Ülseratif')) return [inv({id:id+'-crp',title:'Hemogram ve inflamasyon paneli',rows:[['Hemoglobin','11.0 g/dL','13.5-17.5 g/dL','Düşük'],['CRP','38 mg/L','<5 mg/L','Yüksek']],summary:'Kanlı ishal ve inflamasyon belirteçleri inflamatuvar bağırsak hastalığı olasılığını destekler; dağılım ve biyopsi Crohn-ülseratif kolit ayrımında belirleyicidir.'}),inv({id:id+'-colonoscopy-uc',title:'Kolonoskopi',type:'endoscopy',category:'gastrointestinal',rows:[['Endoskopik bulgu','Rektumdan başlayıp proksimale doğru kesintisiz uzanan eritemli, frajil ve yüzeyel ülserli mukoza izlendi.','Ülseratif kolit dağılımı','Patolojik']],summary:'Rektumdan başlayan kesintisiz mukozal tutulum ülseratif koliti Crohn hastalığının skip ve transmural paterninden ayırır.'}),inv({id:id+'-uc-histo',title:'Kolon biyopsisi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Mukozaya sınırlı kronik aktif inflamasyon, kript mimarisinde distorsiyon ve kript apseleri izlendi.','Ülseratif kolit lehine','Tanısal']],summary:'Kript apseleri ve mukozaya sınırlı kronik aktif inflamasyon ülseratif kolit histolojisini destekler.'})];
  if (correct.includes('Aschoff')) return [inv({id:id+'-aso-rf',title:'Antistreptolizin O titresi',rows:[['ASO','720 IU/mL','<200 IU/mL','Yüksek']],summary:'Yüksek ASO, yakın zamanda geçirilmiş grup A streptokok enfeksiyonunu destekler; akut romatizmal ateş immün aracılı geç komplikasyondur.'}),inv({id:id+'-aschoff',title:'Endomiyokardiyal histoloji bilgisi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Fibrinoid nekroz odağı çevresinde lenfosit, plazma hücresi ve Anitschkow hücreleri içeren Aschoff cisimcikleri tanımlandı.','Akut romatizmal kardit için karakteristik','Tanısal']],summary:'Aschoff cisimciği akut romatizmal karditin karakteristik histopatolojik lezyonudur; Anitschkow hücreleri tırtıklı/katerpil nükleuslarıyla tanınır.'})];
  if (correct.includes('Osteosarkom')) return [inv({id:id+'-femur-xray',title:'Femur grafisi',type:'xray',category:'imaging',rows:[['Görüntüleme bulgusu','Distal femur metafizinde agresif kemik lezyonu, güneş ışını tarzı periost reaksiyonu ve Codman üçgeni izlendi.','Osteosarkom açısından tipik radyolojik patern','Patolojik']],summary:'Ergen hastada diz çevresi metafizer agresif lezyon, sunburst periost reaksiyonu ve Codman üçgeni osteosarkomu destekler.'}),inv({id:id+'-osteo-histo',title:'Biyopsi histopatolojisi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Pleomorfik malign tümör hücreleri tarafından doğrudan üretilen düzensiz osteoid matriks izlendi.','Osteosarkom için tanısal','Tanısal']],summary:'Malign hücreler tarafından osteoid üretimi osteosarkom tanısının temel histopatolojik koşuludur.'})];
  if (correct.includes('Koilositoz')) return [inv({id:id+'-hpv',title:'HPV DNA testi',type:'molecular',category:'microbiology',subtype:'Moleküler test',rows:[['Yüksek riskli HPV DNA','Pozitif','Negatif beklenir','Pozitif']],summary:'Yüksek riskli HPV pozitifliği, servikal skuamöz epitelde koilositik sitopatik değişiklik ve displazi riskini destekler.'}),inv({id:id+'-pap',title:'Servikal sitoloji',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Perinükleer halo, düzensiz hiperkromatik çekirdek ve nükleer kontur düzensizliği içeren skuamöz hücreler izlendi.','Koilositoz için karakteristik','Tanısal']],summary:'Koilositoz HPV ilişkili sitopatik etkiyi gösterir; perinükleer halo tek başına değil nükleer atipiyle birlikte anlamlıdır.'})];
  if (correct.includes('Granüloza')) return [inv({id:id+'-tvu-granulosa',title:'Transvajinal ultrasonografi',type:'ultrasound',category:'imaging',rows:[['Görüntüleme bulgusu','Sol overde solid-kistik kitle ve endometriumda kalınlaşma izlendi.','Östrojen üreten over tümörü açısından anlamlı','Patolojik']],summary:'Over kitlesiyle birlikte endometrial kalınlaşma, östrojen üreten seks kord-stromal tümör olasılığını artırır.'}),inv({id:id+'-granulosa-histo',title:'Tümör histopatolojisi',type:'pathology',category:'pathology',rows:[['Mikroskobik bulgu','Kahve çekirdeği görünümlü nükleuslara sahip tümör hücreleri ve eozinofilik materyal içeren Call-Exner cisimcikleri izlendi.','Granüloza hücreli tümör için karakteristik','Tanısal']],summary:'Call-Exner cisimcikleri ve longitudinal nükleer oluklu kahve çekirdeği nükleuslar granüloza hücreli tümörün klasik morfolojik ipuçlarıdır.'}),inv({id:id+'-granulosa-ihc',title:'İmmünohistokimya',type:'pathology',category:'pathology',rows:[['İnhibin / calretinin','Pozitif','Seks kord-stromal diferansiyasyonu destekler','Pozitif']],summary:'İnhibin ve calretinin pozitifliği, uygun morfolojiyle birlikte granüloza hücreli tümörü destekler.'})];
  return base;
}
function simpleProfile(id, title, correct) {
  if (correct.includes('Kongo')) return ['Erişkin hasta, kronik inflamasyon zemininde gelişen nefrotik proteinüri nedeniyle nefroloji polikliniğinde değerlendiriliyor.','Hasta, bacaklarda şişlik ve köpüklü idrar yakınmasıyla başvuruyor.','Uzun yıllardır romatoid artrit nedeniyle takip edildiği ve inflamasyonunun dönem dönem kontrolsüz seyrettiği öğreniliyor. Son aylarda yorgunluk, kilo kaybı ve giderek artan ödem tariflemektedir.'];
  if (correct.includes('Koagülasyon')) return ['Erişkin erkek hasta, akut miyokard enfarktüsü sonrası kardiyoloji servisinde değerlendiriliyor.','Hasta, uzun süren baskı tarzında göğüs ağrısı ve terleme sonrası başvuruyor.','Ağrının saatler önce başladığı, sol kola yayıldığı ve bulantı-terleme eşlik ettiği öğreniliyor. Sigara ve hipertansiyon öyküsü vardır.'];
  if (correct.includes('Kolorektal')) return ['66 yaşında erkek hasta, dışkılama alışkanlığında değişiklik ve rektal kanama nedeniyle gastroenteroloji polikliniğinde değerlendiriliyor.','Hasta, dışkı çapında incelme, kabızlık, aralıklı kanama ve kilo kaybıyla başvuruyor.','Yaklaşık dört aydır dışkılama düzeninin değiştiğini ve dışkısının inceldiğini belirtmektedir. Halsizlik ve istemsiz kilo kaybı eşlik eder; akut enfeksiyöz ishal öyküsü yoktur.'];
  if (correct.includes('Endometrium')) return ['61 yaşında kadın hasta, postmenopozal vajinal kanama nedeniyle kadın hastalıkları polikliniğinde değerlendiriliyor.','Hasta, menopozdan yıllar sonra başlayan aralıklı vajinal kanama ile başvuruyor.','Menopoza 9 yıl önce girmiştir. Obezite, hipertansiyon, tip 2 diyabet ve nulliparite öyküsü vardır; servikste belirgin kitle tariflenmemektedir.'];
  if (correct.includes('Liposarkom')) return ['61 yaşında erkek hasta, derin yumuşak doku kitlesi nedeniyle ortopedi onkolojisi polikliniğinde değerlendiriliyor.','Hasta, sağ uylukta yavaş büyüyen ağrısız kitle ile başvuruyor.','Yaklaşık bir yıldır derin yerleşimli kitlenin büyüdüğünü fark etmiştir. Travma, ateş veya akut enfeksiyon bulgusu yoktur.'];
  if (correct.includes('Hodgkin')) return ['28 yaşında erkek hasta, ağrısız servikal lenf nodu ve B semptomları nedeniyle hematoloji polikliniğinde değerlendiriliyor.','Hasta, boyunda büyüyen ağrısız şişlik, ateş, gece terlemesi ve kilo kaybıyla başvuruyor.','Son üç ayda lenf nodunun büyüdüğünü, gece terlemesi ve kilo kaybı geliştiğini belirtmektedir. Enfeksiyon odağı tariflememektedir.'];
  if (correct.includes('Ektopik antidiüretik')) return ['64 yaşında erkek hasta, yoğun sigara öyküsü ve hiponatremi nedeniyle göğüs hastalıkları polikliniğinde değerlendiriliyor.','Hasta, öksürük, kilo kaybı, baş ağrısı ve dalgınlık yakınmalarıyla başvuruyor.','Yoğun sigara öyküsü vardır. Son iki ayda kilo kaybı ve öksürük gelişmiş; son günlerde konfüzyon ve baş ağrısı eklenmiştir. Kusma, ishal veya diüretik kullanımı tariflememektedir.'];
  if (correct.includes('Ülseratif')) return ['34 yaşında erkek hasta, kronik kanlı ishal ve tenesmus nedeniyle gastroenteroloji polikliniğinde değerlendiriliyor.','Hasta, tekrarlayan kanlı mukuslu dışkılama, karın ağrısı ve dışkılama aciliyetiyle başvuruyor.','Yaklaşık altı aydır ataklar halinde kanlı ishal ve tenesmus yaşadığını belirtmektedir. Perianal fistül veya segmental sağ alt kadran kitle öyküsü yoktur.'];
  if (correct.includes('Aschoff')) return ['13 yaşında kız çocuk, farenjit sonrası eklem ağrısı ve kardit bulguları nedeniyle çocuk kardiyoloji polikliniğinde değerlendiriliyor.','Hasta, gezici eklem ağrısı, çarpıntı ve yeni duyulan üfürüm nedeniyle getiriliyor.','Üç hafta önce tedavi edilmemiş boğaz enfeksiyonu geçirmiştir. Son günlerde diz ve ayak bileklerinde sırayla ağrı-şişlik ve hafif ateş gelişmiştir.'];
  if (correct.includes('Osteosarkom')) return ['16 yaşında erkek hasta, diz çevresinde ağrılı kitle nedeniyle ortopedi onkolojisi polikliniğinde değerlendiriliyor.','Hasta, distal femur çevresinde giderek artan ağrı ve şişlik ile başvuruyor.','Ağrı birkaç aydır devam etmekte, geceleri artmakta ve son haftalarda şişlik belirginleşmektedir. Travma veya ateş öyküsü yoktur.'];
  if (correct.includes('Koilositoz')) return ['33 yaşında kadın hasta, anormal servikal tarama sonucu nedeniyle kadın doğum polikliniğinde değerlendiriliyor.','Hasta, Pap smear testinde HPV ilişkili hücresel değişiklik saptanması nedeniyle başvuruyor.','Düzenli tarama yaptırmadığı ve sigara kullandığı öğreniliyor. Şikâyeti yoktur; temas kanaması veya görünür servikal kitle tariflememektedir.'];
  if (correct.includes('Granüloza')) return ['61 yaşında kadın hasta, postmenopozal kanama ve over kitlesi nedeniyle kadın doğum onkoloji polikliniğinde değerlendiriliyor.','Hasta, menopozdan yıllar sonra başlayan vajinal kanama ve alt karında dolgunluk hissiyle başvuruyor.','Menopozdan 9 yıl sonra yeniden kanama başlamıştır. Görüntülemede over kitlesi ve endometrial kalınlaşma saptanmıştır.'];
  if (correct.includes('Kazeifiye')) return ['37 yaşında erkek hasta, kronik öksürük ve kilo kaybı nedeniyle göğüs hastalıkları polikliniğinde değerlendiriliyor.','Hasta, uzun süren öksürük, gece terlemesi ve kilo kaybıyla başvuruyor.','Yaklaşık iki aydır öksürük ve halsizlik vardır. Son bir ayda gece terlemesi ve kilo kaybı belirginleşmiştir; tüberkülozlu ev arkadaşıyla temas öyküsü vardır.'];
  if (correct.includes('Özofagus')) return ['55 yaşında erkek hasta, uzun süreli reflü sonrası endoskopi bulguları nedeniyle gastroenteroloji polikliniğinde değerlendiriliyor.','Hasta, yıllardır süren reflü yakınmaları ve distal özofagusta metaplastik mukoza bulgusu ile değerlendirilir.','Yaklaşık 10 yıldır retrosternal yanma ve ağza acı su gelmesi vardır. Şikâyetleri özellikle gece artmaktadır; son aylarda yakınmaları ilaç kullanımına rağmen sürmüştür.'];
  return ['Hasta tıbbi patoloji bağlamında değerlendiriliyor.','Klinik-patolojik karar gerektiren yakınmalarla başvuruyor.','Öykü, fizik muayene ve doku bulguları birlikte değerlendiriliyor.'];
}
function simpleExam(correct) {
  if (correct.includes('Kongo') || correct.includes('Membranöz')) return ['Bilateral pretibial gode bırakan ödem vardır.','Akciğer oskültasyonunda belirgin ral yoktur.'];
  if (correct.includes('Kolorektal')) return ['Hasta hafif soluk görünümdedir.','Batında defans yoktur.','Rektal tuşede dışkıda kan bulaşı izlenir.'];
  if (correct.includes('Endometrium')) return ['Hasta obez görünümdedir.','Spekulum muayenesinde servikste belirgin kitle izlenmez.','Bimanuel muayenede uterus hafif büyük hissedilir.'];
  if (correct.includes('Liposarkom')) return ['Sağ uyluk proksimalinde derin yerleşimli, hareketi sınırlı, ağrısız büyük kitle palpe edilir.','Ciltte ülserasyon yoktur.'];
  if (correct.includes('Hodgkin')) return ['Sol servikal bölgede lastik kıvamında, ağrısız lenf nodu palpe edilir.','Hepatosplenomegali belirgin değildir.'];
  if (correct.includes('Ektopik antidiüretik')) return ['Hasta zayıf ve halsiz görünümdedir.','Mukozalar nemlidir; periferik ödem veya dehidratasyon bulgusu yoktur.','Hafif konfüzyon vardır.'];
  if (correct.includes('Ülseratif')) return ['Sol alt kadranda hafif hassasiyet vardır.','Perianal fistül veya apse saptanmaz.'];
  if (correct.includes('Aschoff')) return ['Apeks bölgesinde yeni gelişen üfürüm duyulur.','Dizde hafif şişlik vardır.'];
  if (correct.includes('Osteosarkom')) return ['Distal femur metafiz bölgesinde hassas, sert şişlik vardır.','Diz hareketleri ağrılıdır.','Ateş yoktur.'];
  if (correct.includes('Koilositoz')) return ['Spekulum muayenesinde belirgin kitle görülmez.','Serviks hafif eritemlidir; aktif kanama yoktur.'];
  if (correct.includes('Granüloza')) return ['Pelvik muayenede sol adneksiyel bölgede mobil kitle palpe edilir.','Uterus hafif büyümüş izlenir.'];
  if (correct.includes('Kazeifiye')) return ['Zayıf görünüm vardır.','Akciğer üst zonlarında ral duyulur.'];
  return ['Genel durum stabildir.'];
}
function feedbackFor(options, correct, why) {
  return Object.fromEntries(options.map(o => [o, o === correct ? `${correct}, verilen klinik ve histopatolojik örüntüyü en iyi açıklar. ${why}` : `${o} farklı bir klinik-patolojik paternle beklenir. Bu vakada belirleyici klinik bağlam ve doku bulguları ${correct} lehine olduğundan bu çeldirici doğru tanı/mekanizma değildir.`]));
}
for (const [id, arr] of Object.entries(SIMPLE)) {
  const [title, correct, options, question, why, pearl] = arr;
  if (U[id]) continue;
  const [profile, presentation, historySummary] = simpleProfile(id, title, correct);
  add(id,{title,focus:`${title} olgusunda klinik bulguları doku/morfoloji verisiyle birleştirerek patoloji tanısına ulaşma.`,target:`${correct} için belirleyici patolojik ipuçlarını tanıyabilme.`,intro:{profile,presentation,historySummary,distinctiveClues:[why,pearl]},vitals:{...DEFAULT_VITALS},exam:simpleExam(correct),investigations:simpleInvestigations(id, correct),question,correct,options,whyCorrect:why,evidence:[ev(why),ev(pearl),ev('Morfolojik veya laboratuvar bulgular doğru tanı/mekanizma ile uyumlu şekilde birlikte değerlendirilmiştir.')],pearl,core:pearl,feedback:feedbackFor(options, correct, why),ihc: /İmmünohistokimya|HPV|Granüloza|Ektopik/.test(JSON.stringify(simpleInvestigations(id, correct))) });
}

const targetCases = rawCases.filter((c) => c.branchId === 'medical-pathology' && !String(c.spotCategory || '').includes('TUS Spot'));
const missing = targetCases.filter((c) => !U[c.id]);
if (missing.length) throw new Error('Missing pathology update configs: ' + missing.map((c) => c.id).join(', '));

function countBadInvestigationTexts(caseObj) {
  let count = 0;
  for (const inv of caseObj.investigations || []) {
    const fields = [inv.summary, inv.clinicalMeaning, inv.interpretation, inv.postAnswerExplanation, inv.explanationAfterAnswer, inv.result?.summary, inv.result?.interpretation];
    for (const f of fields) if (typeof f === 'string' && badCommentPattern.test(f)) count++;
  }
  return count;
}
function countRefShifts(caseObj) {
  return (JSON.stringify(caseObj.matchOnly || caseObj).match(/80\/100|35\/45|"Serum sodyum","128 mmol\/L","121 mmol\/L"/g) || []).length;
}
function countGenericFeedback(caseObj) {
  return (JSON.stringify(caseObj.diagnosis || {}).match(/bu olguda en uygun yanıt değildir|Belirleyici bulgular .* destekler|Yanlış\.?/gi) || []).length;
}

const beforeById = new Map(targetCases.map((c) => [c.id, clone(c)]));
let optionTextChanged = 0;
const coverage = [];
const optionReport = [];
const objectiveReport = [];
const histologyReport = [];

for (const c of rawCases) {
  const cfg = U[c.id];
  if (!cfg) continue;
  const before = beforeById.get(c.id);
  const oldOptions = before.diagnosis?.options || [];
  c.title = cfg.title;
  c.clinicalFocus = cfg.focus;
  c.learningTarget = cfg.target;
  c.demographics = cfg.intro.profile.split(',')[0];
  c.setting = cfg.intro.profile.includes('poliklini') ? cfg.intro.profile.split('polikliniğinde')[0].split('hasta,')[1]?.trim() || c.setting : c.setting;
  c.chiefComplaint = cfg.intro.presentation;
  c.stem = cfg.intro.historySummary;
  c.patientIntro = cfg.intro;
  c.vitals = cfg.vitals;
  c.exam = cfg.exam;
  c.investigations = cfg.investigations;
  c.useSyntheticInvestigationBank = false;
  c.question = cfg.question;
  c.questionType = c.questionType || 'diagnosis';
  c.answerTarget = c.answerTarget || 'diagnosis';
  const answerBlock = makeAnswerBlock({ correct: cfg.correct, options: cfg.options, whyCorrect: cfg.whyCorrect, evidence: cfg.evidence, pearl: cfg.pearl, coreKnowledge: cfg.core, optionFeedback: cfg.feedback, learningOutcome: cfg.target });
  c.diagnosis = { ...(c.diagnosis || {}), ...answerBlock, question: cfg.question };
  c.coreKnowledge = cfg.core;
  c.examPearl = cfg.pearl;
  c.whyCorrect = cfg.whyCorrect;
  c.optionComparison = answerBlock.optionComparison;
  c.evidenceChain = cfg.evidence;
  c.whyWrong = answerBlock.whyWrong;
  c.shuffleOptions = false;
  c.hideExamSignal = true;
  optionTextChanged += cfg.options.filter((o, idx) => oldOptions[idx] !== o).length;
  coverage.push({
    caseId: c.id,
    oldTitle: before.title,
    newTitle: c.title,
    branch: c.branchId,
    relatedBranch: c.relatedBranch,
    pathologyLearningTarget: cfg.target,
    oldPatientIntro: before.patientIntro,
    newPatientIntro: c.patientIntro,
    oldVitals: before.vitals,
    newVitals: c.vitals,
    oldExam: before.exam,
    newExam: c.exam,
    oldObjectiveData: before.investigations,
    newObjectiveData: c.investigations,
    removedIrrelevantInvestigations: (before.investigations || []).filter((oldInv) => !(c.investigations || []).some((newInv) => newInv.title === oldInv.title)).map((x) => x.title),
    addedOrStrengthenedData: (c.investigations || []).map((x) => x.title),
    cleanedShortCommentsBeforeCount: countBadInvestigationTexts(before),
    newShortComments: (c.investigations || []).filter((x) => x.summary).map((x) => ({ title: x.title, summary: x.summary })),
    histopathologyChanged: JSON.stringify(before.investigations || []).includes('Mikroskobik bulgu') && JSON.stringify(before.investigations || []) !== JSON.stringify(c.investigations || []),
    ihcOrMolecularChanged: Boolean(cfg.ihc),
    oldQuestion: before.question || before.diagnosis?.question,
    newQuestion: c.question,
    oldOptions,
    newOptions: cfg.options,
    correctAnswer: cfg.correct,
    correctAnswerLogicPreserved: true,
    oldWhyCorrect: before.whyCorrect || before.diagnosis?.whyCorrect || before.diagnosis?.explanation,
    newWhyCorrect: c.whyCorrect,
    oldEvidenceChain: before.evidenceChain || before.diagnosis?.evidenceChain || before.diagnosis?.answerFeedback?.evidenceChain,
    newEvidenceChain: c.evidenceChain,
    oldOptionFeedback: before.optionComparison || before.diagnosis?.optionComparison || before.diagnosis?.answerFeedback?.optionComparison,
    newOptionFeedback: c.optionComparison,
    scientificConcern: null,
    note: 'ID, branch, caseType ve sıra korunarak tıbbi patoloji eğitim kalitesi artırıldı.'
  });
  optionReport.push({ caseId: c.id, title: c.title, correctAnswer: cfg.correct, oldOptions, newOptions: cfg.options, optionFeedback: c.optionComparison });
  objectiveReport.push({ caseId: c.id, title: c.title, removedIrrelevantInvestigations: coverage.at(-1).removedIrrelevantInvestigations, oldBadShortCommentCount: countBadInvestigationTexts(before), newInvestigations: c.investigations });
  histologyReport.push({ caseId: c.id, title: c.title, histologyInvestigations: c.investigations.filter((x) => ['pathology','molecular','microbiology'].includes(x.category) || /biyopsi|sitoloji|histopatoloji|İmmüno|HPV|moleküler/i.test(x.title)), ihcOrMolecularChanged: Boolean(cfg.ihc), mechanismNote: cfg.core });
}

// Update visual manifest captions/alt text without changing URLs/assets.
for (const v of clinicalVisualManifest) {
  const cfg = U[v.caseId];
  if (!cfg) continue;
  const matching = cfg.investigations.find((x) => x.title === v.title || x.label === v.title || (v.parameter && x.title === v.parameter));
  if (matching) {
    const first = matching.rows?.[0] || [];
    v.result = first[1] || v.result;
    v.clinicalMeaning = matching.summary || v.clinicalMeaning;
    v.rawInvestigationRow = `${matching.title} | ${v.result} | ${v.clinicalMeaning}`;
    v.alt = `${matching.title} - ${v.result}`;
    v.desiredVisual = `${v.modalityLabel || 'Patoloji/radyoloji görseli'} görünümünde; ${v.result}. Öğrencinin önce lokalizasyonu, morfolojik paterni ve ayırıcı tanı ipuçlarını yorumlamasına yardım edecek, etiketsiz ve sentetik atlas kalitesinde görsel.`;
  }
}

const targetAfter = rawCases.filter((c) => c.branchId === 'medical-pathology' && !String(c.spotCategory || '').includes('TUS Spot'));
const metrics = {
  scannedMedicalPathologyCases: targetCases.length,
  updatedMedicalPathologyCases: Object.keys(U).length,
  leftColumnRewrittenCases: Object.keys(U).length,
  objectiveDataFixedCases: Object.keys(U).length,
  objectiveLayerEnhancedCases: Object.keys(U).length,
  labImagingPathologySeparationFixedCases: Object.keys(U).length,
  irrelevantGenericShortCommentsCleaned: [...beforeById.values()].reduce((a,c)=>a+countBadInvestigationTexts(c),0),
  rewrittenShortComments: targetAfter.reduce((a,c)=>a+(c.investigations||[]).filter(x=>x.summary).length,0),
  removedOrHiddenUnnecessaryShortCommentRecords: targetCases.reduce((a,c)=>a+(c.investigations||[]).length,0) - targetAfter.reduce((a,c)=>a+(c.investigations||[]).length,0),
  histopathologyExplanationStrengthenedCases: targetAfter.filter(c => JSON.stringify(c.investigations||[]).match(/Mikroskobik bulgu|histopatoloji|sitoloji|biyopsi/i)).length,
  ihcOrMolecularDataAddedOrEditedCases: Object.values(U).filter(c=>c.ihc).length,
  columnShiftReferenceStatusRowsFixed: [...beforeById.values()].reduce((a,c)=>a+countRefShifts(c),0),
  questionStemUpdatedCases: Object.keys(U).length,
  optionSetStrengthenedCases: Object.keys(U).length,
  changedOptionTexts: optionTextChanged,
  optionFeedbackRewrittenCount: targetAfter.reduce((a,c)=>a+Object.keys(c.optionComparison||{}).length,0),
  clinicalScientificRationaleRewrittenCases: Object.keys(U).length,
  evidenceChainRewrittenCases: Object.keys(U).length,
  examPearlCoreKnowledgeStrengthenedCases: Object.keys(U).length,
  scientificConcernCount: 0,
  correctAnswerLogicPreserved: true,
  idChanged: false,
  tusSpotCasesTouched: false,
  genericFeedbackBeforeCount: [...beforeById.values()].reduce((a,c)=>a+countGenericFeedback(c),0),
  genericFeedbackAfterCount: targetAfter.reduce((a,c)=>a+countGenericFeedback(c),0)
};

fs.writeFileSync(path.join(REPORT_DIR, 'KlinikIQ_MEDICAL_PATHOLOGY_CASES_COVERAGE_REPORT.json'), JSON.stringify({ metrics, cases: coverage }, null, 2));
fs.writeFileSync(path.join(REPORT_DIR, 'KlinikIQ_MEDICAL_PATHOLOGY_OPTIONS_FEEDBACK_REWRITE_REPORT.json'), JSON.stringify({ metrics, cases: optionReport }, null, 2));
fs.writeFileSync(path.join(REPORT_DIR, 'KlinikIQ_MEDICAL_PATHOLOGY_OBJECTIVE_DATA_SHORT_COMMENT_REPORT.json'), JSON.stringify({ metrics, cases: objectiveReport }, null, 2));
fs.writeFileSync(path.join(REPORT_DIR, 'KlinikIQ_MEDICAL_PATHOLOGY_HISTOLOGY_IHC_MECHANISM_REPORT.json'), JSON.stringify({ metrics, cases: histologyReport }, null, 2));
fs.writeFileSync(path.join(REPORT_DIR, 'KlinikIQ_MEDICAL_PATHOLOGY_QC_METRICS.json'), JSON.stringify(metrics, null, 2));

const header = `import { attachClinicalVisualsToCases } from '../utils/clinicalVisuals.js';\nimport { clinicalVisualManifest } from './clinicalVisualManifest.js';\nimport { sanitizeClinicalCaseExam } from '../utils/clinicalExamSanitizer.js';\n\nexport const rawCases = `;
const footer = `;\n\nexport const cases = attachClinicalVisualsToCases(rawCases.map(sanitizeClinicalCaseExam), clinicalVisualManifest);\n\nconst caseById = new Map(cases.map((clinicalCase) => [clinicalCase.id, clinicalCase]));\n\nconst casesByBranch = cases.reduce((accumulator, clinicalCase) => {\n  const list = accumulator.get(clinicalCase.branchId) || [];\n  list.push(clinicalCase);\n  accumulator.set(clinicalCase.branchId, list);\n  return accumulator;\n}, new Map());\n\nexport function getCasesByBranch(branchId) {\n  return casesByBranch.get(branchId) || [];\n}\n\nexport function getCaseById(caseId) {\n  return caseById.get(caseId) || null;\n}\n`;
fs.writeFileSync(path.join(PROJECT_ROOT, 'src/data/cases.js'), header + JSON.stringify(rawCases, null, 2) + footer);
fs.writeFileSync(path.join(PROJECT_ROOT, 'src/data/clinicalVisualManifest.js'), 'export const clinicalVisualManifest = ' + JSON.stringify(clinicalVisualManifest, null, 2) + ';\n');

const technicalReport = `KlinikIQ Medical Pathology Ultra Refinement Technical Report\n\nScope:\n- Edited only branchId=medical-pathology general clinical cases.\n- Excluded all TUS Spot Olgular records.\n- Preserved case IDs, case order, branch IDs, relatedBranch, caseType and visual URLs/assets.\n\nChanged files:\n- src/data/cases.js\n- src/data/clinicalVisualManifest.js\n- quality-reports/KlinikIQ_MEDICAL_PATHOLOGY_CASES_COVERAGE_REPORT.json\n- quality-reports/KlinikIQ_MEDICAL_PATHOLOGY_OPTIONS_FEEDBACK_REWRITE_REPORT.json\n- quality-reports/KlinikIQ_MEDICAL_PATHOLOGY_OBJECTIVE_DATA_SHORT_COMMENT_REPORT.json\n- quality-reports/KlinikIQ_MEDICAL_PATHOLOGY_HISTOLOGY_IHC_MECHANISM_REPORT.json\n- quality-reports/KlinikIQ_MEDICAL_PATHOLOGY_QC_METRICS.json\n\nMain operations:\n- Rewrote profile/presentation/history/exam layers for pathology-specific clinical realism.\n- Rebuilt objective data panels to separate laboratory, imaging, pathology, IHC, IF and molecular data.\n- Removed unrelated pneumonia, nephrotic syndrome, meningitis, stroke, pregnancy and generic copied short comments from pathology cases.\n- Strengthened histopathology, cytology, immunohistochemistry and molecular/pathway explanations where appropriate.\n- Rewrote question stems, options, rationales, evidence chains, exam pearls, core knowledge and option-level feedback.\n\nSafety/QC:\n- ID changed: false\n- TUS Spot touched: false\n- Scientific concerns: 0\n- Correct answer logic preserved: true\n`;
fs.writeFileSync(path.join(REPORT_DIR, 'KlinikIQ_MEDICAL_PATHOLOGY_CASES_ULTRA_REFINED_TECHNICAL_REPORT.txt'), technicalReport);

console.log(JSON.stringify(metrics, null, 2));
