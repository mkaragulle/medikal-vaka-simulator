const USER_STORAGE_KEY = 'medsim_pro_users';
const SESSION_STORAGE_KEY = 'medsim_pro_session';

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
}

function saveSession(user) {
  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name || user.email.split('@')[0],
    provider: user.provider || 'email',
    createdAt: user.createdAt || new Date().toISOString(),
  };
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(safeUser));
  return safeUser;
}

export function getCurrentSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

export function signOutDemoUser() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function registerWithEmail({ email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    throw new Error('Geçerli bir e-posta adresi gir.');
  }
  if (!password || password.length < 4) {
    throw new Error('Şifre en az 4 karakter olmalı.');
  }

  const users = readUsers();
  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error('Bu e-posta ile kayıtlı bir hesap zaten var.');
  }

  const user = {
    id: crypto.randomUUID?.() || String(Date.now()),
    email: normalizedEmail,
    password,
    name: normalizedEmail.split('@')[0],
    provider: 'email',
    createdAt: new Date().toISOString(),
  };

  writeUsers([...users, user]);
  return saveSession(user);
}

export function loginWithEmail({ email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const users = readUsers();
  const user = users.find((item) => item.email === normalizedEmail && item.password === password);

  if (!user) {
    throw new Error('E-posta veya şifre hatalı.');
  }

  return saveSession(user);
}

function hasFirebaseConfig() {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_APP_ID
  );
}

export async function continueWithGoogle() {
  if (!hasFirebaseConfig()) {
    const demoUser = {
      id: 'demo-google-user',
      email: 'google.demo@medsim.local',
      name: 'Google Demo Kullanıcısı',
      provider: 'google-demo',
      createdAt: new Date().toISOString(),
    };
    return saveSession(demoUser);
  }

  const [{ initializeApp }, { getAuth, GoogleAuthProvider, signInWithPopup }] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
  ]);

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);

  return saveSession({
    id: credential.user.uid,
    email: credential.user.email,
    name: credential.user.displayName || credential.user.email?.split('@')[0] || 'MedSim User',
    provider: 'google',
    createdAt: new Date().toISOString(),
  });
}
