# KlinikIQ Smart TUS Glossary Layer — V264 Update Report

## 1. Değiştirilen dosyalar

- `src/data/tusGlossaryIndex.js`
- `src/utils/glossary.js`
- `src/components/GlossaryTooltip.jsx`
- `src/index.css`
- `SMART_GLOSSARY_UPDATE_REPORT.md`

## 2. Mevcut glossary sistemi nerede bulundu ve nasıl genişletildi?

Mevcut sistem şu iki ana yapı üzerinden çalışıyordu:

- `src/utils/glossary.js`: merkezi glossary listesi, normalizasyon, unit/ölçü birimi koruması ve term toplama mantığı.
- `src/components/GlossaryTooltip.jsx`: metin içinde terim yakalayan `GlossaryText`, tıklanabilir/hover edilebilir `GlossaryTerm` ve portal tabanlı tooltip render akışı.

Bu yapı bozulmadan korundu. Yeni sürümde legacy glossary veri tabanının önüne TUS odaklı curated index eklendi. Böylece eski terimler tamamen silinmedi; ancak yeni yüksek değerli TUS kavramları daha zengin veri alanlarıyla ve daha güvenli pre-answer/post-answer ayrımıyla çalışır hale getirildi.

## 3. Yeni / güçlendirilen componentler

- `GlossaryText`: KlinikIQ’daki metin bloklarını güvenli şekilde parse edip anlamlı terimleri linkler.
- `GlossaryTerm`: Masaüstünde hover/click, mobilde tap/click ile açılan inline terim tetikleyicisidir.
- `FloatingTooltip`: Portal üzerinden `document.body` altında render edilir; container clipping/overflow sorunlarını azaltır.
- `GlossaryCard`: AMBOSS tarzı küçük, beyaz, sade ön izleme kartı olarak yeniden düzenlendi.

Kart artık büyük modal gibi davranmaz; metnin yanında açılan hızlı okunabilir preview kartı mantığına yaklaştırıldı.

## 4. Aktif olduğu ekranlar

Glossary wrapper mevcut entegrasyonlarla şu alanlarda aktiftir:

- Klinik Branş Seç içindeki vaka/olgu ekranı (`CasePlayer.jsx`)
- TUS Spot Olgular / Diğer Olgular vaka ekranı (`CasePlayer.jsx`, `DiagnosisQuiz.jsx`)
- Zamanlı sınav ve soru çözme akışı (`DiagnosisQuiz.jsx`, exam/hard mode koşullarıyla)
- Soru kökü ve seçenekler (`DiagnosisQuiz.jsx`)
- Cevap sonrası feedback alanları (`AnswerFeedbackPanel.jsx`)
- Klinik/Bilimsel gerekçe, kanıt zinciri, sınav notu, seçenek karşılaştırması (`AnswerFeedbackPanel.jsx`)
- Tetkik/veri panelleri (`InvestigationPanel.jsx`)
- Yönetim sırası panelleri (`ManagementSequencePanel.jsx`)
- Hap kart ön ve arka yüzleri (`TusPearlStudyScreen.jsx`)
- AI Spot anlatı/soru ekranı (`AISpotQuestionScreen.jsx`)
- Komite modu ders içerikleri, AI soruları ve flashcard alanları (`KomiteModeWorkspace.jsx`)

## 5. Pre-answer / post-answer cevap sızdırma koruması

Yeni veri modelinde her curated terim için ayrı güvenli alanlar tanımlandı:

- `previewDefinition`: kısa hızlı ön izleme tanımı
- `preAnswerSafeDefinition`: cevap verilmeden önce gösterilecek nötr tanım
- `postAnswerExpandedExplanation`: cevap sonrası açılabilecek genişletilmiş öğretici açıklama
- `tusPearl`: yalnızca post-answer modda görünür
- `differentialPoint`: yalnızca post-answer modda görünür

Pre-answer modda kart sadece nötr tanımı gösterir. Örneğin `Sivri T dalgası` için cevap öncesi yalnızca EKG morfolojisi anlatılır; “hiperkalemi + EKG değişikliği varsa IV kalsiyum” ipucu cevap sonrası açılır. Böylece soru çözme ekranında doğrudan cevap sızdırma azaltıldı.

## 6. Mobil ve desktop davranışı

- Desktop: hover, focus ve click desteklenir.
- Mobil: tap/click ile açılır; dışarı tıklanınca kapanır.
- Klavye erişimi: Enter/Space ile aç-kapat, Escape ile kapat desteklenir.
- Focus davranışı korunduğu için erişilebilirlik önceki sürüme göre bozulmadı.

## 7. Overflow / clipping problemi nasıl engellendi?

Tooltip kartı kendi parent container’ının içinde değil, `#klinikiq-tooltip-layer` portal root’u üzerinden `document.body` altında render edilir. Bu root:

- `position: fixed`
- `overflow: visible`
- çok yüksek `z-index`
- `pointer-events` kontrollü yapı

ile tanımlandı. Konum hesaplama viewport sınırlarını dikkate alır; kart ekran dışına taşarsa yatay/dikey olarak clamp edilir. Böylece `overflow: hidden`, horizontal card listeleri, sticky containerlar veya scroll alanları tooltip’i kesmez.

## 8. Eklenen / güçlendirilen örnek terminoloji kayıtları

Yeni curated TUS glossary index içinde 23 yüksek değerli kayıt eklendi/güçlendirildi:

- Dispne / Dyspnea
- Tüberküloz / Tuberculosis
- Hiperkalemi
- Sivri T dalgası
- QRS genişlemesi
- Kalsiyum glukonat
- Anion gap metabolik asidoz
- Desmopressin / DDAVP
- Nefrotik sendrom
- Reye sendromu
- Perioral dermatit
- Pulsus paradoxus
- Step-ladder fever
- Charcot triadı
- Virchow triadı
- Reed-Sternberg hücresi
- Kazeifiye granülom / Caseating granuloma
- AST/ALT oranı
- İndirekt hiperbilirubinemi
- Koagülaz
- Nalokson
- İntramüsküler epinefrin
- Diyabetik ketoasidoz

Her kayıt mümkün olduğunca şu alanları içerir: `id`, `term`, `aliases`, `normalizedTerm`, `TurkishName`, `EnglishName`, `LatinName/abbreviation`, `category`, `previewDefinition`, `preAnswerSafeDefinition`, `shortDefinition`, `detailedExplanation`, `postAnswerExpandedExplanation`, `tusPearl`, `differentialPoint`, `clinicalRelevance`, `mechanism`, `relatedBranches`, `relatedTerms`, `difficulty`, `keywordsForSearch`.

## 9. Test edilmesi gereken kritik ekranlar

Özellikle şu ekranlar manuel test edilmelidir:

1. TUS Spot Olgular — soru çözülmeden önce terim kartları sadece nötr tanım gösteriyor mu?
2. TUS Spot Olgular — cevap sonrası aynı kartlarda TUS ipucu ve ayırıcı not açılıyor mu?
3. Klinik Branş Seç vaka ekranı — öykü, fizik muayene ve tetkik alanlarında tooltip kırpılıyor mu?
4. Diğer Olgular yatay liste/scroll alanları — popover üstten veya yandan kesiliyor mu?
5. Zamanlı Sınav Oluştur / hard mode — sınav mantığını bozacak glossary yoğunluğu oluşuyor mu?
6. Hap kart ön yüzü — cevap gösterilmeden önce sızıntı var mı?
7. Hap kart arka yüzü — post-answer öğretici açıklamalar düzgün mü?
8. Komite modu AI Ders Anlatımı — uzun metinlerde yoğunluk makul kalıyor mu?
9. Komite modu AI Soruları — seçeneklerde aşırı link kalabalığı oluşuyor mu?
10. Mobil viewport — tap ile açma, dışarı tıklayınca kapatma ve ekran dışına taşmama davranışı.

## 10. Sistemin ileride yeni terimlerle genişletilmesi

Yeni terimler `src/data/tusGlossaryIndex.js` içindeki `TUS_GLOSSARY_ADVANCED_TERMS` dizisine eklenmelidir. Önerilen süreç:

1. Terim gerçekten TUS soru çözme değeri taşıyor mu kontrol edilir.
2. Çok genel kelimeler eklenmez; mümkünse çok kelimeli ve bağlamlı terim tercih edilir.
3. `preAnswerSafeDefinition` mutlaka nötr yazılır; tanıyı/tedaviyi doğrudan ele vermemelidir.
4. `tusPearl` ve `differentialPoint` cevap sonrası öğrenme için yazılır.
5. `aliases` alanına Türkçe, İngilizce, kısaltma ve yazım varyantları eklenir.
6. Aynı kavram farklı adla tekrar eklenmez; alias olarak bağlanır.
7. Çok kısa kısaltmalar dikkatli kullanılmalıdır; ölçü birimleri veya genel kısaltmalarla çakışmamalıdır.

## Teknik doğrulama notu

- `src/data/tusGlossaryIndex.js` ve `src/utils/glossary.js` için Node import/syntax kontrolü yapıldı.
- `getGlossaryTerms()` çalıştırılarak yeni curated terimlerin legacy glossary ile birlikte yüklendiği doğrulandı.
- Ortamda `npm install` zaman aşımına uğradığı için tam Vite production build çalıştırılamadı. JSX değişiklikleri mevcut component yapısı korunarak sınırlı tutuldu; yine de Vercel/GitHub yüklemesinden sonra özellikle yukarıdaki kritik ekranlarda manuel UI testi önerilir.


---

# V265 Glossary genişletme notu

Aktif ana glossary terimi 534’ten 814’e çıkarıldı. Yeni curated TUS katmanı `src/data/tusGlossaryExpandedIndex.js` ve `src/data/tusGlossarySupplementalIndex.js` dosyalarıyla eklendi. Yeni kayıtlarda pre-answer nötr tanım, post-answer TUS ipucu ve ayırıcı not ayrımı korundu.
