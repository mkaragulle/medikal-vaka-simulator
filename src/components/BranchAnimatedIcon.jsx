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
      <g className="branch-anatomy-shell">
        <path d="M16 4.7c-2.75 0-4.94 1.92-4.94 4.46 0 1 .35 1.92.95 2.67l-1.55 10.06c-.18 1.18.73 2.25 1.92 2.25h7.24c1.19 0 2.1-1.07 1.92-2.25l-1.55-10.06c.6-.75.95-1.67.95-2.67 0-2.54-2.19-4.46-4.94-4.46Z" />
        <path d="M16 7.6v15.1" />
        <path className="branch-anatomy-ribs" d="M12.5 10.25c1.12 1.04 2.28 1.56 3.5 1.56s2.38-.52 3.5-1.56M11.75 13.2h8.5M12.15 16.2h7.7M12.9 19.15h6.2" />
        <path d="M12.85 11.45 10.1 13.2M19.15 11.45l2.75 1.75" />
      </g>
      <path className="branch-anatomy-scan" d="M8.45 16h15.1" />
      <g className="branch-anatomy-points">
        <circle cx="10.25" cy="11.05" r=".62" />
        <circle cx="21.75" cy="19.2" r=".62" />
      </g>
    </>
  );
}

function PhysiologyIcon() {
  return (
    <>
      <g className="branch-physiology-heart">
        <path d="M16 25c-5.35-3.8-8.9-7.1-8.9-11.18 0-2.67 1.93-4.63 4.4-4.63 1.86 0 3.42.93 4.5 2.39 1.08-1.46 2.64-2.39 4.5-2.39 2.47 0 4.4 1.96 4.4 4.63 0 4.08-3.55 7.38-8.9 11.18Z" />
        <path className="branch-physiology-ecg" d="M6.3 16.15h4.75l1.42-3.1 3.1 6.8 2.08-4.75 1.58 3.07h6.45" />
      </g>
      <circle className="branch-physiology-ring ring-one" cx="16" cy="16" r="9.8" />
      <circle className="branch-physiology-ring ring-two" cx="16" cy="16" r="12.1" />
    </>
  );
}

function HistologyIcon() {
  return (
    <>
      <path className="branch-histo-orbit" d="M8.5 22.45c2-1.62 4.18-2.42 6.48-2.42M23.85 13.7c-.64-2.38-2.02-4.4-4.15-5.98" />
      <g className="branch-histo-cell">
        <path d="M8.25 9.15c2.65-2.56 6.95-2.98 10.27-1.12 3.77 2.1 5.15 6.87 3.18 10.62-1.92 3.66-6.24 5.7-10.18 4.72-4.11-1.02-6.79-4.76-6.31-8.84.22-2 1.14-3.85 3.04-5.38Z" />
        <path className="branch-histo-nucleus" d="M12.1 12.2c1.18-1.34 3.18-1.72 4.76-.9 1.78.92 2.56 3.03 1.84 4.84-.74 1.86-2.78 2.98-4.67 2.54-1.98-.46-3.33-2.28-3.16-4.22.09-.83.45-1.58 1.23-2.26Z" />
        <circle className="branch-histo-particle p1" cx="16.15" cy="15.45" r=".8" />
        <circle className="branch-histo-particle p2" cx="20.75" cy="12.2" r=".62" />
        <circle className="branch-histo-particle p3" cx="10.75" cy="19.65" r=".62" />
      </g>
    </>
  );
}

function BiochemistryIcon() {
  return (
    <>
      <g className="branch-biochem-flask">
        <path d="M12.15 4.55h7.7" />
        <path d="M13.55 4.55v6.1L8.4 21.2a3.98 3.98 0 0 0 3.58 5.75h8.04a3.98 3.98 0 0 0 3.58-5.75l-5.15-10.55v-6.1" />
        <path d="M12.25 13.9h7.5" />
        <path className="branch-biochem-liquid" d="M11.15 20.2c1.55-.88 3.05-1.08 4.46-.6 1.48.5 2.94 1.14 5.02.42" />
      </g>
      <g className="branch-biochem-bubbles">
        <circle className="b1" cx="12.95" cy="18.25" r=".72" />
        <circle className="b2" cx="18.95" cy="22.4" r=".78" />
        <circle className="b3" cx="20.7" cy="16.6" r=".55" />
      </g>
    </>
  );
}

function MicrobiologyIcon() {
  return (
    <>
      <g className="branch-micro-petri">
        <circle cx="16" cy="16" r="10.2" />
        <path d="M9.6 12.05c2.68-1.82 5.95-2.28 9.72-1.36" />
        <path d="M11.2 22.25c2.84.98 6 .58 9.42-1.12" />
        <circle className="branch-micro-colony c1" cx="12.35" cy="15" r="1.12" />
        <circle className="branch-micro-colony c2" cx="18.9" cy="14.1" r=".95" />
        <circle className="branch-micro-colony c3" cx="16.2" cy="20.15" r="1.02" />
        <path className="branch-micro-germ" d="M21.55 17.55c-.68.4-1.35.4-2.02 0M20.55 16.52v2.08" />
      </g>
      <g className="branch-micro-orbit">
        <circle cx="6.7" cy="16" r=".56" />
        <circle cx="25.3" cy="16" r=".56" />
      </g>
    </>
  );
}

function PathologyIcon() {
  return (
    <>
      <g className="branch-path-slide">
        <rect x="8" y="6.15" width="16" height="19.7" rx="3" />
        <path d="M11.2 10.2h9.6" />
        <path className="branch-path-focus" d="M12.15 17.05c.12-2.08 2.08-3.5 4.08-3.06 1.82.4 2.44 1.72 3.44 2.76 1.1 1.15 1.74 2.86.66 4.22-1.28 1.62-3.64 1.14-5.04.6-1.84-.7-3.26-2.16-3.14-4.52Z" />
        <circle className="branch-path-cell cell-one" cx="15.15" cy="17.2" r=".56" />
        <circle className="branch-path-cell cell-two" cx="18.25" cy="19.25" r=".56" />
      </g>
      <path className="branch-path-scan" d="M9.65 15.85h12.7" />
    </>
  );
}

function PharmacologyIcon() {
  return (
    <>
      <g className="branch-pharma-capsule">
        <path d="M9.35 22.75 22.75 9.35a4.14 4.14 0 1 0-5.86-5.86L3.49 16.89a4.14 4.14 0 1 0 5.86 5.86Z" />
        <path d="m12.45 13.65 5.9 5.9" />
      </g>
      <g className="branch-pharma-receptor">
        <circle cx="23.25" cy="22.25" r="1.2" />
        <circle cx="25.95" cy="18.8" r="1" />
        <path d="M23.95 21.15 25.35 19.75" />
      </g>
      <g className="branch-pharma-dots">
        <circle className="d1" cx="13.75" cy="17.25" r=".58" />
        <circle className="d2" cx="16.05" cy="14.85" r=".5" />
        <circle className="d3" cx="18.1" cy="12.85" r=".45" />
      </g>
    </>
  );
}

function InternalMedicineIcon() {
  return (
    <>
      <g className="branch-internal-body">
        <path d="M16 4.7c-2.54 0-4.58 1.7-4.58 4.08 0 1.04.37 1.98 1.02 2.72l-1.85 10.95c-.24 1.38.81 2.64 2.2 2.64h6.42c1.39 0 2.44-1.26 2.2-2.64l-1.85-10.95c.65-.74 1.02-1.68 1.02-2.72 0-2.38-2.04-4.08-4.58-4.08Z" />
        <path d="M16 8.05v15.95" />
        <path className="branch-internal-lungs" d="M15.9 12.15c-1.9-2.18-4.72-2.05-5.7.32v3.12a3.52 3.52 0 0 0 3.52 3.52c1.34 0 2.24-1.52 2.18-4.1M16.1 12.15c1.9-2.18 4.72-2.05 5.7.32v3.12a3.52 3.52 0 0 1-3.52 3.52c-1.34 0-2.24-1.52-2.18-4.1" />
        <path className="branch-internal-wave" d="M11.55 21.25h2.55l.82-1.65 1.52 3.06 1.02-2.2.72 1.33h2.28" />
      </g>
      <path className="branch-internal-scan" d="M10.4 15.95h11.2" />
    </>
  );
}

function PediatricsIcon() {
  return (
    <>
      <g className="branch-peds-figure">
        <circle className="branch-peds-head" cx="16" cy="10.2" r="3.75" />
        <path d="M12.9 21.15c.55-3.08 1.8-5.55 3.1-5.55s2.55 2.47 3.1 5.55" />
        <path d="M14.4 21.25h3.2" />
        <path d="M12.75 14.25c.9 1 2.04 1.52 3.25 1.52 1.21 0 2.35-.52 3.25-1.52" />
        <path d="M13.25 15.3 9.8 18.25M18.75 15.3l3.45 2.95" />
      </g>
      <g className="branch-peds-sparkles">
        <path className="s1" d="M24.8 7.3l.55 1.38 1.38.55-1.38.55-.55 1.38-.55-1.38-1.38-.55 1.38-.55.55-1.38Z" />
        <path className="s2" d="M7.2 21.45l.44 1.1 1.1.44-1.1.44-.44 1.1-.44-1.1-1.1-.44 1.1-.44.44-1.1Z" />
      </g>
    </>
  );
}

function SurgeryIcon() {
  return (
    <>
      <g className="branch-surgery-blade">
        <path d="M20.55 4.95 26.05 10.45" />
        <path d="M6.2 25.8 23.2 8.8a2.15 2.15 0 0 1 3.04 0l.9.9a2.15 2.15 0 0 1 0 3.04l-17 17-3.96-3.94Z" />
        <path d="M11.55 20.45 8.9 17.8M16.45 15.55l3.02 3.02" />
      </g>
      <path className="branch-surgery-cut" d="M8.5 26.15c3.3-1.2 6.38-2.82 9.18-4.82" />
      <path className="branch-surgery-glint" d="M24.7 5.15l.58 1.46 1.46.58-1.46.58-.58 1.46-.58-1.46-1.46-.58 1.46-.58.58-1.46Z" />
    </>
  );
}

function ObgynIcon() {
  return (
    <>
      <g className="branch-obgyn-uterus">
        <path d="M12.2 6.55v6.9a3.8 3.8 0 0 0 7.6 0v-6.9" />
        <path d="M12.2 6.55C9.55 6.85 7.55 8.8 7.18 11.4" />
        <path d="M19.8 6.55c2.65.3 4.65 2.25 5.02 4.85" />
        <circle cx="8.2" cy="13.05" r="1.75" />
        <circle cx="23.8" cy="13.05" r="1.75" />
        <path d="M16 17.75v7.5M12.95 25.25h6.1" />
        <path className="branch-obgyn-heart" d="M16 16.05c-1.24-.86-1.98-1.58-1.98-2.52 0-.62.44-1.08 1-1.08.37 0 .7.2.98.56.28-.36.61-.56.98-.56.56 0 1 .46 1 1.08 0 .94-.74 1.66-1.98 2.52Z" />
      </g>
      <circle className="branch-obgyn-ring" cx="16" cy="15.9" r="8.8" />
    </>
  );
}

function MinorRotationsIcon() {
  return (
    <>
      <g className="branch-minor-grid">
        <rect className="branch-minor-tile tile-one" x="7" y="7" width="6.15" height="6.15" rx="1.45" />
        <rect className="branch-minor-tile tile-two" x="18.85" y="7" width="6.15" height="6.15" rx="1.45" />
        <rect className="branch-minor-tile tile-three" x="7" y="18.85" width="6.15" height="6.15" rx="1.45" />
        <rect className="branch-minor-tile tile-four" x="18.85" y="18.85" width="6.15" height="6.15" rx="1.45" />
        <path className="branch-minor-link" d="M13.15 10.08h5.7M21.92 13.15v5.7M18.85 21.92h-5.7M10.08 18.85v-5.7" />
      </g>
      <path className="branch-minor-arrow" d="M14.75 16h2.9M16.4 14.35 18.05 16l-1.65 1.65" />
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

export function BranchIconSvg({ branchId, className = '', mode = 'card', size = 32, strokeWidth = 1.8 }) {
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
      <span className="branch-icon-core" />
      <BranchIconSvg branchId={branchId} mode="card" />
    </span>
  );
}
