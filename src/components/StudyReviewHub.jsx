import { memo } from 'react';
import WrongAnswersPanel from './WrongAnswersPanel.jsx';
import TusPearlHubPanel from './TusPearlHubPanel.jsx';
import './tusPearlCards.css';

function StudyReviewHub({ wrongAnswers = [], onOpenCase, onRemoveCase, onClearAll, onOpenPearlStudy }) {
  return (
    <section className="study-review-hub" aria-label="Yanlışlar ve hap bilgi çalışma paneli">
      <div className="study-review-hub-intro">
        <p className="auth-eyebrow">Kişisel tekrar merkezi</p>
        <h2>Yanlışların ve hap tekrarların aynı çalışma akışında</h2>
        <span>Sol tarafta hedefli yanlış tekrarı, sağ tarafta aktif hatırlama kartları yer alır.</span>
      </div>
      <div className="study-review-hub-grid">
        <WrongAnswersPanel
          wrongAnswers={wrongAnswers}
          onOpenCase={onOpenCase}
          onRemoveCase={onRemoveCase}
          onClearAll={onClearAll}
        />
        <TusPearlHubPanel wrongAnswers={wrongAnswers} onOpenStudy={onOpenPearlStudy} />
      </div>
    </section>
  );
}

export default memo(StudyReviewHub);
