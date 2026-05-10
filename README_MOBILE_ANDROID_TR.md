# KlinikIQ Mobil Uygulama Paketi (Android)

Bu paket, KlinikIQ React/Vite projesinin **Capacitor Android** ile telefona kurulabilir mobil uygulama projesine dönüştürülmüş halidir.

## İçerik

- `android/` — Android Studio ile açılabilir native Android proje klasörü
- `dist/` — mobil modda build edilmiş web uygulaması
- `capacitor.config.json` — Capacitor uygulama ayarları
- `.env.mobile` — mobil build varsayılanları
- `BUILD_ANDROID_APK_WINDOWS.bat` — Windows için debug APK build scripti
- `BUILD_ANDROID_APK_MAC_LINUX.sh` — macOS/Linux için debug APK build scripti
- `.github/workflows/android-apk.yml` — GitHub Actions üzerinden APK üretme workflow’u

## Android APK üretme — Windows

1. Node.js 20+ kurulu olmalı.
2. Android Studio kurulmalı ve ilk kurulumda Android SDK yüklenmeli.
3. ZIP’i çıkar.
4. Proje klasöründe `BUILD_ANDROID_APK_WINDOWS.bat` dosyasına çift tıkla.
5. APK çıktısı burada oluşur:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

Bu APK debug APK’dır. Test için telefona kurulabilir; Play Store yayını için release signing gerekir.

## Android Studio ile açma

1. Android Studio → Open
2. Bu paketteki `android/` klasörünü seç.
3. Gradle sync bittikten sonra Run veya Build APK seç.

## GitHub üzerinden APK üretme

Projeyi GitHub’a yükledikten sonra:

1. GitHub → Actions
2. `Build Android APK` workflow’unu aç
3. `Run workflow` de
4. Build bitince artifact olarak `KlinikIQ-debug-apk` indir

## Mobil AI notu

Telefon uygulamasında varsayılan olarak `.env.mobile` içinde:

```env
VITE_ENABLE_REAL_AI=false
```

Bu nedenle uygulama telefonda backend olmadan çalışır ve yerel soru üretici fallback’i kullanır. Gerçek OpenRouter/Gemini API ile AI üretimi istenirse API key’i doğrudan mobil uygulamaya koymak güvenli değildir. Bunun yerine Vercel gibi bir backend endpoint’i kullanılmalıdır:

```env
VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=https://senin-domainin.vercel.app/api/generate-ai-question
```

Sonra yeniden build alınmalıdır.

## iPhone / iOS notu

iOS uygulaması üretmek için macOS + Xcode gerekir. Bu paket Android için hazırlandı. Aynı Capacitor proje mantığıyla Mac üzerinde `@capacitor/ios` eklenerek iOS build alınabilir.
