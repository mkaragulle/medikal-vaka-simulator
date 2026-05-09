# KlinikIQ TUS Dil Standardı ve AI Quality Gate Rework Raporu

## Özet
Bu çalışma, TUS analiz raporunda tanımlanan soru kökü mimarisi, profesyonel Türkçe, kavramsal olarak homojen seçenek standardı, güçlü çeldirici mantığı, cevap kaçağı kontrolü ve bilimsel önceliklendirme ilkelerini KlinikIQ projesinin gömülü içerik, UI metni, AI prompt, parser/normalizer, validator ve fallback üretim katmanlarına taşımak için yapılmıştır.

## Değiştirilen / eklenen ana dosyalar
- `api/generate-ai-question.js`: Remote AI prompt sistemi TUS dili, objektif veri, çeldirici standardı, answer leakage ve forbidden phrase kurallarıyla yeniden güçlendirildi.
- `src/utils/tusLanguageStandard.js`: Yeni merkezi TUS dil standardizasyon yardımcı modülü eklendi.
- `src/utils/aiQuestionQualityGate.js`: AI çıktıları TUS dil standardından geçirilir hale getirildi; zayıf dil, mekanik ifade ve cevap kaçağı kontrolleri güçlendirildi.
- `src/utils/validateAIQuestion.js`: Normalize/validate akışına merkezi TUS standardizasyonu eklendi.
- `src/utils/clinicalScientificAccuracyGate.js`: Klinik öncelik ve feedback metinleri daha profesyonel sınav diline çekildi.
- `src/utils/editorialQuality.js`: Zayıf genel-geçer tamir cümlesi daha sınav odaklı bir ifadeyle değiştirildi.
- `src/data/cases.js`: Gömülü vakalar export öncesi answer-leakage ve TUS dil standardı katmanından geçirildi.
- `src/data/pdfPediatricArrhythmiaCases.js`: Zayıf/dil karışımı ifadeler temizlendi.
- `src/data/aiSyntheticFallbackTemplates.js`: Fallback soru/feedback dili TUS standardına yaklaştırıldı.
- `src/components/AIGeneratedQuestionView.jsx`: AI soru üretim ekranındaki mikrocopy TUS odaklı, güvenli ve profesyonel hale getirildi.
- `src/components/AnswerFeedbackPanel.jsx`: Feedback fallback ifadelerinde mekanik/boş cümleler kaldırıldı.
- `src/components/HomeCommandCenter.jsx`: Başlık dili daha tutarlı hale getirildi.

## Uygulanan TUS dil ve içerik standartları
- Soru kökü: demografik veri → şikâyet/süre → öykü → fizik muayene → objektif veri → karar sorusu.
- Dil: sade, akademik Türkçe; geniş zaman ve edilgen klinik anlatım.
- Seçenekler: 5 seçenek, aynı kavramsal kategori, uzunluk dengesi, “hepsi/hiçbiri” yasağı.
- Çeldiriciler: yakın tanı, önce/sonra algoritma basamağı, benzer mekanizma/ilaç sınıfı ve kontraendikasyon tuzağı.
- Feedback: klinik gerekçe, olguya özgü kanıt zinciri, kısa sınav notu, yanlış seçeneğin hangi durumda doğru olabileceğini açıklayan yapı.
- Cevap kaçağı: başlık, spot bilgi, objektif veri ve soru öncesi alanlarda doğru yanıtı doğrudan veren yorumlar engellendi.

## Test sonuçları
- `npm run build`: Başarılı.
- `npm run qa:answer-leakage`: Başarılı; repaired scan sonucunda 161 vakanın 0'ında cevap kaçağı kaldı.
- `npm run qa:ai-scientific-accuracy`: Başarılı; 100/100 AI fallback soru kalite kontrolünden geçti.
- `npm run qa:ai-answer-leakage`: Başarılı; 100/100 AI soru cevap kaçağı testinden geçti.
- `npm run qa:ai-spot-readability`: Başarılı.

## Kalan riskler
- Otomatik validatorlar güçlü bir güvenlik katmanı sağlar; ancak guideline hassasiyeti yüksek konuların dönemsel uzman hekim editör kontrolü gerekir.
- Remote AI servisleri API anahtarı olmadan gerçek endpoint üzerinden test edilmedi; lokal prompt/validator/fallback akışı test edildi.
- Seçenek kategori homojenliği heuristik olarak kontrol edilir; çok incelikli tıbbi sınıflandırmalarda manuel QA önerilir.
