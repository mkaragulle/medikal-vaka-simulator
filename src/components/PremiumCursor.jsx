import { useEffect } from 'react';

const TEXT_TARGET_SELECTOR = [
  'input',
  'textarea',
  'select',
  '[contenteditable="true"]',
  '[contenteditable=""]',
  '.bottom-case-search input',
].join(', ');

const GLOSSARY_TARGET_SELECTOR = [
  '.glossary-term',
  '.smart-glossary-term',
  '.glossary-word',
  '.nested-glossary-term',
  '.smart-glossary-term--drilldown',
  '.glossary-tooltip',
  '.floating-glossary-tooltip',
  '.smart-glossary-popover',
  '.smart-glossary-card',
  '[data-glossary-entry-id]',
  '[data-glossary-entry-term]',
  '[data-cursor="glossary"]',
  '[data-glossary-tooltip-owner]',
].join(', ');

const INTERACTIVE_TARGET_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  '[role="button"]',
  '[tabindex]:not([tabindex="-1"])',
  'summary',
  '.btn',
  '.case-card',
  '.branch-card',
  '.option-card',
  '.answer-option',
  '.requested-test-card',
  '.inline-order-result',
  '.visual-help-toggle',
  '.premium-visual-help-toggle',
  '.result-image-link',
  '.smart-glossary-back',
  '.smart-glossary-breadcrumb-link',
  '[data-cursor="interactive"]',
].join(', ');

const LOADING_TARGET_SELECTOR = [
  '[aria-busy="true"]',
  '[data-loading="true"]',
  '.loading',
  '.is-loading',
  '.ai-loading',
  '.route-fallback',
  '.spinner',
  '.loading-spinner',
  '.loading-state',
  '.ai-generation-loading',
].join(', ');

const ROOT_CLASS = 'ki-minimal-cursor-active';
const PRESSED_CLASS = 'ki-minimal-cursor-pressed';
const STYLE_ID = 'klinikiq-minimal-premium-cursor-style-v353';
const CURSOR_ID = 'klinikiq-minimal-premium-cursor-v353';

const LEGACY_STYLE_IDS = [
  'klinikiq-unified-premium-cursor-runtime-style-v352',
  'klinikiq-premium-cursor-runtime-style-v351',
  'klinikiq-premium-cursor-runtime-style-v350',
  'klinikiq-premium-cursor-runtime-style-v349',
  'klinikiq-premium-cursor-runtime-style-v348',
  'klinikiq-premium-cursor-runtime-style',
];

const LEGACY_ROOT_CLASSES = [
  'ki-unified-cursor-active',
  'ki-unified-cursor-pressed',
  'ki-premium-cursor-on',
  'ki-premium-cursor-pressed',
  'ki-cursor-v350-enabled',
  'ki-cursor-v350-pressed',
  'ki-cursor-v351-active',
  'ki-cursor-v351-pressed',
];

function cleanupOldCursorArtifacts() {
  LEGACY_STYLE_IDS.forEach((id) => document.getElementById(id)?.remove());
  document.querySelectorAll([
    '#klinikiq-unified-premium-cursor-v352',
    '#klinikiq-premium-cursor-body-portal-v351',
    '#klinikiq-premium-cursor-body-portal-v350',
    '#klinikiq-premium-cursor-body-portal-v349',
    '#klinikiq-premium-cursor',
    '.ki-unified-cursor-v352',
    '.ki-cursor-v351',
    '.ki-cursor-v350',
    '.ki-cursor',
  ].join(',')).forEach((node) => node.remove());
}

function injectCursorStyles() {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = `
html.${ROOT_CLASS},
html.${ROOT_CLASS} body,
html.${ROOT_CLASS} body *,
html.${ROOT_CLASS} body *::before,
html.${ROOT_CLASS} body *::after {
  cursor: none !important;
}

html.${ROOT_CLASS} body :is(input, textarea, select, [contenteditable='true'], [contenteditable='']),
html.${ROOT_CLASS} body :is(input, textarea, select, [contenteditable='true'], [contenteditable='']) *,
html.${ROOT_CLASS} body .bottom-case-search input {
  cursor: text !important;
}

html.${ROOT_CLASS} body :is(
  .glossary-term,
  .smart-glossary-term,
  .glossary-word,
  .nested-glossary-term,
  .smart-glossary-term--drilldown,
  .glossary-tooltip,
  .floating-glossary-tooltip,
  .smart-glossary-popover,
  .smart-glossary-card,
  [data-glossary-entry-id],
  [data-glossary-entry-term],
  [data-cursor='glossary'],
  [data-glossary-tooltip-owner]
),
html.${ROOT_CLASS} body :is(
  .glossary-term,
  .smart-glossary-term,
  .glossary-word,
  .nested-glossary-term,
  .smart-glossary-term--drilldown,
  .glossary-tooltip,
  .floating-glossary-tooltip,
  .smart-glossary-popover,
  .smart-glossary-card,
  [data-glossary-entry-id],
  [data-glossary-entry-term],
  [data-cursor='glossary'],
  [data-glossary-tooltip-owner]
) * {
  cursor: none !important;
}

.ki-minimal-premium-cursor-v353 {
  --ki-cursor-size: 14px;
  --ki-cursor-ring: rgba(13, 148, 136, .78);
  --ki-cursor-dot: rgba(15, 118, 110, .95);
  --ki-cursor-soft: rgba(20, 184, 166, .18);

  position: fixed;
  left: 0;
  top: 0;
  z-index: 2147483647;
  width: var(--ki-cursor-size);
  height: var(--ki-cursor-size);
  pointer-events: none;
  opacity: 0;
  transform: translate3d(-120px, -120px, 0) translate3d(-50%, -50%, 0);
  transition:
    opacity 80ms ease,
    width 110ms cubic-bezier(.2, .9, .2, 1),
    height 110ms cubic-bezier(.2, .9, .2, 1);
  contain: layout paint style;
  will-change: transform, width, height, opacity;
  isolation: isolate;
  background: transparent !important;
  box-shadow: none !important;
  border: 0 !important;
  outline: 0 !important;
}

.ki-minimal-premium-cursor-v353.is-visible { opacity: 1; }
.ki-minimal-premium-cursor-v353.is-hidden,
.ki-minimal-premium-cursor-v353.mode-text { opacity: 0 !important; }

.ki-minimal-premium-cursor-v353 > span {
  position: absolute;
  pointer-events: none;
  background: transparent;
  box-sizing: border-box;
}

.ki-minimal-premium-cursor-v353__ring {
  inset: 0;
  border-radius: 999px;
  border: 1.35px solid var(--ki-cursor-ring);
  background: transparent !important;
  box-shadow: 0 0 0 1px rgba(255,255,255,.26) inset, 0 0 10px var(--ki-cursor-soft);
  transition: border-color 100ms ease, box-shadow 100ms ease, opacity 100ms ease;
}

.ki-minimal-premium-cursor-v353__dot {
  left: 50%;
  top: 50%;
  width: 3px;
  height: 3px;
  margin: -1.5px 0 0 -1.5px;
  border-radius: 999px;
  background: var(--ki-cursor-dot);
  box-shadow: 0 0 7px rgba(20,184,166,.38);
  transition: transform 100ms ease, opacity 100ms ease;
}

.ki-minimal-premium-cursor-v353__arc {
  inset: -2px;
  border-radius: 999px;
  border: 1.35px solid transparent;
  border-top-color: rgba(14, 165, 233, .95);
  border-right-color: rgba(14, 165, 233, .46);
  opacity: 0;
}

.ki-minimal-premium-cursor-v353.mode-interactive {
  --ki-cursor-size: 20px;
  --ki-cursor-ring: rgba(13, 148, 136, .92);
  --ki-cursor-soft: rgba(20, 184, 166, .24);
}

.ki-minimal-premium-cursor-v353.mode-interactive .ki-minimal-premium-cursor-v353__dot {
  transform: scale(.86);
}

.ki-minimal-premium-cursor-v353.mode-glossary {
  --ki-cursor-size: 18px;
  --ki-cursor-ring: rgba(20, 184, 166, .96);
  --ki-cursor-dot: rgba(13, 148, 136, .98);
  --ki-cursor-soft: rgba(20, 184, 166, .22);
}

.ki-minimal-premium-cursor-v353.mode-loading {
  --ki-cursor-size: 20px;
  --ki-cursor-ring: rgba(14, 165, 233, .62);
  --ki-cursor-dot: rgba(14, 165, 233, .95);
}

.ki-minimal-premium-cursor-v353.mode-loading .ki-minimal-premium-cursor-v353__arc {
  opacity: 1;
  animation: ki-minimal-cursor-spin-v353 760ms linear infinite;
}

html.${PRESSED_CLASS} .ki-minimal-premium-cursor-v353 {
  --ki-cursor-size: 11px;
}

html[data-theme='dark'] .ki-minimal-premium-cursor-v353,
[data-theme='dark'] .ki-minimal-premium-cursor-v353 {
  --ki-cursor-ring: rgba(94, 234, 212, .88);
  --ki-cursor-dot: rgba(204, 251, 241, .96);
  --ki-cursor-soft: rgba(45, 212, 191, .20);
}

@keyframes ki-minimal-cursor-spin-v353 { to { transform: rotate(360deg); } }

@media (max-width: 767px), (pointer: coarse) and (not (any-pointer: fine)) {
  .ki-minimal-premium-cursor-v353 { display: none !important; }
  html.${ROOT_CLASS},
  html.${ROOT_CLASS} body,
  html.${ROOT_CLASS} body * { cursor: auto !important; }
}

@media (prefers-reduced-motion: reduce) {
  .ki-minimal-premium-cursor-v353,
  .ki-minimal-premium-cursor-v353 * {
    transition: none !important;
    animation-duration: 1.4s !important;
  }
}
`;
}

function modeFromTarget(target) {
  if (!target || !(target instanceof Element)) return 'default';
  const root = document.documentElement;
  const body = document.body;

  if (body?.classList.contains('cursor-loading') || root.classList.contains('cursor-loading')) return 'loading';
  if (target.closest(TEXT_TARGET_SELECTOR)) return 'text';
  if (target.closest(GLOSSARY_TARGET_SELECTOR)) return 'glossary';
  if (target.closest(LOADING_TARGET_SELECTOR)) return 'loading';
  if (target.closest(INTERACTIVE_TARGET_SELECTOR)) return 'interactive';
  return 'default';
}

function isTouchLike(event) {
  return event?.pointerType === 'touch' || event?.pointerType === 'pen';
}

export default function PremiumCursor() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    cleanupOldCursorArtifacts();
    injectCursorStyles();

    const root = document.documentElement;
    LEGACY_ROOT_CLASSES.forEach((className) => root.classList.remove(className));
    root.classList.remove(ROOT_CLASS, PRESSED_CLASS);

    document.getElementById(CURSOR_ID)?.remove();

    const cursor = document.createElement('div');
    cursor.id = CURSOR_ID;
    cursor.className = 'ki-minimal-premium-cursor-v353 is-hidden mode-default';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = `
      <span class="ki-minimal-premium-cursor-v353__ring"></span>
      <span class="ki-minimal-premium-cursor-v353__dot"></span>
      <span class="ki-minimal-premium-cursor-v353__arc"></span>
    `;
    document.body.appendChild(cursor);

    let enabled = false;
    let visible = false;
    let raf = 0;
    let x = -120;
    let y = -120;
    let lastTransform = '';
    let mode = 'default';
    let lastTarget = null;
    let lastPointCheck = 0;

    const enable = () => {
      if (enabled) return;
      enabled = true;
      root.classList.add(ROOT_CLASS);
    };

    const setVisible = (next) => {
      if (visible === next) return;
      visible = next;
      cursor.classList.toggle('is-visible', next);
      cursor.classList.toggle('is-hidden', !next);
    };

    const setMode = (next) => {
      if (mode === next) return;
      cursor.classList.remove(`mode-${mode}`);
      mode = next;
      cursor.classList.add(`mode-${mode}`);
      cursor.dataset.mode = mode;
    };

    const updateMode = (target) => {
      if (target === lastTarget) return;
      lastTarget = target;
      setMode(modeFromTarget(target));
    };

    const updateModeFromPoint = () => {
      const now = performance.now();
      if (now - lastPointCheck < 90) return;
      lastPointCheck = now;
      const underPointer = document.elementFromPoint(x, y);
      if (underPointer && underPointer !== cursor && !cursor.contains(underPointer)) updateMode(underPointer);
    };

    const paint = () => {
      raf = 0;
      if (!enabled) return;
      updateModeFromPoint();
      const nextTransform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      if (nextTransform !== lastTransform) {
        lastTransform = nextTransform;
        cursor.style.transform = nextTransform;
      }
    };

    const schedulePaint = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(paint);
    };

    const handleMove = (event) => {
      if (isTouchLike(event)) return;
      enable();
      x = event.clientX;
      y = event.clientY;
      updateMode(event.target);
      setVisible(true);
      schedulePaint();
    };

    const handleOver = (event) => {
      if (isTouchLike(event)) return;
      enable();
      updateMode(event.target);
      setVisible(true);
    };

    const handleDown = (event) => {
      if (isTouchLike(event)) return;
      root.classList.add(PRESSED_CLASS);
    };

    const handleUp = () => root.classList.remove(PRESSED_CLASS);
    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true, capture: true });
    window.addEventListener('mousedown', handleDown, { passive: true });
    window.addEventListener('mouseup', handleUp, { passive: true });
    window.addEventListener('blur', handleLeave, { passive: true });
    document.addEventListener('mouseleave', handleLeave, { passive: true });

    if ('PointerEvent' in window) {
      window.addEventListener('pointermove', handleMove, { passive: true });
      window.addEventListener('pointerover', handleOver, { passive: true, capture: true });
      window.addEventListener('pointerdown', handleDown, { passive: true });
      window.addEventListener('pointerup', handleUp, { passive: true });
      window.addEventListener('pointercancel', handleUp, { passive: true });
    }

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver, { capture: true });
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('blur', handleLeave);
      document.removeEventListener('mouseleave', handleLeave);

      if ('PointerEvent' in window) {
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerover', handleOver, { capture: true });
        window.removeEventListener('pointerdown', handleDown);
        window.removeEventListener('pointerup', handleUp);
        window.removeEventListener('pointercancel', handleUp);
      }

      cursor.remove();
      document.getElementById(STYLE_ID)?.remove();
      root.classList.remove(ROOT_CLASS, PRESSED_CLASS);
    };
  }, []);

  return null;
}
