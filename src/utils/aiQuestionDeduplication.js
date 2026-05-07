export {
  attachQuestionDedupeFields,
  buildEmbeddedCaseFingerprints,
  buildQuestionContentSignature,
  buildQuestionFingerprint,
  createAIQuestionId,
  findEmbeddedCaseOverlap,
  getQuestionCorrectText,
  getQuestionOptionTexts,
  isDuplicateAgainstRecentContext,
  makeGenerationSignature,
  makeGenerationTopicSignature,
  makeOptionSetSignature,
  resetSessionGeneratedQuestionIdsForTests,
  similarityScore,
  tokenizeContent,
  toPlainText,
  validateQuestionNovelty,
} from './questionDeduplication.js';

export { normalizeQuestionText, stableHash } from './aiQuestionHistory.js';
