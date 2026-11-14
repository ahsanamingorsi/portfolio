import { statusMeta } from '../../data/projects';
import type { Project } from '../../data/types';
import { Link } from '../../lib/router';
import { Icon } from '../ui/Icon';
import { Img } from '../ui/Img';
import { ProjectVisual } from './ProjectVisual';

export function StatusBadge({ project }: { project: Project }) {
  const s = statusMeta[project.status];
  return <span className={`badge badge--${s.tone}`}>{s.label}</span>;
}

export function ProjectCard({ project, feature }: { project: Project; feature?: boolean }) {
  const cover = project.cover ?? project.screenshots[0];
  const visual = <ProjectVisual project={project} />;
  return (
    <article className={`pcard ${feature ? 'pcard--feature' : ''}`}>
      <Link to={`/projects/${project.slug}`} className="pcard__media" tabIndex={-1} aria-hidden="true">
        {cover ? <Img image={cover} alt="" sizes={feature ? '(max-width: 900px) 92vw, 620px' : '(max-width: 700px) 92vw, 560px'} fallback={visual} /> : visual}
      </Link>
      <div className="pcard__body">
        <p className="pcard__meta">
          <span>{project.categories.join(', ')}</span>
          <StatusBadge project={project} />
        </p>
        <h3 className="pcard__title"><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p className="pcard__summary">{project.summary}</p>
        {project.stack.length > 0 && (
          <ul className="tags" aria-label="Technology stack">
            {project.stack.slice(0, feature ? 5 : 4).map((t) => <li key={t}>{t}</li>)}
          </ul>
        )}
        <div className="pcard__actions">
          <Link to={`/projects/${project.slug}`} className="btn btn--small btn--primary" aria-label={`View details of ${project.title}`}>
            View details <Icon name="arrowRight" size={14} />
          </Link>
          {project.liveUrl && (
            <a className="btn btn--small" href={project.liveUrl} target="_blank" rel="noopener">
              {project.liveLabel ?? 'Live demo'} <Icon name="arrowUpRight" size={14} />
            </a>
          )}
          {project.repoUrl && (
            <a className="btn btn--small" href={project.repoUrl} target="_blank" rel="noopener" aria-label={`${project.title} repository on GitHub`}>
              <Icon name="github" size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
