# KlinikIQ Smart Glossary V272 – Tooltip Tag Cleanup

## Amaç
Tooltip kartlarında gereksiz yer kaplayan kategori rozeti ve pre-answer uyarı rozeti kaldırıldı.

## Kaldırılan UI öğeleri
- Tooltip sağ üstündeki kategori etiketi: örn. `Asit-baz bozukluğu`, `Endokrinoloji`, `EKG bulgusu`
- Pre-answer moddaki uyarı rozeti: `TUS ipucu yanıt sonrası açılır.`

## Korunan davranışlar
- Pre-answer / post-answer cevap sızdırma koruması aynen korundu.
- Cevap öncesinde TUS ipucu, ayırıcı not, mekanizma ve detay alanları hâlâ gösterilmez.
- Cevap sonrasında TUS ipucu ve ayırıcı not gösterilmeye devam eder.
- Nested tooltip sistemi korundu.
- Portal tabanlı overflow/clipping koruması korundu.
- Glossary veri modelindeki `category` alanı silinmedi; yalnızca preview kartında gösterimi kaldırıldı.

## Değiştirilen dosya
- `src/components/GlossaryTooltip.jsx`

## Not
Bu değişiklik veri tarafını veya matching algoritmasını değiştirmez; yalnızca tooltip kartlarının daha sade, kompakt ve AMBOSS-style preview mantığına yakın görünmesini sağlar.
