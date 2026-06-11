// KlinikIQ V443 — promptless scientific TUS generation
// Aktif TUS AI talimatı bilinçli olarak tek cümleye indirildi.

function cleanText(value = '') {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

export function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

export const OPTIMIZED_TUS_SYSTEM_PROMPT = 'Bilimsel kaynakları oku ve bilimsel Türkçe TUS klinik sorusu üret.';

export function buildUserPrompt({ branch, difficulty = 'Orta' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  return `Branş: ${branchText}\nZorluk: ${selectedDifficulty}\nBilimsel kaynakları oku ve bilimsel Türkçe TUS klinik sorusu üret. JSON döndür.`;
}
