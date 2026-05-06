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

const normalize = (value = '') => String(value).toLocaleLowerCase('tr');

const errorSignalRules = [
  {
    id: 'investigation',
    title: 'Tetkik seçimi / sonuç yorumlama',
    shortTitle: 'Tetkik seçimi',
    icon: 'ClipboardCheck',
    keywords: ['tetkik', 'laboratuvar', 'seroloji', 'kültür', 'pcr', 'antijen', 'ekg', 'grafi', 'bt', 'mr', 'ultrason', 'anjiyografi', 'troponin', 'd-dimer', 'biyobelirteç'],
    description: 'Yanlış listesinde tetkik, laboratuvar veya görüntüleme verisini klinik tabloyla eşleştirme ihtiyacı öne çıkıyor.',
    nextAction: 'Bu oturumda tetkik seçimi ve sonuç yorumlama odaklı kısa AI soru turu başlat.',
  },
  {
    id: 'management',
    title: 'İlk yönetim basamağı',
    shortTitle: 'Yönetim sırası',
    icon: 'Target',
    keywords: ['yönetim', 'tedavi', 'stabilizasyon', 'resüsitasyon', 'antikoagülasyon', 'antibiyotik', 'tromboliz', 'cerrahi', 'ilk yaklaşım', 'acil', 'reperfüzyon', 'izolasyon'],
    description: 'Yanlış cevaplarda tanıdan sonraki ilk adımı seçme ve ileri basamakla başlangıç yaklaşımını ayırma ihtiyacı belirginleşiyor.',
    nextAction: 'Yanlış yaptığın branşta önce ilk yaklaşım ve tedavi sırası kartlarını tekrar oku.',
  },
  {
    id: 'diagnosticPattern',
    title: 'Ayırıcı tanı ve karar verdirici bulgu',
    shortTitle: 'Tanısal ayrım',
    icon: 'InsightGauge',
    keywords: ['ayırıcı', 'tanı', 'patern', 'bulgu', 'kırmızı bayrak', 'tipik', 'klinik', 'semptom', 'yakınma', 'öykü', 'muayene'],
    description: 'Yanlışlar en çok benzer klinik tablolar arasında karar verdirici ipucunu seçme tarafında kümeleniyor.',
    nextAction: 'Son yanlış vakalarda yalnızca karar verdirici bulguyu işaretleyerek 10 dakikalık hızlı tekrar yap.',
  },
  {
    id: 'tusSpot',
    title: 'TUS spot kelime yakalama',
    shortTitle: 'TUS spot ipucu',
    icon: 'Lightbulb',
    keywords: ['tus', 'spot', 'kritik', 'ipucu', 'anahtar', 'klasik', 'en sık', 'ilk', 'karakteristik'],
    description: 'Sorulardaki kısa ama karar verdiren TUS kelimelerini yakalama tarafında hedefli pekiştirme faydalı olur.',
    nextAction: 'AI ile aynı branştan kısa, tek ipucuya dayalı TUS spot soruları üret.',
  },
];

function collectTextFromWrongAnswer(item = {}) {
  return normalize([
    item.title,
    item.branchName,
    item.selected,
    item.correctAnswer,
    item.difficulty,
    item.clinicalFocus,
    item.question,
    item.diagnosisMeta,
  ].filter(Boolean).join(' '));
}

function getBranchWeakness(wrongAnswers = [], examHistory = []) {
  const branchMap = new Map();
  wrongAnswers.forEach((item) => {
    const key = item.branchId || item.branchName || 'unknown';
    const current = branchMap.get(key) ?? {
      branchId: item.branchId,
      branchName: item.branchName || 'Klinik branş',
      wrongCount: 0,
      repeatCount: 0,
    };
    current.wrongCount += 1;
    current.repeatCount += Math.max(1, item.attempts || 1);
    branchMap.set(key, current);
  });

  const wrongBranch = [...branchMap.values()].sort((a, b) => (
    b.repeatCount - a.repeatCount || b.wrongCount - a.wrongCount
  ))[0] ?? null;

  const lastExam = Array.isArray(examHistory) ? examHistory[0] : null;
  const weakestExamBranch = lastExam?.branchBreakdown
    ?.filter((item) => item.total >= 1)
    ?.sort((a, b) => a.accuracy - b.accuracy || b.total - a.total)?.[0] ?? null;

  if (wrongBranch && (!weakestExamBranch || wrongBranch.repeatCount >= 2)) return wrongBranch;
  if (weakestExamBranch && weakestExamBranch.accuracy < 70) {
    return {
      branchId: weakestExamBranch.branchId,
      branchName: weakestExamBranch.branchName,
      wrongCount: Math.max(0, weakestExamBranch.total - weakestExamBranch.correct),
      repeatCount: Math.max(0, weakestExamBranch.total - weakestExamBranch.correct),
      fromExam: true,
    };
  }
  return wrongBranch;
}

function getDominantErrorSignal(wrongAnswers = []) {
  if (!wrongAnswers.length) return null;

  const scores = errorSignalRules.map((rule) => ({ ...rule, score: 0 }));
  wrongAnswers.slice(0, 12).forEach((item) => {
    const text = collectTextFromWrongAnswer(item);
    scores.forEach((rule) => {
      rule.keywords.forEach((keyword) => {
        if (text.includes(keyword)) rule.score += Math.max(1, item.attempts || 1);
      });
    });
  });

  const best = scores.sort((a, b) => b.score - a.score)[0];
  if (!best || best.score <= 0) return errorSignalRules[2];
  return best;
}

function buildPersonalSessionInsight({ stats = {}, mode = 'study', wrongAnswers = [], examHistory = [] }) {
  const attempts = Number(stats.attempts || 0);
  const accuracy = Math.round(stats.accuracy || 0);
  const currentStreak = Number(stats.streak || 0);
  const hasProgress = attempts > 0;
  const hasWrongAnswers = wrongAnswers.length > 0;
  const branchFocus = getBranchWeakness(wrongAnswers, examHistory);
  const dominantSignal = getDominantErrorSignal(wrongAnswers);
  const recentRepeat = wrongAnswers.find((item) => (item.attempts || 1) > 1);

  if (!hasProgress) {
    return {
      status: 'Kişisel başlangıç bloğu',
      description: 'Henüz yeterli çözüm verisi yok. İlk mini bloktan sonra bu panel yanlış branşları ve hata paternlerini otomatik yorumlayacak.',
      focus: {
        icon: 'LayeredCards',
        eyebrow: 'Başlangıç odağı',
        title: 'Kısa ve ölçülebilir bir blokla başla',
        description: 'İlk oturumda farklı branşlardan az sayıda olgu çözerek tanı, tetkik ve yönetim akışını birlikte test et.',
      },
      strategy: {
        icon: mode === 'study' ? 'BookOpen' : 'Timer',
        eyebrow: 'Aktif strateji',
        title: mode === 'study' ? 'Öğrenme modu uygun' : 'Sınav temposu hazır',
        description: mode === 'study'
          ? 'Feedback kartlarını ayrıntılı okuyarak sistemin kişisel yanlış paternini çıkarmasına veri oluştur.'
          : 'Zamanlı blok sonrası yanlış cevap paneli daha net kişisel tekrar önerisi üretecek.',
      },
      nextAction: 'Önce 10 olguluk kısa bir öğrenme bloğu çöz; ardından yanlış cevap panelinden hedefli tekrara geç.',
    };
  }

  const status = accuracy < 50
    ? 'Hedefli tekrar zamanı'
    : accuracy < 70
      ? (branchFocus ? `${branchFocus.branchName} odağı güçlendirilmeli` : 'Tanısal patern tekrarına ihtiyaç var')
      : currentStreak >= 4
        ? 'Seri korunuyor, zorluk artırılabilir'
        : 'Performans dengeli ilerliyor';

  const descriptionParts = [];
  if (branchFocus?.branchName && hasWrongAnswers) {
    descriptionParts.push(`Son yanlış listesinde ${branchFocus.branchName} vakaları daha fazla tekrar gerektiriyor.`);
  } else if (dominantSignal && hasWrongAnswers) {
    descriptionParts.push(`${dominantSignal.shortTitle} tarafında tekrar eden bir hata paterni izleniyor.`);
  } else if (accuracy >= 70) {
    descriptionParts.push('Genel klinik akış güçlü; bundan sonra hız, çeldirici ayrımı ve zaman baskısı altında karar netliği çalışılmalı.');
  } else {
    descriptionParts.push('Genel performans temel klinik paternleri daha kısa ve kontrollü bloklarla pekiştirmeyi gerektiriyor.');
  }
  if (recentRepeat) {
    descriptionParts.push(`“${recentRepeat.title}” benzeri vakalarda tekrar eden yanlış eğilimi var.`);
  }

  const focusTitle = branchFocus?.branchName
    ? `${branchFocus.branchName} tekrar odağı`
    : dominantSignal?.title ?? 'Karar verdirici ipucu odağı';

  const focusDescription = branchFocus?.branchName
    ? `Bu branştaki yanlışları çözerken önce ayırt ettirici bulgu, sonra tetkik/yönetim kararını ayrı ayrı kontrol et.`
    : dominantSignal?.description ?? 'Benzer tablolar arasında tanıyı değiştiren küçük ipuçlarını sistematik biçimde tekrar et.';

  const strategyTitle = accuracy < 60
    ? 'Öğrenme modu daha verimli'
    : mode === 'exam'
      ? 'Zamanlı blokla pekiştir'
      : 'Feedback üzerinden hızlan';

  const strategyDescription = accuracy < 60
    ? 'Şu aşamada hızlı sınav temposu yerine kanıt zinciri ve seçenek eleme mantığını okuyarak ilerlemek daha yüksek verim sağlar.'
    : mode === 'exam'
      ? 'Sınav modundan sonra yalnızca yanlış yaptığın branşları açıp karar verdirici bulguları kısa not gibi tekrar et.'
      : 'Öğrenme modunda doğru yaptığın sorularda bile seçenek karşılaştırmasını kısa tarayarak çeldirici ayrımını güçlendir.';

  let nextAction = dominantSignal?.nextAction ?? 'Yanlış yaptığın branşta 10 olguluk kısa bir öğrenme bloğu çöz.';
  if (branchFocus?.branchName && accuracy < 70) {
    nextAction = `${branchFocus.branchName} için 10 olguluk öğrenme bloğu çöz; her yanlışta kanıt zinciri ve seçenek karşılaştırmasını tekrar oku.`;
  } else if (accuracy >= 75 && currentStreak >= 4) {
    nextAction = 'Bir sonraki turda zamanlı mini blok aç ve yalnızca süre baskısı altında kaçırdığın çeldiricileri listele.';
  }

  return {
    status,
    description: descriptionParts.join(' '),
    focus: {
      icon: dominantSignal?.icon ?? 'Lightbulb',
      eyebrow: 'Kişisel çalışma odağı',
      title: focusTitle,
      description: focusDescription,
    },
    strategy: {
      icon: accuracy < 60 ? 'BookOpen' : 'TrendUp',
      eyebrow: 'Aktif strateji',
      title: strategyTitle,
      description: strategyDescription,
    },
    nextAction,
  };
}

function InsightRow({ icon, eyebrow, title, description }) {
  return (
    <article className="summary-insight-card-v11 summary-insight-card-v12" role="listitem">
      <IconBadge icon={icon} tone="teal" size="sm" className="summary-icon-badge-v12" />
      <div className="summary-insight-copy-v12">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </article>
  );
}

function SessionSummaryCard({ stats, mode, wrongAnswers = [], examHistory = [] }) {
  const insight = buildPersonalSessionInsight({ stats, mode, wrongAnswers, examHistory });

  return (
    <aside className="session-summary-v8 session-summary-v11 session-summary-v12 card-surface">
      <header className="summary-v8-header summary-v11-header summary-v12-header">
        <div className="summary-v12-kicker">
          <Icon name="InsightGauge" />
          <span>Kişisel performans içgörüsü</span>
        </div>
        <div>
          <span>Oturum performansı</span>
          <h2>{insight.status}</h2>
          <p>{insight.description}</p>
        </div>
      </header>

      <div className="summary-v11-insights summary-v12-insights" role="list">
        <InsightRow
          icon={insight.focus.icon}
          eyebrow={insight.focus.eyebrow}
          title={insight.focus.title}
          description={insight.focus.description}
        />
        <InsightRow
          icon={insight.strategy.icon}
          eyebrow={insight.strategy.eyebrow}
          title={insight.strategy.title}
          description={insight.strategy.description}
        />
      </div>

      <div className="summary-v11-next-step summary-v12-next-step">
        <span>Sonraki adım</span>
        <strong>{insight.nextAction}</strong>
      </div>
    </aside>
  );
}

function HomeCommandCenter({
  mode,
  onChangeMode,
  stats,
  wrongAnswers = [],
  examHistory = [],
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

      <SessionSummaryCard stats={stats} mode={mode} wrongAnswers={wrongAnswers} examHistory={examHistory} />
    </section>
  );
}

export default HomeCommandCenter;
