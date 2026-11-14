import type { TimelineEntry } from '../../data/types';

/** Vertical timeline. Entries are listed newest first. */
export function Timeline({ entries, label }: { entries: TimelineEntry[]; label: string }) {
  return (
    <ol className="timeline" aria-label={label}>
      {entries.map((e) => (
        <li key={e.period + e.title} className="timeline__item">
          <p className="timeline__period">{e.period}</p>
          <h4>{e.title}</h4>
          <p className="timeline__org">{e.organisation}</p>
          <p>{e.summary}</p>
          {e.points && <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>}
        </li>
      ))}
    </ol>
  );
}
