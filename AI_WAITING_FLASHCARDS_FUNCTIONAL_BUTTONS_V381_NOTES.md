# V381 — AI bekleme hap kartı butonları fonksiyonel hale getirildi

Bu sürümde AI soru üretimi bekleme ekranındaki **Biliyorum / Tekrar et / Zorlandım** butonlarının ana Hap Kartlar modülündeki öğrenme listeleriyle gerçek zamanlı senkronize çalışması güçlendirildi.

## Davranış

- **Biliyorum**: kart `knownPearlCardIds` listesine eklenir, `wrongPearlCardIds` ve `reviewPearlCardIds` listelerinden çıkarılır.
- **Tekrar et**: kart `reviewPearlCardIds` listesine eklenir, `knownPearlCardIds` listesinden çıkarılır.
- **Zorlandım**: kart hem `wrongPearlCardIds` hem de `reviewPearlCardIds` listesine eklenir, `knownPearlCardIds` listesinden çıkarılır.

## Teknik not

Bekleme kartı işaretlemeleri artık yalnızca lokal mini-review state içinde kalmaz; `pearlCardStorage` üzerinden ana hap kart storage yapısına yazılır ve `klinikiq:pearl-state-updated` event’i ile açık olan Hap Kartlar bileşenleri anında güncellenir.
