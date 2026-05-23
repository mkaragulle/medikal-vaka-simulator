
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getGlossaryTerms,
  normalizeGlossaryText,
  isGenericStandaloneAlias,
  isAmbiguousStandaloneAlias,
} from '../src/utils/glossary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'GLOSSARY_V287_AMBIGUITY_CONTEXT_AUDIT.json');
const terms = getGlossaryTerms();
const aliasMap = new Map();
const idMap = new Map();
const canonicalMap = new Map();
const aliases = [];
for (const entry of terms) {
  idMap.set(entry.id, [...(idMap.get(entry.id) || []), entry]);
  const canonical = normalizeGlossaryText(entry.canonicalTerm || entry.displayTerm || entry.term || '');
  canonicalMap.set(canonical, [...(canonicalMap.get(canonical) || []), entry]);
  for (const alias of entry.aliases || []) {
    const normalized = normalizeGlossaryText(alias);
    if (!normalized) continue;
    const row = { alias, normalized, entryId: entry.id, term: entry.displayTerm || entry.term, category: entry.category, generic: !!entry.isGenericConcept, contextRequired: !!entry.contextRequired, phraseOnly: !!entry.phraseOnly };
    aliases.push(row);
    aliasMap.set(normalized, [...(aliasMap.get(normalized) || []), row]);
  }
}
const duplicateIds = [...idMap.entries()].filter(([, v]) => v.length > 1).map(([id, list]) => ({ id, owners: list.map(e => e.displayTerm || e.term) }));
const duplicateCanonicals = [...canonicalMap.entries()].filter(([, v]) => v.length > 1).map(([key, list]) => ({ canonical: key, owners: list.map(e => e.id) }));
const duplicateAliases = [...aliasMap.entries()].filter(([, v]) => new Set(v.map(x => x.entryId)).size > 1).map(([key, list]) => ({ alias: key, owners: list }));
const ambiguousAliases = aliases.filter(x => isAmbiguousStandaloneAlias(x.alias));
const contextRequiredAliases = aliases.filter(x => x.contextRequired || isAmbiguousStandaloneAlias(x.alias));
const phraseOnlyAliases = aliases.filter(x => x.phraseOnly || (String(x.alias).trim().split(/\s+/u).length > 1 && isAmbiguousStandaloneAlias(String(x.alias).trim().split(/\s+/u).at(-1) || '')));
const disabledStandaloneAliases = aliases.filter(x => String(x.alias).trim().split(/\s+/u).length === 1 && isAmbiguousStandaloneAlias(x.alias) && !x.generic);
const genericAliasSpecificRisks = aliases.filter(x => isGenericStandaloneAlias(x.alias) && !x.generic && normalizeGlossaryText(x.term) !== normalizeGlossaryText(x.alias));
const shortAcronymRisks = aliases.filter(({ alias }) => /^[a-zçğıöşü]{1,3}$/u.test(String(alias || '').trim()) && !isGenericStandaloneAlias(alias));

function collectFiles(dir, matches = []) {
  if (!fs.existsSync(dir)) return matches;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git'].includes(item.name)) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) collectFiles(full, matches);
    else if (/\.(js|jsx|ts|tsx|json)$/u.test(item.name)) matches.push(full);
  }
  return matches;
}
const sourceFiles = collectFiles(path.join(root, 'src'));
const medicalTextFiles = sourceFiles.filter(file => !file.includes(`${path.sep}data${path.sep}tusGlossary`));
const sourceText = normalizeGlossaryText(medicalTextFiles.map(file => fs.readFileSync(file, 'utf8')).join('\n'));
const candidateSeeds = [
  'asit-baz dengesi', 'laktik asit', 'ürik asit', 'folik asit', 'yağ asidi', 'nükleik asit', 'safra asidi', 'mide asidi', 'karında asit', 'asit sıvısı', 'SAAG',
  'insülin direnci', 'antibiyotik direnci', 'vasküler direnç', 'AV blok', 'dal bloğu', 'sinir bloğu', 'kan kültürü', 'idrar kültürü', 'boğaz kültürü',
  'ST depresyonu', 'mitral darlık', 'aort darlığı', 'spinal kanal darlığı', 'hava yolu darlığı', 'periferik ödem', 'pulmoner ödem', 'serebral ödem',
  'kontrast tutulumu', 'organ tutulumu', 'GIS perforasyonu', 'timpanik membran perforasyonu', 'over torsiyonu', 'non-kazeifiye granülom'
];
const missingCandidates = candidateSeeds.filter(seed => sourceText.includes(normalizeGlossaryText(seed)) && !aliasMap.has(normalizeGlossaryText(seed)) && !canonicalMap.has(normalizeGlossaryText(seed)));
function resolveExact(label) {
  const key = normalizeGlossaryText(label);
  const owners = aliasMap.get(key) || [];
  return owners[0]?.term || null;
}
const regressionExpectations = [
  ['karında asit', 'Peritoneal asit / Ascites'],
  ['asit sıvısı', 'Peritoneal asit / Ascites'],
  ['asit-baz dengesi', 'Asit-baz dengesi'],
  ['laktik asit', 'Laktik asit'],
  ['ürik asit', 'Ürik asit'],
  ['folik asit', 'Folik asit'],
  ['yağ asidi', 'Yağ asidi'],
  ['nükleik asit', 'Nükleik asit'],
  ['safra asidi', 'Safra asidi'],
  ['mide asidi', 'Mide asidi'],
  ['asit', 'Asit'],
  ['ST elevasyonu', 'ST elevasyonu'],
  ['aktif elevasyon', 'Aktif elevasyon'],
  ['insülin direnci', 'İnsülin direnci'],
  ['antibiyotik direnci', 'Antibiyotik direnci'],
  ['vasküler direnç', 'Vasküler direnç'],
  ['AV blok', 'AV blok'],
  ['sinir bloğu', 'Sinir bloğu'],
  ['kan kültürü', 'Kan kültürü'],
  ['idrar kültürü', 'İdrar kültürü'],
  ['ST depresyonu', 'ST depresyonu'],
  ['depresyon', 'Depresyon'],
  ['mitral darlık', 'Mitral darlık'],
  ['spinal kanal darlığı', 'Spinal kanal darlığı'],
  ['pulmoner ödem', 'Pulmoner ödem'],
  ['kontrast tutulumu', 'Kontrast tutulumu'],
  ['GIS perforasyonu', 'GIS perforasyonu'],
  ['over torsiyonu', 'Over torsiyonu']
];
const regressionResults = regressionExpectations.map(([input, expected]) => {
  const resolved = resolveExact(input);
  return { input, expected, resolved, pass: normalizeGlossaryText(resolved || '') === normalizeGlossaryText(expected) };
});
const newAmbiguityEntries = terms.filter(entry => String(entry.id || '').startsWith('ambiguity-'));
const categoriesAdded = newAmbiguityEntries.reduce((acc, entry) => { const key = entry.category || 'Belirsiz'; acc[key] = (acc[key] || 0) + 1; return acc; }, {});
const semanticMismatchHeuristics = terms.filter(entry => {
  const title = normalizeGlossaryText(entry.displayTerm || entry.term || '');
  const def = normalizeGlossaryText(entry.shortDefinition || entry.definition || '');
  if (!title || !def) return true;
  if (title === 'asit' && def.includes('periton boslugu')) return true;
  if (title.includes('kultur') && def.includes('genel kultur')) return true;
  return false;
}).slice(0, 50).map(entry => ({ id: entry.id, term: entry.displayTerm || entry.term, category: entry.category, definition: entry.shortDefinition || entry.definition }));
const report = {
  version: 'V287_AMBIGUITY_CONTEXT_SAFE_GLOSSARY',
  scanned: { glossaryEntries: terms.length, aliases: aliases.length, sourceFiles: sourceFiles.length, medicalTextSourceFiles: medicalTextFiles.length },
  ambiguity: { ambiguousAliasRows: ambiguousAliases.length, contextRequiredAliasRows: contextRequiredAliases.length, phraseOnlyAliasRows: phraseOnlyAliases.length, disabledStandaloneAliasRows: disabledStandaloneAliases.length },
  issues: { duplicateIds: duplicateIds.length, duplicateCanonicals: duplicateCanonicals.length, duplicateNormalizedAliases: duplicateAliases.length, genericAliasSpecificRisks: genericAliasSpecificRisks.length, shortAcronymRisks: shortAcronymRisks.length, missingCandidatesAfterPatch: missingCandidates.length, semanticMismatchHeuristicSamples: semanticMismatchHeuristics.length },
  samples: { duplicateIds: duplicateIds.slice(0,20), duplicateCanonicals: duplicateCanonicals.slice(0,20), duplicateNormalizedAliases: duplicateAliases.slice(0,20), genericAliasSpecificRisks: genericAliasSpecificRisks.slice(0,50), shortAcronymRisks: shortAcronymRisks.slice(0,30), missingCandidates, semanticMismatchHeuristics },
  added: { count: newAmbiguityEntries.length, categories: categoriesAdded, entries: newAmbiguityEntries.map(e => ({ id: e.id, term: e.displayTerm || e.term, category: e.category, aliases: e.aliases })) },
  regressionResults,
  regressionSummary: { passed: regressionResults.filter(r => r.pass).length, total: regressionResults.length },
  policy: {
    phraseFirst: 'Long phrase aliases are sorted before single-word aliases; naked ambiguous aliases are generic/no-tooltip safe rather than mapped to specific disease entries.',
    contextAware: 'contextRequired/phraseOnly/allowedContextKeywords/blockedContextKeywords are enforced during match resolution, not only during data cleanup.',
    nestedSafety: 'Tooltip/toolbox body keeps safeNestedTerms but blocks ambiguous one-word terms unless explicitly allowed; max nested depth remains 1.',
    prePostAnswer: 'Existing answer-leak neutralizer remains active for pre-answer mode; post-answer teaching fields remain available.'
  },
  manualReview: {
    note: 'Heuristic semantic review is not a medical proof. Legacy broad Genel-category rows should still be reviewed editorially over time.',
    recommendedFocus: ['legacy entries with category Genel', 'one-word ambiguous aliases in future imported data', 'toolbox modules added outside GlossaryText']
  }
};
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
