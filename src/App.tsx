import { lazy, Suspense, useCallback, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { ScrollChrome } from './components/layout/ScrollChrome';
import { getProject } from './data/projects';
import { useHotkey } from './hooks/useHotkey';
import { useTheme } from './hooks/useTheme';
import { matchPath, Router, useRouter } from './lib/router';
import HomePage from './pages/HomePage';

// Split out of the first load: only fetched when needed.
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const CommandPalette = lazy(() => import('./components/navigation/CommandPalette'));

function PageLoading() {
  return <div className="page-loading" role="status"><span />Loading</div>;
}

function Shell() {
  const { path } = useRouter();
  const { pref, cycle } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);

  const openPalette = useCallback(() => { setPaletteLoaded(true); setPaletteOpen(true); }, []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useHotkey('mod+k', useCallback((e: KeyboardEvent) => { e.preventDefault(); setPaletteLoaded(true); setPaletteOpen((o) => !o); }, []));
  useHotkey('/', useCallback((e: KeyboardEvent) => { e.preventDefault(); openPalette(); }, [openPalette]));
  useHotkey('t', cycle);

  const projectMatch = matchPath('/projects/:slug', path);
  const project = projectMatch ? getProject(projectMatch.slug) : undefined;

  let page;
  if (path === '/') page = <HomePage />;
  else if (project) page = <ProjectPage project={project} />;
  else page = <NotFoundPage onOpenPalette={openPalette} />;

  return (
    <>
      <ScrollChrome />
      <Header themePref={pref} onCycleTheme={cycle} onOpenPalette={openPalette} />
      <main id="main" key={path} className="page" tabIndex={-1}>
        <Suspense fallback={<PageLoading />}>{page}</Suspense>
      </main>
      <Footer />
      {paletteLoaded && (
        <Suspense fallback={null}>
          <CommandPalette open={paletteOpen} onClose={closePalette} onToggleTheme={cycle} />
        </Suspense>
      )}
    </>
  );
}

export default function App() {
  return <Router><Shell /></Router>;
}
