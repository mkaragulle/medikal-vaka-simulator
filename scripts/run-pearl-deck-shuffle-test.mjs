import fs from 'node:fs';
import { TUS_PEARL_CARDS } from '../src/data/tusPearlCards.js';
import {
  analyzeDeckQuality,
  buildStudyDeck,
  normalizeCardBranch,
  normalizeCardTopic,
} from '../src/utils/pearlDeckShuffle.js';

function remember(recentStarts, key, cardIds) {
  const nextIds = Array.from(new Set((cardIds || []).map(String).filter(Boolean))).slice(0, 20);
  const previousIds = recentStarts[key] || [];
  return {
    ...recentStarts,
    [key]: [...nextIds, ...previousIds.filter((id) => !nextIds.includes(id))].slice(0, 120),
  };
}

function countOverlap(a = [], b = []) {
  const bSet = new Set(b);
  return a.filter((id) => bSet.has(id)).length;
}

function maxBlock(cards, keyGetter, target = null) {
  let max = 0;
  let current = 0;
  let previous = null;
  cards.forEach((card) => {
    const key = keyGetter(card);
    if (target && key !== target) {
      current = 0;
      previous = null;
      return;
    }
    current = key === previous ? current + 1 : 1;
    previous = key;
    max = Math.max(max, current);
  });
  return max;
}

const cardById = new Map(TUS_PEARL_CARDS.map((card) => [card.id, card]));
let recentStarts = {};
const allSessions = [];
const recentOverlap = [];

for (let index = 0; index < 10; index += 1) {
  const previousFirst20 = allSessions[index - 1]?.first20 || [];
  const deck = buildStudyDeck(TUS_PEARL_CARDS, {
    mode: 'all',
    sourceFilter: 'all',
    seed: `pearl-all-${index}`,
    recentStarts: recentStarts.all || [],
    maxSameTopicStreak: 1,
    maxSameBranchStreak: 2,
    recentStartWindowSize: 20,
  });
  const cards = deck.cardIds.map((id) => cardById.get(id)).filter(Boolean);
  const first20 = deck.cardIds.slice(0, 20);
  allSessions.push({
    index: index + 1,
    deckSize: deck.cardIds.length,
    first20,
    first20Topics: cards.slice(0, 20).map(normalizeCardTopic),
    ...analyzeDeckQuality(cards, { firstWindow: 20 }),
    anaphylaxisMaxBlock: maxBlock(cards, normalizeCardTopic, 'anafilaksi'),
  });
  if (previousFirst20.length) recentOverlap.push(countOverlap(first20.slice(0, 10), previousFirst20.slice(0, 10)));
  recentStarts = remember(recentStarts, 'all', deck.cardIds);
}

const wrongIds = new Set(TUS_PEARL_CARDS.filter((card, index) => index % 9 === 0 || normalizeCardTopic(card) === 'anafilaksi').map((card) => card.id));
const wrongDeck = buildStudyDeck(TUS_PEARL_CARDS, {
  mode: 'all',
  sourceFilter: 'all',
  seed: 'weighted-wrong-check',
  wrongIds,
  recentStarts: [],
});
const wrongCards = wrongDeck.cardIds.map((id) => cardById.get(id)).filter(Boolean);
const first50WrongCount = wrongDeck.cardIds.slice(0, 50).filter((id) => wrongIds.has(id)).length;
const totalWrongRatio = wrongIds.size / TUS_PEARL_CARDS.length;
const first50WrongRatio = first50WrongCount / 50;

const summary = {
  generatedAt: new Date().toISOString(),
  totalCards: TUS_PEARL_CARDS.length,
  sessions: allSessions.map((session) => ({
    index: session.index,
    deckSize: session.deckSize,
    uniqueTopics: session.uniqueTopics,
    uniqueBranches: session.uniqueBranches,
    first20UniqueTopics: new Set(session.firstWindowTopics).size,
    maxTopicStreak: session.maxTopicStreak,
    maxBranchStreak: session.maxBranchStreak,
    topicStreakViolations: session.topicStreakViolations,
    branchStreakViolations: session.branchStreakViolations,
    anaphylaxisMaxBlock: session.anaphylaxisMaxBlock,
  })),
  recentStartOverlapFirst10BetweenConsecutiveSessions: recentOverlap,
  maxRecentStartOverlapFirst10: Math.max(0, ...recentOverlap),
  first20ExactRepeatPairs: allSessions.flatMap((session, index) => allSessions.slice(index + 1).map((other) => countOverlap(session.first20, other.first20))).filter((overlap) => overlap >= 20).length,
  weightedWrongCheck: {
    wrongCardCount: wrongIds.size,
    first50WrongCount,
    totalWrongRatio: Number(totalWrongRatio.toFixed(3)),
    first50WrongRatio: Number(first50WrongRatio.toFixed(3)),
    maxTopicStreak: maxBlock(wrongCards, normalizeCardTopic),
    maxBranchStreak: maxBlock(wrongCards, normalizeCardBranch),
  },
};

const failed = [];
if (summary.sessions.some((session) => session.deckSize !== TUS_PEARL_CARDS.length)) failed.push('Deck size mismatch.');
if (summary.sessions.some((session) => session.maxTopicStreak > 1)) failed.push('A topic repeats back-to-back in at least one session.');
if (summary.sessions.some((session) => session.maxBranchStreak > 2)) failed.push('A branch streak exceeds 2 in at least one session.');
if (summary.sessions.some((session) => session.anaphylaxisMaxBlock > 1)) failed.push('Anafilaksi appears as a block.');
if (summary.first20ExactRepeatPairs > 0) failed.push('A first-20 sequence repeated exactly.');
if (summary.maxRecentStartOverlapFirst10 > 0) failed.push('Recent start overlap appeared in first 10.');
if (summary.weightedWrongCheck.first50WrongRatio <= summary.weightedWrongCheck.totalWrongRatio) failed.push('Weighted wrong cards were not prioritized early.');

summary.status = failed.length ? 'failed' : 'passed';
summary.failures = failed;

fs.writeFileSync('HAP_BILGI_DECK_SHUFFLE_TEST_REPORT.json', `${JSON.stringify(summary, null, 2)}\n`);
fs.writeFileSync('HAP_BILGI_DECK_SHUFFLE_TEST_REPORT.md', `# Hap Bilgi Deck Shuffle Test\n\nStatus: **${summary.status}**\n\n- Total cards: ${summary.totalCards}\n- Sessions tested: ${summary.sessions.length}\n- Max first-10 recent-start overlap: ${summary.maxRecentStartOverlapFirst10}\n- Exact repeated first-20 pairs: ${summary.first20ExactRepeatPairs}\n- Weighted wrong ratio in first 50: ${summary.weightedWrongCheck.first50WrongRatio} (pool ratio: ${summary.weightedWrongCheck.totalWrongRatio})\n- Max topic streak across sessions: ${Math.max(...summary.sessions.map((item) => item.maxTopicStreak))}\n- Max branch streak across sessions: ${Math.max(...summary.sessions.map((item) => item.maxBranchStreak))}\n- Anafilaksi max block: ${Math.max(...summary.sessions.map((item) => item.anaphylaxisMaxBlock))}\n\n${failed.length ? `Failures:\n${failed.map((item) => `- ${item}`).join('\n')}` : 'No shuffle, streak, recent-start, or weighting failures detected.'}\n`);

console.log(JSON.stringify(summary, null, 2));
if (failed.length) process.exit(1);
