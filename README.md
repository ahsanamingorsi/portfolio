# AAG portfolio

Personal site of Ahsan Amin Gorsi. Developer. Creator. Entrepreneur.

React 19, TypeScript and Vite. No runtime dependencies beyond React: routing, icons, motion and styling are small local modules, which keeps the JavaScript near 75 KB gzipped.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # vite build + scripts/postbuild.mts -> dist/
npm run preview    # serve dist/ locally
npm run typecheck  # optional: tsc --noEmit
npm run images     # regenerate WebP derivatives and icons after adding images
```

Commit the `package-lock.json` that the first `npm install` creates. The workflow then uses `npm ci`.

## Edit content

All content lives in `src/data/`. Components never hold copy.

| File | Controls |
| --- | --- |
| `personal.ts` | Name, intro, availability indicator, about text, facts, milestones |
| `projects.ts` | Project cards and case study pages (one object per project) |
| `skills.ts` | Skills, categories, using / learning |
| `experience.ts` | Experience and education timelines |
| `achievements.ts` | Awards and certificates (`resume: true` lists one in the Resume section) |
| `creator-work.ts` | Content categories, videos, design work |
| `gallery.ts`, `services.ts`, `social-links.ts`, `navigation.ts`, `images.ts`, `seo.ts` | As named |

Availability: `personal.availability` (`show`, `open`, `label`).

Add a project: append an object to `projects`. Its page, sitemap entry, command palette entry and static HTML file are created at build time.

Add an image: put the file in `public/source/images/`, add a line to `scripts/optimize-images.mjs` and to `src/data/images.ts`, run `npm run images`.

New CV: replace `public/source/Resume/Ahsan Amin - Resume.pdf` (same file name), then replace `public/images/optimized/resume-preview-1100.webp` with an image of the first page, 1100px wide.

## Structure

```
src/
  components/   layout, navigation, hero, about, skills, projects, timeline,
                achievements, creator, gallery, services, resume, contact, ui
  pages/        HomePage, ProjectPage (case study template), NotFoundPage
  data/         typed content
  hooks/        useTheme, useInView, useActiveSection, useHotkey
  lib/          router, seo, contact (mailto, validation), github, site (asset URLs)
  styles/       tokens, base, layout, hero, sections, overlays
public/         CNAME, robots.txt, og-image.png, icons/, images/optimized/,
                source/ (original assets at their old paths)
scripts/        optimize-images.mjs, postbuild.mts, og-image.html
docs/           extracted-information.md, asset-inventory.md, content-verification.md
```

## Deploy to GitHub Pages

The custom domain is kept by `public/CNAME` (contains `ahsanamingorsi.com`). The build fails if that file is missing or changed. DNS is not touched.

1. Replace the contents of your current portfolio repository with this project (keep the `.git` folder) and push to `main`.
2. Repository **Settings > Pages > Build and deployment > Source**: choose **GitHub Actions**. Your old site was most likely served straight from a branch; this is the one setting that has to change.
3. Still on that page, check that **Custom domain** shows `ahsanamingorsi.com` and **Enforce HTTPS** is ticked.
4. The **Deploy to GitHub Pages** workflow runs on every push to `main`.

If your default branch is not `main`, change it in `.github/workflows/deploy.yml`.

### Routing on GitHub Pages

URLs are real paths (`/projects/acadivo`). After the Vite build, `scripts/postbuild.mts` writes an HTML file for each project route with its own title, description and canonical URL, so a refresh or shared link returns HTTP 200. Unknown paths get `404.html`, which loads the app and shows the custom not-found page. The same script writes `sitemap.xml`.

### After the first deploy, check

- https://ahsanamingorsi.com/projects/acadivo loads directly and after a refresh
- https://ahsanamingorsi.com/anything-else shows the custom 404
- https://ahsanamingorsi.com/source/images/Award.jpeg still loads (old asset URLs preserved)
- Download CV, WhatsApp and each social link
- The link preview, by pasting the URL into WhatsApp or LinkedIn's Post Inspector
- Lighthouse in Chrome DevTools, mobile preset

## Contact form

The site is static, so the form does not send anything itself. It validates, then opens the visitor's email app with the message filled in, and says so. To switch to a form service later (Formspree, Web3Forms), replace the `window.location.href = mailtoUrl(...)` line in `src/components/contact/ContactForm.tsx` with a `fetch` to the service and show success only when the response is OK.

## Keyboard

`Ctrl K`, `Cmd K` or `/` opens search. `T` switches theme. Arrow keys move through the image viewer. `Esc` closes any overlay.
