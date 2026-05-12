export function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

export function parseJsonBody(request, maxBytes = 700_000) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > maxBytes) {
        reject(new Error('Request body too large'));
        request.destroy();
      }
    });
    request.on('end', () => {
      if (!body) return resolve({});
      try { return resolve(JSON.parse(body)); } catch (error) { return reject(error); }
    });
    request.on('error', reject);
  });
}

export function parseModelJson(text = '') {
  const value = String(text || '').trim();
  if (!value) throw new Error('Empty AI response');
  try { return JSON.parse(value); } catch {}
  const fenced = value.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  if (fenced) return JSON.parse(fenced);
  const first = value.indexOf('{');
  const last = value.lastIndexOf('}');
  if (first >= 0 && last > first) return JSON.parse(value.slice(first, last + 1));
  throw new Error('AI response is not valid JSON');
}

function extractChatText(data) {
  return data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || '';
}

function extractResponsesText(data) {
  if (typeof data?.output_text === 'string') return data.output_text;
  const parts = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === 'output_text' && content?.text) parts.push(content.text);
      if (content?.type === 'text' && content?.text) parts.push(content.text);
    }
  }
  return parts.join('\n');
}

export async function callOpenAIJson({ systemPrompt, userPrompt, maxTokens = 2500, temperature = 0.2 } = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const error = new Error('OPENAI_API_KEY is not configured');
    error.code = 'missing_api_key';
    throw error;
  }
  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
  const provider = process.env.AI_PROVIDER || 'openai';
  if (provider !== 'openai') {
    const error = new Error(`Unsupported AI_PROVIDER: ${provider}`);
    error.code = 'unsupported_provider';
    throw error;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Number(process.env.AI_TIMEOUT_MS || 45_000));
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature,
        response_format: { type: 'json_object' },
        max_completion_tokens: maxTokens,
      }),
    });
    if (!response.ok) {
      const details = await response.text();
      const error = new Error(`OpenAI ${response.status}: ${details.slice(0, 300)}`);
      error.status = response.status;
      throw error;
    }
    const data = await response.json();
    const text = extractChatText(data) || extractResponsesText(data);
    return { json: parseModelJson(text), model: data.model || model };
  } finally {
    clearTimeout(timeout);
  }
}

export function validateQuestionsShape(output = {}) {
  const questions = Array.isArray(output.questions) ? output.questions : [];
  const errors = [];
  if (questions.length !== 10) errors.push('Tam 10 soru yok.');
  questions.forEach((question, index) => {
    if (!Array.isArray(question.options) || question.options.length !== 5) errors.push(`${index + 1}. soruda 5 seçenek yok.`);
    if (!['A', 'B', 'C', 'D', 'E'].includes(String(question.correctOptionId || ''))) errors.push(`${index + 1}. soruda correctOptionId geçersiz.`);
    ['A', 'B', 'C', 'D', 'E'].forEach((id) => {
      const feedback = String(question.optionFeedback?.[id] || '').trim();
      if (!feedback || feedback.length < 18 || /^(yanlış|doğru|bu seçenek doğrudur)\.?$/iu.test(feedback)) errors.push(`${index + 1}. soruda ${id} feedback zayıf.`);
      if (/\b[NHnm]\.?\s*$/u.test(feedback) || /\bN\.\s/u.test(feedback)) errors.push(`${index + 1}. soruda kısaltılmış anatomi feedbacki var.`);
    });
  });
  return { ok: errors.length === 0, errors };
}

export function validateFlashcardsShape(output = {}) {
  const cards = Array.isArray(output.cards) ? output.cards : [];
  const errors = [];
  if (!cards.length) errors.push('Kart listesi boş.');
  cards.forEach((card, index) => {
    if (!String(card.front || '').trim().endsWith('?')) errors.push(`${index + 1}. kart önü aktif soru değil.`);
    if (!String(card.back || '').trim()) errors.push(`${index + 1}. kart arkası boş.`);
    if (!String(card.explanation || '').trim()) errors.push(`${index + 1}. kart açıklaması boş.`);
  });
  return { ok: errors.length === 0, errors };
}

export function validateLessonShape(output = {}) {
  const errors = [];
  if (!String(output.title || '').trim()) errors.push('Ders başlığı yok.');
  if (!Array.isArray(output.sections) || output.sections.length === 0) errors.push('Ders bölümleri yok.');
  if (String(output.overview || '').length < 30) errors.push('Genel bakış çok kısa.');
  return { ok: errors.length === 0, errors };
}
