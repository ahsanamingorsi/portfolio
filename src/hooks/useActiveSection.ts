import { useEffect, useState } from 'react';

/** Id of the section currently crossing the middle band of the viewport. */
export function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) { setActive(null); return; }
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
    }, { rootMargin: '-40% 0px -55% 0px' });
    els.forEach((el) => io.observe(el));
    const onScroll = () => { if (window.scrollY < 200) setActive(null); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [ids, enabled]);

  return active;
}
