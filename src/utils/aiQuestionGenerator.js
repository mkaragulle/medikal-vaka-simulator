const AI_SPOT_BRANCHES = [
  'Rastgele',
  'Çocuk Sağlığı ve Hastalıkları',
  'Kadın Hastalıkları ve Doğum',
  'İç Hastalıkları',
  'Genel Cerrahi',
  'Tıbbi Mikrobiyoloji',
  'Tıbbi Farmakoloji',
  'Tıbbi Biyokimya',
  'Tıbbi Patoloji',
  'Fizyoloji',
  'Anatomi',
  'Histoloji ve Embriyoloji',
  'Küçük Stajlar',
];

export function listAIQuestionBranches() {
  return AI_SPOT_BRANCHES;
}

export function generateAIQuestion() {
  throw new Error('Yerel AI soru üretimi kaldırıldı. Yalnızca /api/generate-ai-question TUS AI Spot endpointi aktiftir.');
}
