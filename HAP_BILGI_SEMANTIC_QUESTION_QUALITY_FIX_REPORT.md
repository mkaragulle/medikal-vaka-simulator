# KlinikIQ Hap Bilgi Semantic Question Quality Fix

## Amaç

Bu düzeltme, hap bilgi kartlarında teknik olarak meta dil temizlenmiş olsa bile öğrencide gerçek aktif hatırlama hissi oluşturmayan şu tür kalıpları kaldırmak için yapıldı:

- `X ile karışabilecek temel ayırıcı nokta nedir?`
- `X için ayırt ettirici TUS paterni hangi ipuçlarından oluşur?`
- `çeldiriciye düşmemeyi sağlayan ... nedir?`
- `yüksek verimli ipucu zinciri` gibi yapay/generator kokan ifadeler

Yeni hedef: Her hap kart ön yüzü daha doğal, daha cevaplanabilir ve daha TUS odaklı bir aktif hatırlama sorusu gibi çalışmalıdır.

## Değiştirilen dosyalar

### `src/data/tusPearlCards.js`

- `buildKeywordFront` yeniden yazıldı.
- Anahtar kelime kartlarında tek tip `ayırt ettirici TUS paterni` kalıbı kaldırıldı.
- Konu ve keyword içeriğine göre daha doğal soru alanları üretildi:
  - klinik/asit-baz paterni
  - EKG/ritim paterni
  - laboratuvar veya mikrobiyolojik patern
  - anatomik-muayene paterni
  - fizyolojik mekanizma paterni
  - embriyolojik/histolojik patern
  - patolojik patern
  - farmakolojik ipucu
  - tedavi/ilk yaklaşım bilgisi
  - risk sınıflaması
- `buildTrapFront` yeniden yazıldı.
- Sınav tuzağı kartları artık mümkünse `X, Y ile hangi ... üzerinden ayrılır?` biçiminde üretiliyor.
- Salisilat, anafilaksi-antihistaminik ve hiperkalemi tedavi sırası için özel aktif hatırlama ön yüzleri eklendi.
- Trap kartlarının `Kısa gerekçe` alanında `Salisilat zehirlenmesi. ...` gibi cevap tekrarları kaldırıldı.

### `src/utils/pearlCardContent.js`

- Legacy / localStorage / AI kaynaklı eski kartlar için `rewritePearlFront` düzeltildi.
- Eski `sorusunda doğru cevaba götüren...` ve `yanıltıcı seçenek...` kalıpları artık daha doğal aktif hatırlama sorularına çevriliyor.
- `tusTip` ile `explanation` aynı cümleyse otomatik boşaltılıyor.
- Arka yüzde aynı bilginin `Kısa gerekçe` ve `TUS ipucu` olarak tekrar basılması azaltıldı.

### `scripts/run-pearl-active-recall-language-test.mjs`

- Mevcut meta dil QA testine ek olarak yeni `genericFrontViolations` kontrolü eklendi.
- Test artık şu jenerik ön yüzleri de fail kabul ediyor:
  - `karışabilecek temel ayırıcı`
  - `ayırt ettirici TUS paterni`
  - `çeldiriciye düşmemeyi sağlayan`
  - `yüksek verimli ipucu zinciri`

## Salisilat kartı: eski / yeni

### Eski problemli kullanım

Ön yüz:

> Salisilat zehirlenmesi ile karışabilecek temel ayırıcı nokta nedir?

Arka yüz:

> Yanıt: Opioid toksidromunda solunum depresyonu beklenir; salisilat zehirlenmesinde erken hiperventilasyon tipiktir.  
> Kısa gerekçe: Salisilat zehirlenmesi. Erken solunum merkezi uyarısı respiratuvar alkaloz yapar; ilerleyen tabloda anyon açıklıklı metabolik asidoz eklenebilir.

Sorunlar:

- Ön yüz çok soyut ve yapaydı.
- `karışabilecek temel ayırıcı nokta` gerçek aktif hatırlama sorusu gibi değildi.
- Kısa gerekçe `Salisilat zehirlenmesi.` diye cevabı gereksiz tekrar ediyordu.

### Yeni kullanım

Ön yüz:

> Salisilat zehirlenmesi opioid toksidromundan hangi solunum paterniyle ayrılır?

Arka yüz:

> Yanıt: Opioid toksidromunda solunum depresyonu beklenir; salisilat zehirlenmesinde erken hiperventilasyon tipiktir.  
> Kısa gerekçe: Erken solunum merkezi uyarısı respiratuvar alkaloz yapar; ilerleyen tabloda anyon açıklıklı metabolik asidoz eklenebilir.  
> TUS ipucu: tinnitus → takipne → respiratuvar alkaloz → metabolik asidoz.

## Otomatik düzeltilmiş örnekler

### 1. Salisilat zehirlenmesi
- Ön yüz: Salisilat zehirlenmesi opioid toksidromundan hangi solunum paterniyle ayrılır?
- Yanıt: Opioid toksidromunda solunum depresyonu beklenir; salisilat zehirlenmesinde erken hiperventilasyon tipiktir.
- Kısa gerekçe: Erken solunum merkezi uyarısı respiratuvar alkaloz yapar; ilerleyen tabloda anyon açıklıklı metabolik asidoz eklenebilir.
- TUS ipucu: tinnitus → takipne → respiratuvar alkaloz → metabolik asidoz.

### 2. Ulnar sinir lezyonu
- Ön yüz: Ulnar sinir lezyonu, Median sinir ile hangi muayene bulgusu üzerinden ayrılır?
- Yanıt: Median sinir karpal tünelde başparmak-opozisyon ve ilk 3,5 parmak duyusu ile daha çok sorulur.
- Kısa gerekçe: Ulnar sinir hipotenar kaslar, interosseözler ve medial 1,5 parmak duyusu ile ilişkilidir.

### 3. ADH ve su dengesi
- Ön yüz: ADH ve su dengesi, Aldosteron ile hangi mekanizma bilgisi üzerinden ayrılır?
- Yanıt: Aldosteron sodyum-kanal etkisiyle karışır; saf su tutulumu ADH ile ilişkilidir.
- Kısa gerekçe: ADH V2 reseptörü üzerinden toplayıcı kanalda aquaporin-2 yerleşimini artırır.

### 4. V/Q uyumsuzluğu
- Ön yüz: V/Q uyumsuzluğu, Şant ile hangi ventilasyon-perfüzyon ilişkisi üzerinden ayrılır?
- Yanıt: Şantta perfüzyon vardır ama ventilasyon yoktur; embolide temel problem perfüzyon kaybıdır.
- Kısa gerekçe: Emboli perfüzyonu düşürür ve ölü boşluk ventilasyonunu artırır.

### 5. Homosistinüri
- Ön yüz: Homosistinüri, Marfan ile hangi muayene bulgusu üzerinden ayrılır?
- Yanıt: Marfan’da lens genellikle yukarı-dışa; homosistinüride aşağı yönde sorulur.
- Kısa gerekçe: Sistin beta sentaz kusuru marfanoid habitus ve tromboemboli ile sorulur.

### 6. Anafilaksi antihistaminik tuzağı
- Ön yüz: Anafilakside antihistaminik ve steroid neden adrenalinin yerine geçmez?
- Yanıt: Steroid ve antihistaminik destek olabilir; adrenalin geciktirilirse mortalite riski artar.
- Kısa gerekçe: Antihistaminikler ürtiker/kaşıntıyı azaltabilir fakat hava yolu ödemi, hipotansiyon ve bronkospazm için yaşam kurtarıcı tedavi adrenalinidir.

### 7. Hiperkalemi tedavi sırası
- Ön yüz: EKG değişikliği olan hiperkalemide insülin-glukoz neden ilk basamak değildir?
- Yanıt: İnsülin + glukoz doğru tedavidir ama EKG değişikliği olan hastada ilk basamak olarak kalsiyumun önüne geçmez.
- Kısa gerekçe: EKG değişikliği varsa ilk amaç aritmiyi önlemek için membran stabilizasyonudur; potasyumu düşürücü/kaydırıcı tedaviler ardından eklenir.

### 8. Von Gierke
- Ön yüz: Von Gierke, McArdle ile hangi metabolik patern üzerinden ayrılır?
- Yanıt: McArdle egzersiz intoleransı ve kas fosforilaz kusuruyla ayrılır.
- Kısa gerekçe: Açlık hipoglisemisi, laktik asidoz, hiperürisemi ve hepatomegali tipiktir.

### 9. Papiller tiroid karsinomu
- Ön yüz: Papiller tiroid karsinomu, Folliküler kanser ile hangi patolojik yayılım paterni üzerinden ayrılır?
- Yanıt: Folliküler kanser hematolojik yayılır ve kapsül/damar invazyonuyla ayrılır.
- Kısa gerekçe: En sık tiroid kanseridir; lenfatik yayılım ve radyasyon öyküsü ile sorulur.

### 10. PESI ve yüksek risk PE ayrımı
- Ön yüz: PESI ve yüksek risk PE ayrımı hangi risk sınıflaması ile benzer tablolardan ayrılır?
- Yanıt: Sadece tansiyon ve satürasyonla PESI sınıfı kesin hesaplanamaz; yaş, komorbidite ve ek klinik veriler gerekir.
- Kısa gerekçe: Şok veya ciddi hipotansiyon varsa hasta yüksek risk PE kabul edilir; PESI daha çok stabil hastalarda risk tabakalandırmasına yardım eder.

## QA / test sonuçları

Çalıştırılan komutlar:

```bash
npm run qa:pearl-active-recall-language
npm run build
npm run qa:pearl-shuffle
npm run qa:ai-scientific-regression
npm run qa:answer-leakage
```

Sonuçlar:

- `qa:pearl-active-recall-language`: passed
  - totalCards: 700
  - metaViolations: 0
  - duplicationViolations: 0
  - missingFieldViolations: 0
  - genericFrontViolations: 0
- `npm run build`: passed
- `qa:pearl-shuffle`: passed
  - maxTopicStreak: 1
  - first20ExactRepeatPairs: 0
  - maxRecentStartOverlapFirst10: 0
- `qa:ai-scientific-regression`: passed
  - highRiskClinicalRuleCount: 17
  - fixtureCount: 9
  - passedCount: 9
- `qa:answer-leakage`: passed
  - repaired output: hardLeakage 0, softLeakage 0, unitIssues 0

## Manual review required

Manual review required listesi boş. Bu sprintte tespit edilen jenerik hap bilgi ön yüzleri generator/normalizer düzeyinde temizlendi.
