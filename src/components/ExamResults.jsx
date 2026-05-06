import { IconBadge } from './ui.jsx';

function formatDuration(totalSeconds = 0) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes} dk ${seconds} sn`;
}

function ExamResults({ result, onRestart, onHome }) {
  return (
    <section className="page-shell exam-results-shell">
      <section className="exam-results-card card-surface">
        <div className="exam-results-head">
          <div>
            <span className="label-text accent">Blok sınav raporu</span>
            <h1>{result.title}</h1>
          </div>
          <div className="exam-results-actions">
            <button type="button" className="btn btn-primary" onClick={onRestart}>Yeni blok oluştur</button>
            <button type="button" className="btn btn-secondary" onClick={onHome}>Ana ekrana dön</button>
          </div>
        </div>

        <div className="exam-results-metrics">
          <div><IconBadge icon="Trophy" tone="warning" size="sm" /><span>Toplam puan</span><strong>{result.score}</strong></div>
          <div><IconBadge icon="CheckCircle" tone="success" size="sm" /><span>Doğru / toplam</span><strong>{result.correct}/{result.total}</strong></div>
          <div><IconBadge icon="Target" tone="teal" size="sm" /><span>Doğruluk oranı</span><strong>%{result.accuracy}</strong></div>
          <div><IconBadge icon="Timer" tone="blue" size="sm" /><span>Kullanılan süre</span><strong>{formatDuration(result.timeUsedSeconds)}</strong></div>
        </div>

        <div className="exam-results-grid">
          <section className="exam-results-panel">
            <h3>Branş bazlı performans</h3>
            <div className="results-breakdown-list">
              {result.branchBreakdown.map((item) => (
                <div key={item.branchId} className="results-breakdown-row">
                  <div>
                    <strong>{item.branchName}</strong>
                    <small>{item.correct}/{item.total} doğru</small>
                  </div>
                  <span>%{item.accuracy}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="exam-results-panel">
            <h3>Olgu bazlı yanıt özeti</h3>
            <div className="results-question-list">
              {result.review.map((item, index) => (
                <div key={item.caseId} className={item.isCorrect ? 'results-question-row correct' : 'results-question-row wrong'}>
                  <div>
                    <small>Soru {index + 1} · {item.branchName}</small>
                    <strong>{item.title}</strong>
                    <p>Seçilen: {item.selected || 'Yanıtlanmadı'} · Doğru tanı: {item.correctAnswer}</p>
                  </div>
                  <span>{item.isCorrect ? 'Doğru' : 'Yanlış'}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </section>
  );
}

export default ExamResults;
