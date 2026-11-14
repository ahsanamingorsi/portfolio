import { education, experience } from '../../data/experience';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { Timeline } from './Timeline';

export function ExperienceSection() {
  return (
    <Section id="experience" title="Experience and education">
      <div className="twocol">
        <div>
          <h3 className="subhead"><Icon name="briefcase" size={16} /> Experience</h3>
          <Timeline entries={experience} label="Experience, newest first" />
        </div>
        <div>
          <h3 className="subhead"><Icon name="graduation" size={16} /> Education</h3>
          <Timeline entries={education} label="Education, newest first" />
        </div>
      </div>
    </Section>
  );
}
