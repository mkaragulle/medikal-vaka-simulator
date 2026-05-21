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
        <path d="M20 8.2v23.6" className="anatomy-spine" />
        <path d="M15.6 10.8c-2.8 1.35-4.5 3.55-4.5 6.15 0 2.38 1.62 3.98 4.25 4.28" />
        <path d="M24.4 10.8c2.8 1.35 4.5 3.55 4.5 6.15 0 2.38-1.62 3.98-4.25 4.28" />
        <path className="anatomy-ribs branch-svg-secondary" d="M20 13.7c-2.65 0-5.05.78-7.18 2.28" />
        <path className="anatomy-ribs branch-svg-secondary" d="M20 13.7c2.65 0 5.05.78 7.18 2.28" />
        <path className="anatomy-ribs branch-svg-secondary" d="M20 18.2c-2.55.04-4.82.7-6.82 1.98" />
        <path className="anatomy-ribs branch-svg-secondary" d="M20 18.2c2.55.04 4.82.7 6.82 1.98" />
        <path className="anatomy-ribs branch-svg-secondary" d="M20 22.6c-2.05.06-3.86.55-5.42 1.48" />
        <path className="anatomy-ribs branch-svg-secondary" d="M20 22.6c2.05.06 3.86.55 5.42 1.48" />
      </g>
      <path className="branch-svg-scan anatomy-scan" d="M10.8 20h18.4" />
    </>
  );
}

function PhysiologyIcon() {
  return (
    <>
      <g className="branch-svg-main physiology-heart">
        <path d="M20 30.2c-6.35-4.35-9.7-7.7-9.7-12.05 0-2.86 2.08-5.05 4.78-5.05 1.86 0 3.5.98 4.92 2.58 1.42-1.6 3.06-2.58 4.92-2.58 2.7 0 4.78 2.19 4.78 5.05 0 4.35-3.35 7.7-9.7 12.05Z" />
        <path className="physiology-ecg branch-svg-detail" d="M11.7 20.6h4.05l1.02-2.1 2.72 5.35 2.15-4.35 1.2 2.05h5.45" />
      </g>
      <circle className="physiology-ring physiology-ring-one" cx="20" cy="20" r="11.7" />
      <circle className="physiology-ring physiology-ring-two" cx="20" cy="20" r="13.9" />
    </>
  );
}

function HistologyIcon() {
  return (
    <>
      <g className="branch-svg-main histology-cell">
        <path d="M12.4 13.55c2.1-2.45 5.88-3.38 9.28-2.02 4.72 1.9 6.6 7.48 4.18 11.68-2.36 4.12-7.92 5.22-11.68 2.42-3.58-2.66-4.05-7.62-1.78-12.08Z" />
        <path className="histology-nucleus branch-svg-secondary" d="M17.2 16.35c1.3-1.2 3.35-1.35 4.72-.32 1.46 1.1 1.74 3.23.58 4.62-1.18 1.42-3.42 1.58-4.82.35-1.38-1.22-1.5-3.38-.48-4.65Z" />
        <circle className="histology-dot dot-one branch-svg-detail" cx="23.8" cy="14.3" r=".72" />
        <circle className="histology-dot dot-two branch-svg-detail" cx="14.9" cy="23.6" r=".62" />
      </g>
    </>
  );
}

function BiochemistryIcon() {
  return (
    <>
      <g className="branch-svg-main biochem-flask">
        <path d="M16.2 7.2h7.6" />
        <path d="M17.7 7.2v7.1l-6.15 12.55A4.15 4.15 0 0 0 15.28 32.8h9.44a4.15 4.15 0 0 0 3.73-5.95L22.3 14.3V7.2" />
        <path className="biochem-liquid branch-svg-secondary" d="M13.95 25.7c1.55-.72 3.08-.9 4.58-.48 1.98.55 3.5 1.02 5.88.12" />
      </g>
      <g className="biochem-bubbles branch-svg-particles">
        <circle className="bubble bubble-one" cx="17.2" cy="22.1" r=".76" />
        <circle className="bubble bubble-two" cx="23.1" cy="20.1" r=".58" />
      </g>
    </>
  );
}

function MicrobiologyIcon() {
  return (
    <>
      <g className="branch-svg-main microbiology-petri">
        <circle cx="20" cy="20" r="11.5" />
        <path className="branch-svg-secondary" d="M12.55 16.35c4.6-1.65 9.55-1.65 14.9 0" />
        <circle className="micro-colony colony-one branch-svg-detail" cx="15.6" cy="20.6" r="1.24" />
        <circle className="micro-colony colony-two branch-svg-detail" cx="23.75" cy="18.85" r="1.08" />
        <circle className="micro-colony colony-three branch-svg-detail" cx="20.15" cy="25.3" r="1.18" />
      </g>
    </>
  );
}

function PathologyIcon() {
  return (
    <>
      <g className="branch-svg-main pathology-slide">
        <rect x="12.2" y="8" width="15.6" height="24" rx="3" />
        <path className="branch-svg-secondary" d="M15.7 12.7h8.6" />
        <path className="pathology-tissue branch-svg-detail" d="M16.25 22.35c.16-2.06 2.06-3.55 4.05-3.08 1.58.37 2.25 1.35 3.02 2.18.9.96 1.18 2.28.32 3.28-1.08 1.25-2.9 1.08-4.18.52-1.78-.76-3.32-1.64-3.21-2.9Z" />
      </g>
      <path className="branch-svg-scan pathology-scan" d="M14.2 20h11.6" />
    </>
  );
}

function PharmacologyIcon() {
  return (
    <>
      <g className="branch-svg-main pharma-capsule">
        <path d="M10.15 28.45 22.6 16a4.45 4.45 0 1 0-6.3-6.3L3.85 22.15a4.45 4.45 0 0 0 6.3 6.3Z" />
        <path className="branch-svg-secondary" d="M13.8 18.5l5.45 5.45" />
      </g>
      <g className="pharma-receptor branch-svg-detail">
        <circle cx="29.1" cy="25.9" r="3.05" />
        <circle cx="29.1" cy="25.9" r=".82" />
      </g>
      <g className="pharma-particles branch-svg-particles">
        <circle className="dose dose-one" cx="22.7" cy="20.2" r=".55" />
        <circle className="dose dose-two" cx="25.45" cy="22.8" r=".5" />
      </g>
    </>
  );
}

function InternalMedicineIcon() {
  return (
    <>
      <g className="branch-svg-main internal-torso">
        <path d="M20 7.9c-3.36 0-6.1 2.18-6.1 5.2 0 1.22.45 2.32 1.2 3.15l-1.82 11.1c-.18 1.08.65 2.05 1.74 2.05h9.96c1.09 0 1.92-.97 1.74-2.05l-1.82-11.1c.75-.83 1.2-1.93 1.2-3.15 0-3.02-2.74-5.2-6.1-5.2Z" />
        <path className="internal-lungs branch-svg-secondary" d="M19.75 15.35c-1.92-1.82-4.2-1.48-4.82.82v3.18c0 1.72 1.12 3.06 2.65 3.06 1.24 0 2.18-1.38 2.18-3.9M20.25 15.35c1.92-1.82 4.2-1.48 4.82.82v3.18c0 1.72-1.12 3.06-2.65 3.06-1.24 0-2.18-1.38-2.18-3.9" />
        <path className="internal-wave branch-svg-detail" d="M15.6 25.65h2.8l.78-1.45 1.32 2.7 1.02-1.9.65 1.05h2.25" />
      </g>
      <path className="branch-svg-scan internal-scan" d="M14.25 20h11.5" />
    </>
  );
}

function PediatricsIcon() {
  return (
    <>
      <g className="branch-svg-main peds-bear">
        <circle cx="15.2" cy="13.4" r="2.2" />
        <circle cx="24.8" cy="13.4" r="2.2" />
        <circle cx="20" cy="20" r="6.65" />
        <path className="peds-cross branch-svg-detail" d="M20 16.75v5.2M17.4 19.35h5.2" />
        <path className="branch-svg-secondary" d="M17.7 23.3c1.5.92 3.1.92 4.6 0" />
      </g>
      <g className="peds-sparkles branch-svg-particles">
        <path className="spark spark-one" d="M29.2 10.8l.46 1.12 1.12.46-1.12.46-.46 1.12-.46-1.12-1.12-.46 1.12-.46.46-1.12Z" />
      </g>
    </>
  );
}

function SurgeryIcon() {
  return (
    <>
      <g className="branch-svg-main surgery-scalpel">
        <path d="M10.2 29.4 27.55 12.05a2.35 2.35 0 0 1 3.32 0l1.08 1.08a2.35 2.35 0 0 1 0 3.32L14.6 33.8 10.2 29.4Z" />
        <path className="branch-svg-secondary" d="M25.2 9.8l5 5" />
        <path className="branch-svg-secondary" d="M16.1 23.5l-2.6-2.6" />
      </g>
      <path className="surgery-incision branch-svg-detail" d="M11.8 31.1c3.95-1.16 7.52-2.9 10.7-5.18" />
      <path className="surgery-glint branch-svg-particles" d="M30.4 8.25l.48 1.18 1.18.48-1.18.48-.48 1.18-.48-1.18-1.18-.48 1.18-.48.48-1.18Z" />
    </>
  );
}

function ObgynIcon() {
  return (
    <>
      <g className="branch-svg-main obgyn-uterus">
        <path d="M15.7 9.9v7.3a4.3 4.3 0 0 0 8.6 0V9.9" />
        <path className="branch-svg-secondary" d="M15.7 9.9c-3 .45-5.05 2.45-5.42 5.05M24.3 9.9c3 .45 5.05 2.45 5.42 5.05" />
        <circle className="branch-svg-secondary" cx="10.9" cy="16.95" r="1.5" />
        <circle className="branch-svg-secondary" cx="29.1" cy="16.95" r="1.5" />
        <path d="M20 21.55v7.65M16.8 29.2h6.4" />
        <path className="obgyn-heart branch-svg-detail" d="M20 19.4c-1-.62-1.58-1.16-1.58-1.86 0-.46.32-.78.74-.78.3 0 .58.16.84.44.26-.28.54-.44.84-.44.42 0 .74.32.74.78 0 .7-.58 1.24-1.58 1.86Z" />
      </g>
      <circle className="obgyn-protect-ring" cx="20" cy="18.7" r="9.8" />
    </>
  );
}

function MinorRotationsIcon() {
  return (
    <>
      <g className="branch-svg-main minor-grid">
        <rect className="minor-tile tile-one" x="10.8" y="10.8" width="7.3" height="7.3" rx="1.8" />
        <rect className="minor-tile tile-two" x="21.9" y="10.8" width="7.3" height="7.3" rx="1.8" />
        <rect className="minor-tile tile-three" x="10.8" y="21.9" width="7.3" height="7.3" rx="1.8" />
        <rect className="minor-tile tile-four" x="21.9" y="21.9" width="7.3" height="7.3" rx="1.8" />
        <path className="minor-connector branch-svg-secondary" d="M18.1 14.45h3.8M25.55 18.1v3.8M21.9 25.55h-3.8M14.45 21.9v-3.8" />
      </g>
      <path className="minor-arrow branch-svg-detail" d="M18.8 20h3.05M20.5 18.35 22.15 20l-1.65 1.65" />
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

export function BranchIconSvg({ branchId, className = '', mode = 'card', size = 36, strokeWidth = 1.74 }) {
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
