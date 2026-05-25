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

  const hasFinePointer = matchesMedia('(any-pointer: fine)') || matchesMedia('(pointer: fine)');
  const hasHover = matchesMedia('(any-hover: hover)') || matchesMedia('(hover: hover)');
  const looksLikeDesktop = window.innerWidth >= 768 && !/Mobi|Android|iPhone|iPad|iPod/i.test(window.navigator?.userAgent || '');

  return (hasFinePointer && hasHover) || looksLikeDesktop;
}

function resolveCursorMode(target) {
  if (!target || !(target instanceof Element)) return 'default';
  if (document.body?.classList.contains('cursor-loading')) return 'loading';
  if (target.closest(TEXT_TARGET_SELECTOR)) return 'text';
  if (target.closest(GLOSSARY_TARGET_SELECTOR)) return 'glossary';
  if (target.closest(LOADING_TARGET_SELECTOR)) return 'loading';
  if (target.closest(INTERACTIVE_TARGET_SELECTOR)) return 'interactive';
  return 'default';
}

export default function PremiumCursor() {
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  const lastPointRef = useRef({ x: -120, y: -120 });
  const lastModeRef = useRef('default');
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('default');

  useEffect(() => {
    const updateCapability = () => setEnabled(canUsePremiumCursor());
    updateCapability();

    const queries = ['(any-pointer: fine)', '(pointer: fine)', '(any-hover: hover)', '(hover: hover)'];
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
    if (!enabled) {
      root.classList.remove('premium-cursor-enabled', 'premium-cursor-pressed');
      setVisible(false);
      return undefined;
    }

    root.classList.add('premium-cursor-enabled');

    const moveCursor = () => {
      rafRef.current = null;
      const node = cursorRef.current;
      if (!node) return;
      const { x, y } = lastPointRef.current;
      node.style.setProperty('--premium-cursor-x', `${x}px`);
      node.style.setProperty('--premium-cursor-y', `${y}px`);
    };

    const scheduleMove = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(moveCursor);
    };

    const handleMove = (event) => {
      if ('pointerType' in event && event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      lastPointRef.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
      const nextMode = resolveCursorMode(event.target);
      if (lastModeRef.current !== nextMode) {
        lastModeRef.current = nextMode;
        setMode(nextMode);
      }
      scheduleMove();
    };

    const handleDown = () => root.classList.add('premium-cursor-pressed');
    const handleUp = () => root.classList.remove('premium-cursor-pressed');
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('mousedown', handleDown, { passive: true });
    window.addEventListener('pointerup', handleUp, { passive: true });
    window.addEventListener('mouseup', handleUp, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      root.classList.remove('premium-cursor-enabled', 'premium-cursor-pressed');
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={['premium-cursor', `premium-cursor--${mode}`, visible ? 'is-visible' : ''].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <span className="premium-cursor-ring" />
      <span className="premium-cursor-dot" />
      <span className="premium-cursor-info">i</span>
      <span className="premium-cursor-loader" />
    </div>
  );
}
