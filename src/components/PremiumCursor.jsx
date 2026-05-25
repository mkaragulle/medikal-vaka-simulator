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
  '[data-glossary-entry-id]',
  '[data-cursor="glossary"]',
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

const STYLE_ID = 'klinikiq-premium-cursor-runtime-style-v350';
const CURSOR_ID = 'klinikiq-premium-cursor-body-portal-v350';

function injectCursorStyle() {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = `
html.ki-cursor-v350-enabled,
html.ki-cursor-v350-enabled body,
html.ki-cursor-v350-enabled *:not(input):not(textarea):not(select):not([contenteditable='true']):not([contenteditable='']) {
  cursor: none !important;
}

html.ki-cursor-v350-enabled input,
html.ki-cursor-v350-enabled textarea,
html.ki-cursor-v350-enabled select,
html.ki-cursor-v350-enabled [contenteditable='true'],
html.ki-cursor-v350-enabled [contenteditable=''] {
  cursor: text !important;
}

.ki-body-cursor-v350 {
  --cursor-size: 28px;
  --cursor-ring: rgba(20, 184, 166, .96);
  --cursor-core: rgba(15, 118, 110, .98);
  --cursor-aura: rgba(20, 184, 166, .15);
  --cursor-edge: rgba(255, 255, 255, .58);
  --cursor-shadow: rgba(15, 118, 110, .22);

  position: fixed;
  left: 0;
  top: 0;
  z-index: 2147483647;
  width: var(--cursor-size);
  height: var(--cursor-size);
  pointer-events: none;
  opacity: 0;
  transform: translate3d(-120px, -120px, 0) translate3d(-50%, -50%, 0);
  transition: opacity 90ms ease, width 110ms ease, height 110ms ease;
  contain: layout paint style;
  will-change: transform, opacity;
  isolation: isolate;
}

.ki-body-cursor-v350.is-visible {
  opacity: 1;
}

.ki-body-cursor-v350.is-hidden {
  opacity: 0;
}

.ki-body-cursor-v350 > span {
  position: absolute;
  pointer-events: none;
}

.ki-body-cursor-v350 .cursor-aura {
  inset: -9px;
  border-radius: 999px;
  background: radial-gradient(circle, var(--cursor-aura) 0%, transparent 68%);
  opacity: .76;
}

.ki-body-cursor-v350 .cursor-ring {
  inset: 0;
  border-radius: 999px;
  border: 1.4px solid var(--cursor-ring);
  background:
    radial-gradient(circle at 34% 26%, rgba(255,255,255,.46), transparent 22%),
    radial-gradient(circle, rgba(255,255,255,.06), transparent 64%);
  box-shadow:
    0 0 0 1px var(--cursor-edge) inset,
    0 0 12px var(--cursor-shadow);
}

.ki-body-cursor-v350 .cursor-core {
  left: 50%;
  top: 50%;
  width: 4.5px;
  height: 4.5px;
  margin: -2.25px 0 0 -2.25px;
  border-radius: 999px;
  background: var(--cursor-core);
  box-shadow: 0 0 8px rgba(20, 184, 166, .45);
  transition: transform 110ms ease, opacity 110ms ease;
}

.ki-body-cursor-v350 .cursor-notch {
  left: 50%;
  top: 50%;
  background: var(--cursor-ring);
  border-radius: 999px;
  opacity: .44;
  transform: translate(-50%, -50%);
  transition: opacity 110ms ease;
}

.ki-body-cursor-v350 .cursor-notch-v {
  width: 1px;
  height: 13px;
}

.ki-body-cursor-v350 .cursor-notch-h {
  width: 13px;
  height: 1px;
}

.ki-body-cursor-v350 .cursor-info {
  left: 50%;
  top: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: #0f766e;
  background: rgba(240, 253, 250, .98);
  border: 1px solid rgba(20, 184, 166, .46);
  font: 850 9px/1 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  opacity: 0;
  transform: scale(.72);
  transition: opacity 110ms ease, transform 110ms ease;
}

.ki-body-cursor-v350 .cursor-spinner {
  inset: -2px;
  border-radius: 999px;
  opacity: 0;
  background: conic-gradient(from 0deg, transparent 0 38%, rgba(14, 165, 233, .96) 51%, transparent 70% 100%);
  mask: radial-gradient(circle, transparent 57%, #000 60%);
  -webkit-mask: radial-gradient(circle, transparent 57%, #000 60%);
}

.ki-body-cursor-v350.mode-interactive {
  --cursor-size: 35px;
  --cursor-ring: rgba(20, 184, 166, 1);
  --cursor-aura: rgba(20, 184, 166, .22);
}

.ki-body-cursor-v350.mode-interactive .cursor-notch {
  opacity: .62;
}

.ki-body-cursor-v350.mode-interactive .cursor-core {
  transform: scale(1.18);
}

.ki-body-cursor-v350.mode-glossary {
  --cursor-size: 34px;
  --cursor-ring: rgba(13, 148, 136, 1);
  --cursor-aura: rgba(13, 148, 136, .24);
}

.ki-body-cursor-v350.mode-glossary .cursor-core,
.ki-body-cursor-v350.mode-glossary .cursor-notch {
  opacity: 0;
}

.ki-body-cursor-v350.mode-glossary .cursor-info {
  opacity: 1;
  transform: scale(1);
}

.ki-body-cursor-v350.mode-loading {
  --cursor-size: 34px;
  --cursor-ring: rgba(14, 165, 233, .96);
  --cursor-core: rgba(14, 165, 233, .98);
  --cursor-aura: rgba(14, 165, 233, .18);
}

.ki-body-cursor-v350.mode-loading .cursor-spinner {
  opacity: 1;
  animation: ki-cursor-v350-spin 820ms linear infinite;
}

.ki-body-cursor-v350.mode-text {
  opacity: 0 !important;
}

html.ki-cursor-v350-pressed .ki-body-cursor-v350 {
  --cursor-size: 23px;
}

html[data-theme='dark'] .ki-body-cursor-v350,
[data-theme='dark'] .ki-body-cursor-v350 {
  --cursor-ring: rgba(94, 234, 212, .96);
  --cursor-core: #99f6e4;
  --cursor-aura: rgba(45, 212, 191, .20);
  --cursor-edge: rgba(255, 255, 255, .18);
  --cursor-shadow: rgba(45, 212, 191, .22);
}

html[data-theme='dark'] .ki-body-cursor-v350 .cursor-info,
[data-theme='dark'] .ki-body-cursor-v350 .cursor-info {
  color: #ccfbf1;
  background: rgba(15, 23, 42, .96);
  border-color: rgba(94, 234, 212, .46);
}

@keyframes ki-cursor-v350-spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 767px) {
  .ki-body-cursor-v350 {
    display: none !important;
  }
}
`;
}

function closestMode(target) {
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

function isTouchPointer(event) {
  return event?.pointerType === 'touch';
}

export default function PremiumCursor() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    injectCursorStyle();

    const root = document.documentElement;
    const previousNode = document.getElementById(CURSOR_ID);
    if (previousNode) previousNode.remove();

    const node = document.createElement('div');
    node.id = CURSOR_ID;
    node.className = 'ki-body-cursor-v350 is-hidden mode-default';
    node.setAttribute('aria-hidden', 'true');
    node.innerHTML = `
      <span class="cursor-aura"></span>
      <span class="cursor-ring"></span>
      <span class="cursor-notch cursor-notch-v"></span>
      <span class="cursor-notch cursor-notch-h"></span>
      <span class="cursor-core"></span>
      <span class="cursor-info">i</span>
      <span class="cursor-spinner"></span>
    `;
    document.body.appendChild(node);

    let enabled = false;
    let visible = false;
    let raf = 0;
    let mode = 'default';
    let lastTarget = null;
    let lastTransform = '';
    let x = -120;
    let y = -120;

    const enable = () => {
      if (enabled) return;
      enabled = true;
      root.classList.add('ki-cursor-v350-enabled');
    };

    const setVisible = (nextVisible) => {
      if (visible === nextVisible) return;
      visible = nextVisible;
      node.classList.toggle('is-visible', nextVisible);
      node.classList.toggle('is-hidden', !nextVisible);
    };

    const setMode = (nextMode) => {
      if (mode === nextMode) return;
      node.classList.remove(`mode-${mode}`);
      mode = nextMode;
      node.classList.add(`mode-${mode}`);
      node.dataset.mode = mode;
    };

    const render = () => {
      raf = 0;
      if (!enabled) return;
      const transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      if (transform !== lastTransform) {
        lastTransform = transform;
        node.style.transform = transform;
      }
    };

    const requestRender = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(render);
    };

    const updateModeFromTarget = (target) => {
      if (target === lastTarget) return;
      lastTarget = target;
      setMode(closestMode(target));
    };

    const handleMove = (event) => {
      if (isTouchPointer(event)) return;
      enable();
      x = event.clientX;
      y = event.clientY;
      updateModeFromTarget(event.target);
      setVisible(true);
      requestRender();
    };

    const handleOver = (event) => {
      if (!enabled || isTouchPointer(event)) return;
      updateModeFromTarget(event.target);
    };

    const handleDown = (event) => {
      if (isTouchPointer(event)) return;
      root.classList.add('ki-cursor-v350-pressed');
    };

    const handleUp = () => root.classList.remove('ki-cursor-v350-pressed');
    const handleLeave = () => setVisible(false);
    const handleEnter = (event) => {
      if (isTouchPointer(event)) return;
      enable();
      setVisible(true);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('pointerover', handleOver, { passive: true });
    window.addEventListener('mousedown', handleDown, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('mouseup', handleUp, { passive: true });
    window.addEventListener('pointerup', handleUp, { passive: true });
    document.addEventListener('mouseenter', handleEnter, { passive: true });
    document.addEventListener('mouseleave', handleLeave, { passive: true });
    window.addEventListener('blur', handleLeave);

    return () => {
      root.classList.remove('ki-cursor-v350-enabled', 'ki-cursor-v350-pressed');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('pointerover', handleOver);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('pointerup', handleUp);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('blur', handleLeave);
      if (raf) window.cancelAnimationFrame(raf);
      node.remove();
    };
  }, []);

  return null;
}
