# AI Spot Yanıt Seçenekleri Altı Soru Kökü Düzeltmesi

## Problem
AI Spot ekranında üstteki klinik metin ve destek veriler görünüyor; ancak kullanıcı seçeneklere indiğinde `Yanıt seçenekleri` başlığı altında sorunun tam karar cümlesi görünmüyordu. `DiagnosisQuiz` içinde soru kökü daha önce `questionSubtextOverride` ile p etiketi olarak geçiyordu, fakat global feedback/quiz CSS katmanındaki `.diagnostic-decision-panel .question-panel-head.diagnostic-head p { display: none !important; }` kuralı bu metni gizliyordu.

## Çözüm
`DiagnosisQuiz.jsx` içinde AI Spot akışı için ayrı ve görünür bir `ai-spot-inline-question-stem` bloğu eklendi. Bu blok `Yanıt seçenekleri` başlığından hemen sonra, seçeneklerden önce görünür. Eski büyük callout tekrar açılmadı; soru kökü kompakt, tek akışlı ve answer column ritmine uygun bir bilgi satırı olarak gösterildi.

## Değiştirilen dosyalar
- `src/components/DiagnosisQuiz.jsx`
  - AI Spot + gizli callout durumunda `showInlineQuestionStem` mantığı eklendi.
  - `Yanıt seçenekleri` altında `Soru kökü` bloğu render edildi.

- `src/index.css`
  - `.ai-spot-inline-question-stem` için light/dark mode uyumlu kompakt kart stili eklendi.
  - Glossary highlight arka planlarının bu alanda bozuk görünmesi engellendi.

- `scripts/run-ai-spot-question-stem-inline-test.mjs`
  - Soru kökü bloğunun option grid’den önce render edildiğini doğrulayan static QA testi eklendi.

- `package.json`
  - `qa:ai-spot-question-stem-inline` komutu eklendi.

## Test sonucu
Aşağıdaki komutlar başarıyla çalıştırıldı:

```bash
npm run build
npm run qa:ai-spot-question-stem-inline
npm run qa:ai-spot-render-layout
npm run qa:ai-spot-readability
npm run qa:ai-spot-duplicate-data
```

## Kullanıcı etkisi
AI soru ekranında kullanıcı artık seçenekleri görürken sorunun ne sorduğunu aynı bölüm içinde tekrar görebilecek. Klinik metin ve destek veriler yukarıda kalırken, karar cümlesi seçeneklerin hemen üstünde kompakt şekilde görünecek.
