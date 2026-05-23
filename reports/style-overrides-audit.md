# KlinikIQ Style Override Audit — V299

## Kapsam
Bu audit, V298 zip içindeki tüm style kaynaklarını ve JSX/JS class kullanımlarını tarayarak oluşturuldu. Tarama sadece görünen ekranlara değil, `src` altındaki CSS ve component class kullanımına göre yapıldı.

## Taranan dosyalar
- CSS dosyası: **5**
- JSX/JS/TS/TSX dosyası: **86**
- Override-relevant rule: **9427**
- Toplam `!important`: **19934**
- Hard-coded renk/rgba/hsla hit: **5697**
- Light-color kalıntı hit: **1114**
- Duplicate selector: **1847**
- Manual review gerektiren yüksek riskli rule: **5899**

## Dosya bazlı durum
| Dosya | Satır | Rule | `!important` | Hard color | Light-color hit | Vxxx/FIX/override yorumu |
|---|---:|---:|---:|---:|---:|---:|
| `src/index.css` | 50878 | 7795 | 14206 | 3331 | 732 | 345 |
| `src/components/tusPearlCards.css` | 14288 | 1952 | 2468 | 1614 | 232 | 289 |
| `src/styles/klinikiq-refine.css` | 4932 | 586 | 2393 | 343 | 89 | 24 |
| `src/styles/klinikiq-system.css` | 1540 | 172 | 721 | 220 | 50 | 6 |
| `src/styles/klinikiq-dark-mode-system.css` | 620 | 70 | 146 | 189 | 11 | 3 |

## Risk sınıflandırması
| Risk | Adet | Açıklama |
|---|---:|---|
| high | 5899 | Fonksiyonel/layout veya geniş scope riski |
| medium | 3208 | Temizlenebilir ama cascade kontrolü isteyen kural |
| low | 320 | Düşük riskli token/renk adayı |

## Aksiyon sınıflandırması
| Aksiyon | Adet | Anlamı |
|---|---:|---|
| manual-review | 5899 | Silinmedi; layout, tooltip, soru çözme veya responsive davranış riski var. |
| scope | 586 | Geniş selector; component scope’una daraltılmalı. |
| merge | 1721 | Aynı davranış başka blokla birleşebilir. |
| keep | 427 | Şimdilik gerekli/güvenli görünen kural. |
| move-to-token | 794 | Hard-coded renk/token adayı. |

## Yüksek riskli alanlar
- `src/index.css`: Çok büyük legacy ana katman; nav, case, feedback, responsive ve animasyon override’ları yoğun. Körlemesine temizlik yapılmadı.
- `src/components/tusPearlCards.css`: Lazy chunk olarak sonradan yüklendiği için global theme dosyasını ezme riski taşıyor; V299’da en güvenli scoped bridge burada daraltıldı.
- `src/styles/klinikiq-refine.css`: Topbar responsive fix blokları ve eski Vxx yorumları içeriyor; çoğu layout kritik olduğu için manual review’a bırakıldı.
- Glossary/tooltip/popover seçicileri: hover delay ve nested popover davranışıyla ilişkili olduğundan sadece token/surface düzeyinde güvenli dokunuş yapıldı.

## Envanter dosyaları
- `reports/style-overrides-inventory.json`: Rule bazlı selector, dosya, line range, renk, `!important`, risk ve önerilen aksiyon listesi.
- `reports/style-overrides-manual-review.json`: Yüksek riskli veya kullanım belirsizliği olan kurallar.
