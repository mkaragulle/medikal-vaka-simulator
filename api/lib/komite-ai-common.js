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


function flattenText(value) {
  try { return JSON.stringify(value || {}); } catch { return String(value || ''); }
}

function findGlobalQualityErrors(output = {}) {
  const text = flattenText(output);
  const errors = [];
  const bannedPatterns = [
    [/materyaldeki ilişkili kavram/iu, 'Anlamsız “materyaldeki ilişkili kavram” etiketi var.'],
    [/slayt\s*→/iu, 'Slayt ok işaretli ham içerik var.'],
    [/sayfa\s*→/iu, 'Sayfa ok işaretli ham içerik var.'],
    [/\b\w+\.(pdf|pptx|ppt|docx)\b/iu, 'Ham dosya adı öğretim içeriğine girmiş.'],
    [/prof\.?\s*dr\.?|doç\.?\s*dr\.?|öğr\.?\s*gör\.?/iu, 'Öğretim üyesi adı/unvanı içerik alanına girmiş olabilir.'],
  ];
  bannedPatterns.forEach(([pattern, message]) => { if (pattern.test(text)) errors.push(message); });
  const genericCount = (text.match(/klinik bağlamda değerlendirilir|materyal kapsamında önemlidir|bu konu sınavlarda sorulabilir|öğrenciler için önemlidir/giu) || []).length;
  if (genericCount >= 3) errors.push('Tekrarlayan jenerik dolgu ifadeler var.');
  return errors;
}

function hasDateLikeText(value = '') {
  return /\b(19|20)\d{2}\b|\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b/u.test(String(value || ''));
}

export function validateQuestionsShape(output = {}) {
  const questions = Array.isArray(output.questions) ? output.questions : [];
  const errors = findGlobalQualityErrors(output);
  if (questions.length !== 10) errors.push('Tam 10 soru yok.');
  questions.forEach((question, index) => {
    if (!Array.isArray(question.options) || question.options.length !== 5) errors.push(`${index + 1}. soruda 5 seçenek yok.`);
    const optionIds = (question.options || []).map((option) => String(option.id || '').trim()).sort().join('');
    if (optionIds && optionIds !== 'ABCDE') errors.push(`${index + 1}. soruda A-E seçenek kimlikleri eksik veya hatalı.`);
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
  const deck = output.deck?.cards ? output.deck : output;
  const cards = Array.isArray(deck.cards) ? deck.cards : [];
  const errors = findGlobalQualityErrors(output);
  if (cards.length < 8) errors.push('Yeterli kart yok.');
  cards.forEach((card, index) => {
    const front = String(card.front || '').trim();
    const explanation = String(card.explanation || '').trim();
    if (!front.endsWith('?')) errors.push(`${index + 1}. kart önü aktif soru değil.`);
    if (/Materyalde geçen|Bu kart|slaytta geçen|ayrıştırılan gerçek metne dayanır/iu.test(`${front} ${explanation}`)) errors.push(`${index + 1}. kart meta veya kopya ifade içeriyor.`);
    const back = String(card.back || '').trim();
    if (!back) errors.push(`${index + 1}. kart arkası boş.`);
    if (back.split(/\s+/).length < 3) errors.push(`${index + 1}. kart arkası keyword-only görünüyor.`);
    if (!explanation) errors.push(`${index + 1}. kart açıklaması boş.`);
  });
  return { ok: errors.length === 0, errors };
}

export function validateLessonShape(output = {}, context = {}) {
  const errors = findGlobalQualityErrors(output);
  const sections = Array.isArray(output.sections) && output.sections.length ? output.sections : (Array.isArray(output.lessonSections) ? output.lessonSections : output.coreExplanation);
  const title = String(output.title || output.academicTitle || '').trim();
  if (!title) errors.push('Ders başlığı yok.');
  if (/\.(pdf|pptx|ppt|docx)$/iu.test(title) || /(^|[\s_-])\d{4}([\s_-]|$)/u.test(title)) errors.push('Ders başlığı ham dosya adı/tarih gibi görünüyor.');
  if (!Array.isArray(sections) || sections.length === 0) errors.push('Ders bölümleri yok.');
  if (String(output.shortIntro || output.overview || output.shortOverview || '').length < 30) errors.push('Genel bakış çok kısa.');
  const objectives = Array.isArray(output.learningObjectives) ? output.learningObjectives : [];
  if (objectives.length < 4 || objectives.length > 8) errors.push('Öğrenme hedefleri 4-8 aralığında değil.');
  objectives.forEach((objective, index) => {
    const objectiveText = String(objective || '');
    if (hasDateLikeText(objectiveText)) errors.push(`${index + 1}. öğrenme hedefinde tarih var.`);
    if (/prof\.?|doç\.?|öğr\.?|\.(pdf|pptx|ppt|docx)/iu.test(objectiveText)) errors.push(`${index + 1}. öğrenme hedefinde metadata var.`);
  });
  const bigPicture = String(output.bigPicture || '').replace(/\s+/g, ' ').trim();
  if (!bigPicture) errors.push('Büyük resim alanı yok veya boş.');
  if (bigPicture.length < 260) errors.push('Büyük resim çok kısa veya jenerik.');
  const filesUploadedCount = Number(context.filesUploadedCount || 0);
  const filesAnalyzedCount = Number(output.sourceCoverage?.filesAnalyzedCount || output.sourceCoverage?.filesAnalyzed || 0);
  if (filesUploadedCount > 1 && filesAnalyzedCount <= 1) errors.push('Çoklu dosya yüklendiği halde çıktı tek dosya kapsamı gösteriyor.');
  const sectionDepthText = (section = {}) => [section.teachingText, section.content, section.whyItMatters, section.examAngle, section.examConnection, section.commonTrap, section.commonMistake, Array.isArray(section.mechanismFlow) ? section.mechanismFlow.join(' ') : ''].filter(Boolean).join(' ');
  const shallowSections = (sections || []).filter((section) => sectionDepthText(section).trim().split(/\s+/).filter(Boolean).length < 55);
  if ((sections || []).length && shallowSections.length / (sections || []).length > 0.35) errors.push('Ders bölümlerinin çoğu yeterince derin değil.');
  const qualityCheck = output.qualityCheck || {};
  if (filesUploadedCount > 1 && qualityCheck.usesAllFiles === false) errors.push('qualityCheck usesAllFiles=false döndü.');
  const text = JSON.stringify(output || {});
  if ((text.match(/Klinik bağlantı|Sınav bağlantısı/g) || []).length > 14) errors.push('Ders şablon tekrarı içeriyor.');
  return { ok: errors.length === 0, errors };
}
