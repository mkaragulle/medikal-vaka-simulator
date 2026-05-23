# KlinikIQ Glossary / Tooltip Binding Fix Report

## 1. Kök sebep
Glossary sisteminde iki risk aynı anda vardı: eski/global glossary satırlarında bazı spesifik hastalık entry’leri çok genel alias’ları sahiplenebiliyordu ve tooltip kartlarının açıklama metni tekrar `GlossaryText` üzerinden geçirildiği için tooltip içinde nested/inline glossary çalışabiliyordu. Bu kombinasyon, genel bir kelimenin bağlamdan koparak yanlış spesifik entry’ye bağlanmasına yol açabiliyordu.

## 2. “Obstrüksiyon” neden “İleus” açıklamasına gidiyordu?
Legacy/global glossary içinde `ileus` entry’sinde `obstrüksiyon` standalone alias olarak bulunuyordu. Matcher bu alias’ı genel bir patofizyoloji kavramı olarak değil, ileus entry’sinin eş adı gibi yorumlayabiliyordu. Tooltip açıklaması içinde nested glossary çalıştığında da astım açıklamasındaki “obstrüksiyon” kelimesi bu yanlış alias sahipliğine düşebiliyordu.

## 3. Sorun hangi katmandaydı?
Ana sorun alias listesinden ve nested tooltip davranışından kaynaklanıyordu. Matcher’da uzun phrase önceliği zaten vardı; ancak standalone genel alias’lar spesifik entry’lerde kaldığında bu öncelik tek kelimelik bağlamsız eşleşmeyi tamamen engellemeye yetmiyordu. Ek olarak tooltip state/cache için entry id tabanlı key kullanımı korunarak stale binding riski azaltılmıştır.

## 4. Değiştirilen dosyalar
- `src/utils/glossary.js`
- `src/components/GlossaryTooltip.jsx`
- `scripts/audit-glossary-integrity.mjs`
- `package.json`

## 5. Nested glossary davranışı nasıl güvenli hale getirildi?
`GlossaryCard` içindeki tooltip açıklama alanları artık düz metin olarak render ediliyor. Böylece tooltip kartının içinde geçen “obstrüksiyon”, “inflamasyon”, “yetmezlik” gibi genel kelimeler ikinci bir hover hedefi üretmiyor. `GlossaryText` ayrıca `enableNestedGlossary` parametresiyle nested glossary kontrolünü destekleyecek şekilde güvenli hale getirildi.

## 6. Genel ve bağlama duyarlı terimler nasıl ayrıldı?
`CONTEXT_SENSITIVE_STANDALONE_ALIASES` listesi eklendi. Bu listedeki genel kavramlar, spesifik hastalık entry’leri tarafından tek başına alias olarak sahiplenemiyor. Çok kelimeli spesifik phrase’ler ise çalışmaya devam ediyor: “hava yolu obstrüksiyonu”, “bağırsak obstrüksiyonu”, “safra yolu obstrüksiyonu”, “mesane çıkım obstrüksiyonu” gibi.

## 7. Düzeltilen/kaldırılan alias mantığı
`isUnsafeContextAlias` artık şu kuralı uyguluyor: tek kelimelik ve bağlama duyarlı bir alias, kendi genel concept entry’si dışında spesifik hastalık entry’sine bağlanamaz. Örneğin `obstrüksiyon` artık `İleus` entry’sine bağlanmaz; `bağırsak obstrüksiyonu` veya `mekanik bağırsak obstrüksiyonu` ise doğru bağırsak obstrüksiyonu bağlamına gider.

## 8. Eklenen yeni glossary entries
- Obstrüksiyon
- Hava yolu obstrüksiyonu
- Bronş hiperreaktivitesi
- Bağırsak obstrüksiyonu
- Safra yolu obstrüksiyonu
- Mesane çıkım obstrüksiyonu

## 9. Glossary audit edildi mi?
Evet. Yeni `scripts/audit-glossary-integrity.mjs` script’i ile normalized alias sahipliği, riskli alias binding’leri ve örnek klinik phrase’ler kontrol edildi.

## 10. Duplicate/çakışan normalized alias bulundu mu?
Normalize edilmiş glossary setinde audit çıktısı: `issueCount: 0`, `riskyAliasCount: 0`.

## 11. Tooltip başlık-açıklama-entry bütünlüğü nasıl garanti edildi?
Tooltip başlığı ve açıklaması aynı `matchedEntry` üzerinden gelmeye devam ediyor. Entry resolve edilemezse tooltip üretilmiyor. Alias conflict durumlarında spesifik phrase ve canonical owner mantığı korunuyor; context-sensitive standalone alias’lar spesifik hastalıklara devredilmiyor.

## 12. Yapılan regression kontrolleri
`node scripts/audit-glossary-integrity.mjs` ile şu binding’ler doğrulandı:
- `astım` → Astım
- `obstrüksiyon` → Obstrüksiyon genel concept
- `hava yolu obstrüksiyonu` → Hava yolu obstrüksiyonu
- `bronş hiperreaktivitesi` → Bronş hiperreaktivitesi
- `bağırsak obstrüksiyonu` → Bağırsak obstrüksiyonu
- `mekanik bağırsak obstrüksiyonu` → Bağırsak obstrüksiyonu
- `mesane çıkım obstrüksiyonu` → Mesane çıkım obstrüksiyonu
- `safra yolu obstrüksiyonu` → Safra yolu obstrüksiyonu
- `ileus` → İleus
- `hiperkalemi` → Hiperkalemi
- `Doppler ultrasonografi` → Doppler ultrasonografi
- `aktif elevasyon` → Aktif elevasyon
- `sağ inguinal insizyon` → Sağ inguinal insizyon

Ayrıca tehlikeli binding kontrolleri geçti: `obstrüksiyon`, `tıkanıklık`, `hava yolu obstrüksiyonu`, `mesane çıkım obstrüksiyonu`, `safra yolu obstrüksiyonu` artık `İleus` entry’sine gitmiyor.

## 13. Pre-answer / post-answer güvenliği
Pre-answer güvenlik mantığı korunmuştur. Tooltip içi nested glossary kapatıldığı için pre-answer aşamasında tooltip açıklaması içinden ek tanı/tedavi sızdırma riski de azalmıştır.

## 14. Manuel gözden geçirilmesi gereken riskli terimler
Sistem artık genel alias’ları spesifik hastalıklara bağlamıyor. Yine de ileride glossary genişletilirken şu terimler özellikle dikkatle incelenmelidir: inflamasyon, enfeksiyon, yetmezlik, iskemi, nekroz, ödem, lezyon, kitle, nodül, infiltrasyon, darlık, bası, hipoksi, asidoz, alkaloz, şok, kanama, perforasyon, torsiyon, elevasyon, defisit, tutulum, yanıt.

## Çalıştırılan kontrol
```bash
node scripts/audit-glossary-integrity.mjs
```

Build komutu bu sandbox ortamında çalıştırılamadı çünkü zip içinde `node_modules` yoktu ve `vite` binary’si kurulu değildi. Ancak `src/utils/glossary.js` ES module olarak import edildi ve audit script’i başarıyla çalıştı.
