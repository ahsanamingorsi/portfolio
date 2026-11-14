import { achievements } from '../../data/achievements';
import { education, experience } from '../../data/experience';
import { images } from '../../data/images';
import { personal } from '../../data/personal';
import { skills } from '../../data/skills';
import { asset } from '../../lib/site';
import { Icon } from '../ui/Icon';
import { Img } from '../ui/Img';
import { Section } from '../ui/Section';

const certifications = achievements.filter((a) => a.resume);

export function Resume() {
  const cv = asset(personal.cvPath);
  const actions = (
    <div className="section__actions">
      <a className="btn btn--primary" href={cv} target="_blank" rel="noopener"><Icon name="eye" size={16} /> View CV</a>
      <a className="btn" href={cv} download={personal.cvFileName}><Icon name="download" size={16} /> Download CV</a>
    </div>
  );

  return (
    <Section id="resume" title="Resume" lead="The one-page CV, and the same information in text." aside={actions}>
      <div className="resume">
        <a className="resume__preview" href={cv} target="_blank" rel="noopener" aria-label="Open the CV as a PDF in a new tab">
          <Img image={images.resumePreview} sizes="(max-width: 900px) 92vw, 460px" />
          <span>PDF, 1 page <Icon name="arrowUpRight" size={14} /></span>
        </a>

        <div className="resume__text">
          <div>
            <h3 className="subhead">Education</h3>
            <ul className="rlist">
              {education.map((e) => <li key={e.title}><strong>{e.title}</strong><span>{e.organisation}</span><time>{e.period}</time></li>)}
            </ul>
          </div>
          <div>
            <h3 className="subhead">Experience</h3>
            <ul className="rlist">
              {experience.map((e) => <li key={e.title}><strong>{e.title}</strong><span>{e.organisation}</span><time>{e.period}</time></li>)}
            </ul>
          </div>
          <div>
            <h3 className="subhead">Skills</h3>
            <ul className="tags">
              {skills.filter((s) => s.level === 'using').map((s) => <li key={s.name}>{s.name}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="subhead">Certifications and awards</h3>
            <ul className="rlist">
              {certifications.map((c) => <li key={c.id}><strong>{c.title}</strong>{c.year && <time>{c.year}</time>}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
