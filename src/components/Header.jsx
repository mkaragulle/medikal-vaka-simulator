function ThemeIcon({ theme }) {
  if (theme === 'light') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="button-icon">
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="button-icon">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 3.6 3.6M20.4 20.4 19 19M19 5l1.4-1.4M3.6 20.4 5 19" />
    </svg>
  );
}

function Header({ theme, onToggleTheme, onHome, sessionStats }) {
  return (
    <header className="app-header">
      <button className="brand nav-brand" type="button" onClick={onHome} aria-label="Ana sayfa">
        <span className="brand-mark nav-brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <path d="M6 17h5l2.2-7 4.3 13 3.2-17 2.1 11H26" />
          </svg>
        </span>
        <span className="brand-copy nav-brand-copy">
          <strong>MedSim Pro</strong>
          <small>TUS odaklı klinik olgu simülatörü</small>
        </span>
      </button>

      <div className="header-actions nav-actions">
        <div className="header-score-chip nav-score-chip" aria-label="Oturum skoru">
          <span>Puan</span>
          <strong>{sessionStats.score}</strong>
        </div>
        <button className="theme-toggle btn btn-icon" type="button" onClick={onToggleTheme} aria-label="Tema değiştir">
          <ThemeIcon theme={theme} />
          <span>{theme === 'light' ? 'Koyu tema' : 'Açık tema'}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
