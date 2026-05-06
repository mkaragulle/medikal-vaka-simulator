# KlinikIQ Physical Exam Cleanup Summary

Bu güncelleme, fizik muayene alanlarında yer alan objektif tetkik/laboratuvar ifadelerini temizlemek ve ilgili bilgileri mevcut vaka şemasındaki uygun tetkik alanlarında tutmak için yapılmıştır.

## Özet
- Toplam vaka sayısı: 67
- Fizik muayenesi yeniden yazılan vaka sayısı: 9
- Toplam kayıtlı değişiklik: 15
- Fizik muayene alanı yasaklı/tetkik ifadesi validasyon sonucu: 0 anlamlı hit

## Fizik muayeneden çıkarılan / yeniden konumlandırılan ifadeler
1. `cardiovascular-electrical-injury-arrhythmia-001` — Elektrik temasından sonra çarpıntı ve el yanığı ile başvuran iş kazası
   - Çıkarılan/düzenlenen: Solunum sistemi muayenesinde ral, wheezing veya solunum sıkıntısı yok; oksijen satürasyonu oda havasında korunmuş.
   - Yeni hedef/konum: vitals.SpO2 / klinik solunum muayenesi
   - Not: Oksijen satürasyonu fizik muayene bulgusu değil vital/monitör ölçümüdür; solunum gözlemi ve oskültasyon bulgularıyla yeniden yazıldı.
   - Yeni fizik muayene ifadesi: Solunum sistemi muayenesinde ral, wheezing veya belirgin solunum sıkıntısı yok; göğüs ekspansiyonu simetrik ve hasta oda havasında rahat nefes alır görünümde.

2. `pulmonology-lightning-apnea-001` — Fırtına sonrası bilinç kaybı ve solunum depresyonu ile getirilen genç hasta
   - Çıkarılan/düzenlenen: Solunum yüzeyel ve düzensiz; oksijen verilince satürasyon yükseliyor, siyanoz geriliyor.
   - Yeni hedef/konum: vitals.SpO2 / arter-kan-gazi-02
   - Not: Satürasyon yanıtı objektif ölçüm olduğundan çıkarıldı; doğrudan gözlenebilir solunum paterni ve siyanozla ifade edildi.
   - Yeni fizik muayene ifadesi: Solunum yüzeyel ve düzensiz; havayolu desteği sonrası solunum eforu azalıyor ve periferik siyanoz geriliyor.

3. `pulmonology-lightning-apnea-001` — Fırtına sonrası bilinç kaybı ve solunum depresyonu ile getirilen genç hasta
   - Çıkarılan/düzenlenen: Başvuruda hipoventilasyon ve hafif hipoksemi izlendi; oksijenle satürasyon düzeldi. Solunum depresyonu yıldırım sonrası erken ölüm riskini açıklar. Oksijen desteğine hızlı yanıt alınmıştır.
   - Yeni hedef/konum: arter-kan-gazi-02 / vitals.SpO2
   - Not: Hipoksemi ve satürasyon yanıtı kan gazı/vital ölçüm alanında bırakıldı; fizik muayene klinik solunum bulgularıyla yeniden yazıldı.
   - Yeni fizik muayene ifadesi: Solunum depresyonu klinik olarak belirgin; takipte uyanıklık artışıyla solunum ritmi düzenlenmeye başlıyor. Yaygın bronkospazm veya tek taraflı solunum sesi kaybı izlenmiyor.

4. `pediatrics-hereditary-fructose-intolerance-001` — Ek gıda sonrası hipoglisemi atakları olan bebek
   - Çıkarılan/düzenlenen: Meyve püresi alımı sonrası adrenerjik hipoglisemi bulguları belirginleşiyor; tatlı gıdalardan kaçınma öyküsü aile tarafından doğrulanıyor.
   - Yeni hedef/konum: kan-glukozu-ve-elektrolitler-04
   - Not: Hipoglisemi laboratuvarla doğrulanacak metabolik sonuçtur; fizik muayene adrenerjik klinik bulgularla yeniden yazıldı.
   - Yeni fizik muayene ifadesi: Meyve püresi alımı sonrasında solukluk, terleme, irritabilite ve uykuya meyil belirginleşiyor; tatlı gıdalardan kaçınma öyküsü aile tarafından doğrulanıyor.

5. `pediatrics-hereditary-fructose-intolerance-001` — Ek gıda sonrası hipoglisemi atakları olan bebek
   - Çıkarılan/düzenlenen: Nörolojik muayenede hipoglisemi düzelince bilinç hızla toparlıyor; kalıcı fokal defisit yok.
   - Yeni hedef/konum: kan-glukozu-ve-elektrolitler-04
   - Not: Hipoglisemi düzelmesi tedavi/lab takibi bilgisi olduğu için çıkarıldı; nörolojik muayene bulgusu korunarak yeniden yazıldı.
   - Yeni fizik muayene ifadesi: Nörolojik muayenede atak sırasında uykuya meyil dışında kalıcı fokal defisit yok; uyarana yanıt alınabiliyor.

6. `pediatrics-phenylketonuria-001` — Küf kokulu idrar ve gelişim geriliği olan bebek
   - Çıkarılan/düzenlenen: İdrar ve bezde küf benzeri belirgin koku fark ediliyor
   - Yeni hedef/konum: plazma-fenilalanin-duzeyi-06 / yenidogan-tarama-testi-tekrari-06
   - Not: İdrar örneğine ait ifade fizik muayeneden çıkarıldı; gözlenebilir koku ve pigment bulgusu korundu.
   - Yeni fizik muayene ifadesi: Bezde küf benzeri belirgin koku fark ediliyor; cilt ve saç pigmentasyonu aileye göre açık görünümde.

7. `internal-medicine-alkaptonuria-001` — İdrarı bekleyince koyulaşan erişkinde eklem yakınmaları
   - Çıkarılan/düzenlenen: İdrar örneği bekletildiğinde koyulaşıyor
   - Yeni hedef/konum: idrarda-homogentisik-asit-08
   - Not: İdrar örneğinin bekletilerek koyulaşması fizik muayene değil idrar/kimyasal gözlem sonucudur; mevcut idrar panelinde bırakıldı.
   - Yeni fizik muayene ifadesi: Yürüyüş antalgik; lomber ekstansiyon ve kalça iç rotasyonu ağrılı ve kısıtlıdır.

8. `internal-medicine-acute-radiation-syndrome-001` — Korunmasız radyasyon maruziyeti sonrası bulantı ve sitopeni
   - Çıkarılan/düzenlenen: Vücut yüzeyinde yaygın partikül kontaminasyonu, mukozal yanık veya açık yara kontaminasyonu saptanmıyor.
   - Yeni hedef/konum: radiation-survey
   - Not: Radyoaktif kontaminasyon kararı survey metre sonucuna bağlı olduğundan fizik muayene görünür yüzey bulgularıyla sınırlandı.
   - Yeni fizik muayene ifadesi: Vücut yüzeyinde yaygın görünür partikül/kirlenme yok; mukozal yanık veya açık yara izlenmiyor.

9. `internal-medicine-acute-radiation-syndrome-001` — Korunmasız radyasyon maruziyeti sonrası bulantı ve sitopeni
   - Çıkarılan/düzenlenen: Ciltte yaygın peteşi veya purpura yok; ancak seri izlemde sitopeni gelişimi açısından risk mevcut.
   - Yeni hedef/konum: tam-kan-sayimi-seri-izlemi-16
   - Not: Sitopeni seri tam kan sayımı ile değerlendirilecek objektif bulgudur; fizik muayene kanama bulgularıyla sınırlandı.
   - Yeni fizik muayene ifadesi: Ciltte yaygın peteşi, purpura veya aktif mukozal kanama izlenmiyor.

10. `internal-medicine-acute-radiation-syndrome-001` — Korunmasız radyasyon maruziyeti sonrası bulantı ve sitopeni
   - Çıkarılan/düzenlenen: Dış kontaminasyon saptanmadı; elde radyasyon eritemi izlendi. Dekontaminasyon gereksinimi dış kontaminasyon sonucuna göre belirlenir. Cilt bulgusu lokal doz etkisini destekler.
   - Yeni hedef/konum: radiation-survey / radiation-dosimetry
   - Not: Dış kontaminasyon/survey sonucu fizik muayeneden çıkarıldı; lokal cilt muayenesi korundu.
   - Yeni fizik muayene ifadesi: Sağ elde lokal eritem ve hassasiyet belirgin; lezyon çevresinde bül, nekroz veya aktif kanama izlenmiyor. Sistemik etkilenim fizik muayeneyle değil seri laboratuvar ve dozimetriyle değerlendirilmelidir.

11. `internal-medicine-sjogren-syndrome-001` — Göz-ağız kuruluğu ve parotis büyümesi ile başvuru
   - Çıkarılan/düzenlenen: Malar döküntü ve proteinüri bulgusu saptanmıyor
   - Yeni hedef/konum: idrar-analizi-ayirici-24
   - Not: Proteinüri fizik muayene ile saptanamaz; ayırıcı tanı için idrar paneline taşındı.
   - Yeni fizik muayene ifadesi: Malar döküntü, fotosensitif deri lezyonu veya periferik ödem izlenmiyor.

12. `internal-medicine-sjogren-syndrome-001` — Göz-ağız kuruluğu ve parotis büyümesi ile başvuru
   - Çıkarılan/düzenlenen: Fizik muayeneden çıkarılan objektif bilgi için yeni panel eklendi
   - Yeni hedef/konum: investigations.idrar-analizi-ayirici-24
   - Not: Proteinüri ifadesi fizik muayeneden çıkarıldı ve objektif idrar paneli olarak eklendi.

13. `pulmonology-pulmonary-embolism-dvt-001` — Bacak şişliği sonrası ani dispne ve hipoksemi gelişen hasta
   - Çıkarılan/düzenlenen: Akciğer oskültasyonunda belirgin konsolidasyon bulgusu yok
   - Yeni hedef/konum: odaklı fizik muayene; görüntüleme paneli gerektiğinde ayrı
   - Not: Konsolidasyon radyolojik bir sonuç gibi algılanabileceği için fizik muayene, oskültasyon/perküsyon bulgularıyla yeniden yazıldı.
   - Yeni fizik muayene ifadesi: Akciğer oskültasyonunda belirgin fokal ral, bronşiyal solunum sesi veya plevral frotman duyulmuyor.

14. `infectious-diseases-septic-shock-001` — Ateş, hipotansiyon ve laktat yüksekliği ile acile getirilen hasta
   - Çıkarılan/düzenlenen: Öykü/stem düzenlendi
   - Yeni hedef/konum: stem / hasta öyküsü
   - Not: Oligüri bilgisi doğrudan fizik muayene bulgusu olmadığı için öykü/izlem bilgisi olarak stem içine alındı.

15. `infectious-diseases-septic-shock-001` — Ateş, hipotansiyon ve laktat yüksekliği ile acile getirilen hasta
   - Çıkarılan/düzenlenen: İdrar çıkışı son 6 saatte azalmış
   - Yeni hedef/konum: stem / hasta öyküsü ve şok klinik muayenesi
   - Not: İdrar çıkışı gözlem/öykü-izlem bilgisidir; fizik muayene dehidratasyon ve hipoperfüzyon bulgularıyla yeniden yazıldı.
   - Yeni fizik muayene ifadesi: Mukozalar kuru; hasta hipotansif şok görünümünde ve periferik perfüzyonu belirgin bozulmuş.

## Değiştirilen dosyalar
- src/data/cases.js
- PHYSICAL_EXAM_CLEANUP_REPORT.json
- PHYSICAL_EXAM_VALIDATION_RESULT.json
- PHYSICAL_EXAM_CLEANUP_SUMMARY.md

## Test / build durumu
- `node -e "import('./src/data/cases.js').then(m=>console.log('import-ok cases='+m.cases.length))"` başarılı: `import-ok cases=67`.
- Fizik muayene validasyon taraması başarılı: `exactForbiddenHitsInExam = 0`.
- `npm run build` doğrudan çalıştırıldığında başarısız oldu: ZIP içinde `node_modules` bulunmadığı için `vite: not found` hatası alındı.
- `npm install` birkaç kez denendi ancak sandbox ortamında bağımlılık kurulumu zaman aşımına uğradı. Bu nedenle tam Vite production build sonucu üretilemedi; veri dosyası import/syntax ve içerik validasyonu başarıyla tamamlandı.