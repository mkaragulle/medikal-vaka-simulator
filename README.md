# MedSim Pro Auth Redesign

Modern, sade, hızlı giriş odaklı ve responsive MedSim Pro giriş/kayıt ekranı.

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

Google butonu hazırdır. Firebase environment değişkenleri girilmezse demo Google kullanıcısı oluşturur ve localStorage üzerinde oturum açar.

Gerçek Firebase Google Auth için `.env.example` dosyasını `.env` olarak kopyala ve Firebase config bilgilerini doldur:

```bash
cp .env.example .env
```

Vercel'de aynı değişkenleri Project Settings > Environment Variables bölümüne ekle.

## Bu sürümde yapılanlar

- Giriş ekranı daha modern, sade ve premium SaaS hissinde yeniden tasarlandı.
- Google ile devam et ve demo ile hızlı başla aksiyonları öne alındı.
- E-posta girişi daha kompakt hale getirildi.
- Gereksiz büyük başlıklar, ağır metinler ve göz yoran kart yapısı azaltıldı.
- Mobil/tablet/desktop responsive yapı iyileştirildi.
- Firebase tekrar initialize hatasını önlemek için güvenli app initialization eklendi.
