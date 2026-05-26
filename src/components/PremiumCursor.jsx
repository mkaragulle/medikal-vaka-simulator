import { useEffect } from 'react';

const ROOT_CLASS = 'ki-lite-cursor-v393-on';
const PRESSED_CLASS = 'ki-lite-cursor-v393-pressed';
const STYLE_ID = 'ki-lite-cursor-v393-runtime-style';
const ROOT_ATTR = 'data-ki-lite-cursor-v393-root';

const TRANSPARENT_CURSOR = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'1\' height=\'1\' viewBox=\'0 0 1 1\'%3E%3C/svg%3E") 0 0, none';

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
  '[data-ki-pointer-v364-root]',
  `[${ROOT_ATTR}="true"]`,
].join(', ');

const LEGACY_STYLE_IDS = [
  STYLE_ID,
  'ki-pointer-v355-runtime-style',
  'ki-pointer-v356-runtime-style',
  'ki-pointer-v357-runtime-style',
  'ki-pointer-v358-runtime-style',
  'ki-pointer-v359-runtime-style',
  'ki-pointer-v360-runtime-style',
  'ki-pointer-v361-runtime-style',
  'ki-pointer-v362-runtime-style',
  'ki-pointer-v363-runtime-style',
  'ki-pointer-v364-runtime-style',
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
  ROOT_CLASS,
  PRESSED_CLASS,
  'ki-pointer-v364-on',
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

function isFinePointerDevice() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function cleanupLegacyCursor() {
  LEGACY_STYLE_IDS.forEach((id) => document.getElementById(id)?.remove());
  document.querySelectorAll(LEGACY_SELECTORS).forEach((node) => node.remove());
  document.documentElement.classList.remove(...LEGACY_ROOT_CLASSES);
  document.body?.classList?.remove?.(...LEGACY_ROOT_CLASSES);
}

export default function PremiumCursor() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    cleanupLegacyCursor();

    if (!isFinePointerDevice()) {
      return () => cleanupLegacyCursor();
    }

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

[${ROOT_ATTR}="true"] {
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  width: 30px !important;
  height: 30px !important;
  z-index: 2147483647 !important;
  pointer-events: none !important;
  opacity: 0 !important;
  transform: translate3d(-80px, -80px, 0) scale(1) !important;
  transform-origin: center center !important;
  transition: opacity 70ms ease, transform 90ms ease-out !important;
  contain: strict !important;
  will-change: transform, opacity !important;
  color: var(--accent, #14b8a6) !important;
  background: transparent !important;
  border: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
  filter: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  mix-blend-mode: normal !important;
  isolation: isolate !important;
}

[${ROOT_ATTR}="true"].is-visible {
  opacity: 1 !important;
}

[${ROOT_ATTR}="true"].is-text {
  opacity: 0 !important;
}

[${ROOT_ATTR}="true"].is-interactive {
  transform: translate3d(var(--ki-lite-cursor-x, -80px), var(--ki-lite-cursor-y, -80px), 0) scale(1.16) !important;
}

html.${PRESSED_CLASS} [${ROOT_ATTR}="true"] {
  transform: translate3d(var(--ki-lite-cursor-x, -80px), var(--ki-lite-cursor-y, -80px), 0) scale(.86) !important;
}

[${ROOT_ATTR}="true"] .ki-lite-cursor-ring {
  position: absolute !important;
  inset: 4px !important;
  border-radius: 999px !important;
  border: 1.45px solid currentColor !important;
  opacity: .88 !important;
  background: transparent !important;
  box-shadow: none !important;
}

[${ROOT_ATTR}="true"] .ki-lite-cursor-dot {
  position: absolute !important;
  left: 50% !important;
  top: 50% !important;
  width: 4px !important;
  height: 4px !important;
  margin-left: -2px !important;
  margin-top: -2px !important;
  border-radius: 999px !important;
  background: currentColor !important;
  opacity: .98 !important;
  box-shadow: none !important;
}

[${ROOT_ATTR}="true"].is-interactive .ki-lite-cursor-ring {
  inset: 2px !important;
  opacity: .98 !important;
  border-color: var(--accent-strong, currentColor) !important;
}

@media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
  html.${ROOT_CLASS},
  html.${ROOT_CLASS} body,
  html.${ROOT_CLASS} body * {
    cursor: auto !important;
  }

  [${ROOT_ATTR}="true"] {
    display: none !important;
  }
}
`;
    document.head.appendChild(style);

    const root = document.createElement('div');
    root.setAttribute(ROOT_ATTR, 'true');
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML = '<span class="ki-lite-cursor-ring" aria-hidden="true"></span><span class="ki-lite-cursor-dot" aria-hidden="true"></span>';
    document.body.appendChild(root);

    const html = document.documentElement;
    html.classList.add(ROOT_CLASS);

    let pointerX = -80;
    let pointerY = -80;
    let rafId = 0;
    let hasPointer = false;
    let lastModeTarget = null;
    let isText = false;
    let isInteractive = false;

    const placeCursor = () => {
      rafId = 0;
      const x = pointerX - 15;
      const y = pointerY - 15;
      root.style.setProperty('--ki-lite-cursor-x', `${x}px`);
      root.style.setProperty('--ki-lite-cursor-y', `${y}px`);
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!hasPointer) {
        hasPointer = true;
        root.classList.add('is-visible');
      }
    };

    const schedulePlace = () => {
      if (rafId || document.visibilityState === 'hidden') return;
      rafId = window.requestAnimationFrame(placeCursor);
    };

    const updateMode = (target) => {
      if (!(target instanceof Element) || target === lastModeTarget) return;
      lastModeTarget = target;

      const nextIsText = Boolean(target.closest(TEXT_SELECTOR));
      const nextIsInteractive = !nextIsText && Boolean(target.closest(INTERACTIVE_SELECTOR));

      if (nextIsText === isText && nextIsInteractive === isInteractive) return;
      isText = nextIsText;
      isInteractive = nextIsInteractive;

      root.classList.toggle('is-text', isText);
      root.classList.toggle('is-interactive', isInteractive);
      root.classList.toggle('is-visible', hasPointer && !isText);
    };

    const onPointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      schedulePlace();
    };

    const onPointerOver = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      updateMode(event.target);
    };

    const onPointerDown = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      html.classList.add(PRESSED_CLASS);
    };

    const onPointerUp = () => {
      html.classList.remove(PRESSED_CLASS);
    };

    const hide = () => {
      root.classList.remove('is-visible');
      hasPointer = false;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') hide();
    };

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onPointerCapabilityChange = () => {
      if (!isFinePointerDevice()) {
        html.classList.remove(ROOT_CLASS, PRESSED_CLASS);
        root.classList.remove('is-visible');
      } else {
        html.classList.add(ROOT_CLASS);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true, capture: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true, capture: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true, capture: true });
    window.addEventListener('blur', hide, { passive: true });
    window.addEventListener('mouseleave', hide, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange, { passive: true });
    mediaQuery.addEventListener?.('change', onPointerCapabilityChange);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerdown', onPointerDown, { capture: true });
      window.removeEventListener('pointerup', onPointerUp, { capture: true });
      window.removeEventListener('pointercancel', onPointerUp, { capture: true });
      window.removeEventListener('blur', hide);
      window.removeEventListener('mouseleave', hide);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      mediaQuery.removeEventListener?.('change', onPointerCapabilityChange);
      html.classList.remove(ROOT_CLASS, PRESSED_CLASS);
      root.remove();
      style.remove();
    };
  }, []);

  return null;
}
