import { useState } from 'react';
import { Icon } from './ui.jsx';

function GoogleLogo() {
  return (
    <span className="google-logo-mark" aria-hidden="true">
      <span className="google-g-blue">G</span>
    </span>
  );
}

function AuthPanel({ onLogin, onRegister, onGoogleLogin, theme, onToggleTheme }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
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

  return (
    <section className="auth-page-shell auth-premium-login" aria-label="MedSim Pro kullanıcı girişi">
      <div className="auth-grid-bg" aria-hidden="true" />
      <div className="auth-bg-orb orb-one" aria-hidden="true" />
      <div className="auth-bg-orb orb-two" aria-hidden="true" />
      <div className="auth-bg-orb orb-three" aria-hidden="true" />
      <div className="auth-dots dots-left" aria-hidden="true" />
      <div className="auth-dots dots-right" aria-hidden="true" />

      <aside className="auth-brand-panel auth-glass-panel auth-showcase-panel">
        <div className="auth-panel-decoration" aria-hidden="true">
          <span className="auth-soft-disc" />
          <span className="auth-hex hex-one" />
          <span className="auth-hex hex-two" />
          <span className="auth-plus plus-one">+</span>
          <span className="auth-plus plus-two">+</span>
        </div>

        <div className="auth-brand-logo">
          <span className="auth-brand-mark" aria-hidden="true">
            <Icon name="Activity" />
          </span>
          <strong>MEDSIM PRO</strong>
        </div>

        <div className="auth-hero-copy">
          <h1>Klinik pratiğini hesabında takip et.</h1>
          <p>Çözdüğün vakalar, ilerlemen ve yanlışların tek yerde saklanır.</p>
        </div>

        <div className="auth-feature-grid auth-feature-cards" aria-label="Hesap özellikleri">
          <article className="auth-feature-card">
            <Icon name="ClipboardList" />
            <strong>Yanlışlarım</strong>
            <span>Yanlış yaptığın vakaları gör ve öğren.</span>
          </article>
          <article className="auth-feature-card">
            <Icon name="Trophy" />
            <strong>Performans</strong>
            <span>İlerlemeni takip et, gelişimini gör.</span>
          </article>
          <article className="auth-feature-card">
            <Icon name="RotateCcw" />
            <strong>Tekrar çöz</strong>
            <span>İstediğin vakaya kolayca geri dön.</span>
          </article>
        </div>
      </aside>

      <form className="auth-card auth-glass-panel auth-form-panel" onSubmit={handleSubmit}>
        <div className="auth-card-head auth-form-head">
          <div>
            <p className="auth-eyebrow">{isRegister ? 'Yeni kullanıcı' : 'Kullanıcı girişi'}</p>
            <h2>{isRegister ? 'Kayıt ol' : 'Giriş yap'}</h2>
            <span>{isRegister ? 'Yeni çalışma hesabını oluştur.' : 'Hesabına dön ve kaldığın yerden devam et.'}</span>
          </div>
          <button className="auth-theme-button" type="button" onClick={onToggleTheme} aria-label="Tema değiştir">
            <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} />
          </button>
        </div>

        <div className="auth-switch auth-tabs" role="tablist" aria-label="Giriş türü">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => switchMode('login')}>
            <Icon name="LogIn" />
            <span>Giriş yap</span>
          </button>
          <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => switchMode('register')}>
            <Icon name="User" />
            <span>Kayıt ol</span>
          </button>
        </div>

        <button className="auth-google-button" type="button" onClick={handleGoogleLogin} disabled={googleBusy || busy}>
          <GoogleLogo />
          <span>{googleBusy ? 'Google hesabı açılıyor...' : 'Google ile devam et'}</span>
        </button>

        <div className="auth-divider" aria-hidden="true"><span>veya</span></div>

        <div className="auth-form-stack">
          {isRegister ? (
            <label className="auth-field auth-form-field">
              <span>Ad soyad</span>
              <div className="auth-input-wrap">
                <Icon name="User" />
                <input
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder="Ad soyad"
                  autoComplete="name"
                />
              </div>
            </label>
          ) : null}

          <label className="auth-field auth-form-field">
            <span>E-posta adresi</span>
            <div className="auth-input-wrap">
              <Icon name="Mail" />
              <input
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="E-posta adresi"
                type="email"
                autoComplete="email"
              />
            </div>
          </label>

          <label className="auth-field auth-form-field">
            <span>Şifre</span>
            <div className="auth-input-wrap">
              <Icon name="Lock" />
              <input
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                placeholder="Şifre"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} />
              </button>
            </div>
          </label>

          {isRegister ? (
            <label className="auth-field auth-form-field">
              <span>Şifre tekrar</span>
              <div className="auth-input-wrap">
                <Icon name="Lock" />
                <input
                  value={form.confirmPassword}
                  onChange={(event) => updateField('confirmPassword', event.target.value)}
                  placeholder="Şifreyi tekrar yaz"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                />
              </div>
            </label>
          ) : null}
        </div>

        <div className="auth-row auth-options-row">
          <label className="auth-checkbox-row">
            <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
            <span>Beni hatırla</span>
          </label>
          <button className="auth-link-button" type="button" onClick={() => setMessage({ type: 'error', text: 'Şifre sıfırlama için gerçek backend/Firebase auth reset akışı bağlanmalı.' })}>
            Şifremi unuttum
          </button>
        </div>

        {message ? <div className={`auth-message ${message.type}`}>{message.text}</div> : null}

        <button className="btn btn-primary auth-submit auth-primary-submit" type="submit" disabled={busy}>
          <Icon name={isRegister ? 'UserPlus' : 'LogIn'} />
          <span>{busy ? 'İşleniyor...' : isRegister ? 'Kayıt oluştur' : 'Giriş yap'}</span>
        </button>

        <p className="auth-local-note auth-footer-note">
          <Icon name="ShieldCheck" />
          <span>Demo sürüm • veriler bu cihazda saklanır.</span>
        </p>
      </form>
    </section>
  );
}

export default AuthPanel;
