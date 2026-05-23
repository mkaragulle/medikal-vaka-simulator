# KlinikIQ V300 Supplemental Glossary Quality Report

Kaynak aday dosyası: `glossary-supplemental-different-terms(1).json`

## Sonuç

- Toplam aday: **219**
- Kaynak dosyada yeni entry önerisi: **50**
- V299 normalize glossary havuzuna göre kalite filtresinden geçirilerek eklenen yeni entry: **41**
- Bunların **32** tanesi kaynak dosyada `addNewEntry`, **9** tanesi kaynak dosyada `keepExistingAndDocument` olmasına rağmen V299 normalize havuzunda exact entry olarak eksikti.
- Eklenen veri katmanı: `src/data/tusGlossaryV300SupplementalIndex.js`
- Entegrasyon noktası: `src/utils/glossary.js` içindeki `STATIC_GLOSSARY_SOURCES`

## Uygulanan kalite filtresi

1. V299 `getGlossaryTerms()` çıktısındaki normalize term/alias havuzuyla duplicate kontrolü yapıldı.
2. Placeholder veya jenerik açıklama taşıyan öneriler doğrudan kullanılmadı; kabul edilen entryler öğretici ve klinik olarak yeniden yazıldı.
3. Tek başına geniş/çok anlamlı olan adaylar tekrar eklenmedi.
4. Answer-leak riski olan klinik tanılarda `preAnswerSafeDefinition` nötr tutuldu; ayırıcı/tedavi ipuçları post-answer alanlarına yazıldı.
5. Her entry için kategori, branch, safe nested terms, TUS pearl ve differential point eklendi.
6. Acronym entrylerde case-sensitive display korunacak şekilde alanlar eklendi.

## Eklenen terimler

- **Mastektomi** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Exchange Transfüzyon** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Fototerapi** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Anafilaktik Şok** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `high`
- **Fetal Distres** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `high`
- **Hepatoselüler Karsinom** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `medium`
- **Hipovolemik Şok** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `medium`
- **Kalp Yetmezliği** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `medium`
- **Kardiyojenik Şok** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `medium`
- **Obstrüktif Sarılık** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `high`
- **Perfore Apandisit** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `medium`
- **Siroz** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `medium`
- **Sistit** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `medium`
- **Anyon Gap Metabolik Asidoz** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Düşük TSH** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Miyoglobinüri** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Proteinüri** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Respiratuvar Alkaloz** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Albümin Düşüklüğü** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Aseton Kokusu** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **EKG Değişikliği Olan Hiperkalemi** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Ketozis** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Koledok Taşı** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Malrotasyon** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Nöbet** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Peritoneal İrritasyon** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Pilor Stenozu** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Primer İmmün Yetmezlik** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Toksik Megakolon** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Yenidoğan Sarılığı** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Anjiyografi** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Ekokardiyografi** — kaynak öneri: `addNewEntry`, risk: ambiguity `low`, answer-leak `low`
- **Mastoidit** — kaynak öneri: `keepExistingAndDocument`, risk: ambiguity `low`, answer-leak `medium`
- **Kolanjit** — kaynak öneri: `keepExistingAndDocument`, risk: ambiguity `low`, answer-leak `low`
- **Nocardia** — kaynak öneri: `keepExistingAndDocument`, risk: ambiguity `low`, answer-leak `low`
- **Alfa-fetoprotein** — kaynak öneri: `keepExistingAndDocument`, risk: ambiguity `low`, answer-leak `low`
- **GPA** — kaynak öneri: `keepExistingAndDocument`, risk: ambiguity `low`, answer-leak `low`
- **Hartnup Hastalığı** — kaynak öneri: `keepExistingAndDocument`, risk: ambiguity `low`, answer-leak `low`
- **SLNB** — kaynak öneri: `keepExistingAndDocument`, risk: ambiguity `low`, answer-leak `low`
- **SVT** — kaynak öneri: `keepExistingAndDocument`, risk: ambiguity `low`, answer-leak `low`
- **VT** — kaynak öneri: `keepExistingAndDocument`, risk: ambiguity `low`, answer-leak `low`

## Bilinçli eklenmeyen örnekler

- `Asit`: tek başına kimyasal asit, asit-baz dengesi ve klinik bağlamda farklı anlamlara kayabilir.
- `Torsiyon`: organ bağlamı olmadan over, testis veya intestinal torsiyonları yanlış eşleyebilir; spesifik bağlamlı terimler tercih edildi.

## Validasyon

- `src/data/tusGlossaryV300SupplementalIndex.js` Node ile import edildi.
- `src/utils/glossary.js` üzerinden `getGlossaryTerms()` çalıştı.
- Eklenen tüm kabul edilmiş terimler normalize glossary çıktısında bulunabilir hale geldi.
- `auditGlossaryIntegrity()` sonucu: critical `0`, high `0`, medium `537`, low `293`. Mevcut medium/low uyarılar legacy glossary havuzundan geliyor; V300 eklerinde critical/high bırakılmadı.
- `npm run build` ortamda çalıştırılmaya çalışıldı; zip içinde `node_modules` bulunmadığı ve `vite` yüklü olmadığı için `vite: not found` ile durdu.

## Fonksiyonel risk kontrolü

React state, soru çözme mantığı, glossary matching algoritması, hover-delay/nested tooltip davranışı ve mevcut glossary entry içerikleri değiştirilmedi. Yeni entry katmanı mevcut kaynak listesine eklendi.
