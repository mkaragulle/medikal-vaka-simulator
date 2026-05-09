import fs from 'node:fs';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const feedbackPanel = fs.readFileSync('src/components/AnswerFeedbackPanel.jsx', 'utf8');
const feedbackGate = fs.readFileSync('src/utils/feedbackDuplicationGate.js', 'utf8');
const globalCss = fs.readFileSync('src/index.css', 'utf8');
const pearlCss = fs.readFileSync('src/components/tusPearlCards.css', 'utf8');

assert(feedbackPanel.includes('eyebrow="TUS işareti"'), 'TUS işareti eyebrow yeni spot-note yapısında yok.');
assert(feedbackPanel.includes('title="Hap bilgi"'), 'Hap bilgi başlığı yeni spot-note yapısında yok.');
assert(feedbackPanel.includes('spot-note-insight-list'), 'Uzun anahtarlar için madde listesi alanı yok.');
assert(!/exam-note-pearl[^\n]+<GlossaryText/u.test(feedbackPanel), 'TUS işareti spot cümlesinde glossary highlight hâlâ çalışıyor.');
assert(feedbackGate.includes('cleanInsightList'), 'Uzun keywordleri chip yerine maddeye taşıyan gate yok.');
assert(feedbackGate.includes('keyPoints'), 'Feedback gate keyPoints üretmiyor.');
assert(globalCss.includes('Global visual-emphasis reset'), 'Global highlight reset CSS bloğu yok.');
assert(globalCss.includes('.keyword-badge'), 'Global keyword badge tokenı yok.');
assert(globalCss.includes('box-decoration-break: slice'), 'Parçalı highlight şeritlerini kapatan box-decoration reset yok.');
assert(pearlCss.includes('Final global chip/highlight normalization'), 'TUS pearl yüzeyleri için final chip/highlight normalization yok.');

console.log('Highlight standard QA passed: no paragraph highlight strips, compact chips, insight list enabled.');
