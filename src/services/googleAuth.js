const GOOGLE_SCRIPT_ID = 'google-identity-services-script';

export function isGoogleAuthConfigured() {
  return Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);
}

function loadGoogleIdentityScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Google girişi tarayıcı ortamında çalışır.'));
      return;
    }

    if (window.google?.accounts?.id) {
      resolve(window.google);
      return;
    }

    const existing = document.getElementById(GOOGLE_SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google), { once: true });
      existing.addEventListener('error', () => reject(new Error('Google giriş scripti yüklenemedi.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_SCRIPT_ID;
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error('Google giriş scripti yüklenemedi.'));
    document.head.appendChild(script);
  });
}

function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = decodeURIComponent(
      atob(normalized)
        .split('')
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    );
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export async function signInWithGoogle() {
  if (!isGoogleAuthConfigured()) {
    return {
      ok: false,
      message: 'Google girişi için VITE_GOOGLE_CLIENT_ID environment variable eklenmeli.',
    };
  }

  try {
    const google = await loadGoogleIdentityScript();

    return await new Promise((resolve) => {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (response) => {
          const payload = decodeJwtPayload(response.credential);
          if (!payload?.email) {
            resolve({ ok: false, message: 'Google hesabından e-posta bilgisi alınamadı.' });
            return;
          }

          resolve({
            ok: true,
            profile: {
              googleUid: payload.sub,
              name: payload.name || payload.given_name || payload.email.split('@')[0],
              email: payload.email,
              photoURL: payload.picture || '',
              provider: 'google',
            },
          });
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.()) {
          resolve({
            ok: false,
            message: 'Google giriş penceresi açılmadı. Google Cloud’da Authorized JavaScript origins ayarını kontrol et.',
          });
        }
      });
    });
  } catch (error) {
    return {
      ok: false,
      message: error?.message || 'Google ile giriş sırasında bir sorun oluştu.',
    };
  }
}
