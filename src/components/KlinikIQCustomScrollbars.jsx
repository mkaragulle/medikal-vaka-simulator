import { useEffect } from 'react';

const ROOT_CLASS = 'ki-custom-scrollbars-v367-on';
const DRAGGING_CLASS = 'ki-custom-scrollbar-v367-dragging';
const STYLE_ID = 'ki-custom-scrollbars-v367-style';
const GLOBAL_HIDDEN_STYLE_ID = 'ki-global-hidden-scrollbars-v386-style';

const LEGACY_STYLE_IDS = [
  'ki-custom-scrollbars-v364-style',
  'ki-custom-scrollbars-v365-style',
  'ki-custom-scrollbars-v366-style',
  'ki-custom-scrollbars-v367-style',
  GLOBAL_HIDDEN_STYLE_ID,
];

const LEGACY_ROOT_SELECTORS = [
  '[data-ki-custom-scrollbars-v364-root="true"]',
  '[data-ki-custom-scrollbars-v365-root="true"]',
  '[data-ki-custom-scrollbars-v366-root]',
  '[data-ki-custom-scrollbars-v366-root="true"]',
  '[data-ki-custom-scrollbars-v367-root]',
  '[data-ki-custom-scrollbars-v367-root="true"]',
  '[data-ki-custom-scrollbar-v367-track]',
  '[data-ki-custom-scrollbar-v367-thumb]',
  '.ki-custom-scrollbar-v367-track',
  '.ki-custom-scrollbar-v367-thumb',
].join(', ');

const LEGACY_CLASSES = [
  'ki-custom-scrollbars-v364-on',
  'ki-custom-scrollbar-v364-dragging',
  'ki-custom-scrollbars-v365-on',
  'ki-custom-scrollbar-v365-dragging',
  'ki-custom-scrollbars-v366-on',
  'ki-custom-scrollbar-v366-dragging',
  'ki-custom-scrollbars-v367-on',
  'ki-custom-scrollbar-v367-dragging',
  ROOT_CLASS,
  DRAGGING_CLASS,
];

function removeLegacyScrollbarLayers() {
  LEGACY_STYLE_IDS.forEach((id) => document.getElementById(id)?.remove());
  document.querySelectorAll(LEGACY_ROOT_SELECTORS).forEach((node) => node.remove());
  document.documentElement.classList.remove(...LEGACY_CLASSES);
}

function createHiddenScrollbarStyle() {
  const style = document.createElement('style');
  style.id = GLOBAL_HIDDEN_STYLE_ID;
  style.textContent = `
html,
body,
*,
*::before,
*::after {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  scrollbar-color: transparent transparent !important;
  scrollbar-gutter: auto !important;
}

html::-webkit-scrollbar,
body::-webkit-scrollbar,
*::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
  background: transparent !important;
}

html::-webkit-scrollbar-track,
html::-webkit-scrollbar-thumb,
html::-webkit-scrollbar-corner,
body::-webkit-scrollbar-track,
body::-webkit-scrollbar-thumb,
body::-webkit-scrollbar-corner,
*::-webkit-scrollbar-track,
*::-webkit-scrollbar-thumb,
*::-webkit-scrollbar-corner {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

[data-ki-custom-scrollbars-v364-root],
[data-ki-custom-scrollbars-v365-root],
[data-ki-custom-scrollbars-v366-root],
[data-ki-custom-scrollbars-v367-root],
[data-ki-custom-scrollbar-v367-track],
[data-ki-custom-scrollbar-v367-thumb],
.ki-custom-scrollbar-v367-track,
.ki-custom-scrollbar-v367-thumb {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  opacity: 0 !important;
  pointer-events: none !important;
  background: transparent !important;
  box-shadow: none !important;
}
`;
  return style;
}

export default function KlinikIQCustomScrollbars() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    removeLegacyScrollbarLayers();
    document.head.appendChild(createHiddenScrollbarStyle());

    const cleanupObserver = new MutationObserver(() => {
      document.querySelectorAll(LEGACY_ROOT_SELECTORS).forEach((node) => node.remove());
      document.documentElement.classList.remove(ROOT_CLASS, DRAGGING_CLASS);
    });

    cleanupObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanupObserver.disconnect();
      document.getElementById(GLOBAL_HIDDEN_STYLE_ID)?.remove();
      removeLegacyScrollbarLayers();
    };
  }, []);

  return null;
}
