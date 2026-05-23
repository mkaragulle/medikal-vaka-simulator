import { useLayoutEffect, useMemo, useRef } from 'react';
import { getDifficultyMeta } from '../utils/scoring.js';
import { Icon } from './ui.jsx';

function isSolvedCase(solvedCaseIds, caseId) {
  if (!caseId || !solvedCaseIds) return false;
  if (solvedCaseIds instanceof Set) return solvedCaseIds.has(caseId);
  if (Array.isArray(solvedCaseIds)) return solvedCaseIds.includes(caseId);
  return false;
}

function CaseList({ cases, selectedCaseId, onSelectCase, layout = 'vertical', solvedCaseIds = new Set() }) {
  const listRef = useRef(null);
  const horizontalResetKey = useMemo(() => {
    if (layout !== 'horizontal') return '';
    return cases
      .map((clinicalCase) => `${clinicalCase.id}:${isSolvedCase(solvedCaseIds, clinicalCase.id) ? 'solved' : 'open'}`)
      .join('|');
  }, [cases, layout, solvedCaseIds]);

  useLayoutEffect(() => {
    if (layout !== 'horizontal') return undefined;
    const listNode = listRef.current;
    if (!listNode) return undefined;

    listNode.scrollLeft = 0;
    const frameId = window.requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollLeft = 0;
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [horizontalResetKey, layout]);

  return (
    <div ref={listRef} className={layout === 'horizontal' ? 'case-list horizontal-case-list' : 'case-list'} aria-label="Olgu listesi">
      {cases.map((clinicalCase) => {
        const difficultyMeta = getDifficultyMeta(clinicalCase.difficulty);
        const solved = isSolvedCase(solvedCaseIds, clinicalCase.id);
        const difficultyLabel = solved ? `${difficultyMeta.label}-Çözüldü` : difficultyMeta.label;
        return (
          <button
            key={clinicalCase.id}
            type="button"
            className={[
              layout === 'horizontal' ? 'case-list-item horizontal-case-card' : 'case-list-item',
              clinicalCase.id === selectedCaseId ? 'active' : '',
              solved ? 'is-solved-case' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => onSelectCase(clinicalCase.id)}
            aria-current={clinicalCase.id === selectedCaseId ? 'true' : undefined}
          >
            <div className="case-list-topline">
              <small className="case-list-meta-text">{difficultyMeta.points} puan</small>
              <small className={`difficulty-badge difficulty-tag-pill ${difficultyMeta.tone} ${solved ? 'is-solved' : ''}`}>{difficultyLabel}</small>
            </div>
            <strong>{clinicalCase.title}</strong>
            <span className="case-list-footer" aria-hidden="true">
              <span>{solved ? 'Çözüldü · tekrar aç' : 'Olguyu aç'}</span>
              <Icon name={solved ? 'CheckCircle' : 'ArrowRight'} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default CaseList;
