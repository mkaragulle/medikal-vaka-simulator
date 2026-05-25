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
  '[data-glossary-entry-id]',
  '[data-glossary-entry-term]',
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

const LEGACY_STYLE_IDS = [
  'klinikiq-premium-cursor-runtime-style-v351',
  'klinikiq-premium-cursor-runtime-style-v350',
  'klinikiq-premium-cursor-runtime-style-v349',
  'klinikiq-premium-cursor-runtime-style-v348',
  'klinikiq-premium-cursor-runtime-style',
];

const LEGACY_CURSOR_IDS = [
  'klinikiq-premium-cursor-body-portal-v351',
  'klinikiq-premium-cursor-body-portal-v350',
  'klinikiq-premium-cursor-body-portal-v349',
  'klinikiq-premium-cursor',
];

const STYLE_ID = 'klinikiq-unified-premium-cursor-runtime-style-v352';
const CURSOR_ID = 'klinikiq-unified-premium-cursor-v352';

function cleanupLegacyCursorArtifacts() {
  LEGACY_STYLE_IDS.forEach((id) => document.getElementById(id)?.remove());
  LEGACY_CURSOR_IDS.forEach((id) => document.getElementById(id)?.remove());
}

function injectCursorStyle() {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = `
html.ki-unified-cursor-active,
html.ki-unified-cursor-active body {
  cursor: none !important;
}

html.ki-unified-cursor-active body *,
html.ki-unified-cursor-active body *::before,
html.ki-unified-cursor-active body *::after {
  cursor: none !important;
}

html.ki-unified-cursor-active body :is(input, textarea, select, [contenteditable='true'], [contenteditable='']),
html.ki-unified-cursor-active body :is(input, textarea, select, [contenteditable='true'], [contenteditable='']) *,
html.ki-unified-cursor-active body .bottom-case-search input {
  cursor: text !important;
}

html.ki-unified-cursor-active body :is(
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
html.ki-unified-cursor-active body :is(
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

.ki-cursor,
.premium-cursor.ki-cursor,
.ki-cursor-v351,
.ki-cursor-v350,
.premium-cursor:not(.ki-unified-cursor-v352) {
  display: none !important;
}

.ki-unified-cursor-v352 {
  --ki-cursor-size: 23px;
  --ki-cursor-core: rgba(15, 118, 110, .98);
  --ki-cursor-ring: rgba(20, 184, 166, .90);
  --ki-cursor-glass: rgba(240, 253, 250, .46);
  --ki-cursor-glass-2: rgba(20, 184, 166, .08);
  --ki-cursor-aura: rgba(20, 184, 166, .15);
  --ki-cursor-shadow: rgba(15, 118, 110, .18);

  position: fixed;
  left: 0;
  top: 0;
  z-index: 2147483647;
  width: var(--ki-cursor-size);
  height: var(--ki-cursor-size);
  pointer-events: none;
  opacity: 0;
  transform: translate3d(-140px, -140px, 0) translate3d(-50%, -50%, 0);
  transition:
    opacity 90ms ease,
    width 120ms cubic-bezier(.2, .9, .2, 1),
    height 120ms cubic-bezier(.2, .9, .2, 1);
  contain: layout paint style;
  will-change: transform, opacity, width, height;
  isolation: isolate;
}

.ki-unified-cursor-v352.is-visible { opacity: 1; }
.ki-unified-cursor-v352.is-hidden { opacity: 0; }
.ki-unified-cursor-v352.is-text { opacity: 0 !important; }

.ki-unified-cursor-v352 > span {
  position: absolute;
  pointer-events: none;
}

.ki-unified-cursor-v352__aura {
  inset: -9px;
  border-radius: 999px;
  background: radial-gradient(circle, var(--ki-cursor-aura) 0%, transparent 68%);
  opacity: .72;
  transform: scale(.98);
  transition: opacity 120ms ease, transform 120ms ease;
}

.ki-unified-cursor-v352__glass {
  inset: 0;
  border-radius: 999px;
  background:
    radial-gradient(circle at 34% 24%, rgba(255, 255, 255, .64) 0 9%, transparent 32%),
    linear-gradient(135deg, var(--ki-cursor-glass), var(--ki-cursor-glass-2));
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, .52) inset,
    0 0 0 1px rgba(20, 184, 166, .30),
    0 7px 18px var(--ki-cursor-shadow);
  opacity: .98;
  transition: border-radius 120ms cubic-bezier(.2, .9, .2, 1), box-shadow 120ms ease, background 120ms ease;
}

.ki-unified-cursor-v352__ring {
  inset: -1px;
  border-radius: 999px;
  background: conic-gradient(
    from 230deg,
    transparent 0 24deg,
    var(--ki-cursor-ring) 24deg 132deg,
    transparent 132deg 176deg,
    rgba(255,255,255,.70) 176deg 196deg,
    transparent 196deg 250deg,
    var(--ki-cursor-ring) 250deg 338deg,
    transparent 338deg 360deg
  );
  -webkit-mask: radial-gradient(circle, transparent 56%, #000 59%);
  mask: radial-gradient(circle, transparent 56%, #000 59%);
  opacity: .86;
  transition: opacity 120ms ease, transform 120ms ease;
}

.ki-unified-cursor-v352__dot {
  left: 50%;
  top: 50%;
  width: 4.5px;
  height: 4.5px;
  margin: -2.25px 0 0 -2.25px;
  border-radius: 999px;
  background: var(--ki-cursor-core);
  box-shadow: 0 0 9px rgba(20, 184, 166, .42);
  transition: opacity 100ms ease, transform 120ms ease, width 120ms ease, height 120ms ease, margin 120ms ease;
}

.ki-unified-cursor-v352__shine {
  left: 50%;
  top: 50%;
  width: 7px;
  height: 1.5px;
  margin: -8px 0 0 2px;
  border-radius: 999px;
  background: rgba(255,255,255,.76);
  transform: rotate(-34deg);
  opacity: .68;
  transition: opacity 100ms ease, transform 120ms ease;
}

.ki-unified-cursor-v352__badge {
  right: -4px;
  bottom: -4px;
  width: 15px;
  height: 15px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: #0f766e;
  background: rgba(240, 253, 250, .98);
  border: 1px solid rgba(20, 184, 166, .44);
  box-shadow: 0 8px 16px rgba(15, 118, 110, .18);
  font: 860 8.5px/1 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: -.01em;
  opacity: 0;
  transform: translate3d(-2px, 2px, 0) scale(.70);
  transition: opacity 120ms ease, transform 120ms cubic-bezier(.2, .9, .2, 1);
}

.ki-unified-cursor-v352__loader {
  inset: -2px;
  border-radius: 999px;
  opacity: 0;
  background: conic-gradient(from 0deg, transparent 0 42%, rgba(14, 165, 233, .95) 55%, transparent 74% 100%);
  -webkit-mask: radial-gradient(circle, transparent 58%, #000 61%);
  mask: radial-gradient(circle, transparent 58%, #000 61%);
}

.ki-unified-cursor-v352.mode-interactive {
  --ki-cursor-size: 33px;
  --ki-cursor-aura: rgba(20, 184, 166, .21);
  --ki-cursor-shadow: rgba(15, 118, 110, .22);
}

.ki-unified-cursor-v352.mode-interactive .ki-unified-cursor-v352__glass {
  border-radius: 13px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, .55) inset,
    0 0 0 1px rgba(20, 184, 166, .38),
    0 9px 22px var(--ki-cursor-shadow);
}

.ki-unified-cursor-v352.mode-interactive .ki-unified-cursor-v352__ring {
  opacity: .96;
  transform: rotate(22deg);
}

.ki-unified-cursor-v352.mode-interactive .ki-unified-cursor-v352__dot {
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
}

.ki-unified-cursor-v352.mode-glossary {
  --ki-cursor-size: 31px;
  --ki-cursor-ring: rgba(45, 212, 191, .96);
  --ki-cursor-core: rgba(15, 118, 110, .98);
  --ki-cursor-aura: rgba(45, 212, 191, .20);
}

.ki-unified-cursor-v352.mode-glossary .ki-unified-cursor-v352__dot {
  opacity: 0;
  transform: scale(.30);
}

.ki-unified-cursor-v352.mode-glossary .ki-unified-cursor-v352__badge {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.ki-unified-cursor-v352.mode-loading {
  --ki-cursor-size: 32px;
  --ki-cursor-ring: rgba(14, 165, 233, .95);
  --ki-cursor-core: rgba(14, 165, 233, .98);
  --ki-cursor-aura: rgba(14, 165, 233, .18);
}

.ki-unified-cursor-v352.mode-loading .ki-unified-cursor-v352__ring { opacity: .30; }
.ki-unified-cursor-v352.mode-loading .ki-unified-cursor-v352__loader {
  opacity: 1;
  animation: ki-unified-cursor-v352-spin 760ms linear infinite;
}

html.ki-unified-cursor-pressed .ki-unified-cursor-v352 {
  --ki-cursor-size: 18px;
}

html[data-theme='dark'] .ki-unified-cursor-v352,
[data-theme='dark'] .ki-unified-cursor-v352 {
  --ki-cursor-core: rgba(153, 246, 228, .98);
  --ki-cursor-ring: rgba(94, 234, 212, .92);
  --ki-cursor-glass: rgba(15, 23, 42, .42);
  --ki-cursor-glass-2: rgba(45, 212, 191, .07);
  --ki-cursor-aura: rgba(45, 212, 191, .19);
  --ki-cursor-shadow: rgba(45, 212, 191, .19);
}

html[data-theme='dark'] .ki-unified-cursor-v352__badge,
[data-theme='dark'] .ki-unified-cursor-v352__badge {
  color: #ccfbf1;
  background: rgba(15, 23, 42, .96);
  border-color: rgba(94, 234, 212, .42);
}

@keyframes ki-unified-cursor-v352-spin { to { transform: rotate(360deg); } }

@media (max-width: 767px) {
  .ki-unified-cursor-v352 { display: none !important; }
  html.ki-unified-cursor-active,
  html.ki-unified-cursor-active body,
  html.ki-unified-cursor-active body * { cursor: auto !important; }
}

@media (prefers-reduced-motion: reduce) {
  .ki-unified-cursor-v352,
  .ki-unified-cursor-v352 * {
    transition: none !important;
    animation-duration: 1ms !important;
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

function isTouchLikeEvent(event) {
  return event?.pointerType === 'touch' || event?.pointerType === 'pen';
}

export default function PremiumCursor() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    cleanupLegacyCursorArtifacts();
    injectCursorStyle();

    const root = document.documentElement;
    root.classList.remove(
      'ki-premium-cursor-on',
      'ki-premium-cursor-pressed',
      'ki-cursor-v350-enabled',
      'ki-cursor-v350-pressed',
      'ki-cursor-v351-active',
      'ki-cursor-v351-pressed',
      'ki-unified-cursor-active',
      'ki-unified-cursor-pressed',
    );

    document.getElementById(CURSOR_ID)?.remove();

    const node = document.createElement('div');
    node.id = CURSOR_ID;
    node.className = 'ki-unified-cursor-v352 is-hidden mode-default';
    node.dataset.mode = 'default';
    node.setAttribute('aria-hidden', 'true');
    node.innerHTML = `
      <span class="ki-unified-cursor-v352__aura"></span>
      <span class="ki-unified-cursor-v352__glass"></span>
      <span class="ki-unified-cursor-v352__ring"></span>
      <span class="ki-unified-cursor-v352__dot"></span>
      <span class="ki-unified-cursor-v352__shine"></span>
      <span class="ki-unified-cursor-v352__badge">i</span>
      <span class="ki-unified-cursor-v352__loader"></span>
    `;
    document.body.appendChild(node);

    let enabled = false;
    let visible = false;
    let raf = 0;
    let x = -140;
    let y = -140;
    let lastTransform = '';
    let mode = 'default';
    let lastTarget = null;
    let lastElementFromPointAt = 0;

    const enable = () => {
      if (enabled) return;
      enabled = true;
      root.classList.add('ki-unified-cursor-active');
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
      node.classList.toggle('is-text', nextMode === 'text');
      mode = nextMode;
      node.classList.add(`mode-${mode}`);
      node.dataset.mode = mode;
    };

    const updateModeFromTarget = (target) => {
      if (target === lastTarget) return;
      lastTarget = target;
      setMode(closestMode(target));
    };

    const updateModeFromPoint = () => {
      const now = performance.now();
      if (now - lastElementFromPointAt < 80) return;
      lastElementFromPointAt = now;
      const el = document.elementFromPoint(x, y);
      if (el && el !== node && !node.contains(el)) updateModeFromTarget(el);
    };

    const render = () => {
      raf = 0;
      if (!enabled) return;
      updateModeFromPoint();
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

    const handleMove = (event) => {
      if (isTouchLikeEvent(event)) return;
      enable();
      x = event.clientX;
      y = event.clientY;
      updateModeFromTarget(event.target);
      setVisible(true);
      requestRender();
    };

    const handleOver = (event) => {
      if (isTouchLikeEvent(event)) return;
      enable();
      updateModeFromTarget(event.target);
      setVisible(true);
    };

    const handleDown = (event) => {
      if (isTouchLikeEvent(event)) return;
      root.classList.add('ki-unified-cursor-pressed');
    };

    const handleUp = () => root.classList.remove('ki-unified-cursor-pressed');
    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true, capture: true });
    window.addEventListener('mousedown', handleDown, { passive: true });
    window.addEventListener('mouseup', handleUp, { passive: true });

    if ('PointerEvent' in window) {
      window.addEventListener('pointermove', handleMove, { passive: true });
      window.addEventListener('pointerover', handleOver, { passive: true, capture: true });
      window.addEventListener('pointerdown', handleDown, { passive: true });
      window.addEventListener('pointerup', handleUp, { passive: true });
    }

    document.addEventListener('mouseleave', handleLeave, { passive: true });
    window.addEventListener('blur', handleLeave);

    return () => {
      root.classList.remove('ki-unified-cursor-active', 'ki-unified-cursor-pressed');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver, true);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      if ('PointerEvent' in window) {
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerover', handleOver, true);
        window.removeEventListener('pointerdown', handleDown);
        window.removeEventListener('pointerup', handleUp);
      }
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('blur', handleLeave);
      if (raf) window.cancelAnimationFrame(raf);
      node.remove();
    };
  }, []);

  return null;
}
