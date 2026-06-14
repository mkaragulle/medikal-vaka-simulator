import { signInWithPopup } from 'firebase/auth';
import { getFirebaseAuth, getGoogleProvider, isFirebaseConfigured } from './firebaseClient.js';

export function isGoogleAuthConfigured() {
  return isFirebaseConfigured();
}

function mapFirebaseError(error) {
  const code = error?.code || '';

  if (code === 'auth/popup-blocked') {
    return 'Google giriş penceresi tarayıcı tarafından engellendi. Popup iznini açıp tekrar dene.';
  }

  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
    return 'Google giriş penceresi kapatıldı. Tekrar deneyebilirsin.';
  }

  if (code === 'auth/unauthorized-domain') {
    return 'Bu domain Firebase Authorized domains listesinde değil. Firebase Authentication → Settings → Authorized domains kısmına localhost veya Vercel domainini ekle.';
  }

  if (code === 'auth/operation-not-allowed') {
    return 'Firebase Authentication içinde Google sign-in provider aktif değil.';
  }

  if (code === 'auth/network-request-failed') {
    return 'Ağ bağlantısı nedeniyle Google girişi tamamlanamadı.';
  }

  return error?.message || 'Google ile giriş sırasında bir sorun oluştu.';
}

export async function signInWithGoogle() {
  if (!isGoogleAuthConfigured()) {
    return {
      ok: false,
      message: 'Google girişi için Firebase environment variables eksik.',
    };
  }

  try {
    const auth = getFirebaseAuth();
    const provider = getGoogleProvider();
    const credential = await signInWithPopup(auth, provider);
    const firebaseUser = credential.user;

    if (!firebaseUser?.email) {
      return { ok: false, message: 'Google hesabından e-posta bilgisi alınamadı.' };
    }

    return {
      ok: true,
      profile: {
        googleUid: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || '',
        provider: 'google',
      },
    };
  } catch (error) {
    return {
      ok: false,
      message: mapFirebaseError(error),
    };
  }
}
