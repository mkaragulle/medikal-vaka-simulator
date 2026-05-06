import { IconBadge, Icon, branchIconById, branchToneById } from './ui.jsx';

function BranchCard({ branch, cases, isLaunching, isLocked, onLaunchBranch, index = 0 }) {
  const branchCases = cases.filter((clinicalCase) => clinicalCase.branchId === branch.id);
  const totalCases = branchCases.length;
  const isQuickBranch = branch.id === 'quick-case';
  const priorityCases = branchCases.filter((clinicalCase) => /acil|kritik/i.test(clinicalCase.difficulty)).length;
  const avgPoints = totalCases
    ? Math.round(branchCases.reduce((sum, item) => sum + (/zor|kritik/i.test(item.difficulty) ? 22 : /acil/i.test(item.difficulty) ? 18 : 14), 0) / totalCases)
    : 0;
  const progress = Math.min(100, 28 + (isQuickBranch ? Math.max(totalCases, 1) * 5 : priorityCases * 14));
  const tone = branchToneById[branch.id] ?? 'teal';

  return (
    <button
      type="button"
      className={`branch-card ${isLaunching ? 'is-launching' : ''}`.trim()}
      data-branch={branch.id}
      data-launch-state={isLaunching ? 'launching' : 'idle'}
      onClick={() => onLaunchBranch(branch.id)}
      aria-label={`${branch.name} branşını aç`}
      aria-busy={isLaunching ? 'true' : 'false'}
      disabled={isLocked && !isLaunching}
      style={{ '--branch-index': index }}
    >
      <span className="branch-launch-wave" aria-hidden="true" />
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
        <span>{isQuickBranch ? `${totalCases} kısa karar olgusu` : `${priorityCases} acil-kritik olgu`}</span>
        <span>{isQuickBranch ? 'adli · etik · TUS spot' : `${avgPoints} ortalama puan`}</span>
      </div>

      <div className="branch-card-footer" aria-hidden="true">
        <span>{isLaunching ? 'Olgu ekranına geçiliyor' : isQuickBranch ? 'Hızlı CASE’e gir' : 'Branşa gir'}</span>
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

  return (
    <section className="section-block branches-section" id="branches">
      <div className="section-title-row stacked">
        <div>
          <h2>Klinik branş seç</h2>
          <p>Branşı seç, olgu ekranına geç ve klinik karar pratiğini sistemli şekilde başlat.</p>
        </div>
      </div>

      <div className="branch-grid">
        {branches.map((branch, index) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            cases={cases}
            isLaunching={launchingBranchId === branch.id}
            isLocked={isTransitioning}
            onLaunchBranch={handleLaunchBranch}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default BranchSelector;
