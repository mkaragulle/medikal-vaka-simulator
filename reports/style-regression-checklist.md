# KlinikIQ Style Regression Checklist — V299

## Otomatik kontroller
- [x] CSS brace dengesi kontrol edildi: tüm CSS dosyalarında `{` / `}` dengesi 0.
- [x] CSS comment dengesi kontrol edildi: unclosed comment yok.
- [x] Değişiklikler React state/data/soru/glossary matching dosyalarına dokunmadan yapıldı.
- [x] `src/App.jsx` import sırası korunarak global dark-mode dosyası legacy CSS sonrası kalmaya devam etti.
- [x] Lazy `tusPearlCards.css` dark bridge scope’u `.app-shell[data-theme='dark']` altında tutuldu.
- [x] `npm run build` denendi; ortamda `node_modules` olmadığı ve `vite` bulunmadığı için çalışmadı (`sh: 1: vite: not found`).

## Light mode manuel kontrol listesi
- [ ] Ana dashboard / hero
- [ ] Topbar
- [ ] Kişisel tekrar
- [ ] Yanlış çözülenler
- [ ] Hap Bilgi Kartları
- [ ] Kataloglarım
- [ ] TUS Spot Olgular
- [ ] Klinik Branş Seç ana ekran
- [ ] Klinik olgu çözme ekranı
- [ ] Seçenekler ve feedbackler
- [ ] Zamanlı Sınav
- [ ] Glossary tooltip
- [ ] Toolbox
- [ ] Multi-level nested glossary
- [ ] Modal/dropdown/search input
- [ ] Mobil görünüm
- [ ] Tablet görünüm
- [ ] Desktop geniş ekran

## Dark mode manuel kontrol listesi
- [ ] Ana dashboard / hero
- [ ] Topbar
- [ ] Kişisel tekrar
- [ ] Yanlış çözülenler
- [ ] Hap Bilgi Kartları
- [ ] Kataloglarım
- [ ] TUS Spot Olgular
- [ ] Klinik Branş Seç ana ekran
- [ ] Klinik olgu çözme ekranı
- [ ] Seçenekler ve feedbackler
- [ ] Zamanlı Sınav
- [ ] Glossary tooltip
- [ ] Toolbox
- [ ] Multi-level nested glossary
- [ ] Modal/dropdown/search input
- [ ] Mobil görünüm
- [ ] Tablet görünüm
- [ ] Desktop geniş ekran

## Fonksiyonel regresyon kontrolü
- [ ] TUS / Komite mode switch
- [ ] Öğrenme / Sınav switch
- [ ] Zor mode
- [ ] Klinik Branş Seç olgu açma
- [ ] Seçenek seçme ve değerlendirme
- [ ] Doğru/yanlış feedback
- [ ] TUS Spot Olgular soru çözme
- [ ] Zamanlı sınav oluşturma
- [ ] Kişisel tekrar / tüm yanlışları gör
- [ ] Hap kart çalışma ve kart ekleme/kaldırma
- [ ] Katalog oluşturma/arama
- [ ] Glossary hover delay
- [ ] Tooltip içine pointer geçişi
- [ ] Nested glossary drill-down
- [ ] Search/filter/dropdown
- [ ] Modal/overlay kapanma

## Not
Bu ortamda Vite build çalıştırılamadığı için son manuel görsel testler yerel geliştirme ortamında `npm install` sonrası `npm run dev` veya `npm run build` ile tamamlanmalıdır.
