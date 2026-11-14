import { About } from '../components/about/About';
import { Achievements } from '../components/achievements/Achievements';
import { Contact } from '../components/contact/Contact';
import { CreatorStudio } from '../components/creator/CreatorStudio';
import { Gallery } from '../components/gallery/Gallery';
import { Hero } from '../components/hero/Hero';
import { ProjectsSection } from '../components/projects/ProjectsSection';
import { Resume } from '../components/resume/Resume';
import { Services } from '../components/services/Services';
import { SkillsExplorer } from '../components/skills/SkillsExplorer';
import { ExperienceSection } from '../components/timeline/ExperienceSection';
import { homeSeo } from '../data/seo';
import { useSeo } from '../lib/seo';

export default function HomePage() {
  useSeo(homeSeo.title, homeSeo.description, '/');
  return (
    <>
      <Hero />
      <About />
      <SkillsExplorer />
      <ProjectsSection />
      <ExperienceSection />
      <Achievements />
      <CreatorStudio />
      <Gallery />
      <Services />
      <Resume />
      <Contact />
    </>
  );
}
