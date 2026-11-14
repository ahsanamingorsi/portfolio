import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
const KEY = 'aag:theme';

const initial = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

/** Dark-first. The choice is stored and applied before first paint by the inline script in index.html. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#080D18' : '#F8FAFC');
    try { localStorage.setItem(KEY, theme); } catch { /* private mode */ }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, toggle };
}
