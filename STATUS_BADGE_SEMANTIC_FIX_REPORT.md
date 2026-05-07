# KlinikIQ Update29 — Semantic Status Badge Fix

## Değişiklik özeti

Durum badge sistemi yalnızca `Yüksek`, `Düşük`, `Negatif`, `Pozitif` gibi yüzeysel kelimelere göre değil; `Sonuç + Referans + Not` birlikte değerlendirilerek çalışacak şekilde güncellendi.

## Düzeltilen problem

Örnek eski problem:

- Parametre: Açık yara kontaminasyonu
- Sonuç: Saptanmadı
- Referans: Saptanmamalı
- Durum: Düşük / kırmızı

Bu durum artık `Beklenen` ve yeşil olarak gösterilir.

## Yeni davranış

- Sayısal değerlerde referans aralığı parse edilir.
- Kategorik değerlerde semantik eşleşme yapılır.
- `Saptanmadı + Saptanmamalı`, `Negatif + Negatif`, `Yok + Yok` gibi sonuçlar normal/beklenen kabul edilir.
- `Saptandı/Pozitif/Var + Saptanmamalı/Negatif/Yok` gibi sonuçlar anormal kabul edilir.
- `Sınırda`, `hafif`, `takip` gibi ifadeler warning/turuncu tonuna alınır.

## Test edilen örnekler

- Açık yara kontaminasyonu: Saptanmadı / Saptanmamalı → Beklenen / success
- Kreatinin: 0.9 mg/dL / 0.6-1.2 mg/dL → Normal veya Referans içinde / success
- Üre: 34 mg/dL / 10-45 mg/dL → Referans içinde / success
- Sodyum: 136 mmol/L / 135-145 mmol/L → Referans içinde / success
- Glukoz: 412 mg/dL / 70-100 mg/dL → Yüksek / danger
- CRP: 142 mg/L / <5 mg/L → Yüksek / danger
- Ateş: 38.2 °C / 36.5-37.5 °C → Yüksek / danger
- ST elevasyonu: Saptandı / Saptanmamalı → Anormal / danger

## Değiştirilen dosya

- `src/components/InvestigationPanel.jsx`
