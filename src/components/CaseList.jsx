import { getDifficultyMeta } from '../utils/scoring.js';
import { Icon } from './ui.jsx';

function CaseList({ cases, selectedCaseId, onSelectCase, layout = 'vertical' }) {
  return (
    <div className={layout === 'horizontal' ? 'case-list horizontal-case-list' : 'case-list'} aria-label="Olgu listesi">
      {cases.map((clinicalCase) => {
        const difficultyMeta = getDifficultyMeta(clinicalCase.difficulty);
        return (
          <button
            key={clinicalCase.id}
            type="button"
            className={[
              layout === 'horizontal' ? 'case-list-item horizontal-case-card' : 'case-list-item',
              clinicalCase.id === selectedCaseId ? 'active' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => onSelectCase(clinicalCase.id)}
            aria-current={clinicalCase.id === selectedCaseId ? 'true' : undefined}
          >
            <div className="case-list-topline">
              <small className="case-list-meta-text">{difficultyMeta.points} puan</small>
              <small className={`difficulty-badge ${difficultyMeta.tone}`}>{difficultyMeta.label}</small>
            </div>
            <strong>{clinicalCase.title}</strong>
            <span className="case-list-footer" aria-hidden="true"><span>Olguyu aç</span><Icon name="ArrowRight" /></span>
          </button>
        );
      })}
    </div>
  );
}

export default CaseList;
