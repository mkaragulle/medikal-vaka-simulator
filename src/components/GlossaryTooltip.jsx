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
  isGenericStandaloneAlias,
  isAmbiguousStandaloneAlias,
} from '../utils/glossary.js';

const DEFAULT_MAX_TERMS_PER_TEXT = 8;
const TOOLTIP_BODY_MAX_NESTED_TERMS = 5;
// Nested glossary should not be artificially capped by a fixed depth.
// Safety is provided by cycle detection (visited entry path), deterministic binding,
// safeNestedTerms/relatedTerms gating, and per-card nested-term limits.
const TOOLTIP_BODY_MAX_NESTED_DEPTH = Number.POSITIVE_INFINITY;
const PREANSWER_MAX_TERMS_PER_TEXT = 6; // retained for legacy imports; no longer used to restrict glossary content
const GLOSSARY_EXPLANATION_MODE = 'fullEducational';
const VIEWPORT_PADDING = 12;
const SAFE_TOP_PADDING = 12;
const TOOLTIP_GAP = 8;
const MAX_TOOLTIP_WIDTH = 520;
const TOOLTIP_ROOT_ID = 'klinikiq-tooltip-layer';
const TOOLTIP_LAYER_Z = 2147483600;
const CLOSE_DELAY_MS = 220;

const isFiniteNestedDepthLimit = (value) => Number.isFinite(Number(value));
const hasReachedNestedDepthLimit = (currentDepth = 0, maxDepth = TOOLTIP_BODY_MAX_NESTED_DEPTH) => (
  isFiniteNestedDepthLimit(maxDepth) && Number(currentDepth || 0) >= Number(maxDepth)
);
const canGoDeeperInNestedGlossary = (currentDepth = 0, maxDepth = TOOLTIP_BODY_MAX_NESTED_DEPTH) => !hasReachedNestedDepthLimit(currentDepth, maxDepth);


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

function getEntryMatchingPriority(entry = {}, alias = '') {
  const explicit = Number(entry.matchingPriority ?? entry.priorityScore ?? 0);
  let score = Number.isFinite(explicit) ? explicit : 0;
  const normalizedAlias = normalizeGlossaryText(alias);
  const normalizedTerm = normalizeGlossaryText(entry.canonicalTerm || entry.displayTerm || entry.term || '');
  if (normalizedAlias && normalizedTerm && normalizedAlias === normalizedTerm) score += 18;
  if (entry.isMultiWordTerm || /\s/.test(String(alias || entry.term || ''))) score += 10;
  score += Math.min(String(alias || '').trim().split(/\s+/).length, 6);
  if (!score) score = 50;
  return score;
}

function compareAliasSpecificity(a = {}, b = {}) {
  if (a.alias.length !== b.alias.length) return b.alias.length - a.alias.length;
  const ap = getEntryMatchingPriority(a.entry, a.alias);
  const bp = getEntryMatchingPriority(b.entry, b.alias);
  if (ap !== bp) return bp - ap;
  if (a.normalized.length !== b.normalized.length) return b.normalized.length - a.normalized.length;
  return String(a.entry?.term || '').localeCompare(String(b.entry?.term || ''), 'tr');
}

function getEntryNormalizedKeysForMatch(entry = {}) {
  return Array.from(new Set([
    entry.id,
    entry.term,
    entry.canonicalTerm,
    entry.displayTerm,
    entry.normalizedTerm,
    ...(Array.isArray(entry.aliases) ? entry.aliases : []),
  ].filter(Boolean).map((item) => normalizeGlossaryText(item))));
}

function isExcludedGlossaryEntry(entry = {}, excludedSet = null) {
  if (!excludedSet || !excludedSet.size) return false;
  return getEntryNormalizedKeysForMatch(entry).some((key) => excludedSet.has(key));
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


function getLocalContextWindow(source = '', matchStart = 0, matchEnd = 0, radius = 90) {
  const start = Math.max(0, Number(matchStart || 0) - radius);
  const end = Math.min(String(source).length, Number(matchEnd || 0) + radius);
  return normalizeGlossaryText(String(source).slice(start, end));
}

function localContextHasAny(context = '', terms = []) {
  if (!context || !Array.isArray(terms) || !terms.length) return false;
  return terms.some((term) => {
    const key = normalizeGlossaryText(term);
    return key && context.includes(key);
  });
}

function isContextAllowedForCandidate(entry = {}, alias = '', source = '', matchStart = 0, matchEnd = 0) {
  const wordCount = String(alias || '').trim().split(/\s+/u).filter(Boolean).length;
  const context = getLocalContextWindow(source, matchStart, matchEnd);
  const allowed = Array.isArray(entry.allowedContextKeywords) ? entry.allowedContextKeywords : [];
  const blocked = Array.isArray(entry.blockedContextKeywords) ? entry.blockedContextKeywords : [];
  const required = Array.isArray(entry.requiredCoTerms) ? entry.requiredCoTerms : [];

  if (blocked.length && localContextHasAny(context, blocked)) return false;
  if (wordCount === 1 && (entry.contextRequired || entry.phraseOnly || entry.disabledAsStandaloneAlias)) {
    if (entry.standaloneSafe === true && !required.length && !allowed.length) return true;
    return localContextHasAny(context, [...required, ...allowed]);
  }
  if (wordCount === 1 && isAmbiguousStandaloneAlias(alias) && !entry.isGenericConcept && entry.standaloneSafe !== true) {
    return localContextHasAny(context, [...required, ...allowed]);
  }
  return true;
}

function resolveGlossaryEntryForMatch(matcher, matchedValue, source, matchStart, matchEnd, protectedUnitRanges, excludedSet = null) {
  const normalized = normalizeGlossaryText(matchedValue);
  const candidates = matcher.aliasMap.get(normalized) || [];
  const selected = candidates.find((item) => (
    !isExcludedGlossaryEntry(item.entry, excludedSet)
    && isValidAliasMatch(item, matchedValue, source, matchStart, matchEnd, protectedUnitRanges)
    && isContextAllowedForCandidate(item.entry, item.alias || matchedValue, source, matchStart, matchEnd)
  ));
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

// Lightweight active-term registry. The previous implementation attached a
// window event listener for every rendered glossary term; on dense clinical
// screens this created avoidable main-thread work whenever a tooltip opened.
// This registry keeps the same sibling-close behavior with one direct close
// call per nesting level instead of broadcasting to every term on the page.
const ACTIVE_GLOSSARY_TERM_BY_LEVEL = new Map();

function activateGlossaryTerm(id, nestingLevel, closeFn) {
  const key = String(Number(nestingLevel || 0));
  const previous = ACTIVE_GLOSSARY_TERM_BY_LEVEL.get(key);
  if (previous && previous.id !== id) previous.close?.();
  ACTIVE_GLOSSARY_TERM_BY_LEVEL.set(key, { id, close: closeFn });
}

function deactivateGlossaryTerm(id, nestingLevel) {
  const key = String(Number(nestingLevel || 0));
  const current = ACTIVE_GLOSSARY_TERM_BY_LEVEL.get(key);
  if (current?.id === id) ACTIVE_GLOSSARY_TERM_BY_LEVEL.delete(key);
}

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
    new Map(aliasEntries.map((item) => [`${item.normalized}::${item.alias}::${item.entry.id || item.entry.term}`, item])).values(),
  ).sort(compareAliasSpecificity);

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

  aliasMap.forEach((items, key) => {
    items.sort(compareAliasSpecificity);
    aliasMap.set(key, items);
  });

  const matcher = {
    regex: new RegExp(`(^|[^\\p{L}\\p{N}_])(${pattern})(${TURKISH_SUFFIX_PATTERN})?(?=$|[^\\p{L}\\p{N}_])`, 'giu'),
    aliasMap,
  };
  MATCHER_CACHE.set(terms, matcher);
  return matcher;
}

function splitByGlossary(text = '', terms = [], maxTerms = DEFAULT_MAX_TERMS_PER_TEXT, excludedTermKeys = null, contextMode = 'default') {
  const source = String(text);
  const limit = Number.isFinite(maxTerms) ? Math.max(0, maxTerms) : DEFAULT_MAX_TERMS_PER_TEXT;
  if (!source || !Array.isArray(terms) || !terms.length || limit <= 0 || !isLikelyGlossaryCandidateText(source)) return [{ type: 'text', value: source }];

  const excludedKey = Array.isArray(excludedTermKeys) && excludedTermKeys.length
    ? excludedTermKeys.map((item) => normalizeGlossaryText(item)).filter(Boolean).sort().join('|')
    : '';
  const excludedSet = excludedKey ? new Set(excludedKey.split('|').filter(Boolean)) : null;
  const cacheKey = `${getTermsSignature(terms)}::${contextMode}::${limit}::${excludedKey}::${source}`;
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
    const visibleValue = `${baseValue}${suffixValue || ''}`;
    const matchStart = match.index + prefix.length;
    const baseEnd = matchStart + baseValue.length;
    const fullTermEnd = matchStart + visibleValue.length;

    if (matchStart > lastIndex) parts.push({ type: 'text', value: source.slice(lastIndex, matchStart) });

    const entry = suffixIsValid
      ? resolveGlossaryEntryForMatch(matcher, baseValue, source, matchStart, baseEnd, protectedUnitRanges, excludedSet)
      : null;
    const canonical = normalizeGlossaryText(entry?.term || baseValue);

    if (entry && usedTerms.size < limit && !usedTerms.has(canonical)) {
      parts.push({ type: 'term', value: visibleValue, entry });
      usedTerms.add(canonical);
    } else {
      // If a short alias/prefix was rejected, keep the entire consumed word as
      // one plain segment. Otherwise Turkish profile words can be visually split
      // into artificial spans such as "ac" + "il" or "erk" + "ek".
      parts.push({ type: 'text', value: visibleValue });
    }
    lastIndex = fullTermEnd;
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

function computeFloatingPosition(referenceEl, floatingEl, nestingLevel = 0) {
  const viewport = getViewportSize();
  const reference = getAnchorRect(referenceEl);

  const maxWidth = Math.max(220, Math.min(MAX_TOOLTIP_WIDTH, viewport.width - VIEWPORT_PADDING * 2));
  const maxViewportHeight = Math.max(120, viewport.height - VIEWPORT_PADDING * 2);

  // Measure the natural tooltip size first. The previous implementation relied
  // on a static CSS max-height, so tooltips could still extend below flashcard
  // screens that intentionally do not have page-level scroll.
  floatingEl.style.maxWidth = `${maxWidth}px`;
  floatingEl.style.width = 'max-content';
  floatingEl.style.whiteSpace = 'normal';
  floatingEl.style.maxHeight = `${maxViewportHeight}px`;

  const measured = floatingEl.getBoundingClientRect();
  const floatingWidth = Math.min(Math.max(measured.width || 260, 220), maxWidth);
  const naturalHeight = Math.max(measured.height || 72, 48);
  const absoluteMaxHeight = Math.min(naturalHeight, maxViewportHeight, 720);
  const referenceCenterX = reference.left + reference.width / 2;
  const referenceCenterY = reference.top + reference.height / 2;

  // Nested cards read better when they open laterally if there is room. This
  // also prevents nested glossary previews in the Hap Bilgi screen from being
  // pushed below the viewport while keeping the flashcard area scrollbar-free.
  if (Number(nestingLevel || 0) > 0) {
    const spaceRight = viewport.width - reference.right - TOOLTIP_GAP - VIEWPORT_PADDING;
    const spaceLeft = reference.left - TOOLTIP_GAP - VIEWPORT_PADDING;
    const canUseRight = spaceRight >= Math.min(floatingWidth, 260);
    const canUseLeft = spaceLeft >= Math.min(floatingWidth, 260);

    if (canUseRight || canUseLeft) {
      const placement = canUseRight || spaceRight >= spaceLeft ? 'right' : 'left';
      const maxHeight = Math.max(120, Math.min(absoluteMaxHeight, maxViewportHeight));
      const left = placement === 'right'
        ? Math.min(reference.right + TOOLTIP_GAP, viewport.width - floatingWidth - VIEWPORT_PADDING)
        : Math.max(VIEWPORT_PADDING, reference.left - floatingWidth - TOOLTIP_GAP);
      const top = clamp(
        referenceCenterY - Math.min(naturalHeight, maxHeight) / 2,
        VIEWPORT_PADDING,
        viewport.height - Math.min(naturalHeight, maxHeight) - VIEWPORT_PADDING,
      );
      const arrowY = clamp(referenceCenterY - top, 18, Math.min(naturalHeight, maxHeight) - 18);

      return {
        left,
        top,
        placement,
        arrowX: placement === 'right' ? 0 : floatingWidth,
        arrowY,
        maxWidth,
        maxHeight,
      };
    }
  }

  const topSpace = Math.max(0, reference.top - SAFE_TOP_PADDING - TOOLTIP_GAP);
  const bottomSpace = Math.max(0, viewport.height - reference.bottom - VIEWPORT_PADDING - TOOLTIP_GAP);
  const preferredPlacement = bottomSpace >= Math.min(absoluteMaxHeight, 240) || bottomSpace >= topSpace
    ? 'bottom'
    : 'top';
  const availableOnPreferredSide = preferredPlacement === 'bottom' ? bottomSpace : topSpace;
  const availableOnOtherSide = preferredPlacement === 'bottom' ? topSpace : bottomSpace;
  const placement = availableOnPreferredSide >= Math.min(absoluteMaxHeight, 140) || availableOnPreferredSide >= availableOnOtherSide
    ? preferredPlacement
    : preferredPlacement === 'bottom' ? 'top' : 'bottom';
  const availableHeight = Math.max(0, placement === 'bottom' ? bottomSpace : topSpace);
  const maxHeight = Math.max(120, Math.min(absoluteMaxHeight, Math.max(availableHeight, 120), maxViewportHeight));
  const effectiveHeight = Math.min(naturalHeight, maxHeight);

  const desiredLeft = referenceCenterX - floatingWidth / 2;
  const left = clamp(
    desiredLeft,
    VIEWPORT_PADDING,
    viewport.width - floatingWidth - VIEWPORT_PADDING,
  );

  const rawTop = placement === 'top'
    ? reference.top - effectiveHeight - TOOLTIP_GAP
    : reference.bottom + TOOLTIP_GAP;

  const top = clamp(rawTop, VIEWPORT_PADDING, viewport.height - effectiveHeight - VIEWPORT_PADDING);
  const arrowX = clamp(referenceCenterX - left, 18, floatingWidth - 18);

  return {
    left,
    top,
    placement,
    arrowX,
    arrowY: placement === 'top' ? effectiveHeight : 0,
    maxWidth,
    maxHeight,
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
    arrowY: 24,
    maxWidth: MAX_TOOLTIP_WIDTH,
    maxHeight: 520,
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
    const nextPosition = computeFloatingPosition(referenceEl, floatingEl, nestingLevel);
    setPosition(nextPosition);
    setIsPositioned(true);
  }, [triggerRef, nestingLevel]);

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
      data-reveal-mode={GLOSSARY_EXPLANATION_MODE}
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
        '--tooltip-arrow-top': `${position.arrowY}px`,
        '--tooltip-max-height': `${position.maxHeight}px`,
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


const PREANSWER_LEAKAGE_PATTERNS = [
  /\b(?:ilk|öncelikli|en uygun|en olası|kesin|klasik|tipik|patognomonik)\s+(?:tedavi|yaklaşım|basamak|tanı|etken|bulgu|ipucu|seçenek|yanıt)\b/iu,
  /\b(?:düşündürür|destekler|ayırt ettirir|tanı koydurur|tanısını destekler|tedavisi|verilmelidir|uygulanmalıdır|başlanmalıdır)\b/iu,
  /\b(?:TUS|soru|sınav)\s+(?:ipucu|notu|odağı)\b/iu,
  /\b(?:varsa|birlikteliği|kombinasyonu)\s+(?:.*?)(?:düşündürür|gösterir|destekler)\b/iu,
];

function hasPreAnswerLeakageSignal(value = '') {
  const text = String(value || '');
  return PREANSWER_LEAKAGE_PATTERNS.some((pattern) => pattern.test(text));
}

function neutralPreAnswerDefinition(entry = {}) {
  const category = String(entry.category || '').trim();
  const term = entry.displayTerm || entry.canonicalTerm || entry.term || 'Bu kavram';
  const normalizedCategory = category.toLocaleLowerCase('tr');

  if (/ilaç|farmakoloji|antidot|tedavi|ajan|antibiyotik|antikoagülan/.test(normalizedCategory)) {
    return `${term}, klinik yönetim veya farmakolojik tedavi bağlamında kullanılan tıbbi bir terimdir.`;
  }
  if (/hastalık|sendrom|enfeksiyon|patoloji|neoplazi|tümör|kanser/.test(normalizedCategory)) {
    return `${term}, klinik değerlendirmede tanı ve ayırıcı tanı açısından kullanılan bir hastalık/kavram adıdır.`;
  }
  if (/laboratuvar|biyokimya|asit|baz|kan gazı|parametre/.test(normalizedCategory)) {
    return `${term}, laboratuvar veya fizyolojik yorumlamada kullanılan tıbbi bir parametre/kavramdır.`;
  }
  if (/bulgu|semptom|muayene|ekg|görüntüleme/.test(normalizedCategory)) {
    return `${term}, klinik değerlendirmede anlam taşıyan bir bulgu veya işaret olarak kullanılır.`;
  }
  if (/mekanizma|fizyoloji|moleküler|genetik|immünoloji/.test(normalizedCategory)) {
    return `${term}, hastalık mekanizması veya temel bilim yorumlamasında kullanılan bilimsel bir kavramdır.`;
  }
  return `${term}, ilgili bağlamda temel tanımı ve klinik önemiyle açıklanması gereken tıbbi bir kavramdır.`;
}

function getPreAnswerDefinition(entry = {}) {
  const raw = entry.preAnswerSafeDefinition || entry.previewDefinition || entry.shortDefinition || entry.definition || '';
  if (!raw) return neutralPreAnswerDefinition(entry);
  return hasPreAnswerLeakageSignal(raw) ? neutralPreAnswerDefinition(entry) : raw;
}


function getEntryIdentityKeys(entry = {}) {
  return Array.from(new Set([
    entry.id,
    entry.term,
    entry.canonicalTerm,
    entry.displayTerm,
    entry.normalizedTerm,
    ...(Array.isArray(entry.aliases) ? entry.aliases : []),
  ].filter(Boolean).map((item) => normalizeGlossaryText(item))));
}

function getSafeNestedLabels(entry = {}) {
  return Array.from(new Set([
    ...(Array.isArray(entry.safeNestedTerms) ? entry.safeNestedTerms : []),
    ...(Array.isArray(entry.relatedTerms) ? entry.relatedTerms : []),
  ].map((item) => String(item || '').trim()).filter(Boolean)));
}

function isSameGlossaryEntry(a = {}, b = {}) {
  if (!a || !b) return false;
  if (a.id && b.id && a.id === b.id) return true;
  const aTerm = normalizeGlossaryText(a.canonicalTerm || a.displayTerm || a.term || '');
  const bTerm = normalizeGlossaryText(b.canonicalTerm || b.displayTerm || b.term || '');
  return Boolean(aTerm && bTerm && aTerm === bTerm);
}

function isExplicitNestedLabelMatch(candidate = {}, allowedKeys = new Set()) {
  if (!candidate || !allowedKeys?.size) return false;
  return getEntryIdentityKeys(candidate).some((key) => allowedKeys.has(key));
}

function sourceContainsCandidate(sourceNormalized = '', candidate = {}) {
  if (!sourceNormalized || !candidate) return false;
  const keys = getEntryIdentityKeys(candidate)
    .filter((key) => key && key.length >= 4)
    .sort((a, b) => b.length - a.length);
  return keys.some((key) => sourceNormalized.includes(key));
}

function isSafeAutoNestedCandidate(candidate = {}, parent = {}, sourceNormalized = '') {
  if (!candidate || isSameGlossaryEntry(candidate, parent)) return false;
  if (candidate.nestedGlossaryAllowed === false) return false;
  if (candidate.isGenericConcept || candidate.isContextSensitive) return false;
  const canonical = candidate.canonicalTerm || candidate.displayTerm || candidate.term || '';
  const wordCount = canonical.trim().split(/\s+/).filter(Boolean).length;
  const priority = Number(candidate.matchingPriority || 0);
  if (isGenericStandaloneAlias(canonical) && wordCount < 2) return false;
  if (wordCount < 2 && priority < 120) return false;
  return sourceContainsCandidate(sourceNormalized, candidate);
}

function buildSafeNestedTermPool(parentEntry = {}, allTerms = [], sourceText = '', options = {}) {
  const {
    revealMode = 'postAnswer',
    maxTerms = TOOLTIP_BODY_MAX_NESTED_TERMS,
    visitedEntryIds = [],
    currentDepth = 0,
    maxDepth = TOOLTIP_BODY_MAX_NESTED_DEPTH,
  } = options || {};
  if (!parentEntry || !Array.isArray(allTerms) || !allTerms.length) return [];
  if (hasReachedNestedDepthLimit(currentDepth, maxDepth)) return [];

  // Glossary is a learning layer: answer state must not reduce nested coverage.
  const labels = getSafeNestedLabels(parentEntry);
  const allowedKeys = new Set(labels.map((item) => normalizeGlossaryText(item)).filter(Boolean));
  const sourceNormalized = normalizeGlossaryText(sourceText || '');
  const selected = [];
  const selectedKeys = new Set();
  const visitedKeys = new Set(
    (Array.isArray(visitedEntryIds) ? visitedEntryIds : [])
      .map((item) => normalizeGlossaryText(item))
      .filter(Boolean),
  );

  const isVisitedCandidate = (candidate = {}) => getEntryIdentityKeys(candidate).some((key) => visitedKeys.has(key));

  const addCandidate = (candidate, explicit = false) => {
    if (!candidate || isSameGlossaryEntry(candidate, parentEntry)) return;
    if (isVisitedCandidate(candidate)) return;
    if (candidate.nestedGlossaryAllowed === false && !explicit) return;
    const keys = getEntryIdentityKeys(candidate);
    if (!keys.length || keys.some((key) => selectedKeys.has(key))) return;
    if (!sourceContainsCandidate(sourceNormalized, candidate)) return;
    if (!explicit && !isSafeAutoNestedCandidate(candidate, parentEntry, sourceNormalized)) return;
    if (explicit && (candidate.isGenericConcept || candidate.isContextSensitive)) {
      const canonical = candidate.canonicalTerm || candidate.displayTerm || candidate.term || '';
      const wordCount = canonical.trim().split(/\s+/).filter(Boolean).length;
      // Tooltip/toolbox body mode is stricter than normal text: a one-word
      // ambiguous/general concept must not be nested unless the entry explicitly
      // opts into safe standalone nesting. Specific phrases remain allowed.
      if (wordCount < 2 && candidate.allowNestedStandalone !== true) return;
      if (wordCount < 2 && isAmbiguousStandaloneAlias(canonical) && candidate.allowNestedStandalone !== true) return;
    }
    selected.push(candidate);
    keys.forEach((key) => selectedKeys.add(key));
  };

  // 1) Explicit safeNestedTerms / relatedTerms are the safest source of nested links.
  allTerms.forEach((candidate) => {
    if (isExplicitNestedLabelMatch(candidate, allowedKeys)) addCandidate(candidate, true);
  });

  // 2) If the entry has only a sparse relation list, add a few high-priority,
  // multi-word terms that literally occur in the explanation. This restores
  // learning coverage without allowing broad standalone words to hijack tooltips.
  if (selected.length < maxTerms) {
    [...allTerms]
      .filter((candidate) => !selectedKeys.has(normalizeGlossaryText(candidate?.id || '')) && !isVisitedCandidate(candidate))
      .sort((a, b) => {
        const ap = Number(a?.matchingPriority || 0) + (a?.isMultiWordTerm ? 40 : 0);
        const bp = Number(b?.matchingPriority || 0) + (b?.isMultiWordTerm ? 40 : 0);
        return bp - ap;
      })
      .forEach((candidate) => {
        if (selected.length >= maxTerms) return;
        addCandidate(candidate, false);
      });
  }

  return selected.slice(0, maxTerms);
}

function getEntryStableId(entry = {}) {
  return normalizeGlossaryText(entry.id || entry.canonicalTerm || entry.displayTerm || entry.term || '');
}

function entryPathContains(path = [], nextEntry = {}) {
  const nextKeys = new Set(getEntryIdentityKeys(nextEntry));
  if (!nextKeys.size) return false;
  return path.some((pathEntry) => getEntryIdentityKeys(pathEntry).some((key) => nextKeys.has(key)));
}

function GlossaryBreadcrumb({ path = [], onBack, onJump }) {
  if (!Array.isArray(path) || path.length <= 1) return null;
  return (
    <span className="smart-glossary-breadcrumb" aria-label="Terminoloji zinciri">
      <button
        type="button"
        className="smart-glossary-back"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onBack?.();
        }}
        aria-label="Önceki kavrama dön"
      >
        ‹
      </button>
      <span className="smart-glossary-breadcrumb-list">
        {path.map((item, index) => {
          const label = item?.displayTerm || item?.canonicalTerm || item?.term || 'Kavram';
          const isLast = index === path.length - 1;
          return (
            <span className="smart-glossary-breadcrumb-item" key={`${item?.id || label}-${index}`}>
              {index > 0 ? <span className="smart-glossary-breadcrumb-separator">›</span> : null}
              {isLast ? (
                <span className="smart-glossary-breadcrumb-current">{label}</span>
              ) : (
                <button
                  type="button"
                  className="smart-glossary-breadcrumb-link"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onJump?.(index);
                  }}
                >
                  {label}
                </button>
              )}
            </span>
          );
        })}
      </span>
    </span>
  );
}

function GlossaryCard({
  entry,
  revealMode = 'postAnswer',
  excludedTermKeys = [],
  nestingLevel = 0,
  maxNestedDepth = TOOLTIP_BODY_MAX_NESTED_DEPTH,
  visitedEntryIds = [],
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [entry]);

  const currentEntry = entry || {};
  const currentDepth = Math.max(0, Number(nestingLevel || 0));
  const isPreAnswer = false;
  const previewDefinition = currentEntry.previewDefinition || currentEntry.shortDefinition || currentEntry.definition || '';
  const shortDefinition = currentEntry.shortDefinition || previewDefinition || currentEntry.preAnswerSafeDefinition || '';
  const rawDetailed = currentEntry.postAnswerExpandedExplanation || currentEntry.postAnswerExplanation || currentEntry.detailedExplanation || currentEntry.longDefinition || '';
  const rawTusPearl = currentEntry.tusPearl || '';
  const rawDifferential = currentEntry.differentialPoint || '';
  const rawRelevance = currentEntry.clinicalRelevance || currentEntry.clinicalContext || '';
  const rawMechanism = currentEntry.mechanism || '';
  const relatedTerms = asList(currentEntry.relatedTerms).slice(0, 3);
  const cardTitle = currentEntry.displayTerm || currentEntry.canonicalTerm || currentEntry.term || '';
  const secondaryName = currentEntry.abbreviation || currentEntry.EnglishName || currentEntry.LatinName || '';

  const pathEntryIds = useMemo(() => {
    const existing = Array.isArray(visitedEntryIds) ? visitedEntryIds : [];
    return Array.from(new Set([...existing, getEntryStableId(currentEntry)].filter(Boolean)));
  }, [visitedEntryIds, currentEntry]);

  const blockedKeys = useMemo(() => {
    const next = new Set((Array.isArray(excludedTermKeys) ? excludedTermKeys : []).map((item) => normalizeGlossaryText(item)));
    pathEntryIds.forEach((key) => next.add(normalizeGlossaryText(key)));
    getEntryKeys(currentEntry).forEach((key) => next.add(key));
    return Array.from(next).filter(Boolean);
  }, [currentEntry, pathEntryIds, excludedTermKeys]);

  const baseShownValues = [shortDefinition];
  const tusPearl = !isDuplicateSection(rawTusPearl, baseShownValues) ? rawTusPearl : '';
  const differential = !isDuplicateSection(rawDifferential, [...baseShownValues, tusPearl]) ? rawDifferential : '';
  const detailed = !isDuplicateSection(rawDetailed, [...baseShownValues, tusPearl, differential]) ? rawDetailed : '';
  const relevance = !isDuplicateSection(rawRelevance, [...baseShownValues, tusPearl, differential, detailed]) ? rawRelevance : '';
  const mechanism = !isDuplicateSection(rawMechanism, [...baseShownValues, tusPearl, differential, detailed, relevance]) ? rawMechanism : '';

  const canExpand = false;
  const showFullEducationalDetail = Boolean(detailed || relevance || mechanism || relatedTerms.length);
  const nestedSourceText = [shortDefinition, tusPearl, differential, detailed, mechanism, relevance, relatedTerms.join(' ')]
    .filter(Boolean)
    .join(' ');
  const allGlossaryTerms = useMemo(() => getGlossaryTerms(), []);
  const safeNestedTerms = useMemo(() => buildSafeNestedTermPool(currentEntry, allGlossaryTerms, nestedSourceText, {
    revealMode,
    maxTerms: currentEntry.maxNestedChildren || TOOLTIP_BODY_MAX_NESTED_TERMS,
    visitedEntryIds: pathEntryIds,
    currentDepth,
    maxDepth: maxNestedDepth,
  }), [currentEntry, allGlossaryTerms, nestedSourceText, revealMode, pathEntryIds, currentDepth, maxNestedDepth]);
  const canUseNestedGlossary = canGoDeeperInNestedGlossary(currentDepth, maxNestedDepth) && safeNestedTerms.length > 0;

  const renderGlossaryInline = (value, maxTerms = TOOLTIP_BODY_MAX_NESTED_TERMS) => {
    if (!value) return null;
    if (!canUseNestedGlossary) return <span className="smart-glossary-plain-inline">{String(value)}</span>;
    return (
      <GlossaryText
        text={String(value)}
        enabled
        terms={safeNestedTerms}
        termsMode="only"
        revealMode={revealMode}
        maxTerms={maxTerms}
        excludedTermKeys={blockedKeys}
        nestingLevel={currentDepth + 1}
        contextMode={currentDepth === 0 ? 'tooltip-body' : 'nested-tooltip-body'}
        maxNestedDepth={maxNestedDepth}
        currentDepth={currentDepth + 1}
        visitedEntryIds={pathEntryIds}
        enableNestedGlossary
        navigationMode="popover"
      />
    );
  };

  return (
    <span
      className="smart-glossary-card smart-glossary-card--stacked-popover"
      data-preanswer="false"
      data-explanation-mode={GLOSSARY_EXPLANATION_MODE}
      data-nesting-level={nestingLevel}
      data-current-depth={currentDepth}
    >
      <span className="smart-glossary-header">
        <span className="smart-glossary-title-wrap">
          <strong className="smart-glossary-title">{cardTitle}</strong>
          {secondaryName && secondaryName !== cardTitle ? <small className="smart-glossary-secondary-name">{secondaryName}</small> : null}
        </span>
        <span className="smart-glossary-header-actions" aria-hidden="true" />
      </span>

      {shortDefinition ? <span className="smart-glossary-definition">{renderGlossaryInline(shortDefinition, 3)}</span> : null}

      {tusPearl ? (
        <span className="smart-glossary-row pearl"><b>TUS ipucu</b><span>{renderGlossaryInline(tusPearl)}</span></span>
      ) : null}

      {differential ? (
        <span className="smart-glossary-row differential"><b>Ayırıcı not</b><span>{renderGlossaryInline(differential)}</span></span>
      ) : null}

      {showFullEducationalDetail ? (
        <span className="smart-glossary-detail-block">
          {detailed ? <span>{renderGlossaryInline(detailed)}</span> : null}
          {mechanism ? <span><b>Mekanizma:</b> {renderGlossaryInline(mechanism)}</span> : null}
          {relevance ? <span><b>Klinik değer:</b> {renderGlossaryInline(relevance)}</span> : null}
          {relatedTerms.length ? <span className="smart-glossary-related"><b>İlgili:</b> {renderGlossaryInline(relatedTerms.join(' · '), 3)}</span> : null}
        </span>
      ) : null}
    </span>
  );
}

export function GlossaryTerm({ children, entry = null, definition = '', revealMode = 'postAnswer', excludedTermKeys = [], nestingLevel = 0, contextMode = 'default', navigationMode = 'popover', onTermNavigate = null, maxNestedDepth = TOOLTIP_BODY_MAX_NESTED_DEPTH, currentDepth = 0, visitedEntryIds = [] }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeTimerRef = useRef(0);
  const reactId = useId();
  const id = useMemo(() => `glossary-${reactId.replace(/:/g, '')}`, [reactId]);
  const resolvedEntry = entry || { term: String(children || ''), shortDefinition: definition || '' };
  const description = resolvedEntry.shortDefinition || resolvedEntry.definition || definition || '';
  const visibleTermLabel = resolvedEntry.displayTerm || resolvedEntry.canonicalTerm || resolvedEntry.term || String(children || '');

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = 0;
    }
  }, []);



  const close = useCallback(() => {
    clearCloseTimer();
    deactivateGlossaryTerm(id, nestingLevel);
    setOpen(false);
  }, [clearCloseTimer, id, nestingLevel]);

  const scheduleCloseSoon = useCallback(() => {
    if (typeof window === 'undefined') {
      deactivateGlossaryTerm(id, nestingLevel);
      setOpen(false);
      return;
    }
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      deactivateGlossaryTerm(id, nestingLevel);
      setOpen(false);
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer, id, nestingLevel]);

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
    activateGlossaryTerm(id, nestingLevel, () => {
      clearCloseTimer();
      setOpen(false);
    });
    setOpen(true);
  }, [clearCloseTimer, id, nestingLevel]);

  useEffect(() => () => {
    deactivateGlossaryTerm(id, nestingLevel);
    clearCloseTimer();
  }, [clearCloseTimer, id, nestingLevel]);


  return (
    <span
      ref={triggerRef}
      className="glossary-term smart-glossary-term"
      tabIndex={0}
      role="button"
      data-reveal-mode={GLOSSARY_EXPLANATION_MODE}
      data-glossary-entry-id={resolvedEntry?.id || ''}
      data-glossary-entry-term={visibleTermLabel}
      data-nesting-level={nestingLevel}
      data-glossary-context-mode={contextMode}
      aria-describedby={open ? id : undefined}
      aria-label={`${visibleTermLabel}: ${description}`}
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
          if (!current) {
            activateGlossaryTerm(id, nestingLevel, () => {
              clearCloseTimer();
              setOpen(false);
            });
          } else {
            deactivateGlossaryTerm(id, nestingLevel);
          }
          return !current;
        });
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          clearCloseTimer();
          setOpen((current) => {
            if (!current) {
              activateGlossaryTerm(id, nestingLevel, () => {
                clearCloseTimer();
                setOpen(false);
              });
            } else {
              deactivateGlossaryTerm(id, nestingLevel);
            }
            return !current;
          });
        }
        if (event.key === 'Escape') close();
      }}
    >
      {children}
      <FloatingTooltip
        key={`${resolvedEntry?.id || resolvedEntry?.term || visibleTermLabel}-${revealMode}-${contextMode}`}
        id={id}
        triggerRef={triggerRef}
        open={open}
        revealMode={revealMode}
        nestingLevel={nestingLevel}
        onRequestClose={close}
        onFloatingEnter={openNow}
        onFloatingLeave={scheduleCloseFromFloating}
      >
        <GlossaryCard entry={resolvedEntry} revealMode={revealMode} excludedTermKeys={excludedTermKeys} nestingLevel={nestingLevel} maxNestedDepth={maxNestedDepth} visitedEntryIds={visitedEntryIds} />
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
  contextMode = '',
  maxNestedDepth = TOOLTIP_BODY_MAX_NESTED_DEPTH,
  currentDepth = 0,
  visitedEntryIds = [],
  enableNestedGlossary = false,
  termsMode = 'augment',
  allowedNestedEntryIds = null,
  blockedNestedEntryIds = null,
  strictEntryBinding = true,
  navigationMode = 'popover',
  onTermNavigate = null,
}) {
  const excludedKey = Array.isArray(excludedTermKeys)
    ? excludedTermKeys.map((item) => normalizeGlossaryText(item)).filter(Boolean).sort().join('|')
    : '';
  const extraTermsKey = Array.isArray(extraTerms) && extraTerms.length
    ? extraTerms.map((term) => `${term?.id || ''}:${term?.term || ''}:${term?.aliases?.length || 0}`).join('|')
    : '';
  const terms = useMemo(() => {
    if (!enabled) return [];
    if (termsMode === 'only' && Array.isArray(extraTerms)) return extraTerms;
    return getGlossaryTerms(extraTerms, { branchId });
  }, [enabled, extraTermsKey, branchId, termsMode, extraTerms]);
  const effectiveMaxTerms = maxTerms ?? DEFAULT_MAX_TERMS_PER_TEXT;
  const sourceText = String(text || '');
  const effectiveContextMode = contextMode || (nestingLevel > 0 ? 'tooltip-body' : (revealMode === 'preAnswer' ? 'case-pre-answer' : 'case-post-answer'));
  const isTooltipBodyMode = effectiveContextMode === 'tooltip-body' || effectiveContextMode === 'nested-tooltip-body';
  const nestedAllowed = !isTooltipBodyMode || (enableNestedGlossary && canGoDeeperInNestedGlossary(currentDepth, maxNestedDepth));
  const effectiveExcludedTermKeys = useMemo(() => {
    const base = Array.isArray(excludedTermKeys) ? excludedTermKeys : [];
    const blocked = Array.isArray(blockedNestedEntryIds) ? blockedNestedEntryIds : [];
    const visited = Array.isArray(visitedEntryIds) ? visitedEntryIds : [];
    return [...base, ...blocked, ...visited];
  }, [excludedKey, blockedNestedEntryIds, visitedEntryIds]);
  const parts = useMemo(
    () => splitByGlossary(sourceText, enabled && nestedAllowed ? terms : [], effectiveMaxTerms, effectiveExcludedTermKeys, effectiveContextMode),
    [sourceText, enabled, nestedAllowed, terms, effectiveMaxTerms, effectiveExcludedTermKeys, effectiveContextMode],
  );

  if (!enabled) return <span className="glossary-text-flow">{sourceText}</span>;

  return (
    <span className="glossary-text-flow" data-nesting-level={nestingLevel} data-glossary-context-mode={effectiveContextMode}>
      {parts.map((part, index) => part.type === 'term' ? (
        <GlossaryTerm
          key={`${part.entry?.id || part.entry?.term || 'term'}-${part.value}-${index}`}
          entry={part.entry}
          revealMode={revealMode}
          excludedTermKeys={excludedTermKeys}
          nestingLevel={nestingLevel}
          contextMode={effectiveContextMode}
          navigationMode={navigationMode}
          onTermNavigate={onTermNavigate}
          maxNestedDepth={maxNestedDepth}
          currentDepth={currentDepth}
          visitedEntryIds={visitedEntryIds}
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
