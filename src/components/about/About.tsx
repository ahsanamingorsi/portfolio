import { personal } from '../../data/personal';
import { Img } from '../ui/Img';
import { Section } from '../ui/Section';

export function About() {
  const { about } = personal;
  return (
    <Section id="about" title="Code, design and a startup in progress" tone="raised">
      <div className="about">
        <div className="about__media">
          <Img image={about.image} sizes="(max-width: 900px) 90vw, 380px" />
          <dl className="facts">
            {about.facts.map((f) => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
        </div>
        <div className="about__story">
          {about.story.map((p, i) => <p key={i} className={i === 0 ? 'about__first' : undefined}>{p}</p>)}
        </div>
      </div>
      <ol className="milestones" aria-label="Personal timeline">
        {about.milestones.map((m) => (
          <li key={m.year}><time>{m.year}</time><span>{m.text}</span></li>
        ))}
      </ol>
    </Section>
  );
}
