# KlinikIQ V296 — Glossary Visual Premium UI Report

## Değiştirilen dosyalar

- `src/components/GlossaryTooltip.jsx`
- `src/index.css`
- `src/styles/klinikiq-refine.css`
- `reports/glossary-visual-premium-ui-report.md`
- `reports/glossary-visual-premium-ui-audit.json`

## Inline glossary word tasarımı

Glossary kelimeler artık metin içinde chip/badge gibi görünmez. Final style layer ile background, renkli gradient, yoğun teal text ve padding kaldırıldı. Kelimeler ana metin rengini miras alır; glossary olduğu yalnızca subtle dotted underline, cursor ve focus-visible outline ile anlaşılır.

## Background/text color temizliği

Global `.glossary-term`, `.smart-glossary-term`, tooltip-body ve nested-tooltip-body içindeki glossary linkleri için:

- `background: transparent`
- `color: inherit`
- `padding: 0`
- `border-radius: 0`
- `text-decoration-style: dotted`
- hover/focus durumunda yalnızca underline belirginleşir

Bu override hem `src/index.css` hem de import sırası nedeniyle `src/styles/klinikiq-refine.css` sonunda yer alır.

## Pop-up kart tasarımı

Tooltip kartları daha sade premium görünüme alındı:

- Beyaz / kırık beyaz zemin
- İnce slate border
- Daha yumuşak shadow
- 18px radius
- Daha dengeli padding
- Başlık daha sade ve okunabilir
- TUS ipucu / Ayırıcı not blokları düşük kontrastlı, sakin paneller
- Teknik tag/chip alanları gizlendi

## Gereksiz tag/metadata temizliği

Kullanıcıya anlamlı olmayan teknik metadata gösterimi bastırıldı:

- internal id
- matching priority
- difficulty chip
- category chip yığını
- debug/nested tag görünümü
- safeNestedTerms gibi teknik etiketler

Kategori bilgisi gerekiyorsa metin hiyerarşisi içinde sade tutulur; kartı domine eden rozet/chip kullanılmaz.

## Parent-child nested pop-up overlap çözümü

Önceki popover-on-popover davranışı, derin zincirlerde parent ve child kartların birbirini örtmesine yol açabiliyordu. V296’da tooltip kartının içindeki nested terimler artık child pop-up açmak yerine aynı kart içinde breadcrumb/drill-down navigasyonu yapar.

Bu sayede:

- Üst üste pop-up yığını oluşmaz.
- Parent-child kartlar birbirini kapatmaz.
- Kullanıcı breadcrumb ve geri butonuyla önceki kavrama dönebilir.
- Çok seviyeli nested öğrenme zinciri korunur.

## Multi-level nested glossary

Multi-level öğrenme zinciri korunur. `safeNestedTerms`, `relatedTerms`, ambiguity guard, phrase-first matching ve cycle detection davranışları değiştirilmedi. Aynı entry zincirde tekrar açılırsa mevcut breadcrumb seviyesine geri dönülür; sonsuz döngü oluşmaz.

## Mobil / desktop davranışı

Desktop’ta ana popover term üzerine hover ile açılır. Kart içindeki nested terimler tıklama/klavye ile aynı kart içinde yeni kavrama geçer. Mobilde bu davranış daha güvenli olduğu için aynı kart içi navigasyon olarak korunur; küçük child pop-up yığınları oluşturulmaz.

## Regression özeti

- Glossary entry sayısı: 1543
- Alias/eşleşme etiketi: 5166
- Inline glossary background final override: var
- Tooltip/nested body background final override: var
- Breadcrumb/drill-down nested navigation: var
- Child pop-up yığını: devre dışı
- Content/entry data değişikliği: yok
- `getGlossaryTerms()` import testi: geçti

## Kalan risk

Tam Vite production build çalıştırılamadı çünkü çalışma ortamında `node_modules/vite` bulunmuyor. JSX/CSS değişiklikleri elle kontrol edildi; `getGlossaryTerms()` import testi başarıyla çalıştı.
