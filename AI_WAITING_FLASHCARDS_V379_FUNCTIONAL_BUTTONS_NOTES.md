# KlinikIQ V379 — AI bekleme hap kartı butonları fonksiyonel hale getirildi

Bu sürümde AI TUS sorusu üretilirken görünen hap kart mini tekrar alanındaki `Biliyorum`, `Tekrar et` ve `Zorlandım` butonları gerçek hap kart tekrar sistemiyle aynı localStorage state yapısına bağlandı.

## Yapılanlar

- Bekleme ekranındaki butonlar artık yalnızca görsel aktiflik vermiyor.
- `Biliyorum` seçilirse kart `knownPearlCardIds` listesine eklenir, `wrongPearlCardIds` ve `reviewPearlCardIds` listelerinden çıkarılır.
- `Tekrar et` seçilirse kart `reviewPearlCardIds` listesine eklenir, `knownPearlCardIds` ve `wrongPearlCardIds` listelerinden çıkarılır.
- `Zorlandım` seçilirse kart hem `wrongPearlCardIds` hem de `reviewPearlCardIds` listelerine eklenir, `knownPearlCardIds` listesinden çıkarılır.
- Böylece kartlar Hap Kartlar bölümündeki `Zorlandıklarım`, `Tekrar et` ve `Bildiklerim` listelerine düşer.
- Mevcut bekleme kartı aktif buton görünümü korunur.
- Aynı anda açık olan Hap Kartlar paneli veya çalışma ekranı varsa global progress update event ile state senkronize edilir.

## Güncellenen dosyalar

- `src/components/AIGeneratedQuestionView.jsx`
- `src/utils/pearlCardStorage.js`
- `src/components/TusPearlHubPanel.jsx`
- `src/components/TusPearlStudyScreen.jsx`

## Build

`npm run build` başarılıdır. Yalnızca mevcut büyük chunk uyarıları vardır; compile/beyaz ekran hatası yoktur.
