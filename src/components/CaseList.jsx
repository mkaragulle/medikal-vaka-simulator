import { memo, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { getDifficultyMeta } from '../utils/scoring.js';
import { Icon } from './ui.jsx';

function isSolvedCase(solvedCaseIds, caseId) {
  if (!caseId || !solvedCaseIds) return false;
  if (solvedCaseIds instanceof Set) return solvedCaseIds.has(caseId);
  if (Array.isArray(solvedCaseIds)) return solvedCaseIds.includes(caseId);
  return false;
}

function cleanDisplayText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function getCaseListTitle(clinicalCase) {
  const directTitle = cleanDisplayText(
    clinicalCase.cardTitle
      || clinicalCase.listTitle
      || clinicalCase.menuTitle
      || clinicalCase.displayTitle
      || clinicalCase.title,
  );
  if (directTitle) return directTitle;

  const topicTitle = cleanDisplayText(clinicalCase.learningTarget || clinicalCase.learningOutcome || clinicalCase.clinicalFocus);
  if (topicTitle) return topicTitle.length > 74 ? `${topicTitle.slice(0, 71).trim()}…` : topicTitle;

  const questionTitle = cleanDisplayText(clinicalCase.question || clinicalCase.diagnosis?.question);
  if (questionTitle) return questionTitle.length > 74 ? `${questionTitle.slice(0, 71).trim()}…` : questionTitle;

  return 'TUS spot olgu';
}

const CaseListItem = memo(function CaseListItem({ clinicalCase, selectedCaseId, solvedCaseIds, layout, onSelectCase }) {
  const difficultyMeta = getDifficultyMeta(clinicalCase.difficulty);
  const solved = isSolvedCase(solvedCaseIds, clinicalCase.id);
  const difficultyLabel = solved ? `${difficultyMeta.label}-Çözüldü` : difficultyMeta.label;
  const caseListTitle = getCaseListTitle(clinicalCase);

  const handleClick = useCallback(() => {
    onSelectCase(clinicalCase.id);
  }, [clinicalCase.id, onSelectCase]);

  return (
    <button
      type="button"
      className={[
        layout === 'horizontal' ? 'case-list-item horizontal-case-card' : 'case-list-item',
        clinicalCase.id === selectedCaseId ? 'active' : '',
        solved ? 'is-solved-case' : '',
      ].filter(Boolean).join(' ')}
      onClick={handleClick}
      aria-current={clinicalCase.id === selectedCaseId ? 'true' : undefined}
    >
      <div className="case-list-topline">
        <small className="case-list-meta-text">{difficultyMeta.points} puan</small>
        <small className={`difficulty-badge difficulty-tag-pill ${difficultyMeta.tone} ${solved ? 'is-solved' : ''}`}>{difficultyLabel}</small>
      </div>
      <strong>{caseListTitle}</strong>
      <span className="case-list-footer" aria-hidden="true">
        <span>{solved ? 'Çözüldü · tekrar aç' : 'Olguyu aç'}</span>
        <Icon name={solved ? 'CheckCircle' : 'ArrowRight'} />
      </span>
    </button>
  );
});

function CaseList({ cases, selectedCaseId, onSelectCase, layout = 'vertical', solvedCaseIds = new Set() }) {
  const listRef = useRef(null);
  const horizontalResetKey = useMemo(() => {
    if (layout !== 'horizontal') return '';
    return `${cases.length}:${cases[0]?.id || ''}:${cases.at(-1)?.id || ''}:${solvedCaseIds instanceof Set ? solvedCaseIds.size : Array.isArray(solvedCaseIds) ? solvedCaseIds.length : 0}`;
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
      {cases.map((clinicalCase) => (
        <CaseListItem
          key={clinicalCase.id}
          clinicalCase={clinicalCase}
          selectedCaseId={selectedCaseId}
          solvedCaseIds={solvedCaseIds}
          layout={layout}
          onSelectCase={onSelectCase}
        />
      ))}
    </div>
  );
}

export default memo(CaseList);
