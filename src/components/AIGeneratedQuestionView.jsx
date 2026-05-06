import CasePlayer from './CasePlayer.jsx';
import { Icon, IconBadge } from './ui.jsx';

const AI_SPOT_BRANCH = {
  id: 'tus-spot-olgular',
  name: 'AI ile Üretilen TUS Spot Sorusu',
  shortName: 'AI Spot',
  description: 'Spot bilgileri pekiştirmek için yapay zekâ tarafından oluşturulan kısa klinik soru.',
};

function AIStat({ label, value, icon, tone = 'teal' }) {
  return (
    <article className="ai-practice-stat-card">
      <IconBadge icon={icon} tone={tone} size="sm" />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function AILoadingState() {
  return (
    <section className="ai-generation-state card-surface" aria-live="polite">
      <span className="ai-generation-orb" aria-hidden="true"><Icon name="Sparkles" /></span>
      <div>
        <h2>AI soru hazırlanıyor...</h2>
        <p>Spot bilgiye uygun soru oluşturuluyor; TUS odaklı çeldiriciler dengeleniyor.</p>
      </div>
    </section>
  );
}

function AIErrorState({ onGenerateQuestion }) {
  return (
    <section className="ai-generation-state card-surface error" aria-live="polite">
      <span className="ai-generation-orb" aria-hidden="true"><Icon name="AlertTriangle" /></span>
      <div>
        <h2>Soru üretilemedi.</h2>
        <p>Hazır spot soru havuzundan yeni bir soru getirildi veya tekrar denenebilir.</p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onGenerateQuestion}>
        <Icon name="RotateCcw" /> Tekrar dene
      </button>
    </section>
  );
}

function AIGeneratedQuestionView({
  question,
  loading = false,
  error = null,
  aiStats,
  onGenerateQuestion,
  onSubmitAnswer,
  onBackHome,
  tutorMode,
  onToggleTutorMode,
  hardMode = false,
}) {
  const accuracy = aiStats?.attempts ? Math.round((aiStats.correct / aiStats.attempts) * 100) : 0;

  return (
    <section className="page-shell ai-practice-page-shell">
      <section className="ai-practice-hero card-surface">
        <div className="ai-practice-title-block">
          <span className="ai-practice-kicker"><Icon name="Sparkles" /> AI pratik modu</span>
          <h1>AI ile Üretilen TUS Spot Sorusu</h1>
          <p>Spot bilgileri pekiştirmek için yapay zekâ tarafından oluşturulan kısa klinik soru.</p>
        </div>

        <div className="ai-practice-actions">
          <button type="button" className="btn btn-secondary" onClick={onBackHome}>
            <span aria-hidden="true">←</span> Dashboard’a dön
          </button>
          <button type="button" className="btn btn-primary ai-generate-cta" onClick={onGenerateQuestion} disabled={loading}>
            <Icon name="Sparkles" /> Yeni AI sorusu üret
          </button>
        </div>
      </section>

      <section className="ai-practice-stats-grid" aria-label="AI pratik istatistikleri">
        <AIStat icon="ClipboardList" tone="blue" label="AI soru" value={aiStats?.attempts || 0} />
        <AIStat icon="Target" tone="teal" label="Doğruluk" value={`%${accuracy}`} />
        <AIStat icon="Trophy" tone="warning" label="AI puan" value={aiStats?.score || 0} />
      </section>

      {loading ? <AILoadingState /> : null}
      {!loading && error ? <AIErrorState onGenerateQuestion={onGenerateQuestion} /> : null}
      {!loading && !error && question ? (
        <div className="ai-case-shell case-route-transition" data-case-id={question.id}>
          <CasePlayer
            clinicalCase={question}
            branch={AI_SPOT_BRANCH}
            mode="study"
            onRandomCase={onGenerateQuestion}
            onSubmitAnswer={onSubmitAnswer}
            tutorMode={tutorMode}
            onToggleTutorMode={onToggleTutorMode}
            hardMode={hardMode}
            randomActionLabel="Yeni AI sorusu üret"
            heroActionLabel="Yeni AI sorusu"
          />
        </div>
      ) : null}
    </section>
  );
}

export default AIGeneratedQuestionView;
