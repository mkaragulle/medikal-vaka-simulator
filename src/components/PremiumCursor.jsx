import { useEffect, useRef, useState } from 'react';

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

const STYLE_ID = 'klinikiq-premium-cursor-native-hide';

function matchesMedia(query) {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
}

function canUsePremiumCursor() {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator?.userAgent || '';
  const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const reducedMotion = matchesMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchesMedia('(any-pointer: fine)') || matchesMedia('(pointer: fine)');
  const hoverCapable = matchesMedia('(any-hover: hover)') || matchesMedia('(hover: hover)');
  const desktopViewport = window.innerWidth >= 900 && !isMobileUA;
  return !reducedMotion && ((finePointer && hoverCapable) || desktopViewport);
}

function getCursorMode(target) {
  if (!target || !(target instanceof Element)) return 'default';
  const root = document.documentElement;
  const body = document.body;

  if (root.classList.contains('ki-is-scrolling')) return 'default';
  if (body?.classList.contains('cursor-loading') || root.classList.contains('cursor-loading')) return 'loading';
  if (target.closest(TEXT_TARGET_SELECTOR)) return 'text';
  if (target.closest(GLOSSARY_TARGET_SELECTOR)) return 'glossary';
  if (target.closest(LOADING_TARGET_SELECTOR)) return 'loading';
  if (target.closest(INTERACTIVE_TARGET_SELECTOR)) return 'interactive';
  return 'default';
}

function ensureNativeCursorStyle() {
  if (typeof document === 'undefined') return;
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  // Strong, late-injected native-cursor suppression prevents “old + new cursor” overlap.
  // Text-entry surfaces are explicitly restored to the system text cursor.
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
html.ki-premium-cursor-on button:disabled,
html.ki-premium-cursor-on [aria-disabled='true'] {
  cursor: none !important;
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

function setCursorMode(node, previousMode, nextMode) {
  if (!node || previousMode === nextMode) return previousMode;
  node.classList.remove(`ki-cursor--${previousMode}`, `premium-cursor--${previousMode}`);
  node.classList.add(`ki-cursor--${nextMode}`, `premium-cursor--${nextMode}`);
  node.setAttribute('data-mode', nextMode);
  return nextMode;
}

export default function PremiumCursor() {
  const cursorRef = useRef(null);
  const rafRef = useRef(0);
  const pointRef = useRef({ x: -120, y: -120 });
  const targetRef = useRef(null);
  const visibleRef = useRef(false);
  const modeRef = useRef('default');
  const lastTransformRef = useRef('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const updateCapability = () => setEnabled(canUsePremiumCursor());
    updateCapability();

    const queries = [
      '(any-pointer: fine)',
      '(pointer: fine)',
      '(any-hover: hover)',
      '(hover: hover)',
      '(prefers-reduced-motion: reduce)',
    ];
    const mediaQueries = queries.map((query) => window.matchMedia?.(query)).filter(Boolean);
    mediaQueries.forEach((query) => query.addEventListener?.('change', updateCapability));
    window.addEventListener('resize', updateCapability, { passive: true });

    return () => {
      mediaQueries.forEach((query) => query.removeEventListener?.('change', updateCapability));
      window.removeEventListener('resize', updateCapability);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const node = cursorRef.current;

    if (!enabled || !node) {
      root.classList.remove('ki-premium-cursor-on', 'premium-cursor-enabled', 'ki-premium-cursor-pressed', 'premium-cursor-pressed');
      return undefined;
    }

    ensureNativeCursorStyle();
    root.classList.add('ki-premium-cursor-on', 'premium-cursor-enabled');
    node.classList.add('ki-cursor--default', 'premium-cursor--default');
    node.setAttribute('data-mode', 'default');

    const render = () => {
      rafRef.current = 0;
      const cursor = cursorRef.current;
      if (!cursor) return;
      const { x, y } = pointRef.current;
      const transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      if (transform !== lastTransformRef.current) {
        lastTransformRef.current = transform;
        cursor.style.transform = transform;
      }
    };

    const requestRender = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(render);
    };

    const show = () => {
      if (visibleRef.current || root.classList.contains('ki-is-scrolling')) return;
      visibleRef.current = true;
      cursorRef.current?.classList.add('is-visible');
    };

    const hide = () => {
      if (!visibleRef.current) return;
      visibleRef.current = false;
      cursorRef.current?.classList.remove('is-visible');
    };

    const updateModeFromTarget = (target) => {
      if (target === targetRef.current) return;
      targetRef.current = target;
      modeRef.current = setCursorMode(cursorRef.current, modeRef.current, getCursorMode(target));
    };

    const handleMove = (event) => {
      if ('pointerType' in event && event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      pointRef.current.x = event.clientX;
      pointRef.current.y = event.clientY;
      updateModeFromTarget(event.target);
      show();
      requestRender();
    };

    const handlePointerOver = (event) => updateModeFromTarget(event.target);
    const handleFocusIn = (event) => updateModeFromTarget(event.target);
    const handleDown = () => root.classList.add('ki-premium-cursor-pressed', 'premium-cursor-pressed');
    const handleUp = () => root.classList.remove('ki-premium-cursor-pressed', 'premium-cursor-pressed');
    const handleScroll = () => hide();

    const moveEvent = window.PointerEvent ? 'pointermove' : 'mousemove';
    const downEvent = window.PointerEvent ? 'pointerdown' : 'mousedown';
    const upEvent = window.PointerEvent ? 'pointerup' : 'mouseup';
    const overEvent = window.PointerEvent ? 'pointerover' : 'mouseover';

    window.addEventListener(moveEvent, handleMove, { passive: true });
    window.addEventListener(downEvent, handleDown, { passive: true });
    window.addEventListener(upEvent, handleUp, { passive: true });
    document.addEventListener(overEvent, handlePointerOver, { passive: true });
    document.addEventListener('focusin', handleFocusIn);
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    window.addEventListener('blur', hide);

    return () => {
      root.classList.remove('ki-premium-cursor-on', 'premium-cursor-enabled', 'ki-premium-cursor-pressed', 'premium-cursor-pressed');
      node.classList.remove('is-visible');
      window.removeEventListener(moveEvent, handleMove);
      window.removeEventListener(downEvent, handleDown);
      window.removeEventListener(upEvent, handleUp);
      document.removeEventListener(overEvent, handlePointerOver);
      document.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      window.removeEventListener('blur', hide);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className="premium-cursor ki-cursor" aria-hidden="true">
      <span className="ki-cursor-glow" />
      <span className="ki-cursor-lens" />
      <span className="ki-cursor-notch ki-cursor-notch--top" />
      <span className="ki-cursor-notch ki-cursor-notch--right" />
      <span className="ki-cursor-notch ki-cursor-notch--bottom" />
      <span className="ki-cursor-notch ki-cursor-notch--left" />
      <span className="ki-cursor-dot" />
      <span className="ki-cursor-info">i</span>
      <span className="ki-cursor-spinner" />
    </div>
  );
}
