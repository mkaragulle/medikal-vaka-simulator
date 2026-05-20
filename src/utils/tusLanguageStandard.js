const WEAK_TEXT_REPLACEMENTS = [
  [/\bİlk karar\b/giu, 'Öncelikli yaklaşım'],
  [/\bTedavi önceliği\b/giu, 'Tedavi basamağı'],
  [/\bLaboratuvar paterni\b/giu, 'Laboratuvar bulgusu'],
  [/\bKanıt\s*[2-4]\b/giu, 'Klinik ipucu'],
  [/\bObjektif bulguların karar basamağını desteklemesi\b/giu, 'Objektif bulguların klinik kararı desteklemesi'],
  [/\bDoğru yanıta götüren ana bulgudur\b/giu, 'seçenekler arasındaki ayrımı belirginleştirir'],
  [/\bdoğru yanıta götüren ana bulgudur\b/giu, 'seçenekler arasındaki ayrımı belirginleştirir'],
  [/\bdoğru cevabı destekleyen ana ipucudur\b/giu, 'uygun yanıtı destekleyen temel ipucudur'],
  [/\bdoğru yanıta yönelten destekleyici kanıttır\b/giu, 'klinik kararı destekleyen objektif bulgudur'],
  [/\bBu veri klinik bağlamda değerlendirilir\b/giu, 'Bu veri tek başına yorumlanmaz; öykü ve objektif bulgularla birlikte ele alınır'],
  [/\bklinik bağlamda değerlendirilir\b/giu, 'öykü ve objektif bulgularla birlikte ele alınır'],
  [/\bBeklenen ana ipuçları bu tabloda baskın değildir\b/giu, 'Bu seçenek olgudaki baskın ipuçlarını açıklamaz'],
  [/\bKarar\s+[^.]{0,90}\s+yönünde güçlenir\b/giu, 'Ayırt ettirici bulgular uygun yaklaşımı destekler'],
  [/\bAncak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır\b/giu, 'Ancak bu olgudaki ayırt ettirici bulgularla desteklenmemektedir'],
  [/\bMorfolojik patern\.\s*Morfolojik patern\.?/giu, ''],
  [/\bMorfolojik patern\s*[:：]/giu, 'Histopatolojik bulgu:'],
  [/\bkarar verdirici paternyla\b/giu, 'ayırt ettirici bulguyla'],
  [/\blikefaksiyon nekrozuyla\b/giu, 'sıvılaşma nekrozu ile'],
  [/\bkısa TUS pratiğinde ele alınır\b/giu, 'sınav odaklı olarak yorumlanır'],
  [/\bKlinik değerlendirme için ek veri\b/giu, 'Destekleyici objektif veri'],
  [/\bgündeme gelebilir\b/giu, 'düşünülebilir'],
  [/\bGündeme gelebilir\b/giu, 'Düşünülebilir'],
  [/\bhedefe yönelik yorumlanır\b/giu, 'öykü ve objektif verilerle birlikte yorumlanır'],
  [/\bObjektif karar verisi\b/giu, 'Objektif bulgu'],
  [/\bverilen öğrenme hedefi\b/giu, 'ölçülen klinik bilgi'],
  [/\byanıt ekseni\b/giu, 'klinik karar noktası'],
  [/\bNedeniyle Ameliyathane\b/giu, 'Ameliyathane izlemi'],
  [/\bwheezing\b/giu, 'hışıltılı solunum'],
  [/\binsulin\s*\+\s*glucose\b/giu, 'intravenöz insülin + glukoz'],
  [/\bwidened\s*QRS\b/giu, 'QRS genişlemesi'],
  [/\btall\s*T\s*waves?\b/giu, 'sivri T dalgaları'],
];

const TITLE_REPLACEMENTS = new Map([
  ['İlk karar', 'Öncelikli yaklaşım'],
  ['Tedavi önceliği', 'Tedavi basamağı'],
  ['Laboratuvar paterni', 'Laboratuvar bulgusu'],
  ['Kanıt 2', 'Klinik ipucu'],
  ['Kanıt 3', 'Klinik ipucu'],
  ['Kanıt 4', 'Klinik ipucu'],
]);

function compactSpaces(text = '') {
  return String(text || '')
    .replace(/\s+([,.;:!?])/gu, '$1')
    .replace(/([,;:!?])(?=\S)/gu, '$1 ')
    .replace(/\s{2,}/gu, ' ')
    .trim();
}

export function normalizeTusLanguageText(value = '') {
  let text = String(value || '');
  WEAK_TEXT_REPLACEMENTS.forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });
  text = text
    .replace(/\bhangi\s+tedavi\s+yöntemi\s+ilk\s+sırada\s+uygulanmalıdır\b/giu, 'Bu hastada uygulanması gereken öncelikli tedavi basamağı hangisidir')
    .replace(/\bBu nedenle en iyi yanıt\b/giu, 'Bu nedenle en uygun seçenek')
    .replace(/\bdoğru seçenek\b/giu, 'uygun seçenek')
    .replace(/\bDoğru seçenek\b/giu, 'Uygun seçenek')
    .replace(/\bçeldirici\b/giu, 'alternatif')
    .replace(/\bÇeldirici\b/giu, 'Alternatif')
    .replace(/\bAI\s*Spot\b/gu, 'TUS Spot')
    .replace(/\s+\.\s*/gu, '. ')
    .replace(/\s+;\s*/gu, '; ');
  return compactSpaces(text);
}

export function normalizeTusLabel(value = '') {
  const text = normalizeTusLanguageText(value);
  return TITLE_REPLACEMENTS.get(text) || text;
}

function normalizeItem(value, key = '') {
  if (typeof value === 'string') {
    if (/^(title|label|eyebrow|heading)$/iu.test(key)) return normalizeTusLabel(value);
    return normalizeTusLanguageText(value);
  }
  if (Array.isArray(value)) return value.map((item) => normalizeItem(item, key));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => [childKey, normalizeItem(childValue, childKey)]));
  }
  return value;
}

function normalizeManagementSteps(steps = []) {
  if (!Array.isArray(steps)) return steps;
  let treatmentIndex = 0;
  return steps.map((step, index) => {
    if (typeof step === 'string') return normalizeTusLanguageText(step);
    if (!step || typeof step !== 'object') return step;
    const normalized = normalizeItem(step);
    const title = normalizeTusLabel(normalized.title || '');
    if (/^Tedavi basamağı$/iu.test(title)) {
      treatmentIndex += 1;
      return { ...normalized, title: treatmentIndex > 1 ? 'Sonraki tedavi basamağı' : 'Tedavi basamağı' };
    }
    if (/^Öncelikli yaklaşım$/iu.test(title) && index > 0) return { ...normalized, title: 'Klinik karar' };
    return { ...normalized, title: title || (index === 0 ? 'Öncelikli yaklaşım' : 'Sonraki adım') };
  });
}

export function applyTusLanguageStandardToCase(caseItem = {}) {
  const normalized = normalizeItem(caseItem);
  const feedback = normalized.diagnosis?.answerFeedback;
  if (feedback) {
    const managementSteps = normalizeManagementSteps(feedback.managementSteps || feedback.management || []);
    normalized.diagnosis.answerFeedback = {
      ...feedback,
      managementSteps,
      management: normalizeManagementSteps(feedback.management || managementSteps),
    };
  }
  if (normalized.diagnosis?.pearls) normalized.diagnosis.pearls = normalizeItem(normalized.diagnosis.pearls);
  if (normalized.patientIntro?.priorityFocus && /ilk basamak.*tanıdır|tanı.*ilk basamak/iu.test(normalized.patientIntro.priorityFocus)) {
    normalized.patientIntro.priorityFocus = normalizeTusLanguageText(normalized.patientIntro.priorityFocus);
  }
  return normalized;
}

export function applyTusLanguageStandardToQuestion(question = {}) {
  return applyTusLanguageStandardToCase(question);
}

export function hasWeakTusLanguage(value = '') {
  const text = String(value || '');
  return WEAK_TEXT_REPLACEMENTS.some(([pattern]) => pattern.test(text));
}
