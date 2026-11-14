import type { TimelineEntry } from './types';

export const experience: TimelineEntry[] = [
  {
    kind: 'experience',
    period: '2025 to present',
    title: 'Founder and Developer',
    organisation: 'Acadivo',
    summary: 'Founded and built an educational platform for sharing academic materials.',
    points: [
      'Built the first version with ASP.NET MVC and C#.',
      'Implemented user profiles, file management and a points system.',
      'Now developing the MVP on Angular, .NET Web API and SQL Server.',
    ],
  },
  {
    kind: 'experience',
    period: '2024 to present',
    title: 'Graphic Designer',
    organisation: 'SOCTECH Society, University of Kotli',
    summary:
      'Designed posters, social media graphics and event visuals for university technology events such as EIC 25, working with the event teams.',
  },
  /*
   * Creator experience (AI product video generation) is intentionally left out
   * until the details are confirmed. Template:
   * {
   *   kind: 'experience', period: '', title: 'AI Product Video Creator',
   *   organisation: '', summary: '',
   * },
   */
];

export const education: TimelineEntry[] = [
  {
    kind: 'education',
    period: '2023 to 2027',
    title: 'BS Computer Science',
    organisation: 'University of Kotli, Azad Jammu and Kashmir',
    summary: 'Focus on .NET development, software engineering, networking and information security.',
  },
  {
    kind: 'education',
    period: '2021 to 2023',
    title: 'Intermediate in Computer Science',
    organisation: 'Allama Iqbal College Seri',
    summary: 'Fundamentals of programming, problem-solving and logical reasoning.',
  },
  {
    kind: 'education',
    period: '2019 to 2021',
    title: 'Matric in Science',
    organisation: 'Allama Iqbal College Seri',
    summary: 'Science and mathematics.',
  },
];
