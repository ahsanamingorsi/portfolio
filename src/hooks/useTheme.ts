import { useCallback, useEffect, useState } from 'react';

export type ThemePref = 'dark' | 'light' | 'auto';
type Applied = 'dark' | 'light';
const KEY = 'aag:theme';
const order: ThemePref[] = ['dark', 'light', 'auto'];

const systemPrefersLight = () => window.matchMedia('(prefers-color-scheme: light)').matches;

const readPref = (): ThemePref => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'dark' || saved === 'light' || saved === 'auto') return saved;
  } catch { /* private mode */ }
  return 'auto';
};

const applied = (pref: ThemePref): Applied => (pref === 'auto' ? (systemPrefersLight() ? 'light' : 'dark') : pref);

/**
 * Dark, light or auto (follows the OS). The choice is stored and the
 * resolved theme is applied before first paint by the inline script in
 * index.html, so there is no flash while this hook hydrates.
 */
export function useTheme() {
  const [pref, setPref] = useState<ThemePref>(readPref);
  const [theme, setTheme] = useState<Applied>(() => applied(readPref()));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#172B29' : '#D9D9C9');
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem(KEY, pref); } catch { /* private mode */ }
    setTheme(applied(pref));
    if (pref !== 'auto') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => setTheme(applied('auto'));
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [pref]);

  const cycle = useCallback(() => setPref((p) => order[(order.indexOf(p) + 1) % order.length]), []);
  return { theme, pref, cycle };
}
