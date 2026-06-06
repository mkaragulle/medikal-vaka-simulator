# V386 — AI TUS prompt ve klinik bağlam kalite düzeltmesi

Bu sürüm, AI ile üretilen TUS sorularında klinik bağlamın boş/placeholder kalması problemini düzeltir.

## Ana problem
Bazı çıktılarda soru kökü gerçek klinik vignette yerine:
- “Kısa klinik bağlam ve karar verdirici bulgular birlikte değerlendirilir.”
gibi placeholder’a düşüyor, ardından doğrudan soru cümlesi ve seçenekler gösteriliyordu.

## Yapılan düzeltmeler
- Prompt içine “generic/placeholder stem kesin yasak” kuralı eklendi.
- Stem için hasta yaşı/cinsiyeti veya bağlam + başvuru + 2-4 ayırıcı bulgu + gerekli lab/vital/görüntüleme bilgisinin doğal cümleyle yazılması zorunlu hale getirildi.
- “Bu bulgulara göre” gibi ifadeler kullanılacaksa bulguların stem içinde gerçekten görünmesi şart koşuldu.
- Pediatri için yaşa uygun klinik bağlam zorunlu hale getirildi.
- 21-hidroksilaz eksikliği gibi konularda test sorulacaksa yenidoğan/infant bulguları, virilizasyon/ambiguous genitalia, kusma-dehidratasyon, hiponatremi/hiperkalemi gibi ipuçlarının görünür olması istendi.
- Backend validator artık placeholder/generic/çok kısa stem’i reddeder.
- Backend validator artık soru kökünde görünür klinik patern yoksa çıktıyı geçersiz sayar.
- Prompt version `klinikiq-clean-tus-spot-v37-no-placeholder-vignette-quality` olarak yükseltildi; eski kötü cache/question-bank çıktılarıyla karışmaz.
