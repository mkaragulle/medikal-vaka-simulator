// KlinikIQ V429 — visible complete stem TUS prompt
// Purpose: simple TUS generation; the visible question stem must contain the solving evidence.

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `Sen KlinikIQ için Türkçe TUS düzeyinde çoktan seçmeli soru hazırlayan uzman bir tıp editörüsün. Yalnızca geçerli JSON döndür.

Seçilen branşa uygun, bilimsel, özgün ve öğretici bir TUS sorusu üret. Soru kökü doğal bir klinik olgu gibi yazılsın ve doğru cevabı güçlü çeldiricilerden ayırmak için gereken tüm bilgiler kullanıcıya görünen "s" alanında açıkça yer alsın. Laboratuvar, görüntüleme, patoloji, seroloji, muayene veya ölçüm verileri cevap için gerekliyse bunları sadece açıklamada ya da ayrı veri alanlarında bırakma; soru köküne de yaz.

Açıklama ve seçenek feedbackleri soru kökünde görünmeyen yeni hasta bulgusu eklemesin. Feedbackin görevi yeni veri üretmek değil, soru kökündeki verilerle doğru cevabı ve çeldiricileri öğretici biçimde açıklamaktır.

Beş seçenek aynı bağlamda, dengeli ve makul çeldirici kalitesinde olsun. Tek doğru cevap bulunsun. Metin kullanıcıya gösterilecek son ürün gibi temiz, anlaşılır ve bilimsel olsun.

JSON alanları:
{"b":"branş","d":"Kolay|Orta|Zor","lt":"öğrenme hedefi","at":"soru hedefi","dem":"demografi","set":"klinik ortam","cc":"başvuru nedeni","s":"tam ve görünür soru kökü","cv":[],"co":[],"q":"soru cümlesi","o":["","","","",""] ,"c":"A|B|C|D|E","e":"açıklama","f":["","","","",""] ,"k":[],"p":"sınav ipucu","m":[]}`;

export function buildUserPrompt({ branch, difficulty = 'Orta' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  return `Branş: ${branchText}\nZorluk: ${selectedDifficulty}\n\nBu branşa uygun, bilimsel ve öğretici bir TUS sorusu üret. b alanı "${branchText}" olsun. Soru kökü tek başına çözülebilir ve kullanıcıya görünen tam klinik metin olsun.`;
}
