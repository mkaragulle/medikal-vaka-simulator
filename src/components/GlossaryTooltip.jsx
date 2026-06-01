import { memo, useEffect, useState } from 'react';

let glossaryModulePromise = null;
let glossaryComponent = null;

function loadFullGlossaryTooltip() {
  if (glossaryComponent) return Promise.resolve(glossaryComponent);
  if (!glossaryModulePromise) {
    glossaryModulePromise = import('./GlossaryTooltip.full.jsx').then((module) => {
      glossaryComponent = module.default;
      return glossaryComponent;
    });
  }
  return glossaryModulePromise;
}

export function preloadGlossaryTooltip() {
  return loadFullGlossaryTooltip();
}

function scheduleIdle(callback, timeout = 1400) {
  if (typeof window === 'undefined') return () => {};
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(callback, Math.min(timeout, 700));
  return () => window.clearTimeout(id);
}

function DeferredPlainText({ text = '', nestingLevel = 0, contextMode = '' }) {
  return (
    <span
      className="glossary-text-flow glossary-text-flow-deferred"
      data-nesting-level={nestingLevel}
      data-glossary-context-mode={contextMode || 'deferred'}
    >
      {String(text || '')}
    </span>
  );
}

function GlossaryText(props) {
  const { text = '', enabled = true, nestingLevel = 0, contextMode = '' } = props;
  const [FullGlossaryText, setFullGlossaryText] = useState(() => glossaryComponent);

  useEffect(() => {
    if (!enabled || FullGlossaryText) return undefined;

    let active = true;
    return scheduleIdle(() => {
      loadFullGlossaryTooltip()
        .then((Component) => {
          if (active) setFullGlossaryText(() => Component);
        })
        .catch(() => {
          // Tooltip katmanı başarısız olursa metin yine okunabilir kalır.
        });
    });
  }, [enabled, FullGlossaryText]);

  if (!enabled || !FullGlossaryText) {
    return <DeferredPlainText text={text} nestingLevel={nestingLevel} contextMode={contextMode} />;
  }

  return <FullGlossaryText {...props} />;
}

export default memo(GlossaryText);
