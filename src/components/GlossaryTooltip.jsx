import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  getGlossaryAliasVariants,
  getGlossaryTerms,
  getProtectedUnitRanges,
  isBlacklistedUnitToken,
  isInsideProtectedUnitRange,
  isLowSignalGlossaryAlias,
  normalizeGlossaryText,
} from '../utils/glossary.js';

const DEFAULT_MAX_TERMS_PER_TEXT = 4;
const PREANSWER_MAX_TERMS_PER_TEXT = 2;
const VIEWPORT_PADDING = 12;
const SAFE_TOP_PADDING = 12;
const TOOLTIP_GAP = 8;
const MAX_TOOLTIP_WIDTH = 360;
const TOOLTIP_ROOT_ID = 'klinikiq-tooltip-layer';
const TOOLTIP_LAYER_Z = 2147483600;
const CLOSE_DELAY_MS = 120;

function escapeRegExp(text = '') {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function clamp(value, min, max) {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
}

function isStrictAcronymAlias(alias = '') {
  const value = String(alias).trim();
  return /^[A-ZÇĞİÖŞÜ0-9]{1,4}$/.test(value) && /[A-ZÇĞİÖŞÜ]/.test(value);
}

function isValidAliasMatch(item, matchedValue, source, matchStart, matchEnd, protectedUnitRanges) {
  if (!item?.alias || !matchedValue) return false;

  // Laboratory and vital-sign units must never become glossary links.
  if (isBlacklistedUnitToken(matchedValue) || isBlacklistedUnitToken(item.alias)) return false;

  // Do not link any token inside expressions such as "0.9 mg/dL", "120/80 mmHg", or "38.2 °C".
  if (isInsideProtectedUnitRange(matchStart, matchEnd, protectedUnitRanges)) return false;

  // Short medical acronyms are intentionally case-sensitive. This prevents "mg" from matching "MG".
  if (isStrictAcronymAlias(item.alias) && matchedValue !== item.alias) return false;

  const before = source.slice(Math.max(0, matchStart - 12), matchStart);
  const after = source.slice(matchEnd, Math.min(source.length, matchEnd + 12));
  const numericUnitContext = /(?:^|[\s:(])\d+(?:[.,]\d+)?\s*$/.test(before) || /^\s*(?:\/|mg\/|g\/|ng\/|pg\/|mmol\/|mEq\/|IU\/|U\/|dL|mL|L|mmHg|bpm|°C|%)/.test(after);

  return !numericUnitContext;
}

function resolveGlossaryEntryForMatch(matcher, matchedValue, source, matchStart, matchEnd, protectedUnitRanges) {
  const normalized = normalizeGlossaryText(matchedValue);
  const candidates = matcher.aliasMap.get(normalized) || [];
  const selected = candidates.find((item) => isValidAliasMatch(item, matchedValue, source, matchStart, matchEnd, protectedUnitRanges));
  return selected?.entry || null;
}

function getViewportSize() {
  if (typeof window === 'undefined') return { width: 1024, height: 768 };
  return {
    width: window.innerWidth || document.documentElement.clientWidth || 1024,
    height: window.innerHeight || document.documentElement.clientHeight || 768,
  };
}

function getTooltipRoot() {
  if (typeof document === 'undefined') return null;
  let root = document.getElementById(TOOLTIP_ROOT_ID);
  if (!root) {
    root = document.createElement('div');
    root.id = TOOLTIP_ROOT_ID;
    root.setAttribute('data-klinikiq-layer', 'tooltip');
    document.body.appendChild(root);
  }

  Object.assign(root.style, {
    position: 'fixed',
    inset: '0',
    zIndex: String(TOOLTIP_LAYER_Z),
    pointerEvents: 'none',
    overflow: 'visible',
    contain: 'none',
    isolation: 'isolate',
  });

  return root;
}

const MATCHER_CACHE = new Map();

function makeMatcher(terms = []) {
  const cacheKey = terms.map((term) => `${term.id || term.term}:${term.aliases?.length || 0}`).join('|');
  if (MATCHER_CACHE.has(cacheKey)) return MATCHER_CACHE.get(cacheKey);

  const aliasEntries = [];
  terms.forEach((entry) => {
    const aliases = entry.aliases?.length ? entry.aliases : [entry.term];
    aliases.forEach((alias) => {
      if (!alias || isBlacklistedUnitToken(alias) || isLowSignalGlossaryAlias(alias)) return;
      getGlossaryAliasVariants(alias).forEach((variant) => {
        if (!variant || isBlacklistedUnitToken(variant) || isLowSignalGlossaryAlias(variant)) return;
        aliasEntries.push({ alias: String(variant), normalized: normalizeGlossaryText(variant), entry });
      });
    });
  });

  const deduped = Array.from(
    new Map(aliasEntries.map((item) => [`${item.normalized}::${item.alias}::${item.entry.term}`, item])).values(),
  ).sort((a, b) => b.alias.length - a.alias.length || b.normalized.length - a.normalized.length);

  if (!deduped.length) {
    MATCHER_CACHE.set(cacheKey, null);
    return null;
  }

  const pattern = deduped.map((item) => escapeRegExp(item.alias)).join('|');
  const aliasMap = deduped.reduce((map, item) => {
    const current = map.get(item.normalized) || [];
    current.push(item);
    map.set(item.normalized, current);
    return map;
  }, new Map());

  const matcher = {
    regex: new RegExp(`(^|[^\\p{L}\\p{N}_])(${pattern})(?=$|[^\\p{L}\\p{N}_])`, 'giu'),
    aliasMap,
  };
  MATCHER_CACHE.set(cacheKey, matcher);
  return matcher;
}

function splitByGlossary(text = '', terms = [], maxTerms = DEFAULT_MAX_TERMS_PER_TEXT) {
  const source = String(text);
  const matcher = makeMatcher(terms);
  const limit = Number.isFinite(maxTerms) ? Math.max(0, maxTerms) : DEFAULT_MAX_TERMS_PER_TEXT;
  if (!source || !matcher || limit <= 0) return [{ type: 'text', value: source }];

  const parts = [];
  const usedTerms = new Set();
  const protectedUnitRanges = getProtectedUnitRanges(source);
  let lastIndex = 0;
  let match;

  while ((match = matcher.regex.exec(source)) !== null) {
    const prefix = match[1] || '';
    const value = match[2] || '';
    const matchStart = match.index + prefix.length;
    const matchEnd = matchStart + value.length;

    if (matchStart > lastIndex) parts.push({ type: 'text', value: source.slice(lastIndex, matchStart) });

    const entry = resolveGlossaryEntryForMatch(matcher, value, source, matchStart, matchEnd, protectedUnitRanges);
    const canonical = normalizeGlossaryText(entry?.term || value);

    if (entry && usedTerms.size < limit && !usedTerms.has(canonical)) {
      parts.push({ type: 'term', value, entry });
      usedTerms.add(canonical);
    } else {
      parts.push({ type: 'text', value });
    }
    lastIndex = matchEnd;
  }

  if (lastIndex < source.length) parts.push({ type: 'text', value: source.slice(lastIndex) });
  return parts.length ? parts : [{ type: 'text', value: source }];
}

function getAnchorRect(referenceEl) {
  const rects = Array.from(referenceEl.getClientRects?.() || []);
  const visibleRects = rects.filter((rect) => rect.width > 0 && rect.height > 0);
  if (visibleRects.length) return visibleRects[0];
  return referenceEl.getBoundingClientRect();
}

function computeFloatingPosition(referenceEl, floatingEl) {
  const viewport = getViewportSize();
  const reference = getAnchorRect(referenceEl);

  const maxWidth = Math.max(220, Math.min(MAX_TOOLTIP_WIDTH, viewport.width - VIEWPORT_PADDING * 2));
  floatingEl.style.maxWidth = `${maxWidth}px`;
  floatingEl.style.width = 'max-content';
  floatingEl.style.whiteSpace = 'normal';

  const measured = floatingEl.getBoundingClientRect();
  const floatingWidth = Math.min(Math.max(measured.width || 260, 220), maxWidth);
  const floatingHeight = Math.max(measured.height || 72, 48);

  const referenceCenterX = reference.left + reference.width / 2;
  const desiredLeft = referenceCenterX - floatingWidth / 2;
  const left = clamp(
    desiredLeft,
    VIEWPORT_PADDING,
    viewport.width - floatingWidth - VIEWPORT_PADDING,
  );

  const topSpace = reference.top - SAFE_TOP_PADDING;
  const bottomSpace = viewport.height - reference.bottom - VIEWPORT_PADDING;
  const placement = topSpace >= floatingHeight + TOOLTIP_GAP || topSpace >= bottomSpace
    ? 'top'
    : 'bottom';

  const rawTop = placement === 'top'
    ? reference.top - floatingHeight - TOOLTIP_GAP
    : reference.bottom + TOOLTIP_GAP;

  const top = placement === 'top'
    ? Math.max(SAFE_TOP_PADDING, rawTop)
    : clamp(rawTop, VIEWPORT_PADDING, viewport.height - floatingHeight - VIEWPORT_PADDING);

  const arrowX = clamp(referenceCenterX - left, 18, floatingWidth - 18);

  return {
    left,
    top,
    placement,
    arrowX,
    maxWidth,
  };
}

function FloatingTooltip({ id, triggerRef, open, children, onRequestClose, onFloatingEnter, onFloatingLeave, revealMode }) {
  const tooltipRef = useRef(null);
  const [portalRoot, setPortalRoot] = useState(null);
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    placement: 'top',
    arrowX: 24,
    maxWidth: MAX_TOOLTIP_WIDTH,
  });
  const [isPositioned, setIsPositioned] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsPositioned(false);
      return undefined;
    }
    setPortalRoot(getTooltipRoot());
    return undefined;
  }, [open]);

  const updatePosition = useCallback(() => {
    const referenceEl = triggerRef.current;
    const floatingEl = tooltipRef.current;
    if (!referenceEl || !floatingEl || typeof window === 'undefined') return;
    const nextPosition = computeFloatingPosition(referenceEl, floatingEl);
    setPosition(nextPosition);
    setIsPositioned(true);
  }, [triggerRef]);

  useLayoutEffect(() => {
    if (!open || !portalRoot) return undefined;
    setIsPositioned(false);
    updatePosition();
    const frameOne = window.requestAnimationFrame(updatePosition);
    const frameTwo = window.requestAnimationFrame(updatePosition);
    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
    };
  }, [children, open, portalRoot, updatePosition]);

  useEffect(() => {
    if (!open || typeof document === 'undefined') return undefined;

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();
    const handlePointerDown = (event) => {
      const referenceEl = triggerRef.current;
      const floatingEl = tooltipRef.current;
      if (referenceEl?.contains(event.target) || floatingEl?.contains(event.target)) return;
      onRequestClose?.();
    };
    const handleKey = (event) => {
      if (event.key === 'Escape') onRequestClose?.();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, true);
    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onRequestClose, triggerRef, updatePosition]);

  if (!open || !portalRoot) return null;

  return createPortal(
    <span
      id={id}
      ref={tooltipRef}
      className="glossary-tooltip floating-glossary-tooltip smart-glossary-popover"
      role="tooltip"
      data-placement={position.placement}
      data-reveal-mode={revealMode}
      onPointerEnter={onFloatingEnter}
      onPointerLeave={onFloatingLeave}
      onMouseEnter={onFloatingEnter}
      onMouseLeave={onFloatingLeave}
      style={{
        position: 'fixed',
        zIndex: TOOLTIP_LAYER_Z,
        maxWidth: `${position.maxWidth}px`,
        visibility: isPositioned ? 'visible' : 'hidden',
        '--tooltip-left': `${position.left}px`,
        '--tooltip-top': `${position.top}px`,
        '--tooltip-arrow-left': `${position.arrowX}px`,
      }}
    >
      {children}
    </span>,
    portalRoot,
  );
}

function asList(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item || '').trim()).filter(Boolean);
}

function difficultyLabel(value = '') {
  const normalized = String(value || '').toLocaleLowerCase('tr');
  if (normalized.includes('kolay') || normalized === 'easy') return 'Kolay';
  if (normalized.includes('zor') || normalized === 'hard' || normalized.includes('yüksek')) return 'Zor';
  return 'Orta';
}

function GlossaryCard({ entry, revealMode = 'postAnswer' }) {
  const [expanded, setExpanded] = useState(false);
  const isPreAnswer = revealMode === 'preAnswer' || revealMode === 'neutral';
  const previewDefinition = entry.previewDefinition || entry.shortDefinition || entry.definition || '';
  const safeDefinition = entry.preAnswerSafeDefinition || previewDefinition;
  const shortDefinition = isPreAnswer ? safeDefinition : (entry.shortDefinition || previewDefinition);
  const detailed = entry.postAnswerExpandedExplanation || entry.detailedExplanation || '';
  const tusPearl = entry.tusPearl || '';
  const differential = entry.differentialPoint || '';
  const relevance = entry.clinicalRelevance || '';
  const mechanism = entry.mechanism || '';
  const relatedTerms = asList(entry.relatedTerms).slice(0, 3);
  const relatedCases = asList(entry.relatedCases || entry.relatedCaseIds);
  const relatedQuestions = asList(entry.relatedQuestions);
  const relatedFlashcards = asList(entry.relatedFlashcards);
  const secondaryName = entry.abbreviation || entry.EnglishName || entry.LatinName || '';
  const hasTeachingContent = Boolean(tusPearl || differential || relevance || mechanism || detailed);
  const canExpand = !isPreAnswer && Boolean(detailed || relevance || mechanism || relatedTerms.length);

  return (
    <span className="smart-glossary-card" data-preanswer={isPreAnswer ? 'true' : 'false'}>
      <span className="smart-glossary-header">
        <span className="smart-glossary-title-wrap">
          <strong className="smart-glossary-title">{entry.term}</strong>
          {secondaryName && secondaryName !== entry.term ? <small className="smart-glossary-secondary-name">{secondaryName}</small> : null}
        </span>
        <span className="smart-glossary-header-actions">
          {entry.category ? <em className="smart-glossary-category">{entry.category}</em> : null}
          {canExpand ? (
            <button
              type="button"
              className="smart-glossary-arrow"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setExpanded((current) => !current);
              }}
              aria-label={expanded ? 'Terminoloji detayını gizle' : 'Terminoloji detayını göster'}
              aria-expanded={expanded}
            >
              →
            </button>
          ) : null}
        </span>
      </span>

      {shortDefinition ? <span className="smart-glossary-definition">{shortDefinition}</span> : null}

      {isPreAnswer && hasTeachingContent ? (
        <span className="smart-glossary-safe-note">TUS ipucu yanıt sonrası açılır.</span>
      ) : null}

      {!isPreAnswer && tusPearl ? (
        <span className="smart-glossary-row pearl"><b>TUS ipucu</b><span>{tusPearl}</span></span>
      ) : null}

      {!isPreAnswer && differential ? (
        <span className="smart-glossary-row differential"><b>Ayırıcı not</b><span>{differential}</span></span>
      ) : null}

      {!isPreAnswer && expanded ? (
        <span className="smart-glossary-detail-block">
          {detailed ? <span>{detailed}</span> : null}
          {mechanism ? <span><b>Mekanizma:</b> {mechanism}</span> : null}
          {relevance ? <span><b>Klinik değer:</b> {relevance}</span> : null}
          {relatedTerms.length ? <span className="smart-glossary-related"><b>İlgili:</b> {relatedTerms.join(' · ')}</span> : null}
        </span>
      ) : null}

      {!isPreAnswer && (relatedCases.length || relatedQuestions.length || relatedFlashcards.length) ? (
        <span className="smart-glossary-links" aria-label="İlişkili öğrenme bağlantıları">
          {relatedCases.length ? <span>{relatedCases.length} ilgili olgu</span> : null}
          {relatedQuestions.length ? <span>{relatedQuestions.length} soru</span> : null}
          {relatedFlashcards.length ? <span>{relatedFlashcards.length} hap kart</span> : null}
        </span>
      ) : null}
    </span>
  );
}

export function GlossaryTerm({ children, entry = null, definition = '', revealMode = 'postAnswer' }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeTimerRef = useRef(0);
  const reactId = useId();
  const id = useMemo(() => `glossary-${reactId.replace(/:/g, '')}`, [reactId]);
  const resolvedEntry = entry || { term: String(children || ''), shortDefinition: definition || '' };
  const description = resolvedEntry.shortDefinition || resolvedEntry.definition || definition || '';

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = 0;
    }
  }, []);

  const close = useCallback(() => {
    clearCloseTimer();
    setOpen(false);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    if (typeof window === 'undefined') {
      setOpen(false);
      return;
    }
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const openNow = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <span
      ref={triggerRef}
      className="glossary-term smart-glossary-term"
      tabIndex={0}
      role="button"
      data-reveal-mode={revealMode}
      aria-describedby={open ? id : undefined}
      aria-label={`${children}: ${description}`}
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') openNow();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') scheduleClose();
      }}
      onFocus={openNow}
      onBlur={scheduleClose}
      onClick={(event) => {
        event.stopPropagation();
        clearCloseTimer();
        setOpen((current) => !current);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          clearCloseTimer();
          setOpen((current) => !current);
        }
        if (event.key === 'Escape') close();
      }}
    >
      {children}
      <FloatingTooltip
        id={id}
        triggerRef={triggerRef}
        open={open}
        revealMode={revealMode}
        onRequestClose={close}
        onFloatingEnter={openNow}
        onFloatingLeave={scheduleClose}
      >
        <GlossaryCard entry={resolvedEntry} revealMode={revealMode} />
      </FloatingTooltip>
    </span>
  );
}

function GlossaryText({
  text = '',
  enabled = true,
  terms: extraTerms = [],
  branchId = '',
  revealMode = 'postAnswer',
  maxTerms = undefined,
}) {
  const terms = useMemo(() => getGlossaryTerms(extraTerms, { branchId }), [extraTerms, branchId]);
  const effectiveMaxTerms = maxTerms ?? (revealMode === 'preAnswer' || revealMode === 'neutral' ? PREANSWER_MAX_TERMS_PER_TEXT : DEFAULT_MAX_TERMS_PER_TEXT);
  const parts = useMemo(() => splitByGlossary(text, enabled ? terms : [], effectiveMaxTerms), [text, enabled, terms, effectiveMaxTerms]);

  if (!enabled) return <span className="glossary-text-flow">{text}</span>;

  return (
    <span className="glossary-text-flow">
      {parts.map((part, index) => part.type === 'term' ? (
        <GlossaryTerm key={`${part.value}-${index}`} entry={part.entry} revealMode={revealMode}>{part.value}</GlossaryTerm>
      ) : (
        <span className="glossary-plain-segment" key={`${part.value}-${index}`}>{part.value}</span>
      ))}
    </span>
  );
}

export default GlossaryText;
