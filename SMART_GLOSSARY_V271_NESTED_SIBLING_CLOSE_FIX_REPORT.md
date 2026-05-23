# KlinikIQ Smart Glossary V271 — Nested Tooltip Sibling Close Fix

## Problem
V270 sürümünde nested glossary tooltip sistemi çalışıyordu; ancak aynı parent tooltip içindeki iki farklı glossary terimi arasında geçiş yapıldığında ilk açılan child tooltip kapanmadan ekranda kalabiliyordu. Bunun nedeni, önceki hover/leave kuralının `herhangi bir glossary tooltip alanına geçiliyorsa kapatma` şeklinde fazla geniş yazılmasıydı.

## Root Cause
`GlossaryTerm` içindeki `scheduleClose` davranışı, `relatedTarget` herhangi bir tooltip portal alanındaysa kapanmayı iptal ediyordu. Bu parent tooltip'in çocuk tooltip açılırken kapanmasını engelliyordu; fakat aynı parent kart içindeki kardeş glossary terimleri arasında geçişte eski child tooltip'in kapanmasını da engelliyordu.

## Yapılan Düzeltme
Değiştirilen dosya:

- `src/components/GlossaryTooltip.jsx`

Eklenen/iyileştirilen mantık:

1. Floating tooltip instance'larına `data-glossary-tooltip-owner` eklendi.
2. Trigger'dan çıkış ve floating card'dan çıkış davranışları ayrıldı.
3. Trigger'dan başka bir kardeş glossary terime geçildiğinde eski child tooltip artık kapanır.
4. Trigger'dan kendi floating card'ına geçildiğinde tooltip açık kalır.
5. Parent floating card'dan daha derin nested child floating card'a geçildiğinde parent açık kalır.
6. Child floating card'dan parent/sibling alana dönüldüğünde child tooltip kapanır.
7. Aynı nesting level'da yeni bir glossary term açılınca açık kalan sibling tooltip'ler global event ile anında kapatılır.

## Davranış Özeti
- Parent tooltip açıkken içindeki birinci terimin tooltip'i açılır.
- Aynı parent tooltip içindeki ikinci terimin üzerine gelindiğinde birinci child tooltip kapanır.
- İkinci child tooltip açılır.
- Parent tooltip açık kalır.
- Daha derin nested zincirler hâlâ desteklenir.
- Sabit nesting-depth sınırı eklenmemiştir.

## Korunan Özellikler
- 1021 glossary term aktif kalır.
- Nested tooltip zinciri korunur.
- Pre-answer / post-answer güvenliği korunur.
- Portal-based popover rendering korunur.
- Performans cache sistemi korunur.
- Veri tabanına veya glossary terimlerine dokunulmamıştır.

## Test Edilmesi Gereken Senaryo
1. Graves hastalığı tooltip'ini aç.
2. Kart içinde `Ekzoftalmi` üzerine gel.
3. Ekzoftalmi child tooltip'i açıkken `pretibial miksödem` üzerine geç.
4. Ekzoftalmi tooltip'inin kapanıp pretibial miksödem tooltip'inin açıldığını kontrol et.
5. Parent Graves tooltip'inin bu sırada kapanmadığını kontrol et.
6. Child tooltip'ten tekrar parent kart alanına dönüldüğünde child tooltip'in kapanmasını kontrol et.
