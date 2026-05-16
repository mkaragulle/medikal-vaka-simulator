import { useEffect, useMemo, useRef, useState } from 'react';
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

function CompactDropdown({
  label,
  value,
  options = [],
  onChange,
  disabled = false,
  icon = 'ChevronDown',
  ariaLabel,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? options[0] ?? null,
    [options, value],
  );

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <div className="ai-branch-filter-control ai-compact-dropdown" ref={rootRef}>
      <span>{label}</span>
      <div className={`ai-compact-dropdown-shell ${open ? 'open' : ''} ${disabled ? 'disabled' : ''}`.trim()}>
        <button
          type="button"
          className="ai-compact-dropdown-trigger"
          onClick={() => !disabled && setOpen((current) => !current)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel || label}
          disabled={disabled}
        >
          <div className="ai-compact-dropdown-trigger-copy">
            <strong>{selectedOption?.label || 'Seçiniz'}</strong>
          </div>
          <span className="ai-compact-dropdown-trigger-icon" aria-hidden="true">
            <Icon name={icon} size={16} />
          </span>
        </button>

        {open ? (
          <div className="ai-compact-dropdown-menu" role="listbox" aria-label={ariaLabel || label}>
            {options.map((option) => {
              const isActive = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`ai-compact-dropdown-option ${isActive ? 'active' : ''}`.trim()}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onChange?.(option.value);
                    setOpen(false);
                  }}
                >
                  <span className="ai-compact-dropdown-option-copy">{option.label}</span>
                  {isActive ? (
                    <span className="ai-compact-dropdown-option-check" aria-hidden="true">
                      <Icon name="CheckCircle" size={16} />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function AIBranchFilter({ branchFilter, branchOptions = [], onChangeBranchFilter, disabled = false }) {
  const normalizedValue = branchFilter || 'random';
  const options = useMemo(
    () => branchOptions.map((branch) => ({
      value: branch === 'Rastgele' ? 'random' : branch,
      label: branch,
    })),
    [branchOptions],
  );

  return (
    <CompactDropdown
      label="KONU / BRANŞ"
      value={normalizedValue}
      options={options}
      onChange={onChangeBranchFilter}
      disabled={disabled}
      icon="ChevronDown"
      ariaLabel="TUS soru branş filtresi"
    />
  );
}

function AIDifficultyFilter({ difficulty = 'Orta', onChangeDifficulty, disabled = false }) {
  const normalizedValue = ['Kolay', 'Orta', 'Zor'].includes(difficulty) ? difficulty : 'Orta';
  const options = useMemo(
    () => [
      { value: 'Kolay', label: 'Kolay' },
      { value: 'Orta', label: 'Orta' },
      { value: 'Zor', label: 'Zor' },
    ],
    [],
  );

  return (
    <CompactDropdown
      label="ZORLUK"
      value={normalizedValue}
      options={options}
      onChange={onChangeDifficulty}
      disabled={disabled}
      icon="ChevronDown"
      ariaLabel="AI TUS soru zorluğu"
    />
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
        <h2>Branş ve zorluğu seç, AI senin için soru üretsin.</h2>
        <p><strong>{branchLabel}</strong> · <strong>{difficulty}</strong></p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onGenerateQuestion}>
        <Icon name="Sparkles" /> Yeni TUS Sorusu Üret
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
          <h1>Yeni TUS Sorusu Üret</h1>
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
              <Icon name="Sparkles" /> Yeni TUS Sorusu Üret
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
            randomActionLabel="Yeni TUS Sorusu Üret"
          />
        </div>
      ) : null}
    </section>
  );
}

export default AIGeneratedQuestionView;
