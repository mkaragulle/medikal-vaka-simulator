import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  Lock,
  Mail,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
} from 'lucide-react';
import {
  continueWithGoogle,
  createDemoSession,
  getCurrentSession,
  loginWithEmail,
  registerWithEmail,
  signOutDemoUser,
} from './lib/auth.js';

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.24 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

const benefitRows = [
  {
    title: 'Kaldığın yerden devam',
    text: 'Çözdüğün vakalar ve ilerleme durumun düzenli kalır.',
    icon: Clock3,
  },
  {
    title: 'Yanlışlarını hedefle',
    text: 'Zorlandığın klinik başlıkları tekrar çözme akışına al.',
    icon: BarChart3,
  },
  {
    title: 'Sınav pratiğini hızlandır',
    text: 'Daha az tıklama, daha net ekran, daha hızlı başlangıç.',
    icon: Trophy,
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
      title: mode === 'login' ? 'Hoş geldin.' : 'Hesabını oluştur.',
      subtitle: mode === 'login'
        ? 'Google, demo veya e-posta ile birkaç saniyede devam et.'
        : 'Vaka çözüm geçmişini saklamak için hızlıca hesap oluştur.',
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
      setStatus({ type: 'success', message: 'Oturum açıldı. Çalışmaya devam edebilirsin.' });
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

  const handleDemo = () => {
    setLoading(true);
    setStatus(null);

    try {
      const user = createDemoSession();
      setSession(user);
      setStatus({ type: 'success', message: 'Demo oturumu başlatıldı.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Demo oturumu başlatılamadı.' });
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
    <main className="auth-shell min-h-screen overflow-hidden px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-2.5rem)] w-full max-w-7xl items-center gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hero-panel relative hidden overflow-hidden rounded-[2rem] border border-white/80 bg-white/58 p-8 shadow-soft backdrop-blur-2xl lg:block xl:p-10">
          <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-teal-200/35 blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl" />
          <div className="absolute right-12 top-14 h-20 w-20 rotate-12 rounded-[1.75rem] border border-teal-200/70 bg-white/45" />

          <div className="relative flex min-h-[680px] flex-col justify-between">
            <div>
              <div className="mb-14 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-button">
                  <Activity className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-black tracking-[0.32em] text-teal-800">MEDSIM PRO</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">Clinical case practice</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/70 px-4 py-2 text-sm font-extrabold text-teal-800 shadow-sm">
                <Sparkles className="h-4 w-4" />
                TUS odaklı klinik pratik
              </span>

              <h1 className="mt-8 max-w-2xl text-6xl font-black leading-[0.96] tracking-[-0.07em] text-slate-950 xl:text-7xl">
                Klinik vaka pratiğine hızlıca dön.
              </h1>

              <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-slate-600">
                Daha sade giriş ekranı, net aksiyonlar ve tek tıkla başlama akışıyla çalışma sürecin bölünmez.
              </p>
            </div>

            <div className="grid gap-3">
              {benefitRows.map(({ title, text, icon: Icon }) => (
                <article key={title} className="benefit-row flex items-start gap-4 rounded-3xl border border-white/80 bg-white/60 p-4 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/80">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-[-0.03em] text-slate-950">{title}</h3>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="auth-card mx-auto w-full max-w-[560px] rounded-[2rem] p-5 shadow-soft sm:p-7 lg:max-w-none lg:p-9 xl:p-10">
          <div className="mb-8 flex items-center justify-between gap-4 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-button">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-black tracking-[0.28em] text-teal-800">MEDSIM PRO</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">Clinical case practice</p>
              </div>
            </div>
            <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-black text-teal-800 ring-1 ring-teal-100">Beta</span>
          </div>

          <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
            <div className="hidden xl:block">
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/80 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-slate-950">Bugünkü çalışma</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">Kaldığın yerden devam et</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm ring-1 ring-slate-200">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                    <p className="text-2xl font-black tracking-[-0.05em] text-slate-950">18</p>
                    <p className="mt-1 text-[11px] font-extrabold text-slate-400">Vaka</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                    <p className="text-2xl font-black tracking-[-0.05em] text-slate-950">74%</p>
                    <p className="mt-1 text-[11px] font-extrabold text-slate-400">Başarı</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                    <p className="text-2xl font-black tracking-[-0.05em] text-slate-950">6</p>
                    <p className="mt-1 text-[11px] font-extrabold text-slate-400">Tekrar</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-7">
                <p className="text-xs font-black tracking-[0.32em] text-teal-700">{copy.eyebrow}</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.065em] text-slate-950 sm:text-5xl">{copy.title}</h2>
                <p className="mt-3 max-w-md text-base font-semibold leading-7 text-slate-500">{copy.subtitle}</p>
              </div>

              {session && (
                <div className="mb-5 rounded-3xl border border-teal-100 bg-teal-50/80 p-4 text-sm font-semibold text-teal-900">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-black">Oturum açık</p>
                      <p className="mt-1 truncate text-teal-800/80">{session.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="shrink-0 rounded-2xl bg-white px-4 py-2 text-sm font-black text-teal-700 shadow-sm ring-1 ring-teal-100 transition hover:bg-teal-700 hover:text-white"
                    >
                      Çıkış
                    </button>
                  </div>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={loading}
                  className="quick-button flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 shadow-card transition hover:-translate-y-0.5 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <GoogleIcon />
                  Google ile devam et
                </button>
                <button
                  type="button"
                  onClick={handleDemo}
                  disabled={loading}
                  className="quick-button flex h-14 items-center justify-center gap-3 rounded-2xl bg-slate-950 px-4 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PlayCircle className="h-5 w-5" />
                  Demo ile başla
                </button>
              </div>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">veya e-posta</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setStatus(null);
                  }}
                  className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-black transition ${
                    mode === 'login'
                      ? 'bg-white text-slate-950 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-500 hover:bg-white/70 hover:text-slate-900'
                  }`}
                >
                  <ArrowRight className="h-4 w-4" />
                  Giriş
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setStatus(null);
                  }}
                  className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-black transition ${
                    mode === 'register'
                      ? 'bg-white text-slate-950 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-500 hover:bg-white/70 hover:text-slate-900'
                  }`}
                >
                  <UserRound className="h-4 w-4" />
                  Kayıt
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <label className="field flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 transition">
                  <Mail className="h-5 w-5 shrink-0 text-slate-400" />
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="E-posta adresi"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="field flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 transition">
                  <Lock className="h-5 w-5 shrink-0 text-slate-400" />
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Şifre"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-50 hover:text-teal-700"
                    aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </label>

                <div className="flex items-center justify-between gap-4 py-1">
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm font-bold text-slate-500">
                    <input
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 accent-teal-700"
                    />
                    Beni hatırla
                  </label>
                  <button type="button" className="text-sm font-black text-teal-700 transition hover:text-teal-900">
                    Şifremi unuttum
                  </button>
                </div>

                {status && (
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm font-bold ${
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
                  className="primary-button mt-1 flex h-14 w-full items-center justify-center gap-3 rounded-2xl text-base font-black text-white shadow-button transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ArrowRight className="h-5 w-5" />
                  {loading ? 'İşleniyor...' : copy.submit}
                </button>
              </form>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
                <ShieldCheck className="h-4 w-4 text-slate-500" />
                <span>Demo sürümde veriler bu cihazda saklanır.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
