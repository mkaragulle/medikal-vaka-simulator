import { useEffect, useMemo, useState } from 'react';
import { sanitizeImageForPreview } from '../utils/displayText.js';
import { Icon, IconBadge } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';

const modalityLabels = {
  ecg: 'EKG',
  xray: 'Grafi',
  ct: 'BT',
  mri: 'MR',
  ultrasound: 'USG',
  microscopy: 'Mikroskopi',
  pathology: 'Patoloji',
  clinical: 'Klinik materyal',
  endoscopy: 'Endoskopi',
  lab: 'Laboratuvar',
};

function EvidenceImage({ image, mode = 'study', hardMode = false }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [image.imageUrl]);

  return (
    <figure className="evidence-figure spoiler-safe-figure">
      <div className="media-frame">
        {!failed ? (
          <img src={image.imageUrl} alt={image.alt || image.title} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <div className="image-fallback" role="img" aria-label="Görsel önizleme yüklenemedi">
            <div>
              <strong>Görsel tetkik materyali yüklenemedi</strong>
            </div>
          </div>
        )}
        {!failed ? (
          <a className="media-zoom" href={image.imageUrl} target="_blank" rel="noreferrer" aria-label="Görseli yeni sekmede aç">
            <Icon name="Search" />
          </a>
        ) : null}
      </div>

      <figcaption>
        <div className="media-caption-topline">
          <span className="tag">{modalityLabels[image.modality] ?? 'Tetkik'}</span>
        </div>
        <strong><GlossaryText text={image.title} enabled={mode !== 'exam' && !hardMode} /></strong>

        {mode !== 'exam' && !hardMode ? (
          <details className="spoiler-disclosure media-disclosure">
            <summary>Bulguları aç</summary>
            <p><GlossaryText text={image.caption} enabled={mode !== 'exam' && !hardMode} /></p>
          </details>
        ) : null}
      </figcaption>
    </figure>
  );
}

function MediaEmptyState() {
  return (
    <div className="media-order-empty">
      <IconBadge icon="Image" tone="slate" size="sm" />
      <div>
        <strong>Görsel/elektrofizyolojik sonuç bekleniyor</strong>
        <p>Görüntüleme, EKG veya ilgili görsel istem seçildiğinde materyal burada açılır.</p>
      </div>
    </div>
  );
}

function EvidenceMedia({ images = [], clinicalCase, orderedInvestigationIds = [], orderedInvestigations = [], mode = 'study', hardMode = false }) {
  const orderedTypes = useMemo(() => new Set(orderedInvestigations.map((item) => item.type)), [orderedInvestigations]);
  const revealedImages = useMemo(() => {
    if (!orderedInvestigationIds.length) return [];
    return images
      .map((image) => sanitizeImageForPreview(image, clinicalCase))
      .filter((image) => orderedTypes.has(image.modality));
  }, [images, clinicalCase.id, orderedInvestigationIds.join('|'), orderedTypes]);

  return (
    <section className="card-surface media-section" aria-label="Görsel tetkik bölümü">
      <div className="panel-title-row compact media-card-head">
        <div>
          <h2>Görsel tetkik materyali</h2>
        </div>
      </div>

      {revealedImages.length ? (
        <div className="media-stack">
          {revealedImages.map((image) => <EvidenceImage key={`${image.title}-${image.imageUrl}`} image={image} mode={mode} hardMode={hardMode} />)}
        </div>
      ) : (
        <MediaEmptyState />
      )}
    </section>
  );
}

export default EvidenceMedia;
