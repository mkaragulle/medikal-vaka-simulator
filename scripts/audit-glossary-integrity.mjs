import {
  auditGlossaryIntegrity,
  getGlossaryTerms,
  normalizeGlossaryText,
} from '../src/utils/glossary.js';

const terms = getGlossaryTerms();
const audit = auditGlossaryIntegrity(terms);
const probes = [
  'astım',
  'obstrüksiyon',
  'hava yolu obstrüksiyonu',
  'bronş hiperreaktivitesi',
  'bağırsak obstrüksiyonu',
  'mekanik bağırsak obstrüksiyonu',
  'mesane çıkım obstrüksiyonu',
  'safra yolu obstrüksiyonu',
  'ileus',
  'hiperkalemi',
  'Doppler ultrasonografi',
  'aktif elevasyon',
  'sağ inguinal insizyon',
];

function ownersForAlias(alias) {
  const normalized = normalizeGlossaryText(alias);
  return terms
    .filter((entry) => (entry.aliases || []).some((item) => normalizeGlossaryText(item) === normalized))
    .map((entry) => ({ id: entry.id, term: entry.term, category: entry.category }));
}

const probeReport = probes.map((probe) => ({ probe, owners: ownersForAlias(probe) }));
const dangerousBindings = [
  { alias: 'obstrüksiyon', forbiddenTerm: 'İleus' },
  { alias: 'tıkanıklık', forbiddenTerm: 'İleus' },
  { alias: 'hava yolu obstrüksiyonu', forbiddenTerm: 'İleus' },
  { alias: 'mesane çıkım obstrüksiyonu', forbiddenTerm: 'İleus' },
  { alias: 'safra yolu obstrüksiyonu', forbiddenTerm: 'İleus' },
].map((rule) => {
  const owners = ownersForAlias(rule.alias);
  return {
    ...rule,
    passed: !owners.some((owner) => normalizeGlossaryText(owner.term) === normalizeGlossaryText(rule.forbiddenTerm)),
    owners,
  };
});

const report = {
  totalEntries: audit.totalEntries,
  issueCount: audit.issueCount,
  riskyAliasCount: audit.riskyAliasCount,
  probes: probeReport,
  dangerousBindings,
};

console.log(JSON.stringify(report, null, 2));

if (audit.issueCount > 0 || dangerousBindings.some((item) => !item.passed)) {
  process.exitCode = 1;
}
