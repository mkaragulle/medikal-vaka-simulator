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
  '[data-glossary-entry-id]',
  '[data-cursor="glossary"]',
].join(', ');

const INTERACTIVE_TARGET_SELECTOR = [
  'a[href]',
  'button',
  '[role="button"]',
  '[tabindex]:not([tabindex="-1"])',
  '.btn',
  '.case-card',
  '.branch-card',
  '.option-card',
  '.visual-help-toggle',
  '.premium-visual-help-toggle',
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

function canUsePremiumCursor() {
  if (typeof window === 'undefined') return false;
  if (!window.matchMedia) return true;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const hoverCapable = window.matchMedia('(hover: hover)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return hasFinePointer && hoverCapable && !reducedMotion;
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
  const lastPointRef = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('default');

  useEffect(() => {
    const updateCapability = () => setEnabled(canUsePremiumCursor());
    updateCapability();

    const mediaQueries = [
      window.matchMedia?.('(pointer: fine)'),
      window.matchMedia?.('(hover: hover)'),
      window.matchMedia?.('(prefers-reduced-motion: reduce)'),
    ].filter(Boolean);

    mediaQueries.forEach((query) => query.addEventListener?.('change', updateCapability));
    return () => mediaQueries.forEach((query) => query.removeEventListener?.('change', updateCapability));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled) {
      root.classList.remove('premium-cursor-enabled');
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

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      lastPointRef.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
      setMode(resolveCursorMode(event.target));
      scheduleMove();
    };

    const handlePointerDown = () => {
      document.documentElement.classList.add('premium-cursor-pressed');
    };

    const handlePointerUp = () => {
      document.documentElement.classList.remove('premium-cursor-pressed');
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      root.classList.remove('premium-cursor-enabled', 'premium-cursor-pressed');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
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
