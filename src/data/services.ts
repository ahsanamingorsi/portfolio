import type { Inquiry, Service } from './types';

export const services: Service[] = [
  { title: 'Web development', description: 'Websites and web applications with HTML, CSS, JavaScript and ASP.NET MVC.', icon: 'layout', inquiry: 'software' },
  { title: 'Backend development', description: 'Application logic and data in C# and SQL Server.', icon: 'server', inquiry: 'software' },
  { title: 'API development', description: 'REST APIs with .NET Web API, which I am learning by building Acadivo.', icon: 'code', inquiry: 'software' },
  { title: 'UI/UX and graphic design', description: 'Interfaces, posters, social graphics and event branding.', icon: 'palette', inquiry: 'events' },
  { title: 'Technical collaboration', description: 'Joining a student, startup or open-source project as a developer.', icon: 'users', inquiry: 'collaboration' },
  { title: 'Technology content', description: 'Tutorials and explainers about programming and AI tools.', icon: 'play', inquiry: 'content' },
  { title: 'Product video production', description: 'Short videos that show what a product does.', icon: 'video', inquiry: 'content' },
];

export const inquiries: Inquiry[] = [
  { id: 'software', label: 'Software project', description: 'A website, web application or backend you need built.' },
  { id: 'collaboration', label: 'Collaboration', description: 'A project, startup or idea to work on together.' },
  { id: 'content', label: 'Content and video', description: 'Technology content or a product video.' },
  { id: 'events', label: 'Events and media', description: 'Design, graphics or media coverage for an event.' },
];
