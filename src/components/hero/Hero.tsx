import { useRef, type PointerEvent } from 'react';
import { images } from '../../data/images';
import { personal } from '../../data/personal';
import { socialLinks } from '../../data/social-links';
import { Link } from '../../lib/router';
import { Icon } from '../ui/Icon';
import { Img } from '../ui/Img';
import { Logo } from '../ui/Logo';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Hero() {
  const cta = useRef<HTMLAnchorElement>(null);
  const github = socialLinks.find((s) => s.id === 'github')!;
  const linkedin = socialLinks.find((s) => s.id === 'linkedin')!;
  const { availability } = personal;

  // Magnetic pull on the primary button only, for mouse users.
  const onMagnet = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = cta.current;
    if (!el || e.pointerType !== 'mouse' || reducedMotion()) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width - 0.5) * 10}px`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height - 0.5) * 8}px`);
  };
  const offMagnet = () => { cta.current?.style.setProperty('--mx', '0px'); cta.current?.style.setProperty('--my', '0px'); };

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__mark"><Logo height={480} /></div>
      </div>

      <div className="wrap hero__layout">
        <div className="hero__copy">
          {availability.show && (
            <p className={`availability ${availability.open ? 'is-open' : ''}`}>
              <span className="availability__dot" aria-hidden="true" />{availability.label}
            </p>
          )}
          <h1 className="hero__name">
            <span>Ahsan Amin</span> <span>Gorsi</span>
          </h1>
          <p className="hero__headline">Building Digital Products.<br />Engineering Ideas Into Reality.</p>

          <p className="hero__intro">{personal.intro}</p>

          <div className="hero__cta">
            <Link to="/#projects" className="btn btn--primary btn--magnetic" ref={cta} onPointerMove={onMagnet} onPointerLeave={offMagnet}>
              View Projects <Icon name="arrowRight" size={16} />
            </Link>
            <Link to="/#contact" className="btn">Contact Me</Link>
            <a className="btn" href={github.url} target="_blank" rel="noopener me"><Icon name="github" size={16} /> GitHub</a>
            <a className="btn" href={linkedin.url} target="_blank" rel="noopener me"><Icon name="linkedin" size={16} /> LinkedIn</a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__frame">
            <Img image={images.profile} sizes="(max-width: 900px) 70vw, 420px" eager />
            <span className="hero__tick hero__tick--tl" aria-hidden="true" />
            <span className="hero__tick hero__tick--br" aria-hidden="true" />
          </div>
          <div className="hero__plate"><Logo height={26} /><span>{personal.tagline}</span></div>
        </div>
      </div>

      <div className="wrap hero__foot">
        <ul className="hero__tech" aria-label="Technologies I work with">
          {personal.heroTech.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <a className="hero__scroll" href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView(); }}>
          Scroll <span aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
