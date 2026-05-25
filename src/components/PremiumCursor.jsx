import { useEffect, useRef } from 'react';

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

const STYLE_ID = 'klinikiq-premium-cursor-runtime-style-v349';

function isTouchOnlyDevice() {
  if (typeof window === 'undefined') return true;
  const ua = window.navigator?.userAgent || '';
  const mobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const coarseOnly = window.matchMedia?.('(pointer: coarse)')?.matches && !window.matchMedia?.('(any-pointer: fine)')?.matches;
  return mobileUA || coarseOnly || window.innerWidth < 768;
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
}

function getCursorMode(target) {
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

function injectCursorRuntimeStyle() {
  if (typeof document === 'undefined') return;
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = `
html.ki-premium-cursor-on,
html.ki-premium-cursor-on body,
html.ki-premium-cursor-on *:not(input):not(textarea):not(select):not([contenteditable='true']):not([contenteditable='']) {
  cursor: none !important;
}
html.ki-premium-cursor-on input,
html.ki-premium-cursor-on textarea,
html.ki-premium-cursor-on select,
html.ki-premium-cursor-on [contenteditable='true'],
html.ki-premium-cursor-on [contenteditable=''] {
  cursor: text !important;
}
@media (max-width: 767px), (pointer: coarse) and (not (any-pointer: fine)) {
  html.ki-premium-cursor-on,
  html.ki-premium-cursor-on body,
  html.ki-premium-cursor-on * {
    cursor: auto !important;
  }
}
`;
}

function setMode(node, previousMode, nextMode) {
  if (!node || previousMode === nextMode) return previousMode;
  node.classList.remove(`ki-cursor--${previousMode}`, `premium-cursor--${previousMode}`);
  node.classList.add(`ki-cursor--${nextMode}`, `premium-cursor--${nextMode}`);
  node.dataset.mode = nextMode;
  return nextMode;
}

export default function PremiumCursor() {
  const cursorRef = useRef(null);
  const rafRef = useRef(0);
  const pointRef = useRef({ x: -100, y: -100 });
  const modeRef = useRef('default');
  const lastTargetRef = useRef(null);
  const lastTransformRef = useRef('');
  const enabledRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    const root = document.documentElement;
    const node = cursorRef.current;
    if (!node) return undefined;

    const enable = () => {
      if (enabledRef.current || isTouchOnlyDevice() || prefersReducedMotion()) return false;
      enabledRef.current = true;
      injectCursorRuntimeStyle();
      root.classList.add('ki-premium-cursor-on', 'premium-cursor-enabled');
      node.classList.add('ki-cursor--default', 'premium-cursor--default');
      node.dataset.mode = 'default';
      return true;
    };

    const disable = () => {
      enabledRef.current = false;
      visibleRef.current = false;
      root.classList.remove(
        'ki-premium-cursor-on',
        'premium-cursor-enabled',
        'ki-premium-cursor-pressed',
        'premium-cursor-pressed',
      );
      node.classList.remove('is-visible');
    };

    const render = () => {
      rafRef.current = 0;
      if (!enabledRef.current) return;
      const { x, y } = pointRef.current;
      const nextTransform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      if (nextTransform !== lastTransformRef.current) {
        lastTransformRef.current = nextTransform;
        node.style.transform = nextTransform;
      }
    };

    const requestRender = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(render);
    };

    const show = () => {
      if (!enabledRef.current || visibleRef.current) return;
      visibleRef.current = true;
      node.classList.add('is-visible');
    };

    const hide = () => {
      if (!visibleRef.current) return;
      visibleRef.current = false;
      node.classList.remove('is-visible');
    };

    const updateMode = (target) => {
      if (!enabledRef.current || target === lastTargetRef.current) return;
      lastTargetRef.current = target;
      modeRef.current = setMode(node, modeRef.current, getCursorMode(target));
    };

    const handleMove = (event) => {
      const pointerType = event.pointerType;
      if (pointerType && pointerType !== 'mouse' && pointerType !== 'pen') return;
      if (!enable()) {
        if (!enabledRef.current) return;
      }
      pointRef.current.x = event.clientX;
      pointRef.current.y = event.clientY;
      updateMode(event.target);
      show();
      requestRender();
    };

    const handleOver = (event) => updateMode(event.target);
    const handleFocus = (event) => updateMode(event.target);
    const handleDown = () => root.classList.add('ki-premium-cursor-pressed', 'premium-cursor-pressed');
    const handleUp = () => root.classList.remove('ki-premium-cursor-pressed', 'premium-cursor-pressed');
    const handleLeave = hide;
    const handleResize = () => {
      if (isTouchOnlyDevice() || prefersReducedMotion()) disable();
    };

    // Register both pointer and mouse events. Some browsers/environments expose
    // PointerEvent but still behave more reliably with mousemove for custom cursors.
    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('mousedown', handleDown, { passive: true });
    window.addEventListener('pointerup', handleUp, { passive: true });
    window.addEventListener('mouseup', handleUp, { passive: true });
    document.addEventListener('pointerover', handleOver, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('mouseleave', handleLeave);
    window.addEventListener('blur', hide);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      disable();
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('mouseup', handleUp);
      document.removeEventListener('pointerover', handleOver);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('blur', hide);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={cursorRef} className="premium-cursor ki-cursor" aria-hidden="true">
      <span className="ki-cursor-aura" />
      <span className="ki-cursor-ring" />
      <span className="ki-cursor-cross ki-cursor-cross--v" />
      <span className="ki-cursor-cross ki-cursor-cross--h" />
      <span className="ki-cursor-core" />
      <span className="ki-cursor-info">i</span>
      <span className="ki-cursor-spinner" />
    </div>
  );
}
