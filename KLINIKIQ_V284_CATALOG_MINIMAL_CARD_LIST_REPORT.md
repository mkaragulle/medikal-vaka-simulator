# KlinikIQ V284 — Kataloglarım Minimal Premium Kart Listesi

## Kök problem
`Kataloglarım` ekranındaki `Katalogdaki kartlar` ve `Tüm kartlardan ekle` listelerinde kart satırları kullanıcıya karar vermek için gerekenden fazla bilgi gösteriyordu. `Sistem kartı`, `Aktif hatırlama`, `Kısa uygulama` gibi metadata etiketleri, `Yanıt` etiketi ve cevap metni liste satırını kalabalıklaştırıyor; ayrıca generic `.tus-pearl-library-card span` kuralı soru içindeki span/glossary parçalarını teal renge çekerek ana metni gereğinden fazla yeşil gösteriyordu.

## Değiştirilen dosyalar
- `src/components/TusPearlStudyScreen.jsx`
- `src/components/tusPearlCards.css`

## Component değişikliği
`TusPearlStudyScreen.jsx` içinde katalog satırları sadeleştirildi:
- `catalog-card-meta` bloğu kaldırıldı.
- `Sistem kartı / Kişisel kart`, `Aktif hatırlama`, `Kısa uygulama`, `Spot` gibi liste için gereksiz metadata alanları render edilmez hale getirildi.
- `catalog-card-answer`, `catalog-answer-label` ve kartın `back/answer` metni katalog liste görünümünden kaldırıldı.
- Kart satırında yalnızca küçük `catalog-card-branch` chip'i ve `catalog-card-question` soru metni bırakıldı.

## Yanıt alanı
Katalog liste görünümünde cevap/back alanı artık render edilmiyor. Cevap metni çalışma, detay veya edit akışları için veri içinde korunur; yalnızca bu yönetim/listeme ekranında gösterilmez.

## Görsel düzenleme
`src/components/tusPearlCards.css` sonuna canonical V284 katalog liste bloğu eklendi:
- Satır layout'u `grid-template-columns: minmax(0, 1fr) auto` ile kuruldu.
- Ana soru rengi `#111827` koyu slate/siyah tonuna alındı.
- Branş bilgisi küçük, soft, tek chip olarak gösterildi.
- Generic teal span etkisi katalog soru metni içinde nötrlendi.
- Glossary underline katalog ekranında çok hafif hale getirildi.
- `Eklendi`, `Kataloğa ekle`, `Düzenle` ve `X` aksiyonları korundu; sağ aksiyon kolonunda hizalandı.
- Mobilde kart satırı tek kolona düşüp aksiyonlar alt-sağda kalacak şekilde ayarlandı.

## Fonksiyonel koruma
Aşağıdaki işlevlere dokunulmadı:
- Kataloğa kart ekleme
- Katalogdan kart çıkarma
- Eklenmiş kartlarda `Eklendi` state'i
- Arama
- Kaynak filtresi
- Yeni kart oluşturma
- Kart sayısı
- Glossary tooltip sistemi

## Test notları
Statik kontrolle `TusPearlStudyScreen.jsx` içinde katalog satırlarında `catalog-card-answer`, `catalog-answer-label` ve `catalog-card-meta` render kullanımı kalmadığı doğrulandı. Tam Vite build çalıştırılamadı; zip içinde `node_modules` bulunmuyor.
