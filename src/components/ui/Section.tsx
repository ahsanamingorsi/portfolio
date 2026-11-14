import type { ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

interface Props {
  id: string;
  title: string;
  lead?: string;
  /** Alternate background band. */
  tone?: 'base' | 'raised';
  aside?: ReactNode;
  children: ReactNode;
}

/**
 * Page section with a consistent header. The small path label is the
 * section's real anchor, the same one the command palette jumps to.
 */
export function Section({ id, title, lead, tone = 'base', aside, children }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <section id={id} ref={ref} className={`section section--${tone} ${inView ? 'is-in' : ''}`} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <header className="section__head">
          <div>
            <p className="section__path" aria-hidden="true">/{id}</p>
            <h2 id={`${id}-title`} className="section__title">{title}</h2>
            {lead && <p className="section__lead">{lead}</p>}
          </div>
          {aside}
        </header>
        {children}
      </div>
    </section>
  );
}
