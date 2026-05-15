import { Icon } from './ui.jsx';

function MetricCard({ icon, label, value, helper, tone = 'teal' }) {
  return (
    <article className={`home-metric-card home-metric-card-${tone} tus-stat-card-redesign`.trim()}>
      <div className="tus-stat-icon-wrap" aria-hidden="true">
        <Icon name={icon} />
      </div>
      <div className="tus-stat-copy">
        <span className="tus-stat-label">{label}</span>
        <strong>{value}</strong>
        <small>{helper}</small>
      </div>
      <span className="tus-stat-sparkline" aria-hidden="true" />
    </article>
  );
}

function HomeCommandCenter({
  mode,
  onChangeMode,
  stats,
  onStartExam,
  onStartAIQuestion,
}) {
  return (
    <section className="home-dashboard-v8 tus-dashboard-redesign" id="dashboard">
      <section className="home-hero-v8 home-hero-premium-v10 tus-hero-redesign card-surface" aria-label="KlinikIQ TUS çalışma alanı">
        <div className="tus-hero-soft-grid" aria-hidden="true" />
        <div className="tus-hero-dot-field" aria-hidden="true" />

        <div className="home-hero-v10-main tus-hero-main-redesign">
          <div className="home-hero-copy-v8 home-hero-copy-v10 tus-hero-copy-redesign">
            <span className="tus-hero-kicker"><Icon name="Trophy" /> TUS pratiği</span>
            <h1 className="home-brand-title-v10 tus-hero-title-redesign">
              KlinikIQ <span>TUS Pratiği</span>
            </h1>
            <p>
              Odaklanmış klinik olgularla çalış, ayırt ettiren bulguyu yakala ve karar verme becerini adım adım güçlendir.
            </p>
            <div className="home-hero-proof-row-v10 tus-hero-proof-redesign" aria-label="Klinik öğrenme özellikleri">
              <span><Icon name="Brain" /><strong>Klinik akıl yürütme</strong></span>
              <span><Icon name="ClipboardCheck" /><strong>Tetkik seçimi</strong></span>
              <span><Icon name="Sparkles" /><strong>AI destekli pratik</strong></span>
            </div>
          </div>

          <aside className="home-action-panel-v10 tus-action-panel-redesign" aria-label="Ana çalışma aksiyonları">
            <div className="home-actions-v8 home-actions-v10 tus-actions-redesign">
              <a href="#branches" className="btn btn-primary tus-primary-action-redesign">
                <span className="tus-action-icon"><Icon name="ArrowRight" /></span>
                <span>Olgu çözmeye başla</span>
                <Icon name="ArrowRight" />
              </a>
              <button type="button" className="btn btn-secondary tus-secondary-action-redesign" onClick={onStartExam}>
                <span className="tus-action-icon"><Icon name="Timer" /></span>
                <span>Zamanlı blok oluştur</span>
                <Icon name="ArrowRight" />
              </button>
              <button type="button" className="btn btn-secondary ai-hero-action tus-ai-action-redesign" onClick={onStartAIQuestion}>
                <span className="tus-action-icon"><Icon name="Sparkles" /></span>
                <span>AI ile soru üret</span>
                <Icon name="ArrowRight" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      <div className="home-mode-v8 home-mode-v10 tus-mode-redesign" aria-label="Öğrenme modu seçimi">
        <button type="button" className={mode === 'study' ? 'active' : ''} onClick={() => onChangeMode('study')} aria-pressed={mode === 'study'}>
          <Icon name="BookOpen" />
          <span>
            <strong>Öğrenme</strong>
            <small>Adım adım pratik</small>
          </span>
        </button>
        <button type="button" className={mode === 'exam' ? 'active' : ''} onClick={() => onChangeMode('exam')} aria-pressed={mode === 'exam'}>
          <Icon name="ClipboardList" />
          <span>
            <strong>Sınav</strong>
            <small>Gerçek tempo</small>
          </span>
        </button>
      </div>

      <div className="home-metrics-v8 home-metrics-v10 tus-metrics-redesign" aria-label="Performans göstergeleri">
        <MetricCard icon="ClipboardList" tone="teal" label="Çözülen olgu" value={stats.attempts} helper="Devam et!" />
        <MetricCard icon="Target" tone="blue" label="Klinik doğruluk" value={`%${Math.round(stats.accuracy || 0)}`} helper="Doğruluk oranı" />
        <MetricCard icon="TrendUp" tone="accent" label="En iyi seri" value={stats.bestStreak} helper="Serini koru!" />
        <MetricCard icon="Trophy" tone="warning" label="Toplam puan" value={stats.score} helper="Güzel ilerleme!" />
      </div>
    </section>
  );
}

export default HomeCommandCenter;
