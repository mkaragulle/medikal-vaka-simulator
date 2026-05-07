const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

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
  const trimmed = String(text).trim();
  if (trimmed.startsWith('{')) return JSON.parse(trimmed);
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return JSON.parse(fenced[1].trim());
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start >= 0 && end > start) return JSON.parse(trimmed.slice(start, end + 1));
  throw new Error('No JSON object found in model response');
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
    .slice(0, 18)
    .map((item, index) => `${index + 1}. ${item.branch || 'TUS'} | başlık: ${item.title || ''} | doğru: ${item.correct || ''}`)
    .join('\n');

  const forbiddenTopics = recentQuestionSummaries
    .slice(0, 18)
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

Aşağıdaki JSON şemasını birebir döndür:
{
  "id": "ai-generated-remote-unique-id",
  "source": "real-ai",
  "caseType": "ai-spot",
  "title": "Tanıyı doğrudan ele vermeyen kısa başlık",
  "relatedBranch": "Tıbbi Mikrobiyoloji / Tıbbi Farmakoloji / İç Hastalıkları / vb.",
  "difficulty": "Orta-Zor",
  "learningTarget": "Soru ile ölçülen ana TUS bilgisi",
  "demographics": "Kısa hasta profili veya temel bilim bağlamı",
  "setting": "Acil / poliklinik / laboratuvar / temel bilim bağlamı",
  "chiefComplaint": "Kısa başvuru nedeni veya odak",
  "stem": "Kısa klinik senaryo veya bilgi bağlamı",
  "findings": {
    "history": ["öykü ipucu 1", "öykü ipucu 2"],
    "exam": ["muayene ipucu 1", "muayene ipucu 2"],
    "vitals": {"TA": "...", "Nabız": "...", "Ateş": "..."},
    "investigations": [
      {
        "id": "objective-test-1",
        "label": "Tetkik adı",
        "type": "lab",
        "priority": "essential",
        "summary": "Objektif sonuç; tanı adı yazma.",
        "findings": ["objektif bulgu 1", "objektif bulgu 2"],
        "rows": [["Parametre", "Sonuç + birim", "Referans", "Durum"]]
      }
    ]
  },
  "question": "Soru kökü",
  "options": [
    {"id": "A", "text": "..."},
    {"id": "B", "text": "..."},
    {"id": "C", "text": "..."},
    {"id": "D", "text": "..."},
    {"id": "E", "text": "..."}
  ],
  "correctAnswer": "C",
  "explanation": "Doğru cevabın bilimsel gerekçesi, 2-4 cümle.",
  "wrongOptionFeedback": {
    "A": "...",
    "B": "...",
    "D": "...",
    "E": "..."
  },
  "evidenceChain": ["kritik ipucu 1", "kritik ipucu 2", "doğru yoruma götüren bağlantı"],
  "examPearl": "TUS için kısa hap bilgi",
  "managementSteps": ["ilk yaklaşım basamağı 1", "ilk yaklaşım basamağı 2", "ilk yaklaşım basamağı 3"],
  "nextQuestionSeed": "Benzer/zor soru için konu tohumu"
}`;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

  if (!apiKey) {
    return sendJson(response, 503, {
      ok: false,
      error: 'Missing GEMINI_API_KEY on the server. Local fallback should be used by the frontend.',
    });
  }

  try {
    const body = await parseJsonBody(request);
    const prompt = buildPrompt(body);
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        generationConfig: {
          temperature: 0.92,
          topP: 0.92,
          maxOutputTokens: 2200,
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
      return sendJson(response, 502, {
        ok: false,
        error: 'Gemini request failed',
        detail: errorText.slice(0, 500),
      });
    }

    const data = await geminiResponse.json();
    const modelText = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('\n') || '';
    const question = extractJsonFromText(modelText);
    question.id = question.id || `ai-generated-remote-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    question.source = 'real-ai';
    question.provider = 'gemini';

    const validation = validateRawQuestion(question);
    const editorialValidation = validateRemoteEditorialQuality(question);
    if (!editorialValidation.ok) {
      return sendJson(response, 422, {
        ok: false,
        error: 'Model response failed editorial validation',
        validationErrors: editorialValidation.errors,
      });
    }

    if (!validation.ok) {
      return sendJson(response, 422, {
        ok: false,
        error: 'Model response failed schema validation',
        validationErrors: validation.errors,
      });
    }

    return sendJson(response, 200, {
      ok: true,
      provider: 'gemini',
      question,
    });
  } catch (error) {
    return sendJson(response, 500, {
      ok: false,
      error: error?.message || 'AI question generation failed',
    });
  }
}
