import { githubUsername } from '../data/social-links';

export interface Repo {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
}

interface ApiRepo {
  name: string; html_url: string; description: string | null; language: string | null;
  stargazers_count: number; pushed_at: string; fork: boolean; private: boolean;
}

const CACHE_KEY = 'aag:github-repos';
const TTL = 30 * 60 * 1000;

/**
 * Public, unauthenticated GitHub API. No token is used or needed.
 * Rate limit is 60 requests per hour per visitor IP, so results are cached
 * for the browser session.
 */
export async function fetchRepos(signal?: AbortSignal): Promise<Repo[]> {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null');
    if (cached && Date.now() - cached.at < TTL) return cached.repos;
  } catch { /* ignore a broken cache */ }

  const res = await fetch(
    `https://api.github.com/users/${githubUsername}/repos?type=owner&sort=pushed&per_page=30`,
    { signal, headers: { Accept: 'application/vnd.github+json' } },
  );
  if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);
  const data: ApiRepo[] = await res.json();
  const repos: Repo[] = data
    .filter((r) => !r.fork && !r.private)
    .map((r) => ({
      name: r.name, url: r.html_url, description: r.description, language: r.language,
      stars: r.stargazers_count, pushedAt: r.pushed_at,
    }));
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos })); } catch { /* storage full or blocked */ }
  return repos;
}
