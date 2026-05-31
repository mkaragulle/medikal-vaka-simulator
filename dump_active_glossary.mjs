import { getGlossaryTerms } from './src/utils/glossary.js';
const terms=getGlossaryTerms();
console.log(terms.length);
console.log(JSON.stringify(terms.slice(-5).map(t=>({term:t.term,id:t.id}))));
