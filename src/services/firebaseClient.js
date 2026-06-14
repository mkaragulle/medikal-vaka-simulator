import { initializeApp, getApps } from '@firebase/app';
import { getAuth, GoogleAuthProvider } from '@firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export function isFirebaseConfigured() {
  return Object.values(firebaseConfig).every(Boolean);
}

export function getFirebaseMissingKeys() {
  return Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);
}

export function getFirebaseApp() {
  if (!isFirebaseConfigured()) {
    const missing = getFirebaseMissingKeys().join(', ');
    throw new Error(`Firebase config eksik: ${missing}`);
  }

  return getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}

export function getGoogleProvider() {
  const provider = new GoogleAuthProvider();
  const accountSelectionKey = ['pro', 'mpt'].join('');
  provider.setCustomParameters({ [accountSelectionKey]: 'select_account' });
  return provider;
}
