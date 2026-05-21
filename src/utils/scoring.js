export function getDifficultyMeta(difficulty = '') {
  const normalized = difficulty.toLocaleLowerCase('tr');

  if (normalized.includes('kritik')) {
    return { label: 'Kritik', points: 20, tone: 'critical' };
  }
  if (normalized.includes('acil') || normalized.includes('urgent')) {
    return { label: 'Acil', points: 20, tone: 'urgent' };
  }
  if (normalized.includes('zor') && normalized.includes('orta')) {
    return { label: 'Zor', points: 19, tone: 'advanced' };
  }
  if (normalized.includes('zor') || normalized.includes('hard')) {
    return { label: 'Zor', points: 19, tone: 'advanced' };
  }
  if (normalized.includes('kolay') || normalized.includes('easy') || normalized.startsWith('temel')) {
    return { label: 'Kolay', points: 10, tone: 'foundation' };
  }
  if (normalized.includes('orta') || normalized.includes('medium') || normalized.includes('temel-orta')) {
    return { label: 'Orta', points: 15, tone: 'intermediate' };
  }

  return { label: 'Orta', points: 15, tone: 'intermediate' };
}

export function scoreAttempt(difficulty, isCorrect, currentStreak = 0) {
  const meta = getDifficultyMeta(difficulty);
  const nextStreak = isCorrect ? currentStreak + 1 : 0;
  const streakBonus = isCorrect ? Math.min(nextStreak - 1, 3) * 2 : 0;
  const earnedPoints = isCorrect ? meta.points + streakBonus : 0;

  return {
    difficultyMeta: meta,
    isCorrect,
    earnedPoints,
    possiblePoints: meta.points,
    streakBonus,
    nextStreak,
  };
}

export function calculateAccuracy(correct = 0, attempts = 0) {
  if (!attempts) return 0;
  return Math.round((correct / attempts) * 100);
}

export function formatPercent(value) {
  return `%${value}`;
}
