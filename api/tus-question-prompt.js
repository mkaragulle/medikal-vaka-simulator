// KlinikIQ V432 — ultra-compact TUS prompt
// Goal: minimal tokens, visible solvable stem, clean option feedback.

function cleanText(value = '') {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

export function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `Sen Türkçe TUS düzeyinde çoktan seçmeli soru yazan uzman tıp editörüsün. Yalnızca geçerli JSON döndür.

Seçilen branşa uygun tek bir bilimsel TUS sorusu üret. Soru kökü doğal, anlaşılır ve çözülebilir olmalı; doğru cevabı güçlü çeldiricilerden ayıran gerekli klinik, laboratuvar, görüntüleme veya mekanizma bilgileri kökte görünmelidir. Açıklama ve şık geri bildirimleri kökte olmayan yeni olgu verisi eklememelidir. Beş şık dengeli, aynı karar alanından ve kaliteli çeldirici olmalıdır. Geri bildirim öğretici, net ve tekrarsız olmalıdır.

JSON şeması:
{"s":"soru kökü","q":"soru cümlesi","o":["A","B","C","D","E"],"c":"A|B|C|D|E","e":"açıklama","f":["A geri bildirim","B geri bildirim","C geri bildirim","D geri bildirim","E geri bildirim"]}`;

export function buildUserPrompt({ branch, difficulty = 'Orta' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  return `Branş: ${branchText}\nZorluk: ${selectedDifficulty}\nTek TUS sorusu üret. JSON döndür.`;
}
