# KlinikIQ Hap Bilgi Active Recall Global Fix

## Değiştirilen dosyalar

- `src/data/tusPearlCards.js` — Hap bilgi generator düzeltildi; keywords/trap varyantlarının “... sorusunda ...” meta dili kaldırıldı. Kartlara answer, tusTip, differentialNote alanları eklendi. Karbonmonoksit, hiperkalemi, anafilaksi, SLE ve sepsis gibi high-yield kartlar özel aktif hatırlama formatına çekildi.
- `src/utils/pearlCardContent.js` — Global normalizer/sanitizer eklendi. Front rewrite, front-back duplication temizliği, structured back parsing, AI pearl schema ve forbidden expression gate burada toplandı.
- `src/utils/pearlCardStorage.js` — Kullanıcı kartları da normalizePearlCardFields üzerinden güvenli biçimde geçirilerek eski back stringlerinden answer/explanation/tusTip/differentialNote ayrıştırılabilir hale getirildi.
- `src/components/TusPearlCard.jsx` — Kart arka yüzünde artık front cümlesi tekrar basılmıyor; sıra Yanıt → Kısa gerekçe → TUS ipucu → Ayırıcı not olarak düzenlendi.
- `src/components/TusPearlStudyScreen.jsx` — Odak çalışma ekranında aynı back-face düzeni uygulandı; frontText normalizer çıktısı kullanıldı.
- `src/components/TusPearlCardEditor.jsx` — Kişisel kart modalı aktif hatırlama diline çekildi; TUS ipucu ve Ayırıcı not alanları eklendi.
- `src/components/tusPearlCards.css` — TUS ipucu ve Ayırıcı not alanlarının okunabilir kutu/pill davranışı iyileştirildi.
- `api/generate-ai-question.js` — AI prompt standardına hap kartlarda yasaklı meta ifadeler ve aktif hatırlama kuralı eklendi.
- `src/utils/tusLanguageStandard.js` — Genel TUS dil standardındaki hap bilgi maddesi aynı yasaklı meta ifade kuralıyla güncellendi.
- `scripts/run-pearl-active-recall-language-test.mjs` — 700 hap kart için meta-language, front/back repetition ve required field QA testi eklendi.
- `package.json` — qa:pearl-active-recall-language scripti eklendi.

## Normalize edilen kart veri alanları

- `front`: Bağımsız aktif hatırlama sorusuna dönüştürüldü.
- `back`: Eski tek-string arka yüzler için fallback olarak korunur; render tarafında `answer` önceliklidir.
- `answer`: Net cevap alanı.
- `explanation`: Ön yüzü tekrar etmeyen 1–2 cümlelik kısa gerekçe.
- `tusTip`: Sınavda yakalanacak anahtar patern.
- `differentialNote`: Benzer kavram/çeldirici ayrımı; UI’da altta ayrı kutu olarak gösterilir.
- `noteLabel`: Varsayılan “Ayırıcı not”.

## Karbonmonoksit kartı — eski / yeni

### Eski problemli örnek
```text
Ön yüz:
Karbonmonoksit zehirlenmesi sorusunda doğru cevaba götüren ayırt ettirici ipuçları hangileridir?

Arka yüz:
Karbonmonoksit zehirlenmesi sorusunda doğru cevaba götüren ayırt ettirici ipuçları hangileridir?
Anahtar ipucu: CO → karboksihemoglobin → sola kayma → pulse oksimetre yanıltıcı
Yanıt
CO hemoglobine yüksek afiniteyle bağlanır; kalan bağlanma bölgeleri oksijeni daha sıkı tutar, dokulara bırakım azalır.
Ayırıcı not
PaO₂ normal olabilir; sorun plazmada çözünmüş oksijen değil hemoglobinin oksijen taşıma ve bırakma kapasitesidir.
```

### Yeni normalize edilmiş kart
```json
{
  "id": "tus-pearl-physiology-132-keywords",
  "topic": "Karbonmonoksit zehirlenmesi",
  "cardType": "Anahtar kelime",
  "front": "Karbonmonoksit zehirlenmesinde PaO₂ normal olsa bile doku hipoksisi neden gelişir?",
  "answer": "CO, hemoglobine yüksek afiniteyle bağlanarak karboksihemoglobin oluşturur ve oksijenin dokulara bırakılmasını azaltır.",
  "explanation": "Bu nedenle pulse oksimetre normal görünebilse bile dokular oksijenlenemez.",
  "tusTip": "CO → karboksihemoglobin → oksijen disosiasyon eğrisinde sola kayma → pulse oksimetre yanıltıcı.",
  "differentialNote": "PaO₂ normal olabilir; sorun plazmada çözünmüş oksijen değil hemoglobinin oksijen taşıma ve bırakma kapasitesindedir."
}
```

## Otomatik düzeltilmiş 10 problemli kart örneği

### 1. Karbonmonoksit zehirlenmesi
- Ön yüz: Karbonmonoksit zehirlenmesinde PaO₂ normal olsa bile doku hipoksisi neden gelişir?
- Yanıt: CO, hemoglobine yüksek afiniteyle bağlanarak karboksihemoglobin oluşturur ve oksijenin dokulara bırakılmasını azaltır.
- Kısa gerekçe: Bu nedenle pulse oksimetre normal görünebilse bile dokular oksijenlenemez.
- TUS ipucu: CO → karboksihemoglobin → oksijen disosiasyon eğrisinde sola kayma → pulse oksimetre yanıltıcı.
- Ayırıcı not: PaO₂ normal olabilir; sorun plazmada çözünmüş oksijen değil hemoglobinin oksijen taşıma ve bırakma kapasitesindedir.

### 2. Hiperkalemi + EKG değişikliği
- Ön yüz: EKG değişikliği olan ağır hiperkalemide ilk tedavi basamağı nedir?
- Yanıt: İntravenöz kalsiyum glukonat.
- Kısa gerekçe: EKG değişikliği olan ağır hiperkalemide öncelik kardiyak membran stabilizasyonudur.
- TUS ipucu: K⁺ ≥ 6,5 mEq/L ile sivri T dalgası, P dalgasında silinme veya QRS genişlemesi varsa ilk basamak kalsiyumdur.
- Ayırıcı not: İnsülin-glukoz potasyumu hücre içine kaydırır; ancak EKG değişikliği varsa membran stabilizasyonunun yerine geçmez.

### 3. Anafilaksi
- Ön yüz: Anafilakside hayat kurtarıcı ilk tedavi nedir?
- Yanıt: İntramüsküler adrenalin.
- Kısa gerekçe: Alerjen maruziyeti sonrası hipotansiyon, ürtiker, bronkospazm veya laringeal ödem varsa ilk ilaç adrenalindir.
- TUS ipucu: Anafilakside antihistaminik ve steroid destek tedavidir; ilk hayat kurtarıcı basamak adrenalin uygulamasıdır.
- Ayırıcı not: Astım atağında ürtiker/hipotansiyon beklenmez; herediter anjiyoödemde ürtiker tipik değildir ve adrenalin yanıtı sınırlı olabilir.

### 4. SLE aktivite
- Ön yüz: SLE hastalık aktivitesinin izleminde hangi laboratuvar paterni kullanılır?
- Yanıt: Anti-dsDNA artışı ve C3/C4 düşüklüğü.
- Kısa gerekçe: Bu patern özellikle lupus nefriti veya alevlenme bağlamında hastalık aktivitesini destekler.
- TUS ipucu: Aktivite izlemi için anti-dsDNA ve kompleman düzeyleri birlikte yorumlanır.
- Ayırıcı not: ANA tanıda duyarlı olabilir; aktivite izlemi için anti-dsDNA ve C3/C4 paterni daha değerlidir.

### 5. Sepsis erken yaklaşımı
- Ön yüz: Septik şok şüphesinde ilk yaklaşım hangi iki basamağı içermelidir?
- Yanıt: Geniş spektrumlu antibiyotik başlanması ve hızlı kristaloid resüsitasyonu.
- Kısa gerekçe: Hipotansiyon, laktat yüksekliği ve enfeksiyon odağı birlikteyse erken antibiyotik ve sıvı tedavisi önceliklidir.
- TUS ipucu: Sepsis/şok sorularında ilk yaklaşım yalnız antibiyotik veya yalnız sıvı değildir; erken kombine resüsitasyon düşünülür.
- Ayırıcı not: Vazopressör, yeterli sıvı resüsitasyonuna rağmen hipotansiyon sürerse gündeme gelir.

### 6. Ulnar sinir lezyonu
- Ön yüz: Ulnar sinir lezyonu için ayırt ettirici TUS paterni hangi ipuçlarından oluşur?
- Yanıt: 4–5. parmak duyu kaybı → pençe el → interosseöz zayıflık → Froment belirtisi.
- Kısa gerekçe: Ulnar sinir hipotenar kaslar, interosseözler ve medial 1,5 parmak duyusu ile ilişkilidir.
- TUS ipucu: Ulnar sinir hipotenar kaslar, interosseözler ve medial 1,5 parmak duyusu ile ilişkilidir.
- Ayırıcı not: Median sinir karpal tünelde başparmak-opozisyon ve ilk 3,5 parmak duyusu ile daha çok sorulur.

### 7. Radial sinir lezyonu
- Ön yüz: Radial sinir lezyonu için ayırt ettirici TUS paterni hangi ipuçlarından oluşur?
- Yanıt: düşük el → humerus şaft kırığı → ekstansiyon kaybı → posterior kol.
- Kısa gerekçe: Radial sinir el bileği ve parmak ekstansörlerini innerve eder; humerus şaft kırıklarında yaralanabilir.
- TUS ipucu: Radial sinir el bileği ve parmak ekstansörlerini innerve eder; humerus şaft kırıklarında yaralanabilir.
- Ayırıcı not: Median sinir lezyonu düşük el değil, thenar atrofi ve ape hand ile karışır.

### 8. V/Q uyumsuzluğu
- Ön yüz: V/Q uyumsuzluğu için ayırt ettirici TUS paterni hangi ipuçlarından oluşur?
- Yanıt: pulmoner emboli → perfüzyon azalır → V/Q artar → ölü boşluk.
- Kısa gerekçe: Emboli perfüzyonu düşürür ve ölü boşluk ventilasyonunu artırır.
- TUS ipucu: Emboli perfüzyonu düşürür ve ölü boşluk ventilasyonunu artırır.
- Ayırıcı not: Şantta perfüzyon vardır ama ventilasyon yoktur; embolide temel problem perfüzyon kaybıdır.

### 9. N. fibularis communis lezyonu
- Ön yüz: N. fibularis communis lezyonu için ayırt ettirici TUS paterni hangi ipuçlarından oluşur?
- Yanıt: düşük ayak → steppage yürüyüş → fibula boynu → dorsifleksiyon kaybı.
- Kısa gerekçe: N. fibularis communis fibula boynu çevresinde yüzeyel seyreder; dorsifleksiyon kaybı düşük ayak ve steppage yürüyüş oluşturur.
- TUS ipucu: N. fibularis communis fibula boynu çevresinde yüzeyel seyreder; dorsifleksiyon kaybı düşük ayak ve steppage yürüyüş oluşturur.
- Ayırıcı not: N. tibialis lezyonu plantar fleksiyon ve taban duyusu ile ilişkilidir; düşük ayak daha çok fibular sinir lezyonudur.

### 10. Parotis ve fasiyal sinir
- Ön yüz: Parotis ve fasiyal sinir için ayırt ettirici TUS paterni hangi ipuçlarından oluşur?
- Yanıt: parotis → mimik kasları → fasiyal sinir → cerrahi risk.
- Kısa gerekçe: Fasiyal sinir parotis bezinden geçer; parotis sekresyonunu parasempatik olarak innerve etmez ama mimik kaslarını innerve eder.
- TUS ipucu: Fasiyal sinir parotis bezinden geçer; parotis sekresyonunu parasempatik olarak innerve etmez ama mimik kaslarını innerve eder.
- Ayırıcı not: Glossopharyngeal sinir parotise parasempatik lif sağlar; cerrahide motor dalların korunması fasiyal sinirle ilişkilidir.

## AI promptlarına eklenen kural özeti

- Hap bilgi kartı bağımsız aktif hatırlama kartıdır.
- Gerçek kaynak soru kökü ve seçenekler gösterilmiyorsa “sorusunda”, “bu soruda”, “soru kökünde”, “doğru cevaba götüren”, “doğru şık”, “seçeneklerde”, “şıklarda”, “cevap anahtarı” kullanılmaz.
- Ön yüz doğrudan cevaplanabilir bir aktif hatırlama sorusu olmalıdır.
- Arka yüz front cümlesini tekrar etmez; Yanıt, Kısa gerekçe, TUS ipucu ve Ayırıcı not alanlarına ayrılır.
- AI pearl output gate raw çıktıda yasaklı meta ifade görürse `isPearlCardOutputAccepted: false` döndürür.

## Frontend tekrar engelleme mantığı

- `getPearlBackContent(card)` artık önce `normalizePearlCardFields(card)` çalıştırır.
- `TusPearlCard` ve `TusPearlStudyScreen`, `card.front` yerine normalize edilmiş `frontText` kullanır.
- Back face içinde front cümlesi render edilmez; yalnız `answer`, `explanation`, `tusTip`, `differentialNote` gösterilir.
- Eski back stringleri içinde ilk satır front ile aynıysa veya front cümlesini başta tekrar ediyorsa temizlenir.

## QA / Test sonuçları

- `npm run build` → passed
- `npm run qa:pearl-active-recall-language` → passed
  - Total cards: 700
  - Meta-language violations: 0
  - Front/back duplication violations: 0
  - Missing front/answer violations: 0
- `npm run qa:pearl-shuffle` → passed
- `npm run qa:ai-scientific-regression` → passed, 9/9 fixtures passed
- `npm run qa:answer-leakage` → passed on repaired runtime output; raw case data still contains legacy leakage warnings outside this hap-card sprint.

## Manual review required

Yok. Normalizer ve generator düzeltmesi sonrası 700 hap kartın tamamı testten geçti.
