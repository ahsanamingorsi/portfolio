import type { Project } from '../../data/types';
import { statusMeta } from '../../data/projects';

/**
 * Generated cover for projects without a screenshot. It is plainly a
 * placeholder graphic, never a mock-up of an interface that does not exist.
 */
export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`pvisual pvisual--${project.order % 3}`} role="img" aria-label={`${project.title}: no screenshot yet`}>
      <span className="pvisual__title" aria-hidden="true">{project.title}</span>
      <span className="pvisual__note" aria-hidden="true">{statusMeta[project.status].label} / no screenshot yet</span>
    </div>
  );
}
