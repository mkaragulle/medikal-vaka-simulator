import { memo, useEffect, useMemo, useState } from 'react';
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
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setForm(buildInitialForm(initialCard, defaultCatalogId));
    setAdvancedOpen(Boolean(initialCard?.topic || initialCard?.tags?.length || initialCard?.keywords?.length));
    setError('');
  }, [defaultCatalogId, initialCard, open]);

  const title = useMemo(() => {
    if (mode === 'edit') return 'Kartı düzenle';
    if (mode === 'copy') return 'Kendi kartıma kopyala';
    return 'Kendi kartını oluştur';
  }, [mode]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
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
      setError('Arka yüz boş olamaz.');
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

  if (!open) return null;

  return (
    <div className="pearl-editor-backdrop" role="presentation">
      <section className="pearl-editor-modal card-surface" role="dialog" aria-modal="true" aria-label={title}>
        <header className="pearl-editor-head">
          <div>
            <p className="auth-eyebrow">Kişisel hap kart</p>
            <h2>{title}</h2>
            <span>Öğrendiğin bilgiyi kısa bir aktif hatırlama kartına dönüştür.</span>
          </div>
          <button type="button" className="btn btn-icon quiet" onClick={onClose} aria-label="Kart editörünü kapat">
            <Icon name="X" />
          </button>
        </header>

        <form className="pearl-editor-form" onSubmit={handleSubmit}>
          <label>
            <span>Ön yüz / aktif hatırlama</span>
            <textarea value={form.front} onChange={(event) => updateField('front', event.target.value)} placeholder="Örnek: Anafilakside hayat kurtarıcı ilk tedavi nedir?" rows={3} />
          </label>
          <label>
            <span>Yanıt</span>
            <textarea value={form.back} onChange={(event) => updateField('back', event.target.value)} placeholder="Net cevap: İntramüsküler adrenalin." rows={3} />
          </label>
          <label>
            <span>Kısa gerekçe</span>
            <textarea value={form.explanation} onChange={(event) => updateField('explanation', event.target.value)} placeholder="1–2 cümlelik bilimsel gerekçe ekle. Ön yüz cümlesini tekrar etme." rows={2} />
          </label>

          <div className="pearl-editor-lite-grid">
            <label>
              <span>TUS ipucu</span>
              <textarea value={form.tusTip} onChange={(event) => updateField('tusTip', event.target.value)} placeholder="Sınavda yakalanacak kısa patern" rows={2} />
            </label>
            <label>
              <span>Ayırıcı not</span>
              <textarea value={form.differentialNote} onChange={(event) => updateField('differentialNote', event.target.value)} placeholder="Benzer kavramla farkı veya çeldirici tuzağı" rows={2} />
            </label>
          </div>

          <div className="pearl-editor-lite-grid">
            <label>
              <span>Branş</span>
              <select value={form.branchId} onChange={(event) => updateField('branchId', event.target.value)}>
                {branches.map((branch) => <option key={branch.id} value={branch.id}>{branch.shortName || branch.name}</option>)}
              </select>
            </label>
            <label>
              <span>Katalog</span>
              <select value={form.catalogId} onChange={(event) => updateField('catalogId', event.target.value)}>
                <option value="">Kendi kartlarım</option>
                {catalogs.map((catalog) => <option key={catalog.id} value={catalog.id}>{catalog.name}</option>)}
              </select>
            </label>
          </div>

          <button type="button" className="pearl-editor-advanced-toggle" onClick={() => setAdvancedOpen((current) => !current)}>
            <Icon name={advancedOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
            <span>Gelişmiş alanlar</span>
          </button>

          {advancedOpen ? (
            <div className="pearl-editor-advanced-grid">
              <label>
                <span>Konu</span>
                <input value={form.topic} onChange={(event) => updateField('topic', event.target.value)} placeholder="Beta blokerler, anafilaksi..." />
              </label>
              <label>
                <span>Ders / başlık</span>
                <input value={form.subject} onChange={(event) => updateField('subject', event.target.value)} placeholder="Tıbbi Farmakoloji" />
              </label>
              <label>
                <span>Etiketler</span>
                <input value={form.tags} onChange={(event) => updateField('tags', event.target.value)} placeholder="farmakoloji, kontrendikasyon" />
              </label>
              <label>
                <span>Anahtar kelimeler</span>
                <input value={form.keywords} onChange={(event) => updateField('keywords', event.target.value)} placeholder="beta-2 blokajı, bronkospazm" />
              </label>
              <label>
                <span>Zorluk</span>
                <select value={form.difficulty} onChange={(event) => updateField('difficulty', event.target.value)}>
                  <option value="kolay">Kolay</option>
                  <option value="orta">Orta</option>
                  <option value="zor">Zor</option>
                </select>
              </label>
              <label>
                <span>Çıkmış yıl</span>
                <input value={form.appearedYears} onChange={(event) => updateField('appearedYears', event.target.value)} placeholder="2021, 2023" />
              </label>
            </div>
          ) : null}

          {error ? <p className="pearl-editor-error">{error}</p> : null}

          <footer className="pearl-editor-actions">
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
}

export default memo(TusPearlCardEditor);
