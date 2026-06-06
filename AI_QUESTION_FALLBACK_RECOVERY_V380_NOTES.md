# KlinikIQ V380 — AI soru fallback azaltma ve +1 backup kurtarma düzeltmesi

Bu sürüm, `VITE_AI_ENABLE_NEXT_QUESTION_PREFETCH=true` ve `VITE_AI_PREFETCH_QUEUE_SIZE=1` kullanıldığında görünür sorunun fallback'e düşüp hemen ardından sonraki tıklamada hazır sorunun gelmesi problemini azaltır.

## Yapılanlar

- Ana soru isteği, aynı branş/zorluk için aktif +1 backup prefetch varsa kısa süre bu mevcut isteğin tamamlanmasını bekler.
- Ana istek server fallback döndürürse, yeni API çağrısı başlatmadan aktif prefetch'e kısa bir grace window verir.
- Prefetch başarılı olursa fallback gösterilmeden gerçek soru ekrana gelir.
- Fallback uyarısı varsayılan olarak gizlendi. İstenirse `VITE_AI_SHOW_FALLBACK_NOTICE=true` ile tekrar açılabilir.
- TUS ultra profilinde `tusSpotQuestion` output token üst sınırı 1150'den 1450'ye yükseltildi. Bu maksimum sınırdır; model gereksiz token üretmeye zorlanmaz, ama JSON'un yarıda kesilip fallback'e düşme riskini azaltır.

## Yeni / önerilen env ayarları

```env
VITE_AI_ENABLE_NEXT_QUESTION_PREFETCH=true
VITE_AI_PREFETCH_QUEUE_SIZE=1
VITE_AI_PREFETCH_FIRST_WAIT_MS=1800
VITE_AI_FALLBACK_GRACE_WAIT_MS=3200
VITE_AI_SHOW_FALLBACK_NOTICE=false
TUS_REMOTE_AI_ATTEMPTS=1
KLINIKIQ_AI_COST_PROFILE=ultra
KLINIKIQ_FORCE_FAST_MODEL=true
```

## Maliyet mantığı

Bu düzeltme yeni ek API çağrısı başlatmaz. Mevcut aktif backup prefetch isteğini yeniden kullanır. Böylece hem duplicate istek azalır hem de kullanıcıya fallback uyarısı daha az gösterilir.
