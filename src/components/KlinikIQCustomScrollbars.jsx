import { useEffect } from 'react';

const ROOT_CLASS = 'ki-custom-scrollbars-v364-on';
const STYLE_ID = 'ki-custom-scrollbars-v364-style';
const ROOT_ATTR = 'data-ki-custom-scrollbars-v364-root';
const TRACK_ATTR = 'data-ki-custom-scrollbar-v364-track';
const THUMB_ATTR = 'data-ki-custom-scrollbar-v364-thumb';
const MAX_TRACKED_ELEMENTS = 48;

function isHTMLElement(value) {
  return value instanceof HTMLElement;
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

function canScrollElement(element, axis) {
  if (!isHTMLElement(element)) return false;
  if (element.closest(`[${ROOT_ATTR}="true"]`)) return false;
  if (element === document.body || element === document.documentElement) return false;

  const style = window.getComputedStyle(element);
  if (!style || style.display === 'none' || style.visibility === 'hidden') return false;

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

function clamp(value, min, max) {
  if (max < min) return min;
  return Math.min(max, Math.max(min, value));
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

  if ([htmlTheme, bodyTheme, shellTheme, storedTheme].some((value) => String(value).toLowerCase() === 'dark')) return true;
  if ([htmlTheme, bodyTheme, shellTheme, storedTheme].some((value) => String(value).toLowerCase() === 'light')) return false;
  return Boolean(window.matchMedia?.('(prefers-color-scheme: dark)')?.matches);
}

function createScrollbarNode(axis) {
  const track = document.createElement('div');
  track.setAttribute(TRACK_ATTR, axis);
  track.setAttribute('data-cursor', 'interactive');
  track.className = `ki-custom-scrollbar-v364-track ki-custom-scrollbar-v364-track-${axis}`;

  const thumb = document.createElement('div');
  thumb.setAttribute(THUMB_ATTR, axis);
  thumb.setAttribute('data-cursor', 'interactive');
  thumb.className = `ki-custom-scrollbar-v364-thumb ki-custom-scrollbar-v364-thumb-${axis}`;

  track.appendChild(thumb);
  return { track, thumb };
}

export default function KlinikIQCustomScrollbars() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    document.getElementById(STYLE_ID)?.remove();
    document.querySelectorAll(`[${ROOT_ATTR}="true"]`).forEach((node) => node.remove());

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

[${ROOT_ATTR}="true"] {
  position: fixed !important;
  inset: 0 !important;
  z-index: 2147483646 !important;
  pointer-events: none !important;
  contain: layout style paint;
  color-scheme: light dark;
  --ki-scrollbar-thumb: rgba(13, 148, 136, 0.44);
  --ki-scrollbar-thumb-hover: rgba(13, 148, 136, 0.72);
  --ki-scrollbar-track-hover: rgba(13, 148, 136, 0.08);
}

[${ROOT_ATTR}="true"].is-dark {
  --ki-scrollbar-thumb: rgba(94, 234, 212, 0.44);
  --ki-scrollbar-thumb-hover: rgba(153, 246, 228, 0.76);
  --ki-scrollbar-track-hover: rgba(94, 234, 212, 0.10);
}

.ki-custom-scrollbar-v364-track {
  position: fixed !important;
  pointer-events: auto !important;
  border-radius: 999px !important;
  background: transparent !important;
  opacity: 0;
  transition: opacity 120ms ease, background-color 120ms ease;
  user-select: none !important;
  touch-action: none !important;
  cursor: none !important;
}

.ki-custom-scrollbar-v364-track.is-active,
.ki-custom-scrollbar-v364-track:hover,
.ki-custom-scrollbar-v364-track.is-dragging {
  opacity: 1;
}

.ki-custom-scrollbar-v364-track:hover,
.ki-custom-scrollbar-v364-track.is-dragging {
  background: var(--ki-scrollbar-track-hover) !important;
}

.ki-custom-scrollbar-v364-track-y {
  width: 8px !important;
  min-height: 28px !important;
}

.ki-custom-scrollbar-v364-track-x {
  height: 8px !important;
  min-width: 28px !important;
}

.ki-custom-scrollbar-v364-thumb {
  position: absolute !important;
  border-radius: 999px !important;
  background: var(--ki-scrollbar-thumb) !important;
  box-shadow: none !important;
  cursor: none !important;
  transition: background-color 120ms ease, opacity 120ms ease;
}

.ki-custom-scrollbar-v364-track:hover .ki-custom-scrollbar-v364-thumb,
.ki-custom-scrollbar-v364-track.is-dragging .ki-custom-scrollbar-v364-thumb {
  background: var(--ki-scrollbar-thumb-hover) !important;
}

.ki-custom-scrollbar-v364-thumb-y {
  left: 1px !important;
  width: 6px !important;
  min-height: 26px !important;
}

.ki-custom-scrollbar-v364-thumb-x {
  top: 1px !important;
  height: 6px !important;
  min-width: 26px !important;
}

html.ki-custom-scrollbar-v364-dragging,
html.ki-custom-scrollbar-v364-dragging body,
html.ki-custom-scrollbar-v364-dragging * {
  user-select: none !important;
}
`;
    document.head.appendChild(style);

    const root = document.createElement('div');
    root.setAttribute(ROOT_ATTR, 'true');
    root.setAttribute('aria-hidden', 'true');
    document.body.appendChild(root);
    document.documentElement.classList.add(ROOT_CLASS);

    const entries = [];
    let rafId = 0;
    let scanTimer = 0;
    let activeUntil = 0;

    const markActive = () => {
      activeUntil = Date.now() + 900;
    };

    const getTargetMetrics = (target, axis) => {
      if (target === window) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        const scrollHeight = getDocumentScrollHeight();
        const scrollWidth = getDocumentScrollWidth();
        return {
          rect: { top: 0, left: 0, right: window.innerWidth, bottom: window.innerHeight, width: window.innerWidth, height: window.innerHeight },
          scrollTop,
          scrollLeft,
          scrollHeight,
          scrollWidth,
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
    };

    const scrollTargetTo = (target, axis, value) => {
      if (target === window) {
        if (axis === 'y') window.scrollTo({ top: value, left: window.scrollX, behavior: 'auto' });
        else window.scrollTo({ left: value, top: window.scrollY, behavior: 'auto' });
        return;
      }

      if (axis === 'y') target.scrollTop = value;
      else target.scrollLeft = value;
    };

    const updateEntry = (entry) => {
      const { target, axis, track, thumb } = entry;
      const metrics = getTargetMetrics(target, axis);
      const { rect } = metrics;

      const isVertical = axis === 'y';
      const maxScroll = isVertical
        ? metrics.scrollHeight - metrics.clientHeight
        : metrics.scrollWidth - metrics.clientWidth;

      if (maxScroll <= 1 || rect.width <= 0 || rect.height <= 0 || rect.bottom < 0 || rect.right < 0 || rect.top > window.innerHeight || rect.left > window.innerWidth) {
        track.style.display = 'none';
        return;
      }

      track.style.display = 'block';
      const inset = 4;

      if (isVertical) {
        const trackHeight = Math.max(28, Math.min(rect.height - inset * 2, window.innerHeight));
        const trackTop = clamp(rect.top + inset, 4, window.innerHeight - trackHeight - 4);
        const trackLeft = clamp(rect.right - 9, 4, window.innerWidth - 10);
        const thumbHeight = clamp((metrics.clientHeight / metrics.scrollHeight) * trackHeight, 26, trackHeight);
        const thumbTop = maxScroll <= 0 ? 0 : (metrics.scrollTop / maxScroll) * Math.max(0, trackHeight - thumbHeight);

        track.style.left = `${trackLeft}px`;
        track.style.top = `${trackTop}px`;
        track.style.width = '8px';
        track.style.height = `${trackHeight}px`;
        thumb.style.left = '1px';
        thumb.style.top = `${thumbTop}px`;
        thumb.style.width = '6px';
        thumb.style.height = `${thumbHeight}px`;
        entry.trackLength = trackHeight;
        entry.thumbLength = thumbHeight;
      } else {
        const trackWidth = Math.max(28, Math.min(rect.width - inset * 2, window.innerWidth));
        const trackLeft = clamp(rect.left + inset, 4, window.innerWidth - trackWidth - 4);
        const trackTop = clamp(rect.bottom - 9, 4, window.innerHeight - 10);
        const thumbWidth = clamp((metrics.clientWidth / metrics.scrollWidth) * trackWidth, 26, trackWidth);
        const thumbLeft = maxScroll <= 0 ? 0 : (metrics.scrollLeft / maxScroll) * Math.max(0, trackWidth - thumbWidth);

        track.style.left = `${trackLeft}px`;
        track.style.top = `${trackTop}px`;
        track.style.width = `${trackWidth}px`;
        track.style.height = '8px';
        thumb.style.left = `${thumbLeft}px`;
        thumb.style.top = '1px';
        thumb.style.width = `${thumbWidth}px`;
        thumb.style.height = '6px';
        entry.trackLength = trackWidth;
        entry.thumbLength = thumbWidth;
      }

      const visible = Date.now() < activeUntil || track.matches(':hover') || track.classList.contains('is-dragging');
      track.classList.toggle('is-active', visible);
    };

    const updateAll = () => {
      rafId = 0;
      root.classList.toggle('is-dark', resolveIsDarkTheme());
      entries.forEach(updateEntry);
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateAll);
    };

    const startDrag = (entry, event) => {
      event.preventDefault();
      event.stopPropagation();
      markActive();

      const { target, axis, track, thumb } = entry;
      const isVertical = axis === 'y';
      const metrics = getTargetMetrics(target, axis);
      const maxScroll = isVertical
        ? metrics.scrollHeight - metrics.clientHeight
        : metrics.scrollWidth - metrics.clientWidth;
      if (maxScroll <= 0) return;

      const trackRect = track.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const thumbLength = isVertical ? thumbRect.height : thumbRect.width;
      const trackLength = isVertical ? trackRect.height : trackRect.width;
      const trackStart = isVertical ? trackRect.top : trackRect.left;
      const pointerStart = isVertical ? event.clientY : event.clientX;
      const thumbStart = isVertical ? thumbRect.top : thumbRect.left;
      let pointerOffset = pointerStart - thumbStart;

      if (event.target === track) {
        pointerOffset = thumbLength / 2;
      }

      const applyPointer = (pointerPosition) => {
        const usable = Math.max(1, trackLength - thumbLength);
        const local = clamp(pointerPosition - trackStart - pointerOffset, 0, usable);
        const nextScroll = (local / usable) * maxScroll;
        scrollTargetTo(target, axis, nextScroll);
        requestUpdate();
      };

      track.classList.add('is-dragging');
      document.documentElement.classList.add('ki-custom-scrollbar-v364-dragging');
      applyPointer(pointerStart);

      const handleMove = (moveEvent) => {
        markActive();
        applyPointer(isVertical ? moveEvent.clientY : moveEvent.clientX);
      };

      const handleUp = () => {
        track.classList.remove('is-dragging');
        document.documentElement.classList.remove('ki-custom-scrollbar-v364-dragging');
        window.removeEventListener('pointermove', handleMove, true);
        window.removeEventListener('pointerup', handleUp, true);
        window.removeEventListener('pointercancel', handleUp, true);
        requestUpdate();
      };

      window.addEventListener('pointermove', handleMove, true);
      window.addEventListener('pointerup', handleUp, true);
      window.addEventListener('pointercancel', handleUp, true);
    };

    const createEntry = (target, axis) => {
      const { track, thumb } = createScrollbarNode(axis);
      root.appendChild(track);
      const entry = { target, axis, track, thumb, trackLength: 0, thumbLength: 0 };

      const onScroll = () => {
        markActive();
        requestUpdate();
      };

      const onEnter = () => {
        markActive();
        requestUpdate();
      };

      track.addEventListener('pointerdown', (event) => startDrag(entry, event), { passive: false });
      track.addEventListener('pointerenter', onEnter, { passive: true });
      track.addEventListener('pointermove', onEnter, { passive: true });

      if (target === window) {
        window.addEventListener('scroll', onScroll, { passive: true });
      } else {
        target.addEventListener('scroll', onScroll, { passive: true });
      }

      entry.cleanup = () => {
        if (target === window) window.removeEventListener('scroll', onScroll);
        else target.removeEventListener('scroll', onScroll);
        track.remove();
      };

      entries.push(entry);
      return entry;
    };

    const clearEntries = () => {
      while (entries.length) {
        const entry = entries.pop();
        entry?.cleanup?.();
      }
    };

    const scan = () => {
      clearEntries();

      const docCanScrollY = getDocumentScrollHeight() > window.innerHeight + 2;
      const docCanScrollX = getDocumentScrollWidth() > window.innerWidth + 2;
      if (docCanScrollY) createEntry(window, 'y');
      if (docCanScrollX) createEntry(window, 'x');

      const candidates = Array.from(document.querySelectorAll('body *'));
      let tracked = 0;
      for (const element of candidates) {
        if (!isHTMLElement(element)) continue;
        if (element.closest(`[${ROOT_ATTR}="true"]`)) continue;
        if (!isVisibleEnough(element)) continue;

        const hasY = canScrollElement(element, 'y');
        const hasX = canScrollElement(element, 'x');
        if (!hasY && !hasX) continue;

        if (hasY) createEntry(element, 'y');
        if (hasX) createEntry(element, 'x');
        tracked += 1;
        if (tracked >= MAX_TRACKED_ELEMENTS) break;
      }

      markActive();
      requestUpdate();
    };

    const scheduleScan = (delay = 180) => {
      window.clearTimeout(scanTimer);
      scanTimer = window.setTimeout(scan, delay);
    };

    const onWindowScroll = () => {
      markActive();
      requestUpdate();
    };

    const onResize = () => scheduleScan(120);
    const onStorage = () => requestUpdate();

    const mutationObserver = new MutationObserver((mutations) => {
      const onlyScrollbarInternalChanges = mutations.every((mutation) => {
        const target = mutation.target;
        return target instanceof Element && target.closest(`[${ROOT_ATTR}="true"]`);
      });
      if (!onlyScrollbarInternalChanges) scheduleScan(320);
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'data-theme'] });

    const themeObserver = new MutationObserver(() => requestUpdate());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') scheduleScan(80);
    };

    window.addEventListener('storage', onStorage, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    scan();
    scheduleScan(600);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(scanTimer);
      mutationObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearEntries();
      root.remove();
      style.remove();
      document.documentElement.classList.remove(ROOT_CLASS, 'ki-custom-scrollbar-v364-dragging');
    };
  }, []);

  return null;
}
