import { useEffect, useRef, useState } from 'react';
import { Icon } from '../ui/Icon';

/** Reading progress bar at the top of the page and a back-to-top button. */
export function ScrollChrome() {
  const bar = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      setShowTop(window.scrollY > 700);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <button
        className={`icon-btn to-top ${showTop ? 'is-visible' : ''}`} aria-label="Back to top"
        tabIndex={showTop ? 0 : -1} onClick={() => window.scrollTo({ top: 0 })}
      >
        <Icon name="arrowUp" />
      </button>
    </>
  );
}
