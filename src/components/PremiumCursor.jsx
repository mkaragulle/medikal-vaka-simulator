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

const ROOT_CLASS = 'ki-simple-cursor-active';
const STYLE_ID = 'ki-simple-cursor-runtime-style-v354';

const LEGACY_SELECTORS = [
  '.premium-cursor',
  '.premium-cursor-root',
  '.clinical-cursor-root',
  '.klinq-cursor-root',
  '.cursor-lens',
  '.cursor-orb',
  '.cursor-ring',
  '[data-klinq-old-cursor-root]',
  '[data-klinq-cursor-root]:not([data-ki-simple-cursor-root])',
  '[data-cursor-root]:not([data-ki-simple-cursor-root])',
].join(', ');

const LEGACY_STYLE_IDS = [
  'klinikiq-minimal-premium-cursor-style-v353',
  'klinikiq-unified-premium-cursor-runtime-style-v352',
  'klinikiq-premium-cursor-runtime-style-v351',
  'klinikiq-premium-cursor-runtime-style-v350',
  'klinikiq-premium-cursor-runtime-style-v349',
  'klinikiq-premium-cursor-runtime-style-v348',
  'klinikiq-premium-cursor-runtime-style',
];

const LEGACY_ROOT_CLASSES = [
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

export default function PremiumCursor() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    const hasFinePointer =
      window.matchMedia?.('(any-pointer: fine)')?.matches ||
      window.matchMedia?.('(pointer: fine)')?.matches ||
      !window.matchMedia?.('(any-pointer: coarse)')?.matches;

    if (!hasFinePointer) return undefined;

    LEGACY_STYLE_IDS.forEach((id) => document.getElementById(id)?.remove());
    document.querySelectorAll(LEGACY_SELECTORS).forEach((node) => node.remove());
    document.documentElement.classList.remove(...LEGACY_ROOT_CLASSES);
    document.getElementById(STYLE_ID)?.remove();
    document.querySelectorAll('[data-ki-simple-cursor-root="true"]').forEach((node) => node.remove());

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
@media (pointer: fine), (any-pointer: fine) {
  html.${ROOT_CLASS},
  html.${ROOT_CLASS} body,
  html.${ROOT_CLASS} body *:not(input):not(textarea):not(select):not([contenteditable="true"]):not([contenteditable=""]):not(.cm-editor):not(.monaco-editor) {
    cursor: none !important;
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
}

.ki-simple-cursor-root {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 0 !important;
  height: 0 !important;
  z-index: 2147483647 !important;
  pointer-events: none !important;
  opacity: 0;
  transform: translate3d(-9999px, -9999px, 0);
  transition: opacity 110ms ease;
  contain: layout style paint;
  background: transparent !important;
  box-shadow: none !important;
  filter: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  mix-blend-mode: normal !important;
}

.ki-simple-cursor-root.is-visible {
  opacity: 1;
}

.ki-simple-cursor-root.is-text {
  opacity: 0;
}

.ki-simple-cursor-root,
.ki-simple-cursor-root *,
.ki-simple-cursor-root::before,
.ki-simple-cursor-root::after,
.ki-simple-cursor-root *::before,
.ki-simple-cursor-root *::after {
  background-clip: padding-box !important;
  box-shadow: none !important;
  filter: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

.ki-simple-cursor-ring {
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  width: 16px !important;
  height: 16px !important;
  border: 1.35px solid rgba(13, 148, 136, 0.88) !important;
  border-radius: 999px !important;
  background: transparent !important;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 120ms ease, border-color 120ms ease, opacity 120ms ease;
  will-change: transform;
}

.ki-simple-cursor-dot {
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  width: 3.5px !important;
  height: 3.5px !important;
  border-radius: 999px !important;
  background: rgba(13, 148, 136, 0.96) !important;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 120ms ease, opacity 120ms ease;
  will-change: transform;
}

.ki-simple-cursor-root.is-interactive .ki-simple-cursor-ring {
  transform: translate(-50%, -50%) scale(1.28);
  border-color: rgba(15, 118, 110, 0.96) !important;
}

.ki-simple-cursor-root.is-interactive .ki-simple-cursor-dot {
  transform: translate(-50%, -50%) scale(0.85);
}

.premium-cursor,
.premium-cursor-root,
.clinical-cursor-root,
.klinq-cursor-root,
.cursor-lens,
.cursor-orb,
.cursor-ring,
[data-klinq-old-cursor-root] {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
`;
    document.head.appendChild(style);

    const root = document.createElement('div');
    root.className = 'ki-simple-cursor-root';
    root.setAttribute('aria-hidden', 'true');
    root.setAttribute('data-ki-simple-cursor-root', 'true');

    const ring = document.createElement('div');
    ring.className = 'ki-simple-cursor-ring';

    const dot = document.createElement('div');
    dot.className = 'ki-simple-cursor-dot';

    root.appendChild(ring);
    root.appendChild(dot);
    document.body.appendChild(root);

    let currentX = -9999;
    let currentY = -9999;
    let targetX = -9999;
    let targetY = -9999;
    let frameId = 0;
    let started = false;

    const render = () => {
      currentX += (targetX - currentX) * 0.38;
      currentY += (targetY - currentY) * 0.38;
      root.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frameId = window.requestAnimationFrame(render);
    };

    const updateMode = (target) => {
      if (!(target instanceof Element)) return;
      const isText = Boolean(target.closest(TEXT_SELECTOR));
      const isInteractive = Boolean(target.closest(INTERACTIVE_SELECTOR));
      root.classList.toggle('is-text', isText);
      root.classList.toggle('is-interactive', isInteractive && !isText);
    };

    const move = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;

      targetX = event.clientX;
      targetY = event.clientY;

      if (!started) {
        started = true;
        currentX = targetX;
        currentY = targetY;
        root.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        root.classList.add('is-visible');
        document.documentElement.classList.add(ROOT_CLASS);
        frameId = window.requestAnimationFrame(render);
      }

      updateMode(event.target);
    };

    const fallbackMouseMove = (event) => {
      if ('PointerEvent' in window) return;
      move(event);
    };

    const hide = () => root.classList.remove('is-visible');
    const show = () => {
      if (started) root.classList.add('is-visible');
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('mousemove', fallbackMouseMove, { passive: true });
    window.addEventListener('mouseleave', hide, { passive: true });
    window.addEventListener('mouseenter', show, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mousemove', fallbackMouseMove);
      window.removeEventListener('mouseleave', hide);
      window.removeEventListener('mouseenter', show);
      document.documentElement.classList.remove(ROOT_CLASS);
      root.remove();
      style.remove();
    };
  }, []);

  return null;
}
