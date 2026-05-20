const modalityLabels = {
  ecg: 'EKG bulgusu',
  xray: 'Direkt grafi bulgusu',
  ct: 'BT bulgusu',
  mri: 'MR bulgusu',
  ultrasound: 'Ultrasonografi bulgusu',
  microscopy: 'Mikroskopi bulgusu',
  pathology: 'Patoloji bulgusu',
  clinical: 'Klinik materyal',
  endoscopy: 'Endoskopi bulgusu',
  lab: 'Laboratuvar çıktısı',
};

function escapeRegExp(value = '') {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsPhrase(text = '', phrase = '') {
  return text.toLocaleLowerCase('tr').includes(phrase.toLocaleLowerCase('tr'));
}


const diagnosticLeakTerms = [
  'stemi', 'nstemi', 'miyokard infarktüsü', 'infarktüs', 'lad', 'oklüzyon', 'pulmoner emboli', 'pnömotoraks',
  'aort diseksiyonu', 'diseksiyon', 'kardiyak tamponad', 'tamponad', 'perikardit', 'portal hipertansiyon', 'özofagus varis kanaması', 'varis kanaması',
  'pulmoner ödem', 'pankreatit', 'varis kanaması', 'demir eksikliği anemisi',
  'primer hiperparatiroidi', 'menenjit', 'apandisit', 'septik artrit', 'osteomiyelit',
  'ketoasidoz', 'dkA', 'DKA', 'tam tanı', 'tanısal', 'tanıyı destekler',
];

const neutralModalityTitles = {
  ecg: '12 derivasyon EKG',
  xray: 'Direkt grafi',
  ct: 'Bilgisayarlı tomografi',
  mri: 'Manyetik rezonans görüntüleme',
  ultrasound: 'Ultrasonografi',
  microscopy: 'Mikroskopik inceleme',
  pathology: 'Patoloji preparatı',
  clinical: 'Klinik materyal',
  endoscopy: 'Endoskopik görüntü',
  lab: 'Laboratuvar paneli',
};

export function stripDiagnosticLeakage(text = '', clinicalCase = null) {
  let cleaned = String(text || '').trim();
  if (!cleaned) return '';

  const terms = [
    clinicalCase?.diagnosis?.correct,
    ...(clinicalCase?.diagnosis?.options || []),
    ...diagnosticLeakTerms,
  ].filter(Boolean);

  terms.forEach((term) => {
    const escaped = escapeRegExp(term);
    cleaned = cleaned.replace(new RegExp(escaped, 'ig'), '').replace(/\s{2,}/g, ' ');
  });

  cleaned = cleaned
    .replace(/\s+[,.;:]/g, (match) => match.trim())
    .replace(/^[,.;:–\-\s]+/, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return cleaned;
}

export function neutralModalityTitle(modality = '', fallback = 'Tetkik materyali') {
  return neutralModalityTitles[modality] || fallback;
}

export function capitalizeFirst(text = '') {
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
}

export function normalizeInlineText(text = '') {
  return text
    .replace(/\s*[•·]\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .replace(/\s+,/g, ',')
    .trim();
}

export function toSentence(text = '') {
  const normalized = capitalizeFirst(normalizeInlineText(text).replace(/[.;]+$/, '').trim());
  if (!normalized) return '';
  return /[.!?…]$/.test(normalized) ? normalized : `${normalized}.`;
}

export function toDisplayPhrase(text = '') {
  return capitalizeFirst(normalizeInlineText(text).replace(/[.;]+$/, '').trim());
}

export function removeExactDiagnosisLead(text = '', diagnosis = '') {
  if (!text || !diagnosis) return text;

  const escaped = escapeRegExp(diagnosis);
  const startPattern = new RegExp(`^\\s*${escaped}\\s*[,;:–-]?\\s*`, 'i');
  let cleaned = text.replace(startPattern, '').trim();

  if (!cleaned) return '';

  const middlePattern = new RegExp(`\\b${escaped}\\b`, 'ig');
  cleaned = cleaned.replace(middlePattern, '').replace(/\s{2,}/g, ' ').replace(/^[,;:–-]\s*/, '').trim();
  cleaned = cleaned.replace(/^ve\s+/i, '').trim();
  cleaned = cleaned.replace(/\s+,/g, ',').replace(/\s+;/g, ';').replace(/\s+:/g, ':').trim();

  return cleaned;
}

function isGenericClinicalFocus(text = '') {
  const normalized = normalizeInlineText(String(text || '')).toLocaleLowerCase('tr');
  return !normalized
    || /hasta öyküsü,? fizik muayene ve objektif veriler birlikte değerlendirilerek en uygun klinik karar seçilir/.test(normalized)
    || /öykü,? muayene ve objektif veriler.*klinik karar/.test(normalized);
}

function neutralFocusByTarget(clinicalCase = {}) {
  const target = String(clinicalCase.answerTarget || clinicalCase.questionType || '').toLocaleLowerCase('tr');
  const branchText = String(`${clinicalCase.relatedBranch || ''} ${clinicalCase.branchId || ''}`).toLocaleLowerCase('tr');
  if (/anatomy|anatomi/.test(target) || /anatomi/.test(branchText)) return 'Muayene bulgusunu anatomik yapı ve sinir-yapı ilişkisiyle eşleştir.';
  if (/pathology|patoloji/.test(target) || /patoloji/.test(branchText)) return 'Klinik tabloyu morfolojik veya histopatolojik paternle ilişkilendir.';
  if (/pathogen|etiology|etken/.test(target)) return 'Klinik bağlam ve mikrobiyolojik ipuçlarıyla olası etkeni belirle.';
  if (/mechanism|mekanizma/.test(target)) return 'Bulguların altında yatan mekanizmayı neden-sonuç ilişkisiyle ayırt et.';
  if (/lab_interpretation|diagnostic_test|test|tetkik/.test(target)) return 'Objektif verileri doğru yorumlayarak karar verdirici bulguyu seç.';
  if (/first_step|next_step|treatment|tedavi/.test(target)) return 'Acil öncelik ve tedavi güvenliğini birlikte değerlendir.';
  if (/diagnosis|tanı/.test(target)) return 'Öykü, muayene ve objektif verilerden en olası tanıya ulaş.';
  return 'Vakadaki ayırt ettirici verileri gereksiz ayrıntıdan ayırarak karar ver.';
}

export function buildNonRevealingFocus(clinicalCase) {
  const rawFocus = clinicalCase?.clinicalFocus || '';
  const explicitSource = isGenericClinicalFocus(rawFocus) ? '' : rawFocus;
  const explicitFocus = stripDiagnosticLeakage(explicitSource, clinicalCase);
  if (explicitFocus) return toSentence(explicitFocus);

  return toSentence(neutralFocusByTarget(clinicalCase));
}

export function buildAcademicFocusSentence(clinicalCase) {
  const focus = removeExactDiagnosisLead(clinicalCase.clinicalFocus, clinicalCase.diagnosis.correct) || clinicalCase.clinicalFocus || clinicalCase.title;
  const cleaned = normalizeInlineText(focus).replace(/[.;]+$/, '');
  if (!cleaned) {
    return 'Bu olguda amaç, klinik verileri sistematik biçimde birleştirerek en olası tanıya ulaşmaktır.';
  }
  const lowered = cleaned.charAt(0).toLocaleLowerCase('tr') + cleaned.slice(1);
  return `Bu olguda odak, ${lowered} üzerine sistematik klinik yorum yapmaktır.`;
}

export function formatFindingLine(finding = '') {
  return toSentence(finding);
}

export function sanitizeImageForPreview(image, clinicalCase) {
  const title = neutralModalityTitle(image.modality, modalityLabels[image.modality] || 'Tetkik materyali');
  const rawCaption = image.caption || image.relatedFinding || '';
  const cleanedCaption = stripDiagnosticLeakage(rawCaption, clinicalCase);
  const caption = cleanedCaption || 'Görsel materyalde karar verdirici objektif bulgular aranmalıdır.';
  const alt = `${title} görseli`;

  return {
    ...image,
    // progressive disclosure: görsel başlığı tanıyı ele vermeyecek şekilde nötrleştirildi
    title: toDisplayPhrase(title),
    caption: toSentence(caption),
    alt,
    relatedFinding: toDisplayPhrase(stripDiagnosticLeakage(image.relatedFinding || '', clinicalCase) || title),
  };
}
