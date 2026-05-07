# KlinikIQ Feedback Bullet Alignment Fix

## Yapılan düzenleme
- Feedback kartlarındaki madde işaretli satırlar için grid tabanlı hizalama eklendi.
- Bullet/dot işaretleri sabit bir sol kolonuna alındı.
- Metin başlangıcı ayrı bir içerik kolonuna alındı.
- Uzun metinlerde satır kırılımı bullet altında değil metin başlangıç hizasında devam edecek şekilde düzenlendi.
- Mobil ve desktop için line-height, gap, marker size ve kolon ölçüleri normalize edildi.

## Değiştirilen dosyalar
- `src/components/AnswerFeedbackPanel.jsx`
- `src/index.css`

## Not
Bu değişiklik tema renklerini, kart tasarım dilini ve mevcut feedback akışını bozmaz; yalnızca liste hizalamasını profesyonel hale getirir.
