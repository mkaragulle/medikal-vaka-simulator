import { ThemeToggle } from './ui.jsx';

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
        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} showLabel />
      </div>
    </header>
  );
}

export default Header;
