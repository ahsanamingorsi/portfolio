import { useState } from 'react';
import { personal } from '../../data/personal';
import { socialLinks } from '../../data/social-links';
import { copyText } from '../../lib/contact';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { ContactForm } from './ContactForm';

export function Contact() {
  const [copy, setCopy] = useState<'idle' | 'copied' | 'failed'>('idle');
  const onCopy = async () => {
    setCopy((await copyText(personal.email)) ? 'copied' : 'failed');
    window.setTimeout(() => setCopy('idle'), 2500);
  };

  return (
    <Section id="contact" title="Let’s build something" lead="A project, a collaboration, a video or an event. Write a message here, or use email or WhatsApp directly." tone="raised">
      <div className="contact">
        <div className="contact__direct">
          <div className="contact__email">
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
            <button className="btn btn--small" onClick={onCopy}>
              <Icon name={copy === 'copied' ? 'check' : 'copy'} size={14} />
              <span aria-live="polite">{copy === 'copied' ? 'Copied' : copy === 'failed' ? 'Copy failed, select the address' : 'Copy email'}</span>
            </button>
          </div>

          <ul className="contact__routes">
            <li>
              <a href={personal.whatsappUrl} target="_blank" rel="noopener"><Icon name="whatsapp" /> <span><strong>WhatsApp</strong>{personal.phoneDisplay}</span></a>
            </li>
            <li>
              <a href={personal.siteUrl + '/'}><Icon name="globe" /> <span><strong>Website</strong>ahsanamingorsi.com</span></a>
            </li>
            <li>
              <span className="contact__static"><Icon name="mapPin" /> <span><strong>Location</strong>{personal.location}</span></span>
            </li>
          </ul>

          <ul className="contact__social">
            {socialLinks.filter((s) => s.id !== 'whatsapp').map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener me"><Icon name={s.icon} size={16} /> {s.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
