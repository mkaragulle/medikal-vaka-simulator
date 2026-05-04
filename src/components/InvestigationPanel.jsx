import { useEffect, useMemo, useState } from 'react';
import { Icon, IconBadge } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';
import {
  buildInvestigationOrders,
  getOrderCategoryMeta,
  investigationIconByType,
  typeLabels,
} from '../utils/investigationOrders.js';

const CATEGORY_ORDER = [
  'bedside',
  'cardiac',
  'laboratory',
  'imaging',
  'respiratory',
  'neurologic',
  'gastrointestinal',
  'microbiology',
  'pathology',
  'urogenital',
  'urine',
  'metabolic',
  'invasive',
  'bloodBank',
  'other',
];

function groupOrdersByCategory(orders = []) {
  const groups = [];
  const byCategory = new Map();

  orders.forEach((item) => {
    const category = item.testTypeCategory || item.category || 'other';
    if (!byCategory.has(category)) {
      const meta = getOrderCategoryMeta(category);
      const group = { id: category, meta, items: [] };
      byCategory.set(category, group);
      groups.push(group);
    }
    byCategory.get(category).items.push(item);
  });

  return groups.sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.id);
    const bi = CATEGORY_ORDER.indexOf(b.id);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}


function getLabStatusTone(note = '') {
  const normalized = String(note || '').toLocaleLowerCase('tr');
  if (!normalized || normalized === '—') return 'neutral';
  if (/(yüksek|artmış|pozitif|uygunsuz|kritik)/i.test(normalized)) return 'warning';
  if (/(düşük|azalmış|eksik|negatif değil)/i.test(normalized)) return 'danger';
  if (/(normal|referans içinde|uyumlu|stabil|negatif)/i.test(normalized)) return 'success';
  return 'neutral';
}

function ResultTable({ rows = [], hardMode = false, glossaryEnabled = true }) {
  if (!rows.length) return null;
  return (
    <div className="table-wrap lab-table-wrap ordered-result-table-wrap inline-result-table-wrap">
      <table className="lab-table ordered-result-table inline-result-table">
        <thead>
          <tr>
            <th>Parametre</th>
            <th>Sonuç</th>
            {!hardMode ? <th>Referans</th> : null}
            {!hardMode ? <th>Durum</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const [parameter, value, reference, note] = Array.isArray(row)
              ? row
              : [row.parameter, row.value, row.reference, row.note || row.interpretation];
            const tone = getLabStatusTone(note);
            return (
              <tr key={`${parameter || 'satir'}-${index}`} className={`lab-table-row ${tone}`}>
                <td>
                  <div className="lab-parameter-cell">
                    <strong><GlossaryText text={String(parameter || '')} enabled={glossaryEnabled} /></strong>
                  </div>
                </td>
                <td>
                  <span className="lab-value-text"><GlossaryText text={String(value || '')} enabled={glossaryEnabled} /></span>
                </td>
                {!hardMode ? <td><span className="lab-reference-text">{reference || '—'}</span></td> : null}
                {!hardMode ? (
                  <td>
                    <span className={`lab-status-pill ${tone}`}>
                      <GlossaryText text={String(note || '—')} enabled={glossaryEnabled} />
                    </span>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ResultImages({ images = [], glossaryEnabled = true }) {
  if (!images.length) return null;
  return (
    <div className="ordered-image-grid inline-result-image-grid">
      {images.map((image) => (
        <figure key={`${image.title}-${image.imageUrl}`} className="ordered-image-card inline-result-image-card">
          <div className="ordered-image-frame inline-result-image-frame">
            <img src={image.imageUrl} alt={image.alt || image.title} loading="lazy" />
            <a href={image.imageUrl} target="_blank" rel="noreferrer" aria-label="Görseli yeni sekmede aç">
              <Icon name="Search" size={16} />
            </a>
          </div>
          <figcaption>
            <strong><GlossaryText text={image.title} enabled={glossaryEnabled} /></strong>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function InlineOrderResult({ item, mode, hardMode = false }) {
  const result = item.result || {};
  const hasRows = Boolean(result.rows?.length);
  const hasImages = Boolean(result.images?.length);
  const hasSummary = Boolean(result.summary && result.format !== 'empty');
  const feedbackNote = item.inlineFeedback || '';

  return (
    <div className="inline-order-result requested-result-panel" role="region" aria-label={`${item.label} sonucu`}>
      <div className="inline-result-block requested-result-primary">
        <div className="inline-result-title-row">
          <span className="inline-result-label"><Icon name="Notes" size={13} /> Sonuç</span>
        </div>
        {hasSummary ? <p className="ordered-result-summary inline-result-summary"><GlossaryText text={result.summary} enabled={mode !== 'exam' && !hardMode} /></p> : null}
        {hasRows ? <ResultTable rows={result.rows} hardMode={hardMode} glossaryEnabled={mode !== 'exam' && !hardMode} /> : null}
        {hasImages ? <ResultImages images={result.images} glossaryEnabled={mode !== 'exam' && !hardMode} /> : null}
        {!hasSummary && !hasRows && !hasImages ? (
          <p className="ordered-result-empty inline-result-empty">Bu istemde ek objektif bulgu saptanmadı.</p>
        ) : null}
      </div>

      {mode !== 'exam' && !hardMode && feedbackNote ? (
        <div className="inline-result-block clinical-meaning-block requested-result-note">
          <span className="inline-result-label">İstem notu</span>
          <p className="inline-result-meaning"><GlossaryText text={feedbackNote} enabled={mode !== 'exam' && !hardMode} /></p>
        </div>
      ) : null}
    </div>
  );
}

function OrderCard({ item, selected, expanded, onToggle, mode, hardMode = false }) {
  const subtype = item.subtype || typeLabels[item.type] || 'Tetkik';
  const purpose = item.purpose || '';

  return (
    <article className={`order-card-shell requested-test-card ${selected ? 'selected requested' : ''} ${expanded ? 'expanded' : ''}`.trim()}>
      <button
        type="button"
        className={`investigation-option-card smart-order-card neutral-order-card requested-test-card-head ${selected ? 'selected' : ''}`.trim()}
        onClick={() => onToggle(item)}
        aria-pressed={selected}
        aria-expanded={expanded}
        aria-label={`${item.label} istemini ${selected ? 'aç veya kapat' : 'seç'}`}
      >
        <IconBadge icon={investigationIconByType[item.type] || 'Search'} tone={selected ? 'success' : 'blue'} size="sm" />
        <span className="investigation-option-copy smart-order-copy requested-test-copy">
          <strong><GlossaryText text={item.title || item.label} enabled={mode !== 'exam' && !hardMode} /></strong>
          <span className="order-card-subline neutral-order-subline"><em><GlossaryText text={subtype} enabled={mode !== 'exam' && !hardMode} /></em></span>
          {purpose ? <span className="order-card-purpose"><GlossaryText text={purpose} enabled={mode !== 'exam' && !hardMode} /></span> : null}
        </span>
        <span className="smart-order-actions requested-test-actions">
          <span className={`investigation-option-state smart-order-state order-status-chip ${selected ? 'requested' : 'idle'}`}>
            {selected ? <><Icon name="CheckCircle" size={13} /> İstendi</> : 'İste'}
          </span>
          {selected ? (
            <span className="order-expand-control" aria-hidden="true">
              <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size={16} className="order-expand-icon" />
            </span>
          ) : null}
        </span>
      </button>

      {selected && expanded ? <InlineOrderResult item={item} mode={mode} hardMode={hardMode} /> : null}
    </article>
  );
}

function OrderCategorySection({ group, orderedInvestigationIds, openResultIds, onToggleOrder, mode, hardMode = false }) {
  return (
    <section className="order-category-section smart-order-category-section" aria-labelledby={`order-category-${group.id}`}>
      <header className="order-category-head smart-order-category-head">
        <div>
          <h3 id={`order-category-${group.id}`}><GlossaryText text={group.meta.label} enabled={mode !== 'exam' && !hardMode} /></h3>
          {group.meta.description ? <p><GlossaryText text={group.meta.description} enabled={mode !== 'exam' && !hardMode} /></p> : null}
        </div>
      </header>
      <div className="order-category-grid smart-order-category-grid">
        {group.items.map((item) => {
          const selected = orderedInvestigationIds.includes(item.id);
          return (
            <OrderCard
              key={item.id}
              item={item}
              selected={selected}
              expanded={openResultIds.includes(item.id)}
              onToggle={onToggleOrder}
              mode={mode}
              hardMode={hardMode}
            />
          );
        })}
      </div>
    </section>
  );
}

function DiagnosticOrdersPanel({ orders, orderedInvestigationIds, onOrderInvestigation, mode, hardMode = false }) {
  const groups = useMemo(() => groupOrdersByCategory(orders), [orders]);
  const [openResultIds, setOpenResultIds] = useState([]);

  const orderSignature = orders.map((item) => item.id).join('|');

  useEffect(() => {
    setOpenResultIds([]);
  }, [orderSignature]);

  useEffect(() => {
    if (!orderedInvestigationIds.length) setOpenResultIds([]);
  }, [orderedInvestigationIds.length]);

  const handleToggleOrder = (item) => {
    const alreadySelected = orderedInvestigationIds.includes(item.id);

    if (!alreadySelected) {
      onOrderInvestigation?.(item.id);
      setOpenResultIds((current) => current.includes(item.id) ? current : [...current, item.id]);
      return;
    }

    setOpenResultIds((current) => (
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id]
    ));
  };

  return (
    <div className="diagnostic-orders-panel smart-diagnostic-orders-panel" aria-label="İstenebilir tetkikler">
      {groups.map((group) => (
        <OrderCategorySection
          key={group.id}
          group={group}
          orderedInvestigationIds={orderedInvestigationIds}
          openResultIds={openResultIds}
          onToggleOrder={handleToggleOrder}
          mode={mode}
          hardMode={hardMode}
        />
      ))}
    </div>
  );
}

function InvestigationPanel({
  clinicalCase,
  mode = 'study',
  hardMode = false,
  orderedInvestigationIds = [],
  onOrderInvestigation,
}) {
  const orders = useMemo(() => buildInvestigationOrders(clinicalCase), [clinicalCase]);

  return (
    <section className="card-surface investigation-order-section refined-investigation-order-section smart-investigation-order-section" aria-label="Tetkik istemi">
      <div className="panel-title-row compact investigation-order-head refined-investigation-order-head smart-investigation-order-head">
        <div>
          <h2>Tetkik istemi</h2>
          <p><GlossaryText text="Öykü ve fizik muayeneye göre gerekli gördüğün tetkikleri seç." enabled={mode !== 'exam' && !hardMode} /></p>
        </div>
        <span className="ordered-count-chip refined-count-chip smart-count-chip">{orderedInvestigationIds.length} istem seçildi</span>
      </div>

      <DiagnosticOrdersPanel
        orders={orders}
        orderedInvestigationIds={orderedInvestigationIds}
        onOrderInvestigation={onOrderInvestigation}
        mode={mode}
        hardMode={hardMode}
      />
    </section>
  );
}

export default InvestigationPanel;
