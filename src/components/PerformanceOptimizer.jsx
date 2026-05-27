import { useEffect } from 'react';

const SCROLL_IDLE_DELAY = 140;
const RESIZE_IDLE_DELAY = 220;

export default function PerformanceOptimizer() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    const root = document.documentElement;
    root.classList.add('ki-performance-mode');

    let scrollTimer = 0;
    let resizeTimer = 0;
    let lastScrollMark = 0;

    const clearScrollState = () => {
      scrollTimer = 0;
      root.classList.remove('ki-is-scrolling');
    };

    const markScrolling = () => {
      const now = window.performance?.now?.() || Date.now();
      if (now - lastScrollMark > 48) {
        lastScrollMark = now;
        root.classList.add('ki-is-scrolling');
      }
      if (scrollTimer) window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(clearScrollState, SCROLL_IDLE_DELAY);
    };

    const clearResizeState = () => {
      resizeTimer = 0;
      root.classList.remove('ki-is-resizing');
    };

    const markResizing = () => {
      root.classList.add('ki-is-resizing');
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(clearResizeState, RESIZE_IDLE_DELAY);
    };

    const markNavigationStart = () => {
      root.classList.add('ki-route-transitioning');
      window.setTimeout(() => root.classList.remove('ki-route-transitioning'), 260);
    };

    window.addEventListener('scroll', markScrolling, { passive: true, capture: true });
    window.addEventListener('resize', markResizing, { passive: true });
    window.addEventListener('orientationchange', markResizing, { passive: true });
    window.addEventListener('popstate', markNavigationStart, { passive: true });

    return () => {
      root.classList.remove('ki-performance-mode', 'ki-is-scrolling', 'ki-is-resizing', 'ki-route-transitioning');
      window.removeEventListener('scroll', markScrolling, true);
      window.removeEventListener('resize', markResizing);
      window.removeEventListener('orientationchange', markResizing);
      window.removeEventListener('popstate', markNavigationStart);
      if (scrollTimer) window.clearTimeout(scrollTimer);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, []);

  return null;
}
