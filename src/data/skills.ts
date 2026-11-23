import type { Skill, SkillCategory } from './types';

export const skillCategories: SkillCategory[] = ['Backend', 'Frontend', 'Database', 'Architecture and Tools', 'Creative'];

/*
 * level: 'using'    = used in projects or regular work
 *        'learning' = currently learning
 * VERIFY the split in docs/content-verification.md; it is easy to change here.
 */
export const skills: Skill[] = [
  { name: 'C#', symbol: 'C#', category: 'Backend', level: 'using', note: 'My main language. Object-oriented code and LINQ.' },
  { name: '.NET', symbol: '.N', category: 'Backend', level: 'using', note: 'The platform behind most of my projects.' },
  { name: 'ASP.NET MVC', symbol: 'Mv', category: 'Backend', level: 'using', note: 'Used for the first Acadivo build.' },
  { name: '.NET Web API', symbol: 'Api', category: 'Backend', level: 'learning', note: 'The backend for the Acadivo MVP.' },
  { name: 'Entity Framework Core', symbol: 'Ef', category: 'Backend', level: 'learning', note: 'Data access and migrations.' },

  { name: 'HTML', symbol: 'H', category: 'Frontend', level: 'using', note: 'Semantic, accessible markup.' },
  { name: 'CSS', symbol: 'Cs', category: 'Frontend', level: 'using', note: 'Responsive layouts.' },
  { name: 'JavaScript', symbol: 'Js', category: 'Frontend', level: 'using', note: 'Interface logic and API calls.' },
  { name: 'TypeScript', symbol: 'Ts', category: 'Frontend', level: 'using', note: 'Typed scripts for larger front ends.' },
  { name: 'Angular', symbol: 'Ng', category: 'Frontend', level: 'learning', note: 'The client for the Acadivo MVP.' },
  { name: 'Bootstrap', symbol: 'B', category: 'Frontend', level: 'using', note: 'Fast, responsive interfaces.' },

  { name: 'SQL Server', symbol: 'Sq', category: 'Database', level: 'using', note: 'Database design, queries and data management.' },

  { name: 'REST APIs', symbol: 'Re', category: 'Architecture and Tools', level: 'using', note: 'Consuming external APIs; designing my own.' },
  { name: 'Git', symbol: 'Gt', category: 'Architecture and Tools', level: 'using', note: 'Version control for every project.' },
  { name: 'GitHub', symbol: 'Gh', category: 'Architecture and Tools', level: 'using', note: 'Hosting, GitHub Pages and Actions.' },
  { name: 'Clean Architecture', symbol: 'Ca', category: 'Architecture and Tools', level: 'learning', note: 'Structuring larger .NET solutions.' },

  { name: 'Graphic Design', symbol: 'Gd', category: 'Creative', level: 'using', note: 'Posters, social visuals and event branding.' },
  { name: 'UI/UX Fundamentals', symbol: 'Ux', category: 'Creative', level: 'using', note: 'User-focused interfaces.' },
  { name: 'Video Editing', symbol: 'Ve', category: 'Creative', level: 'using', note: 'Event coverage and short-form content.' },
  { name: 'Content Creation', symbol: 'Cc', category: 'Creative', level: 'using', note: 'Technology content across platforms.' },
  { name: 'Motion Graphics', symbol: 'Mg', category: 'Creative', level: 'learning', note: 'Animated titles and screen graphics.' },
];
