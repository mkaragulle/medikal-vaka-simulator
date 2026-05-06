import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cases } from '../src/data/cases.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const targetFile = path.join(rootDir, 'src/data/cases.js');
const reportFile = path.join(rootDir, 'ANSWER_FEEDBACK_PRO_REWORK_REPORT.json');
const summaryFile = path.join(rootDir, 'ANSWER_FEEDBACK_PRO_REWORK_SUMMARY.md');

const MAX_EVIDENCE = 5;
const MAX_PEARLS = 4;
const MAX_MANAGEMENT = 4;

const BAD_TITLE_RE = /^(kanıt\s*\d+|kanıt|gerekçe ipucu|ayırt ettirici ipucu)$/iu;
const BAD_TEXT_RE = /^(yüksek|düşük|normal|pozitif|negatif|saptandı|saptanmadı)\.?$/iu;
const GENERIC_EXPLANATION_RE = /(belirli klinik koşullarda|yakın bir çeldirici|karar verdirici patern|ayırıcı tanıda düşünülebilir; ancak zamanlama|başvuru zamanı, muayene bulguları ve tetkik paterni|kanıt zinciri .* tanısını daha güçlü destekler|ilk yönetim doğru tanının aciliyetine göre|bu seçenek.*ana ipucunu|olgunun klinik paterni .* ile en uyumludur|belirleyici bulgular doğru seçeneği destekler)/iu;
const GENERIC_POINT_RE = /(kanıt zinciri|ilk yönetim doğru tanının aciliyetine göre|beklenen baskın bulgular|ana ipucu:|karar verdirici patern|belirli klinik koşullarda)/iu;

const BRANCH_FALLBACKS = {
  'medical-microbiology': {
    label: 'Etken-test ayrımı',
    pearl: 'Mikrobiyoloji sorularında etken, bulaş yolu, özgül tanı testi ve tedavi/izolasyon ilişkisi birlikte yorumlanmalıdır.',
    steps: [
      ['Etkeni belirle', 'Epidemiyoloji, bulaş yolu ve klinik tabloyu olası etkenle eşleştir.'],
      ['Tanı testini seç', 'Kültür, seroloji, antijen veya PCR sonucunu klinik olasılıkla birlikte yorumla.'],
      ['Tedaviyi bağla', 'Ampirik/etkene yönelik tedavi ve izolasyon kararını klinik ağırlığa göre netleştir.'],
    ],
  },
  'medical-pharmacology': {
    label: 'İlaç mantığı',
    pearl: 'Farmakoloji sorularında doğru yanıt etki mekanizması, yan etki, kontrendikasyon veya antidot ilişkisi üzerinden seçilmelidir.',
    steps: [
      ['Mekanizmayı tanı', 'İlacın hedef reseptör, enzim veya kanal etkisini belirle.'],
      ['Toksisiteyi eşleştir', 'Yan etki, kontrendikasyon veya antidot ipucunu seçeneklerle karşılaştır.'],
      ['Klinik kararı ver', 'Benzer ilaçları kullanım yeri ve güvenlilik farkıyla ayır.'],
    ],
  },
  'medical-pathology': {
    label: 'Morfolojik patern',
    pearl: 'Patoloji sorularında hücre tipi, nekroz/inflamasyon paterni ve histolojik ayırt ettirici bulgu doğru yanıtı belirler.',
    steps: [
      ['Morfolojiyi tanı', 'Doku, hücre tipi ve lezyon paternini seçeneklerle eşleştir.'],
      ['Mekanizmaya bağla', 'Morfolojik bulguyu etiyoloji veya patogenezle ilişkilendir.'],
      ['Çeldiriciyi ele', 'Benzer lezyonları nekroz tipi, hücre tipi veya marker farkıyla ayır.'],
    ],
  },
  'medical-biochemistry': {
    label: 'Yolak/marker ayrımı',
    pearl: 'Biyokimya sorularında enzim, metabolit, kofaktör veya yolak basamağı doğru yanıtın mekanistik temelidir.',
    steps: [
      ['Yolak basamağını bul', 'Bozulan enzim veya metabolik basamağı klinik/laboratuvar paterninden çıkar.'],
      ['Birikimi yorumla', 'Artan veya azalan metaboliti eksik basamakla eşleştir.'],
      ['Benzerleri ayır', 'Çeldirici enzimleri substrat, ürün veya kofaktör farkıyla ele.'],
    ],
  },
  anatomy: {
    label: 'Anatomik lokalizasyon',
    pearl: 'Anatomi sorularında lezyon yeri, komşuluk ve fonksiyon kaybı doğru yapıyı seçtirir.',
    steps: [
      ['Lokalizasyonu belirle', 'Semptom ve muayene bulgusunu anatomik bölgeye yerleştir.'],
      ['Fonksiyonu eşleştir', 'Duyu, motor veya damar dağılımını ilgili yapı ile ilişkilendir.'],
      ['Komşulukla ayır', 'Benzer yapıları seyir, komşuluk ve innervasyon farkıyla ele.'],
    ],
  },
  physiology: {
    label: 'Fizyolojik ilişki',
    pearl: 'Fizyoloji sorularında değişkenler arasındaki yön ilişkisi ve homeostatik yanıt doğru seçeneği belirler.',
    steps: [
      ['Parametreyi belirle', 'Değişen fizyolojik değişkeni ve tetikleyen durumu tanımla.'],
      ['Yanıt yönünü çıkar', 'Geri bildirim veya kompansasyonun artış-azalış yönünü yorumla.'],
      ['Seçenekleri sınırla', 'Beklenen homeostatik yanıtla çelişen seçenekleri ele.'],
    ],
  },
  'histology-embryology': {
    label: 'Doku-gelişim ilişkisi',
    pearl: 'Histoloji/embriyoloji sorularında doku katmanı, hücre tipi veya gelişimsel köken ayırt ettirici bilgidir.',
    steps: [
      ['Doku tipini tanı', 'Hücre, tabaka veya embriyolojik köken bilgisini belirle.'],
      ['Fonksiyona bağla', 'Morfolojik özelliği işlev veya gelişim basamağıyla ilişkilendir.'],
      ['Benzer dokuları ayır', 'Boyanma, tabakalanma veya köken farkını kullan.'],
    ],
  },
};

const OPTION_PATTERNS = [
  [/pnömoni|pneumonia/iu, 'Ateş, öksürük, balgam ve akciğer grafisinde parankimal infiltrasyon beklenir.'],
  [/pnömotoraks|pneumothorax/iu, 'Tek taraflı solunum sesi azalması ve akciğer grafisinde plevral çizgi beklenir.'],
  [/astım|asthma/iu, 'Wheezing, bronkospazm ve ekspiratuvar hava akımı kısıtlılığı ön planda olur.'],
  [/akut koroner|miyokart|myocard|stemi|nstemi|angina/iu, 'İskemik göğüs ağrısı, EKG değişikliği ve troponin dinamiği beklenir.'],
  [/perikardit/iu, 'Pozisyonla değişen ağrı, yaygın konkav ST elevasyonu ve PR depresyonu beklenir.'],
  [/aort diseksiyonu|diseksiyon/iu, 'Yırtılır tarzda ağrı, nabız/tansiyon asimetrisi ve aort görüntüleme bulgusu beklenir.'],
  [/tamponad/iu, 'Hipotansiyon, juguler venöz dolgunluk ve kalp seslerinde derinden gelme ile obstrüktif şok beklenir.'],
  [/sepsis|septik/iu, 'Enfeksiyon odağına eşlik eden hipotansiyon, laktat artışı ve organ disfonksiyonu beklenir.'],
  [/menenjit|meningit/iu, 'Ateş, ense sertliği, bilinç değişikliği ve BOS paterninin uyumu beklenir.'],
  [/subaraknoid|SAH/iu, 'Ani thunderclap baş ağrısı ve kanama gösteren BT/BOS bulguları beklenir.'],
  [/migren/iu, 'Tekrarlayan ataklar, fotofobi/fonofobi ve fokal acil nörolojik bulgu olmaması beklenir.'],
  [/inme|stroke|iskemik/iu, 'Ani fokal nörolojik defisit ve vasküler dağılıma uyan görüntüleme paterni beklenir.'],
  [/apandisit|appendisit/iu, 'Periumblikal başlayıp sağ alt kadrana göç eden ağrı, McBurney hassasiyeti ve inflamasyon bulguları beklenir.'],
  [/kolesistit|cholecystitis/iu, 'Sağ üst kadran ağrısı, Murphy pozitifliği ve safra kesesi görüntüleme bulgusu beklenir.'],
  [/pankreatit/iu, 'Epigastrik kuşak tarzı ağrı ve lipaz/amilaz yüksekliği beklenir.'],
  [/ektopik|dış gebelik/iu, 'Amenore, vajinal kanama, pelvik ağrı ve beta-hCG/USG uyumsuzluğu beklenir.'],
  [/preeklampsi|eklampsi/iu, 'Gebelikte hipertansiyon, proteinüri veya uç organ etkilenmesi beklenir.'],
  [/anafilaksi|anafılaksi/iu, 'Alerjen temasından sonra ürtiker, bronkospazm ve hipotansiyon beklenir.'],
  [/diyabetik ketoasidoz|DKA/iu, 'Hiperglisemi, ketonemi, yüksek anyon açıklı metabolik asidoz ve dehidratasyon beklenir.'],
  [/hipoglisemi/iu, 'Adrenerjik semptomlar, nöroglikopeni ve düşük plazma glukozu beklenir.'],
  [/akut radyasyon sendromu/iu, 'Anlamlı iyonizan radyasyon maruziyeti, GİS prodromu ve hematopoetik baskılanma beklenir.'],
  [/gıda zehirlenmesi/iu, 'Kontamine gıda sonrası kısa sürede bulantı-kusma/ishal kümelenmesi beklenir.'],
  [/termal yanık/iu, 'Isı teması sonrası ciltte yanık derinliği ve yüzey alanı bulguları beklenir.'],
  [/panik atak/iu, 'Yoğun korku atağına eşlik eden çarpıntı/dispne olabilir; objektif tromboemboli veya organ patolojisi beklenmez.'],
  [/spontan abortus|düşük/iu, 'Gebelik kaybı bağlamında vajinal kanama, kramp ve servikal/USG bulgusu beklenir.'],
];

function normalizeText(value = '') {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function itemText(item) {
  if (!item) return '';
  if (typeof item === 'string') return normalizeText(item);
  return normalizeText(item.text || item.description || item.summary || item.explanation || item.finding || item.label || item.title || '');
}

function itemTitle(item) {
  if (!item || typeof item === 'string') return '';
  return normalizeText(item.title || item.label || item.heading || item.type || '');
}

function sentence(value = '') {
  const text = normalizeText(value);
  if (!text) return '';
  const fixed = text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
  return /[.!?]$/u.test(fixed) ? fixed : `${fixed}.`;
}

function trimPunctuation(value = '') {
  return normalizeText(value).replace(/[.;:]$/u, '');
}

function splitSentences(text = '') {
  const protectedText = normalizeText(text).replace(/\b([A-ZÇĞİÖŞÜ])\.\s+(?=[a-zçğıöşü])/gu, '$1§ ');
  return protectedText
    .split(/(?<=[.!?])\s+/u)
    .map((x) => x.replace(/§/g, '.').trim())
    .filter(Boolean);
}

function compact(text = '', max = 520, maxSentences = 3) {
  const sentences = splitSentences(text).slice(0, maxSentences);
  const source = sentences.length ? sentences.join(' ') : normalizeText(text);
  if (source.length <= max) return source;
  return `${source.slice(0, max).replace(/\s+\S*$/u, '').trim()}…`;
}

function stripBadMeta(text = '') {
  return normalizeText(text)
    .replace(/\bBu spot olguda\s+/giu, '')
    .replace(/\bBu vaka,?\s*/giu, '')
    .replace(/\bOlgunun klinik paterni\s+([^.]*)\s+ile en uyumludur\.\s*/giu, '')
    .replace(/\bAyırıcı tanıda benzer tablolar olsa da belirleyici bulgular doğru seçeneği destekler\.\s*/giu, '')
    .replace(/\bBu nedenle en iyi yanıt\s+([^.]*)\s+seçeneğidir\.\s*/giu, '')
    .replace(/\bKanıt zinciri\s+[^.]*\.\s*/giu, '')
    .replace(/\bİlk yönetim doğru tanının aciliyetine göre planlanmalıdır\.\s*/giu, '')
    .replace(/\bbelirli klinik koşullarda doğru olabilir;?\s*/giu, '')
    .replace(/\bkarar verdirici patern farklıdır\.\s*/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function uniqueByText(items = []) {
  const seen = new Set();
  const out = [];
  items.forEach((item) => {
    const text = itemText(item) || item.text || '';
    const key = normalizeText(text).toLocaleLowerCase('tr');
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(item);
  });
  return out;
}

function isLabText(text = '') {
  const n = normalizeText(text).toLocaleLowerCase('tr');
  return /troponin|d-dimer|crp|lökosit|hemoglobin|trombosit|glukoz|keton|ph\b|pco2|hco3|baz açığı|enzim|metabolit|kreatinin|üre|ast|alt|bilirubin|alp|ggt|amilaz|lipaz|seroloji|kültür|pcr|marker|antikor|antijen|igg|igm|ige|iga|ng\/ml|mg\/dl|mmol|iu\/l|pozitif|negatif/.test(n);
}

function isImagingText(text = '') {
  const n = normalizeText(text).toLocaleLowerCase('tr');
  return /bt|mr\b|mrg|usg|grafi|tomografi|radyografi|ultrason|anjiyografi|dolum defekti|infiltrasyon|plevral çizgi|ekokardiyografi|eko\b|röntgen|görüntüleme/.test(n);
}

function inferEvidenceTitle(text = '', c = {}, originalTitle = '') {
  const title = normalizeText(originalTitle);
  const n = normalizeText(text).toLocaleLowerCase('tr');
  const genericTitle = !title || BAD_TITLE_RE.test(title) || (title === 'Laboratuvar paterni' && !isLabText(text));
  if (!genericTitle && !/^morfolojik patern$/iu.test(title)) return title;

  if (/kalça protezi|cerrahi|postoperatif|ameliyat|immobilizasyon|uzun uçuş|oral kontraseptif|lohusalık|gebelik|travma|sigara|aile öyküsü|maruziyet|temas|seyahat/.test(n)) return /postoperatif|ameliyat|immobilizasyon|kalça protezi/.test(n) ? 'Postoperatif risk faktörü' : 'Risk faktörü';
  if (/ani dispne|nefes darlığı|plöritik|batıcı göğüs ağrısı|taşikardi/.test(n)) return 'Akut solunum paterni';
  if (/başvuru|ağrı|bulantı|kusma|ishal|ateş|öksürük|baş ağrısı|nöbet|dispne|kanama/.test(n)) return 'Başvuru paterni';
  if (/st |ekg|derivasyon|ritim|qrs|qt|pr\b|segment|elevasyon|depresyon/.test(n)) return 'EKG paterni';
  if (/d-dimer/.test(n)) return 'D-dimer yüksekliği';
  if (isImagingText(n)) {
    if (/pulmoner arter|dolum defekti|anjiyografi/.test(n)) return 'BT pulmoner anjiyografi';
    return 'Görüntüleme bulgusu';
  }
  if (isLabText(n)) return /seroloji|antikor|antijen|igm|igg|pcr/.test(n) ? 'Serolojik/laboratuvar patern' : 'Laboratuvar paterni';
  if (/muayene|oskültasyon|defans|rebound|döküntü|ekimoz|letarji|ral|üfürüm|ödem|nörolojik|nabız|hipotansiyon|wheezing|hassasiyet/.test(n)) return 'Fizik muayene bulgusu';
  if (/reseptör|enzim|gen|mutasyon|yolak|hormon|protein|nekroz|inflamasyon|apoptoz|koenzim|inhibisyon/.test(n)) return 'Mekanizma';
  if (/histolojik|histopatolojik|morfoloji|biyopsi|hücre|granülom|nekroz/.test(n)) return 'Histopatolojik bulgu';
  if (/negatif|saptanmadı|normal|yok|dışlanır/.test(n)) return 'Ayırt ettirici negatif bulgu';
  if (/yenidoğan|bebek|çocuk|adölesan|gebe|yaşında/.test(n)) return 'Klinik bağlam';
  return BRANCH_FALLBACKS[c.branchId]?.label || 'Klinik ipucu';
}

function cleanEvidenceItem(raw, c, index) {
  let title = itemTitle(raw);
  let text = stripBadMeta(itemText(raw));
  const colon = text.match(/^([^:：]{2,46})[:：]\s*(.+)$/u);
  if ((!title || BAD_TITLE_RE.test(title)) && colon) {
    title = normalizeText(colon[1]);
    text = normalizeText(colon[2]);
  }
  text = text
    .replace(/^Başvuru:\s*/iu, '')
    .replace(/^Muayene:\s*/iu, '')
    .replace(/^Tetkik:\s*/iu, '')
    .replace(/\bAna ipucu:\s*/giu, '')
    .replace(/^Kanıt\s*\d+\s*[:：]\s*/giu, '')
    .trim();

  if (!text || BAD_TEXT_RE.test(text)) return null;

  title = inferEvidenceTitle(text, c, title);
  if (BAD_TITLE_RE.test(title)) title = inferEvidenceTitle(text, c, '');

  if (/d-dimer/i.test(title) && /yüksek|2\.400|ng\/ml|FEU/i.test(text)) {
    text = 'D-dimer yüksekliği tromboemboli olasılığını destekler; ancak tek başına tanı koydurmaz';
  }
  if (/bt pulmoner anjiyografi/i.test(title) && /dolum defekti/i.test(text)) {
    text = 'Pulmoner arter dalında dolum defekti, pulmoner emboli için karar verdirici görüntüleme bulgusudur';
  }

  return {
    title: trimPunctuation(compact(title, 54, 1)),
    text: sentence(compact(text, 190, 2)),
  };
}

function getFeedback(c) {
  return c.diagnosis?.answerFeedback || c.answerFeedback || {};
}

function correctOf(c) {
  return c.diagnosis?.correct || '';
}

function mainClues(c, evidence = [], count = 2) {
  const ev = evidence.map((x) => trimPunctuation(x.text)).filter(Boolean);
  if (ev.length) return ev.slice(0, count);
  const clues = [
    c.patientIntro?.priorityFocus,
    ...(Array.isArray(c.patientIntro?.distinctiveClues) ? c.patientIntro.distinctiveClues : []),
    c.clinicalFocus,
    c.chiefComplaint,
  ].map((x) => stripBadMeta(x)).filter(Boolean);
  return uniqueByText(clues).slice(0, count).map((x) => compact(itemText(x), 150, 1));
}

function observedPattern(c, evidence = []) {
  const clues = mainClues(c, evidence, 2);
  if (clues.length >= 2) return `${trimPunctuation(clues[0])} ve ${trimPunctuation(clues[1])}`;
  if (clues.length === 1) return trimPunctuation(clues[0]);
  return trimPunctuation(c.clinicalFocus || c.title || 'olgudaki temel patern');
}

function buildEvidence(c, feedback) {
  const raw = [];
  if (Array.isArray(feedback.evidenceChain)) raw.push(...feedback.evidenceChain);
  if (Array.isArray(c.patientIntro?.distinctiveClues)) {
    c.patientIntro.distinctiveClues.slice(0, 4).forEach((x) => raw.push({ title: 'TUS ipucu', text: x }));
  }
  splitSentences(c.stem || '').slice(0, 2).forEach((x) => raw.push({ title: 'Öykü ipucu', text: x }));
  if (c.chiefComplaint) raw.push({ title: 'Başvuru paterni', text: c.chiefComplaint });
  if (Array.isArray(c.exam)) c.exam.slice(0, 2).forEach((x) => raw.push({ title: 'Fizik muayene bulgusu', text: x }));
  (c.investigations || []).forEach((inv) => {
    const text = inv.summary || inv.findings?.[0] || inv.interpretation || inv.result || '';
    if (text) raw.push({ title: inv.label || inv.type || 'Tetkik bulgusu', text });
  });
  splitSentences(c.diagnosis?.explanation || '').slice(0, 2).forEach((x) => raw.push({ title: 'Tanısal bağlantı', text: x }));

  let evidence = uniqueByText(raw)
    .map((item, index) => cleanEvidenceItem(item, c, index))
    .filter(Boolean)
    .filter((item) => !BAD_TITLE_RE.test(item.title) && !BAD_TEXT_RE.test(item.text));

  evidence = uniqueByText(evidence);
  const priority = (item) => {
    const text = `${item.title} ${item.text}`.toLocaleLowerCase('tr');
    let score = 0;
    if (/risk|postoperatif|cerrahi|maruziyet|immobilizasyon|gebelik|ilaç|seyahat/.test(text)) score += 4;
    if (/başvuru|akut|ani|ağrı|dispne|ateş|nöbet|kanama|öksürük/.test(text)) score += 3;
    if (/ekg|görüntüleme|bt|mr|usg|laboratuvar|d-dimer|troponin|seroloji|kültür|pcr|histopatolojik/.test(text)) score += 5;
    if (/mecanizma|mekanizma|yolak|enzim|reseptör|morfoloji/.test(text)) score += 3;
    if (/klinik mekanizma ile uyumlu|ana problemidir/.test(text)) score -= 4;
    if (/tanısal bağlantı|tus ipucu/.test(text)) score -= 3;
    return score;
  };
  evidence.sort((a, b) => priority(b) - priority(a));
  evidence = evidence.slice(0, MAX_EVIDENCE);

  if (evidence.length < 3 && c.clinicalFocus) evidence.push(cleanEvidenceItem({ title: 'TUS ipucu', text: c.clinicalFocus }, c, evidence.length));
  if (evidence.length < 3 && c.diagnosis?.explanation) evidence.push(cleanEvidenceItem({ title: 'Tanısal bağlantı', text: c.diagnosis.explanation }, c, evidence.length));

  return uniqueByText(evidence).slice(0, MAX_EVIDENCE);
}

function getOptionExpected(option = '') {
  const match = OPTION_PATTERNS.find(([regex]) => regex.test(option));
  return match?.[1] || '';
}

function cleanPearlLabel(label = '', c = {}) {
  const clean = trimPunctuation(normalizeText(label));
  if (!clean || BAD_TITLE_RE.test(clean) || /^morfolojik patern$/iu.test(clean) && !/pathology|patoloji|histolojik/i.test(c.branchId || '')) {
    return BRANCH_FALLBACKS[c.branchId]?.label || 'TUS paterni';
  }
  if (/morfolojik patern/i.test(clean) && /pulmoner embol|tromboemboli/i.test(correctOf(c))) return 'TUS paterni';
  return compact(clean, 48, 1);
}

function inferPearlLabel(text = '', c = {}) {
  const n = normalizeText(text).toLocaleLowerCase('tr');
  if (/d-dimer|spesifik değildir|tuzak|karışır|değil/.test(n)) return 'Sık tuzak';
  if (/ilk|başla|tedavi|antikoagülasyon|tromboliz|reperfüzyon|antidot|cerrahi/.test(n)) return 'Tedavi notu';
  if (/test|tanı|bt|mrg|seroloji|kültür|pcr|histoloji|marker/.test(n)) return 'Tanısal test';
  if (/mekanizma|enzim|reseptör|yolak|mutasyon|protein/.test(n)) return 'Mekanizma';
  if (/acil|instabil|şok|kırmızı bayrak|bildirim/.test(n)) return 'TUS kırmızı bayrağı';
  return BRANCH_FALLBACKS[c.branchId]?.label || 'TUS paterni';
}

function buildPearls(c, feedback, evidence) {
  const raw = [];
  if (Array.isArray(feedback.clinicalPearls)) raw.push(...feedback.clinicalPearls);
  if (Array.isArray(feedback.pearls)) raw.push(...feedback.pearls);
  if (Array.isArray(c.diagnosis?.pearls)) raw.push(...c.diagnosis.pearls);
  if (c.spotPearl) raw.push(c.spotPearl);

  const pearls = uniqueByText(raw)
    .map((item) => {
      let label = itemTitle(item) || (typeof item === 'object' ? item.label : '');
      let text = stripBadMeta(itemText(item));
      const colon = text.match(/^([^:：]{2,42})[:：]\s*(.+)$/u);
      if ((!label || BAD_TITLE_RE.test(label)) && colon) {
        label = colon[1];
        text = colon[2];
      }
      text = text.replace(/\bAna ipucu:\s*/giu, '').replace(/^Kanıt\s*\d+\s*[:：]?\s*/giu, '').trim();
      if (!text || text.length < 9 || GENERIC_POINT_RE.test(text) || BAD_TEXT_RE.test(text)) return null;
      return { label: cleanPearlLabel(label || inferPearlLabel(text, c), c), text: sentence(compact(text, 170, 1)) };
    })
    .filter(Boolean);

  if (pearls.length < 2 && evidence.length) pearls.push({ label: 'TUS paterni', text: sentence(`${trimPunctuation(evidence[0].text)} benzer çeldiricileri eleten yüksek verimli ipucudur`) });
  if (pearls.length < 3) pearls.push({ label: BRANCH_FALLBACKS[c.branchId]?.label || 'Sınav notu', text: sentence(BRANCH_FALLBACKS[c.branchId]?.pearl || 'Doğru yanıt tek bir kelimeden değil; öykü, muayene ve objektif tetkik paterninin birlikte yorumlanmasından çıkar') });

  return uniqueByText(pearls).slice(0, MAX_PEARLS);
}

function inferManagementTitle(text = '', c = {}) {
  const n = normalizeText(text).toLocaleLowerCase('tr');
  if (/olasılık|risk|patern|değerlendir|tanı|düşün|ayırıcı/.test(n)) return 'Klinik olasılığı belirle';
  if (/stabil|abc|hava yolu|solunum|dolaşım|monitör|damar yolu|vital|hipotansiyon|şok|yüksek risk/.test(n)) return 'Stabiliteyi sınıfla';
  if (/bt|mr|usg|ekg|laboratuvar|kültür|seroloji|pcr|biyopsi|doğrula|tetkik|test/.test(n)) return 'Tanıyı doğrula';
  if (/tedavi|başla|ver|antibiyotik|antikoagülasyon|tromboliz|aspirin|insülin|antidot|cerrahi|pci|reperfüzyon|hipotermi|sıvı|operasyon/.test(n)) return 'Tedaviyi başlat';
  if (/izle|takip|kontrol|komplikasyon|yanıt|daralt|değiştir/.test(n)) return 'Yanıtı izle';
  if (/bildirim|güvenlik|adli|koruyucu|dokümante|kayıt/.test(n)) return 'Güvenlik ve kayıt';
  return BRANCH_FALLBACKS[c.branchId] ? 'Mekanistik yaklaşım' : 'Yaklaşım';
}

function buildManagement(c, feedback) {
  let raw = [];
  if (Array.isArray(feedback.managementSteps) && feedback.managementSteps.length) raw = feedback.managementSteps;
  else if (Array.isArray(feedback.management) && feedback.management.length) raw = feedback.management;
  else if (c.diagnosis?.nextStep) raw = splitSentences(c.diagnosis.nextStep);

  if (raw.length < 2) {
    raw.push(...(BRANCH_FALLBACKS[c.branchId]?.steps || [
      ['Klinik olasılığı belirle', 'Öykü, muayene ve tetkik bulgularını aynı tanısal patern içinde değerlendir.'],
      ['Acil riski sınıfla', 'Hemodinamik instabilite, organ disfonksiyonu veya kırmızı bayrak varsa yönetimi hızlandır.'],
      ['Tanı/tedaviyi netleştir', 'En özgül doğrulama testini veya en güvenli ilk tedavi basamağını seç.'],
    ]));
  }

  return uniqueByText(raw)
    .map((step) => {
      let title = Array.isArray(step) ? step[0] : itemTitle(step);
      let text = Array.isArray(step) ? step[1] : stripBadMeta(itemText(step));
      if (!text || BAD_TEXT_RE.test(text)) return null;
      if (!title || /^yaklaşım$/iu.test(title)) title = inferManagementTitle(text, c);
      return { title: compact(title, 50, 1), text: sentence(compact(text, 170, 1)) };
    })
    .filter(Boolean)
    .slice(0, MAX_MANAGEMENT);
}

function buildWhyCorrect(c, feedback, evidence) {
  const correct = correctOf(c);
  const explicit = stripBadMeta(feedback.whyCorrect || c.diagnosis?.explanation || '');
  if (explicit && !GENERIC_EXPLANATION_RE.test(feedback.whyCorrect || '')) {
    const text = compact(explicit, 560, 3);
    return sentence(text);
  }
  const clues = mainClues(c, evidence, 3);
  if (clues.length >= 2) {
    return sentence(`Olguda ${trimPunctuation(clues[0])} ve ${trimPunctuation(clues[1])} birlikte ${correct} tanısını en iyi açıklar. ${clues[2] ? `${trimPunctuation(clues[2])} bu kararı güçlendirir. ` : ''}Bu nedenle doğru seçenek ${correct} olarak seçilmelidir`);
  }
  return sentence(`${observedPattern(c, evidence)} ${correct} lehine en tutarlı paterni oluşturur`);
}

function buildGenericWrongExplanation(c, option, correct, evidence, explicit = '') {
  let clean = stripBadMeta(explicit);
  const pattern = observedPattern(c, evidence);
  const expected = getOptionExpected(option);
  if (clean && !GENERIC_EXPLANATION_RE.test(explicit)) {
    if (!/ancak|fakat|bu olguda|bu vakada|oysa/iu.test(clean)) {
      clean = `${trimPunctuation(clean)}. Bu olguda ${pattern} ${correct} lehine daha güçlüdür`;
    }
    return sentence(compact(clean, 300, 2));
  }
  if (expected) {
    return sentence(`${expected} Bu olguda ise ${pattern} ${correct} lehine daha açıklayıcıdır`);
  }
  return sentence(`${option} için beklenen özgül öykü, muayene veya tetkik paterni bu olguda baskın değildir. Olguda ${pattern} ${correct} lehine daha tutarlı bir bütün oluşturur`);
}

function comparisonPointsFor(c, option, correct, evidence, explicitPoints = []) {
  const points = (explicitPoints || [])
    .map(itemText)
    .map(stripBadMeta)
    .filter((x) => x && !GENERIC_POINT_RE.test(x) && !GENERIC_EXPLANATION_RE.test(x));
  const expected = getOptionExpected(option);
  if (expected) points.unshift(`Beklenen patern: ${expected}`);
  if (evidence[0]) points.push(`Bu olgudaki ayırt ettirici nokta: ${trimPunctuation(evidence[0].text)}.`);
  if (evidence[1]) points.push(`${correct} lehine ek destek: ${trimPunctuation(evidence[1].text)}.`);
  return uniqueByText(points).slice(0, 2).map((x) => sentence(compact(x, 150, 1)));
}

function getWrongSourceMaps(c, feedback) {
  const maps = [feedback.whyWrong, feedback.differentialComparison, feedback.differentials, feedback.differentialExplanations, c.diagnosis?.differentials]
    .filter((x) => x && typeof x === 'object' && !Array.isArray(x));
  return maps.reduce((acc, map) => {
    Object.entries(map).forEach(([key, value]) => {
      if (!key || acc[key]) return;
      acc[key] = typeof value === 'string'
        ? { explanation: value, comparisonPoints: [] }
        : { explanation: value?.explanation || value?.summary || '', comparisonPoints: value?.comparisonPoints || value?.points || [] };
    });
    return acc;
  }, {});
}

function buildOptionFeedback(c, feedback, evidence, whyCorrect) {
  const correct = correctOf(c);
  const options = Array.isArray(c.diagnosis?.options) ? c.diagnosis.options : [];
  const map = getWrongSourceMaps(c, feedback);
  const whyWrong = {};
  const differentialComparison = {};
  options.forEach((option) => {
    if (option === correct) return;
    const source = map[option] || {};
    const explanation = buildGenericWrongExplanation(c, option, correct, evidence, source.explanation || '');
    whyWrong[option] = explanation;
    differentialComparison[option] = {
      explanation,
      comparisonPoints: comparisonPointsFor(c, option, correct, evidence, source.comparisonPoints || []),
    };
  });
  return { whyWrong, differentialComparison };
}

function isPulmonaryEmbolismCase(c) {
  return /pulmoner embol|pulmoner tromboemboli|akut pulmoner emboli/i.test(correctOf(c));
}

function patchPulmonaryEmbolism(c) {
  const kalca = /kalça protezi|ameliyatından 7 gün/i.test(`${c.stem} ${c.title}`);
  const evidenceChain = kalca ? [
    { title: 'Postoperatif VTE riski', text: 'Kalça protezi ameliyatı ve immobilizasyon venöz tromboemboli riskini artırır.' },
    { title: 'Akut solunum paterni', text: 'Ani dispne, taşikardi ve plöritik göğüs ağrısı pulmoner emboli için tipiktir.' },
    { title: 'D-dimer yüksekliği', text: 'D-dimer yüksekliği tromboemboli olasılığını destekler; ancak tek başına tanı koydurmaz.' },
    { title: 'BT pulmoner anjiyografi', text: 'Pulmoner arter dalında dolum defekti, pulmoner tromboemboli için karar verdirici görüntüleme bulgusudur.' },
  ] : [
    { title: 'VTE risk faktörü', text: 'Uzun uçuş, oral kontraseptif kullanımı veya immobilizasyon venöz tromboemboli riskini artırır.' },
    { title: 'Akut solunum paterni', text: 'Ani dispne, taşikardi ve plöritik göğüs ağrısı pulmoner emboli için tipiktir.' },
    { title: 'D-dimer yüksekliği', text: 'D-dimer yüksekliği tromboemboli olasılığını destekler; ancak klinik olasılık ile birlikte yorumlanır.' },
    { title: 'BT pulmoner anjiyografi', text: 'Segmental pulmoner arter dalında kontrast dolum defekti pulmoner emboliyi doğrulayan temel bulgudur.' },
  ];
  const correct = correctOf(c);
  const whyCorrect = kalca
    ? 'Kalça protezi sonrası erken dönemde gelişen ani dispne, taşikardi ve plöritik göğüs ağrısı venöz tromboemboli/pulmoner emboli açısından tipiktir. D-dimer yüksekliği olasılığı destekler; BT pulmoner anjiyografide pulmoner arter dalında dolum defekti bulunması tanıyı güçlü biçimde doğrular.'
    : 'Venöz tromboemboli risk faktörleriyle birlikte ani dispne, taşikardi ve plöritik göğüs ağrısı pulmoner emboli paternini oluşturur. D-dimer yüksekliği destekleyici olsa da tanısal doğrulama BT pulmoner anjiyografide segmental pulmoner arter dolum defekti ile sağlanır.';
  const pearls = [
    { label: 'TUS paterni', text: 'Ortopedik cerrahi/immobilizasyon veya VTE riski sonrası ani dispne, taşikardi ve plöritik ağrı pulmoner emboli düşündürür.' },
    { label: 'Tanısal test', text: 'Hemodinamik stabil hastada BT pulmoner anjiyografi tanısal doğrulamada öne çıkar.' },
    { label: 'D-dimer tuzağı', text: 'D-dimer spesifik değildir; düşük-orta klinik olasılıkta dışlama stratejisinde değerlidir.' },
    { label: 'Tedavi notu', text: 'Kontrendikasyon yoksa antikoagülasyon başlanır; hemodinamik instabil PE’de tromboliz değerlendirilir.' },
  ];
  const managementSteps = [
    { title: 'Klinik olasılığı belirle', text: 'VTE risk faktörü, ani dispne, taşikardi ve plöritik ağrıyı birlikte değerlendir.' },
    { title: 'Stabiliteyi sınıfla', text: 'Hipotansiyon, senkop veya sağ kalp yüklenmesi varsa yüksek riskli PE düşün.' },
    { title: 'Tanıyı doğrula', text: 'Stabil hastada BT pulmoner anjiyografi ile pulmoner arter dolum defektini göster.' },
    { title: 'Tedaviyi başlat', text: 'Kanama kontrendikasyonu yoksa antikoagülasyon ver; instabil hastada tromboliz seçeneğini değerlendir.' },
  ];
  const custom = {
    'Spontan pnömotoraks': 'Akut dispne ve plöritik ağrı yapabilir; ancak tek taraflı solunum sesi azalması ve akciğer grafisinde plevral çizgi beklenir. Postoperatif VTE riski ve BT anjiyoda dolum defekti pulmoner emboli lehinedir.',
    'Primer spontan pnömotoraks': 'Akut dispne ve plöritik ağrı yapabilir; ancak tek taraflı solunum sesi azalması ve akciğer grafisinde plevral çizgi beklenir. VTE riski ve BT anjiyoda dolum defekti pulmoner emboli lehinedir.',
    'Akut radyasyon sendromu': 'Akut radyasyon sendromu için anlamlı iyonizan radyasyon maruziyeti, prodromal GİS bulguları ve hematopoetik baskılanma beklenir. Bu olguda ana patern VTE/PE’dir.',
    'Astım atağı': 'Wheezing ve bronkospazm ön plandadır; postoperatif VTE riski ve pulmoner arter dolum defekti astımı açıklamaz.',
    'Pnömoni': 'Ateş, balgam, öksürük ve parankimal infiltrasyon beklenir. Ani başlangıç, VTE riski ve pulmoner arter dolum defekti pnömoniden çok pulmoner emboli lehinedir.',
    'Akut koroner sendrom': 'İskemik göğüs ağrısı, EKG/troponin dinamiği ve koroner patern beklenir. Plöritik ağrı, VTE riski ve BT pulmoner anjiyografide dolum defekti PE lehinedir.',
    'Panik atak': 'Panik atak dispne ve çarpıntı yapabilir; ancak D-dimer yüksekliği ve pulmoner arter dolum defekti gibi objektif tromboemboli bulgularını açıklamaz.',
  };
  const whyWrong = {};
  const differentialComparison = {};
  (c.diagnosis?.options || []).forEach((option) => {
    if (option === correct) return;
    const explanation = sentence(custom[option] || buildGenericWrongExplanation(c, option, correct, evidenceChain));
    whyWrong[option] = explanation;
    differentialComparison[option] = {
      explanation,
      comparisonPoints: comparisonPointsFor(c, option, correct, evidenceChain, []),
    };
  });
  c.diagnosis.answerFeedback = {
    ...(c.diagnosis.answerFeedback || {}),
    diagnosisMeta: 'Pulmoner emboli · venöz tromboemboli · BT pulmoner anjiyografi · antikoagülasyon',
    whyCorrect,
    evidenceChain,
    pearls,
    clinicalPearls: pearls,
    management: managementSteps,
    managementSteps,
    whyWrong,
    differentials: differentialComparison,
    differentialComparison,
    learningOutcome: 'Pulmoner embolide karar; VTE riski, akut dispne/plöritik ağrı, D-dimer ve BT pulmoner anjiyografi bulgularının birlikte yorumlanmasıyla verilir.',
    feedbackStandardVersion: 'pro-answer-feedback-v4',
  };
}

function patchAcuteRadiationSyndrome(c) {
  const correct = correctOf(c);
  if (!/akut radyasyon sendromu/i.test(correct)) return false;
  const evidenceChain = [
    { title: 'Yüksek doz maruziyet', text: 'Kısa sürede anlamlı iyonizan radyasyon maruziyeti akut radyasyon sendromunun temel risk bağlamıdır.' },
    { title: 'GİS prodromu', text: 'Bulantı, kusma ve ishal gibi erken prodromal bulgular yüksek doz maruziyet sonrası beklenir.' },
    { title: 'Latent dönem', text: 'Prodrom sonrası geçici iyilik dönemi akut radyasyon sendromu zamanlamasıyla uyumludur.' },
    { title: 'Hematopoetik baskılanma', text: 'Lökopeni, trombositopeni veya kemik iliği baskılanması tanıyı güçlendiren sistemik bulgudur.' },
  ];
  const whyCorrect = 'Kısa sürede yüksek doz iyonizan radyasyon maruziyeti sonrası gelişen GİS prodromu, geçici iyilik dönemi ve kemik iliği baskılanması akut radyasyon sendromu için tipiktir. Bu zamanlama gıda zehirlenmesi veya termal yanık gibi lokal/akut tablolarla açıklanamaz.';
  const pearls = [
    { label: 'TUS paterni', text: 'Radyasyon maruziyeti sonrası prodromal GİS bulguları, latent dönem ve hematopoetik baskılanma akut radyasyon sendromunu düşündürür.' },
    { label: 'Sistem bulgusu', text: 'Kemik iliği baskılanması ARS’de doz ve prognoz açısından kritik ipucudur.' },
    { label: 'Çeldirici ayrımı', text: 'Gıda zehirlenmesi GİS bulgusu yapabilir; ancak radyasyon maruziyeti ve sitopeni paternini açıklamaz.' },
  ];
  const managementSteps = [
    { title: 'Maruziyeti kes', text: 'Hastayı radyasyon kaynağından uzaklaştır ve kontaminasyon dekontaminasyonu açısından değerlendir.' },
    { title: 'Stabiliteyi değerlendir', text: 'Sıvı-elektrolit kaybı, enfeksiyon riski ve hematolojik baskılanmayı izle.' },
    { title: 'Destek tedavisi ver', text: 'Antiemetik, sıvı desteği, enfeksiyon profilaksisi/tedavisi ve hematolojik destek gereksinimini planla.' },
  ];
  const custom = {
    'Kronik radyasyon sendromu': 'Kronik radyasyon sendromu daha düşük dozun uzun süreli/tekrarlayan maruziyetiyle gelişir. Bu olgudaki kısa süreli yüksek doz maruziyet ve akut GİS-hematolojik patern ARS lehinedir.',
    'Gıda zehirlenmesi': 'Gıda zehirlenmesi bulantı, kusma ve ishale yol açabilir; ancak iyonizan radyasyon maruziyeti, latent dönem ve kemik iliği baskılanmasını açıklamaz.',
    'Termal yanık': 'Termal yanıkta ısıya bağlı cilt hasarı ve yanık yüzey alanı ön plandadır. Bu olgudaki sistemik GİS prodromu ve hematopoetik baskılanma radyasyon etkisini destekler.',
  };
  const whyWrong = {};
  const differentialComparison = {};
  (c.diagnosis?.options || []).forEach((option) => {
    if (option === correct) return;
    const explanation = sentence(custom[option] || buildGenericWrongExplanation(c, option, correct, evidenceChain));
    whyWrong[option] = explanation;
    differentialComparison[option] = { explanation, comparisonPoints: comparisonPointsFor(c, option, correct, evidenceChain, []) };
  });
  c.diagnosis.answerFeedback = {
    ...(c.diagnosis.answerFeedback || {}),
    diagnosisMeta: 'Akut radyasyon sendromu · GİS prodromu · latent dönem · kemik iliği baskılanması',
    whyCorrect,
    evidenceChain,
    pearls,
    clinicalPearls: pearls,
    management: managementSteps,
    managementSteps,
    whyWrong,
    differentials: differentialComparison,
    differentialComparison,
    learningOutcome: 'ARS’de zamanlama, radyasyon dozu/maruziyeti ve hematopoetik baskılanma tanısal ayrımı belirler.',
    feedbackStandardVersion: 'pro-answer-feedback-v4',
  };
  return true;
}

function countCaseProblems(c) {
  const f = getFeedback(c);
  const texts = JSON.stringify(f || {});
  const evidence = Array.isArray(f.evidenceChain) ? f.evidenceChain : [];
  return {
    badEvidenceTitleItems: evidence.filter((x) => BAD_TITLE_RE.test(itemTitle(x))).length,
    badEvidenceTextItems: evidence.filter((x) => BAD_TEXT_RE.test(itemText(x))).length,
    genericComparisonHits: (texts.match(/belirli klinik koşullarda|yakın bir çeldirici|karar verdirici patern|Kanıt zinciri .* tanısını|Ana ipucu:|Kanıt [0-9]/giu) || []).length,
    genericLabTitleItems: evidence.filter((x) => /^Laboratuvar paterni$/iu.test(itemTitle(x)) && !isLabText(itemText(x))).length,
  };
}

const before = cases.map(countCaseProblems);
const report = {
  generatedAt: new Date().toISOString(),
  totalCases: cases.length,
  casesReviewed: cases.length,
  evidenceTitleFixedCases: before.filter((x) => x.badEvidenceTitleItems || x.genericLabTitleItems).length,
  evidenceTitleFixedItems: before.reduce((sum, x) => sum + x.badEvidenceTitleItems + x.genericLabTitleItems, 0),
  contextlessEvidenceFixedItems: before.reduce((sum, x) => sum + x.badEvidenceTextItems, 0),
  optionComparisonRewrittenCases: 0,
  examPearlsRewrittenCases: 0,
  pulmonaryEmbolismPatchedIds: [],
  acuteRadiationSyndromePatchedIds: [],
  branchCounts: {},
  changedFiles: [
    'src/data/cases.js',
    'src/components/AnswerFeedbackPanel.jsx',
    'src/index.css',
    'scripts/rework-answer-feedback-all-cases.mjs',
    'ANSWER_FEEDBACK_PRO_REWORK_REPORT.json',
    'ANSWER_FEEDBACK_PRO_REWORK_SUMMARY.md',
  ],
};

for (const c of cases) {
  report.branchCounts[c.branchId] = (report.branchCounts[c.branchId] || 0) + 1;
  c.diagnosis = c.diagnosis || {};
  c.diagnosis.answerFeedback = c.diagnosis.answerFeedback || {};

  if (patchAcuteRadiationSyndrome(c)) {
    report.acuteRadiationSyndromePatchedIds.push(c.id);
    report.optionComparisonRewrittenCases += 1;
    report.examPearlsRewrittenCases += 1;
    continue;
  }

  if (isPulmonaryEmbolismCase(c)) {
    patchPulmonaryEmbolism(c);
    report.pulmonaryEmbolismPatchedIds.push(c.id);
    report.optionComparisonRewrittenCases += 1;
    report.examPearlsRewrittenCases += 1;
    continue;
  }

  const feedback = getFeedback(c);
  const evidenceChain = buildEvidence(c, feedback);
  const whyCorrect = buildWhyCorrect(c, feedback, evidenceChain);
  const pearls = buildPearls(c, feedback, evidenceChain);
  const managementSteps = buildManagement(c, feedback);
  const optionFeedback = buildOptionFeedback(c, feedback, evidenceChain, whyCorrect);
  const oldText = JSON.stringify(feedback || {});

  c.diagnosis.answerFeedback = {
    ...feedback,
    diagnosisMeta: stripBadMeta(feedback.diagnosisMeta || c.clinicalFocus || c.setting || c.title),
    whyCorrect,
    evidenceChain,
    pearls,
    clinicalPearls: pearls,
    management: managementSteps,
    managementSteps,
    whyWrong: optionFeedback.whyWrong,
    differentials: optionFeedback.differentialComparison,
    differentialComparison: optionFeedback.differentialComparison,
    learningOutcome: stripBadMeta(feedback.learningOutcome || c.learningOutcome || c.clinicalFocus || c.title),
    feedbackStandardVersion: 'pro-answer-feedback-v4',
  };

  const newText = JSON.stringify(c.diagnosis.answerFeedback);
  if (oldText !== newText) {
    report.optionComparisonRewrittenCases += 1;
    report.examPearlsRewrittenCases += 1;
  }
}

const after = cases.map(countCaseProblems);
report.afterValidation = {
  badEvidenceTitleItems: after.reduce((sum, x) => sum + x.badEvidenceTitleItems, 0),
  contextlessEvidenceItems: after.reduce((sum, x) => sum + x.badEvidenceTextItems, 0),
  genericComparisonHits: after.reduce((sum, x) => sum + x.genericComparisonHits, 0),
  genericLabTitleItems: after.reduce((sum, x) => sum + x.genericLabTitleItems, 0),
};

const content = `export const cases = ${JSON.stringify(cases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync(targetFile, content, 'utf8');
fs.writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

const summary = [
  '# KlinikIQ Answer Feedback Professional Rework',
  '',
  `- İncelenen vaka sayısı: ${report.casesReviewed}`,
  `- Kanıt başlığı düzeltilen vaka sayısı: ${report.evidenceTitleFixedCases}`,
  `- Düzeltilen yapay/yanlış kanıt başlığı adedi: ${report.evidenceTitleFixedItems}`,
  `- Bağlamsız tek kelimelik kanıt adedi: ${report.contextlessEvidenceFixedItems}`,
  `- Seçenek karşılaştırması yeniden yazılan vaka sayısı: ${report.optionComparisonRewrittenCases}`,
  `- Sınav notu / kritik ipuçları yeniden düzenlenen vaka sayısı: ${report.examPearlsRewrittenCases}`,
  `- Pulmoner emboli özel düzeltmeleri: ${report.pulmonaryEmbolismPatchedIds.join(', ') || 'yok'}`,
  `- Akut radyasyon sendromu özel düzeltmeleri: ${report.acuteRadiationSyndromePatchedIds.join(', ') || 'yok'}`,
  '',
  '## Uygulanan standart',
  '',
  '- Kanıt Zinciri maddeleri “Kanıt 2 / Kanıt 3” yerine klinik anlamlı başlık + kısa açıklama yapısına çevrildi.',
  '- “Yüksek.” gibi tek kelimelik kanıtlar kaldırıldı veya bağlamlı laboratuvar/tetkik yorumuna dönüştürüldü.',
  '- Seçenek karşılaştırması her şık için beklenen patern ve olguda neden elendiğini anlatacak şekilde yeniden üretildi.',
  '- Sınav notu alanları TUS paterni, tanısal test, sık tuzak, tedavi notu gibi daha öğretici etiketlerle düzenlendi.',
  '- Pulmoner tromboemboli vakalarında VTE riski, ani dispne, plöritik ağrı, D-dimer, BT pulmoner anjiyografi, antikoagülasyon ve tromboliz vurgusu eklendi.',
  '',
  '## Son kontrol',
  '',
  `- Kalan yapay kanıt başlığı: ${report.afterValidation.badEvidenceTitleItems}`,
  `- Kalan bağlamsız tek kelimelik kanıt: ${report.afterValidation.contextlessEvidenceItems}`,
  `- Kalan yanlış Laboratuvar paterni etiketi: ${report.afterValidation.genericLabTitleItems}`,
  `- Kalan jenerik karşılaştırma hit’i: ${report.afterValidation.genericComparisonHits}`,
  '',
];
fs.writeFileSync(summaryFile, `${summary.join('\n')}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
