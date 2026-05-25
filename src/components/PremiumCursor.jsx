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
  '.btn',
  '.case-card',
  '.branch-card',
  '.option-card',
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

const NATIVE_CURSOR_STYLE_ID = 'klinikiq-premium-cursor-native-hide';

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
  const hasFinePointer = matchesMedia('(any-pointer: fine)') || matchesMedia('(pointer: fine)');
  const hasHover = matchesMedia('(any-hover: hover)') || matchesMedia('(hover: hover)');
  const looksLikeDesktop = window.innerWidth >= 900 && !isMobileUA;
  return !reducedMotion && ((hasFinePointer && hasHover) || looksLikeDesktop);
}

function resolveMode(target) {
  if (!target || !(target instanceof Element)) return 'default';
  const body = document.body;
  if (body?.classList.contains('cursor-loading')) return 'loading';
  if (target.closest(TEXT_TARGET_SELECTOR)) return 'text';
  if (target.closest(GLOSSARY_TARGET_SELECTOR)) return 'glossary';
  if (target.closest(LOADING_TARGET_SELECTOR)) return 'loading';
  if (target.closest(INTERACTIVE_TARGET_SELECTOR)) return 'interactive';
  return 'default';
}

function injectNativeCursorStyle() {
  if (typeof document === 'undefined') return null;
  const existing = document.getElementById(NATIVE_CURSOR_STYLE_ID);
  if (existing) return existing;

  const style = document.createElement('style');
  style.id = NATIVE_CURSOR_STYLE_ID;
  style.textContent = `
html.ki-premium-cursor-on,
html.ki-premium-cursor-on body {
  cursor: none !important;
}
html.ki-premium-cursor-on a,
html.ki-premium-cursor-on button,
html.ki-premium-cursor-on [role='button'],
html.ki-premium-cursor-on [tabindex]:not([tabindex='-1']),
html.ki-premium-cursor-on .btn,
html.ki-premium-cursor-on .case-card,
html.ki-premium-cursor-on .branch-card,
html.ki-premium-cursor-on .option-card,
html.ki-premium-cursor-on .glossary-term,
html.ki-premium-cursor-on .smart-glossary-term,
html.ki-premium-cursor-on .glossary-word,
html.ki-premium-cursor-on .nested-glossary-term,
html.ki-premium-cursor-on [data-glossary-entry-id],
html.ki-premium-cursor-on [data-cursor='glossary'],
html.ki-premium-cursor-on [data-cursor='interactive'] {
  cursor: none !important;
}
html.ki-premium-cursor-on input,
html.ki-premium-cursor-on textarea,
html.ki-premium-cursor-on select,
html.ki-premium-cursor-on [contenteditable='true'],
html.ki-premium-cursor-on [contenteditable=''] {
  cursor: text !important;
}
@media (max-width: 767px), (pointer: coarse) {
  html.ki-premium-cursor-on,
  html.ki-premium-cursor-on body,
  html.ki-premium-cursor-on a,
  html.ki-premium-cursor-on button,
  html.ki-premium-cursor-on [role='button'],
  html.ki-premium-cursor-on .glossary-term,
  html.ki-premium-cursor-on .smart-glossary-term,
  html.ki-premium-cursor-on [data-glossary-entry-id] {
    cursor: auto !important;
  }
}
`;
  document.head.appendChild(style);
  return style;
}

function setModeClass(node, previousMode, nextMode) {
  if (!node || previousMode === nextMode) return previousMode;
  node.classList.remove(`premium-cursor--${previousMode}`);
  node.classList.add(`premium-cursor--${nextMode}`);
  node.setAttribute('data-mode', nextMode);
  return nextMode;
}

export default function PremiumCursor() {
  const cursorRef = useRef(null);
  const rafRef = useRef(0);
  const pointRef = useRef({ x: -160, y: -160 });
  const modeRef = useRef('default');
  const targetRef = useRef(null);
  const visibleRef = useRef(false);
  const lastTransformRef = useRef('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const updateCapability = () => setEnabled(canUsePremiumCursor());
    updateCapability();

    const queries = ['(any-pointer: fine)', '(pointer: fine)', '(any-hover: hover)', '(hover: hover)', '(prefers-reduced-motion: reduce)'];
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

    injectNativeCursorStyle();
    root.classList.add('ki-premium-cursor-on', 'premium-cursor-enabled');
    node.classList.add('premium-cursor--default');
    node.setAttribute('data-mode', 'default');

    const renderCursor = () => {
      rafRef.current = 0;
      const cursor = cursorRef.current;
      if (!cursor) return;
      const { x, y } = pointRef.current;
      const nextTransform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      if (lastTransformRef.current !== nextTransform) {
        lastTransformRef.current = nextTransform;
        cursor.style.transform = nextTransform;
      }
    };

    const requestRender = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(renderCursor);
    };

    const showCursor = () => {
      if (visibleRef.current || document.documentElement.classList.contains('ki-is-scrolling')) return;
      visibleRef.current = true;
      cursorRef.current?.classList.add('is-visible');
    };

    const hideCursor = () => {
      if (!visibleRef.current) return;
      visibleRef.current = false;
      cursorRef.current?.classList.remove('is-visible');
    };

    const handleMove = (event) => {
      if ('pointerType' in event && event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      pointRef.current.x = event.clientX;
      pointRef.current.y = event.clientY;
      if (event.target !== targetRef.current) {
        targetRef.current = event.target;
        const nextMode = document.documentElement.classList.contains('ki-is-scrolling') ? 'default' : resolveMode(event.target);
        modeRef.current = setModeClass(cursorRef.current, modeRef.current, nextMode);
      }
      showCursor();
      requestRender();
    };

    const handleDown = () => root.classList.add('ki-premium-cursor-pressed', 'premium-cursor-pressed');
    const handleUp = () => root.classList.remove('ki-premium-cursor-pressed', 'premium-cursor-pressed');
    const handleScrollStart = () => hideCursor();

    const moveEvent = window.PointerEvent ? 'pointermove' : 'mousemove';
    const downEvent = window.PointerEvent ? 'pointerdown' : 'mousedown';
    const upEvent = window.PointerEvent ? 'pointerup' : 'mouseup';

    window.addEventListener(moveEvent, handleMove, { passive: true });
    window.addEventListener(downEvent, handleDown, { passive: true });
    window.addEventListener(upEvent, handleUp, { passive: true });
    window.addEventListener('scroll', handleScrollStart, { passive: true, capture: true });
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);
    window.addEventListener('blur', hideCursor);

    return () => {
      root.classList.remove('ki-premium-cursor-on', 'premium-cursor-enabled', 'ki-premium-cursor-pressed', 'premium-cursor-pressed');
      window.removeEventListener(moveEvent, handleMove);
      window.removeEventListener(downEvent, handleDown);
      window.removeEventListener(upEvent, handleUp);
      window.removeEventListener('scroll', handleScrollStart, true);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      window.removeEventListener('blur', hideCursor);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className="premium-cursor" aria-hidden="true">
      <span className="premium-cursor-aura" />
      <span className="premium-cursor-ring" />
      <span className="premium-cursor-core" />
      <span className="premium-cursor-info">i</span>
      <span className="premium-cursor-loader" />
    </div>
  );
}
