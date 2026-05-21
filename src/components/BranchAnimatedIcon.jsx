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
      <g className="kq-branch-core anatomy-core">
        <path className="kq-outline" d="M16 6.1v19.2" />
        <path className="kq-detail" d="M12.2 8.2c1.3 1.12 2.57 1.68 3.8 1.68s2.5-.56 3.8-1.68" />
        <path className="kq-detail" d="M11.1 11.2c1.35 1.1 2.98 1.68 4.9 1.68s3.55-.58 4.9-1.68" />
        <path className="kq-detail" d="M10.5 14.4c1.72 1.12 3.55 1.68 5.5 1.68s3.78-.56 5.5-1.68" />
        <path className="kq-detail" d="M11.05 17.65c1.55.9 3.2 1.35 4.95 1.35s3.4-.45 4.95-1.35" />
        <path className="kq-detail" d="M12.2 20.72c1.18.62 2.45.93 3.8.93s2.62-.31 3.8-.93" />
        <path className="kq-outline" d="M12.7 9.35c-2.52 1.1-4.05 3.25-4.35 5.95-.23 2.08.58 4.2 2.18 5.77" />
        <path className="kq-outline" d="M19.3 9.35c2.52 1.1 4.05 3.25 4.35 5.95.23 2.08-.58 4.2-2.18 5.77" />
      </g>
      <path className="kq-scan anatomy-scan" d="M8.35 15.98h15.3" />
    </>
  );
}

function PhysiologyIcon() {
  return (
    <>
      <g className="kq-branch-core physiology-core">
        <path className="kq-outline physiology-heart" d="M16 25.15c-5.72-4.1-9.35-7.55-9.35-11.7 0-2.62 1.92-4.58 4.36-4.58 1.86 0 3.45.97 4.99 2.74 1.54-1.77 3.13-2.74 4.99-2.74 2.44 0 4.36 1.96 4.36 4.58 0 4.15-3.63 7.6-9.35 11.7Z" />
        <path className="kq-active-line physiology-ecg" d="M6.7 16.1h4.55l1.22-2.85 3.06 6.78 2.3-5.12 1.48 2.68h5.99" />
      </g>
      <circle className="kq-pulse-ring physiology-ring physiology-ring-one" cx="16" cy="16" r="9.8" />
      <circle className="kq-pulse-ring physiology-ring physiology-ring-two" cx="16" cy="16" r="12" />
    </>
  );
}

function HistologyIcon() {
  return (
    <>
      <g className="kq-branch-core histology-core">
        <path className="kq-outline" d="M8.2 10.15c2.15-3.18 6.48-4.38 10.15-2.8 3.82 1.65 5.82 5.95 4.62 9.9-1.14 3.78-4.92 6.3-8.82 5.88-4.12-.45-7.25-3.75-7.28-7.72-.02-1.9.45-3.68 1.33-5.26Z" />
        <path className="kq-detail histology-nucleus" d="M13.05 12.1c1.48-1.22 3.82-.98 5.02.55 1.18 1.5.85 3.8-.72 4.9-1.55 1.1-3.83.68-4.86-.9-.95-1.45-.72-3.42.56-4.55Z" />
        <circle className="kq-node histology-organelle histology-organelle-one" cx="10.95" cy="16.95" r=".72" />
        <circle className="kq-node histology-organelle histology-organelle-two" cx="20.15" cy="12.95" r=".64" />
      </g>
      <path className="kq-subtle-line histology-division" d="M15.9 8.2c2.6 2.12 3.48 5.7 2.12 8.75" />
    </>
  );
}

function BiochemistryIcon() {
  return (
    <>
      <g className="kq-branch-core biochem-core">
        <path className="kq-outline" d="M12.25 5.25h7.5" />
        <path className="kq-outline biochem-flask-body" d="M13.7 5.35v5.78L8.6 21.55a3.88 3.88 0 0 0 3.5 5.58h7.8a3.88 3.88 0 0 0 3.5-5.58l-5.1-10.42V5.35" />
        <path className="kq-active-line biochem-liquid" d="M11.15 20.8c1.62-.78 3.1-.92 4.43-.42 1.6.6 3.1.58 4.62-.08" />
      </g>
      <g className="biochem-bubbles">
        <circle className="kq-bubble bubble-one" cx="14.15" cy="17.25" r=".66" />
        <circle className="kq-bubble bubble-two" cx="18.65" cy="22.55" r=".72" />
        <circle className="kq-bubble bubble-three" cx="19.25" cy="15.55" r=".54" />
      </g>
    </>
  );
}

function MicrobiologyIcon() {
  return (
    <>
      <g className="kq-branch-core microbiology-core">
        <circle className="kq-outline" cx="16" cy="16" r="10.15" />
        <path className="kq-subtle-line" d="M9.45 12.4c3.25-1.65 6.9-1.82 10.95-.52" />
        <path className="kq-subtle-line" d="M10.25 21.15c3.35 1.2 7.02 1.02 11-.55" />
        <circle className="kq-colony colony-one" cx="12.35" cy="16.2" r="1.3" />
        <circle className="kq-colony colony-two" cx="18.75" cy="14.05" r="1.02" />
        <circle className="kq-colony colony-three" cx="17.2" cy="20.25" r=".92" />
        <path className="kq-detail micro-symbol" d="M20.8 17.35c-.52.48-1.05.48-1.57 0M20.02 16.58v1.55" />
      </g>
    </>
  );
}

function PathologyIcon() {
  return (
    <>
      <g className="kq-branch-core pathology-core">
        <rect className="kq-outline" x="8.15" y="5.7" width="15.7" height="20.6" rx="3.2" />
        <path className="kq-subtle-line" d="M11.2 10.15h9.6" />
        <path className="kq-stain pathology-stain" d="M12.05 17.95c.06-2.05 1.82-3.55 3.88-3.32 1.5.17 2.38 1.02 3.32 1.98 1.08 1.08 1.48 2.7.55 3.92-1.12 1.48-3.18 1.42-4.82.72-1.7-.72-2.98-1.82-2.93-3.3Z" />
      </g>
      <path className="kq-scan pathology-scan" d="M10.15 16h11.7" />
    </>
  );
}

function PharmacologyIcon() {
  return (
    <>
      <g className="kq-branch-core pharmacology-core">
        <g className="pharma-capsule">
          <path className="kq-outline" d="M8.1 21.9 20.9 9.1a4.04 4.04 0 0 1 5.72 5.72l-12.8 12.8A4.04 4.04 0 0 1 8.1 21.9Z" />
          <path className="kq-active-line" d="m13.15 16.85 4 4" />
        </g>
        <g className="pharma-target">
          <circle className="kq-outline" cx="23" cy="22.95" r="2.25" />
          <circle className="kq-node" cx="23" cy="22.95" r=".55" />
        </g>
      </g>
      <g className="pharma-binding-particles">
        <circle className="kq-binding-particle particle-one" cx="16.2" cy="15.9" r=".45" />
        <circle className="kq-binding-particle particle-two" cx="18.05" cy="17.85" r=".42" />
      </g>
    </>
  );
}

function InternalMedicineIcon() {
  return (
    <>
      <g className="kq-branch-core internal-core">
        <path className="kq-outline" d="M16 5.25c-2.7 0-4.65 1.78-4.65 4.2 0 1.05.36 1.95.98 2.65l-1.72 10.02a2.6 2.6 0 0 0 2.56 3.04h5.66a2.6 2.6 0 0 0 2.56-3.04L19.67 12.1c.62-.7.98-1.6.98-2.65 0-2.42-1.95-4.2-4.65-4.2Z" />
        <path className="kq-subtle-line" d="M16 9.3v15.05" />
        <path className="kq-detail internal-lung" d="M15.85 13.05c-1.82-2.18-4.52-2.05-5.45.28v3.12a3.28 3.28 0 0 0 3.28 3.28c1.27 0 2.12-1.38 2.17-3.72" />
        <path className="kq-detail internal-lung" d="M16.15 13.05c1.82-2.18 4.52-2.05 5.45.28v3.12a3.28 3.28 0 0 1-3.28 3.28c-1.27 0-2.12-1.38-2.17-3.72" />
        <path className="kq-active-line internal-wave" d="M11.55 22.08h2.45l.72-1.45 1.4 2.85.98-2.12.68 1.24h2.67" />
      </g>
      <path className="kq-scan internal-scan" d="M10.65 15.9h10.7" />
    </>
  );
}

function PediatricsIcon() {
  return (
    <>
      <g className="kq-branch-core pediatrics-core">
        <circle className="kq-outline" cx="10.25" cy="9.75" r="2.3" />
        <circle className="kq-outline" cx="21.75" cy="9.75" r="2.3" />
        <circle className="kq-outline peds-face" cx="16" cy="15.55" r="6.75" />
        <circle className="kq-node" cx="13.55" cy="14.85" r=".5" />
        <circle className="kq-node" cx="18.45" cy="14.85" r=".5" />
        <path className="kq-detail" d="M13.9 17.8c1.38.92 2.82.92 4.2 0" />
        <path className="kq-active-line peds-cross" d="M16 10.75v3.32M14.34 12.41h3.32" />
      </g>
      <path className="kq-spark peds-spark" d="M24.3 7.75l.48 1.2 1.2.48-1.2.48-.48 1.2-.48-1.2-1.2-.48 1.2-.48.48-1.2Z" />
    </>
  );
}

function SurgeryIcon() {
  return (
    <>
      <g className="kq-branch-core surgery-core">
        <path className="kq-outline surgery-scalpel" d="M6.1 25.9 22.8 9.2a2.15 2.15 0 0 1 3.04 0l.96.96a2.15 2.15 0 0 1 0 3.04L10.1 29.9 6.1 25.9Z" />
        <path className="kq-detail" d="m18.2 13.8 3.2 3.2" />
        <path className="kq-detail" d="M22 6.35 26.65 11" />
      </g>
      <path className="kq-active-line surgery-incision" d="M8.6 25.95c3.72-1.06 6.8-2.5 9.22-4.32" />
      <path className="kq-spark surgery-glint" d="M25.5 5.05l.5 1.22 1.22.5-1.22.5-.5 1.22-.5-1.22-1.22-.5 1.22-.5.5-1.22Z" />
    </>
  );
}

function ObgynIcon() {
  return (
    <>
      <g className="kq-branch-core obgyn-core">
        <path className="kq-outline" d="M12.35 6.65v6.8a3.65 3.65 0 0 0 7.3 0v-6.8" />
        <path className="kq-outline" d="M12.35 6.65C9.82 6.88 7.92 8.65 7.55 11.2" />
        <path className="kq-outline" d="M19.65 6.65c2.53.23 4.43 2 4.8 4.55" />
        <circle className="kq-outline" cx="8.35" cy="12.82" r="1.66" />
        <circle className="kq-outline" cx="23.65" cy="12.82" r="1.66" />
        <path className="kq-subtle-line" d="M16 17.68v7.2M13.35 24.88h5.3" />
        <path className="kq-active-line obgyn-heart" d="M16 16.02c-1.18-.82-1.88-1.5-1.88-2.4 0-.58.42-1.02.98-1.02.36 0 .66.18.9.5.24-.32.54-.5.9-.5.56 0 .98.44.98 1.02 0 .9-.7 1.58-1.88 2.4Z" />
      </g>
      <circle className="kq-pulse-ring obgyn-ring" cx="16" cy="15.8" r="8.8" />
    </>
  );
}

function MinorRotationsIcon() {
  return (
    <>
      <g className="kq-branch-core minor-core">
        <rect className="kq-outline minor-tile tile-one" x="7" y="7" width="6.05" height="6.05" rx="1.65" />
        <rect className="kq-outline minor-tile tile-two" x="18.95" y="7" width="6.05" height="6.05" rx="1.65" />
        <rect className="kq-outline minor-tile tile-three" x="7" y="18.95" width="6.05" height="6.05" rx="1.65" />
        <rect className="kq-outline minor-tile tile-four" x="18.95" y="18.95" width="6.05" height="6.05" rx="1.65" />
        <path className="kq-active-line minor-arrow" d="M14.45 16h3.1M16.22 14.26 17.96 16l-1.74 1.74" />
      </g>
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

export function BranchIconSvg({ branchId, className = '', mode = 'card', size = 32, strokeWidth = 1.88 }) {
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
      <span className="branch-icon-soft-light" />
      <BranchIconSvg branchId={branchId} mode="card" />
    </span>
  );
}
