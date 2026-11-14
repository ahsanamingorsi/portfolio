import { useEffect } from 'react';
import { personal } from '../data/personal';

const set = (selector: string, attr: string, value: string) => {
  document.head.querySelector(selector)?.setAttribute(attr, value);
};

/** Keeps title, description and canonical in sync on client-side navigation. */
export function useSeo(title: string, description: string, path: string, noindex = false) {
  useEffect(() => {
    const url = personal.siteUrl + path;
    document.title = title;
    set('meta[name="description"]', 'content', description);
    set('link[rel="canonical"]', 'href', url);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', description);
    set('meta[property="og:url"]', 'content', url);
    set('meta[name="twitter:title"]', 'content', title);
    set('meta[name="twitter:description"]', 'content', description);
    set('meta[name="robots"]', 'content', noindex ? 'noindex' : 'index, follow, max-image-preview:large');
  }, [title, description, path, noindex]);
}
