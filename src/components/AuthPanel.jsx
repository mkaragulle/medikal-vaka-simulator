import { useState } from 'react';
import { Icon, BrandMark, ThemeToggle } from './ui.jsx';

function GoogleLogo() {
  return (
    <span className="auth-minimal-google-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path fill="#4285F4" d="M21.6 12.23c0-.73-.07-1.43-.19-2.1H12v3.98h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.23c1.89-1.74 2.98-4.3 2.98-7.41Z" />
        <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.36l-3.23-2.51c-.9.6-2.04.96-3.39.96-2.6 0-4.8-1.76-5.58-4.12H3.08v2.59A9.99 9.99 0 0 0 12 22Z" />
        <path fill="#FBBC05" d="M6.42 13.97A6 6 0 0 1 6.1 12c0-.68.12-1.34.32-1.97V7.44H3.08A9.99 9.99 0 0 0 2 12c0 1.61.39 3.14 1.08 4.56l3.34-2.59Z" />
        <path fill="#EA4335" d="M12 5.91c1.47 0 2.79.51 3.83 1.5l2.86-2.86A9.6 9.6 0 0 0 12 2a9.99 9.99 0 0 0-8.92 5.44l3.34 2.59C7.2 7.67 9.4 5.91 12 5.91Z" />
      </svg>
    </span>
  );
}

const authFeatureCards = [
  {
    icon: 'ClipboardCheck',
    title: 'Yanlış Analizi',
    description: 'Yanlış vakaları tekrar incele, eksik noktaları hızla fark et.',
    signal: 'Eksik kazanımları netleştirir.'
  },
  {
    icon: 'TrendUp',
    title: 'Performans Takibi',
    description: 'Branş bazlı ilerlemeyi ve başarı trendini net takip et.',
    signal: 'İlerlemeni ölçülebilir yapar.'
  },
  {
    icon: 'RotateCcw',
    title: 'Tekrar Çöz',
    description: 'Çözdüğün vakalara dön, öğrenmeni pekiştir ve hız kazan.',
    signal: 'Tekrarla kalıcılığı artırır.'
  },
  {
    icon: 'LayeredCards',
    title: 'Pro Vaka Havuzu',
    description: 'Daha fazla branş, vaka ve ileri klinik senaryoya eriş.',
    signal: 'Daha geniş klinik maruziyet sağlar.'
  },
  {
    icon: 'InsightGauge',
    title: 'Akıllı Gelişim Raporları',
    description: 'Güçlü ve zayıf yönlerini gör, planını veriye göre şekillendir.',
    signal: 'Çalışma planını veriye bağlar.'
  },
  {
    icon: 'Stopwatch',
    title: 'Gerçek Sınav Modu',
    description: 'Süre baskısında pratik yap, klinik karar hızını artır.',
    signal: 'Sınav temposuna hazırlar.'
  }
];


const authOrbitOuterIcons = [
  { icon: 'Stethoscope', label: 'Klinik değerlendirme' },
  { icon: 'Brain', label: 'Klinik akıl yürütme' },
  { icon: 'HeartPulse', label: 'Yaşam bulguları' },
  { icon: 'FlaskConical', label: 'Tetkik değerlendirme' },
];

const authOrbitInnerIcons = [
  { icon: 'Gauge', label: 'Performans içgörüleri' },
  { icon: 'Activity', label: 'Dinamik izlem' },
];

function OrbitRotor({ items, lane = 'outer' }) {
  const total = items.length;
  const offset = lane === 'inner' ? 48 : -14;

  return (
    <span className={`kiq-orbit-rotor kiq-orbit-rotor-${lane}`} aria-hidden="true">
      {items.map((item, index) => {
        const angle = Number((((360 / total) * index) + offset).toFixed(3));

        return (
          <span
            key={`${lane}-${item.icon}`}
            className={`kiq-orbit-node kiq-orbit-node-${lane}`}
            style={{ transform: `rotate(${angle}deg) translateY(calc(-1 * var(--kiq-orbit-radius-${lane})))` }}
            aria-label={item.label}
          >
            <span className="kiq-orbit-node-face" style={{ transform: `rotate(${-angle}deg)` }}>
              <span className="kiq-orbit-node-counter">
                <Icon name={item.icon} />
              </span>
            </span>
          </span>
        );
      })}
    </span>
  );
}

function OrbitAnimation() {
  return (
    <div className="kiq-orbit-stage">
      <span className="kiq-orbit-aura" />
      <span className="kiq-orbit-ring kiq-orbit-ring-outer" />
      <span className="kiq-orbit-ring kiq-orbit-ring-inner" />
      <span className="kiq-orbit-ring kiq-orbit-ring-core" />
      <span className="kiq-orbit-sweep kiq-orbit-sweep-outer" />
      <span className="kiq-orbit-sweep kiq-orbit-sweep-inner" />
      <span className="kiq-orbit-light kiq-orbit-light-one" />
      <span className="kiq-orbit-light kiq-orbit-light-two" />
      <span className="kiq-orbit-light kiq-orbit-light-three" />
      <span className="kiq-orbit-core">
        <Icon name="ShieldPlus" />
      </span>
      <OrbitRotor items={authOrbitOuterIcons} lane="outer" />
      <OrbitRotor items={authOrbitInnerIcons} lane="inner" />
    </div>
  );
}


function AuthFeatureCard({ feature }) {
  return (
    <article className="auth-minimal-feature-card auth-feature-card-v2 auth-feature-card-v3">
      <span className="auth-feature-icon" aria-hidden="true"><Icon name={feature.icon} /></span>
      <span className="auth-feature-copy auth-feature-copy-compact">
        <strong>{feature.title}</strong>
        <span>{feature.description}</span>
      </span>
    </article>
  );
}

function AuthPanel({ onLogin, onRegister, onGoogleLogin, onDemoStart, theme, onToggleTheme }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [demoBusy, setDemoBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const isRegister = mode === 'register';

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage(null);
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    const action = isRegister ? onRegister : onLogin;
    const result = await action?.(form);
    setBusy(false);

    if (!result?.ok) {
      setMessage({ type: 'error', text: result?.message || 'İşlem tamamlanamadı.' });
      return;
    }

    setMessage({ type: 'success', text: result.message || 'Giriş başarılı.' });
  };

  const handleGoogleLogin = async () => {
    setMessage(null);
    setGoogleBusy(true);
    const result = await onGoogleLogin?.();
    setGoogleBusy(false);

    if (!result?.ok) {
      setMessage({ type: 'error', text: result?.message || 'Google ile giriş tamamlanamadı.' });
      return;
    }

    setMessage({ type: 'success', text: result.message || 'Google ile giriş başarılı.' });
  };

  const handleDemoStart = async () => {
    setMessage(null);
    setDemoBusy(true);
    const result = await onDemoStart?.();
    setDemoBusy(false);

    if (!result?.ok) {
      setMessage({ type: 'error', text: result?.message || 'Demo başlatılamadı.' });
      return;
    }

    setMessage({ type: 'success', text: result.message || 'Demo başlatıldı.' });
  };

  return (
    <section className="auth-minimal-shell" aria-label="KlinikIQ giriş ekranı">
      <div className="auth-minimal-grid" aria-hidden="true" />
      <div className="auth-minimal-glow glow-a" aria-hidden="true" />
      <div className="auth-minimal-glow glow-b" aria-hidden="true" />

      <aside className="auth-minimal-brand auth-minimal-brand-v4" aria-label="KlinikIQ tanıtım alanı">
        <div className="auth-minimal-logo-row auth-minimal-logo-row-v4">
          <span className="auth-minimal-logo-mark"><BrandMark title="" /></span>
          <span className="auth-minimal-logo-copy">Klinik<span>IQ</span></span>
        </div>

        <div className="auth-minimal-showcase auth-minimal-showcase-v4">
          <div className="auth-minimal-hero auth-minimal-hero-v4">
            <h1>Klinik pratiğini<br />tek yerde geliştir.</h1>
            <p>Vaka çöz, performansını takip et, eksiklerini gör ve gelişimini veriye dayalı şekilde yönet.</p>
          </div>

          <div className="auth-hero-illustration auth-hero-illustration-v4" aria-hidden="true">
            <OrbitAnimation />
          </div>
        </div>

        <div className="auth-minimal-features auth-minimal-features-v4" aria-label="KlinikIQ özellikleri">
          {authFeatureCards.map((feature) => (
            <AuthFeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </aside>

      <form className={`auth-minimal-card ${isRegister ? 'auth-mode-register' : 'auth-mode-login'}`} onSubmit={handleSubmit}>
        <div className="auth-minimal-head">
          <div>
            <h2>{isRegister ? 'Kayıt ol' : 'Giriş yap'}</h2>
            <span>{isRegister ? 'Yeni hesabını oluştur ve klinik olgulara başla.' : 'Hesabına dön ve kaldığın yerden devam et.'}</span>
          </div>
          <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} variant="auth" />
        </div>

        <div className="auth-minimal-tabs" role="tablist" aria-label="Giriş seçenekleri">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => switchMode('login')}>
            <Icon name="LogIn" />
            Giriş yap
          </button>
          <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => switchMode('register')}>
            <Icon name="User" />
            Kayıt ol
          </button>
        </div>

        <div className="auth-minimal-quick-actions">
          <button className="auth-minimal-google" type="button" onClick={handleGoogleLogin} disabled={googleBusy || busy || demoBusy}>
            <GoogleLogo />
            <span>{googleBusy ? 'Google hesabı açılıyor...' : 'Google ile devam et'}</span>
          </button>

          {!isRegister ? (
            <button className="auth-minimal-demo" type="button" onClick={handleDemoStart} disabled={demoBusy || busy || googleBusy}>
              <Icon name="Sparkles" />
              <span>{demoBusy ? 'Demo açılıyor...' : '5 vakalık demo ile başla'}</span>
            </button>
          ) : null}
        </div>

        <div className="auth-minimal-divider" aria-hidden="true"><span>veya</span></div>

        <div className="auth-minimal-form-stack">
          {isRegister ? (
            <label className="auth-minimal-field">
              <span>Ad soyad</span>
              <div className="auth-minimal-input">
                <Icon name="User" />
                <input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Ad soyad" autoComplete="name" required />
              </div>
            </label>
          ) : null}

          <label className="auth-minimal-field">
            <span>E-posta adresi</span>
            <div className="auth-minimal-input">
              <Icon name="Mail" />
              <input value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="E-posta adresi" type="email" autoComplete="email" required />
            </div>
          </label>

          <label className="auth-minimal-field">
            <span>Şifre</span>
            <div className="auth-minimal-input">
              <Icon name="Lock" />
              <input value={form.password} onChange={(event) => updateField('password', event.target.value)} placeholder="Şifre" type={showPassword ? 'text' : 'password'} autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={6} required />
              <button type="button" className="auth-minimal-eye" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}>
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} />
              </button>
            </div>
          </label>

          {isRegister ? (
            <label className="auth-minimal-field">
              <span>Şifre tekrar</span>
              <div className="auth-minimal-input">
                <Icon name="Lock" />
                <input value={form.confirmPassword} onChange={(event) => updateField('confirmPassword', event.target.value)} placeholder="Şifreyi tekrar yaz" type={showPassword ? 'text' : 'password'} autoComplete="new-password" minLength={6} required />
              </div>
            </label>
          ) : null}
        </div>

        {!isRegister ? (
          <div className="auth-minimal-options">
            <label>
              <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
              <span>Beni hatırla</span>
            </label>
            <button type="button" onClick={() => setMessage({ type: 'error', text: 'Şifre sıfırlama için Firebase reset-password akışı bağlanmalı.' })}>Şifremi unuttum</button>
          </div>
        ) : null}

        {message ? <div className={`auth-minimal-message ${message.type}`}>{message.text}</div> : null}

        <button className="auth-minimal-submit" type="submit" disabled={busy || demoBusy || googleBusy}>
          <Icon name={isRegister ? 'UserPlus' : 'LogIn'} />
          <span>{busy ? 'İşleniyor...' : isRegister ? 'Kayıt ol' : 'Giriş yap'}</span>
        </button>

      </form>
    </section>
  );
}

export default AuthPanel;
