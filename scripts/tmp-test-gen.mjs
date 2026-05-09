import { generateAIQuestion } from '../src/utils/aiQuestionGenerator.js';
import { buildRecentQuestionContext, rememberAIQuestion } from '../src/utils/aiQuestionHistory.js';
let ok=0, fail=0;
for (let i=0;i<20;i++){
 try{ const q=generateAIQuestion({branchFilter:'random', context: buildRecentQuestionContext(50)}); rememberAIQuestion(q); ok++; }
 catch(e){ console.log('fail', i, e.message, e.generationErrors?.slice(-2)); fail++; break; }
}
console.log({ok,fail});
