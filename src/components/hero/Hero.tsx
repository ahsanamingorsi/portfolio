import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { images } from '../../data/images';
import { personal, type IdentityId } from '../../data/personal';
import { statusMeta } from '../../data/projects';
import { socialLinks } from '../../data/social-links';
import { Link } from '../../lib/router';
import { asset } from '../../lib/site';
import { Icon } from '../ui/Icon';
import { Img } from '../ui/Img';
import { Logo } from '../ui/Logo';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The card beside the portrait. One per identity. */
function IdentityPanel({ id }: { id: IdentityId }) {
  if (id === 'developer') {
    return (
      <div className="hpanel hpanel--code">
        <div className="hpanel__bar"><i /><i /><i /><span>Program.cs</span></div>
        <pre aria-label="A short C# snippet"><code>
          <span className="tk-k">var</span> idea = <span className="tk-k">new</span> <span className="tk-t">Idea</span>(<span className="tk-s">"useful"</span>);{'\n'}
          <span className="tk-k">var</span> product = <span className="tk-k">await</span> <span className="tk-t">Build</span>(idea);{'\n'}
          product.<span className="tk-t">Ship</span>();
        </code></pre>
      </div>
    );
  }
  if (id === 'creator') {
    return (
      <div className="hpanel hpanel--creator">
        <div className="hpanel__strip">
          <Img image={images.egalaStage} sizes="96px" alt="" />
          <Img image={images.eicGraphicsTeam} sizes="96px" alt="" />
          <Img image={images.secMediaTeam} sizes="96px" alt="" />
        </div>
        <p>Event graphics, video and technology content.</p>
        <Link to="/#creator" className="text-link">Open Creator Studio <Icon name="arrowRight" size={14} /></Link>
      </div>
    );
  }
  return (
    <div className="hpanel hpanel--product">
      <p className="hpanel__title">Acadivo <span className="badge badge--active">{statusMeta.mvp.label}</span></p>
      <p>Academic materials, shared between students and teachers.</p>
      <Link to="/projects/acadivo" className="text-link">Read the case study <Icon name="arrowRight" size={14} /></Link>
    </div>
  );
}

export function Hero() {
  const [identity, setIdentity] = useState<IdentityId>('developer');
  const [auto, setAuto] = useState(true);
  const cta = useRef<HTMLAnchorElement>(null);

  // Rotate through the three identities until the visitor picks one.
  useEffect(() => {
    if (!auto || reducedMotion()) return;
    const ids = personal.identities.map((i) => i.id);
    const t = window.setInterval(() => {
      if (!document.hidden) setIdentity((cur) => ids[(ids.indexOf(cur) + 1) % ids.length]);
    }, 4200);
    return () => window.clearInterval(t);
  }, [auto]);

  // Magnetic pull on the primary button only, for mouse users.
  const onMagnet = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = cta.current;
    if (!el || e.pointerType !== 'mouse' || reducedMotion()) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width - 0.5) * 10}px`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height - 0.5) * 8}px`);
  };
  const offMagnet = () => { cta.current?.style.setProperty('--mx', '0px'); cta.current?.style.setProperty('--my', '0px'); };

  const current = personal.identities.find((i) => i.id === identity)!;
  const { availability } = personal;

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--blue" />
        <div className="hero__glow hero__glow--cyan" />
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

          <div className="hero__ids" role="group" aria-label="Three sides of my work">
            {personal.identities.map((i) => (
              <button
                key={i.id} type="button" aria-pressed={identity === i.id}
                onClick={() => { setIdentity(i.id); setAuto(false); }}
              >
                {i.label}.
              </button>
            ))}
          </div>
          <p className="hero__line" key={identity} aria-live={auto ? 'off' : 'polite'}>{current.line}</p>

          <p className="hero__intro">{personal.intro}</p>

          <div className="hero__cta">
            <Link to="/#projects" className="btn btn--primary btn--magnetic" ref={cta} onPointerMove={onMagnet} onPointerLeave={offMagnet}>
              Explore my work <Icon name="arrowDown" size={16} />
            </Link>
            <Link to="/#about" className="btn">About me</Link>
            <a className="btn" href={asset(personal.cvPath)} download={personal.cvFileName}>
              <Icon name="download" size={16} /> Download CV
            </a>
            <Link to="/#contact" className="btn">Let’s connect</Link>
          </div>

          <ul className="social-row hero__social">
            {socialLinks.filter((s) => s.id !== 'whatsapp').map((s) => (
              <li key={s.id}>
                <a className="icon-btn" href={s.url} target="_blank" rel="noopener me" aria-label={`${s.label}: ${s.handle}`}><Icon name={s.icon} /></a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          <div className="hero__frame">
            <Img image={images.profile} sizes="(max-width: 900px) 70vw, 420px" eager />
            <span className="hero__tick hero__tick--tl" aria-hidden="true" />
            <span className="hero__tick hero__tick--br" aria-hidden="true" />
          </div>
          <div className="hero__plate"><Logo height={30} /><span>{personal.tagline}</span></div>
          <div className="hero__panel" key={identity}><IdentityPanel id={identity} /></div>
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
