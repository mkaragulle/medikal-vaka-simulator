// KlinikIQ V411 — simple, low-token TUS prompt
// One job: produce a professional Turkish TUS-style single-best-answer question.

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

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `Sen KlinikIQ için profesyonel Türkçe TUS sorusu yazan bir tıp editörüsün. Yalnızca geçerli JSON döndür; markdown yazma.

Amaç: kısa, bilimsel, öğretici, tek doğru cevaplı TUS sorusu üretmek.

Kurallar:
- Soru kökü tek başına doğru cevabı seçtirmeli; açıklama/feedback kökte veya veri panelinde olmayan hasta-özel bilgi eklememeli.
- İki seçenek savunulabiliyorsa köke ayırt ettirici eşik, zamanlama, stabilite, tetkik veya dışlama bilgisi ekle.
- Beş seçenek aynı kategoriden, benzer uzunlukta ve ciddi çeldirici olsun; doğru şık uzunlukla ele vermesin.
- Açıklama 2 kısa cümle; her şık feedbacki 1 kısa, seçenek-özel öğretici cümle olsun.
- Zorluk gerçekçi olsun: klasik bilgi Orta, algoritma/eşik/mekanizma ayrımı Zor.
- Temiz Türkçe tıp dili kullan; İngilizce kırıntı, bozuk terim ve jenerik “uygun değildir” feedbacki bırakma.

Kompakt şema kullan:
{"b":"branş","d":"Kolay|Orta|Zor","lt":"öğrenme hedefi","at":"diagnosis|diagnostic_test|confirmation_test|first_step|next_step|treatment|mechanism|expected_finding|unexpected_finding|contraindication|complication|prognosis|lab_interpretation|imaging_interpretation|anatomy_localization|embryology_defect","dem":"demografi","set":"ortam","cc":"başvuru","s":"3-5 cümlelik soru kökü","cv":[{"label":"","value":""}],"co":[{"label":"","value":""}],"q":"soru cümlesi?","o":["A seçeneği","B seçeneği","C seçeneği","D seçeneği","E seçeneği"],"c":"A|B|C|D|E","e":"kısa açıklama","f":["A feedback","B feedback","C feedback","D feedback","E feedback"],"k":["ipucu1","ipucu2","ipucu3"],"p":"TUS ipucu","m":[]}`;

export function buildRecentCompact(recentQuestionSummaries = []) {
  const rows = Array.isArray(recentQuestionSummaries) ? recentQuestionSummaries : [];
  const compact = rows.slice(0, 3).map((item, index) => {
    const target = cleanText(item.learningTarget || item.answerTarget || '').slice(0, 42);
    const correct = cleanText(item.correctAnswerText || item.correct || item.correctAnswer || '').slice(0, 38);
    return `${index + 1}) ${[target, correct].filter(Boolean).join(' / ')}`;
  }).filter(Boolean);
  return compact.length ? compact.join('; ') : 'Yok';
}

export function buildUserPrompt({
  branch,
  target = '',
  difficulty = 'Orta',
  recentCompact = 'Yok',
  antiRepeatNonce = '',
} = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const focus = cleanText(target) || 'Branşa uygun, son sorulardan farklı bir TUS odağı seç.';
  return `Branş: ${branchText}\nZorluk isteği: ${selectedDifficulty}\nOdak: ${focus}\nSon tekrarlar: ${recentCompact}\nAnti-repeat: ${cleanText(antiRepeatNonce)}\nTek kompakt JSON üret. b="${branchText}" olsun.`;
}
