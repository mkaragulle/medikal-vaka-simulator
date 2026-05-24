
import { getGlossaryTerms } from './src/utils/glossary.js';
const terms = getGlossaryTerms();
console.log(JSON.stringify({
  count: terms.length,
  terms: terms.map(t => ({term: t.term, normalizedTerm: t.normalizedTerm, aliases: t.aliases || [], normalizedAliases: t.normalizedAliases || [], id: t.id, category: t.category}))
}));
