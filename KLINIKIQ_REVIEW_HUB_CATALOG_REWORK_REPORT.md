# KlinikIQ Review Hub + Hap Bilgi Kartları Rework

## Scope
Yanlış çözülenler / kişisel tekrar alanı ile Hap Bilgi Kartları modülü yeniden düzenlendi. Dashboard artık iki net öğrenme akışı sunar: solda yanlış çözülenler hafıza bankası, sağda hap kartlara sade giriş paneli. Kart çalışma deneyimi ayrı ve odaklı bir ekrana taşındı.

## Changed Components
- `src/components/StudyReviewHub.jsx`
- `src/components/WrongAnswersPanel.jsx`
- `src/components/TusPearlHubPanel.jsx`
- `src/components/TusPearlStudyScreen.jsx`
- `src/components/tusPearlCards.css`

## UX / Design Updates
- Dashboard intro alanı daha kompakt hale getirildi.
- Sol ve sağ kolon optik olarak dengelendi; tek yanlış kartta büyük boşluk oluşmaması için panel yüksekliği doğal akışa bırakıldı.
- Hap Bilgi Kartları dashboard alanı uzun kart listesi yerine özet, istatistik, 4 hızlı giriş aksiyonu, 3 örnek kart ve minimal katalog bloğuna dönüştürüldü.
- Kart çalışma ekranı tek büyük kart odağına göre sadeleştirildi.
- Öğrenme kararları birincil aksiyon olarak ayrıldı: Biliyorum / Tekrar et / Zorlandım.
- Favori ve Kataloğa ekle ikincil aksiyon alanına taşındı.

## Catalog System
- Yeni katalog oluşturma eklendi.
- Katalogları kalıcı liste halinde görme eklendi.
- Katalog detayına girme eklendi.
- Katalog içindeki kartları görüntüleme eklendi.
- Katalog içine kart ekleme ve katalogdan kart çıkarma eklendi.
- Katalog yeniden adlandırma eklendi.
- Katalog silme eklendi.
- Katalogu çalışma filtresi olarak açma eklendi.
- Kart çalışma ekranında aktif kartı seçili kataloğa hızlı ekleme/çıkarma eklendi.

## Dashboard Flow
- Sol panel: yanlış çözülenler, seçilen yanlış seçenek, doğru cevap, metadata ve Tekrar çöz CTA’sı.
- Sağ panel: Hap Bilgi Kartları özet katmanı, hızlı tekrar girişleri, önerilen kartlar, kataloglara erişim.
- Yanlış yoksa empty state içinde hap kartlara yönlendirme bulunur.

## Focused Card Study Screen
- Gereksiz tag/chip kalabalığı azaltıldı.
- Kart üzerinde yalnızca branş, kart türü ve progres bilgisi bırakıldı.
- Ön yüzde soru; arka yüzde cevap ve kısa açıklama gösterilir.
- Space ile çevirme, sağ/sol ok ile gezinme ve swipe benzeri pointer hareketi korunur.
- Kart altındaki aksiyonlar öğrenme kararı ve organizasyon aksiyonları olarak ayrıldı.

## Responsive Behavior
- Desktop: iki kolonlu dashboard korunur.
- Tablet: dashboard ve katalog yönetimi tek kolona düşer.
- Mobil: aksiyonlar tam genişlikli ve dokunması kolay hale gelir; ana kart ekranın merkezinde kalır.

## Build Result
`npm run build` başarıyla tamamlandı.

## Commands
```bash
npm install
npm run build
npm run dev
```
