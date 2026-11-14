import { images } from './images';
import type { Project, ProjectCategory, ProjectStatus } from './types';

export const projectCategories: ProjectCategory[] = [
  'Web Development', 'Backend', 'Startups', 'Personal Tools', 'Experiments',
];

export const statusMeta: Record<ProjectStatus, { label: string; tone: 'active' | 'muted' | 'neutral'; rank: number }> = {
  mvp: { label: 'MVP in development', tone: 'active', rank: 0 },
  completed: { label: 'Completed', tone: 'neutral', rank: 1 },
  experiment: { label: 'Experiment', tone: 'neutral', rank: 2 },
  concept: { label: 'Concept', tone: 'neutral', rank: 3 },
  archived: { label: 'Archived', tone: 'muted', rank: 4 },
};

/*
 * VERIFY markers flag details taken from one source only, or drafted from
 * known facts. See docs/content-verification.md before publishing.
 *
 * Screenshots: the previous site referenced source/images/projects/*.png but
 * those files were not in the supplied archive. Each path is kept below as a
 * commented-out entry. To use one, add the file at that path under public/
 * and uncomment the line (set width and height to the real pixel size).
 * Projects without a screenshot show a generated cover that says so.
 */
export const projects: Project[] = [
  {
    slug: 'acadivo',
    order: 1,
    title: 'Acadivo',
    summary:
      'My startup: an educational platform where students and teachers share and find academic materials.',
    categories: ['Startups', 'Web Development', 'Backend'],
    status: 'mvp',
    statusNote: 'The MVP is in development. It is not publicly launched yet.',
    stack: ['Angular', '.NET Web API', 'SQL Server', 'C#', 'ASP.NET MVC (first build)'],
    year: 2025,
    cover: images.egalaStage,
    screenshots: [
      // { original: 'source/images/projects/acadivo.png', width: 1600, height: 1000, alt: 'Acadivo interface' },
      images.egalaStage,
      images.egalaCertificate,
    ],
    caseStudy: {
      overview: [
        'Acadivo is an educational resource-sharing platform. Students and teachers upload academic materials, and others can find, view and download them.',
        'I founded it in 2025 and built the first version with ASP.NET MVC and C#. The current work is an MVP on a new architecture: an Angular client talking to a .NET Web API, with SQL Server for data.',
      ],
      problem:
        'Academic materials such as notes, slides, books and past papers are hard to find in one place when a student needs them.',
      audience: ['University and college students', 'Teachers who share course material'],
      role: 'Founder and developer. I plan the product, design the interface and write the code.',
      features: [
        'Educational resources organised for browsing',
        'Notes and slides',
        'Books and past papers',
        'Student and teacher accounts',
        'File management for uploads',
        'Resource viewing and downloading',
      ],
      architecture: {
        caption: 'Planned architecture for the MVP',
        nodes: [
          { label: 'Angular client', detail: 'Browsing, upload and account screens' },
          { label: '.NET Web API', detail: 'Accounts, resources and file handling' },
          { label: 'SQL Server', detail: 'Users, resources and metadata' },
        ],
      },
      // VERIFY: drafted from the known architecture change; edit to match your experience.
      challenges: [
        'Moving from a server-rendered ASP.NET MVC build to a separate client and API means rethinking how every screen gets its data.',
        'Handling uploaded files safely: storage, file types, and who is allowed to view or download what.',
      ],
      lessons: [],
    },
  },
  {
    slug: 'askpapergen',
    order: 2,
    title: 'AskPaperGen',
    summary:
      'An exam paper formatting tool for teachers: structured questions, Urdu RTL, live A4 preview and PDF export.',
    categories: ['Web Development', 'Personal Tools'],
    status: 'archived',
    statusNote: 'Discontinued and archived. The last build is still online but no longer developed.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    liveUrl: 'https://ahsanamingorsi.github.io/AskPaperGen/',
    liveLabel: 'Open archived build',
    repoUrl: 'https://github.com/ahsanamingorsi/AskPaperGen',
    screenshots: [
      // { original: 'source/images/projects/askpapergen.png', width: 1600, height: 1000, alt: 'AskPaperGen interface' },
    ],
    caseStudy: {
      overview: [
        'AskPaperGen is a browser-based tool for creating and formatting examination papers. A teacher writes the questions, picks a template and header, checks the A4 preview and prints or saves a PDF.',
        'The project is discontinued. I keep it here as a record of the work, and the last build remains online.',
      ],
      problem:
        'Formatting an exam paper in a word processor is slow, especially with sections, marks, tables, images and Urdu text running right to left.',
      audience: ['Teachers', 'Schools, colleges and academies'],
      role: 'Sole developer and designer.',
      features: [
        'Structured papers with sections and marks',
        'MCQs, short questions and long questions',
        'Images and tables inside questions',
        'Urdu right-to-left support',
        'Live A4 preview',
        'PDF export through the browser print dialog',
      ],
      architecture: {
        caption: 'How a paper moves through the tool',
        nodes: [
          { label: 'Write', detail: 'Questions, sections and marks' },
          { label: 'Format', detail: 'Template, header, Urdu RTL' },
          { label: 'Preview', detail: 'Live A4 page' },
          { label: 'Export', detail: 'Print or save as PDF' },
        ],
      },
      // VERIFY: drafted from the tool's feature set; edit to match your experience.
      challenges: [
        'Keeping Urdu right-to-left text and English left-to-right text correct in the same paper.',
        'Making the on-screen preview match the printed A4 page.',
      ],
      lessons: [],
    },
  },
  {
    slug: 'flixsan',
    order: 3,
    title: 'Flixsan',
    summary: 'A movie information website that shows trending films using data from external APIs.',
    categories: ['Web Development'],
    status: 'completed',
    statusNote: 'Finished as a learning project. Source code is public.',
    // VERIFY: the public repository is an ASP.NET Core (.NET 8) project; confirm the stack list.
    stack: ['HTML', 'CSS', 'JavaScript', 'External movie API', 'ASP.NET Core MVC'],
    repoUrl: 'https://github.com/ahsanamingorsi/FlixSan',
    screenshots: [
      // { original: 'source/images/projects/flixsan.png', width: 1600, height: 1000, alt: 'Flixsan interface' },
    ],
    caseStudy: {
      overview: [
        'Flixsan is a movie information site. It loads trending movies dynamically from an external API and presents them in a browsable interface.',
      ],
      // VERIFY: my wording of the motivation.
      problem:
        'I wanted a project that depends on live data from a third-party API instead of content I typed in myself.',
      audience: ['People browsing for something to watch'],
      role: 'Sole developer.',
      features: ['Trending movies loaded from an external API', 'Movie information pages', 'Responsive layout'],
      architecture: {
        caption: 'Data flow',
        nodes: [
          { label: 'Browser', detail: 'HTML, CSS and JavaScript' },
          { label: 'Movie API', detail: 'External service with live data' },
        ],
      },
      challenges: [],
      lessons: [],
    },
  },
  {
    slug: 'lifeos',
    order: 4,
    title: 'LifeOS',
    summary: 'An experimental personal productivity system. A place to try ideas, not a finished product.',
    categories: ['Experiments', 'Personal Tools'],
    status: 'experiment',
    statusNote: 'A personal software experiment. Not a commercial product.',
    stack: [],
    screenshots: [],
    caseStudy: {
      overview: [
        'LifeOS is an experimental personal productivity system: a personal software experiment in keeping work and study organised in one place.',
      ],
      // VERIFY: my wording.
      problem: 'Tasks, notes and plans end up spread over several apps.',
      audience: ['Myself, for now'],
      role: 'Sole developer.',
      features: [],
      challenges: [],
      lessons: [],
    },
  },
  {
    slug: 'monivo',
    order: 5,
    title: 'Monivo',
    summary: 'A concept for a personal money management application.',
    categories: ['Experiments', 'Personal Tools'],
    status: 'concept',
    statusNote: 'Concept stage. Purpose and design direction only; no completed functionality yet.',
    stack: [],
    screenshots: [],
    caseStudy: {
      overview: [
        'Monivo is a concept for a personal money management app: a simple way for one person to see where their money goes.',
        'So far it is a purpose and a design direction. Nothing here should be read as finished functionality.',
      ],
      // VERIFY: my wording.
      problem: 'Keeping track of personal spending is easy to start and hard to keep up.',
      audience: ['Individuals managing their own money'],
      role: 'Concept and design.',
      features: [],
      challenges: [],
      lessons: [],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
