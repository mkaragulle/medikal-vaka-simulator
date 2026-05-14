import { memo } from 'react';
import WrongAnswersPanel from './WrongAnswersPanel.jsx';
import TusPearlHubPanel from './TusPearlHubPanel.jsx';
import './tusPearlCards.css';

function StudyReviewHub({ wrongAnswers = [], onOpenCase, onRemoveCase, onClearAll, onOpenPearlStudy }) {
  return (
    <section className="study-review-hub" aria-label="Kişisel tekrar merkezi">
      <div className="study-review-hub-intro review-intro-refined">
        <div>
          <span className="review-intro-eyebrow">Kişisel tekrar merkezi</span>
          <h2>Yanlışlarını toparla, kartlarla pekiştir.</h2>
        </div>
        <p>Bir tarafta tekrar çözmen gereken olgular, diğer tarafta kısa ve hedefli hap kart akışı.</p>
      </div>
      <div className="study-review-hub-grid review-hub-refined-grid">
        <WrongAnswersPanel
          wrongAnswers={wrongAnswers}
          onOpenCase={onOpenCase}
          onRemoveCase={onRemoveCase}
          onClearAll={onClearAll}
          onOpenPearlStudy={onOpenPearlStudy}
        />
        <TusPearlHubPanel wrongAnswers={wrongAnswers} onOpenStudy={onOpenPearlStudy} />
      </div>
    </section>
  );
}

export default memo(StudyReviewHub);
