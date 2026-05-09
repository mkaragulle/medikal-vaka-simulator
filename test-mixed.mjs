import { generateAIQuestion } from './src/utils/aiQuestionGenerator.js';
import { buildRecentQuestionContext, clearAIQuestionHistory, rememberAIQuestion } from './src/utils/aiQuestionHistory.js';
const branches=['medical-microbiology','medical-pharmacology','internal-medicine','pediatrics','general-surgery','medical-biochemistry','medical-pathology','obstetrics-gynecology','minor-rotations','physiology'];
clearAIQuestionHistory();
for(let i=0;i<20;i++){
 const b=branches[i%branches.length];
 console.time(`${i}-${b}`);
 const q=generateAIQuestion({branchFilter:b, context:buildRecentQuestionContext(50)});
 console.timeEnd(`${i}-${b}`);
 console.log(i,b,q.relatedBranch,q.title);
 rememberAIQuestion(q);
}
