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

const ROOT_CLASS = 'ki-pointer-v355-on';
const STYLE_ID = 'ki-pointer-v355-runtime-style';
const ROOT_ATTR = 'data-ki-pointer-v355-root';

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
].join(', ');

const LEGACY_STYLE_IDS = [
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
  transition: opacity 90ms ease;
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

[${ROOT_ATTR}="true"].is-text {
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
[data-ki-simple-cursor-root] {
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
      'transition:opacity 90ms ease',
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

    const setPointerVisual = () => {
      if (!ring || !dot) return;

      root.classList.toggle('is-text', isText);

      if (isText) {
        ring.setAttribute('r', '8.25');
        ring.setAttribute('stroke-width', '1.65');
        dot.setAttribute('r', '2.25');
        return;
      }

      if (isInteractive) {
        ring.setAttribute('r', '10.75');
        ring.setAttribute('stroke-width', '1.75');
        ring.setAttribute('stroke', 'rgba(15,118,110,0.98)');
        dot.setAttribute('r', '1.9');
        dot.setAttribute('fill', 'rgba(15,118,110,0.98)');
      } else {
        ring.setAttribute('r', '8.25');
        ring.setAttribute('stroke-width', '1.65');
        ring.setAttribute('stroke', 'rgba(13,148,136,0.94)');
        dot.setAttribute('r', '2.25');
        dot.setAttribute('fill', 'rgba(13,148,136,0.98)');
      }
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
      root.classList.add('is-visible');
      document.documentElement.classList.add(ROOT_CLASS);
      frameId = window.requestAnimationFrame(render);
    };

    const move = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      activate();
      updateMode(event.target);
    };

    const hide = () => {
      root.classList.remove('is-visible');
    };

    const show = () => {
      if (started && !isText) root.classList.add('is-visible');
    };

    const down = () => {
      if (ring) ring.setAttribute('r', isInteractive ? '9.5' : '7.25');
      if (dot) dot.setAttribute('r', '1.75');
    };

    const up = () => setPointerVisual();

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('blur', hide, { passive: true });
    window.addEventListener('mouseleave', hide, { passive: true });
    window.addEventListener('mouseenter', show, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('blur', hide);
      window.removeEventListener('mouseleave', hide);
      window.removeEventListener('mouseenter', show);
      document.documentElement.classList.remove(ROOT_CLASS);
      root.remove();
      style.remove();
    };
  }, []);

  return null;
}
