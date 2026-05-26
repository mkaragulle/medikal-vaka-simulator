import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getDifficultyMeta } from '../utils/scoring.js';
import { Icon } from './ui.jsx';

const HORIZONTAL_CARD_WIDTH = 292;
const HORIZONTAL_CARD_GAP = 12;
const HORIZONTAL_CARD_STEP = HORIZONTAL_CARD_WIDTH + HORIZONTAL_CARD_GAP;
const HORIZONTAL_OVERSCAN = 6;

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

const CaseListItem = memo(function CaseListItem({ clinicalCase, selectedCaseId, solved, layout, onSelectCase, caseIndex }) {
  const difficultyMeta = getDifficultyMeta(clinicalCase.difficulty);
  const difficultyLabel = solved ? `${difficultyMeta.label}-Çözüldü` : difficultyMeta.label;
  const railDifficultyLabel = solved ? 'Çözüldü' : difficultyMeta.label;
  const caseListTitle = getCaseListTitle(clinicalCase);
  const isActive = clinicalCase.id === selectedCaseId;
  const handleSelect = useCallback(() => onSelectCase(clinicalCase.id), [clinicalCase.id, onSelectCase]);

  if (layout === 'horizontal') {
    return (
      <button
        type="button"
        className={[
          'case-list-item horizontal-case-card case-rail-card',
          isActive ? 'active' : '',
          solved ? 'is-solved-case' : '',
        ].filter(Boolean).join(' ')}
        onClick={handleSelect}
        aria-current={isActive ? 'true' : undefined}
        aria-label={`${caseListTitle} olgusunu aç`}
      >
        <span className="case-rail-status-dot" aria-hidden="true" />
        <span className="case-rail-main">
          <span className="case-rail-kicker">
            <span>{Number.isFinite(caseIndex) ? `Olgu ${caseIndex + 1}` : 'Olgu'}</span>
            <span>{difficultyMeta.points} puan</span>
          </span>
          <strong className="case-list-title-plain case-rail-title">{caseListTitle}</strong>
        </span>
        <span className="case-rail-side" aria-hidden="true">
          <small className={`difficulty-badge difficulty-tag-pill ${difficultyMeta.tone} ${solved ? 'is-solved' : ''}`}>{railDifficultyLabel}</small>
          <span className="case-rail-open">{solved ? 'Tekrar' : 'Aç'}</span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={[
        'case-list-item',
        isActive ? 'active' : '',
        solved ? 'is-solved-case' : '',
      ].filter(Boolean).join(' ')}
      onClick={handleSelect}
      aria-current={isActive ? 'true' : undefined}
    >
      <div className="case-list-topline">
        <small className="case-list-meta-text">{difficultyMeta.points} puan</small>
        <small className={`difficulty-badge difficulty-tag-pill ${difficultyMeta.tone} ${solved ? 'is-solved' : ''}`}>{difficultyLabel}</small>
      </div>
      <strong className="case-list-title-plain">{caseListTitle}</strong>
      <span className="case-list-footer" aria-hidden="true">
        <span>{solved ? 'Çözüldü · tekrar aç' : 'Olguyu aç'}</span>
        <Icon name={solved ? 'CheckCircle' : 'ArrowRight'} />
      </span>
    </button>
  );
});

function getSolvedCount(cases = [], solvedCaseIds = new Set()) {
  if (!cases.length || !solvedCaseIds) return 0;
  let solvedCount = 0;
  for (const clinicalCase of cases) {
    if (isSolvedCase(solvedCaseIds, clinicalCase.id)) solvedCount += 1;
  }
  return solvedCount;
}

function CaseList({ cases, selectedCaseId, onSelectCase, layout = 'vertical', solvedCaseIds = new Set() }) {
  const listRef = useRef(null);
  const scrollRafRef = useRef(0);
  const [horizontalViewport, setHorizontalViewport] = useState({ scrollLeft: 0, clientWidth: 0 });
  const horizontalResetKey = useMemo(() => {
    if (layout !== 'horizontal') return '';
    const firstId = cases[0]?.id || '';
    const lastId = cases[cases.length - 1]?.id || '';
    return `${cases.length}:${firstId}:${lastId}:${getSolvedCount(cases, solvedCaseIds)}`;
  }, [cases, layout, solvedCaseIds]);

  const updateHorizontalViewport = useCallback(() => {
    const listNode = listRef.current;
    if (!listNode || layout !== 'horizontal') return;
    setHorizontalViewport((current) => {
      const next = {
        scrollLeft: listNode.scrollLeft || 0,
        clientWidth: listNode.clientWidth || 0,
      };
      if (Math.abs(current.scrollLeft - next.scrollLeft) < 2 && Math.abs(current.clientWidth - next.clientWidth) < 2) {
        return current;
      }
      return next;
    });
  }, [layout]);

  const handleHorizontalScroll = useCallback(() => {
    if (layout !== 'horizontal') return;
    if (scrollRafRef.current) return;
    scrollRafRef.current = window.requestAnimationFrame(() => {
      scrollRafRef.current = 0;
      updateHorizontalViewport();
    });
  }, [layout, updateHorizontalViewport]);

  useLayoutEffect(() => {
    if (layout !== 'horizontal') return undefined;
    const listNode = listRef.current;
    if (!listNode) return undefined;

    listNode.scrollLeft = 0;
    updateHorizontalViewport();
    const frameId = window.requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollLeft = 0;
        updateHorizontalViewport();
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [horizontalResetKey, layout, updateHorizontalViewport]);

  useLayoutEffect(() => {
    if (layout !== 'horizontal') return undefined;
    const listNode = listRef.current;
    if (!listNode) return undefined;

    updateHorizontalViewport();
    let resizeObserver = null;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => updateHorizontalViewport());
      resizeObserver.observe(listNode);
    }

    return () => {
      resizeObserver?.disconnect?.();
      if (scrollRafRef.current) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = 0;
      }
    };
  }, [layout, updateHorizontalViewport]);

  useEffect(() => {
    if (layout !== 'horizontal') return undefined;
    const listNode = listRef.current;
    if (!listNode) return undefined;

    const dispatchRescan = () => window.dispatchEvent(new CustomEvent('klinikiq:scrollbars-rescan', {
      detail: { source: 'horizontal-case-list', target: listNode },
    }));

    dispatchRescan();
    const frameId = window.requestAnimationFrame(dispatchRescan);
    const idleId = window.setTimeout(dispatchRescan, 180);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(idleId);
    };
  }, [cases.length, horizontalViewport.clientWidth, layout]);

  if (layout === 'horizontal') {
    const totalWidth = cases.length
      ? (cases.length * HORIZONTAL_CARD_WIDTH) + ((cases.length - 1) * HORIZONTAL_CARD_GAP)
      : 0;
    const startIndex = Math.max(0, Math.floor((horizontalViewport.scrollLeft || 0) / HORIZONTAL_CARD_STEP) - HORIZONTAL_OVERSCAN);
    const visibleCount = Math.max(
      8,
      Math.ceil((horizontalViewport.clientWidth || 1200) / HORIZONTAL_CARD_STEP) + (HORIZONTAL_OVERSCAN * 2) + 2,
    );
    const endIndex = Math.min(cases.length, startIndex + visibleCount);
    const visibleCases = cases.slice(startIndex, endIndex);
    const leftSpacerWidth = Math.max(0, startIndex * HORIZONTAL_CARD_STEP - (startIndex > 0 ? HORIZONTAL_CARD_GAP : 0));
    const renderedWidth = visibleCases.length
      ? (visibleCases.length * HORIZONTAL_CARD_WIDTH) + ((visibleCases.length - 1) * HORIZONTAL_CARD_GAP)
      : 0;
    const rightSpacerWidth = Math.max(0, totalWidth - leftSpacerWidth - renderedWidth - (visibleCases.length ? HORIZONTAL_CARD_GAP : 0));

    return (
      <div
        ref={listRef}
        className="case-list horizontal-case-list horizontal-case-list-virtualized"
        data-scrollbar-immediate="true"
        data-ki-light-scrollbar="true"
        aria-label="Olgu listesi"
        onScroll={handleHorizontalScroll}
      >
        <div
          className="horizontal-case-virtual-track"
          style={{ width: `${Math.max(totalWidth, horizontalViewport.clientWidth || 0)}px` }}
        >
          {leftSpacerWidth > 0 ? <span className="horizontal-case-virtual-spacer" style={{ flexBasis: `${leftSpacerWidth}px` }} aria-hidden="true" /> : null}
          {visibleCases.map((clinicalCase, visibleIndex) => (
            <CaseListItem
              key={clinicalCase.id}
              clinicalCase={clinicalCase}
              selectedCaseId={selectedCaseId}
              solved={isSolvedCase(solvedCaseIds, clinicalCase.id)}
              layout={layout}
              caseIndex={startIndex + visibleIndex}
              onSelectCase={onSelectCase}
            />
          ))}
          {rightSpacerWidth > 0 ? <span className="horizontal-case-virtual-spacer" style={{ flexBasis: `${rightSpacerWidth}px` }} aria-hidden="true" /> : null}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className="case-list"
      aria-label="Olgu listesi"
    >
      {cases.map((clinicalCase, caseIndex) => (
        <CaseListItem
          key={clinicalCase.id}
          clinicalCase={clinicalCase}
          selectedCaseId={selectedCaseId}
          solved={isSolvedCase(solvedCaseIds, clinicalCase.id)}
          layout={layout}
          caseIndex={caseIndex}
          onSelectCase={onSelectCase}
        />
      ))}
    </div>
  );
}

export default memo(CaseList);
