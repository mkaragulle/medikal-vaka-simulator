// KlinikIQ V436 — professional minimal TUS prompt
// Minimal input/output tokens; no topic steering, no repair pass.

function cleanText(value = '') {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

export function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `Türkçe TUS editörüsün. Yalnız geçerli JSON döndür.

Seçilen branşta tek doğru cevaplı, bilimsel ve özgün soru üret. Kök temiz, kompakt ve çözüm için yeterli olsun; açıklamada kullanacağın hasta-özel kanıt kökte görünür olsun. Zor soruda cevabı doğrudan ele veren aşırı ipucu yerine ayırıcı karar noktası kur. Şıklar aynı türden ve dengeli olsun. Açıklama ve her şık feedbacki kısa, net, seçenekle doğru eşleşmiş ve profesyonel Türkçe olsun. Yarım cümle, tekrar, üretim etiketi, Türkçe-İngilizce karışık dil yazma.

Şema: {"s":"kök","q":"soru","o":["A","B","C","D","E"],"c":"A|B|C|D|E","e":"açıklama","f":["A","B","C","D","E"]}`;

export function buildUserPrompt({ branch, difficulty = 'Orta', variationSeed = '' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const seed = cleanText(variationSeed || Math.random().toString(36).slice(2, 8));
  return `B:${branchText}\nD:${selectedDifficulty}\nR:${seed}\nJSON.`;
}
