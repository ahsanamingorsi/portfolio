import { useMemo, useState } from 'react';
import { projectCategories, projects, statusMeta } from '../../data/projects';
import type { Project, ProjectCategory } from '../../data/types';
import { FilterChips } from '../ui/Chips';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { GitHubRepos } from './GitHubRepos';
import { ProjectCard } from './ProjectCard';

type Filter = 'All' | ProjectCategory;
type Sort = 'featured' | 'name' | 'status';

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('featured');

  const counts = useMemo(() => {
    const c: Partial<Record<Filter, number>> = { All: projects.length };
    for (const cat of projectCategories) c[cat] = projects.filter((p) => p.categories.includes(cat)).length;
    return c;
  }, []);

  const visible = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const list = projects.filter((p) => {
      if (filter !== 'All' && !p.categories.includes(filter)) return false;
      const hay = [p.title, p.summary, ...p.stack, ...p.categories, statusMeta[p.status].label].join(' ').toLowerCase();
      return words.every((w) => hay.includes(w));
    });
    const by: Record<Sort, (a: Project, b: Project) => number> = {
      featured: (a, b) => a.order - b.order,
      name: (a, b) => a.title.localeCompare(b.title),
      status: (a, b) => statusMeta[a.status].rank - statusMeta[b.status].rank || a.order - b.order,
    };
    return [...list].sort(by[sort]);
  }, [filter, query, sort]);

  const pristine = filter === 'All' && !query && sort === 'featured';
  const reset = () => { setFilter('All'); setQuery(''); setSort('featured'); };

  return (
    <Section id="projects" title="Featured projects" lead="A startup in progress, tools I have shipped and ideas I am still testing. Each one says plainly what stage it is at." tone="raised">
      <div className="toolbar toolbar--projects">
        <FilterChips label="Project category" options={['All', ...projectCategories] as const} value={filter} onChange={setFilter} counts={counts} />
        <div className="toolbar__right">
          <label className="field field--search">
            <span className="sr-only">Search projects</span>
            <Icon name="search" size={16} />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects" />
          </label>
          <label className="field field--select">
            <span className="sr-only">Sort projects</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">Sort: featured</option>
              <option value="name">Sort: name A to Z</option>
              <option value="status">Sort: status</option>
            </select>
          </label>
        </div>
      </div>

      <p className="sr-only" role="status">{visible.length} of {projects.length} projects shown</p>

      {visible.length ? (
        <div className="pgrid">
          {visible.map((p, i) => <ProjectCard key={p.slug} project={p} feature={pristine && i === 0} />)}
        </div>
      ) : (
        <div className="empty">
          <p>No projects match {query ? `“${query}”` : 'that filter'}.</p>
          <button className="btn" onClick={reset}>Clear search and filters</button>
        </div>
      )}

      <GitHubRepos />
    </Section>
  );
}
