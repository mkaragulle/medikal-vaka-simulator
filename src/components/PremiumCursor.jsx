import { useEffect } from 'react';

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  '[role="button"]',
  '[data-cursor]',
  '[data-clickable="true"]',
  '[tabindex]:not([tabindex="-1"])',
  'summary',
  '.glossary-term',
  '.smart-glossary-term',
  '.glossary-word',
  '.nested-glossary-term',
  '.smart-glossary-term--drilldown',
  '[data-glossary-entry-id]',
  '[data-glossary-entry-term]',
  '.case-card',
  '.branch-card',
  '.option-card',
  '.answer-option',
  '.requested-test-card',
  '.inline-order-result',
  '.result-image-link',
  '.visual-help-toggle',
  '.premium-visual-help-toggle',
  '.smart-glossary-back',
  '.smart-glossary-breadcrumb-link',
].join(', ');

const TEXT_SELECTOR = [
  'input',
  'textarea',
  'select',
  '[contenteditable="true"]',
  '[contenteditable=""]',
  '.cm-editor',
  '.monaco-editor',
  '.bottom-case-search input',
].join(', ');

const ROOT_CLASS = 'ki-pointer-v363-on';
const STYLE_ID = 'ki-pointer-v363-runtime-style';
const ROOT_ATTR = 'data-ki-pointer-v363-root';
const TRANSPARENT_CURSOR = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'1\' height=\'1\' viewBox=\'0 0 1 1\'%3E%3C/svg%3E") 0 0, none';

const LEGACY_SELECTORS = [
  '.ki-cursor',
  '.ki-cursor-v350',
  '.ki-cursor-v351',
  '.ki-unified-cursor-v352',
  '.ki-minimal-premium-cursor-v353',
  '.ki-simple-cursor-root',
  '.premium-cursor',
  '.premium-cursor-root',
  '.clinical-cursor-root',
  '.klinq-cursor-root',
  '.cursor-lens',
  '.cursor-orb',
  '.cursor-ring',
  '[data-klinq-old-cursor-root]',
  '[data-klinq-cursor-root]',
  '[data-cursor-root]',
  '[data-ki-simple-cursor-root]',
  '[data-ki-pointer-v355-root]',
  '[data-ki-pointer-v356-root]',
  '[data-ki-pointer-v357-root]',
  '[data-ki-pointer-v358-root]',
  '[data-ki-pointer-v359-root]',
  '[data-ki-pointer-v360-root]',
  '[data-ki-pointer-v361-root]',
  '[data-ki-pointer-v362-root]',
].join(', ');

const LEGACY_STYLE_IDS = [
  'ki-pointer-v355-runtime-style',
  'ki-pointer-v356-runtime-style',
  'ki-pointer-v357-runtime-style',
  'ki-pointer-v358-runtime-style',
  'ki-pointer-v359-runtime-style',
  'ki-pointer-v360-runtime-style',
  'ki-pointer-v361-runtime-style',
  'ki-pointer-v362-runtime-style',
  'ki-simple-cursor-runtime-style-v354',
  'klinikiq-minimal-premium-cursor-style-v353',
  'klinikiq-unified-premium-cursor-runtime-style-v352',
  'klinikiq-premium-cursor-runtime-style-v351',
  'klinikiq-premium-cursor-runtime-style-v350',
  'klinikiq-premium-cursor-runtime-style-v349',
  'klinikiq-premium-cursor-runtime-style-v348',
  'klinikiq-premium-cursor-runtime-style',
];

const LEGACY_ROOT_CLASSES = [
  'ki-pointer-v355-on',
  'ki-pointer-v356-on',
  'ki-pointer-v357-on',
  'ki-pointer-v358-on',
  'ki-pointer-v359-on',
  'ki-pointer-v360-on',
  'ki-pointer-v361-on',
  'ki-pointer-v362-on',
  'ki-simple-cursor-active',
  'ki-simple-cursor-pressed',
  'ki-minimal-cursor-active',
  'ki-minimal-cursor-pressed',
  'ki-unified-cursor-active',
  'ki-unified-cursor-pressed',
  'ki-premium-cursor-on',
  'ki-premium-cursor-pressed',
  'premium-cursor-active',
  'premium-cursor-enabled',
  'custom-cursor-active',
];

function isElement(value) {
  return value instanceof Element;
}

function isScrollableElement(element, axis) {
  if (!(element instanceof HTMLElement)) return false;
  const style = window.getComputedStyle(element);
  const overflow = axis === 'y' ? style.overflowY : style.overflowX;
  const canScroll = axis === 'y' ? element.scrollHeight > element.clientHeight : element.scrollWidth > element.clientWidth;
  return canScroll && /auto|scroll|overlay/i.test(overflow || '');
}

function getScrollbarHit(element, clientX, clientY) {
  if (!(element instanceof HTMLElement)) return false;
  if (element === document.body || element === document.documentElement) return false;

  const rect = element.getBoundingClientRect();
  if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return false;

  const style = window.getComputedStyle(element);
  const borderRight = Number.parseFloat(style.borderRightWidth || '0') || 0;
  const borderBottom = Number.parseFloat(style.borderBottomWidth || '0') || 0;
  const borderLeft = Number.parseFloat(style.borderLeftWidth || '0') || 0;
  const borderTop = Number.parseFloat(style.borderTopWidth || '0') || 0;

  const verticalScrollbarWidth = Math.max(0, element.offsetWidth - element.clientWidth - borderLeft - borderRight);
  const horizontalScrollbarHeight = Math.max(0, element.offsetHeight - element.clientHeight - borderTop - borderBottom);

  const hasVerticalScrollbar = isScrollableElement(element, 'y') && verticalScrollbarWidth >= 4;
  const hasHorizontalScrollbar = isScrollableElement(element, 'x') && horizontalScrollbarHeight >= 4;

  const verticalHit = hasVerticalScrollbar && clientX >= rect.right - verticalScrollbarWidth - 2;
  const horizontalHit = hasHorizontalScrollbar && clientY >= rect.bottom - horizontalScrollbarHeight - 2;

  return verticalHit || horizontalHit;
}

function isViewportScrollbarHit(clientX, clientY) {
  const doc = document.documentElement;
  const viewportVerticalScrollbarWidth = Math.max(0, window.innerWidth - doc.clientWidth);
  const viewportHorizontalScrollbarHeight = Math.max(0, window.innerHeight - doc.clientHeight);

  const verticalHit = viewportVerticalScrollbarWidth >= 4 && clientX >= doc.clientWidth - 2;
  const horizontalHit = viewportHorizontalScrollbarHeight >= 4 && clientY >= doc.clientHeight - 2;

  return verticalHit || horizontalHit;
}

function isScrollbarHit(event) {
  if (!event || typeof event.clientX !== 'number' || typeof event.clientY !== 'number') return false;
  if (isViewportScrollbarHit(event.clientX, event.clientY)) return true;

  const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
  for (const node of path) {
    if (getScrollbarHit(node, event.clientX, event.clientY)) return true;
  }

  let node = isElement(event.target) ? event.target : null;
  while (node && node !== document.body && node !== document.documentElement) {
    if (getScrollbarHit(node, event.clientX, event.clientY)) return true;
    node = node.parentElement;
  }

  return false;
}

export default function PremiumCursor() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    LEGACY_STYLE_IDS.forEach((id) => document.getElementById(id)?.remove());
    document.querySelectorAll(LEGACY_SELECTORS).forEach((node) => node.remove());
    document.querySelectorAll(`[${ROOT_ATTR}="true"]`).forEach((node) => node.remove());
    document.documentElement.classList.remove(...LEGACY_ROOT_CLASSES);
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
html.${ROOT_CLASS},
html.${ROOT_CLASS} body,
html.${ROOT_CLASS} body *:not(input):not(textarea):not(select):not([contenteditable="true"]):not([contenteditable=""]):not(.cm-editor):not(.monaco-editor) {
  cursor: ${TRANSPARENT_CURSOR} !important;
}

html.${ROOT_CLASS} input,
html.${ROOT_CLASS} textarea,
html.${ROOT_CLASS} select,
html.${ROOT_CLASS} [contenteditable="true"],
html.${ROOT_CLASS} [contenteditable=""],
html.${ROOT_CLASS} .cm-editor,
html.${ROOT_CLASS} .monaco-editor {
  cursor: text !important;
}

html.${ROOT_CLASS} *::-webkit-scrollbar,
html.${ROOT_CLASS} *::-webkit-scrollbar-thumb,
html.${ROOT_CLASS} *::-webkit-scrollbar-track,
html.${ROOT_CLASS} *::-webkit-scrollbar-corner,
html.${ROOT_CLASS} body::-webkit-scrollbar,
html.${ROOT_CLASS} body::-webkit-scrollbar-thumb,
html.${ROOT_CLASS} body::-webkit-scrollbar-track,
html.${ROOT_CLASS} body::-webkit-scrollbar-corner {
  cursor: ${TRANSPARENT_CURSOR} !important;
}

[${ROOT_ATTR}="true"] {
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  width: 34px !important;
  height: 34px !important;
  z-index: 2147483647 !important;
  pointer-events: none !important;
  display: block !important;
  visibility: visible !important;
  opacity: 0;
  transform: translate3d(-80px, -80px, 0);
  transition: opacity 70ms ease;
  contain: strict;
  background: transparent !important;
  border: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
  filter: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  mix-blend-mode: normal !important;
}

[${ROOT_ATTR}="true"].is-visible {
  opacity: 1 !important;
}

[${ROOT_ATTR}="true"].is-text,
[${ROOT_ATTR}="true"].is-scrollbar,
[${ROOT_ATTR}="true"].is-scrollbar-dragging {
  opacity: 0 !important;
}

[${ROOT_ATTR}="true"] svg {
  display: block !important;
  width: 34px !important;
  height: 34px !important;
  overflow: visible !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  filter: none !important;
}

.premium-cursor,
.premium-cursor-root,
.clinical-cursor-root,
.klinq-cursor-root,
.cursor-lens,
.cursor-orb,
.cursor-ring,
.ki-cursor,
.ki-cursor-v350,
.ki-cursor-v351,
.ki-unified-cursor-v352,
.ki-minimal-premium-cursor-v353,
.ki-simple-cursor-root,
[data-klinq-old-cursor-root],
[data-klinq-cursor-root],
[data-cursor-root],
[data-ki-simple-cursor-root],
[data-ki-pointer-v355-root],
[data-ki-pointer-v356-root],
[data-ki-pointer-v357-root],
[data-ki-pointer-v358-root],
[data-ki-pointer-v359-root],
[data-ki-pointer-v360-root],
[data-ki-pointer-v361-root],
[data-ki-pointer-v362-root] {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
`;
    document.head.appendChild(style);

    const root = document.createElement('div');
    root.setAttribute(ROOT_ATTR, 'true');
    root.setAttribute('aria-hidden', 'true');
    root.style.cssText = [
      'position:fixed',
      'left:0',
      'top:0',
      'width:34px',
      'height:34px',
      'z-index:2147483647',
      'pointer-events:none',
      'display:block',
      'visibility:visible',
      'opacity:0',
      'transform:translate3d(-80px,-80px,0)',
      'transition:opacity 70ms ease',
      'contain:strict',
      'background:transparent',
      'border:0',
      'outline:0',
      'box-shadow:none',
      'filter:none',
      'backdrop-filter:none',
      '-webkit-backdrop-filter:none',
      'mix-blend-mode:normal',
    ].join(';');

    root.innerHTML = `
<svg viewBox="0 0 34 34" width="34" height="34" aria-hidden="true" focusable="false" style="display:block;width:34px;height:34px;overflow:visible;background:transparent;border:0;box-shadow:none;filter:none;">
  <circle data-ki-pointer-ring="true" cx="17" cy="17" r="8.25" fill="none" stroke="rgba(13,148,136,0.94)" stroke-width="1.65" vector-effect="non-scaling-stroke"></circle>
  <circle data-ki-pointer-dot="true" cx="17" cy="17" r="2.25" fill="rgba(13,148,136,0.98)"></circle>
</svg>`;

    document.body.appendChild(root);

    const ring = root.querySelector('[data-ki-pointer-ring="true"]');
    const dot = root.querySelector('[data-ki-pointer-dot="true"]');

    let currentX = -80;
    let currentY = -80;
    let targetX = -80;
    let targetY = -80;
    let frameId = 0;
    let started = false;
    let isInteractive = false;
    let isText = false;
    let isPressed = false;
    let isDarkTheme = false;
    let isOverScrollbar = false;
    let isScrollbarDragging = false;

    const lightPalette = {
      ring: 'rgba(13,148,136,0.94)',
      ringInteractive: 'rgba(15,118,110,0.98)',
      dot: 'rgba(13,148,136,0.98)',
      dotInteractive: 'rgba(15,118,110,0.98)',
    };

    const darkPalette = {
      ring: 'rgba(94,234,212,0.96)',
      ringInteractive: 'rgba(153,246,228,1)',
      dot: 'rgba(45,212,191,0.98)',
      dotInteractive: 'rgba(153,246,228,1)',
    };

    const resolveIsDarkTheme = () => {
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
    };

    const setVisibilityForMode = () => {
      root.classList.toggle('is-text', isText);
      root.classList.toggle('is-scrollbar', isOverScrollbar);
      root.classList.toggle('is-scrollbar-dragging', isScrollbarDragging);

      if (isText || isOverScrollbar || isScrollbarDragging) {
        root.classList.remove('is-visible');
      } else if (started) {
        root.classList.add('is-visible');
      }
    };

    const setPointerVisual = () => {
      if (!ring || !dot) return;

      isDarkTheme = resolveIsDarkTheme();
      const palette = isDarkTheme ? darkPalette : lightPalette;

      root.classList.toggle('is-interactive', isInteractive && !isText && !isOverScrollbar && !isScrollbarDragging);
      root.classList.toggle('is-pressed', isPressed && !isText && !isOverScrollbar && !isScrollbarDragging);
      root.classList.toggle('is-dark-theme', isDarkTheme);

      if (isText || isOverScrollbar || isScrollbarDragging) {
        ring.setAttribute('r', '8.25');
        ring.setAttribute('stroke-width', '1.65');
        ring.setAttribute('stroke', palette.ring);
        dot.setAttribute('r', '2.25');
        dot.setAttribute('fill', palette.dot);
        setVisibilityForMode();
        return;
      }

      if (isInteractive) {
        ring.setAttribute('r', isPressed ? '10.0' : '10.75');
        ring.setAttribute('stroke-width', '1.75');
        ring.setAttribute('stroke', palette.ringInteractive);
        dot.setAttribute('r', isPressed ? '1.75' : '1.9');
        dot.setAttribute('fill', palette.dotInteractive);
      } else {
        ring.setAttribute('r', isPressed ? '7.5' : '8.25');
        ring.setAttribute('stroke-width', '1.65');
        ring.setAttribute('stroke', palette.ring);
        dot.setAttribute('r', isPressed ? '1.9' : '2.25');
        dot.setAttribute('fill', palette.dot);
      }

      setVisibilityForMode();
    };

    const updateMode = (target) => {
      if (!isElement(target)) return;
      isText = Boolean(target.closest(TEXT_SELECTOR));
      isInteractive = !isText && Boolean(target.closest(INTERACTIVE_SELECTOR));
      setPointerVisual();
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.46;
      currentY += (targetY - currentY) * 0.46;
      root.style.transform = `translate3d(${currentX - 17}px, ${currentY - 17}px, 0)`;
      frameId = window.requestAnimationFrame(render);
    };

    const activate = () => {
      if (started) return;
      started = true;
      currentX = targetX;
      currentY = targetY;
      root.style.transform = `translate3d(${currentX - 17}px, ${currentY - 17}px, 0)`;
      document.documentElement.classList.add(ROOT_CLASS);
      setVisibilityForMode();
      frameId = window.requestAnimationFrame(render);
    };

    const move = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      activate();

      isOverScrollbar = isScrollbarDragging || isScrollbarHit(event);
      updateMode(event.target);
    };

    const hide = () => {
      root.classList.remove('is-visible');
    };

    const recoverCursor = () => {
      if (!document.body.contains(root)) {
        document.body.appendChild(root);
      }

      if (!started) return;

      document.documentElement.classList.add(ROOT_CLASS);
      setPointerVisual();

      if (!frameId) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const show = () => {
      recoverCursor();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hide();
        return;
      }

      window.setTimeout(recoverCursor, 0);
      window.setTimeout(recoverCursor, 120);
    };

    const handlePageShow = () => {
      window.setTimeout(recoverCursor, 0);
      window.setTimeout(recoverCursor, 120);
    };

    const down = (event) => {
      if (event?.pointerType && event.pointerType !== 'mouse') return;

      isScrollbarDragging = isScrollbarHit(event);
      isOverScrollbar = isScrollbarDragging;
      isPressed = !isScrollbarDragging;
      setPointerVisual();
    };

    const up = () => {
      isPressed = false;
      isScrollbarDragging = false;
      isOverScrollbar = false;
      setPointerVisual();
    };

    const handleThemeChange = () => {
      setPointerVisual();
    };

    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    if (document.body) {
      themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    }

    const appShell = document.querySelector('.app-shell');
    if (appShell) {
      themeObserver.observe(appShell, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    }

    const capturePassive = { passive: true, capture: true };

    window.addEventListener('storage', handleThemeChange, { passive: true });
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', move, { passive: true });
    window.addEventListener('pointerdown', down, capturePassive);
    window.addEventListener('mousedown', down, capturePassive);
    window.addEventListener('pointerup', up, capturePassive);
    window.addEventListener('mouseup', up, capturePassive);
    window.addEventListener('pointercancel', up, capturePassive);
    window.addEventListener('dragend', up, capturePassive);
    window.addEventListener('focus', show, { passive: true });
    window.addEventListener('pageshow', handlePageShow, { passive: true });
    window.addEventListener('blur', hide, { passive: true });
    window.addEventListener('mouseleave', hide, { passive: true });
    window.addEventListener('mouseenter', show, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', move);
      window.removeEventListener('pointerdown', down, capturePassive);
      window.removeEventListener('mousedown', down, capturePassive);
      window.removeEventListener('pointerup', up, capturePassive);
      window.removeEventListener('mouseup', up, capturePassive);
      window.removeEventListener('pointercancel', up, capturePassive);
      window.removeEventListener('dragend', up, capturePassive);
      window.removeEventListener('focus', show);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('blur', hide);
      window.removeEventListener('mouseleave', hide);
      window.removeEventListener('mouseenter', show);
      window.removeEventListener('storage', handleThemeChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      themeObserver.disconnect();
      document.documentElement.classList.remove(ROOT_CLASS);
      root.remove();
      style.remove();
    };
  }, []);

  return null;
}
