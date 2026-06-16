import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import TusSpotQuestionScreen from './TusSpotQuestionScreen.jsx';
import { Icon, IconBadge } from './ui.jsx';
import { TUS_PEARL_CARDS } from '../data/tusPearlCards.js';
import { branches } from '../data/branches.js';
import {
  applyPearlLearningDecision,
  dispatchPearlProgressUpdated,
  flushPearlStateSave,
  loadPearlState,
  savePearlState,
} from '../utils/pearlCardStorage.js';


const TUS_QUESTION_DURATION_STORAGE_GLOBAL_KEY = 'klinikiq.tusQuestion.duration.global.v1';
const TUS_QUESTION_DURATION_STORAGE_PREFIX = 'klinikiq.tusQuestion.duration.v1';
const TUS_DEFAULT_ESTIMATE_BY_DIFFICULTY = {
  Kolay: 9,
  Orta: 12,
  Zor: 15,
};

const TUS_MODULE_STAGES = [
  {
    min: 0,
    title: 'Üretim isteği hazırlanıyor...',
    detail: 'Seçtiğin branş ve zorluk güvenli API hattına gönderiliyor.',
  },
  {
    min: 2,
    title: 'TUS soru kökü kuruluyor...',
    detail: 'Branşa uygun, tek doğru cevaplı özgün soru tasarlanıyor.',
  },
  {
    min: 5,
    title: 'Seçenekler dengeleniyor...',
    detail: 'Doğru seçenek ve öğretici çeldiriciler aynı düzlemde tutuluyor.',
  },
  {
    min: 8,
    title: 'Açıklamalar yazılıyor...',
    detail: 'Ana açıklama, seçenek geri bildirimleri ve TUS ipucu hazırlanıyor.',
  },
  {
    min: 10,
    title: 'Bilimsel dayanak toparlanıyor...',
    detail: 'Soru sınav mantığı ve temel tıp bilgisiyle tutarlı hale getiriliyor.',
  },
  {
    min: 12,
    title: 'Yanıt yapısı düzenleniyor...',
    detail: 'Mevcut soru arayüzünün güvenle okuyacağı format hazırlanıyor.',
  },
  {
    min: 14,
    title: 'Son kontrol yapılıyor...',
    detail: 'Eksik seçenek veya geri bildirim olmadan soru gösterime hazırlanıyor.',
  },
];

const TUS_WAITING_FLASHCARD_STATUS_KEY = 'klinikiq.tusQuestion.waitingFlashcards.status.v1';
const TUS_WAITING_FLASHCARD_SHOWN_KEY = 'klinikiq.tusQuestion.waitingFlashcards.shown.v1';
const TUS_WAITING_FLASHCARD_COUNT = 10;
const TUS_TOPIC_KEYWORD_MAX_LENGTH = 140;

function normalizeTopicKeywordInput(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trimStart().slice(0, TUS_TOPIC_KEYWORD_MAX_LENGTH);
}

const BRANCH_NAME_LOOKUP = new Map((branches || []).flatMap((branch) => [
  [branch.id, branch.id],
  [branch.name, branch.id],
  [branch.shortName, branch.id],
].filter(([key]) => key).map(([key, value]) => [normalizeLookupText(key), value])));

function normalizeLookupText(value = '') {
  return String(value || '')
    .toLocaleLowerCase('tr')
    .replace(/[ıİ]/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readLocalJSON(key, fallback) {
  if (typeof window === 'undefined' || !window.localStorage) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocalJSON(key, value) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors; the learning UI can still render statelessly.
  }
}

function resolvePearlBranchId(branchFilter = 'random') {
  const normalized = normalizeLookupText(branchFilter);
  if (!normalized || normalized === 'random' || normalized === 'rastgele') return null;
  return BRANCH_NAME_LOOKUP.get(normalized) || null;
}

function difficultyScore(cardDifficulty = '', selectedDifficulty = 'Orta') {
  const selected = normalizeLookupText(selectedDifficulty);
  const card = normalizeLookupText(cardDifficulty);
  if (!card) return 0;
  if (selected.includes('zor')) return card.includes('zor') ? 12 : card.includes('orta') ? 7 : 3;
  if (selected.includes('kolay')) return card.includes('kolay') ? 12 : card.includes('orta') ? 5 : 1;
  return card.includes('orta') ? 12 : 5;
}

function hashString(value = '') {
  let hash = 2166136261;
  const text = String(value || '');
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function selectWaitingPearlCards(branchFilter = 'random', difficulty = 'Orta', count = TUS_WAITING_FLASHCARD_COUNT) {
  const allCards = Array.isArray(TUS_PEARL_CARDS) ? TUS_PEARL_CARDS : [];
  if (!allCards.length) return [];

  const targetBranchId = resolvePearlBranchId(branchFilter);
  const shownState = readLocalJSON(TUS_WAITING_FLASHCARD_SHOWN_KEY, { ids: [] });
  const recentShown = Array.isArray(shownState?.ids) ? shownState.ids.slice(-90) : [];
  const recentShownSet = new Set(recentShown);
  const statusMap = readLocalJSON(TUS_WAITING_FLASHCARD_STATUS_KEY, {});
  const nowBucket = Math.floor(Date.now() / (1000 * 60 * 7));
  const seed = `${branchFilter}|${difficulty}|${nowBucket}`;

  const scoreCard = (card) => {
    const status = statusMap?.[card.id]?.status || '';
    let score = 0;
    if (targetBranchId && card.branchId === targetBranchId) score += 90;
    if (!targetBranchId) score += 12;
    if (status === 'hard') score += 55;
    if (status === 'review') score += 32;
    if (status === 'known') score -= 8;
    if (!recentShownSet.has(card.id)) score += 28;
    score += difficultyScore(card.difficulty, difficulty);
    score += hashString(`${seed}|${card.id}`) % 23;
    return score;
  };

  const firstPass = allCards
    .filter((card) => card?.id && (!targetBranchId || card.branchId === targetBranchId) && !recentShownSet.has(card.id))
    .sort((a, b) => scoreCard(b) - scoreCard(a));

  const alternatePass = allCards
    .filter((card) => card?.id && !firstPass.some((item) => item.id === card.id))
    .sort((a, b) => scoreCard(b) - scoreCard(a));

  const selected = [...firstPass, ...alternatePass].slice(0, count);
  const nextShownIds = [...recentShown, ...selected.map((card) => card.id)].slice(-160);
  writeLocalJSON(TUS_WAITING_FLASHCARD_SHOWN_KEY, { ids: nextShownIds, updatedAt: Date.now() });
  return selected;
}

function readWaitingFlashcardRatings(cards = []) {
  const statusMap = readLocalJSON(TUS_WAITING_FLASHCARD_STATUS_KEY, {});
  const pearlState = loadPearlState();
  const knownSet = new Set(pearlState.knownPearlCardIds || []);
  const wrongSet = new Set(pearlState.wrongPearlCardIds || []);
  const reviewSet = new Set(pearlState.reviewPearlCardIds || []);
  return cards.reduce((acc, card) => {
    const status = statusMap?.[card.id]?.status;
    if (status) acc[card.id] = status;
    else if (knownSet.has(card.id)) acc[card.id] = 'known';
    else if (wrongSet.has(card.id)) acc[card.id] = 'hard';
    else if (reviewSet.has(card.id)) acc[card.id] = 'review';
    return acc;
  }, {});
}

function writeWaitingFlashcardRating(cardId, status) {
  const statusMap = readLocalJSON(TUS_WAITING_FLASHCARD_STATUS_KEY, {});
  const next = {
    ...statusMap,
    [cardId]: { status, updatedAt: Date.now() },
  };
  writeLocalJSON(TUS_WAITING_FLASHCARD_STATUS_KEY, next);
}

function getPearlCardFront(card = {}) {
  return card.front || card.mainQuestion || card.extraQuestion || card.topic || 'Yüksek verimli TUS bilgisi';
}

function getPearlCardAnswer(card = {}) {
  return card.answer || card.back || card.mainAnswer || card.extraAnswer || card.explanation || '';
}

function getPearlCardExplanation(card = {}) {
  const answer = getPearlCardAnswer(card);
  const candidates = [card.explanation, card.tusTip, card.differentialNote, card.trap].filter(Boolean);
  const unique = candidates.find((item) => normalizeLookupText(item) !== normalizeLookupText(answer));
  return unique || '';
}

function clampNumber(value, min, max) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return min;
  return Math.max(min, Math.min(max, numeric));
}

function makeDurationStorageKey(branchFilter = 'random', difficulty = 'Orta') {
  const branch = String(branchFilter || 'random').trim().toLocaleLowerCase('tr').replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ]+/gi, '-').replace(/^-|-$/g, '') || 'random';
  const level = ['Kolay', 'Orta', 'Zor'].includes(difficulty) ? difficulty : 'Orta';
  return `${TUS_QUESTION_DURATION_STORAGE_PREFIX}.${branch}.${level}`;
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
  const global = readStoredDuration(TUS_QUESTION_DURATION_STORAGE_GLOBAL_KEY);
  if (global) return clampNumber(Math.ceil(global), 6, 45);
  return TUS_DEFAULT_ESTIMATE_BY_DIFFICULTY[difficulty] || TUS_DEFAULT_ESTIMATE_BY_DIFFICULTY.Orta;
}

function rememberGenerationDuration(branchFilter = 'random', difficulty = 'Orta', seconds = 0) {
  const normalized = clampNumber(seconds, 3, 45);
  writeStoredDuration(makeDurationStorageKey(branchFilter, difficulty), normalized);
  writeStoredDuration(TUS_QUESTION_DURATION_STORAGE_GLOBAL_KEY, normalized);
}

function getGenerationStage(elapsedSeconds = 0) {
  return TUS_MODULE_STAGES.reduce((active, stage) => (elapsedSeconds >= stage.min ? stage : active), TUS_MODULE_STAGES[0]);
}

function TusStat({ label, value, icon, tone = 'teal' }) {
  return (
    <article className="tus-practice-stat-card">
      <IconBadge icon={icon} tone={tone} size="sm" />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function ModuleStatusBadge() {
  return (
    <span className="tus-source-badge local" title="AI üretimi Vercel API route üzerinden çalışır">
      <Icon name="Info" />
      KlinikIQ AI
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
      className="tus-compact-dropdown-menu tus-compact-dropdown-menu-floating"
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
            className={`tus-compact-dropdown-option ${isActive ? 'active' : ''}`.trim()}
            role="option"
            aria-selected={isActive}
            onClick={() => {
              onChange?.(option.value);
              setOpen(false);
            }}
          >
            <span className="tus-compact-dropdown-option-copy">{option.label}</span>
            {isActive ? (
              <span className="tus-compact-dropdown-option-check" aria-hidden="true">
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
    <div className="tus-branch-filter-control tus-compact-dropdown" ref={rootRef}>
      <span className="tus-compact-dropdown-label">{label}</span>
      <div className={`tus-compact-dropdown-shell ${open ? 'open' : ''} ${disabled ? 'disabled' : ''}`.trim()}>
        <button
          type="button"
          className="tus-compact-dropdown-trigger"
          onClick={() => !disabled && setOpen((current) => !current)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel || label}
          disabled={disabled}
          ref={triggerRef}
        >
          <div className="tus-compact-dropdown-trigger-copy">
            <strong>{selectedOption?.label || 'Seçiniz'}</strong>
          </div>
          <span className="tus-compact-dropdown-trigger-icon" aria-hidden="true">
            <Icon name={icon} size={16} />
          </span>
        </button>
        {menu}
      </div>
    </div>
  );
}

function TusBranchFilter({ branchFilter, branchOptions = [], onChangeBranchFilter, disabled = false }) {
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

function TusDifficultyFilter({ difficulty = 'Orta', onChangeDifficulty, disabled = false }) {
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
      ariaLabel="TUS soru zorluğu"
    />
  );
}

function TusTopicKeywordInput({ value = '', onChange, disabled = false }) {
  const handleChange = useCallback((event) => {
    onChange?.(normalizeTopicKeywordInput(event.target.value));
  }, [onChange]);

  return (
    <label className="tus-branch-filter-control tus-topic-keyword-control">
      <span className="tus-compact-dropdown-label">KONU ODAĞI</span>
      <span className={`tus-topic-keyword-shell ${disabled ? 'disabled' : ''}`.trim()}>
        <span className="tus-topic-keyword-icon" aria-hidden="true">
          <Icon name="Search" size={16} />
        </span>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Opsiyonel: konu, hastalık veya terim yaz"
          maxLength={TUS_TOPIC_KEYWORD_MAX_LENGTH}
          disabled={disabled}
          autoComplete="off"
          aria-label="Opsiyonel konu, hastalık veya terim odağı"
        />
      </span>
    </label>
  );
}

function WaitingPearlCard({ card, rating, onRate }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const answer = getPearlCardAnswer(card);
  const explanation = getPearlCardExplanation(card);
  const frontText = getPearlCardFront(card);

  return (
    <article className={`tus-waiting-pearl-card ${isFlipped ? 'is-flipped' : ''}`.trim()}>
      <button
        type="button"
        className="tus-waiting-pearl-flip"
        onClick={() => setIsFlipped((current) => !current)}
        aria-label={isFlipped ? 'Kartın soru yüzüne dön' : 'Kartın cevap yüzünü gör'}
      >
        <span className="tus-waiting-pearl-flip-inner" aria-hidden="true">
          <span className="tus-waiting-pearl-face tus-waiting-pearl-front">
            <span className="tus-waiting-pearl-face-text">{frontText}</span>
          </span>
          <span className="tus-waiting-pearl-face tus-waiting-pearl-back">
            <span className="tus-waiting-pearl-back-scroll">
              {answer ? <span className="tus-waiting-pearl-back-box tus-waiting-pearl-back-answer">{answer}</span> : null}
              {explanation ? <span className="tus-waiting-pearl-back-box tus-waiting-pearl-back-explanation">{explanation}</span> : null}
              {!answer && !explanation ? <span className="tus-waiting-pearl-back-box tus-waiting-pearl-back-answer">Bu kart için cevap metni hazırlanıyor.</span> : null}
            </span>
          </span>
        </span>
      </button>
      <div className="tus-waiting-pearl-actions" aria-label="Kart tekrar durumu">
        <button type="button" className={rating === 'known' ? 'active known' : ''} onClick={() => onRate(card.id, 'known')}>Biliyorum</button>
        <button type="button" className={rating === 'review' ? 'active review' : ''} onClick={() => onRate(card.id, 'review')}>Tekrar et</button>
        <button type="button" className={rating === 'hard' ? 'active hard' : ''} onClick={() => onRate(card.id, 'hard')}>Zorlandım</button>
      </div>
    </article>
  );
}

function TusModuleTransitionState({ progress, flashcards = [], ratings = {}, onRateFlashcard, questionReady = false, onRevealQuestion }) {
  const elapsedSeconds = Math.max(0, Number(progress?.elapsedSeconds) || 0);
  const estimatedTotalSeconds = clampNumber(progress?.estimatedTotalSeconds || 12, 6, 45);
  const remainingSeconds = Math.max(0, Number(progress?.remainingSeconds) || 0);
  const progressPercent = questionReady ? 100 : Math.min(96, Math.max(8, (elapsedSeconds / estimatedTotalSeconds) * 100));
  const stage = questionReady ? { title: 'Soru hazır.' } : getGenerationStage(elapsedSeconds);
  const etaLabel = questionReady ? 'Hazır' : remainingSeconds > 0 ? `${remainingSeconds} sn` : 'Son kontroller';
  const statusLabel = questionReady ? 'Çözmeye hazır' : stage.title;
  const getCardsPerView = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1180) return 2;
    return 3;
  }, []);
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const syncCardsPerView = () => setCardsPerView(getCardsPerView());
    syncCardsPerView();
    window.addEventListener('resize', syncCardsPerView);
    return () => window.removeEventListener('resize', syncCardsPerView);
  }, [getCardsPerView]);

  useEffect(() => {
    setCarouselIndex(0);
  }, [flashcards]);

  const maxCarouselIndex = Math.max(0, flashcards.length - cardsPerView);
  const safeCarouselIndex = Math.min(carouselIndex, maxCarouselIndex);
  const visibleFlashcards = flashcards.slice(safeCarouselIndex, safeCarouselIndex + cardsPerView);
  const canGoPrev = safeCarouselIndex > 0;
  const canGoNext = safeCarouselIndex < maxCarouselIndex;

  return (
    <section className={`tus-generation-state tus-generation-state-countdown tus-generation-state-live tus-generation-study-wait ${questionReady ? 'question-ready' : ''}`.trim()} aria-live="polite">
      <div className="tus-generation-live-main">
        <span className="tus-generation-orb" aria-hidden="true"><Icon name={questionReady ? 'CheckCircle' : 'Sparkles'} /></span>
        <div className="tus-generation-live-copy">
          <h2>{questionReady ? 'Sorunuz hazırlandı, çözmeye başlayabilirsiniz.' : 'Yeni TUS sorunuz hazırlanıyor.'}</h2>
          <div className="tus-generation-progress-track" aria-hidden="true">
            <span style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="tus-generation-live-side">
        {questionReady ? (
          <button type="button" className="btn btn-primary tus-question-ready-cta tus-question-ready-cta-compact" onClick={onRevealQuestion}>
            <span className="tus-question-ready-cta-main"><Icon name="Eye" /> Soruyu Gör</span>
          </button>
        ) : (
          <div className="tus-generation-countdown tus-generation-countdown-live tus-generation-compact-status" aria-label={`Tahmini süre ${etaLabel}`}>
            <span className="tus-generation-status-label">{statusLabel}</span>
            <strong>{etaLabel}</strong>
          </div>
        )}
      </div>

      {flashcards.length ? (
        <div className="tus-waiting-pearl-review" aria-label="Soru hazırlanırken hap bilgi tekrarı">
          <div className="tus-waiting-pearl-review-head">
            <div>
              <strong>Sorunuz oluşturulurken hap kartlar ile çalışın.</strong>
            </div>
          </div>
          <div className="tus-waiting-pearl-carousel-shell">
            <button
              type="button"
              className="tus-waiting-pearl-carousel-arrow tus-waiting-pearl-carousel-arrow-prev"
              onClick={() => setCarouselIndex((current) => Math.max(0, current - 1))}
              disabled={!canGoPrev}
              aria-label="Önceki hap kartlar"
            >
              <span className="tus-waiting-pearl-carousel-arrow-icon" aria-hidden="true"><Icon name="ArrowLeft" size={18} strokeWidth={2.3} /></span>
            </button>
            <div className="tus-waiting-pearl-grid tus-waiting-pearl-grid-carousel">
              {visibleFlashcards.map((card) => (
                <WaitingPearlCard
                  key={card.id}
                  card={card}
                  rating={ratings[card.id]}
                  onRate={onRateFlashcard}
                />
              ))}
            </div>
            <button
              type="button"
              className="tus-waiting-pearl-carousel-arrow tus-waiting-pearl-carousel-arrow-next"
              onClick={() => setCarouselIndex((current) => Math.min(maxCarouselIndex, current + 1))}
              disabled={!canGoNext}
              aria-label="Sonraki hap kartlar"
            >
              <span className="tus-waiting-pearl-carousel-arrow-icon" aria-hidden="true"><Icon name="ArrowRight" size={18} strokeWidth={2.3} /></span>
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function TusReadyState({ branchFilter, difficulty, onGenerateQuestion }) {
  const branchLabel = !branchFilter || branchFilter === 'random' ? 'Rastgele branş' : branchFilter;
  return (
    <section className="tus-generation-state tus-generation-ready card-surface" aria-live="polite">
      <span className="tus-generation-orb" aria-hidden="true"><Icon name="Sparkles" /></span>
      <div className="tus-ready-copy">
        <h2>Seçtiğin branş ve zorluğa uygun yeni bir TUS sorusu üret.</h2>
        <p className="tus-ready-selection"><strong>{branchLabel}</strong><span aria-hidden="true">·</span><strong>{difficulty}</strong></p>
      </div>
      <button type="button" className="btn btn-primary tus-ready-cta" onClick={onGenerateQuestion}>
        <span className="tus-button-content-center">
          <Icon name="Sparkles" />
          <span>Yeni TUS Sorusu Üret</span>
        </span>
      </button>
    </section>
  );
}

function TusInactiveState({ onGenerateQuestion, message }) {
  return (
    <section className="tus-generation-state card-surface error" aria-live="polite">
      <span className="tus-generation-orb" aria-hidden="true"><Icon name="AlertTriangle" /></span>
      <div>
        <h2>Soru üretimi tamamlanamadı.</h2>
        <p>{message || 'Soru üretimi şu anda tamamlanamadı. Lütfen tekrar deneyin.'}</p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onGenerateQuestion}>
        <Icon name="RotateCcw" /> Tekrar dene
      </button>
    </section>
  );
}

function TusQuestionGeneratorView({
  question,
  loading = false,
  error = null,
  practiceStats,
  inactiveMessage = '',
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
  const accuracy = practiceStats?.attempts ? Math.round((practiceStats.correct / practiceStats.attempts) * 100) : 0;
  const loadingStartedAtRef = useRef(null);
  const [generationProgress, setGenerationProgress] = useState(() => ({
    elapsedSeconds: 0,
    estimatedTotalSeconds: readEstimatedGenerationSeconds(branchFilter, difficulty),
    remainingSeconds: readEstimatedGenerationSeconds(branchFilter, difficulty),
  }));
  const [waitingFlashcards, setWaitingFlashcards] = useState([]);
  const [waitingFlashcardRatings, setWaitingFlashcardRatings] = useState({});
  const [questionRevealPending, setQuestionRevealPending] = useState(false);
  const [topicKeywords, setTopicKeywords] = useState('');
  const waitingReviewRef = useRef(null);
  const generatedQuestionRef = useRef(null);

  const scrollToTusPracticeSection = useCallback((targetRef, block = 'start') => {
    if (typeof window === 'undefined') return;
    const target = targetRef?.current;
    if (!target || typeof target.scrollIntoView !== 'function') return;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block,
      inline: 'nearest',
    });
  }, []);

  const handleRateWaitingFlashcard = useCallback((cardId, status) => {
    writeWaitingFlashcardRating(cardId, status);
    const nextPearlState = savePearlState(applyPearlLearningDecision(loadPearlState(), cardId, status));
    flushPearlStateSave();
    dispatchPearlProgressUpdated({ source: 'tus-module-waiting-flashcards', cardId, status, state: nextPearlState });
    setWaitingFlashcardRatings((current) => ({ ...current, [cardId]: status }));
  }, []);

  const handleRevealGeneratedQuestion = useCallback(() => {
    setQuestionRevealPending(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToTusPracticeSection(generatedQuestionRef, 'start'));
    });
  }, [scrollToTusPracticeSection]);

  useEffect(() => {
    if (!loading) return;
    const cards = selectWaitingPearlCards(branchFilter, difficulty, TUS_WAITING_FLASHCARD_COUNT);
    setWaitingFlashcards(cards);
    setWaitingFlashcardRatings(readWaitingFlashcardRatings(cards));
    setQuestionRevealPending(true);
    window.requestAnimationFrame(() => scrollToTusPracticeSection(waitingReviewRef, 'start'));
  }, [loading, branchFilter, difficulty, scrollToTusPracticeSection]);

  useEffect(() => {
    if (error) setQuestionRevealPending(false);
  }, [error]);

  useEffect(() => {
    if (!loading && question) setQuestionRevealPending(false);
  }, [loading, question?.id]);

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

  const handleGenerateWithTopic = useCallback(() => {
    onGenerateQuestion?.(topicKeywords.trim());
  }, [onGenerateQuestion, topicKeywords]);

  const showWaitingReview = loading || (!loading && !error && question && questionRevealPending && waitingFlashcards.length > 0);
  const showGeneratedQuestion = !loading && !error && question && (!questionRevealPending || waitingFlashcards.length === 0);

  return (
    <section className="page-shell tus-practice-page-shell">
      <section className="tus-practice-hero card-surface">
        <div className="tus-practice-title-block">
          <h1>Yeni TUS Sorusu Üret</h1>
          <p>Branş ve zorluğu seç; KlinikIQ senin için özgün, öğretici bir TUS sorusu üretsin.</p>
          <div className="tus-practice-meta-row">
            <ModuleStatusBadge />
            <span className="tus-demo-notice-badge" title="API anahtarı frontend paketine eklenmez.">
              <Icon name="ShieldCheck" /> Demo Süresinde
            </span>
          </div>
        </div>

        <div className="tus-practice-actions tus-practice-actions-pro">
          <div className="tus-practice-filter-grid">
            <TusBranchFilter
              branchFilter={branchFilter}
              branchOptions={branchOptions}
              onChangeBranchFilter={onChangeBranchFilter}
              disabled={loading}
            />
            <TusDifficultyFilter
              difficulty={difficulty}
              onChangeDifficulty={onChangeDifficulty}
              disabled={loading}
            />
          </div>
          <TusTopicKeywordInput
            value={topicKeywords}
            onChange={setTopicKeywords}
            disabled={loading}
          />
          <div className="tus-practice-button-row">
            <button type="button" className="btn btn-secondary tus-spot-dashboard-btn" onClick={onBackHome}>
              <span aria-hidden="true">←</span> Dashboard’a dön
            </button>
            <button type="button" className="btn btn-primary tus-generate-cta tus-spot-generate-btn" onClick={handleGenerateWithTopic} disabled={loading}>
              <span className="tus-button-content-center">
                <Icon name="Sparkles" />
                <span>{loading ? 'Soru Üretiliyor...' : 'Yeni TUS Sorusu Üret'}</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {inactiveMessage && !loading && !error ? (
        <section className="tus-inactive-notice card-surface" aria-live="polite">
          <Icon name="Info" />
          <span>{inactiveMessage}</span>
        </section>
      ) : null}

      {showWaitingReview ? (
        <div ref={waitingReviewRef} className="tus-practice-scroll-anchor">
          <TusModuleTransitionState
            progress={generationProgress}
            flashcards={waitingFlashcards}
            ratings={waitingFlashcardRatings}
            onRateFlashcard={handleRateWaitingFlashcard}
            questionReady={!loading && Boolean(question)}
            onRevealQuestion={handleRevealGeneratedQuestion}
          />
        </div>
      ) : null}
      {!loading && error ? <TusInactiveState onGenerateQuestion={handleGenerateWithTopic} message={error} /> : null}
      {!loading && !error && !question ? (
        <TusReadyState branchFilter={branchFilter} difficulty={difficulty} onGenerateQuestion={handleGenerateWithTopic} />
      ) : null}
      {showGeneratedQuestion ? (
        <div ref={generatedQuestionRef} key={question.id} className="tus-case-shell case-route-transition tus-practice-scroll-anchor" data-case-id={question.id}>
          <TusSpotQuestionScreen
            question={question}
            onGenerateQuestion={handleGenerateWithTopic}
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

export default TusQuestionGeneratorView;
