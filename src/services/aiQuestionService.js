import { generateAIQuestion } from '../utils/aiQuestionGenerator.js';

export async function createAIQuestion({ previousQuestionId = null, branchFilter = 'random' } = {}) {
  // Future API integration point: replace this local call with a remote AI provider.
  // Keep generateAIQuestion as safe fallback so the app never breaks without an API key.
  try {
    return {
      ok: true,
      question: generateAIQuestion({ previousQuestionId, branchFilter }),
      source: 'mock-local-generator',
    };
  } catch (error) {
    return {
      ok: false,
      question: generateAIQuestion({ previousQuestionId: null, branchFilter: 'random' }),
      source: 'mock-local-generator-fallback',
      error,
    };
  }
}
