// KlinikIQ V423 — minimal TUS prompt with complete visible stem
// Purpose: no topic steering; the stem itself must contain all information needed to solve the question.

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

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `Sen KlinikIQ için Türkçe TUS sorusu yazan profesyonel bir tıp editörüsün. Yalnızca geçerli JSON döndür.

Seçilen branşa uygun, bilimsel, tek doğru cevaplı ve öğretici bir TUS sorusu üret. Soru kökü doğal bir klinik olgu gibi yazılsın; yaş, başvuru, kısa öykü, muayene ve doğru cevabı adil biçimde seçtiren kritik laboratuvar/görüntüleme/ölçüm bilgilerini görünür şekilde içersin. Çözüm için gerekli bilgi yalnızca veri panelinde kalmasın; panel kullanılsa bile karar verdirici bilgiler s alanında da anlaşılır biçimde bulunsun.

Doğru cevabı açıklarken soru kökünde bulunmayan yeni hasta verisi ekleme. İki seçenek birbirine yakınsa kökü netleştir. Beş seçenek dengeli, aynı türden ve kaliteli çeldiricilerden oluşsun. Açıklama kısa, net ve öğretici olsun; her seçenek için kısa gerekçeli feedback ver. Türkçe tıp dili temiz ve profesyonel olsun.

JSON şeması:
{"b":"branş","d":"Kolay|Orta|Zor","lt":"kısa hedef","at":"diagnosis|diagnostic_test|confirmation_test|first_step|next_step|treatment|mechanism|expected_finding|unexpected_finding|contraindication|complication|prognosis|lab_interpretation|imaging_interpretation|anatomy_localization|embryology_defect","dem":"demografi","set":"ortam","cc":"başvuru","s":"çözülebilir klinik olgu","cv":[{"label":"","value":""}],"co":[{"label":"","value":""}],"q":"soru cümlesi?","o":["A seçeneği","B seçeneği","C seçeneği","D seçeneği","E seçeneği"],"c":"A|B|C|D|E","e":"kısa açıklama","f":["A feedback","B feedback","C feedback","D feedback","E feedback"],"k":["ipucu 1","ipucu 2"],"p":"kısa sınav ipucu","m":[]}`;

export function buildUserPrompt({ branch, difficulty = 'Orta' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  return `Branş: ${branchText}\nZorluk: ${selectedDifficulty}\n\nBu branşa uygun kompakt JSON TUS sorusu üret. b alanı "${branchText}" olsun. Soru kökü tek başına çözülebilir olsun; kritik verileri yalnızca panel alanlarına bırakma.`;
}
