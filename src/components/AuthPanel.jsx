import { useState } from 'react';
import { Icon } from './ui.jsx';

function AuthPanel({ onLogin, onRegister, theme, onToggleTheme }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  const isRegister = mode === 'register';

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
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

  return (
    <section className="auth-page-shell" aria-label="MedSim Pro kullanıcı girişi">
      <div className="auth-bg-orb orb-one" aria-hidden="true" />
      <div className="auth-bg-orb orb-two" aria-hidden="true" />

      <div className="auth-brand-panel card-surface">
        <div className="auth-brand-mark" aria-hidden="true">
          <Icon name="Activity" />
        </div>
        <p className="auth-eyebrow">MedSim Pro Account</p>
        <h1>Klinik olgu pratiğini kişisel hesabında takip et.</h1>
        <p>
          Çözdüğün olgular, puanın ve yanlış yaptığın sorular bu cihazdaki hesabına kaydedilir.
        </p>

        <div className="auth-feature-grid">
          <span><Icon name="Target" /> Yanlış çözülenler listesi</span>
          <span><Icon name="Trophy" /> Kişisel performans</span>
          <span><Icon name="ClipboardList" /> Tekrar çözme akışı</span>
        </div>
      </div>

      <form className="auth-card card-surface" onSubmit={handleSubmit}>
        <div className="auth-card-head">
          <div>
            <p className="auth-eyebrow">{isRegister ? 'Yeni kullanıcı' : 'Kullanıcı girişi'}</p>
            <h2>{isRegister ? 'Kayıt ol' : 'Giriş yap'}</h2>
            <span>{isRegister ? 'Yeni bir çalışma hesabı oluştur.' : 'Hesabına dön ve çalışmaya devam et.'}</span>
          </div>
          <button className="btn btn-icon theme-toggle auth-theme-toggle" type="button" onClick={onToggleTheme} aria-label="Tema değiştir">
            <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} />
          </button>
        </div>

        <div className="auth-switch" role="tablist" aria-label="Giriş türü">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setMessage(null); }}>
            Giriş yap
          </button>
          <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setMessage(null); }}>
            Kayıt ol
          </button>
        </div>

        {isRegister ? (
          <label className="auth-field">
            <span>Ad soyad</span>
            <input
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Muhammed Karagülle"
              autoComplete="name"
            />
          </label>
        ) : null}

        <label className="auth-field">
          <span>E-posta</span>
          <input
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="ornek@mail.com"
            type="email"
            autoComplete="email"
          />
        </label>

        <label className="auth-field">
          <span>Şifre</span>
          <input
            value={form.password}
            onChange={(event) => updateField('password', event.target.value)}
            placeholder="En az 4 karakter"
            type="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
          />
        </label>

        {isRegister ? (
          <label className="auth-field">
            <span>Şifre tekrar</span>
            <input
              value={form.confirmPassword}
              onChange={(event) => updateField('confirmPassword', event.target.value)}
              placeholder="Şifreyi tekrar yaz"
              type="password"
              autoComplete="new-password"
            />
          </label>
        ) : null}

        {message ? <div className={`auth-message ${message.type}`}>{message.text}</div> : null}

        <button className="btn btn-primary auth-submit" type="submit" disabled={busy}>
          <Icon name={isRegister ? 'UserPlus' : 'LogIn'} />
          <span>{busy ? 'İşleniyor...' : isRegister ? 'Kayıt oluştur' : 'Giriş yap'}</span>
        </button>

        <p className="auth-local-note">
          Bu sürüm Vercel uyumlu frontend demo auth kullanır; hesap verileri tarayıcı localStorage üzerinde tutulur.
        </p>
      </form>
    </section>
  );
}

export default AuthPanel;
