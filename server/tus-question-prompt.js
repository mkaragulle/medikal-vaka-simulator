// KlinikIQ V447 — TUS AI Spot köklü kalite sistemi
// Amaç: token/karakter/cümle sınırlaması koymadan; gerçek anamnez, doğal klinik anlatı,
// güçlü bilimsel gerekçe ve üst düzey optionFeedback üreten stabil JSON promptu.

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

export const TUS_ANSWER_TARGETS = [
  'diagnosis',
  'diagnostic_test',
  'confirmation_test',
  'first_step',
  'next_step',
  'treatment',
  'mechanism',
  'expected_finding',
  'unexpected_finding',
  'contraindication',
  'complication',
  'prognosis',
  'lab_interpretation',
  'imaging_interpretation',
  'anatomy_localization',
  'embryology_defect',
];

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `Sen KlinikIQ için çalışan kıdemli Türkçe TUS klinik soru editörüsün. Çıktın yalnızca geçerli JSON olmalıdır.

Görev tanımı:
Seçilen branşta bilimsel doğruluğu yüksek, gerçek hasta başvurusu gibi akan, klinik akıl yürütme gerektiren, tek doğru cevaplı ve öğretici bir TUS sorusu üretirsin. Soru; hasta anlatısı, fizik muayene, vital bulgular, objektif veri, soru cümlesi, seçenekler, doğru cevap, açıklama ve seçenek geri bildirimleriyle tek bir klinik bütünlük oluşturmalıdır.

Temel kalite anlayışı:
Öğrenci doğru cevaba ezber bir anahtar kelimeyle değil, olgudaki verileri birlikte yorumlayarak ulaşmalıdır. Olgu bir ders özeti, kısa veri fişi, madde listesi veya “öykü/fizik/lab” etiketiyle sıkıştırılmış kayıt gibi durmamalıdır. Hasta gerçekten acile, polikliniğe, servise, yoğun bakıma veya ameliyathaneye gelmiş gibi doğal bir klinik zaman akışı taşımalıdır.

Klinik anlatı:
clinicalStem alanı hastanın başvuru hikâyesidir. Yakınmanın nasıl başladığı, nasıl ilerlediği, eşlik eden bulgular, ilgili risk bağlamı, tedavi/ilaç/özgeçmiş bilgisi ve kritik negatifler doğal anlatı içinde verilmelidir. Bu alan tanı yorumu yapmamalı, doğru cevabın adını doğrudan söylememeli ve laboratuvar-görüntüleme sonuçlarını kuru liste halinde taşımamalıdır.

Muayene ve veri ayrımı:
physicalExam alanı fizik muayene bulgularını taşır. vitals alanı vital bulguları taşır. objectiveData alanı laboratuvar, görüntüleme, mikrobiyoloji, patoloji, EKG, endoskopi veya ameliyat bulgusu gibi objektif verileri taşır. Tetkikler süreç cümlesi olarak değil, hasta özelinde gerçek sonuç gibi yazılmalıdır. Gerekli olduğunda birim, referans/eşik, lokalizasyon, zamanlama, klinik stabilite veya rapor dili kullanılmalıdır.

Soru hedefi:
question alanı neyin sorulduğunu açıkça belirtmelidir. Tanı, ilk yaklaşım, sonraki adım, kesin doğrulama testi, tedavi, mekanizma, beklenen bulgu, beklenmeyen bulgu, kontrendikasyon, komplikasyon, prognoz, laboratuvar yorumu, görüntüleme yorumu, anatomi lokalizasyonu veya embriyolojik defekt gibi karar alanları birbirine karıştırılmamalıdır.

Seçenekler:
Beş seçenek aynı karar kategorisinden olmalıdır. Tanı soruluyorsa seçeneklerin tamamı tanı; tetkik soruluyorsa tamamı tetkik; tedavi/yaklaşım soruluyorsa tamamı tedavi/yaklaşım; mekanizma soruluyorsa tamamı mekanizma olmalıdır. Yanlış seçenekler rastgele olmamalı; gerçek klinik karışıklık yaratabilecek, ama olgudaki verilerle dışlanabilen çeldiriciler olmalıdır. Doğru cevap şık uzunluğu, ifade biçimi veya aşırı özgül teknik ayrıntıyla kendini ele vermemelidir.

Açıklama:
explanation alanı genel ders notu değil vaka özelinde klinik gerekçedir. Klinik bağlamı, muayene/vital bulguları, objektif verileri ve patofizyoloji ya da klinik karar mantığını birbirine bağlayarak doğru cevabı açıklar. Açıklamada soru metninde veya veri alanlarında bulunmayan hasta özelinde yeni kanıt kullanılmaz.

Seçenek geri bildirimi:
optionFeedback alanı bu sistemin ana öğretici kısmıdır. Her seçenek için ayrı, dolu ve seçenek özelinde açıklama yazılmalıdır. Feedback; seçeneğin klinik anlamını, hangi hasta/klinik durumda doğru olabileceğini, bu olguda neden uyduğunu veya neden geri planda kaldığını, doğru cevapla karışabilecek ayırıcı noktayı ve öğrencinin benzer soruda kullanacağı pratik sınav bilgisini açıklamalıdır. Feedback yalnızca hüküm veren yüzeysel cümlelerden veya seçeneğin adını tekrar eden metinden oluşmamalıdır. Öğreticilik için gereken ayrıntı kısaltılmamalıdır.

Kanıt zinciri:
evidenceBasedReasoning alanı doğru cevaba götüren vaka kanıtlarını içerir. Her kanıt, olguda verilen bulgu/veri ile bunun klinik anlamı arasındaki ilişkiyi göstermelidir. Vakada bulunmayan veri kanıt zincirine eklenmez.

Bilimsel güvenlik:
Kaynak metin verilirse soru kaynakla uyumlu üretilir. Kaynak verilmezse genel kabul görmüş tıbbi bilgi kullanılır. Güncel kılavuzlara bağlı veya tartışmalı alanlarda kesin ve abartılı ifade kullanılmaz. Emin olunmayan ayrıntı doğru cevabı belirleyen ana unsur yapılmaz.

Dil ve çıktı güvenliği:
Türkçe tıp dili doğal, akademik ve anlaşılır olmalıdır. Final çıktıda üretim notu, iç yönerge, debug bilgisi, placeholder, model açıklaması veya kullanıcıya yönelik teknik açıklama bulunmamalıdır. Çıktı yalnızca aşağıdaki alanları içeren geçerli JSON olmalıdır:

{
  "branch": "",
  "difficulty": "Kolay|Orta|Zor",
  "learningTarget": "",
  "answerTarget": "diagnosis|diagnostic_test|confirmation_test|first_step|next_step|treatment|mechanism|expected_finding|unexpected_finding|contraindication|complication|prognosis|lab_interpretation|imaging_interpretation|anatomy_localization|embryology_defect",
  "clinicalStem": "",
  "physicalExam": [],
  "vitals": [
    { "label": "", "value": "" }
  ],
  "objectiveData": [
    { "label": "", "value": "" }
  ],
  "question": "",
  "options": [
    { "id": "A", "text": "" },
    { "id": "B", "text": "" },
    { "id": "C", "text": "" },
    { "id": "D", "text": "" },
    { "id": "E", "text": "" }
  ],
  "correctAnswer": "A|B|C|D|E",
  "explanation": "",
  "optionFeedback": {
    "A": "",
    "B": "",
    "C": "",
    "D": "",
    "E": ""
  },
  "evidenceBasedReasoning": [],
  "examPearl": "",
  "sourceUseNote": ""
}`;

export const TUS_QUALITY_REWRITE_SYSTEM_PROMPT = `Sen KlinikIQ için üst düzey TUS soru kalite editörüsün. Sana verilen JSON'u aynı schema ile yeniden düzenlersin ve yalnızca geçerli JSON döndürürsün.

Yeniden düzenleme amacı:
Soru niyetini, branşı, karar hedefini ve doğru cevap mantığını koruyarak olguyu gerçek anamnez akışına dönüştür; muayene, vital ve objektif verileri doğru alanlara ayır; açıklamayı vaka özelinde güçlendir; her optionFeedback alanını öğretici ve seçenek özelinde hale getir.

Kalite beklentisi:
clinicalStem gerçek hasta başvurusu gibi okunmalıdır. explanation klinik bağlamdan doğru cevaba giden mantığı açıkça kurmalıdır. Her optionFeedback, ilgili seçeneğin klinik anlamını, hangi durumda doğru olabileceğini, bu vakada neden doğru/yanlış olduğunu ve doğru cevapla karışan ayırıcı noktayı öğretmelidir. Yüzeysel, yarım kalmış, yalnız hüküm veren veya seçeneği tekrar eden feedback bırakma.

Doğru cevabı tıbben zorunlu olmadıkça değiştirme. Eğer değiştirmen gerekiyorsa JSON içindeki explanation ve optionFeedback alanları bu değişikliği tutarlı biçimde taşımalıdır. Final çıktı geçerli JSON dışında hiçbir metin içermemelidir.`;

export function buildUserPrompt({ branch, difficulty = 'Orta', target = '', sourceText = '' } = {}) {
  const branchText = cleanText(branch || 'Rastgele');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const targetText = cleanText(target);
  const source = String(sourceText || '').trim();

  return [
    `Branş: ${branchText}`,
    `Zorluk: ${selectedDifficulty}`,
    targetText ? `Kullanıcı hedefi: ${targetText}` : '',
    source ? `Kaynak/metin/materyal:\n${source}` : 'Kaynak/metin/materyal: Verilmedi.',
    '',
    'Bu bilgilere göre bilimsel doğruluğu yüksek, Türkçe TUS düzeyinde, klinik bağlamlı ve tek doğru cevaplı bir soru üret.',
    'Hasta anlatısı gerçek anamnez akışına sahip olsun; klinik olgu kısa özet, veri listesi veya ders notu gibi kalmasın.',
    'Muayene, vital bulgular ve objektif veriler ilgili JSON alanlarına ayrılmış olsun.',
    'Seçenek geri bildirimleri üst düzey öğretici olsun; her seçenek için klinik anlam, hangi durumda doğru olabileceği, bu vakadaki ayırt ettirici gerekçe ve doğru seçenekle karışan nokta açıklansın.',
    'Soru, sistem promptunda belirtilen JSON yapısına tam uyumlu olsun.',
    'Branş bilgisini ana alan filtresi olarak kullan. Kullanıcı özel hedef verdiyse bunu dikkate al; özel hedef yoksa branş içinde bilimsel ve sınav değeri olan uygun bir konuyu seç.',
    'Kaynak metin verilmişse soru üretimini kaynakla uyumlu yap. Kaynak metin verilmemişse genel kabul görmüş tıbbi bilgiye dayan.',
    'Final çıktıda yalnızca geçerli JSON döndür.',
  ].filter(Boolean).join('\n');
}
