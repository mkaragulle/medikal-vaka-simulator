# MedSim Pro Auth Redesign

Modern, sade ve premium görünümlü MedSim Pro giriş/kayıt ekranı.

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda genellikle şu adres açılır:

```bash
http://localhost:5173
```

## Vercel Deploy

1. Projeyi GitHub'a yükle.
2. Vercel > New Project > GitHub reposunu seç.
3. Framework: Vite
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy.

## Google Auth

Bu zipte Google butonu hazırdır. Firebase environment değişkenleri girilmezse demo Google kullanıcı oluşturur ve localStorage üzerinde oturum açar.

Gerçek Firebase Google Auth için `.env.example` dosyasını `.env` olarak kopyala ve Firebase config bilgilerini doldur:

```bash
cp .env.example .env
```

Vercel'de aynı değişkenleri Project Settings > Environment Variables bölümüne ekle.

## Tasarım Notları

- Sol panel sadeleştirildi.
- Stetoskop/gereksiz medikal obje kaldırıldı.
- Feature cardlarda kutu içinde kutu yapısı kullanılmadı.
- Google ile devam et butonu eklendi.
- Form alanları ve hata/başarı mesajları daha sakin hale getirildi.
- Desktop/tablet/mobil responsive yapı kullanıldı.
