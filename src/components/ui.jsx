const iconPaths = {
  HeartPulse: <><path d="M19.5 12.5c1.5-2 1.3-5.1-.7-6.7-1.9-1.6-4.7-1.1-6.8 1.2-2.1-2.3-4.9-2.8-6.8-1.2-2.2 1.8-2.2 5.2-.2 7.5 1.7 2.1 4.2 4 7 6.2 1.8-1.4 3.5-2.7 4.9-4.1"/><path d="M3.8 12h4l1.1-2.4 2.6 5.8 2-4.3 1.4 2.9h5.3"/></>,
  Stethoscope: <><path d="M6 4v4.5a4 4 0 0 0 8 0V4"/><path d="M4.7 4h2.6M12.7 4h2.6"/><path d="M10 13v2.8a3.7 3.7 0 0 0 7.4 0v-.6"/><circle cx="18" cy="13.4" r="1.6"/></>,
  FlaskConical: <><path d="M9 3h6"/><path d="M10 3v5.3L5.7 17a3.2 3.2 0 0 0 2.9 4.6h6.8a3.2 3.2 0 0 0 2.9-4.6L14 8.3V3"/><path d="M8.2 15h7.6"/></>,
  Brain: <><path d="M9 4.5A3.4 3.4 0 0 0 5.6 8v1.3A3.2 3.2 0 0 0 4 12.1c0 1.8 1.2 3.2 2.8 3.6.2 2.2 1.8 3.8 4.2 3.8V4.5Z"/><path d="M15 4.5A3.4 3.4 0 0 1 18.4 8v1.3a3.2 3.2 0 0 1 1.6 2.8c0 1.8-1.2 3.2-2.8 3.6-.2 2.2-1.8 3.8-4.2 3.8V4.5Z"/><path d="M8 10h3M13 10h3M8.5 14H11M13 14h2.5"/></>,
  Baby: <><path d="M9 7a3 3 0 0 1 6 0"/><path d="M7.2 19h9.6a3.2 3.2 0 0 0 3.2-3.2v-4a3.2 3.2 0 0 0-3.2-3.2H7.2A3.2 3.2 0 0 0 4 11.8v4A3.2 3.2 0 0 0 7.2 19Z"/><path d="M9 13h.01M15 13h.01M9.5 16c.8.7 1.6 1 2.5 1s1.7-.3 2.5-1"/></>,
  Scalpel: <><path d="M14.4 4.4 20 10"/><path d="M3.6 20.4 18.2 5.8a2 2 0 0 1 2.8 2.8L6.4 23.2 3.6 20.4Z"/><path d="M9.2 14.8 6.4 12"/></>,
  Lungs: <><path d="M12 4v16"/><path d="M12 10c-2.4-2.8-6.4-2.8-7.6.2v3.2A4.2 4.2 0 0 0 8.6 17c1.9 0 3.4-1.9 3.4-5"/><path d="M12 10c2.4-2.8 6.4-2.8 7.6.2v3.2a4.2 4.2 0 0 1-4.2 3.6c-1.9 0-3.4-1.9-3.4-5"/></>,
  ShieldPlus: <><path d="M12 3.5 19 6v5.2c0 4.4-2.8 7.5-7 9.3-4.2-1.8-7-4.9-7-9.3V6l7-2.5Z"/><path d="M12 8.5v6M9 11.5h6"/></>,
  Bone: <><path d="M7.3 8.7a2.8 2.8 0 1 1 4-4l1.4 1.4 1.4-1.4a2.8 2.8 0 1 1 4 4l-1.4 1.4 1.4 1.4a2.8 2.8 0 1 1-4 4l-1.4-1.4-1.4 1.4a2.8 2.8 0 1 1-4-4l1.4-1.4-1.4-1.4Z"/></>,
  Activity: <path d="M3.5 12h4.1l1.6-4 4 9 2-5h5.3"/>,
  ClipboardCheck: <><rect x="5" y="4.5" width="14" height="16" rx="2.2"/><path d="M9 4.5A3 3 0 0 1 12 2h0a3 3 0 0 1 3 2.5"/><path d="m8.8 13 2.1 2.1 4.4-4.7"/><path d="M8.5 8.7h7"/></>,
  TrendUp: <><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7.2 14.6 3.6-3.7 3.1 3.1 5.1-6.5"/><path d="M15.8 7.5H19v3.2"/></>,
  LayeredCards: <><path d="M7 7.5h10a2 2 0 0 1 2 2v7.2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2Z"/><path d="M8.5 5h8"/><path d="M9.8 2.8h4.4"/><path d="M8.5 12h7"/><path d="M8.5 15.2h4.8"/></>,
  InsightGauge: <><path d="M5 16a7 7 0 1 1 14 0"/><path d="M12 16l3.2-4.4"/><path d="M8.2 19h7.6"/><path d="M7.5 13.2h.01M16.5 13.2h.01"/></>,
  Stopwatch: <><circle cx="12" cy="13.2" r="6.6"/><path d="M12 13.2V9.6"/><path d="M12 13.2h3.1"/><path d="M9.6 3.2h4.8"/><path d="M12 3.2v2.1"/><path d="m17.2 6 1.3-1.3"/></>,
  Mail: <><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></>,
  Lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  Eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="3"/></>,
  EyeOff: <><path d="M3 3l18 18"/><path d="M10.6 10.6A3 3 0 0 0 13.4 13.4"/><path d="M9.9 5.2A10.5 10.5 0 0 1 12 5c6 0 9.5 7 9.5 7a17.8 17.8 0 0 1-3.1 4.1"/><path d="M6.6 6.7C3.9 8.5 2.5 12 2.5 12s3.5 7 9.5 7c1.2 0 2.3-.3 3.3-.7"/></>,
  ShieldCheck: <><path d="M12 3.5 19 6v5.2c0 4.4-2.8 7.5-7 9.3-4.2-1.8-7-4.9-7-9.3V6l7-2.5Z"/><path d="m9.5 12.3 1.6 1.6 3.6-3.8"/></>,
  ClipboardList: <><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5A2.5 2.5 0 0 1 11.5 2h1A2.5 2.5 0 0 1 15 4.5"/><path d="M9 11h6M9 15h6"/></>,
  Timer: <><circle cx="12" cy="13" r="7"/><path d="M12 13V9M12 2h3M10 2h4M18 6l1.4-1.4"/></>,
  Trophy: <><path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M17 6h3a3 3 0 0 1-3 3M7 6H4a3 3 0 0 0 3 3"/></>,
  Target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></>,
  CheckCircle: <><circle cx="12" cy="12" r="8"/><path d="m8.5 12.2 2.2 2.2 4.8-5"/></>,
  XCircle: <><circle cx="12" cy="12" r="8"/><path d="m9 9 6 6M15 9l-6 6"/></>,
  AlertTriangle: <><path d="M12 3.5 21 19H3L12 3.5Z"/><path d="M12 9v4M12 16h.01"/></>,
  ChevronDown: <path d="m6 9 6 6 6-6"/>,
  ChevronUp: <path d="m6 15 6-6 6 6"/>,
  ArrowRight: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  Gauge: <><path d="M4 14a8 8 0 1 1 16 0"/><path d="M12 14l3-4"/><path d="M7 20h10"/></>,
  Wind: <><path d="M4 9h11a3 3 0 1 0-3-3"/><path d="M4 14h15a3 3 0 1 1-3 3"/></>,
  Droplets: <><path d="M8 13.5a3 3 0 1 0 6 0c0-2-3-5.2-3-5.2s-3 3.2-3 5.2Z"/><path d="M14.5 8.5a2.3 2.3 0 1 0 4.6 0c0-1.6-2.3-4.1-2.3-4.1s-2.3 2.5-2.3 4.1Z"/></>,
  Thermometer: <><path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0Z"/><path d="M12 7v8"/></>,
  BookOpen: <><path d="M4 5.5h6.6A3.4 3.4 0 0 1 14 8.9V20H7.4A3.4 3.4 0 0 0 4 23.4V5.5Z"/><path d="M20 5.5h-6.6A3.4 3.4 0 0 0 10 8.9"/></>,
  Moon: <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z"/>,
  Sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 3.6 3.6M20.4 20.4 19 19M19 5l1.4-1.4M3.6 20.4 5 19"/></>,
  Search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
  Image: <><rect x="4" y="5" width="16" height="14" rx="2"/><path d="m4 15 4-4 4 4 2-2 6 6"/><circle cx="15" cy="9" r="1.5"/></>,
  Sparkles: <><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z"/></>,
  Notes: <><path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
  User: <><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></>,
  LogIn: <><path d="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></>,
  UserPlus: <><circle cx="10" cy="8" r="3.5"/><path d="M3.5 20a6.5 6.5 0 0 1 13 0"/><path d="M19 8v6M16 11h6"/></>,
  Trash2: <><path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 14h10l1-14"/><path d="M9 7V4h6v3"/></>,
  RotateCcw: <><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v6h6"/></>,
  X: <path d="M6 6l12 12M18 6 6 18"/>,

  AnatomyTorso: <><path d="M12 3.4c2.7 0 4.8 1.9 4.8 4.5 0 1.5-.7 2.9-1.8 3.7l1.8 6.2c.3 1.1-.5 2.2-1.6 2.2H8.8c-1.1 0-1.9-1.1-1.6-2.2L9 11.6a4.4 4.4 0 0 1-1.8-3.7c0-2.6 2.1-4.5 4.8-4.5Z"/><path d="M9.2 11.7h5.6"/><path d="M10.3 7.2h3.4M9.8 15.2h4.4"/><path d="M7 9.7 4.8 12M17 9.7l2.2 2.3"/></>,
  PhysiologyWave: <><path d="M3 12h3.8l1.4-3.4 3.2 7.9 2.2-10.4 2.5 5.9H21"/><path d="M5.2 18.2c1.9 1.3 4.2 2.1 6.8 2.1 4.2 0 7.7-2.2 9-5.3"/><path d="M18.8 5.8c-1.9-1.3-4.2-2.1-6.8-2.1-4.2 0-7.7 2.2-9 5.3"/></>,
  HistologyCells: <><circle cx="8" cy="9" r="3.3"/><circle cx="15.7" cy="8.1" r="2.5"/><circle cx="14.7" cy="16.1" r="3.8"/><path d="M8 9h.01M15.7 8.1h.01M14.7 16.1h.01"/><path d="M10.6 11.1 12.2 13.2M12.3 8.7 10.9 9.1"/></>,
  BiochemFlask: <><path d="M9.1 3.2h5.8"/><path d="M10.2 3.2v5.1L5.9 17a3.1 3.1 0 0 0 2.8 4.4h6.6a3.1 3.1 0 0 0 2.8-4.4l-4.3-8.7V3.2"/><path d="M8 15.4c1.6-.8 3.3.8 4.9.1 1.1-.5 2-.8 3.1-.1"/><circle cx="10" cy="12" r=".7"/><circle cx="14.5" cy="17.3" r=".7"/></>,
  Microbe: <><ellipse cx="12" cy="12" rx="5.2" ry="6.6"/><path d="M8.5 8.4 15.5 15.6M15.4 8.5 8.6 15.5"/><path d="M12 3.8V2.4M12 21.6v-1.4M5.9 5.9 4.9 4.9M19.1 19.1l-1-1M18.1 5.9l1-1M4.9 19.1l1-1M3.8 12H2.4M21.6 12h-1.4"/><circle cx="10" cy="11" r=".6"/><circle cx="14.2" cy="12.8" r=".6"/></>,
  PathologySlide: <><rect x="4.5" y="5" width="15" height="14" rx="2.2"/><path d="M8 8.2h8"/><path d="M8.2 15.7c2.4-3.3 5.4 2.8 7.8-.8"/><circle cx="9.2" cy="12.2" r="1.1"/><circle cx="14.7" cy="11.7" r="1.3"/><path d="M10.1 20.6h3.8"/></>,
  PharmacologyCapsule: <><path d="M7.2 16.8 16.8 7.2a3.4 3.4 0 1 1 4.8 4.8L12 21.6a3.4 3.4 0 1 1-4.8-4.8Z"/><path d="m11.4 12.6 4 4"/><path d="M4.4 8.2c1.5-2.6 3.8-4.2 7.1-4.7M19.5 15.8c-1.5 2.6-3.8 4.2-7.1 4.7"/></>,
  InternalSystems: <><path d="M12 4.1v15.8"/><path d="M12 10.2c-2.2-2.4-5.8-2.3-6.9.4v2.7a3.7 3.7 0 0 0 3.8 3.4c1.8 0 3.1-1.8 3.1-4.5"/><path d="M12 10.2c2.2-2.4 5.8-2.3 6.9.4v2.7a3.7 3.7 0 0 1-3.8 3.4c-1.8 0-3.1-1.8-3.1-4.5"/><path d="M9 7.2a3 3 0 0 1 6 0"/><path d="M8.1 20.3h7.8"/></>,
  PediatricsChild: <><circle cx="12" cy="7.1" r="3"/><path d="M7.2 20.2c.7-4 2.3-6.6 4.8-6.6s4.1 2.6 4.8 6.6"/><path d="M8.2 13.2 5.1 16.1M15.8 13.2l3.1 2.9"/><path d="M10.3 9.4c1.1.8 2.3.8 3.4 0"/><path d="M18.6 5.8l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4Z"/></>,
  SurgeryBlade: <><path d="M15.2 3.8 20.2 8.8"/><path d="M3.8 20.2 18 6a1.8 1.8 0 0 1 2.5 2.5L6.3 22.7l-2.5-2.5Z"/><path d="m8.7 15.3-2.8-2.8"/><path d="M12.6 10.4 16 13.8"/></>,
  ObgynUterus: <><path d="M8.6 5.1v5.4a3.4 3.4 0 0 0 6.8 0V5.1"/><path d="M8.6 5.1C6.7 5.3 5.1 6.7 4.9 8.7M15.4 5.1c1.9.2 3.5 1.6 3.7 3.6"/><path d="M12 13.9v6.3"/><path d="M9.3 20.2h5.4"/><circle cx="7.3" cy="10.1" r="1.6"/><circle cx="16.7" cy="10.1" r="1.6"/></>,
  MinorGrid: <><rect x="4" y="4" width="6.2" height="6.2" rx="1.5"/><rect x="13.8" y="4" width="6.2" height="6.2" rx="1.5"/><rect x="4" y="13.8" width="6.2" height="6.2" rx="1.5"/><rect x="13.8" y="13.8" width="6.2" height="6.2" rx="1.5"/><path d="M12 7.1h0M7.1 12h0M16.9 12h0M12 16.9h0"/></>,
  TusSpotFlash: <><path d="M12 3.2 13.7 8l5.1 1.6-4.2 3.1.1 5.4L12 15l-2.7 3.1.1-5.4-4.2-3.1L10.3 8 12 3.2Z"/><path d="M19.2 4.8l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7Z"/><path d="M4.8 16.2l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5.5-1.3Z"/></>,
  Zap: <><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></>,
};

export function Icon({ name, className = '', size = 20, strokeWidth = 1.9 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name] ?? iconPaths.Activity}
    </svg>
  );
}


export function BrandMark({ className = '', size = 24, title = 'KlinikIQ' }) {
  return (
    <span
      className={`brand-symbol ${className}`.trim()}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : 'true'}
      style={{ width: size, height: size }}
    >
      <img src="/brand-icon.png" alt={title || ''} width={size} height={size} loading="eager" decoding="async" />
    </span>
  );
}

export function IconBadge({ icon = 'Activity', tone = 'teal', size = 'md', className = '' }) {
  return (
    <span className={`icon-badge icon-badge-${tone} icon-badge-${size} ${className}`.trim()} aria-hidden="true">
      <Icon name={icon} />
    </span>
  );
}

export function ClinicalCallout({ tone = 'info', icon = 'Sparkles', title = 'Klinik yorum', children }) {
  return (
    <div className={`clinical-callout ${tone}`}>
      <IconBadge icon={icon} tone={tone} size="sm" />
      <div className="clinical-callout-copy">
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}



export function ThemeToggle({ theme = 'dark', onToggleTheme, className = '', showLabel = false, variant = 'default' }) {
  const isDark = theme === 'dark';
  const isNavIcon = variant === 'navIcon';
  const label = isDark ? 'Açık temaya geç' : 'Koyu temaya geç';
  const variantClass = variant === 'auth' || isNavIcon ? 'klinikiq-theme-toggle-auth' : '';

  return (
    <button
      type="button"
      className={`klinikiq-theme-toggle theme-toggle ${variantClass} ${isNavIcon ? 'klinikiq-theme-toggle-nav-icon' : ''} ${className}`.trim()}
      onClick={onToggleTheme}
      aria-label={label}
      title={label}
      data-theme-state={theme}
    >
      {isNavIcon ? (
        <Icon name={isDark ? 'Sun' : 'Moon'} className="theme-toggle-icon" />
      ) : (
        <span className="theme-toggle-track" aria-hidden="true">
          <span className="theme-toggle-orb">
            <Icon name={isDark ? 'Sun' : 'Moon'} />
          </span>
        </span>
      )}
      {showLabel ? <span className="theme-toggle-label">{isDark ? 'Açık tema' : 'Koyu tema'}</span> : null}
    </button>
  );
}


const branchTransitionEffects = {
  'tus-spot-olgular': ['spot-ray ray-one', 'spot-ray ray-two', 'spot-spark spark-one', 'spot-spark spark-two'],
  anatomy: ['anatomy-segment segment-one', 'anatomy-segment segment-two', 'anatomy-dot dot-one', 'anatomy-dot dot-two'],
  physiology: ['physiology-wave wave-one', 'physiology-wave wave-two', 'physiology-pulse-dot pulse-dot'],
  'histology-embryology': ['cell-orbit orbit-one', 'cell-orbit orbit-two', 'cell-seed seed-one', 'cell-seed seed-two'],
  'medical-biochemistry': ['flask-motion-bubble bubble-one', 'flask-motion-bubble bubble-two', 'flask-motion-bubble bubble-three', 'branch-accent-line flask-liquid-line'],
  'medical-microbiology': ['microbe-particle particle-one', 'microbe-particle particle-two', 'microbe-halo halo-one', 'microbe-halo halo-two'],
  'medical-pathology': ['pathology-focus focus-one', 'pathology-focus focus-two', 'pathology-cell cell-one', 'pathology-cell cell-two'],
  'medical-pharmacology': ['pharma-ring ring-one', 'pharma-ring ring-two', 'pharma-dose dose-one'],
  'internal-medicine': ['internal-breath breath-one', 'internal-breath breath-two', 'internal-heart-dot heart-dot'],
  pediatrics: ['peds-aura aura-one', 'peds-aura aura-two', 'peds-spark spark-one', 'peds-spark spark-two'],
  'general-surgery': ['surgery-streak streak-one', 'surgery-streak streak-two', 'surgery-glint glint-one'],
  'obstetrics-gynecology': ['obgyn-halo halo-one', 'obgyn-halo halo-two', 'obgyn-core core-one'],
  'minor-rotations': ['minor-tile tile-one', 'minor-tile tile-two', 'minor-tile tile-three', 'minor-tile tile-four'],
};

export function BranchTransitionVisual({ branchId, iconName }) {
  const effectTokens = branchTransitionEffects[branchId] ?? ['default-orbit orbit-one', 'default-orbit orbit-two'];

  return (
    <span className={`branch-transition-visual branch-transition-visual-${branchId || 'default'}`.trim()} aria-hidden="true" data-branch={branchId || 'default'}>
      <span className="branch-transition-shine" />
      <span className="branch-transition-core-glow" />
      {effectTokens.map((token) => (
        <span key={token} className={`branch-motion-effect ${token}`} />
      ))}
      <Icon name={iconName || 'Activity'} className="branch-transition-icon" size={76} strokeWidth={1.75} />
    </span>
  );
}

export const branchIconById = {
  'tus-spot-olgular': 'TusSpotFlash',
  anatomy: 'AnatomyTorso',
  physiology: 'PhysiologyWave',
  'histology-embryology': 'HistologyCells',
  'medical-biochemistry': 'BiochemFlask',
  'medical-microbiology': 'Microbe',
  'medical-pathology': 'PathologySlide',
  'medical-pharmacology': 'PharmacologyCapsule',
  'internal-medicine': 'InternalSystems',
  pediatrics: 'PediatricsChild',
  'general-surgery': 'SurgeryBlade',
  'obstetrics-gynecology': 'ObgynUterus',
  'minor-rotations': 'MinorGrid',
};
export const branchToneById = {
  'tus-spot-olgular': 'accent',
  anatomy: 'slate',
  physiology: 'danger',
  'histology-embryology': 'violet',
  'medical-biochemistry': 'blue',
  'medical-microbiology': 'lime',
  'medical-pathology': 'warning',
  'medical-pharmacology': 'success',
  'internal-medicine': 'blue',
  pediatrics: 'sky',
  'general-surgery': 'warning',
  'obstetrics-gynecology': 'danger',
  'minor-rotations': 'slate',
};
