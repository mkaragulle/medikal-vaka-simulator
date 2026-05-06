# KlinikIQ Branch Architecture Rework

## Yeni yapı

- Üstte tek, geniş ve özel **HIZLI CASE** modülü eklendi/korundu.
- Alt grid **12 standart TUS branşı** olarak düzenlendi.
- Masaüstünde hedef düzen: **4 kart x 3 satır**.
- Branş isimleri tek kaynak olan `src/data/branches.js` içindeki `STANDARD_BRANCHES` listesinden beslenir.

## Nihai standart branch listesi

1. HIZLI CASE (quick-case)
2. Anatomi (anatomy)
3. Fizyoloji (physiology)
4. Histoloji ve Embriyoloji (histology-embryology)
5. Tıbbi Biyokimya (medical-biochemistry)
6. Tıbbi Mikrobiyoloji (medical-microbiology)
7. Tıbbi Patoloji (medical-pathology)
8. Tıbbi Farmakoloji (medical-pharmacology)
9. İç Hastalıkları (internal-medicine)
10. Çocuk Sağlığı ve Hastalıkları (pediatrics)
11. Genel Cerrahi (general-surgery)
12. Kadın Hastalıkları ve Doğum (obstetrics-gynecology)
13. Küçük Stajlar (minor-rotations)

## Vaka sayıları

- HIZLI CASE: 14
- Anatomi: 1
- Fizyoloji: 1
- Histoloji ve Embriyoloji: 1
- Tıbbi Biyokimya: 14
- Tıbbi Mikrobiyoloji: 8
- Tıbbi Patoloji: 4
- Tıbbi Farmakoloji: 2
- İç Hastalıkları: 19
- Çocuk Sağlığı ve Hastalıkları: 5
- Genel Cerrahi: 5
- Kadın Hastalıkları ve Doğum: 1
- Küçük Stajlar: 9

## HIZLI CASE vakaları

- Travma öyküsü tutarsız bebekte çocuk istismarı şüphesi (pediatrics-shaken-baby-syndrome-001)
- Cinsel saldırı sonrası acile başvuran hastada ilk yaklaşım (internal-medicine-sexual-assault-evidence-001)
- Kesici-delici yaralanmada adli bildirim kararı (quick-forensic-stab-wound-001)
- Trafik kazası sonrası acil serviste adli rapor yaklaşımı (quick-forensic-traffic-accident-report-001)
- Bilinci kapalı hastada onam ve acil müdahale (quick-ethics-unconscious-consent-001)
- Aile içi şiddet şüphesinde hekim yaklaşımı (quick-domestic-violence-safety-001)
- Şüpheli zehirlenmede örnek saklama ve bildirim (quick-forensic-poisoning-sample-001)
- İş kazası sonrası raporlama ve tıbbi öncelik (quick-occupational-accident-reporting-001)
- Ani başlayan ürtiker ve hafif anjiyoödem (quick-clinical-urticaria-001)
- Ateşli çocukta zımpara kağıdı döküntüsü (quick-tus-scarlet-fever-001)
- Çekilme sonrası kolunu kullanmayan çocuk (quick-exam-nursemaid-elbow-001)
- Öksürük, konjunktivit ve Koplik lekeleri (quick-tus-koplik-measles-001)
- Ön burun kanamasında ilk müdahale (quick-emergency-epistaxis-first-step-001)
- Şüpheli ölümde hekimin adli süreç yaklaşımı (quick-forensic-death-suspicion-001)

## Yeni eklenen temel/TUS entegrasyon vakaları

- Humerus şaft travması sonrası el bileği düşüklüğü → Anatomi
- Ayağa kalkınca baş dönmesi ve kompansatuvar taşikardi → Fizyoloji
- Dil çıkarınca hareket eden orta hat boyun kitlesi → Histoloji ve Embriyoloji
- Amenore sonrası tek taraflı pelvik ağrı ve vajinal kanama → Kadın Hastalıkları ve Doğum
- Pestisit maruziyeti sonrası miyozis, bronkore ve kas fasikülasyonları → Tıbbi Farmakoloji

## Test sonucu

- Branch import kontrolü: geçti.
- Case import kontrolü: geçti.
- Duplicate branch ID: yok.
- Duplicate case ID: yok.
- Unknown branchId: yok.
- 12 standart branch kontrolü: geçti.
- Tüm standart branchlerde en az 1 vaka: geçti.
- `node --check` kontrolleri: `branches.js`, `cases.js`, `investigationOrders.js`, `glossary.js` geçti.
- `npm run build`: sandbox ortamında tamamlanamadı; çünkü bağımlılık kurulumu tamamlanamadı. Offline install `ENOTCACHED`, online install ise zaman aşımı/hung nedeniyle sonlandırıldı. Lokal ortamda `npm install` sonrası `npm run build` çalıştırılmalıdır.

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```
