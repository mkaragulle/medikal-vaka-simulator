import { Readable } from 'node:stream';
import handler from '../api/generate-ai-question.js';

function callEndpoint(body = {}) {
  return new Promise((resolve, reject) => {
    const req = new Readable({
      read() {
        this.push(JSON.stringify(body));
        this.push(null);
      },
    });
    req.method = 'POST';
    const chunks = [];
    const res = {
      statusCode: 0,
      headers: {},
      setHeader(key, value) { this.headers[key] = value; },
      end(data) {
        chunks.push(String(data || ''));
        try {
          resolve({ status: this.statusCode, payload: JSON.parse(chunks.join('')) });
        } catch (error) {
          reject(error);
        }
      },
    };
    handler(req, res).catch(reject);
  });
}

const result = await callEndpoint({ branchFilter: 'Nöroloji', recentQuestionSummaries: [] });
if (result.status !== 200) throw new Error(`Unexpected status ${result.status}`);
if (!result.payload?.ok || !result.payload?.question) throw new Error('Endpoint did not return a question');
const question = result.payload.question;
if (!question.diagnosis?.correct) throw new Error('Correct answer is missing');
if (!Array.isArray(question.diagnosis?.options) || question.diagnosis.options.length !== 5) throw new Error('Five options are required');
if (!question.diagnosis.options.includes(question.diagnosis.correct)) throw new Error('Correct answer is not inside options');
if (!Array.isArray(question.diagnosis?.answerFeedback?.evidenceChain) || question.diagnosis.answerFeedback.evidenceChain.length < 3) throw new Error('Evidence chain is too short');
console.log('AI reset smoke test passed:', question.relatedBranch, '-', question.title);
