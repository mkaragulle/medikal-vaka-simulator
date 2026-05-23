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

const DEFAULT_MAX_TERMS_PER_TEXT = 5;
const PREANSWER_MAX_TERMS_PER_TEXT = 3;
const VIEWPORT_PADDING = 12;
const SAFE_TOP_PADDING = 12;
const TOOLTIP_GAP = 8;
const MAX_TOOLTIP_WIDTH = 360;
const TOOLTIP_ROOT_ID = 'klinikiq-tooltip-layer';
const TOOLTIP_LAYER_Z = 2147483600;
const CLOSE_DELAY_MS = 220;


// Turkish medical terms are frequently used with case/possessive suffixes
// (e.g. "hiperkalemide", "tüberkülozun", "QRS genişlemesinde").
// The previous exact-boundary matcher only linked the bare lemma and silently
// missed many clinically meaningful occurrences in real Turkish UI text.
const TURKISH_SUFFIXES = [
  'larında', 'lerinde', 'larından', 'lerinden', 'larının', 'lerinin', 'larıyla', 'leriyle',
  'ındaki', 'indeki', 'undaki', 'ündeki', 'sındaki', 'sindeki', 'sundaki', 'sündeki',
  'ından', 'inden', 'undan', 'ünden', 'sından', 'sinden', 'sundan', 'sünden',
  'ında', 'inde', 'unda', 'ünde', 'sında', 'sinde', 'sunda', 'sünde',
  'larda', 'lerde', 'lardan', 'lerden', 'ların', 'lerin', 'ları', 'leri',
  'ıyla', 'iyle', 'uyla', 'üyle', 'yla', 'yle',
  'ındaki', 'indeki', 'undaki', 'ündeki', 'nda', 'nde', 'ndan', 'nden', 'nın', 'nin', 'nun', 'nün', 'ının', 'inin', 'unun', 'ünün', 'ın', 'in', 'un', 'ün',
  'dan', 'den', 'tan', 'ten', 'da', 'de', 'ta', 'te',
  'ları', 'leri', 'lar', 'ler',
  'sı', 'si', 'su', 'sü', 'nı', 'ni', 'nu', 'nü', 'yı', 'yi', 'yu', 'yü',
  'a', 'e', 'ya', 'ye', 'ı', 'i', 'u', 'ü',
  'la', 'le', 'ile',
  'lı', 'li', 'lu', 'lü', 'lık', 'lik', 'luk', 'lük',
  'sız', 'siz', 'suz', 'süz', 'sal', 'sel', 'ki',
];

const TURKISH_SUFFIX_PATTERN = String.raw`['’]?[\p{L}]{1,16}`;
const TURKISH_SUFFIX_SET = new Set(TURKISH_SUFFIXES.map((suffix) => normalizeGlossaryText(suffix)));

function isLikelyTurkishSuffix(suffix = '') {
  const cleaned = String(suffix || '').replace(/^['’]/u, '');
  if (!cleaned) return false;
  const normalized = normalizeGlossaryText(cleaned);
  if (!normalized || normalized.length > 16) return false;
  if (TURKISH_SUFFIX_SET.has(normalized)) return true;

  // Common stacked forms: plural/possessive + locative/ablative/genitive.
  return /^(?:lar|ler)?(?:i|u|a|e|ya|ye|yi|yu|ni|nu|si|su|da|de|ta|te|dan|den|tan|ten|in|un|nin|nun|nda|nde|ndan|nden|indaki|indeki|undaki|inda|inde|unda|sinda|sinde|sunda|indan|inden|undan|sindan|sinden|sundan|iyla|uyla|yla|yle)$/u.test(normalized);
}

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

function isInsideAnyGlossaryTooltip(node) {
  if (!node || typeof document === 'undefined') return false;
  const tooltipRoot = document.getElementById(TOOLTIP_ROOT_ID);
  if (!tooltipRoot) return false;
  return tooltipRoot.contains(node);
}

function getClosestFloatingTooltip(node) {
  if (!node || typeof node.closest !== 'function') return null;
  return node.closest('[data-glossary-tooltip-owner]');
}

function isInsideOwnedFloatingTooltip(node, ownerId) {
  const floating = getClosestFloatingTooltip(node);
  return Boolean(floating && ownerId && floating.getAttribute('data-glossary-tooltip-owner') === ownerId);
}

function getClosestFloatingTooltipLevel(node) {
  const floating = getClosestFloatingTooltip(node);
  if (!floating) return null;
  const raw = floating.getAttribute('data-nesting-level');
  const level = Number(raw);
  return Number.isFinite(level) ? level : null;
}

const GLOSSARY_OPEN_EVENT = 'klinikiq-glossary-term-open';

const MATCHER_CACHE = new WeakMap();
const SPLIT_CACHE = new Map();
const MAX_SPLIT_CACHE_SIZE = 600;

function rememberSplitCache(key, value) {
  SPLIT_CACHE.set(key, value);
  if (SPLIT_CACHE.size > MAX_SPLIT_CACHE_SIZE) {
    const oldestKey = SPLIT_CACHE.keys().next().value;
    SPLIT_CACHE.delete(oldestKey);
  }
  return value;
}

function getTermsSignature(terms = []) {
  if (!Array.isArray(terms)) return 'no-terms';
  if (terms.__glossarySignature) return terms.__glossarySignature;
  const signature = `${terms.length}:${terms.slice(0, 24).map((term) => term?.id || term?.term || '').join('|')}`;
  try {
    Object.defineProperty(terms, '__glossarySignature', { value: signature, enumerable: false });
  } catch (_) {
    // Frozen arrays still work; the computed signature is returned without mutation.
  }
  return signature;
}

function isLikelyGlossaryCandidateText(source = '') {
  const text = String(source || '').trim();
  if (text.length < 3) return false;
  if (!/[\p{L}]/u.test(text)) return false;

  // Numeric lab/vital cells are very common in investigation tables. They should
  // not pay the cost of the full medical-term matcher.
  if (/^[\d\s.,:+/<>=%°µμ\-–()]+$/u.test(text)) return false;

  return true;
}

function makeMatcher(terms = []) {
  if (!Array.isArray(terms) || !terms.length) return null;
  if (MATCHER_CACHE.has(terms)) return MATCHER_CACHE.get(terms);

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
    MATCHER_CACHE.set(terms, null);
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
    regex: new RegExp(`(^|[^\\p{L}\\p{N}_])(${pattern})(${TURKISH_SUFFIX_PATTERN})?(?=$|[^\\p{L}\\p{N}_])`, 'giu'),
    aliasMap,
  };
  MATCHER_CACHE.set(terms, matcher);
  return matcher;
}

function splitByGlossary(text = '', terms = [], maxTerms = DEFAULT_MAX_TERMS_PER_TEXT) {
  const source = String(text);
  const limit = Number.isFinite(maxTerms) ? Math.max(0, maxTerms) : DEFAULT_MAX_TERMS_PER_TEXT;
  if (!source || !Array.isArray(terms) || !terms.length || limit <= 0 || !isLikelyGlossaryCandidateText(source)) return [{ type: 'text', value: source }];

  const cacheKey = `${getTermsSignature(terms)}::${limit}::${source}`;
  if (SPLIT_CACHE.has(cacheKey)) return SPLIT_CACHE.get(cacheKey);

  const matcher = makeMatcher(terms);
  if (!matcher) return rememberSplitCache(cacheKey, [{ type: 'text', value: source }]);

  const parts = [];
  const usedTerms = new Set();
  const protectedUnitRanges = getProtectedUnitRanges(source);
  let lastIndex = 0;
  let match;

  matcher.regex.lastIndex = 0;
  while ((match = matcher.regex.exec(source)) !== null) {
    const prefix = match[1] || '';
    const baseValue = match[2] || '';
    const suffixValue = match[3] || '';
    const suffixIsValid = suffixValue ? isLikelyTurkishSuffix(suffixValue) : true;
    const value = suffixIsValid ? `${baseValue}${suffixValue}` : baseValue;
    const matchStart = match.index + prefix.length;
    const baseEnd = matchStart + baseValue.length;
    const matchEnd = matchStart + value.length;

    if (matchStart > lastIndex) parts.push({ type: 'text', value: source.slice(lastIndex, matchStart) });

    const entry = suffixIsValid
      ? resolveGlossaryEntryForMatch(matcher, baseValue, source, matchStart, baseEnd, protectedUnitRanges)
      : null;
    const canonical = normalizeGlossaryText(entry?.term || baseValue);

    if (entry && usedTerms.size < limit && !usedTerms.has(canonical)) {
      parts.push({ type: 'term', value, entry });
      usedTerms.add(canonical);
    } else {
      parts.push({ type: 'text', value });
    }
    lastIndex = matchEnd;
  }

  if (lastIndex < source.length) parts.push({ type: 'text', value: source.slice(lastIndex) });
  return rememberSplitCache(cacheKey, parts.length ? parts : [{ type: 'text', value: source }]);
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

function FloatingTooltip({ id, triggerRef, open, children, onRequestClose, onFloatingEnter, onFloatingLeave, revealMode, nestingLevel = 0 }) {
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
      // Nested glossary cards are rendered as sibling portals. A click inside any
      // glossary tooltip must not close the parent tooltip; otherwise nested
      // term previews disappear as soon as the child card is clicked or focused.
      if (referenceEl?.contains(event.target) || floatingEl?.contains(event.target) || isInsideAnyGlossaryTooltip(event.target)) return;
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
      data-nesting-level={nestingLevel}
      data-glossary-tooltip-owner={id}
      data-klinikiq-floating-tooltip="true"
      onPointerEnter={onFloatingEnter}
      onPointerLeave={onFloatingLeave}
      onMouseEnter={onFloatingEnter}
      onMouseLeave={onFloatingLeave}
      style={{
        position: 'fixed',
        zIndex: TOOLTIP_LAYER_Z + Math.min(Number(nestingLevel) || 0, 50),
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

function getEntryKeys(entry = {}) {
  return Array.from(new Set([
    entry.id,
    entry.term,
    entry.normalizedTerm,
    ...(Array.isArray(entry.aliases) ? entry.aliases : []),
  ].filter(Boolean).map((item) => normalizeGlossaryText(item))));
}

function normalizeSectionText(value = '') {
  return normalizeGlossaryText(value).replace(/\s+/g, ' ').trim();
}

function isDuplicateSection(value = '', previousValues = []) {
  const normalized = normalizeSectionText(value);
  if (!normalized) return true;
  return previousValues.some((previous) => {
    const normalizedPrevious = normalizeSectionText(previous);
    if (!normalizedPrevious) return false;
    return normalized === normalizedPrevious || normalized.includes(normalizedPrevious) || normalizedPrevious.includes(normalized);
  });
}

function GlossaryCard({ entry, revealMode = 'postAnswer', excludedTermKeys = [], nestingLevel = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const isPreAnswer = revealMode === 'preAnswer' || revealMode === 'neutral';
  const previewDefinition = entry.previewDefinition || entry.shortDefinition || entry.definition || '';
  const safeDefinition = entry.preAnswerSafeDefinition || previewDefinition;
  const shortDefinition = isPreAnswer ? safeDefinition : (entry.shortDefinition || previewDefinition);
  const rawDetailed = entry.postAnswerExpandedExplanation || entry.detailedExplanation || '';
  const rawTusPearl = entry.tusPearl || '';
  const rawDifferential = entry.differentialPoint || '';
  const rawRelevance = entry.clinicalRelevance || '';
  const rawMechanism = entry.mechanism || '';
  const relatedTerms = asList(entry.relatedTerms).slice(0, 3);
  const relatedCases = asList(entry.relatedCases || entry.relatedCaseIds);
  const relatedQuestions = asList(entry.relatedQuestions);
  const relatedFlashcards = asList(entry.relatedFlashcards);
  const secondaryName = entry.abbreviation || entry.EnglishName || entry.LatinName || '';

  const blockedKeys = useMemo(() => {
    const next = new Set((Array.isArray(excludedTermKeys) ? excludedTermKeys : []).map((item) => normalizeGlossaryText(item)));
    getEntryKeys(entry).forEach((key) => next.add(key));
    return Array.from(next).filter(Boolean);
  }, [entry, excludedTermKeys]);

  const baseShownValues = [shortDefinition];
  const tusPearl = !isDuplicateSection(rawTusPearl, baseShownValues) ? rawTusPearl : '';
  const differential = !isDuplicateSection(rawDifferential, [...baseShownValues, tusPearl]) ? rawDifferential : '';
  const detailed = !isDuplicateSection(rawDetailed, [...baseShownValues, tusPearl, differential]) ? rawDetailed : '';
  const relevance = !isDuplicateSection(rawRelevance, [...baseShownValues, tusPearl, differential, detailed]) ? rawRelevance : '';
  const mechanism = !isDuplicateSection(rawMechanism, [...baseShownValues, tusPearl, differential, detailed, relevance]) ? rawMechanism : '';

  const hasTeachingContent = Boolean(rawTusPearl || rawDifferential || rawRelevance || rawMechanism || rawDetailed);
  const canExpand = !isPreAnswer && Boolean(detailed || relevance || mechanism || relatedTerms.length);
  const nestedMaxTerms = isPreAnswer ? 2 : 4;
  const renderGlossaryInline = (value, localMaxTerms = nestedMaxTerms) => {
    if (!value) return null;
    return (
      <GlossaryText
        text={value}
        revealMode={revealMode}
        maxTerms={localMaxTerms}
        excludedTermKeys={blockedKeys}
        nestingLevel={nestingLevel + 1}
      />
    );
  };

  return (
    <span className="smart-glossary-card" data-preanswer={isPreAnswer ? 'true' : 'false'} data-nesting-level={nestingLevel}>
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

      {shortDefinition ? <span className="smart-glossary-definition">{renderGlossaryInline(shortDefinition, 3)}</span> : null}

      {isPreAnswer && hasTeachingContent ? (
        <span className="smart-glossary-safe-note">TUS ipucu yanıt sonrası açılır.</span>
      ) : null}

      {!isPreAnswer && tusPearl ? (
        <span className="smart-glossary-row pearl"><b>TUS ipucu</b><span>{renderGlossaryInline(tusPearl)}</span></span>
      ) : null}

      {!isPreAnswer && differential ? (
        <span className="smart-glossary-row differential"><b>Ayırıcı not</b><span>{renderGlossaryInline(differential)}</span></span>
      ) : null}

      {!isPreAnswer && expanded ? (
        <span className="smart-glossary-detail-block">
          {detailed ? <span>{renderGlossaryInline(detailed)}</span> : null}
          {mechanism ? <span><b>Mekanizma:</b> {renderGlossaryInline(mechanism)}</span> : null}
          {relevance ? <span><b>Klinik değer:</b> {renderGlossaryInline(relevance)}</span> : null}
          {relatedTerms.length ? <span className="smart-glossary-related"><b>İlgili:</b> {renderGlossaryInline(relatedTerms.join(' · '), 3)}</span> : null}
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

export function GlossaryTerm({ children, entry = null, definition = '', revealMode = 'postAnswer', excludedTermKeys = [], nestingLevel = 0 }) {
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

  const scheduleCloseSoon = useCallback(() => {
    if (typeof window === 'undefined') {
      setOpen(false);
      return;
    }
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const scheduleCloseFromTrigger = useCallback((event) => {
    const nextTarget = event?.relatedTarget;
    const triggerEl = triggerRef.current;

    // Keep this term open only when the pointer/focus moves from the trigger
    // into its own floating card. Moving to another glossary term inside the
    // same parent tooltip must close this child preview; otherwise sibling
    // nested tooltips remain stuck on screen.
    if (nextTarget && (triggerEl?.contains(nextTarget) || isInsideOwnedFloatingTooltip(nextTarget, id))) return;
    scheduleCloseSoon();
  }, [id, scheduleCloseSoon]);

  const scheduleCloseFromFloating = useCallback((event) => {
    const nextTarget = event?.relatedTarget;
    const triggerEl = triggerRef.current;
    if (nextTarget && (triggerEl?.contains(nextTarget) || isInsideOwnedFloatingTooltip(nextTarget, id))) return;

    // Parent cards should stay open while the pointer moves from the parent
    // floating card into a deeper child floating card. The reverse movement
    // (child -> parent/sibling) should close the child, preventing stale nested
    // popovers from staying visible.
    const targetLevel = nextTarget ? getClosestFloatingTooltipLevel(nextTarget) : null;
    if (targetLevel !== null && targetLevel > Number(nestingLevel || 0)) return;

    scheduleCloseSoon();
  }, [id, nestingLevel, scheduleCloseSoon]);

  const openNow = useCallback(() => {
    clearCloseTimer();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(GLOSSARY_OPEN_EVENT, { detail: { id, nestingLevel } }));
    }
    setOpen(true);
  }, [clearCloseTimer, id, nestingLevel]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handleOtherTermOpen = (event) => {
      const detail = event?.detail || {};
      if (detail.id && detail.id !== id && Number(detail.nestingLevel || 0) === Number(nestingLevel || 0)) {
        clearCloseTimer();
        setOpen(false);
      }
    };
    window.addEventListener(GLOSSARY_OPEN_EVENT, handleOtherTermOpen);
    return () => window.removeEventListener(GLOSSARY_OPEN_EVENT, handleOtherTermOpen);
  }, [clearCloseTimer, id, nestingLevel]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <span
      ref={triggerRef}
      className="glossary-term smart-glossary-term"
      tabIndex={0}
      role="button"
      data-reveal-mode={revealMode}
      data-nesting-level={nestingLevel}
      aria-describedby={open ? id : undefined}
      aria-label={`${children}: ${description}`}
      onMouseEnter={openNow}
      onMouseLeave={scheduleCloseFromTrigger}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') openNow();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') scheduleCloseFromTrigger(event);
      }}
      onFocus={openNow}
      onBlur={scheduleCloseFromTrigger}
      onClick={(event) => {
        event.stopPropagation();
        clearCloseTimer();
        setOpen((current) => {
          if (!current && typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent(GLOSSARY_OPEN_EVENT, { detail: { id, nestingLevel } }));
          }
          return !current;
        });
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          clearCloseTimer();
          setOpen((current) => {
            if (!current && typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent(GLOSSARY_OPEN_EVENT, { detail: { id, nestingLevel } }));
            }
            return !current;
          });
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
        nestingLevel={nestingLevel}
        onRequestClose={close}
        onFloatingEnter={openNow}
        onFloatingLeave={scheduleCloseFromFloating}
      >
        <GlossaryCard entry={resolvedEntry} revealMode={revealMode} excludedTermKeys={excludedTermKeys} nestingLevel={nestingLevel} />
      </FloatingTooltip>
    </span>
  );
}

function GlossaryText({
  text = '',
  enabled = true,
  terms: extraTerms = null,
  branchId = '',
  revealMode = 'postAnswer',
  maxTerms = undefined,
  excludedTermKeys = null,
  nestingLevel = 0,
}) {
  const excludedKey = Array.isArray(excludedTermKeys)
    ? excludedTermKeys.map((item) => normalizeGlossaryText(item)).filter(Boolean).sort().join('|')
    : '';
  const extraTermsKey = Array.isArray(extraTerms) && extraTerms.length
    ? extraTerms.map((term) => `${term?.id || ''}:${term?.term || ''}:${term?.aliases?.length || 0}`).join('|')
    : '';
  const terms = useMemo(() => {
    if (!enabled) return [];
    const baseTerms = getGlossaryTerms(extraTerms, { branchId });
    if (!excludedKey) return baseTerms;

    const excluded = new Set((Array.isArray(excludedTermKeys) ? excludedTermKeys : []).map((item) => normalizeGlossaryText(item)).filter(Boolean));
    const filtered = baseTerms.filter((term) => {
      const keys = getEntryKeys(term);
      return !keys.some((key) => excluded.has(key));
    });

    try {
      Object.defineProperty(filtered, '__glossarySignature', {
        value: `${getTermsSignature(baseTerms)}::exclude:${excludedKey}`,
        enumerable: false,
      });
    } catch (_) {
      // Non-critical cache hint.
    }
    return filtered;
  }, [enabled, extraTermsKey, branchId, excludedKey]);
  const effectiveMaxTerms = maxTerms ?? (revealMode === 'preAnswer' || revealMode === 'neutral' ? PREANSWER_MAX_TERMS_PER_TEXT : DEFAULT_MAX_TERMS_PER_TEXT);
  const sourceText = String(text || '');
  const parts = useMemo(() => splitByGlossary(sourceText, enabled ? terms : [], effectiveMaxTerms), [sourceText, enabled, terms, effectiveMaxTerms]);

  if (!enabled) return <span className="glossary-text-flow">{sourceText}</span>;

  return (
    <span className="glossary-text-flow" data-nesting-level={nestingLevel}>
      {parts.map((part, index) => part.type === 'term' ? (
        <GlossaryTerm
          key={`${part.value}-${index}`}
          entry={part.entry}
          revealMode={revealMode}
          excludedTermKeys={excludedTermKeys}
          nestingLevel={nestingLevel}
        >
          {part.value}
        </GlossaryTerm>
      ) : (
        <span className="glossary-plain-segment" key={`${part.value}-${index}`}>{part.value}</span>
      ))}
    </span>
  );
}

export default GlossaryText;
