import { useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import BranchSelector from './components/BranchSelector.jsx';
import CaseList from './components/CaseList.jsx';
import CasePlayer from './components/CasePlayer.jsx';
import HomeCommandCenter from './components/HomeCommandCenter.jsx';
import ExamResults from './components/ExamResults.jsx';
import { Icon } from './components/ui.jsx';
import { branches } from './data/branches.js';
import { cases, getCaseById, getCasesByBranch } from './data/cases.js';
import { scoreAttempt, calculateAccuracy } from './utils/scoring.js';
import { pickRandom, shuffleArray } from './utils/randomize.js';
import { localBackend } from './services/localBackend.js';

const STATS_STORAGE_KEY = 'medsim-session-stats-v2';
const EXAM_HISTORY_STORAGE_KEY = 'medsim-exam-history-v2';
const THEME_STORAGE_KEY = 'medsim-theme-v1';

const defaultStats = {
  attempts: 0,
  correct: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  accuracy: 0,
};

function loadStoredValue(key, fallback) {
  return localBackend.read(key, fallback);
}

function buildExamPool(sourceCases = []) {
  const primary = shuffleArray(sourceCases).slice(0, Math.min(10, sourceCases.length));
  if (primary.length >= 10) return primary;

  const usedIds = new Set(primary.map((item) => item.id));
  const backup = shuffleArray(cases).filter((item) => !usedIds.has(item.id)).slice(0, 10 - primary.length);
  return [...primary, ...backup];
}

function resolveBranchById(branchId) {
  return branches.find((branch) => branch.id === branchId) ?? null;
}

function App() {
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [mode, setMode] = useState('study');
  const [hardMode, setHardMode] = useState(false);
  const [theme, setTheme] = useState(() => loadStoredValue(THEME_STORAGE_KEY, 'dark'));
  const [tutorMode, setTutorMode] = useState(true);
  const [sessionStats, setSessionStats] = useState(() => loadStoredValue(STATS_STORAGE_KEY, defaultStats));
  const [examHistory, setExamHistory] = useState(() => loadStoredValue(EXAM_HISTORY_STORAGE_KEY, []));
  const [examState, setExamState] = useState(null);
  const [clockTick, setClockTick] = useState(Date.now());
  const [isCaseSidebarOpen, setIsCaseSidebarOpen] = useState(true);
  const [branchRouteTransition, setBranchRouteTransition] = useState(null);
  const branchRouteTimers = useRef([]);

  const selectedBranch = useMemo(
    () => (selectedBranchId ? resolveBranchById(selectedBranchId) : null),
    [selectedBranchId],
  );

  const branchCases = useMemo(
    () => (selectedBranchId ? getCasesByBranch(selectedBranchId) : []),
    [selectedBranchId],
  );

  const selectedCase = useMemo(() => {
    if (examState?.active) {
      return getCaseById(examState.caseIds[examState.currentIndex]);
    }
    if (!selectedCaseId) return branchCases[0] ?? null;
    return getCaseById(selectedCaseId) ?? branchCases[0] ?? null;
  }, [selectedCaseId, branchCases, examState]);

  useEffect(() => {
    localBackend.write(STATS_STORAGE_KEY, sessionStats);
  }, [sessionStats]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localBackend.write(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localBackend.write(EXAM_HISTORY_STORAGE_KEY, examHistory);
  }, [examHistory]);

  useEffect(() => {
    if (!selectedBranchId) return;
    if (!branchCases.some((clinicalCase) => clinicalCase.id === selectedCaseId)) {
      setSelectedCaseId(branchCases[0]?.id ?? null);
    }
  }, [selectedBranchId, branchCases, selectedCaseId]);

  useEffect(() => {
    if (!examState?.active) return undefined;
    const interval = window.setInterval(() => setClockTick(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [examState?.active]);

  useEffect(() => () => {
    branchRouteTimers.current.forEach((timerId) => window.clearTimeout(timerId));
  }, []);

  const remainingSeconds = useMemo(() => {
    if (!examState?.active) return 0;
    const elapsed = Math.floor((clockTick - examState.startedAt) / 1000);
    return Math.max(0, examState.durationSeconds - elapsed);
  }, [examState, clockTick]);

  useEffect(() => {
    if (examState?.active && remainingSeconds === 0) {
      finalizeExam();
    }
  }, [examState?.active, remainingSeconds]);

  const leaderboardEntries = useMemo(() => {
    const entries = [];
    if (sessionStats.attempts) {
      entries.push({
        label: 'Toplam puan',
        subtext: `${sessionStats.attempts} olgu · %${Math.round(sessionStats.accuracy)} doğruluk`,
        value: sessionStats.score,
      });
    }

    if (sessionStats.bestStreak) {
      entries.push({
        label: 'En iyi seri',
        subtext: 'Art arda doğru yanıt',
        value: sessionStats.bestStreak,
      });
    }

    if (examHistory.length) {
      const bestExam = [...examHistory].sort((a, b) => b.score - a.score)[0];
      entries.push({
        label: 'En iyi blok sınav',
        subtext: `${bestExam.correct}/${bestExam.total} doğru · %${bestExam.accuracy}`,
        value: bestExam.score,
      });
    }

    return entries.slice(0, 3);
  }, [examHistory, sessionStats]);

  const clearBranchRouteTimers = () => {
    branchRouteTimers.current.forEach((timerId) => window.clearTimeout(timerId));
    branchRouteTimers.current = [];
  };

  const handleSelectBranch = (branchId) => {
    const branchPool = getCasesByBranch(branchId);

    clearBranchRouteTimers();
    setSelectedBranchId(branchId);
    setSelectedCaseId(branchPool[0]?.id ?? null);
    setIsCaseSidebarOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setBranchRouteTransition({ active: true, phase: 'reveal', branchId });
    const finishTimer = window.setTimeout(() => {
      setBranchRouteTransition(null);
    }, 560);

    branchRouteTimers.current = [finishTimer];
  };

  const handleSelectCase = (caseId) => {
    setSelectedCaseId(caseId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomCase = () => {
    if (!branchCases.length) return;
    const nextCase = pickRandom(branchCases, selectedCaseId) ?? branchCases[0];
    setSelectedCaseId(nextCase.id);
  };

  const handleSubmitAnswer = ({ clinicalCase, selected, isCorrect }) => {
    const existingExamAnswer = examState?.active ? examState.answers?.[clinicalCase.id] : null;
    if (existingExamAnswer) return existingExamAnswer.attemptResult;

    const scored = scoreAttempt(clinicalCase.difficulty, isCorrect, sessionStats.streak);

    setSessionStats((current) => {
      const attempts = current.attempts + 1;
      const correct = current.correct + (isCorrect ? 1 : 0);
      const score = current.score + scored.earnedPoints;
      const streak = scored.nextStreak;
      const bestStreak = Math.max(current.bestStreak, streak);
      return {
        attempts,
        correct,
        score,
        streak,
        bestStreak,
        accuracy: calculateAccuracy(correct, attempts),
      };
    });

    if (examState?.active) {
      setExamState((current) => ({
        ...current,
        answers: {
          ...current.answers,
          [clinicalCase.id]: {
            caseId: clinicalCase.id,
            selected,
            isCorrect,
            attemptResult: scored,
          },
        },
      }));
    }

    return scored;
  };

  function startBlockExam(sourceCases = cases, title = 'Genel klinik blok sınavı') {
    const pool = buildExamPool(sourceCases);
    setMode('exam');
    setIsCaseSidebarOpen(true);
    setExamState({
      active: true,
      title,
      caseIds: pool.map((item) => item.id),
      currentIndex: 0,
      answers: {},
      durationSeconds: pool.length * 90,
      startedAt: Date.now(),
    });
    setSelectedBranchId(null);
    setSelectedCaseId(null);
  }

  const goToNextExamCase = () => {
    setExamState((current) => {
      if (!current) return current;
      const nextIndex = Math.min(current.currentIndex + 1, current.caseIds.length - 1);
      return { ...current, currentIndex: nextIndex };
    });
  };

  const goToPreviousExamCase = () => {
    setExamState((current) => {
      if (!current) return current;
      const nextIndex = Math.max(current.currentIndex - 1, 0);
      return { ...current, currentIndex: nextIndex };
    });
  };

  function finalizeExam() {
    setExamState((current) => {
      if (!current?.active) return current;

      const elapsed = Math.floor((Date.now() - current.startedAt) / 1000);
      const timeUsedSeconds = Math.min(current.durationSeconds, elapsed);
      const review = current.caseIds.map((caseId) => {
        const item = getCaseById(caseId);
        const branch = resolveBranchById(item.branchId);
        const answer = current.answers[caseId];
        return {
          caseId,
          title: item.title,
          branchId: item.branchId,
          branchName: branch.name,
          selected: answer?.selected ?? null,
          isCorrect: answer?.isCorrect ?? false,
          correctAnswer: item.diagnosis.correct,
          earnedPoints: answer?.attemptResult?.earnedPoints ?? 0,
        };
      });

      const total = review.length;
      const correct = review.filter((item) => item.isCorrect).length;
      const score = review.reduce((sum, item) => sum + item.earnedPoints, 0);
      const accuracy = total ? Math.round((correct / total) * 100) : 0;

      const branchBreakdown = Object.values(review.reduce((accumulator, item) => {
        if (!accumulator[item.branchId]) {
          accumulator[item.branchId] = {
            branchId: item.branchId,
            branchName: item.branchName,
            total: 0,
            correct: 0,
          };
        }
        accumulator[item.branchId].total += 1;
        accumulator[item.branchId].correct += item.isCorrect ? 1 : 0;
        return accumulator;
      }, {})).map((item) => ({
        ...item,
        accuracy: item.total ? Math.round((item.correct / item.total) * 100) : 0,
      }));

      const result = {
        id: Date.now(),
        title: current.title,
        total,
        correct,
        score,
        accuracy,
        timeUsedSeconds,
        durationSeconds: current.durationSeconds,
        branchBreakdown,
        review,
      };

      setExamHistory((history) => [result, ...history].slice(0, 12));
      return { active: false, result };
    });
  }

  const resetExamToHome = () => {
    setExamState(null);
    setMode('study');
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setIsCaseSidebarOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="app-shell premium-shell" data-theme={theme}>
      <nav className="top-shell-nav" aria-label="MedSim Pro üst gezinme">
        <button className="nav-brand" type="button" onClick={resetExamToHome} aria-label="Ana ekrana dön">
          <span className="nav-brand-mark" aria-hidden="true"><Icon name="Activity" /></span>
          <span className="nav-brand-copy"><strong>MedSim Pro</strong><small>TUS odaklı klinik olgu simülatörü</small></span>
        </button>
        <div className="segmented-control nav-mode-switch" aria-label="Öğrenme modu seçimi">
          <button
            type="button"
            className={mode === 'study' && !examState?.active ? 'active' : ''}
            onClick={resetExamToHome}
            aria-pressed={mode === 'study' && !examState?.active}
          >
            Öğrenme modu
          </button>
          <button
            type="button"
            className={mode === 'exam' || examState?.active ? 'active' : ''}
            onClick={() => setMode('exam')}
            aria-pressed={mode === 'exam' || examState?.active}
          >
            Sınav modu
          </button>
          <button
            type="button"
            className={hardMode ? 'active hard-mode-active' : ''}
            onClick={() => setHardMode((current) => !current)}
            aria-pressed={hardMode}
            title="Referans değerleri ve ipuçları azaltılır"
          >
            Zor mod
          </button>
        </div>
        <div className="nav-actions" aria-label="Oturum eylemleri">
          <span className="nav-score-chip" aria-label={`Puan ${sessionStats.score}`}><span>Puan</span><strong>{sessionStats.score}</strong></span>
          <button type="button" className="btn btn-primary nav-cta" onClick={() => startBlockExam(cases, 'Genel klinik blok sınavı')}>
            <Icon name="Timer" />
            <span>Blok sınav</span>
          </button>
          <button type="button" className="btn btn-icon theme-toggle" onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}>
            <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} />
          </button>
        </div>
      </nav>

      {branchRouteTransition?.active && branchRouteTransition.phase === 'selecting' ? (
        <div className={`branch-route-overlay ${branchRouteTransition.phase} branch-route-${branchRouteTransition.branchId || 'default'}`.trim()} aria-hidden="true">
          <div className="branch-route-card">
            <span className={`branch-route-orb route-icon-${branchRouteTransition.branchId || 'default'}`.trim()}>
              <Icon name={branchRouteTransition.iconName || 'Activity'} />
            </span>
            <div className="branch-route-copy">
              <small>Olgu ekranı hazırlanıyor</small>
              <strong>{branchRouteTransition.title}</strong>
              <span>{branchRouteTransition.caseCount} klinik olgu yükleniyor</span>
            </div>
          </div>
        </div>
      ) : null}

      {examState?.result ? (
        <ExamResults
          result={examState.result}
          onRestart={() => startBlockExam(cases, 'Genel klinik blok sınavı')}
          onHome={resetExamToHome}
        />
      ) : examState?.active && selectedCase ? (
        <section className="page-shell exam-active-shell">
          <section className="exam-banner-card card-surface">
            <div>
              <h2>{examState.title}</h2>
              <p>
                Soru {examState.currentIndex + 1} / {examState.caseIds.length} · Kalan süre{' '}
                {Math.floor(remainingSeconds / 60)}:{String(remainingSeconds % 60).padStart(2, '0')}
              </p>
            </div>
            <button type="button" className="btn btn-secondary" onClick={finalizeExam}>Bloku bitir</button>
          </section>

          <div key={selectedCase.id} className="case-route-transition">
            <CasePlayer
              clinicalCase={selectedCase}
              branch={resolveBranchById(selectedCase.branchId)}
              mode="exam"
              onRandomCase={() => {}}
              onSubmitAnswer={handleSubmitAnswer}
              tutorMode={tutorMode}
              onToggleTutorMode={() => setTutorMode((current) => !current)}
              hardMode={hardMode}
              examMeta={{
                active: true,
                title: examState.title,
                currentIndex: examState.currentIndex,
                total: examState.caseIds.length,
                answers: examState.answers,
                remainingSeconds,
              }}
              onAdvanceExam={goToNextExamCase}
              onPreviousExam={goToPreviousExamCase}
              onFinishExam={finalizeExam}
            />
          </div>
        </section>
      ) : selectedBranch && selectedCase ? (
        <section className={`page-shell case-page-shell case-page-bottomrail ${branchRouteTransition?.phase === 'reveal' ? 'branch-route-reveal' : ''}`.trim()}>
          <section className="content-layout full-width-content-layout">
            <section className="branch-header-v8 card-surface">
              <div className="branch-header-v8-main">
                <button className="branch-back-v8" type="button" onClick={() => setSelectedBranchId(null)}>
                  <span aria-hidden="true">←</span>
                  <span>Branşlara dön</span>
                </button>
                <div className="branch-header-text">
                  <h2>{selectedBranch.name}</h2>
                  <p>{selectedBranch.description}</p>
                </div>
              </div>
              <div className="branch-inline-actions">
                <span className="branch-case-count">{branchCases.length} olgu</span>
                <button type="button" className="btn btn-primary" onClick={() => startBlockExam(branchCases, `${selectedBranch.name} blok sınavı`)}>
                  Branş bloku oluştur
                </button>
              </div>
            </section>

            <div key={selectedCase.id} className="case-route-transition">
              <CasePlayer
                clinicalCase={selectedCase}
                branch={selectedBranch}
                mode={mode}
                onRandomCase={handleRandomCase}
                onSubmitAnswer={handleSubmitAnswer}
                tutorMode={tutorMode}
                onToggleTutorMode={() => setTutorMode((current) => !current)}
                hardMode={hardMode}
              />
            </div>

            <section className="bottom-case-browser card-surface">
              <div className="bottom-case-browser-head">
                <div>
                  <h3>Diğer olgular</h3>
                </div>
                <span className="bottom-case-browser-count">{branchCases.length} olgu</span>
              </div>
              <CaseList cases={branchCases} selectedCaseId={selectedCase.id} onSelectCase={handleSelectCase} layout="horizontal" />
            </section>
          </section>
        </section>
      ) : (
        <section className="page-shell home-page-shell minimal-home-shell">
          <HomeCommandCenter
            mode={mode}
            onChangeMode={setMode}
            stats={sessionStats}
            leaderboardEntries={leaderboardEntries}
            onStartExam={() => startBlockExam(cases, 'Genel klinik blok sınavı')}
            totalCases={cases.length}
            totalBranches={branches.length}
            examCount={examHistory.length}
          />
          <BranchSelector branches={branches} cases={cases} onSelectBranch={handleSelectBranch} />
        </section>
      )}
    </main>
  );
}

export default App;
