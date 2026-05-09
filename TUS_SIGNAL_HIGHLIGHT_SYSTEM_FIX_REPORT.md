# KlinikIQ — TUS İşareti Global Highlight Sistem Düzeltmesi

## Kök neden
“TUS işareti / Spot bilgi / Anahtar kelime” yüzeylerinde iki farklı görsel vurgu sistemi üst üste çalışıyordu:

1. `GlossaryText` bazı tıbbi terimleri inline span olarak işaretliyor ve eski CSS katmanları bu spanlara mint/açık yeşil arka plan verebiliyordu.
2. Uzun cümleler `keywords` listesine düşüp chip gibi basılabiliyordu. Satır kırıldığında bu yapı paragraph highlight gibi görünüyordu.

Bu nedenle metin arkasında düzensiz şeritler, parçalı highlight blokları ve uzun chipler oluşuyordu.

## Yeni yapı
`TUS işareti` kartı artık şu hiyerarşiyi kullanır:

- Başlık: `TUS işareti`
- Alt başlık: `Hap bilgi`
- Spot bilgi: normal paragraf, arka plan highlight yok
- Kritik ipuçları: uzun ifadeler chip değil, madde listesi
- Kısa chipler: en fazla 3 kısa badge

## Global tasarım standardı
Yeni global vurgu standardı eklendi:

- Inline emphasis: sadece renk/underline; arka plan şeridi yok
- Keyword badge/chip: kısa etiketler için kompakt, tek satırlık yapı
- Insight list: uzun klinik cümleler için madde listesi
- Spot note card: paragraf highlight yerine temiz tipografik vurgu

## Teknik değişiklikler

### `src/components/AnswerFeedbackPanel.jsx`
- `ExamNoteFeedback` yeniden yapılandırıldı.
- `Sınav notu / Kritik hatırlatma` yerine `TUS işareti / Hap bilgi` başlığı kullanıldı.
- Spot bilgi içinde `GlossaryText` kullanılmadı; böylece terim bazlı highlight şeritleri kart içinde çalışmıyor.
- Uzun keywordler için `spot-note-insight-list` alanı eklendi.
- Chipler `keyword-badge` sistemiyle sınırlandı.

### `src/utils/feedbackDuplicationGate.js`
- `cleanInsightList` eklendi.
- Uzun keyword/cümleler chip olmaktan çıkarılıp `keyPoints` alanına taşınıyor.
- Kısa chipler en fazla 3 adet kalıyor.

### `src/index.css`
- Global visual-emphasis reset eklendi.
- `.glossary-term` arka plan/highlight şeritleri feedback ve TUS yüzeylerinde kaldırıldı.
- `keyword-badge`, `info-chip`, `spot-note-card`, `spot-note-insight-list` stilleri eklendi.
- Light/dark mode chip ve kart renkleri rafine edildi.

### `src/components/tusPearlCards.css`
- TUS pearl yüzeyleri için final chip/highlight normalization eklendi.
- Eski mint pill görünümü daha nötr badge sistemine çekildi.

### `scripts/run-highlight-standard-test.mjs`
- Static QA testi eklendi.

### `package.json`
- `npm run qa:highlight-standard` komutu eklendi.

## QA sonucu
Çalıştırılan komutlar:

```bash
npm run build
npm run qa:highlight-standard
npm run qa:ai-feedback-duplication
npm run qa:ai-spot-render-layout
npm run qa:ai-spot-readability
npm run qa:ai-spot-duplicate-data
```

Sonuç: Başarılı.

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```
