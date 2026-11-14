/*
 * Runs after `vite build`. Makes the single-page app behave on GitHub Pages:
 *
 *  1. Writes a real HTML file for every project route
 *     (dist/projects/<slug>/index.html) with its own title, description and
 *     canonical URL. Refreshing or sharing a project page returns HTTP 200.
 *  2. Writes dist/404.html, which GitHub Pages serves for unknown paths.
 *     It loads the same app, which shows the custom "page not found" screen.
 *  3. Writes sitemap.xml.
 *  4. Refuses to finish if CNAME or a verified asset is missing from dist,
 *     so a broken build cannot be deployed.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { images } from '../src/data/images.ts';
import { personal } from '../src/data/personal.ts';
import { projects } from '../src/data/projects.ts';
import { homeSeo } from '../src/data/seo.ts';
import type { ImageAsset } from '../src/data/types.ts';

const DIST = 'dist';
const SITE = personal.siteUrl;
const template = readFileSync(path.join(DIST, 'index.html'), 'utf8');

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function page(title: string, description: string, route: string, noindex = false) {
  const url = SITE + route;
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*/g, `$1${esc(title)}`)
    .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*/g, `$1${esc(description)}`)
    .replace('<meta property="og:type" content="profile">', '<meta property="og:type" content="article">');
  if (noindex) html = html.replace(/(<meta name="robots" content=")[^"]*/, '$1noindex');
  return html;
}

// 1. Project routes
for (const p of projects) {
  const dir = path.join(DIST, 'projects', p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), page(`${p.title} | ${personal.name}`, p.summary, `/projects/${p.slug}`));
}

// 2. 404
writeFileSync(path.join(DIST, '404.html'), page(`Page not found | ${personal.name}`, 'This page does not exist.', '/404', true));

// 3. Sitemap
const today = new Date().toISOString().slice(0, 10);
const routes = ['/', ...projects.map((p) => `/projects/${p.slug}`)];
writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${SITE}${r}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);

// 4. Checks
const problems: string[] = [];
const warnings: string[] = [];
const need = (file: string, why: string) => { if (!existsSync(path.join(DIST, file))) problems.push(`${file} (${why})`); };

need('CNAME', 'custom domain');
need('robots.txt', 'SEO');
need('og-image.png', 'social preview');
need(personal.cvPath, 'CV download');
if (existsSync(path.join(DIST, 'CNAME')) && readFileSync(path.join(DIST, 'CNAME'), 'utf8').trim() !== new URL(SITE).host) {
  problems.push(`CNAME does not contain ${new URL(SITE).host}`);
}
for (const img of Object.values(images) as ImageAsset[]) {
  need(img.original, 'image');
  for (const w of img.widths ?? []) need(`images/optimized/${img.slug}-${w}.webp`, 'image derivative');
}
for (const p of projects) {
  for (const s of p.screenshots) need(s.original, `screenshot for ${p.title}`);
}

if (homeSeo.title !== (template.match(/<title>([^<]*)<\/title>/)?.[1] ?? '').replace(/&amp;/g, '&')) {
  warnings.push('index.html <title> differs from src/data/seo.ts');
}

for (const w of warnings) console.warn(`warning: ${w}`);
if (problems.length) {
  console.error(`\nBuild check failed. Missing from ${DIST}/:\n${problems.map((p) => `  - ${p}`).join('\n')}\n`);
  process.exit(1);
}
console.log(`postbuild: ${projects.length} project pages, 404.html and sitemap.xml written; ${Object.keys(images).length} images verified.`);
