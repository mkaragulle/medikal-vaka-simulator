# KlinikIQ V437 — Root Skeleton Feedback Fix

## Kök sebep
V436 hâlâ modelden tam kullanıcıya gösterilecek 5 ayrı şık feedbacki yazmasını istiyordu. Düşük token limitinde model geçerli JSON üretebilse bile bazı feedback cümlelerini yarım bırakabiliyordu. Bu yüzden `Bu seçenek, kökteki ana bulguları birlikte z.` gibi geçerli ama yarım/bozuk metinler UI'a sızabiliyordu.

## Kök çözüm
Bu sürümde model artık uzun final feedback yazmıyor. Model yalnızca soru iskeletini ve kompakt gerekçe parçalarını üretir; final kullanıcı cümleleri backend/client tarafından temiz ve deterministik olarak oluşturulur.

## Değişiklikler
- AI çıktı şeması `s, q, o, c, e, r` haline getirildi.
- `f` tam cümle feedback üretimi prompttan çıkarıldı.
- Varsayılan output token limiti 720 → 650 düşürüldü.
- Yarım cümle, `z.`, `geri bildirim`, `gerekçe`, placeholder gibi kalıntılar backend ve frontend adapter tarafında engellendi.
- Eski kırık fallback cümlesi daha profesyonel ve kısa fallback ile değiştirildi.
- Feedback panelinde `Bu seçenek, kökteki ana bulguları birlikte z.` kalıntısı son savunma katmanı olarak temizleniyor.
- Topic steering, second AI repair, local fallback, question-bank, prompt cache eklenmedi.

## Değişen dosyalar
- `api/tus-question-prompt.js`
- `api/generate-ai-question.js`
- `src/utils/simpleAIQuestionAdapter.js`
- `src/components/AnswerFeedbackPanel.jsx`
- `src/services/aiQuestionService.js`
