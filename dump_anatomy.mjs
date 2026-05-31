import { cases } from './src/data/cases.js';
import { TUS_PEARL_CARDS, TUS_PEARL_TOPICS } from './src/data/tusPearlCards.js';
const anatomyCases=cases.filter(c=>String(c.branchId).includes('anatomy')||String(c.relatedBranch||'').toLowerCase().includes('anatomi')||String(c.questionType||'').includes('anatomy')||String(c.answerTarget||'').includes('anatomy'));
console.log('ANATOMY CASES');
for(const c of anatomyCases){console.log(c.id,'|',c.title,'|',c.relatedBranch,'|',c.question?.stem || c.questionStem || '');}
console.log('\nTOPICS');
const topics=[...new Map(TUS_PEARL_CARDS.filter(c=>c.branchId==='anatomy'||c.subject==='Anatomi').map(c=>[c.topic,c])).keys()];
console.log(topics.join('\n'));
