# KlinikIQ — Global Risk Bağlamı / Ayırt Ettirici İpuçları Rework

## Kapsam
- Hasta özeti kartındaki `Risk bağlamı` ve `Ayırt ettirici ipuçları` alanları global olarak yeniden düzenlendi.
- Aynı `CasePlayer` bileşenini kullanan klasik vaka ekranları, TUS Spot Olgular ve AI generated vaka ekranları bu düzeltmeden etkilenir.
- 132 gömülü vaka `patientIntro.riskContext` ve `patientIntro.distinctiveClues` alanları üzerinden kontrol edildi.

## UI / layout düzeltmeleri
- Risk ve ipucu kartları chip/truncate davranışından çıkarıldı; hizalı, okunabilir bullet liste yapısı güçlendirildi.
- Bullet marker ve metin başlangıcı sabitlendi; devam satırları metin kolonuna hizalanacak şekilde grid tabanlı list renderer kullanıldı.
- Hasta özeti grid'i 12 kolonlu yapıya geçirildi: Profil 4 kolon, Başvuru 8 kolon, Risk ve İpuçları 6'şar kolon.
- 960px altında risk ve ipucu kartları tek kolona düşerek dar tablet/mobil kırılmalar engellendi.
- `overflow-hidden`, `line-clamp`, `ellipsis`, agresif `word-break` etkileri risk/ipucu listelerinde devre dışı bırakıldı.
- İkon kutuları sabit genişlikte ve ortalı hale getirildi; ikon alanının metni gereksiz daraltması engellendi.

## İçerik standardı
- `Karar verdirici ipucu:`, `Destekleyici kanıt:`, `Ayırt ettirici bulgu:` benzeri önekler temizlendi.
- `...` ve `…` kullanımları patient summary alanlarından kaldırıldı.
- Slash kullanımına bağlı kötü kırılmalar temizlendi; metinler doğal Türkçe bağlaçlarla yeniden düzenlendi.
- Virgülden önce boşluk ve noktalamanın satır başına düşmesine yol açan metin hataları normalize edildi.
- Risk bağlamı hasta zemini/risk arka planı; ayırt ettirici ipuçları ise tanı/karar verdirici bulgu olarak ayrıştırıldı.

## QA sonuçları
- Kontrol edilen vaka sayısı: 132
- Kontrol edilen risk maddesi: 162
- Kontrol edilen ayırt ettirici ipucu maddesi: 518
- Risk/ipucu alanlarında kalan önek problemi: 0
- Risk/ipucu alanlarında kalan `...` veya `…`: 0
- Risk/ipucu alanlarında kalan slash: 0
- Risk/ipucu alanlarında kalan bozuk virgül boşluğu: 0
- 140 karakter üstü risk/ipucu maddesi: 0
- AI generated 50 ardışık soru patient summary testi: 50/50 benzersiz ID, 50/50 benzersiz signature, 0 önek/slash/ellipsis problemi

## Build durumu
- Node import/syntax kontrolleri başarılı: `cases.js`, `aiQuestionGenerator.js`, `validateAIQuestion.js`, `aiQuestionService.js`.
- Bu ortamda `node_modules` bulunmadığı için ilk `npm run build` denemesi `vite: not found` hatası verdi.
- `npm install` denemeleri paket indirme/kurulum sırasında timeout'a düştüğü için tam Vite build'i burada tamamlanamadı.

## Çalıştırma komutları
```bash
npm install
npm run build
npm run dev
```
