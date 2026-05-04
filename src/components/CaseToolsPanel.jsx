import { useEffect, useMemo, useState } from 'react';
import { localBackend } from '../services/localBackend.js';
import { Icon, IconBadge } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';

function formatTime(totalSeconds = 0) {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60).toString().padStart(2, '0');
  const seconds = Math.floor(safe % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function buildChecklist() {
  return [
    'Yakınmanın başlangıcı, süresi ve paternini birlikte değerlendir.',
    'Önce aciliyet düzeyi ve hemodinamik stabiliteyi netleştir.',
    'Tanı seçeneklerini olgunun baskın klinik paterniyle karşılaştır.',
  ];
}

const QUICK_NOTE_SNIPPETS = [
  { label: 'Ön tanı', value: 'Ön tanı: ' },
  { label: 'Ayırıcı tanı', value: 'Ayırıcı tanı: ' },
  { label: 'Klinik not', value: 'Klinik not: ' },
  { label: 'İlk yönetim', value: 'İlk yönetim: ' },
];

const HIGHLIGHT_COLORS = [
  { color: 'yellow', label: 'Sarı' },
  { color: 'green', label: 'Yeşil' },
  { color: 'blue', label: 'Mavi' },
  { color: 'rose', label: 'Pembe' },
];

function CaseToolsPanel({
  clinicalCase,
  tutorMode,
  onToggleTutorMode,
  highlightCount,
  onClearHighlights,
  examMeta,
  activeHighlighter = 'yellow',
  onChangeHighlighter,
  hardMode = false,
}) {
  const storageKey = `medsim-notes-${clinicalCase.id}`;
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      setNotes(localBackend.readNote(clinicalCase.id) ?? '');
    } catch {
      setNotes('');
    }
  }, [storageKey, clinicalCase.id]);

  useEffect(() => {
    try {
      localBackend.writeNote(clinicalCase.id, notes);
    } catch {
      // localStorage unavailable
    }
  }, [storageKey, notes, clinicalCase.id]);

  const progress = useMemo(() => {
    if (!examMeta?.active) return null;
    const answered = Object.keys(examMeta.answers || {}).length;
    return `${answered}/${examMeta.total}`;
  }, [examMeta]);

  const checklist = useMemo(() => buildChecklist(), []);
  const statusText = examMeta?.active ? `${formatTime(examMeta.remainingSeconds)} · ${progress}` : highlightCount ? `${highlightCount} vurgu` : 'Eğitim modu';

  const appendSnippet = (snippet) => {
    setNotes((current) => current.trim() ? `${current.trim()}
${snippet}` : snippet);
  };

  if (examMeta?.active || hardMode) {
    return (
      <aside className="tools-panel clinical-tools-panel exam-tools-compact" aria-label="Sınav durumu">
        <div className="compact-tool-status-row" aria-label="Sınav durumu">
          <span className="muted-section-label">{hardMode ? 'Zor mod' : 'Sınav modu'}</span>
          <span className="panel-status-chip" aria-live="polite">{hardMode ? 'Az ipucu' : statusText}</span>
        </div>
        <p className="exam-tools-note">Destek araçları azaltıldı; bu ekranda olgu verileri, ham tetkik sonuçları ve tanısal karar ön plandadır.</p>
      </aside>
    );
  }

  return (
    <aside className="tools-panel clinical-tools-panel" aria-label="Klinik çalışma araçları">
      <div className="compact-tool-status-row" aria-label="Çalışma durumu">
        <span className="muted-section-label">Çalışma araçları</span>
        <span className="panel-status-chip" aria-live="polite">{statusText}</span>
      </div>

      <div className="tools-state-grid" aria-label="Destek aracı durumları">
        <button
          type="button"
          className={tutorMode ? 'tool-state-card active' : 'tool-state-card'}
          onClick={onToggleTutorMode}
          aria-pressed={tutorMode}
        >
          <IconBadge icon="Sparkles" tone="teal" size="sm" />
          <span>
            <em>Akıl yürütme desteği</em>
            <strong>{tutorMode ? 'Açık' : 'Kapalı'}</strong>
          </span>
        </button>

        <button
          type="button"
          className={highlightCount ? 'tool-state-card' : 'tool-state-card muted'}
          onClick={onClearHighlights}
          disabled={!highlightCount}
        >
          <IconBadge icon="Target" tone="blue" size="sm" />
          <span>
            <em>Kritik veri vurgusu</em>
            <strong>{highlightCount ? `${highlightCount} işaretli` : 'Yok'}</strong>
          </span>
        </button>
      </div>

      <section className="color-selector-card" aria-label="Vurgu rengi seçimi">
        <div className="color-selector-head">
          <span>Vurgu rengi</span>
        </div>
        <div className="premium-color-row">
          {HIGHLIGHT_COLORS.map((item) => (
            <button
              key={item.color}
              type="button"
              className={activeHighlighter === item.color ? `highlight-dot ${item.color} active` : `highlight-dot ${item.color}`}
              onClick={() => onChangeHighlighter?.(item.color)}
              aria-label={`${item.label} vurgulayıcı`}
              aria-pressed={activeHighlighter === item.color}
              title={item.label}
            />
          ))}
        </div>
      </section>

      <details className="clinical-note-details">
        <summary>
          <span><Icon name="Notes" size={15} /> Klinik notlar</span>
          <Icon name="ChevronDown" size={16} />
        </summary>
        <div className="clinical-note-body">
          <ul className="quick-checklist">
            {checklist.map((item) => <li key={item}><GlossaryText text={item} enabled={!hardMode} /></li>)}
          </ul>
          <div className="quick-note-chip-row">
            {QUICK_NOTE_SNIPPETS.map((snippet) => (
              <button key={snippet.label} type="button" className="quick-note-chip" onClick={() => appendSnippet(snippet.value)}>{snippet.label}</button>
            ))}
          </div>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Kısa klinik not veya ayırıcı tanı karşılaştırması..."
            rows={4}
          />
        </div>
      </details>
    </aside>
  );
}

export default CaseToolsPanel;
