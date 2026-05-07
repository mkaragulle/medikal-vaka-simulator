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
      title: 'İlk performans verisi bekleniyor',
      description: 'Birkaç olgu çözüldüğünde bu panel zayıf branşları, hata tiplerini ve sonraki çalışma adımını otomatik olarak kişiselleştirir.',
      scoreTone: 'teal',
      focus: {
        icon: 'ClipboardList',
        tone: 'blue',
        label: 'Çalışma odağı',
        title: 'Başlangıç kalibrasyonu',
        text: 'İlk blokta farklı branşlardan kısa olgular çözerek sistemin tanısal ayrım, tetkik seçimi ve yönetim örüntüylerini ölçmesini sağla.',
      },
      strategy: {
        icon: 'Brain',
        tone: 'teal',
        label: 'Aktif strateji',
        title: 'Öğrenme modu daha uygun',
        text: 'Feedback kartlarını okuyarak kanıt zinciri ve seçenek eleme mantığını yakalamaya odaklan; erken aşamada hızdan çok gerekçe kalitesi önemlidir.',
      },
      nextAction: 'İlk adım olarak 5–10 olguluk kısa bir öğrenme bloğu çöz.',
    };
  }

  if (accuracy < 50) {
    return {
      title: primaryDomain.key === 'yönetim sırası' ? 'Yönetim basamaklarında dikkat artmalı' : primaryDomain.key === 'tetkik seçimi' ? 'Tetkik seçimi mantığını güçlendirme zamanı' : 'Hedefli tekrar zamanı',
      description: hasWrongData
        ? `Son yanlışlarda ${weakBranch ? `${weakBranch} ağırlığı` : `${primaryDomain.key} hataları`} öne çıkıyor. Kısa öğrenme bloklarıyla karar verdirici ipuçlarını yeniden kurmak daha verimli olur.`
        : 'Doğruluk düşük seyrediyor; hızlanmadan önce temel klinik örüntüleri ve seçenek eleme mantığını kısa bloklarla pekiştir.',
      scoreTone: 'danger',
      focus: {
        icon: primaryDomain.icon,
        tone: primaryDomain.tone,
        label: 'Çalışma odağı',
        title: weakBranch ? `${weakBranch} odağı` : `${primaryDomain.key} odağı`,
        text: weakBranch
          ? `Yanlış kayıtlarında ${weakBranchCount} kez ${weakBranch} öne çıkıyor. Bu branşta önce olgu ipuçlarını ve seçenek ayrımını tekrar et.`
          : `${primaryDomain.key} alanında karar verdirici bulgu ile doğru yaklaşımı eşleştirme pratiği gerekli görünüyor.`,
      },
      strategy: {
        icon: 'BookOpen',
        tone: 'blue',
        label: 'Aktif strateji',
        title: 'Kısa öğrenme bloğu',
        text: 'Zaman baskısını azalt; her sorudan sonra Klinik Gerekçe, Kanıt Zinciri ve Şık Karşılaştırması kartlarını okuyarak aynı hatayı tekrar etmeyecek notu çıkar.',
      },
      nextAction: weakBranch
        ? `${weakBranch} içinde 10 olguluk öğrenme bloğu çöz; yanlış çıkanları aynı gün tekrar et.`
        : 'Önce 10 olguluk öğrenme bloğu çöz; ardından aynı hata tipinden AI pekiştirme sorusu üret.',
    };
  }

  if (accuracy < 75) {
    return {
      title: primaryDomain.key === 'tanısal ayrım' ? 'Tanısal örüntü tekrarına ihtiyaç var' : `${primaryDomain.key.charAt(0).toLocaleUpperCase('tr') + primaryDomain.key.slice(1)} rafine edilmeli`,
      description: hasWrongData
        ? `Genel performans dengeli; ancak son yanlışlarda ${primaryDomain.key} örüntüsü belirgin. Bu aşamada doğru-yanlış farkını belirleyen küçük ipuçlarına odaklan.`
        : 'Performans orta bantta; doğru sayısını artırmak için her olguda ana ipucu, dışlatıcı bulgu ve ilk yaklaşımı ayrı ayrı işaretle.',
      scoreTone: 'warning',
      focus: {
        icon: primaryDomain.icon,
        tone: primaryDomain.tone,
        label: 'Çalışma odağı',
        title: primaryDomain.key === 'tetkik seçimi' ? 'Hedefli tetkik mantığı' : primaryDomain.key === 'yönetim sırası' ? 'Öncelik sırası' : 'Ayırıcı tanı ayrımı',
        text: primaryDomain.key === 'tetkik seçimi'
          ? 'Gereksiz geniş tetkik yerine, olgudaki karar verdirici bulguyu doğrulayan en hedefli testi seçmeye çalış.'
          : primaryDomain.key === 'yönetim sırası'
            ? 'Stabilizasyon, tanı doğrulama ve ilk tedavi sırasını olgunun aciliyetine göre ayırarak ilerle.'
            : 'Benzer klinik tablolar arasında kırmızı bayrak, negatif bulgu ve risk bağlamını birlikte kullan.',
      },
      strategy: {
        icon: mode === 'exam' ? 'Timer' : 'Brain',
        tone: mode === 'exam' ? 'warning' : 'teal',
        label: 'Aktif strateji',
        title: mode === 'exam' ? 'Sınav sonrası geri bildirim turu' : 'Öğrenme modu devam',
        text: mode === 'exam'
          ? 'Zamanlı blok sonrası yanlışları hemen aç; seçtiğin şıkkın hangi bulguyu kaçırdığını seçenek karşılaştırmasında kontrol et.'
          : 'Öğrenme modu şu aşamada verimli; her feedbackte kanıt zincirini kendi cümlelerinle özetleyerek ilerle.',
      },
      nextAction: hasWrongData
        ? `Son yanlış yaptığın ${weakBranch || 'branş'} olgularından kısa tekrar turu başlat.`
        : 'Bir mini blok daha çöz; doğruluk %75 üstüne çıkınca zamanlı moda geç.',
    };
  }

  return {
    title: currentStreak >= 3 ? 'Güçlü seri korunuyor, odak daraltılmalı' : 'Güçlü klinik performans',
    description: hasWrongData
      ? `Genel doğruluk güçlü. Kalan kayıplar daha çok ${primaryDomain.key} alanında yoğunlaşıyor; artık geniş tekrar yerine dar hedefli pekiştirme daha uygun.`
      : `Doğruluk güçlü seyrediyor${bestStreak ? ` ve en iyi seri ${bestStreak}` : ''}. Bu seviyede hız, seçici tetkik ve seçenek eleme kalitesini birlikte koru.`,
    scoreTone: 'success',
    focus: {
      icon: currentStreak >= 3 ? 'Trophy' : 'Target',
      tone: 'success',
      label: 'Güçlü alan',
      title: currentStreak >= 3 ? 'Seri performansı' : 'Genel doğruluk',
      text: currentStreak >= 3
        ? `Aktif doğru seri ${currentStreak}; belirleyici bulgu okuma iyi gidiyor. Şimdi kalan zayıf alanı daraltarak çalış.`
        : 'Tanısal örüntü okuma güçlü; küçük puan kayıpları için yakın seçenekleri ve ilk yönetim basamaklarını karşılaştır.',
    },
    strategy: {
      icon: primaryDomain.icon,
      tone: primaryDomain.tone,
      label: 'Aktif strateji',
      title: `${primaryDomain.key} rafinasyonu`,
      text: hasWrongData
        ? `Yanlış geçmişinde ${primaryDomain.key} izleniyor. Bu alanda 5–8 soruluk hedefli mini bloklar geniş tekrar yerine daha verimli olur.`
        : 'Zamanlı blok çözerek hızını test et; sonrasında yalnızca tereddüt ettiğin soruların feedback kartlarını tekrar oku.',
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
          <span>Oturum performansı</span>
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
            <div className="home-hero-proof-row-v10" aria-label="Klinik öğrenme özellikleri">
              <span><Icon name="Brain" /> Klinik muhakeme</span>
              <span><Icon name="ClipboardCheck" /> Tetkik seçimi</span>
              <span><Icon name="Sparkles" /> AI destekli pratik</span>
            </div>
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

      <SessionSummaryCard entries={leaderboardEntries} stats={stats} mode={mode} examCount={examCount} wrongAnswers={wrongAnswers} />
    </section>
  );
}

export default HomeCommandCenter;
