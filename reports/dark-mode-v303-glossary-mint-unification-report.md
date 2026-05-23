# V303 Dark Mode Glossary Mint Unification Report

## Kök amaç
Dark mode açıkken tüm glossary words için tek, sade ve premium ACTH-benzeri mint görünüm standardize edildi. Normal metin, tooltip body, nested tooltip, pop-up içi glossary, Hap Kart, Katalog, TUS Spot, Klinik Branş Seç ve feedback alanlarında farklı/gri/chip benzeri glossary stillerinin önüne geçildi.

## Değiştirilen dosyalar
- `src/styles/klinikiq-dark-mode-system.css`
- `src/components/tusPearlCards.css`

## Bulunan glossary classları
- `.glossary-term`
- `.smart-glossary-term`
- `.smart-glossary-term--drilldown`
- `.glossary-word` için koruyucu selector eklendi
- `.nested-glossary-term` için koruyucu selector eklendi
- `.glossary-text-flow` konteksinde render edilen termler
- `#klinikiq-tooltip-layer` içindeki portal pop-up/nested termler
- `.smart-glossary-card` içindeki tooltip/nested body termleri
- Hap kart, katalog, TUS Spot ve feedback alanlarındaki termler

## Eklenen dark glossary tokenları
- `--ki-glossary-dark-text: #B2F6EA`
- `--ki-glossary-dark-underline: rgba(178, 246, 234, 0.55)`
- `--ki-glossary-dark-hover: #C7FFF4`
- `--ki-glossary-dark-focus: rgba(178, 246, 234, 0.28)`

## Temizlenen/etkisizleştirilen eski görünümler
Dark mode glossary termleri için şu görünüm kalıntıları override edildi:
- chip/pill background
- background-image/gradient
- border ve border-bottom tabanlı farklı vurgular
- gereksiz padding/margin
- box-shadow
- muted/gri tooltip-body glossary rengi
- pop-up içi nested glossary için farklı renk

## Pop-up ve nested uyumu
Portal layer (`#klinikiq-tooltip-layer`) ve `.smart-glossary-card` içindeki glossary termler ayrıca kapsandı. Böylece tooltip body, nested tooltip body ve nested içinde nested glossary words aynı mint tokenını kullanır.

## Light mode durumu
Kurallar yalnızca `html[data-theme="dark"]` ve `.app-shell[data-theme="dark"]` altında scope’landı. Light mode glossary görünümüne dokunulmadı.

## Fonksiyonel kapsam
Sadece CSS değiştirildi. Glossary matching, hover delay, nested drill-down, breadcrumb, tooltip state, veri entryleri ve React state mantığı değiştirilmedi.

## Test checklist
- Klinik Branş Seç metinleri: CSS scope kapsıyor
- Soru kökü/seçenekler: CSS scope kapsıyor
- Feedback alanları: CSS scope kapsıyor
- TUS Spot Olgular: CSS scope kapsıyor
- Hap kart ön/arka yüzü: global + lazy CSS scope kapsıyor
- Kataloglarım: lazy CSS scope kapsıyor
- Tooltip/pop-up body: portal + smart card scope kapsıyor
- Nested glossary: nested/drilldown selectorları kapsıyor

## Kalan risk
Vite build ortamda `node_modules` olmadığı için çalıştırılamıyor. Değişiklik CSS-only olduğu ve syntax/brace kontrolü geçtiği için fonksiyonel regresyon riski düşüktür.
