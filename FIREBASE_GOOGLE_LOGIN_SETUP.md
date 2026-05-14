# Firebase Google Login Setup

Bu sürüm Google girişte Firebase Authentication `signInWithPopup` kullanır.

Gerekli `.env.local` ve Vercel Environment Variables:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

`VITE_GOOGLE_CLIENT_ID` bu sürümde zorunlu değildir.

Firebase Console:
1. Authentication → Sign-in method → Google: Enabled
2. Authentication → Sign-in method → Email/Password: Enabled
3. Authentication → Settings → Authorized domains:
   - localhost
   - senin-vercel-domainin.vercel.app

Vercel:
- Install Command: `npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables eklendikten sonra Redeploy yap.
