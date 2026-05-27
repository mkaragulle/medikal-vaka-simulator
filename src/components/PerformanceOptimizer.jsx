import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const root = document.documentElement;
    root.classList.add('ki-performance-mode');
    root.classList.remove('ki-is-scrolling', 'ki-is-resizing', 'ki-route-transitioning');

    return () => {
      root.classList.remove('ki-performance-mode', 'ki-is-scrolling', 'ki-is-resizing', 'ki-route-transitioning');
    };
  }, []);

  return null;
}
