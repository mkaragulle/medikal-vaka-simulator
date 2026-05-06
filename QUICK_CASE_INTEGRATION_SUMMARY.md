# KlinikIQ Hızlı CASE Entegrasyon Raporu

## Modül özeti
`Hızlı CASE`, klasik uzun klinik simülasyonlardan ayrı çalışan, kısa öykü-muayene temelli karar olguları için `quick-case` branch'i olarak eklendi. Bu modülde olgular `caseType: "quick"` ile işaretlenir; soru dili tanı yerine gerektiğinde adli, etik, yönetim, ilk yaklaşım veya TUS spot kararına göre değişir.

## Yeni branch
- `id`: `quick-case`
- `name`: `Hızlı CASE`
- `shortName`: `Hızlı CASE`
- `description`: `Kısa öykü, muayene ve hedefe yönelik karar sorularıyla hızlı klinik tekrar.`
- ikon: `Stopwatch`
- ton: `teal`

## Hızlı CASE sayısı
Toplam 15 Hızlı CASE vardır.

### Mevcut vakalardan Hızlı CASE'e taşınanlar
1. `cardiovascular-electrical-injury-arrhythmia-001` — Elektrik çarpması sonrası monitörizasyon ve iş kazası kaydı
2. `pediatrics-shaken-baby-syndrome-001` — Açıklanamayan morluk ve bilinç değişikliğinde çocuk istismarı yaklaşımı
3. `internal-medicine-sexual-assault-evidence-001` — Cinsel saldırı sonrası ilk tıbbi-adli yaklaşım
4. `pulmonology-near-hanging-asphyxia-001` — Boyun basısı sonrası gecikmiş havayolu riski

### Yeni yazılan Hızlı CASE'ler
1. `quick-stab-wound-forensic-001` — Kesici-delici yaralanmada adli bildirim kararı
2. `quick-domestic-violence-001` — Aile içi şiddet şüphesinde güvenlik ve kayıt yaklaşımı
3. `quick-unconscious-consent-001` — Bilinci kapalı hastada acil müdahale ve onam
4. `quick-urticaria-angioedema-001` — Ani başlayan ürtiker ve hafif anjiyoödem
5. `quick-scarlet-fever-001` — Ateşli çocukta zımpara kağıdı döküntüsü
6. `quick-needle-stick-exposure-001` — Sağlık çalışanında iğne batması sonrası ilk yaklaşım
7. `quick-carbon-monoxide-001` — Soba sonrası baş ağrısı ve karbonmonoksit şüphesi
8. `quick-simple-febrile-seizure-001` — Basit febril nöbet sonrası aile bilgilendirmesi
9. `quick-scaphoid-xray-normal-001` — Grafisi normal el bileği travmasında skafoid şüphesi
10. `quick-epiglottitis-airway-001` — Tripod pozisyonlu çocukta havayolu önceliği
11. `quick-anaphylaxis-adrenaline-001` — Çoklu sistem tutulumu olan alerjik reaksiyonda ilk tedavi

## Klasik branşlarda bırakılan vakalar
- Kardiyoloji, dahiliye, nöroloji, genel cerrahi, göğüs hastalıkları, enfeksiyon hastalıkları ve ortopedi vakalarının çoğu klasik formatta bırakıldı.
- Klasik kalan vakalar geniş tetkik paneli, EKG/görüntüleme/laboratuvar yorumu, ayırıcı tanı veya çok basamaklı yönetim gerektirdiği için uzun vaka simülasyonu formatında daha öğreticidir.
- Hızlı CASE'e yalnızca adli/etik/yönetim/spot karar formatına daha iyi uyan veya kısa klinik karar kazancı yüksek vakalar taşındı/yazıldı.

## UI/renderer değişiklikleri
- Branş seçim ekranına mevcut kart grid’iyle uyumlu `Hızlı CASE` kartı eklendi.
- Hızlı CASE kartı mevcut hover, active, responsive ve dark/light tema sistemini kullanır.
- `DiagnosisQuiz` artık `clinicalCase.questionTitle` ve `clinicalCase.question` alanlarını destekler.
- Hızlı olgularda soru başlığı “En olası tanı” yerine “Tıbbi-adli karar sorusu”, “İlk yaklaşım”, “Acil yönetim sorusu” gibi olguya uygun başlıklarla gösterilir.
- `caseType: "quick"` vakalarında otomatik jenerik tetkik listesi üretilmez.
- Hızlı vakada tetkik yoksa tetkik paneli hiç gösterilmez.
- Hızlı vakalarda varsayılan yönetim sırası paneli kapatılmıştır.
- Klasik vakalarda mevcut tetkik ve yönetim akışı korunmuştur.

## Değiştirilen dosyalar
- `src/data/branches.js`
- `src/data/cases.js`
- `src/components/BranchSelector.jsx`
- `src/components/CasePlayer.jsx`
- `src/components/DiagnosisQuiz.jsx`
- `src/components/AnswerFeedbackPanel.jsx`
- `src/components/ExamResults.jsx`
- `src/components/InvestigationPanel.jsx`
- `src/components/ManagementSequencePanel.jsx`
- `src/components/ui.jsx`
- `src/utils/investigationOrders.js`

## Test/validasyon sonucu
- `cases.js` import testi başarılı: 78 vaka yüklendi.
- `branches.js` import testi başarılı: 9 branch yüklendi.
- `quick-case` branch kontrolü başarılı: 15 hızlı olgu bulundu.
- Hızlı olgu schema kontrolü başarılı: tüm hızlı olgularda soru, 4 seçenek, doğru cevap, açıklama, pearl/öğrenme çıktısı ve benzersiz ID vardır.
- Hızlı olgularda tetkik kuralı başarılı: hiçbir hızlı olguda 2’den fazla tetkik yoktur; tetkik olmayanlarda panel gizlenir.
- Fizik muayene alanında yasaklı laboratuvar/tetkik ifadesi taraması başarılı: 0 hit.
- `npm run build` sandbox ortamında çalıştırılamadı; ZIP içinde `node_modules` bulunmadığı ve `npm install` süresi sandbox limitini aştığı için `vite: not found` hatası alınmıştır.

## Çalıştırma komutları
```bash
npm install
npm run build
npm run dev
```
