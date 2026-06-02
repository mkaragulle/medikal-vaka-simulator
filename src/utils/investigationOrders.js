import { neutralModalityTitle, stripDiagnosticLeakage, toSentence } from './displayText.js';
import { sanitizePreAnswerText } from './answerLeakageGate.js';
import { visualMatchesInvestigation } from './clinicalVisuals.js';

export const priorityMeta = {
  essential: {
    label: 'Güçlü veri',
    tone: 'success',
    scoreImpact: 4,
    feedback: 'Bu istem, olguda tanı veya acil yönetim açısından kritik objektif veri sağlar.',
  },
  useful: {
    label: 'Yardımcı veri',
    tone: 'blue',
    scoreImpact: 2,
    feedback: 'Bu istem, ayırıcı tanı veya risk sınıflaması için ek objektif veri sağlar.',
  },
  situational: {
    label: 'Durumsal',
    tone: 'violet',
    scoreImpact: 1,
    feedback: 'Bu istem seçilmiş klinik koşullarda değer kazanır; her olguda ilk basamak değildir.',
  },
  lowPriority: {
    label: 'Sınırlı katkı',
    tone: 'slate',
    scoreImpact: -1,
    feedback: 'Bu istemde acil yaklaşımı değiştirecek ek patoloji saptanmadı.',
  },
  inappropriateEarly: {
    label: 'Erken',
    tone: 'warning',
    scoreImpact: -2,
    feedback: 'Bu istem ileri aşamada düşünülebilir; önce daha yüksek tanısal değer taşıyan istemler tamamlanmalıdır.',
  },
  lowValue: {
    label: 'Sınırlı katkı',
    tone: 'slate',
    scoreImpact: -1,
    feedback: 'Bu istemde acil yaklaşımı değiştirecek ek patoloji saptanmadı.',
  },
  harmfulDelay: {
    label: 'Erken',
    tone: 'warning',
    scoreImpact: -2,
    feedback: 'Önce stabilizasyon ve temel güvenlik verileri tamamlanmalıdır; bu istem erken aşamada önceliği düşürür.',
  },
};

export const typeLabels = {
  ecg: 'EKG',
  echo: 'Ekokardiyografi',
  lab: 'Laboratuvar',
  clinical: 'Klinik değerlendirme',
  physicalExam: 'Fizik muayene',
  procedure: 'İşlem',
  screening: 'Tarama',
  genetics: 'Genetik değerlendirme',
  bloodGas: 'Kan gazı',
  fluidAnalysis: 'BOS / sıvı analizi',
  bloodBank: 'Kan bankası',
  microbiology: 'Mikrobiyoloji',
  functionalTest: 'Fonksiyonel test',
  xray: 'Direkt grafi',
  ct: 'BT',
  mri: 'MR',
  ultrasound: 'Ultrasonografi',
  microscopy: 'Mikroskopi',
  pathology: 'Patoloji',
  clinical: 'Klinik bulgu',
  endoscopy: 'Endoskopi',
  neurophysiology: 'Nörofizyoloji',
  nuclear: 'Nükleer tıp',
  urine: 'İdrar',
  culture: 'Kültür',
  toxicology: 'Toksikoloji',
};

export const investigationIconByType = {
  ecg: 'Activity',
  echo: 'Activity',
  lab: 'FlaskConical',
  bloodGas: 'Activity',
  fluidAnalysis: 'Droplets',
  bloodBank: 'HeartPulse',
  microbiology: 'FlaskConical',
  functionalTest: 'Activity',
  xray: 'Image',
  ct: 'Image',
  mri: 'Image',
  ultrasound: 'Activity',
  microscopy: 'Search',
  pathology: 'Search',
  clinical: 'ClipboardList',
  endoscopy: 'Image',
  neurophysiology: 'Activity',
  nuclear: 'Sparkles',
  urine: 'Droplets',
  culture: 'FlaskConical',
  toxicology: 'FlaskConical',
};


export const orderCategoryMeta = {
  bedside: {
    label: 'Yatak başı testler',
    description: 'Hasta başında hızlı ölçüm.',
  },
  cardiac: {
    label: 'Kardiyak değerlendirme',
    description: 'Ritim ve kardiyak incelemeler.',
  },
  clinicalAssessment: {
    label: 'Klinik değerlendirme',
    description: 'Fizik muayene, lokal bulgu ve hedefe yönelik klinik gözlemler.',
  },
  laboratory: {
    label: 'Laboratuvar',
    description: 'Kan örneği sonuçları.',
  },
  imaging: {
    label: 'Görüntüleme',
    description: 'Radyolojik görüntüleme sonuçları.',
  },
  respiratory: {
    label: 'Solunum değerlendirmesi',
    description: 'Solunum sistemi ölçümleri.',
  },
  neurologic: {
    label: 'Nörolojik değerlendirme',
    description: 'Nörolojik teknik inceleme sonuçları.',
  },
  gastrointestinal: {
    label: 'Gastrointestinal değerlendirme',
    description: 'Gastrointestinal sistem incelemeleri.',
  },
  microbiology: {
    label: 'Mikrobiyoloji',
    description: 'Etken saptamaya yönelik sonuçlar.',
  },
  immunologySerology: {
    label: 'İmmünoloji / seroloji',
    description: 'Otoimmün ve hedefli serolojik değerlendirme sonuçları.',
  },
  fluidAnalysis: {
    label: 'BOS / sıvı analizi',
    description: 'BOS, dren, dışkı ve vücut sıvısı örneklerine özgü sonuçlar.',
  },
  functional: {
    label: 'Fonksiyonel testler',
    description: 'Spirometri, efor testi, EEG/EMG, odyometri, ürodinami, fetal izlem ve ölçülebilir basınç testleri.',
  },
  urine: {
    label: 'İdrar tetkikleri',
    description: 'İdrar örneği sonuçları.',
  },
  prenatal: {
    label: 'Prenatal tanı',
    description: 'Gebelik haftası, prenatal tarama, fetal görüntüleme ve amniyotik sıvı sonuçları.',
  },
  urogenital: {
    label: 'Ürogenital değerlendirme',
    description: 'Gebelik ve ürogenital sistem sonuçları.',
  },
  pathology: {
    label: 'Patoloji',
    description: 'Mikroskopi, sitoloji ve histopatoloji sonuçları.',
  },
  metabolic: {
    label: 'Metabolik değerlendirme',
    description: 'Glukoz, elektrolit ve metabolik ölçüm sonuçları.',
  },
  invasive: {
    label: 'Girişimsel tetkikler',
    description: 'İşlem temelli tanısal yöntemler.',
  },
  bloodBank: {
    label: 'Kan hazırlığı',
    description: 'Kan grubu ve uyumluluk sonuçları.',
  },
  toxicology: {
    label: 'Toksikoloji',
    description: 'Toksik madde ve ilaç düzeyi sonuçları.',
  },
  other: {
    label: 'Diğer tetkikler',
    description: 'Ek objektif sonuçlar.',
  },
};

export function getOrderCategoryMeta(category = 'other') {
  return orderCategoryMeta[category] || orderCategoryMeta.other;
}

function inferOrderCategory(item = {}, clinicalCase = {}) {
  const type = item.type || '';
  const text = `${item.id || ''} ${item.label || ''} ${item.title || ''} ${type} ${item.subtype || ''}`.toLocaleLowerCase('tr');
  const explicitCategory = item.testTypeCategory || item.category;
  if (explicitCategory && orderCategoryMeta[explicitCategory]) return explicitCategory;
  const canonical = canonicalCategory(item);

  if (type === 'clinical' || type === 'physicalExam' || type === 'woundAssessment' || /(yara değerlendirmesi|yanık yüzdesi|fizik muayene|klinik değerlendirme|lokal bulgu|fundus muayenesi|göz içi basıncı|odyometri)/.test(text)) return 'clinicalAssessment';
  if (type === 'bloodGas' || canonical === 'abg' || /(kan gazı|arter kan gazı|venöz kan gazı|paco2|hco)/.test(text)) return 'respiratory';
  if (/(parmak ucu|kapiller kan glukozu|yatak başı kan glukozu)/.test(text)) return 'bedside';
  if (type === 'ecg' || type === 'echo' || /(ekg|ecg|ekokardiyografi|eko)/.test(text)) return 'cardiac';
  if (type === 'bloodBank' || canonical === 'crossmatch' || /(kan grubu|cross|transfüzyon|eritrosit süspansiyonu)/.test(text)) return 'bloodBank';
  if (type === 'functionalTest') {
    if (/(solunum fonksiyon|vital kapasite|difüzyon kapasitesi|hiperoksi)/.test(text)) return 'respiratory';
    if (/(fetal kalp|nst|kardiyotokografi)/.test(text)) return 'urogenital';
    return 'functional';
  }
  if (type === 'pathology' || canonical === 'pathology' || /(biyopsi|sitoloji|histopatoloji|periferik yayma|elektron mikroskopisi|immünfloresan|immunfloresan)/.test(text)) return 'pathology';
  if (type === 'microbiology' || type === 'culture' || canonical === 'culture' || /(kültür|mikrobiyoloji|gram boyama|pcr|antijen|seroloji|koh|aside dirençli|toksin testi|üre nefes|hpv dna)/.test(text)) return 'microbiology';
  if (type === 'urine' || canonical === 'urine') return 'urine';
  if (type === 'fluidAnalysis' || /(^|\s)(bos)(\s|$)|beyin omurilik sıvısı|lomber ponksiyon|dren sıvısı|dışkı|gaita|plevral|sinovyal/.test(text)) return 'fluidAnalysis';
  if (/(gebelik testi|beta-hcg|hcg|üriner sistem|ürogenital|transvajinal servikal uzunluk)/.test(text)) return 'urogenital';
  if (type === 'toxicology' || canonical === 'toxicology' || /(toksikoloji|zehir|etanol|benzodiazepin|parasetamol|digoksin|kolinesteraz|ilaç düzeyi)/.test(text)) return 'toxicology';
  if (type === 'endoscopy' || canonical === 'endoscopy' || /(endoskopi|kolonoskopi|bronkoskopi|laringoskopi)/.test(text)) return 'gastrointestinal';
  if (['ct', 'mri', 'ultrasound', 'xray', 'nuclear', 'imaging'].includes(type) || ['xray', 'ctpa', 'cta', 'brain-ct', 'ct', 'mri', 'ultrasound'].includes(canonical) || /(grafi|radyografi|bt|tomografi|mr\b|mri|ultrason|usg|doppler|sintigrafi)/.test(text)) return 'imaging';
  if (/(glukoz|elektrolit|keton|metabolik)/.test(text)) return 'metabolic';
  if (['lab'].includes(type) || ['cbc', 'coagulation', 'liver', 'troponin', 'electrolytes', 'biochemistry', 'd-dimer', 'inflammation', 'lactate'].includes(canonical)) return 'laboratory';
  if (type === 'neurophysiology') return 'neurologic';
  return 'other';
}

const genericOrderBank = [
  { id: 'cbc-screen', label: 'Hemogram', type: 'lab', priority: 'useful', synthetic: true },
  { id: 'biochemistry-screen', label: 'Temel biyokimya', type: 'lab', priority: 'useful', synthetic: true },
  { id: 'coagulation-screen', label: 'Koagülasyon paneli', type: 'lab', priority: 'situational', synthetic: true },
  { id: 'abg-screen', label: 'Kan gazı', type: 'lab', priority: 'situational', synthetic: true },
  { id: 'urinalysis-screen', label: 'Tam idrar analizi', type: 'urine', priority: 'lowPriority', synthetic: true },
  { id: 'cxr-screen', label: 'Akciğer grafisi', type: 'xray', priority: 'situational', synthetic: true },
];

const branchOrderBank = {
  anatomy: [
    { id: 'direct-xray-anatomy', label: 'Direkt grafi', type: 'xray', priority: 'essential', synthetic: true },
    { id: 'neurovascular-exam-anatomy', label: 'Hedefe yönelik nörovasküler muayene kaydı', type: 'clinical', priority: 'essential', synthetic: true },
  ],
  physiology: [
    { id: 'orthostatic-vitals-physiology', label: 'Ortostatik vital bulgular', type: 'clinical', priority: 'essential', synthetic: true },
    { id: 'basic-electrolytes-physiology', label: 'Temel elektrolit paneli', type: 'lab', priority: 'situational', synthetic: true },
  ],
  'histology-embryology': [
    { id: 'targeted-ultrasound-histoembryo', label: 'Hedefe yönelik ultrasonografi', type: 'ultrasound', priority: 'useful', synthetic: true },
    { id: 'pathology-histoembryo', label: 'Histopatolojik değerlendirme', type: 'pathology', priority: 'situational', synthetic: true },
  ],
  'medical-biochemistry': [
    { id: 'metabolic-panel-biochem', label: 'Metabolik panel', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'enzyme-assay-biochem', label: 'Enzim / metabolit analizi', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'urine-metabolite-biochem', label: 'İdrarda metabolit incelemesi', type: 'urine', priority: 'useful', synthetic: true },
  ],
  'medical-microbiology': [
    { id: 'culture-microbiology', label: 'Kültür ve duyarlılık', type: 'culture', priority: 'essential', synthetic: true },
    { id: 'microscopy-microbiology', label: 'Mikroskopik inceleme', type: 'microscopy', priority: 'essential', synthetic: true },
    { id: 'serology-pcr-microbiology', label: 'Seroloji / PCR', type: 'lab', priority: 'useful', synthetic: true },
  ],
  'medical-pathology': [
    { id: 'pathology-panel', label: 'Histopatolojik inceleme', type: 'pathology', priority: 'essential', synthetic: true },
    { id: 'morphology-correlation', label: 'Doku hasarı paterni', type: 'pathology', priority: 'useful', synthetic: true },
  ],
  'medical-pharmacology': [
    { id: 'toxidrome-assessment', label: 'Toksidrom değerlendirmesi', type: 'clinical', priority: 'essential', synthetic: true },
    { id: 'drug-level-toxicology', label: 'Toksikoloji / ilaç düzeyi', type: 'toxicology', priority: 'useful', synthetic: true },
  ],
  'obstetrics-gynecology': [
    { id: 'pregnancy-test-obgyn', label: 'Gebelik testi / beta-hCG', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'transvaginal-usg-obgyn', label: 'Transvajinal ultrasonografi', type: 'ultrasound', priority: 'essential', synthetic: true },
    { id: 'cbc-obgyn', label: 'Hemogram', type: 'lab', priority: 'useful', synthetic: true },
  ],
  'minor-rotations': [
    { id: 'focused-exam-minor', label: 'Hedefe yönelik branş muayenesi', type: 'clinical', priority: 'essential', synthetic: true },
    { id: 'xray-minor', label: 'Direkt grafi', type: 'xray', priority: 'useful', synthetic: true },
    { id: 'brain-ct-minor', label: 'Kontrastsız beyin BT', type: 'ct', priority: 'situational', synthetic: true },
    { id: 'mri-minor', label: 'MR', type: 'mri', priority: 'situational', synthetic: true },
  ],
  cardiovascular: [
    { id: 'ecg-screen', label: '12 derivasyon EKG', type: 'ecg', priority: 'essential', synthetic: true },
    { id: 'troponin-screen', label: 'Kardiyak troponin', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'basic-chemistry-cardio', label: 'Böbrek fonksiyonu ve elektrolitler', type: 'lab', priority: 'useful', synthetic: true },
    { id: 'cxr-cardio', label: 'Akciğer grafisi', type: 'xray', priority: 'situational', synthetic: true },
    { id: 'ct-angio-cardio', label: 'BT anjiyografi', type: 'ct', priority: 'situational', synthetic: true },
  ],
  'internal-medicine': [
    { id: 'cbc-im', label: 'Hemogram', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'coag-im', label: 'Koagülasyon paneli', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'liver-im', label: 'Karaciğer fonksiyonları', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'crossmatch-im', label: 'Kan grubu ve eritrosit süspansiyonu hazırlığı', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'endoscopy-im', label: 'Endoskopi', type: 'endoscopy', priority: 'essential', synthetic: true },
    { id: 'abdomen-usg-im', label: 'Batın Ultrasonografi', type: 'ultrasound', priority: 'useful', synthetic: true },
    { id: 'abdomen-ct-im', label: 'Batın BT', type: 'ct', priority: 'situational', synthetic: true },
  ],
  pulmonology: [
    { id: 'cxr-pulm', label: 'Akciğer grafisi', type: 'xray', priority: 'essential', synthetic: true },
    { id: 'abg-pulm', label: 'Kan gazı', type: 'lab', priority: 'useful', synthetic: true },
    { id: 'd-dimer-pulm', label: 'D-dimer', type: 'lab', priority: 'situational', synthetic: true },
    { id: 'ctpa-pulm', label: 'BT pulmoner anjiyografi', type: 'ct', priority: 'situational', synthetic: true },
    { id: 'culture-pulm', label: 'Kan kültürü', type: 'culture', priority: 'useful', synthetic: true },
  ],
  'infectious-diseases': [
    { id: 'cbc-id', label: 'Hemogram', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'crp-pct-id', label: 'CRP / prokalsitonin', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'lactate-id', label: 'Laktat', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'culture-id', label: 'Kan kültürü', type: 'culture', priority: 'essential', synthetic: true },
    { id: 'focus-imaging-id', label: 'Odak görüntüleme', type: 'xray', priority: 'useful', synthetic: true },
  ],
  neurology: [
    { id: 'glucose-electrolyte-neuro', label: 'Parmak ucu glukoz ve temel elektrolitler', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'brain-ct-neuro', label: 'Kontrastsız beyin BT', type: 'ct', priority: 'essential', synthetic: true },
    { id: 'cta-neuro', label: 'BT anjiyografi', type: 'ct', priority: 'essential', synthetic: true },
    { id: 'brain-mri-neuro', label: 'Beyin MR', type: 'mri', priority: 'useful', synthetic: true },
    { id: 'csf-neuro', label: 'BOS incelemesi', type: 'lab', priority: 'situational', synthetic: true },
  ],
  pediatrics: [
    { id: 'cbc-ped', label: 'Hemogram', type: 'lab', priority: 'useful', synthetic: true },
    { id: 'electrolytes-ped', label: 'Elektrolit paneli', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'urinalysis-ped', label: 'Tam idrar analizi', type: 'urine', priority: 'useful', synthetic: true },
    { id: 'usg-ped', label: 'Ultrasonografi', type: 'ultrasound', priority: 'useful', synthetic: true },
  ],
  'general-surgery': [
    { id: 'cbc-surg', label: 'Hemogram', type: 'lab', priority: 'essential', synthetic: true },
    { id: 'biochemistry-surg', label: 'Temel biyokimya', type: 'lab', priority: 'useful', synthetic: true },
    { id: 'abdomen-usg-surg', label: 'Abdominal Ultrasonografi', type: 'ultrasound', priority: 'useful', synthetic: true },
    { id: 'abdomen-ct-surg', label: 'Kontrastlı abdomen BT', type: 'ct', priority: 'essential', synthetic: true },
  ],
  orthopedics: [
    { id: 'xray-ortho', label: 'Direkt grafi', type: 'xray', priority: 'essential', synthetic: true },
    { id: 'cbc-ortho', label: 'Hemogram', type: 'lab', priority: 'useful', synthetic: true },
    { id: 'inflammation-ortho', label: 'İnflamasyon belirteçleri', type: 'lab', priority: 'useful', synthetic: true },
    { id: 'mri-ortho', label: 'MR', type: 'mri', priority: 'situational', synthetic: true },
  ],
};

function normalizePriority(value = '') {
  if (value === 'lowValue') return 'lowPriority';
  if (value === 'harmfulDelay') return 'inappropriateEarly';
  return value || 'useful';
}

function getScoreImpact(priority) {
  return priorityMeta[normalizePriority(priority)]?.scoreImpact ?? 1;
}

function inferPriority(item, clinicalCase) {
  if (item.priority) return normalizePriority(item.priority);
  const text = `${item.id || ''} ${item.label || ''} ${item.type || ''}`.toLocaleLowerCase('tr');
  const branch = clinicalCase?.branchId || '';
  if (item.type === 'management') return 'inappropriateEarly';
  if (branch === 'internal-medicine' && /(ecg|ekg|troponin|marker|biyobelirteç|cbc|hemogram|koag|endoskopi|liver|karaciğer|cross|kan gazı|d-dimer|bt pulmoner|akciğer grafisi)/.test(text)) return 'essential';
  if (branch === 'medical-biochemistry' && /(metabolit|enzim|glukoz|keton|amonyak|laktat|lipid|aminoasit|organik asit)/.test(text)) return 'essential';
  if (branch === 'medical-microbiology' && /(kültür|mikroskopi|pcr|seroloji|antijen|boyama|parazit|kan kültürü)/.test(text)) return 'essential';
  if (branch === 'medical-pathology' && /(patoloji|histopatoloji|biyopsi|sitoloji|morfoloji|nekroz|granülom)/.test(text)) return 'essential';
  if (branch === 'medical-pharmacology' && /(toksikoloji|ilaç düzeyi|antidot|kolinesteraz|parasetamol|organofosfat)/.test(text)) return 'essential';
  if (branch === 'obstetrics-gynecology' && /(hcg|gebelik|transvajinal|ultrason|hemogram|kan grubu)/.test(text)) return 'essential';
  if (branch === 'minor-rotations' && /(inme|stroke|mca|beyin bt|kontrastsız|anjiyografi|glukoz|elektrolit|grafi|xray|mr|mri|nörovasküler)/.test(`${text} ${clinicalCase?.title || ''} ${clinicalCase?.clinicalFocus || ''}`.toLocaleLowerCase('tr'))) return 'essential';
  if (/(ct|bt|mri|mr|ultrason|usg|grafi|xray|endoscopy|endoskopi|ecg|ekg|lab|laboratuvar)/.test(text)) return 'useful';
  return 'lowPriority';
}

function normalizeId(value = '') {
  return String(value || '')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function sanitizeSummary(text = '', clinicalCase) {
  const safe = sanitizePreAnswerText(text, clinicalCase, { strict: true, field: 'investigation.result.summary' })
    || stripDiagnosticLeakage(text, clinicalCase);
  return toSentence(safe || '');
}

function hasOwnVisualReference(item = {}) {
  return Boolean(
    (Array.isArray(item.imageIds) && item.imageIds.length) ||
    item.imageUrl ||
    item.thumbnailUrl ||
    (Array.isArray(item.result?.images) && item.result.images.length)
  );
}

function isVisualInvestigationItem(item = {}) {
  const text = `${item.id || ''} ${item.label || ''} ${item.title || ''} ${item.type || ''} ${item.subtype || ''}`.toLocaleLowerCase('tr');
  if (['xray', 'ct', 'mri', 'ultrasound', 'ecg', 'echo', 'endoscopy', 'microscopy', 'pathology', 'clinical', 'neurophysiology', 'nuclear'].includes(item.type)) return true;
  if (/(grafi|radyografi|röntgen|xray|bt|ct|tomografi|mr\b|mri|ultrason|usg|ekokardiyografi|eko\b|doppler|ekg|elektrokardiyografi|eeg|endoskopi|kolonoskopi|bronkoskopi|fundoskopi|dermatoskopi|biyopsi|patoloji|histopatoloji|mikroskopi|periferik yayma|gram boyama|immünfloresan|immunfloresan|klinik fotoğraf|lezyon fotoğrafı|görsel)/.test(text)) return true;
  return false;
}

function attachImages(item, clinicalCase) {
  const images = clinicalCase.images || [];
  if (!images.length) return [];
  if (!isVisualInvestigationItem(item) && !hasOwnVisualReference(item)) return [];

  const explicitImageIds = new Set(item.imageIds || []);
  const explicitlyLinkedImages = images.filter((image) => image && explicitImageIds.has(image.id));
  if (explicitlyLinkedImages.length) return explicitlyLinkedImages;

  if (!isVisualInvestigationItem(item)) return [];
  return images.filter((image) => visualMatchesInvestigation(image, item));
}

function examToContextText(exam = []) {
  if (Array.isArray(exam)) return exam.join(' ');
  return String(exam || '');
}

function caseContext(clinicalCase = {}) {
  return `${clinicalCase.title || ''} ${clinicalCase.clinicalFocus || ''} ${clinicalCase.chiefComplaint || ''} ${clinicalCase.stem || ''} ${examToContextText(clinicalCase.exam)}`.toLocaleLowerCase('tr');
}


const REAL_FUNCTIONAL_TEST_PATTERN = /(solunum fonksiyon|spirometri|vital kapasite|difüzyon kapasitesi|dlco|efor testi|egzersiz testi|emg|eeg|odyometri|ürodinami|urodinami|tilt testi|kardiyotokografi|nst|fetal kalp|kompartman basıncı|hiperoksi|klirens ölçümü|para-aminohippurat klirens)/i;
const NON_CLINICAL_MECHANISM_PATTERN = /(simülasyon|simulasyon|modelleme|modellendi|fizyolojik mekanizma|patofizyolojik mekanizma|beklenen fizyolojik yön|beklenen refleks yanıt|makula densa yanıtı|tubuloglomerüler geri bildirim|bohr etkisi|haldane etkisi|frank-starling mekanizması|raas ve efferent|baroreseptör refleks yanıtı|sempatik nörotransmitter aktarımı|adh ve aquaporin|miksiyon refleksi ve sakral parasempatik çıkış)/i;

function isNonClinicalMechanismInvestigation(item = {}) {
  if (item.testValueLabel || item.educationalValue || item.clinicalPriorityLabel || item.scoreValue != null) return false;
  const type = String(item.type || '').toLocaleLowerCase('tr');
  const text = `${item.id || ''} ${item.label || ''} ${item.title || ''} ${item.subtype || ''} ${item.summary || ''}`.toLocaleLowerCase('tr');
  if (item.orderable === false) return true;
  if (['mechanism', 'physiology', 'simulation'].includes(type)) return true;
  if (NON_CLINICAL_MECHANISM_PATTERN.test(text)) return true;
  if (type === 'functionaltest' && /mekanizma|refleks|yanıtı|yolağı|bohr|haldane|starling|raas|makula|tubuloglomer|aquaporin|nörotransmitter/.test(text) && !REAL_FUNCTIONAL_TEST_PATTERN.test(text)) return true;
  return false;
}

function findRows(clinicalCase = {}, patterns = []) {
  const rows = [];
  (clinicalCase.investigations || []).forEach((item) => {
    (item.rows || []).forEach((row) => {
      const text = Array.isArray(row) ? row.join(' ') : Object.values(row || {}).join(' ');
      if (patterns.some((pattern) => pattern.test(text.toLocaleLowerCase('tr')))) rows.push(row);
    });
  });
  return rows;
}

function hasActualCategory(item, caseItems = []) {
  const candidate = canonicalCategory(item);
  return caseItems.some((actual) => canonicalCategory(actual) === candidate);
}

function canonicalCategory(item = {}) {
  const text = `${item.id || ''} ${item.label || ''} ${item.type || ''}`.toLocaleLowerCase('tr');
  if (/(ecg|ekg)/.test(text)) return 'ecg';
  if (/(ekokardiyografi|eko)/.test(text)) return 'echo';
  if (/(troponin|ck-mb|marker|biyobelirteç)/.test(text)) return 'troponin';
  if (/(cbc|hemogram|tam kan|trombosit|hb|lökosit)/.test(text)) return 'cbc';
  if (/(koag|inr|pt|aptt)/.test(text)) return 'coagulation';
  if (/(liver|karaciğer|bilirubin|albumin|alkalen|ggt|transaminaz)/.test(text)) return 'liver';
  if (/(cross|kan grubu|transfüzyon)/.test(text)) return 'crossmatch';
  if (/(endoscopy|endoskopi)/.test(text)) return 'endoscopy';
  if (/(abg|kan gazı|ph|hco)/.test(text)) return 'abg';
  if (/(d-dimer|dimer)/.test(text)) return 'd-dimer';
  if (/(culture|kültür)/.test(text)) return 'culture';
  if (/(crp|prokalsitonin|inflamasyon)/.test(text)) return 'inflammation';
  if (/(lactate|laktat)/.test(text)) return 'lactate';
  if (/(biyopsi|sitoloji|histopatoloji|patoloji|periferik yayma|mikroskopi)/.test(text)) return 'pathology';
  if (/(gebelik|hcg|beta-hcg)/.test(text)) return 'pregnancy';
  if (/(urine|idrar)/.test(text)) return 'urine';
  if (/(electrolyte|elektrolit|sodyum|potasyum)/.test(text)) return 'electrolytes';
  if (/(glucose|glukoz)/.test(text)) return 'glucose';
  if (/(biyokimya|biochemistry|chemistry|metabolik|üre|kreatinin)/.test(text)) return 'biochemistry';
  if (/(ultrasound|ultrasonografi|ultrason|usg)/.test(text)) return 'ultrasound';
  if (/(ctpa|pulmoner anjiyo|bt pulmoner)/.test(text)) return 'ctpa';
  if (/(cta|bt anjiyografi|anjiyografi)/.test(text)) return 'cta';
  if (/(kontrastsız beyin bt|noncontrast|beyin bt)/.test(text)) return 'brain-ct';
  if (/(^|[^a-z0-9])(ct|bt)([^a-z0-9]|$)|tomografi/.test(text)) return 'ct';
  if (/(^|[^a-z0-9])(mri|mr)([^a-z0-9]|$)/.test(text)) return 'mri';
  if (/(xray|akciğer grafisi|direkt grafi|direkt radyografi|radyografi)/.test(text)) return 'xray';
  return normalizeId(item.label || item.id || item.type || 'tetkik');
}

function syntheticRowsFor(item, clinicalCase) {
  const context = caseContext(clinicalCase);
  const category = canonicalCategory(item);

  const existing = {
    cbc: findRows(clinicalCase, [/hb|hemoglobin|trombosit|wbc|lökosit|hct|hematokrit/]),
    coagulation: findRows(clinicalCase, [/inr|pt|aptt|fibrinojen/]),
    liver: findRows(clinicalCase, [/ast|alt|bilirubin|albumin|alkalen|ggt/]),
    troponin: findRows(clinicalCase, [/troponin|ck-mb/]),
    abg: findRows(clinicalCase, [/ph|hco|pco2|po2|laktat|anyon/]),
    inflammation: findRows(clinicalCase, [/crp|prokalsitonin|sedim|lökosit/]),
    electrolytes: findRows(clinicalCase, [/sodyum|potasyum|na|k\+|hco|glukoz/]),
    glucose: findRows(clinicalCase, [/glukoz|keton/]),
  }[category];

  if (existing?.length) return existing.slice(0, 6);

  if (category === 'cbc') {
    if (/hematemez|kan kus|gastrointestinal kanama|siroz|melena/.test(context)) {
      return [
        ['Hb', '7.8 g/dL', '13.5–17.5', 'Düşük'],
        ['Hct', '%24', '%41–53', 'Düşük'],
        ['Trombosit', '72.000/mm³', '150.000–400.000', 'Düşük'],
        ['Lökosit', '11.200/mm³', '4.000–10.000', 'Sınırda yüksek'],
      ];
    }
    if (/enfeksiyon|ateş|sepsis|pnömoni/.test(context)) {
      return [['Lökosit', '17.800/mm³', '4.000–10.000', 'Yüksek'], ['Nötrofil', '%86', '%40–70', 'Yüksek'], ['Hb', '12.9 g/dL', '13.5–17.5', 'Sınırda düşük']];
    }
    return [['Hb', '13.4 g/dL', '13.5–17.5', 'Sınırda'], ['Lökosit', '8.900/mm³', '4.000–10.000', 'Referans içinde'], ['Trombosit', '238.000/mm³', '150.000–400.000', 'Referans içinde']];
  }

  if (category === 'coagulation') {
    if (/siroz|karaciğer|kanama/.test(context)) {
      return [['INR', '1.9', '0.8–1.2', 'Yüksek'], ['PT', '21 sn', '11–14 sn', 'Uzamış'], ['aPTT', '39 sn', '25–35 sn', 'Sınırda uzun']];
    }
    return [['INR', '1.1', '0.8–1.2', 'Referans içinde'], ['PT', '13 sn', '11–14 sn', 'Referans içinde'], ['aPTT', '31 sn', '25–35 sn', 'Referans içinde']];
  }

  if (category === 'liver') {
    if (/siroz|karaciğer|portal/.test(context)) {
      return [['AST', '86 U/L', '<40', 'Yüksek'], ['ALT', '54 U/L', '<41', 'Yüksek'], ['Total bilirubin', '2.8 mg/dL', '0.2–1.2', 'Yüksek'], ['Albumin', '2.7 g/dL', '3.5–5.2', 'Düşük']];
    }
    return [['AST', '31 U/L', '<40', 'Referans içinde'], ['ALT', '28 U/L', '<41', 'Referans içinde'], ['Total bilirubin', '0.8 mg/dL', '0.2–1.2', 'Referans içinde']];
  }

  if (category === 'crossmatch') {
    return [['ABO/Rh', 'O Rh (+)', '—', 'Kayıt altına alındı'], ['Antikor tarama', 'Negatif', 'Negatif', 'Uygun'], ['Eritrosit süspansiyonu', '2 ünite ayrıldı', '—', 'Hazırlık yapıldı']];
  }

  if (category === 'troponin') {
    if (/göğüs|retrosternal|st elevasyon|iskemi|koroner/.test(context)) {
      return [['hs-Troponin I', '188 ng/L', '<34 ng/L', 'Yüksek'], ['CK-MB', '23 ng/mL', '<5 ng/mL', 'Yüksek']];
    }
    return [['hs-Troponin I', '12 ng/L', '<34 ng/L', 'Referans içinde'], ['CK-MB', '3.1 ng/mL', '<5', 'Referans içinde']];
  }

  if (category === 'abg') {
    if (/dka|ketoasidoz|kusma|dehidratasyon|solunum sıkıntısı/.test(context)) {
      return [['pH', '7.21', '7.35–7.45', 'Düşük'], ['HCO₃⁻', '9 mmol/L', '22–26', 'Düşük'], ['pCO₂', '24 mmHg', '35–45', 'Düşük'], ['Laktat', '1.8 mmol/L', '<2.0', 'Referans içinde']];
    }
    return [['pH', '7.39', '7.35–7.45', 'Referans içinde'], ['pO₂', '82 mmHg', '80–100', 'Referans içinde'], ['HCO₃⁻', '23 mmol/L', '22–26', 'Referans içinde']];
  }

  if (category === 'd-dimer') return [['D-dimer', '2.400 ng/mL FEU', '<500', 'Yüksek']];
  if (category === 'inflammation') return [['CRP', '96 mg/L', '<5', 'Yüksek'], ['Prokalsitonin', '1.8 ng/mL', '<0.1', 'Yüksek'], ['Lökosit', '16.900/mm³', '4.000–10.000', 'Yüksek']];
  if (category === 'lactate') return [['Laktat', '3.4 mmol/L', '<2.0', 'Yüksek']];
  if (category === 'electrolytes') return [['Sodyum', '136 mmol/L', '135–145', 'Referans içinde'], ['Potasyum', '3.2 mmol/L', '3.5–5.1', 'Düşük'], ['Klor', '101 mmol/L', '98–107', 'Referans içinde']];
  if (category === 'glucose') return [['Glukoz', '412 mg/dL', '70–100', 'Yüksek'], ['Keton', 'Pozitif', 'Negatif', 'Pozitif']];
  if (category === 'urine') return [['Dansite', '1.020', '1.005–1.030', 'Referans içinde'], ['Lökosit', 'Negatif', 'Negatif', 'Negatif'], ['Keton', /dka|ketoasidoz/.test(context) ? 'Pozitif' : 'Negatif', 'Negatif', /dka|ketoasidoz/.test(context) ? 'Pozitif' : 'Negatif']];
  if (category === 'biochemistry') return [['Kreatinin', '0.9 mg/dL', '0.6–1.2', 'Referans içinde'], ['Üre', /kanama|dehidratasyon/.test(context) ? '68 mg/dL' : '34 mg/dL', '17–43', /kanama|dehidratasyon/.test(context) ? 'Yüksek' : 'Referans içinde'], ['Sodyum', '136 mmol/L', '135–145', 'Referans içinde']];

  return [];
}

function syntheticSummaryFor(item, clinicalCase) {
  const context = caseContext(clinicalCase);
  const category = canonicalCategory(item);

  if (category === 'endoscopy') {
    if (/hematemez|melena|siroz|portal/.test(context)) return 'Endoskopide distal özofagusta genişlemiş venöz yapılar ve aktif sızıntı odağı izlenir.';
    return 'Endoskopide acil girişim gerektiren aktif kanama odağı izlenmez.';
  }
  if (category === 'echo') return 'Ekokardiyografide kardiyak yapı, kapak ve sistolik fonksiyon bulguları değerlendirilir.';
  if (category === 'ecg') {
    if (/göğüs|retrosternal|st elevasyon|iskemi|koroner/.test(context)) return 'V2–V5 derivasyonlarında ST segment elevasyonu; inferior derivasyonlarda karşılıklı ST depresyonu izlenir.';
    if (/aort|diseksiyon/.test(context)) return 'Sinüs taşikardisi izlenir; akut ST elevasyonu saptanmaz.';
    return 'Sinüs ritmi izlenir; akut iskemik ST değişikliği saptanmaz.';
  }
  if (category === 'xray') {
    if (/pnömoni|ateş|öksürük|balgam/.test(context)) return 'Akciğer grafisinde sağ alt zonda konsolidasyonla uyumlu opasite izlenir; belirgin plevral efüzyon saptanmaz.';
    if (/göğüs|retrosternal|st elevasyon|koroner/.test(context)) return 'Akciğer grafisinde akut kardiyopulmoner patoloji veya belirgin akciğer ödemi izlenmez.';
    if (/travma|kemik|eklem|omuz|diz|ayak|el bileği/.test(context)) return 'Direkt grafide klinik bölgeye uyan kemik ve eklem ilişkisi değerlendirilir; belirgin dislokasyon saptanmaz.';
    return 'Direkt grafide akut karar sürecini değiştiren belirgin patoloji izlenmez.';
  }
  if (category === 'ctpa') return /pulmoner emboli|dispne|hipoksemi/.test(context)
    ? 'BT pulmoner anjiyografide segmental pulmoner arter dallarında kontrast dolum defekti izlenir.'
    : 'BT pulmoner anjiyografide belirgin pulmoner arter dolum defekti izlenmez.';
  if (category === 'cta') {
    if (/inme|mca|orta serebral|afazi|güç kaybı/.test(context)) return 'BT anjiyografide sol orta serebral arter proksimal segmentinde dolum kesintisi izlenir.';
    if (/aort|diseksiyon/.test(context)) return 'BT anjiyografide asendan aortadan arkusa uzanan intimal flap ve çift lümen görünümü izlenir.';
    return 'BT anjiyografide acil endovasküler girişim gerektiren belirgin büyük damar oklüzyonu izlenmez.';
  }
  if (category === 'brain-ct') return 'Kontrastsız beyin BT’de akut intrakraniyal kanama saptanmaz; belirgin kitle etkisi izlenmez.';
  if (category === 'ct') {
    if (/karın|abdomen|apandisit/.test(context)) return 'Kontrastlı BT’de hedef bölgede duvar kalınlaşması ve çevresel yağlı doku dansitesinde artış izlenir; serbest hava saptanmaz.';
    if (/pankreatit/.test(context)) return 'BT’de pankreas çevresinde inflamatuvar değişiklikler izlenir; organize koleksiyon saptanmaz.';
    if (/baş|nörolojik|inme|bilinç/.test(context)) return 'BT’de akut intrakraniyal kanama veya belirgin kitle etkisi saptanmaz.';
    return 'BT incelemede acil müdahale gerektiren belirgin ek patoloji izlenmez.';
  }
  if (category === 'mri') {
    if (/inme|güç kaybı|afazi/.test(context)) return 'Difüzyon ağırlıklı MR’da klinik defisitle uyumlu akut difüzyon kısıtlılığı izlenir.';
    return 'MR incelemede akut karar sürecini değiştiren belirgin patolojik sinyal değişikliği izlenmez.';
  }
  if (category === 'ultrasound') {
    if (/safra|sağ üst kadran|kolanjit|kolesistit/.test(context)) return 'Ultrasonografide safra kesesinde taş ile uyumlu ekojen odaklar ve posterior akustik gölgelenme izlenir.';
    if (/karın|abdomen|asit|siroz/.test(context)) return 'Ultrasonografide serbest sıvı değerlendirilir; belirgin intraabdominal kitle izlenmez.';
    return 'Ultrasonografide hedef organda acil karar sürecini değiştiren belirgin patoloji saptanmaz.';
  }
  if (category === 'culture') return /ateş|sepsis|pnömoni|enfeksiyon/.test(context)
    ? 'Kültür örnekleri alındı; etken ve antibiyotik duyarlılığı henüz raporlanmadı.'
    : 'Kültür örneğinde etken henüz raporlanmadı.';
  if (category === 'urine') return 'Tam idrar analizinde lökosit esteraz ve nitrit negatif; belirgin hematüri saptanmaz.';
  if (category === 'pregnancy') return 'β-hCG sonucu negatif olarak raporlanır.';
  if (category === 'biochemistry') return 'Kreatinin ve elektrolit değerleri klinik stabilizasyonu değiştirecek belirgin bozukluk göstermez.';
  if (category === 'pathology') return 'Mikroskopik incelemede örneklenen materyale ait objektif hücresel bulgular raporlanır; kesin yorum histopatolojik rapora bırakılır.';
  return 'Bu istemde acil yaklaşımı değiştirecek belirgin ek objektif bulgu saptanmaz.';
}

function orderPurposeFor(item, clinicalCase = {}) {
  const category = canonicalCategory(item);
  const context = caseContext(clinicalCase);

  if (category === 'echo') return 'Kardiyak yapı ve fonksiyon değerlendirmesi.';
  if (category === 'ecg') return 'Ritim ve ST segment değerlendirmesi.';
  if (category === 'troponin') return 'Miyokart hasarı biyobelirteci.';
  if (category === 'brain-ct') return 'Akut kraniyal görüntüleme.';
  if (category === 'cta') return 'Arteriyel damar görüntüleme.';
  if (category === 'glucose') return 'Yatak başı metabolik ölçüm.';
  if (category === 'electrolytes') return 'Elektrolit ve metabolik durum.';
  if (category === 'cbc') return 'Hücre sayımı ve trombosit değerlendirmesi.';
  if (category === 'coagulation') return 'Koagülasyon ve kanama riski.';
  if (category === 'crossmatch') return 'Kan grubu ve transfüzyon hazırlığı.';
  if (category === 'endoscopy') return 'Lümen içi doğrudan değerlendirme.';
  if (category === 'liver') return 'Karaciğer fonksiyon ve sentez verisi.';
  if (category === 'ctpa') return 'Pulmoner arter görüntülemesi.';
  if (category === 'xray') {
    if (/pnömoni|öksürük|balgam|dispne|ateş/.test(context)) return 'Akciğer parankim ve plevra değerlendirmesi.';
    if (/travma|kemik|eklem|omuz|diz|ayak|el bileği/.test(context)) return 'Kemik ve eklem dizilimi.';
    return 'Direkt radyografik değerlendirme.';
  }
  if (category === 'urine') return 'İdrar tetkiki.';
  if (category === 'biochemistry') return 'Metabolik durum ve tedavi güvenliği.';
  if (category === 'abg') return 'Oksijenlenme ve asit-baz durumu.';
  if (category === 'culture') return 'Etken izolasyonu için örnek.';
  if (category === 'mri') return 'Yumuşak doku ve parankim ayrıntısı.';
  if (category === 'ultrasound') {
    if (/doppler|venöz|arteriyel|akım/.test(context + ' ' + String(item.label || '').toLocaleLowerCase('tr'))) return 'Vasküler akım ve kompresyon değerlendirmesi.';
    return 'Ultrasonografik morfoloji ve sıvı değerlendirmesi.';
  }

  return '';
}


function clinicalMeaningFor(item, clinicalCase = {}) {
  const category = canonicalCategory(item);
  const context = caseContext(clinicalCase);
  const priority = normalizePriority(item.priority);

  if (category === 'echo') return 'Ejeksiyon fraksiyonu, kapak ve duvar hareketi bulguları kalp yetmezliği veya yapısal kardiyak hastalık değerlendirmesine katkı sağlar.';
  if (category === 'ecg') return 'ST segmenti ve ritim bulguları acil reperfüzyon veya kardiyak monitörizasyon kararını belirler.';
  if (category === 'troponin') return 'Biyobelirteç yüksekliği miyokart hasarını destekler; ancak STEMI şüphesinde EKG kararını geciktirmemelidir.';
  if (category === 'brain-ct') return 'Kanama dışlandığında reperfüzyon uygunluğu ve damar görüntüleme ihtiyacı daha net değerlendirilir.';
  if (category === 'cta') return 'Büyük damar oklüzyonu gösterilirse mekanik trombektomi uygunluğu gündeme gelir.';
  if (category === 'glucose') return 'Glukoz bozukluğu nörolojik defisit taklitçisi olabileceği için erken dışlanmalıdır.';
  if (category === 'electrolytes') return 'Elektrolit ve metabolik bozukluklar klinik tabloyu taklit edebilir veya tedavi güvenliğini etkiler.';
  if (category === 'cbc') return 'Hemoglobin, lökosit ve trombosit düzeyleri kanama, enfeksiyon veya girişim güvenliği açısından yol gösterir.';
  if (category === 'coagulation') return 'Koagülasyon verileri kanama riski ve girişim/tedavi güvenliği açısından belirleyicidir.';
  if (category === 'crossmatch') return 'Transfüzyon gereksinimi doğarsa gecikmeyi azaltır; aktif kanama olgularında güvenlik sağlar.';
  if (category === 'endoscopy') return 'Kaynağı gösteren endoskopik bulgu tanı ve eş zamanlı tedavi planını belirler.';
  if (category === 'liver') return 'Karaciğer sentez bozukluğu kanama riski ve portal hipertansiyon bağlamını destekleyebilir.';
  if (category === 'ctpa') return 'Dolum defekti veya sağ kalp yüklenmesi saptanması pulmoner emboli yönetimini değiştirir.';
  if (category === 'xray') {
    if (/göğüs|retrosternal|st elevasyon|koroner/.test(context)) return 'Akut koroner kararın yerine geçmez; eşlik eden akciğer ödemi veya alternatif torasik patolojiyi gösterebilir.';
    if (/pnömoni|öksürük|balgam|dispne|ateş/.test(context)) return 'Parankimal infiltrasyon ve komplikasyon bulguları antibiyotik ve yatış kararını destekler.';
    if (/travma|kemik|eklem|omuz|diz|ayak|el bileği/.test(context)) return 'Kırık veya eklem ilişkisi tedavi planını ve immobilizasyon gereksinimini belirler.';
    return 'İlk tanısal karar sınırlıysa, alternatif yapısal patolojileri değerlendirmeye yardımcı olur.';
  }
  if (category === 'urine') {
    if (/göğüs|retrosternal|st elevasyon|koroner/.test(context)) return 'Göğüs ağrısı ve ST segment değişikliği bağlamında ilk yönetimi değiştirmez; bu nedenle düşük önceliklidir.';
    return 'Üriner bulgu yoksa ilk karar basamağına katkısı sınırlı kalır.';
  }
  if (category === 'biochemistry') return 'Böbrek fonksiyonu ve elektrolitler kontrast, ilaç ve sıvı tedavisi güvenliğini etkiler.';
  if (category === 'abg') return 'Hipoksemi veya asit-baz bozukluğu saptanması stabilizasyon ve yatış kararını etkiler.';
  if (category === 'culture') return 'Pozitif kültür sonucu hedefe yönelik antimikrobiyal tedaviye geçişi destekler.';
  if (category === 'mri') return 'İleri görüntüleme ilk görüntüleme belirsizse veya yumuşak doku/parankim ayrıntısı gerekiyorsa değer kazanır.';
  if (category === 'ultrasound') {
    if (/doppler|venöz|arteriyel|akım/.test(context + ' ' + String(item.label || '').toLocaleLowerCase('tr'))) return 'Doppler inceleme damar açıklığı, kompresyon yanıtı ve akım paternini objektif olarak gösterir.';
    return 'Ultrasonografi; sıvı, taş, duvar kalınlığı, kitle veya vasküler akım bulgularını objektif olarak gösterir.';
  }

  if (priority === 'lowPriority') return 'Bu istem mevcut tabloda acil yönetimi değiştirecek yeni veri sağlamaz.';
  if (priority === 'situational') return 'Klinik koşullar değişirse değer kazanabilir; rutin ilk basamak istemi değildir.';
  return '';
}

function postAnswerExplanationFor(item) {
  const priority = normalizePriority(item.priority);
  if (priority === 'essential') return 'Bu istem tanı veya acil yönetim açısından yüksek değer taşır.';
  if (priority === 'useful') return 'Bu istem ayırıcı tanıya veya risk sınıflamasına yardımcı olur.';
  if (priority === 'situational') return 'Bu istem ileri değerlendirme veya seçilmiş klinik koşullarda anlamlıdır.';
  if (priority === 'lowPriority') return 'Bu istemin mevcut tabloda acil yaklaşımı değiştirme olasılığı düşüktür.';
  return 'Bu istem ileri aşamada veya farklı klinik koşullarda düşünülebilir.';
}

function neutralRowNote(note = '', parameter = '', value = '', reference = '') {
  const text = String(note || '').toLocaleLowerCase('tr');
  const refText = String(reference || '');
  const normalizedReference = refText.toLocaleLowerCase('tr');
  const valueText = String(value || '').toLocaleLowerCase('tr');
  const combined = `${parameter} ${value} ${reference}`.toLocaleLowerCase('tr');

  if (/normalde beklenmeyen patern|mikroorganizma görülmemesi|dominant bakteri görülmemesi|üreme yok|negatif|saptanmaması|olmaması/.test(normalizedReference)) {
    if (/bekleniyor|sonuç bekleniyor|takip/.test(valueText)) return 'Takip edilecek';
    const valueShowsAbsence = /saptanmadı|izlenmedi|görülmedi|üreme olmadı|üreme saptanmadı|yok/.test(valueText) || (/\bnegatif\b/.test(valueText) && !/\bgram negatif\b/.test(valueText));
    if (valueShowsAbsence) return 'Negatif';
    if (/pozitif|saptandı|izlendi|görüldü|üreme|diplokok|kok|basil|konsolidasyon|elevasyon|depresyon|defekt|flap|anevrizma|vejetasyon|kitle|kalınlaşma|birikim|eozinofil/.test(valueText)) return 'Patolojik';
  }

  if (/belirgin yüksek|çok yüksek|yüksek|artmış|uzamış/.test(text)) return 'Yüksek';
  if (/pozitif|anormal|klinik olarak anlamlı|pürülan/.test(text)) return 'Patolojik';
  if (/düşük|azalmış/.test(text)) return 'Düşük';
  if (/negatif/.test(text)) return 'Negatif';
  if (/normal|referans|uygun/.test(text)) return 'Referans içinde';

  const numericValue = parseFloat(String(value).replace(',', '.').replace(/[^0-9.-]/g, ''));
  const upperRef = refText.match(/<\s*([0-9.]+)/);
  const lowerRef = refText.match(/>\s*([0-9.]+)/);
  const rangeRef = refText.match(/([0-9.]+)\s*[–-]\s*([0-9.]+)/);

  if (!Number.isNaN(numericValue) && upperRef) {
    return numericValue > parseFloat(upperRef[1]) ? 'Yüksek' : 'Referans içinde';
  }
  if (!Number.isNaN(numericValue) && lowerRef) {
    return numericValue < parseFloat(lowerRef[1]) ? 'Düşük' : 'Referans içinde';
  }
  if (!Number.isNaN(numericValue) && rangeRef) {
    const low = parseFloat(rangeRef[1]);
    const high = parseFloat(rangeRef[2]);
    if (numericValue < low) return 'Düşük';
    if (numericValue > high) return 'Yüksek';
    return 'Referans içinde';
  }

  if (/izlenmedi|saptanmadı|patoloji yok|üreme olmadı|üreme saptanmadı/.test(combined) || (/\bnegatif\b/.test(combined) && !/\bgram negatif\b/.test(combined))) return 'Negatif';
  if (/pozitif|saptandı|izlendi|görüldü|uyumlu|destekler|elevasyon|depresyon|konsolidasyon|defekt|yüksek|düşük|diplokok|basil|kitle|kalınlaşma/.test(combined)) return 'Patolojik';
  return '';
}

function sanitizeRows(rows = []) {
  return rows.map((row) => {
    const [parameter, value, reference, note] = Array.isArray(row)
      ? row
      : [row.parameter, row.value, row.reference, row.note || row.interpretation];
    const normalizedReference = String(reference || '').toLocaleLowerCase('tr');
    const cleanReference = /^(bilgi|anormal bulgu|örnek\/etken ilişkisi|referans aralığı yok|klinik değerlendirme)$/iu.test(String(reference || '').trim())
      ? '—'
      : (reference || '—');
    const cleanNote = /^(bilgi|anormal bulgu|örnek\/etken ilişkisi|referans aralığı yok|klinik değerlendirme)$/iu.test(String(note || '').trim())
      ? ''
      : note;
    return [parameter, value, cleanReference, neutralRowNote(cleanNote, parameter, value, cleanReference)];
  });
}

function normalizeInvestigation(item, clinicalCase, index = 0) {
  const id = item.id || normalizeId(item.label || `istem-${index + 1}`);
  const type = item.type || 'clinical';
  const priority = inferPriority(item, clinicalCase);
  const label = item.orderLabel || item.label || neutralModalityTitle(type, `Tetkik ${index + 1}`);
  const images = attachImages(item, clinicalCase);
  const testTypeCategory = inferOrderCategory({ ...item, id, label, type, priority }, clinicalCase);

  return {
    id,
    label,
    title: label,
    type,
    subtype: item.subtype || typeLabels[type] || 'Tetkik',
    priority,
    clinicalPriority: priority,
    category: testTypeCategory,
    testTypeCategory,
    state: 'available',
    cost: item.cost ?? (priority === 'essential' ? 0 : priority === 'useful' ? 1 : 2),
    scoreImpact: item.scoreImpact ?? item.scoreValue ?? getScoreImpact(priority),
    scoreValue: item.scoreValue ?? item.scoreImpact ?? getScoreImpact(priority),
    testValueLabel: item.testValueLabel || item.educationalValue || item.clinicalPriorityLabel || '',
    educationalValue: item.educationalValue || item.testValueLabel || item.clinicalPriorityLabel || '',
    clinicalPriorityLabel: item.clinicalPriorityLabel || item.testValueLabel || item.educationalValue || '',
    clinicalFlowOrder: item.clinicalFlowOrder ?? item.flowOrder ?? item.orderRank ?? index + 1,
    treatmentImpact: item.treatmentImpact || '',
    emergencyValue: item.emergencyValue || '',
    source: 'case',
    resultType: item.rows?.length ? 'table' : images.length ? 'image' : 'text',
    purpose: item.purpose || orderPurposeFor({ ...item, label, type, priority }, clinicalCase),
    clinicalMeaning: item.clinicalMeaning || item.result?.interpretation || '',
    result: {
      format: item.rows?.length ? 'table' : images.length ? 'image' : 'text',
      title: item.result?.title || item.label || label,
      summary: item.summary ? sanitizeSummary(item.summary, clinicalCase) : '',
      interpretation: item.clinicalMeaning || item.result?.interpretation || '',
      rows: sanitizeRows(item.result?.values || item.rows || syntheticRowsFor(item, clinicalCase)),
      images,
      caption: item.result?.caption || '',
    },
    inlineFeedback: item.inlineFeedback || getOrderFeedback({ ...item, priority }),
    rationale: item.rationale || item.explanationAfterAnswer || item.postAnswerExplanation || '',
    postAnswerExplanation: item.postAnswerExplanation || item.findings?.[0] || '',
    explanationAfterAnswer: item.explanationAfterAnswer || item.postAnswerExplanation || item.findings?.[0] || '',
  };
}

function normalizeSynthetic(item, clinicalCase, index = 0) {
  const priority = inferPriority(item, clinicalCase);
  const rows = syntheticRowsFor(item, clinicalCase);
  const images = attachImages(item, clinicalCase);
  const testTypeCategory = inferOrderCategory({ ...item, type: item.type || 'clinical', priority }, clinicalCase);

  return {
    id: item.id || normalizeId(item.label || `ek-istem-${index + 1}`),
    label: item.label,
    title: item.label,
    type: item.type || 'clinical',
    subtype: item.subtype || typeLabels[item.type || 'clinical'] || 'Tetkik',
    priority,
    clinicalPriority: priority,
    category: testTypeCategory,
    testTypeCategory,
    state: 'available',
    cost: item.cost ?? (priority === 'lowPriority' ? 2 : 1),
    scoreImpact: item.scoreImpact ?? item.scoreValue ?? getScoreImpact(priority),
    scoreValue: item.scoreValue ?? item.scoreImpact ?? getScoreImpact(priority),
    testValueLabel: item.testValueLabel || item.educationalValue || item.clinicalPriorityLabel || '',
    educationalValue: item.educationalValue || item.testValueLabel || item.clinicalPriorityLabel || '',
    clinicalPriorityLabel: item.clinicalPriorityLabel || item.testValueLabel || item.educationalValue || '',
    clinicalFlowOrder: item.clinicalFlowOrder ?? item.flowOrder ?? item.orderRank ?? index + 1,
    treatmentImpact: item.treatmentImpact || '',
    emergencyValue: item.emergencyValue || '',
    source: 'suggested',
    resultType: rows.length ? 'table' : images.length ? 'image' : 'text',
    purpose: item.purpose || orderPurposeFor({ ...item, priority }, clinicalCase),
    clinicalMeaning: item.clinicalMeaning || '',
    result: {
      format: rows.length ? 'table' : images.length ? 'image' : 'text',
      title: item.label,
      summary: '',
      interpretation: item.clinicalMeaning || '',
      rows: sanitizeRows(rows),
      images,
    },
    inlineFeedback: item.inlineFeedback || getOrderFeedback({ ...item, priority }),
    rationale: item.rationale || item.explanationAfterAnswer || item.postAnswerExplanation || '',
    postAnswerExplanation: item.postAnswerExplanation || '',
    explanationAfterAnswer: item.explanationAfterAnswer || '',
  };
}

export function buildInvestigationOrders(clinicalCase = {}) {
  const explicitSource = Array.isArray(clinicalCase.availableInvestigations)
    ? clinicalCase.availableInvestigations
    : Array.isArray(clinicalCase.investigations)
      ? clinicalCase.investigations
      : [];

  const caseItems = explicitSource
    .filter((item) => item && item.type !== 'management' && item.orderable !== false && !isNonClinicalMechanismInvestigation(item))
    .map((item, index) => normalizeInvestigation(item, clinicalCase, index));

  // KlinikIQ vaka verileri artık tetkik kararını vaka özelinde taşır. Bu nedenle
  // CBC/biyokimya/akciğer grafisi gibi genel bankalar otomatik eklenmez; yalnızca
  // eski veriyle uyumluluk için açıkça izin verilen vakalarda yedek banka kullanılır.
  const syntheticItems = clinicalCase.useSyntheticInvestigationBank === true && caseItems.length === 0
    ? [...(branchOrderBank[clinicalCase.branchId] || []), ...genericOrderBank]
      .map((item, index) => normalizeSynthetic(item, clinicalCase, index))
      .filter((item) => !hasActualCategory(item, caseItems))
    : [];

  const seen = new Set();
  const merged = [];

  [...caseItems, ...syntheticItems].forEach((item) => {
    const key = item.id || normalizeId(item.label);
    const labelKey = normalizeId(item.label);
    if (seen.has(key) || seen.has(labelKey)) return;
    seen.add(key);
    seen.add(labelKey);
    merged.push(item);
  });

  if (clinicalCase.preserveInvestigationOrder === true) {
    return merged.slice(0, 12);
  }

  const essential = merged.filter((item) => item.priority === 'essential');
  const rest = merged.filter((item) => item.priority !== 'essential');
  return [...essential, ...rest].slice(0, 12);
}

export function buildInvestigationReview(orders = [], orderedIds = []) {
  const ordered = orders.filter((item) => orderedIds.includes(item.id));
  const missingEssential = orders.filter((item) => item.priority === 'essential' && !orderedIds.includes(item.id));
  const lowPriority = ordered.filter((item) => item.priority === 'lowPriority' || item.priority === 'inappropriateEarly');
  const essentialOrdered = ordered.filter((item) => item.priority === 'essential');
  const usefulOrdered = ordered.filter((item) => item.priority === 'useful' || item.priority === 'situational');

  const situationalOrdered = ordered.filter((item) => item.priority === 'situational');
  const helperOrdered = ordered.filter((item) => item.priority === 'useful');
  const score = ordered.reduce((total, item) => total + (item.scoreImpact ?? getScoreImpact(item.priority)), 0);

  return {
    ordered,
    missingEssential,
    criticalTotal: orders.filter((item) => item.priority === 'essential').length,
    lowValue: lowPriority,
    lowPriority,
    usefulOrdered,
    helperOrdered,
    situationalOrdered,
    essentialOrdered,
    score,
    count: ordered.length,
  };
}

export function getOrderFeedback(item) {
  const priority = normalizePriority(item.priority);
  if (priority === 'essential') return `${item.label || item.title || 'Bu tetkik'} bu olguda tanı, risk veya acil yönetim açısından yüksek değerli objektif veri sağlar.`;
  if (priority === 'useful') return `${item.label || item.title || 'Bu tetkik'} ayırıcı tanı, şiddet değerlendirmesi veya tedavi güvenliği için ek veri sağlar.`;
  if (priority === 'situational') return `${item.label || item.title || 'Bu tetkik'} yalnızca seçilmiş koşullarda katkı sağlar; önce daha doğrudan klinik veriler tamamlanmalıdır.`;
  if (priority === 'lowPriority') return 'Bu istem mevcut ilk değerlendirme aşamasında ek klinik katkı sağlamaz.';
  if (priority === 'inappropriateEarly') return 'Bu istem ileri aşamada düşünülebilir; önce temel klinik veriler tamamlanmalıdır.';
  return '';
}

