// Neutral stub: legacy topic pools removed.
// Branch selection is only an upper-level field, not a hidden topic steering system.
export const AI_QUESTION_TYPE_POOL = ['TUS sorusu'];
export const AI_TOPIC_POOLS = Object.freeze({});
export function normalizeBranchKey(value = '') {
  return String(value || 'rastgele').trim().toLocaleLowerCase('tr') || 'rastgele';
}
export function getTopicPoolForBranch() {
  return ['branşa uygun bilimsel TUS sorusu'];
}
