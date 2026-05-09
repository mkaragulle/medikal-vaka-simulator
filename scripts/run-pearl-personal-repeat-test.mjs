import fs from 'node:fs';
import { TUS_PEARL_CARDS } from '../src/data/tusPearlCards.js';
import { buildStudyDeck, analyzeDeckQuality } from '../src/utils/pearlDeckShuffle.js';
import { buildPearlRepeatListItems, getPearlRepeatListCounts } from '../src/utils/pearlRepeatLists.js';
import { loadPearlState } from '../src/utils/pearlCardStorage.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const systemCards = TUS_PEARL_CARDS.map((card) => ({ ...card, source: 'system' }));
const [favCard, wrongCard, reviewCard, knownCard] = systemCards;
const userCard = {
  id: 'user-card-test-001',
  source: 'user',
  branchId: 'tus-spot-olgular',
  subject: 'Kişisel tekrar',
  topic: 'Kişisel kart',
  front: 'Kişisel test kartı',
  back: 'Kişisel yanıt',
  tags: ['kişisel'],
};
const allCards = [...systemCards, userCard];
const state = {
  favoritePearlCardIds: [favCard.id],
  wrongPearlCardIds: [wrongCard.id],
  reviewPearlCardIds: [reviewCard.id],
  knownPearlCardIds: [knownCard.id],
  userPearlCards: [userCard],
  customCatalogs: [{ id: 'catalog-test', name: 'Test kataloğu', cardIds: [favCard.id, userCard.id] }],
  recentStudyStarts: {},
};

const counts = getPearlRepeatListCounts(state, allCards);
assert(counts.all === allCards.length, 'Tüm kart sayacı gerçek havuza eşit olmalı.');
assert(counts.favorites === 1, 'Favoriler sayacı gerçek kart idlerini saymalı.');
assert(counts.wrong === 1, 'Zorlandıklarım sayacı çalışmalı.');
assert(counts.review === 1, 'Tekrar et sayacı zorlandıkları otomatik dahil etmemeli.');
assert(counts.known === 1, 'Bildiklerim sayacı çalışmalı.');
assert(counts.user === 1, 'Kendi kartlarım sayacı çalışmalı.');
assert(counts.catalogs === 1, 'Katalog sayacı çalışmalı.');

const items = buildPearlRepeatListItems(state, allCards);
['all', 'favorites', 'wrong', 'review', 'known', 'user', 'catalogs'].forEach((id) => {
  assert(items.some((item) => item.id === id), `${id} tekrar listesi görünür olmalı.`);
});

const filters = {
  favorites: allCards.filter((card) => state.favoritePearlCardIds.includes(card.id)),
  wrong: allCards.filter((card) => state.wrongPearlCardIds.includes(card.id)),
  review: allCards.filter((card) => state.reviewPearlCardIds.includes(card.id)),
  known: allCards.filter((card) => state.knownPearlCardIds.includes(card.id)),
  user: allCards.filter((card) => card.source === 'user'),
};

Object.entries(filters).forEach(([mode, cards]) => {
  const deck = buildStudyDeck(cards, {
    mode,
    seed: `personal-repeat-${mode}`,
    wrongIds: new Set(state.wrongPearlCardIds),
    reviewIds: new Set(state.reviewPearlCardIds),
    knownIds: new Set(state.knownPearlCardIds),
    favoriteIds: new Set(state.favoritePearlCardIds),
  });
  assert(deck.cardIds.length === cards.length, `${mode} deck kendi listesindeki kartlardan oluşmalı.`);
});

const largeDeck = buildStudyDeck(systemCards, {
  mode: 'all',
  seed: 'personal-repeat-large-deck',
  recentStarts: systemCards.slice(0, 20).map((card) => card.id),
});
const quality = analyzeDeckQuality(largeDeck.cardIds.map((id) => systemCards.find((card) => card.id === id)).filter(Boolean), { firstWindow: 20 });
assert(quality.maxTopicStreak <= 2, 'Kişisel deck builder konu yığılmasını sınırlamalı.');
assert(quality.maxBranchStreak <= 3, 'Kişisel deck builder branch yığılmasını sınırlamalı.');

global.window = { localStorage: { getItem: () => '{broken-json', setItem: () => {} } };
const loaded = loadPearlState();
assert(Array.isArray(loaded.favoritePearlCardIds), 'Bozuk localStorage güvenli fallback ile açılmalı.');

const report = {
  status: 'PASS',
  counts,
  visibleLists: items.map((item) => ({ id: item.id, label: item.label, count: item.count })),
  deckChecks: Object.fromEntries(Object.entries(filters).map(([mode, cards]) => [mode, cards.length])),
  largeDeckQuality: quality,
  localStorageFallback: 'PASS',
};

fs.writeFileSync('HAP_BILGI_PERSONAL_REPEAT_TEST_REPORT.json', `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync('HAP_BILGI_PERSONAL_REPEAT_TEST_REPORT.md', `# Hap Bilgi Personal Repeat Test\n\nStatus: **${report.status}**\n\n- Visible repeat lists: ${report.visibleLists.map((item) => `${item.label} (${item.count})`).join(', ')}\n- Favorite deck size: ${report.deckChecks.favorites}\n- Difficult deck size: ${report.deckChecks.wrong}\n- Review deck size: ${report.deckChecks.review}\n- Known deck size: ${report.deckChecks.known}\n- User deck size: ${report.deckChecks.user}\n- Max topic streak in 500-card deck: ${report.largeDeckQuality.maxTopicStreak}\n- Max branch streak in 500-card deck: ${report.largeDeckQuality.maxBranchStreak}\n- localStorage fallback: ${report.localStorageFallback}\n`);
console.log(JSON.stringify(report, null, 2));
