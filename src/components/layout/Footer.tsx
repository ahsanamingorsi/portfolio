import { sections } from '../../data/navigation';
import { personal } from '../../data/personal';
import { socialLinks } from '../../data/social-links';
import { Link } from '../../lib/router';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <Logo height={34} />
          <p className="footer__tag">{personal.tagline}</p>
          <p className="footer__sub">{personal.supporting}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer__links">
            {sections.map((s) => <li key={s.id}><Link to={`/#${s.id}`}>{s.label}</Link></li>)}
          </ul>
        </nav>
        <ul className="social-row">
          {socialLinks.map((s) => (
            <li key={s.id}><a className="icon-btn" href={s.url} target="_blank" rel="noopener me" aria-label={s.label}><Icon name={s.icon} /></a></li>
          ))}
        </ul>
      </div>
      <div className="wrap footer__base">
        <span>© {new Date().getFullYear()} {personal.name}</span>
        <a href={`mailto:${personal.email}`}>{personal.email}</a>
      </div>
    </footer>
  );
}
