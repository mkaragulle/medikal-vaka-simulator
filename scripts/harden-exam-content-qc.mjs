import { writeFileSync } from 'node:fs';
import { cases } from '../src/data/cases.js';

const report = {
  reviewedCases: cases.length,
  leakageFixedCases: new Set(),
  questionChangedCases: new Set(),
  optionsHardenedCases: new Set(),
  investigationSanitizedCases: new Set(),
  patientTextSanitizedCases: new Set(),
  changedFiles: ['src/data/cases.js', 'src/components/DiagnosisQuiz.jsx'],
  targetedUpdates: [],
};

function trLower(value = '') {
  return String(value).toLocaleLowerCase('tr');
}

function escapeRegExp(value = '') {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cleanSpaces(value = '') {
  return String(value).replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
}

function sentence(value = '') {
  const text = cleanSpaces(value);
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function getInvText(c) {
  return JSON.stringify(c.investigations || []);
}

function touch(setName, c) {
  report[setName].add(c.id);
  report.leakageFixedCases.add(c.id);
}

function sanitizeRow(row, c) {
  if (!Array.isArray(row)) return row;
  const next = row.map((cell) => (typeof cell === 'string' ? sanitizeInvestigationText(cell, c, false) : cell));
  if (typeof next[2] === 'string' && /Beklenen normal patern/i.test(next[2])) next[2] = 'Normalde beklenmeyen patern';
  if (typeof next[3] === 'string' && /Tanıyı destekler/i.test(next[3])) next[3] = 'Klinik olarak anlamlı';
  if (typeof next[3] === 'string' && /Lehine|Uyumlu/i.test(next[3])) next[3] = 'Yorum gerektirir';
  return next;
}

function sanitizeInvestigationText(value, c, replaceCorrect = true) {
  if (typeof value !== 'string' || !value.trim()) return value;
  let text = value;
  const original = text;

  text = text
    .replace(/\bTanıyı destekler\b/giu, 'Klinik olarak anlamlı')
    .replace(/\bTanıyı doğrudan destekler\b/giu, 'Karar verdirici objektif veri sağlar')
    .replace(/\btanıyı doğrudan destekler\b/giu, 'karar verdirici objektif veri sağlar')
    .replace(/\btanıyı destekler\b/giu, 'klinik paternle birlikte yorumlanır')
    .replace(/\btanıyı doğrular\b/giu, 'objektif doğrulama verisi sağlar')
    .replace(/\btanısını doğrular\b/giu, 'objektif doğrulama verisi sağlar')
    .replace(/\bdoğrulanır\b/giu, 'objektif olarak gösterilir')
    .replace(/\btanısal üçlüyü tamamlar\b/giu, 'ketozis ve asidoz paternini birlikte gösterir')
    .replace(/;\s*[^.;]*(?:doğru cevap|doğru yanıt)[^.;]*/giu, '')
    .replace(/;\s*[^.;]*(?:tanı|tanısal|tanısını|tanıyı)[^.;]*(?:destekler|doğrular|koydurur|gösterir)[^.;]*/giu, '')
    .replace(/;\s*[^.;]*(?:ile uyumludur|lehinedir|lehine patern|destekler|düşündürür)[^.;]*/giu, '')
    .replace(/\.\s*Bulgular\s+[^.]*?(?:ile uyumludur|lehinedir|destekler)\./giu, '.')
    .replace(/\s*;\s*$/u, '')
    .replace(/\s+\./gu, '.');

  if (replaceCorrect) {
    const correct = c.diagnosis?.correct || '';
    const isTestName = /testi|düzeyi|antikoru|IgM|IgG|Coombs|triptaz|akım sitometri|Kleihauer|PMN|görüntüleme|MRCP/i.test(correct);
    if (correct && !isTestName && correct.length >= 7) {
      const re = new RegExp(escapeRegExp(correct), 'giu');
      text = text.replace(re, 'bu klinik patern');
    }
  }

  text = cleanSpaces(text);
  return text || original;
}

function sanitizePatientText(value, c) {
  if (typeof value !== 'string') return value;
  let text = value;
  const original = text;
  const correct = c.diagnosis?.correct || '';

  text = text
    .replace(/\s*doğru seçeneği belirleyen temel ipucudur;\s*[^.]*\.?/giu, ' klinik muhakemede ayırt ettirici ipucu oluşturur.')
    .replace(/\s*doğru seçeneği belirleyen temel ipucudur/giu, ' klinik muhakemede ayırt ettirici ipucu oluşturur')
    .replace(/;\s*(?:tanı|tedavi|ilk yaklaşım|marker|test)[^.;]*$/giu, '')
    .replace(/\bdoğru cevap\b/giu, 'karar verdirici yorum')
    .replace(/\bdoğru yanıt\b/giu, 'karar verdirici yorum');

  if (correct && correct.length >= 6) {
    const isVeryGeneric = /ateş|hipotermi|yansıtma|tiamin|terbinafin|hidrokortizon|verapamil/i.test(correct);
    if (!isVeryGeneric) {
      text = text.replace(new RegExp(escapeRegExp(correct), 'giu'), 'ilgili klinik tablo');
    }
  }
  text = cleanSpaces(text);
  return text || original;
}

function sanitizeInvestigations(c) {
  const before = getInvText(c);
  for (const inv of c.investigations || []) {
    if (typeof inv.summary === 'string') inv.summary = sanitizeInvestigationText(inv.summary, c);
    if (Array.isArray(inv.findings)) inv.findings = inv.findings.map((item) => sanitizeInvestigationText(item, c)).filter(Boolean);
    if (Array.isArray(inv.rows)) inv.rows = inv.rows.map((row) => sanitizeRow(row, c));
  }
  const after = getInvText(c);
  if (before !== after) touch('investigationSanitizedCases', c);
}

function sanitizePatientIntro(c) {
  const before = JSON.stringify(c.patientIntro || {});
  if (c.patientIntro) {
    for (const key of ['profile', 'presentation', 'historySummary', 'priorityFocus']) {
      if (typeof c.patientIntro[key] === 'string') c.patientIntro[key] = sanitizePatientText(c.patientIntro[key], c);
    }
    for (const key of ['riskContext', 'distinctiveClues']) {
      if (Array.isArray(c.patientIntro[key])) c.patientIntro[key] = c.patientIntro[key].map((item) => sanitizePatientText(item, c)).filter(Boolean);
    }
  }
  const after = JSON.stringify(c.patientIntro || {});
  if (before !== after) touch('patientTextSanitizedCases', c);
}

function buildWhyWrong(options, correct, mapping = {}) {
  const wrong = {};
  for (const opt of options) {
    if (opt === correct) continue;
    wrong[opt] = mapping[opt] || `${opt} ayırıcı seçenek olarak düşünülebilir; ancak olgudaki karar verdirici öykü, muayene ve objektif tetkik paterni bu seçenekten çok ${correct} lehine yorumlanır.`;
  }
  return wrong;
}

function applyQuestionSpec(c, spec) {
  const beforeQ = c.diagnosis?.question || c.question || '';
  const beforeOptions = JSON.stringify(c.diagnosis?.options || []);
  c.question = spec.question;
  c.questionType = spec.questionType || c.questionType || 'decision';
  c.clinicalFocus = spec.focus || 'Klinik ipuçlarını objektif veriyle birlikte yorumlama ve en uygun sınav kararını verme';
  c.learningOutcome = spec.learningOutcome || c.learningOutcome;
  if (c.patientIntro?.priorityFocus) c.patientIntro.priorityFocus = spec.safePriorityFocus || 'Öykü, fizik muayene ve objektif tetkik verileri birlikte yorumlandığında doğru klinik karar verilir.';
  if (!c.diagnosis) c.diagnosis = {};
  c.diagnosis.question = spec.question;
  c.diagnosis.correct = spec.correct;
  c.diagnosis.options = spec.options;
  c.diagnosis.explanation = spec.explanation;
  c.diagnosis.pearls = spec.pearls || c.diagnosis.pearls || [];
  c.diagnosis.nextStep = spec.nextStep || c.diagnosis.nextStep;
  c.diagnosis.answerFeedback = {
    ...(c.diagnosis.answerFeedback || {}),
    correctDiagnosis: spec.correct,
    diagnosisMeta: spec.meta || spec.focus || c.clinicalFocus,
    shortDiagnosisMeta: spec.shortMeta || c.spotCategory || c.relatedBranch || c.branchId,
    whyCorrect: spec.explanation,
    whyWrong: buildWhyWrong(spec.options, spec.correct, spec.whyWrong || {}),
    evidenceChain: spec.evidence || c.diagnosis.answerFeedback?.evidenceChain || [],
    pearls: spec.pearls || c.diagnosis.pearls || [],
    clinicalPearls: spec.pearls || c.diagnosis.pearls || [],
    learningOutcome: spec.learningOutcome || c.learningOutcome || spec.explanation,
    management: spec.management || c.diagnosis.answerFeedback?.management || [],
    managementSteps: spec.management || c.diagnosis.answerFeedback?.managementSteps || [],
    differentialComparison: Object.fromEntries(spec.options.filter((o) => o !== spec.correct).map((opt) => [opt, {
      explanation: (spec.whyWrong || {})[opt] || `${opt} olguda daha zayıf kalır; karar verdirici veri ${spec.correct} lehinedir.`,
      comparisonPoints: [
        `Ayırt ettirici nokta: ${spec.evidence?.[0] || 'öykü ve objektif tetkik paterninin birlikte yorumlanması'}`,
        `Çeldirici tuzak: ${opt} benzer bir bağlamda düşünülebilir ancak bu olgudaki paternle tam örtüşmez.`,
      ],
    }]))
  };
  if (beforeQ !== spec.question) touch('questionChangedCases', c);
  if (beforeOptions !== JSON.stringify(spec.options)) touch('optionsHardenedCases', c);
  report.targetedUpdates.push({ id: c.id, title: c.title, change: spec.change });
}

const specs = {
  'tus-spot-pdf-acute-hav-igm-001': {
    change: 'Tetkik seçimi sorusu, serolojik patern yorumlama sorusuna çevrildi; alakasız hematoloji şıkları hepatit ayırıcılarıyla değiştirildi.',
    questionType: 'diagnosis',
    question: 'Bu serolojik paternin en doğru yorumu hangisidir?',
    correct: 'Akut hepatit A enfeksiyonu',
    options: ['Akut hepatit A enfeksiyonu', 'Geçirilmiş hepatit A bağışıklığı', 'Akut hepatit B enfeksiyonu', 'Akut hepatit C enfeksiyonu'],
    focus: 'Akut hepatit serolojisinde IgM paternini yorumlama',
    safePriorityFocus: 'Kamp sonrası gelişen sarılıkta hepatit serolojisi paneli tanıdan çok patern yorumlaması gerektirir.',
    explanation: 'Akut hepatit kliniğinde Anti-HAV IgM pozitifliği ve HBV/HCV göstergelerinin negatif olması en güçlü biçimde akut hepatit A enfeksiyonunu destekler; yalnız Anti-HAV IgG geçirilmiş enfeksiyon veya bağışıklığı düşündürürdü.',
    evidence: ['Kamp sonrası halsizlik, kusma, koyu idrar ve ikter akut hepatit bağlamı oluşturur.', 'Anti-HAV IgM pozitifliği yakın dönem HAV enfeksiyonunu düşündürür.', 'HBsAg, anti-HBc IgM ve anti-HCV negatifliği yakın HBV/HCV olasılığını zayıflatır.'],
    pearls: ['Anti-HAV IgM akut veya yakın dönem HAV enfeksiyonunu gösterir.', 'Anti-HAV IgG geçirilmiş enfeksiyon veya aşı bağışıklığıyla ilişkilidir.', 'Akut hepatit B için HBsAg ve anti-HBc IgM beklenir.'],
    whyWrong: {
      'Geçirilmiş hepatit A bağışıklığı': 'Geçirilmiş enfeksiyon/aşı bağışıklığında Anti-HAV IgG baskındır; IgM pozitifliği akut dönem lehinedir.',
      'Akut hepatit B enfeksiyonu': 'Akut HBV için HBsAg ve anti-HBc IgM pozitifliği beklenir; bu panelde HBV göstergeleri negatif verilmiştir.',
      'Akut hepatit C enfeksiyonu': 'Akut HCV değerlendirmesinde HCV RNA/anti-HCV paterni önemlidir; HAV IgM pozitifliği bu seçenekten daha spesifiktir.',
    },
  },
  'tus-spot-pdf-fetomaternal-hemorrhage-kleihauer-betke-001': {
    change: 'Doğrulayıcı test sorusu, neonatal anemi paternini yorumlama sorusuna çevrildi.',
    questionType: 'diagnosis',
    question: 'Bu neonatal anemi paterninin en doğru yorumu hangisidir?',
    correct: 'Fetomaternal hemorajiye bağlı akut fetal kan kaybı',
    options: ['Fetomaternal hemorajiye bağlı akut fetal kan kaybı', 'Rh alloimmünizasyonuna bağlı hemolitik hastalık', 'Konjenital aplastik anemi', 'Fizyolojik yenidoğan anemisi'],
    focus: 'Ağır neonatal anemide hemolizsiz kan kaybı paternini yorumlama',
    safePriorityFocus: 'Ağır neonatal anemide dış kanama ve hemoliz yokluğu kan kaybının kaynağını sistematik yorumlamayı gerektirir.',
    explanation: 'Doğumda ağır anemi, zayıf perfüzyon, direkt Coombs negatifliği ve hemoliz bulgusu olmaması; maternal dolaşımda fetal eritrosit gösterilmesiyle birlikte fetomaternal hemorajiye bağlı fetal kan kaybını destekler.',
    evidence: ['Term yenidoğanda doğumdan hemen sonra ağır anemi ve hipoperfüzyon vardır.', 'Direkt Coombs negatifliği alloimmün hemolizi zayıflatır.', 'Maternal kanda fetal eritrositlerin gösterilmesi fetustan anneye kan geçişi olduğunu gösterir.'],
    pearls: ['Fetomaternal hemorajide yenidoğanda ağır anemi olabilir, hemoliz bulguları belirgin olmayabilir.', 'Direkt Coombs negatifliği Rh/ABO hemolitik hastalığı geri plana iter.', 'Ağır neonatal anemide önce stabilizasyon, ardından kan kaybı/hemoliz ayrımı yapılır.'],
    whyWrong: {
      'Rh alloimmünizasyonuna bağlı hemolitik hastalık': 'Rh alloimmünizasyonunda Coombs pozitifliği ve hemoliz bulguları beklenir; bu olguda hemoliz kanıtı baskın değildir.',
      'Konjenital aplastik anemi': 'Aplastik tabloda kemik iliği üretim yetersizliği ve sıklıkla ek sitopeniler beklenir; ani doğum sonrası hipoperfüzyon-kan kaybı paterni daha güçlüdür.',
      'Fizyolojik yenidoğan anemisi': 'Fizyolojik anemi doğum anında Hb 6.2 g/dL düzeyinde şok bulguları oluşturacak kadar ağır ve akut değildir.',
    },
  },
  'tus-spot-pdf-anaphylaxis-tryptase-001': {
    change: 'Tetkik seçimi sorusu, triptaz sonucunun yorumlanmasına çevrildi.',
    questionType: 'diagnosis',
    question: 'Akut reaksiyon sonrası yüksek triptaz sonucunun en doğru yorumu hangisidir?',
    correct: 'Mast hücre aracılı sistemik aktivasyon',
    options: ['Mast hücre aracılı sistemik aktivasyon', 'İzole IgE sensitizasyonu', 'Kompleman aracılı herediter anjiyoödem', 'Miyokardiyal nekroz paterni'],
    focus: 'Anafilakside triptaz yüksekliğini yorumlama',
    explanation: 'Akut çoklu sistem alerjik reaksiyondan sonra serum triptazının yükselmesi mast hücre degranülasyonunu destekler; tek başına total IgE yüksekliği akut sistemik aktivasyonu aynı güçte göstermez.',
    evidence: ['Besin sonrası çoklu sistem alerjik reaksiyon gelişmiştir.', 'Akut dönemde alınan örnekte triptaz yüksek saptanmıştır.', 'Triptaz mast hücre degranülasyonuyla ilişkilidir.'],
    pearls: ['Triptaz akut anafilaksi/mast hücre aktivasyonunu destekler.', 'Normal triptaz anafilaksiyi tamamen dışlamaz.', 'Tedavide gecikmeden IM adrenalin önceliklidir.'],
  },
  'tus-spot-pdf-cirrhosis-ascites-sbp-paracentesis-001': {
    change: 'İnceleme seçimi sorusu, asit sıvısı bulgusuna göre yönetim sorusuna çevrildi.',
    questionType: 'treatment',
    question: 'Asit sıvısında PMN ≥250/mm³ saptanan bu hastada en uygun sonraki adım hangisidir?',
    correct: 'Ampirik üçüncü kuşak sefalosporin tedavisi başlamak',
    options: ['Ampirik üçüncü kuşak sefalosporin tedavisi başlamak', 'HCV RNA sonucunu bekleyip tedaviyi ertelemek', 'Öncelikle elektif üst GİS endoskopisi planlamak', 'Semptomsuz izlemle parasentezi tekrarlamamak'],
    focus: 'Sirotik asitte PMN eşiğini ve ilk tedaviyi yorumlama',
    explanation: 'Sirozlu asit hastasında karın hassasiyeti veya mental durum değişikliğiyle birlikte asit PMN sayısının ≥250/mm³ olması SBP paternini düşündürür ve kültür sonucu beklenmeden ampirik antibiyotik başlanmalıdır.',
    evidence: ['Siroz/asit zemininde dalgınlık ve karın hassasiyeti vardır.', 'Asit sıvısında PMN sayısı eşik değerin üzerindedir.', 'Bu durumda tedavi kültür sonucunu beklemeden başlatılır.'],
    pearls: ['Sirotik asitte PMN ≥250/mm³ SBP için kritik eşiktir.', 'SBP şüphesinde tanısal parasentez geciktirilmemelidir.', 'Ampirik tedavide sıklıkla üçüncü kuşak sefalosporin tercih edilir.'],
  },
  'tus-spot-pdf-prolactinoma-hook-effect-dilution-001': {
    change: 'İşlem seçimi sorusu, hook effect yorumlama sorusuna çevrildi.',
    questionType: 'diagnosis',
    question: 'Makroadenom boyutu ile başlangıç prolaktin sonucu arasındaki uyumsuzluğun en doğru açıklaması hangisidir?',
    correct: 'Hook effect nedeniyle yalancı düşük immünoassay sonucu',
    options: ['Hook effect nedeniyle yalancı düşük immünoassay sonucu', 'Primer hipotiroidiye bağlı gerçek hiperprolaktinemi', 'Dopamin agonistine bağlı tümör küçülmesi', 'Nonfonksiyonel adenomda fizyolojik prolaktin düzeyi'],
    focus: 'Makroadenomda hook effect nedeniyle yalancı düşük prolaktin sonucunu tanıma',
    explanation: 'Büyük hipofiz makroadenomunda beklenenden düşük prolaktin ölçümü, çok yüksek antijen düzeyinin immünoassay sinyalini bozduğu hook effect ile açıklanabilir; serum dilüsyonu sonrası belirgin yüksek ölçüm bu mekanizmayı destekler.',
    evidence: ['MR’da 2 cm hipofiz makroadenomu vardır.', 'Bazal prolaktin kitle boyutuna göre beklenenden düşük görünmüştür.', 'Dilüsyon sonrası prolaktin belirgin yüksek ölçülmüştür.'],
    pearls: ['Hook effect çok yüksek antijen düzeyinde yalancı düşük sonuç oluşturabilir.', 'Makroadenom-prolaktin uyumsuzluğunda serum dilüsyonu istenir.', 'TRH stimülasyon testi bu senaryoda ilk çözüm değildir.'],
  },
  'tus-spot-pdf-cll-flow-cytometry-001': {
    change: 'Tanı için inceleme sorusu, immünfenotip yorumlama sorusuna çevrildi.',
    questionType: 'diagnosis',
    question: 'CD5+ CD23+ klonal B hücre popülasyonu ile birlikte bu hematolojik patern en çok hangi tanıyı destekler?',
    correct: 'Kronik lenfositik lösemi',
    options: ['Kronik lenfositik lösemi', 'Mantle hücreli lenfoma', 'Reaktif viral lenfositoz', 'Kronik miyeloid lösemi'],
    focus: 'Lenfositozda CLL immünfenotipini yorumlama',
    explanation: 'Yaşlı hastada kalıcı lenfositoz, küçük olgun lenfositler ve CD5+ CD23+ klonal B hücre popülasyonu kronik lenfositik lösemi için tipik bir immünfenotip oluşturur.',
    evidence: ['Uzun süredir lenfadenopati ve mutlak lenfositoz vardır.', 'Periferik yaymada olgun küçük lenfositler izlenir.', 'Akım sitometride CD5+ CD23+ klonal B hücre popülasyonu saptanır.'],
    pearls: ['CLL tipik olarak CD5+ CD23+ klonal B hücreleriyle seyreder.', 'Mantle hücreli lenfoma genellikle cyclin D1/SOX11 ve t(11;14) ile ilişkilidir.', 'Reaktif lenfositozda klonal immünfenotip beklenmez.'],
  },
  'tus-spot-pdf-aiha-direct-coombs-001': {
    change: 'Tanı+test sorusu, Coombs pozitif hemoliz yorumlama sorusuna çevrildi.',
    questionType: 'diagnosis',
    question: 'Retikülositoz, LDH/indirekt bilirubin yüksekliği ve IgG/C3 pozitifliği en çok hangi tabloyu destekler?',
    correct: 'Sıcak tip otoimmün hemolitik anemi',
    options: ['Sıcak tip otoimmün hemolitik anemi', 'Megaloblastik anemi', 'Aplastik anemi', 'Paroksismal nokturnal hemoglobinüri'],
    focus: 'Coombs pozitif ekstravasküler hemoliz paternini yorumlama',
    explanation: 'Hemoliz laboratuvarı ile birlikte direkt antiglobulin testinde IgG/C3 pozitifliği, antikor aracılı hemolizi ve özellikle sıcak tip otoimmün hemolitik anemi paternini destekler.',
    evidence: ['Sarılık ve çarpıntıya hemoliz laboratuvarı eşlik eder.', 'Retikülositoz kemik iliği yanıtını gösterir.', 'Direkt antiglobulin testinde IgG/C3 pozitifliği vardır.'],
    pearls: ['Otoimmün hemolitik anemide direkt Coombs/DAT pozitifliği beklenir.', 'Megaloblastik anemide MCV yüksekliği ve B12/folat bağlamı öne çıkar.', 'Aplastik anemide retikülositoz değil pansitopeni ve üretim azlığı beklenir.'],
  },
  'tus-spot-pdf-sle-activity-dsdna-complement-001': {
    change: 'Aktivite belirteci sorusu, otoimmün panel yorumlama sorusuna çevrildi.',
    questionType: 'diagnosis',
    question: 'Anti-dsDNA yüksekliği ve C3/C4 düşüklüğü olan bu panelin en doğru yorumu hangisidir?',
    correct: 'Aktif SLE alevlenmesini destekleyen serolojik patern',
    options: ['Aktif SLE alevlenmesini destekleyen serolojik patern', 'İzole ANA pozitifliğiyle sınırlı tarama sonucu', 'Sınırlı kutanöz sistemik skleroz paterni', 'Romatoid artrit aktivitesini gösteren patern'],
    focus: 'SLE aktivitesinde anti-dsDNA ve kompleman tüketimini yorumlama',
    explanation: 'SLE bağlamında anti-dsDNA yüksekliği ve C3/C4 düşüklüğü immün kompleks aracılı aktiviteyi düşündürür; izole ANA tanısal taramada duyarlı olsa da aktivite takibinde aynı ayırt ediciliğe sahip değildir.',
    evidence: ['Fotosensitivite, malar döküntü ve eklem ağrısı SLE bağlamı oluşturur.', 'Anti-dsDNA yüksek bulunmuştur.', 'C3/C4 düşüklüğü kompleman tüketimini gösterir.'],
    pearls: ['SLE aktivite takibinde anti-dsDNA artışı ve kompleman düşüklüğü yüksek verimlidir.', 'ANA duyarlıdır fakat aktivite takibinde spesifik değildir.', 'Anti-centromere sınırlı kutanöz sistemik sklerozla ilişkilidir.'],
  },
  'tus-spot-pdf-membranous-nephropathy-anti-pla2r-001': {
    change: 'Belirteç seçimi sorusu, biyopsi-seroloji paterni yorumlama sorusuna çevrildi.',
    questionType: 'diagnosis',
    question: 'Nefrotik proteinüriyle birlikte bu biyopsi-seroloji paterni en çok hangi tanıyı destekler?',
    correct: 'Primer membranöz nefropati',
    options: ['Primer membranöz nefropati', 'Lupus nefriti', 'Minimal değişiklik hastalığı', 'Diyabetik nefropati'],
    focus: 'Nefrotik sendromda anti-PLA2R pozitifliğini ve membranöz paterni yorumlama',
    explanation: 'Erişkinde nefrotik düzeyde proteinüri, membranöz glomerüler patern ve serum anti-PLA2R pozitifliği primer membranöz nefropatiyi güçlü biçimde destekler.',
    evidence: ['Nefrotik düzeyde proteinüri vardır.', 'Biyopsi membranöz glomerüler patern gösterir.', 'Serum anti-PLA2R pozitifliği primer form lehine güçlü serolojik ipucudur.'],
    pearls: ['Anti-PLA2R primer membranöz nefropatiyle ilişkilidir.', 'Lupus nefritinde ANA/anti-dsDNA ve sistemik bulgular beklenir.', 'Minimal değişiklik hastalığında ışık mikroskopisi genellikle belirgin membranöz kalınlaşma göstermez.'],
  },
  'ortho-scaphoid-001': {
    change: 'MR sonucunun tanıyı doğrudan söylemesini önlemek için soru tanıdan ilk yaklaşım/yönetim kararına çevrildi.',
    questionType: 'treatment',
    question: 'Anatomik enfiye çukuru hassasiyeti olan ve ilk grafisi negatif olabilen bu hastada en uygun ilk yaklaşım hangisidir?',
    correct: 'Başparmak spika ateli ile immobilizasyon ve kontrol görüntüleme planlamak',
    options: ['Başparmak spika ateli ile immobilizasyon ve kontrol görüntüleme planlamak', 'Ağrı azaldığı için immobilizasyon yapmadan taburcu etmek', 'Akut enfeksiyon gibi geniş spektrumlu antibiyotik başlamak', 'Sadece el bileği egzersizi verip yük vermeyi serbest bırakmak'],
    focus: 'Okült karpal kırık şüphesinde ilk grafi negatifliğini yönetme',
    explanation: 'FOOSH travması sonrası anatomik enfiye çukuru hassasiyeti varsa ilk grafiler negatif olsa bile okült skafoid yaralanma dışlanamaz; avasküler nekroz riskini azaltmak için immobilizasyon ve kontrol grafi/MR planlanmalıdır.',
    evidence: ['Açık el üzerine düşme mekanizması vardır.', 'Anatomik enfiye çukuru hassasiyeti kritik klinik bulgudur.', 'İlk grafilerde kırık hattı seçilemeyebilir.'],
    pearls: ['Skafoid yaralanmada ilk grafi negatif olabilir.', 'Klinik şüphe yüksekse immobilizasyon yapılır.', 'Proksimal kutup kanlanması nedeniyle avasküler nekroz riski önemlidir.'],
  },
};

function updateInvestigationDetails(c) {
  if (c.id === 'tus-spot-pdf-acute-hav-igm-001') {
    c.investigations = [{
      id: 'acute-hepatitis-serology-panel',
      label: 'Akut hepatit serolojisi paneli',
      type: 'lab',
      priority: 'essential',
      summary: 'Anti-HAV IgM pozitif; HBsAg, anti-HBc IgM ve anti-HCV negatif saptanır.',
      findings: ['HAV IgM pozitifliği yakın dönem hepatit A maruziyetini düşündürür.', 'HBV ve HCV göstergeleri bu panelde negatif izlenir.'],
      rows: [
        ['Anti-HAV IgM', 'Pozitif', 'Negatif', 'Pozitif'],
        ['Anti-HAV IgG', 'Erken/pozitif olabilir', 'Negatif veya pozitif', 'Yorum gerektirir'],
        ['HBsAg', 'Negatif', 'Negatif', 'Negatif'],
        ['Anti-HBc IgM', 'Negatif', 'Negatif', 'Negatif'],
        ['Anti-HCV', 'Negatif', 'Negatif', 'Negatif'],
      ],
    }];
  }
  if (c.id === 'tus-spot-pdf-fetomaternal-hemorrhage-kleihauer-betke-001') {
    const kb = (c.investigations || []).find((item) => item.id === 'kleihauer-betke') || {};
    kb.label = 'Maternal kanda fetal eritrosit taraması';
    kb.summary = 'Maternal periferik yaymada HbF içeren fetal eritrositler gösterilir.';
    kb.findings = ['Anne dolaşımında fetal eritrosit varlığı objektif olarak gösterilir.'];
    kb.rows = [
      ['Maternal kanda fetal eritrosit', 'Pozitif', 'Negatif', 'Pozitif'],
      ['Yenidoğan direkt Coombs', 'Negatif', 'Negatif', 'Normal'],
      ['Periferik yayma', 'Belirgin hemoliz bulgusu yok', 'Hemoliz saptanmamalı', 'Beklenen'],
    ];
  }
  if (c.id === 'tus-spot-pdf-anaphylaxis-tryptase-001') {
    const inv = c.investigations?.[0];
    if (inv) {
      inv.label = 'Akut serum triptaz ölçümü';
      inv.summary = 'Akut reaksiyon sonrası alınan örnekte triptaz yüksek saptanır.';
      inv.findings = ['Mast hücre granül içeriğinin sistemik dolaşıma geçtiğini gösteren biyokimyasal patern.'];
      inv.rows = [['Serum triptaz', 'Yüksek', 'Bazal düzeyle karşılaştırılır', 'Yüksek']];
    }
  }
  if (c.id === 'tus-spot-pdf-cirrhosis-ascites-sbp-paracentesis-001') {
    const inv = c.investigations?.[0];
    if (inv) {
      inv.label = 'Tanısal parasentez ve asit sıvısı analizi';
      inv.summary = 'Asit sıvısında PMN 420/mm³ saptanır; kültür sonucu beklemededir.';
      inv.findings = ['PMN sayısı enfekte asit açısından kritik eşik değerin üzerindedir.', 'Kültür sonucu tedavi başlangıcını geciktirmemelidir.'];
      inv.rows = [['Asit PMN', '420/mm³', '<250/mm³', 'Yüksek'], ['Asit kültürü', 'Beklemede', 'Üreme yok', 'Beklemede']];
    }
  }
  if (c.id === 'tus-spot-pdf-prolactinoma-hook-effect-dilution-001') {
    const inv = c.investigations?.[0];
    if (inv) {
      inv.label = 'Hipofiz MR ve prolaktin ölçüm paterni';
      inv.summary = 'MR’da 2 cm hipofiz makroadenomu izlenir; bazal prolaktin beklenenden düşük, dilüsyon sonrası belirgin yüksek ölçülür.';
      inv.findings = ['Kitle boyutu ile bazal hormon düzeyi arasında uyumsuzluk vardır.', 'Dilüsyon sonrası ölçümde belirgin artış izlenir.'];
    }
  }
  if (c.id === 'tus-spot-pdf-cll-flow-cytometry-001') {
    const inv = c.investigations?.[0];
    if (inv) {
      inv.label = 'Hemogram, periferik yayma ve immünfenotip';
      inv.summary = 'Mutlak lenfositoz ve olgun küçük lenfositler izlenir; CD5+ CD23+ klonal B hücre popülasyonu saptanır.';
      inv.findings = ['Lenfosit artışı reaktif değil klonal B hücre popülasyonu ile ilişkilidir.'];
    }
  }
  if (c.id === 'tus-spot-pdf-aiha-direct-coombs-001') {
    const inv = c.investigations?.[0];
    if (inv) {
      inv.label = 'Hemoliz paneli ve direkt antiglobulin testi';
      inv.summary = 'Retikülositoz, LDH yüksekliği ve indirekt bilirubin artışı vardır; direkt antiglobulin testinde IgG/C3 pozitifliği saptanır.';
      inv.findings = ['Hemoliz laboratuvarı antikor aracılı eritrosit yıkımıyla birlikte değerlendirilir.'];
    }
  }
  if (c.id === 'tus-spot-pdf-sle-activity-dsdna-complement-001') {
    const inv = c.investigations?.[0];
    if (inv) {
      inv.label = 'Otoimmün aktivite paneli';
      inv.summary = 'Anti-dsDNA yüksek, C3 ve C4 düşük saptanır.';
      inv.findings = ['Otoantikor artışı ile kompleman tüketimi birlikte izlenir.'];
      inv.rows = [['Anti-dsDNA', 'Yüksek', 'Düşük/negatif', 'Yüksek'], ['C3', 'Düşük', 'Normal', 'Düşük'], ['C4', 'Düşük', 'Normal', 'Düşük']];
    }
  }
  if (c.id === 'tus-spot-pdf-membranous-nephropathy-anti-pla2r-001') {
    const inv = c.investigations?.[0];
    if (inv) {
      inv.label = 'Böbrek biyopsisi ve serum otoantikor paneli';
      inv.summary = 'Biyopside diffüz kapiller duvar kalınlaşması ve granüler immün birikim paterni; serum anti-PLA2R pozitifliği saptanır.';
      inv.findings = ['Nefrotik proteinüriyle birlikte glomerüler membranöz patern ve ilgili otoantikor pozitifliği izlenir.'];
    }
  }
  if (c.id === 'ortho-scaphoid-001') {
    for (const inv of c.investigations || []) {
      if (inv.id === 'wrist-mri') {
        inv.summary = 'Klinik şüphe yüksekse erken dönemde okült karpal kırık hattını ve kemik iliği ödemini göstermek için kullanılabilir.';
        inv.findings = ['İlk grafide seçilmeyen karpal kemik yaralanmasını gösterebilir.'];
      }
      if (inv.id === 'scaphoid-xray') {
        inv.summary = 'İlk grafilerde kırık hattı seçilemeyebilir; özel el bileği projeksiyonları ve kontrol grafileri gerekebilir.';
        inv.findings = ['Başlangıç grafisinin negatif olması klinik şüphe yüksekse yaralanmayı dışlamaz.'];
      }
    }
  }
  if (c.id === 'cardiovascular-coagulative-necrosis-mi-001') {
    for (const inv of c.investigations || []) {
      if (/Histoloji|nekroz/i.test(inv.label)) {
        inv.label = 'Histolojik doku hasarı paterni';
        inv.summary = 'Miyokard liflerinin hücre konturları korunmuş, sitoplazma eozinofilikleşmiş ve çekirdek boyanması kaybolmuş izlenir.';
        inv.findings = ['Protein denatürasyonu baskın morfolojik patern oluşturur.', 'Beyin dokusundaki sıvılaşma paterni izlenmez.'];
      }
    }
  }
  if (c.id === 'neurology-liquefactive-necrosis-brain-001') {
    for (const inv of c.investigations || []) {
      if (/Patoloji|nekroz/i.test(inv.label)) {
        inv.label = 'Patolojik doku hasarı paterni';
        inv.summary = 'Beyin dokusunda santrali sıvılaşmış kaviter alan, yoğun nötrofilik inflamasyon ve doku mimarisinde çözülme izlenir.';
        inv.findings = ['Enzimatik sindirim baskındır.', 'Hücre konturlarının uzun süre korunduğu solid patern izlenmez.'];
      }
    }
  }
  if (c.id === 'tus-spot-pdf-neonatal-erythema-toxicum-eosinophils-001') {
    const inv = c.investigations?.[0];
    if (inv) {
      inv.summary = 'Püstül içeriğinde bol eozinofil görülür; kültürde üreme olmaz.';
      inv.findings = ['Steril püstül ve eozinofil baskınlığı benign yenidoğan döküntüsü paternini destekler.'];
    }
  }
}

for (const c of cases) {
  if (specs[c.id]) applyQuestionSpec(c, specs[c.id]);
  const beforeInv = getInvText(c);
  updateInvestigationDetails(c);
  if (beforeInv !== getInvText(c)) touch('investigationSanitizedCases', c);
  sanitizeInvestigations(c);
  sanitizePatientIntro(c);
}

// Harden a small group of TUS spot options with overly unrelated distractors without changing the core answer.
const optionOnlyUpdates = {
  'tus-spot-clinical-urticaria-001': ['Oral ikinci kuşak H1 antihistaminik ve tetikleyiciden kaçınma', 'İntramüsküler adrenalin ve acil anafilaksi yönetimi', 'Sistemik kortikosteroidi tek tedavi olarak vermek', 'Geniş spektrumlu antibiyotik başlamak'],
  'tus-spot-pdf-anaphylaxis-im-epinephrine-001': ['İntramüsküler adrenalin', 'İntravenöz H1 antihistaminik tek başına', 'Nebül salbutamolü tek tedavi olarak vermek', 'Sistemik kortikosteroid yanıtını beklemek'],
  'tus-spot-pdf-scleroderma-digital-ulcer-iloprost-bosentan-001': ['İloprost ve bosentan', 'Nifedipin ve lokal yara bakımı', 'Sildenafil ve düşük doz aspirin', 'Siklofosfamid ve yüksek doz steroid'],
  'tus-spot-pdf-tinea-pedis-terbinafine-001': ['Terbinafin', 'Topikal asiklovir', 'Topikal permetrin', 'Topikal mupirosin'],
  'tus-spot-pdf-hie-therapeutic-hypothermia-001': ['Terapötik hipotermi', 'Profilaktik fenitoin monoterapisi', 'Hiperbarik oksijen tedavisi', 'Rutin profilaktik antibiyotik'],
};
for (const c of cases) {
  const opts = optionOnlyUpdates[c.id];
  if (!opts) continue;
  const beforeOptions = JSON.stringify(c.diagnosis.options);
  const oldCorrect = c.diagnosis.correct;
  if (c.id === 'tus-spot-clinical-urticaria-001') c.diagnosis.correct = 'Oral ikinci kuşak H1 antihistaminik ve tetikleyiciden kaçınma';
  if (c.id === 'tus-spot-pdf-hie-therapeutic-hypothermia-001') c.diagnosis.correct = 'Terapötik hipotermi';
  c.diagnosis.options = opts;
  if (c.question) c.diagnosis.question = c.question;
  if (oldCorrect !== c.diagnosis.correct) {
    c.diagnosis.explanation = c.diagnosis.explanation?.replace(oldCorrect, c.diagnosis.correct) || `${c.diagnosis.correct} olgudaki klinik karar için en uygun yanıttır.`;
    if (c.diagnosis.answerFeedback) c.diagnosis.answerFeedback.correctDiagnosis = c.diagnosis.correct;
  }
  if (beforeOptions !== JSON.stringify(c.diagnosis.options)) {
    touch('optionsHardenedCases', c);
    report.targetedUpdates.push({ id: c.id, title: c.title, change: 'Aşırı alakasız seçenekler aynı klinik karar kategorisinden daha güçlü çeldiricilerle değiştirildi.' });
  }
}

// Keep top-level question synchronized.
for (const c of cases) {
  if (c.diagnosis?.question) c.question = c.diagnosis.question;
}

const output = `export const cases = ${JSON.stringify(cases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
writeFileSync(new URL('../src/data/cases.js', import.meta.url), output, 'utf8');

const serializableReport = Object.fromEntries(Object.entries(report).map(([key, value]) => [key, value instanceof Set ? Array.from(value) : value]));
serializableReport.counts = {
  reviewedCases: report.reviewedCases,
  leakageFixedCases: report.leakageFixedCases.size,
  questionChangedCases: report.questionChangedCases.size,
  optionsHardenedCases: report.optionsHardenedCases.size,
  investigationSanitizedCases: report.investigationSanitizedCases.size,
  patientTextSanitizedCases: report.patientTextSanitizedCases.size,
};
writeFileSync(new URL('../EXAM_CONTENT_LEAKAGE_REPAIR_REPORT.json', import.meta.url), `${JSON.stringify(serializableReport, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(serializableReport.counts, null, 2));
