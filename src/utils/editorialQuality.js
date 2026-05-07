import { detectInvalidMeasurementFormat, sanitizeMeasurementText } from './clinicalFormatters.js';

const SECTION_LABELS = [
  'Sınav incisi', 'Sınav notu', 'Sınav bilgisi', 'TUS notu', 'TUS kırmızı bayrağı',
  'Ayırıcı nokta', 'Ayırt ettirici ipucu', 'Ayırt ettirici bulgu',
  'Klinik gerekçe', 'Kanıt zinciri', 'Yönetim', 'İlk yaklaşım', 'Mekanizma', 'İlk adım',
  'Karar verdirici ipucu', 'Karar verdiren ipucu', 'Destekleyici kanıt', 'Destekleyici bulgu',
  'Ana bulgu örüntüsü', 'Klinik bulgu örüntüsü', 'Klinik yaklaşım', 'Olgu verisi', 'Ek destek', 'Ana kanıt', 'Kritik ipucu',
];

const escapedLabels = SECTION_LABELS.map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const REPEATED_SECTION_LABEL_PATTERN = new RegExp(`^\\s*(?:${escapedLabels})\\s+(?:${escapedLabels})\\s*(?:[|:：\\-–—]+)?\\s*`, 'iu');
const SECTION_LABEL_PREFIX_PATTERN = new RegExp(`^\\s*(?:${escapedLabels})\\s*(?:[|:：\\-–—]+)\\s*`, 'iu');

const META_LANGUAGE_PATTERN = /(öğrenme hedefi|doğru seçenek verilen|yanıt ekseni|generator|gömülü vaka|yüzeysel anahtar kelime|tek öğrenme hedefi|bu soru|öğrenci bu ayrımı|bulgu yorumlama becerisi|klinik bağlam içinde değerlendirilir|sonuçlar tek bir tanı adını yazmaz|mevcut tabloda yüksek tanısal değer taşır|bu veri klinik olarak anlam kazanır)/iu;
const TEMPLATE_LANGUAGE_PATTERN = /(belirli klinik koşullarda doğru olabilir|bu olguda elenir\s*:|doğru yanıt .* olmalıdır|benzer seçenekleri ayıran ana|doğru seçenek verilen|olgudaki ana bulgular doğru yanıta|ekseninde değerlendirilmelidir)/iu;
const BROKEN_ENDING_PATTERN = /(Bu nedenle en iyi yanıt\.?|Bu nedenle en uygun yanıt\.?|açısından değerlendirilir\.?|ile uyumludur ve\.?|tanısını\.?|en iyi yanıt\.|ve|ile|için)$/iu;
const CLINICAL_CONTENT_PATTERN = /(ateş|ağrı|eritem|ödem|dispne|göğüs|karın|kusma|ishal|döküntü|senkop|travma|kanama|hipotansiyon|taşikardi|hipoksemi|muayene|vital|laboratuvar|ekg|bt|mr|usg|grafi|seroloji|kültür|pcr|troponin|lökosit|crp|bilirubin|glukoz|ph|hco3|tanı|tedavi|etken|reseptör|enzim|mutasyon|hormon|histoloji|biyopsi|belirti|bulgu|klinik|risk|hasta|çocuk|yenidoğan|kadın|erkek|menenjit|pnömoni|erizipel|kawasaki|asfiksi|antidot|ilaç|hava yolu|hışıltılı solunum|stridor|izlem|tarama)/iu;

const ENGLISH_TERM_REPLACEMENTS = [
  [/\bwheezing\b/giu, 'hışıltılı solunum'],
  [/\brash\b/giu, 'döküntü'],
  [/\bairway\b/giu, 'hava yolu'],
  [/\bsepsis\s+workup\b/giu, 'sepsis değerlendirmesi'],
  [/\bscreening\b/giu, 'tarama'],
  [/\bfollow[-\s]?up\b/giu, 'izlem'],
  [/\bmanagement\b/giu, 'yönetim'],
  [/\btrigger\b/giu, 'tetikleyici'],
  [/\bred\s+flag\b/giu, 'kırmızı bayrak'],
  [/\btripod\s+position\b/giu, 'tripod pozisyonu'],
  [/\bpattern\b/giu, 'bulgu örüntüsü'],
  [/\bErysipelas\b/giu, 'Erizipel'],
];

function ensureSentence(text = '') {
  const value = String(text || '').replace(/[,:;|\-–—\s]+$/u, '').trim();
  if (!value) return '';
  return /[.!?]$/u.test(value) ? value : `${value}.`;
}

function capitalizeAfterPeriod(text = '') {
  return String(text || '').replace(/([.!?])\s+([a-zçğıöşü])/gu, (_, punct, letter) => `${punct} ${letter.toLocaleUpperCase('tr')}`);
}

export function normalizeEditorialText(text = '') {
  return sanitizeMeasurementText(String(text ?? ''))
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?<!\d)\.(?=\S)/g, '. ')
    .replace(/\.{3}|…/g, '')
    .trim();
}

export function removeRepeatedSectionLabel(text = '', sectionTitle = '') {
  let value = normalizeEditorialText(text);
  const explicitTitle = String(sectionTitle || '').trim();
  if (explicitTitle) {
    const escaped = explicitTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    value = value.replace(new RegExp(`^\\s*${escaped}\\s*(?:[|:：\\-–—]+)\\s*`, 'iu'), '');
  }
  let changed = true;
  while (changed) {
    const before = value;
    value = value.replace(REPEATED_SECTION_LABEL_PATTERN, '').replace(SECTION_LABEL_PREFIX_PATTERN, '');
    changed = before !== value;
  }
  return value.trim();
}

export function removeUnnecessaryColonUsage(text = '') {
  return normalizeEditorialText(text)
    .replace(SECTION_LABEL_PREFIX_PATTERN, '')
    .replace(/\s*;\s*/g, '. ')
    .replace(/\s*\|\s*/g, '. ')
    .replace(/\s[-–—]\s/g, '. ')
    .trim();
}

export function replaceUnnecessaryEnglishTerms(text = '') {
  let value = String(text || '');
  ENGLISH_TERM_REPLACEMENTS.forEach(([regex, replacement]) => { value = value.replace(regex, replacement); });
  return value;
}

export function normalizeMedicalTurkish(text = '') {
  let value = replaceUnnecessaryEnglishTerms(text);
  value = removeRepeatedSectionLabel(value);
  value = removeUnnecessaryColonUsage(value)
    .replace(/\bklinik bulgu örüntüsü\b/giu, 'klinik tablo')
    .replace(/\bpaternlerinden\b/giu, 'bulgu örüntülerinden')
    .replace(/\bpaterniyle\b/giu, 'bulgu örüntüsüyle')
    .replace(/\bpaterni\b/giu, 'bulgu örüntüsü')
    .replace(/\bpatern\b/giu, 'bulgu örüntüsü')
    .replace(/\bçeldiriciler\b/giu, 'yanlış seçenekler')
    .replace(/\bçeldiriciyi\b/giu, 'yanlış seçeneği')
    .replace(/\bçeldirici\b/giu, 'yanlış seçenek')
    .replace(/\bverilen öğrenme hedefi\b/giu, 'bu klinik bilgi')
    .replace(/\böğrenme hedefi\b/giu, 'klinik bilgi')
    .replace(/\bdoğru seçenek\b/giu, 'uygun yanıt')
    .replace(/\byanıt ekseni\b/giu, 'klinik karar')
    .replace(/\bklinik bağlam içinde değerlendirilir\b/giu, 'öykü ve muayene bulgularıyla birlikte değerlendirilir')
    .replace(/\bsonuçlar tek bir tanı adını yazmaz\b/giu, 'sonuçlar öykü ve muayene ile birlikte yorumlanır')
    .replace(/\bbenzer seçenekleri ayıran ana bulgu örüntüsü olarak hatırlanmalıdır\b/giu, 'ayırıcı tanıda önemlidir')
    .replace(/\bBu nedenle en iyi yanıt\.?\s*/giu, '')
    .replace(/\bBu nedenle en uygun yanıt\.?\s*/giu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  value = capitalizeAfterPeriod(value);
  return value;
}

export function detectBrokenSentence(text = '') {
  const value = normalizeEditorialText(text);
  if (!value) return false;
  return BROKEN_ENDING_PATTERN.test(value);
}

export function detectExcessivePunctuation(text = '') {
  const value = normalizeEditorialText(text);
  const colonCount = (value.match(/:/g) || []).length;
  const semicolonCount = (value.match(/;/g) || []).length;
  const pipeCount = (value.match(/\|/g) || []).length;
  const dashCount = (value.match(/\s[-–—]\s/g) || []).length;
  return colonCount > 2 || semicolonCount > 0 || pipeCount > 0 || dashCount > 1 || /\.\.\.|…/u.test(value) || SECTION_LABEL_PREFIX_PATTERN.test(value);
}

export function detectInvalidClinicalMeasurementFormat(text = '') {
  return detectInvalidMeasurementFormat(text);
}

export function detectMetaLanguage(text = '') {
  return META_LANGUAGE_PATTERN.test(normalizeEditorialText(text));
}

export function detectTemplateLanguage(text = '') {
  return TEMPLATE_LANGUAGE_PATTERN.test(normalizeEditorialText(text));
}

export function detectTemplateLikeFeedback(text = '') {
  const value = normalizeEditorialText(text);
  return SECTION_LABEL_PREFIX_PATTERN.test(value) || detectTemplateLanguage(value);
}

export function validateClinicalMeaning(text = '') {
  const value = normalizeMedicalTurkish(text);
  if (value.length < 12) return false;
  if (detectMetaLanguage(value)) return false;
  if (detectBrokenSentence(value)) return false;
  return CLINICAL_CONTENT_PATTERN.test(value) || value.length >= 24;
}

export function repairEditorialQuality(text = '', context = {}) {
  let value = normalizeMedicalTurkish(text);
  value = value
    .replace(/\bKrup genellikle havlar tarzda öksürük ve daha yavaş başlangıç gösterir ayırıcı tanıda önemlidir\.?/giu, 'Krup genellikle havlar tarzda öksürük, ses kısıklığı ve daha yavaş başlangıçla seyreder. Epiglottitte toksik görünüm, yüksek ateş, salya akması ve tripod pozisyonu daha belirgindir.')
    .replace(/\bEpiglottitte ajitasyon ve gereksiz manipülasyon obstrüksiyonu artırabilir\.?/giu, 'Epiglottitte boğaz muayenesi için gereksiz manipülasyon yapılması hava yolu obstrüksiyonunu artırabilir. Öncelik hava yolunu güvenceye almaktır.')
    .replace(/\bEpiglottitte ajitasyon ve gereksiz orofarengeal manipülasyon obstrüksiyonu artırabilir\.?/giu, 'Epiglottitte ajitasyon ve gereksiz orofarengeal manipülasyon hava yolu obstrüksiyonunu artırabilir.')
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (detectBrokenSentence(value) || detectMetaLanguage(value) || detectTemplateLanguage(value) || value.length < 20) {
    const clue = context.clue || 'olgudaki somut bulgular';
    const correct = context.correct || 'en uygun yanıt';
    value = `${clue} klinik kararı yönlendiren ana bulgudur. Bu nedenle ${correct} diğer seçeneklere göre daha güçlü açıklama sağlar.`;
  }
  return ensureSentence(value);
}

export function repairFeedbackText(text = '', { correct = '', clue = '' } = {}) {
  return repairEditorialQuality(text, { correct, clue });
}

function collectStrings(value, output = [], key = '') {
  const technicalKeys = new Set([
    'id', 'branchId', 'caseId', 'source', 'sourceCaseId', 'seedId', 'contentSignature', 'topicSignature',
    'generationSignature', 'semanticFingerprint', 'dedupeKey', 'optionSetSignature', 'imageUrl', 'sourceUrl',
    'license', 'type', 'priority', 'score', 'aiMeta', 'metadata', 'provider', 'generator', 'schemaVersion',
    'generatedAt', 'sourceSeedId', 'sourceConceptOnly', 'conceptOriginHash', 'variantAngle', 'variantNo',
    'remoteAttempt', 'validationWarnings', 'qualityGateErrors', 'qualityGateWarnings', 'caseType', 'spotCategory',
    'originalBranchId', 'conceptOriginId', 'correctAnswer'
  ]);
  if (technicalKeys.has(key)) return output;
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output, key));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([childKey, item]) => collectStrings(item, output, childKey));
  return output;
}

export function validateFeedbackTextQuality(text = '') {
  const errors = [];
  const warnings = [];
  const value = normalizeEditorialText(text);
  if (detectBrokenSentence(value)) errors.push('yarım cümle');
  if (detectMetaLanguage(value)) errors.push('meta veya generator dili');
  if (detectTemplateLikeFeedback(value)) errors.push('şablon başlık veya zayıf feedback dili');
  if (/\bwheezing\b|\brash\b|\bairway\b|\bmanagement\b|\bscreening\b|\bfollow[-\s]?up\b|\bpattern\b/iu.test(value)) errors.push('gereksiz İngilizce terim');
  if (detectInvalidClinicalMeasurementFormat(value)) errors.push('hatalı ölçüm formatı');
  if (detectExcessivePunctuation(value)) warnings.push('noktalama sadeleştirilmeli');
  return { ok: errors.length === 0, errors, warnings };
}

export function validateGeneratedCaseText(caseItem = {}) {
  const errors = [];
  const warnings = [];
  const texts = collectStrings(caseItem);
  texts.forEach((text) => {
    const preview = normalizeEditorialText(text).slice(0, 120);
    if (!preview) return;
    const result = validateFeedbackTextQuality(text);
    result.errors.forEach((error) => errors.push(`${error}: ${preview}`));
    result.warnings.forEach((warning) => warnings.push(`${warning}: ${preview}`));
  });
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
