import { IconBadge, Icon, branchIconById, branchToneById } from './ui.jsx';
import { TUS_SPOT_BRANCH_ID } from '../data/branches.js';

function BranchCard({ branch, cases, isLaunching, isLocked, onLaunchBranch, index = 0, variant = 'grid' }) {
  const branchCases = cases.filter((clinicalCase) => clinicalCase.branchId === branch.id);
  const totalCases = branchCases.length;
  const isSpotBranch = branch.id === TUS_SPOT_BRANCH_ID;
  const priorityCases = isSpotBranch
    ? branchCases.filter((clinicalCase) => clinicalCase.caseType === 'spot').length
    : branchCases.filter((clinicalCase) => /acil|kritik/i.test(clinicalCase.difficulty)).length;
  const avgPoints = totalCases
    ? Math.round(branchCases.reduce((sum, item) => sum + (/zor|kritik/i.test(item.difficulty) ? 22 : /acil/i.test(item.difficulty) ? 18 : 14), 0) / totalCases)
    : 0;
  const progress = Math.min(100, 28 + priorityCases * 14);
  const tone = branchToneById[branch.id] ?? 'accent';
  const isFeatured = variant === 'featured';

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
      onClick={() => onLaunchBranch(branch.id)}
      aria-label={`${branch.name} alanını aç`}
      aria-busy={isLaunching ? 'true' : 'false'}
      disabled={isLocked && !isLaunching}
      style={{ '--branch-index': index }}
    >
      <span className="branch-launch-wave" aria-hidden="true" />
      <div className="branch-card-head">
        <IconBadge icon={branchIconById[branch.id] ?? 'Stethoscope'} tone={tone} />
        <span className="branch-count">{isLaunching ? 'Açılıyor' : `${totalCases} ${isSpotBranch ? 'spot olgu' : 'olgu'}`}</span>
      </div>

      <div className="branch-card-body">
        <h3>{branch.shortName || branch.name}</h3>
        <p>{branch.description}</p>
      </div>

      <div className="branch-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>

      <div className="branch-card-meta">
        <span>{isSpotBranch ? `${priorityCases} spot karar` : `${priorityCases} acil-kritik olgu`}</span>
        <span>{avgPoints} ortalama puan</span>
      </div>

      <div className="branch-card-footer" aria-hidden="true">
        <span>{isLaunching ? 'Olgu ekranına geçiliyor' : isSpotBranch ? 'Spot çöz' : 'Branşa gir'}</span>
        <Icon name="ArrowRight" />
      </div>
    </button>
  );
}

function BranchSelector({ branches, cases, onSelectBranch, launchingBranchId = null, isTransitioning = false }) {
  const handleLaunchBranch = (branchId) => {
    if (isTransitioning) return;
    onSelectBranch(branchId);
  };

  const spotBranch = branches.find((branch) => branch.id === TUS_SPOT_BRANCH_ID);
  const standardBranches = branches.filter((branch) => branch.id !== TUS_SPOT_BRANCH_ID);

  return (
    <section className="section-block branches-section" id="branches">
      <div className="section-title-row stacked">
        <div>
          <h2>Klinik branş seç</h2>
          <p>Üstte spot karar pratiği, altta TUS mimarisine göre standardize edilmiş 12 ana branş yer alır.</p>
        </div>
      </div>

      {spotBranch ? (
        <div className="tus-spot-olgular-feature-row" aria-label="TUS Spot Olgular özel alanı">
          <BranchCard
            branch={spotBranch}
            cases={cases}
            isLaunching={launchingBranchId === spotBranch.id}
            isLocked={isTransitioning}
            onLaunchBranch={handleLaunchBranch}
            index={0}
            variant="featured"
          />
        </div>
      ) : null}

      <div className="branch-grid tus-branch-grid" aria-label="TUS ana branşları">
        {standardBranches.map((branch, index) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            cases={cases}
            isLaunching={launchingBranchId === branch.id}
            isLocked={isTransitioning}
            onLaunchBranch={handleLaunchBranch}
            index={index + 1}
          />
        ))}
      </div>
    </section>
  );
}

export default BranchSelector;
