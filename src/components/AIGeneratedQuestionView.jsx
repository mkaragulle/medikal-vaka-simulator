import { useEffect, useState } from 'react';
import AISpotQuestionScreen from './AISpotQuestionScreen.jsx';
import { Icon, IconBadge } from './ui.jsx';


function AIStat({ label, value, icon, tone = 'teal' }) {
  return (
    <article className="ai-practice-stat-card">
      <IconBadge icon={icon} tone={tone} size="sm" />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function AISourceBadge({ usedRemoteAI, fallback, generationSource }) {
  const label = usedRemoteAI
    ? 'Gerçek AI aktif'
    : fallback
      ? 'Güvenli yerel üretim'
      : 'Yerel akıllı üretim';
  const icon = usedRemoteAI ? 'Sparkles' : fallback ? 'ShieldCheck' : 'LayeredCards';

  return (
    <span className={`ai-source-badge ${usedRemoteAI ? 'remote' : fallback ? 'fallback' : 'local'}`.trim()} title={generationSource || label}>
      <Icon name={icon} />
      {label}
    </span>
  );
}

function AIBranchFilter({ branchFilter, branchOptions = [], onChangeBranchFilter, disabled = false }) {
  const normalizedValue = branchFilter || 'random';
  return (
    <label className="ai-branch-filter-control">
      <span>KONU / BRANŞ</span>
      <select
        value={normalizedValue}
        onChange={(event) => onChangeBranchFilter?.(event.target.value)}
        disabled={disabled}
        aria-label="TUS soru branş filtresi"
      >
        {branchOptions.map((branch) => {
          const value = branch === 'Rastgele' ? 'random' : branch;
          return <option key={branch} value={value}>{branch}</option>;
        })}
      </select>
    </label>
  );
}


function AIDifficultyFilter({ difficulty = 'Orta', onChangeDifficulty, disabled = false }) {
  const normalizedValue = ['Kolay', 'Orta', 'Zor'].includes(difficulty) ? difficulty : 'Orta';
  return (
    <label className="ai-branch-filter-control ai-difficulty-filter-control">
      <span>ZORLUK</span>
      <select
        value={normalizedValue}
        onChange={(event) => onChangeDifficulty?.(event.target.value)}
        disabled={disabled}
        aria-label="AI TUS soru zorluğu"
      >
        <option value="Kolay">Kolay</option>
        <option value="Orta">Orta</option>
        <option value="Zor">Zor</option>
      </select>
    </label>
  );
}

function AILoadingState({ countdown = 9 }) {
  const normalizedCountdown = Math.max(0, Number(countdown) || 0);
  const countdownLabel = normalizedCountdown > 0 ? `${normalizedCountdown} sn` : 'son kontroller';

  return (
    <section className="ai-generation-state ai-generation-state-countdown card-surface" aria-live="polite">
      <span className="ai-generation-orb" aria-hidden="true"><Icon name="Sparkles" /></span>
      <div>
        <h2>Yeni TUS spot sorusu hazırlanıyor...</h2>
        <p>Branş, zorluk, klinik tutarlılık ve şık kalitesi kontrol ediliyor.</p>
      </div>
      <div className="ai-generation-countdown" aria-label={`Tahmini sonuç ${countdownLabel}`}>
        <span>Tahmini sonuç</span>
        <strong>{countdownLabel}</strong>
      </div>
    </section>
  );
}

function AIReadyState({ branchFilter, difficulty, onGenerateQuestion }) {
  const branchLabel = !branchFilter || branchFilter === 'random' ? 'Rastgele branş' : branchFilter;
  return (
    <section className="ai-generation-state ai-generation-ready card-surface" aria-live="polite">
      <span className="ai-generation-orb" aria-hidden="true"><Icon name="Sparkles" /></span>
      <div>
        <h2>Branş ve zorluğu seç, sonra soru üret.</h2>
        <p>Seçili ayar: <strong>{branchLabel}</strong> · <strong>{difficulty}</strong>. Soru üretimi yalnızca butona bastığında başlar.</p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onGenerateQuestion}>
        <Icon name="Sparkles" /> Soru üretimini başlat
      </button>
    </section>
  );
}

function AIErrorState({ onGenerateQuestion }) {
  return (
    <section className="ai-generation-state card-surface error" aria-live="polite">
      <span className="ai-generation-orb" aria-hidden="true"><Icon name="AlertTriangle" /></span>
      <div>
        <h2>Uygun soru üretilemedi.</h2>
        <p>Bu denemede TUS dili, bilimsel doğruluk ve tekrar kontrolünden geçen yeni bir soru oluşturulamadı. Farklı bir branş seçerek yeniden deneyebilirsin.</p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onGenerateQuestion}>
        <Icon name="RotateCcw" /> Tekrar dene
      </button>
    </section>
  );
}

function AIGeneratedQuestionView({
  question,
  loading = false,
  error = null,
  aiStats,
  generationSource = null,
  usedRemoteAI = false,
  fallback = false,
  branchFilter = 'random',
  branchOptions = [],
  difficulty = 'Orta',
  onChangeDifficulty,
  onChangeBranchFilter,
  onGenerateQuestion,
  onSubmitAnswer,
  onBackHome,
  tutorMode,
  onToggleTutorMode,
  hardMode = false,
}) {
  const accuracy = aiStats?.attempts ? Math.round((aiStats.correct / aiStats.attempts) * 100) : 0;
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCountdown(0);
      return undefined;
    }

    setCountdown(9);
    const timer = window.setInterval(() => {
      setCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [loading]);


  return (
    <section className="page-shell ai-practice-page-shell">
      <section className="ai-practice-hero card-surface">
        <div className="ai-practice-title-block">
          <span className="ai-practice-kicker"><Icon name="Sparkles" /> TUS pratik modu</span>
          <h1>AI Destekli TUS Spot Sorusu</h1>
          <p>Spot bilgileri pekiştirmek için branş uyumu ve klinik tutarlılık kontrolünden geçirilen kısa klinik soru.</p>
          <div className="ai-practice-meta-row">
            <AISourceBadge usedRemoteAI={usedRemoteAI} fallback={fallback} generationSource={generationSource} />
            <span className="ai-demo-notice-badge" title="AI soru üretimi demo sürecindedir; içerikler yayın öncesi gözden geçirilmelidir.">
              <Icon name="AlertTriangle" /> Demo sürecinde
            </span>
          </div>
        </div>

        <div className="ai-practice-actions ai-practice-actions-pro">
          <div className="ai-practice-filter-grid">
            <AIBranchFilter
              branchFilter={branchFilter}
              branchOptions={branchOptions}
              onChangeBranchFilter={onChangeBranchFilter}
              disabled={loading}
            />
            <AIDifficultyFilter
              difficulty={difficulty}
              onChangeDifficulty={onChangeDifficulty}
              disabled={loading}
            />
          </div>
          <div className="ai-practice-button-row">
            <button type="button" className="btn btn-secondary ai-spot-dashboard-btn" onClick={onBackHome}>
              <span aria-hidden="true">←</span> Dashboard’a dön
            </button>
            <button type="button" className="btn btn-primary ai-generate-cta ai-spot-generate-btn" onClick={onGenerateQuestion} disabled={loading}>
              <Icon name="Sparkles" /> Yeni TUS sorusu üret
            </button>
          </div>
        </div>
      </section>

      <section className="ai-practice-stats-grid" aria-label="AI pratik istatistikleri">
        <AIStat icon="ClipboardList" tone="blue" label="TUS soru" value={aiStats?.attempts || 0} />
        <AIStat icon="Target" tone="teal" label="Doğruluk" value={`%${accuracy}`} />
        <AIStat icon="Trophy" tone="warning" label="Pratik puanı" value={aiStats?.score || 0} />
      </section>

      {fallback && !loading && !error ? (
        <section className="ai-fallback-notice card-surface" aria-live="polite">
          <Icon name="ShieldCheck" />
          <span>Gerçek AI yanıtı alınamadığında uygulama kırılmasın diye yerel soru üretim sistemi devreye girdi.</span>
        </section>
      ) : null}

      {loading ? <AILoadingState countdown={countdown} /> : null}
      {!loading && error ? <AIErrorState onGenerateQuestion={onGenerateQuestion} /> : null}
      {!loading && !error && !question ? (
        <AIReadyState branchFilter={branchFilter} difficulty={difficulty} onGenerateQuestion={onGenerateQuestion} />
      ) : null}
      {!loading && !error && question ? (
        <div key={question.id} className="ai-case-shell case-route-transition" data-case-id={question.id}>
          <AISpotQuestionScreen
            question={question}
            onGenerateQuestion={onGenerateQuestion}
            onSubmitAnswer={onSubmitAnswer}
            tutorMode={tutorMode}
            onToggleTutorMode={onToggleTutorMode}
            hardMode={hardMode}
            randomActionLabel="Yeni TUS sorusu üret"
          />
        </div>
      ) : null}
    </section>
  );
}

export default AIGeneratedQuestionView;
