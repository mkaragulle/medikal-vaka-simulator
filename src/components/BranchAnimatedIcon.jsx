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
        <path d="M16 4.6c-2.75 0-5.05 2.05-5.05 4.9 0 1.28.45 2.42 1.18 3.25l-1.82 8.14c-.32 1.42.73 2.76 2.18 2.76h7.02c1.45 0 2.5-1.34 2.18-2.76l-1.82-8.14a4.83 4.83 0 0 0 1.18-3.25c0-2.85-2.3-4.9-5.05-4.9Z" />
        <path className="anatomy-spine" d="M16 7.2v17.2" />
        <path className="anatomy-ribs" d="M12.35 9.45c1.2 1.08 2.42 1.62 3.65 1.62s2.45-.54 3.65-1.62M11.7 12.75h8.6M11.1 16h9.8M12.15 19.25h7.7" />
        <path className="anatomy-ribs" d="M13.15 11.35c-.98.58-2.02 1.25-3.1 2M18.85 11.35c.98.58 2.02 1.25 3.1 2" />
      </g>
      <path className="branch-svg-scan anatomy-scan" d="M8.2 15.9h15.6" />
      <g className="branch-svg-particles anatomy-dots">
        <circle cx="9.9" cy="10.4" r=".62" />
        <circle cx="22.1" cy="18.9" r=".62" />
      </g>
    </>
  );
}

function PhysiologyIcon() {
  return (
    <>
      <g className="branch-svg-main physiology-heart">
        <path d="M16 25.25c-5.72-4.08-9.25-7.28-9.25-11.62 0-2.72 1.96-4.86 4.5-4.86 1.86 0 3.48.98 4.75 2.55 1.27-1.57 2.89-2.55 4.75-2.55 2.54 0 4.5 2.14 4.5 4.86 0 4.34-3.53 7.54-9.25 11.62Z" />
        <path className="physiology-ecg" d="M6.4 16.1h5.3l1.36-3.15 3.2 7.15 2.34-5.1 1.63 3.18h5.37" />
      </g>
      <circle className="physiology-ring physiology-ring-one" cx="16" cy="16" r="9.8" />
      <circle className="physiology-ring physiology-ring-two" cx="16" cy="16" r="12.1" />
    </>
  );
}

function HistologyIcon() {
  return (
    <>
      <g className="branch-svg-main histology-cell">
        <path d="M8.5 9.1c2.64-2.62 7.04-3.06 10.4-1.2 3.78 2.1 5.28 6.92 3.42 10.78-1.78 3.7-6.12 5.82-10.13 4.82-4.18-1.04-6.92-4.82-6.44-8.96.2-2.1 1.12-4 2.75-5.44Z" />
        <path className="histology-nucleus" d="M12.1 12.15c1.18-1.36 3.32-1.7 4.88-.82 1.75.98 2.46 3.18 1.66 5-.78 1.76-2.84 2.78-4.72 2.3-1.9-.5-3.18-2.28-3.02-4.22.06-.88.47-1.66 1.2-2.26Z" />
        <circle className="histology-dot dot-one" cx="16.1" cy="15.5" r=".82" />
        <circle className="histology-dot dot-two" cx="20.75" cy="12.1" r=".64" />
        <circle className="histology-dot dot-three" cx="10.7" cy="19.9" r=".64" />
      </g>
      <path className="histology-orbit" d="M8.15 22.25c2-1.55 4.22-2.36 6.62-2.42M23.9 13.55c-.72-2.48-2.18-4.5-4.38-6.05" />
    </>
  );
}

function BiochemistryIcon() {
  return (
    <>
      <g className="branch-svg-main biochem-flask">
        <path d="M12.15 4.5h7.7" />
        <path d="M13.55 4.55v6.45L8.3 21.65a3.85 3.85 0 0 0 3.46 5.55h8.48a3.85 3.85 0 0 0 3.46-5.55L18.45 11V4.55" />
        <path className="biochem-liquid" d="M11.2 20.6c1.62-.88 3.14-1.08 4.5-.56 1.86.72 3.1 1.22 5.1.36" />
        <path d="M12 14h8" />
      </g>
      <g className="biochem-bubbles">
        <circle className="bubble bubble-one" cx="13.1" cy="18.1" r=".7" />
        <circle className="bubble bubble-two" cx="18.9" cy="22.9" r=".75" />
        <circle className="bubble bubble-three" cx="20.6" cy="16.7" r=".55" />
      </g>
    </>
  );
}

function MicrobiologyIcon() {
  return (
    <>
      <g className="branch-svg-main microbiology-petri">
        <circle cx="16" cy="16" r="10.1" />
        <path d="M9.45 12.1c2.8-1.9 6.18-2.38 10.1-1.44M11.2 22.45c2.9 1 6.12.62 9.65-1.12" />
        <circle className="micro-colony colony-one" cx="12.3" cy="15" r="1.15" />
        <circle className="micro-colony colony-two" cx="18.9" cy="14.2" r=".92" />
        <circle className="micro-colony colony-three" cx="16.2" cy="20.1" r="1" />
        <path className="microbe-tiny" d="M21.7 17.7c-.66.4-1.32.4-1.98 0M20.7 16.68v2.08" />
      </g>
      <g className="micro-orbit-dots">
        <circle cx="6.9" cy="16" r=".6" />
        <circle cx="25.1" cy="16" r=".6" />
      </g>
    </>
  );
}

function PathologyIcon() {
  return (
    <>
      <g className="branch-svg-main pathology-slide">
        <rect x="8" y="6.2" width="16" height="19.6" rx="3" />
        <path d="M11.2 10.15h9.6" />
        <path className="pathology-tissue" d="M12.15 17c.1-2.12 2.08-3.55 4.12-3.1 1.82.4 2.45 1.72 3.45 2.76 1.1 1.15 1.76 2.88.68 4.28-1.26 1.66-3.66 1.16-5.06.62-1.8-.7-3.29-2.15-3.19-4.56Z" />
        <circle className="pathology-cell cell-one" cx="15.1" cy="17.1" r=".55" />
        <circle className="pathology-cell cell-two" cx="18.25" cy="19.2" r=".55" />
      </g>
      <path className="branch-svg-scan pathology-scan" d="M9.8 15.8h12.4" />
    </>
  );
}

function PharmacologyIcon() {
  return (
    <>
      <g className="branch-svg-main pharma-capsule">
        <path d="M9.25 22.75 22.75 9.25a4.1 4.1 0 0 0-5.8-5.8L3.45 16.95a4.1 4.1 0 0 0 5.8 5.8Z" />
        <path d="m12.55 13.55 5.9 5.9" />
      </g>
      <g className="pharma-receptor">
        <circle cx="23.35" cy="22.2" r="1.28" />
        <circle cx="26.2" cy="18.65" r="1.05" />
        <path d="M24.1 21.1 25.55 19.65" />
      </g>
      <g className="pharma-particles">
        <circle className="dose dose-one" cx="13.7" cy="17.3" r=".58" />
        <circle className="dose dose-two" cx="16.1" cy="14.8" r=".52" />
        <circle className="dose dose-three" cx="18.2" cy="12.7" r=".46" />
      </g>
    </>
  );
}

function InternalMedicineIcon() {
  return (
    <>
      <g className="branch-svg-main internal-torso">
        <path d="M16 4.7c-2.54 0-4.56 1.72-4.56 4.1 0 1.04.36 1.98 1 2.7l-1.92 11.1c-.24 1.38.82 2.65 2.22 2.65h6.52c1.4 0 2.46-1.27 2.22-2.65l-1.92-11.1c.64-.72 1-1.66 1-2.7 0-2.38-2.02-4.1-4.56-4.1Z" />
        <path d="M16 8.1v16.1" />
        <path className="internal-lungs" d="M15.9 12.35c-1.86-2.18-4.68-2.06-5.7.28v3.2a3.53 3.53 0 0 0 3.53 3.52c1.32 0 2.22-1.52 2.17-4.12M16.1 12.35c1.86-2.18 4.68-2.06 5.7.28v3.2a3.53 3.53 0 0 1-3.53 3.52c-1.32 0-2.22-1.52-2.17-4.12" />
        <path className="internal-wave" d="M11.5 21.55h2.6l.8-1.65 1.5 3.08 1-2.2.72 1.35h2.38" />
      </g>
      <path className="branch-svg-scan internal-scan" d="M10.45 15.95h11.1" />
    </>
  );
}

function PediatricsIcon() {
  return (
    <>
      <g className="branch-svg-main peds-bear">
        <circle cx="10.2" cy="9.2" r="2.45" />
        <circle cx="21.8" cy="9.2" r="2.45" />
        <circle cx="16" cy="14.75" r="7.1" />
        <circle cx="13.15" cy="14.1" r=".55" />
        <circle cx="18.85" cy="14.1" r=".55" />
        <path d="M13.7 17.55c1.5 1.08 3.1 1.08 4.6 0" />
        <path className="peds-cross" d="M16 10.9v3.4M14.3 12.6h3.4" />
      </g>
      <g className="peds-sparkles">
        <path className="spark spark-one" d="M25.2 7.5l.6 1.45 1.45.6-1.45.6-.6 1.45-.6-1.45-1.45-.6 1.45-.6.6-1.45Z" />
        <path className="spark spark-two" d="M6.7 21.35l.48 1.18 1.18.48-1.18.48-.48 1.18-.48-1.18-1.18-.48 1.18-.48.48-1.18Z" />
      </g>
    </>
  );
}

function SurgeryIcon() {
  return (
    <>
      <g className="branch-svg-main surgery-scalpel">
        <path d="M20.25 4.9 26.1 10.75" />
        <path d="M6.25 25.75 23.25 8.75a2.18 2.18 0 0 1 3.08 0l.92.92a2.18 2.18 0 0 1 0 3.08l-17 17-4-4Z" />
        <path d="M11.65 20.35 8.9 17.6M16.35 15.65l3.08 3.08" />
      </g>
      <path className="surgery-incision" d="M8.5 26.25c3.35-1.25 6.45-2.88 9.3-4.9" />
      <path className="surgery-glint" d="M24.7 5.1l.62 1.52 1.52.62-1.52.62-.62 1.52-.62-1.52-1.52-.62 1.52-.62.62-1.52Z" />
    </>
  );
}

function ObgynIcon() {
  return (
    <>
      <g className="branch-svg-main obgyn-uterus">
        <path d="M12.25 6.6v6.88a3.75 3.75 0 0 0 7.5 0V6.6" />
        <path d="M12.25 6.6C9.55 6.9 7.5 8.9 7.15 11.45" />
        <path d="M19.75 6.6c2.7.3 4.75 2.3 5.1 4.85" />
        <circle cx="8.2" cy="13.05" r="1.8" />
        <circle cx="23.8" cy="13.05" r="1.8" />
        <path d="M16 17.9v7.45M12.9 25.35h6.2" />
        <path className="obgyn-heart" d="M16 16.1c-1.28-.88-2.04-1.62-2.04-2.58 0-.64.45-1.1 1.04-1.1.38 0 .72.2 1 .58.28-.38.62-.58 1-.58.59 0 1.04.46 1.04 1.1 0 .96-.76 1.7-2.04 2.58Z" />
      </g>
      <circle className="obgyn-protect-ring" cx="16" cy="15.9" r="8.9" />
    </>
  );
}

function MinorRotationsIcon() {
  return (
    <>
      <g className="branch-svg-main minor-grid">
        <rect className="minor-tile tile-one" x="7" y="7" width="6.2" height="6.2" rx="1.55" />
        <rect className="minor-tile tile-two" x="18.8" y="7" width="6.2" height="6.2" rx="1.55" />
        <rect className="minor-tile tile-three" x="7" y="18.8" width="6.2" height="6.2" rx="1.55" />
        <rect className="minor-tile tile-four" x="18.8" y="18.8" width="6.2" height="6.2" rx="1.55" />
        <path className="minor-connector" d="M13.2 10.1h5.6M21.9 13.2v5.6M18.8 21.9h-5.6M10.1 18.8v-5.6" />
      </g>
      <path className="minor-arrow" d="M15 16h2.7M16.55 14.45 18.1 16l-1.55 1.55" />
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

export function BranchIconSvg({ branchId, className = '', mode = 'card', size = 32, strokeWidth = 1.72 }) {
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
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
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
