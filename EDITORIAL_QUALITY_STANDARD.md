# KlinikIQ Editorial Quality Standard

Bu standart, gömülü vakalar ve AI ile üretilen yeni sorular için kalıcı yazım ve kalite kontrol kuralıdır.

## 1. Genel dil standardı

- Metinler doğal Türkçe ile yazılır; yarım cümle, gereksiz iki nokta, noktalı virgül ve tire kullanımı azaltılır.
- “Karar verdirici ipucu:”, “Destekleyici kanıt:”, “İlk tedavi:” gibi otomatik görünen önekler yalnızca gerçekten okunabilirliği artırıyorsa kullanılır; varsayılan olarak doğal cümle tercih edilir.
- “Bu nedenle en iyi yanıt.”, “... açısından değerlendirilir.”, “... yorumlanmalıdır.” gibi tek başına bilgi katmayan kapanışlar kullanılmaz.
- Meta/generator dili kullanıcıya gösterilmez. “Öğrenme hedefi”, “yanıt ekseni”, “doğru seçenek verilen”, “çeldirici” gibi ifadeler kullanıcıya görünen feedback metinlerinde yer almaz.

## 2. Feedback standardı

Klinik gerekçe 2-4 cümle olmalıdır. Karar verdirici bulguyu, doğru yanıtın neden en uygun olduğunu ve yanlış seçeneğin neden elendiğini somut olgu verisiyle açıklar.

Kanıt zinciri 3-5 madde içerir. Her madde kısa bir başlık ve tek cümlelik olgu ipucundan oluşur. “Kanıt 2: yüksek” gibi boş ifadeler kullanılmaz.

Sınav notu gerçek TUS hap bilgisi taşır. Tanı, tedavi, mekanizma, kırmızı bayrak veya sık karışan ayrımı kısa biçimde öğretir.

Seçenek karşılaştırmasında her yanlış seçenek kendine özel açıklanır. Yanlış seçenek hangi durumda doğru olabileceği ve bu olguda hangi bulguyla elendiği üzerinden anlatılır.

## 3. Hasta özeti standardı

Risk bağlamı ve ayırt ettirici ipuçları alanları gerçek klinik bilgi içerir. Önekli, tekrarlı, kesilmiş veya “...” ile biten maddeler kullanılmaz.

## 4. Tetkik sonucu standardı

Tetkikler objektif veri verir. Mümkünse sayısal değer, referans aralığı ve kısa yorum içerir. Sonuç doğru tanıyı doğrudan yazmak yerine bulgu paternini gösterir.

## 5. AI kalite kapısı

AI sorusu kullanıcıya gösterilmeden önce şu kontrollerden geçer:

- `detectBrokenSentence(text)`
- `detectExcessivePunctuation(text)`
- `detectMetaLanguage(text)`
- `detectTemplateLikeFeedback(text)`
- `validateClinicalMeaning(text)`
- `repairFeedbackText(text)`
- `validateGeneratedCaseText(caseItem)`

Bu kontroller `runAIQuestionQualityGate` ve `validateAIQuestionQuality` akışına bağlanmıştır. Başarısız metin kullanıcıya gösterilmeden önce onarılır veya yeniden üretim akışına düşürülür.
