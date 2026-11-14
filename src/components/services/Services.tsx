import { inquiries, services } from '../../data/services';
import type { InquiryId } from '../../data/types';
import { inquiryStore } from '../../lib/contact';
import { useRouter } from '../../lib/router';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';

export function Services() {
  const { navigate } = useRouter();
  const start = (id: InquiryId) => { inquiryStore.set(id); navigate('/#contact'); };

  return (
    <Section id="services" title="Services and collaboration" lead="Where I can contribute. I am a student and a founder, so I take on work I can do properly.">
      <ul className="services">
        {services.map((s) => (
          <li key={s.title}>
            <Icon name={s.icon} size={20} />
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </li>
        ))}
      </ul>

      <h3 className="subhead subhead--spaced">Start an inquiry</h3>
      <ul className="inquiries">
        {inquiries.map((i) => (
          <li key={i.id}>
            <button className="inquiry" onClick={() => start(i.id)}>
              <strong>{i.label}</strong>
              <span>{i.description}</span>
              <Icon name="arrowRight" size={16} />
            </button>
          </li>
        ))}
      </ul>
    </Section>
  );
}
