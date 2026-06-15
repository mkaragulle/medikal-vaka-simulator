import { useEffect } from 'react';

const STYLE_ID = 'ki-pointer-v364-runtime-style';
const ROOT_ATTR = 'data-ki-pointer-v364-root';

const LEGACY_SELECTORS = [
  '.ki-cursor',
  '.ki-cursor-v350',
  '.ki-cursor-v351',
  '.ki-unified-cursor-v352',
  '.ki-minimal-premium-cursor-v353',
  '.ki-simple-cursor-root',
  '.premium-cursor',
  '.premium-cursor-root',
  '.clinical-cursor-root',
  '.klinq-cursor-root',
  '.cursor-lens',
  '.cursor-orb',
  '.cursor-ring',
  '[data-klinq-old-cursor-root]',
  '[data-klinq-cursor-root]',
  '[data-cursor-root]',
  '[data-ki-simple-cursor-root]',
  '[data-ki-pointer-v355-root]',
  '[data-ki-pointer-v356-root]',
  '[data-ki-pointer-v357-root]',
  '[data-ki-pointer-v358-root]',
  '[data-ki-pointer-v359-root]',
  '[data-ki-pointer-v360-root]',
  '[data-ki-pointer-v361-root]',
  '[data-ki-pointer-v362-root]',
  '[data-ki-pointer-v363-root]',
  `[${ROOT_ATTR}="true"]`,
].join(', ');

const LEGACY_STYLE_IDS = [
  STYLE_ID,
  'ki-pointer-v355-runtime-style',
  'ki-pointer-v356-runtime-style',
  'ki-pointer-v357-runtime-style',
  'ki-pointer-v358-runtime-style',
  'ki-pointer-v359-runtime-style',
  'ki-pointer-v360-runtime-style',
  'ki-pointer-v361-runtime-style',
  'ki-pointer-v362-runtime-style',
  'ki-pointer-v363-runtime-style',
  'ki-simple-cursor-runtime-style-v354',
  'klinikiq-minimal-premium-cursor-style-v353',
  'klinikiq-unified-premium-cursor-runtime-style-v352',
  'klinikiq-premium-cursor-runtime-style-v351',
  'klinikiq-premium-cursor-runtime-style-v350',
  'klinikiq-premium-cursor-runtime-style-v349',
  'klinikiq-premium-cursor-runtime-style-v348',
  'klinikiq-premium-cursor-runtime-style',
];

const LEGACY_ROOT_CLASSES = [
  'ki-pointer-v364-on',
  'ki-pointer-v355-on',
  'ki-pointer-v356-on',
  'ki-pointer-v357-on',
  'ki-pointer-v358-on',
  'ki-pointer-v359-on',
  'ki-pointer-v360-on',
  'ki-pointer-v361-on',
  'ki-pointer-v362-on',
  'ki-pointer-v363-on',
  'ki-simple-cursor-active',
  'ki-simple-cursor-pressed',
  'ki-minimal-cursor-active',
  'ki-minimal-cursor-pressed',
  'ki-unified-cursor-active',
  'ki-unified-cursor-pressed',
  'ki-premium-cursor-on',
  'ki-premium-cursor-pressed',
  'premium-cursor-active',
  'premium-cursor-enabled',
  'custom-cursor-active',
];

function cleanupLegacyCursor() {
  LEGACY_STYLE_IDS.forEach((id) => document.getElementById(id)?.remove());
  document.querySelectorAll(LEGACY_SELECTORS).forEach((node) => node.remove());
  document.documentElement.classList.remove(...LEGACY_ROOT_CLASSES);
  document.body?.classList?.remove?.(...LEGACY_ROOT_CLASSES);
}

export default function PremiumCursor() {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    cleanupLegacyCursor();

    // V389: custom cursor rendering is intentionally disabled.
    // Native cursor removes the global pointermove RAF loop that caused micro-stutters
    // around large KlinikIQ sections while preserving the visual UI itself.
    return () => cleanupLegacyCursor();
  }, []);

  return null;
}
