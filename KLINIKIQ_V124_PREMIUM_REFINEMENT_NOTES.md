# KlinikIQ V124 Premium Refinement Notes

Bu sürümde iki ana ekran profesyonel tasarım referansına göre refine edildi.

## Yapılan ana düzenlemeler
- Giriş ekranındaki sol büyük hero container'ın sol üst köşesindeki taşma/çıkıntı hissi giderildi.
- “KULLANICI GİRİŞİ” etiketi kaldırıldı; login kartı doğrudan “Giriş yap” hiyerarşisiyle başlıyor.
- Shield merkezde sabit bırakıldı; medikal ikonlar artık iki ayrı orbital lane üzerinde shield etrafında dönüyor.
- Orbital glow/haze sert maskelenmiş görünümden çıkarılarak daha yumuşak radial blur yapısına dönüştürüldü.
- Demo CTA daha sakin, secondary ve rafine hale getirildi; ana giriş CTA'sıyla yarışmıyor.
- Header dark-mode toggle hizalaması global olarak düzeltildi; icon/orb/outer frame aynı merkez sisteminde çalışıyor.
- Dashboard iki kolon grid yapısı daha dengeli hale getirildi; “Oturum performansı” kartı sol ana kartla aynı yükseklik mantığına oturtuldu.
- Home hero, stat kartları, CTA'lar, border-radius ve shadow dili daha tutarlı hale getirildi.
- Reduced-motion açık olduğunda animasyon tamamen donmak yerine çok yavaş çalışacak şekilde ayarlandı.

## Çalıştırma
```bash
npm install
npm run dev
```

Build kontrolü:
```bash
npm run build
```
