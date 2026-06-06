# KlinikIQ V391 — AI TUS Question Quality Hardening

Bu sürüm AI ile üretilen TUS sorularında klinik kaliteyi yükseltmek için hazırlandı.

## Yapılan değişiklikler

- AI TUS sistem promptuna Türkçe editoryal kalite kuralları eklendi.
- Makine çevirisi gibi duran veya klinik Türkçe açısından bozuk ifadeler yasaklandı. Örnek: `yoğunlaşma kaybı`.
- Pediatrik/neonatal acil tedavi soruları için eşik, şiddet ve zamanlama zorunluluğu sertleştirildi.
- Hiperamonyemi / üre siklus bozukluğu sorularında hemodiyaliz, dekstroz, azot bağlayıcı ilaçlar ve karglumik asit gibi birden fazla kısmen doğru tedavi bileşeni karşılaştırılıyorsa; soru kökünde amonyak düzeyi, ağır nörolojik bulgu, tedavi sırası veya başlangıç tedavisine rağmen kötüleşme bilgisi bulunması zorunlu hale getirildi.
- `validateQuestion` içine iki yeni kalite kapısı eklendi:
  - `hasMalformedTurkishClinicalWording`
  - `hasAmbiguousHyperammonemiaEmergencyTarget`
- Bu kalite hataları artık sadece not olarak geçmiyor; remote üretim yeniden deneniyor.
- AI TUS soru üretiminde varsayılan detay modu `concise` yerine en az `standard` seviyesine çekildi.
- Remote üretim denemesi varsayılan olarak 2 denemeye çıkarıldı.

## Amaç

Kullanıcıya gösterilen AI TUS sorularında:
- klinik bağlamı zayıf,
- Türkçesi bozuk,
- tedavi seçenekleri birden fazla doğruymuş gibi duran,
- eşik/şiddet bilgisi eksik olduğu için tartışmalı hale gelen

soruların UI’a düşmesini engellemek.
