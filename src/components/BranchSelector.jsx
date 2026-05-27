import { memo, useCallback, useMemo } from 'react';
import { IconBadge, Icon, branchIconById, branchToneById } from './ui.jsx';
import { BranchAnimatedIcon } from './BranchAnimatedIcon.jsx';
import { TUS_SPOT_BRANCH_ID } from '../data/branches.js';

function BranchCard({ branch, branchStats, isLaunching, isLocked, onLaunchBranch, onPreloadBranch, index = 0, variant = 'grid' }) {
  const isSpotBranch = branch.id === TUS_SPOT_BRANCH_ID;
  const priorityCases = branchStats?.priorityCases ?? 0;
  const progress = Math.min(100, 28 + priorityCases * 14);
  const tone = branchToneById[branch.id] ?? 'accent';
  const isFeatured = variant === 'featured';

  const preloadBranch = useCallback(() => onPreloadBranch?.(branch.id), [branch.id, onPreloadBranch]);

  return (
    <button
      type="button"
      className={[
        'branch-card',
        isFeatured ? 'branch-card-featured' : '',
        isSpotBranch ? 'tus-spot-olgular-card' : '',
        isLaunching ? 'is-launching' : '',
      ].filter(Boolean).join(' ')}
      data-branch={branch.id}
      data-launch-state={isLaunching ? 'launching' : 'idle'}
      onPointerEnter={preloadBranch}
      onFocus={preloadBranch}
      onClick={() => onLaunchBranch(branch.id)}
      aria-label={`${branch.name} alanını aç`}
      aria-busy={isLaunching ? 'true' : 'false'}
      disabled={isLocked && !isLaunching}
      style={{ '--branch-index': index }}
    >
      <span className="branch-launch-wave" aria-hidden="true" />
      <div className="branch-card-head">
        {isSpotBranch ? (
          <IconBadge icon={branchIconById[branch.id] ?? 'Stethoscope'} tone={tone} branchId={branch.id} />
        ) : (
          <BranchAnimatedIcon branchId={branch.id} isLaunching={isLaunching} />
        )}
      </div>

      <div className="branch-card-body">
        <h3>{branch.shortName || branch.name}</h3>
        <p>{branch.description}</p>
      </div>

      <div className="branch-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>

      <div className="branch-card-footer" aria-hidden="true">
        <span>{isLaunching ? 'Olgu ekranına geçiliyor' : isSpotBranch ? 'Spot çöz' : 'Branşa gir'}</span>
        <Icon name="ArrowRight" />
      </div>
    </button>
  );
}

const MemoizedBranchCard = memo(BranchCard);

function BranchSelector({ branches, cases, onSelectBranch, onPreloadBranch, launchingBranchId = null, isTransitioning = false }) {
  const branchStatsById = useMemo(() => {
    const stats = new Map();

    cases.forEach((clinicalCase) => {
      const branchId = clinicalCase.branchId;
      const current = stats.get(branchId) ?? { priorityCases: 0 };
      current.priorityCases += branchId === TUS_SPOT_BRANCH_ID
        ? clinicalCase.caseType === 'spot' ? 1 : 0
        : /acil|kritik/i.test(clinicalCase.difficulty) ? 1 : 0;
      stats.set(branchId, current);
    });

    return stats;
  }, [cases]);

  const handleLaunchBranch = useCallback((branchId) => {
    if (isTransitioning) return;
    onSelectBranch(branchId);
  }, [isTransitioning, onSelectBranch]);

  const spotBranch = useMemo(() => branches.find((branch) => branch.id === TUS_SPOT_BRANCH_ID), [branches]);
  const standardBranches = useMemo(() => branches.filter((branch) => branch.id !== TUS_SPOT_BRANCH_ID), [branches]);

  return (
    <section className="section-block branches-section" id="branches-panel">
      <div className="section-title-row stacked">
        <div>
          <h2>Klinik branş seç</h2>
          <p>Üstte spot karar pratiği, altta TUS mimarisine göre standardize edilmiş 12 ana branş yer alır.</p>
        </div>
      </div>


      {spotBranch ? (
        <div className="tus-spot-olgular-feature-row" aria-label="TUS Spot Olgular özel alanı">
          <MemoizedBranchCard
            branch={spotBranch}
            branchStats={branchStatsById.get(spotBranch.id)}
            isLaunching={launchingBranchId === spotBranch.id}
            isLocked={isTransitioning}
            onLaunchBranch={handleLaunchBranch}
            onPreloadBranch={onPreloadBranch}
            index={0}
            variant="featured"
          />
        </div>
      ) : null}

      <div className="branch-grid tus-branch-grid" aria-label="TUS ana branşları">
        {standardBranches.map((branch, index) => (
          <MemoizedBranchCard
            key={branch.id}
            branch={branch}
            branchStats={branchStatsById.get(branch.id)}
            isLaunching={launchingBranchId === branch.id}
            isLocked={isTransitioning}
            onLaunchBranch={handleLaunchBranch}
            onPreloadBranch={onPreloadBranch}
            index={index + 1}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(BranchSelector);
