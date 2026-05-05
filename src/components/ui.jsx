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
    <svg
      className={`brand-symbol ${className}`.trim()}
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : 'true'}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6v20" />
      <path d="M22.5 7.5 12.2 16l10.3 8.5" />
      <path d="M5 17h5.2l1.6-4.2 3.9 8.6 2.2-5.4H27" />
      <circle cx="16" cy="16" r="13" opacity="0.22" />
    </svg>
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
  const label = isDark ? 'Açık temaya geç' : 'Koyu temaya geç';
  return (
    <button
      type="button"
      className={`klinikiq-theme-toggle theme-toggle ${variant === 'auth' ? 'klinikiq-theme-toggle-auth' : ''} ${className}`.trim()}
      onClick={onToggleTheme}
      aria-label={label}
      title={label}
      data-theme-state={theme}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-orb">
          <Icon name={isDark ? 'Sun' : 'Moon'} />
        </span>
      </span>
      {showLabel ? <span className="theme-toggle-label">{isDark ? 'Açık tema' : 'Koyu tema'}</span> : null}
    </button>
  );
}


export function BranchTransitionVisual({ branchId, iconName }) {
  if (branchId === 'cardiovascular') {
    return (
      <svg
        className="branch-transition-svg branch-transition-svg-cardiovascular"
        viewBox="0 0 120 120"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="cardio-heart-outline" d="M60 99c-8.9-7.3-17.2-14.1-24-20.4C25.6 68.9 19 61.1 19 50.3c0-12.3 8.8-21.1 20.2-21.1 7.5 0 14.4 3.7 20.8 11.2 6.4-7.5 13.3-11.2 20.8-11.2C92.2 29.2 101 38 101 50.3c0 10.8-6.6 18.6-17 28.3C77.2 84.9 68.9 91.7 60 99Z" />
        <path className="cardio-heart-glow" d="M60 99c-8.9-7.3-17.2-14.1-24-20.4C25.6 68.9 19 61.1 19 50.3c0-12.3 8.8-21.1 20.2-21.1 7.5 0 14.4 3.7 20.8 11.2 6.4-7.5 13.3-11.2 20.8-11.2C92.2 29.2 101 38 101 50.3c0 10.8-6.6 18.6-17 28.3C77.2 84.9 68.9 91.7 60 99Z" />
        <path className="cardio-heart-trace" d="M16 58h14l7-17 13 34 10-23 6 10h15" />
      </svg>
    );
  }

  return (
    <span className={`branch-transition-visual branch-transition-visual-${branchId || 'default'}`.trim()} aria-hidden="true">
      <span className="branch-transition-shine" />
      <Icon name={iconName || 'Activity'} className="branch-transition-icon" size={66} strokeWidth={1.9} />

      {branchId === 'internal-medicine' ? (
        <>
          <span className="flask-motion-bubble bubble-one" />
          <span className="flask-motion-bubble bubble-two" />
          <span className="branch-accent-line flask-liquid-line" />
        </>
      ) : null}

      {branchId === 'neurology' ? (
        <>
          <span className="brain-node node-one" />
          <span className="brain-node node-two" />
          <span className="brain-node node-three" />
        </>
      ) : null}

      {branchId === 'pediatrics' ? (
        <>
          <span className="sparkle-dot sparkle-one" />
          <span className="sparkle-dot sparkle-two" />
          <span className="sparkle-dot sparkle-three" />
        </>
      ) : null}

      {branchId === 'general-surgery' ? (
        <>
          <span className="surgery-streak streak-one" />
          <span className="surgery-streak streak-two" />
        </>
      ) : null}

      {branchId === 'pulmonology' ? (
        <>
          <span className="breath-wave wave-one" />
          <span className="breath-wave wave-two" />
        </>
      ) : null}

      {branchId === 'infectious-diseases' ? (
        <>
          <span className="shield-halo halo-one" />
          <span className="shield-halo halo-two" />
          <span className="shield-cross-glow" />
        </>
      ) : null}

      {branchId === 'orthopedics' ? (
        <>
          <span className="bone-joint joint-one" />
          <span className="bone-joint joint-two" />
          <span className="bone-joint joint-three" />
          <span className="bone-joint joint-four" />
        </>
      ) : null}
    </span>
  );
}

export const branchIconById = {
  cardiovascular: 'HeartPulse',
  'internal-medicine': 'FlaskConical',
  neurology: 'Brain',
  pediatrics: 'Baby',
  'general-surgery': 'Scalpel',
  pulmonology: 'Lungs',
  'infectious-diseases': 'ShieldPlus',
  orthopedics: 'Bone',
};

export const branchToneById = {
  cardiovascular: 'danger',
  'internal-medicine': 'blue',
  neurology: 'violet',
  pediatrics: 'success',
  'general-surgery': 'warning',
  pulmonology: 'sky',
  'infectious-diseases': 'lime',
  orthopedics: 'slate',
};
