# KlinikIQ — AI Spot Single-Flow Layout Fix Report

## Amaç
AI ile üretilen TUS Spot soru ekranında üstteki klinik soru metni ile alttaki soru/şık/feedback alanını kopuk iki scroll bölgesi olmaktan çıkarıp tek akıcı, doğal yüksekliğe sahip bir panel haline getirmek.

## Kök sebep
AI Spot ekranı klasik vaka ekranındaki sağ panel mimarisini miras alıyordu:

- `qbank-side-column professional-right-column ai-spot-side-column`
- `right-workspace-shell card-surface ai-spot-answer-shell`

Bu sınıflar global CSS içinde desktop için sticky ve viewport-bound tasarlanmıştı:

- `height: calc(100dvh - ...)`
- `max-height: calc(100dvh - ...)`
- `overflow-y: auto`
- `overflow: hidden`

Bu nedenle soru seçenekleri ve cevap sonrası feedback doğal olarak sayfayı uzatmak yerine sağ panel içinde ayrı scroll alanına düşüyordu.

## Uygulanan çözüm
`AISpotQuestionScreen.jsx` içinde AI Spot ekranı klasik iki kolonlu/sticky sağ panel yapısından çıkarıldı. Yeni yapı:

```txt
[ai-spot-unified-panel]
  AISpotNarrativePanel
  ai-spot-answer-flow
    DiagnosisQuiz
      Yanıt seçenekleri
      Şıklar
      Feedback
[/ai-spot-unified-panel]
```

Böylece klinik metin, destek veriler, seçenekler ve feedback tek panel içinde doğal DOM akışıyla ilerliyor.

## Kaldırılan / bypass edilen scroll davranışları
AI Spot ekranı artık şu klasik vaka scroll kurallarını kullanmıyor:

- `professional-right-column` sticky sağ kolon davranışı
- `right-workspace-shell` iç scroll davranışı
- viewport-bound `height/max-height` kısıtı
- panel içi `overflow-y: auto`
- feedback alanını sağ panel içinde tutan nested scroll modeli

Yeni CSS override:

- `.ai-spot-unified-panel` → `height: auto`, `max-height: none`, `overflow: visible`
- `.ai-spot-answer-flow` → `height: auto`, `max-height: none`, `overflow: visible`
- `.ai-spot-answer-flow .question-panel` → `height: auto`, `max-height: none`, `overflow: visible`
- feedback alt bileşenleri → `height: auto`, `max-height: none`, `overflow: visible`

## Soru kökü tekrarı düzenlemesi
AI Spot ekranında eski büyük başlık olan “TUS spot karar sorusu” yerine `DiagnosisQuiz` için override destekleri eklendi:

- `questionHeadingOverride`
- `questionSubtextOverride`

AI ekranında bu alan artık:

- Başlık: `Yanıt seçenekleri`
- Alt metin: gerçek TUS karar sorusu

şeklinde çalışıyor. Ayrıca eski `tus-spot-olgular-question-callout` AI ekranında gizleniyor.

## Değiştirilen dosyalar

1. `src/components/AISpotQuestionScreen.jsx`
   - AI Spot ekranı `qbank-side-column / professional-right-column / right-workspace-shell` yapısından çıkarıldı.
   - Tek akışlı `ai-spot-unified-panel` ve `ai-spot-answer-flow` yapısı eklendi.
   - Narrative panel embedded modda kullanılacak şekilde güncellendi.
   - DiagnosisQuiz'e AI ekranı için sade başlık ve soru promptu override edildi.

2. `src/components/DiagnosisQuiz.jsx`
   - `questionHeadingOverride` ve `questionSubtextOverride` prop'ları eklendi.
   - AI ekranında “TUS spot karar sorusu” başlığının büyük ayrı panel hissi yaratması engellendi.
   - Mevcut klasik vaka/spot ekranları geriye dönük uyumlu bırakıldı.

3. `src/index.css`
   - `KLINIKIQ V176 — AI Spot single-flow layout, no nested scroll` bölümü eklendi.
   - AI Spot ekranı için doğal yüksekliğe sahip birleşik panel stilleri eklendi.
   - Feedback, seçenek ve question panel katmanlarında iç scroll üreten yükseklik/overflow davranışları override edildi.
   - Light/dark mode uyumlu birleşik panel tasarımı eklendi.
   - Mobilde tek kolon doğal okuma sırası korundu.

## Responsive davranış

- Desktop: Klinik metin + destek veriler üst alanda; seçenekler ve feedback aynı panel içinde altta doğal olarak uzuyor.
- Tablet: Destek veri paneli daraldığında alt/tek kolon akışa düşüyor; iç scroll oluşmuyor.
- Mobil: Sıralama başlık/meta → soru metni → destek veriler → seçenekler → feedback şeklinde; scroll yalnızca sayfada.

## QA sonuçları

Çalıştırılan kontroller:

```bash
npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
npm run build
npm run qa:ai-spot-readability
npm run qa:ai-spot-render-layout
```

Sonuçlar:

- `npm run build`: PASS
- `npm run qa:ai-spot-readability`: PASS
- `npm run qa:ai-spot-render-layout`: PASS
- Static layout check: PASS

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```

