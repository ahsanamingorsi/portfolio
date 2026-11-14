import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
  type ComponentProps, type MouseEvent, type ReactNode,
} from 'react';
import { BASE } from './site';

/*
 * A small history router. The site has three route shapes (home, project
 * detail, not found), so a full routing library is not needed.
 * Paths are real paths (no #/ prefix); see scripts/postbuild.mts for how
 * GitHub Pages serves them on refresh.
 */

interface Location { path: string; hash: string; key: number }
interface RouterValue extends Location { navigate: (to: string) => void }

const RouterContext = createContext<RouterValue | null>(null);

const read = (key: number): Location => {
  let path = window.location.pathname;
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
  path = path.replace(/\/index\.html$/, '/').replace(/(.)\/$/, '$1') || '/';
  return { path, hash: window.location.hash.slice(1), key };
};

export function Router({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState<Location>(() => read(0));

  useEffect(() => {
    const onPop = () => setLoc((l) => read(l.key + 1));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    window.history.pushState(null, '', BASE + to);
    setLoc((l) => read(l.key + 1));
  }, []);

  // Scroll: to the hash target if there is one, otherwise to the top on a new page.
  useEffect(() => {
    if (loc.key === 0 && !loc.hash) return;
    let settle = 0;
    let touched = false;
    const onTouch = () => { touched = true; };
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
    const id = requestAnimationFrame(() => {
      const el = loc.hash ? document.getElementById(loc.hash) : null;
      if (el) {
        el.scrollIntoView();
        if (el.tabIndex < 0) el.tabIndex = -1;
        el.focus({ preventScroll: true });
        // Content above the target can still change height (lazy data). Re-align once,
        // unless the visitor has started scrolling on their own.
        events.forEach((e) => window.addEventListener(e, onTouch, { passive: true, once: true }));
        settle = window.setTimeout(() => { if (!touched) el.scrollIntoView(); }, 900);
      } else if (!loc.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    });
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(settle);
      events.forEach((e) => window.removeEventListener(e, onTouch));
    };
  }, [loc]);

  const value = useMemo(() => ({ ...loc, navigate }), [loc, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used inside <Router>');
  return ctx;
}

/** Matches '/projects/:slug' style patterns. Returns params or null. */
export function matchPath(pattern: string, path: string): Record<string, string> | null {
  const p = pattern.split('/').filter(Boolean);
  const s = path.split('/').filter(Boolean);
  if (p.length !== s.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) params[p[i].slice(1)] = decodeURIComponent(s[i]);
    else if (p[i] !== s[i]) return null;
  }
  return params;
}

interface LinkProps extends Omit<ComponentProps<'a'>, 'href'> { to: string }

/** Internal link. `to` is root-relative, e.g. '/#about' or '/projects/acadivo'. */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={BASE + to} onClick={handle} {...rest}>{children}</a>;
}
