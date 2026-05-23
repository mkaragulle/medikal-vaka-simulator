# KlinikIQ V301 Dark Mode Targeted UI Fix Report

## Kök sebep
V298/V299 token bridge genel olarak doğru yönde olsa da bazı geç yüklenen veya yüksek specificity kullanan legacy CSS blokları dark mode tokenlarını tekrar eziyordu. Özellikle `src/index.css` içindeki topbar/hero/stat kart Vxx blokları ve `src/components/tusPearlCards.css` içindeki lazy-loaded Hap Bilgi ekranı kuralları light-mode yüzey, beyaz/ açık gri ikon arka planı ve zayıf disabled-state kombinasyonlarını dark mode'da yeniden bindiriyordu.

## Değiştirilen dosyalar
- `src/styles/klinikiq-dark-mode-system.css`
- `src/components/tusPearlCards.css`
- `reports/dark-mode-v301-targeted-fix-report.md`
- `reports/dark-mode-v301-targeted-fix-report.json`

## Kullanılan semantic dark-mode tokenlar
Mevcut V299 token sistemi korunarak V301 içinde compatibility alias mantığı genişletildi:
- `--ki-dark-bg`
- `--ki-dark-surface`
- `--ki-dark-surface-elevated`
- `--ki-dark-surface-soft`
- `--ki-dark-surface-muted`
- `--ki-dark-surface-disabled`
- `--ki-dark-text`
- `--ki-dark-text-secondary`
- `--ki-dark-text-muted`
- `--ki-dark-text-disabled`
- `--ki-dark-border`
- `--ki-dark-border-strong`
- `--ki-dark-accent`
- `--ki-dark-accent-soft`
- `--ki-dark-success-soft`
- `--ki-dark-danger-soft`
- `--ki-dark-warning-soft`
- `--ki-dark-focus-ring`
- `--ki-dark-icon-surface`
- `--ki-dark-button-secondary`
- `--ki-dark-button-disabled`

## Düzeltilen component grupları
1. Üst bar / top navigation
2. Komite/TUS ve Öğrenme/Sınav/Zor switchleri
3. Hero CTA kartları ve ikon kutuları
4. Dashboard stat kartları, ikon kutuları ve sparkline yüzeyleri
5. Kişisel tekrar / Yanlış çözülenler kartları
6. Yanlış cevap X icon button ve Temizle disabled state
7. Hap Bilgi Kartları hub paneli ve TUS Spot çalışma callout'u
8. Hap Bilgi Çalış üst barı, geri butonu, branş picker ve progress pill
9. Tekrar Araçları / Kart Araçları paneli
10. Hap kart ön yüz ve arka yüz bölüm kutuları
11. Biliyorum / Tekrar et / Zorlandım karar butonları
12. Seçimin / Doğru cevap / yanlış feedback tagleri
13. Glossary inline kelimeleri ve tooltip/popover yüzeyleri
14. Catalog action buttons ve added/disabled state

## Üst bar düzeltmesi
`global-topbar-v55` için dark surface, border ve text/icon kontrastı yeniden tokenlara bağlandı. Nav user, wrong count, score, timer, theme ve logout icon buttonları aynı dark icon-button sistemiyle hizalandı. `13` yanlış badge'i soft danger pill, `812` skor alanı daha okunur muted/warning hiyerarşisiyle bırakıldı. Active tablar teal-soft, inactive tablar muted ama okunabilir hale getirildi; Zor butonu dark-danger-soft görünüm aldı.

## Hero CTA alanı
`Vaka Çözmeye Başla`, `Zamanlı sınav oluştur` ve `AI İle Soru Üret` CTA'ları dark mode'da aynı yüzey ailesine alındı. Primary CTA kontrollü teal gradient, secondary CTA dark surface + soft border, AI CTA soft accent yüzey olarak ayrıldı. CTA icon kutularındaki light-mode beyaz/gri kalıntılar kaldırıldı.

## Dashboard stat kartları
`tus-stat-card-redesign`, `tus-stat-icon-wrap` ve `tus-stat-sparkline` için dark-mode'a özel kart, ikon ve mini-chart yüzeyleri eklendi. Beyaz radial/gradient kalıntıları dark surface + düşük opaklıklı accent sistemine taşındı. Büyük sayılar ve label'lar V299 text tokenlarıyla korunuyor.

## Yanlış çözülenler ve X butonu
`wrong-answer-card` dark card surface'e alındı. `wrong-answer-actions .btn-icon.quiet` açık gri/beyaz görünüme düşmemesi için dark ghost icon button olarak scope'landı; hover durumunda soft danger feedback eklendi. `wrong-clear-btn:disabled` dark disabled token kullanacak şekilde düzeltildi.

## Hap Bilgi / tekrar araçları / kart ön-arka yüzleri
`tusPearlCards.css` geç yüklendiği için aynı düzeltmeler bu dosyanın en sonuna scoped olarak eklendi. Hap Bilgi Çalış üst barı, Tekrar Araçları, Kart Araçları, pearl card faces, answer/detail/tip/note panel yüzeyleri dark elevated/surface-soft tokenlarına bağlandı. `Biliyorum`, `Tekrar et`, `Zorlandım` butonları success/info/warning-soft mantığıyla ayrıldı.

## Seçimin / Doğru cevap tagleri
AI feedback ve option comparison tagleri için dark mode state sistemi eklendi:
- Seçimin: soft info/accent
- Doğru cevap: soft success
- Yanlış/incorrect: soft danger
Bu kurallar sadece dark mode altında çalışır.

## Glossary words ve pop-up'lar
Inline glossary kelimelerinde yoğun background kaldırıldı; subtle dotted underline kullanıldı. Tooltip/popover yüzeyi dark elevated surface, soft border ve yüksek okunabilirlikli text tokenlarına bağlandı. Hover-delay/nested tooltip davranışına dokunulmadı.

## Light mode testi
Tüm yeni kurallar `.app-shell[data-theme="dark"]` veya `html[data-theme="dark"]` altında scope'landı. Light mode selectorlarına doğrudan müdahale edilmedi.

## Mobil/desktop testi
CSS syntax/braces kontrolü yapıldı. Responsive layout kurallarına, grid kolonlarına, React state ve data mapping mantığına dokunulmadı. Mobile davranışı etkileyen yeni layout değişikliği yapılmadı; sadece renk/yüzey/state katmanı güncellendi.

## Fonksiyonel regresyon
React state, soru çözme mantığı, TUS/KOMİTE switch, glossary matching, hover delay, nested tooltip, scoring, storage ve routing kodlarına dokunulmadı. `npm run build` denendi; zip ortamında `node_modules` bulunmadığı için `vite: not found` ile çalışmadı. CSS brace/comment dengesi temiz çıktı.

## Kalan risk
Ana risk, `src/index.css` içinde 50K+ satırlık legacy Vxx CSS'in yüksek specificity ile bazı yeni ekranlarda beklenmedik override üretmesi. V301 bu riski en sorunlu görünen alanlarda scoped son-katman kurallarıyla azaltır; büyük çaplı legacy CSS silme yapılmadı, çünkü fonksiyonel/görsel regresyon riski yüksek.
