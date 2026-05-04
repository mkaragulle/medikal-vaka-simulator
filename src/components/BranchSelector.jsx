import { useEffect, useRef, useState } from 'react';
import { IconBadge, Icon, branchIconById, branchToneById } from './ui.jsx';

const BRANCH_LAUNCH_DELAY_MS = 420;

function BranchCard({ branch, cases, isLaunching, isLocked, onLaunchBranch }) {
  const branchCases = cases.filter((clinicalCase) => clinicalCase.branchId === branch.id);
  const totalCases = branchCases.length;
  const priorityCases = branchCases.filter((clinicalCase) => /acil|kritik/i.test(clinicalCase.difficulty)).length;
  const avgPoints = totalCases
    ? Math.round(branchCases.reduce((sum, item) => sum + (/zor|kritik/i.test(item.difficulty) ? 22 : /acil/i.test(item.difficulty) ? 18 : 14), 0) / totalCases)
    : 0;
  const progress = Math.min(100, 28 + priorityCases * 14);
  const tone = branchToneById[branch.id] ?? 'teal';

  return (
    <button
      type="button"
      className={`branch-card ${isLaunching ? 'is-launching' : ''}`.trim()}
      data-branch={branch.id}
      onClick={() => onLaunchBranch(branch.id)}
      aria-label={`${branch.name} branşını aç`}
      aria-busy={isLaunching ? 'true' : 'false'}
      disabled={isLocked && !isLaunching}
    >
      <div className="branch-card-head">
        <IconBadge icon={branchIconById[branch.id] ?? 'Stethoscope'} tone={tone} />
        <span className="branch-count">{isLaunching ? 'Açılıyor' : `${totalCases} olgu`}</span>
      </div>

      <div className="branch-card-body">
        <h3>{branch.shortName}</h3>
        <p>{branch.description}</p>
      </div>

      <div className="branch-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>

      <div className="branch-card-meta">
        <span>{priorityCases} acil-kritik olgu</span>
        <span>{avgPoints} ortalama puan</span>
      </div>

      <div className="branch-card-footer" aria-hidden="true">
        <span>{isLaunching ? 'Olgu ekranına geçiliyor' : 'Branşa gir'}</span>
        <Icon name="ArrowRight" />
      </div>
    </button>
  );
}

function BranchSelector({ branches, cases, onSelectBranch }) {
  const [launchingBranchId, setLaunchingBranchId] = useState(null);
  const launchTimerRef = useRef(null);

  useEffect(() => () => {
    if (launchTimerRef.current) {
      window.clearTimeout(launchTimerRef.current);
    }
  }, []);

  const handleLaunchBranch = (branchId) => {
    if (launchingBranchId) return;

    setLaunchingBranchId(branchId);

    launchTimerRef.current = window.setTimeout(() => {
      onSelectBranch(branchId);
    }, BRANCH_LAUNCH_DELAY_MS);
  };

  return (
    <section className="section-block branches-section" id="branches">
      <div className="section-title-row stacked">
        <div>
          <h2>Klinik branş seç</h2>
        </div>
      </div>

      <div className="branch-grid">
        {branches.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            cases={cases}
            isLaunching={launchingBranchId === branch.id}
            isLocked={Boolean(launchingBranchId)}
            onLaunchBranch={handleLaunchBranch}
          />
        ))}
      </div>
    </section>
  );
}

export default BranchSelector;
