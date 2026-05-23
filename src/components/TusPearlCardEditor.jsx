import { memo, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './ui.jsx';
import { branches } from '../data/branches.js';
import { createUserPearlCardId, normalizeUserPearlCard } from '../utils/pearlCardStorage.js';

const EMPTY_FORM = {
  front: '',
  back: '',
  explanation: '',
  tusTip: '',
  differentialNote: '',
  branchId: 'tus-spot-olgular',
  subject: '',
  topic: '',
  tags: '',
  keywords: '',
  difficulty: 'orta',
  catalogId: '',
  appearedYears: '',
};

const ADVANCED_FIELDS = [
  'tusTip',
  'differentialNote',
  'subject',
  'topic',
  'tags',
  'keywords',
  'difficulty',
  'appearedYears',
];

function arrayToText(value = []) {
  return Array.isArray(value) ? value.join(', ') : String(value || '');
}

function buildInitialForm(card, defaultCatalogId = '') {
  if (!card) return { ...EMPTY_FORM, catalogId: defaultCatalogId || '' };
  return {
    front: card.front || '',
    back: card.back || '',
    explanation: card.explanation || '',
    tusTip: card.tusTip || '',
    differentialNote: card.differentialNote || '',
    branchId: card.branchId || 'tus-spot-olgular',
    subject: card.subject || '',
    topic: card.topic || '',
    tags: arrayToText(card.tags),
    keywords: arrayToText(card.keywords),
    difficulty: card.difficulty || 'orta',
    catalogId: defaultCatalogId || card.catalogIds?.[0] || '',
    appearedYears: arrayToText(card.appearedYears),
  };
}

function pickAdvancedFields(source) {
  return ADVANCED_FIELDS.reduce((acc, key) => {
    acc[key] = source?.[key] ?? EMPTY_FORM[key] ?? '';
    return acc;
  }, {});
}

function countFilledAdvancedFields(source) {
  return ADVANCED_FIELDS.filter((key) => String(source?.[key] || '').trim()).length;
}

function TusPearlCardEditor({
  open = false,
  mode = 'create',
  initialCard = null,
  defaultCatalogId = '',
  catalogs = [],
  existingCards = [],
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(() => buildInitialForm(initialCard, defaultCatalogId));
  const [advancedDialogOpen, setAdvancedDialogOpen] = useState(false);
  const [advancedDraft, setAdvancedDraft] = useState(() => pickAdvancedFields(EMPTY_FORM));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const nextForm = buildInitialForm(initialCard, defaultCatalogId);
    setForm(nextForm);
    setAdvancedDraft(pickAdvancedFields(nextForm));
    setAdvancedDialogOpen(false);
    setError('');
  }, [defaultCatalogId, initialCard, open]);

  const title = useMemo(() => {
    if (mode === 'edit') return 'Kartı düzenle';
    if (mode === 'copy') return 'Kendi kartıma kopyala';
    return 'Kendi kartını oluştur';
  }, [mode]);

  const filledAdvancedCount = useMemo(() => countFilledAdvancedFields(form), [form]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function openAdvancedDialog() {
    setAdvancedDraft(pickAdvancedFields(form));
    setAdvancedDialogOpen(true);
  }

  function closeAdvancedDialog() {
    setAdvancedDialogOpen(false);
  }

  function updateAdvancedDraft(field, value) {
    setAdvancedDraft((current) => ({ ...current, [field]: value }));
  }

  function saveAdvancedDraft() {
    setForm((current) => ({ ...current, ...advancedDraft }));
    setAdvancedDialogOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const front = form.front.trim();
    const back = form.back.trim();
    if (!front) {
      setError('Ön yüz boş olamaz.');
      return;
    }
    if (!back) {
      setError('Yanıt boş olamaz.');
      return;
    }
    if (front.length > 600 || back.length > 900) {
      setError('Kart metni çok uzunsa çalışma akışı bozulur. Ön/arka yüzü daha kısa tut.');
      return;
    }
    const duplicate = existingCards.find((card) => (
      card.id !== initialCard?.id
      && String(card.front || '').trim().toLocaleLowerCase('tr') === front.toLocaleLowerCase('tr')
    ));
    if (duplicate) {
      setError('Bu ön yüze çok benzeyen bir kart zaten var. Farklılaştırarak kaydet.');
      return;
    }

    const now = new Date().toISOString();
    const nextCard = normalizeUserPearlCard({
      id: mode === 'edit' && initialCard?.source === 'user' ? initialCard.id : createUserPearlCardId(),
      source: 'user',
      createdAt: mode === 'edit' && initialCard?.createdAt ? initialCard.createdAt : now,
      updatedAt: now,
      branchId: form.branchId,
      subject: form.subject,
      topic: form.topic,
      front,
      back,
      explanation: form.explanation,
      tusTip: form.tusTip,
      differentialNote: form.differentialNote,
      keywords: form.keywords,
      tags: form.tags,
      difficulty: form.difficulty,
      catalogIds: form.catalogId ? [form.catalogId] : [],
      appearedYears: form.appearedYears,
      isPastQuestionDerived: Boolean(form.appearedYears.trim()),
      cardType: 'Kişisel kart',
      status: 'new',
    });
    onSave?.(nextCard, { catalogId: form.catalogId });
  }

  useEffect(() => {
    if (!open || typeof document === 'undefined') return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key !== 'Escape') return;
      if (advancedDialogOpen) {
        setAdvancedDialogOpen(false);
        return;
      }
      onClose?.();
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [advancedDialogOpen, onClose, open]);

  if (!open) return null;

  const modalTree = (
    <div
      className="pearl-editor-backdrop pearl-min-overlay"
      role="presentation"
      onClick={() => onClose?.()}
    >
      <section
        className="pearl-editor-modal pearl-min-modal card-surface"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="pearl-min-header">
          <div className="pearl-min-title">
            <h2>{title}</h2>
            <p>Kart içeriğini ekle.</p>
          </div>
          <button type="button" className="btn btn-icon quiet pearl-min-close" onClick={onClose} aria-label="Kart editörünü kapat">
            <Icon name="X" />
          </button>
        </header>

        <form className="pearl-min-form" onSubmit={handleSubmit}>
          <div className="pearl-min-scroll">
            <div className="pearl-min-main">
              <label className="pearl-min-field pearl-min-field-front">
                <span>Ön yüz</span>
                <textarea
                  value={form.front}
                  onChange={(event) => updateField('front', event.target.value)}
                  placeholder="Örnek: Anafilakside hayat kurtarıcı ilk tedavi nedir?"
                  rows={5}
                />
              </label>

              <div className="pearl-min-stack">
                <label className="pearl-min-field">
                  <span>Yanıt</span>
                  <textarea
                    value={form.back}
                    onChange={(event) => updateField('back', event.target.value)}
                    placeholder="Net cevap: İntramüsküler adrenalin."
                    rows={3}
                  />
                </label>

                <label className="pearl-min-field">
                  <span>Kısa gerekçe</span>
                  <textarea
                    value={form.explanation}
                    onChange={(event) => updateField('explanation', event.target.value)}
                    placeholder="1–2 cümlelik bilimsel gerekçe ekle."
                    rows={3}
                  />
                </label>
              </div>
            </div>

            <div className="pearl-min-meta">
              <label className="pearl-min-field pearl-min-select">
                <span>Branş</span>
                <select value={form.branchId} onChange={(event) => updateField('branchId', event.target.value)}>
                  {branches.map((branch) => <option key={branch.id} value={branch.id}>{branch.shortName || branch.name}</option>)}
                </select>
              </label>

              <label className="pearl-min-field pearl-min-select">
                <span>Katalog</span>
                <select value={form.catalogId} onChange={(event) => updateField('catalogId', event.target.value)}>
                  <option value="">Kendi kartlarım</option>
                  {catalogs.map((catalog) => <option key={catalog.id} value={catalog.id}>{catalog.name}</option>)}
                </select>
              </label>

              <button type="button" className="pearl-min-advanced-trigger" onClick={openAdvancedDialog}>
                <span>Opsiyonel alanlar</span>
                <b>{filledAdvancedCount}</b>
              </button>
            </div>

            {error ? <p className="pearl-editor-error pearl-min-error">{error}</p> : null}
          </div>

          <footer className="pearl-min-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Vazgeç</button>
            <button type="submit" className="btn btn-primary">
              <Icon name="LayeredCards" />
              <span>Kaydet</span>
            </button>
          </footer>
        </form>
      </section>
    </div>
  );

  const advancedDialogTree = advancedDialogOpen ? (
    <div
      className="pearl-editor-secondary-backdrop pearl-min-sub-overlay"
      role="presentation"
      onClick={(event) => {
        event.stopPropagation();
        closeAdvancedDialog();
      }}
    >
      <section
        className="pearl-editor-secondary-modal pearl-min-sub-modal card-surface"
        role="dialog"
        aria-modal="true"
        aria-label="Opsiyonel alanlar"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="pearl-min-sub-header">
          <div className="pearl-min-title">
            <h3>Opsiyonel alanlar</h3>
            <p>İsteğe bağlı kart detayları.</p>
          </div>
          <button type="button" className="btn btn-icon quiet pearl-min-close" onClick={closeAdvancedDialog} aria-label="Opsiyonel alanları kapat">
            <Icon name="X" />
          </button>
        </header>

        <div className="pearl-min-sub-grid">
          <label className="pearl-min-sub-field">
            <span>TUS ipucu</span>
            <input value={advancedDraft.tusTip} onChange={(event) => updateAdvancedDraft('tusTip', event.target.value)} placeholder="Kısa patern" />
          </label>
          <label className="pearl-min-sub-field">
            <span>Ayırıcı not</span>
            <input value={advancedDraft.differentialNote} onChange={(event) => updateAdvancedDraft('differentialNote', event.target.value)} placeholder="Benzer kavram farkı" />
          </label>
          <label className="pearl-min-sub-field">
            <span>Konu</span>
            <input value={advancedDraft.topic} onChange={(event) => updateAdvancedDraft('topic', event.target.value)} placeholder="Adrenal kriz" />
          </label>
          <label className="pearl-min-sub-field">
            <span>Ders / başlık</span>
            <input value={advancedDraft.subject} onChange={(event) => updateAdvancedDraft('subject', event.target.value)} placeholder="İç Hastalıkları" />
          </label>
          <label className="pearl-min-sub-field">
            <span>Zorluk</span>
            <select value={advancedDraft.difficulty} onChange={(event) => updateAdvancedDraft('difficulty', event.target.value)}>
              <option value="kolay">Kolay</option>
              <option value="orta">Orta</option>
              <option value="zor">Zor</option>
            </select>
          </label>
          <label className="pearl-min-sub-field">
            <span>Etiketler</span>
            <input value={advancedDraft.tags} onChange={(event) => updateAdvancedDraft('tags', event.target.value)} placeholder="farmakoloji, kontrendikasyon" />
          </label>
          <label className="pearl-min-sub-field">
            <span>Anahtar kelimeler</span>
            <input value={advancedDraft.keywords} onChange={(event) => updateAdvancedDraft('keywords', event.target.value)} placeholder="hipotansiyon, hiperkalemi" />
          </label>
          <label className="pearl-min-sub-field">
            <span>Çıkmış yıl</span>
            <input value={advancedDraft.appearedYears} onChange={(event) => updateAdvancedDraft('appearedYears', event.target.value)} placeholder="2021, 2023" />
          </label>
        </div>

        <footer className="pearl-min-sub-footer">
          <button type="button" className="btn btn-secondary" onClick={closeAdvancedDialog}>Vazgeç</button>
          <button type="button" className="btn btn-primary" onClick={saveAdvancedDraft}>
            <Icon name="CheckCircle" />
            <span>Kaydet</span>
          </button>
        </footer>
      </section>
    </div>
  ) : null;

  if (typeof document === 'undefined') {
    return (
      <>
        {modalTree}
        {advancedDialogTree}
      </>
    );
  }

  return (
    <>
      {createPortal(modalTree, document.body)}
      {advancedDialogTree ? createPortal(advancedDialogTree, document.body) : null}
    </>
  );
}

export default memo(TusPearlCardEditor);
