import { IconBadge, Icon } from './ui.jsx';

function MetricCard({ icon, label, value, tone = 'teal' }) {
  return (
    <article className={`home-metric-card home-metric-card-${tone}`.trim()}>
      <div className="home-metric-top">
        <span>{label}</span>
        <IconBadge icon={icon} tone={tone} size="sm" />
      </div>
      <strong>{value}</strong>
    </article>
  );
}

function InsightRow({ icon, eyebrow, title, description }) {
  return (
    <article className="summary-insight-card-v11" role="listitem">
      <IconBadge icon={icon} tone="teal" size="sm" />
      <div>
        <span>{eyebrow}</span>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </article>
  );
}

function SessionSummaryCard({ stats, mode }) {
  const accuracy = Math.round(stats.accuracy || 0);
  const hasProgress = stats.attempts > 0;
  const status = !hasProgress
    ? 'İlk olguya hazır'
    : accuracy >= 75
      ? 'Güçlü klinik tempo'
      : accuracy >= 50
        ? 'Dengeli ilerleme'
        : 'Hedefli tekrar zamanı';

  const focus = !hasProgress
    ? {
        title: 'Başlangıç bloğu önerilir',
        description: 'İlk oturum için kısa bir branş bloğu seçip tanı, tetkik ve ilk yönetim akışını birlikte çöz.',
      }
    : accuracy >= 75
      ? {
          title: 'Zaman baskısıyla pekiştir',
          description: 'Temel akış güçlü görünüyor; şimdi zamanlı blok ile hız ve karar netliğini artır.',
        }
      : accuracy >= 50
        ? {
            title: 'Yanlış cevap analizi yap',
            description: 'Orta düzey performansta en hızlı gelişim, çeldirici ayrımı ve kritik ipucu tekrarından gelir.',
          }
        : {
            title: 'Temel paternleri güçlendir',
            description: 'Önce sık çıkan TUS paternlerini, kırmızı bayrakları ve ilk tetkik mantığını kısa bloklarla tekrar et.',
          };

  const modeInsight = mode === 'study'
    ? {
        title: 'Öğrenme modunda ilerle',
        description: 'Feedback kartlarını okuyarak klinik gerekçe, kanıt zinciri ve seçenek eleme mantığını pekiştir.',
      }
    : {
        title: 'Sınav temposunu koru',
        description: 'Yanıt sonrası yalnızca kritik notları tarayıp süre yönetimini bozmadan sonraki olguya geç.',
      };

  const nextAction = hasProgress && accuracy < 60
    ? 'Önce zayıf branştan 10 olguluk öğrenme bloğu çöz.'
    : mode === 'study'
      ? 'Hazır olduğunda zamanlı blok oluştur.'
      : 'Blok sonrası yanlış cevap panelinden tekrar yap.';

  return (
    <aside className="session-summary-v8 session-summary-v11 card-surface">
      <header className="summary-v8-header summary-v11-header">
        <div>
          <span>Oturum performansı</span>
          <h2>{status}</h2>
          <p>Oturum akışına göre kısa çalışma yönü ve sonraki adım önerisi.</p>
        </div>
      </header>

      <div className="summary-v11-insights" role="list">
        <InsightRow
          icon="Lightbulb"
          eyebrow="Çalışma odağı"
          title={focus.title}
          description={focus.description}
        />
        <InsightRow
          icon="BookOpen"
          eyebrow="Aktif strateji"
          title={modeInsight.title}
          description={modeInsight.description}
        />
      </div>

      <div className="summary-v11-next-step">
        <span>Sonraki adım</span>
        <strong>{nextAction}</strong>
      </div>
    </aside>
  );
}

function HomeCommandCenter({
  mode,
  onChangeMode,
  stats,
  onStartExam,
  onStartAIQuestion,
  totalCases = 0,
  totalBranches = 0,
}) {
  const actionMeta = totalCases > 0 && totalBranches > 0
    ? `${totalCases} olgu · ${totalBranches} branş`
    : 'Klinik pratik akışı';

  return (
    <section className="home-dashboard-v8" id="dashboard">
      <section className="home-hero-v8 home-hero-premium-v10 card-surface">
        <div className="home-hero-v8-bg home-hero-premium-bg-v10" aria-hidden="true" />

        <div className="home-hero-v10-main">
          <div className="home-hero-copy-v8 home-hero-copy-v10">
            <span className="home-hero-eyebrow-v10">
              <Icon name="ShieldCheck" />
              TUS odaklı klinik komuta merkezi
            </span>
            <h1 className="home-brand-title-v10">KlinikIQ</h1>
            <p>TUS odaklı klinik akıl yürütme, tetkik seçimi ve olgu çözüm pratiği.</p>
          </div>

          <aside className="home-action-panel-v10" aria-label="Hızlı başlangıç aksiyonları">
            <div className="home-action-panel-head-v10">
              <span>Hızlı başlangıç</span>
              <small>{actionMeta}</small>
            </div>
            <div className="home-actions-v8 home-actions-v10">
              <a href="#branches" className="btn btn-primary">
                <span>Olgu çözmeye başla</span>
                <Icon name="ArrowRight" />
              </a>
              <button type="button" className="btn btn-secondary" onClick={onStartExam}>
                <Icon name="Timer" />
                <span>Zamanlı blok oluştur</span>
              </button>
              <button type="button" className="btn btn-secondary ai-hero-action" onClick={onStartAIQuestion}>
                <Icon name="Sparkles" />
                <span>AI ile Soru Üret</span>
              </button>
            </div>
          </aside>
        </div>

        <div className="home-mode-v8 home-mode-v10" aria-label="Öğrenme modu seçimi">
          <button type="button" className={mode === 'study' ? 'active' : ''} onClick={() => onChangeMode('study')} aria-pressed={mode === 'study'}>
            Öğrenme modu
          </button>
          <button type="button" className={mode === 'exam' ? 'active' : ''} onClick={() => onChangeMode('exam')} aria-pressed={mode === 'exam'}>
            Sınav modu
          </button>
        </div>

        <div className="home-metrics-v8 home-metrics-v10" aria-label="Performans göstergeleri">
          <MetricCard icon="ClipboardList" tone="blue" label="Çözülen olgu" value={stats.attempts} />
          <MetricCard icon="Target" tone="teal" label="Klinik doğruluk" value={`%${Math.round(stats.accuracy || 0)}`} />
          <MetricCard icon="Activity" tone="danger" label="Doğru seri" value={stats.bestStreak} />
          <MetricCard icon="Trophy" tone="warning" label="Toplam puan" value={stats.score} />
        </div>
      </section>

      <SessionSummaryCard stats={stats} mode={mode} />
    </section>
  );
}

export default HomeCommandCenter;
