const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

const EDITORIAL_FORBIDDEN_PATTERNS = [
  /Sınav incisi\s*[|:]/iu,
  /Ayırıcı nokta\s*:/iu,
  /Mekanizma\s*:/iu,
  /İlk adım\s*:/iu,
  /Karar verdirici ipucu\s*:/iu,
  /Destekleyici kanıt\s*:/iu,
  /Başvuru yakınması\s*[:|]/iu,
  /Laboratuvar paterni\s*[:|]/iu,
  /Görüntüleme bulgusu\s*[:|]/iu,
  /Fizik muayene bulgusu\s*[:|]/iu,
  /Olgu verisi\s*[:|]/iu,
  /Ek destek\s*[:|]/iu,
  /benzer seçenekleri ayıran ana patern/iu,
  /doğru seçenek verilen/iu,
  /soru patern yorumlama/iu,
  /klinik bağlam içinde/iu,
  /sonuçlar tek bir tanı adını yazmaz/iu,
  /verilen öğrenme hedefi/iu,
  /\bwheezing\b/iu,
  /\brash\b/iu,
  /\bairway\b/iu,
  /\bfollow[- ]?up\b/iu,
  /\bmanagement\b/iu,
  /\|/u,
];

function collectVisibleStrings(value, output = [], key = '') {
  const skipKeys = new Set(['id', 'source', 'caseType', 'correctAnswer', 'provider', 'type', 'priority']);
  if (skipKeys.has(key)) return output;
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectVisibleStrings(item, output, key));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([childKey, item]) => collectVisibleStrings(item, output, childKey));
  return output;
}

const FIELD_INLINE_LABEL_PATTERN = /^(Başvuru yakınması|Laboratuvar paterni|Görüntüleme bulgusu|Fizik muayene bulgusu|Karar verdirici ipucu|Destekleyici kanıt|Olgu verisi|Ek destek)\s*[:：|\-]/iu;
const LAB_RESULT_PATTERN = /(lökosit|wbc|nötrofil|crp|prokalsitonin|troponin|d-dimer|kreatinin|üre|glukoz|bilirubin|seroloji|kültür|pcr|bos|idrar tahlili|na\+|k\+|ph|hco3|hco₃)|\d+[.,]?\d*\s*(mg\/dl|mg\/l|mmol\/l|\/mm³|u\/l|ng\/ml)/iu;
const IMAGING_RESULT_PATTERN = /(akciğer grafisi|grafi|bt|mr|mrg|usg|ultrasonografi|ekokardiyografi|radyografi|tomografi|konsolidasyon|hava bronkogram|dolum defekti|lezyon|fraktür|kitle|nodül)/iu;
const PHYSICAL_EXAM_PATTERN = /(ral|raller|hışıltılı solunum|stridor|defans|rebound|matite|oskültasyon|üfürüm|ödem|eritem|döküntü|ense sertliği|kapiller dolum|hepatomegali|splenomegali|güç kaybı|nörolojik defisit)/iu;

function isLabOrImagingText(text = '') {
  return LAB_RESULT_PATTERN.test(String(text || '')) || IMAGING_RESULT_PATTERN.test(String(text || ''));
}

function isPhysicalExamText(text = '') {
  return PHYSICAL_EXAM_PATTERN.test(String(text || ''));
}

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

  const visibleText = collectVisibleStrings(question).join(' || ');
  EDITORIAL_FORBIDDEN_PATTERNS.forEach((pattern) => {
    if (pattern.test(visibleText)) errors.push(`editorial forbidden pattern: ${pattern}`);
  });

  if (isLabOrImagingText(question.chiefComplaint)) {
    errors.push('chiefComplaint must not contain laboratory or imaging data');
  }
  (question.findings?.exam || []).forEach((finding) => {
    if (isLabOrImagingText(finding) && !isPhysicalExamText(finding)) {
      errors.push(`exam field contains investigation data: ${String(finding).slice(0, 90)}`);
    }
  });
  (question.evidenceChain || []).forEach((item) => {
    if (FIELD_INLINE_LABEL_PATTERN.test(String(item || '').trim())) {
      errors.push(`evidenceChain contains inline label: ${String(item).slice(0, 90)}`);
    }
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
- Doğru cevap, verilen objektif veriler yorumlanarak bulunmalı.
- Her yanlış seçenek için neden yanlış olduğuna dair kısa ama öğretici feedback yaz; yanlış şık neyi yakalar, neyi kaçırır ve hangi ipucuyla elenir açık olsun.
- explanation 2-4 cümlelik Klinik Gerekçe kalitesinde olmalı.
- evidenceChain 3-5 somut olgu ipucundan oluşmalı; meta cümle veya öğrenme çıktısı yazma.
- Klinik veri alanlarını kesin ayır: chiefComplaint yalnızca hastanın şikâyeti olsun; lökosit, CRP, BT, grafi, seroloji veya kültür sonucu bu alana yazılmasın.
- findings.exam yalnızca fizik muayene bulguları içersin; laboratuvar, seroloji, kültür, EKG veya görüntüleme sonucu bu alana yazılmasın.
- findings.investigations sayısal laboratuvar, görüntüleme, EKG, mikrobiyoloji ve seroloji sonuçları için kullanılsın.
- evidenceChain 3-5 kısa karar ipucu içersin; “Başvuru yakınması:”, “Laboratuvar paterni:”, “Görüntüleme bulgusu:” gibi inline etiketler yazma.
- “Lökosit 16” gibi eksik ifade kullanma; “Lökosit 16.000/mm³” gibi birimli yaz.
- examPearl TUS hap bilgisi olmalı; mümkünse kırmızı bayrak, sık tuzak, ilk yaklaşım veya ayırt ettirici marker vurgula.
- Kart başlığını metin içinde tekrar etme. “Sınav incisi | ...”, “Ayırıcı nokta: ...”, “Mekanizma: ...”, “Karar verdirici ipucu: ...” gibi etiketli cümleler yazma.
- Gereksiz “|”, fazla “:”, noktalı virgül ve yapay şablon cümle kullanma. Metin doğal Türkçe cümleler gibi okunmalı.
- “wheezing” yerine “hışıltılı solunum”, “rash” yerine “döküntü”, “airway” yerine “hava yolu”, “follow-up” yerine “izlem”, “management” yerine “yönetim” yaz.
- “benzer seçenekleri ayıran ana patern olarak hatırlanmalıdır”, “doğru seçenek verilen öğrenme hedefiyle uyumludur”, “sonuçlar tek bir tanı adını yazmaz” gibi meta/generator ifadeleri kesinlikle kullanma.
- managementSteps 2-4 kısa ilk yaklaşım/yönetim basamağı içermeli; temel bilim sorusunda mekanistik yaklaşım notu gibi yaz.

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
        "findings": ["objektif bulgu 1", "objektif bulgu 2"]
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
