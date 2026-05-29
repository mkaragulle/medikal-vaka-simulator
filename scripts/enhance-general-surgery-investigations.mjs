import fs from 'node:fs';
import crypto from 'node:crypto';
import { rawCases } from '../src/data/cases.js';

const SOURCE_PATH = 'src/data/cases.js';
const REPORT_PATH = 'quality-reports/KlinikIQ_GENERAL_SURGERY_INVESTIGATION_LAYER_ENHANCEMENT_REPORT.json';
const TECH_REPORT_PATH = 'quality-reports/KlinikIQ_GENERAL_SURGERY_INVESTIGATION_LAYER_TECHNICAL_REPORT.txt';

const surgeryIds = new Set(rawCases.filter((item) => item.branchId === 'general-surgery' && item.caseType === 'standard').map((item) => item.id));
const beforeNonSurgeryHash = crypto.createHash('sha256')
  .update(JSON.stringify(rawCases.filter((item) => item.branchId !== 'general-surgery')))
  .digest('hex');
const beforeSurgerySummary = rawCases
  .filter((item) => surgeryIds.has(item.id))
  .map((item) => ({ id: item.id, title: item.title, investigationCount: item.investigations?.length || 0 }));

function clone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function cleanText(value) {
  return String(value ?? '')
    .replace(/sik dolaşımı/g, 'sistemik dolaşımı')
    .replace(/Sik dolaşımı/g, 'Sistemik dolaşımı')
    .replace(/sik etkilenim/g, 'sistemik etkilenim')
    .replace(/Sik etkilenim/g, 'Sistemik etkilenim')
    .replace(/BT’de ([^.]+?) birlikteliği safra taşı ileusunu gösterir\./g, 'BT’de $1 birlikteliği safra taşı ileusunu destekler.')
    .replace(/BT’de ([^.]+?) birlikteliği nu gösterir\./g, 'BT’de $1 birlikteliği obstrüksiyon nedenini destekler.')
    .replace(/lehine görüntüleme bulgusudur\./g, 'lehinedir.')
    .replace(/genel cerrahi preoperatif değerlendirmenda/g, 'genel cerrahi preoperatif değerlendirmesinde')
    .replace(/genel cerrahi kontrolünda/g, 'genel cerrahi kontrolünde')
    .replace(/SpO2/g, 'SpO₂');
}

function recursivelyClean(value) {
  if (typeof value === 'string') return cleanText(value);
  if (Array.isArray(value)) return value.map(recursivelyClean);
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) value[key] = recursivelyClean(value[key]);
  }
  return value;
}

function rows(values = []) {
  return values.map((row) => Array.isArray(row) ? row.map((cell) => cleanText(cell)) : [cleanText(row)]);
}

function sourceTag(tag) {
  if (!tag) return '';
  return cleanText(tag).slice(0, 28);
}

function makeInvestigation(clinicalCase, {
  suffix,
  title,
  type = 'clinical',
  category = 'clinicalAssessment',
  priority = 'useful',
  subtype = '',
  summary,
  values = [],
  tag = 'Cerrahi ilk değerlendirme',
  score = 2,
  flow = 1,
  purpose = '',
  treatmentImpact = '',
  sourceControlImpact = '',
  emergencyValue = '',
}) {
  const cleanRows = rows(values);
  const cleanSummary = cleanText(summary);
  const label = title;
  return {
    id: `${clinicalCase.id}-${suffix}`,
    label,
    title,
    type,
    priority,
    subtype: subtype || title,
    category,
    testTypeCategory: category,
    summary: cleanSummary,
    clinicalMeaning: cleanSummary,
    result: {
      title,
      summary: cleanSummary,
      interpretation: cleanSummary,
      values: cleanRows,
      rows: cleanRows,
    },
    rows: cleanRows,
    postAnswerExplanation: cleanSummary,
    interpretation: cleanSummary,
    explanationAfterAnswer: cleanSummary,
    testValueLabel: sourceTag(tag),
    educationalValue: sourceTag(tag),
    clinicalPriorityLabel: sourceTag(tag),
    scoreImpact: score,
    scoreValue: score,
    clinicalFlowOrder: flow,
    surgicalPriority: sourceTag(tag),
    purpose: purpose || cleanSummary,
    inlineFeedback: cleanSummary,
    treatmentImpact: cleanText(treatmentImpact),
    sourceControlImpact: cleanText(sourceControlImpact),
    emergencyValue: cleanText(emergencyValue),
  };
}

function enhanceInvestigation(existing, {
  tag,
  score = 2,
  flow = 2,
  priority,
  category,
  type,
  summary,
  treatmentImpact,
  sourceControlImpact,
  emergencyValue,
} = {}) {
  if (!existing) return null;
  const item = clone(existing);
  recursivelyClean(item);
  if (type) item.type = type;
  if (priority) item.priority = priority;
  if (category) {
    item.category = category;
    item.testTypeCategory = category;
  }
  const cleanSummary = summary ? cleanText(summary) : cleanText(item.summary || item.clinicalMeaning || item.result?.summary || item.result?.interpretation || '');
  item.summary = cleanSummary;
  item.clinicalMeaning = cleanSummary;
  item.result = item.result || {};
  item.result.title = item.result.title || item.title || item.label;
  item.result.summary = cleanSummary;
  item.result.interpretation = cleanSummary;
  const currentRows = item.rows || item.result.rows || item.result.values || [];
  item.rows = rows(currentRows);
  item.result.rows = rows(item.rows);
  item.result.values = rows(item.rows);
  const cleanTag = sourceTag(tag || item.testValueLabel || item.educationalValue || item.clinicalPriorityLabel || 'Destekleyici veri');
  item.testValueLabel = cleanTag;
  item.educationalValue = cleanTag;
  item.clinicalPriorityLabel = cleanTag;
  item.scoreImpact = score;
  item.scoreValue = score;
  item.clinicalFlowOrder = flow;
  item.surgicalPriority = cleanTag;
  item.postAnswerExplanation = cleanSummary;
  item.interpretation = cleanSummary;
  item.explanationAfterAnswer = cleanSummary;
  item.inlineFeedback = cleanSummary;
  if (treatmentImpact) item.treatmentImpact = cleanText(treatmentImpact);
  if (sourceControlImpact) item.sourceControlImpact = cleanText(sourceControlImpact);
  if (emergencyValue) item.emergencyValue = cleanText(emergencyValue);
  return item;
}

function byId(clinicalCase) {
  return new Map((clinicalCase.investigations || []).map((item) => [item.id, item]));
}

function firstExisting(clinicalCase, matcher) {
  return (clinicalCase.investigations || []).find((item) => {
    const text = `${item.id || ''} ${item.title || ''} ${item.label || ''}`.toLocaleLowerCase('tr');
    return matcher(text, item);
  });
}

function rowsFrom(clinicalCase, matcher, fallback) {
  const item = firstExisting(clinicalCase, matcher);
  return rows(item?.rows || item?.result?.rows || item?.result?.values || fallback);
}

function setInvestigations(clinicalCase, investigations, note) {
  const seen = new Set();
  const cleanInvestigations = investigations.filter(Boolean).map((item) => {
    if (seen.has(item.id)) throw new Error(`Duplicate investigation id ${item.id} in ${clinicalCase.id}`);
    seen.add(item.id);
    return item;
  });
  clinicalCase.investigations = cleanInvestigations;
  clinicalCase.availableInvestigations = clone(cleanInvestigations);
  clinicalCase.useSyntheticInvestigationBank = false;
  clinicalCase.preserveInvestigationOrder = true;
  clinicalCase.investigationLayerMeta = {
    enhancedAt: '2026-05-29',
    editor: 'general-surgery-investigation-layer-enhancement',
    objective: 'Cerrahi acil öncelik, kaynak kontrolü, basitten komplekse tetkik akışı, tetkik değer etiketi ve girişim geciktirmeme güvenlik kapısı',
    note: cleanText(note),
  };
}

const clinicalFirst = {
  'v163-new-006-sag-alt-kadran-agrisi': {
    title: 'Sağ alt kadran cerrahi değerlendirmesi',
    values: [
      ['Ağrı paterni', 'Periumbilikal başlayıp sağ alt kadrana göç etmiş', 'Göç eden ağrı yoksa olasılık azalır', 'Apandisit lehine'],
      ['Lokal periton irritasyonu', 'McBurney hassasiyeti, lokal rebound ve istemli defans', 'Yaygın peritonit beklenmez', 'Lokal alarm'],
      ['Acil güvenlik', 'Hemodinamik stabil, yaygın peritonit yok', 'İnstabilite/peritonit aciliyeti artırır', 'Stabil'],
    ],
    summary: 'Göç eden ağrı ve lokal periton irritasyonu ilk cerrahi karar basamağıdır; laboratuvar ve USG bu klinik ekseni doğrulamak için istenir, fakat yaygın peritonit gelişirse cerrahi değerlendirme geciktirilmez.',
    score: 2,
  },
  'v167-new-047-ates-ve-sag-ust-kadran-agrisi': {
    title: 'Kolanjit klinik şiddet değerlendirmesi',
    values: [
      ['Charcot triadı', 'Ateş-titreme, sağ üst kadran ağrısı ve ikter', 'Üçlü birlikte olmamalı', 'Pozitif'],
      ['Dolaşım riski', 'TA 100/60 mmHg, nabız 118/dk, şok indeksi yüksek', 'Stabil perfüzyon beklenir', 'Sepsis riski'],
      ['Mental durum', 'Bilinç açık', 'Konfüzyon ağır kolanjit lehinedir', 'Ağır varyanttan ayrılır'],
    ],
    summary: 'Charcot triadı ve sınırda hemodinami akut kolanjitte erken antibiyotik, sıvı ve biliyer drenaj planını başlatır; kültür veya MRCP sonucu kaynak kontrolünü bekletmemelidir.',
    tag: 'Cerrahi ilk değerlendirme',
    score: 3,
  },
  'v168-new-059-ates-ve-sarilikla-basvuran-hasta': {
    title: 'Ağır kolanjit ve Reynolds pentadı değerlendirmesi',
    values: [
      ['Temel triad', 'Ateş, sağ üst kadran ağrısı ve sarılık', 'Birlikte olmamalı', 'Kolanjit paterni'],
      ['Organ disfonksiyonu', 'Hipotansiyon ve mental durum değişikliği', 'Olmamalı', 'Ağır kolanjit'],
      ['Acil öncelik', 'Resüsitasyon ve antibiyotikle eş zamanlı biliyer drenaj planı', 'Drenaj gecikmemeli', 'Kaynak kontrolü'],
    ],
    summary: 'Hipotansiyon ve konfüzyon, kolanjiti basit enfeksiyondan ağır sepsis/organ disfonksiyonu düzeyine taşır; ileri doğrulama yerine erken ERCP drenajı önceliklidir.',
    tag: 'Kaynak kontrolü belirler',
    score: 5,
  },
  'v172-new-074-siddetli-karin-agrisi-ve-atriyal-fibrilasyon': {
    title: 'Mezenter iskemi alarm değerlendirmesi',
    values: [
      ['Ağrı-muayene uyumsuzluğu', 'Ağrı muayene bulgusuna göre orantısız şiddette', 'Muayene ağrıyı açıklamalı', 'İskemi alarmı'],
      ['Emboli riski', 'Atriyal fibrilasyon ve düzensiz antikoagülasyon', 'Emboli riski olmamalı', 'Yüksek risk'],
      ['Peritonit', 'Başlangıçta belirgin defans/rebound yok', 'Peritonit nekroz/perforasyon düşündürür', 'Erken dönem'],
    ],
    summary: 'Orantısız karın ağrısı ve atriyal fibrilasyon akut mezenter iskemi şüphesini yükseltir; stabil hastada tanısal değeri en yüksek hedefli görüntüleme BT anjiyografidir.',
    tag: 'İskemi/strangülasyon alarmı',
    score: 4,
  },
  'v173-new-086-yasli-hastada-mekanik-obstruksiyon': {
    title: 'Obstrüksiyon ve strangülasyon klinik değerlendirmesi',
    values: [
      ['Obstrüksiyon bulgusu', 'Distansiyon, safralı kusma, gaz-gaita çıkaramama ve metalik barsak sesleri', 'Obstrüksiyon bulgusu olmamalı', 'Pozitif'],
      ['Strangülasyon/peritonit', 'Yaygın peritonit yok, laktat belirgin yüksek değil', 'Peritonit/laktat yüksekliği aciliyeti artırır', 'Yakın izlem'],
      ['Herni muayenesi', 'Strangüle herni saptanmadı', 'Herni obstrüksiyon nedeni olabilir', 'Ayırıcı tanı'],
    ],
    summary: 'Mekanik obstrüksiyonda fizik muayene önce strangülasyon ve herniyi dışlamaya odaklanır; BT obstrüksiyon seviyesini ve safra taşı ileusuna özgü bulguları anatomik olarak gösterir.',
    tag: 'Obstrüksiyon göstergesi',
    score: 3,
  },
  'v174-new-093-travma-sonrasi-karin-hassasiyeti': {
    title: 'Travma dolaşım ve peritonit değerlendirmesi',
    values: [
      ['Hemodinami', 'TA 78/48 mmHg, nabız 136/dk, şok indeksi çok yüksek', 'Stabil dolaşım beklenir', 'Hemorajik şok'],
      ['Batın muayenesi', 'Yaygın hassasiyet ve istemsiz defans', 'Periton irritasyonu olmamalı', 'Cerrahi alarm'],
      ['Dış kanama', 'Belirgin dış kanama odağı yok', 'Kanama odağı açıklanmalı', 'İntraabdominal odak olası'],
    ],
    summary: 'İnstabil künt karın travmasında ilk karar hemodinami ve peritonit üzerinden verilir; pozitif FAST varsa BT beklemek kanama kontrolünü geciktirir.',
    tag: 'Kaynak kontrolü belirler',
    score: 5,
  },
  'v174-new-094-sag-ust-kadran-agrisi': {
    title: 'Sağ üst kadran klinik değerlendirmesi',
    values: [
      ['Murphy bulgusu', 'Derin inspirasyonda palpasyonla ağrı ve nefesi kesme', 'Negatif olması beklenir', 'Pozitif'],
      ['Ağrı süresi', 'Yağlı öğün sonrası 10 saattir süren ağrı', 'Biliyer kolikte kısa atak beklenir', 'Kolesistit lehine'],
      ['İkter/peritonit', 'Skleral ikter ve yaygın peritonit yok', 'Kolanjit/perforasyon bulgusu olmamalı', 'Ayırıcı tanı'],
    ],
    summary: 'Uzamış sağ üst kadran ağrısı ve pozitif Murphy bulgusu akut kolesistit için ilk klinik ekseni oluşturur; USG ilk basamak görüntülemedir, HIDA yalnızca seçilmiş belirsiz olguda değer kazanır.',
    tag: 'Cerrahi ilk değerlendirme',
    score: 2,
  },
  'v175-new-107-yumusak-doku-enfeksiyonunda-hizla-kotulesme': {
    title: 'Nekrotizan enfeksiyon klinik alarm değerlendirmesi',
    values: [
      ['Ağrı', 'Cilt bulgularına göre orantısız şiddette', 'Basit selülitte bu derece olmaz', 'Nekrotizan alarm'],
      ['Lokal bulgu', 'Morarma, ödem ve palpasyonla krepitasyon', 'Krepitasyon beklenmez', 'Fasyal gaz şüphesi'],
      ['Sistemik görünüm', 'Toksik görünüm ve hipotansiyon', 'Stabil görünüm beklenir', 'Sepsis alarmı'],
    ],
    summary: 'Orantısız ağrı, toksisite ve krepitasyon nekrotizan yumuşak doku enfeksiyonunu klinik olarak yeterince düşündürür; görüntüleme veya kültür cerrahi debridmanı geciktirmemelidir.',
    tag: 'Nekrotizan enfeksiyon alarmı',
    score: 5,
  },
  'v176-new-120-diskilama-sonrasi-anal-agri': {
    title: 'Perianal inspeksiyon ve kırmızı bayrak değerlendirmesi',
    values: [
      ['İnspeksiyon', 'Posterior orta hatta yüzeyel lineer yırtık', 'Normal mukozal bütünlük beklenir', 'Fissür lehine'],
      ['Kanama', 'Az miktarda parlak kırmızı kanama', 'Masif kanama beklenmez', 'Lokal kaynak'],
      ['Kırmızı bayrak', 'Ateş, fluktuasyon, fistül ağzı, kilo kaybı yok', 'Komplike bulgu olmamalı', 'Düşük aciliyet'],
    ],
    summary: 'Anal fissürde tanı çoğunlukla hedefli inspeksiyonla konur; ağrı nedeniyle dijital muayene zorlanmamalı ve ateş/fluktuasyon gibi apse bulguları ayrıca aranmalıdır.',
    tag: 'Cerrahi ilk değerlendirme',
    score: 2,
  },
  'v177-new-127-ani-bacak-agrisi-ve-sogukluk': {
    title: 'Akut ekstremite iskemisi 6P değerlendirmesi',
    values: [
      ['Perfüzyon', 'Soluk-soğuk ekstremite, kapiller dolum gecikmesi', 'Simetrik sıcak/perfüze ekstremite beklenir', 'İskemi'],
      ['Nabız', 'Dorsalis pedis ve posterior tibial nabızlar alınamıyor', 'Distal nabız palpabl olmalı', 'Nabız kaybı'],
      ['Nörolojik bulgu', 'Duyu azalması ve motor güç kaybı', 'Nörolojik defisit olmamalı', 'Tehdit altındaki ekstremite'],
    ],
    summary: '6P bulguları ve nörolojik defisit akut ekstremite iskemisinde zaman kritik tehdit olduğunu gösterir; Doppler destekleyicidir fakat heparinizasyon ve revaskülarizasyon hazırlığı geciktirilmez.',
    tag: 'İskemi/strangülasyon alarmı',
    score: 5,
  },
  'v178-new-137-epigastrik-agri-ve-kusma': {
    title: 'Pankreatit başlangıç şiddet ve volüm değerlendirmesi',
    values: [
      ['Klinik volüm', 'Dehidratasyon, taşikardi ve yüksek şok indeksi', 'Stabil hidrasyon beklenir', 'Sıvı açığı'],
      ['Ağrı paterni', 'Sırta yayılan epigastrik ağrı, öne eğilmekle azalma', 'Tipik olmayan ağrı beklenir', 'Pankreatit paterni'],
      ['Peritonit/ikter', 'Yaygın peritonit ve ikter yok', 'Komplikasyon/kolanjit bulgusu olmamalı', 'Ayırıcı tanı'],
    ],
    summary: 'Akut pankreatitte ilk yönetim, tanısal enzimden önce volüm durumu ve organ perfüzyonuna göre şekillenir; erken intravenöz sıvı ve analjezi görüntüleme beklenerek geciktirilmez.',
    tag: 'Acil güvenlik testi',
    score: 4,
  },
  'v183-new-190-kasik-sisligi-ve-kusma': {
    title: 'İnkarsere fıtık ve strangülasyon klinik değerlendirmesi',
    values: [
      ['Fıtık muayenesi', 'Ağrılı, gergin ve redükte edilemeyen kasık kitlesi', 'Redükte edilebilir olması beklenir', 'İnkarsere'],
      ['Obstrüksiyon', 'Kusma, distansiyon ve gaz çıkaramama', 'Obstrüksiyon bulgusu olmamalı', 'Pozitif'],
      ['Cilt/peritonit', 'Kitle üzerinde eritem, yaygın peritonit yok', 'Nekroz/peritonit aciliyeti artırır', 'Strangülasyon riski'],
    ],
    summary: 'Redükte edilemeyen ağrılı fıtık ve obstrüksiyon bulguları cerrahi önceliği belirler; görüntüleme klinik kararı destekleyebilir ama strangülasyon şüphesinde operasyon geciktirilmez.',
    tag: 'İskemi/strangülasyon alarmı',
    score: 5,
  },
  'v184-new-194-sag-ust-kadran-agrisi': {
    title: 'Akut kolesistit klinik değerlendirmesi',
    values: [
      ['Murphy bulgusu', 'İnspirasyon sırasında palpasyonla ağrı artışı ve nefes kesme', 'Negatif olması beklenir', 'Pozitif'],
      ['Ağrı süresi', 'Yağlı yemek sonrası 8 saattir süren sağ üst kadran ağrısı', 'Kısa süreli kolik atak beklenir', 'Uzamış inflamasyon'],
      ['İkter/peritonit', 'Skleral ikter ve yaygın peritonit yok', 'Kolanjit/perforasyon bulgusu olmamalı', 'Ayırıcı tanı'],
    ],
    summary: 'Ateş ve pozitif Murphy ile uzamış sağ üst kadran ağrısı akut kolesistiti destekler; kolestaz/lipaz paneli ayırıcı tanıyı daraltır, USG ilk basamak görüntülemedir.',
    tag: 'Cerrahi ilk değerlendirme',
    score: 2,
  },
  'v185-new-222-ani-sirt-agrisi-ve-hipotansiyon': {
    title: 'Rüptüre AAA şok değerlendirmesi',
    values: [
      ['Hemodinami', 'TA 72/46 mmHg, nabız 138/dk, şok indeksi çok yüksek', 'Stabil dolaşım beklenir', 'Hemorajik şok'],
      ['Klinik üçlü', 'Ani sırt-karın ağrısı, hipotansiyon ve pulsatil abdominal kitle', 'Birlikte olmamalı', 'Rüptür şüphesi'],
      ['Acil öncelik', 'Resüsitasyon ve damar cerrahisi onarımı eş zamanlı planlanır', 'BT için gecikme olmamalı', 'Kaynak kontrolü'],
    ],
    summary: 'İnstabil hastada rüptüre AAA şüphesi klinik olarak zaman kritiktir; yatak başı USG hızlı destek sağlar ve BT beklemek damar cerrahisi kaynak kontrolünü geciktirmemelidir.',
    tag: 'Kaynak kontrolü belirler',
    score: 5,
  },
  'v185-new-223-ates-sarilik-ve-sag-ust-kadran-agrisi': {
    title: 'Ağır kolanjit klinik ve drenaj önceliği',
    values: [
      ['Triad', 'Ateş, sarılık ve sağ üst kadran ağrısı', 'Birlikte olmamalı', 'Kolanjit paterni'],
      ['Ağırlaşma', 'Hipotansiyon ve konfüzyona eğilim', 'Organ disfonksiyonu olmamalı', 'Ağır kolanjit'],
      ['Kaynak kontrolü', 'Antibiyotik-resüsitasyonla eş zamanlı ERCP drenajı gerekir', 'Drenaj ertelenmemeli', 'Acil'],
    ],
    summary: 'Bu varyant ağır kolanjiti hedefler: organ disfonksiyonu bulguları nedeniyle MRCP veya kültür sonucu beklenmeden biliyer drenaj planlanmalıdır.',
    tag: 'Kaynak kontrolü belirler',
    score: 5,
  },
  'v185-new-224-ani-epigastrik-agri-ve-tahta-karin': {
    title: 'Yaygın peritonit ve perforasyon klinik değerlendirmesi',
    values: [
      ['Peritonit', 'Tahta karın, yaygın defans ve rebound', 'Yaygın peritonit olmamalı', 'Peritonit alarmı'],
      ['Ağrı başlangıcı', 'Ani başlayan epigastrik ağrı ve hareketle artma', 'Kademeli/hafif ağrı beklenir', 'Perforasyon şüphesi'],
      ['Acil öncelik', 'Resüsitasyon ve cerrahi değerlendirme eş zamanlıdır', 'BT için gecikme olmamalı', 'Kaynak kontrolü'],
    ],
    summary: 'Yaygın peritonit perforasyon veya içerik sızıntısı açısından klinik alarmdır; serbest hava saptanırsa stabil olmayan/açık peritonitli hastada BT beklemek cerrahi kaynak kontrolünü geciktirir.',
    tag: 'Peritonit alarmı',
    score: 5,
  },
  'v186-new-239-diskilama-sirasinda-siddetli-agri': {
    title: 'Perianal inspeksiyon ve komplike hastalık dışlama',
    values: [
      ['İnspeksiyon', 'Posterior orta hatta lineer mukozal yırtık', 'Mukozada yırtık olmamalı', 'Fissür lehine'],
      ['Ağrı paterni', 'Sert dışkılama sırasında başlayan cam kesiği tarzı ağrı', 'Ağrısız kanama beklenmez', 'Tipik'],
      ['Komplikasyon bulgusu', 'Fluktuasyon, fistül ağzı, ateş ve kilo kaybı yok', 'Komplike bulgular dışlanmalı', 'Düşük aciliyet'],
    ],
    summary: 'Anal fissür tanısında en değerli objektif veri hedefli perianal inspeksiyondur; apse, fistül veya maligniteyi düşündüren kırmızı bayrak yoksa ileri tetkik öncelikli değildir.',
    tag: 'Cerrahi ilk değerlendirme',
    score: 2,
  },
  'v187-new-253-siddetli-karin-agrisi-ve-hafif-muayene-bulgusu': {
    title: 'Akut mezenter iskemi klinik alarmı',
    values: [
      ['Ağrı-muayene uyumsuzluğu', 'Şiddetli ağrıya rağmen başlangıçta hafif karın muayenesi', 'Muayene ağrı şiddetini açıklamalı', 'İskemi alarmı'],
      ['Tromboemboli riski', 'Atriyal fibrilasyon ve düzensiz antikoagülasyon', 'Emboli riski olmamalı', 'Yüksek risk'],
      ['Peritonit', 'Erken dönemde belirgin defans yok', 'Peritonit geç/nekroz bulgusu olabilir', 'Yakın izlem'],
    ],
    summary: 'Orantısız ağrı ve emboli riski akut mezenter iskemi için yüksek değerli klinik ipucudur; laktat destekler, BT anjiyografi ise damar tıkanıklığını ve barsak etkilenimini gösterir.',
    tag: 'İskemi/strangülasyon alarmı',
    score: 4,
  },
  'v188-new-268-epigastrik-agri-ve-lipaz-yuksekligi': {
    title: 'Komplikasyonsuz pankreatit başlangıç değerlendirmesi',
    values: [
      ['Ağrı paterni', 'Sırta yayılan epigastrik ağrı, öne eğilmekle azalma', 'Tipik olmayan ağrı beklenir', 'Pankreatit paterni'],
      ['Acil komplikasyon', 'Peritonit, kolanjit ve belirgin ikter yok', 'Komplikasyon bulgusu olmamalı', 'Komplike değil'],
      ['Volüm riski', 'Taşikardi ve hafif BUN yüksekliği', 'Stabil hidrasyon beklenir', 'Sıvı gereksinimi'],
    ],
    summary: 'Komplikasyonsuz akut pankreatitte başlangıç tedavisi sıvı, analjezi ve yakın izlemdir; antibiyotik, ERCP veya cerrahi için kolanjit, enfekte nekroz ya da obstrüksiyon bulgusu aranmalıdır.',
    tag: 'Acil güvenlik testi',
    score: 3,
  },
  'v189-new-292-cilt-enfeksiyonunda-orantisiz-agri': {
    title: 'Nekrotizan enfeksiyon klinik alarmı',
    values: [
      ['Ağrı', 'Cilt bulgularına göre belirgin fazla', 'Basit selülitte orantılı ağrı beklenir', 'Nekrotizan alarm'],
      ['Lokal doku bulgusu', 'Morumsu renk değişikliği ve krepitasyon', 'Krepitasyon beklenmez', 'Gaz/nekroz şüphesi'],
      ['Sistemik bulgu', 'Toksik görünüm, hipotansiyon ve taşikardi', 'Stabil görünüm beklenir', 'Sepsis alarmı'],
    ],
    summary: 'Orantısız ağrı, hızlı progresyon ve toksik görünüm nekrotizan enfeksiyon için yeterli klinik alarmdır; kültür veya görüntüleme antibiyotik ve cerrahi debridmanı geciktirmemelidir.',
    tag: 'Nekrotizan enfeksiyon alarmı',
    score: 5,
  },
  'v189-new-293-karin-sisligi-ve-gaz-cikaramama': {
    title: 'Sigmoid volvulus acil klinik değerlendirmesi',
    values: [
      ['Distansiyon', 'Belirgin batın distansiyonu ve gaz-gaita çıkaramama', 'Obstrüksiyon bulgusu olmamalı', 'Obstrüksiyon'],
      ['Peritonit', 'Yaygın defans/rebound yok', 'Peritonit varsa acil cerrahi gerekir', 'Endoskopiye uygun'],
      ['Rektal tuşe', 'Ampulla boş', 'Dışkı dolu ampulla beklenebilir', 'Distal obstrüksiyon'],
    ],
    summary: 'Sigmoid volvulusta peritonit ve iskemi bulgusu yoksa başlangıç yaklaşımı endoskopik detorsiyondur; laktat/peritonit pozitifleşirse cerrahi öncelik değişir.',
    tag: 'Obstrüksiyon göstergesi',
    score: 3,
  },
  'v189-new-294-supheli-tiroid-nodulu': {
    title: 'Tiroid nodülü klinik risk değerlendirmesi',
    values: [
      ['Risk öyküsü', 'Baş-boyun radyasyon öyküsü ve ailede tiroid kanseri', 'Yüksek risk öyküsü olmamalı', 'Yüksek risk'],
      ['Nodül muayenesi', 'Sert, düzensiz sınırlı yaklaşık 1.5 cm nodül', 'Yumuşak/düzgün nodül beklenir', 'Şüpheli'],
      ['Hipertiroidi bulgusu', 'Çarpıntı, kilo kaybı ve tremor yok', 'Düşük TSH varsa sintigrafi düşünülür', 'Sintigrafi öncelikli değil'],
    ],
    summary: 'Tiroid nodülünde ilk laboratuvar TSH’dır; TSH normal olduğunda sintigrafi yerine USG risk sınıflaması ve yüksek şüpheli nodülde USG eşliğinde İİAB önceliklidir.',
    tag: 'Cerrahi ilk değerlendirme',
    score: 2,
  },
  'v194-new-327-yutma-sonrasi-agiza-gida-gelmesi': {
    title: 'Disfaji-regürjitasyon ve aspirasyon risk değerlendirmesi',
    values: [
      ['Regürjitasyon', 'Yutma sonrası sindirilmemiş gıdanın ağza gelmesi', 'Regürjitasyon olmamalı', 'Divertikül paterni'],
      ['Aspirasyon riski', 'Gece öksürük atakları ve bazallerde sekresyon ralleri', 'Aspirasyon bulgusu olmamalı', 'Komplikasyon riski'],
      ['Acil enfeksiyon', 'Ateş ve akut konsolidasyon yok', 'Aktif pnömoni yokluğu beklenir', 'Stabil'],
    ],
    summary: 'Sindirilmemiş gıda regürjitasyonu ve halitozis Zenker divertikülü için klinik ipucudur; baryumlu grafi anatomiyi gösterir, kör endoskopi perforasyon riski nedeniyle ilk basamak değildir.',
    tag: 'Cerrahi ilk değerlendirme',
    score: 2,
  },
  'v194-new-328-agrisiz-sarilik-ve-kilo-kaybi': {
    title: 'Ağrısız obstrüktif sarılık klinik değerlendirmesi',
    values: [
      ['Sarılık paterni', 'Ağrısız ikter, kaşıntı ve kilo kaybı', 'Ağrılı taş atağı/ateş beklenmez', 'Malignite alarmı'],
      ['Courvoisier bulgusu', 'Ağrısız distandü safra kesesi palpe ediliyor', 'Normalde distandü olmamalı', 'Distal obstrüksiyon'],
      ['Enfeksiyon/peritonit', 'Ateş ve yaygın peritonit yok', 'Kolanjit/perforasyon bulgusu olmamalı', 'Acil sepsis yok'],
    ],
    summary: 'Ağrısız kolestatik sarılık, kilo kaybı ve distandü safra kesesi malign distal obstrüksiyon şüphesini artırır; USG obstrüksiyonu, pankreas protokol BT ise cerrahi planlamayı belirler.',
    tag: 'Cerrahi ilk değerlendirme',
    score: 3,
  },
  'v195-new-355-kusma-sonrasi-gogus-agrisi': {
    title: 'Özofagus perforasyonu klinik alarm değerlendirmesi',
    values: [
      ['Tetikleyici', 'Güçlü kusma sonrası ani retrosternal ağrı', 'Kusma sonrası perforasyon bulgusu olmamalı', 'Boerhaave alarmı'],
      ['Lokal bulgu', 'Boyunda cilt altı krepitasyon ve sol hemitoraksta solunum azalması', 'Krepitasyon beklenmez', 'Kaçak/mediasten alarmı'],
      ['Sistemik bulgu', 'Ateş, taşikardi ve toksik görünüm', 'Stabil görünüm beklenir', 'Mediastinit riski'],
    ],
    summary: 'Kusma sonrası göğüs ağrısı, cilt altı krepitasyon ve sistemik toksisite özofagus perforasyonunu düşündürür; ağızdan alım kesilir, antibiyotik başlanır ve kaynak kontrolü geciktirilmez.',
    tag: 'Perforasyon göstergesi',
    score: 5,
  },
  'v195-new-356-kasik-altinda-agrili-sislik': {
    title: 'Femoral herni lokalizasyon ve strangülasyon değerlendirmesi',
    values: [
      ['Lokalizasyon', 'İnguinal ligament altında, pubik tüberkülün lateral-inferiorunda kitle', 'İnguinal herni lokalizasyonundan farklı', 'Femoral kanal'],
      ['Redüksiyon', 'Ağrılı ve redükte edilemeyen şişlik', 'Redükte edilebilir olması beklenir', 'İnkarsere'],
      ['Strangülasyon riski', 'Kusma ve hafif distansiyon mevcut, yaygın peritonit yok', 'Peritonit varsa acil cerrahi artar', 'Yakın izlem'],
    ],
    summary: 'Femoral herni tanısı lokalizasyonla güçlenir; inkarsere ve ağrılı kitlede strangülasyon riski nedeniyle görüntüleme cerrahi değerlendirmeyi geciktirmemelidir.',
    tag: 'İskemi/strangülasyon alarmı',
    score: 4,
  },
  'v195-new-357-erken-evre-meme-kitlesi': {
    title: 'Meme kitlesi ve aksilla klinik değerlendirmesi',
    values: [
      ['Primer kitle', 'Sol üst dış kadranda yaklaşık 1.2 cm sertlik', 'Palpabl sertlik olmamalı', 'Primer odak'],
      ['Aksilla', 'Klinik olarak belirgin patolojik lenf nodu yok', 'Palpabl patolojik nod varsa yaklaşım değişir', 'Klinik nod negatif'],
      ['Cilt bulgusu', 'Ülserasyon veya inflamatuvar meme kanseri bulgusu yok', 'İleri lokal bulgu olmamalı', 'Erken evre bağlam'],
    ],
    summary: 'Erken evre meme kanserinde aksiller yaklaşımı belirleyen temel veri klinik ve ultrasonografik nod durumudur; klinik nod negatif hastada sentinel lenf nodu biyopsisi aksiller evreleme için uygundur.',
    tag: 'Cerrahi ilk değerlendirme',
    score: 3,
  },
};

const extraById = {
  'v168-new-059-ates-ve-sarilikla-basvuran-hasta': [
    (c) => makeInvestigation(c, {
      suffix: 'kan-kulturu-antibiyotik-oncesi',
      title: 'Kan kültürü ve antibiyotik öncesi örnekleme',
      type: 'microbiology',
      category: 'microbiology',
      priority: 'useful',
      tag: 'Antibiyotik öncesi alınmalı',
      score: 3,
      flow: 4,
      values: [
        ['Kan kültürü', 'İki set kan kültürü antibiyotik öncesi alındı; sonuç bekleniyor', 'Sonuç başlangıçta beklenir', 'Beklemede'],
        ['Tedavi etkisi', 'Geniş spektrumlu antibiyotik ve drenaj planı başlatıldı', 'Tedavi kültür sonucunu beklememeli', 'Tedaviyi geciktirmez'],
      ],
      summary: 'Kan kültürü etken ve antibiyotik daraltma için değerlidir; ancak ağır kolanjitte antibiyotik ve ERCP ile biliyer drenaj kültür sonucunu beklememelidir.',
      treatmentImpact: 'Antibiyotik daraltma sonradan kültüre göre yapılır; ilk kaynak kontrolü geciktirilmez.',
    }),
  ],
  'v175-new-107-yumusak-doku-enfeksiyonunda-hizla-kotulesme': [
    (c) => makeInvestigation(c, {
      suffix: 'kultur-debridman-oncesi',
      title: 'Kan/doku kültürü ve debridman güvenliği',
      type: 'microbiology',
      category: 'microbiology',
      priority: 'useful',
      tag: 'Antibiyotik öncesi alınmalı',
      score: 3,
      flow: 3,
      values: [
        ['Kan kültürü', 'Antibiyotik öncesi alındı; sonuç bekleniyor', 'Sonuç başlangıçta beklenir', 'Beklemede'],
        ['Doku kültürü', 'Debridman sırasında derin doku örneği planlandı', 'Yüzey sürüntüsü yeterli değildir', 'Cerrahi örnekleme'],
      ],
      summary: 'Kültür antibiyotik seçimini sonradan daraltmaya yardım eder; klinik nekrotizan enfeksiyon şüphesi varken geniş spektrumlu antibiyotik ve debridman kültür sonucu için bekletilmez.',
    }),
  ],
  'v185-new-223-ates-sarilik-ve-sag-ust-kadran-agrisi': [
    (c) => makeInvestigation(c, {
      suffix: 'kan-kulturu-erken',
      title: 'Kan kültürü ve erken antibiyotik kapısı',
      type: 'microbiology',
      category: 'microbiology',
      priority: 'useful',
      tag: 'Antibiyotik öncesi alınmalı',
      score: 3,
      flow: 3,
      values: [
        ['Kan kültürü', 'İki set kültür alındı; sonuç bekleniyor', 'Sonuç başlangıçta beklenir', 'Beklemede'],
        ['Klinik güvenlik', 'Antibiyotik ve biliyer drenaj planı kültür sonucunu beklemiyor', 'Ağır kolanjitte beklenmemeli', 'Tedaviyi geciktirmez'],
      ],
      summary: 'Kan kültürü ağır kolanjitte uygundur; ancak pozitiflik beklenirken antibiyotik veya ERCP drenajı geciktirmek kaynak kontrolü hatası olur.',
    }),
    (c) => makeInvestigation(c, {
      suffix: 'girişim-guvenlik-paneli'.normalize('NFC'),
      title: 'ERCP öncesi girişim güvenlik paneli',
      type: 'lab',
      category: 'laboratory',
      priority: 'essential',
      tag: 'Girişim öncesi güvenlik',
      score: 3,
      flow: 4,
      values: [
        ['INR', '1.3', '0.8-1.2', 'Hafif yüksek'],
        ['Trombosit', '148.000/mm³', '150.000-400.000/mm³', 'Sınırda düşük'],
        ['Kreatinin', '1.8 mg/dL', '0.6-1.2 mg/dL', 'Yüksek'],
      ],
      summary: 'Koagülasyon, trombosit ve böbrek fonksiyonu ERCP/sfinkterotomi ve sedasyon güvenliğini belirler; bu panel drenaj planını güvenli hale getirir, drenaj kararını gereksiz geciktirmez.',
    }),
  ],
  'v185-new-224-ani-epigastrik-agri-ve-tahta-karin': [
    (c) => makeInvestigation(c, {
      suffix: 'ameliyat-oncesi-guvenlik',
      title: 'Ameliyat öncesi güvenlik ve kan hazırlığı',
      type: 'bloodBank',
      category: 'bloodBank',
      priority: 'essential',
      tag: 'Girişim öncesi güvenlik',
      score: 3,
      flow: 3,
      values: [
        ['INR', '1.1', '0.8-1.2', 'Referans içinde'],
        ['Trombosit', '238.000/mm³', '150.000-400.000/mm³', 'Referans içinde'],
        ['Kan grubu-crossmatch', 'Acil cerrahi için hazırlık başlatıldı', 'Gerekirse hazırlanmalı', 'Devam ediyor'],
      ],
      summary: 'Perforasyon onarımı öncesi kanama ve transfüzyon güvenliği değerlendirilir; ancak yaygın peritonit ve serbest hava varlığında bu hazırlık cerrahi değerlendirmeyi geciktirmemelidir.',
    }),
  ],
  'v189-new-292-cilt-enfeksiyonunda-orantisiz-agri': [
    (c) => makeInvestigation(c, {
      suffix: 'kultur-antibiyotik-debridman',
      title: 'Kan/doku kültürü ve antibiyotik kapısı',
      type: 'microbiology',
      category: 'microbiology',
      priority: 'useful',
      tag: 'Antibiyotik öncesi alınmalı',
      score: 3,
      flow: 3,
      values: [
        ['Kan kültürü', 'Antibiyotik öncesi alındı; sonuç bekleniyor', 'Sonuç başlangıçta beklenir', 'Beklemede'],
        ['Derin doku örneği', 'Debridman sırasında alınması planlandı', 'Yüzey sürüntüsü yeterli değildir', 'Cerrahi örnekleme'],
      ],
      summary: 'Mikrobiyolojik örnekleme tedaviyi daraltmak için değerlidir; fakat nekrotizan enfeksiyon şüphesi varsa antibiyotik ve debridman kültür sonucuna ertelenmez.',
    }),
  ],
  'v189-new-294-supheli-tiroid-nodulu': [
    (c) => makeInvestigation(c, {
      suffix: 'servikal-lenf-nodu-usg-iiab',
      title: 'Servikal lenf nodu ultrasonografisi ve örnekleme planı',
      type: 'ultrasound',
      category: 'imaging',
      priority: 'useful',
      tag: 'Cerrahi planlama için değerli',
      score: 3,
      flow: 4,
      values: [
        ['Lenf nodu USG', 'Sağ santral/lateral boyunda yuvarlak, hilusu silik küçük şüpheli nodlar', 'Benign nodda yağlı hilus korunur', 'Şüpheli'],
        ['Örnekleme', 'Şüpheli noddan USG eşliğinde İİAB düşünülür', 'Gereksiz örnekleme yapılmaz', 'Doğrulayıcı plan'],
      ],
      summary: 'Şüpheli servikal lenf nodu varsa yalnız tiroid nodülünü değil nodal hastalığı da değerlendirmek gerekir; bu bilgi cerrahi planlamayı etkiler ancak ilk karar TSH + USG risk sınıflaması + İİAB eksenindedir.',
    }),
  ],
};

const perExistingMeta = {
  'v163-new-006-sag-alt-kadran-agrisi': {
    'apandisit-hemogram-crp': { tag: 'İlk basamak laboratuvar', score: 3, flow: 2, category: 'laboratory' },
    'apandisit-idrar-ayirici': { tag: 'Ayırıcı tanıya yardım eder', score: 2, flow: 3, category: 'urine', type: 'urine' },
    'apandisit-usg': { tag: 'Hedefli görüntüleme', score: 4, flow: 4, category: 'imaging' },
  },
  'v167-new-047-ates-ve-sag-ust-kadran-agrisi': {
    'kolanjit-hemogram-inflamasyon': { tag: 'Sepsis göstergesi', score: 4, flow: 2, category: 'laboratory' },
    'kolanjit-kolestaz-paneli': { tag: 'Kolestaz göstergesi', score: 3, flow: 3, category: 'laboratory' },
    'kolanjit-perfuzyon': { tag: 'Acil güvenlik testi', score: 4, flow: 4, category: 'laboratory' },
    'kolanjit-koagulasyon': { tag: 'Girişim öncesi güvenlik', score: 3, flow: 5, category: 'laboratory' },
    'kolanjit-usg': { tag: 'Kaynak kontrolü belirler', score: 5, flow: 6, category: 'imaging' },
    'kolanjit-kultur': { tag: 'Antibiyotik öncesi alınmalı', score: 3, flow: 4, category: 'microbiology' },
  },
  'v168-new-059-ates-ve-sarilikla-basvuran-hasta': {
    'agir-kolanjit-inflamasyon': { tag: 'Sepsis göstergesi', score: 5, flow: 2, category: 'laboratory' },
    'agir-kolanjit-kolestaz': { tag: 'Kolestaz göstergesi', score: 3, flow: 3, category: 'laboratory' },
    'agir-kolanjit-organ': { tag: 'Girişim öncesi güvenlik', score: 4, flow: 5, category: 'laboratory' },
    'agir-kolanjit-usg': { tag: 'Kaynak kontrolü belirler', score: 5, flow: 6, category: 'imaging' },
  },
  'v172-new-074-siddetli-karin-agrisi-ve-atriyal-fibrilasyon': {
    'mezenter-iskemi-kan-gazi': { tag: 'İskemi/strangülasyon alarmı', score: 4, flow: 2, category: 'laboratory' },
    'mezenter-iskemi-hemogram-biyokimya': { tag: 'Girişim öncesi güvenlik', score: 3, flow: 3, category: 'laboratory' },
  },
  'v173-new-086-yasli-hastada-mekanik-obstruksiyon': {
    'safra-tasi-ileus-elektrolit': { tag: 'Acil güvenlik testi', score: 4, flow: 2, category: 'metabolic' },
    'safra-tasi-ileus-inflamasyon': { tag: 'İskemi/strangülasyon alarmı', score: 3, flow: 3, category: 'laboratory' },
    'safra-tasi-ileus-bt': { tag: 'Hedefli görüntüleme', score: 5, flow: 4, category: 'imaging', summary: 'BT’de dilate ince barsak ansları, pnömobilia ve ektopik kalsifiye taş birlikteliği safra taşı ileusunu destekler; kusma ve üçüncü boşluk kaybı nedeniyle sıvı-elektrolit resüsitasyonu eş zamanlı yürütülür.' },
  },
  'v174-new-093-travma-sonrasi-karin-hassasiyeti': {
    'travma-kanama-lab': { tag: 'Acil güvenlik testi', score: 5, flow: 2, category: 'bloodBank' },
    'travma-fast': { tag: 'Kaynak kontrolü belirler', score: 5, flow: 3, category: 'imaging' },
  },
  'v174-new-094-sag-ust-kadran-agrisi': {
    'kolesistit-hemogram-crp': { tag: 'İlk basamak laboratuvar', score: 3, flow: 2, category: 'laboratory' },
    'kolesistit-karaciger-pankreas': { tag: 'Ayırıcı tanıya yardım eder', score: 3, flow: 3, category: 'laboratory' },
    'kolesistit-usg': { tag: 'İlk basamak görüntüleme', score: 4, flow: 4, category: 'imaging' },
  },
  'v175-new-107-yumusak-doku-enfeksiyonunda-hizla-kotulesme': {
    'nekfasiit-sepsis': { tag: 'Sepsis göstergesi', score: 5, flow: 2, category: 'laboratory' },
    'nekfasiit-grafi': { tag: 'Tedaviyi geciktirmez', score: 3, flow: 4, category: 'imaging' },
  },
  'v177-new-127-ani-bacak-agrisi-ve-sogukluk': {
    'akut-bacak-iskemi-doppler': { tag: 'Hedefli görüntüleme', score: 4, flow: 2, category: 'imaging' },
    'akut-bacak-iskemi-lab': { tag: 'Girişim öncesi güvenlik', score: 3, flow: 3, category: 'laboratory' },
  },
  'v178-new-137-epigastrik-agri-ve-kusma': {
    'akut-pankreatit-enzim': { tag: 'Doğrulayıcı test', score: 4, flow: 2, category: 'laboratory' },
    'akut-pankreatit-sivi': { tag: 'Acil güvenlik testi', score: 4, flow: 3, category: 'metabolic' },
    'akut-pankreatit-usg': { tag: 'İlk basamak görüntüleme', score: 3, flow: 4, category: 'imaging' },
  },
  'v183-new-190-kasik-sisligi-ve-kusma': {
    'inkarsere-herni-lab': { tag: 'İskemi/strangülasyon alarmı', score: 4, flow: 2, category: 'laboratory' },
    'inkarsere-herni-grafi': { tag: 'Obstrüksiyon göstergesi', score: 3, flow: 3, category: 'imaging' },
  },
  'v184-new-194-sag-ust-kadran-agrisi': {
    'kolesistit2-hemogram': { tag: 'İlk basamak laboratuvar', score: 3, flow: 2, category: 'laboratory' },
    'kolesistit2-panel': { tag: 'Ayırıcı tanıya yardım eder', score: 3, flow: 3, category: 'laboratory' },
    'kolesistit2-usg': { tag: 'İlk basamak görüntüleme', score: 4, flow: 4, category: 'imaging', summary: 'Taşla birlikte duvar kalınlaşması ve perikolesistik sıvı akut kolesistit lehinedir; bu bulgu klinik Murphy pozitifliği ve inflamasyonla birlikte yorumlanmalıdır.' },
  },
  'v185-new-222-ani-sirt-agrisi-ve-hipotansiyon': {
    'aaa-kanama': { tag: 'Acil güvenlik testi', score: 5, flow: 2, category: 'bloodBank' },
    'aaa-yatakbasi-usg': { tag: 'Kaynak kontrolü belirler', score: 5, flow: 3, category: 'imaging' },
  },
  'v185-new-223-ates-sarilik-ve-sag-ust-kadran-agrisi': {
    'kolanjit3-lab': { tag: 'Sepsis göstergesi', score: 5, flow: 2, category: 'laboratory' },
    'kolanjit3-usg': { tag: 'Kaynak kontrolü belirler', score: 5, flow: 5, category: 'imaging' },
  },
  'v185-new-224-ani-epigastrik-agri-ve-tahta-karin': {
    'perforasyon-lab': { tag: 'Acil güvenlik testi', score: 4, flow: 2, category: 'laboratory' },
    'perforasyon-grafi': { tag: 'Perforasyon göstergesi', score: 5, flow: 4, category: 'imaging' },
  },
  'v187-new-253-siddetli-karin-agrisi-ve-hafif-muayene-bulgusu': {
    'ami-laktat-gaz': { tag: 'İskemi/strangülasyon alarmı', score: 4, flow: 2, category: 'laboratory' },
    'ami-bt-anjiyo': { tag: 'Hedefli görüntüleme', score: 5, flow: 3, category: 'imaging' },
  },
  'v188-new-268-epigastrik-agri-ve-lipaz-yuksekligi': {
    'pankreatit2-lipaz': { tag: 'Doğrulayıcı test', score: 4, flow: 2, category: 'laboratory' },
    'pankreatit2-panel': { tag: 'Acil güvenlik testi', score: 3, flow: 3, category: 'metabolic' },
    'pankreatit2-usg': { tag: 'İlk basamak görüntüleme', score: 3, flow: 4, category: 'imaging' },
  },
  'v189-new-292-cilt-enfeksiyonunda-orantisiz-agri': {
    'nekfasiit2-lab': { tag: 'Sepsis göstergesi', score: 5, flow: 2, category: 'laboratory' },
    'nekfasiit2-grafi': { tag: 'Tedaviyi geciktirmez', score: 3, flow: 4, category: 'imaging' },
  },
  'v189-new-293-karin-sisligi-ve-gaz-cikaramama': {
    'sigmoid-volvulus-lab': { tag: 'İskemi/strangülasyon alarmı', score: 3, flow: 2, category: 'metabolic' },
    'sigmoid-volvulus-grafi': { tag: 'Obstrüksiyon göstergesi', score: 4, flow: 3, category: 'imaging' },
  },
  'v189-new-294-supheli-tiroid-nodulu': {
    'tiroid-tsh': { tag: 'İlk basamak laboratuvar', score: 4, flow: 2, category: 'laboratory' },
    'tiroid-usg': { tag: 'Yüksek şüpheli bulgu', score: 5, flow: 3, category: 'imaging' },
  },
  'v194-new-327-yutma-sonrasi-agiza-gida-gelmesi': {
    'zenker-baryum': { tag: 'Hedefli görüntüleme', score: 5, flow: 2, category: 'gastrointestinal' },
    'zenker-akciger': { tag: 'Komplikasyon taraması', score: 2, flow: 3, category: 'imaging' },
  },
  'v194-new-328-agrisiz-sarilik-ve-kilo-kaybi': {
    'pankreas-ca-kolestaz': { tag: 'Kolestaz göstergesi', score: 4, flow: 2, category: 'laboratory' },
    'pankreas-ca-usg': { tag: 'İlk basamak görüntüleme', score: 3, flow: 3, category: 'imaging' },
    'pankreas-ca-bt': { tag: 'Cerrahi planlama için değerli', score: 5, flow: 4, category: 'imaging' },
    'pankreas-ca-marker': { tag: 'Bu olguda sınırlı katkı', score: 1, flow: 5, category: 'laboratory' },
  },
  'v195-new-355-kusma-sonrasi-gogus-agrisi': {
    'boerhaave-lab': { tag: 'Sepsis göstergesi', score: 4, flow: 2, category: 'laboratory' },
    'boerhaave-ekg': { tag: 'Ayırıcı tanıya yardım eder', score: 2, flow: 3, category: 'cardiac' },
    'boerhaave-bt': { tag: 'Kaynak kontrolü belirler', score: 5, flow: 4, category: 'imaging' },
  },
  'v195-new-356-kasik-altinda-agrili-sislik': {
    'femoral-herni-lab': { tag: 'İskemi/strangülasyon alarmı', score: 3, flow: 2, category: 'laboratory' },
    'femoral-herni-usg': { tag: 'Hedefli görüntüleme', score: 4, flow: 3, category: 'imaging' },
  },
  'v195-new-357-erken-evre-meme-kitlesi': {
    'meme-goruntuleme': { tag: 'Cerrahi planlama için değerli', score: 4, flow: 2, category: 'imaging' },
    'meme-kor-biyopsi': { tag: 'Doğrulayıcı test', score: 4, flow: 3, category: 'pathology' },
  },
};

const transformedIds = [];
const addedInvestigationCountById = {};

for (const clinicalCase of rawCases) {
  if (!surgeryIds.has(clinicalCase.id)) continue;
  recursivelyClean(clinicalCase);
  const beforeCount = clinicalCase.investigations?.length || 0;
  const index = byId(clinicalCase);
  const config = clinicalFirst[clinicalCase.id];
  if (!config) throw new Error(`Missing clinical-first configuration for ${clinicalCase.id}`);
  const next = [makeInvestigation(clinicalCase, {
    suffix: 'cerrahi-ilk-degerlendirme',
    title: config.title,
    type: 'clinical',
    category: 'clinicalAssessment',
    priority: config.score >= 5 ? 'essential' : 'useful',
    tag: config.tag || 'Cerrahi ilk değerlendirme',
    score: config.score ?? 2,
    flow: 1,
    values: config.values,
    summary: config.summary,
    sourceControlImpact: config.summary,
    emergencyValue: config.summary,
  })];

  const existingMeta = perExistingMeta[clinicalCase.id] || {};
  for (const inv of clinicalCase.investigations || []) {
    const meta = existingMeta[inv.id] || { tag: 'Destekleyici veri', score: 2, flow: 10 };
    next.push(enhanceInvestigation(inv, meta));
  }
  for (const factory of extraById[clinicalCase.id] || []) next.push(factory(clinicalCase));
  setInvestigations(clinicalCase, next.sort((a, b) => (a.clinicalFlowOrder ?? 999) - (b.clinicalFlowOrder ?? 999)), 'Genel Cerrahi vakasında objektif veri katmanı cerrahi ilk değerlendirme → acil güvenlik → laboratuvar → hedefli görüntüleme/doğrulama → girişim/kaynak kontrolü sırasına göre düzenlendi.');
  transformedIds.push(clinicalCase.id);
  addedInvestigationCountById[clinicalCase.id] = clinicalCase.investigations.length - beforeCount;
}

// Duplicate and integrity checks.
const allIds = rawCases.map((item) => item.id);
const duplicateCaseIds = allIds.filter((id, idx) => allIds.indexOf(id) !== idx);
const afterNonSurgeryHash = crypto.createHash('sha256')
  .update(JSON.stringify(rawCases.filter((item) => item.branchId !== 'general-surgery')))
  .digest('hex');
if (beforeNonSurgeryHash !== afterNonSurgeryHash) throw new Error('Scope guard failed: non-general-surgery cases changed.');
if (duplicateCaseIds.length) throw new Error(`Duplicate case IDs: ${duplicateCaseIds.join(', ')}`);
if (transformedIds.length !== surgeryIds.size) throw new Error(`Coverage mismatch: ${transformedIds.length}/${surgeryIds.size}`);

const source = fs.readFileSync(SOURCE_PATH, 'utf8');
const prefixMatch = source.match(/^[\s\S]*?export const rawCases = /);
const footerMatch = source.match(/\n\];\n\nexport const cases =[\s\S]*$/);
if (!prefixMatch || !footerMatch) throw new Error('Could not locate cases.js rawCases boundaries.');
const nextSource = `${prefixMatch[0]}${JSON.stringify(rawCases, null, 2)};${footerMatch[0].slice(3)}`;
fs.writeFileSync(SOURCE_PATH, nextSource, 'utf8');

const afterSurgerySummary = rawCases
  .filter((item) => surgeryIds.has(item.id))
  .map((item) => ({
    id: item.id,
    title: item.title,
    investigationCount: item.investigations?.length || 0,
    tags: (item.investigations || []).map((inv) => inv.testValueLabel).filter(Boolean),
    added: addedInvestigationCountById[item.id],
  }));

const report = {
  generatedAt: '2026-05-29',
  scope: 'Only branchId == general-surgery and caseType == standard',
  totalGeneralSurgeryCases: surgeryIds.size,
  transformedIds,
  beforeSurgerySummary,
  afterSurgerySummary,
  addedInvestigationCountById,
  qualityGates: {
    nonGeneralSurgeryUnchanged: beforeNonSurgeryHash === afterNonSurgeryHash,
    duplicateCaseIds: duplicateCaseIds.length,
    allGeneralSurgeryCasesCovered: transformedIds.length === surgeryIds.size,
    preserveInvestigationOrderEnabled: rawCases.filter((item) => surgeryIds.has(item.id)).every((item) => item.preserveInvestigationOrder === true),
    availableInvestigationsSynced: rawCases.filter((item) => surgeryIds.has(item.id)).every((item) => JSON.stringify(item.availableInvestigations || []) === JSON.stringify(item.investigations || [])),
    everyInvestigationTagged: rawCases.filter((item) => surgeryIds.has(item.id)).every((item) => (item.investigations || []).every((inv) => Boolean(inv.testValueLabel && inv.scoreImpact !== undefined))),
  },
};
fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');

const technical = [
  'KlinikIQ Genel Cerrahi tetkik/objektif veri katmanı güçlendirme raporu',
  'Kapsam: yalnız branchId="general-surgery" ve caseType="standard" olan 27 vaka.',
  'Yapılanlar:',
  '- Her Genel Cerrahi vakasına cerrahi ilk değerlendirme / klinik alarm / stabilite-kaynak kontrol katmanı eklendi.',
  '- Mevcut tetkikler cerrahi acil önceliğe göre etiketlendi: acil güvenlik testi, kaynak kontrolü belirler, girişim öncesi güvenlik, ilk basamak görüntüleme, hedefli görüntüleme, doğrulayıcı test, komplikasyon taraması.',
  '- Tüm tetkiklere testValueLabel, clinicalPriorityLabel, educationalValue, scoreImpact, scoreValue ve clinicalFlowOrder alanları eklendi veya güncellendi.',
  '- Ağır kolanjit ve nekrotizan enfeksiyonlarda kültürün antibiyotik/debridman/drenajı geciktirmemesi açıkça belirtildi.',
  '- Perforasyon, rüptüre AAA, travma, strangülasyon ve nekrotizan enfeksiyonlarda ileri tetkikin kaynak kontrolünü geciktirmeme kapısı korundu.',
  '- Akut kolesistit USG yorumundaki bozuk/eksik kalıp cümle temizlendi; patolojik bulgu etiketleri korunarak anlamlı hale getirildi.',
  '- Tiroid nodülünde TSH → USG risk sınıflaması → USG eşliğinde İİAB akışı netleştirildi; normal TSH’da sintigrafinin öncelikli olmadığı mesajı korundu.',
  '- Duplicate case ID kontrolü ve Genel Cerrahi dışı branş değişmedi hash kontrolü yapıldı.',
  '',
  `Genel Cerrahi vaka sayısı: ${surgeryIds.size}`,
  `Değiştirilen vaka sayısı: ${transformedIds.length}`,
  `Genel Cerrahi dışı scope guard: ${beforeNonSurgeryHash === afterNonSurgeryHash ? 'GEÇTİ' : 'BAŞARISIZ'}`,
].join('\n');
fs.writeFileSync(TECH_REPORT_PATH, technical, 'utf8');

console.log(JSON.stringify({ ok: true, transformed: transformedIds.length, reportPath: REPORT_PATH }, null, 2));
