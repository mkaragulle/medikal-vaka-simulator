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

function getJsonCandidateFromText(text = '') {
  const trimmed = String(text || '').trim();
  if (!trimmed) return '';
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

function extractJsonFromText(text = '') {
  const candidate = getJsonCandidateFromText(text);
  if (!candidate) throw new Error('No JSON object found in model response');
  return JSON.parse(candidate);
}

function summarizeJsonParseError(error) {
  const message = String(error?.message || error || 'JSON parse failed');
  return message.replace(/\s+/g, ' ').slice(0, 220);
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


function extractChatCompletionText(payload = {}, providerName = 'chat-completion-provider') {
  const message = payload?.choices?.[0]?.message;
  const content = message?.content;

  if (typeof content === 'string' && content.trim()) return content;

  if (Array.isArray(content)) {
    const text = content
      .map((part) => {
        if (typeof part === 'string') return part;
        if (typeof part?.text === 'string') return part.text;
        if (typeof part?.content === 'string') return part.content;
        return '';
      })
      .join('\n')
      .trim();
    if (text) return text;
  }

  const fallbackText = [message?.reasoning, message?.reasoning_content]
    .filter((item) => typeof item === 'string' && item.trim())
    .join('\n')
    .trim();
  if (fallbackText) return fallbackText;

  throw new Error(`${providerName} response did not contain message.content`);
}

function parseBooleanEnv(name, defaultValue = false) {
  const value = process.env[name];
  if (value === undefined || value === null || value === '') return defaultValue;
  return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase());
}

function parseCsvEnv(name) {
  return String(process.env[name] || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function getJsonContractPrompt() {
  return `
Zorunlu JSON kontratı:
{
  "id": "string",
  "source": "real-ai",
  "caseType": "ai-spot",
  "title": "string",
  "relatedBranch": "string",
  "difficulty": "string",
  "learningTarget": "string",
  "demographics": "string",
  "setting": "string",
  "chiefComplaint": "string",
  "stem": "string",
  "findings": {
    "history": ["string"],
    "exam": ["string"],
    "vitals": { "TA": "string", "Nabız": "string", "Solunum": "string", "Ateş": "string", "SpO₂": "string" },
    "investigations": [
      {
        "id": "string",
        "label": "string",
        "type": "string",
        "priority": "karar verdirici|yardımcı|düşük öncelikli|durumsal",
        "summary": "string",
        "findings": ["string"],
        "rows": [["Parametre", "Sonuç + birim", "Referans", "Durum"]]
      }
    ]
  },
  "question": "string",
  "options": [
    { "id": "A", "text": "string" },
    { "id": "B", "text": "string" },
    { "id": "C", "text": "string" },
    { "id": "D", "text": "string" },
    { "id": "E", "text": "string" }
  ],
  "correctAnswer": "A|B|C|D|E",
  "explanation": "string",
  "wrongOptionFeedback": { "A": "string", "B": "string", "C": "string", "D": "string", "E": "string" },
  "evidenceChain": ["string", "string", "string"],
  "examPearl": "string",
  "managementSteps": ["string", "string"],
  "nextQuestionSeed": "string"
}
JSON dışında tek karakter bile yazma.`;
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
  errors.push(...validateRemoteClinicalCoherence(question));
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)) };
}

function normalizeRemoteText(text = '') {
  return String(text || '')
    .toLocaleLowerCase('tr')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9/% ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function validateRemoteClinicalCoherence(question = {}) {
  const errors = [];
  const texts = collectText(question);
  const bundle = normalizeRemoteText(texts.join(' '));
  const correctOption = (question.options || []).find((option) => String(option.id || '').toUpperCase() === String(question.correctAnswer || '').toUpperCase());
  const correct = normalizeRemoteText(correctOption?.text || '');
  const asksManagement = /ilk|tedavi|yonetim|yaklasim|acil|mudahale|ilac/.test(normalizeRemoteText(`${question.question || ''} ${question.learningTarget || ''}`));
  const isPerioperativeAnaphylaxis = /anestezi|ameliyathane|perioperatif|induksiyon|cerrahi|monitorize/.test(bundle)
    && /anafil|bronkospazm|hipotansiyon|urtiker|spo/.test(bundle);
  if (isPerioperativeAnaphylaxis && asksManagement) {
    const hasBundle = /tetikleyici|ajan.*durdur|oksijen|hava yolu|sivi|kristaloid|adrenalin|epinefrin|iv/.test(correct)
      && /adrenalin|epinefrin/.test(correct)
      && /oksijen|hava yolu/.test(correct)
      && /sivi|kristaloid|iv/.test(correct);
    const isOnlyIm = /im|intramuskuler|kas ici/.test(correct) && !/iv|oksijen|sivi|tetikleyici|hava yolu|hemodinamik/.test(correct);
    if (isOnlyIm || !hasBundle) {
      errors.push('perioperative anaphylaxis answer is not context-sensitive enough');
    }
  }
  return errors;
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
- Anafilaksi sorularında bağlamı ayır: toplum/ayaktan genel anafilakside ilk hayat kurtarıcı ilaç IM adrenalin olabilir; genel anestezi altında ameliyathanede ciddi hipotansiyon ve bronkospazm varsa doğru yaklaşım tetikleyici ajanı durdurma, yüzde 100 oksijen/hava yolu güvenliği, hızlı IV kristaloid ve hemodinamik ciddiyete göre adrenalin uygulamasını birlikte içermelidir.
- Perioperatif anafilaksi yönetim sorusunda doğru cevabı tek başına IM adrenalin olarak yazma; soru tek ilaç soruyorsa kökü açıkça 'hayat kurtarıcı temel ilaç' diye sınırla.
- Fizik muayeneye laboratuvar, EKG, görüntüleme, seroloji veya kan gazı sonucu yazma; muayene yalnız inspeksiyon, palpasyon, perküsyon ve oskültasyon bulgularından oluşsun.
- 'wheezing' yerine 'hışıltılı solunum' kullan; 'Adrenalin (Epinefrin)' tekrar etme, ilk kullanımda 'adrenalin/epinefrin' yeterlidir; '1: 1000' yazma, '1:1000' veya '1 mg/mL' yaz.
- Hasta öyküsü doğal cümle olmalı; 'Nedeniyle Ameliyathane', 'Ameliyathane.' gibi kopuk parçalar yazma.
- Şu ifadeleri asla yazma: "Beklenen ana ipuçları bu tabloda baskın değildir", "Karar ... yönünde güçlenir", "Ancak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır", "Laboratuvar paterni", "Kanıt 2", "Kanıt 3", "Kanıt 4", "Objektif bulguların karar basamağını desteklemesi", "Doğru yanıta götüren ana bulgudur", "İlk karar", "Tedavi önceliği", "Bu veri klinik bağlamda değerlendirilir", "Nedeniyle Ameliyathane", "Morfolojik patern:", "Morfolojik patern. Morfolojik patern", "karar verdirici paternyla", "likefaksiyon nekrozuyla", "kısa TUS pratiğinde ele alınır", "Klinik değerlendirme için ek veri", "Objektif karar verisi", "verilen öğrenme hedefi", "yanıt ekseni".
- Temel bilim/mekanizma sorusunda gerçek objektif veri yoksa findings.investigations boş dizi olsun; "Laboratuvar" placeholder kartı üretme.
- Patoloji sorularında teori cümlesini laboratuvar sonucu gibi gösterme. Gerekirse yalnız histopatolojik değerlendirme kullan.
- Ayırt ettirici ipuçları ve evidenceChain madde metinlerinde "Etiket: açıklama" yapısı kullanma; doğrudan doğal cümle yaz.
- JSON şemasındaki tüm alanları doldur. source her zaman "real-ai", caseType her zaman "ai-spot" olsun.
- JSON değerlerini kısa tut: stem 2-4 cümle, explanation 2-4 cümle, her feedback en fazla 1-2 cümle, evidenceChain 3-4 madde, managementSteps 2-3 madde.
- JSON string değerlerinin içinde kaçışsız çift tırnak kullanma. Gerekirse tek tırnak veya parantez kullan.
- JSON çıktısını yarıda kesme; son karakter mutlaka kapanış süslü parantezi olsun.
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
  question.id = `ai-spot-real-openai-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  question.source = 'real-ai';
  question.provider = 'openai';
  return question;
}


function uniqueNonEmpty(items = []) {
  return Array.from(new Set(items.map((item) => String(item || '').trim()).filter(Boolean)));
}

function isBlockedSlowOpenRouterModel(model = '') {
  const value = String(model || '').trim().toLowerCase();
  if (!value) return false;

  const allowSlowModels = parseBooleanEnv('OPENROUTER_ALLOW_SLOW_MODELS', false);
  if (allowSlowModels) return false;

  const explicitBlockList = uniqueNonEmpty([
    ...parseCsvEnv('OPENROUTER_BLOCKED_MODELS'),
    'openai/gpt-oss-120b:free',
    'gpt-oss-120b',
  ]).map((item) => item.toLowerCase());

  return explicitBlockList.some((blocked) => value === blocked || value.includes(blocked));
}

function getOpenRouterModelCandidates() {
  const fastDefault = 'google/gemini-2.5-flash-lite';
  const primary = process.env.OPENROUTER_MODEL || fastDefault;
  const configured = [
    ...parseCsvEnv('OPENROUTER_MODELS'),
    ...parseCsvEnv('OPENROUTER_FALLBACK_MODELS'),
  ];

  const candidates = uniqueNonEmpty([primary, ...configured, fastDefault])
    .filter((model) => !isBlockedSlowOpenRouterModel(model));

  const safeCandidates = candidates.length ? candidates : [fastDefault];
  const maxAttempts = Math.max(1, Number(process.env.OPENROUTER_MAX_MODEL_ATTEMPTS || 1));
  return safeCandidates.slice(0, maxAttempts);
}

function createAbortSignal(timeoutMs) {
  if (!timeoutMs || timeoutMs <= 0 || typeof AbortController === 'undefined') {
    return { signal: undefined, cancel: () => {} };
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    cancel: () => clearTimeout(timeoutId),
  };
}

function summarizeProviderError(error) {
  const message = String(error?.message || error || 'unknown error').replace(/\s+/g, ' ').trim();
  return message.slice(0, 420);
}

async function callOpenRouterQuestion(prompt) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  const baseUrl = (process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1').replace(/\/$/, '');
  const maxTokens = Number(process.env.OPENROUTER_MAX_TOKENS || process.env.OPENROUTER_MAX_OUTPUT_TOKENS || 1700);
  const temperature = Number(process.env.OPENROUTER_TEMPERATURE || 0.55);
  const topP = Number(process.env.OPENROUTER_TOP_P || 0.85);
  const frequencyPenalty = Number(process.env.OPENROUTER_FREQUENCY_PENALTY || 0.15);
  const presencePenalty = Number(process.env.OPENROUTER_PRESENCE_PENALTY || 0.1);
  const useJsonMode = parseBooleanEnv('OPENROUTER_USE_JSON_MODE', true);
  const enableReasoning = parseBooleanEnv('OPENROUTER_REASONING_ENABLED', false);
  const excludeReasoning = parseBooleanEnv('OPENROUTER_REASONING_EXCLUDE', true);
  const perModelTimeoutMs = Number(process.env.OPENROUTER_PER_MODEL_TIMEOUT_MS || 16000);
  const modelCandidates = getOpenRouterModelCandidates();
  const systemPrompt = [
    'You are a senior Turkish medical education question writer for KlinikIQ.',
    'Return exactly one complete valid JSON object. Do not use Markdown. Do not include commentary outside JSON.',
    'Keep strings concise. Do not reveal chain-of-thought or reasoning. Put only final educational content into JSON fields.',
  ].join(' ');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const referer = process.env.OPENROUTER_SITE_URL || process.env.SITE_URL || process.env.VERCEL_URL;
  const title = process.env.OPENROUTER_APP_TITLE || 'KlinikIQ';
  if (referer) headers['HTTP-Referer'] = String(referer).startsWith('http') ? String(referer) : `https://${referer}`;
  if (title) headers['X-OpenRouter-Title'] = title;

  function buildOpenRouterBody(model, overrides = {}) {
    const body = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `${prompt}\n\n${getJsonContractPrompt()}` },
      ],
      temperature,
      top_p: topP,
      max_tokens: maxTokens,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
      ...overrides,
    };

    if (useJsonMode && overrides.response_format !== null) body.response_format = { type: 'json_object' };
    if (enableReasoning) body.reasoning = { enabled: true, exclude: excludeReasoning };
    if (overrides.response_format === null) delete body.response_format;
    return body;
  }

  async function sendOpenRouterRequest(body) {
    const { signal, cancel } = createAbortSignal(perModelTimeoutMs);
    try {
      const openRouterResponse = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal,
      });

      if (!openRouterResponse.ok) {
        const errorText = await openRouterResponse.text();
        const error = new Error(`OpenRouter request failed with ${openRouterResponse.status}: ${errorText.slice(0, 500)}`);
        error.status = openRouterResponse.status;
        error.raw = errorText;
        throw error;
      }

      return openRouterResponse.json();
    } catch (error) {
      if (error?.name === 'AbortError') {
        const timeoutError = new Error(`OpenRouter model timed out after ${perModelTimeoutMs} ms`);
        timeoutError.status = 504;
        throw timeoutError;
      }
      throw error;
    } finally {
      cancel();
    }
  }

  async function repairMalformedOpenRouterJson(rawText, parseError, repairModel) {
    if (!parseBooleanEnv('OPENROUTER_REPAIR_JSON_ON_PARSE_ERROR', true)) throw parseError;

    const candidate = getJsonCandidateFromText(rawText).slice(0, 18000);
    const selectedRepairModel = process.env.OPENROUTER_REPAIR_MODEL || repairModel;
    const repairMaxTokens = Number(process.env.OPENROUTER_REPAIR_MAX_TOKENS || 2600);
    const repairBody = {
      model: selectedRepairModel,
      messages: [
        {
          role: 'system',
          content: 'You repair malformed JSON for a Turkish medical exam app. Return only one complete valid JSON object. Do not add Markdown or commentary.',
        },
        {
          role: 'user',
          content: [
            'Aşağıdaki model çıktısı JSON parse hatası verdi. İçeriği değiştirmeden, eksik kaçışları/kapanışları düzelterek KlinikIQ kontratına uygun tek geçerli JSON objesi döndür.',
            `Parse hatası: ${summarizeJsonParseError(parseError)}`,
            getJsonContractPrompt(),
            'Bozuk JSON metni:',
            candidate,
          ].join('\n\n'),
        },
      ],
      temperature: 0,
      top_p: 0.2,
      max_tokens: repairMaxTokens,
    };

    if (useJsonMode) repairBody.response_format = { type: 'json_object' };
    const repairData = await sendOpenRouterRequest(repairBody);
    return extractChatCompletionText(repairData, 'OpenRouter JSON repair');
  }

  const errors = [];

  for (const [index, model] of modelCandidates.entries()) {
    const modelTemperature = index === 0 ? temperature : Math.min(temperature, 0.45);
    const primaryBody = buildOpenRouterBody(model, { temperature: modelTemperature });

    const bodiesToTry = [primaryBody];
    if (useJsonMode) bodiesToTry.push(buildOpenRouterBody(model, { temperature: modelTemperature, response_format: null }));

    for (const body of bodiesToTry) {
      try {
        const data = await sendOpenRouterRequest(body);
        const modelText = extractChatCompletionText(data, 'OpenRouter');
        let question;
        let repairedMalformedJson = false;
        try {
          question = extractJsonFromText(modelText);
        } catch (parseError) {
          const repairedText = await repairMalformedOpenRouterJson(modelText, parseError, model);
          question = extractJsonFromText(repairedText);
          repairedMalformedJson = true;
        }
        question.id = `ai-spot-real-openrouter-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        question.source = 'real-ai';
        question.provider = 'openrouter';
        question.openRouterModel = data?.model || model;
        question.openRouterAttempt = index + 1;
        if (repairedMalformedJson) question.remoteRepairUsed = true;
        return question;
      } catch (error) {
        errors.push(`${model}: ${summarizeProviderError(error)}`);
        const isJsonModeCompatibilityError = error?.status === 400 && /response_format|json_schema|json_object|structured/i.test(error?.raw || error?.message || '');
        if (!isJsonModeCompatibilityError && error?.status && [401, 402, 403].includes(Number(error.status))) {
          break;
        }
      }
    }
  }

  const error = new Error(`OpenRouter failed after ${modelCandidates.length} model attempt(s): ${errors.join(' || ')}`);
  error.status = 502;
  throw error;
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
  question.id = `ai-spot-real-gemini-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  question.source = 'real-ai';
  question.provider = 'gemini';
  return question;
}

function selectProviderStatus() {
  return {
    hasOpenRouter: Boolean(process.env.OPENROUTER_API_KEY),
    hasOpenAI: Boolean(process.env.OPENAI_API_KEY),
    hasGemini: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY),
  };
}

function buildProviderOrder(preferredProvider) {
  const preferred = String(preferredProvider || 'openrouter').toLowerCase();
  const all = ['openrouter', 'openai', 'gemini'];
  if (!all.includes(preferred)) return all;
  return [preferred, ...all.filter((provider) => provider !== preferred)];
}

async function generateWithAvailableProvider(prompt) {
  const providerStatus = selectProviderStatus();
  const providerOrder = buildProviderOrder(process.env.AI_PROVIDER);
  const errors = [];

  for (const provider of providerOrder) {
    try {
      if (provider === 'openrouter' && providerStatus.hasOpenRouter) return await callOpenRouterQuestion(prompt);
      if (provider === 'openai' && providerStatus.hasOpenAI) return await callOpenAIQuestion(prompt);
      if (provider === 'gemini' && providerStatus.hasGemini) return await callGeminiQuestion(prompt);
    } catch (error) {
      errors.push(`${provider}: ${error?.message || error}`);
    }
  }

  if (!providerStatus.hasOpenRouter && !providerStatus.hasOpenAI && !providerStatus.hasGemini) {
    const error = new Error('Missing server-side AI API key. Set OPENROUTER_API_KEY, OPENAI_API_KEY or GEMINI_API_KEY in the deployment environment.');
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

  const attemptErrors = [];

  try {
    const body = await parseJsonBody(request);
    const remoteAttempts = Math.max(1, Number(process.env.REMOTE_AI_ATTEMPTS || process.env.OPENROUTER_REMOTE_ATTEMPTS || 1));

    for (let remoteAttempt = 1; remoteAttempt <= remoteAttempts; remoteAttempt += 1) {
      try {
        const prompt = buildPrompt({
          ...body,
          attempt: Number(body?.attempt || 1) + remoteAttempt - 1,
          antiRepeatNonce: body?.antiRepeatNonce || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        });
        const question = await generateWithAvailableProvider(prompt);

        const validation = validateRawQuestion(question);
        const editorialValidation = validateRemoteEditorialQuality(question);
        if (!editorialValidation.ok) {
          attemptErrors.push(`remote attempt ${remoteAttempt}: editorial validation failed: ${editorialValidation.errors.slice(0, 4).join('; ')}`);
          continue;
        }

        if (!validation.ok) {
          attemptErrors.push(`remote attempt ${remoteAttempt}: schema validation failed: ${validation.errors.slice(0, 4).join('; ')}`);
          continue;
        }

        return sendJson(response, 200, {
          ok: true,
          provider: question.provider || 'remote-ai',
          remoteAttempt,
          question,
        });
      } catch (error) {
        attemptErrors.push(`remote attempt ${remoteAttempt}: ${summarizeProviderError(error)}`);
      }
    }

    const error = new Error(attemptErrors.join(' | ') || 'Remote AI providers failed');
    error.status = 502;
    throw error;
  } catch (error) {
    const status = error?.status && Number(error.status) >= 400 ? Number(error.status) : 500;
    return sendJson(response, status, {
      ok: false,
      error: error?.message || 'AI question generation failed',
      attempts: attemptErrors.slice(-6),
    });
  }
}
