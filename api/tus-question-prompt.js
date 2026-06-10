// KlinikIQ V438 — professional TUS prompt without content length rules
// Root fix: minimal input schema, no stem/option/feedback length forcing.

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

Seçilen branşta bilimsel, özgün ve tek doğru cevaplı TUS sorusu üret. Kök, soru hedefi, seçenekler ve açıklamalar aynı klinik mantığa bağlı olsun. Açıklamada kullandığın hasta-özel kanıtlar kökte görünsün; kökte verilmeyen yeni bulguyla cevap savunma. Seçenekler aynı kategori içinde, anlaşılır ve ciddi çeldirici olsun. Yanlış seçenek açıklaması kendi şıkkına ait olsun; başka şıkka kaymasın. Profesyonel Türkçe kullan; ham etiket, yarım cümle, tekrar ve Türkçe-İngilizce karışımı bırakma.

Şema: {"s":"soru kökü","q":"soru cümlesi","o":["A","B","C","D","E"],"c":"A|B|C|D|E","e":"açıklama","r":["A açıklaması","B açıklaması","C açıklaması","D açıklaması","E açıklaması"]}`;

export function buildUserPrompt({ branch, difficulty = 'Orta', variationSeed = '' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const seed = cleanText(variationSeed || Math.random().toString(36).slice(2, 8));
  return `B:${branchText}
D:${selectedDifficulty}
R:${seed}
JSON.`;
}
