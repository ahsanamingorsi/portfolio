import { useMemo, useState } from 'react';
import { achievements } from '../../data/achievements';
import type { IconName, AchievementKind } from '../../data/types';
import { Icon } from '../ui/Icon';
import { Img } from '../ui/Img';
import { Lightbox } from '../ui/Lightbox';
import { Section } from '../ui/Section';

const kindIcon: Record<AchievementKind, IconName> = { Award: 'award', Certificate: 'file', Event: 'camera', Hackathon: 'code' };

export function Achievements() {
  const [open, setOpen] = useState<number | null>(null);
  const withImage = useMemo(() => achievements.filter((a) => a.image), []);
  const items = useMemo(() => withImage.map((a) => ({ image: a.image!, caption: `${a.title}. ${a.issuer}${a.year ? `, ${a.year}` : ''}` })), [withImage]);

  return (
    <Section id="achievements" title="Achievements and certifications" lead="Recognition, certificates and events. Select an image to see it full size." tone="raised">
      <ul className="agrid">
        {achievements.map((a) => {
          const idx = withImage.indexOf(a);
          return (
            <li key={a.id} className={`acard ${a.image ? '' : 'acard--text'}`}>
              {a.image ? (
                <button className="acard__media" onClick={() => setOpen(idx)} aria-label={`View image: ${a.title}`}>
                  <Img image={a.image} alt="" sizes="(max-width: 700px) 92vw, 360px" />
                  <span className="acard__zoom" aria-hidden="true"><Icon name="eye" size={16} /></span>
                </button>
              ) : null}
              <div className="acard__body">
                <p className="acard__kind"><Icon name={kindIcon[a.kind]} size={14} /> {a.kind}{a.year && <span>{a.year}</span>}</p>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <Lightbox items={items} index={open} onIndex={setOpen} />
    </Section>
  );
}
