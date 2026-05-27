import { detectInvalidMeasurementFormat, sanitizeMeasurementText } from './clinicalFormatters.js';
const WEAK_LABEL_PATTERN = /^(Klinik olasılığı belirle|İlk tedavi|Mekanizma özeti|Mekanizma|Morfolojik patern|TUS kırmızı bayrağı|Ayırt ettirici ipucu|Ayırıcı nokta|Karar verdirici ipucu|Karar verdiren ipucu|Olgu verisi|Ek destek|Destekleyici kanıt|Laboratuvar paterni|Görüntüleme bulgusu|Fizik muayene bulgusu|Başvuru yakınması|Sınav incisi|Sınav notu|Klinik yaklaşım|Ana patern|Kanıt\s*\d+|İlk karar|Tedavi önceliği|Objektif karar verisi|Objektif bulguların karar basamağını desteklemesi)\s*[:：|\-\.]\s*/iu;
const META_LANGUAGE_PATTERN = /(öğrenme hedefi|doğru seçenek verilen|yanıt ekseni|generator|AI spot|gömülü vaka|yüzeysel anahtar kelime|tek öğrenme hedefi|çeldirici|kısa TUS pratiğinde|klinik değerlendirme için ek veri|sonuçlar tek bir tanı adını yazmaz|öğrenci ayırt eder|verilen öğrenme hedefi|patern ve mekanizma birlikte yorumlanmalıdır|beklenen ana ipuçları bu tabloda baskın değildir|karar .{0,80} yönünde güçlenir|kendi tipik öykü, muayene veya tetkik paterni|bu veri klinik bağlamda değerlendirilir|nedeniyle ameliyathane|morfolojik patern\. morfolojik patern)/iu;
const BROKEN_ENDING_PATTERN = /(Bu nedenle en iyi yanıt\.?|Bu nedenle en uygun yanıt\.?|ile uyumludur ve\.?|tanısını\.?|patern tanısını\.?|dikkat çeker\.?|en iyi yanıt\.|sağlayarak\.?|sağlar ve\.?|yaparak\.?|ederek\.?)$/iu;
const CLINICAL_CONTENT_PATTERN = /(ateş|ağrı|eritem|ödem|dispne|göğüs|karın|kusma|ishal|döküntü|senkop|travma|kanama|hipotansiyon|taşikardi|hipoksemi|muayene|vital|laboratuvar|ekg|bt|mr|usg|grafi|seroloji|kültür|pcr|troponin|lökosit|crp|bilirubin|glukoz|ph|hco3|tanı|tedavi|etken|reseptör|enzim|mutasyon|hormon|histoloji|biyopsi|belirti|bulgu|klinik|risk|hasta|çocuk|yenidoğan|kadın|erkek|menenjit|pnömoni|erizipel|kawasaki|asfiksi|antidot|ilaç|nekroz|inflamasyon|doku|organ|iskemi|apse)/iu;
const HARD_FORBIDDEN_EDITORIAL_PATTERNS = [
  /Morfolojik patern\s*[.:]\s*Morfolojik patern/iu,
  /Morfolojik patern\.\s*Morfolojik patern/iu,
  /karar verdirici paternyla/iu,
  /\bpaternyla\b/iu,
  /\blikefaksiyon nekrozuyla\b/iu,
  /\bkısa TUS pratiğinde ele alınır\b/iu,
  /\bKlinik değerlendirme için ek veri\b/iu,
  /\bObjektif karar verisi\b/iu,
  /\bSonuçlar tek bir tanı adını yazmaz\b/iu,
  /\bdoğru seçenek yanıt eksenini oluşturur\b/iu,
  /\bverilen öğrenme hedefiyle uyumludur\b/iu,
  /\böğrenci ayırt eder\b/iu,
  /\bpatern tanısını\b/iu,
  /\btanısını\.\s*$/iu,
  /\bdikkat çeker\.\s*$/iu,
  /\bBeklenen ana ipuçları bu tabloda baskın değildir\b/iu,
  /\bKarar .{0,80} yönünde güçlenir\b/iu,
  /\bAncak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır\b/iu,
  /\bLaboratuvar paterni\.?\b/iu,
  /\bKanıt\s*[2-4]\b/iu,
  /\bObjektif bulguların karar basamağını desteklemesi\b/iu,
  /\bDoğru yanıta götüren ana bulgudur\b/iu,
  /\bİlk karar\.?\b/iu,
  /\bTedavi önceliği\.?\b/iu,
  /\bBu veri klinik bağlamda değerlendirilir\b/iu,
  /\bNedeniyle Ameliyathane\b/iu,
  /\bsağlayarak\.\s*$/iu,
];

const PLACEHOLDER_INVESTIGATION_PATTERNS = [
  /klinik değerlendirme için ek veri/iu,
  /objektif bulgu klinik kararı destekler/iu,
  /objektif veri,?\s*öykü ve muayene/iu,
  /sonuç,?\s*olgudaki ana bulgularla birlikte değerlendirilir/iu,
  /vital bulgular ve muayene verileriyle birlikte yorumlanır/iu,
  /tanıyı doğrudan söylemeden klinik yorum gerektirir/iu,
  /başvuru bulgusu tanısal ayrımda önemlidir/iu,
];

function stripRepeatedSentences(text = '') {
  const value = String(text || '');
  const parts = value.split(/(?<=[.!?])\s+/u).filter(Boolean);
  const seen = new Set();
  const out = [];
  parts.forEach((part) => {
    const key = part.toLocaleLowerCase('tr').replace(/[^a-zçğıöşü0-9]+/giu, ' ').trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(part);
  });
  return out.join(' ');
}

function capitalizeAfterSentenceBoundary(text = '') {
  return String(text || '').replace(/(^|[.!?]\s+)([a-zçğıöşü])/gu, (_, prefix, letter) => `${prefix}${letter.toLocaleUpperCase('tr-TR')}`);
}

function fixMedicalTypos(text = '') {
  return String(text || '')
    .replace(/\bkarar verdirici paternyla\b/giu, 'karar verdirici paternle')
    .replace(/\bpaternyla\b/giu, 'paternle')
    .replace(/\blikefaksiyon nekrozuyla\b/giu, 'sıvılaşma nekrozu ile')
    .replace(/\blikefaksiyon nekrozu ile\b/giu, 'sıvılaşma nekrozu ile')
    .replace(/\blikefaksiyon\s+paterni\b/giu, 'sıvılaşma nekrozu paterni')
    .replace(/\bliquefactive necrosis\b/giu, 'sıvılaşma nekrozu')
    .replace(/\bcoagulative necrosis\b/giu, 'koagülasyon nekrozu')
    .replace(/\bcaseous necrosis\b/giu, 'kazeöz nekroz')
    .replace(/\bfat necrosis\b/giu, 'yağ nekrozu')
    .replace(/\bfibrinoid necrosis\b/giu, 'fibrinoid nekroz')
    .replace(/\bwheezing\b/giu, 'hışıltılı solunum')
    .replace(/\bbronchospasm\b/giu, 'bronkospazm')
    .replace(/\bhypotension\b/giu, 'hipotansiyon')
    .replace(/\bepinephrine\b/giu, 'epinefrin')
    .replace(/adrenalin\s*\(\s*epinefrin\s*\)/giu, 'adrenalin/epinefrin')
    .replace(/epinefrin\s*\(\s*adrenalin\s*\)/giu, 'adrenalin/epinefrin')
    .replace(/\b1\s*:\s*1000\b/giu, '1:1000')
    .replace(/\bairway\b/giu, 'hava yolu')
    .replace(/\bmanagement\b/giu, 'yönetim')
    .replace(/\bfollow-up\b/giu, 'izlem')
    .replace(/\bscreening\b/giu, 'tarama')
    .replace(/\brush\b/giu, 'döküntü');
}

export function stripInlineEditorialLabel(text = '') {
  return String(text || '')
    .replace(WEAK_LABEL_PATTERN, '')
    .replace(/\b(Sınav incisi|Sınav notu|Ayırıcı nokta|Karar verdirici ipucu|Destekleyici kanıt|Olgu verisi|Ek destek|Morfolojik patern|Mekanizma özeti|Mekanizma|Laboratuvar paterni|Görüntüleme bulgusu|Fizik muayene bulgusu|Başvuru yakınması)\s*[|:：-]\s*/giu, '')
    .trim();
}

export function hasRepeatedShortPhrase(text = '') {
  const value = normalizeEditorialText(text).toLocaleLowerCase('tr');
  if (!value) return false;
  if (/(morfolojik patern|sınav incisi|ayırt ettirici ipucu|klinik gerekçe|mekanizma özeti)\s*[.:]?\s*\1/iu.test(value)) return true;
  const sentences = value.split(/(?<=[.!?])\s+/u).map((part) => part.replace(/[^a-zçğıöşü0-9]+/giu, ' ').trim()).filter(Boolean);
  return sentences.some((sentence, index) => sentences.indexOf(sentence) !== index);
}

export function isPlaceholderInvestigationText(text = '') {
  const value = normalizeEditorialText(text);
  if (!value) return true;
  return PLACEHOLDER_INVESTIGATION_PATTERNS.some((pattern) => pattern.test(value));
}

export function isForbiddenEditorialText(text = '') {
  const value = normalizeEditorialText(text);
  if (!value) return false;
  return HARD_FORBIDDEN_EDITORIAL_PATTERNS.some((pattern) => pattern.test(value))
    || detectMetaLanguage(value)
    || hasRepeatedShortPhrase(value);
}

export function repairAIGeneratedText(text = '', { sectionTitle = '', fallback = '' } = {}) {
  let value = fixMedicalTypos(normalizeEditorialText(text))
    .replace(/\bMorfolojik patern\.\s*Morfolojik patern\.?/giu, '')
    .replace(/\b(Sınav incisi|Sınav notu|Ayırt ettirici ipucu|Ayırıcı nokta|Klinik gerekçe|Mekanizma özeti)\s+\1\b/giu, '$1')
    .replace(/\bkısa TUS pratiğinde ele alınır\b/giu, 'sınav odaklı olarak yorumlanır')
    .replace(/\bBeklenen ana ipuçları bu tabloda baskın değildir\b/giu, '')
    .replace(/\bKarar [^.]{0,80} yönünde güçlenir\b/giu, '')
    .replace(/\bAncak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır\b/giu, '')
    .replace(/\bObjektif bulguların karar basamağını desteklemesi\b/giu, '')
    .replace(/\bDoğru yanıta götüren ana bulgudur\b/giu, '')
    .replace(/\bİlk karar\.?\b/giu, '')
    .replace(/\bTedavi önceliği\.?\b/giu, '')
    .replace(/\bKanıt\s*[2-4]\b/giu, '')
    .replace(/\bNedeniyle Ameliyathane\b/giu, '')
    .replace(/\bKlinik değerlendirme için ek veri sağlar?\b/giu, '')
    .replace(/\bKlinik değerlendirme için ek veri\b/giu, '')
    .replace(/\bdoğru seçenek yanıt eksenini oluşturur\b/giu, 'somut bulgular doğru yanıta götürür')
    .replace(/\bverilen öğrenme hedefiyle uyumludur\b/giu, 'klinik bilgiyle uyumludur')
    .replace(/\bSonuçlar tek bir tanı adını yazmaz;?\s*/giu, '')
    .replace(/\bPatern ve mekanizma birlikte yorumlanmalıdır\b/giu, 'Bulgular mekanizma ile birlikte yorumlanır')
    .replace(/\böğrenci ayırt eder\b/giu, 'ayırıcı özellikler belirlenir')
    .replace(/\b([A-ZÇĞİÖŞÜa-zçğıöşü ]{3,42})\s*\|\s*/gu, '')
    .replace(/\s*;\s*/g, '. ')
    .replace(/\s*[:：]\s*(?=[A-ZÇĞİÖŞÜ][a-zçğıöşü])/gu, '. ')
    .replace(/\s+/g, ' ')
    .trim();
  value = stripInlineEditorialLabel(value);
  value = stripRepeatedSentences(value);
  value = value
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/(?<!\d)\.(?=\S)/g, '. ')
    .replace(/[,:;|\-–—\s]+$/u, '')
    .trim();
  if (sectionTitle && value.toLocaleLowerCase('tr').startsWith(sectionTitle.toLocaleLowerCase('tr'))) {
    value = value.slice(sectionTitle.length).replace(/^\s*[|:：-]\s*/u, '').trim();
  }
  value = capitalizeAfterSentenceBoundary(value);
  if (!value || isPlaceholderInvestigationText(value) || detectBrokenSentence(value) || value.length < 8) return fallback || '';
  return /[.!?]$/u.test(value) ? value : `${value}.`;
}


export function normalizeEditorialText(text = '') {
  return sanitizeMeasurementText(fixMedicalTypos(String(text ?? '')))
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?<!\d)\.(?=\S)/g, '. ')
    .replace(/\.{3}|…/g, '')
    .trim();
}

export function detectBrokenSentence(text = '') {
  const value = normalizeEditorialText(text);
  if (!value) return false;
  if (BROKEN_ENDING_PATTERN.test(value)) return true;
  if (/\b(ve|ile|için|tanısını|açısından|sağlayarak|yaparak|ederek)$/iu.test(value)) return true;
  return false;
}

export function detectExcessivePunctuation(text = '') {
  const value = normalizeEditorialText(text);
  const colonCount = (value.match(/:/g) || []).length;
  const semicolonCount = (value.match(/;/g) || []).length;
  const dashCount = (value.match(/\s[-–—]\s/g) || []).length;
  return colonCount > 1 || semicolonCount > 0 || dashCount > 2 || /\.\.\.|…/u.test(value);
}

export function detectInvalidClinicalMeasurementFormat(text = '') {
  return detectInvalidMeasurementFormat(text);
}

export function detectMetaLanguage(text = '') {
  return META_LANGUAGE_PATTERN.test(normalizeEditorialText(text));
}

export function detectTemplateLikeFeedback(text = '') {
  const value = normalizeEditorialText(text);
  return WEAK_LABEL_PATTERN.test(value)
    || isForbiddenEditorialText(value)
    || /bu olguda elenir\s*:/iu.test(value)
    || /belirli klinik koşullarda doğru olabilir/iu.test(value)
    || /olgudaki ana bulgular doğru yanıta/iu.test(value)
    || /doğru yanıt .* olmalıdır/iu.test(value)
    || /beklenen ana ipuçları bu tabloda baskın değildir/iu.test(value)
    || /karar .{0,80} yönünde güçlenir/iu.test(value); 
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

export function repairFeedbackText(text = '', { correct = '', clue = '' } = {}) {
  let value = repairAIGeneratedText(text)
    .replace(WEAK_LABEL_PATTERN, '')
    .replace(/\s*;\s*/g, '. ')
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s*\+\s*/g, ' ve ')
    .replace(/Erysipelas/giu, 'Erizipel')
    .replace(/\bçeldiricileri\b/giu, 'alternatifleri')
    .replace(/\bçeldiriciler\b/giu, 'alternatifler')
    .replace(/\bçeldiriciyi\b/giu, 'alternatifi')
    .replace(/\bçeldirici\b/giu, 'alternatif')
    .replace(/\böğrenme hedefi\b/giu, 'klinik bilgi')
    .replace(/\bdoğru seçenek\b/giu, 'uygun yanıt')
    .replace(/\bBu nedenle en iyi yanıt\s+[^.]+?\s+seçeneğidir\.?/giu, '')
    .replace(/\bBu nedenle en iyi yanıt\.?/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (detectBrokenSentence(value) || detectMetaLanguage(value) || value.length < 35) {
    const mainClue = clue || 'olgudaki somut bulgular';
    const answer = correct || 'en uygun yanıt';
    value = `${mainClue} klinik kararı yönlendiren ana bulgudur. Bu nedenle ${answer} diğer seçeneklere göre daha güçlü açıklama sağlar.`;
  }
  return ensureSentence(value);
}

function collectStrings(value, output = [], key = '') {
  const technicalKeys = new Set([
    'id', 'branchId', 'caseId', 'source', 'sourceCaseId', 'seedId', 'contentSignature', 'topicSignature',
    'generationSignature', 'semanticFingerprint', 'dedupeKey', 'optionSetSignature', 'imageUrl', 'sourceUrl',
    'license', 'type', 'priority', 'score', 'aiMeta', 'metadata', 'provider', 'generator', 'schemaVersion',
    'generatedAt', 'sourceSeedId', 'sourceConceptOnly', 'conceptOriginHash', 'variantAngle', 'variantNo',
    'remoteAttempt', 'validationWarnings', 'qualityGateErrors', 'qualityGateWarnings', 'caseType', 'spotCategory',
    'branchId', 'originalBranchId', 'conceptOriginId'
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
    if (isForbiddenEditorialText(text)) errors.push(`yasaklı editoryal ifade: ${preview}`);
    if (hasRepeatedShortPhrase(text)) errors.push(`tekrar eden ifade: ${preview}`);
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
