import { IconBadge, Icon } from './ui.jsx';

function MetricCard({ icon, label, value, tone = 'teal' }) {
  return (
    <article className="home-metric-card">
      <div className="home-metric-top">
        <span>{label}</span>
        <IconBadge icon={icon} tone={tone} size="sm" />
      </div>
      <strong>{value}</strong>
    </article>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="summary-v8-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SessionSummaryCard({ entries, stats, mode, examCount }) {
  const accuracy = Math.round(stats.accuracy || 0);
  const status = stats.attempts === 0
    ? 'İlk olgu bekleniyor'
    : accuracy >= 75
      ? 'Güçlü klinik performans'
      : accuracy >= 50
        ? 'Dengeli klinik ilerleme'
        : 'Hedefli tekrar önerilir';

  return (
    <aside className="session-summary-v8 card-surface">
      <header className="summary-v8-header">
        <div>
          <span>Oturum performansı</span>
          <h2>{status}</h2>
        </div>
        <div className="summary-v8-score">
          <strong>%{accuracy}</strong>
          <small>doğruluk</small>
        </div>
      </header>

      <div className="summary-v8-grid">
        <SummaryItem label="Mod" value={mode === 'study' ? 'Öğrenme' : 'Sınav'} />
        <SummaryItem label="Toplam puan" value={stats.score} />
        <SummaryItem label="Doğru seri" value={stats.bestStreak} />
        <SummaryItem label="Blok" value={examCount} />
      </div>

      <div className="summary-v8-history" role="list">
        {(entries.length ? entries : [
          { label: 'Henüz yanıtlanmış olgu yok', value: '—' },
        ]).map((entry, index) => (
          <div key={`${entry.label}-${index}`} className="summary-v8-row" role="listitem">
            <span>{index + 1}</span>
            <div>
              <strong>{entry.label}</strong>
              {entry.subtext ? <small>{entry.subtext}</small> : null}
            </div>
            <b>{entry.value}</b>
          </div>
        ))}
      </div>
    </aside>
  );
}

function HomeCommandCenter({
  mode,
  onChangeMode,
  stats,
  leaderboardEntries,
  onStartExam,
  examCount,
}) {
  return (
    <section className="home-dashboard-v8" id="dashboard">
      <section className="home-hero-v8 card-surface">
        <div className="home-hero-v8-bg" aria-hidden="true" />

        <div className="home-hero-v8-main">
          <div className="home-hero-copy-v8">
            <h1>KlinikIQ</h1>
            <p>TUS odaklı klinik akıl yürütme, tetkik seçimi ve olgu çözüm pratiği.</p>
          </div>

          <div className="home-actions-v8">
            <a href="#branches" className="btn btn-primary">Olgu çözmeye başla <Icon name="ArrowRight" /></a>
            <button type="button" className="btn btn-secondary" onClick={onStartExam}><Icon name="Timer" />Zamanlı blok oluştur</button>
          </div>
        </div>

        <div className="home-mode-v8" aria-label="Öğrenme modu seçimi">
          <button type="button" className={mode === 'study' ? 'active' : ''} onClick={() => onChangeMode('study')} aria-pressed={mode === 'study'}>
            Öğrenme modu
          </button>
          <button type="button" className={mode === 'exam' ? 'active' : ''} onClick={() => onChangeMode('exam')} aria-pressed={mode === 'exam'}>
            Sınav modu
          </button>
        </div>

        <div className="home-metrics-v8" aria-label="Performans göstergeleri">
          <MetricCard icon="ClipboardList" tone="blue" label="Çözülen olgu" value={stats.attempts} />
          <MetricCard icon="Target" tone="teal" label="Klinik doğruluk" value={`%${Math.round(stats.accuracy || 0)}`} />
          <MetricCard icon="Activity" tone="danger" label="Doğru seri" value={stats.bestStreak} />
          <MetricCard icon="Trophy" tone="warning" label="Toplam puan" value={stats.score} />
        </div>
      </section>

      <SessionSummaryCard entries={leaderboardEntries} stats={stats} mode={mode} examCount={examCount} />
    </section>
  );
}

export default HomeCommandCenter;
