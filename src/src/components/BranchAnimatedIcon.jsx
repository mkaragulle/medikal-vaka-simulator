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
        <path className="anatomy-spine" d="M24 10.5v27" />
        <path className="branch-svg-secondary" d="M20.8 13.8h6.4" />
        <path className="anatomy-rib anatomy-rib-left" d="M23.6 15.6c-4.7.4-8.3 2.6-9.6 6" />
        <path className="anatomy-rib anatomy-rib-right" d="M24.4 15.6c4.7.4 8.3 2.6 9.6 6" />
        <path className="anatomy-rib anatomy-rib-left" d="M23.5 21.1c-4.2.25-7.4 1.9-8.75 4.55" />
        <path className="anatomy-rib anatomy-rib-right" d="M24.5 21.1c4.2.25 7.4 1.9 8.75 4.55" />
        <path className="anatomy-rib anatomy-rib-left" d="M23.3 26.6c-3.2.25-5.65 1.38-6.9 3.25" />
        <path className="anatomy-rib anatomy-rib-right" d="M24.7 26.6c3.2.25 5.65 1.38 6.9 3.25" />
        <path className="branch-svg-secondary" d="M19.3 34.6c1.35.82 2.9 1.22 4.7 1.22s3.35-.4 4.7-1.22" />
      </g>
      <path className="branch-svg-scan anatomy-scan" d="M12.8 24h22.4" />
    </>
  );
}

function PhysiologyIcon() {
  return (
    <>
      <g className="branch-svg-main physiology-heart">
        <path d="M24 36c-7.55-5.18-11.45-9.22-11.45-14.18 0-3.42 2.45-5.9 5.55-5.9 2.12 0 4 1.1 5.9 3.28 1.9-2.18 3.78-3.28 5.9-3.28 3.1 0 5.55 2.48 5.55 5.9C35.45 26.78 31.55 30.82 24 36Z" />
        <path className="physiology-ecg branch-svg-detail" d="M14.45 24.35h5.2l1.3-2.92 3.12 6.02 2.43-4.72 1.5 1.62h5.55" />
      </g>
      <circle className="physiology-ring physiology-ring-one" cx="24" cy="24" r="14.1" />
      <circle className="physiology-ring physiology-ring-two" cx="24" cy="24" r="17" />
    </>
  );
}

function HistologyIcon() {
  return (
    <>
      <g className="branch-svg-main histology-cell">
        <path d="M14.5 16.35c2.25-3.15 6.85-4.35 11.05-2.9 5.8 2 8.25 8.4 5.25 13.65-2.82 4.95-9.42 6.4-14.05 3.15-4.35-3.05-4.9-8.85-2.25-13.9Z" />
        <path className="histology-nucleus branch-svg-secondary" d="M20.1 19.45c1.65-1.48 4.28-1.55 5.9-.05 1.62 1.5 1.62 4.12.02 5.65-1.65 1.58-4.35 1.58-5.95-.02-1.52-1.52-1.55-4.08.03-5.58Z" />
        <circle className="histology-organelle organelle-one branch-svg-detail" cx="28.55" cy="18.1" r="1" />
        <circle className="histology-organelle organelle-two branch-svg-detail" cx="17.2" cy="27.35" r=".9" />
      </g>
    </>
  );
}

function BiochemistryIcon() {
  return (
    <>
      <g className="branch-svg-main biochem-flask">
        <path d="M19.1 9.6h9.8" />
        <path d="M21.15 9.6v8.05L13.9 32.15A4.45 4.45 0 0 0 17.88 38.6h12.24a4.45 4.45 0 0 0 3.98-6.45l-7.25-14.5V9.6" />
        <path className="biochem-liquid branch-svg-secondary" d="M16.55 31.05c1.95-.95 3.95-1.08 6-.38 2.38.8 4.55.78 6.9-.32" />
      </g>
      <g className="biochem-bubbles branch-svg-particles">
        <circle className="bubble bubble-one" cx="21.1" cy="27.1" r=".95" />
        <circle className="bubble bubble-two" cx="27.2" cy="24.65" r=".78" />
        <circle className="bubble bubble-three" cx="24.1" cy="21.8" r=".62" />
      </g>
    </>
  );
}

function MicrobiologyIcon() {
  return (
    <>
      <g className="branch-svg-main microbiology-petri">
        <circle cx="24" cy="24" r="14.1" />
        <path className="branch-svg-secondary" d="M14.8 18.9c5.95-2 12.25-2 18.4 0" />
        <path className="micro-colony colony-one branch-svg-detail" d="M18.5 25.7c1.7-1.18 3.6-.42 4.1 1.12" />
        <path className="micro-colony colony-two branch-svg-detail" d="M27.8 22.05c1.45-.85 3.15-.18 3.62 1.18" />
        <circle className="micro-colony colony-three branch-svg-detail" cx="25.1" cy="30.75" r="1.55" />
        <circle className="micro-colony colony-four branch-svg-detail" cx="18.1" cy="20.7" r="1.22" />
      </g>
    </>
  );
}


function PathologyIcon() {
  return (
    <>
      <g className="branch-svg-main pathology-slide">
        <rect x="10.7" y="15.1" width="26.6" height="17.8" rx="4" />
        <path className="branch-svg-secondary" d="M14.85 19.25h5.9M27.25 28.75h5.9" />
        <path className="pathology-tissue branch-svg-detail" d="M20.05 24.5c.18-2.18 2.2-3.62 4.35-3.1 1.58.38 2.25 1.25 3.1 2.05.98.92 1.12 2.25.25 3.25-1.12 1.28-3.1 1.15-4.42.58-1.88-.8-3.38-1.48-3.28-2.78Z" />
      </g>
      <path className="branch-svg-scan pathology-scan" d="M14 24h20" />
    </>
  );
}


function PharmacologyIcon() {
  return (
    <>
      <g className="branch-svg-main pharma-capsule">
        <path d="M12.35 32.25 27.2 17.4a5.25 5.25 0 0 1 7.42 7.42L19.75 39.65a5.24 5.24 0 0 1-7.4-7.4Z" />
        <path className="branch-svg-secondary" d="M20.8 23.8 28.2 31.2" />
      </g>
      <g className="pharma-receptor branch-svg-detail">
        <circle cx="34.25" cy="13.75" r="3.55" />
        <path d="M34.25 11.95v3.6M32.45 13.75h3.6" />
      </g>
      <g className="pharma-particles branch-svg-particles">
        <circle className="dose dose-one" cx="29" cy="20.8" r=".72" />
        <circle className="dose dose-two" cx="31.2" cy="18.35" r=".66" />
        <circle className="dose dose-three" cx="26.9" cy="23.2" r=".58" />
      </g>
    </>
  );
}

function InternalMedicineIcon() {
  return (
    <>
      <g className="branch-svg-main internal-torso">
        <path d="M24 10.8v24.4" />
        <path className="internal-lungs branch-svg-secondary" d="M23.55 18.3c-3-2.8-6.55-1.55-6.85 2.65v5.55c0 2.65 1.62 4.55 3.72 4.55 2.25 0 3.13-2.95 3.13-7.1" />
        <path className="internal-lungs branch-svg-secondary" d="M24.45 18.3c3-2.8 6.55-1.55 6.85 2.65v5.55c0 2.65-1.62 4.55-3.72 4.55-2.25 0-3.13-2.95-3.13-7.1" />
        <path className="branch-svg-main" d="M15.65 15.1c1.98-3.08 5.08-4.62 8.35-4.62s6.37 1.54 8.35 4.62" />
        <path className="internal-wave branch-svg-detail" d="M17.9 35.5h3.85l.82-1.6 1.42 3.05 1.2-2.28.85.83h4.06" />
      </g>
      <path className="branch-svg-scan internal-scan" d="M16.4 24h15.2" />
    </>
  );
}


function PediatricsIcon() {
  return (
    <>
      <g className="branch-svg-main peds-bear">
        <circle cx="18" cy="17.4" r="3.2" />
        <circle cx="30" cy="17.4" r="3.2" />
        <path d="M16.3 26.1c0-4.55 3.42-7.8 7.7-7.8s7.7 3.25 7.7 7.8c0 4.25-3.15 7.42-7.7 7.42s-7.7-3.17-7.7-7.42Z" />
        <path className="peds-cross branch-svg-detail" d="M24 22.6v6.4M20.8 25.8h6.4" />
        <path className="branch-svg-secondary" d="M20.65 31.3c2.18 1.28 4.52 1.28 6.7 0" />
      </g>
      <g className="peds-sparkles branch-svg-particles">
        <path className="spark spark-one" d="M35.4 11.5l.6 1.42 1.42.6-1.42.6-.6 1.42-.6-1.42-1.42-.6 1.42-.6.6-1.42Z" />
        <path className="spark spark-two" d="M13.1 33.1l.46 1.1 1.1.46-1.1.46-.46 1.1-.46-1.1-1.1-.46 1.1-.46.46-1.1Z" />
      </g>
    </>
  );
}

function SurgeryIcon() {
  return (
    <>
      <g className="branch-svg-main surgery-scalpel">
        <path d="M12.9 36.7 30.8 18.8" />
        <path d="M16.1 39.9 34 22" />
        <path className="branch-svg-secondary" d="M12.9 36.7l3.2 3.2" />
        <path className="branch-svg-secondary" d="M30.8 18.8l6.1-6.1c.9-.9 2.45-.25 2.45 1.05v2.7c0 1.05-.42 2.05-1.16 2.78L34 23.4" />
      </g>
      <path className="surgery-incision branch-svg-detail" d="M12.7 40.6c4.78-1.36 9.15-3.42 13.05-6.18" />
      <path className="surgery-glint branch-svg-particles" d="M37.7 9.3l.56 1.36 1.36.56-1.36.56-.56 1.36-.56-1.36-1.36-.56 1.36-.56.56-1.36Z" />
    </>
  );
}


function ObgynIcon() {
  return (
    <>
      <g className="branch-svg-main obgyn-uterus">
        <path d="M18.35 11.85v9.05a5.65 5.65 0 0 0 11.3 0v-9.05" />
        <path className="branch-svg-secondary" d="M18.35 11.85c-4.05.6-6.85 3.2-7.35 6.55M29.65 11.85c4.05.6 6.85 3.2 7.35 6.55" />
        <circle className="branch-svg-secondary" cx="11.85" cy="20.3" r="1.95" />
        <circle className="branch-svg-secondary" cx="36.15" cy="20.3" r="1.95" />
        <path d="M24 27.1v9.6M20.1 36.7h7.8" />
        <circle className="obgyn-center branch-svg-detail" cx="24" cy="22.4" r="1.55" />
      </g>
      <circle className="obgyn-protect-ring" cx="24" cy="22.4" r="11.4" />
    </>
  );
}

function MinorRotationsIcon() {
  return (
    <>
      <g className="branch-svg-main minor-grid">
        <rect className="minor-tile tile-one" x="12.8" y="12.8" width="8.4" height="8.4" rx="2.35" />
        <rect className="minor-tile tile-two" x="26.8" y="12.8" width="8.4" height="8.4" rx="2.35" />
        <rect className="minor-tile tile-three" x="12.8" y="26.8" width="8.4" height="8.4" rx="2.35" />
        <rect className="minor-tile tile-four" x="26.8" y="26.8" width="8.4" height="8.4" rx="2.35" />
        <path className="minor-connector branch-svg-secondary" d="M21.2 17h2.8v2.8M26.8 17h-2.8v2.8M21.2 31h2.8v-2.8M26.8 31h-2.8v-2.8" />
      </g>
      <path className="minor-arrow branch-svg-detail" d="M21.8 24h4.8M24.7 21.7 27 24l-2.3 2.3" />
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

export function BranchIconSvg({ branchId, className = '', mode = 'card', size = 36, strokeWidth = 2.15 }) {
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
      viewBox="0 0 48 48"
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
