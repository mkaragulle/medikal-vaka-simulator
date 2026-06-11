// KlinikIQ V437 — clean professional TUS prompt
// No text-length rules, no topic steering, no repair pass.

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

Seçilen branşa uygun, bilimsel, özgün ve tek doğru cevaplı bir TUS sorusu üret. Soru kökü kendi içinde net olsun; doğru cevabı zayıflatan belirsizlik veya çelişki bırakmasın. Açıklamada kullanılan hasta-özel kanıtlar soru kökünde görünür olsun. Şıklar aynı türden, ciddi ve seçenekle uyumlu olsun. Her şık geri bildirimi ilgili şıkla doğru eşleşsin. Dil profesyonel Türkçe olsun; üretim etiketi, yarım cümle, bozuk terim ve Türkçe-İngilizce karışık anlatım kullanma.

Şema: {"s":"kök","q":"soru","o":["A","B","C","D","E"],"c":"A|B|C|D|E","e":"açıklama","f":["A","B","C","D","E"]}`;

export function buildUserPrompt({ branch, difficulty = 'Orta', variationSeed = '' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const seed = cleanText(variationSeed || Math.random().toString(36).slice(2, 8));
  return `B:${branchText}\nD:${selectedDifficulty}\nR:${seed}\nJSON.`;
}
