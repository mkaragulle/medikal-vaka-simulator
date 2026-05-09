import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  getGlossaryTerms,
  getProtectedUnitRanges,
  isBlacklistedUnitToken,
  isInsideProtectedUnitRange,
  normalizeGlossaryText,
} from '../utils/glossary.js';

const MAX_TERMS_PER_TEXT = 5;
const VIEWPORT_PADDING = 12;
const SAFE_TOP_PADDING = 12;
const TOOLTIP_GAP = 8;
const MAX_TOOLTIP_WIDTH = 340;
const TOOLTIP_ROOT_ID = 'klinikiq-tooltip-layer';
const TOOLTIP_LAYER_Z = 2147483600;

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

function makeMatcher(terms = []) {
  const aliasEntries = [];
  terms.forEach((entry) => {
    const aliases = entry.aliases?.length ? entry.aliases : [entry.term];
    aliases.forEach((alias) => {
      if (!alias || isBlacklistedUnitToken(alias)) return;
      aliasEntries.push({ alias: String(alias), normalized: normalizeGlossaryText(alias), entry });
    });
  });

  const deduped = Array.from(
    new Map(aliasEntries.map((item) => [`${item.normalized}::${item.alias}::${item.entry.term}`, item])).values(),
  ).sort((a, b) => b.alias.length - a.alias.length);

  if (!deduped.length) return null;

  const pattern = deduped.map((item) => escapeRegExp(item.alias)).join('|');
  const aliasMap = deduped.reduce((map, item) => {
    const current = map.get(item.normalized) || [];
    current.push(item);
    map.set(item.normalized, current);
    return map;
  }, new Map());

  return {
    regex: new RegExp(`(^|[^\\p{L}\\p{N}_])(${pattern})(?=$|[^\\p{L}\\p{N}_])`, 'giu'),
    aliasMap,
  };
}


function splitByGlossary(text = '', terms = []) {
  const source = String(text);
  const matcher = makeMatcher(terms);
  if (!source || !matcher) return [{ type: 'text', value: source }];

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

    if (entry && usedTerms.size < MAX_TERMS_PER_TEXT && !usedTerms.has(canonical)) {
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

  const maxWidth = Math.max(180, Math.min(MAX_TOOLTIP_WIDTH, viewport.width - VIEWPORT_PADDING * 2));
  floatingEl.style.maxWidth = `${maxWidth}px`;
  floatingEl.style.width = 'max-content';
  floatingEl.style.whiteSpace = 'normal';

  const measured = floatingEl.getBoundingClientRect();
  const floatingWidth = Math.min(Math.max(measured.width || 220, 180), maxWidth);
  const floatingHeight = Math.max(measured.height || 56, 32);

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

  const arrowX = clamp(referenceCenterX - left, 14, floatingWidth - 14);

  return {
    left,
    top,
    placement,
    arrowX,
    maxWidth,
  };
}

function FloatingTooltip({ id, triggerRef, open, definition, onRequestClose }) {
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
  }, [definition, open, portalRoot, updatePosition]);

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
      className="glossary-tooltip floating-glossary-tooltip"
      role="tooltip"
      data-placement={position.placement}
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
      {definition}
    </span>,
    portalRoot,
  );
}

export function GlossaryTerm({ children, definition }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const reactId = useId();
  const id = useMemo(() => `glossary-${reactId.replace(/:/g, '')}`, [reactId]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <span
      ref={triggerRef}
      className="glossary-term"
      tabIndex={0}
      role="button"
      aria-describedby={open ? id : undefined}
      aria-label={`${children}: ${definition}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={(event) => {
        event.stopPropagation();
        setOpen((current) => !current);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setOpen((current) => !current);
        }
        if (event.key === 'Escape') setOpen(false);
      }}
    >
      {children}
      <FloatingTooltip id={id} triggerRef={triggerRef} open={open} definition={definition} onRequestClose={close} />
    </span>
  );
}

function GlossaryText({ text = '', enabled = true, terms: extraTerms = [], branchId }) {
  const terms = useMemo(() => getGlossaryTerms(extraTerms, { branchId }), [extraTerms, branchId]);
  const parts = useMemo(() => splitByGlossary(text, enabled ? terms : []), [text, enabled, terms]);

  if (!enabled) return <span className="glossary-text-flow">{text}</span>;

  return (
    <span className="glossary-text-flow">
      {parts.map((part, index) => part.type === 'term' ? (
        <GlossaryTerm key={`${part.value}-${index}`} definition={part.entry.definition}>{part.value}</GlossaryTerm>
      ) : (
        <span className="glossary-plain-segment" key={`${part.value}-${index}`}>{part.value}</span>
      ))}
    </span>
  );
}

export default GlossaryText;
