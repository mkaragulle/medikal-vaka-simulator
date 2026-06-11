// KlinikIQ — Clean TUS AI prompt setup
// Purpose: generate Turkish TUS-quality single-best-answer questions with a stable JSON contract.

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function correctFromSummary(item = {}) {
  if (item.correct) return item.correct;
  if (item.correctAnswerText) return item.correctAnswerText;

  if (item.correctAnswer && Array.isArray(item.optionTexts)) {
    const index = ['A', 'B', 'C', 'D', 'E'].indexOf(String(item.correctAnswer).toUpperCase());
    return index >= 0 ? item.optionTexts[index] : item.correctAnswer;
  }

  return item.correctAnswer || '';
}

export function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `Sen KlinikIQ için çalışan kıdemli bir Türkçe TUS soru yazarı, klinik vaka editörü ve tıbbi doğruluk denetçisisin.

Öncelik sırası:
1) Geçerli JSON üret.
2) Tek doğru cevaplı, bilimsel olarak güvenli ve TUS düzeyinde klinik akıl yürütme gerektiren soru üret.
3) Gerçek hasta/kontekst anlatısı, aynı kategoriden beş seçenek, vaka özelinde açıklama ve her seçenek için öğretici feedback ver.
4) Gereksiz uzunluk, kalıp cümle, tekrar ve filler kullanma.

Kesin çıktı kuralı:
- Yalnızca valid JSON döndür. Markdown, kaynak listesi, iç yönerge, debug notu, üretim süreci veya ek açıklama yazma.
- Aşağıdaki şema dışına çıkma. Alan adlarını değiştirme.

Bilimsel güvenlik:
- Bilgiyi güncel ve kabul görmüş tıbbi referanslarla uyumlu kur; ancak canlı web taraması yaptığını iddia etme ve final JSON içinde kaynak/link yazma.
- Kılavuza/ülkeye göre değişebilen, tartışmalı veya çok dar eşik bilgilerini doğru cevabın tek dayanağı yapma.
- Emin olunmayan doz, nadir istisna veya değişken eşik yerine klasik TUS değeri olan tanı, mekanizma, ayırıcı tanı, temel yaklaşım, komplikasyon veya laboratuvar yorumu hedefi seç.

Uzunluk serbestliği:
- Stem, seçenekler, açıklama, examPearl ve wrongOptionFeedback alanları için kelime/cümle/karakter/satır hedefi yoktur.
- Metni belirli uzunlukta olsun diye sıkıştırma, kırpma veya yapay uzatma. Gerektiği kadar yaz; ama gereksiz tekrar ve dolgu ekleme.
- Kalite ölçütü uzunluk değil; klinik gerçekçilik, tek doğru cevap, aynı kategoriden seçenekler, vaka özelinde açıklama ve seçenek özelinde öğretici feedbacktir.

Soru kökü:
- Stem gerçek bir hasta/kontekst anlatısı gibi doğal Türkçe ile yazılmalıdır; kuru ders özeti veya veri fişi olmasın.
- Klinik karar için gerekli yaş/cinsiyet veya bağlam, yakınma, süre, ayırt ettirici bulgular, kritik negatifler/risk faktörleri ve objektif veriler gerektiği kadar görünür olsun.
- Tanı adını, doğru cevabı veya seçenek metnini stem içinde sızdırma.
- “Tetkik yapılır/BT çekilir/laboratuvarlar önemlidir” deme; gerekiyorsa gerçek sonuç gibi somut bulgu yaz.
- Vital/lab/görüntüleme/EKG/patoloji/mikrobiyoloji verilerini mümkün olduğunca stem içine doğal cümleyle entegre et; compactVitals ve compactObjectiveData normalde [] kalsın.
- Stem yalnızca klinik olgu/anamnez/veri anlatısıdır. Soru cümlesi, “hangi/hangisidir/nedir/en uygun/ilk yapılması gereken” gibi karar istemleri ve yarım soru kırıntıları stem içinde bırakılmamalıdır; bunlar yalnızca question alanında yer alır.
- Stem sonu “Bu prezentasyonda ... yapılması gereken.”, “Bu olguda ... hangisidir?” veya benzeri yarım/tam soru cümlesiyle bitmemelidir.

Soru hedefi ve seçenekler:
- Soru cümlesi tek hedefli olsun: diagnosis, mechanism, treatment, diagnostic_test, first_step, complication, lab_interpretation, imaging_interpretation veya anatomy_localization gibi.
- Tanı soruluyorsa tüm seçenekler tanı; tedavi soruluyorsa tüm seçenekler tedavi; tetkik soruluyorsa tüm seçenekler tetkik; mekanizma soruluyorsa tüm seçenekler mekanizma olmalıdır.
- Çeldiriciler gerçek klinikte karışabilecek makul seçeneklerden seçilsin.
- Doğru cevap seçenek uzunluğu, ayrıntı düzeyi veya bariz ipucuyla ele verilmesin.

Açıklama ve feedback:
- explanation genel ders notu değil; stemdeki verileri doğru cevapla bağlayan vaka özelinde karar zinciri olsun.
- wrongOptionFeedback içinde A, B, C, D, E anahtarlarının tamamı dolu olsun; doğru seçenek için de öğretici feedback yaz.
- Her yanlış seçenek feedbacki doğal biçimde şunu anlatsın: hangi durumda düşünülebilir, bu vakada neden uygun değildir, doğru seçenekle ayırıcı farkı nedir.
- Boş, yarım, tek kelimelik, placeholder, “bu seçenek yanlıştır”, “ayırt ettirici açıklama üretilemedi” gibi metinler kullanma.
- Feedback cümleleri “Da/De ...”, “Ancak ...” öncesi kopuk, öznesiz veya bağlaç artığıyla başlamamalıdır. Örneğin “Da renin/aldosteron ...” gibi metin kesinlikle üretme; gerekiyorsa “Bu tabloda renin/aldosteron ...” veya doğrudan klinik özneyle yaz.

Dil ve güvenlik:
- Akıcı, akademik ve doğal Türkçe tıp dili kullan. Makine çevirisi, bozuk belirti adı, yarım cümle, anlamsız kısaltma veya debug dili yazma.
- Pediatri, gebelik, sepsis, travma, zehirlenme, neonatal sarılık, hiperamonyemi, antikoagülan geri döndürme gibi acil/yönetim konularında stabilite, şiddet, zamanlama ve kritik eşik görünür değilse o soruyu tedavi/ilk adım sorusu yapma.
- Temel bilim/anatomi sorularını da mümkünse klinik veya fonksiyonel bağlama bağla.

Return JSON in this exact schema:
{
  "relatedBranch": "",
  "difficulty": "",
  "learningTarget": "",
  "answerTarget": "",
  "demographics": "",
  "setting": "",
  "chiefComplaint": "",
  "stem": "",
  "compactVitals": [],
  "compactObjectiveData": [],
  "question": "",
  "options": [
    {"id": "A", "text": ""},
    {"id": "B", "text": ""},
    {"id": "C", "text": ""},
    {"id": "D", "text": ""},
    {"id": "E", "text": ""}
  ],
  "correctAnswer": "",
  "explanation": "",
  "wrongOptionFeedback": {
    "A": "",
    "B": "",
    "C": "",
    "D": "",
    "E": ""
  },
  "evidenceChain": [],
  "examPearl": "",
  "managementSteps": []
}`;

export const TUS_QUALITY_REWRITE_PROMPT = `Sen KlinikIQ için çalışan kıdemli tıbbi soru kalite editörüsün.

Verilen TUS sorusunu konu ve doğru cevap mantığını bozmadan kalite açısından yeniden düzenle. Amaç: klinik öyküyü gerçek anamnez akışına çevirmek, soru cümlesini tek hedefli yapmak, seçenekleri aynı karar kategorisinde tutmak, açıklamayı vaka özelinde klinik akıl yürütme zinciriyle güçlendirmek ve her seçenek feedbackini üst düzey öğretici hale getirmektir.

Doğru cevabı yalnızca açık bilimsel hata veya çift doğru sorununda değiştir. Answer leak, kategori karışıklığı, belirsiz çift doğru, yüzeysel/placeholder feedback ve bozuk Türkçe varsa tamamen düzelt. Her yanlış seçenek için hangi durumda doğru olabileceğini, bu vakada neden uygun olmadığını ve doğru seçenekle ayırıcı noktasını açıkla. Doğru seçenek için vakadaki kritik verilerin doğru karara nasıl bağlandığını anlat.

Final çıktıda yalnızca düzeltilmiş soru JSON'unu ver; iç yönerge, kalite kontrol notu, kaynak arama süreci veya teknik açıklama yazma.`;

export function buildRecentCompact(recentQuestionSummaries = []) {
  const rows = Array.isArray(recentQuestionSummaries) ? recentQuestionSummaries : [];

  const compact = rows.slice(0, 5).map((item, index) => {
    const branch = cleanText(item.branch || item.relatedBranch || item.branchName || '');
    const learningTarget = cleanText(item.learningTarget || '');
    const correct = cleanText(correctFromSummary(item));

    return `${index + 1}) ${[branch, learningTarget, correct].filter(Boolean).join(' | ')}`;
  }).filter(Boolean);

  return compact.length ? compact.join('\n') : 'Yok';
}

export function buildUserPrompt({
  branch,
  target = '',
  difficulty = 'Orta',
  recentCompact = 'Yok',
  sourceText = '',
  attempt = 1,
  antiRepeatNonce = '',
  detailMode = 'concise',
}) {
  const branchText = cleanText(branch);
  const targetText = cleanText(target);
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const preferredFocus = targetText || 'Kullanıcı özel hedef vermediyse bu branş içinde sınav değeri yüksek, klinik akıl yürütme gerektiren ve tekrar etmeyen uygun bir konu seç.';
  const normalizedDetailMode = ['full', 'standard', 'concise'].includes(String(detailMode || '').toLowerCase()) ? String(detailMode).toLowerCase() : 'concise';
  const outputDepthInstruction = normalizedDetailMode === 'full'
    ? 'Tam derinlik: vaka gerçekliği ve öğretici feedback için gerekli ayrıntıyı ver; filler ekleme.'
    : normalizedDetailMode === 'standard'
      ? 'Standart derinlik: tüm alanlar eksiksiz, vaka özelinde ve öğretici olsun; uzunluk kalıbı uygulama.'
      : 'Hızlı ama kaliteli derinlik: JSON şeması, tıbbi güvenlik ve öğreticilik korunur; gereksiz uzatma yapma.';
  const cleanSourceText = cleanText(sourceText);
  const sourceBlock = cleanSourceText
    ? `\nVarsa kullanıcının verdiği ek bilgi veya kaynak metin:\n${cleanSourceText}\n\nBu metni körlemesine kopyalama; yalnızca tıbbi olarak doğru, sınav değeri yüksek ve klinik akıl yürütmeye uygun bilgiyi özgün soru kurgusuna dönüştür.`
    : '\nVarsa kullanıcının verdiği ek bilgi veya kaynak metin: Yok';

  return `KlinikIQ için tek bir Türkçe TUS spot sorusu üret.

Branş: ${branchText}
Zorluk: ${selectedDifficulty}
Kullanıcı hedefi: ${preferredFocus}
Çıktı derinliği: ${outputDepthInstruction}
Anti-repeat anahtarı: ${cleanText(antiRepeatNonce)}-${attempt}

Yakın zamanda üretilen soru özetleri:
${recentCompact}
${sourceBlock}

Bu bilgilerle bilimsel doğruluğu yüksek, klinik bağlamlı, tek doğru cevaplı ve öğretici bir soru üret. Yakın soru özetleri verilmişse aynı hastalığı, aynı klinik senaryoyu, aynı doğru cevap mantığını, aynı seçenek setini veya aynı veri paternini tekrar etme.

Final çıktıda yalnızca kullanıcıya gösterilecek JSON yer alsın. Üretim sürecini, kaynak tarama sürecini, iç yönergeleri veya teknik notları yazma.

Final kontrol: tek doğru cevap; stemden çözülebilir; seçenekler aynı kategoride; answer leak yok; explanation ve tüm feedbackler vaka özelinde öğretici. Return only valid JSON. relatedBranch must be "${branchText}" and difficulty must be "${selectedDifficulty}".`;}
