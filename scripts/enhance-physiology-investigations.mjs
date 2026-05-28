import fs from 'node:fs';
import path from 'node:path';
import { rawCases } from '../src/data/cases.js';

const CASES_PATH = path.resolve('src/data/cases.js');
const REPORT_PATH = path.resolve('quality-reports/KlinikIQ_PHYSIOLOGY_INVESTIGATION_LAYER_ENHANCEMENT_REPORT.json');
const TECH_REPORT_PATH = path.resolve('quality-reports/KlinikIQ_PHYSIOLOGY_INVESTIGATION_LAYER_TECHNICAL_REPORT.txt');

function clone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function rows(values) {
  return values.map((row) => row.map((cell) => String(cell)));
}

function makeInvestigation({ id, label, type = 'clinical', priority = 'useful', subtype = '', summary, clinicalMeaning, values = [], tag = 'Destekleyici veri', score = 2 }) {
  const cleanRows = rows(values);
  const title = label;
  const interpretation = clinicalMeaning || summary;
  return {
    id,
    label,
    title,
    type,
    priority,
    subtype,
    summary,
    clinicalMeaning: interpretation,
    testValueLabel: tag,
    educationalValue: tag,
    clinicalPriorityLabel: tag,
    scoreImpact: score,
    scoreValue: score,
    result: {
      title,
      summary,
      interpretation,
      values: cleanRows,
      rows: cleanRows,
    },
    rows: cleanRows,
  };
}

function enhanceInvestigation(existing, { priority, tag, score, summary, clinicalMeaning, subtype } = {}) {
  if (!existing) return null;
  const item = clone(existing);
  if (priority) item.priority = priority;
  if (subtype !== undefined) item.subtype = subtype;
  if (summary) item.summary = summary;
  if (clinicalMeaning || summary) item.clinicalMeaning = clinicalMeaning || summary;
  item.testValueLabel = tag || item.testValueLabel || 'Destekleyici veri';
  item.educationalValue = item.testValueLabel;
  item.clinicalPriorityLabel = item.testValueLabel;
  item.scoreImpact = score ?? item.scoreImpact ?? 2;
  item.scoreValue = score ?? item.scoreValue ?? item.scoreImpact;
  item.result = item.result || {};
  item.result.title = item.result.title || item.title || item.label;
  if (summary) item.result.summary = summary;
  if (clinicalMeaning || summary) item.result.interpretation = clinicalMeaning || summary;
  if (item.rows && !item.result.rows) item.result.rows = clone(item.rows);
  if (item.rows && !item.result.values) item.result.values = clone(item.rows);
  if (item.result.rows && !item.rows) item.rows = clone(item.result.rows);
  return item;
}

function byId(caseItem) {
  return new Map((caseItem.investigations || []).map((item) => [item.id, item]));
}

const inv = {
  volumeStatusEuvolemic: () => makeInvestigation({
    id: 'klinik-volum-ve-guvenlik-degerlendirmesi',
    label: 'Klinik volüm ve güvenlik değerlendirmesi',
    type: 'clinical',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Belirgin hipovolemi veya ödem bulgusu olmaması, hiponatreminin volüm kaybından çok su tutulumu ekseninde yorumlanmasını sağlar.',
    values: [
      ['Mukozalar', 'Belirgin kuru değil', 'Ağır dehidratasyon beklenmez', 'Hipovolemi zayıf'],
      ['Pretibial ödem', 'Saptanmadı', 'Yok', 'Ödem yok'],
      ['Nörolojik durum', 'Dikkat dağınıklığı ve yavaş yanıt', 'Normal bilinç beklenir', 'Hiponatremiyle uyumlu'],
    ],
  }),
  bedsideResp: ({ id = 'yatak-basi-solunum-degerlendirmesi', summary, spo2 = '%93, oda havasında', rr = '20/dk', extra = ['Ekspiryum', 'Uzamış', 'Normalde belirgin uzamaz', 'Obstrüksiyon lehine'] } = {}) => makeInvestigation({
    id,
    label: 'Yatak başı solunum değerlendirmesi',
    type: 'clinical',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: summary || 'SpO₂, solunum sayısı ve ekspiryum bulguları önce solunum yükünü gösterir; ileri fonksiyonel testler bu temel patern üzerine anlam kazanır.',
    values: [
      ['SpO₂', spo2, '%95–100', spo2.includes('90') || spo2.includes('91') || spo2.includes('93') ? 'Düşük' : 'Sınırda'],
      ['Solunum sayısı', rr, '12–20/dk', Number.parseInt(rr) > 20 ? 'Yüksek' : 'Sınırda'],
      extra,
    ],
  }),
  serumBicarbPanel: ({ id = 'serum-bikarbonat-ve-elektrolit-paneli', hco3 = '32 mmol/L', summary } = {}) => makeInvestigation({
    id,
    label: 'Serum bikarbonat ve elektrolit paneli',
    type: 'lab',
    priority: 'useful',
    tag: 'Destekleyici veri',
    score: 2,
    summary: summary || 'Serum bikarbonatının yüksek olması, kronik CO₂ retansiyonunda böbreğin asit-baz kompanzasyonuna katıldığını destekler.',
    values: [
      ['HCO₃⁻', hco3, '22–26 mmol/L', 'Yüksek'],
      ['Klor', '96 mmol/L', '98–107 mmol/L', 'Hafif düşük'],
      ['Kreatinin', '0.9 mg/dL', '0.6–1.2 mg/dL', 'Normal'],
    ],
  }),
  pulseOxCo: () => makeInvestigation({
    id: 'pulse-oksimetri-ve-klinik-oksijenlenme',
    label: 'Pulse oksimetri ve klinik oksijenlenme',
    type: 'clinical',
    priority: 'useful',
    tag: 'İlk basamak test',
    score: 1,
    summary: 'Pulse oksimetrenin normal görünmesi karbonmonoksit bağlanmasını dışlamaz; semptomlarla uyumsuz normal SpO₂ ko-oksimetri ihtiyacını artırır.',
    values: [
      ['SpO₂', '%98, oda havasında', '%95–100', 'Yanıltıcı normal'],
      ['Solunum sayısı', '18/dk', '12–20/dk', 'Normal'],
      ['Nörolojik yakınma', 'Baş ağrısı ve bilinç bulanıklığı', 'Olmamalı', 'Doku hipoksisi düşündürür'],
    ],
  }),
  ecgCo: () => makeInvestigation({
    id: 'ekg-ve-miyokard-stres-taramasi',
    label: 'EKG ve miyokard stres taraması',
    type: 'ecg',
    priority: 'situational',
    tag: 'Komplikasyon taraması',
    score: 1,
    summary: 'Karbonmonoksit zehirlenmesinde miyokard oksijen sunumu da azalabileceği için EKG, komplikasyon taraması açısından değerlidir ancak temel mekanizmayı ko-oksimetri gösterir.',
    values: [
      ['Ritim', 'Sinüs ritmi', 'Sinüs ritmi', 'Normal'],
      ['ST-T değişikliği', 'Akut iskemi saptanmadı', 'Olmamalı', 'Negatif'],
      ['Troponin', 'Normal sınırda', '<34 ng/L', 'Normal'],
    ],
  }),
  exerciseVital: () => makeInvestigation({
    id: 'egzersiz-oncesi-sonrasi-hemodinamik-izlem',
    label: 'Egzersiz öncesi/sonrası hemodinamik izlem',
    type: 'functionalTest',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Egzersiz sonrası sistemik yanıtın sınırlı kalması, bölgesel akım artışını lokal metabolik kontrol üzerinden yorumlamaya yardım eder.',
    values: [
      ['Nabız', '76/dk → 116/dk', 'Egzersizde artar', 'Fizyolojik artış'],
      ['Sistemik TA', '118/74 → 126/78 mmHg', 'Hafif artış beklenir', 'Uygun'],
      ['Çalışan kas sıcaklığı', 'Hafif artmış', 'Egzersizde artabilir', 'Lokal metabolizma artışı'],
    ],
  }),
  orthostaticAdrenal: () => makeInvestigation({
    id: 'ortostatik-vital-ve-hacim-degerlendirmesi',
    label: 'Ortostatik vital ve hacim değerlendirmesi',
    type: 'clinical',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Ortostatik hipotansiyon ve hacim azalması, mineralokortikoid etkisinin yetersizliğiyle uyumlu dolaşım paternini gösterir.',
    values: [
      ['Yatar TA', '98/62 mmHg', 'Yaklaşık ≥90/60', 'Düşük-normal'],
      ['Ayakta TA', '84/54 mmHg', 'Belirgin düşüş beklenmez', 'Ortostatik düşüş'],
      ['Mukozalar', 'Hafif kuru', 'Nemli', 'Hacim azalması'],
    ],
  }),
  adrenalElectrolytes: () => makeInvestigation({
    id: 'serum-elektrolit-ve-glukoz-paneli',
    label: 'Serum elektrolit ve glukoz paneli',
    type: 'lab',
    priority: 'essential',
    tag: 'İlk basamak test',
    score: 3,
    summary: 'Hiponatremi, hiperkalemi ve düşük-normal glukoz kombinasyonu kortizol ve aldosteron eksikliğinin hedef organ etkilerini destekler.',
    values: [
      ['Sodyum', '128 mmol/L', '135–145 mmol/L', 'Düşük'],
      ['Potasyum', '5.7 mmol/L', '3.5–5.1 mmol/L', 'Yüksek'],
      ['Glukoz', '68 mg/dL', '70–110 mg/dL', 'Düşük-normal'],
    ],
  }),
  cosyntropin: () => makeInvestigation({
    id: 'acth-uyari-testi',
    label: 'ACTH uyarı testi',
    type: 'functionalTest',
    priority: 'situational',
    tag: 'Doğrulayıcı test',
    score: 4,
    summary: 'Sentetik ACTH sonrası kortizol yanıtının yetersiz kalması, adrenal korteks rezervinin bozuk olduğunu gösterir ve primer adrenal yetmezlik mekanizmasını doğrular.',
    values: [
      ['Bazal kortizol', '3 µg/dL', 'Sabah >10 µg/dL beklenir', 'Düşük'],
      ['60. dk kortizol', '5 µg/dL', 'Genellikle >18 µg/dL beklenir', 'Yetersiz yanıt'],
    ],
  }),
  shockBedside: () => makeInvestigation({
    id: 'yatak-basi-dolasim-ve-sok-indeksi',
    label: 'Yatak başı dolaşım ve şok indeksi',
    type: 'clinical',
    priority: 'essential',
    tag: 'Temel değerlendirme',
    score: 2,
    summary: 'Hipotansiyon, taşikardi ve yükselen şok indeksi, kan kaybına karşı hızlı baroreseptör-sempatik kompanzasyonun devreye girdiğini gösterir.',
    values: [
      ['TA', '88/54 mmHg', '≥90/60 mmHg', 'Düşük'],
      ['Nabız', '124/dk', '60–100/dk', 'Yüksek'],
      ['Şok indeksi', '1.41', '<0.9', 'Yüksek'],
    ],
  }),
  lactatePerfusion: () => makeInvestigation({
    id: 'laktat-ve-perfuzyon-paneli',
    label: 'Laktat ve perfüzyon paneli',
    type: 'lab',
    priority: 'useful',
    tag: 'Destekleyici veri',
    score: 2,
    summary: 'Laktat artışı ve baz açığı, hacim kaybının yalnızca sayısal kan kaybı değil doku perfüzyonu üzerinden de fizyolojik stres oluşturduğunu gösterir.',
    values: [
      ['Laktat', '3.2 mmol/L', '<2.0 mmol/L', 'Yüksek'],
      ['Baz açığı', '-5 mmol/L', '-2 ile +2', 'Negatif'],
      ['Kapiller dolum', '3 sn', '<2 sn', 'Uzamış'],
    ],
  }),
  dkaBedside: () => makeInvestigation({
    id: 'yatak-basi-solunum-ve-dehidratasyon-degerlendirmesi',
    label: 'Yatak başı solunum ve dehidratasyon değerlendirmesi',
    type: 'clinical',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Derin-hızlı solunum ve dehidratasyon bulguları, metabolik asidoza solunumsal kompanzasyon geliştiğini düşündüren ilk klinik veridir.',
    values: [
      ['Solunum paterni', 'Derin ve hızlı', 'Efor dışında normal ritim', 'Kussmaul benzeri'],
      ['Mukozalar', 'Kuru', 'Nemli', 'Dehidratasyon'],
      ['Nabız', '112/dk', '60–100/dk', 'Yüksek'],
    ],
  }),
  dkaElectrolyte: () => makeInvestigation({
    id: 'elektrolit-ve-anyon-acigi-paneli',
    label: 'Elektrolit ve anyon açığı paneli',
    type: 'lab',
    priority: 'essential',
    tag: 'Mekanizma kurdurur',
    score: 3,
    summary: 'Yüksek anyon açıklığı, metabolik asidozun tampon sistemleri tüketen organik asit birikimiyle geliştiğini gösterir; potasyum tedavi güvenliği için ayrıca izlenir.',
    values: [
      ['Sodyum', '132 mmol/L', '135–145 mmol/L', 'Düşük'],
      ['Potasyum', '5.2 mmol/L', '3.5–5.1 mmol/L', 'Yüksek-normal'],
      ['Anyon açıklığı', '26 mmol/L', '8–12 mmol/L', 'Yüksek'],
    ],
  }),
  hfVolume: () => makeInvestigation({
    id: 'volum-yuku-ve-konjesyon-degerlendirmesi',
    label: 'Volüm yükü ve konjesyon değerlendirmesi',
    type: 'clinical',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Juguler venöz dolgunluk ve periferik ödem, yüksek venöz/dolum basıncı üzerinden Frank-Starling ve konjesyon ilişkisini klinik düzeyde gösterir.',
    values: [
      ['Juguler venöz dolgunluk', 'Artmış', 'Belirgin olmamalı', 'Konjesyon'],
      ['Pretibial ödem', 'Bilateral +2', 'Yok', 'Sıvı yükü'],
      ['Ortopne', 'Var', 'Yok', 'Pulmoner konjesyonla uyumlu'],
    ],
  }),
  bnpRenal: () => makeInvestigation({
    id: 'bnp-ve-bobrek-fonksiyon-paneli',
    label: 'BNP ve böbrek fonksiyon paneli',
    type: 'lab',
    priority: 'useful',
    tag: 'Destekleyici veri',
    score: 2,
    summary: 'BNP yüksekliği ventrikül duvar gerilimini destekler; böbrek fonksiyonu sıvı yükü ve tedavi güvenliği açısından birlikte değerlendirilir.',
    values: [
      ['BNP', '860 pg/mL', '<100 pg/mL', 'Yüksek'],
      ['Kreatinin', '1.1 mg/dL', '0.6–1.2 mg/dL', 'Normal'],
      ['Sodyum', '134 mmol/L', '135–145 mmol/L', 'Sınırda düşük'],
    ],
  }),
  altitudeBedside: () => makeInvestigation({
    id: 'irtifa-oksijenlenme-ve-solunum-izlemi',
    label: 'İrtifa oksijenlenme ve solunum izlemi',
    type: 'clinical',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Yüksek irtifada düşük SpO₂ ve artmış solunum sayısı, hipokseminin ventilasyonu artıran primer uyarı olduğunu gösterir.',
    values: [
      ['SpO₂', '%86, oda havasında', '%95–100', 'Düşük'],
      ['Solunum sayısı', '26/dk', '12–20/dk', 'Yüksek'],
      ['Nabız', '104/dk', '60–100/dk', 'Hafif yüksek'],
    ],
  }),
  altitudeRenal: () => makeInvestigation({
    id: 'renal-kompanzasyon-ve-idrar-ph-paneli',
    label: 'Renal kompanzasyon ve idrar pH paneli',
    type: 'urine',
    priority: 'situational',
    tag: 'Mekanizma kurdurur',
    score: 3,
    summary: 'Birkaç gün içinde bikarbonat atılımının artması, respiratuvar alkalozun renal kompanzasyonla kısmen dengelendiğini gösterir.',
    values: [
      ['Serum HCO₃⁻', '19 mmol/L', '22–26 mmol/L', 'Düşük'],
      ['İdrar pH', '7.6', '4.5–8.0', 'Alkali'],
      ['İdrar bikarbonat atılımı', 'Artmış', 'Düşük beklenir', 'Kompanzasyon'],
    ],
  }),
  oxygenExtraction: () => makeInvestigation({
    id: 'arteriyel-venoz-oksijen-farki',
    label: 'Arteriyel-venöz oksijen farkı',
    type: 'functionalTest',
    priority: 'essential',
    tag: 'Mekanizma kurdurur',
    score: 3,
    summary: 'Egzersizde venöz oksijen içeriğinin azalması, hemoglobinden dokuya oksijen bırakılmasının arttığını ve eğrinin sağa kaydığını destekler.',
    values: [
      ['Arteriyel O₂ satürasyonu', '%96', '%95–100', 'Normal'],
      ['Venöz O₂ satürasyonu', '%52', '%65–75', 'Düşük'],
      ['A-V O₂ farkı', 'Artmış', 'İstirahatte daha düşüktür', 'Ekstraksiyon artışı'],
    ],
  }),
  polyuriaVolume: () => makeInvestigation({
    id: 'yirmi-dort-saatlik-idrar-hacmi-ve-dansite',
    label: '24 saatlik idrar hacmi ve dansite',
    type: 'urine',
    priority: 'useful',
    tag: 'İlk basamak test',
    score: 2,
    summary: 'Yüksek idrar hacmi ve düşük dansite, poliürinin gerçek ve hipotonik olduğunu göstererek osmolalite/ADH ekseni için temel basamağı oluşturur.',
    values: [
      ['24 saatlik idrar hacmi', '7.4 L/gün', '<2.5–3 L/gün', 'Yüksek'],
      ['İdrar dansitesi', '1.003', '1.005–1.030', 'Düşük'],
      ['Glukozüri', 'Negatif', 'Negatif', 'Negatif'],
    ],
  }),
  renalVolume: () => makeInvestigation({
    id: 'hacim-kaybi-ve-perfuzyon-degerlendirmesi',
    label: 'Hacim kaybı ve renal perfüzyon değerlendirmesi',
    type: 'clinical',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Hipotansiyon, taşikardi ve oligüri birlikte renal perfüzyon azalmasını gösterir; makula densa-renin yanıtı bu bağlamda yorumlanmalıdır.',
    values: [
      ['TA', '96/60 mmHg', '≥90/60 mmHg', 'Düşük-normal'],
      ['Nabız', '108/dk', '60–100/dk', 'Yüksek'],
      ['Son 12 saat idrar', 'Azalmış', 'Normal akım beklenir', 'Oligüri'],
    ],
  }),
  bpRepeat: () => makeInvestigation({
    id: 'tekrarlayan-kan-basinci-ve-volum-degerlendirmesi',
    label: 'Tekrarlayan kan basıncı ve volüm değerlendirmesi',
    type: 'clinical',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Tekrarlayan hipertansiyon ve hipovolemi bulgusunun olmaması, potasyum kaybını mineralokortikoid etkisiyle ilişkilendirmeyi kolaylaştırır.',
    values: [
      ['Tekrarlayan TA', '158/96–164/100 mmHg', '<130/80 mmHg', 'Yüksek'],
      ['Nabız', '82/dk', '60–100/dk', 'Normal'],
      ['Volüm bulgusu', 'Belirgin dehidratasyon yok', '—', 'Mineralokortikoid etkiyle uyumlu'],
    ],
  }),
  urinePotassium: () => makeInvestigation({
    id: 'idrar-potasyum-atilimi',
    label: 'İdrar potasyum atılımı',
    type: 'urine',
    priority: 'useful',
    tag: 'Mekanizma kurdurur',
    score: 3,
    summary: 'Hipokalemiye rağmen idrar potasyum atılımının sürmesi, potasyum kaybının distal nefron sekresyonu üzerinden böbrekten olduğunu düşündürür.',
    values: [
      ['Spot idrar K⁺', '38 mmol/L', 'Hipokalemide düşük beklenir', 'Uygunsuz yüksek'],
      ['İdrar Na⁺', '54 mmol/L', 'Değişken', 'Yeterli distal Na⁺'],
      ['İdrar klorür', '42 mmol/L', 'Kusmada genellikle düşük', 'Kusma lehine değil'],
    ],
  }),
  exerciseDiffusionBedside: () => makeInvestigation({
    id: 'egzersiz-oksijenlenme-tarama',
    label: 'Egzersiz oksijenlenme taraması',
    type: 'functionalTest',
    priority: 'useful',
    tag: 'İlk basamak test',
    score: 2,
    summary: 'İstirahatte sınırlı olan oksijenlenme bozukluğunun egzersizde belirginleşmesi, difüzyon rezervinin yetersiz kaldığını düşündürür.',
    values: [
      ['İstirahat SpO₂', '%95', '%95–100', 'Alt sınır'],
      ['Egzersiz SpO₂', '%86', '%95–100', 'Düşük'],
      ['Egzersiz dispnesi', 'Belirgin', 'Minimal olmalı', 'Fonksiyonel kısıtlılık'],
    ],
  }),
  peBedside: () => makeInvestigation({
    id: 'akut-dispne-vital-ve-ekg-taramasi',
    label: 'Akut dispne vital ve EKG taraması',
    type: 'clinical',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Taşikardi, hipoksemi ve plöritik yakınma V/Q uyumsuzluğu olasılığını artırır; kan gazı ve görüntüleme bu ilk risk bağlamı üzerine yerleşir.',
    values: [
      ['Nabız', '118/dk', '60–100/dk', 'Yüksek'],
      ['SpO₂', '%89, oda havasında', '%95–100', 'Düşük'],
      ['EKG', 'Sinüs taşikardisi', 'Sinüs ritmi', 'Nonspesifik destekleyici'],
    ],
  }),
  autonomicRestCold: () => makeInvestigation({
    id: 'istirahat-ve-soguk-uyari-vital-yaniti',
    label: 'İstirahat ve soğuk uyarı vital yanıtı',
    type: 'functionalTest',
    priority: 'essential',
    tag: 'Mekanizma kurdurur',
    score: 3,
    summary: 'Soğuk uyarı sonrası kan basıncı ve nabız artışı, sempatik çıkışın damar düz kasında vazokonstriktör yanıt oluşturduğunu gösterir.',
    values: [
      ['İstirahat TA', '118/72 mmHg', '90/60–120/80', 'Normal'],
      ['Soğuk uyarı sonrası TA', '142/86 mmHg', 'Geçici artış beklenir', 'Artmış'],
      ['Soğuk uyarı sonrası nabız', '94/dk', 'Hafif artış beklenir', 'Artmış'],
    ],
  }),
  autonomicMechanism: () => makeInvestigation({
    id: 'sempatik-efektor-yanit-yorumu',
    label: 'Sempatik efektör yanıt yorumu',
    type: 'functionalTest',
    priority: 'useful',
    tag: 'Hedefli test',
    score: 3,
    summary: 'Damar düz kasına giden sempatik yolakta preganglionik nöron asetilkolini nikotinik reseptörler üzerinden kullanır; postganglionik nöron çoğunlukla norepinefrin salgılar ve α1-adrenerjik aktivasyon vazokonstriksiyon oluşturur.',
    values: [
      ['Preganglionik transmitter', 'Asetilkolin', 'Nikotinik reseptör aktivasyonu', 'Beklenen'],
      ['Postganglionik transmitter', 'Norepinefrin', 'Damar düz kasında baskın', 'Beklenen'],
      ['Efektör reseptör', 'α1-adrenerjik', 'Vazokonstriksiyon', 'Mekanizma'],
    ],
  }),
  edemaBasic: () => makeInvestigation({
    id: 'odem-ve-venoz-basinc-degerlendirmesi',
    label: 'Ödem ve venöz basınç değerlendirmesi',
    type: 'clinical',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Bilateral çukurlaşan ödem ve juguler venöz dolgunluk, kapiller hidrostatik basınç artışını klinik olarak destekler.',
    values: [
      ['Pretibial ödem', 'Bilateral +2 çukurlaşan', 'Yok', 'Artmış hidrostatik basınç'],
      ['Juguler venöz dolgunluk', 'Artmış', 'Belirgin olmamalı', 'Venöz basınç artışı'],
      ['Albumin kaybı bulgusu', 'Belirgin yok', '—', 'Onkotik neden zayıf'],
    ],
  }),
  albuminUrine: () => makeInvestigation({
    id: 'albumin-ve-idrar-protein-taramasi',
    label: 'Albumin ve idrar protein taraması',
    type: 'lab',
    priority: 'useful',
    tag: 'Ayırıcı tanıya yardım eder',
    score: 2,
    summary: 'Albuminin normal olması ve belirgin proteinüri saptanmaması, ödemin düşük onkotik basınçtan çok venöz/hidrostatik basınç artışıyla açıklanmasını destekler.',
    values: [
      ['Serum albumin', '4.0 g/dL', '3.5–5.2 g/dL', 'Normal'],
      ['İdrar protein', 'Negatif', 'Negatif', 'Negatif'],
      ['Kreatinin', '1.0 mg/dL', '0.6–1.2 mg/dL', 'Normal'],
    ],
  }),
  waterRestrictionBasic: () => makeInvestigation({
    id: 'hidrasyon-ve-baslangic-idrar-paneli',
    label: 'Hidrasyon ve başlangıç idrar paneli',
    type: 'urine',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Başlangıç idrar hacmi ve dansitesi, su kısıtlaması sonrası yoğunlaştırma yanıtının gerçekten adaptif olup olmadığını karşılaştırmak için temel oluşturur.',
    values: [
      ['Başlangıç idrar hacmi', 'Normal-sınırda', 'Aşırı poliüri beklenmez', 'Normal'],
      ['Başlangıç idrar dansitesi', '1.014', '1.005–1.030', 'Normal'],
      ['Klinik dehidratasyon', 'Yok', 'Yok', 'Güvenli başlangıç'],
    ],
  }),
  preloadBasic: () => makeInvestigation({
    id: 'sivi-yukleme-oncesi-sonrasi-vital-izlem',
    label: 'Sıvı yükleme öncesi/sonrası vital izlem',
    type: 'clinical',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Sıvı yüklenmesiyle venöz dönüş ve nabız basıncı hafif artar; ileri ekokardiyografik ölçüm bu preload değişiminin mekanik sonucunu gösterir.',
    values: [
      ['TA', '112/70 → 122/74 mmHg', 'Aşırı artış beklenmez', 'Hafif artış'],
      ['Nabız', '86/dk → 80/dk', 'Stabil kalabilir', 'Stabil'],
      ['Pulmoner ral', 'Saptanmadı', 'Yok', 'Aşırı yüklenme yok'],
    ],
  }),
  venousGasHaldane: () => makeInvestigation({
    id: 'venoz-kan-gazi-ve-co2-icerigi',
    label: 'Venöz kan gazı ve CO₂ içeriği',
    type: 'respiratory',
    priority: 'useful',
    tag: 'İlk basamak test',
    score: 2,
    summary: 'Venöz kanda CO₂ içeriğinin daha yüksek olması, dokudan akciğere taşınan CO₂ yükünü gösterir; arteriyel-venöz karşılaştırma Haldane etkisini görünür kılar.',
    values: [
      ['Venöz PCO₂', '46 mmHg', 'Arteriyelden yüksek', 'Yüksek'],
      ['Venöz O₂ satürasyonu', '%70', '%65–75', 'Beklenen'],
      ['Toplam CO₂ içeriği', 'Artmış', 'Arteriyelden yüksek', 'Doku yükü'],
    ],
  }),
  renalFunctionBeforePah: () => makeInvestigation({
    id: 'temel-bobrek-fonksiyonu-ve-idrar-akimi',
    label: 'Temel böbrek fonksiyonu ve idrar akımı',
    type: 'lab',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Stabil kreatinin ve yeterli idrar akımı, klirens ölçümünün renal plazma akımı hesaplaması için yorumlanabilir olduğunu gösterir.',
    values: [
      ['Kreatinin', '0.9 mg/dL', '0.6–1.2 mg/dL', 'Normal'],
      ['İdrar akımı', '1.2 mL/dk', '0.5–2 mL/dk', 'Uygun'],
      ['Hemodinami', 'Stabil', 'Stabil olmalı', 'Ölçüm güvenilir'],
    ],
  }),
  gastricPh: () => makeInvestigation({
    id: 'gastrik-ph-ve-sekresyon-degerlendirmesi',
    label: 'Gastrik pH ve sekresyon değerlendirmesi',
    type: 'gastrointestinal',
    priority: 'useful',
    tag: 'İlk basamak test',
    score: 2,
    summary: 'Düşük gastrik pH, parietal hücre asit sekresyonunun aktif olduğunu gösterir; son ortak efektör basamak H⁺/K⁺ ATPaz üzerinden gerçekleşir.',
    values: [
      ['Gastrik pH', '1.8', 'Asidik beklenir', 'Düşük'],
      ['Bazal asit sekresyonu', 'Artmış', 'Değişken', 'Aktif sekresyon'],
      ['PPI sonrası pH', 'Yükseliyor', 'Asit baskılanır', 'Pompa hedefi desteklenir'],
    ],
  }),
  bladderDiary: () => makeInvestigation({
    id: 'mesane-gunlugu-ve-reziduel-idrar',
    label: 'Mesane günlüğü ve rezidüel idrar',
    type: 'urogenital',
    priority: 'useful',
    tag: 'Temel değerlendirme',
    score: 1,
    summary: 'Dolum hissi, işeme aralığı ve rezidüel idrar bilgisi, miksiyon refleksinin depolama-boşaltma fazlarını ayırmak için temel veri sağlar.',
    values: [
      ['İşeme aralığı', '3–4 saat', 'Değişken', 'Uygun'],
      ['Postvoid rezidü', '20 mL', '<50 mL', 'Normal'],
      ['Dolum hissi', 'Korunmuş', 'Korunmuş olmalı', 'Afferent yol sağlam'],
    ],
  }),
};

const caseEnhancements = {
  'v168-new-052-bilinc-bulanikligi-ve-hiponatremi': (c) => {
    const m = byId(c);
    return [
      inv.volumeStatusEuvolemic(),
      enhanceInvestigation(m.get('serum-elektrolit-ve-osmolalite-paneli'), { tag: 'İlk basamak test', score: 3 }),
      enhanceInvestigation(m.get('idrar-osmolalitesi-ve-sodyumu'), { tag: 'Kritik ipucu', score: 4 }),
      enhanceInvestigation(m.get('akciger-grafisi'), { tag: 'Destekleyici veri', score: 2, priority: 'useful' }),
    ];
  },
  'v169-new-068-kronik-dispne-ve-hava-hapsi': (c) => {
    const m = byId(c);
    return [
      inv.bedsideResp(),
      enhanceInvestigation(m.get('arter-kan-gazi'), { tag: 'Destekleyici veri', score: 2 }),
      enhanceInvestigation(m.get('solunum-fonksiyon-testi'), { tag: 'Hedefli test', score: 4 }),
      enhanceInvestigation(m.get('toraks-goruntuleme'), { tag: 'Destekleyici veri', score: 2, priority: 'useful' }),
    ];
  },
  'v172-new-072-direncli-hipertansiyon-ve-kas-gucsuzlugu': (c) => {
    const m = byId(c);
    return [
      inv.bpRepeat(),
      enhanceInvestigation(m.get('serum-elektrolit-ve-asit-baz-paneli'), { tag: 'İlk basamak test', score: 3 }),
      inv.urinePotassium(),
      enhanceInvestigation(m.get('plazma-aldosteron-renin-orani'), { tag: 'Doğrulayıcı test', score: 5 }),
    ];
  },
  'v172-new-080-kronik-karbondioksit-retansiyonu': (c) => {
    const m = byId(c);
    return [
      inv.bedsideResp({ spo2: '%91, oda havasında', rr: '22/dk', extra: ['Bilinç/uyku hali', 'Hafif somnolans', 'Normal uyanıklık', 'Hiperkapniyle uyumlu'], summary: 'Hipoksemi, takipne ve uyku hali CO₂ retansiyonunu düşündürür; kan gazı öncesinde solunumsal yükün klinik karşılığını verir.' }),
      inv.serumBicarbPanel(),
      enhanceInvestigation(m.get('arter-kan-gazi'), { tag: 'Kritik ipucu', score: 4 }),
    ];
  },
  'v173-new-087-kapali-ortamda-bas-agrisi-ve-bilinc-bulanikligi': (c) => {
    const m = byId(c);
    return [
      inv.pulseOxCo(),
      enhanceInvestigation(m.get('arter-kan-gazi-ve-ko-oksimetri'), { tag: 'Doğrulayıcı test', score: 5 }),
      enhanceInvestigation(m.get('serum-laktat'), { tag: 'Destekleyici veri', score: 2 }),
      inv.ecgCo(),
    ];
  },
  'v174-new-097-egzersizde-bolgesel-kan-akimi-artisi': (c) => {
    const m = byId(c);
    return [
      inv.exerciseVital(),
      enhanceInvestigation(m.get('egzersiz-sonrasi-lokal-metabolik-panel'), { tag: 'Mekanizma kurdurur', score: 4 }),
      enhanceInvestigation(m.get('doppler-akim-olcumu'), { tag: 'Hedefli test', score: 3 }),
    ];
  },
  'v175-new-103-hipotansiyon-ve-hiperpigmentasyon': (c) => {
    const m = byId(c);
    return [
      inv.orthostaticAdrenal(),
      inv.adrenalElectrolytes(),
      enhanceInvestigation(m.get('adrenal-aks-ve-elektrolit-paneli'), { tag: 'Kritik ipucu', score: 4 }),
      inv.cosyntropin(),
    ];
  },
  'v176-new-111-akut-kan-kaybi-sonrasi-tasikardi': (c) => {
    const m = byId(c);
    return [
      inv.shockBedside(),
      enhanceInvestigation(m.get('hemodinamik-ve-hematoloji-paneli'), { tag: 'İlk basamak test', score: 3 }),
      inv.lactatePerfusion(),
    ];
  },
  'v176-new-112-asidozda-derin-hizli-solunum': (c) => {
    const m = byId(c);
    return [
      inv.dkaBedside(),
      enhanceInvestigation(m.get('glukoz-ve-keton-paneli'), { tag: 'İlk basamak test', score: 3 }),
      inv.dkaElectrolyte(),
      enhanceInvestigation(m.get('kan-gazi-ve-metabolik-panel'), { tag: 'Doğrulayıcı test', score: 5 }),
    ];
  },
  'v178-new-131-efor-dispnesi-ve-periferik-odem': (c) => {
    const m = byId(c);
    return [
      inv.hfVolume(),
      inv.bnpRenal(),
      enhanceInvestigation(m.get('kalp-yetmezligi-degerlendirme-paneli'), { tag: 'Hedefli test', score: 4 }),
      enhanceInvestigation(m.get('akciger-grafisi'), { tag: 'Destekleyici veri', score: 2, priority: 'useful' }),
    ];
  },
  'v183-new-183-yuksek-irtifada-hizli-soluma': (c) => {
    const m = byId(c);
    return [
      inv.altitudeBedside(),
      enhanceInvestigation(m.get('arter-kan-gazi'), { tag: 'Kritik ipucu', score: 4 }),
      inv.altitudeRenal(),
    ];
  },
  'v183-new-184-glomeruler-filtrasyonun-lokal-kontrolu': (c) => {
    const m = byId(c);
    return [
      makeInvestigation({
        id: 'diuretik-ve-volum-baglami',
        label: 'Diüretik ve volüm bağlamı',
        type: 'clinical',
        priority: 'useful',
        tag: 'Temel değerlendirme',
        score: 1,
        summary: 'Diüretik kullanımı ve stabil hemodinami, distal NaCl yükü-makula densa geri bildiriminin primer yorum ekseni olduğunu gösterir.',
        values: [['Diüretik kullanımı', 'Var', '—', 'Distal NaCl yükü artabilir'], ['TA', '118/72 mmHg', '90/60–120/80', 'Stabil'], ['Ödem/dehidratasyon', 'Belirgin yok', '—', 'Bağlam temiz']],
      }),
      enhanceInvestigation(m.get('serum-elektrolitleri-ve-bobrek-fonksiyonu'), { tag: 'İlk basamak test', score: 2 }),
      enhanceInvestigation(m.get('idrar-elektrolit-ve-osmolalite-paneli'), { tag: 'Mekanizma kurdurur', score: 4 }),
      enhanceInvestigation(m.get('tam-idrar-analizi'), { tag: 'Ayırıcı tanıya yardım eder', score: 1, priority: 'useful' }),
    ];
  },
  'v184-new-199-egzersizde-oksijen-birakilmasi': (c) => {
    const m = byId(c);
    return [
      makeInvestigation({
        id: 'egzersiz-oksijenlenme-ve-isi-izlemi',
        label: 'Egzersiz oksijenlenme ve ısı izlemi',
        type: 'functionalTest',
        priority: 'useful',
        tag: 'Temel değerlendirme',
        score: 1,
        summary: 'Egzersizle artan sıcaklık ve metabolik aktivite, hemoglobin oksijen afinitesinin azalacağı fizyolojik ortamı oluşturur.',
        values: [['Kas sıcaklığı', 'Artmış', 'İstirahatte daha düşük', 'Sağa kayma lehine'], ['Nabız', '118/dk', 'Egzersizde artar', 'Fizyolojik'], ['SpO₂', '%97', '%95–100', 'Korunmuş']],
      }),
      enhanceInvestigation(m.get('egzersiz-sonrasi-kan-gazi-ve-metabolit-paneli'), { tag: 'Kritik ipucu', score: 4 }),
      inv.oxygenExtraction(),
    ];
  },
  'v185-new-204-asiri-susama-ve-seyrek-idrar-yogunlasmasi': (c) => {
    const m = byId(c);
    return [
      inv.polyuriaVolume(),
      enhanceInvestigation(m.get('serum-ve-idrar-osmolalite-paneli'), { tag: 'Kritik ipucu', score: 4 }),
      enhanceInvestigation(m.get('desmopressin-yanit-testi'), { tag: 'Doğrulayıcı test', score: 5 }),
    ];
  },
  'v185-new-205-kronik-karbondioksit-retansiyonu': (c) => {
    const m = byId(c);
    return [
      inv.bedsideResp({ spo2: '%90, oda havasında', rr: '22/dk', extra: ['Ekspiryum', 'Uzamış', 'Normalde belirgin uzamaz', 'Kronik obstrüksiyon'], summary: 'KOAH bulguları ve düşük SpO₂ kronik ventilasyon yükünü gösterir; asit-baz yönünü kan gazı belirler.' }),
      inv.serumBicarbPanel({ hco3: '32 mmol/L' }),
      enhanceInvestigation(m.get('arter-kan-gazi'), { tag: 'Kritik ipucu', score: 4 }),
    ];
  },
  'v185-new-206-ani-kan-basinci-yukselmesi': (c) => {
    const m = byId(c);
    return [
      makeInvestigation({
        id: 'istirahat-vital-ve-ritim-degerlendirmesi',
        label: 'İstirahat vital ve ritim değerlendirmesi',
        type: 'clinical',
        priority: 'useful',
        tag: 'Temel değerlendirme',
        score: 1,
        summary: 'İstirahatte normal kan basıncı ve ritim, şikâyetin kalıcı aritmiden çok hızlı refleks yanıtla ilişkili olduğunu düşündürür.',
        values: [['TA', '116/72 mmHg', '90/60–120/80', 'Normal'], ['Nabız', '74/dk', '60–100/dk', 'Normal'], ['EKG ritmi', 'Sinüs ritmi', 'Sinüs ritmi', 'Normal']],
      }),
      enhanceInvestigation(m.get('yatak-basi-hemodinamik-izlem'), { tag: 'Mekanizma kurdurur', score: 4, summary: 'Karotis sinüs gerilimi artınca baroreseptör ateşlemesi artar; medüller yanıt vagal aktiviteyi artırıp sempatik çıkışı azaltarak kalp hızını ve basıncı düşürür.' }),
    ];
  },
  'v186-new-240-renal-perfuzyon-azalmasina-yanit': (c) => {
    const m = byId(c);
    return [
      inv.renalVolume(),
      enhanceInvestigation(m.get('renal-perfuzyon-ve-idrar-paneli'), { tag: 'Mekanizma kurdurur', score: 4 }),
      makeInvestigation({
        id: 'serum-kreatinin-ve-prerenal-indeksler',
        label: 'Serum kreatinin ve prerenal indeksler',
        type: 'lab',
        priority: 'useful',
        tag: 'Destekleyici veri',
        score: 2,
        summary: 'Üre/kreatinin oranının yükselmesi ve idrar sodyumunun düşük olması, azalmış renal perfüzyona karşı sodyum-su korunumu yanıtını destekler.',
        values: [['Üre/Kreatinin oranı', '28', '<20', 'Yüksek'], ['İdrar sodyumu', '12 mmol/L', 'Genellikle >40 yapısal hasarda', 'Düşük'], ['FeNa', '%0.4', '<%1 prerenal patern', 'Düşük']],
      }),
    ];
  },
  'v187-new-245-hipertansiyon-ve-hipokalemi': (c) => {
    const m = byId(c);
    return [
      inv.bpRepeat(),
      enhanceInvestigation(m.get('aldosteron-etkisi-ve-asit-baz-paneli'), { tag: 'Kritik ipucu', score: 4 }),
      inv.urinePotassium(),
    ];
  },
  'v187-new-246-egzersizde-oksijen-dusuklugu': (c) => {
    const m = byId(c);
    return [
      inv.exerciseDiffusionBedside(),
      enhanceInvestigation(m.get('difuzyon-ve-egzersiz-oksijenlenme-testi'), { tag: 'Hedefli test', score: 4 }),
      enhanceInvestigation(m.get('yuksek-cozunurluklu-toraks-bt'), { tag: 'İleri değerlendirme', score: 2, priority: 'useful' }),
    ];
  },
  'v188-new-258-akciger-embolisinde-oksijen-dusuklugu': (c) => {
    const m = byId(c);
    return [
      inv.peBedside(),
      enhanceInvestigation(m.get('arter-kan-gazi'), { tag: 'Kritik ipucu', score: 4 }),
      enhanceInvestigation(m.get('bt-pulmoner-anjiyografi'), { tag: 'Doğrulayıcı test', score: 5 }),
    ];
  },
  'v188-new-259-otonom-reseptor-yaniti': () => [
    inv.autonomicRestCold(),
    inv.autonomicMechanism(),
  ],
  'v189-new-274-kalp-yetmezliginde-bacak-odemi': (c) => {
    const m = byId(c);
    return [
      inv.edemaBasic(),
      inv.albuminUrine(),
      enhanceInvestigation(m.get('kalp-yetmezligi-ve-onkotik-basinc-paneli'), { tag: 'Hedefli test', score: 4 }),
    ];
  },
  'v189-new-275-su-kisitlamasinda-idrar-yogunlasmasi': (c) => {
    const m = byId(c);
    return [
      inv.waterRestrictionBasic(),
      enhanceInvestigation(m.get('serum-ve-idrar-osmolalite-paneli'), { tag: 'Mekanizma kurdurur', score: 4 }),
      makeInvestigation({
        id: 'copeptin-adh-yanit-yorumu',
        label: 'Copeptin/ADH yanıt yorumu',
        type: 'lab',
        priority: 'situational',
        tag: 'Gerektiğinde istenir',
        score: 1,
        summary: 'Copeptin/ADH düzeyi eğitimsel olarak geri bildirim eksenini gösterebilir; normal fizyolojik adaptasyon vakasında temel osmolalite yanıtının yerine geçmez.',
        values: [['Copeptin/ADH yanıtı', 'Artmış', 'Hiperozmolaliteyle artması beklenir', 'Uygun yanıt'], ['Klinik katkı', 'Sınırlı', 'Önce osmolalite yanıtı yorumlanır', 'Düşük öncelik']],
      }),
    ];
  },
  'v189-new-276-sivi-yuklenmesine-kardiyak-yanit': (c) => {
    const m = byId(c);
    return [
      inv.preloadBasic(),
      enhanceInvestigation(m.get('ekokardiyografik-hemodinamik-olcum'), { tag: 'Mekanizma kurdurur', score: 4 }),
    ];
  },
  'v194-new-309-karbondioksit-tasinmasi-mekanizmasi': (c) => {
    const m = byId(c);
    return [
      inv.venousGasHaldane(),
      enhanceInvestigation(m.get('arteriyel-venoz-gaz-karsilastirmasi'), { tag: 'Mekanizma kurdurur', score: 4 }),
    ];
  },
  'v194-new-310-bobrek-plazma-akimi-olcumu': (c) => {
    const m = byId(c);
    return [
      inv.renalFunctionBeforePah(),
      enhanceInvestigation(m.get('para-aminohippurat-klirens-olcumu'), { tag: 'Doğrulayıcı test', score: 5 }),
    ];
  },
  'v194-new-311-mide-asit-salgisinin-son-basamagi': (c) => {
    const m = byId(c);
    return [
      inv.gastricPh(),
      enhanceInvestigation(m.get('mide-asidi-degerlendirmesi'), { tag: 'Mekanizma kurdurur', score: 4 }),
    ];
  },
  'v195-new-338-renal-tubuler-akim-azalmasina-yanit': (c) => {
    const m = byId(c);
    return [
      inv.renalVolume(),
      enhanceInvestigation(m.get('idrar-elektrolit-ve-volum-paneli'), { tag: 'Mekanizma kurdurur', score: 4 }),
      enhanceInvestigation(m.get('tam-idrar-analizi'), { tag: 'Ayırıcı tanıya yardım eder', score: 1, priority: 'useful' }),
    ];
  },
  'v195-new-339-uzamis-ekspiryum-ve-hava-hapsi': (c) => {
    const m = byId(c);
    return [
      inv.bedsideResp({ spo2: '%94, oda havasında', rr: '20/dk' }),
      enhanceInvestigation(m.get('solunum-fonksiyon-testi'), { tag: 'Hedefli test', score: 4 }),
      enhanceInvestigation(m.get('akciger-grafisi'), { tag: 'Destekleyici veri', score: 2, priority: 'useful' }),
    ];
  },
  'v195-new-340-mesane-bosaltma-refleksi': (c) => {
    const m = byId(c);
    return [
      inv.bladderDiary(),
      enhanceInvestigation(m.get('urodinamik-degerlendirme'), { tag: 'Mekanizma kurdurur', score: 4 }),
    ];
  },
};

const report = [];
let touched = 0;
let added = 0;
let originalPhysiologyInvestigationTotal = 0;
let finalPhysiologyInvestigationTotal = 0;

for (const clinicalCase of rawCases) {
  if (clinicalCase.branchId !== 'physiology' || clinicalCase.relatedBranch !== 'Fizyoloji') continue;
  const enhancer = caseEnhancements[clinicalCase.id];
  if (!enhancer) continue;
  const before = clinicalCase.investigations?.length || 0;
  originalPhysiologyInvestigationTotal += before;
  const enhanced = enhancer(clinicalCase).filter(Boolean);
  clinicalCase.investigations = enhanced;
  finalPhysiologyInvestigationTotal += enhanced.length;
  added += Math.max(0, enhanced.length - before);
  touched += 1;
  report.push({
    id: clinicalCase.id,
    title: clinicalCase.title,
    beforeCount: before,
    afterCount: enhanced.length,
    addedCount: Math.max(0, enhanced.length - before),
    orderedInvestigations: enhanced.map((item, index) => ({
      order: index + 1,
      id: item.id,
      title: item.title || item.label,
      priority: item.priority,
      tag: item.testValueLabel,
      scoreImpact: item.scoreImpact,
    })),
  });
}

const missing = rawCases
  .filter((clinicalCase) => clinicalCase.branchId === 'physiology' && clinicalCase.relatedBranch === 'Fizyoloji')
  .filter((clinicalCase) => !caseEnhancements[clinicalCase.id])
  .map((clinicalCase) => clinicalCase.id);

const source = `import { attachClinicalVisualsToCases } from '../utils/clinicalVisuals.js';\nimport { clinicalVisualManifest } from './clinicalVisualManifest.js';\nimport { sanitizeClinicalCaseExam } from '../utils/clinicalExamSanitizer.js';\n\nexport const rawCases = ${JSON.stringify(rawCases, null, 2)};\n\nexport const cases = attachClinicalVisualsToCases(rawCases.map(sanitizeClinicalCaseExam), clinicalVisualManifest);\n\nconst caseById = new Map(cases.map((clinicalCase) => [clinicalCase.id, clinicalCase]));\n\nconst casesByBranch = cases.reduce((accumulator, clinicalCase) => {\n  const list = accumulator.get(clinicalCase.branchId) || [];\n  list.push(clinicalCase);\n  accumulator.set(clinicalCase.branchId, list);\n  return accumulator;\n}, new Map());\n\nexport function getCasesByBranch(branchId) {\n  return casesByBranch.get(branchId) || [];\n}\n\nexport function getCaseById(caseId) {\n  return caseById.get(caseId) || null;\n}\n`;

fs.writeFileSync(CASES_PATH, source, 'utf8');
fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
fs.writeFileSync(REPORT_PATH, JSON.stringify({
  scope: 'Only general clinical cases with branchId=physiology and relatedBranch=Fizyoloji. TUS Spot Olgular were intentionally untouched.',
  touchedCases: touched,
  missingEnhancementMap: missing,
  originalPhysiologyInvestigationTotal,
  finalPhysiologyInvestigationTotal,
  netAddedInvestigations: added,
  cases: report,
}, null, 2), 'utf8');
fs.writeFileSync(TECH_REPORT_PATH, [
  'KlinikIQ Fizyoloji tetkik/objektif veri katmanı güçlendirme teknik raporu',
  '',
  `Kapsam: ${touched} genel Fizyoloji vakası düzenlendi.`,
  'TUS Spot Olgular kapsam dışında bırakıldı.',
  `Başlangıç tetkik sayısı: ${originalPhysiologyInvestigationTotal}`,
  `Final tetkik sayısı: ${finalPhysiologyInvestigationTotal}`,
  `Net eklenen tetkik sayısı: ${added}`,
  '',
  'Korunan alanlar: soru kökü, doğru cevap, seçenekler, optionFeedback, explanation, evidenceChain ve sağ kolon alanları doğrudan yeniden yazılmadı.',
  'Eklenen alanlar: testValueLabel, educationalValue, clinicalPriorityLabel, scoreImpact, scoreValue.',
  'Sıralama mantığı: temel klinik/objektif veri → destekleyici test → mekanizma kurdurucu/hedefli test → doğrulayıcı/ileri test.',
].join('\n'), 'utf8');

console.log(JSON.stringify({ touched, originalPhysiologyInvestigationTotal, finalPhysiologyInvestigationTotal, added, missing }, null, 2));
