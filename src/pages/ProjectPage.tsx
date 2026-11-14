import { useMemo, useState, type ReactNode } from 'react';
import { StatusBadge } from '../components/projects/ProjectCard';
import { ProjectVisual } from '../components/projects/ProjectVisual';
import { Icon } from '../components/ui/Icon';
import { Img } from '../components/ui/Img';
import { Lightbox } from '../components/ui/Lightbox';
import { projects } from '../data/projects';
import type { Project } from '../data/types';
import { Link } from '../lib/router';
import { useSeo } from '../lib/seo';

function Block({ title, children }: { title: string; children: ReactNode }) {
  return <section className="cs__block"><h2>{title}</h2>{children}</section>;
}

/** Reusable case study template. Sections with no content are left out. */
export default function ProjectPage({ project }: { project: Project }) {
  const cs = project.caseStudy;
  useSeo(`${project.title} | Ahsan Amin Gorsi`, project.summary, `/projects/${project.slug}`);

  const shots = project.screenshots;
  const [open, setOpen] = useState<number | null>(null);
  const items = useMemo(() => shots.map((image) => ({ image, caption: image.alt })), [shots]);

  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const at = sorted.findIndex((p) => p.slug === project.slug);
  const prev = sorted[(at - 1 + sorted.length) % sorted.length];
  const next = sorted[(at + 1) % sorted.length];

  return (
    <article className="cs">
      <header className="cs__hero">
        <div className="wrap">
          <Link to="/#projects" className="text-link cs__back"><Icon name="chevronLeft" size={16} /> All projects</Link>
          <p className="cs__cats">{project.categories.join(' / ')}</p>
          <h1>{project.title}</h1>
          <p className="cs__summary">{project.summary}</p>
          <p className="cs__status"><StatusBadge project={project} /> <span>{project.statusNote}</span></p>
          {(project.liveUrl || project.repoUrl) && (
            <div className="cs__links">
              {project.liveUrl && (
                <a className="btn btn--primary" href={project.liveUrl} target="_blank" rel="noopener">{project.liveLabel ?? 'Live demo'} <Icon name="arrowUpRight" size={16} /></a>
              )}
              {project.repoUrl && (
                <a className="btn" href={project.repoUrl} target="_blank" rel="noopener"><Icon name="github" size={16} /> Repository on GitHub</a>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="wrap cs__layout">
        <aside className="cs__facts" aria-label="Project facts">
          <dl>
            <div><dt>My role</dt><dd>{cs.role}</dd></div>
            <div><dt>For</dt><dd>{cs.audience.join('. ')}</dd></div>
            {project.year && <div><dt>Started</dt><dd>{project.year}</dd></div>}
            {project.stack.length > 0 && (
              <div><dt>Stack</dt><dd><ul className="tags">{project.stack.map((t) => <li key={t}>{t}</li>)}</ul></dd></div>
            )}
          </dl>
        </aside>

        <div className="cs__body">
          <Block title="Overview">{cs.overview.map((p, i) => <p key={i}>{p}</p>)}</Block>
          <Block title="The problem"><p>{cs.problem}</p></Block>

          {cs.features.length > 0 && (
            <Block title={project.status === 'mvp' || project.status === 'concept' ? 'Features and vision' : 'Main features'}>
              {project.status === 'mvp' && <p className="cs__caveat">This is the scope of the MVP. Not all of it is finished.</p>}
              <ul className="cs__list">{cs.features.map((f) => <li key={f}><Icon name="check" size={16} /> {f}</li>)}</ul>
            </Block>
          )}

          {cs.architecture && (
            <Block title="How it fits together">
              <figure className="flow">
                <ol>
                  {cs.architecture.nodes.map((n) => (
                    <li key={n.label}><strong>{n.label}</strong><span>{n.detail}</span></li>
                  ))}
                </ol>
                <figcaption>{cs.architecture.caption}</figcaption>
              </figure>
            </Block>
          )}

          <Block title="Screenshots and photos">
            {shots.length ? (
              <ul className="cs__shots">
                {shots.map((s, i) => (
                  <li key={s.original}>
                    <button className="tile" onClick={() => setOpen(i)} aria-label={`View image: ${s.alt}`}>
                      <Img image={s} alt="" sizes="(max-width: 700px) 92vw, 400px" />
                      <span className="tile__caption">{s.alt}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="cs__noshots"><ProjectVisual project={project} /></div>
            )}
          </Block>

          {cs.challenges.length > 0 && (
            <Block title="Development challenges"><ul className="cs__plain">{cs.challenges.map((c) => <li key={c}>{c}</li>)}</ul></Block>
          )}
          {cs.lessons.length > 0 && (
            <Block title="Lessons learned"><ul className="cs__plain">{cs.lessons.map((c) => <li key={c}>{c}</li>)}</ul></Block>
          )}
        </div>
      </div>

      <nav className="wrap cs__pager" aria-label="More projects">
        <Link to={`/projects/${prev.slug}`}><Icon name="chevronLeft" size={16} /><span><small>Previous</small>{prev.title}</span></Link>
        <Link to={`/projects/${next.slug}`}><span><small>Next</small>{next.title}</span><Icon name="chevronRight" size={16} /></Link>
      </nav>
      <Lightbox items={items} index={open} onIndex={setOpen} />
    </article>
  );
}
