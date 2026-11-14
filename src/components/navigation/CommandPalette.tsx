import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { sections } from '../../data/navigation';
import { personal } from '../../data/personal';
import { projects } from '../../data/projects';
import { socialLinks } from '../../data/social-links';
import type { IconName } from '../../data/types';
import { copyText } from '../../lib/contact';
import { useRouter } from '../../lib/router';
import { asset } from '../../lib/site';
import { Dialog } from '../ui/Dialog';
import { Icon } from '../ui/Icon';

interface Command { id: string; group: string; label: string; hint?: string; icon: IconName; run: () => void }

interface Props { open: boolean; onClose: () => void; onToggleTheme: () => void }

const sectionIcons: Record<string, IconName> = {
  about: 'users', skills: 'code', projects: 'layout', experience: 'briefcase', achievements: 'award',
  creator: 'video', gallery: 'image', services: 'wrench', resume: 'file', contact: 'mail',
};

export default function CommandPalette({ open, onClose, onToggleTheme }: Props) {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [notice, setNotice] = useState('');
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => [
    { id: 'home', group: 'Go to', label: 'Home', hint: '/', icon: 'home', run: () => navigate('/') },
    ...sections.map((s): Command => ({
      id: s.id, group: 'Go to', label: s.label, hint: `/${s.id}`, icon: sectionIcons[s.id], run: () => navigate(`/#${s.id}`),
    })),
    ...projects.map((p): Command => ({
      id: `p-${p.slug}`, group: 'Projects', label: p.title, hint: 'Case study', icon: 'arrowRight', run: () => navigate(`/projects/${p.slug}`),
    })),
    { id: 'theme', group: 'Actions', label: 'Switch theme', hint: 'T', icon: 'sun', run: onToggleTheme },
    {
      id: 'copy-email', group: 'Actions', label: 'Copy email address', hint: personal.email, icon: 'copy',
      run: () => { void copyText(personal.email); },
    },
    { id: 'cv', group: 'Actions', label: 'Open CV (PDF)', icon: 'file', run: () => { window.open(asset(personal.cvPath), '_blank', 'noopener'); } },
    ...socialLinks.map((s): Command => ({
      id: `s-${s.id}`, group: 'Elsewhere', label: s.label, hint: s.handle, icon: s.icon, run: () => { window.open(s.url, '_blank', 'noopener'); },
    })),
  ], [navigate, onToggleTheme]);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return commands;
    return commands.filter((c) => {
      const hay = `${c.label} ${c.group} ${c.hint ?? ''}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [commands, query]);

  useEffect(() => { if (open) { setQuery(''); setCursor(0); setNotice(''); } }, [open]);
  useEffect(() => setCursor(0), [query]);
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const run = (c: Command) => {
    c.run();
    if (c.id === 'copy-email') { setNotice('Email address copied'); window.setTimeout(onClose, 700); } else onClose();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const n = results.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => (n ? (c + 1) % n : 0)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => (n ? (c - 1 + n) % n : 0)); }
    else if (e.key === 'Home') { e.preventDefault(); setCursor(0); }
    else if (e.key === 'End') { e.preventDefault(); setCursor(Math.max(0, n - 1)); }
    else if (e.key === 'Enter' && results[cursor]) { e.preventDefault(); run(results[cursor]); }
  };

  let lastGroup = '';
  return (
    <Dialog open={open} onClose={onClose} label="Command palette" className="palette">
      <div className="palette__panel">
        <div className="palette__input">
          <Icon name="search" />
          <input
            autoFocus type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={onKeyDown}
            placeholder="Search sections, projects and actions" aria-label="Search sections, projects and actions"
            role="combobox" aria-expanded="true" aria-controls="palette-list" aria-autocomplete="list"
            aria-activedescendant={results[cursor] ? `cmd-${results[cursor].id}` : undefined}
            autoComplete="off" spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="palette__list" id="palette-list" role="listbox" aria-label="Results" ref={listRef}>
          {results.map((c, i) => {
            const heading = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <li key={c.id} role="presentation">
                {heading && <div className="palette__group" role="presentation">{heading}</div>}
                <div
                  id={`cmd-${c.id}`} role="option" aria-selected={i === cursor} className="palette__item"
                  onPointerMove={() => setCursor(i)} onClick={() => run(c)}
                >
                  <Icon name={c.icon} size={16} />
                  <span>{c.label}</span>
                  {c.hint && <small>{c.hint}</small>}
                </div>
              </li>
            );
          })}
          {!results.length && <li className="palette__empty" role="presentation">Nothing matches “{query}”. Try “projects” or “contact”.</li>}
        </ul>
        <div className="palette__foot">
          <span role="status">{notice}</span>
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>Enter</kbd> open</span>
          <span><kbd>/</kbd> or <kbd>Ctrl K</kbd> search</span>
          <span><kbd>T</kbd> theme</span>
        </div>
      </div>
    </Dialog>
  );
}
