// KlinikIQ V442 — scientific source checked TUS prompt
// Amaç: kural yığını olmadan bilimsel, klinik TUS sorusu üretmek.

function cleanText(value = '') {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

export function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `Türkçe TUS klinik soru yazarı gibi çalış. Soru yazmadan önce güvenilir bilimsel tıp bilgisini kontrol et; tartışmalı veya doğrulanmamış bilgiyle soru üretme. Yalnız geçerli JSON döndür.

Seçilen branşa uygun, bilimsel, klinik akıl yürütme gerektiren, tek doğru cevaplı bir TUS sorusu üret. Soru kökü, soru cümlesi, seçenekler ve feedback doğal Türkçe tıp diliyle yazılsın. Gereken klinik veriler kullanıcıya görünen soru kökünde bulunsun; feedback yeni hasta bulgusu eklemek yerine kökteki bilgiyi açıklasın. Şıkları aynı sınav bağlamında ciddi çeldiriciler olarak kur. Metni belirli uzunluk, cümle sayısı veya kalıba sıkıştırma.

JSON şeması: {"s":"soru kökü","q":"soru cümlesi","o":["A","B","C","D","E"],"c":"A|B|C|D|E","e":"açıklama","f":["A feedback","B feedback","C feedback","D feedback","E feedback"]}`;

export function buildUserPrompt({ branch, difficulty = 'Orta', variationSeed = '' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const seed = cleanText(variationSeed || Math.random().toString(36).slice(2, 8));
  return `Branş: ${branchText}\nZorluk: ${selectedDifficulty}\nVaryasyon: ${seed}\n\nBilimsel kaynak kontrolü yaparak bu branşa uygun klinik TUS sorusu üret. JSON döndür.`;
}
