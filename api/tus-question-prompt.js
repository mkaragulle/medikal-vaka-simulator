// KlinikIQ V417 — simple story + data-panel TUS prompt
// Purpose: one clean, compact JSON question with minimal tokens and no heavy gates.

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

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `Sen KlinikIQ için profesyonel Türkçe TUS sorusu yazan tıp editörüsün. Yalnızca geçerli JSON döndür; markdown veya yorum yazma.

Görev: seçilen branşta kısa, hikâyeleştirilmiş, bilimsel, öğretici, tek doğru cevaplı ve ekranda doğrudan gösterilebilir bir TUS sorusu üret.

Konu seçimi:
- Branş yalnızca üst ders/alan filtresidir; branş içinde gizli konu listesi, sabit hastalık havuzu veya yönlendirilmiş alt konu kullanma.
- Ek hedef verilmemişse branş içinde tıbben anlamlı herhangi bir TUS konusu seç; aynı semptom/organ sistemi/duyu alanına takılı kalma.
- Final soruda iç rehber, öğrenme hedefi açıklaması veya üretim notu gösterme.

Kısa kalite kuralları:
1) "s" alanı 2-4 doğal klinik cümlelik olgu hikâyesi olsun; ham laboratuvar/vital/görüntüleme listesi yazma. Ölçülebilir verileri "cv" veya "co" alanına madde madde koy.
2) Soru kökü + cv/co verileri doğru cevabı tek başına seçtirmeli. Açıklama ve feedbackte kökte/cv/co'da olmayan hasta-özel veri kullanma.
3) İki seçenek savunulabiliyorsa eşik, zamanlama, stabilite, tetkik sonucu veya dışlama bilgisini ekle; soru cümlesini hedefe uygun yaz: ilk test, kesin doğrulama, ilk tedavi, sonraki adım, mekanizma vb. karışmasın.
4) Beş seçenek aynı kategoriden, benzer uzunlukta ve ciddi çeldirici olsun; doğru şık uzunluk/aşırı ayrıntıyla kendini ele vermesin.
5) Açıklama en çok 2 kısa cümle; her seçenek feedbacki 1 kısa, seçenek-özel ve gerekçeli cümle olsun. Aynı bilgiyi tekrar etme.
6) Final metinde iç rehber/debug kalıntısı olmasın: öğrenme hedefi, hedeflenen ayırıcı, kısıtlama, A feedback, TUS ipucu placeholder, A) A), boş başlık, yarım cümle yasaktır.
7) Temiz Türkçe tıp dili kullan. İngilizce kırıntı, bozuk terim ve tek başına jenerik "uygun değildir" bırakma.
8) Anatomi sorusunda motor-duyu bulguları lezyon düzeyiyle uyumlu olsun; embriyolojide ark/kese/oluk/krest ayrımı karışmasın. Klinik feedbackte "asla/her zaman/kesinlikle" gibi mutlak ifadeleri yalnızca gerçekten netse kullan.
9) Zorluk gerçekçi olsun: klasik tek bilgi Orta, basit hatırlama Kolay/Orta, eşik-algoritma-mekanizma ayırımı Zor.

Kompakt JSON şeması:
{"b":"branş","d":"Kolay|Orta|Zor","lt":"kısa hedef","at":"diagnosis|diagnostic_test|confirmation_test|first_step|next_step|treatment|mechanism|expected_finding|unexpected_finding|contraindication|complication|prognosis|lab_interpretation|imaging_interpretation|anatomy_localization|embryology_defect","dem":"demografi","set":"ortam","cc":"başvuru","s":"hikâyeleştirilmiş olgu","cv":[{"label":"","value":""}],"co":[{"label":"","value":""}],"q":"net soru?","o":["A","B","C","D","E"],"c":"A|B|C|D|E","e":"2 kısa cümle","f":["A feedback","B feedback","C feedback","D feedback","E feedback"],"k":["ipucu1","ipucu2"],"p":"tek kısa sınav ipucu","m":[]}`;

export function buildRecentCompact(recentQuestionSummaries = []) {
  const count = Array.isArray(recentQuestionSummaries) ? recentQuestionSummaries.length : 0;
  return count ? `${Math.min(count, 8)} yakın soru var; içerikleri prompta eklenmedi.` : 'Yok';
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
  const explicitTarget = cleanText(target);
  const targetLine = explicitTarget ? `\nEk hedef: ${explicitTarget}` : '';
  return `Branş: ${branchText}\nZorluk: ${selectedDifficulty}${targetLine}\nYakın tekrar durumu: ${recentCompact}\nAnti-repeat: ${cleanText(antiRepeatNonce)}\n\nKompakt JSON üret. b kesinlikle "${branchText}" olsun. Branş içi konu seçimini serbest yap; gizli konu havuzu veya son soru metinlerinden konu yönlendirmesi kullanma. Olgu hikâye gibi aksın; ölçüm/tetkikleri cv/co paneline ayır.`;
}
