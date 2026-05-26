import { lazy, memo, Suspense, useEffect, useState } from 'react';
import WrongAnswersPanel from './WrongAnswersPanel.jsx';
import './tusPearlCards.css';

const TusPearlHubPanel = lazy(() => import('./TusPearlHubPanel.jsx'));

function scheduleIdleWork(callback, delay = 420) {
  if (typeof window === 'undefined') return () => {};
  let idleId = 0;
  const timerId = window.setTimeout(() => {
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(callback, { timeout: 1400 });
      return;
    }
    callback();
  }, delay);

  return () => {
    window.clearTimeout(timerId);
    if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
  };
}

function PearlHubSkeleton() {
  return (
    <section className="tus-pearl-hub-panel card-surface pearl-hub-skeleton" aria-label="Hap Bilgi Kartları hazırlanıyor">
      <div className="pearl-hub-skeleton-line wide" />
      <div className="pearl-hub-skeleton-line" />
      <div className="pearl-hub-skeleton-grid">
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

function StudyReviewHub({ wrongAnswers = [], onOpenCase, onRemoveCase, onClearAll, onOpenPearlStudy, onOpenAllWrongAnswers }) {
  const [pearlHubReady, setPearlHubReady] = useState(false);

  useEffect(() => scheduleIdleWork(() => setPearlHubReady(true), 520), []);

  return (
    <section className="study-review-hub" aria-label="Yanlışlar ve hap bilgi çalışma paneli">
      <div className="study-review-hub-intro">
        <div className="study-review-title-block">
          <span className="study-review-kicker">TUS tekrar merkezi</span>
          <h2>Kişisel tekrar</h2>
        </div>
      </div>
      <div className="study-review-hub-grid">
        <WrongAnswersPanel
          wrongAnswers={wrongAnswers}
          onOpenCase={onOpenCase}
          onRemoveCase={onRemoveCase}
          onClearAll={onClearAll}
          onOpenPearlStudy={onOpenPearlStudy}
          onOpenAllWrongAnswers={onOpenAllWrongAnswers}
        />
        {pearlHubReady ? (
          <Suspense fallback={<PearlHubSkeleton />}>
            <TusPearlHubPanel wrongAnswers={wrongAnswers} onOpenStudy={onOpenPearlStudy} />
          </Suspense>
        ) : (
          <PearlHubSkeleton />
        )}
      </div>
    </section>
  );
}

export default memo(StudyReviewHub);
