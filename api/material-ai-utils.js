const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

export function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); } catch (error) { reject(error); }
    });
    req.on('error', reject);
  });
}

export function assertPost(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, error: 'Only POST requests are supported.' });
    return false;
  }
  return true;
}

function localId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function topicFromPayload(payload = {}) {
  return payload.course || payload.committee || payload.tusBranch || payload.title || payload.fileName || 'Ders materyali';
}

export function buildLessonPrompt(payload = {}) {
  return [
    'You are KlinikIQ medical education lesson engine.',
    'Return only valid JSON in Turkish. Do not invent unreadable slide content.',
    'Generate a structured lesson aligned to the uploaded material metadata and extracted text.',
    'Separate directly present content from external clarification.',
    `Study mode: ${payload.studyMode || 'medical-school'}`,
    `Topic: ${topicFromPayload(payload)}`,
    `Extracted text: ${(payload.extractedText || '').slice(0, 12000)}`,
  ].join('\n');
}

export async function callOpenAIJson(prompt, fallback) {
  if (!process.env.OPENAI_API_KEY) return { ok: true, source: 'local-safe-fallback', data: fallback };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      temperature: 0.25,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'Return only valid JSON. Write professional Turkish medical education content.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    return { ok: false, source: 'openai-error', data: fallback, error: await response.text() };
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content || '';
  try {
    return { ok: true, source: 'openai', data: JSON.parse(content) };
  } catch (error) {
    return { ok: false, source: 'openai-parse-error', data: fallback, error: error.message };
  }
}

export function fallbackLesson(payload = {}) {
  const topic = topicFromPayload(payload);
  return {
    id: localId('lesson'),
    title: `${topic} yapılandırılmış ders`,
    overview: `${topic} materyali seçilen çalışma moduna göre ders, soru ve kart üretimi için yapılandırıldı. Gerçek dosya metni okunamadığında sistem bunu açıkça belirtmeli ve kesin kaynak iddiası kurmamalıdır.`,
    learningObjectives: ['Ana kavramı tanımlamak', 'Mekanizmayı klinik karşılıkla bağlamak', 'Sınavda sorulabilecek karar noktasını ayırt etmek'],
    sections: [
      { title: 'Büyük resim', body: 'Konu önce temel ilke, sonra mekanizma ve klinik ilişki sırasıyla çalışılmalıdır.' },
      { title: 'Mekanizma', body: 'Mekanizma soruları neden-sonuç akışını ve yön bilgisini doğru kurmalıdır.' },
      { title: 'Sınav değeri', body: 'Soru, doğrudan verilen sonucu tekrar sormamalı; eksik akıl yürütme basamağını ölçmelidir.' },
    ],
    figureExplanations: [],
    highYieldSummary: ['Kısa karar cümlesi oluştur', 'Yakın çeldiriciyi ayır', 'Yanlışları materyal bazında tekrar et'],
    mustRemember: ['Bilgi kaynağı belirsizse kesin konuşma', 'Feedback öğretici olmalı', 'Tek doğru cevap korunmalı'],
  };
}

export function fallbackQuestions(payload = {}) {
  const topic = topicFromPayload(payload);
  return Array.from({ length: 10 }, (_, index) => ({
    id: localId('question'),
    questionNumber: index + 1,
    stem: `${topic} materyalini çalışan bir öğrencide, bu konuyu aktif öğrenmeye dönüştürmek için en uygun yaklaşım hangisidir?`,
    options: [
      { id: 'A', text: 'Ana mekanizmayı klinik ve sınav kararıyla ilişkilendirmek' },
      { id: 'B', text: 'Tüm slaytları sadece başlık olarak ezberlemek' },
      { id: 'C', text: 'Gereksiz laboratuvar değerlerini her soruya eklemek' },
      { id: 'D', text: 'Doğru cevabı soru kökünde açıkça vermek' },
      { id: 'E', text: 'Farklı kategorilerden seçenekleri karıştırmak' },
    ],
    correctOptionId: 'A',
    optionFeedback: {
      A: 'Bu seçenek doğrudur çünkü öğrenmeyi mekanizma, klinik bağlam ve sınav kararına bağlar.',
      B: 'Bu yaklaşım yüzeysel ezber yapar; mekanizma ve karar sırası kurulmaz.',
      C: 'Gereksiz veri soru kalitesini düşürür ve tek hedefi bulanıklaştırır.',
      D: 'Cevap kökte sızdırılırsa soru ölçme değeri taşımaz.',
      E: 'Seçenekler aynı kategoride olmazsa tek en iyi cevap ilkesi bozulur.',
    },
    sourceReferences: [],
  }));
}

export function fallbackFlashcards(payload = {}) {
  const topic = topicFromPayload(payload);
  return [
    { front: `${topic} için ilk öğrenme hedefi nedir?`, back: 'Ana mekanizmayı klinik karşılık ve sınav kararıyla bağlamak.', explanation: 'Bu yapı ezber yerine neden-sonuç ilişkisini güçlendirir.' },
    { front: 'İyi bir yanlış seçenek açıklaması ne yapmalıdır?', back: 'O seçeneğin hangi durumda doğru olacağını ve bu vakada neden uymadığını göstermelidir.', explanation: 'Bu, öğrencinin ayırıcı tanı ve seçenek eleme becerisini artırır.' },
    { front: 'Şekil içeren slayt nasıl kartlaştırılmalıdır?', back: 'Etiketler ve ilişkiler adım adım yorumlanarak kısa bir karar cümlesine dönüştürülmelidir.', explanation: 'Tıbbi mekanizmalar çoğu zaman görsel akışla öğretilir.' },
  ];
}

export function validateQuestionPayload(payload = {}) {
  const problems = [];
  const questions = Array.isArray(payload.questions) ? payload.questions : Array.isArray(payload) ? payload : [];
  questions.forEach((question, index) => {
    if (!Array.isArray(question.options) || question.options.length !== 5) problems.push(`${index + 1}. soru beş seçenek içermiyor.`);
    if (!['A', 'B', 'C', 'D', 'E'].includes(question.correctOptionId || question.correctAnswer)) problems.push(`${index + 1}. soruda doğru cevap A-E değil.`);
    const text = JSON.stringify(question);
    if (/\b(N\.|H\.|m\.|Yanlış\.|Doğru\.|Bu seçenek doğrudur\.)\b/i.test(text)) problems.push(`${index + 1}. soruda jenerik veya parçalı feedback riski var.`);
  });
  return { ok: problems.length === 0, problems };
}
