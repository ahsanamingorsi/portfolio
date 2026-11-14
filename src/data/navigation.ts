/** Sections of the home page, in order. `nav: true` puts the link in the header. */
export const sections = [
  { id: 'about', label: 'About', nav: true },
  { id: 'skills', label: 'Skills', nav: true },
  { id: 'projects', label: 'Projects', nav: true },
  { id: 'experience', label: 'Experience', nav: true },
  { id: 'achievements', label: 'Achievements', nav: false },
  { id: 'creator', label: 'Creator Studio', nav: true },
  { id: 'gallery', label: 'Gallery', nav: false },
  { id: 'services', label: 'Services', nav: false },
  { id: 'resume', label: 'Resume', nav: true },
  { id: 'contact', label: 'Contact', nav: true },
] as const;

export type SectionId = (typeof sections)[number]['id'];
