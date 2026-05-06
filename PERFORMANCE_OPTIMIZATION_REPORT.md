# KlinikIQ Performance Optimization Report

## Kısa analiz
Uygulamada hissedilen mikro-lag ve frame-frame geçiş hissi ağırlıklı olarak üç noktadan kaynaklanıyordu:

1. Branş seçim ekranında her branch kartı render sırasında tüm vaka listesini tekrar `filter/reduce` ederek hesaplama yapıyordu.
2. Vaka/soru geçişlerinde `key={selectedCase.id}` kullanımı büyük CasePlayer subtree'sini komple unmount/mount ediyor, bu da scroll, glossary, tetkik ve soru panellerinin yeniden kurulmasına neden oluyordu.
3. Branch transition overlay ve branch kart ikonlarında aynı anda çalışan çok sayıda sürekli CSS animasyonu, `filter`, `drop-shadow`, `backdrop-filter`, blur/glow ve büyük box-shadow kombinasyonları paint/composite yükünü artırıyordu.

## Optimize edilen animasyonlar
- Branch transition süresi 1750 ms'den 920 ms'ye düşürüldü; fade-out 280 ms'den 180 ms'ye indirildi.
- Branch transition overlay'de `backdrop-filter` kaldırıldı.
- Hareketli particle/sparkle/effect elementleri transition overlay içinde devre dışı bırakıldı.
- Branch transition icon motion tek, hafif, transform/opacity tabanlı float animasyonuna indirildi.
- Branch kartlarındaki 13 kartın sürekli idle SVG animasyonları kaldırıldı; animasyon artık hover/focus ve launch anında çalışıyor.
- Vaka geçiş animasyonu kısa, transform/opacity tabanlı hale getirildi.
- Answer feedback ikon animasyonu kısa bir pop animasyonuna sadeleştirildi.
- `prefers-reduced-motion: reduce` için yanlışlıkla animasyonları çalıştıran kural override edildi ve animasyonlar gerçekten minimuma indirildi.

## React re-render optimizasyonları
- `BranchSelector` ve `BranchCard` memoize edildi.
- Branch kart istatistikleri tek seferde `useMemo` ile hesaplanıp branch kartlarına hazır veri olarak geçirildi.
- App içinde erişilebilir vaka indeksi `Map` yapısıyla normalize edildi: `byId`, `byBranchId`, `ids`.
- `getCasesByBranch(...).filter(...)` tekrarları azaltıldı.
- Vaka/soru wrapper'ındaki `key={selectedCase.id}` kaldırıldı; CasePlayer artık komple remount olmadan vaka datasına göre güncelleniyor.
- CasePlayer `React.memo` ile sarıldı.
- `handleSelectBranch`, `handleSelectCase`, `handleRandomCase`, `handleSubmitAnswer`, exam navigation handler'ları ve tutor toggle handler'ı `useCallback` ile stabilize edildi.
- Exam timer sırasında `remainingSeconds` artık CasePlayer'a gönderilmiyor; böylece her saniye tüm vaka panelinin yeniden render edilmesi azaltıldı.
- `activeExamCaseMeta` memoize edildi; exam timer tick'leri sırasında aynı soru paneline gereksiz prop değişimi gitmesi engellendi.
- CasePlayer scroll section tracking'de aynı aktif section tekrar tekrar setState yapılmayacak şekilde ref tabanlı guard eklendi.
- InvestigationPanel ve ManagementSequencePanel memoize edildi.
- Investigation orders CasePlayer'da hesaplanıp InvestigationPanel'a geçirildi; aynı vaka için tekrar `buildInvestigationOrders` çalışması azaltıldı.

## Hafifletilen CSS efektleri
- Branch overlay: `backdrop-filter`, blur ve sürekli glow breathe kaldırıldı.
- Branch route glow: `filter: blur(...)` yerine static radial glow kullanıldı.
- Branch route ring ve orb: sürekli loop azaltıldı.
- Branch card idle SVG animasyonları: sürekli loop yerine hover/focus animasyonuna dönüştürüldü.
- Ağır hover transition listelerinden `box-shadow` çıkarıldı; transform/opacity/background/border odaklı hale getirildi.
- Answer option solved state: ağır shadow yerine kısa icon feedback animasyonu kullanıldı.
- Tooltip shadow ve transition hafifletildi.

## Değiştirilen dosyalar
- `src/App.jsx`
- `src/components/BranchSelector.jsx`
- `src/components/CasePlayer.jsx`
- `src/components/DiagnosisQuiz.jsx`
- `src/components/InvestigationPanel.jsx`
- `src/components/ManagementSequencePanel.jsx`
- `src/index.css`
- `PERFORMANCE_OPTIMIZATION_REPORT.md`

## Build / test sonucu
- JSX/JS syntax kontrolü: `tsc --allowJs --jsx react-jsx --noEmit ...` ile başarılı.
- CSS parse kontrolü: PostCSS ile başarılı.
- `npm run build` sandbox içinde çalıştırıldı fakat `node_modules` bulunmadığı için `vite: not found` hatası verdi.
- `npm install` sandbox ortamındaki internal registry erişiminde zaman aşımına takıldı; bu nedenle gerçek Vite production build burada tamamlanamadı.
- Yerel ortamda `npm install` tamamlandıktan sonra `npm run build` çalışmalıdır.

## Çalıştırma komutları
```bash
npm install
npm run build
npm run dev
```
