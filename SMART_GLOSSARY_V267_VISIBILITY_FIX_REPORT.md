# KlinikIQ V267 Smart Glossary Visibility Fix Report

## Problem
V266 içinde glossary veri tabanı yükleniyordu ve 814 ana terim mevcuttu; ancak arayüzde birçok bilimsel/terminolojik kavram görünür şekilde işaretlenmiyordu. İncelemede iki ana sebep bulundu:

1. **Türkçe ekli kullanımlar yakalanmıyordu.** Eski matcher yalnızca çıplak terimi yakalıyordu. Örneğin `hiperkalemi` yakalanırken `hiperkalemide`, `hiperkaleminin`, `tüberkülozda`, `QRS genişlemesinde` gibi gerçek metin kullanımları kaçıyordu.
2. **Geç dönem CSS reset katmanları terim görünürlüğünü fazla zayıflatıyordu.** Bazı kartlarda glossary terimleri düz metin gibi görünüyor, arayüzde fark edilmiyordu.

## Yapılan düzeltmeler

### 1. Türkçe suffix-aware term matching
`src/components/GlossaryTooltip.jsx` içinde matcher güçlendirildi. Artık şu tip ekli kullanımlar da ana terime bağlanır:

- hiperkalemide → Hiperkalemi
- hiperkaleminin → Hiperkalemi
- tüberkülozda → Tüberküloz
- QRS genişlemesinde → QRS genişlemesi
- kalsiyum glukonatın → Kalsiyum glukonat
- desmopressinle → Desmopressin

Bu işlem rastgele kelime yakalamayacak şekilde yalnızca olası Türkçe çekim/hal/iyelik ekleriyle sınırlandırıldı.

### 2. Glossary görünürlük stili güçlendirildi
`src/index.css` sonuna V267 görünürlük katmanı eklendi. Terimler artık küçük, premium, dotted underline + hafif alt vurguyla fark edilir hale getirildi. Pre-answer modda hâlâ daha nötr ve düşük sızıntı riskli görünüm korunur.

### 3. Pre-answer/post-answer güvenliği korundu
Bu düzeltme sadece eşleşme ve görünürlük katmanını değiştirir. Cevap verilmeden önce TUS ipucu / ayırıcı not hâlâ gösterilmez; yalnızca nötr terminolojik açıklama görünür.

### 4. Hard mode korunuyor
`data-hard-mode="true"` alanlarında glossary görsel vurgusu ve tıklanabilirlik kapalı kalır.

## Değiştirilen dosyalar

- `src/components/GlossaryTooltip.jsx`
- `src/index.css`
- `SMART_GLOSSARY_V267_VISIBILITY_FIX_REPORT.md`

## Test edilmesi gereken ekranlar

1. Klinik Branş Seç → standart vaka olgu ekranı
2. TUS Spot Olgular soru kökü ve seçenekler
3. Cevap sonrası feedback / kanıt zinciri / sınav notu
4. Hap kart ön ve arka yüzleri
5. Zamanlı sınav ekranı
6. Komite modu AI ders anlatımı
7. Komite modu AI soruları
8. Mobil görünümde tap ile açılma/kapanma
9. Hard mode açıkken glossary kapanma davranışı

## Beklenen sonuç
Bilimsel, moleküler, klinik ve TUS değeri yüksek terimler artık yalnızca çıplak yazıldığında değil, Türkçe eklerle kullanıldığında da görünür şekilde işaretlenir. UI kalabalıklaşmadan daha fazla anlamlı jargon yakalanır.

## V267 ek bilimsel/moleküler terminoloji katmanı

Ek olarak `src/data/tusGlossaryScientificIndex.js` dosyası eklendi. Bu dosya sinyal iletimi, hücre döngüsü, apoptoz, DNA onarımı, gen ekspresyonu, biyokimya, immünoloji ve mikrobiyoloji alanlarından yüksek değerli bilimsel jargonları kapsar. Amaç arayüzde yalnızca klinik hastalık adlarını değil, öğrencinin anlamını bilmeme ihtimali olan moleküler/temel bilim kavramlarını da görünür kılmaktır.
