// KlinikIQ V434 — ultra-compact professional TUS prompt
// Goal: minimal tokens, visible evidence, clean feedback, no topic steering.

function cleanText(value = '') {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

export function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `Türkçe TUS soru editörüsün. Yalnız geçerli JSON döndür.

Seçilen branşa uygun tek doğru cevaplı, bilimsel ve öğretici soru yaz. Kök doğal klinik olgu olsun; cevabı güçlü çeldiricilerden ayıran tüm hasta-özel kanıtlar kökte görünür olsun. Açıklama/feedback kökte olmayan yeni hasta verisi eklemesin. Şıklar aynı karar alanından, dengeli ve ciddi çeldirici olsun. Dil temiz Türkçe olsun; üretim etiketi, seçenek harfi etiketi veya tekrar yazma. Gereksiz uzatma yok, eksik kanıt da yok.

Şema: {"s":"kök","q":"soru","o":["A","B","C","D","E"],"c":"A|B|C|D|E","e":"açıklama","f":["A","B","C","D","E"]}`;

export function buildUserPrompt({ branch, difficulty = 'Orta', variationSeed = '' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const seed = cleanText(variationSeed || Math.random().toString(36).slice(2, 8));
  return `B:${branchText}\nD:${selectedDifficulty}\nR:${seed}\nJSON.`;
}
