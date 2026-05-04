import { calculateAccuracy, formatPercent } from '../utils/scoring.js';

function SessionStats({ stats }) {
  const accuracy = calculateAccuracy(stats.correct, stats.attempts);
  const performanceTitle = stats.attempts === 0
    ? 'Henüz olgu çözülmedi'
    : accuracy >= 80
      ? 'Güçlü klinik doğruluk'
      : accuracy >= 60
        ? 'Dengeli ilerleme'
        : 'Hedefli tekrar gerekli';

  return (
    <section className="card session-card clean-session-card" aria-label="Klinik çalışma performansı">
      <div className="session-card-head clean-session-head">
        <div className="session-card-copy">
          <p className="eyebrow">Oturum özeti</p>
          <h2>Klinik performans</h2>
          <p className="session-note">Puan, çözülen olgu, doğruluk oranı ve doğru seri birlikte izlenir.</p>
        </div>

        <div className="session-overview clean-session-overview">
          <span className="session-overview-label">Genel performans</span>
          <strong>{performanceTitle}</strong>
        </div>
      </div>

      <div className="session-metrics clean-session-metrics">
        <div className="session-metric primary">
          <span>Toplam puan</span>
          <strong>{stats.score}</strong>
        </div>
        <div className="session-metric">
          <span>Olgu</span>
          <strong>{stats.attempts}</strong>
        </div>
        <div className="session-metric">
          <span>Doğru</span>
          <strong>{stats.correct}</strong>
        </div>
        <div className="session-metric">
          <span>Doğruluk</span>
          <strong>{formatPercent(accuracy)}</strong>
        </div>
        <div className="session-metric">
          <span>Seri</span>
          <strong>{stats.bestStreak}</strong>
        </div>
      </div>
    </section>
  );
}

export default SessionStats;
