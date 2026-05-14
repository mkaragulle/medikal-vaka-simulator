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

const ERROR_DOMAINS = [
  {
    key: 'tetkik seçimi',
    icon: 'Search',
    tone: 'blue',
    pattern: /tetkik|test|seroloji|kültür|pcr|bt|mrg|mr\b|usg|ekg|troponin|marker|laboratuvar|biyopsi|endoskopi|görüntüleme|kan gazı|enzim|antikor|antijen/iu,
  },
  {
    key: 'yönetim sırası',
    icon: 'Timer',
    tone: 'warning',
    pattern: /yönetim|ilk yaklaşım|tedavi|stabil|replasman|antibiyotik|antikoagülasyon|reperfüzyon|cerrahi|bildirim|güvenlik|resüsitasyon|profilaksi|izlem|başla|uygula/iu,
  },
  {
    key: 'tanısal ayrım',
    icon: 'Target',
    tone: 'teal',
    pattern: /tanı|ayırıcı|sendrom|hastalık|enfarktüs|pankreatit|anemi|inme|kanama|eksikliği|toksisite|vaka|olgu/iu,
  },
  {
    key: 'TUS spot bilgisi',
    icon: 'Sparkles',
    tone: 'accent',
    pattern: /tus|spot|hap bilgi|kırmızı bayrak|adli|etik|mekanizma|enzim|reseptör|ilaç|vitamin|gen/iu,
  },
];

function normalizeText(value = '') {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function mostFrequent(items = []) {
  const counts = new Map();
  items.filter(Boolean).forEach((item) => counts.set(item, (counts.get(item) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0] || null;
}

function inferErrorDomain(entry) {
  const source = normalizeText(`${entry.title || ''} ${entry.selected || ''} ${entry.correctAnswer || ''} ${entry.difficulty || ''}`);
  return ERROR_DOMAINS.find((domain) => domain.pattern.test(source)) || ERROR_DOMAINS[2];
}

function buildPerformanceInsight(stats = {}, wrongAnswers = [], mode = 'study', examCount = 0) {
  const attempts = Number(stats.attempts || 0);
  const accuracy = Math.round(stats.accuracy || 0);
  const currentStreak = Number(stats.streak || 0);
  const bestStreak = Number(stats.bestStreak || 0);
  const recentWrongs = Array.isArray(wrongAnswers) ? wrongAnswers.slice(0, 8) : [];
  const hasWrongData = recentWrongs.length > 0;
  const branchPeak = mostFrequent(recentWrongs.map((item) => item.branchName || item.branchId));
  const domainPeak = mostFrequent(recentWrongs.map((item) => inferErrorDomain(item).key));
  const primaryDomain = ERROR_DOMAINS.find((domain) => domain.key === domainPeak?.[0]) || ERROR_DOMAINS[2];
  const weakBranch = branchPeak?.[0] || '';
  const weakBranchCount = branchPeak?.[1] || 0;

  if (!attempts) {
    return {
      title: 'İlk bloktan sonra yön belirginleşir',
      description: 'Birkaç olgu çözdükten sonra burada yanlışların hangi branşta ve hangi karar adımında toplandığı netleşir.',
      scoreTone: 'teal',
      focus: {
        icon: 'ClipboardList',
        tone: 'blue',
        label: 'Çalışma odağı',
        title: 'Başlangıç turu',
        text: 'İlk turda farklı branşlardan kısa olgular çöz; amaç hız yapmak değil, hangi tip ipuçlarını kaçırdığını görmek.',
      },
      strategy: {
        icon: 'Brain',
        tone: 'teal',
        label: 'Aktif strateji',
        title: 'Gerekçeyi yakala',
        text: 'Cevaptan sonra doğru seçeneği belirleyen bulguyu ve elediğin şıkkın neden yanlış olduğunu bir cümleyle not et.',
      },
      nextAction: '5–10 olguluk kısa bir öğrenme bloğu çöz; ilk yanlışlardan sonra tekrar planı netleşsin.',
    };
  }

  if (accuracy < 50) {
    return {
      title: weakBranch ? `${weakBranch}: kaçan ipuçlarını toparla` : `${primaryDomain.key.charAt(0).toLocaleUpperCase('tr') + primaryDomain.key.slice(1)} hatalarını toparla`,
      description: hasWrongData
        ? `Son yanlışlar tek bir yere dağılmadan birikmiş görünüyor. Yeni bloktan önce yanlış sorularda cevabı değiştiren bulguyu ve elediğin yakın şıkkı tekrar kontrol et.`
        : 'Şu an hızdan çok okuma düzeni önemli. Her olguda ana yakınma, ayırt ettiren bulgu ve ilk karar adımını ayrı ayrı işaretleyerek ilerle.',
      scoreTone: 'danger',
      focus: {
        icon: primaryDomain.icon,
        tone: primaryDomain.tone,
        label: 'Çalışma odağı',
        title: weakBranch ? weakBranch : 'Karar adımı',
        text: weakBranch
          ? `${weakBranchCount} yanlış aynı branşta toplanmış. Bu, konuyu baştan okumaktan çok olgudaki ayırt ettirici ipucunu yakalama çalışması gerektirir.`
          : `Yanlışların ortak noktası ${primaryDomain.key}. Soruyu çözerken önce cevabı değiştiren tek bulguyu bulmaya çalış.`,
      },
      strategy: {
        icon: 'BookOpen',
        tone: 'blue',
        label: 'Aktif strateji',
        title: 'Yavaş ve kontrollü çöz',
        text: 'Zamanlı moda geçmeden 6–8 soruluk kısa blok çöz. Her yanlışta yalnızca üç şeyi yaz: kaçan bulgu, neden yanlış şık, bir sonraki soruda bakılacak ipucu.',
      },
      nextAction: weakBranch
        ? `${weakBranch} için kısa bir öğrenme bloğu aç; yanlış çıkanları aynı gün yeniden çöz.`
        : 'Kısa bir öğrenme bloğu çöz; aynı hata tipi tekrarlarsa AI ile tek hedefli pekiştirme sorusu üret.',
    };
  }

  if (accuracy < 75) {
    return {
      title: `${primaryDomain.key.charAt(0).toLocaleUpperCase('tr') + primaryDomain.key.slice(1)} daha netleşmeli`,
      description: hasWrongData
        ? `Doğru sayısı fena değil; kayıp daha çok sorunun son ayrımında geliyor. Yakın seçeneklerde cevabı değiştiren küçük bulguyu görünür hale getir.`
        : 'Performans orta bantta. Her olguda ana ipucunu, dışlatıcı bulguyu ve ilk yaklaşımı ayrı ayrı işaretlemek doğruluğu artırır.',
      scoreTone: 'warning',
      focus: {
        icon: primaryDomain.icon,
        tone: primaryDomain.tone,
        label: 'Çalışma odağı',
        title: primaryDomain.key === 'tetkik seçimi' ? 'Hedefli seçim' : primaryDomain.key === 'yönetim sırası' ? 'Öncelik sırası' : 'Ayırıcı ayrım',
        text: primaryDomain.key === 'tetkik seçimi'
          ? 'Önce hangi testin kararı değiştireceğini belirle; sadece merak edilen değil, sonucu yönetimi etkileyen tetkiki seç.'
          : primaryDomain.key === 'yönetim sırası'
            ? 'Acil stabilizasyon, tanı doğrulama ve ilk tedaviyi aynı sıraya koyma; olgunun aciliyetine göre ayır.'
            : 'Yakın tanılar arasında pozitif bulgu kadar beklenen ama olmayan bulguyu da kullan.',
      },
      strategy: {
        icon: mode === 'exam' ? 'Timer' : 'Brain',
        tone: mode === 'exam' ? 'warning' : 'teal',
        label: 'Aktif strateji',
        title: mode === 'exam' ? 'Blok sonrası kontrol' : 'Gerekçe odaklı tekrar',
        text: mode === 'exam'
          ? 'Zamanlı bloktan sonra yalnızca yanlışları değil, tereddüt ettiğin doğruları da aç; kararın hangi bulguya dayandığını kontrol et.'
          : 'Feedbackten sonra cevabı ezberleme; olgunun seni doğru seçeneğe götüren iki bulgusunu kendi cümlenle yaz.',
      },
      nextAction: hasWrongData
        ? `Son yanlış yaptığın ${weakBranch || 'branş'} olgularından kısa tekrar turu başlat.`
        : 'Bir mini blok daha çöz; doğruluk %75 üstüne çıkınca zamanlı moda geç.',
    };
  }

  return {
    title: currentStreak >= 3 ? 'Seri iyi, şimdi kaybı daralt' : 'Performans iyi gidiyor',
    description: hasWrongData
      ? `Genel doğruluk iyi. Kalan kayıplar aynı karar adımına yaklaşıyorsa geniş tekrar yerine kısa hedefli blok daha verimli olur.`
      : `Doğruluk iyi seyrediyor${bestStreak ? `; en iyi seri ${bestStreak}` : ''}. Bu noktada amaç yalnızca hızlanmak değil, yakın seçeneklerde gerekçeyi korumak.`,
    scoreTone: 'success',
    focus: {
      icon: currentStreak >= 3 ? 'Trophy' : 'Target',
      tone: 'success',
      label: 'Güçlü alan',
      title: currentStreak >= 3 ? 'Seri performansı' : 'Genel doğruluk',
      text: currentStreak >= 3
        ? `Aktif doğru seri ${currentStreak}. Temel okuma iyi; şimdi yalnızca puan kaybettiren karar adımını daralt.`
        : 'Temel patern okuma iyi. Küçük kayıplar için yakın seçenekleri ve ilk karar basamağını karşılaştır.',
    },
    strategy: {
      icon: primaryDomain.icon,
      tone: primaryDomain.tone,
      label: 'Aktif strateji',
      title: `${primaryDomain.key} kontrolü`,
      text: hasWrongData
        ? `${primaryDomain.key} tarafında küçük açık kalmış. Bu başlıkta 5–8 soruluk kısa blok, geniş tekrar yapmaktan daha isabetli olur.`
        : 'Zamanlı blokla hızını test et; sonra sadece tereddüt ettiğin soruların gerekçesine geri dön.',
    },
    nextAction: examCount > 0
      ? 'Bir sonraki blokta yalnızca tereddüt ettiğin soruları işaretleyip feedback üzerinden tekrar et.'
      : 'Zamanlı mini blok çöz; ardından yanlış çıkan başlıkta AI ile pekiştirme sorusu aç.',
  };
}

function InsightCard({ insight }) {
  return (
    <article className="performance-insight-card">
      <IconBadge icon={insight.icon} tone={insight.tone} size="sm" className="performance-insight-icon" />
      <div>
        <span>{insight.label}</span>
        <strong>{insight.title}</strong>
        <p>{insight.text}</p>
      </div>
    </article>
  );
}

function SessionSummaryCard({ stats, mode, examCount, wrongAnswers }) {
  const accuracy = Math.round(stats.accuracy || 0);
  const insight = buildPerformanceInsight(stats, wrongAnswers, mode, examCount);

  return (
    <aside className="session-summary-v8 performance-insight-panel card-surface" aria-label="Oturum performansı ve kişisel çalışma önerileri">
      <header className="summary-v8-header performance-insight-header">
        <div>
          <h2>{insight.title}</h2>
          <p>{insight.description}</p>
        </div>
        <div className={`summary-v8-score summary-v8-score-${insight.scoreTone}`}>
          <strong>%{accuracy}</strong>
          <small>doğruluk</small>
        </div>
      </header>

      <div className="performance-insight-list">
        <InsightCard insight={insight.focus} />
        <InsightCard insight={insight.strategy} />
      </div>

      <article className="performance-next-action-card">
        <IconBadge icon="ArrowRight" tone="accent" size="sm" className="performance-insight-icon" />
        <div>
          <span>Sonraki adım</span>
          <p>{insight.nextAction}</p>
        </div>
      </article>
    </aside>
  );
}

function HomeCommandCenter({
  mode,
  onChangeMode,
  stats,
  leaderboardEntries,
  wrongAnswers = [],
  onStartExam,
  onStartAIQuestion,
  examCount,
}) {
  return (
    <section className="home-dashboard-v8" id="dashboard">
      <section className="home-hero-v8 home-hero-premium-v10 card-surface">
        <div className="home-hero-v8-bg home-hero-premium-bg-v10" aria-hidden="true" />

        <div className="home-hero-v10-main">
          <div className="home-hero-copy-v8 home-hero-copy-v10">
            <h1 className="home-brand-title-v10">KlinikIQ</h1>
            <p>Olgu üzerinden düşün, gerekli tetkiki seç, cevabının klinik gerekçesini net gör.</p>
            <div className="home-hero-proof-row-v10" aria-label="Klinik öğrenme özellikleri">
              <span><Icon name="Brain" /> Klinik karar</span>
              <span><Icon name="ClipboardCheck" /> Tetkik seçimi</span>
              <span><Icon name="Sparkles" /> AI destekli pratik</span>
            </div>
          </div>

          <aside className="home-action-panel-v10" aria-label="Ana çalışma aksiyonları">
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

      <SessionSummaryCard entries={leaderboardEntries} stats={stats} mode={mode} examCount={examCount} wrongAnswers={wrongAnswers} />
    </section>
  );
}

export default HomeCommandCenter;
