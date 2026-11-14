import { useEffect, useState } from 'react';
import { sections } from '../../data/navigation';
import { personal } from '../../data/personal';
import { socialLinks } from '../../data/social-links';
import { useActiveSection } from '../../hooks/useActiveSection';
import type { Theme } from '../../hooks/useTheme';
import { Link, useRouter } from '../../lib/router';
import { Dialog } from '../ui/Dialog';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';

const sectionIds = sections.map((s) => s.id);
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

interface Props { theme: Theme; onToggleTheme: () => void; onOpenPalette: () => void }

export function Header({ theme, onToggleTheme, onOpenPalette }: Props) {
  const { path, key } = useRouter();
  const onHome = path === '/';
  const active = useActiveSection(sectionIds, onHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMenuOpen(false), [key]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const themeLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="skip" href="#main">Skip to content</a>
      <div className="wrap header__row">
        <Link to="/" className="header__brand" aria-label={`${personal.name}, home`}>
          <Logo />
          <span className="header__name">{personal.name}</span>
        </Link>

        <nav className="header__nav" aria-label="Main">
          <ul>
            {sections.filter((s) => s.nav).map((s) => (
              <li key={s.id}>
                <Link to={`/#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__tools">
          <button className="palette-btn" onClick={onOpenPalette} aria-label="Search the site and run commands" aria-keyshortcuts="Control+K Meta+K">
            <Icon name="search" size={16} />
            <span className="palette-btn__text">Search</span>
            <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <button className="icon-btn" onClick={onToggleTheme} aria-label={themeLabel} title={themeLabel}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button className="icon-btn header__burger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-haspopup="dialog">
            <Icon name="menu" />
          </button>
        </div>
      </div>

      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} label="Menu" className="menu">
        <div className="menu__panel">
          <div className="menu__top">
            <Logo />
            <button className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu"><Icon name="x" /></button>
          </div>
          <nav aria-label="All sections">
            <ul className="menu__list">
              {sections.map((s) => (
                <li key={s.id}>
                  <Link to={`/#${s.id}`} onClick={() => setMenuOpen(false)} aria-current={active === s.id ? 'true' : undefined}>
                    {s.label}<span aria-hidden="true">/{s.id}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="social-row">
            {socialLinks.map((s) => (
              <li key={s.id}><a className="icon-btn" href={s.url} target="_blank" rel="noopener me" aria-label={s.label}><Icon name={s.icon} /></a></li>
            ))}
          </ul>
        </div>
      </Dialog>
    </header>
  );
}
