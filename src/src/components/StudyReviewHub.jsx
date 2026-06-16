import { memo } from 'react';
import WrongAnswersPanel from './WrongAnswersPanel.jsx';
import TusPearlHubPanel from './TusPearlHubPanel.jsx';
import './tusPearlCards.css';

function StudyReviewHub({ wrongAnswers = [], onOpenCase, onRemoveCase, onClearAll, onOpenPearlStudy, onOpenAllWrongAnswers }) {
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
        <TusPearlHubPanel wrongAnswers={wrongAnswers} onOpenStudy={onOpenPearlStudy} />
      </div>
    </section>
  );
}

export default memo(StudyReviewHub);
