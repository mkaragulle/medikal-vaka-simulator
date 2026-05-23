# KlinikIQ V285 — Global Glossary / Tooltip / Toolbox Quality Audit & Binding Fix

## 1. Kök problem
Önceki düzeltme yalnızca belirli bir hata ailesini kapatıyordu. V285'te hedef, tek örnek düzeltmek yerine tüm glossary binding zincirini güvenli hale getirmektir: **rendered text segment → matched alias → matched entry id → tooltip title → tooltip body → tooltip category → context mode**.

## 2. Taranan dosyalar
Kod araması ve audit şu ana alanları kapsadı:

- `src/utils/glossary.js`
- `src/components/GlossaryTooltip.jsx`
- `src/components/CasePlayer.jsx`
- `src/components/DiagnosisQuiz.jsx`
- `src/components/AnswerFeedbackPanel.jsx`
- `src/components/InvestigationPanel.jsx`
- `src/components/ManagementSequencePanel.jsx`
- `src/components/TusPearlStudyScreen.jsx`
- `src/components/KomiteModeWorkspace.jsx`
- `src/components/CaseList.jsx`
- `src/components/CaseToolsPanel.jsx`
- `src/data/tusGlossary*.js`
- `src/data/tusPearlCards.js`
- `scripts/audit-glossary-*.mjs`

Audit scripti toplam **80 kaynak dosya** ve yaklaşık **9715221 karakterlik** proje metni taradı.

## 3. Taranan glossary entry ve alias sayısı
- Toplam aktif glossary entry: **1371**
- Toplam alias/eşleşme etiketi: **4390**
- Duplicate normalized alias collision: **0**
- Blocking issue (critical/high): **0**
- Heuristic medium warning: **464**
- Low/manual warning: **31**

Medium warning'ler semantic kalite şüphesi/manuel gözden geçirme adayıdır; deterministic binding hatası olarak uygulanmadı. Kritik/high düzeyde kullanıcıya yanlış tooltip gösterecek açık hata kalmadı.

## 4. Yeni global kalite katmanı
Yeni dosya eklendi:

- `src/data/tusGlossaryGlobalQualityIndex.js`

Bu dosya yalnızca obstrüksiyon ailesi için değil; genel patofizyolojik kavramlar, testler, hareket terimleri, mikrobiyoloji testleri, görüntüleme ve tedavi phrase'leri için güvenli canonical owner sağlar.

Eklenen/konsolide edilen örnek kavramlar:

- İnflamasyon
- Enfeksiyon
- Yetmezlik
- İskemi
- Ödem
- Lezyon
- Darlık
- Defisit
- Tutulum
- Yanıt
- Kültür
- Kan kültürü
- İdrar kültürü
- Rotasyon
- İnternal rotasyon
- Eksternal rotasyon
- Bronş hiperreaktivitesi
- Geri dönüşümlü hava yolu obstrüksiyonu
- Eozinofilik inflamasyon
- Ventilasyon-perfüzyon uyumsuzluğu
- Direkt grafi
- Kontrastlı BT
- Abdominal BT
- Abdominal grafi
- Lomber ponksiyon
- Meningeal irritasyon bulgusu
- Kostovertebral açı hassasiyeti
- Renal hemodinamik yanıt
- Renal perfüzyon basıncı
- Glomerüler filtrasyon hızı
- Derin hızlı solunum
- İnsülin dozlarını aksatma
- Göğüs kafesinin genişlemesi
- Coombs testi
- Gebelik testi
- Alerji testi
- Antijen testi
- Toksin testi
- İntravenöz sıvı replasmanı
- Geniş spektrumlu antibiyotik
- Oral demir tedavisi

## 5. Alias güvenliği ve context-sensitive kurallar
`src/utils/glossary.js` içinde genel/çok anlamlı standalone alias güvenliği genişletildi. Şu sınıflar artık spesifik entry'lere rastgele alias olarak bağlanmaz:

- Genel patofizyoloji: inflamasyon, enfeksiyon, yetmezlik, iskemi, nekroz, ödem, lezyon, kitle, darlık, bası, tutulum, yanıt vb.
- Anatomik yönler: sağ, sol, medial, lateral, anterior, posterior, proksimal, distal vb.
- Bağlamsız cerrahi kelimeler: insizyon, eksplorasyon, drenaj, rezeksiyon, biyopsi vb.
- Bağlamsız hareket kelimeleri: abdüksiyon, fleksiyon, ekstansiyon, rotasyon vb.
- Bağlamsız test kelimeleri: kültür, yayma, grafi, ultrasonografi, tomografi vb.

Bu kelimeler artık ya kendi genel concept entry'sine gider ya da ancak çok kelimeli spesifik phrase içinde yakalanır.

## 6. Tooltip / nested tooltip güvenliği
`src/components/GlossaryTooltip.jsx` içinde context mimarisi eklendi:

- `contextMode`
- `maxNestedDepth`
- `enableNestedGlossary`
- `tooltip-body` güvenli modu

`contextMode="tooltip-body"` olduğunda açıklama metni default olarak yeniden glossary taramasından geçmez. Böylece bir tooltip açıklamasındaki genel kelime başka spesifik hastalık tooltipine rastgele bağlanamaz. Normal vaka, feedback, hap kart, katalog ve ders metinlerinde glossary çalışmaya devam eder.

## 7. Pre-answer / post-answer güvenliği
`src/utils/glossary.js` içinde pre-answer tanımlar için normalize aşamasında leakage sanitization eklendi. Riskli ifadeler pre-answer'da nötr tanıma dönüştürülür. Örneğin "ilk tedavi", "en uygun yaklaşım", "düşündürür", "ilk kullanılan" gibi ipucu sızdırabilecek kalıplar cevap öncesi gösterilmez.

Audit sonucu:

- Pre-answer critical leak: **0**
- Pre-answer high leak: **0**
- Post-answer TUS ipucu yapısı korundu.

## 8. Başlık-açıklama-entry invariantı
Kod tarafında şu zincir güçlendirildi:

- Tooltip title: `matchedEntry.displayTerm || matchedEntry.canonicalTerm || matchedEntry.term`
- Tooltip body: aynı `matchedEntry` içindeki `shortDefinition / preAnswerSafeDefinition / postAnswerExplanation`
- React key: `entry.id + revealMode + contextMode`
- Rendered term üzerinde `data-glossary-entry-id` korunuyor.
- Resolve edilemeyen veya ambiguous entry için başka entry'ye fallback yapılmıyor.

## 9. Toolbox binding kontrolü
Projede bağımsız `toolbox tag → glossaryEntryId` üreten ayrı bir kaynak bulunmadı; ilgili ekranlar glossary içerikleri `GlossaryText` üzerinden render ediyor. Bu nedenle toolbox/tag davranışı aynı alias-owner ve contextMode güvenlik katmanından geçiyor. Gelecekte ayrı toolbox tag üreticisi eklenirse audit scripti `tag.label / tag.glossaryEntryId / tooltipTitle / tooltipDescription` eşleşmesini kontrol edecek şekilde genişletilmeye hazır bırakıldı.

## 10. Audit scriptleri
Yeni/yenilenen scriptler:

- `scripts/audit-glossary-global-quality.mjs`
- `scripts/audit-glossary-integrity.mjs`
- `scripts/audit-glossary-context-safety.mjs`

Üretilen rapor dosyaları:

- `GLOSSARY_V285_GLOBAL_QUALITY_AUDIT.json`
- `GLOSSARY_V285_INTEGRITY_AUDIT.json`
- `GLOSSARY_V285_CONTEXT_SAFETY_AUDIT.json`

Global audit kontrolleri:

1. duplicate id
2. duplicate canonical term
3. duplicate normalized alias
4. ambiguous alias
5. generic alias assigned to specific entry
6. short acronym unsafe matching
7. category-definition mismatch suspicion
8. title-definition mismatch suspicion
9. empty/too short definition
10. duplicated definition across unrelated entries
11. suspicious copied explanation/pearl
12. pre-answer leakage risk
13. nested glossary unsafe terms
14. orphan relatedTerms
15. frequent project terms missing from glossary
16. generic terms without safe generic owner
17. context-sensitive terms without safe ownership
18. tooltip stale key risk points
19. phrase shadowing by single word aliases
20. Turkish suffix false positive risk

## 11. High-risk alias owner snapshot
- obstrüksiyon: Obstrüksiyon
- tıkanıklık: Obstrüksiyon
- inflamasyon: İnflamasyon
- enfeksiyon: Enfeksiyon
- yetmezlik: Yetmezlik
- iskemi: İskemi
- nekroz: Nekroz
- ödem: Ödem
- lezyon: Lezyon
- darlık: Darlık
- şok: Şok
- defisit: Defisit
- tutulum: Tutulum
- yanıt: Yanıt
- kültür: Kültür
- rotasyon: Rotasyon

## 12. Missing candidate listesi
Audit proje metinlerinden hâlâ manuel değerlendirilebilecek candidate'ler çıkardı. Bunlar otomatik eklenmedi; çünkü bazıları cümle parçası veya tedavi yönergesi gibi görünüyor ve rastgele glossary yapılması UI kalabalığı oluşturur.

Top candidate örnekleri:

- intravenöz antibiyotik ve (31)
- intravenöz geniş spektrumlu (30)
- glomerüler filtrasyon hızın (28)
- Mikrobiyoloji testi (27)
- nefes testi (25)
- uyarı testi (24)
- supresyon testi (23)
- intramüsküler adrenalindir (21)
- Subkutan hızlı etkili (21)
- oral mukoza değişiklikleri (19)
- glomerüler filtrasyon hızının (17)
- tanı testi (17)
- oral antibiyotik başlanmas (16)
- glomerüler filtrasyon ve (16)
- oral analjezik ve (16)
- kısıtlama testi (16)
- aglütinasyon testi (15)
- tüp testi (15)
- tarama testi (14)
- fonksiyon testi (13)
- Oral sıvı ve (13)
- oral antibiyotikle ayaktan (12)
- oral sıvı önerip (12)
- glomerüler filtrasyon bariyerinde (11)
- oral antihistaminik verilmesi (11)

## 13. Regression test sonuçları
- ✅ Astım binding: Astım
- ✅ Eozinofil binding: Eozinofil
- ✅ İleus binding: İleus
- ✅ Hiperkalemi binding: Hiperkalemi
- ✅ Doppler ultrasonografi binding: Doppler ultrasonografi
- ✅ Aktif elevasyon binding: Aktif elevasyon
- ✅ Sağ inguinal insizyon binding: Sağ inguinal insizyon
- ✅ Glomerüler filtrasyon binding: Glomerüler filtrasyon hızı
- ✅ İntravenöz kalsiyum glukonat binding: Kalsiyum glukonat
- ✅ Direkt Coombs testi binding: Direkt Coombs testi
- ✅ Hava yolu obstrüksiyonu phrase: Hava yolu obstrüksiyonu
- ✅ Bağırsak obstrüksiyonu phrase: Bağırsak obstrüksiyonu
- ✅ Mesane çıkım obstrüksiyonu phrase: Mesane çıkım obstrüksiyonu
- ✅ Obstrüksiyon general does not bind ileus: Obstrüksiyon
- ✅ Inflamasyon general owner: İnflamasyon
- ✅ Yetmezlik general owner: Yetmezlik
- ✅ Rotasyon general owner: Rotasyon
- ✅ Kan kültürü phrase: Kan kültürü
- ✅ İdrar kültürü phrase: İdrar kültürü

Özet: **19 / 19 regression testi geçti. Başarısız test yok.**

## 14. Değiştirilen dosyalar
- `src/utils/glossary.js`
- `src/components/GlossaryTooltip.jsx`
- `src/data/tusGlossaryGlobalQualityIndex.js`
- `scripts/audit-glossary-global-quality.mjs`
- `scripts/audit-glossary-integrity.mjs`
- `scripts/audit-glossary-context-safety.mjs`
- `GLOSSARY_V285_GLOBAL_QUALITY_AUDIT.json`
- `GLOSSARY_V285_INTEGRITY_AUDIT.json`
- `GLOSSARY_V285_CONTEXT_SAFETY_AUDIT.json`

## 15. Kalan bilinen riskler
- Audit semantic kalite için **464 medium heuristic warning** üretiyor. Bunların büyük kısmı otomatik kategori/definition kelime eşleşmesi şüphesi veya legacy açıklama tekrarlarıdır; kullanıcıya yanlış entry gösterecek critical/high binding hatası olarak doğrulanmadı.
- Missing candidate listesinde bazı gerçek terimler var; bazıları ise cümle kırpıntısı. Bunlar sonraki içerik kalite pass'lerinde manuel curated olarak eklenmeli.
- Tam Vite production build ortamda `node_modules` olmadığı için çalıştırılamadı; JS import/audit/script kontrolleri başarıyla çalıştı.
