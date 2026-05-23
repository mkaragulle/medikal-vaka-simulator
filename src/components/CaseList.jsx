import { useLayoutEffect, useMemo, useRef } from 'react';
import { getDifficultyMeta } from '../utils/scoring.js';
import { Icon } from './ui.jsx';


function compactCaseCardText(value = '', limit = 86) {
  const text = String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([?.!,;:])/g, '$1')
    .trim();
  if (!text) return '';
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).replace(/\s+\S*$/u, '').trim()}…`;
}

function stripQuestionTail(value = '') {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/\b(aşağıdakilerden|aşağıdaki|hangisi|hangileri|hangisidir|hangileri doğrudur|hangisi değildir|doğrudur|yanlıştır|beklenmez|yer almaz)\b.*$/iu, '')
    .replace(/\b(en doğru|en uygun|temel|başlıca)\s*$/iu, '')
    .replace(/[?:;,.\s]+$/u, '')
    .trim();
}

function buildCaseCardTitle(clinicalCase = {}) {
  const explicitTitle = compactCaseCardText(clinicalCase.title, 90);
  if (explicitTitle) return explicitTitle;

  const spotTitle = compactCaseCardText(clinicalCase.topic || clinicalCase.section, 82);
  if (spotTitle) return spotTitle;

  const stemSubject = compactCaseCardText(stripQuestionTail(
    clinicalCase.question || clinicalCase.stem || clinicalCase.narrativeStem || clinicalCase.patientIntro?.historySummary,
  ), 88);
  if (stemSubject) return stemSubject;

  const learningTitle = compactCaseCardText(clinicalCase.learningTarget || clinicalCase.clinicalFocus, 86);
  if (learningTitle) return learningTitle;

  return `${clinicalCase.relatedBranch || clinicalCase.branchName || 'TUS'} spot sorusu`;
}

function buildCaseCardSubtitle(clinicalCase = {}) {
  const parts = [
    clinicalCase.relatedBranch || clinicalCase.branchName,
    clinicalCase.section && clinicalCase.section !== clinicalCase.topic ? clinicalCase.section : '',
  ]
    .filter(Boolean)
    .map((part) => compactCaseCardText(part, 34));
  return parts.slice(0, 2).join(' · ');
}

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
        const cardTitle = buildCaseCardTitle(clinicalCase);
        const cardSubtitle = buildCaseCardSubtitle(clinicalCase);
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
            <strong className="case-card-title">{cardTitle}</strong>
            {cardSubtitle ? <span className="case-card-subtitle">{cardSubtitle}</span> : null}
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
