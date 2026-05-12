import { useEffect, useMemo, useState } from 'react';
import { Icon, IconBadge } from './ui.jsx';
import {
  COMMITTEE_COURSE_OPTIONS,
  STUDY_MODE_OPTIONS,
  TUS_BRANCH_OPTIONS,
  buildEmptyUploadMetadata,
} from '../data/learningPlatform.js';
import {
  addUserFlashcard,
  appendMaterialBundles,
  createMaterialBundle,
  deleteUserFlashcard,
  loadLearningWorkspace,
  saveLearningWorkspace,
  toggleWorkspaceItem,
  updateQuestionAnswer,
} from '../utils/learningWorkspaceStorage.js';

function formatDate(value) {
  if (!value) return 'Tarih yok';
  try {
    return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
  } catch {
    return 'Tarih yok';
  }
}

function studyModeLabel(mode) {
  return STUDY_MODE_OPTIONS.find((item) => item.value === mode)?.label || 'Çalışma modu';
}

function materialTopic(material = {}) {
  return material.course || material.committee || material.tusBranch || material.fileName || 'Materyal';
}

function EmptyState({ icon = 'BookOpen', title, text }) {
  return (
    <article className="learning-empty-state">
      <IconBadge icon={icon} tone="teal" size="sm" />
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </article>
  );
}

function DashboardSection({ title, eyebrow, children, action }) {
  return (
    <section className="learning-section card-surface">
      <header className="learning-section-header">
        <div>
          {eyebrow ? <span>{eyebrow}</span> : null}
          <h2>{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

function UploadStudyForm({ profile, onCreateBundles }) {
  const [metadata, setMetadata] = useState(() => buildEmptyUploadMetadata(profile));
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setMetadata(buildEmptyUploadMetadata(profile));
  }, [profile?.preferredStudyMode, profile?.classYear, profile?.university]);

  const updateMetadata = (field, value) => setMetadata((current) => ({ ...current, [field]: value }));
  const selectedMode = STUDY_MODE_OPTIONS.find((item) => item.value === metadata.studyMode);

  const handleUpload = (event) => {
    event.preventDefault();
    if (!files.length) {
      setStatus('Dosya seçmelisin.');
      return;
    }
    setStatus('Materyal çalışma alanına dönüştürülüyor...');
    onCreateBundles(files, metadata);
    setFiles([]);
    event.currentTarget.reset();
    window.setTimeout(() => setStatus('Hazır: ders, 10 soru ve kart destesi oluşturuldu.'), 240);
  };

  return (
    <form className="learning-upload-form" onSubmit={handleUpload}>
      <div className="study-mode-picker" role="radiogroup" aria-label="Çalışma amacı">
        {STUDY_MODE_OPTIONS.map((mode) => (
          <button
            key={mode.value}
            type="button"
            className={metadata.studyMode === mode.value ? 'active' : ''}
            onClick={() => updateMetadata('studyMode', mode.value)}
            aria-pressed={metadata.studyMode === mode.value}
          >
            <strong>{mode.label}</strong>
            <span>{mode.description}</span>
          </button>
        ))}
      </div>

      <div className="learning-form-grid">
        {metadata.studyMode === 'medical-school' || metadata.studyMode === 'general-learning' ? (
          <>
            <label className="form-field">
              <span>Sınıf</span>
              <select value={metadata.classYear || ''} onChange={(event) => updateMetadata('classYear', event.target.value)}>
                <option value="">Seç</option>
                {[1, 2, 3, 4, 5, 6].map((year) => <option key={year} value={year}>{year}. sınıf</option>)}
              </select>
            </label>
            <label className="form-field">
              <span>Komite / ders</span>
              <select value={metadata.course || ''} onChange={(event) => updateMetadata('course', event.target.value)}>
                <option value="">Ders seç</option>
                {COMMITTEE_COURSE_OPTIONS.map((course) => <option key={course} value={course}>{course}</option>)}
              </select>
            </label>
          </>
        ) : null}

        {metadata.studyMode === 'tus' ? (
          <label className="form-field">
            <span>TUS branşı</span>
            <select value={metadata.tusBranch || ''} onChange={(event) => updateMetadata('tusBranch', event.target.value)}>
              <option value="">Branş seç</option>
              {TUS_BRANCH_OPTIONS.map((branch) => <option key={branch} value={branch}>{branch}</option>)}
            </select>
          </label>
        ) : null}

        <label className="form-field">
          <span>Hedef tarih</span>
          <input type="date" value={metadata.examDate || ''} onChange={(event) => updateMetadata('examDate', event.target.value)} />
        </label>
      </div>

      <label className="file-drop-zone">
        <Icon name="Notes" />
        <span>
          <strong>PDF veya PPTX yükle</strong>
          <small>{files.length ? `${files.length} dosya seçildi` : `${selectedMode?.label || 'Çalışma'} için bir veya birden fazla dosya seç`}</small>
        </span>
        <input
          type="file"
          accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          multiple
          onChange={(event) => setFiles(Array.from(event.target.files || []))}
        />
      </label>

      <div className="learning-upload-actions">
        <p>{status || 'Dosya meta verisi, çalışma modu, ders/branş ve hedef tarih birlikte kaydedilir.'}</p>
        <button type="submit" className="btn btn-primary">
          <Icon name="Sparkles" />
          <span>Materyali öğrenme alanına dönüştür</span>
        </button>
      </div>
    </form>
  );
}

function MaterialCard({ material, selected, onOpen }) {
  return (
    <button type="button" className={`material-card ${selected ? 'active' : ''}`.trim()} onClick={() => onOpen(material.id)}>
      <span className="material-card-icon"><Icon name={material.studyMode === 'tus' ? 'TusSpotFlash' : 'BookOpen'} /></span>
      <span className="material-card-copy">
        <strong>{material.fileName}</strong>
        <small>{studyModeLabel(material.studyMode)} · {materialTopic(material)} · {formatDate(material.uploadDate)}</small>
      </span>
      <span className="material-status-pill">{material.processingStatus || 'Ready'}</span>
    </button>
  );
}

function LessonWorkspace({ material, lesson }) {
  if (!material || !lesson) return null;
  return (
    <section className="lesson-workspace">
      <div className="lesson-hero-card card-surface">
        <span className="home-hero-eyebrow-v10"><Icon name="BookOpen" /> Oluşturulan ders</span>
        <h2>{lesson.title}</h2>
        <p>{lesson.overview}</p>
        <div className="lesson-meta-row">
          <span>{studyModeLabel(material.studyMode)}</span>
          <span>{materialTopic(material)}</span>
          <span>{material.fileName}</span>
        </div>
      </div>

      <div className="lesson-two-column">
        <DashboardSection title="Öğrenme hedefleri" eyebrow="Ders iskeleti">
          <ul className="lesson-list">
            {lesson.learningObjectives.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </DashboardSection>
        <DashboardSection title="Mutlaka hatırla" eyebrow="Yüksek verim">
          <ul className="lesson-list">
            {lesson.mustRemember.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </DashboardSection>
      </div>

      <DashboardSection title="Adım adım konu anlatımı" eyebrow="Profesör anlatımı ritmi">
        <div className="lesson-section-stack">
          {lesson.sections.map((section) => (
            <article key={section.id} className="lesson-content-card">
              <h3>{section.title}</h3>
              <p>{section.body}</p>
              <small>{section.sourceReferences?.[0]?.note}</small>
            </article>
          ))}
        </div>
      </DashboardSection>

      <DashboardSection title="Şekil / tablo açıklamaları" eyebrow="Görsel öğrenme">
        <div className="figure-explanation-grid">
          {lesson.figureExplanations.map((figure) => (
            <article key={figure.id} className="figure-explanation-card">
              <strong>{figure.reference} · {figure.title}</strong>
              <p>{figure.whatItShows}</p>
              <p>{figure.interpretation}</p>
              <span>{figure.examRelevance}</span>
              <small>{figure.memoryNote}</small>
            </article>
          ))}
        </div>
      </DashboardSection>

      <DashboardSection title="High-yield özet" eyebrow="Tekrar öncesi">
        <ul className="lesson-list compact">
          {lesson.highYieldSummary.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </DashboardSection>
    </section>
  );
}

function QuestionCarousel({ material, questions, onAnswer, onToggle }) {
  const [index, setIndex] = useState(0);
  const activeQuestion = questions[index] || null;
  if (!material || !questions.length || !activeQuestion) {
    return <EmptyState icon="ClipboardList" title="Henüz soru yok" text="Bir materyal yüklediğinde bu alanda GoodNotes benzeri 10 soruluk carousel oluşur." />;
  }
  const selectedOption = activeQuestion.userAnswer;
  const selectedIsWrong = selectedOption && selectedOption !== activeQuestion.correctOptionId;
  const selectedFeedback = selectedOption ? activeQuestion.optionFeedback?.[selectedOption] : '';
  const correctFeedback = activeQuestion.optionFeedback?.[activeQuestion.correctOptionId] || '';

  return (
    <DashboardSection
      title="10 soruluk materyal carousel’i"
      eyebrow="GoodNotes benzeri pratik"
      action={<span className="question-counter">{index + 1}/10</span>}
    >
      <article className="material-question-card">
        <div className="question-card-topline">
          <span>{activeQuestion.type}</span>
          <div className="question-flags">
            <button type="button" className={activeQuestion.isFavorite ? 'active' : ''} onClick={() => onToggle('isFavorite', activeQuestion.id)}>Favori</button>
            <button type="button" className={activeQuestion.isDifficult ? 'active' : ''} onClick={() => onToggle('isDifficult', activeQuestion.id)}>Zor</button>
          </div>
        </div>
        <h3>{activeQuestion.stem}</h3>
        <div className="question-supporting-data">
          {activeQuestion.supportingData.map((item) => (
            <span key={`${item.label}-${item.value}`}><strong>{item.label}</strong>{item.value}</span>
          ))}
        </div>
        <div className="material-options-grid">
          {activeQuestion.options.map((option) => {
            const answered = Boolean(selectedOption);
            const isSelected = selectedOption === option.id;
            const isCorrect = activeQuestion.correctOptionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                className={[answered && isCorrect ? 'correct' : '', answered && isSelected && !isCorrect ? 'wrong' : '', isSelected ? 'selected' : ''].filter(Boolean).join(' ')}
                onClick={() => onAnswer(activeQuestion.id, option.id)}
              >
                <strong>{option.id}</strong>
                <span>{option.text}</span>
              </button>
            );
          })}
        </div>

        {selectedOption ? (
          <div className="two-feedback-cards">
            {selectedIsWrong ? (
              <article className="feedback-mini-card wrong">
                <span>Seçtiğin seçenek</span>
                <p>{selectedFeedback}</p>
              </article>
            ) : null}
            <article className="feedback-mini-card correct">
              <span>Doğru seçenek</span>
              <p>{correctFeedback}</p>
            </article>
          </div>
        ) : null}
      </article>

      <div className="carousel-controls">
        <button type="button" className="btn btn-secondary" onClick={() => setIndex((current) => Math.max(0, current - 1))}>← Önceki</button>
        <div className="carousel-dots" aria-label="Soru gezinme">
          {questions.slice(0, 10).map((question, dotIndex) => (
            <button key={question.id} type="button" className={dotIndex === index ? 'active' : ''} onClick={() => setIndex(dotIndex)} aria-label={`${dotIndex + 1}. soru`} />
          ))}
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setIndex((current) => Math.min(questions.length - 1, current + 1))}>Sonraki →</button>
      </div>
    </DashboardSection>
  );
}

function FlashcardDeck({ material, flashcards, onToggle, onDeleteUserCard, onAddUserCard }) {
  const [filter, setFilter] = useState('all');
  const [draft, setDraft] = useState({ front: '', back: '', explanation: '' });
  const visibleCards = flashcards.filter((card) => {
    if (material && card.materialId !== material.id) return false;
    if (filter === 'favorite') return card.isFavorite;
    if (filter === 'difficult') return card.isDifficult;
    if (filter === 'repeat') return card.repeatStatus === 'repeat';
    if (filter === 'user') return card.isUserCreated;
    return true;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!draft.front.trim() || !draft.back.trim()) return;
    onAddUserCard({ ...draft, materialId: material?.id, mode: material?.studyMode || 'medical-school' });
    setDraft({ front: '', back: '', explanation: '' });
  };

  return (
    <DashboardSection title="Flashcards / Hap Kartlar" eyebrow="Aktif hatırlama">
      <div className="review-filter-row">
        {['all', 'favorite', 'difficult', 'repeat', 'user'].map((item) => (
          <button key={item} type="button" className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>
            {item === 'all' ? 'Tümü' : item === 'favorite' ? 'Favoriler' : item === 'difficult' ? 'Zor' : item === 'repeat' ? 'Tekrar' : 'Kullanıcı kartı'}
          </button>
        ))}
      </div>

      <div className="flashcard-grid">
        {visibleCards.map((card) => (
          <article key={card.id} className="workspace-flashcard">
            <span>{card.type || 'kart'} · {card.difficulty}</span>
            <h3>{card.front}</h3>
            <strong>{card.back}</strong>
            <p>{card.explanation}</p>
            <small>{card.sourceReference}</small>
            <div className="card-actions-row">
              <button type="button" className={card.isFavorite ? 'active' : ''} onClick={() => onToggle('isFavorite', card.id)}>Favori</button>
              <button type="button" className={card.isDifficult ? 'active' : ''} onClick={() => onToggle('isDifficult', card.id)}>Zor</button>
              <button type="button" className={card.repeatStatus === 'repeat' ? 'active' : ''} onClick={() => onToggle('repeatStatus', card.id, card.repeatStatus === 'repeat' ? 'new' : 'repeat')}>Tekrar</button>
              {card.isUserCreated ? <button type="button" onClick={() => onDeleteUserCard(card.id)}>Sil</button> : null}
            </div>
          </article>
        ))}
      </div>

      <form className="user-card-form" onSubmit={handleSubmit}>
        <h3>Kendi kartını ekle</h3>
        <input value={draft.front} onChange={(event) => setDraft((current) => ({ ...current, front: event.target.value }))} placeholder="Ön yüz: aktif hatırlama sorusu" />
        <input value={draft.back} onChange={(event) => setDraft((current) => ({ ...current, back: event.target.value }))} placeholder="Arka yüz: kısa cevap" />
        <textarea value={draft.explanation} onChange={(event) => setDraft((current) => ({ ...current, explanation: event.target.value }))} placeholder="Kısa açıklama" />
        <button type="submit" className="btn btn-secondary">Kart ekle</button>
      </form>
    </DashboardSection>
  );
}

function ReviewCenter({ materials, questions, flashcards, selectedMaterialId, onSelectMaterial }) {
  const scopedQuestions = questions.filter((question) => !selectedMaterialId || question.materialId === selectedMaterialId);
  const scopedCards = flashcards.filter((card) => !selectedMaterialId || card.materialId === selectedMaterialId);
  const wrongQuestions = scopedQuestions.filter((question) => question.isWrong);
  const difficultQuestions = scopedQuestions.filter((question) => question.isDifficult);
  const favoriteQuestions = scopedQuestions.filter((question) => question.isFavorite);
  const difficultCards = scopedCards.filter((card) => card.isDifficult || card.repeatStatus === 'repeat');

  return (
    <DashboardSection title="Review Center" eyebrow="Materyal bazlı tekrar">
      <div className="review-material-switcher">
        <button type="button" className={!selectedMaterialId ? 'active' : ''} onClick={() => onSelectMaterial('')}>Tüm materyaller</button>
        {materials.map((material) => (
          <button key={material.id} type="button" className={selectedMaterialId === material.id ? 'active' : ''} onClick={() => onSelectMaterial(material.id)}>
            {materialTopic(material)}
          </button>
        ))}
      </div>
      <div className="review-stats-grid">
        <article><strong>{wrongQuestions.length}</strong><span>Yanlış soru</span></article>
        <article><strong>{difficultQuestions.length}</strong><span>Zor soru</span></article>
        <article><strong>{favoriteQuestions.length}</strong><span>Favori soru</span></article>
        <article><strong>{difficultCards.length}</strong><span>Zor/tekrar kartı</span></article>
      </div>
      {wrongQuestions.length ? (
        <div className="review-list">
          {wrongQuestions.slice(0, 5).map((question) => (
            <article key={question.id}>
              <strong>{question.stem}</strong>
              <p>Seçimin: {question.userAnswer} · Doğru: {question.correctOptionId}</p>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState icon="CheckCircle" title="Bu kapsamda yanlış soru yok" text="Yanlış yaptıkların otomatik olarak materyal bazlı tekrar alanına düşer." />
      )}
    </DashboardSection>
  );
}

function WorkspaceDashboard({ profile, workspace, onOpenMaterial, onStartUpload, onStartTUS }) {
  const recentMaterial = workspace.materials[0];
  const wrongCount = workspace.questions.filter((question) => question.isWrong).length;
  const difficultCards = workspace.flashcards.filter((card) => card.isDifficult || card.repeatStatus === 'repeat').length;
  const isTus = profile?.preferredStudyMode === 'tus' || profile?.educationStatus === 'tus-candidate';

  return (
    <section className="platform-dashboard-grid">
      <DashboardSection title={`Hoş geldin, ${profile?.firstName || 'doktor'}`} eyebrow="Kişisel öğrenme merkezi">
        <div className="mode-recommendation-card">
          <IconBadge icon={isTus ? 'TusSpotFlash' : 'Brain'} tone="teal" size="sm" />
          <div>
            <strong>{isTus ? 'TUS hazırlığı öne çıkarıldı' : 'Tıp fakültesi / komite akışı öne çıkarıldı'}</strong>
            <p>{isTus ? 'Dashboard TUS branşları, spot olgular ve yüksek verimli kartları daha görünür tutar.' : 'Ders PDF/slaytlarından konu anlatımı, soru carousel’i ve materyal bazlı kart üretimi önceliklidir.'}</p>
          </div>
        </div>
        <div className="platform-quick-actions">
          <button type="button" className="btn btn-primary" onClick={onStartUpload}><Icon name="Notes" /> PDF / slayt yükle</button>
          <button type="button" className="btn btn-secondary" onClick={onStartTUS}><Icon name="Sparkles" /> AI TUS sorusu üret</button>
        </div>
      </DashboardSection>

      <DashboardSection title="Continue Studying" eyebrow="Son çalışma">
        {recentMaterial ? (
          <MaterialCard material={recentMaterial} onOpen={onOpenMaterial} selected={false} />
        ) : (
          <EmptyState icon="BookOpen" title="Henüz materyal yok" text="İlk PDF/slaytını yüklediğinde son ders, quiz ve kart destesi burada görünür." />
        )}
      </DashboardSection>

      <div className="platform-metric-grid">
        <article><strong>{workspace.materials.length}</strong><span>Yüklenen materyal</span></article>
        <article><strong>{workspace.questions.length}</strong><span>Materyal sorusu</span></article>
        <article><strong>{workspace.flashcards.length}</strong><span>Hap kart</span></article>
        <article><strong>{wrongCount + difficultCards}</strong><span>Review öğesi</span></article>
      </div>
    </section>
  );
}

function LearningWorkspace({ currentUser, profile, onStartAIQuestion, onOpenTusSpot }) {
  const [workspace, setWorkspace] = useState(() => loadLearningWorkspace(currentUser?.id));
  const [activeMaterialId, setActiveMaterialId] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [reviewMaterialId, setReviewMaterialId] = useState('');

  useEffect(() => {
    setWorkspace(loadLearningWorkspace(currentUser?.id));
  }, [currentUser?.id]);

  const activeMaterial = workspace.materials.find((material) => material.id === activeMaterialId) || workspace.materials[0] || null;
  const activeLesson = activeMaterial ? workspace.lessons.find((lesson) => lesson.materialId === activeMaterial.id) : null;
  const activeQuestions = activeMaterial ? workspace.questions.filter((question) => question.materialId === activeMaterial.id).sort((a, b) => a.questionNumber - b.questionNumber).slice(0, 10) : [];
  const activeCards = activeMaterial ? workspace.flashcards.filter((card) => card.materialId === activeMaterial.id) : [];

  const persist = (nextWorkspace) => setWorkspace(saveLearningWorkspace(currentUser?.id, nextWorkspace));

  const handleCreateBundles = (files, metadata) => {
    const bundles = createMaterialBundle({ userId: currentUser?.id, files, metadata: { ...metadata, university: profile?.university || metadata.university } });
    const nextWorkspace = appendMaterialBundles(currentUser?.id, workspace, bundles);
    setWorkspace(nextWorkspace);
    setActiveMaterialId(bundles[0]?.material?.id || '');
    setShowUpload(false);
  };

  const handleAnswer = (questionId, answerId) => {
    setWorkspace(updateQuestionAnswer(currentUser?.id, workspace, questionId, answerId));
  };

  const handleQuestionToggle = (field, questionId) => {
    setWorkspace(toggleWorkspaceItem(currentUser?.id, workspace, 'questions', questionId, field));
  };

  const handleCardToggle = (field, cardId, explicitValue = undefined) => {
    if (explicitValue !== undefined) {
      const flashcards = workspace.flashcards.map((card) => card.id === cardId ? { ...card, [field]: explicitValue } : card);
      persist({ ...workspace, flashcards });
      return;
    }
    setWorkspace(toggleWorkspaceItem(currentUser?.id, workspace, 'flashcards', cardId, field));
  };

  const handleAddUserCard = (card) => setWorkspace(addUserFlashcard(currentUser?.id, workspace, card));
  const handleDeleteUserCard = (cardId) => setWorkspace(deleteUserFlashcard(currentUser?.id, workspace, cardId));

  return (
    <section className="learning-platform-shell" aria-label="KlinikIQ öğrenme platformu">
      <WorkspaceDashboard
        profile={profile}
        workspace={workspace}
        onOpenMaterial={(id) => { setActiveMaterialId(id); setShowUpload(false); }}
        onStartUpload={() => setShowUpload(true)}
        onStartTUS={onStartAIQuestion}
      />

      <section className="learning-mode-hub card-surface">
        <div>
          <span>İki ana öğrenme yolu</span>
          <h2>Tıp fakültesi materyalleri ve TUS pratiği aynı çatı altında.</h2>
          <p>TUS Spot Olgular mevcut modül olarak korunur; PDF/slayt çalışma alanı ise komite, final ve staj hazırlığı için ayrı organize edilir.</p>
        </div>
        <div className="learning-path-actions">
          <button type="button" className="btn btn-primary" onClick={() => setShowUpload(true)}><Icon name="Notes" /> Materyal yükle</button>
          <button type="button" className="btn btn-secondary" onClick={onOpenTusSpot}><Icon name="TusSpotFlash" /> TUS Spot Olgular</button>
        </div>
      </section>

      {showUpload ? (
        <DashboardSection title="Upload Lecture PDF / Slides" eyebrow="Çalışma amacı önce seçilir">
          <UploadStudyForm profile={profile} onCreateBundles={handleCreateBundles} />
        </DashboardSection>
      ) : null}

      <DashboardSection title="Study From My Materials" eyebrow="Yıl · üniversite · komite · ders · branş">
        {workspace.materials.length ? (
          <div className="material-list">
            {workspace.materials.map((material) => <MaterialCard key={material.id} material={material} selected={activeMaterial?.id === material.id} onOpen={setActiveMaterialId} />)}
          </div>
        ) : (
          <EmptyState icon="Notes" title="PDF/slayt bekleniyor" text="Yüklediğin materyaller sınıf, ders, TUS branşı ve tarihe göre burada listelenir." />
        )}
      </DashboardSection>

      {activeMaterial ? (
        <>
          <LessonWorkspace material={activeMaterial} lesson={activeLesson} />
          <QuestionCarousel
            material={activeMaterial}
            questions={activeQuestions}
            onAnswer={handleAnswer}
            onToggle={handleQuestionToggle}
          />
          <FlashcardDeck
            material={activeMaterial}
            flashcards={activeCards}
            onToggle={handleCardToggle}
            onDeleteUserCard={handleDeleteUserCard}
            onAddUserCard={handleAddUserCard}
          />
        </>
      ) : null}

      <ReviewCenter
        materials={workspace.materials}
        questions={workspace.questions}
        flashcards={workspace.flashcards}
        selectedMaterialId={reviewMaterialId}
        onSelectMaterial={setReviewMaterialId}
      />
    </section>
  );
}

export default LearningWorkspace;
