import { Icon } from '../components/ui/Icon';
import { projects } from '../data/projects';
import { Link, useRouter } from '../lib/router';
import { useSeo } from '../lib/seo';

export default function NotFoundPage({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { path } = useRouter();
  useSeo('Page not found | Ahsan Amin Gorsi', 'This page does not exist.', path, true);
  return (
    <section className="nf">
      <div className="wrap">
        <p className="nf__code" aria-hidden="true">404</p>
        <h1>This page does not exist</h1>
        <p className="nf__path">Nothing is published at <code>{path}</code>. The link may be old, or the address mistyped.</p>
        <div className="nf__actions">
          <Link to="/" className="btn btn--primary"><Icon name="home" size={16} /> Go to the home page</Link>
          <button className="btn" onClick={onOpenPalette}><Icon name="search" size={16} /> Search the site</button>
        </div>
        <p className="nf__hint">Or open a project:</p>
        <ul className="nf__list">
          {projects.map((p) => <li key={p.slug}><Link to={`/projects/${p.slug}`}>{p.title}</Link></li>)}
        </ul>
      </div>
    </section>
  );
}
