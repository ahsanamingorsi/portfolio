import { useEffect, useState } from 'react';
import { githubUsername } from '../../data/social-links';
import { useInView } from '../../hooks/useInView';
import { fetchRepos, type Repo } from '../../lib/github';
import { Icon } from '../ui/Icon';

type State = { status: 'idle' | 'loading' } | { status: 'ready'; repos: Repo[] } | { status: 'error' };

const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' });
const profileUrl = `https://github.com/${githubUsername}?tab=repositories`;

/** Live list of public repositories. Fetched only when scrolled into view. */
export function GitHubRepos() {
  const [ref, inView] = useInView<HTMLDivElement>('200px');
  const [state, setState] = useState<State>({ status: 'idle' });

  useEffect(() => {
    if (!inView) return;
    const ctrl = new AbortController();
    setState({ status: 'loading' });
    fetchRepos(ctrl.signal)
      .then((repos) => setState({ status: 'ready', repos }))
      .catch((err) => { if (err?.name !== 'AbortError') setState({ status: 'error' }); });
    return () => ctrl.abort();
  }, [inView]);

  return (
    <div className="repos" ref={ref}>
      <div className="repos__head">
        <h3>Public repositories</h3>
        <a className="text-link" href={profileUrl} target="_blank" rel="noopener">All repositories on GitHub <Icon name="arrowUpRight" size={14} /></a>
      </div>

      {(state.status === 'idle' || state.status === 'loading') && (
        <ul className="repos__list" aria-busy="true" aria-label="Loading repositories">
          {[0, 1, 2, 3, 4, 5].map((i) => <li key={i} className="repo repo--skeleton" />)}
        </ul>
      )}

      {state.status === 'error' && (
        <p className="repos__note">
          <Icon name="alert" size={16} /> GitHub did not respond, so the live list is unavailable right now. The repositories are still on{' '}
          <a href={profileUrl} target="_blank" rel="noopener">github.com/{githubUsername}</a>.
        </p>
      )}

      {state.status === 'ready' && state.repos.length === 0 && (
        <p className="repos__note">No public repositories to show yet.</p>
      )}

      {state.status === 'ready' && state.repos.length > 0 && (
        <ul className="repos__list">
          {state.repos.slice(0, 6).map((r) => (
            <li key={r.name} className="repo">
              <a href={r.url} target="_blank" rel="noopener">{r.name}</a>
              {r.description && <p>{r.description}</p>}
              <p className="repo__meta">
                {r.language && <span><i aria-hidden="true" />{r.language}</span>}
                <span><Icon name="star" size={13} label="Stars" /> {r.stars}</span>
                <span>Updated <time dateTime={r.pushedAt}>{dateFormat.format(new Date(r.pushedAt))}</time></span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
