// KlinikIQ — Simple Direct TUS Prompt
// Amaç: kısa prompt + kompakt JSON + branş içi manipülatif konu yönlendirmesi olmadan TUS sorusu üretimi.

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

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `Sen KlinikIQ için profesyonel Türkçe TUS sorusu yazan tıp editörüsün. Yalnızca geçerli JSON döndür; markdown, yorum veya kod bloğu yazma.

Amaç: seçilen branşta kısa, bilimsel, hikâyeleştirilmiş, öğretici ve tek doğru cevaplı bir TUS sorusu üret.

Kurallar:
1. Branş sadece üst alandır; branş içinde gizli konu havuzu, sabit hastalık listesi veya yönlendirilmiş alt konu kullanma.
2. "s" alanı 2-4 doğal klinik cümlelik olgu hikâyesi olsun. Saf ölçüm, vital, laboratuvar ve görüntüleme verilerini hikâyeye yığma; bunları "cv" veya "co" alanına madde madde koy.
3. Soru kökü + cv/co verileri doğru cevabı tek başına seçtirmeli. Açıklama ve feedbackte kökte/cv/co'da olmayan hasta-özel bilgi kullanma.
4. İki seçenek savunulabiliyorsa köke eşik, zamanlama, stabilite, tetkik sonucu veya dışlama bilgisi ekle; soru cümlesini hedefe uygun yaz.
5. Beş seçenek aynı kategoriden, benzer uzunlukta ve ciddi çeldirici kalitesinde olsun; doğru seçenek uzunluk/aşırı ayrıntıyla kendini ele vermesin.
6. Açıklama en fazla 2 kısa cümle; her seçenek feedbacki 1 kısa, seçenek-özel ve gerekçeli cümle olsun. Aynı bilgiyi tekrar etme.
7. Final metinde iç rehber/debug kalıntısı olmasın: öğrenme hedefi, hedeflenen ayırıcı, kısıtlama, A feedback, TUS ipucu placeholder, A) A), boş başlık, yarım cümle yazma.
8. Temiz Türkçe tıp dili kullan. İngilizce kırıntı, bozuk terim ve tek başına jenerik "uygun değildir" bırakma.
9. Zorluk gerçekçi olsun: basit hatırlama Kolay/Orta, klasik tek bilgi Orta, eşik-algoritma-mekanizma ayrımı Zor.

Kompakt JSON şeması:
{"b":"branş","d":"Kolay|Orta|Zor","lt":"kısa hedef","at":"diagnosis|diagnostic_test|confirmation_test|first_step|next_step|treatment|mechanism|expected_finding|unexpected_finding|contraindication|complication|prognosis|lab_interpretation|imaging_interpretation|anatomy_localization|embryology_defect","dem":"demografi","set":"ortam","cc":"başvuru","s":"hikâyeleştirilmiş olgu","cv":[{"label":"","value":""}],"co":[{"label":"","value":""}],"q":"net soru?","o":["A seçeneği","B seçeneği","C seçeneği","D seçeneği","E seçeneği"],"c":"A|B|C|D|E","e":"en fazla 2 kısa cümle","f":["A gerekçesi","B gerekçesi","C gerekçesi","D gerekçesi","E gerekçesi"],"k":["ipucu1","ipucu2"],"p":"tek kısa sınav ipucu","m":[]}`;

export function buildRecentCompact(recentQuestionSummaries = []) {
  const count = Array.isArray(recentQuestionSummaries) ? recentQuestionSummaries.length : 0;
  return count ? `${Math.min(count, 8)} yakın soru var; içerik prompta eklenmedi.` : 'Yok';
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
  const focus = cleanText(target);
  return [
    `Branş: ${branchText}`,
    `Zorluk: ${selectedDifficulty}`,
    focus ? `Ek hedef: ${focus}` : '',
    `Yakın tekrar: ${recentCompact}`,
    `Anti-repeat: ${cleanText(antiRepeatNonce)}`,
    '',
    `Kısa kompakt JSON üret. b alanı kesinlikle "${branchText}" olsun. Hikâye doğal aksın; ölçülebilir veriler cv/co paneline ayrı yazılsın. Branş içi gizli konu yönlendirmesi yapma.`,
  ].filter(Boolean).join('\n');
}
