# KlinikIQ — AI Spot Hero Control Cluster Fix

## Kök sebep
AI Destekli TUS Spot Sorusu ekranının hero alanında sağ kontrol bölümü `flex-wrap` mantığıyla çalışıyordu. Branş dropdown'ı 420px'lik ayrı bir kontrol gibi, aksiyon butonları ise bağımsız ve wrap edilebilir bir satır gibi davranıyordu. Bu nedenle dropdown, `Dashboard’a dön` ve `Yeni TUS sorusu üret` butonları aynı genişlik, yükseklik ve radius ritmine oturmuyor; sağ taraf tek bir premium kontrol grubu yerine dağınık form elemanları gibi görünüyordu.

## Uygulanan çözüm
- Hero alanı desktop'ta iki kolonlu grid yapısına geçirildi: sol başlık bloğu + sağ kompakt kontrol cluster'ı.
- Sağ blok `width: min(100%, 520px)` ile tek bir görsel sistem içine alındı.
- Dropdown ve buton satırı aynı genişliği paylaşacak şekilde düzenlendi.
- Dropdown yüksekliği 54px'e çıkarıldı; butonlar da 54px'e sabitlendi.
- Dropdown ve butonlarda aynı 18px radius, uyumlu border, soft shadow ve premium focus state kullanıldı.
- Buton satırı desktop'ta iki kolonlu grid'e alındı; mobilde tek kolona düşürüldü.
- Light/dark mode için ayrı yüzey, border ve text kontrast ayarları eklendi.

## Değiştirilen dosyalar
- `src/components/AIGeneratedQuestionView.jsx`
  - Label metni `KONU / BRANŞ` olarak standardize edildi.
  - `Dashboard’a dön` ve `Yeni TUS sorusu üret` butonlarına hedeflenebilir class adları eklendi.

- `src/index.css`
  - AI Spot hero için premium control cluster override katmanı eklendi.
  - Desktop grid hizalaması, dropdown/button boyutları, responsive davranış ve dark mode stilleri tanımlandı.

## Responsive davranış
- Desktop: Sol hero metni ve sağ kontrol cluster'ı yan yana, dikey merkez hizalı çalışır.
- Tablet: Hero tek kolona düşer; sağ kontrol cluster'ı maksimum 560px genişlikte kalır.
- Mobil: Dropdown tam genişlikte kalır; iki buton alt alta dizilir ve yatay taşma oluşmaz.

## QA sonucu
- `npm run build`: başarılı.
- `npm run qa:ai-spot-render-layout`: başarılı.
- `npm run qa:ai-spot-readability`: başarılı.
- Static CSS kontrolü: hero grid, 520px cluster genişliği, 54px dropdown/button yüksekliği, mobil stacking ve dark mode kuralları doğrulandı.

## Çalıştırma komutları
```bash
npm install
npm run build
npm run dev
```
