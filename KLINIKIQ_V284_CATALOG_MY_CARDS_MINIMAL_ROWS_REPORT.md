# KlinikIQ V284 — Kataloglarım Kart Satırı Sadeleştirme Raporu

## 1. Kök problem
`Kataloglarım` ekranındaki `Katalogdaki kartlar` ve `Tüm kartlardan ekle` satırları, kart yönetimi için gereksiz olan kaynak etiketi, çalışma modu/kart tipi etiketi ve cevap metnini aynı anda gösteriyordu. Bu nedenle satırlar hem görsel olarak kalabalık hem de akademik/premium çizgiden uzak görünüyordu.

## 2. Değiştirilen dosyalar
- `src/components/TusPearlStudyScreen.jsx`
- `src/components/tusPearlCards.css`
- `KLINIKIQ_V284_CATALOG_MY_CARDS_MINIMAL_ROWS_REPORT.md`

## 3. Kaldırılan tag/metadata render alanları
Aşağıdaki liste satırı tagleri artık `Kataloglarım` satırlarında render edilmiyor:
- `Sistem kartı`
- `Kişisel kart`
- `Aktif hatırlama`
- `Kısa uygulama`
- `Spot` veya `cardType` kaynaklı çalışma modu etiketleri

Bu bilgiler veri modelinde ve filtreleme mantığında korunur; yalnızca katalog liste satırı görselinden çıkarılmıştır.

## 4. Yanıt/cevap alanı kaldırma
`Katalogdaki kartlar` bölümünde yer alan `catalog-card-answer`, `catalog-answer-label` ve `card.back` render akışı kaldırıldı. Böylece liste satırlarında `Yanıt`, `Cevap`, `Answer` veya cevap metninin kendisi görünmez. Cevap/back bilgisi çalışma modu, kart detayı veya düzenleme ekranındaki kullanımını korur.

## 5. Yeni liste satırı yapısı
Her satır artık minimal karar verme yapısına indirildi:

```jsx
<article className="tus-pearl-library-card catalog-card-row">
  <div className="catalog-card-main">
    <span className="catalog-card-branch">Branş</span>
    <strong className="catalog-card-question">Soru metni</strong>
  </div>
  <div className="catalog-card-action">...</div>
</article>
```

## 6. Renk ve tipografi düzeltmesi
Ana soru metni `#111827` premium siyah/slate tonuna alındı. Teal/yeşil vurgu artık ana soru metninde kullanılmıyor; yalnızca küçük branş chip’i, hover border ve aksiyon vurgusunda sınırlı tutuluyor.

## 7. Branş bilgisi
Branş bilgisi küçük, soft background’lı ve ikincil ağırlıkta bir chip olarak bırakıldı. Bu chip satırın ana odağı değil; kullanıcıya hızlı bağlam verirken soru metninin önüne geçmez.

## 8. Aksiyon butonları
- Katalogdaki kartlarda `X` kaldırma butonu korundu ve küçük yuvarlak subtle icon button olarak sadeleştirildi.
- `Kataloğa ekle` butonu korundu, sağ aksiyon kolonunda kalıyor.
- `Eklendi` disabled state’i soft gray/blue-gray pill görünümünde korundu.
- Kullanıcı kartları için `Düzenle` aksiyonu korunmuştur.

## 9. Toolbar korunumu
`Kart ara`, `Tüm kaynaklar` dropdown ve `Yeni kart` butonu aynı bölümde korunmuştur. Bu alandaki yükseklik/radius hizası bozulmadı.

## 10. Glossary sadeleştirme
Katalog yönetimi ekranında glossary marker’ları görsel olarak daha düşük ağırlıkta tutuldu. Soru metni koyu slate rengini korur; glossary underline hafif ve ikincil kalır. Tooltip işlevi kapatılmadı, yalnızca görsel baskınlığı azaltıldı.

## 11. Regresyon kontrolü
Kod üzerinde şu kontroller yapıldı:
- Katalog liste render bloğunda `Sistem kartı` yok.
- Katalog liste render bloğunda `Aktif hatırlama` yok.
- Katalog liste render bloğunda `Kısa uygulama` yok.
- Katalog liste render bloğunda `card.back` yok.
- Katalog liste render bloğunda `catalog-card-answer` yok.
- Katalog liste render bloğunda `card.cardType` yok.
- `Kataloğa ekle`, `Eklendi`, `X`, `Düzenle`, arama, kaynak filtresi ve yeni kart aksiyonları korunuyor.

## 12. Not
Sandbox ortamında `node_modules` bulunmadığı için `npm run build` çalıştırılamadı. Değişiklikler JSX/CSS düzeyinde hedefli yapıldı ve problemli render blokları doğrudan kontrol edildi.
