const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

const INLINE_LABEL_REGEX = /^(başvuru\s+yakınması|başvuru|karar\s+verdirici\s+ipucu|destekleyici\s+kanıt|olgu\s+verisi|ek\s+destek|laboratuvar\s+paterni|görüntüleme\s+bulgusu|fizik\s+muayene\s+bulgusu)\s*[:：\-–—]\s*/iu;
const LAB_OR_OBJECTIVE_REGEX = /\b(lökosit|lokosit|wbc|crp|prokalsitonin|troponin|ck-mb|kreatinin|glukoz|ast|alt|bilirubin|d-dimer|ph|hco3|laktat|seroloji|igg|igm|hbsag|anti-hcv|pcr|kültür|kan\s+gazı|idrar|bos|mg\/dl|mg\/l|ng\/l|mmol\/l|\/mm³|\/mm3)\b/iu;
const IMAGING_OR_ECG_REGEX = /\b(akciğer\s+grafisi|grafi|röntgen|bt|mr|mrg|ultrason|usg|tomografi|ekg|st\s*elevasyonu|st\s*depresyonu|konsolidasyon|hava\s+bronkogramı|opasite|infiltrasyon)\b/iu;
const EXAM_REGEX = /\b(ral|raller|hışıltı|wheezing|stridor|defans|rebound|ense\s+sertliği|döküntü|eklem\s+şişliği|nörolojik\s+defisit|kapiller\s+dolum|deri\s+turgoru|hepatosplenomegali|lenfadenopati|üfürüm|oskültasyon|palpasyon|sağ\s+alt\s+zonda|sol\s+alt\s+zonda)\b/iu;

function normalizeInlineLabel(text = '') {
  return String(text || '').replace(INLINE_LABEL_REGEX, '').trim();
}

function validateClinicalPlacement(question = {}) {
  const errors = [];
  const checkArray = (label, values, forbidden) => {
    (Array.isArray(values) ? values : []).forEach((value) => {
      const text = normalizeInlineLabel(value);
      if (INLINE_LABEL_REGEX.test(String(value || ''))) errors.push(`${label} contains inline field label`);
      if (forbidden.some((regex) => regex.test(text))) errors.push(`${label} contains misplaced clinical data: ${text.slice(0, 90)}`);
    });
  };
  const chief = normalizeInlineLabel(question.chiefComplaint || '');
  if (LAB_OR_OBJECTIVE_REGEX.test(chief) || IMAGING_OR_ECG_REGEX.test(chief) || EXAM_REGEX.test(chief)) {
    errors.push('chiefComplaint contains lab/imaging/exam data');
  }
  checkArray('findings.history', question.findings?.history, [LAB_OR_OBJECTIVE_REGEX, IMAGING_OR_ECG_REGEX, EXAM_REGEX]);
  checkArray('findings.exam', question.findings?.exam, [LAB_OR_OBJECTIVE_REGEX, IMAGING_OR_ECG_REGEX]);
  checkArray('evidenceChain', question.evidenceChain, []);
  return errors;
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
  errors.push(...validateClinicalPlacement(question));

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
- Yakın listedeki konu, başlık, doğru cevap, klinik odak veya aynı serolojik veya tetkik yorumunu tekrar etme.
- Yasak listedeki hastalık, mekanizma, antidot, enzim, seroloji yorumu, ilaç etki mekanizması veya doğru cevabı yeniden kullanma.
- Deneme 2 veya 3 ise önceki denemeden tamamen farklı branş alt konusu ve farklı doğru cevap seç.
- Tek bir ana klinik odak olsun.
- 5 seçenek üret: A, B, C, D, E.
- Tüm seçenekler aynı kategori içinde olsun; tanı sorusunda tanılar, tedavi sorusunda tedaviler, tetkik sorusunda tetkikler.
- En az iki güçlü, klinik olarak yakın seçenek olsun.
- Tetkik sonucunda doğru tanı/cevap cümle olarak yazılmasın.
- Klinik veri alanlarını asla karıştırma: chiefComplaint yalnız hasta/yakını tarafından ifade edilen şikâyet olmalı; lökosit, CRP, EKG, grafi, BT/MR, kültür/seroloji veya muayene bulgusu chiefComplaint içine yazılmamalı.
- findings.history yalnız öykü/semptom/risk bilgisi içermeli; raller, defans, döküntü morfolojisi gibi muayene bulguları findings.exam alanına; lökosit/CRP/seroloji/kültür/grafi/BT/MR/EKG bulguları findings.investigations alanına yazılmalı.
- evidenceChain ve ayırt ettirici ipuçlarında “Başvuru yakınması:”, “Laboratuvar paterni:”, “Görüntüleme bulgusu:” gibi inline etiket kullanma; madde doğrudan klinik ipucuyla başlamalı.
- Laboratuvar değerlerinde birim kullan: “Lökosit 16” yazma; “Lökosit 16.000/mm³, nötrofil baskınlığı” yaz.
- Tetkik yorumu “... tanısını doğrular”, “... ile uyumludur”, “kesin tanıdır” gibi direkt tanı dili kullanmasın.
- Doğru cevap, verilen objektif veriler yorumlanarak bulunmalı.
- Her yanlış seçenek için neden yanlış olduğuna dair kısa ama öğretici feedback yaz; yanlış şık neyi yakalar, neyi kaçırır ve hangi ipucuyla elenir açık olsun.
- explanation 2-4 cümlelik Klinik Gerekçe kalitesinde olmalı.
- evidenceChain 3-5 somut olgu ipucundan oluşmalı; meta cümle veya öğrenme çıktısı yazma.
- examPearl TUS hap bilgisi olmalı; mümkünse kırmızı bayrak, sık tuzak, ilk adım veya ayırt ettirici marker vurgula.
- managementSteps alanı 2-4 kısa ilk yaklaşım veya yönetim basamağı içermeli. Temel bilim sorusunda mekanizmaya odaklanan kısa bir yaklaşım notu yaz.

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
