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

      <aside className="auth-minimal-brand" aria-label="KlinikIQ tanıtım alanı">
        <div className="auth-minimal-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="auth-minimal-logo-row">
          <span className="auth-minimal-logo-mark"><BrandMark title="" /></span>
          <span className="auth-minimal-logo-copy">KlinikIQ</span>
        </div>

        <div className="auth-minimal-hero">
          <h1>Klinik pratiğini<br />hesabında takip et.</h1>
          <p>Çözdüğün vakalar, ilerlemen ve yanlışların tek yerde saklanır.</p>
        </div>

        <div className="auth-minimal-features" aria-label="Hesap özellikleri">
          <div className="auth-minimal-feature">
            <Icon name="ClipboardList" />
            <div><strong>Yanlışlarım</strong><span>Yanlış yaptığın vakaları gör ve öğren.</span></div>
          </div>
          <div className="auth-minimal-feature">
            <Icon name="Trophy" />
            <div><strong>Performans</strong><span>İlerlemeni takip et, gelişimini gör.</span></div>
          </div>
          <div className="auth-minimal-feature">
            <Icon name="RotateCcw" />
            <div><strong>Tekrar çöz</strong><span>İstediğin vakaya kolayca geri dön.</span></div>
          </div>
        </div>
      </aside>

      <form className="auth-minimal-card" onSubmit={handleSubmit}>
        <div className="auth-minimal-head">
          <div>
            <p>KULLANICI GİRİŞİ</p>
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

          <button className="auth-minimal-demo" type="button" onClick={handleDemoStart} disabled={demoBusy || busy || googleBusy}>
            <Icon name="Sparkles" />
            <span>{demoBusy ? 'Demo hazırlanıyor...' : '5 vaka içeren demo ile başla'}</span>
          </button>
        </div>

        <div className="auth-minimal-divider" aria-hidden="true"><span>veya</span></div>

        <div className="auth-minimal-form-stack">
          {isRegister ? (
            <label className="auth-minimal-field">
              <span>Ad soyad</span>
              <div className="auth-minimal-input">
                <Icon name="User" />
                <input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Ad soyad" autoComplete="name" />
              </div>
            </label>
          ) : null}

          <label className="auth-minimal-field">
            <span>E-posta adresi</span>
            <div className="auth-minimal-input">
              <Icon name="Mail" />
              <input value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="E-posta adresi" type="email" autoComplete="email" />
            </div>
          </label>

          <label className="auth-minimal-field">
            <span>Şifre</span>
            <div className="auth-minimal-input">
              <Icon name="Lock" />
              <input value={form.password} onChange={(event) => updateField('password', event.target.value)} placeholder="Şifre" type={showPassword ? 'text' : 'password'} autoComplete={isRegister ? 'new-password' : 'current-password'} />
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
                <input value={form.confirmPassword} onChange={(event) => updateField('confirmPassword', event.target.value)} placeholder="Şifreyi tekrar yaz" type={showPassword ? 'text' : 'password'} autoComplete="new-password" />
              </div>
            </label>
          ) : null}
        </div>

        <div className="auth-minimal-options">
          <label>
            <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
            <span>Beni hatırla</span>
          </label>
          <button type="button" onClick={() => setMessage({ type: 'error', text: 'Şifre sıfırlama için Firebase reset-password akışı bağlanmalı.' })}>Şifremi unuttum</button>
        </div>

        {message ? <div className={`auth-minimal-message ${message.type}`}>{message.text}</div> : null}

        <button className="auth-minimal-submit" type="submit" disabled={busy || demoBusy || googleBusy}>
          <Icon name={isRegister ? 'UserPlus' : 'LogIn'} />
          <span>{busy ? 'İşleniyor...' : isRegister ? 'Kayıt ol' : 'Giriş yap'}</span>
        </button>

        <p className="auth-minimal-note"><Icon name="ShieldCheck" /> Demo sürüm • veriler bu cihazda saklanır.</p>
      </form>
    </section>
  );
}

export default AuthPanel;
