# KlinikIQ V278 — Contextual Medical Terminology Layer

## 1. Mevcut glossary sistemi nerede bulundu?
- `src/utils/glossary.js`: merkezi glossary birleştirme, normalize etme, alias üretme ve cache mantığı.
- `src/components/GlossaryTooltip.jsx`: `GlossaryText`, `GlossaryTerm`, `FloatingTooltip`, `GlossaryCard`, pre-answer/post-answer tooltip davranışı ve matcher.
- `src/data/tusGlossary*.js`: mevcut TUS, bilimsel, nested, case-derived ve clinical-branch glossary veri katmanları.
- Klinik ekran kullanımları: `CasePlayer.jsx`, `DiagnosisQuiz.jsx`, `InvestigationPanel.jsx`, `ManagementSequencePanel.jsx`, `AnswerFeedbackPanel.jsx`, `TusPearlStudyScreen.jsx`, `KomiteModeWorkspace.jsx`, `AISpotQuestionScreen.jsx`, `CaseList.jsx`.

## 2. Değiştirilen eşleşme algoritması
- Matcher artık yalnızca alias uzunluğuna göre değil, `matchingPriority`, canonical-exact match, multi-word term ve alias uzunluğuna göre sıralanır.
- Aynı alias birden fazla entry’ye gidiyorsa daha spesifik ve yüksek öncelikli entry seçilir.
- Böylece `defans` gibi terimler artık `peritonit` gibi geniş hastalık entry’sine yanlış bağlanmak yerine kendi muayene bulgusu entry’sine bağlanır.

## 3. Çok kelimeli terimler nasıl desteklendi?
- Yeni dosya: `src/data/tusGlossaryContextualPhraseIndex.js`.
- Bu dosyada klinik cümlelerde geçen çok kelimeli ifadeler curated entry olarak eklendi.
- Yeni katman `STATIC_GLOSSARY_SOURCES` içinde en üste alındı; bu sayede `sağ skapulanın medial kenarı`, `sağ inguinal insizyon`, `postoperatif dönemde gelişen ağrı`, `skrotal ultrasonografi`, `cerrahi eksplorasyon`, `retikülosit yanıtı` gibi ifadeler tek tek değil, bütün ifade olarak yakalanır.

## 4. Türkçe ekler ve varyasyonlar
- Var olan suffix-aware matching korundu.
- Yeni entry’lerde alias varyasyonları Türkçe çekimli ve klinik yazım varyantlarıyla genişletildi.
- Örnek: `skrotal ultrasonografi`, `skrotal USG`, `skrotal ultrasonografi randevusu`; `kremaster refleksi kaybı`, `kremaster refleksinin kaybı`, `kremaster refleksi yokluğu`.

## 5. Tooltip başlık-açıklama uyumsuzluğu nasıl engellendi?
- Entry veri modeli `canonicalTerm` ve `displayTerm` ile genişletildi.
- Tooltip başlığı artık `displayTerm || canonicalTerm || term` üzerinden gösterilir.
- Alias çakışmalarında spesifik entry öne alındığı için başlık yanlış hastalığa/tetkike kaymaz.
- `matchingPriority` ve exact canonical eşleşme puanı eklendi.

## 6. Büyük/küçük harf standardı
- Tooltip title canonical/display term’den gelir; metindeki varyant küçük harfli olsa bile kart başlığı doğru tıbbi yazımı korur.
- Kısa büyük harfli kısaltmalarda önceki case-sensitive koruma sürdürüldü.

## 7. Pre-answer / post-answer güvenliği
- Pre-answer modda `preAnswerSafeDefinition` veya sızıntı riski varsa nötr tanım gösterilir.
- `tusPearl`, `differentialPoint`, mekanizma ve geniş açıklama post-answer modda gösterilir.
- Yeni entry’lerde answer leak riski yüksek olan karar/tedavi ifadeleri için güvenli kısa tanımlar yazıldı.

## 8. Yeni terimler
- Yeni contextual phrase katmanı: 158 curated entry.
- Toplam aktif glossary ana terimi: 1190 → 1332.
- Özellikle şu örnekler eklendi/doğrulandı: postoperatif güçlük, aktif elevasyon, sağ skapulanın medial kenarı, sağ inguinal insizyon, medial skapular kenar, omuz aktif abdüksiyonu, pasif hareket açıklığı, inguinal bölgede hassasiyet, skrotal ultrasonografi, postoperatif dönemde gelişen ağrı, cerrahi eksplorasyon, detorsiyon, klinik stabilite, akut skrotum, refleks kaybı, motor defisit, duyusal seviye, peritoneal irritasyon bulgusu, rebound hassasiyet, defans, kontrast tutulumu, segmenter duvar kalınlaşması, retikülosit yanıtı, direkt Coombs testi, indirekt hiperbilirubinemi.

## 9. Aktif edilen/kapsamı artırılan ekranlar
- `CasePlayer.jsx`: Klinik Branş Seç vaka alanlarında max glossary slotu 7 → 9.
- `DiagnosisQuiz.jsx`: soru kökü/şıklar için slotlar artırıldı.
- `InvestigationPanel.jsx`: tetkik, laboratuvar ve görüntüleme alanlarında slotlar 4 → 5.
- `ManagementSequencePanel.jsx`: yönetim adımları ve rasyonellerde slotlar 4 → 5.

## 10. Genişletilebilir yapı
- Yeni terimler `src/data/tusGlossaryContextualPhraseIndex.js` içine aynı schema ile eklenebilir.
- Opsiyonel audit script: `scripts/audit-glossary-coverage.mjs`.
- Bu script mevcut vaka ve hap kart metinlerinden yüksek sinyalli ama henüz glossary’de olmayan aday ifadeleri listeler; runtime’da çalışmaz, performansı etkilemez.

## 11. Test edilen kritik örnekler
Aşağıdaki ifadeler `getGlossaryTerms()` düzeyinde doğrulandı:
- postoperatif güçlük
- aktif elevasyon
- sağ skapulanın medial kenarı
- sağ inguinal insizyon
- medial skapular kenar
- omuz aktif abdüksiyonu
- pasif hareket açıklığı
- inguinal bölgede hassasiyet
- skrotal ultrasonografi
- postoperatif dönemde gelişen ağrı
- cerrahi eksplorasyon
- detorsiyon
- klinik stabilite
- akut skrotum
- refleks kaybı
- motor defisit
- duyusal seviye
- peritoneal irritasyon bulgusu
- rebound hassasiyet
- defans
- kontrast tutulumu
- segmenter duvar kalınlaşması
- retikülosit yanıtı
- direkt Coombs testi
- indirekt hiperbilirubinemi

## 12. Build durumu
- `node_modules` olmadığı için tam Vite production build çalıştırılamadı.
- `src/utils/glossary.js` import testi ve glossary sayım testi çalıştı.
- Yeni veri dosyası import edildi ve toplam term sayısı 1332 olarak doğrulandı.
