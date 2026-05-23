# KlinikIQ Style Override Cleanup Summary — V299

## Yapılan kontrollü temizlik

Bu sürümde veri yapısı, React state, soru çözme akışı, glossary matching/hover-delay mantığı, TUS Spot Olgular, Klinik Branş Seç, Hap Kartlar ve Kişisel Tekrar fonksiyonelliğine dokunulmadı. Temizlik CSS/theme katmanıyla sınırlı tutuldu.

## Değiştirilen dosyalar
- `src/styles/klinikiq-dark-mode-system.css`
- `src/components/tusPearlCards.css`
- `reports/style-overrides-audit.md`
- `reports/style-overrides-inventory.json`
- `reports/style-overrides-cleanup-summary.md`
- `reports/style-overrides-manual-review.json`
- `reports/style-regression-checklist.md`

## Önce / sonra ölçümleri
| Dosya | Satır Δ | `!important` Δ | Hard color Δ | Light-color Δ | Not |
|---|---:|---:|---:|---:|---|
| `src/index.css` | +0 | +0 | +0 | +0 | Değişmedi; yüksek riskli legacy katman manual review. |
| `src/components/tusPearlCards.css` | -64 | +0 | -27 | -1 | Lazy dark bridge duplicate scope daraltıldı; hard-coded renkler token fallback’e taşındı. |
| `src/styles/klinikiq-refine.css` | +0 | +0 | +0 | +0 | Değişmedi; yüksek riskli legacy katman manual review. |
| `src/styles/klinikiq-system.css` | +0 | +0 | +0 | +0 | Değişmedi; yüksek riskli legacy katman manual review. |
| `src/styles/klinikiq-dark-mode-system.css` | +16 | +0 | +4 | +1 | Yeni semantic kontrol/progress/chip/contrast tokenları eklendi. |

## Temizlenen / düzenlenen alanlar
1. **Canonical control tokens eklendi**
   - `--ki-control-primary-text`
   - `--ki-control-primary-bg`
   - `--ki-control-secondary-bg`
   - `--ki-progress-gradient`
   - `--ki-chip-accent-text`
   - `--ki-glossary-hover-text`
   - `--ki-danger-contrast`
   - `--ki-success-contrast`

2. **Hard-coded dark renkler token’a taşındı**
   - Primary button text/background
   - Progress fill gradient
   - Chip/badge accent text
   - Wrong summary contrast text
   - Glossary hover text
   - Glossary arrow/elevated surface background
   - Added/disabled success text

3. **Lazy Hap Kart / Kişisel Tekrar bridge daraltıldı**
   - Önceki V298 tail bloğu aynı kuralları hem `[data-theme='dark']` hem `.app-shell[data-theme='dark']` ile iki kez hedefliyordu.
   - V299’da bu matrix kaldırıldı ve sadece `.app-shell[data-theme='dark'] :where(...)` altında scoped, token tabanlı bridge bırakıldı.
   - Bu değişiklik lazy yüklenen `tusPearlCards.css` dosyasının global dark system’i ezmesini engellerken selector tekrarını azalttı.

4. **Light-mode regression riskini azaltmak için fallback’li token kullanıldı**
   - `var(--ki-text, #111827)`
   - `var(--ki-accent-strong, #0f766e)`
   - `var(--ki-border, rgba(...))`
   - Böylece token yoksa eski görünüm korunur, token varsa theme sistemi devreye girer.

## Neden tüm `!important`lar kaldırılmadı?
Projede önceki sürümlerden kalan çok sayıda layout, responsive, popover, glossary ve case-player kuralı `!important` ile birbirini eziyor. Bunları tek seferde kaldırmak TUS/Klinik Branş Seç, nested tooltip, seçenek seçme, feedback, topbar responsive ve lazy hap kart ekranlarında fonksiyonel/görsel regresyon riski taşır. Bu sürümde amaç güvenli temizlik olduğu için yüksek riskli kurallar rapora alındı, düşük riskli tokenizasyon ve scope daraltma uygulandı.

## Korunan yüksek riskli alanlar
- Topbar responsive Vxx/hotfix blokları
- Case/answer/feedback layout override’ları
- Glossary tooltip positioning/overflow/z-index kuralları
- Zamanlı sınav ve case-player grid/flex kuralları
- Dynamic class kullanma ihtimali olan selectorlar

## Kalan risk
- `src/index.css` hâlâ çok büyük ve teknik borç içeriyor. İkinci fazda component bazlı bölünerek canonical card/button/input sınıflarına taşınmalı.
- `!important` sayısı bu güvenli fazda azaltılmadı; azaltma için önce topbar/case/hap kart component snapshot testleri gerekir.
- Kullanılmayan class temizliği dynamic class ihtimali nedeniyle manual review olmadan yapılmadı.
