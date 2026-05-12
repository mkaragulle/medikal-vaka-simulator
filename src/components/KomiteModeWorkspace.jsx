import { useEffect, useMemo, useState } from 'react';
import { Icon } from './ui.jsx';
import { localBackend } from '../services/localBackend.js';

const KOMITE_MATERIALS_STORAGE_KEY = 'komite-materials-v1';
const CLASS_YEARS = ['1', '2', '3', '4', '5', '6'];
const LEARNING_TARGETS = ['Komite sınavı', 'Final sınavı', 'Klinik staj', 'Genel tekrar'];
const REVIEW_FILTERS = ['Bu materyal', 'Tüm materyaller'];
const STUDY_TABS = [
  { id: 'lesson', label: 'AI Ders Anlatımı' },
  { id: 'figures', label: 'Görseller' },
  { id: 'questions', label: 'AI Soruları' },
  { id: 'cards', label: 'Hap Kartlar' },
  { id: 'review', label: 'Tekrar' },
];

const createId = (prefix = 'id') => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

function readUserMaterials(userId) {
  return localBackend.read(KOMITE_MATERIALS_STORAGE_KEY, [])
    .filter((material) => !userId || material.userId === userId)
    .sort((a, b) => Number(b.uploadDate || 0) - Number(a.uploadDate || 0));
}

function writeUserMaterials(userId, nextMaterials) {
  const allMaterials = localBackend.read(KOMITE_MATERIALS_STORAGE_KEY, []);
  const others = allMaterials.filter((material) => material.userId !== userId);
  localBackend.write(KOMITE_MATERIALS_STORAGE_KEY, [...others, ...nextMaterials]);
}

function getFileType(fileName = '') {
  const ext = String(fileName).split('.').pop()?.toLowerCase() || 'file';
  return ext === fileName ? 'file' : ext;
}

function truncate(text = '', max = 72) {
  const value = String(text || '').trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trim()}…`;
}

function normalizeSourceText(material = {}) {
  return [material.extractedText, material.pastedText]
    .filter(Boolean)
    .join('\n\n')
    .replace(/\s+/g, ' ')
    .trim();
}

function deriveTopic(material = {}) {
  const fileTopic = String(material.fileName || '').replace(/\.[a-z0-9]+$/i, '').replace(/[_-]+/g, ' ').trim();
  return material.course || material.committee || fileTopic || 'yüklenen materyal';
}

function extractKeywords(text = '', topic = '') {
  const stop = new Set(['olan', 'için', 'ile', 'bir', 've', 'veya', 'gibi', 'daha', 'sonra', 'önce', 'olarak', 'bu', 'şu', 'çok', 'hasta', 'hastalık', 'sistem']);
  const words = String(text || '')
    .toLocaleLowerCase('tr')
    .replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 5 && !stop.has(word));
  const counts = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
  const fromText = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([word]) => word);
  const fromTopic = String(topic || '').split(/\s+/).filter((word) => word.length >= 4);
  return [...new Set([...fromTopic, ...fromText])].slice(0, 10);
}

function buildLocalLesson(material) {
  const topic = deriveTopic(material);
  const sourceText = normalizeSourceText(material);
  const keywords = extractKeywords(sourceText, topic);
  const hasReadableText = sourceText.length > 120;
  const sourceReference = hasReadableText ? 'Yapıştırılan/okunabilen materyal metni' : 'Dosya adı ve kullanıcı tarafından girilen ders bilgileri';

  return {
    id: createId('lesson'),
    materialId: material.id,
    title: `${topic} — Komite Ders Anlatımı`,
    overview: hasReadableText
      ? 'Bu çalışma alanı, yüklenen materyalden okunabilen metin ve kullanıcı tarafından girilen ders bağlamı temel alınarak yapılandırıldı.'
      : 'Bu çalışma alanı dosya metni ayrıştırılamadığı için şimdilik materyal adı, sınıf ve komite bilgileri üzerinden güvenli bir iskelet olarak hazırlandı. Tam içerik için metin yapıştırma veya sunucu tarafı dosya ayrıştırma gerekir.',
    learningObjectives: [
      `${topic} başlığındaki temel kavramları sıralamak.`,
      'Mekanizma, klinik bağlantı ve sınav ipuçlarını ayrı ayrı ayırt etmek.',
      'Yanlış yapılan soru ve zorlanılan kartları materyal bazlı tekrar etmek.',
    ],
    sections: [
      {
        heading: 'Büyük resim',
        content: `${topic} konusu önce temel tanım ve ana kavramlarla, ardından mekanizma ve klinik bağlantı üzerinden çalışılmalıdır. Komite düzeyinde amaç yalnızca ezberlemek değil, kavramlar arasındaki neden-sonuç ilişkisini kurmaktır.`,
        mechanismFlow: keywords.slice(0, 4).length ? keywords.slice(0, 4).map((keyword) => `${keyword} → ilişkili mekanizma/klinik sonuç`) : [`${topic} → temel kavram → mekanizma → klinik sonuç`],
        clinicalConnection: 'Klinik bağlantı, temel bilginin hasta bulgusu, tanısal test veya tedavi kararıyla nasıl ilişkilendiğini gösterir.',
        examConnection: `${material.learningTarget || 'Komite sınavı'} için yüksek değerli kısım; tanım, mekanizma, ayırıcı nokta ve klinik ipuçlarının birlikte öğrenilmesidir.`,
        sourceReferences: [sourceReference],
      },
      {
        heading: 'Adım adım çalışma planı',
        content: 'Önce terminoloji ve ana başlıklar okunmalı, sonra mekanizmalar oklarla takip edilmeli, en son klinik örnekler ve soru çözümüyle bilgi test edilmelidir.',
        mechanismFlow: ['Tanım → temel yapı → mekanizma → klinik bulgu → sınav sorusu'],
        clinicalConnection: 'Bu sıra, öğrencinin materyali pasif okumak yerine aktif geri çağırma ile öğrenmesini sağlar.',
        examConnection: 'Soru çözerken kökteki ana ipucu, mekanizma ve en güçlü ayırıcı bulgu birlikte aranmalıdır.',
        sourceReferences: [sourceReference],
      },
    ],
    figureExplanations: [
      {
        sourcePageOrSlide: 'Belirlenemedi',
        title: 'Görsel/şekil analizi durumu',
        whatItShows: 'Bu MVP sürümünde PDF/PPTX içindeki görseller doğrudan ayrıştırılmıyor.',
        importantLabels: [],
        stepByStepInterpretation: 'Görsel analizi için ileride sunucu tarafı PDF/PPTX ayrıştırma ve görsel okuma katmanı eklenmelidir.',
        whyItMatters: 'Şekil ve tablolar komite sınavlarında mekanizma ve karşılaştırma sorularını güçlendirir.',
        examRelevance: 'Şimdilik görseller hakkında iddia üretilmez; yalnızca okunabilir metin ve kullanıcı girdisi kullanılır.',
        commonMistake: 'Görsel ayrıştırılmadan şekil içeriği varmış gibi anlatım yapmak hatalıdır.',
        memoryNote: 'Okunamayan görsel için “belirsiz” demek, uydurma açıklamadan daha güvenlidir.',
      },
    ],
    commonConfusions: [
      'Tanım ile mekanizma aynı şey değildir; soru hangi hedefi soruyorsa cevap ona göre seçilmelidir.',
      'Klinik bulgu ile tanı koyduran test birbirine karıştırılmamalıdır.',
    ],
    highYieldSummary: keywords.length ? keywords.slice(0, 6).map((keyword) => `${keyword}: materyalde öne çıkan tekrar hedefi.`) : [`${topic}: temel kavram, mekanizma ve klinik bağlantı birlikte çalışılmalıdır.`],
    mustRemember: [
      'Komite çalışmasında her başlık için “tanım → mekanizma → klinik karşılık → sınav ipucu” zinciri kurulmalıdır.',
      'Okunamayan veya materyalde bulunmayan içerik, kesin bilgi gibi sunulmamalıdır.',
    ],
    limitations: hasReadableText ? [] : ['Dosyanın iç metni otomatik ayrıştırılmadı; ders anlatımı güvenli MVP iskeleti olarak üretildi.'],
    sourceReferences: [sourceReference],
    createdAt: Date.now(),
  };
}

function buildLocalQuestions(material, lesson) {
  const topic = deriveTopic(material);
  const keywords = extractKeywords(normalizeSourceText(material), topic);
  const baseTargets = keywords.length >= 5 ? keywords.slice(0, 10) : [
    topic,
    'temel mekanizma',
    'klinik bağlantı',
    'tanısal yaklaşım',
    'ayırıcı nokta',
    'sınav tuzağı',
    'yüksek verimli bilgi',
    'neden-sonuç ilişkisi',
    'laboratuvar yorumu',
    'tekrar hedefi',
  ];
  return Array.from({ length: 10 }, (_, index) => {
    const target = baseTargets[index % baseTargets.length];
    const correct = ['A', 'B', 'C', 'D', 'E'][index % 5];
    const options = [
      { id: 'A', text: `${target} ile ilişkili temel mekanizma` },
      { id: 'B', text: `${target} için rastgele ve ilişkisiz ezber bilgisi` },
      { id: 'C', text: `${target} ile karışabilen ancak bu materyalde öncelikli olmayan nokta` },
      { id: 'D', text: `${target} yerine yalnızca semptom ezberi yapmak` },
      { id: 'E', text: `${target} için kaynakta desteklenmeyen genelleme` },
    ];
    const correctText = options.find((option) => option.id === correct)?.text || options[0].text;
    return {
      id: createId('komite-q'),
      materialId: material.id,
      mode: 'komite',
      questionNumber: index + 1,
      difficulty: index < 3 ? 'easy' : index < 8 ? 'medium' : 'hard',
      learningTarget: `${target} bilgisini materyal bağlamında yorumlama`,
      sourceReference: lesson?.sourceReferences?.[0] || 'Materyal çalışma alanı',
      stem: `${material.classYear}. sınıf ${material.committee || material.course || 'komite'} çalışmasında ${topic} başlığı incelenmektedir. Öğrencinin bu materyali yalnızca ezberlemeden, kavram ve mekanizma ilişkisiyle çalışması hedeflenmektedir.`,
      supportingData: [`Çalışma hedefi: ${material.learningTarget || 'Komite sınavı'}`, `Materyal: ${material.fileName}`],
      question: `${target} için bu materyalde öncelikle hangi çalışma yaklaşımı en uygundur?`,
      options,
      correctOptionId: correct,
      explanation: `${correctText}, bu kartın ölçtüğü hedefle en doğrudan ilişkilidir. Bu yaklaşım ezber yerine materyaldeki kavram, mekanizma ve sınav bağlantısını birlikte çalıştırır.`,
      optionFeedback: {
        A: correct === 'A' ? 'Bu seçenek hedef kavramı mekanizma ve sınav bağlantısıyla birlikte çalıştırdığı için uygundur.' : 'Bu seçenek bazı durumlarda yararlı olabilir; ancak bu soruda ölçülen hedef için en doğrudan ve öncelikli seçenek değildir.',
        B: correct === 'B' ? 'Bu seçenek hedef kavramı mekanizma ve sınav bağlantısıyla birlikte çalıştırdığı için uygundur.' : 'Rastgele ezber bilgisi, materyaldeki ana öğrenme hedefini sistematik biçimde güçlendirmez.',
        C: correct === 'C' ? 'Bu seçenek hedef kavramı mekanizma ve sınav bağlantısıyla birlikte çalıştırdığı için uygundur.' : 'Karışabilen nokta ayırıcı tanıda değerlidir; ancak bu vakada öncelik ana hedefin doğru kurulmasıdır.',
        D: correct === 'D' ? 'Bu seçenek hedef kavramı mekanizma ve sınav bağlantısıyla birlikte çalıştırdığı için uygundur.' : 'Yalnızca semptom ezberi, mekanizma ve klinik karar basamağını açıklamadığı için yetersiz kalır.',
        E: correct === 'E' ? 'Bu seçenek hedef kavramı mekanizma ve sınav bağlantısıyla birlikte çalıştırdığı için uygundur.' : 'Kaynakta desteklenmeyen genelleme, materyal temelli komite çalışması için güvenilir bir yaklaşım değildir.',
      },
      learningPoint: 'Materyal temelli sorularda ana hedef, kaynakta geçen bilgiyi mekanizma ve klinik karşılığıyla ilişkilendirmektir.',
      memoryNote: `${topic} çalışırken “kavram → mekanizma → sınav ipucu” zincirini kur.`,
      userAnswer: null,
      isWrong: false,
      isFavorite: false,
      isDifficult: false,
      createdAt: Date.now(),
    };
  });
}

function buildLocalFlashcards(material, lesson) {
  const topic = deriveTopic(material);
  const keywords = extractKeywords(normalizeSourceText(material), topic);
  const targets = keywords.length ? keywords.slice(0, 12) : ['büyük resim', 'mekanizma', 'klinik bağlantı', 'sınav ipucu', 'sık karışan nokta', 'tekrar hedefi'];
  return {
    id: createId('deck'),
    deckTitle: `${topic} Hap Kartları`,
    materialId: material.id,
    cards: targets.map((target, index) => ({
      id: createId('card'),
      userId: material.userId,
      materialId: material.id,
      mode: 'komite',
      classYear: material.classYear,
      committee: material.committee,
      course: material.course,
      type: index % 3 === 0 ? 'mechanism' : index % 3 === 1 ? 'clinical_clue' : 'must_remember',
      difficulty: index < 3 ? 'easy' : index < 8 ? 'medium' : 'hard',
      front: `${target} için komite düzeyinde hatırlanması gereken ana nokta nedir?`,
      back: `${target}, ${topic} başlığında tanım, mekanizma ve sınav bağlantısı birlikte düşünülerek çalışılmalıdır.`,
      explanation: 'Bu kart, pasif okuma yerine aktif geri çağırma yapman için kısa ve hedefli hazırlanmıştır.',
      sourceReference: lesson?.sourceReferences?.[0] || 'Materyal çalışma alanı',
      tags: [topic, material.learningTarget || 'Komite'],
      isUserCreated: false,
      isFavorite: false,
      isDifficult: false,
      repeatStatus: 'new',
      createdAt: Date.now(),
    })),
  };
}


async function postKomiteAI(endpoint, payload) {
  if (typeof fetch !== 'function') throw new Error('Fetch is not available');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let json = null;
  try { json = await response.json(); } catch { json = null; }
  if (!response.ok || !json?.ok) throw new Error(json?.error || `AI route failed: ${endpoint}`);
  return json;
}

function buildMaterialAnalysisFallback(material) {
  const topic = deriveTopic(material);
  const sourceText = normalizeSourceText(material);
  const keywords = extractKeywords(sourceText, topic);
  return {
    materialTitle: topic,
    detectedCourseOrTopic: material.course || material.committee || topic,
    sourceQuality: {
      readableText: sourceText.length > 120,
      figuresDetected: false,
      tablesDetected: false,
      limitations: sourceText.length > 120 ? [] : ['Dosya içeriği otomatik ayrıştırılamadı; yalnızca metadata/pasted text kullanıldı.'],
    },
    lectureStructure: [{ sectionTitle: topic, sourcePages: [], mainIdeas: keywords.slice(0, 5), importantDetails: [] }],
    keyConcepts: keywords,
    mechanisms: [],
    clinicalRelevance: [],
    examRelevance: [`${material.learningTarget || 'Komite sınavı'} için temel kavram ve mekanizma bağlantısı.`],
    figureTableNotes: [{ sourcePageOrSlide: 'Belirlenemedi', type: 'unclear', visibleContent: '', importantLabels: [], interpretation: '', limitations: 'Bu MVP sürümünde görsel ayrıştırma yapılmadı.' }],
    commonConfusions: [],
    recommendedLessonPlan: ['Büyük resim', 'Adım adım mekanizma', 'Klinik bağlantı', 'Sınav bağlantısı'],
    questionGenerationTargets: keywords.slice(0, 10),
    flashcardGenerationTargets: keywords.slice(0, 12),
    sourceReferences: [sourceText.length > 120 ? 'Okunabilir/yapıştırılmış metin' : 'Materyal metadata bilgisi'],
  };
}

function StatusPill({ children, tone = 'neutral' }) {
  return <span className={`komite-status-pill tone-${tone}`}>{children}</span>;
}

function EmptyState({ title, text, action }) {
  return (
    <div className="komite-empty-state">
      <strong>{title}</strong>
      <p>{text}</p>
      {action}
    </div>
  );
}

function MaterialTree({ materials, activeMaterialId, onOpenMaterial }) {
  const grouped = useMemo(() => materials.reduce((acc, material) => {
    const classKey = `${material.classYear || '?'} . Sınıf`;
    const courseKey = material.committee || material.course || 'Komite / Ders belirtilmedi';
    if (!acc[classKey]) acc[classKey] = {};
    if (!acc[classKey][courseKey]) acc[classKey][courseKey] = [];
    acc[classKey][courseKey].push(material);
    return acc;
  }, {}), [materials]);

  if (!materials.length) {
    return <EmptyState title="Henüz materyal yok" text="Çalışmaya Başla kartından ilk komite materyalini ekleyebilirsin." />;
  }

  return (
    <div className="komite-material-tree">
      {Object.entries(grouped).map(([className, courses]) => (
        <div className="komite-tree-class" key={className}>
          <span className="komite-tree-class-title">{className}</span>
          {Object.entries(courses).map(([courseName, courseMaterials]) => (
            <div className="komite-tree-course" key={courseName}>
              <span>{courseName}</span>
              <div className="komite-tree-files">
                {courseMaterials.map((material) => (
                  <button
                    key={material.id}
                    type="button"
                    className={`komite-tree-file ${activeMaterialId === material.id ? 'active' : ''}`}
                    onClick={() => onOpenMaterial(material.id)}
                  >
                    <Icon name="Notes" size={16} />
                    <span>{material.fileName}</span>
                    <small>{material.lesson ? 'Ders hazır' : 'Taslak'}</small>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function KomiteDashboard({ materials, stats, onStart, onOpenMyMaterials, onOpenCards, onOpenReview, onOpenMaterial }) {
  const latest = materials[0];
  return (
    <section className="komite-dashboard-grid" aria-label="Komite çalışma alanı">
      <button type="button" className="komite-dashboard-card" onClick={onOpenMyMaterials}>
        <span className="komite-card-icon"><Icon name="ClipboardList" /></span>
        <span className="komite-card-kicker">Arşiv</span>
        <strong>Çalıştıklarım</strong>
        <p>{latest ? `Son materyal: ${truncate(latest.fileName, 44)}` : 'Sınıf, komite ve materyal bazlı çalışma ağacını aç.'}</p>
        <small>{materials.length} materyal · {stats.readyMaterials} hazır çalışma alanı</small>
      </button>
      <button type="button" className="komite-dashboard-card primary" onClick={onStart}>
        <span className="komite-card-icon"><Icon name="Sparkles" /></span>
        <span className="komite-card-kicker">Yeni materyal</span>
        <strong>Çalışmaya Başla</strong>
        <p>Sınıf/komite seç, dosya ekle ve materyal için ders, soru, kart ve tekrar alanı oluştur.</p>
        <small>PDF öncelikli · PPTX/DOCX metadata destekli</small>
      </button>
      <button type="button" className="komite-dashboard-card" onClick={onOpenCards}>
        <span className="komite-card-icon"><Icon name="LayeredCards" /></span>
        <span className="komite-card-kicker">Aktif tekrar</span>
        <strong>Hap Kartlar</strong>
        <p>Materyal bazlı kartları çalış; zor, favori ve tekrar işaretleriyle filtrele.</p>
        <small>{stats.cardCount} kart · {stats.difficultCards} zor kart</small>
      </button>
      <button type="button" className="komite-dashboard-card" onClick={onOpenReview}>
        <span className="komite-card-icon"><Icon name="RotateCcw" /></span>
        <span className="komite-card-kicker">Hedefli geri dönüş</span>
        <strong>Tekrar Merkezi</strong>
        <p>Yanlış sorular, zor kartlar, favoriler ve zayıf konuları materyal bazlı gör.</p>
        <small>{stats.wrongQuestions} yanlış soru · {stats.favoriteItems} favori</small>
      </button>
      {latest ? (
        <button type="button" className="komite-latest-material card-surface" onClick={() => onOpenMaterial(latest.id)}>
          <span>Son çalışılan materyale dön</span>
          <strong>{latest.fileName}</strong>
          <small>{latest.classYear}. sınıf · {latest.committee || latest.course || 'Komite/Ders'} · {new Date(latest.uploadDate).toLocaleDateString('tr-TR')}</small>
        </button>
      ) : null}
    </section>
  );
}

function StartFlow({ onCreate, onCancel }) {
  const [form, setForm] = useState({
    classYear: '3',
    committee: '',
    course: '',
    learningTarget: 'Komite sınavı',
    university: '',
    pastedText: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileText, setFileText] = useState('');
  const [fileNotice, setFileNotice] = useState('');

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleFile = async (file) => {
    setSelectedFile(file || null);
    setFileText('');
    setFileNotice('');
    if (!file) return;
    const type = getFileType(file.name);
    if (['txt', 'md'].includes(type)) {
      try {
        const text = await file.text();
        setFileText(text.slice(0, 12000));
        setFileNotice('Metin dosyası okundu ve çalışma alanına eklenecek.');
      } catch {
        setFileNotice('Dosya metni okunamadı; yalnızca metadata kaydedilecek.');
      }
      return;
    }
    setFileNotice('PDF/PPTX/DOCX dosyası metadata olarak kaydedilir. Tam içerik analizi için sunucu tarafı dosya ayrıştırma katmanı gerekir; istersen ana metni aşağıya yapıştırabilirsin.');
  };

  const submit = (event) => {
    event.preventDefault();
    if (!selectedFile && !form.pastedText.trim()) return;
    onCreate({
      ...form,
      file: selectedFile,
      extractedText: fileText,
      pastedText: form.pastedText.trim(),
    });
  };

  return (
    <section className="komite-start-flow card-surface">
      <div className="komite-section-head">
        <div>
          <span className="komite-kicker">Çalışmaya Başla</span>
          <h2>Yeni komite materyali ekle</h2>
          <p>Sınıf ve komite bilgisini kaydet; dosya metni okunabilirse ders, soru ve kart üretimi daha materyal odaklı olur.</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Vazgeç</button>
      </div>

      <form className="komite-start-form" onSubmit={submit}>
        <label>
          <span>Sınıf</span>
          <select value={form.classYear} onChange={(event) => update('classYear', event.target.value)}>
            {CLASS_YEARS.map((year) => <option key={year} value={year}>{year}. sınıf</option>)}
          </select>
        </label>
        <label>
          <span>Komite adı</span>
          <input value={form.committee} onChange={(event) => update('committee', event.target.value)} placeholder="Örn. Nöroloji Komitesi" />
        </label>
        <label>
          <span>Ders / konu</span>
          <input value={form.course} onChange={(event) => update('course', event.target.value)} placeholder="Örn. Epilepsi, Kardiyak fizyoloji" />
        </label>
        <label>
          <span>Çalışma hedefi</span>
          <select value={form.learningTarget} onChange={(event) => update('learningTarget', event.target.value)}>
            {LEARNING_TARGETS.map((target) => <option key={target} value={target}>{target}</option>)}
          </select>
        </label>
        <label>
          <span>Üniversite (opsiyonel)</span>
          <input value={form.university} onChange={(event) => update('university', event.target.value)} placeholder="Örn. İstanbul Üniversitesi" />
        </label>
        <label className="komite-file-drop">
          <span>PDF / PPTX / DOCX / TXT yükle</span>
          <input type="file" accept=".pdf,.pptx,.docx,.txt,.md" onChange={(event) => handleFile(event.target.files?.[0])} />
          <strong>{selectedFile ? selectedFile.name : 'Dosya seç veya metin yapıştır'}</strong>
          <small>{fileNotice || 'PDF tercih edilir. Bu MVP, dosyayı güvenli metadata akışına alır.'}</small>
        </label>
        <label className="komite-textarea-label">
          <span>Okunabilir ders metni / slayt notu (opsiyonel ama önerilir)</span>
          <textarea value={form.pastedText} onChange={(event) => update('pastedText', event.target.value)} rows={7} placeholder="Slayttan kopyaladığın metni buraya yapıştırırsan AI ders, soru ve kartları daha materyal odaklı üretir." />
        </label>
        <div className="komite-form-actions">
          <button type="submit" className="btn btn-primary" disabled={!selectedFile && !form.pastedText.trim()}>
            <Icon name="Sparkles" /> Materyal çalışma alanı oluştur
          </button>
          <p>Dosya içeriği otomatik okunamıyorsa sistem bunu açıkça belirtir; uydurma görsel/şekil açıklaması yapmaz.</p>
        </div>
      </form>
    </section>
  );
}

function LessonView({ material, onGenerate }) {
  const lesson = material.lesson;
  if (!lesson) {
    return <EmptyState title="Ders anlatımı henüz hazır değil" text="Materyal için güvenli ders iskeleti oluşturabilirsin. API anahtarı varsa sunucu tarafı AI rotası kullanılabilir." action={<button type="button" className="btn btn-primary" onClick={onGenerate}>AI Ders Anlatımı oluştur</button>} />;
  }
  return (
    <div className="komite-lesson-view">
      <div className="komite-lesson-hero">
        <span className="komite-kicker">AI Ders Anlatımı</span>
        <h2>{lesson.title}</h2>
        <p>{lesson.overview}</p>
      </div>
      <div className="komite-objectives">
        <strong>Öğrenme hedefleri</strong>
        <ul>{(lesson.learningObjectives || []).map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      {(lesson.sections || []).map((section) => (
        <article className="komite-lesson-section" key={section.heading}>
          <h3>{section.heading}</h3>
          <p>{section.content}</p>
          {section.mechanismFlow?.length ? <div className="komite-flow-line">{section.mechanismFlow.map((step) => <span key={step}>{step}</span>)}</div> : null}
          <div className="komite-two-note-grid">
            <div><strong>Klinik bağlantı</strong><p>{section.clinicalConnection}</p></div>
            <div><strong>Sınav bağlantısı</strong><p>{section.examConnection}</p></div>
          </div>
        </article>
      ))}
      <div className="komite-summary-grid">
        <div>
          <strong>Can alıcı noktalar</strong>
          <ul>{(lesson.highYieldSummary || []).map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <strong>Mutlaka hatırla</strong>
          <ul>{(lesson.mustRemember || []).map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

function FiguresView({ material }) {
  const figures = material.lesson?.figureExplanations || [];
  if (!figures.length) return <EmptyState title="Görsel/şekil açıklaması yok" text="Bu materyalde okunabilir görsel bilgisi bulunamadı veya henüz analiz edilmedi." />;
  return (
    <div className="komite-figure-grid">
      {figures.map((figure, index) => (
        <article className="komite-figure-card" key={`${figure.title}-${index}`}>
          <span>{figure.sourcePageOrSlide}</span>
          <h3>{figure.title}</h3>
          <p>{figure.whatItShows}</p>
          <dl>
            <dt>Yorum</dt><dd>{figure.stepByStepInterpretation}</dd>
            <dt>Neden önemli?</dt><dd>{figure.whyItMatters}</dd>
            <dt>Sınav bağlantısı</dt><dd>{figure.examRelevance}</dd>
          </dl>
        </article>
      ))}
    </div>
  );
}

function QuestionsView({ material, onGenerate, onAnswer, onToggleQuestionFlag }) {
  const questions = material.questions || [];
  const [index, setIndex] = useState(0);
  const active = questions[index];

  useEffect(() => { if (index > questions.length - 1) setIndex(0); }, [questions.length, index]);

  if (!questions.length) {
    return <EmptyState title="AI soruları henüz oluşturulmadı" text="Bu materyal için 10 soruluk GoodNotes benzeri soru seti oluştur." action={<button type="button" className="btn btn-primary" onClick={onGenerate}>10 soru oluştur</button>} />;
  }

  const selected = active?.userAnswer;
  const correctId = active?.correctOptionId;
  const isAnswered = Boolean(selected);
  const selectedFeedback = selected ? active.optionFeedback?.[selected] : '';
  const correctFeedback = correctId ? active.optionFeedback?.[correctId] : '';

  return (
    <div className="komite-question-workspace">
      <div className="komite-question-nav" aria-label="Soru gezinme">
        {questions.map((question, idx) => (
          <button key={question.id} type="button" className={idx === index ? 'active' : question.userAnswer ? 'answered' : ''} onClick={() => setIndex(idx)}>{question.questionNumber || idx + 1}</button>
        ))}
      </div>
      {active ? (
        <article className="komite-question-card">
          <div className="komite-question-meta">
            <StatusPill tone={active.difficulty === 'hard' ? 'danger' : active.difficulty === 'medium' ? 'warning' : 'success'}>{active.difficulty}</StatusPill>
            <span>{active.learningTarget}</span>
          </div>
          <p className="komite-question-stem">{active.stem}</p>
          {active.supportingData?.length ? <div className="komite-supporting-data">{active.supportingData.map((item) => <span key={item}>{item}</span>)}</div> : null}
          <h3>{active.question}</h3>
          <div className="komite-option-list">
            {active.options.map((option) => {
              const stateClass = isAnswered && option.id === correctId ? 'correct' : isAnswered && option.id === selected ? 'wrong' : '';
              return (
                <button key={option.id} type="button" className={`komite-option ${stateClass}`.trim()} disabled={isAnswered} onClick={() => onAnswer(active.id, option.id)}>
                  <strong>{option.id}</strong><span>{option.text}</span>
                </button>
              );
            })}
          </div>
          {isAnswered ? (
            <div className="komite-feedback-box">
              {selected === correctId ? (
                <>
                  <strong>Doğru yanıt</strong>
                  <p>{active.explanation}</p>
                  <p className="komite-memory-note">{active.learningPoint}</p>
                </>
              ) : (
                <>
                  <strong>Neden yanlış yaptın?</strong>
                  <p>{selectedFeedback}</p>
                  <strong>Doğru seçenek neden doğru?</strong>
                  <p>{correctFeedback}</p>
                </>
              )}
            </div>
          ) : null}
          <div className="komite-question-actions">
            <button type="button" className={`btn btn-secondary ${active.isDifficult ? 'active' : ''}`} onClick={() => onToggleQuestionFlag(active.id, 'isDifficult')}>Zor</button>
            <button type="button" className={`btn btn-secondary ${active.isFavorite ? 'active' : ''}`} onClick={() => onToggleQuestionFlag(active.id, 'isFavorite')}>Favori</button>
          </div>
        </article>
      ) : null}
    </div>
  );
}

function FlashcardsView({ material, onGenerate, onUpdateCard }) {
  const deck = material.flashcardDeck;
  const cards = deck?.cards || [];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const active = cards[index];

  useEffect(() => { setFlipped(false); }, [index]);

  if (!cards.length) {
    return <EmptyState title="Hap kart destesi yok" text="Bu materyalden aktif geri çağırma kartları oluşturabilirsin." action={<button type="button" className="btn btn-primary" onClick={onGenerate}>Hap kartları oluştur</button>} />;
  }

  return (
    <div className="komite-flashcard-workspace">
      <div className="komite-flashcard-head">
        <div><span className="komite-kicker">{deck.deckTitle}</span><h3>{index + 1} / {cards.length}</h3></div>
        <div className="komite-flashcard-nav">
          <button type="button" className="btn btn-secondary" onClick={() => setIndex(Math.max(0, index - 1))}>Önceki</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIndex(Math.min(cards.length - 1, index + 1))}>Sonraki</button>
        </div>
      </div>
      <button type="button" className={`komite-flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((current) => !current)}>
        <span>{flipped ? 'Yanıt' : 'Soru'}</span>
        <strong>{flipped ? active.back : active.front}</strong>
        {flipped ? <p>{active.explanation}</p> : <small>Yanıtı görmek için karta tıkla.</small>}
      </button>
      <div className="komite-card-actions">
        <button type="button" className="btn btn-secondary" onClick={() => onUpdateCard(active.id, { repeatStatus: 'known', isDifficult: false })}>Biliyorum</button>
        <button type="button" className="btn btn-secondary" onClick={() => onUpdateCard(active.id, { repeatStatus: 'repeat' })}>Tekrar et</button>
        <button type="button" className="btn btn-secondary" onClick={() => onUpdateCard(active.id, { isDifficult: !active.isDifficult, repeatStatus: 'repeat' })}>Zor</button>
        <button type="button" className="btn btn-secondary" onClick={() => onUpdateCard(active.id, { isFavorite: !active.isFavorite })}>Favori</button>
      </div>
    </div>
  );
}

function ReviewCenter({ materials, activeMaterial, onOpenMaterial }) {
  const [filter, setFilter] = useState('Bu materyal');
  const scopeMaterials = filter === 'Bu materyal' && activeMaterial ? [activeMaterial] : materials;
  const wrongQuestions = scopeMaterials.flatMap((material) => (material.questions || []).filter((question) => question.isWrong).map((question) => ({ ...question, material })));
  const difficultCards = scopeMaterials.flatMap((material) => (material.flashcardDeck?.cards || []).filter((card) => card.isDifficult || card.repeatStatus === 'repeat').map((card) => ({ ...card, material })));
  const favorites = scopeMaterials.flatMap((material) => [
    ...(material.questions || []).filter((question) => question.isFavorite).map((question) => ({ ...question, itemKind: 'Soru', material })),
    ...(material.flashcardDeck?.cards || []).filter((card) => card.isFavorite).map((card) => ({ ...card, itemKind: 'Kart', material })),
  ]);

  return (
    <div className="komite-review-center">
      <div className="komite-review-toolbar">
        {REVIEW_FILTERS.map((item) => (
          <button key={item} type="button" className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>
      <div className="komite-review-grid">
        <section>
          <h3>Yanlış Sorular</h3>
          {wrongQuestions.length ? wrongQuestions.map((question) => <button type="button" key={question.id} onClick={() => onOpenMaterial(question.material.id)}>{question.material.fileName}<span>{question.question}</span></button>) : <p>Bu kapsamda yanlış soru yok.</p>}
        </section>
        <section>
          <h3>Zor Kartlar / Tekrar Et</h3>
          {difficultCards.length ? difficultCards.map((card) => <button type="button" key={card.id} onClick={() => onOpenMaterial(card.material.id)}>{card.material.fileName}<span>{card.front}</span></button>) : <p>Tekrar kuyruğu boş.</p>}
        </section>
        <section>
          <h3>Favoriler</h3>
          {favorites.length ? favorites.map((item) => <button type="button" key={item.id} onClick={() => onOpenMaterial(item.material.id)}>{item.itemKind}<span>{item.front || item.question}</span></button>) : <p>Henüz favori işaretlenmedi.</p>}
        </section>
        <section>
          <h3>Zayıf Konular</h3>
          {wrongQuestions.length || difficultCards.length ? <p>Öncelik: {wrongQuestions[0]?.learningTarget || difficultCards[0]?.tags?.[0] || 'materyal tekrarı'}.</p> : <p>Çalışma verisi biriktikçe zayıf konu listesi oluşur.</p>}
        </section>
      </div>
    </div>
  );
}

function StudyWorkspace({ material, materials, onBack, onPatchMaterial, onOpenMaterial }) {
  const [tab, setTab] = useState('lesson');
  const [busy, setBusy] = useState('');

  const runWithLocalFallback = async (kind) => {
    setBusy(kind);
    const sourceText = normalizeSourceText(material);
    const studyContext = {
      classYear: material.classYear,
      committeeOrCourse: material.committee || material.course,
      learningTarget: material.learningTarget,
      studyMode: 'komite',
    };
    try {
      let nextPatch = {};
      let analysis = material.materialAnalysis || buildMaterialAnalysisFallback(material);

      if (sourceText.length > 120 && !material.materialAnalysis) {
        try {
          const analyzed = await postKomiteAI('/api/analyze-uploaded-material', {
            metadata: { ...material, committeeOrCourse: material.committee || material.course },
            extractedTextOrChunks: sourceText.slice(0, 16000),
          });
          analysis = analyzed.analysis || analysis;
        } catch {
          analysis = buildMaterialAnalysisFallback(material);
        }
      }

      if (kind === 'lesson') {
        try {
          const generated = sourceText.length > 120 ? await postKomiteAI('/api/generate-lesson', {
            studyContext,
            materialAnalysisJson: analysis,
            sourceTextChunks: sourceText.slice(0, 12000),
          }) : null;
          nextPatch = { materialAnalysis: analysis, lesson: generated?.lesson || buildLocalLesson(material), processingStatus: 'lesson-ready' };
        } catch {
          nextPatch = { materialAnalysis: analysis, lesson: buildLocalLesson(material), processingStatus: 'lesson-ready' };
        }
      } else if (kind === 'questions') {
        const lesson = material.lesson || buildLocalLesson(material);
        try {
          const generated = sourceText.length > 120 ? await postKomiteAI('/api/generate-material-questions', {
            studyContext,
            materialAnalysisJson: analysis,
            generatedLessonJson: lesson,
          }) : null;
          const questions = Array.isArray(generated?.questions) ? generated.questions.map((question, index) => ({
            ...question,
            id: question.id || createId('komite-q'),
            materialId: material.id,
            mode: 'komite',
            questionNumber: question.questionNumber || index + 1,
            userAnswer: null,
            isWrong: false,
            isFavorite: false,
            isDifficult: false,
            createdAt: Date.now(),
          })) : buildLocalQuestions(material, lesson);
          nextPatch = { materialAnalysis: analysis, lesson, questions, processingStatus: 'questions-ready' };
        } catch {
          nextPatch = { materialAnalysis: analysis, lesson, questions: buildLocalQuestions(material, lesson), processingStatus: 'questions-ready' };
        }
      } else if (kind === 'cards') {
        const lesson = material.lesson || buildLocalLesson(material);
        try {
          const generated = sourceText.length > 120 ? await postKomiteAI('/api/generate-material-flashcards', {
            studyContext,
            materialAnalysisJson: analysis,
            generatedLessonJson: lesson,
            materialId: material.id,
          }) : null;
          const deck = generated?.deck?.cards?.length ? {
            ...generated.deck,
            id: generated.deck.id || createId('deck'),
            materialId: material.id,
            cards: generated.deck.cards.map((card) => ({
              ...card,
              id: card.id || createId('card'),
              userId: material.userId,
              materialId: material.id,
              mode: 'komite',
              classYear: material.classYear,
              committee: material.committee,
              course: material.course,
              isUserCreated: false,
              isFavorite: Boolean(card.isFavorite),
              isDifficult: Boolean(card.isDifficult),
              repeatStatus: card.repeatStatus || 'new',
              createdAt: Date.now(),
            })),
          } : buildLocalFlashcards(material, lesson);
          nextPatch = { materialAnalysis: analysis, lesson, flashcardDeck: deck, processingStatus: 'cards-ready' };
        } catch {
          nextPatch = { materialAnalysis: analysis, lesson, flashcardDeck: buildLocalFlashcards(material, lesson), processingStatus: 'cards-ready' };
        }
      }
      onPatchMaterial(material.id, nextPatch);
    } finally {
      window.setTimeout(() => setBusy(''), 220);
    }
  };

  const answerQuestion = (questionId, selectedId) => {
    const questions = (material.questions || []).map((question) => {
      if (question.id !== questionId || question.userAnswer) return question;
      return {
        ...question,
        userAnswer: selectedId,
        isWrong: selectedId !== question.correctOptionId,
        isDifficult: selectedId !== question.correctOptionId ? true : question.isDifficult,
      };
    });
    onPatchMaterial(material.id, { questions });
  };

  const toggleQuestionFlag = (questionId, field) => {
    const questions = (material.questions || []).map((question) => question.id === questionId ? { ...question, [field]: !question[field] } : question);
    onPatchMaterial(material.id, { questions });
  };

  const updateCard = (cardId, patch) => {
    const deck = material.flashcardDeck;
    if (!deck?.cards) return;
    const cards = deck.cards.map((card) => card.id === cardId ? { ...card, ...patch } : card);
    onPatchMaterial(material.id, { flashcardDeck: { ...deck, cards } });
  };

  return (
    <section className="komite-workspace card-surface">
      <div className="komite-workspace-header">
        <button type="button" className="branch-back-v8" onClick={onBack}><span aria-hidden="true">←</span><span>Komite ana ekranı</span></button>
        <div>
          <span className="komite-kicker">{material.classYear}. sınıf · {material.committee || material.course || 'Komite/Ders'}</span>
          <h2>{material.fileName}</h2>
          <p>{material.learningTarget} · {new Date(material.uploadDate).toLocaleDateString('tr-TR')}</p>
        </div>
        <div className="komite-workspace-actions">
          <StatusPill tone={material.processingStatus?.includes('ready') ? 'success' : 'neutral'}>{busy ? 'Hazırlanıyor' : material.processingStatus || 'metadata-ready'}</StatusPill>
          <button type="button" className="btn btn-secondary" onClick={() => runWithLocalFallback('lesson')}>Ders</button>
          <button type="button" className="btn btn-secondary" onClick={() => runWithLocalFallback('questions')}>10 Soru</button>
          <button type="button" className="btn btn-secondary" onClick={() => runWithLocalFallback('cards')}>Kart</button>
        </div>
      </div>
      <div className="komite-tabbar" role="tablist" aria-label="Materyal çalışma alanı sekmeleri">
        {STUDY_TABS.map((item) => <button key={item.id} type="button" className={tab === item.id ? 'active' : ''} onClick={() => setTab(item.id)}>{item.label}</button>)}
      </div>
      <div className="komite-tab-panel">
        {tab === 'lesson' ? <LessonView material={material} onGenerate={() => runWithLocalFallback('lesson')} /> : null}
        {tab === 'figures' ? <FiguresView material={material} /> : null}
        {tab === 'questions' ? <QuestionsView material={material} onGenerate={() => runWithLocalFallback('questions')} onAnswer={answerQuestion} onToggleQuestionFlag={toggleQuestionFlag} /> : null}
        {tab === 'cards' ? <FlashcardsView material={material} onGenerate={() => runWithLocalFallback('cards')} onUpdateCard={updateCard} /> : null}
        {tab === 'review' ? <ReviewCenter materials={materials} activeMaterial={material} onOpenMaterial={onOpenMaterial} /> : null}
      </div>
    </section>
  );
}

function CardsHub({ materials, onOpenMaterial, onBack }) {
  const decks = materials.filter((material) => material.flashcardDeck?.cards?.length);
  return (
    <section className="komite-subpage card-surface">
      <div className="komite-section-head">
        <div><span className="komite-kicker">Hap Kartlar</span><h2>Materyal bazlı kart desteleri</h2><p>Kartlar sınıf, komite ve materyal ağacına bağlı kalır.</p></div>
        <button type="button" className="btn btn-secondary" onClick={onBack}>Ana ekrana dön</button>
      </div>
      {decks.length ? <div className="komite-deck-grid">{decks.map((material) => <button type="button" key={material.id} onClick={() => onOpenMaterial(material.id)}><strong>{material.flashcardDeck.deckTitle}</strong><span>{material.fileName}</span><small>{material.flashcardDeck.cards.length} kart</small></button>)}</div> : <EmptyState title="Henüz kart destesi yok" text="Bir materyal açıp Hap Kartlar sekmesinden kart oluşturabilirsin." />}
    </section>
  );
}

function MyMaterialsPage({ materials, activeMaterialId, onOpenMaterial, onBack }) {
  return (
    <section className="komite-subpage card-surface">
      <div className="komite-section-head">
        <div><span className="komite-kicker">Çalıştıklarım</span><h2>Sınıf → komite → materyal ağacı</h2><p>KOMİTE materyalleri TUS olgu havuzundan ayrı tutulur.</p></div>
        <button type="button" className="btn btn-secondary" onClick={onBack}>Ana ekrana dön</button>
      </div>
      <MaterialTree materials={materials} activeMaterialId={activeMaterialId} onOpenMaterial={onOpenMaterial} />
    </section>
  );
}

export default function KomiteModeWorkspace({ currentUser }) {
  const userId = currentUser?.id || 'local-user';
  const [materials, setMaterials] = useState(() => readUserMaterials(userId));
  const [view, setView] = useState('dashboard');
  const [activeMaterialId, setActiveMaterialId] = useState(() => readUserMaterials(userId)[0]?.id || null);

  useEffect(() => {
    const userMaterials = readUserMaterials(userId);
    setMaterials(userMaterials);
    setActiveMaterialId((current) => current || userMaterials[0]?.id || null);
  }, [userId]);

  useEffect(() => {
    writeUserMaterials(userId, materials);
  }, [materials, userId]);

  const activeMaterial = useMemo(() => materials.find((material) => material.id === activeMaterialId) || materials[0] || null, [materials, activeMaterialId]);
  const stats = useMemo(() => ({
    readyMaterials: materials.filter((material) => material.lesson || material.questions?.length || material.flashcardDeck?.cards?.length).length,
    cardCount: materials.reduce((sum, material) => sum + (material.flashcardDeck?.cards?.length || 0), 0),
    difficultCards: materials.reduce((sum, material) => sum + (material.flashcardDeck?.cards || []).filter((card) => card.isDifficult).length, 0),
    wrongQuestions: materials.reduce((sum, material) => sum + (material.questions || []).filter((question) => question.isWrong).length, 0),
    favoriteItems: materials.reduce((sum, material) => sum + (material.questions || []).filter((question) => question.isFavorite).length + (material.flashcardDeck?.cards || []).filter((card) => card.isFavorite).length, 0),
  }), [materials]);

  const createMaterial = ({ file, extractedText, pastedText, ...form }) => {
    const fileName = file?.name || `${form.course || form.committee || 'Komite materyali'}.txt`;
    const newMaterial = {
      id: createId('material'),
      userId,
      fileName,
      fileType: getFileType(fileName),
      uploadDate: Date.now(),
      studyMode: 'komite',
      classYear: form.classYear,
      university: form.university,
      committee: form.committee,
      course: form.course,
      learningTarget: form.learningTarget,
      processingStatus: 'metadata-ready',
      extractedText: extractedText || '',
      extractedFigures: [],
      pastedText: pastedText || '',
      lesson: null,
      questions: [],
      flashcardDeck: null,
      reviewItems: [],
    };
    setMaterials((current) => [newMaterial, ...current]);
    setActiveMaterialId(newMaterial.id);
    setView('workspace');
  };

  const patchMaterial = (materialId, patch) => {
    setMaterials((current) => current.map((material) => material.id === materialId ? { ...material, ...patch, updatedAt: Date.now() } : material));
  };

  const openMaterial = (materialId) => {
    setActiveMaterialId(materialId);
    setView('workspace');
  };

  return (
    <section className="page-shell komite-page-shell">
      <section className="komite-hero card-surface">
        <div>
          <span className="komite-kicker"><Icon name="ShieldCheck" size={16} /> KOMİTE öğrenme modu</span>
          <h1>Slayttan derse, dersten soruya giden çalışma alanı.</h1>
          <p>Bu alan TUS modundan ayrıdır. Öğrenci sınıf/komite seçer, materyal ekler ve o materyale bağlı ders, soru, kart ve tekrar akışı oluşturur.</p>
        </div>
        <div className="komite-hero-stats">
          <span><strong>{materials.length}</strong> materyal</span>
          <span><strong>{stats.cardCount}</strong> kart</span>
          <span><strong>{stats.wrongQuestions}</strong> yanlış</span>
        </div>
      </section>

      {view === 'dashboard' ? (
        <KomiteDashboard
          materials={materials}
          stats={stats}
          onStart={() => setView('start')}
          onOpenMyMaterials={() => setView('materials')}
          onOpenCards={() => setView('cards')}
          onOpenReview={() => setView('review')}
          onOpenMaterial={openMaterial}
        />
      ) : null}

      {view === 'start' ? <StartFlow onCreate={createMaterial} onCancel={() => setView('dashboard')} /> : null}
      {view === 'materials' ? <MyMaterialsPage materials={materials} activeMaterialId={activeMaterialId} onOpenMaterial={openMaterial} onBack={() => setView('dashboard')} /> : null}
      {view === 'cards' ? <CardsHub materials={materials} onOpenMaterial={openMaterial} onBack={() => setView('dashboard')} /> : null}
      {view === 'review' ? <section className="komite-subpage card-surface"><div className="komite-section-head"><div><span className="komite-kicker">Tekrar Merkezi</span><h2>Materyal odaklı tekrar</h2><p>Varsayılan kapsam aktif materyaldir; tüm materyallere geçiş kontrollüdür.</p></div><button type="button" className="btn btn-secondary" onClick={() => setView('dashboard')}>Ana ekrana dön</button></div><ReviewCenter materials={materials} activeMaterial={activeMaterial} onOpenMaterial={openMaterial} /></section> : null}
      {view === 'workspace' && activeMaterial ? <StudyWorkspace material={activeMaterial} materials={materials} onBack={() => setView('dashboard')} onPatchMaterial={patchMaterial} onOpenMaterial={openMaterial} /> : null}
    </section>
  );
}
