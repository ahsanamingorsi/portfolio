# Content verification

What was checked, what conflicted, and what you should confirm before publishing. Every item below is one edit in `src/data/`.

## Conflicts between sources, and what the site uses

| Topic | Old site | Other source | Site uses |
| --- | --- | --- | --- |
| LinkedIn URL | `/in/ahsanamingorsi` | Brief and CV: `/in/ahsan-amin-gorsi` | Brief and CV |
| Canonical / Open Graph URLs | `https://your-domain.com/` placeholder (live right now) | | `https://ahsanamingorsi.com/` |
| AskPaperGen status | "Running" | Brief: discontinued / archived | Archived. The old build is still online, so the link reads "Open archived build" |
| AskPaperGen stack | ASP.NET MVC, C#, SQL Server | Live build and repository are a browser-based HTML/JavaScript tool | HTML, CSS, JavaScript, Bootstrap |
| Flixsan stack | HTML, CSS, JavaScript, API | Repository is an ASP.NET Core (.NET 8) project with Controllers, Models, Views and Migrations | Both listed. **Confirm.** |
| Acadivo stack | ASP.NET MVC, C#, SQL Server | Brief: Angular + .NET Web API + SQL Server planned | Planned architecture, with "ASP.NET MVC (first build)" |
| Acadivo status | "Testing" | Brief: MVP development | "MVP in development", not launched |
| EIC 25 award wording | graphic design and media production | CV: management and content creation; brief: all three | Graphic design, management and content creation |

## Please confirm (search the code for `VERIFY`)

1. **Skills split** (`skills.ts`). Marked as *learning*: .NET Web API, Entity Framework Core, Angular, Clean Architecture, Motion Graphics. Everything else is *using*. The FlixSan repository has EF migrations, so EF Core may belong under *using*.
2. **Case study text** (`projects.ts`). Overview, problem and challenge lines were written from the facts above, kept short on purpose. "Lessons learned" is empty for every project because there was nothing to base it on; the section appears as soon as you add lines. LifeOS and Monivo have one-line problem statements that are my wording, not yours.
3. **About text** (`personal.ts`). Written from the CV, old site and brief. Check it reads as you.
4. **NaSCon 2026** (`achievements.ts`). Only "took part, representing the University of Kotli". Add track, team, result and an image if you have them.
5. **C# .NET MVC Web Development certification**. Issuer and year unknown; shown without them.
6. **E-Gala 2026**. Issuing body and exact role wording.
7. **Availability line** (`personal.ts`): "Open to internships and collaborations", taken from your GitHub profile.
8. **Creator experience** (AI product video generation). Left out, as instructed, until you supply employer or brand and dates. A commented template is in `experience.ts`.
9. **Videos** (`creator-work.ts`). The list is empty, so the Creator Studio shows your three channels and an honest empty state. Add real entries and the grid, platform filter and preview player switch on.
10. **Services** (`services.ts`). Phrased as areas you can contribute to, with no client claims.

## Links checked on 13 November 2026

| Link | Result |
| --- | --- |
| https://ahsanamingorsi.com/ | Loads (old site) |
| https://github.com/ahsanamingorsi | Loads; 7 public repositories |
| https://github.com/ahsanamingorsi/FlixSan | Loads |
| https://ahsanamingorsi.github.io/AskPaperGen/ | Loads |
| https://github.com/ahsanamingorsi/AskPaperGen | Listed on the profile; not opened separately |
| LinkedIn, Instagram, TikTok, YouTube, WhatsApp | Not opened. URLs are exactly as in your brief. Click each once. |

## What was and was not tested

Tested in a headless browser against a local server that mimics GitHub Pages: 55 checks covering status codes, refresh on project pages, the 404 page, navigation, filters, search, sort, the command palette, the image viewer, form validation, the mobile menu, broken images, and horizontal overflow at 360, 390, 768, 1024 and 1440px.

Not tested, because the build machine had no network:

- `npm install` and the real `vite build`. The test bundle was made with esbuild from the same source.
- `tsc` type checking. The build does not depend on it.
- Lighthouse scores and the live GitHub Pages deployment.
