import { useEffect } from 'react';

const ROOT_CLASS = 'ki-custom-scrollbars-v367-on';
const DRAGGING_CLASS = 'ki-custom-scrollbar-v367-dragging';
const STYLE_ID = 'ki-custom-scrollbars-v367-style';
const ROOT_ATTR = 'data-ki-custom-scrollbars-v367-root';
const TRACK_ATTR = 'data-ki-custom-scrollbar-v367-track';
const THUMB_ATTR = 'data-ki-custom-scrollbar-v367-thumb';
const MAX_TRACKED_ELEMENTS = 56;
const TRACK_SIZE = 6;
const THUMB_SIZE = 3.5;
const MIN_THUMB = 24;
const EDGE_INSET = 5;
const TOP_LAYER_RECT_CACHE_MS = 160;
const POINTER_ACTIVITY_THROTTLE_MS = 240;


const TOP_LAYER_SELECTOR = [
  '#klinikiq-tooltip-layer',
  '.floating-glossary-tooltip',
  '.glossary-tooltip',
  '.smart-glossary-tooltip',
  '.smart-glossary-popover',
  '.nested-glossary-tooltip',
  '.tooltip',
  '.toolbox',
  '.popover',
  '.dropdown-menu',
  '.modal',
  '.drawer',
  '.dialog',
  '[role="dialog"]',
  '[aria-modal="true"]',
  '[data-radix-popper-content-wrapper]',
  '[data-floating-ui-portal]',
].join(', ');

function isTopLayerTarget(target) {
  if (!isHTMLElement(target)) return false;
  return Boolean(target.closest(TOP_LAYER_SELECTOR));
}

const TOP_LAYER_OCCLUSION_SELECTOR = [
  '#klinikiq-tooltip-layer .floating-glossary-tooltip',
  '.floating-glossary-tooltip',
  '.glossary-tooltip.floating-glossary-tooltip',
  '.smart-glossary-tooltip',
  '.smart-glossary-popover',
  '.nested-glossary-tooltip',
  '[role="dialog"]',
  '[aria-modal="true"]',
  '.modal',
  '.drawer',
  '.popover',
  '.dropdown-menu',
  '.toolbox',
].join(', ');

const SCROLLABLE_CANDIDATE_SELECTOR = [
  '[data-scroll-container]',
  '[data-scrollable="true"]',
  '.app-shell',
  '.page-shell',
  '.qbank-shell',
  '.qbank-content-stack',
  '.right-workspace-shell',
  '.case-list',
  '.horizontal-case-list',
  '.tus-pearl-study-shell',
  '.pearl-study-workspace-v92',
  '.tus-pearl-catalog-card-list',
  '.pearl-study-catalog-list',
  '.pearl-library-source-menu',
  '.pearl-study-branch-menu',
  '.pearl-study-more-panel',
  '.komite-mode-workspace',
  '.komite-upload-list',
  '.modal',
  '.drawer',
  '.popover',
  '.dropdown-menu',
  '[role="dialog"]',
  '[aria-modal="true"]',
  'main',
  'aside',
  'pre',
  'textarea',
].join(', ');

function rectsOverlap(a, b) {
  if (!a || !b) return false;
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function isVisibleTopLayerElement(element) {
  if (!(element instanceof HTMLElement)) return false;
  if (element.closest(`[${ROOT_ATTR}]`)) return false;
  const style = window.getComputedStyle(element);
  if (!style || style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
  const rect = element.getBoundingClientRect();
  if (rect.width < 8 || rect.height < 8) return false;
  if (rect.bottom < 0 || rect.right < 0 || rect.top > window.innerHeight || rect.left > window.innerWidth) return false;
  return true;
}

let cachedTopLayerRects = [];
let cachedTopLayerRectsAt = 0;

function getVisibleTopLayerRects() {
  const now = window.performance?.now?.() || Date.now();
  if (now - cachedTopLayerRectsAt < TOP_LAYER_RECT_CACHE_MS) return cachedTopLayerRects;

  cachedTopLayerRectsAt = now;
  cachedTopLayerRects = Array.from(document.querySelectorAll(TOP_LAYER_OCCLUSION_SELECTOR))
    .filter(isVisibleTopLayerElement)
    .map((layer) => ({ layer, rect: layer.getBoundingClientRect() }));
  return cachedTopLayerRects;
}

function resetTopLayerRectCache() {
  cachedTopLayerRectsAt = 0;
  cachedTopLayerRects = [];
}

function isCoveredByTopLayer(trackRect, target) {
  if (!trackRect) return false;
  if (target !== window && isTopLayerTarget(target)) return false;
  const topLayers = getVisibleTopLayerRects();
  for (const { layer, rect } of topLayers) {
    if (target instanceof HTMLElement && layer.contains(target)) continue;
    if (rectsOverlap(trackRect, rect)) return true;
  }
  return false;
}

const LEGACY_STYLE_IDS = [
  'ki-custom-scrollbars-v364-style',
  'ki-custom-scrollbars-v365-style',
  'ki-custom-scrollbars-v366-style',
  'ki-custom-scrollbars-v367-style',
];

const LEGACY_ROOT_SELECTORS = [
  '[data-ki-custom-scrollbars-v364-root="true"]',
  '[data-ki-custom-scrollbars-v365-root="true"]',
  '[data-ki-custom-scrollbars-v366-root]',
  '[data-ki-custom-scrollbars-v366-root="true"]',
  '[data-ki-custom-scrollbars-v367-root]',
  '[data-ki-custom-scrollbars-v367-root="true"]',
].join(', ');

const LEGACY_CLASSES = [
  'ki-custom-scrollbars-v364-on',
  'ki-custom-scrollbar-v364-dragging',
  'ki-custom-scrollbars-v365-on',
  'ki-custom-scrollbar-v365-dragging',
  'ki-custom-scrollbars-v366-on',
  'ki-custom-scrollbar-v366-dragging',
  'ki-custom-scrollbars-v367-on',
  'ki-custom-scrollbar-v367-dragging',
];

function isHTMLElement(value) {
  return value instanceof HTMLElement;
}

function clamp(value, min, max) {
  if (max < min) return min;
  return Math.min(max, Math.max(min, value));
}


function setStyleIfChanged(element, property, value) {
  if (!element || element.style[property] === value) return;
  element.style[property] = value;
}

function getDocumentScrollHeight() {
  const doc = document.documentElement;
  const body = document.body;
  return Math.max(
    doc?.scrollHeight || 0,
    body?.scrollHeight || 0,
    doc?.offsetHeight || 0,
    body?.offsetHeight || 0,
  );
}

function getDocumentScrollWidth() {
  const doc = document.documentElement;
  const body = document.body;
  return Math.max(
    doc?.scrollWidth || 0,
    body?.scrollWidth || 0,
    doc?.offsetWidth || 0,
    body?.offsetWidth || 0,
  );
}

function resolveIsDarkTheme() {
  const htmlTheme = document.documentElement?.dataset?.theme;
  const bodyTheme = document.body?.dataset?.theme;
  const shellTheme = document.querySelector('.app-shell')?.getAttribute('data-theme');
  const storedTheme = (() => {
    try {
      return window.localStorage?.getItem('klinikiq-theme-v1');
    } catch {
      return null;
    }
  })();

  const values = [htmlTheme, bodyTheme, shellTheme, storedTheme].map((value) => String(value || '').toLowerCase());
  if (values.includes('dark')) return true;
  if (values.includes('light')) return false;
  return Boolean(window.matchMedia?.('(prefers-color-scheme: dark)')?.matches);
}

function canScrollElement(element, axis) {
  if (!isHTMLElement(element)) return false;
  if (element.closest(`[${ROOT_ATTR}]`)) return false;
  if (element === document.body || element === document.documentElement) return false;

  const style = window.getComputedStyle(element);
  if (!style || style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;

  const overflow = axis === 'y' ? style.overflowY : style.overflowX;
  if (!/auto|scroll|overlay/i.test(overflow || '')) return false;

  if (axis === 'y') return element.scrollHeight > element.clientHeight + 2;
  return element.scrollWidth > element.clientWidth + 2;
}

function isVisibleEnough(element) {
  const rect = element.getBoundingClientRect();
  if (rect.width < 90 || rect.height < 72) return false;
  if (rect.bottom < 0 || rect.right < 0) return false;
  if (rect.top > window.innerHeight || rect.left > window.innerWidth) return false;
  return true;
}

function getLikelyScrollableCandidates() {
  const candidates = new Set();
  document.querySelectorAll(SCROLLABLE_CANDIDATE_SELECTOR).forEach((node) => {
    if (isHTMLElement(node)) candidates.add(node);
  });

  let activeNode = document.activeElement;
  while (isHTMLElement(activeNode) && activeNode !== document.body && activeNode !== document.documentElement) {
    candidates.add(activeNode);
    activeNode = activeNode.parentElement;
  }

  return Array.from(candidates);
}

function getTargetMetrics(target) {
  if (target === window) {
    return {
      rect: {
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      scrollTop: window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0,
      scrollLeft: window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
      scrollHeight: getDocumentScrollHeight(),
      scrollWidth: getDocumentScrollWidth(),
      clientHeight: window.innerHeight,
      clientWidth: window.innerWidth,
    };
  }

  const rect = target.getBoundingClientRect();
  return {
    rect,
    scrollTop: target.scrollTop,
    scrollLeft: target.scrollLeft,
    scrollHeight: target.scrollHeight,
    scrollWidth: target.scrollWidth,
    clientHeight: target.clientHeight,
    clientWidth: target.clientWidth,
  };
}

function scrollTargetTo(target, axis, value) {
  if (target === window) {
    if (axis === 'y') window.scrollTo({ top: value, left: window.scrollX, behavior: 'auto' });
    else window.scrollTo({ left: value, top: window.scrollY, behavior: 'auto' });
    return;
  }

  if (axis === 'y') target.scrollTop = value;
  else target.scrollLeft = value;
}

function createScrollbarNode(axis) {
  const track = document.createElement('div');
  track.setAttribute(TRACK_ATTR, axis);
  track.setAttribute('data-cursor', 'interactive');
  track.className = `ki-custom-scrollbar-v367-track ki-custom-scrollbar-v367-track-${axis}`;

  const thumb = document.createElement('div');
  thumb.setAttribute(THUMB_ATTR, axis);
  thumb.setAttribute('data-cursor', 'interactive');
  thumb.className = `ki-custom-scrollbar-v367-thumb ki-custom-scrollbar-v367-thumb-${axis}`;

  track.appendChild(thumb);
  return { track, thumb };
}

export default function KlinikIQCustomScrollbars() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    LEGACY_STYLE_IDS.forEach((id) => document.getElementById(id)?.remove());
    document.querySelectorAll(LEGACY_ROOT_SELECTORS).forEach((node) => node.remove());
    document.documentElement.classList.remove(...LEGACY_CLASSES);

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
html.${ROOT_CLASS},
html.${ROOT_CLASS} body,
html.${ROOT_CLASS} * {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

html.${ROOT_CLASS}::-webkit-scrollbar,
html.${ROOT_CLASS} body::-webkit-scrollbar,
html.${ROOT_CLASS} *::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
  background: transparent !important;
}

[${ROOT_ATTR}] {
  position: fixed !important;
  inset: 0 !important;
  pointer-events: none !important;
  contain: layout style paint;
  color-scheme: light dark;
  --ki-scrollbar-thumb-idle: rgba(15, 118, 110, 0.20);
  --ki-scrollbar-thumb-active: rgba(15, 118, 110, 0.44);
  --ki-scrollbar-track-active: rgba(15, 118, 110, 0.035);
}

[${ROOT_ATTR}="base"] {
  z-index: 1200 !important;
}

[${ROOT_ATTR}="overlay"] {
  z-index: 2147483625 !important;
}

[${ROOT_ATTR}].is-dark {
  --ki-scrollbar-thumb-idle: rgba(125, 211, 200, 0.24);
  --ki-scrollbar-thumb-active: rgba(153, 246, 228, 0.50);
  --ki-scrollbar-track-active: rgba(125, 211, 200, 0.045);
}

.ki-custom-scrollbar-v367-track {
  position: fixed !important;
  pointer-events: auto !important;
  border-radius: 999px !important;
  background: transparent !important;
  opacity: 1 !important;
  user-select: none !important;
  touch-action: none !important;
  cursor: none !important;
  transition: background-color 90ms linear, opacity 90ms linear;
  will-change: transform, width, height;
}

.ki-custom-scrollbar-v367-track:hover,
.ki-custom-scrollbar-v367-track.is-active,
.ki-custom-scrollbar-v367-track.is-dragging {
  background: var(--ki-scrollbar-track-active) !important;
}

.ki-custom-scrollbar-v367-track-y {
  width: ${TRACK_SIZE}px !important;
  min-height: 28px !important;
}

.ki-custom-scrollbar-v367-track-x {
  height: ${TRACK_SIZE}px !important;
  min-width: 28px !important;
}

.ki-custom-scrollbar-v367-thumb {
  position: absolute !important;
  border-radius: 999px !important;
  background: var(--ki-scrollbar-thumb-idle) !important;
  box-shadow: none !important;
  cursor: none !important;
  transition: background-color 90ms linear, opacity 90ms linear;
  will-change: transform, width, height;
}

.ki-custom-scrollbar-v367-track:hover .ki-custom-scrollbar-v367-thumb,
.ki-custom-scrollbar-v367-track.is-active .ki-custom-scrollbar-v367-thumb,
.ki-custom-scrollbar-v367-track.is-dragging .ki-custom-scrollbar-v367-thumb {
  background: var(--ki-scrollbar-thumb-active) !important;
}

.ki-custom-scrollbar-v367-thumb-y {
  left: 1.25px !important;
  width: ${THUMB_SIZE}px !important;
  min-height: ${MIN_THUMB}px !important;
}

.ki-custom-scrollbar-v367-thumb-x {
  top: 1.25px !important;
  height: ${THUMB_SIZE}px !important;
  min-width: ${MIN_THUMB}px !important;
}

html.${DRAGGING_CLASS},
html.${DRAGGING_CLASS} body,
html.${DRAGGING_CLASS} * {
  user-select: none !important;
}
`;
    document.head.appendChild(style);

    const baseRoot = document.createElement('div');
    baseRoot.setAttribute(ROOT_ATTR, 'base');
    baseRoot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(baseRoot);

    const overlayRoot = document.createElement('div');
    overlayRoot.setAttribute(ROOT_ATTR, 'overlay');
    overlayRoot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlayRoot);

    const roots = [baseRoot, overlayRoot];
    document.documentElement.classList.add(ROOT_CLASS);

    const resolveRootForTarget = (target) => (target !== window && isTopLayerTarget(target) ? overlayRoot : baseRoot);

    const entries = [];
    const scanTimeouts = new Set();
    let rafId = 0;
    let scanTimer = 0;
    let activeUntil = 0;
    let isDragging = false;
    let resizeObserver = null;
    let nextPointerActivityAt = 0;

    const markActive = (duration = 1200) => {
      activeUntil = Date.now() + duration;
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const isDark = resolveIsDarkTheme();
        roots.forEach((node) => node.classList.toggle('is-dark', isDark));
        const active = Date.now() < activeUntil;
        for (const entry of entries) updateEntry(entry, active);
      });
    };

    const updateEntry = (entry, forceActive = false) => {
      const { target, axis, track, thumb } = entry;
      const metrics = getTargetMetrics(target);
      const { rect } = metrics;
      const isVertical = axis === 'y';
      const maxScroll = isVertical
        ? metrics.scrollHeight - metrics.clientHeight
        : metrics.scrollWidth - metrics.clientWidth;

      if (
        maxScroll <= 1 ||
        rect.width <= 0 ||
        rect.height <= 0 ||
        rect.bottom < 0 ||
        rect.right < 0 ||
        rect.top > window.innerHeight ||
        rect.left > window.innerWidth
      ) {
        setStyleIfChanged(track, 'display', 'none');
        return;
      }

      setStyleIfChanged(track, 'display', 'block');
      const isWindowTarget = target === window;

      if (isVertical) {
        const visibleTop = isWindowTarget ? EDGE_INSET : clamp(rect.top + EDGE_INSET, EDGE_INSET, window.innerHeight - EDGE_INSET);
        const visibleBottom = isWindowTarget
          ? window.innerHeight - EDGE_INSET
          : clamp(rect.bottom - EDGE_INSET, EDGE_INSET, window.innerHeight - EDGE_INSET);
        const trackHeight = Math.max(28, visibleBottom - visibleTop);
        const trackLeft = isWindowTarget
          ? window.innerWidth - TRACK_SIZE - 2
          : clamp(rect.right - TRACK_SIZE - 1, EDGE_INSET, window.innerWidth - TRACK_SIZE - 2);
        const thumbHeight = clamp((metrics.clientHeight / metrics.scrollHeight) * trackHeight, MIN_THUMB, trackHeight);
        const usable = Math.max(1, trackHeight - thumbHeight);
        const thumbTop = (metrics.scrollTop / maxScroll) * usable;

        setStyleIfChanged(track, 'transform', `translate3d(${trackLeft}px, ${visibleTop}px, 0)`);
        setStyleIfChanged(track, 'width', `${TRACK_SIZE}px`);
        setStyleIfChanged(track, 'height', `${trackHeight}px`);
        setStyleIfChanged(thumb, 'transform', `translate3d(0, ${thumbTop}px, 0)`);
        setStyleIfChanged(thumb, 'left', '1.25px');
        setStyleIfChanged(thumb, 'top', '0px');
        setStyleIfChanged(thumb, 'width', `${THUMB_SIZE}px`);
        setStyleIfChanged(thumb, 'height', `${thumbHeight}px`);
        entry.trackStart = visibleTop;
        entry.trackLength = trackHeight;
        entry.thumbLength = thumbHeight;
        entry.visualRect = {
          left: trackLeft,
          right: trackLeft + TRACK_SIZE,
          top: visibleTop,
          bottom: visibleTop + trackHeight,
          width: TRACK_SIZE,
          height: trackHeight,
        };
      } else {
        const visibleLeft = isWindowTarget ? EDGE_INSET : clamp(rect.left + EDGE_INSET, EDGE_INSET, window.innerWidth - EDGE_INSET);
        const visibleRight = isWindowTarget
          ? window.innerWidth - EDGE_INSET
          : clamp(rect.right - EDGE_INSET, EDGE_INSET, window.innerWidth - EDGE_INSET);
        const trackWidth = Math.max(28, visibleRight - visibleLeft);
        const trackTop = isWindowTarget
          ? window.innerHeight - TRACK_SIZE - 2
          : clamp(rect.bottom - TRACK_SIZE - 1, EDGE_INSET, window.innerHeight - TRACK_SIZE - 2);
        const thumbWidth = clamp((metrics.clientWidth / metrics.scrollWidth) * trackWidth, MIN_THUMB, trackWidth);
        const usable = Math.max(1, trackWidth - thumbWidth);
        const thumbLeft = (metrics.scrollLeft / maxScroll) * usable;

        setStyleIfChanged(track, 'transform', `translate3d(${visibleLeft}px, ${trackTop}px, 0)`);
        setStyleIfChanged(track, 'width', `${trackWidth}px`);
        setStyleIfChanged(track, 'height', `${TRACK_SIZE}px`);
        setStyleIfChanged(thumb, 'transform', `translate3d(${thumbLeft}px, 0, 0)`);
        setStyleIfChanged(thumb, 'left', '0px');
        setStyleIfChanged(thumb, 'top', '1.25px');
        setStyleIfChanged(thumb, 'width', `${thumbWidth}px`);
        setStyleIfChanged(thumb, 'height', `${THUMB_SIZE}px`);
        entry.trackStart = visibleLeft;
        entry.trackLength = trackWidth;
        entry.thumbLength = thumbWidth;
        entry.visualRect = {
          left: visibleLeft,
          right: visibleLeft + trackWidth,
          top: trackTop,
          bottom: trackTop + TRACK_SIZE,
          width: trackWidth,
          height: TRACK_SIZE,
        };
      }

      if (!entry.isTopLayer && isCoveredByTopLayer(entry.visualRect, target)) {
        setStyleIfChanged(track, 'display', 'none');
        return;
      }

      track.classList.toggle('is-active', forceActive || track.matches(':hover') || track.classList.contains('is-dragging'));
    };

    const clearEntries = () => {
      while (entries.length) {
        const entry = entries.pop();
        entry?.cleanup?.();
      }
    };

    const createEntry = (target, axis) => {
      const { track, thumb } = createScrollbarNode(axis);
      const hostRoot = resolveRootForTarget(target);
      hostRoot.appendChild(track);
      const entry = {
        target,
        axis,
        track,
        thumb,
        trackStart: 0,
        trackLength: 0,
        thumbLength: 0,
        cleanup: null,
        isTopLayer: target !== window && isTopLayerTarget(target),
        visualRect: null,
      };

      const onScroll = () => {
        markActive(900);
        requestUpdate();
      };

      const onEnterOrMove = () => {
        markActive(900);
        requestUpdate();
      };

      const onPointerDown = (event) => startDrag(entry, event);

      track.addEventListener('pointerdown', onPointerDown, { passive: false });
      track.addEventListener('pointerenter', onEnterOrMove, { passive: true });
      track.addEventListener('pointermove', onEnterOrMove, { passive: true });

      if (target === window) window.addEventListener('scroll', onScroll, { passive: true });
      else target.addEventListener('scroll', onScroll, { passive: true });

      entry.cleanup = () => {
        track.removeEventListener('pointerdown', onPointerDown);
        track.removeEventListener('pointerenter', onEnterOrMove);
        track.removeEventListener('pointermove', onEnterOrMove);
        if (target === window) window.removeEventListener('scroll', onScroll);
        else target.removeEventListener('scroll', onScroll);
        track.remove();
      };

      entries.push(entry);
      return entry;
    };

    const scan = () => {
      if (isDragging) return;
      resetTopLayerRectCache();
      clearEntries();

      const docCanScrollY = getDocumentScrollHeight() > window.innerHeight + 2;
      const docCanScrollX = getDocumentScrollWidth() > window.innerWidth + 2;
      if (docCanScrollY) createEntry(window, 'y');
      if (docCanScrollX) createEntry(window, 'x');

      const candidates = getLikelyScrollableCandidates();
      let tracked = 0;
      for (const element of candidates) {
        if (!isHTMLElement(element)) continue;
        if (element.closest(`[${ROOT_ATTR}]`)) continue;
        if (!isVisibleEnough(element)) continue;

        const hasY = canScrollElement(element, 'y');
        const hasX = canScrollElement(element, 'x');
        if (!hasY && !hasX) continue;

        if (hasY) createEntry(element, 'y');
        if (hasX) createEntry(element, 'x');
        tracked += 1;
        if (tracked >= MAX_TRACKED_ELEMENTS) break;
      }

      markActive(1400);
      requestUpdate();
    };

    const scheduleScan = (delay = 120) => {
      if (isDragging) return;
      window.clearTimeout(scanTimer);
      scanTimer = window.setTimeout(scan, delay);
    };

    const scheduleOneShotScan = (delay) => {
      const timeoutId = window.setTimeout(() => {
        scanTimeouts.delete(timeoutId);
        scan();
      }, delay);
      scanTimeouts.add(timeoutId);
    };

    const startDrag = (entry, event) => {
      event.preventDefault();
      event.stopPropagation();
      markActive(1800);
      isDragging = true;

      const { target, axis, track, thumb } = entry;
      const isVertical = axis === 'y';
      const pointerId = event.pointerId;

      try {
        track.setPointerCapture?.(pointerId);
      } catch {
        // Some browsers do not allow pointer capture on synthetic/edge cases.
      }

      const initialThumbRect = thumb.getBoundingClientRect();
      const pointerStart = isVertical ? event.clientY : event.clientX;
      const thumbStart = isVertical ? initialThumbRect.top : initialThumbRect.left;
      let pointerOffset = pointerStart - thumbStart;
      if (event.target === track) pointerOffset = entry.thumbLength / 2;

      let pendingPointerPosition = pointerStart;
      let dragRaf = 0;

      const applyDrag = () => {
        dragRaf = 0;
        const metrics = getTargetMetrics(target);
        const maxScroll = isVertical
          ? metrics.scrollHeight - metrics.clientHeight
          : metrics.scrollWidth - metrics.clientWidth;
        if (maxScroll <= 0) return;

        const usable = Math.max(1, entry.trackLength - entry.thumbLength);
        const local = clamp(pendingPointerPosition - entry.trackStart - pointerOffset, 0, usable);
        const nextScroll = (local / usable) * maxScroll;
        scrollTargetTo(target, axis, nextScroll);
        requestUpdate();
      };

      const queueDrag = (pointerPosition) => {
        pendingPointerPosition = pointerPosition;
        if (dragRaf) return;
        dragRaf = window.requestAnimationFrame(applyDrag);
      };

      track.classList.add('is-dragging');
      document.documentElement.classList.add(DRAGGING_CLASS);
      queueDrag(pointerStart);

      const handleMove = (moveEvent) => {
        if (moveEvent.pointerId !== pointerId) return;
        moveEvent.preventDefault?.();
        markActive(1600);
        queueDrag(isVertical ? moveEvent.clientY : moveEvent.clientX);
      };

      const handleUp = (upEvent) => {
        if (upEvent?.pointerId && upEvent.pointerId !== pointerId) return;
        if (dragRaf) window.cancelAnimationFrame(dragRaf);
        dragRaf = 0;
        track.classList.remove('is-dragging');
        document.documentElement.classList.remove(DRAGGING_CLASS);
        isDragging = false;
        try {
          track.releasePointerCapture?.(pointerId);
        } catch {
          // Ignore unsupported release paths.
        }
        window.removeEventListener('pointermove', handleMove, true);
        window.removeEventListener('pointerup', handleUp, true);
        window.removeEventListener('pointercancel', handleUp, true);
        markActive(900);
        requestUpdate();
        scheduleScan(90);
      };

      window.addEventListener('pointermove', handleMove, { passive: false, capture: true });
      window.addEventListener('pointerup', handleUp, { passive: true, capture: true });
      window.addEventListener('pointercancel', handleUp, { passive: true, capture: true });
    };

    const onWindowScroll = () => {
      markActive(700);
      requestUpdate();
    };

    const onResize = () => {
      resetTopLayerRectCache();
      scheduleScan(80);
    };
    const onStorage = () => requestUpdate();
    const onPointerActivity = () => {
      if (document.visibilityState === 'hidden') return;
      const now = window.performance?.now?.() || Date.now();
      if (now < nextPointerActivityAt) return;
      nextPointerActivityAt = now + POINTER_ACTIVITY_THROTTLE_MS;
      if (!entries.length) scheduleScan(120);
      markActive(420);
      if (entries.length) requestUpdate();
    };

    const mutationObserver = new MutationObserver((mutations) => {
      if (isDragging) return;
      let shouldScan = false;
      let shouldResetTopLayerCache = false;

      for (const mutation of mutations) {
        const target = mutation.target;
        if (target instanceof Element && target.closest(`[${ROOT_ATTR}]`)) continue;

        if (mutation.type === 'childList') {
          const touchedTopLayer = [...mutation.addedNodes, ...mutation.removedNodes].some((node) => (
            node instanceof Element && (node.matches?.(TOP_LAYER_SELECTOR) || node.querySelector?.(TOP_LAYER_SELECTOR))
          ));
          shouldScan = true;
          shouldResetTopLayerCache = shouldResetTopLayerCache || touchedTopLayer;
          break;
        }

        if (mutation.type === 'attributes' && target instanceof Element) {
          const affectsTopLayer = target.matches?.(TOP_LAYER_SELECTOR) || target.closest?.(TOP_LAYER_SELECTOR);
          const affectsScrollableShell = target.matches?.('[data-scroll-container], .modal, .drawer, .popover, .dropdown-menu, .tus-pearl-catalog-card-list, .qbank-content-stack, .clinical-case, .page-shell, .app-shell');
          if (affectsTopLayer || affectsScrollableShell) {
            shouldScan = true;
            shouldResetTopLayerCache = shouldResetTopLayerCache || Boolean(affectsTopLayer);
            break;
          }
        }
      }

      if (shouldResetTopLayerCache) resetTopLayerRectCache();
      if (shouldScan) scheduleScan(220);
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme', 'open', 'aria-expanded', 'hidden'],
    });

    const themeObserver = new MutationObserver(() => requestUpdate());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => scheduleScan(60));
      resizeObserver.observe(document.documentElement);
      resizeObserver.observe(document.body);
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        scheduleScan(0);
        scheduleOneShotScan(180);
      }
    };

    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('storage', onStorage, { passive: true });
    window.addEventListener('pointermove', onPointerActivity, { passive: true });
    const handleFocus = () => scheduleScan(0);
    const handlePageShow = () => scheduleScan(0);
    window.addEventListener('focus', handleFocus, { passive: true });
    window.addEventListener('pageshow', handlePageShow, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    scan();
    scheduleOneShotScan(120);
    scheduleOneShotScan(420);
    scheduleOneShotScan(1200);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(scanTimer);
      scanTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      scanTimeouts.clear();
      mutationObserver.disconnect();
      themeObserver.disconnect();
      resizeObserver?.disconnect?.();
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('pointermove', onPointerActivity);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearEntries();
      roots.forEach((node) => node.remove());
      style.remove();
      document.documentElement.classList.remove(ROOT_CLASS, DRAGGING_CLASS);
    };
  }, []);

  return null;
}
