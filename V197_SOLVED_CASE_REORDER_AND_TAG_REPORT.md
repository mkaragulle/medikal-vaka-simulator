# V197 — Branş Ekranında Çözüldü Durumu, Sıralama ve Tag Güncellemesi

## Yapılan düzenlemeler

- Klinik branş detay ekranında kullanıcı bir vakada `Yanıtı değerlendir` işlemi yaptığında vaka çözüldü olarak işaretlenir.
- Çözülen vaka aynı branş listesinin en arkasına taşınır.
- Çözülen vakanın zorluk etiketi görsel olarak korunur ancak metin şu formata döner:
  - `Kolay-Çözüldü`
  - `Orta-Çözüldü`
  - `Zor-Çözüldü`
  - `Acil-Çözüldü`
- Ana vaka kartındaki üst zorluk etiketi de çözüldü durumunu gösterir.
- Alt bölümdeki `Diğer olgular` kartlarında çözülen vakalar en arkaya alınır ve footer metni `Çözüldü · tekrar aç` olur.
- `Yeni vaka çöz` butonu önce çözülmemiş vakalardan soru seçer; ilgili filtrede çözülmemiş vaka kalmadıysa tüm havuzdan devam eder.
- Çözüldü durumu kullanıcı hesabına ve localStorage'a kalıcı olarak yazılır.
- Zorluk filtresiyle uyum korunur; örneğin `Acil` filtresinde çözülen acil vakalar yine `Acil` filtresi içinde görünür ancak en arkada yer alır.

## Teknik notlar

- Yeni kalıcı alan: `solvedCaseIds`
- Yeni localStorage anahtarı: `klinikiq-solved-cases-v1`
- Yeni sıralama yardımcı fonksiyonu: `sortCasesBySolvedStatus`
- Güncellenen dosyalar:
  - `src/App.jsx`
  - `src/components/CaseList.jsx`
  - `src/components/CasePlayer.jsx`
  - `src/index.css`

## Kontrol

- Vaka havuzu değiştirilmedi; toplam vaka sayısı 390 olarak korundu.
- Mevcut option feedback ve zorluk tag sistemi korunmuştur.
