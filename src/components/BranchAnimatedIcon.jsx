export const BRANCH_ANIMATED_ICON_IDS = new Set([
  'anatomy',
  'physiology',
  'histology-embryology',
  'medical-biochemistry',
  'medical-microbiology',
  'medical-pathology',
  'medical-pharmacology',
  'internal-medicine',
  'pediatrics',
  'general-surgery',
  'obstetrics-gynecology',
  'minor-rotations',
]);

function AnatomyIcon() {
  return (
    <>
      <g className="branch-svg-main anatomy-frame">
        <path d="M20 6.4c-4.05 0-7.2 2.78-7.2 6.5 0 1.55.55 2.92 1.48 3.95l-1.9 11.2c-.18 1.08.65 2.05 1.74 2.05h11.76c1.1 0 1.92-.97 1.74-2.05l-1.9-11.2a5.92 5.92 0 0 0 1.48-3.95c0-3.72-3.15-6.5-7.2-6.5Z" />
        <path className="anatomy-spine branch-svg-detail" d="M20 10.2v18.2" />
        <path className="anatomy-ribs branch-svg-secondary" d="M15.9 14.4c1.34.9 2.7 1.36 4.1 1.36s2.76-.46 4.1-1.36" />
        <path className="anatomy-ribs branch-svg-secondary" d="M15.2 18.7h9.6M16.05 23h7.9" />
      </g>
      <path className="branch-svg-scan anatomy-scan" d="M11.8 20h16.4" />
      <g className="branch-svg-particles anatomy-dots">
        <circle cx="13.2" cy="12.7" r=".58" />
        <circle cx="26.8" cy="25.7" r=".58" />
      </g>
    </>
  );
}

function PhysiologyIcon() {
  return (
    <>
      <g className="branch-svg-main physiology-heart">
        <path d="M20 30.4c-6.45-4.5-10.1-8.1-10.1-12.84 0-3.04 2.2-5.32 5.02-5.32 1.92 0 3.65 1.02 5.08 2.68 1.43-1.66 3.16-2.68 5.08-2.68 2.82 0 5.02 2.28 5.02 5.32 0 4.74-3.65 8.34-10.1 12.84Z" />
        <path className="physiology-ecg branch-svg-detail" d="M10.4 20.4h5.2l1.22-2.68 3.04 6.24 2.3-4.92 1.5 2.78h5.94" />
      </g>
      <circle className="physiology-ring physiology-ring-one" cx="20" cy="20" r="11" />
      <circle className="physiology-ring physiology-ring-two" cx="20" cy="20" r="13.2" />
    </>
  );
}

function HistologyIcon() {
  return (
    <>
      <g className="branch-svg-main histology-cell">
        <path d="M12.2 12.15c2.95-2.82 7.7-3.2 11.2-.92 3.9 2.55 4.98 7.85 2.46 11.72-2.35 3.62-7.18 4.98-11.14 3.15-4.08-1.88-5.68-6.8-3.78-10.78.34-.74.76-1.44 1.26-2.17Z" />
        <path className="histology-nucleus branch-svg-secondary" d="M16.05 16.3c1.28-1.22 3.36-1.38 4.78-.36 1.54 1.1 1.95 3.24.93 4.86-.98 1.55-3.05 2.12-4.74 1.32-1.72-.8-2.4-2.88-1.62-4.58.18-.46.42-.84.65-1.24Z" />
        <circle className="histology-dot dot-one" cx="19" cy="19" r=".86" />
        <circle className="histology-dot dot-two" cx="24.9" cy="13.6" r=".66" />
        <circle className="histology-dot dot-three" cx="13.7" cy="26.3" r=".66" />
      </g>
      <path className="histology-orbit branch-svg-secondary" d="M11.7 28.6c2.38-1.65 5.02-2.45 7.9-2.4M28.75 16.1c-.78-2.88-2.4-5.16-4.9-6.82" />
    </>
  );
}

function BiochemistryIcon() {
  return (
    <>
      <g className="branch-svg-main biochem-flask">
        <path d="M15.5 6.1h9" />
        <path d="M17.1 6.15v7.45L10.6 26.7a4.55 4.55 0 0 0 4.1 6.55h10.6a4.55 4.55 0 0 0 4.1-6.55L22.9 13.6V6.15" />
        <path className="biochem-liquid branch-svg-secondary" d="M13.7 25.55c1.72-.78 3.34-.96 4.86-.5 2.2.66 3.62 1.36 6.46.24" />
        <path className="branch-svg-detail" d="M16.1 17.1h7.8" />
      </g>
      <g className="biochem-bubbles branch-svg-particles">
        <circle className="bubble bubble-one" cx="16" cy="22.4" r=".72" />
        <circle className="bubble bubble-two" cx="23.3" cy="28.2" r=".78" />
        <circle className="bubble bubble-three" cx="25.2" cy="20.1" r=".58" />
      </g>
    </>
  );
}

function MicrobiologyIcon() {
  return (
    <>
      <g className="branch-svg-main microbiology-petri">
        <circle cx="20" cy="20" r="11.6" />
        <path className="branch-svg-secondary" d="M12.4 15.45c4.25-2.1 9-2.18 14.25-.25M13.6 27c4.25 1.3 8.62.95 13.1-1.05" />
        <circle className="micro-colony colony-one" cx="15.3" cy="19" r="1.28" />
        <circle className="micro-colony colony-two" cx="23.3" cy="17.4" r="1.05" />
        <circle className="micro-colony colony-three" cx="20" cy="24.2" r="1.15" />
      </g>
      <g className="micro-orbit-dots branch-svg-particles">
        <circle cx="8.2" cy="20" r=".58" />
        <circle cx="31.8" cy="20" r=".58" />
      </g>
    </>
  );
}

function PathologyIcon() {
  return (
    <>
      <g className="branch-svg-main pathology-slide">
        <rect x="11.2" y="7.2" width="17.6" height="25.6" rx="3.3" />
        <path className="branch-svg-secondary" d="M15.1 12.7h9.8" />
        <path className="pathology-tissue branch-svg-detail" d="M15.6 22.1c.14-2.4 2.28-4.05 4.72-3.45 1.88.46 2.72 1.72 3.68 2.76 1.02 1.12 1.46 2.86.4 4.12-1.32 1.58-3.52 1.26-5.05.62-2.12-.86-3.88-2.14-3.75-4.06Z" />
        <circle className="pathology-cell cell-one" cx="19.25" cy="22.4" r=".6" />
        <circle className="pathology-cell cell-two" cx="22.55" cy="24.8" r=".6" />
      </g>
      <path className="branch-svg-scan pathology-scan" d="M13.7 20h12.6" />
    </>
  );
}

function PharmacologyIcon() {
  return (
    <>
      <g className="branch-svg-main pharma-capsule">
        <path d="M10.7 27.9 24.9 13.7a4.25 4.25 0 0 0-6-6L4.7 21.9a4.25 4.25 0 0 0 6 6Z" />
        <path className="branch-svg-secondary" d="m14.3 16.7 5.9 5.9" />
      </g>
      <g className="pharma-receptor branch-svg-detail">
        <circle cx="28.5" cy="27.6" r="1.28" />
        <circle cx="32" cy="23.4" r="1.05" />
        <path d="M29.32 26.56 31.1 24.48" />
      </g>
      <g className="pharma-particles branch-svg-particles">
        <circle className="dose dose-one" cx="18.1" cy="21.3" r=".5" />
        <circle className="dose dose-two" cx="20.7" cy="18.7" r=".48" />
        <circle className="dose dose-three" cx="23.1" cy="16.3" r=".44" />
      </g>
    </>
  );
}

function InternalMedicineIcon() {
  return (
    <>
      <g className="branch-svg-main internal-torso">
        <path d="M20 6.6c-3.48 0-6.22 2.35-6.22 5.55 0 1.28.43 2.42 1.18 3.3l-1.92 12.05c-.18 1.12.68 2.1 1.82 2.1h10.28c1.14 0 2-.98 1.82-2.1l-1.92-12.05a5.1 5.1 0 0 0 1.18-3.3c0-3.2-2.74-5.55-6.22-5.55Z" />
        <path className="branch-svg-secondary" d="M20 11.3v17.2" />
        <path className="internal-lungs branch-svg-detail" d="M19.85 15.2c-2.15-2.32-5.16-2.02-6.05.65v3.34a3.5 3.5 0 0 0 3.36 3.58c1.5 0 2.7-1.65 2.7-4.72M20.15 15.2c2.15-2.32 5.16-2.02 6.05.65v3.34a3.5 3.5 0 0 1-3.36 3.58c-1.5 0-2.7-1.65-2.7-4.72" />
        <path className="internal-wave" d="M15 26.2h2.75l.78-1.58 1.5 3 1-2.1.72 1.3H25" />
      </g>
      <path className="branch-svg-scan internal-scan" d="M14.1 20.1h11.8" />
    </>
  );
}

function PediatricsIcon() {
  return (
    <>
      <g className="branch-svg-main peds-bear">
        <circle cx="15.1" cy="12.4" r="2.35" />
        <circle cx="24.9" cy="12.4" r="2.35" />
        <circle cx="20" cy="19.1" r="6.9" />
        <circle cx="17.3" cy="18.25" r=".5" />
        <circle cx="22.7" cy="18.25" r=".5" />
        <path className="branch-svg-secondary" d="M17.7 21.9c1.5 1.02 3.1 1.02 4.6 0" />
        <path className="peds-cross branch-svg-detail" d="M20 15.2v3.4M18.3 16.9h3.4" />
      </g>
      <g className="peds-sparkles branch-svg-particles">
        <path className="spark spark-one" d="M30.2 9.7l.55 1.36 1.36.55-1.36.55-.55 1.36-.55-1.36-1.36-.55 1.36-.55.55-1.36Z" />
        <path className="spark spark-two" d="M10.4 27.5l.43 1.05 1.05.43-1.05.43-.43 1.05-.43-1.05-1.05-.43 1.05-.43.43-1.05Z" />
      </g>
    </>
  );
}

function SurgeryIcon() {
  return (
    <>
      <g className="branch-svg-main surgery-scalpel">
        <path className="branch-svg-secondary" d="M26.3 7.2 32 12.9" />
        <path d="M9 30.9 28.15 11.75a2.25 2.25 0 0 1 3.18 0l.72.72a2.25 2.25 0 0 1 0 3.18L12.9 34.8 9 30.9Z" />
        <path className="branch-svg-secondary" d="M15.4 24.5 12.7 21.8" />
      </g>
      <path className="surgery-incision" d="M11.7 31.6c4.1-1.36 7.85-3.24 11.25-5.65" />
      <path className="surgery-glint branch-svg-particles" d="M30.2 7.3l.55 1.35 1.35.55-1.35.55-.55 1.35-.55-1.35-1.35-.55 1.35-.55.55-1.35Z" />
    </>
  );
}

function ObgynIcon() {
  return (
    <>
      <g className="branch-svg-main obgyn-uterus">
        <path d="M15.6 8.7v8.2a4.4 4.4 0 0 0 8.8 0V8.7" />
        <path className="branch-svg-secondary" d="M15.6 8.7c-3.18.38-5.38 2.52-5.78 5.22M24.4 8.7c3.18.38 5.38 2.52 5.78 5.22" />
        <circle cx="10.85" cy="16.1" r="1.78" />
        <circle cx="29.15" cy="16.1" r="1.78" />
        <path d="M20 21.7v8.2M16.4 29.9h7.2" />
        <path className="obgyn-heart branch-svg-detail" d="M20 19.75c-1.12-.72-1.78-1.33-1.78-2.1 0-.5.35-.88.84-.88.34 0 .65.18.94.5.29-.32.6-.5.94-.5.49 0 .84.38.84.88 0 .77-.66 1.38-1.78 2.1Z" />
      </g>
      <circle className="obgyn-protect-ring" cx="20" cy="18.8" r="10.2" />
    </>
  );
}

function MinorRotationsIcon() {
  return (
    <>
      <g className="branch-svg-main minor-grid">
        <rect className="minor-tile tile-one" x="10.2" y="10.2" width="7" height="7" rx="1.7" />
        <rect className="minor-tile tile-two" x="22.8" y="10.2" width="7" height="7" rx="1.7" />
        <rect className="minor-tile tile-three" x="10.2" y="22.8" width="7" height="7" rx="1.7" />
        <rect className="minor-tile tile-four" x="22.8" y="22.8" width="7" height="7" rx="1.7" />
        <path className="minor-connector branch-svg-secondary" d="M17.2 13.7h5.6M26.3 17.2v5.6M22.8 26.3h-5.6M13.7 22.8v-5.6" />
      </g>
      <path className="minor-arrow branch-svg-detail" d="M18.35 20h3.55M20.45 17.95 22.5 20l-2.05 2.05" />
    </>
  );
}

const branchIconRenderers = {
  anatomy: AnatomyIcon,
  physiology: PhysiologyIcon,
  'histology-embryology': HistologyIcon,
  'medical-biochemistry': BiochemistryIcon,
  'medical-microbiology': MicrobiologyIcon,
  'medical-pathology': PathologyIcon,
  'medical-pharmacology': PharmacologyIcon,
  'internal-medicine': InternalMedicineIcon,
  pediatrics: PediatricsIcon,
  'general-surgery': SurgeryIcon,
  'obstetrics-gynecology': ObgynIcon,
  'minor-rotations': MinorRotationsIcon,
};

export function BranchIconSvg({ branchId, className = '', mode = 'card', size = 36, strokeWidth = 1.62 }) {
  const IconContent = branchIconRenderers[branchId];
  if (!IconContent) return null;

  const svgClassName = [
    'branch-animated-svg',
    `branch-animated-svg-${branchId}`,
    `branch-animated-svg-${mode}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <svg
      className={svgClassName}
      viewBox="0 0 40 40"
      width={size}
      height={size}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <IconContent />
    </svg>
  );
}

export function BranchAnimatedIcon({ branchId, isLaunching = false, className = '' }) {
  if (!BRANCH_ANIMATED_ICON_IDS.has(branchId)) return null;

  return (
    <span
      className={[
        'branch-animated-icon',
        `branch-animated-icon-${branchId}`,
        isLaunching ? 'is-launching' : '',
        className,
      ].filter(Boolean).join(' ')}
      data-branch-icon={branchId}
      aria-hidden="true"
    >
      <span className="branch-icon-ambient" />
      <BranchIconSvg branchId={branchId} mode="card" />
    </span>
  );
}
