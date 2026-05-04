import { useState } from 'react';
import { Icon } from './ui.jsx';

function GoogleLogo() {
  return (
    <span className="google-logo-ui" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20" role="presentation">
        <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.24 1.26-.96 2.32-2.04 3.04l3.3 2.56c1.92-1.76 3.03-4.36 3.03-7.44 0-.72-.06-1.4-.18-2.06H12Z"/>
        <path fill="#4285F4" d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.3-2.56c-.92.62-2.1.98-3.32.98-2.56 0-4.72-1.72-5.5-4.02H3.08v2.64A10 10 0 0 0 12 22Z"/>
        <path fill="#FBBC05" d="M6.5 13.96A5.96 5.96 0 0 1 6.2 12c0-.68.12-1.34.3-1.96V7.4H3.08A10 10 0 0 0 2 12c0 1.62.38 3.14 1.08 4.56l3.42-2.6Z"/>
        <path fill="#34A853" d="M12 6.02c1.48 0 2.8.5 3.84 1.5l2.88-2.88C16.94 2.98 14.68 2 12 2a10 10 0 0 0-8.92 5.4l3.42 2.64C7.28 7.74 9.44 6.02 12 6.02Z"/>
      </svg>
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

    setMessage({ type: 'success', text: result?.message || (isRegister ? 'Hesabın oluşturuldu.' : 'Giriş başarılı.') });
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

    setMessage({ type: 'success', text: result?.message || 'Google ile giriş başarılı.' });
  };

  return (
    <section className="auth-page-shell auth-premium-login" aria-label="MedSim Pro kullanıcı girişi">
      <div className="auth-grid-bg" aria-hidden="true" />
      <div className="auth-bg-orb orb-one" aria-hidden="true" />
      <div className="auth-bg-orb orb-two" aria-hidden="true" />
      <div className="auth-bg-orb orb-three" aria-hidden="true" />
      <div className="auth-dots dots-left" aria-hidden="true" />
      <div className="auth-dots dots-right" aria-hidden="true" />

      <aside className="auth-brand-panel auth-glass-panel auth-showcase-panel" aria-label="MedSim Pro tanıtım alanı">
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
          <h1>
            <span>Klinik pratiğini</span>
            <span>hesabında takip et.</span>
          </h1>
          <p>Çözdüğün vakalar, ilerlemen ve yanlışların tek yerde saklanır.</p>
        </div>

        <div className="auth-feature-grid auth-feature-cards" aria-label="Hesap avantajları">
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
            <p className="auth-eyebrow">KULLANICI GİRİŞİ</p>
            <h2>{isRegister ? 'Kayıt ol' : 'Giriş yap'}</h2>
            <span>{isRegister ? 'Hesabını oluştur ve çözmeye hemen başla.' : 'Hesabına dön ve kaldığın yerden devam et.'}</span>
          </div>
          <button className="auth-theme-button" type="button" onClick={onToggleTheme} aria-label="Tema değiştir">
            <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} />
          </button>
        </div>

        <div className="auth-switch auth-tabs" role="tablist" aria-label="Kimlik doğrulama sekmeleri">
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
          <button
            className="auth-link-button"
            type="button"
            onClick={() => setMessage({ type: 'error', text: 'Şifre sıfırlama için Firebase reset-password akışı bağlanmalı.' })}
          >
            Şifremi unuttum
          </button>
        </div>

        {message ? <div className={`auth-message ${message.type}`}>{message.text}</div> : null}

        <button className="btn btn-primary auth-submit auth-primary-submit" type="submit" disabled={busy}>
          <Icon name={isRegister ? 'UserPlus' : 'LogIn'} />
          <span>{busy ? 'İşleniyor...' : isRegister ? 'Kayıt ol' : 'Giriş yap'}</span>
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
