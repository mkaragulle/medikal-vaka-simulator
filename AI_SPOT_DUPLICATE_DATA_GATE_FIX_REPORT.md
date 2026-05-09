# AI Spot Duplicate Data Gate Fix

## Kök neden
AI Spot ekranındaki sol anlatı metni (`stem`/`narrativeStem`) ve sağ destek veri paneli aynı kaynaklardan beslendiği hâlde aralarında kesin bir ayrıştırma katmanı yoktu. `aiSpotNarrative.js` laboratuvar/seroloji/vital verilerini sağ panele çıkarmaya çalışıyordu; ancak `Laboratuvar:`, `Serolojide`, `Serum K+`, `EKG’de...` gibi varyasyonlarda ham veri cümlesi sol metinde kalabiliyordu. Sonuçta ANA, anti-dsDNA, C3, HBsAg, K⁺, lökosit, CRP, vital bulgular ve EKG gibi objektif veriler hem paragrafta hem sağ panelde tekrar görünüyordu.

## Uygulanan çözüm
Merkezi `duplicateDataGate` mantığı `src/utils/aiSpotNarrative.js` içine eklendi ve remote AI normalize akışına bağlandı. Bu gate:

1. Sol metindeki laboratuvar, seroloji, vital, EKG ve görüntüleme verilerini tespit eder.
2. Bu verileri `compactVitals` veya `compactObjectiveData` alanına taşır / mevcut verilerle birleştirir.
3. Sol metinden ham veri listelerini ve aynı değerleri içeren cümleleri kaldırır.
4. Sol metni yalnız klinik anlatım + temiz soru akışı kalacak şekilde sadeleştirir.
5. Sağ panelde verileri yorumsuz label/value formatında gösterir; yorum ve öğretici açıklama feedback sonrasına bırakılır.

## Sol metinden sağ panele taşınan veri tipleri
- Vital bulgular: TA, nabız, solunum, ateş, SpO₂
- Laboratuvar: lökosit, CRP, laktat, glukoz, pH, HCO₃, kreatinin, troponin, D-dimer, K⁺/potasyum vb.
- Seroloji/otoimmünite: ANA, anti-dsDNA, C3, C4, HBsAg, anti-HBc IgM, HBV DNA, HCV RNA vb.
- Mikrobiyoloji: Gram, oksidaz, DNaz, kültür/duyarlılık gibi kısa objektif veriler
- EKG ve görüntüleme: EKG bulguları, BT/USG/MR/grafi kısa sonuçları

## SLE örneği
Önce sol metin içinde şu ham veri bloğu kalabiliyordu:

`Laboratuvar: ANA pozitif, anti-dsDNA 120 IU/ml (norm <30), complement C3 düşük.`

Sonra sol metin şu şekilde sadeleşir:

`Hastanın eklem ağrısı ve yüz döküntüsü 2 haftadır artmış, sabah tutukluğu 1 saat sürmektedir. Fizik muayenede bilateral el bileklerinde şişlik ve sıcaklık artışı saptanmaktadır.`

Sağ panel:

- ANA: Pozitif
- Anti-dsDNA: 120 IU/mL
- C3: düşük

## Prompt güçlendirmesi
`api/generate-ai-question.js` promptuna açık kural eklendi: `compactVitals` veya `compactObjectiveData` içine konulan objektif veriler `stem` içinde tekrar sayı/değer listesi olarak yazılmayacak. Stem yalnız klinik bağlamı taşıyacak; objektif veriler sağ panelde kalacak.

## QA
Yeni test scripti eklendi:

`npm run qa:ai-spot-duplicate-data`

Test edilen senaryolar:
- SLE aktivite izlemi: ANA / anti-dsDNA / C3
- Akut hepatit serolojisi: HBsAg / anti-HBc IgM / HBV DNA
- Sepsis: TA / nabız / ateş / lökosit / laktat / CRP
- Hiperkalemi: K⁺ / EKG

Sonuç: 4/4 senaryo başarılı.
