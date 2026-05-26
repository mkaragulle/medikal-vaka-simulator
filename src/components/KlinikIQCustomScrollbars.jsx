import { useEffect } from 'react';

const GLOBAL_HIDDEN_STYLE_ID = 'ki-global-hidden-scrollbars-v389-style';

const LEGACY_STYLE_IDS = [
  'ki-custom-scrollbars-v364-style',
  'ki-custom-scrollbars-v365-style',
  'ki-custom-scrollbars-v366-style',
  'ki-custom-scrollbars-v367-style',
  'ki-global-hidden-scrollbars-v386-style',
  GLOBAL_HIDDEN_STYLE_ID,
];

const LEGACY_ROOT_SELECTORS = [
  '[data-ki-custom-scrollbars-v364-root="true"]',
  '[data-ki-custom-scrollbars-v365-root="true"]',
  '[data-ki-custom-scrollbars-v366-root]',
  '[data-ki-custom-scrollbars-v367-root]',
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
];

function removeLegacyScrollbarLayers() {
  LEGACY_STYLE_IDS.forEach((id) => document.getElementById(id)?.remove());
  document.querySelectorAll(LEGACY_ROOT_SELECTORS).forEach((node) => node.remove());
  document.documentElement.classList.remove(...LEGACY_CLASSES);
  document.body?.classList?.remove?.(...LEGACY_CLASSES);
}

function createHiddenScrollbarStyle() {
  const style = document.createElement('style');
  style.id = GLOBAL_HIDDEN_STYLE_ID;
  style.textContent = `
html,
body,
* {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  scrollbar-color: transparent transparent !important;
}

html::-webkit-scrollbar,
body::-webkit-scrollbar,
*::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
  background: transparent !important;
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
}
`;
  return style;
}

export default function KlinikIQCustomScrollbars() {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    removeLegacyScrollbarLayers();
    document.head.appendChild(createHiddenScrollbarStyle());

    // V389: no MutationObserver here. The global hidden-scrollbar CSS keeps the
    // scroll function alive without continuously scanning the whole DOM.
    return () => {
      document.getElementById(GLOBAL_HIDDEN_STYLE_ID)?.remove();
      removeLegacyScrollbarLayers();
    };
  }, []);

  return null;
}
