import { detectInvalidMeasurementFormat, sanitizeMeasurementText } from './clinicalFormatters.js';

export const EDITORIAL_SECTION_LABELS = [
  'Sınav incisi',
  'Sınav bilgisi',
  'Sınav notu',
  'TUS notu',
  'Kritik ipucu',
  'Ayırt ettirici ipucu',
  'Ayırt ettirici bulgu',
  'Ayırıcı nokta',
  'Karar verdirici ipucu',
  'Karar verdiren ipucu',
  'Destekleyici kanıt',
  'Destekleyici bulgu',
  'Ana kanıt',
  'Ana örüntü',
  'Klinik örüntü',
  'Tanısal ayrım',
  'Klinik gerekçe',
  'Klinik yaklaşım',
  'Mekanizma',
  'Mekanizma özeti',
  'Morfolojik örüntü',
  'Morfolojik örüntü',
  'İlk adım',
  'İlk yaklaşım',
  'Yönetim',
  'Olgu verisi',
  'Ek destek',
  'Risk bağlamı',
  'Başvuru yakınması',
  'Laboratuvar bulgusu',
  'Laboratuvar bulgusu',
  'Görüntüleme bulgusu',
  'Fizik muayene bulgusu',
  'Muayene bulgusu',
  'Klinik olasılığı belirle',
  'İlk tedavi',
  'TUS kırmızı bayrağı',
  'TUS tuzağı',
];

const LABEL_SOURCE = EDITORIAL_SECTION_LABELS
  .map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .join('|');

const LEADING_LABEL_PATTERN = new RegExp(`^(?:${LABEL_SOURCE})\\s*(?:[|:：\\-–—]+)\\s*`, 'iu');
const REPEATED_LABEL_BLOCK_PATTERN = new RegExp(`^(?:${LABEL_SOURCE})\\s*(?:[|:：\\-–—]+)\\s*(?:${LABEL_SOURCE})\\s*(?:[|:：\\-–—]+)\\s*`, 'iu');
const ANY_LABEL_PREFIX_PATTERN = new RegExp(`^(?:${LABEL_SOURCE})\\s*(?:[|:：\\-–—]+)\\s*`, 'iu');

const WEAK_LABEL_PATTERN = LEADING_LABEL_PATTERN;
const META_LANGUAGE_PATTERN = /(öğrenme hedefi|doğru seçenek verilen|yanıt ekseni|generator|AI spot|gömülü vaka|yüzeysel anahtar kelime|tek öğrenme hedefi|benzer seçenekleri ayıran ana örüntü|soru örüntü yorumlama becerisi|klinik bağlam içinde değerlendirilir|klinik değerlendirme için ek veri|sonuçlar tek bir tanı adını yazmaz|öğrenci bu ayrımı|verilen öğrenme hedefi|ana karar tek öğrenme hedefine|hedeflenen öğrenme çıktısı|direkt tanı adı arama|yüzeysel anahtar kelime|kısa TUS pratiğinde ele alınır|örüntü ve mekanizma birlikte yorumlanmalıdır|doğru seçenek yanıt eksenini oluşturur|öğrenci ayırt eder)/iu;
const BROKEN_ENDING_PATTERN = /(Bu nedenle en iyi yanıt\.?|Bu nedenle en uygun yanıt\.?|ile uyumludur ve\.?|tanısını\.?|örüntü tanısını\.?|dikkat çeker\.?|en iyi yanıt\.)$/iu;
const CLINICAL_CONTENT_PATTERN = /(ateş|ağrı|eritem|ödem|dispne|göğüs|karın|kusma|ishal|döküntü|senkop|travma|kanama|hipotansiyon|taşikardi|hipoksemi|muayene|vital|laboratuvar|ekg|bt|mr|usg|grafi|seroloji|kültür|pcr|troponin|lökosit|crp|bilirubin|glukoz|ph|hco3|tanı|tedavi|etken|reseptör|enzim|mutasyon|hormon|histoloji|biyopsi|belirti|bulgu|klinik|risk|hasta|çocuk|yenidoğan|kadın|erkek|menenjit|pnömoni|erizipel|kawasaki|asfiksi|antidot|ilaç|hava yolu|hışıltılı solunum|stridor|tripod|izlem|tarama)/iu;

export const TURKISH_MEDICAL_TERM_REPLACEMENTS = [
  [/\bwheezing\b/giu, 'hışıltılı solunum'],
  [/\bwheeze\b/giu, 'hışıltılı solunum'],
  [/\brash\b/giu, 'döküntü'],
  [/\btripod position\b/giu, 'tripod pozisyonu'],
  [/\bairway\b/giu, 'hava yolu'],
  [/\bsepsis workup\b/giu, 'sepsis değerlendirmesi'],
  [/\bscreening\b/giu, 'tarama'],
  [/\bfollow[- ]?up\b/giu, 'izlem'],
  [/\bmanagement\b/giu, 'yönetim'],
  [/\btrigger\b/giu, 'tetikleyici'],
  [/\bpattern\b/giu, 'örüntü'],
  [/\bcompliance\b/giu, 'uyum'],
  [/\bred flag\b/giu, 'kırmızı bayrak'],
  [/\bworkup\b/giu, 'değerlendirme'],
  [/\bErysipelas\b/giu, 'Erizipel'],
  [/\börüntüyla\b/giu, 'örüntüyle'],
  [/\börüntüsüyle\b/giu, 'örüntüsü ile'],
  [/\blikefaksiyon\s+nekrozuyla\b/giu, 'likefaksiyon nekrozu ile'],
  [/\blikefaksiyon(?!\s+nekroz)/giu, 'likefaksiyon nekrozu'],
  [/\bcoagulative necrosis\b/giu, 'koagülasyon nekrozu'],
  [/\bliquefactive necrosis\b/giu, 'likefaksiyon nekrozu'],
  [/\bcaseous necrosis\b/giu, 'kazeöz nekroz'],
  [/\bfat necrosis\b/giu, 'yağ nekrozu'],
  [/\bfibrinoid necrosis\b/giu, 'fibrinoid nekroz'],
  [/\bdokuyu sıvılaştırır\s+dikkat çeker\b/giu, 'dokunun sıvılaşmasına katkı sağlar'],
  [/\bNötrofil enzimleri dokuyu sıvılaştırır\b/giu, 'Nötrofil kaynaklı enzimler dokunun sıvılaşmasına katkı sağlar'],
  [/\bSolid organ iskemisi genelde koagülasyon nekrozu yapar\b/giu, 'Kalp, böbrek ve dalak gibi solid organ iskemilerinde genellikle koagülasyon nekrozu görülür'],
  [/\bmyocardial infarction\b/giu, 'miyokart enfarktüsü'],
  [/\bacute coronary syndrome\b/giu, 'akut koroner sendrom'],
  [/\bbronchiolitis\b/giu, 'bronşiolit'],
];

const TEMPLATE_LANGUAGE_REPLACEMENTS = [
  [/\s*Morfolojik örüntü\.\s*Morfolojik örüntü\.?/giu, '.'],
  [/\s*Morfolojik örüntü\s*[:：-]\s*/giu, ''],
  [/\s*Klinik değerlendirme için ek veri\.?/giu, ''],
  [/\s*Bu veri klinik bağlamda değerlendirilir\.?/giu, ''],
  [/\s*Patern ve mekanizma birlikte yorumlanmalıdır\.?/giu, ''],
  [/\s*Doğru seçenek yanıt eksenini oluşturur\.?/giu, ''],
  [/\s*Öğrenci ayırt eder\.?/giu, ''],
  [/\s*kısa TUS pratiğinde ele alınır\.?/giu, ''],
  [/\s*benzer seçenekleri ayıran ana örüntü olarak hatırlanmalıdır\.?/giu, '.'],
  [/\s*doğru seçenek verilen öğrenme hedefiyle uyumludur\.?/giu, '.'],
  [/\s*soru örüntü yorumlama becerisini ölçer\.?/giu, '.'],
  [/\s*klinik bağlam içinde değerlendirilir\.?/giu, '.'],
  [/\s*sonuçlar tek bir tanı adını yazmaz;?\s*/giu, ''],
  [/\s*öğrenci bu ayrımı yapmalıdır\.?/giu, '.'],
  [/\bverilen öğrenme hedefi\b/giu, 'klinik bilgi'],
  [/\bana karar tek öğrenme hedefine dayanır\b/giu, 'ana karar somut klinik bulgulara dayanır'],
  [/\bbu veri klinik olarak anlam kazanır\b/giu, 'bu bulgu tabloyu destekler'],
  [/\bmevcut tabloda yüksek tanısal değer taşır\b/giu, 'bu tabloda tanıyı destekler'],
  [/\bdoğru seçenek\b/giu, 'uygun yanıt'],
  [/\bçeldiriciler\b/giu, 'alternatifler'],
  [/\bçeldiriciyi\b/giu, 'alternatifi'],
  [/\bçeldirici\b/giu, 'alternatif'],
  [/\bAI\s*spot\b/giu, ''],
  [/\bgenerator\b/giu, ''],
];

export function replaceUnnecessaryEnglishTerms(text = '') {
  return TURKISH_MEDICAL_TERM_REPLACEMENTS.reduce(
    (value, [pattern, replacement]) => value.replace(pattern, replacement),
    String(text ?? ''),
  );
}

export function removeRepeatedSectionLabel(text = '', sectionTitle = '') {
  let value = String(text ?? '').trim();
  if (!value) return '';

  const labels = sectionTitle ? [sectionTitle, ...EDITORIAL_SECTION_LABELS] : EDITORIAL_SECTION_LABELS;
  const localSource = labels
    .filter(Boolean)
    .map((label) => String(label).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const localPrefix = new RegExp(`^(?:${localSource})\\s*(?:[|:：\\-–—]+)\\s*`, 'iu');
  const localDouble = new RegExp(`^(?:${localSource})\\s*(?:[|:：\\-–—]+)\\s*(?:${localSource})\\s*(?:[|:：\\-–—]+)\\s*`, 'iu');

  for (let i = 0; i < 4; i += 1) {
    const next = value.replace(localDouble, '').replace(localPrefix, '').replace(REPEATED_LABEL_BLOCK_PATTERN, '').replace(ANY_LABEL_PREFIX_PATTERN, '').trim();
    if (next === value) break;
    value = next;
  }
  return value;
}

export function removeUnnecessaryColonUsage(text = '') {
  let value = String(text ?? '')
    .replace(/\s*\|\s*/g, '. ')
    .replace(/\s*;\s*/g, '. ')
    .replace(/\s+[-–—]\s+(?=[A-ZÇĞİÖŞÜ])/g, '. ')
    .replace(/\s+[-–—]\s+(?=[a-zçğıöşü])/g, ' ')
    .trim();

  value = removeRepeatedSectionLabel(value);
  value = value
    .replace(/^(?:Bu nedenle\s+)?en iyi yanıt\s*[:：-]\s*/iu, '')
    .replace(/^Bu nedenle en iyi yanıt\.?\s*/iu, '')
    .replace(/^Bu nedenle en uygun yanıt\.?\s*/iu, '')
    .replace(/^([A-ZÇĞİÖŞÜ][^:]{2,48})\s*:\s*(?=(?:benzer|belirli|bu olguda|ancak|yalnız|sadece)\b)/u, '$1 ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return value;
}

export function normalizeMedicalTurkish(text = '', { sectionTitle = '' } = {}) {
  let value = sanitizeMeasurementText(String(text ?? ''));
  value = replaceUnnecessaryEnglishTerms(value);
  value = removeRepeatedSectionLabel(value, sectionTitle);
  value = TEMPLATE_LANGUAGE_REPLACEMENTS.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), value);
  value = removeUnnecessaryColonUsage(value);
  value = value
    .replace(/\b([A-ZÇĞİÖŞÜa-zçğıöşü][^.!?]{4,80})\.\s*\1\./giu, '$1.')
    .replace(/\.\s*\./g, '.')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?<!\d)\.(?=\S)/g, '. ')
    .replace(/([.!?]\s+)([a-zçğıöşü])/gu, (_, prefix, letter) => `${prefix}${letter.toLocaleUpperCase('tr')}`)
    .replace(/\.{3}|…/g, '')
    .replace(/\bTAşikardi\b/g, 'Taşikardi')
    .replace(/\bALTı\b/g, 'altı')
    .replace(/\bSağ ALT\b/g, 'Sağ alt')
    .replace(/\bSol ALT\b/g, 'Sol alt')
    .replace(/\bPH\b/g, 'pH')
    .replace(/\bSPO₂\b/g, 'SpO₂')
    .replace(/\bHCO₃⁻\b/g, 'HCO₃⁻')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return value;
}

export function normalizeEditorialText(text = '') {
  return normalizeMedicalTurkish(text);
}

export function detectBrokenSentence(text = '') {
  const value = normalizeEditorialText(text);
  if (!value) return false;
  if (BROKEN_ENDING_PATTERN.test(value)) return true;
  if (/\b(ve|ile|için|tanısını|açısından|olarak|çünkü|ancak|fakat)$/iu.test(value)) return true;
  return false;
}

export function detectExcessivePunctuation(text = '') {
  const raw = String(text ?? '');
  const value = normalizeEditorialText(text);
  const colonCount = (value.match(/:/g) || []).length;
  const semicolonCount = (raw.match(/;/g) || []).length;
  const pipeCount = (raw.match(/\|/g) || []).length;
  const dashCount = (value.match(/\s[-–—]\s/g) || []).length;
  return colonCount > 1 || semicolonCount > 0 || pipeCount > 0 || dashCount > 2 || /\.\.\.|…/u.test(raw);
}

export function detectInvalidClinicalMeasurementFormat(text = '') {
  return detectInvalidMeasurementFormat(text);
}

export function detectMetaLanguage(text = '') {
  return META_LANGUAGE_PATTERN.test(normalizeEditorialText(text));
}

export function detectTemplateLanguage(text = '') {
  const value = normalizeEditorialText(text);
  return detectMetaLanguage(value)
    || WEAK_LABEL_PATTERN.test(String(text ?? '').trim())
    || /bu olguda elenir\s*:/iu.test(value)
    || /belirli klinik koşullarda doğru olabilir/iu.test(value)
    || /olgudaki ana bulgular doğru yanıta/iu.test(value)
    || /doğru yanıt .* olmalıdır/iu.test(value)
    || /ana örüntü olarak hatırlanmalıdır/iu.test(value);
}

export function detectTemplateLikeFeedback(text = '') {
  return detectTemplateLanguage(text);
}

export function validateClinicalMeaning(text = '') {
  const value = normalizeEditorialText(text);
  if (value.length < 12) return false;
  if (detectMetaLanguage(value)) return false;
  if (detectBrokenSentence(value)) return false;
  return CLINICAL_CONTENT_PATTERN.test(value) || value.length >= 20;
}

function ensureSentence(text = '') {
  const value = normalizeEditorialText(text).replace(/[,:;\-–—\s]+$/u, '').trim();
  if (!value) return '';
  return /[.!?]$/u.test(value) ? value : `${value}.`;
}

export function repairEditorialQuality(text = '', { sectionTitle = '', correct = '', clue = '', allowFragment = false } = {}) {
  let value = normalizeMedicalTurkish(text, { sectionTitle })
    .replace(/\bBu nedenle en iyi yanıt\s+([^.;]+?)\s+seçeneğidir\.?/giu, 'Bu nedenle en uygun yanıt $1 olur.')
    .replace(/\bBu nedenle en iyi yanıt\.?/giu, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (detectMetaLanguage(value)) {
    value = TEMPLATE_LANGUAGE_REPLACEMENTS.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), value);
    value = normalizeMedicalTurkish(value, { sectionTitle });
  }

  if (!allowFragment && (detectBrokenSentence(value) || detectTemplateLanguage(value) || value.length < 12)) {
    const mainClue = clue || 'olgudaki somut bulgular';
    const answer = correct || 'en uygun yanıt';
    value = `${mainClue} klinik kararı yönlendiren ana bulgudur. Bu nedenle ${answer} diğer seçeneklere göre daha güçlü açıklama sağlar.`;
  }
  return allowFragment ? normalizeMedicalTurkish(value, { sectionTitle }) : ensureSentence(value);
}

export function repairFeedbackText(text = '', { correct = '', clue = '', sectionTitle = '' } = {}) {
  let value = repairEditorialQuality(text, { correct, clue, sectionTitle });
  if (detectBrokenSentence(value) || detectMetaLanguage(value) || value.length < 35) {
    const mainClue = clue || 'olgudaki somut bulgular';
    const answer = correct || 'en uygun yanıt';
    value = `${mainClue} klinik kararı yönlendiren ana bulgudur. Bu nedenle ${answer} diğer seçeneklere göre daha güçlü açıklama sağlar.`;
  }
  return ensureSentence(value);
}

export function validateFeedbackTextQuality(text = '', { sectionTitle = '' } = {}) {
  const normalized = normalizeMedicalTurkish(text, { sectionTitle });
  const errors = [];
  const warnings = [];
  if (!normalized || normalized.length < 12) errors.push('metin eksik veya çok kısa');
  if (detectBrokenSentence(normalized)) errors.push('yarım cümle');
  if (detectMetaLanguage(normalized)) errors.push('meta/generator dili');
  if (detectTemplateLikeFeedback(normalized)) errors.push('şablon ifade');
  if (detectInvalidClinicalMeasurementFormat(normalized)) errors.push('hatalı ölçüm formatı');
  if (detectExcessivePunctuation(text)) warnings.push('gereksiz noktalama');
  if (!validateClinicalMeaning(normalized)) warnings.push('klinik öğreticilik zayıf olabilir');
  return { ok: errors.length === 0, errors, warnings, text: normalized };
}

function collectStrings(value, output = [], key = '') {
  const technicalKeys = new Set([
    'id', 'branchId', 'caseId', 'source', 'sourceCaseId', 'seedId', 'contentSignature', 'topicSignature',
    'generationSignature', 'semanticFingerprint', 'dedupeKey', 'optionSetSignature', 'imageUrl', 'sourceUrl',
    'license', 'type', 'priority', 'score', 'aiMeta', 'metadata', 'provider', 'generator', 'schemaVersion',
    'generatedAt', 'sourceSeedId', 'sourceConceptOnly', 'conceptOriginHash', 'variantAngle', 'variantNo',
    'remoteAttempt', 'validationWarnings', 'qualityGateErrors', 'qualityGateWarnings', 'caseType', 'spotCategory',
    'originalBranchId', 'conceptOriginId', 'correctAnswer', 'icon', 'color', 'tone', 'slug', 'path', 'href',
  ]);
  if (technicalKeys.has(key)) return output;
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output, key));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([childKey, item]) => collectStrings(item, output, childKey));
  return output;
}

export function validateGeneratedCaseText(caseItem = {}) {
  const errors = [];
  const warnings = [];
  const texts = collectStrings(caseItem);
  texts.forEach((text) => {
    const preview = normalizeEditorialText(text).slice(0, 120);
    if (!preview) return;
    if (detectBrokenSentence(text)) errors.push(`yarım cümle: ${preview}`);
    if (detectMetaLanguage(text)) errors.push(`meta/generator dili: ${preview}`);
    if (detectTemplateLikeFeedback(text)) errors.push(`şablon feedback: ${preview}`);
    if (detectInvalidClinicalMeasurementFormat(text)) errors.push(`hatalı ölçüm formatı: ${preview}`);
    if (detectExcessivePunctuation(text)) warnings.push(`noktalama kontrolü: ${preview}`);
  });
  const options = caseItem?.diagnosis?.options || caseItem?.options || [];
  if (Array.isArray(options) && options.length >= 4) {
    const hyphenPairs = options.filter((option) => /\s[-–—]\s/.test(String(option))).length;
    if (hyphenPairs && hyphenPairs !== options.length) warnings.push('şık kategorileri karışık görünüyor');
  }
  const risk = caseItem?.patientIntro?.riskContext || [];
  const clues = caseItem?.patientIntro?.distinctiveClues || caseItem?.evidenceChain || [];
  if (Array.isArray(risk) && risk.length) {
    const validRiskCount = risk.filter((item) => validateClinicalMeaning(typeof item === 'string' ? item : item?.text || item?.title || '')).length;
    if (validRiskCount < Math.min(2, risk.length)) errors.push('risk bağlamı zayıf veya meta ifade içeriyor');
  }
  if (Array.isArray(clues) && clues.length) {
    const validClueCount = clues.filter((item) => validateClinicalMeaning(typeof item === 'string' ? item : item?.text || item?.title || '')).length;
    if (validClueCount < Math.min(2, clues.length)) errors.push('ayırt ettirici ipuçları zayıf veya meta ifade içeriyor');
  }
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), warnings: Array.from(new Set(warnings)) };
}
