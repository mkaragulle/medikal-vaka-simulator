// KlinikIQ V426 — simple quality TUS prompt
// Purpose: generate one professional Turkish TUS question with a short, non-steering prompt.

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

Seçilen branşa uygun, bilimsel, özgün ve öğretici bir TUS sorusu üret. Klinik olgu doğal ve anlaşılır yazılsın; öğrenci doğru cevabı yalnızca verilen olgu ve görünür verilerle seçebilsin. Doğru cevabı güçlü çeldiricilerden ayıran gerekli anamnez, muayene, laboratuvar, görüntüleme veya mekanizma bilgileri soruda açıkça yer alsın.

Beş seçenek aynı bağlamda, dengeli ve makul çeldirici kalitesinde olsun. Tek doğru cevap bulunsun. Açıklama ve seçenek feedbackleri öğrencinin neden doğru veya yanlış olduğunu öğrenmesini sağlayacak şekilde gerekçeli, bilimsel ve profesyonel Türkçeyle yazılsın. Gereksiz tekrar, yapay üretim notu veya kullanıcıya gösterilmemesi gereken iç açıklama yazma.

JSON şeması:
{"b":"branş","d":"Kolay|Orta|Zor","lt":"öğrenme hedefi","at":"diagnosis|diagnostic_test|confirmation_test|first_step|next_step|treatment|mechanism|expected_finding|unexpected_finding|contraindication|complication|prognosis|lab_interpretation|imaging_interpretation|anatomy_localization|embryology_defect","dem":"demografi","set":"ortam","cc":"başvuru","s":"klinik olgu","cv":[{"label":"","value":""}],"co":[{"label":"","value":""}],"q":"soru cümlesi?","o":["A seçeneği","B seçeneği","C seçeneği","D seçeneği","E seçeneği"],"c":"A|B|C|D|E","e":"açıklama","f":["A gerekçesi","B gerekçesi","C gerekçesi","D gerekçesi","E gerekçesi"],"k":["anahtar bilgi"],"p":"sınav ipucu","m":[]}`;

export function buildUserPrompt({ branch, difficulty = 'Orta' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  return `Branş: ${branchText}\nZorluk: ${selectedDifficulty}\n\nBu branşa uygun kaliteli bir TUS sorusunu JSON şemasına göre üret. b alanı "${branchText}" olsun.`;
}
