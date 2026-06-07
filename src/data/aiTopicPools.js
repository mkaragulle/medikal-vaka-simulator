// V419: Hidden branch-specific topic pools are intentionally disabled.
// Branch selection must only choose the broad medical branch, not a preselected subtopic.

export const AI_QUESTION_TYPE_POOL = [
  'diagnosis',
  'diagnostic_test',
  'confirmation_test',
  'first_step',
  'next_step',
  'treatment',
  'mechanism',
  'expected_finding',
  'unexpected_finding',
  'contraindication',
  'complication',
  'prognosis',
  'lab_interpretation',
  'imaging_interpretation',
  'anatomy_localization',
  'embryology_defect',
];

export const AI_TOPIC_POOLS = Object.freeze({
  'tus-spot-olgular': ['Serbest TUS konusu'],
});

export function normalizeBranchKey(value = '') {
  const text = String(value || '').toLocaleLowerCase('tr').trim();
  const map = {
    rastgele: 'tus-spot-olgular',
    random: 'tus-spot-olgular',
    pediatri: 'pediatrics',
    'çocuk sağlığı ve hastalıkları': 'pediatrics',
    'cocuk sagligi ve hastaliklari': 'pediatrics',
    'kadın hastalıkları ve doğum': 'obstetrics-gynecology',
    'kadin hastaliklari ve dogum': 'obstetrics-gynecology',
    dahiliye: 'internal-medicine',
    'iç hastalıkları': 'internal-medicine',
    'ic hastaliklari': 'internal-medicine',
    cerrahi: 'general-surgery',
    'genel cerrahi': 'general-surgery',
    mikrobiyoloji: 'medical-microbiology',
    'tıbbi mikrobiyoloji': 'medical-microbiology',
    'tibbi mikrobiyoloji': 'medical-microbiology',
    farmakoloji: 'medical-pharmacology',
    'tıbbi farmakoloji': 'medical-pharmacology',
    'tibbi farmakoloji': 'medical-pharmacology',
    biyokimya: 'medical-biochemistry',
    'tıbbi biyokimya': 'medical-biochemistry',
    'tibbi biyokimya': 'medical-biochemistry',
    patoloji: 'medical-pathology',
    'tıbbi patoloji': 'medical-pathology',
    'tibbi patoloji': 'medical-pathology',
    fizyoloji: 'physiology',
    anatomi: 'anatomy',
    'histoloji ve embriyoloji': 'histology-embryology',
    'küçük stajlar': 'minor-rotations',
    'kucuk stajlar': 'minor-rotations',
  };
  return map[text] || text || 'tus-spot-olgular';
}

export function getTopicPoolForBranch() {
  return AI_TOPIC_POOLS['tus-spot-olgular'];
}
