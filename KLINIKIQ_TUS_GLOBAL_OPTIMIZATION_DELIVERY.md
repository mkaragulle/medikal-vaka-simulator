# KlinikIQ TUS Standardı Global Optimizasyon Teslim Raporu

Tarih: 09 Mayıs 2026

## Kaynak standart

Bu güncelleme, KlinikIQ için hazırlanmış TUS soru dili / çeldirici / AI kalite gate raporundaki standartları proje içine daha sıkı uygulamak amacıyla yapılmıştır. Öncelik özellikle şu alanlara verildi:

- cevap sızıntısı kontrolü,
- TUS dil standardı,
- high-risk klinik karar kapıları,
- hap bilgi arka yüz okunabilirliği,
- AI soru üretim promptları,
- feedback ve yasaklı ifade temizliği,
- hap bilgi tekrar sırası / deck shuffle kalitesi.

## Değiştirilen ana dosyalar

- `api/generate-ai-question.js`
  - AI sistem promptu TUS dil standardı, tek cevap ekseni, high-risk first-step lock ve hap bilgi standardı açısından sıkılaştırıldı.
  - Hiperkalemi + EKG, anafilaksi, sepsis/septik şok, DKA + düşük K, STEMI, inme, menenjit, status epileptikus gibi high-risk senaryolarda modelin serbest yorumla ilk tedavi seçmesi engellendi.

- `src/data/tusPearlCards.js`
  - 8 yeni yüksek verimli TUS konusu eklendi.
  - 32 yeni hap bilgi kartı üretildi.
  - Toplam konu sayısı 175, toplam hap bilgi kartı sayısı 700 oldu.
  - Keyword ve tuzak kart metinlerinde tekrar hissi veren ve PDF raporunda kaçınılması önerilen ifadeler sadeleştirildi.

- `src/utils/pearlCardContent.js`
  - Hap bilgi arka yüzleri yapılandırıldı.
  - Anahtar ipucu zinciri, net yanıt, kısa gerekçe ve ayırıcı not birbirinden ayrıldı.
  - Arka yüzde kalın cevap cümlesi ile açıklama aynı bilgiyi tekrar ediyorsa açıklama gizlenecek şekilde düzenlendi.

- `src/components/TusPearlCard.jsx`
  - Hap bilgi kartının arka yüzü “Yanıt / Kısa gerekçe / Ayırıcı not” ritmine uygun hale getirildi.

- `src/components/TusPearlStudyScreen.jsx`
  - Çalışma ekranındaki arka yüz tasarımı da aynı okunabilirlik standardına çekildi.

- `src/components/tusPearlCards.css`
  - Arka yüz kartlarında daha okunabilir, daha sakin ve light/dark uyumlu blok yapısı eklendi.
  - Ayırıcı not kutusu kartın altında daha belirgin ve tematik bir alan olarak düzenlendi.

- `src/utils/pearlDeckShuffle.js`
  - 700 kartlık havuzda çalışma deck’i oluşturma algoritması performans güvenlikli hale getirildi.
  - Son oturumda gelen ilk kartların tekrar etmesi engellendi.
  - Aynı konu bloklarının arka arkaya yığılması azaltıldı.
  - Weighted wrong-card önceliği korunarak zorlanılan kartların erken gelme olasılığı artırıldı.

- `src/utils/tusLanguageStandard.js`
  - Yasaklı/zayıf ifadeler için normalize edici dönüşümler genişletildi.
  - “gündeme gelebilir”, “hedefe yönelik yorumlanır” gibi şablon ifadeler daha profesyonel Türkçe karşılıklarla değiştirildi.

- `src/utils/aiQuestionGenerator.js`
  - AI fallback/generator metinlerinde mekanik ve şablon hissi veren ifadeler sadeleştirildi.
  - Soru üretim dili daha kısa, spot ve TUS uyumlu hale getirildi.

- `src/utils/aiQuestionQualityGate.js`
  - AI feedback fallback kanıt maddeleri daha doğal klinik ipucu diliyle değiştirildi.

- `src/components/EvidenceMedia.jsx`
  - “Objektif bulguları aç” mikrocopy’si “Bulguları aç” şeklinde sadeleştirildi.

- `src/data/cases.js`
  - Tespit edilen şablon ifade temizliği yapıldı.
  - Embedded case runtime sanitizer pipeline korunarak tüm vakalar pre-answer leakage açısından temizlenmiş şekilde render edilmeye devam ediyor.

## Ölçülebilir sonuçlar

- Gömülü vaka sayısı: 161
- Runtime temizlenmiş vaka sayısı: 161
- Runtime cevap sızıntısı sonucu: 0 vaka
- Ham kaynakta taranan leakage riski: 135 vaka
- Runtime sonrası hard leakage: 0
- Runtime sonrası soft leakage: 0
- Runtime sonrası unit issue: 0
- Hap bilgi konu sayısı: 175
- Hap bilgi kartı sayısı: 700
- Yeni eklenen hap bilgi konusu: 8
- Yeni eklenen hap bilgi kartı: 32
- Hap bilgi arka yüz renderer optimizasyonu: 700 kartın tamamına uygulanır
- AI high-risk clinical rule sayısı: 17
- AI scientific regression fixture sayısı: 9
- AI scientific regression sonucu: 9/9 passed

## Eklenen yeni hap bilgi konuları

1. Bruton agammaglobulinemisi
2. Hipoksik iskemik ensefalopati ve hipotermi
3. Eritema toksikum neonatorum
4. Kolestatik karaciğer enzim paterni
5. KLL tanı yaklaşımı
6. ITP ilk yaklaşım
7. Methemoglobinemi antidotu
8. Kazeifikasyon nekrozu

## Test sonuçları

### `npm run build`

Durum: PASSED

- Vite production build başarıyla tamamlandı.
- 102 module transformed.
- Build süresi yaklaşık 5 saniye.

### `npm run qa:answer-leakage`

Durum: PASSED

- Raw embedded cases: 161
- Raw cases with leakage findings: 135
- Repaired/runtime cases with leakage: 0
- Runtime hard leakage: 0
- Runtime soft leakage: 0
- Runtime unit issue: 0

### `npm run qa:ai-scientific-regression`

Durum: PASSED

- High-risk rule count: 17
- Fixture count: 9
- Passed: 9
- Failed: 0

Test edilen kritik başlıklar:

- Hiperkalemi + EKG değişikliği
- PE + hipotansiyon
- Anafilaksi
- DKA + düşük potasyum
- Sepsis / septik şok
- Akut inme
- Status epileptikus
- Pediatri branch fit
- Adli / etik yükümlülük

### `npm run qa:pearl-shuffle`

Durum: PASSED

- Total cards: 700
- Sessions tested: 10
- Exact repeated first-20 pairs: 0
- Max first-10 recent-start overlap: 0
- Max topic streak: 1
- Max branch streak: 2
- Anafilaksi max block: 1
- Weighted wrong-card ratio in first 50: 0.62; pool ratio: 0.117

## Kalan manuel kontrol gerektiren alanlar

- Ham `rawCases` içinde hâlâ leakage riski taşıyan öğretici metinler bulunuyor; mevcut runtime sanitizer bunları kullanıcıya gösterimden önce temizliyor. Gelecek büyük içerik sprintinde bu ham metinlerin de tek tek editoryal olarak yeniden yazılması önerilir.
- `npm run dev` komutu interaktif tarayıcı kontrolü gerektirdiği için bu teslimde sürekli çalışan dev server bırakılmadı. Production build ve QA scriptleri çalıştırıldı.
- Gerçek OpenRouter / model çağrısıyla 100 canlı AI üretim stres testi yapılmadı; bunun yerine deterministik local high-risk regression ve leakage testleri çalıştırıldı.

## Çalıştırma komutları

```bash
npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
npm run build
npm run qa:answer-leakage
npm run qa:ai-scientific-regression
npm run qa:pearl-shuffle
npm run dev
```
