// KlinikIQ V437 — skeleton-first minimal TUS prompt
// Root fix: model produces the question skeleton + compact reason fragments; app composes final feedback.

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

Seçilen branşta tek doğru cevaplı, bilimsel ve özgün soru üret. Kök kompakt, temiz ve cevabı adil seçtirecek kadar bilgi içersin. Açıklamada veya nedenlerde kullanacağın hasta-özel kanıt kökte görünür olsun. Zor soruda cevabı doğrudan söyleyen ipucu yerine ayırıcı karar noktası kur. Şıklar aynı türden, kısa ve dengeli olsun. Dil profesyonel Türkçe olsun; yarım cümle, tekrar, ham etiket ve Türkçe-İngilizce karışımı yazma.

Şema: {"s":"kök","q":"soru","o":["A","B","C","D","E"],"c":"A|B|C|D|E","e":"kısa açıklama","r":["A nedeni","B nedeni","C nedeni","D nedeni","E nedeni"]}`;

export function buildUserPrompt({ branch, difficulty = 'Orta', variationSeed = '' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const seed = cleanText(variationSeed || Math.random().toString(36).slice(2, 8));
  return `B:${branchText}
D:${selectedDifficulty}
R:${seed}
JSON.`;
}
