const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

const AI_QUESTION_JSON_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'id',
    'source',
    'caseType',
    'title',
    'relatedBranch',
    'difficulty',
    'learningTarget',
    'demographics',
    'setting',
    'chiefComplaint',
    'stem',
    'findings',
    'question',
    'options',
    'correctAnswer',
    'explanation',
    'wrongOptionFeedback',
    'evidenceChain',
    'examPearl',
    'managementSteps',
    'nextQuestionSeed',
  ],
  properties: {
    id: { type: 'string' },
    source: { type: 'string', enum: ['real-ai'] },
    caseType: { type: 'string', enum: ['ai-spot'] },
    title: { type: 'string' },
    relatedBranch: { type: 'string' },
    difficulty: { type: 'string' },
    learningTarget: { type: 'string' },
    demographics: { type: 'string' },
    setting: { type: 'string' },
    chiefComplaint: { type: 'string' },
    stem: { type: 'string' },
    findings: {
      type: 'object',
      additionalProperties: false,
      required: ['history', 'exam', 'vitals', 'investigations'],
      properties: {
        history: { type: 'array', items: { type: 'string' } },
        exam: { type: 'array', items: { type: 'string' } },
        vitals: {
          type: 'object',
          additionalProperties: false,
          required: ['TA', 'Nabız', 'Solunum', 'Ateş', 'SpO₂'],
          properties: {
            TA: { type: 'string' },
            'Nabız': { type: 'string' },
            Solunum: { type: 'string' },
            'Ateş': { type: 'string' },
            'SpO₂': { type: 'string' },
          },
        },
        investigations: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['id', 'label', 'type', 'priority', 'summary', 'findings', 'rows'],
            properties: {
              id: { type: 'string' },
              label: { type: 'string' },
              type: { type: 'string' },
              priority: { type: 'string' },
              summary: { type: 'string' },
              findings: { type: 'array', items: { type: 'string' } },
              rows: {
                type: 'array',
                items: {
                  type: 'array',
                  items: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    question: { type: 'string' },
    options: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'text'],
        properties: {
          id: { type: 'string', enum: OPTION_IDS },
          text: { type: 'string' },
        },
      },
    },
    correctAnswer: { type: 'string', enum: OPTION_IDS },
    explanation: { type: 'string' },
    wrongOptionFeedback: {
      type: 'object',
      additionalProperties: false,
      required: OPTION_IDS,
      properties: Object.fromEntries(OPTION_IDS.map((id) => [id, { type: 'string' }])),
    },
    evidenceChain: { type: 'array', items: { type: 'string' } },
    examPearl: { type: 'string' },
    managementSteps: { type: 'array', items: { type: 'string' } },
    nextQuestionSeed: { type: 'string' },
  },
};

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

function parseJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error('Request body too large'));
        request.destroy();
      }
    });
    request.on('end', () => {
      if (!body) return resolve({});
      try {
        return resolve(JSON.parse(body));
      } catch (error) {
        return reject(error);
      }
    });
    request.on('error', reject);
  });
}

function extractJsonFromText(text = '') {
  const trimmed = String(text || '').trim();
  if (trimmed.startsWith('{')) return JSON.parse(trimmed);
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return JSON.parse(fenced[1].trim());
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start >= 0 && end > start) return JSON.parse(trimmed.slice(start, end + 1));
  throw new Error('No JSON object found in model response');
}

function extractOpenAIText(payload = {}) {
  if (typeof payload.output_text === 'string' && payload.output_text.trim()) return payload.output_text;
  const chunks = [];
  (payload.output || []).forEach((item) => {
    (item.content || []).forEach((content) => {
      if (typeof content.text === 'string') chunks.push(content.text);
      if (typeof content.output_text === 'string') chunks.push(content.output_text);
    });
  });
  const text = chunks.join('\n').trim();
  if (!text) throw new Error('OpenAI response did not contain output_text');
  return text;
}

const REMOTE_FORBIDDEN_TEXT_PATTERNS = [
  /Morfolojik patern\s*[.:]\s*Morfolojik patern/iu,
  /Morfolojik patern\s*[:：]/iu,
  /karar verdirici paternyla/iu,
  /likefaksiyon nekrozuyla/iu,
  /kısa TUS pratiğinde ele alınır/iu,
  /Klinik değerlendirme için ek veri/iu,
  /Objektif karar verisi/iu,
  /verilen öğrenme hedefi/iu,
  /yanıt ekseni/iu,
  /öğrenci ayırt eder/iu,
  /Sonuçlar tek bir tanı adını yazmaz/iu,
  /Patern ve mekanizma birlikte yorumlanmalıdır/iu,
  /dikkat çeker\.\s*$/iu,
  /tanısını\.\s*$/iu,
];

function collectText(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectText(item, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectText(item, out));
  return out;
}

function validateRemoteEditorialQuality(question = {}) {
  const errors = [];
  const texts = collectText(question);
  texts.forEach((text) => {
    const normalized = String(text || '').replace(/\s+/g, ' ').trim();
    if (!normalized) return;
    REMOTE_FORBIDDEN_TEXT_PATTERNS.forEach((pattern) => {
      if (pattern.test(normalized)) errors.push(`forbidden editorial text: ${normalized.slice(0, 120)}`);
    });
    if (/\b([A-Za-zÇĞİÖŞÜçğıöşü]{4,})\b[.!?]?\s+\1\b/iu.test(normalized)) {
      errors.push(`repeated text: ${normalized.slice(0, 120)}`);
    }
  });
  const investigations = question?.findings?.investigations || question?.investigations || [];
  investigations.forEach((item, index) => {
    const label = String(item?.label || '').trim();
    const summary = String(item?.summary || '').trim();
    const rows = Array.isArray(item?.rows) ? item.rows : [];
    if (/laboratuvar|lab/i.test(label) && rows.length === 0 && !/\d|pozitif|negatif|saptandı|saptanmadı|üreme/i.test(summary)) {
      errors.push(`placeholder lab investigation at ${index + 1}`);
    }
  });
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)) };
}

function validateRawQuestion(question = {}) {
  const errors = [];
  const options = Array.isArray(question.options) ? question.options : [];
  const correctAnswer = String(question.correctAnswer || '').trim().toUpperCase();
  const optionIds = new Set(options.map((option) => String(option.id || '').toUpperCase()));

  if (!question.title) errors.push('title missing');
  if (!question.stem || String(question.stem).length < 40) errors.push('stem missing or too short');
  if (!question.question || String(question.question).length < 16) errors.push('question missing or too short');
  if (options.length !== 5) errors.push('exactly 5 options required');
  if (!OPTION_IDS.includes(correctAnswer) || !optionIds.has(correctAnswer)) errors.push('correctAnswer must match A-E option id');
  if (!question.explanation || String(question.explanation).length < 60) errors.push('explanation missing or too short');
  if (!Array.isArray(question.evidenceChain) || question.evidenceChain.length < 3) errors.push('evidenceChain requires at least 3 items');
  if (!question.examPearl) errors.push('examPearl missing');

  const wrong = question.wrongOptionFeedback || {};
  options.forEach((option) => {
    const id = String(option.id || '').toUpperCase();
    if (id !== correctAnswer && !wrong[id]) errors.push(`wrong feedback missing for ${id}`);
  });

  return { ok: errors.length === 0, errors };
}

function buildPrompt({ branchFilter = 'Rastgele', recentQuestionSummaries = [], attempt = 1, antiRepeatNonce = '' }) {
  const recentList = recentQuestionSummaries
    .slice(0, 22)
    .map((item, index) => `${index + 1}. ${item.branch || 'TUS'} | başlık: ${item.title || ''} | doğru: ${item.correct || ''}`)
    .join('\n');

  const forbiddenTopics = recentQuestionSummaries
    .slice(0, 22)
    .map((item) => [item.title, item.correct].filter(Boolean).join(' / '))
    .filter(Boolean)
    .join('; ');

  return `Sen KlinikIQ için çalışan kıdemli TUS soru yazarı ve medikal eğitim içerik denetleyicisisin.

Görev: Tek bir yeni TUS odaklı, kısa klinik spot soru üret. Soru Türkçe olmalı, bilimsel olarak doğru olmalı ve JSON dışında hiçbir açıklama döndürmemelisin.

Branş isteği: ${branchFilter || 'Rastgele'}
Üretim denemesi: ${attempt}
Çeşitlilik anahtarı: ${antiRepeatNonce || Date.now()}

Yakın zamanda üretilen sorular:
${recentList || 'Henüz yok.'}

YASAK konu/doğru cevap listesi:
${forbiddenTopics || 'Henüz yok.'}

Kesin kurallar:
- Yakın listedeki konu, başlık, doğru cevap, klinik odak veya aynı serolojik/tetkik paternini tekrar etme.
- Yasak listedeki hastalık, mekanizma, antidot, enzim, seroloji paterni, ilaç etki mekanizması veya doğru cevabı yeniden kullanma.
- Aynı hastalık kullanılacaksa soru açısı kesin değişsin: tanı yerine ilk tedavi, tetkik yorumu, komplikasyon, mekanizma veya yönetim basamağı sor.
- Deneme 2 veya 3 ise önceki denemeden tamamen farklı branş alt konusu ve farklı doğru cevap seç.
- Tek bir ana klinik odak olsun.
- 5 seçenek üret: A, B, C, D, E.
- Tüm seçenekler aynı kategori içinde olsun; tanı sorusunda tanılar, tedavi sorusunda tedaviler, tetkik sorusunda tetkikler.
- En az iki güçlü, klinik olarak yakın seçenek olsun.
- Tetkik sonucunda doğru tanı/cevap cümle olarak yazılmasın.
- Tetkik yorumu “... tanısını doğrular”, “... ile uyumludur”, “kesin tanıdır” gibi direkt tanı dili kullanmasın.
- Sayısal laboratuvar/tetkik sonucu yazarsan rows alanı zorunludur: ["Parametre", "Sonuç + birim", "Referans", "Durum"].
- “Lökosit 15”, “CRP yüksek”, “D-dimer yüksek”, “Troponin pozitif”, “pH düşük” gibi birimsiz veya referanssız sonuç yazma.
- Her sayısal laboratuvar sonucunda birim ve referans aralığı bulunmalıdır. Örnek: Lökosit 15.000/mm³, referans 4.000–10.000/mm³, durum Yüksek.
- Nitel sonuçlarda referans “negatif”, “üreme olmamalı”, “saptanmamalı” veya “normal iletim” gibi beklenen değerle yazılmalıdır.
- Doğru cevap, verilen objektif veriler yorumlanarak bulunmalı.
- Her yanlış seçenek için neden yanlış olduğuna dair kısa ama öğretici feedback yaz; yanlış şık neyi yakalar, neyi kaçırır ve hangi ipucuyla elenir açık olsun.
- explanation 2-4 cümlelik Klinik Gerekçe kalitesinde olmalı.
- evidenceChain 3-5 somut olgu ipucundan oluşmalı; meta cümle veya öğrenme çıktısı yazma.
- examPearl TUS hap bilgisi olmalı; mümkünse kırmızı bayrak, sık tuzak, ilk adım veya ayırt ettirici marker vurgula.
- managementSteps 2-4 kısa ilk yaklaşım/yönetim basamağı içermeli; temel bilim sorusunda mekanistik yaklaşım notu gibi yaz.
- Şu ifadeleri asla yazma: "Morfolojik patern:", "Morfolojik patern. Morfolojik patern", "karar verdirici paternyla", "likefaksiyon nekrozuyla", "kısa TUS pratiğinde ele alınır", "Klinik değerlendirme için ek veri", "Objektif karar verisi", "verilen öğrenme hedefi", "yanıt ekseni".
- Temel bilim/mekanizma sorusunda gerçek objektif veri yoksa findings.investigations boş dizi olsun; "Laboratuvar" placeholder kartı üretme.
- Patoloji sorularında teori cümlesini laboratuvar sonucu gibi gösterme. Gerekirse yalnız histopatolojik değerlendirme kullan.
- Ayırt ettirici ipuçları ve evidenceChain madde metinlerinde "Etiket: açıklama" yapısı kullanma; doğrudan doğal cümle yaz.
- JSON şemasındaki tüm alanları doldur. source her zaman "real-ai", caseType her zaman "ai-spot" olsun.
- wrongOptionFeedback içinde A, B, C, D, E anahtarlarının tamamı bulunsun; doğru seçenek için de kısa doğru gerekçesi yazabilirsin.`;
}

async function callOpenAIQuestion(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const maxOutputTokens = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 2600);
  const requestBody = {
    model,
    input: [
      {
        role: 'system',
        content: 'You produce medically accurate Turkish TUS-style exam questions as strict JSON. Never include explanations outside JSON.',
      },
      { role: 'user', content: prompt },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'klinikiq_ai_spot_question',
        strict: true,
        schema: AI_QUESTION_JSON_SCHEMA,
      },
    },
    max_output_tokens: maxOutputTokens,
    store: false,
  };

  if (process.env.OPENAI_TEMPERATURE) requestBody.temperature = Number(process.env.OPENAI_TEMPERATURE);
  if (process.env.OPENAI_TOP_P) requestBody.top_p = Number(process.env.OPENAI_TOP_P);

  const openAIResponse = await fetch(`${baseUrl}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!openAIResponse.ok) {
    const errorText = await openAIResponse.text();
    const error = new Error(`OpenAI request failed with ${openAIResponse.status}: ${errorText.slice(0, 500)}`);
    error.status = openAIResponse.status;
    throw error;
  }

  const data = await openAIResponse.json();
  const modelText = extractOpenAIText(data);
  const question = extractJsonFromText(modelText);
  question.id = `ai-generated-openai-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  question.source = 'real-ai';
  question.provider = 'openai';
  return question;
}

async function callGeminiQuestion(prompt) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      generationConfig: {
        temperature: 0.92,
        topP: 0.92,
        maxOutputTokens: 2400,
        responseMimeType: 'application/json',
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!geminiResponse.ok) {
    const errorText = await geminiResponse.text();
    const error = new Error(`Gemini request failed with ${geminiResponse.status}: ${errorText.slice(0, 500)}`);
    error.status = geminiResponse.status;
    throw error;
  }

  const data = await geminiResponse.json();
  const modelText = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('\n') || '';
  const question = extractJsonFromText(modelText);
  question.id = `ai-generated-gemini-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  question.source = 'real-ai';
  question.provider = 'gemini';
  return question;
}

function selectProviderStatus() {
  return {
    hasOpenAI: Boolean(process.env.OPENAI_API_KEY),
    hasGemini: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY),
  };
}

async function generateWithAvailableProvider(prompt) {
  const providerStatus = selectProviderStatus();
  const preferred = String(process.env.AI_PROVIDER || 'openai').toLowerCase();
  const providerOrder = preferred === 'gemini' ? ['gemini', 'openai'] : ['openai', 'gemini'];
  const errors = [];

  for (const provider of providerOrder) {
    try {
      if (provider === 'openai' && providerStatus.hasOpenAI) return await callOpenAIQuestion(prompt);
      if (provider === 'gemini' && providerStatus.hasGemini) return await callGeminiQuestion(prompt);
    } catch (error) {
      errors.push(`${provider}: ${error?.message || error}`);
    }
  }

  if (!providerStatus.hasOpenAI && !providerStatus.hasGemini) {
    const error = new Error('Missing server-side AI API key. Set OPENAI_API_KEY or GEMINI_API_KEY in the deployment environment.');
    error.status = 503;
    throw error;
  }

  const error = new Error(errors.join(' | ') || 'Remote AI providers failed');
  error.status = 502;
  throw error;
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== 'POST') {
    return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  }

  try {
    const body = await parseJsonBody(request);
    const prompt = buildPrompt(body);
    const question = await generateWithAvailableProvider(prompt);

    const validation = validateRawQuestion(question);
    const editorialValidation = validateRemoteEditorialQuality(question);
    if (!editorialValidation.ok) {
      return sendJson(response, 422, {
        ok: false,
        error: 'Model response failed editorial validation',
        provider: question.provider || 'remote-ai',
        validationErrors: editorialValidation.errors,
      });
    }

    if (!validation.ok) {
      return sendJson(response, 422, {
        ok: false,
        error: 'Model response failed schema validation',
        provider: question.provider || 'remote-ai',
        validationErrors: validation.errors,
      });
    }

    return sendJson(response, 200, {
      ok: true,
      provider: question.provider || 'remote-ai',
      question,
    });
  } catch (error) {
    const status = error?.status && Number(error.status) >= 400 ? Number(error.status) : 500;
    return sendJson(response, status, {
      ok: false,
      error: error?.message || 'AI question generation failed',
    });
  }
}
