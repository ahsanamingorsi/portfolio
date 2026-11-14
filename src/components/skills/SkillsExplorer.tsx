import { useMemo, useState } from 'react';
import { skillCategories, skills } from '../../data/skills';
import type { IconName, SkillCategory, SkillLevel } from '../../data/types';
import { FilterChips } from '../ui/Chips';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';

type CategoryFilter = 'All' | SkillCategory;
type LevelFilter = 'Everything' | 'Using' | 'Learning';

const categoryIcons: Record<SkillCategory, IconName> = {
  Backend: 'server', Frontend: 'layout', Database: 'database', Development: 'wrench', Creative: 'palette',
};
const levelOf: Record<LevelFilter, SkillLevel | null> = { Everything: null, Using: 'using', Learning: 'learning' };

export function SkillsExplorer() {
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [level, setLevel] = useState<LevelFilter>('Everything');

  const visible = useMemo(() => skills.filter((s) =>
    (category === 'All' || s.category === category) && (!levelOf[level] || s.level === levelOf[level]),
  ), [category, level]);

  const counts = useMemo(() => {
    const c: Partial<Record<CategoryFilter, number>> = { All: skills.length };
    for (const cat of skillCategories) c[cat] = skills.filter((s) => s.category === cat).length;
    return c;
  }, []);

  const groups = skillCategories.map((cat) => ({ cat, items: visible.filter((s) => s.category === cat) })).filter((g) => g.items.length);

  return (
    <Section id="skills" title="Technology and skills" lead="What I work with today, and what I am learning next. No percentages: a skill is either in use or in progress.">
      <div className="toolbar">
        <FilterChips label="Skill category" options={['All', ...skillCategories] as const} value={category} onChange={setCategory} counts={counts} />
        <FilterChips label="Skill level" options={['Everything', 'Using', 'Learning'] as const} value={level} onChange={setLevel} />
      </div>

      <p className="sr-only" role="status">{visible.length} skills shown</p>

      {groups.length === 0 ? (
        <div className="empty">
          <p>No skills match that combination.</p>
          <button className="btn" onClick={() => { setCategory('All'); setLevel('Everything'); }}>Show all skills</button>
        </div>
      ) : (
        <div className="skillgroups">
          {groups.map(({ cat, items }) => (
            <div className="skillgroup" key={cat}>
              <h3><Icon name={categoryIcons[cat]} size={16} /> {cat}</h3>
              <ul>
                {items.map((s) => (
                  <li key={s.name} className={`skill skill--${s.level}`}>
                    <span className="skill__symbol" aria-hidden="true">{s.symbol}</span>
                    <span className="skill__text">
                      <strong>{s.name}</strong>
                      <span>{s.note}</span>
                    </span>
                    <span className={`badge ${s.level === 'learning' ? 'badge--outline' : 'badge--neutral'}`}>
                      {s.level === 'learning' ? 'Learning' : 'Using'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
