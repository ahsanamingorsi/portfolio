import { images } from './images';

export const personal = {
  name: 'Ahsan Amin Gorsi',
  shortName: 'Ahsan Amin',
  brand: 'AAG',
  tagline: 'Ideas into technology.',
  supporting: 'Build. Create. Innovate.',
  siteUrl: 'https://ahsanamingorsi.com',
  email: 'ahsanamingorsi@gmail.com',
  phoneDisplay: '+92 349 5473628',
  phoneE164: '+923495473628',
  whatsappUrl: 'https://wa.me/923495473628',
  location: 'Khuiratta, Kotli, Azad Kashmir, Pakistan',
  languages: ['Urdu', 'English'],
  cvPath: 'source/Resume/Ahsan Amin - Resume.pdf',
  cvFileName: 'Ahsan Amin - Resume.pdf',

  /**
   * Availability indicator in the hero. Edit by hand.
   * Set `show: false` to hide it, `open: false` to show a muted "not available" dot.
   */
  availability: {
    show: true,
    open: true,
    label: 'Open to internships and collaborations',
  },

  intro:
    'Software developer, technology enthusiast, and aspiring entrepreneur focused on building useful digital products and solving real problems through technology.',

  heroTech: ['C#', '.NET', 'ASP.NET MVC', 'SQL Server', 'JavaScript', 'TypeScript', 'Git'],

  about: {
    image: images.workspace1,
    // VERIFY: written from the CV, the old site and the brief. Check it reads as you.
    story: [
      'I am from Khuiratta, a town in Kotli, Azad Kashmir. I studied science for my matric and then computer science at Allama Iqbal College Seri, before starting a BS in Computer Science at the University of Kotli in 2023.',
      'Most of what I build is on the Microsoft stack: C#, ASP.NET MVC and SQL Server, with HTML, CSS and JavaScript on the front end. My focus is backend fundamentals and shipping projects that actually work, and I am now learning Angular and .NET Web API to build larger applications.',
      'In 2025 I founded Acadivo, an educational platform where students and teachers share notes, slides, books and past papers. It is my main project and the one I am learning entrepreneurship through, one decision at a time.',
      'Alongside code, I design. Since 2024 I have been a graphic designer for SOCTECH Society at the university, making posters, screen graphics and social visuals for events such as EIC 25 and E-Gala 2026. I also make technology content about programming, AI tools and what I am learning along the way.',
    ],
    facts: [
      { label: 'Based in', value: 'Kotli, Azad Kashmir' },
      { label: 'Studying', value: 'BS Computer Science, 2023 to 2027' },
      { label: 'Building', value: 'Acadivo' },
      { label: 'Main stack', value: 'C#, .NET, SQL Server' },
      { label: 'Languages', value: 'Urdu, English' },
    ],
    milestones: [
      { year: '2019', text: 'Matric in Science, Allama Iqbal College Seri' },
      { year: '2021', text: 'Intermediate in Computer Science' },
      { year: '2023', text: 'Started BSCS at the University of Kotli' },
      { year: '2024', text: 'Joined SOCTECH Society as graphic designer' },
      { year: '2025', text: 'Founded Acadivo. Recognised at EIC 25' },
      { year: '2026', text: 'E-Gala 2026 and NaSCon 2026' },
    ],
  },
} as const;
