import { Icon } from './ui.jsx';

const FALLBACK_TREND_POINTS = 8;

function clampNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function buildFallbackTrend(stats = {}, metric) {
  const attempts = Math.max(0, clampNumber(stats.attempts));
  const value = {
    attempts,
    accuracy: clampNumber(stats.accuracy),
    streak: clampNumber(stats.bestStreak || stats.streak),
    score: clampNumber(stats.score),
  }[metric] || 0;

  if (attempts <= 0 || value <= 0) {
    return Array.from({ length: FALLBACK_TREND_POINTS }, () => 0);
  }

  return Array.from({ length: FALLBACK_TREND_POINTS }, (_, index) => {
    const ratio = (index + 1) / FALLBACK_TREND_POINTS;
    return Math.max(0, Math.round(value * ratio));
  });
}

function getMetricTrend(stats = {}, metric) {
  const trend = Array.isArray(stats.trend) ? stats.trend.slice(-12) : [];
  if (trend.length >= 2) {
    const values = trend.map((item, index) => {
      if (metric === 'attempts') return clampNumber(item.attempts, index + 1);
      if (metric === 'accuracy') return clampNumber(item.accuracy);
      if (metric === 'streak') return clampNumber(item.streak);
      if (metric === 'score') return clampNumber(item.score);
      return 0;
    });
    return values.some((value) => value > 0) ? values : buildFallbackTrend(stats, metric);
  }
  return buildFallbackTrend(stats, metric);
}

function TrendSparkline({ values }) {
  const safeValues = Array.isArray(values) && values.length ? values.map((value) => clampNumber(value)) : [0, 0];
  const series = safeValues.length === 1 ? [safeValues[0], safeValues[0]] : safeValues;
  const width = 132;
  const height = 42;
  const padding = 4;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const step = (width - padding * 2) / Math.max(1, series.length - 1);
  const pointList = series.map((value, index) => {
    const x = padding + index * step;
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const points = pointList.join(' ');
  const last = (pointList[pointList.length - 1] || `${width - padding},${height / 2}`).split(',');

  return (
    <svg className="tus-stat-sparkline tus-stat-svg" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Performans trendi" focusable="false">
      <polyline className="tus-stat-sparkline-line" points={points} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="tus-stat-sparkline-dot" cx={last[0]} cy={last[1]} r="3.2" fill="currentColor" />
    </svg>
  );
}

function MetricCard({ icon, label, value, trend, tone = 'teal' }) {
  return (
    <article className={`home-metric-card home-metric-card-${tone} tus-stat-card-redesign`.trim()}>
      <div className="tus-stat-icon-wrap" aria-hidden="true">
        <Icon name={icon} />
      </div>
      <div className="tus-stat-copy">
        <span className="tus-stat-label">{label}</span>
        <strong>{value}</strong>
      </div>
      <TrendSparkline values={trend} />
    </article>
  );
}

function HomeCommandCenter({
  mode,
  onChangeMode,
  stats,
  onStartExam,
  onOpenTusQuestionModule,
}) {
  return (
    <section className="home-dashboard-v8 tus-dashboard-redesign" id="dashboard">
      <section className="home-hero-v8 home-hero-premium-v10 tus-hero-redesign card-surface" aria-label="KlinikIQ TUS çalışma alanı">
        <div className="tus-hero-soft-grid" aria-hidden="true" />
        <div className="tus-hero-dot-field" aria-hidden="true" />

        <div className="home-hero-v10-main tus-hero-main-redesign">
          <div className="home-hero-copy-v8 home-hero-copy-v10 tus-hero-copy-redesign">
            <span className="tus-hero-kicker"><Icon name="Trophy" /> TUS Pratiği</span>
            <h1 className="home-brand-title-v10 tus-hero-title-redesign">
              KlinikIQ <span>TUS</span>
            </h1>
            <p>
              Bilimsel ve gerçekçi klinik vakalarla çalış, ayırt ettiren bulguyu yakala ve karar verme becerini adım adım güçlendir.
            </p>
            <div className="home-hero-proof-row-v10 tus-hero-proof-redesign" aria-label="Klinik öğrenme özellikleri">
              <span><Icon name="Brain" /><strong>Klinik Akıl Yürütme</strong></span>
              <span><Icon name="ClipboardCheck" /><strong>Tetkik Seçimi</strong></span>
              <span><Icon name="ClipboardList" /><strong>TUS Soru Modülü</strong></span>
            </div>
          </div>

          <aside className="home-action-panel-v10 tus-action-panel-redesign" aria-label="Ana çalışma aksiyonları">
            <div className="home-actions-v8 home-actions-v10 tus-actions-redesign">
              <a href="#branches" className="btn btn-primary tus-primary-action-redesign">
                <span className="tus-action-icon"><Icon name="ArrowRight" /></span>
                <span>Vaka Çözmeye Başla</span>
                <Icon name="ArrowRight" />
              </a>
              <button type="button" className="btn btn-secondary tus-secondary-action-redesign" onClick={onStartExam}>
                <span className="tus-action-icon"><Icon name="Timer" /></span>
                <span>Zamanlı sınav oluştur</span>
                <Icon name="ArrowRight" />
              </button>
              <button type="button" className="btn btn-secondary tus-secondary-action-redesign" onClick={onOpenTusQuestionModule}>
                <span className="tus-action-icon"><Icon name="Sparkles" /></span>
                <span>Yeni TUS Sorusu Üret</span>
                <Icon name="ArrowRight" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      <div className="home-mode-v8 home-mode-v10 tus-mode-redesign" aria-label="Çalışma modu seçimi">
        <button type="button" className={mode === 'study' ? 'active' : ''} onClick={() => onChangeMode('study')} aria-pressed={mode === 'study'}>
          <Icon name="Lightbulb" />
          <span><strong>Öğrenme</strong></span>
        </button>
        <button type="button" className={mode === 'exam' ? 'active' : ''} onClick={() => onChangeMode('exam')} aria-pressed={mode === 'exam'}>
          <Icon name="ClipboardList" />
          <span><strong>Sınav</strong></span>
        </button>
      </div>

      <div className="home-metrics-v8 home-metrics-v10 tus-metrics-redesign" aria-label="Performans göstergeleri">
        <MetricCard icon="ClipboardList" tone="teal" label="Çözülen olgu" value={stats.attempts} trend={getMetricTrend(stats, 'attempts')} />
        <MetricCard icon="Target" tone="blue" label="Klinik doğruluk" value={`%${Math.round(stats.accuracy || 0)}`} trend={getMetricTrend(stats, 'accuracy')} />
        <MetricCard icon="TrendUp" tone="accent" label="En iyi seri" value={stats.bestStreak} trend={getMetricTrend(stats, 'streak')} />
        <MetricCard icon="Trophy" tone="warning" label="Toplam puan" value={stats.score} trend={getMetricTrend(stats, 'score')} />
      </div>
    </section>
  );
}

export default HomeCommandCenter;
