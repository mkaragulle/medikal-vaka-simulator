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

const ROOT_CLASS = 'ki-pointer-v364-on';
const STYLE_ID = 'ki-pointer-v364-runtime-style';
const ROOT_ATTR = 'data-ki-pointer-v364-root';
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
  '[data-ki-pointer-v363-root]',
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
  'ki-pointer-v363-runtime-style',
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
  'ki-pointer-v363-on',
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
html.${ROOT_CLASS} body {
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

html.${ROOT_CLASS} * {
  cursor: inherit;
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
[${ROOT_ATTR}="true"].is-suspended {
  opacity: 0 !important;
  transition: none !important;
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
[data-ki-pointer-v362-root],
[data-ki-pointer-v363-root] {
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
      'will-change:transform,opacity',
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
    let pendingModeTarget = null;
    let started = false;
    let isInteractive = false;
    let isText = false;
    let isPressed = false;
    let isDarkTheme = false;
    let cachedIsDarkTheme = false;
    let isOverScrollbar = false;
    let isScrollbarDragging = false;
    let lastModeTarget = null;
    let isSuspended = false;
    let suspendTimer = 0;
    let lastSuspendAt = 0;

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
      root.classList.toggle('is-scrollbar', false);
      root.classList.toggle('is-scrollbar-dragging', false);

      if (isText || isSuspended) {
        root.classList.remove('is-visible');
      } else if (started) {
        root.classList.add('is-visible');
      }
    };

    cachedIsDarkTheme = resolveIsDarkTheme();

    const setPointerVisual = () => {
      if (!ring || !dot) return;

      isDarkTheme = cachedIsDarkTheme;
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
      if (target === lastModeTarget) return;
      lastModeTarget = target;

      const nextIsText = Boolean(target.closest(TEXT_SELECTOR));
      const nextIsInteractive = !nextIsText && Boolean(target.closest(INTERACTIVE_SELECTOR));
      if (nextIsText === isText && nextIsInteractive === isInteractive) return;

      isText = nextIsText;
      isInteractive = nextIsInteractive;
      setPointerVisual();
    };

    const stopRender = () => {
      if (!frameId) return;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const applyPointerFrame = () => {
      frameId = 0;
      currentX = targetX;
      currentY = targetY;
      root.style.transform = `translate3d(${currentX - 17}px, ${currentY - 17}px, 0)`;

      if (pendingModeTarget) {
        const nextTarget = pendingModeTarget;
        pendingModeTarget = null;
        isOverScrollbar = false;
        isScrollbarDragging = false;
        updateMode(nextTarget);
      }
    };

    const ensureRender = () => {
      if (frameId || document.visibilityState === 'hidden') return;
      frameId = window.requestAnimationFrame(applyPointerFrame);
    };

    const activate = () => {
      if (!started) {
        started = true;
        currentX = targetX;
        currentY = targetY;
        root.style.transform = `translate3d(${currentX - 17}px, ${currentY - 17}px, 0)`;
        document.documentElement.classList.add(ROOT_CLASS);
        setVisibilityForMode();
      }
      ensureRender();
    };

    const resumeAfterSuspension = () => {
      suspendTimer = 0;
      isSuspended = false;
      root.classList.remove('is-suspended');
      if (!started || document.visibilityState === 'hidden') return;
      setVisibilityForMode();
      ensureRender();
    };

    const suspendCursor = (duration = 120) => {
      const now = window.performance?.now?.() || Date.now();
      if (!isSuspended || now - lastSuspendAt > 64) {
        isSuspended = true;
        lastSuspendAt = now;
        root.classList.add('is-suspended');
        root.classList.remove('is-visible');
        stopRender();
      }
      if (suspendTimer) window.clearTimeout(suspendTimer);
      suspendTimer = window.setTimeout(resumeAfterSuspension, duration);
    };

    const move = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      pendingModeTarget = event.target;
      if (isSuspended) {
        started = true;
        return;
      }
      activate();
    };

    const hide = () => {
      root.classList.remove('is-visible');
      stopRender();
    };

    const recoverCursor = () => {
      if (!document.body.contains(root)) {
        document.body.appendChild(root);
      }

      if (!started) return;

      document.documentElement.classList.add(ROOT_CLASS);
      setPointerVisual();

      ensureRender();
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

      isScrollbarDragging = false;
      isOverScrollbar = false;
      isPressed = true;
      setPointerVisual();
    };

    const up = () => {
      isPressed = false;
      isScrollbarDragging = false;
      isOverScrollbar = false;
      setPointerVisual();
    };

    const handleThemeChange = () => {
      cachedIsDarkTheme = resolveIsDarkTheme();
      setPointerVisual();
    };

    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (document.body) {
      themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    }

    const appShell = document.querySelector('.app-shell');
    if (appShell) {
      themeObserver.observe(appShell, { attributes: true, attributeFilter: ['data-theme'] });
    }

    const capturePassive = { passive: true, capture: true };
    const handleScrollSuspend = () => suspendCursor(110);
    const handleResizeSuspend = () => suspendCursor(180);

    window.addEventListener('storage', handleThemeChange, { passive: true });
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', handleScrollSuspend, { passive: true, capture: true });
    window.addEventListener('resize', handleResizeSuspend, { passive: true });
    window.addEventListener('pointerdown', down, capturePassive);
    window.addEventListener('pointerup', up, capturePassive);
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
      if (suspendTimer) window.clearTimeout(suspendTimer);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', handleScrollSuspend, true);
      window.removeEventListener('resize', handleResizeSuspend);
      window.removeEventListener('pointerdown', down, capturePassive);
      window.removeEventListener('pointerup', up, capturePassive);
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
