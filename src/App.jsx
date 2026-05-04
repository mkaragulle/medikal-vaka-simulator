import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  ClipboardList,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Moon,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
} from 'lucide-react';
import {
  continueWithGoogle,
  getCurrentSession,
  loginWithEmail,
  registerWithEmail,
  signOutDemoUser,
} from './lib/auth.js';

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.24 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

const features = [
  {
    title: 'Yanlışlarım',
    text: 'Yanlış yaptığın vakaları gör ve öğren.',
    icon: ClipboardList,
  },
  {
    title: 'Performans',
    text: 'İlerlemeni takip et, gelişimini gör.',
    icon: Trophy,
  },
  {
    title: 'Tekrar çöz',
    text: 'İstediğin vakaya kolayca geri dön.',
    icon: RefreshCw,
  },
];

export default function App() {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(() => getCurrentSession());
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const copy = useMemo(
    () => ({
      eyebrow: mode === 'login' ? 'KULLANICI GİRİŞİ' : 'YENİ HESAP',
      title: mode === 'login' ? 'Giriş yap' : 'Kayıt ol',
      subtitle: mode === 'login'
        ? 'Hesabına dön ve kaldığın yerden devam et.'
        : 'Klinik vaka pratiğini kişisel hesabında başlat.',
      submit: mode === 'login' ? 'Giriş yap' : 'Hesap oluştur',
    }),
    [mode]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const user = mode === 'login'
        ? loginWithEmail({ email, password })
        : registerWithEmail({ email, password });
      setSession(user);
      setStatus({ type: 'success', message: 'Başarıyla giriş yapıldı.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'İşlem tamamlanamadı.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const user = await continueWithGoogle();
      setSession(user);
      setStatus({ type: 'success', message: 'Google ile giriş tamamlandı.' });
    } catch (error) {
      const isPopupClosed = String(error?.code || '').includes('popup-closed');
      setStatus({
        type: 'error',
        message: isPopupClosed
          ? 'Google penceresi kapatıldı. Tekrar deneyebilirsin.'
          : 'Google ile giriş şu anda tamamlanamadı.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    signOutDemoUser();
    setSession(null);
    setStatus(null);
  };

  return (
    <main className="auth-shell flex items-center justify-center px-5 py-8 sm:px-8 lg:px-10">
      <div className="relative z-10 grid w-full max-w-[1480px] gap-7 xl:grid-cols-[1.32fr_0.88fr]">
        <section className="glass-panel relative overflow-hidden rounded-[2.5rem] p-8 shadow-soft sm:p-10 lg:p-14 xl:min-h-[680px]">
          <div className="pointer-events-none absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-teal-100/70 blur-3xl" />
          <div className="pointer-events-none absolute right-28 top-20 hidden h-20 w-20 rotate-45 rounded-3xl border border-teal-100/80 bg-white/30 xl:block" />
          <div className="pointer-events-none absolute right-16 top-1/2 hidden h-2 w-2 rounded-full bg-teal-300/60 xl:block" />
          <div className="pointer-events-none absolute bottom-24 right-40 hidden text-teal-200/90 xl:block">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="relative flex h-full flex-col justify-between gap-12">
            <div>
              <div className="mb-16 flex items-center gap-4 sm:mb-20">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-200/80 bg-white/80 shadow-card">
                  <Activity className="h-7 w-7 text-teal-700" />
                </div>
                <div>
                  <p className="text-[0.82rem] font-black tracking-[0.34em] text-teal-700">MEDSIM PRO</p>
                  <p className="mt-1 hidden text-sm font-medium text-slate-500 sm:block">Clinical case practice</p>
                </div>
              </div>

              <h1 className="max-w-4xl text-[3.4rem] font-black leading-[0.95] tracking-[-0.075em] text-slate-950 sm:text-[4.6rem] lg:text-[5.5rem] xl:text-[6rem]">
                Klinik pratiğini hesabında takip et.
              </h1>

              <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-slate-600 sm:text-xl">
                Çözdüğün vakalar, ilerlemen ve yanlışların tek yerde saklanır.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {features.map(({ title, text, icon: Icon }) => (
                <article
                  key={title}
                  className="group rounded-[1.65rem] border border-slate-200/85 bg-white/68 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white/88"
                >
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-100 transition group-hover:bg-teal-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold tracking-[-0.03em] text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="auth-card rounded-[2.5rem] p-7 shadow-soft sm:p-10 lg:p-12 xl:min-h-[680px]">
          <div className="flex h-full flex-col justify-center">
            <div className="mb-9 flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black tracking-[0.34em] text-teal-700">{copy.eyebrow}</p>
                <h2 className="mt-3 text-5xl font-black tracking-[-0.07em] text-slate-950 sm:text-6xl">{copy.title}</h2>
                <p className="mt-4 max-w-md text-base font-medium leading-7 text-slate-500">{copy.subtitle}</p>
              </div>
              <button
                type="button"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-card transition hover:-translate-y-0.5 hover:border-teal-200 hover:text-teal-700"
                aria-label="Tema değiştir"
              >
                <Moon className="h-6 w-6" />
              </button>
            </div>

            {session && (
              <div className="mb-6 rounded-3xl border border-teal-100 bg-teal-50/80 p-4 text-sm font-semibold text-teal-900">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-extrabold">Oturum açık</p>
                    <p className="mt-1 text-teal-800/80">{session.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-teal-700 shadow-sm ring-1 ring-teal-100 transition hover:bg-teal-700 hover:text-white"
                  >
                    Çıkış
                  </button>
                </div>
              </div>
            )}

            <div className="mb-5 grid grid-cols-2 gap-2 rounded-[1.55rem] border border-slate-200 bg-slate-50/70 p-1.5">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setStatus(null);
                }}
                className={`flex h-14 items-center justify-center gap-2 rounded-[1.25rem] text-base font-extrabold transition ${
                  mode === 'login'
                    ? 'teal-button text-white shadow-button'
                    : 'text-slate-500 hover:bg-white hover:text-slate-900'
                }`}
              >
                <ArrowRight className="h-5 w-5" />
                Giriş yap
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setStatus(null);
                }}
                className={`flex h-14 items-center justify-center gap-2 rounded-[1.25rem] text-base font-extrabold transition ${
                  mode === 'register'
                    ? 'teal-button text-white shadow-button'
                    : 'text-slate-500 hover:bg-white hover:text-slate-900'
                }`}
              >
                <UserRound className="h-5 w-5" />
                Kayıt ol
              </button>
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="mb-8 flex h-16 w-full items-center justify-center gap-3 rounded-[1.35rem] border border-slate-200 bg-white text-base font-extrabold text-slate-900 shadow-card transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GoogleIcon />
              Google ile devam et
            </button>

            <div className="mb-8 flex items-center gap-5">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm font-extrabold text-slate-400">veya</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="input-field flex h-16 items-center gap-4 rounded-[1.25rem] border border-slate-200 bg-white px-5 transition">
                <Mail className="h-5 w-5 text-slate-500" />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="E-posta adresi"
                  className="h-full min-w-0 flex-1 bg-transparent text-base font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  autoComplete="email"
                />
              </label>

              <label className="input-field flex h-16 items-center gap-4 rounded-[1.25rem] border border-slate-200 bg-white px-5 transition">
                <Lock className="h-5 w-5 text-slate-500" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Şifre"
                  className="h-full min-w-0 flex-1 bg-transparent text-base font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-50 hover:text-teal-700"
                  aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </label>

              <div className="flex items-center justify-between gap-4 py-1">
                <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-slate-500">
                  <input
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    type="checkbox"
                    className="h-5 w-5 rounded border-slate-300 text-teal-700 accent-teal-700"
                  />
                  Beni hatırla
                </label>
                <button type="button" className="text-sm font-black text-teal-700 transition hover:text-teal-900">
                  Şifremi unuttum
                </button>
              </div>

              {status && (
                <div
                  className={`rounded-[1.1rem] px-4 py-3 text-sm font-bold ${
                    status.type === 'success'
                      ? 'border border-teal-100 bg-teal-50 text-teal-800'
                      : 'border border-rose-100 bg-rose-50 text-rose-700'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="teal-button mt-2 flex h-16 w-full items-center justify-center gap-3 rounded-[1.35rem] text-lg font-black text-white shadow-button transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ArrowRight className="h-6 w-6" />
                {loading ? 'İşleniyor...' : copy.submit}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-slate-500">
              <ShieldCheck className="h-5 w-5 text-slate-600" />
              <span>Demo sürüm • veriler bu cihazda saklanır.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
