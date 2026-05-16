import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import AISpotQuestionScreen from './AISpotQuestionScreen.jsx';
import { Icon, IconBadge } from './ui.jsx';


const AI_DURATION_STORAGE_GLOBAL_KEY = 'klinikiq.aiQuestion.duration.global.v1';
const AI_DURATION_STORAGE_PREFIX = 'klinikiq.aiQuestion.duration.v1';
const AI_DEFAULT_ESTIMATE_BY_DIFFICULTY = {
  Kolay: 9,
  Orta: 12,
  Zor: 15,
};

const AI_LOADING_STAGES = [
  {
    min: 0,
    title: 'Sunucuya istek gönderiliyor...',
    detail: 'Seçtiğin branş ve zorluk ayarları üretim isteğine ekleniyor.',
  },
  {
    min: 2,
    title: 'Klinik senaryo kuruluyor...',
    detail: 'Olgunun tek köklü ve TUS mantığına uygun olması sağlanıyor.',
  },
  {
    min: 5,
    title: 'TUS dili ve klinik tutarlılık kontrol ediliyor...',
    detail: 'Kök, ipuçları ve öğrenme hedefi aynı eksende tutuluyor.',
  },
  {
    min: 8,
    title: 'Son kontroller yapılıyor...',
    detail: 'Cevap sızıntısı, gereksiz veri ve belirsizlikler eleniyor.',
  },
  {
    min: 10,
    title: 'Soru kalitesi denetleniyor...',
    detail: 'Bilimsel doğruluk ve tek doğru cevap ilkesi yeniden kontrol ediliyor.',
  },
  {
    min: 12,
    title: 'Seçenekler düzenleniyor...',
    detail: 'Şıkların aynı kategoride, ayırt ettirici ve dengeli olması sağlanıyor.',
  },
  {
    min: 14,
    title: 'Açıklama ve yanıt uyumu son kez kontrol ediliyor...',
    detail: 'Gerekçe, doğru seçenek ve klinik ipuçları birbiriyle eşleştiriliyor.',
  },
];

function clampNumber(value, min, max) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return min;
  return Math.max(min, Math.min(max, numeric));
}

function makeDurationStorageKey(branchFilter = 'random', difficulty = 'Orta') {
  const branch = String(branchFilter || 'random').trim().toLocaleLowerCase('tr').replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ]+/gi, '-').replace(/^-|-$/g, '') || 'random';
  const level = ['Kolay', 'Orta', 'Zor'].includes(difficulty) ? difficulty : 'Orta';
  return `${AI_DURATION_STORAGE_PREFIX}.${branch}.${level}`;
}

function readStoredDuration(key) {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const seconds = Number(parsed?.seconds);
    return Number.isFinite(seconds) ? seconds : null;
  } catch {
    return null;
  }
}

function writeStoredDuration(key, seconds) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const normalized = clampNumber(seconds, 3, 45);
  const previous = readStoredDuration(key);
  const blended = previous ? (previous * 0.62) + (normalized * 0.38) : normalized;
  try {
    window.localStorage.setItem(key, JSON.stringify({ seconds: Math.round(blended * 10) / 10, updatedAt: Date.now() }));
  } catch {
    // Storage may be unavailable in private browsing; the UI still works with defaults.
  }
}

function readEstimatedGenerationSeconds(branchFilter = 'random', difficulty = 'Orta') {
  const exact = readStoredDuration(makeDurationStorageKey(branchFilter, difficulty));
  if (exact) return clampNumber(Math.ceil(exact), 6, 45);
  const global = readStoredDuration(AI_DURATION_STORAGE_GLOBAL_KEY);
  if (global) return clampNumber(Math.ceil(global), 6, 45);
  return AI_DEFAULT_ESTIMATE_BY_DIFFICULTY[difficulty] || AI_DEFAULT_ESTIMATE_BY_DIFFICULTY.Orta;
}

function rememberGenerationDuration(branchFilter = 'random', difficulty = 'Orta', seconds = 0) {
  const normalized = clampNumber(seconds, 3, 45);
  writeStoredDuration(makeDurationStorageKey(branchFilter, difficulty), normalized);
  writeStoredDuration(AI_DURATION_STORAGE_GLOBAL_KEY, normalized);
}

function getGenerationStage(elapsedSeconds = 0) {
  return AI_LOADING_STAGES.reduce((active, stage) => (elapsedSeconds >= stage.min ? stage : active), AI_LOADING_STAGES[0]);
}

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
  const [menuStyle, setMenuStyle] = useState(null);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? options[0] ?? null,
    [options, value],
  );

  const updateMenuPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const horizontalMargin = 14;
    const verticalGap = 8;
    const minMenuHeight = 164;
    const maxMenuHeight = 318;
    const width = Math.min(rect.width, viewportWidth - horizontalMargin * 2);
    const left = Math.max(horizontalMargin, Math.min(rect.left, viewportWidth - width - horizontalMargin));
    const spaceBelow = viewportHeight - rect.bottom - horizontalMargin;
    const spaceAbove = rect.top - horizontalMargin;
    const shouldOpenUp = spaceBelow < 220 && spaceAbove > spaceBelow;
    const availableHeight = shouldOpenUp ? spaceAbove - verticalGap : spaceBelow - verticalGap;
    const maxHeight = Math.max(minMenuHeight, Math.min(maxMenuHeight, availableHeight));

    setMenuStyle({
      left: `${left}px`,
      width: `${width}px`,
      maxHeight: `${maxHeight}px`,
      ...(shouldOpenUp
        ? { top: 'auto', bottom: `${Math.max(horizontalMargin, viewportHeight - rect.top + verticalGap)}px` }
        : { top: `${rect.bottom + verticalGap}px`, bottom: 'auto' }),
    });
  }, []);

  useEffect(() => {
    if (!open) {
      setMenuStyle(null);
      return undefined;
    }

    updateMenuPosition();

    const handlePointerDown = (event) => {
      const target = event.target;
      if (!rootRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleViewportChange = () => {
      updateMenuPosition();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
    };
  }, [open, updateMenuPosition]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  const menu = open && menuStyle ? createPortal(
    <div
      className="ai-compact-dropdown-menu ai-compact-dropdown-menu-floating"
      role="listbox"
      aria-label={ariaLabel || label}
      ref={menuRef}
      style={menuStyle}
    >
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
    </div>,
    document.body,
  ) : null;

  return (
    <div className="ai-branch-filter-control ai-compact-dropdown" ref={rootRef}>
      <span className="ai-compact-dropdown-label">{label}</span>
      <div className={`ai-compact-dropdown-shell ${open ? 'open' : ''} ${disabled ? 'disabled' : ''}`.trim()}>
        <button
          type="button"
          className="ai-compact-dropdown-trigger"
          onClick={() => !disabled && setOpen((current) => !current)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel || label}
          disabled={disabled}
          ref={triggerRef}
        >
          <div className="ai-compact-dropdown-trigger-copy">
            <strong>{selectedOption?.label || 'Seçiniz'}</strong>
          </div>
          <span className="ai-compact-dropdown-trigger-icon" aria-hidden="true">
            <Icon name={icon} size={16} />
          </span>
        </button>
        {menu}
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

function AILoadingState({ progress }) {
  const elapsedSeconds = Math.max(0, Number(progress?.elapsedSeconds) || 0);
  const estimatedTotalSeconds = clampNumber(progress?.estimatedTotalSeconds || 12, 6, 45);
  const remainingSeconds = Math.max(0, Number(progress?.remainingSeconds) || 0);
  const progressPercent = Math.min(96, Math.max(8, (elapsedSeconds / estimatedTotalSeconds) * 100));
  const stage = getGenerationStage(elapsedSeconds);
  const etaLabel = remainingSeconds > 0 ? `${remainingSeconds} sn` : 'Son kontroller';

  return (
    <section className="ai-generation-state ai-generation-state-countdown ai-generation-state-live card-surface" aria-live="polite">
      <div className="ai-generation-live-main">
        <span className="ai-generation-orb" aria-hidden="true"><Icon name="Sparkles" /></span>
        <div className="ai-generation-live-copy">
          <span className="ai-generation-live-kicker">AI üretim süreci</span>
          <h2>Yeni TUS spot sorusu hazırlanıyor...</h2>
          <p>{stage.title}</p>
          <small>{stage.detail}</small>
          <div className="ai-generation-progress-track" aria-hidden="true">
            <span style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="ai-generation-live-side">
        <div className="ai-generation-countdown ai-generation-countdown-live" aria-label={`Tahmini kalan süre ${etaLabel}`}>
          <span>Tahmini kalan</span>
          <strong>{etaLabel}</strong>
          <small>Önceki üretim sürelerine göre</small>
        </div>
        <div className="ai-generation-stage-list" aria-label="Üretim adımları">
          {AI_LOADING_STAGES.slice(3).map((item) => (
            <span key={item.min} className={elapsedSeconds >= item.min ? 'active' : ''}>{item.title.replace(/\.\.\.$/u, '')}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIReadyState({ branchFilter, difficulty, onGenerateQuestion }) {
  const branchLabel = !branchFilter || branchFilter === 'random' ? 'Rastgele branş' : branchFilter;
  return (
    <section className="ai-generation-state ai-generation-ready card-surface" aria-live="polite">
      <span className="ai-generation-orb" aria-hidden="true"><Icon name="Sparkles" /></span>
      <div className="ai-ready-copy">
        <h2>Branş ve zorluğu seç, AI senin için soru üretsin.</h2>
        <p className="ai-ready-selection"><strong>{branchLabel}</strong><span aria-hidden="true">·</span><strong>{difficulty}</strong></p>
      </div>
      <button type="button" className="btn btn-primary ai-ready-cta" onClick={onGenerateQuestion}>
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
  const loadingStartedAtRef = useRef(null);
  const [generationProgress, setGenerationProgress] = useState(() => ({
    elapsedSeconds: 0,
    estimatedTotalSeconds: readEstimatedGenerationSeconds(branchFilter, difficulty),
    remainingSeconds: readEstimatedGenerationSeconds(branchFilter, difficulty),
  }));

  useEffect(() => {
    if (!loading) {
      if (loadingStartedAtRef.current) {
        const elapsed = (performance.now() - loadingStartedAtRef.current) / 1000;
        rememberGenerationDuration(branchFilter, difficulty, elapsed);
        loadingStartedAtRef.current = null;
      }
      setGenerationProgress((current) => ({ ...current, elapsedSeconds: 0, remainingSeconds: 0 }));
      return undefined;
    }

    const startedAt = performance.now();
    const estimatedTotalSeconds = readEstimatedGenerationSeconds(branchFilter, difficulty);
    loadingStartedAtRef.current = startedAt;
    setGenerationProgress({
      elapsedSeconds: 0,
      estimatedTotalSeconds,
      remainingSeconds: estimatedTotalSeconds,
    });

    const timer = window.setInterval(() => {
      const elapsedSeconds = Math.max(0, (performance.now() - startedAt) / 1000);
      const remainingSeconds = Math.max(0, Math.ceil(estimatedTotalSeconds - elapsedSeconds));
      setGenerationProgress({
        elapsedSeconds,
        estimatedTotalSeconds,
        remainingSeconds,
      });
    }, 350);

    return () => window.clearInterval(timer);
  }, [loading, branchFilter, difficulty]);

  return (
    <section className="page-shell ai-practice-page-shell">
      <section className="ai-practice-hero card-surface">
        <div className="ai-practice-title-block">
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

      {loading ? <AILoadingState progress={generationProgress} /> : null}
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
