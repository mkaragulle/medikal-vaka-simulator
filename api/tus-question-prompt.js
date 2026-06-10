// KlinikIQ V438 — smart skeleton prompt, minimal tokens
// Root fix: small AI output + completed option reasons + tiny anti-repeat context.

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

Seçilen branşa uygun tek doğru cevaplı TUS sorusu üret. Kök temiz, kompakt ve adil olsun; doğru cevabı seçtiren kritik veri kökte görünsün. Soru hedefi net olsun: tanı, ilk test, ileri tanısal test veya acil yönetim karışmasın. Şıklar aynı türden ve dengeli olsun. Açıklama ile her şık nedeni tamamlanmış, kısa ve seçenek-özel olsun; yarım cümle, ham etiket, Türkçe-İngilizce karışımı ve tekrar yazma. X alanındaki son tanı/konuları tekrar etme.

JSON şema: {"s":"kök","q":"soru","o":["A","B","C","D","E"],"c":"A|B|C|D|E","e":"açıklama","r":["A nedeni","B nedeni","C nedeni","D nedeni","E nedeni"]}`;

export function buildUserPrompt({ branch, difficulty = 'Orta', variationSeed = '', recentCorrects = [] } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const seed = cleanText(variationSeed || Math.random().toString(36).slice(2, 8));
  const recent = Array.isArray(recentCorrects)
    ? recentCorrects.map(cleanText).filter(Boolean).slice(0, 4).join(' | ')
    : '';
  return `B:${branchText}\nD:${selectedDifficulty}\nR:${seed}${recent ? `\nX:${recent}` : ''}\nJSON.`;
}
