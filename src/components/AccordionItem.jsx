import { useId, useState } from 'react';
import { Icon } from './ui.jsx';

function AccordionItem({ prefix, badge, title, preview, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <article className={open ? 'accordion-item clinical-accordion open' : 'accordion-item clinical-accordion'}>
      <button
        type="button"
        className="accordion-trigger clinical-accordion-trigger"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="accordion-prefix" aria-hidden="true">{prefix ?? <Icon name="ClipboardList" />}</span>
        <span className="accordion-copy">
          <span className="accordion-title-row">
            <strong>{title}</strong>
            {badge ? <em>{badge}</em> : null}
          </span>
          {preview ? <small>{preview}</small> : null}
        </span>
        <span className="accordion-toggle" aria-hidden="true"><Icon name="ChevronDown" /></span>
      </button>
      <div className="accordion-panel" id={panelId} aria-hidden={!open}>
        <div className="accordion-panel-inner clinical-accordion-body">{children}</div>
      </div>
    </article>
  );
}

export default AccordionItem;
