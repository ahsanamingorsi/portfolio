interface Props<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  counts?: Partial<Record<T, number>>;
}

/** Single-choice filter rendered as toggle buttons. */
export function FilterChips<T extends string>({ label, options, value, onChange, counts }: Props<T>) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o} type="button" className="chip" aria-pressed={value === o} onClick={() => onChange(o)}>
          {o}
          {counts?.[o] !== undefined && <span className="chip__count">{counts[o]}</span>}
        </button>
      ))}
    </div>
  );
}
