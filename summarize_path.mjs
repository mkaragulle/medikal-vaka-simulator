import { rawCases } from './src/data/cases.js';
const cases=rawCases.filter(c=>c.branchId==='medical-pathology' && !String(c.spotCategory||'').includes('TUS Spot'));
for (const [i,c] of cases.entries()) {
 const d=c.diagnosis||{};
 console.log('\n### '+(i+1)+' '+c.id+' '+c.title);
 console.log('correct:', d.correct);
 console.log('question:', c.question || d.question);
 console.log('options:', (d.options||[]).join(' | '));
 console.log('patientIntro:', JSON.stringify(c.patientIntro));
 console.log('vitals:', JSON.stringify(c.vitals));
 console.log('exam:', JSON.stringify(c.exam));
 console.log('investigations:');
 for (const inv of c.investigations || []) {
   const rows=inv.rows || inv.result?.rows || inv.result?.values || [];
   console.log('- '+(inv.title||inv.label)+' ['+(inv.category||inv.testTypeCategory||inv.type)+'] summary='+JSON.stringify(inv.summary || inv.clinicalMeaning || inv.interpretation || inv.result?.summary || '').slice(0,300));
   console.log('  rows:', JSON.stringify(rows).slice(0,500));
 }
 console.log('whyCorrect:', c.whyCorrect || d.whyCorrect || d.explanation);
 console.log('examPearl:', c.examPearl || d.examPearl);
 console.log('evidence:', JSON.stringify(d.evidenceChain || c.answerFeedback?.evidenceChain || d.answerFeedback?.evidenceChain || []).slice(0,1000));
}
