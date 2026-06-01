import { memo, lazy, Suspense, useEffect, useMemo, useState } from 'react';

let glossaryCorePromise = null;

function loadGlossaryCore() {
  if (!glossaryCorePromise) {
    glossaryCorePromise = import('./GlossaryTooltipCore.jsx');
  }
  return glossaryCorePromise;
}

const GlossaryTooltipCore = lazy(loadGlossaryCore);

function scheduleNonBlocking(callback, timeout = 900) {
  if (typeof window === 'undefined') return () => {};
  if ('requestIdleCallback' in window) {
    const idleId = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback?.(idleId);
  }
  const timerId = window.setTimeout(callback, Math.min(timeout, 220));
  return () => window.clearTimeout(timerId);
}

function shouldHydrateGlossaryText({ enabled, text, maxTerms, nestingLevel }) {
  if (!enabled || maxTerms === 0) return false;
  if (Number(nestingLevel || 0) > 0) return true;
  const sourceText = String(text || '').trim();
  if (sourceText.length < 3) return false;
  if (!/[\p{L}]/u.test(sourceText)) return false;
  if (/^[\d\s.,:+/<>=%°µμ\-–()]+$/u.test(sourceText)) return false;
  return true;
}

function PlainGlossaryText({ text = '', nestingLevel = 0, contextMode = '' }) {
  return (
    <span className="glossary-text-flow glossary-text-flow--pending" data-nesting-level={nestingLevel} data-glossary-context-mode={contextMode || undefined}>
      {String(text || '')}
    </span>
  );
}

function GlossaryText(props) {
  const {
    text = '',
    enabled = true,
    maxTerms = undefined,
    nestingLevel = 0,
    contextMode = '',
  } = props;
  const shouldHydrate = useMemo(
    () => shouldHydrateGlossaryText({ enabled, text, maxTerms, nestingLevel }),
    [enabled, text, maxTerms, nestingLevel],
  );
  const [coreReady, setCoreReady] = useState(() => glossaryCorePromise !== null);

  useEffect(() => {
    if (!shouldHydrate) return undefined;
    let cancelled = false;
    const cancelScheduledLoad = scheduleNonBlocking(() => {
      loadGlossaryCore().then(() => {
        if (!cancelled) setCoreReady(true);
      });
    }, Number(nestingLevel || 0) > 0 ? 120 : 1100);

    return () => {
      cancelled = true;
      cancelScheduledLoad?.();
    };
  }, [shouldHydrate, nestingLevel]);

  if (!shouldHydrate || !coreReady) {
    return <PlainGlossaryText text={text} nestingLevel={nestingLevel} contextMode={contextMode} />;
  }

  return (
    <Suspense fallback={<PlainGlossaryText text={text} nestingLevel={nestingLevel} contextMode={contextMode} />}>
      <GlossaryTooltipCore {...props} />
    </Suspense>
  );
}

export function preloadGlossaryText() {
  return loadGlossaryCore();
}

export default memo(GlossaryText);
