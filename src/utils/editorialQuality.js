const WEAK_LABEL_PATTERN = /^(Klinik olasılığı belirle|İlk tedavi|Mekanizma|TUS kırmızı bayrağı|Ayırt ettirici ipucu|Karar verdirici ipucu|Karar verdiren ipucu|Olgu verisi|Ek destek|Destekleyici kanıt)\s*[:：-]\s*/iu;
const META_LANGUAGE_PATTERN = /(öğrenme hedefi|doğru seçenek verilen|yanıt ekseni|generator|AI spot|gömülü vaka|yüzeysel anahtar kelime|tek öğrenme hedefi|çeldirici)/iu;
const BROKEN_ENDING_PATTERN = /(Bu nedenle en iyi yanıt\.?|Bu nedenle en uygun yanıt\.?|açısından değerlendirilir\.?|ile uyumludur ve\.?|tanısını\.?|en iyi yanıt\.)$/iu;
const CLINICAL_CONTENT_PATTERN = /(ateş|ağrı|eritem|ödem|dispne|göğüs|karın|kusma|ishal|döküntü|senkop|travma|kanama|hipotansiyon|taşikardi|hipoksemi|muayene|vital|laboratuvar|ekg|bt|mr|usg|grafi|seroloji|kültür|pcr|troponin|lökosit|crp|bilirubin|glukoz|ph|hco3|tanı|tedavi|etken|reseptör|enzim|mutasyon|hormon|histoloji|biyopsi|belirti|bulgu|klinik|risk|hasta|çocuk|yenidoğan|kadın|erkek|menenjit|pnömoni|erizipel|kawasaki|asfiksi|antidot|ilaç)/iu;

export function normalizeEditorialText(text = '') {
  return String(text ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,.;:!?])(?=\S)/g, '$1 ')
    .replace(/\.{3}|…/g, '')
    .trim();
}

export function detectBrokenSentence(text = '') {
  const value = normalizeEditorialText(text);
  if (!value) return false;
  if (BROKEN_ENDING_PATTERN.test(value)) return true;
  if (/\b(ve|ile|için|tanısını|açısından)$/iu.test(value)) return true;
  return false;
}

export function detectExcessivePunctuation(text = '') {
  const value = normalizeEditorialText(text);
  const colonCount = (value.match(/:/g) || []).length;
  const semicolonCount = (value.match(/;/g) || []).length;
  const dashCount = (value.match(/\s[-–—]\s/g) || []).length;
  return colonCount > 1 || semicolonCount > 0 || dashCount > 2 || /\.\.\.|…/u.test(value);
}

export function detectMetaLanguage(text = '') {
  return META_LANGUAGE_PATTERN.test(normalizeEditorialText(text));
}

export function detectTemplateLikeFeedback(text = '') {
  const value = normalizeEditorialText(text);
  return WEAK_LABEL_PATTERN.test(value)
    || /bu olguda elenir\s*:/iu.test(value)
    || /belirli klinik koşullarda doğru olabilir/iu.test(value)
    || /olgudaki ana bulgular doğru yanıta/iu.test(value)
    || /doğru yanıt .* olmalıdır/iu.test(value);
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
  let value = normalizeEditorialText(text)
    .replace(WEAK_LABEL_PATTERN, '')
    .replace(/\s*;\s*/g, '. ')
    .replace(/\s*\/\s*/g, ' veya ')
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
  const technicalKeys = new Set(['id', 'branchId', 'caseId', 'source', 'sourceCaseId', 'seedId', 'contentSignature', 'topicSignature', 'generationSignature', 'imageUrl', 'sourceUrl', 'license', 'type', 'priority', 'score']);
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
