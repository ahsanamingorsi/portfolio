import { images } from './images';
import type { Achievement } from './types';

export const achievements: Achievement[] = [
  {
    id: 'eic25-recognition',
    resume: true,
    title: 'Recognition Award, EIC 25',
    issuer: 'University of Kotli AJK',
    year: '2025',
    kind: 'Award',
    description:
      'Recognised at the Entrepreneurship Innovation Conference 2025 for graphic design, management and content creation.',
    image: images.eicAward,
  },
  {
    id: 'eic25-stage',
    title: 'EIC 25 award ceremony',
    issuer: 'University of Kotli AJK',
    year: '2025',
    kind: 'Award',
    description: 'Receiving the recognition award on stage.',
    image: images.eicAwardStage,
  },
  {
    id: 'egala-2026',
    resume: true,
    title: 'Certificate of Appreciation, E-Gala 2026',
    issuer: 'E-Gala 2026', // VERIFY: issuing body
    year: '2026',
    kind: 'Certificate',
    description: 'For design and screen graphics contributed to the event.',
    image: images.egalaCertificate,
  },
  {
    id: 'sec-2024',
    title: 'Team Media, SEC 2024',
    issuer: 'University of Kotli',
    year: '2024',
    kind: 'Event',
    description: 'Member of the media team for the 2nd Startup and Entrepreneurship Conference.',
    image: images.secMediaTeam,
  },
  {
    id: 'nascon-2026',
    title: 'NaSCon 2026 hackathon',
    issuer: 'NaSCon 2026',
    year: '2026',
    kind: 'Hackathon',
    // VERIFY: add track, team and result once confirmed; add a photo or certificate if available.
    description: 'Took part in the hackathon, representing the University of Kotli.',
  },
  {
    id: 'csharp-mvc-cert',
    resume: true,
    title: 'C# .NET MVC Web Development',
    issuer: 'Certification', // VERIFY: issuing organisation and year; add the certificate image.
    year: '',
    kind: 'Certificate',
    description: 'Certification in web development with C# and ASP.NET MVC, as listed on my CV.',
  },
];
