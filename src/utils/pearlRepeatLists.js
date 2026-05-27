export const PEARL_REPEAT_LISTS = [
  {
    id: 'all',
    filter: 'all',
    label: 'Tüm kartlar',
    shortLabel: 'Tüm kartlar',
    description: 'Hazır ve kişisel tüm hap bilgileri dengeli sırayla çalış.',
    icon: 'LayeredCards',
    actionLabel: 'Çalış',
    emptyTitle: 'Kart havuzu boş görünüyor.',
    emptyDescription: 'Hazır kartlar yüklenemediyse sayfayı yenileyebilir veya kendi kartını oluşturabilirsin.',
  },
  {
    id: 'favorites',
    filter: 'favorites',
    label: 'Favoriler',
    shortLabel: 'Favoriler',
    description: 'Önemli bulduğun kartları hızlıca tekrar et.',
    icon: 'Sparkles',
    actionLabel: 'Çalış',
    emptyTitle: 'Henüz favori kartın yok.',
    emptyDescription: 'Çalışırken önemli kartları Favori olarak işaretlediğinde burada ayrı bir tekrar listesi oluşur.',
  },
  {
    id: 'wrong',
    filter: 'wrong',
    label: 'Zorlandıklarım',
    shortLabel: 'Zorlandıklarım',
    description: 'Zorlandım dediğin kartları ayrı ve dengeli bir deck olarak çöz.',
    icon: 'Target',
    actionLabel: 'Çalış',
    emptyTitle: 'Henüz zorlandığın kart yok.',
    emptyDescription: 'Kart çalışırken Zorlandım olarak işaretlediğin kartlar burada görünür.',
  },
  {
    id: 'review',
    filter: 'review',
    label: 'Tekrar et',
    shortLabel: 'Tekrar et',
    description: 'Tekrar etmek istediğin kartları ayrı bir liste olarak çalış.',
    icon: 'RotateCcw',
    actionLabel: 'Çalış',
    emptyTitle: 'Tekrar listende kart yok.',
    emptyDescription: 'Çalışırken tekrar etmek istediğin kartları Tekrar et olarak işaretleyebilirsin.',
  },
  {
    id: 'known',
    filter: 'known',
    label: 'Bildiklerim',
    shortLabel: 'Bildiklerim',
    description: 'Biliyorum dediğin kartları kontrol amaçlı aç veya tekrar et.',
    icon: 'CheckCircle',
    actionLabel: 'Aç',
    emptyTitle: 'Henüz bildiğin olarak işaretlenen kart yok.',
    emptyDescription: 'Biliyorum dediğin kartlar burada toplanır; gerektiğinde tekrar çalışabilirsin.',
  },
  {
    id: 'user',
    filter: 'user',
    label: 'Kendi kartlarım',
    shortLabel: 'Kendi kartlarım',
    description: 'Kişisel oluşturduğun kartları gör ve çalış.',
    icon: 'Notes',
    actionLabel: 'Aç',
    emptyTitle: 'Henüz kendi kartını oluşturmadın.',
    emptyDescription: 'Yeni öğrendiğin bilgiyi kısa bir soru-cevap kartına dönüştürerek kişisel tekrar havuzuna ekleyebilirsin.',
  },
  {
    id: 'catalogs',
    filter: 'catalogs',
    label: 'Kataloglarım',
    shortLabel: 'Kataloglarım',
    description: 'Kişisel setlerini yönet, kart ekle ve katalog bazlı çalış.',
    icon: 'ClipboardList',
    actionLabel: 'Yönet',
    emptyTitle: 'Henüz katalog yok.',
    emptyDescription: 'Katalog oluşturarak sistem kartlarını veya kendi kartlarını özel tekrar setlerinde toplayabilirsin.',
  },
];

function toSet(ids = []) {
  return new Set(Array.isArray(ids) ? ids : []);
}

export function getPearlRepeatListCounts(state = {}, cards = []) {
  const favoriteSet = toSet(state.favoritePearlCardIds);
  const wrongSet = toSet(state.wrongPearlCardIds);
  const reviewSet = toSet(state.reviewPearlCardIds);
  const knownSet = toSet(state.knownPearlCardIds);
  const catalogs = Array.isArray(state.customCatalogs) ? state.customCatalogs : [];

  const counts = {
    all: 0,
    favorites: 0,
    wrong: 0,
    review: 0,
    known: 0,
    user: 0,
    catalogs: catalogs.length,
  };

  if (!Array.isArray(cards)) return counts;

  for (const card of cards) {
    if (!card?.id) continue;
    counts.all += 1;
    if (favoriteSet.has(card.id)) counts.favorites += 1;
    if (wrongSet.has(card.id)) counts.wrong += 1;
    if (reviewSet.has(card.id)) counts.review += 1;
    if (knownSet.has(card.id)) counts.known += 1;
    if (card.source === 'user') counts.user += 1;
  }

  return counts;
}

export function buildPearlRepeatListItems(state = {}, cards = []) {
  const counts = getPearlRepeatListCounts(state, cards);
  return PEARL_REPEAT_LISTS.map((item) => ({
    ...item,
    count: counts[item.id] || 0,
    countLabel: item.id === 'catalogs' ? `${counts[item.id] || 0} set` : `${counts[item.id] || 0} kart`,
  }));
}

export function getPearlEmptyState(filter = 'all') {
  return PEARL_REPEAT_LISTS.find((item) => item.filter === filter || item.id === filter)
    || PEARL_REPEAT_LISTS[0];
}
