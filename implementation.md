# Portfolio Site: Implementation Plan

Companion to `project-scope.md`. All decisions below were agreed on 2026-07-01.

## Decision Log

| Decision | Choice |
|---|---|
| Hosting | Hostinger (business plan), served as a plain static site |
| Rendering | Next.js 16, App Router, TypeScript, `output: 'export'` (fully static, no Node process) |
| Package manager | npm |
| Repo | Public GitHub repo, git initialized from day one |
| Domain | `bryanmcneil.pro` (placeholder URL in code until purchased; single config constant so a later switch to `.dev` is one line plus an hPanel redirect) |
| Contact | No form. Styled contact section with a `mailto:bmcneil.t@gmail.com` button, copy-to-clipboard, and social links |
| Content | Folder-per-project convention under `content/projects/<slug>/` with frontmatter + markdown body |
| Project sections | Personal and Professional get separate sections (home page and /projects) |
| Featured projects | Helpdesk and Forgotten Kanji in the hero spotlight |
| In-development badge | GadgetDrop and Forgotten Kanji |
| Theme | Dark default with light/dark toggle (`next-themes`); accent: violet/indigo family, provisional until the design checkpoint |
| Hero identity | "Bryan McNeil", "Full-Stack Software Engineer", 8+ years |
| Hero skills | TypeScript, React, Next.js, PHP / Laravel, PostgreSQL / MySQL, Azure, AI Integration |
| Videos | Self-hosted, GIF-style: `<video autoplay muted loop playsinline>` with poster frames, ffmpeg-compressed, ~15s UI demo clips |
| Images | Self-hosted, pre-optimized at build time (static export disables Next's image server) |
| Resume | Bryan provides source content. Print-styled HTML page plus a static `/resume.pdf` the download button links to |
| About page | Intro + photo, "how I work", hobbies (philosophy degree, travel), photo strip with family and pets. Real first names are fine |
| SEO scope | Minimal on purpose: per-page titles/descriptions and Open Graph images only. No sitemap, robots, JSON-LD, or analytics. Recruiters arrive by direct link |
| Deploy workflow | `npm run build` produces `out/`; upload contents to Hostinger via hPanel File Manager or FTP |

## Assets Bryan Provides Along the Way

- Resume source file (needed at Phase 5)
- Per-project screenshots and raw video clips (needed at Phase 2+; `project-assets/` already has 4 UTDB/CNH screenshots)
- Personal photos: headshot-style photo, travel shots, Moose and Mochi (needed at Phase 6)
- Domain purchase (needed at Phase 8)

## Site Map

- `/` : hero, featured projects, personal projects grid, professional projects grid, about blurb, contact section
- `/projects` : intro summary (tech stacks + leadership skills), both project grids
- `/projects/[slug]` : one page per project (5 at launch: helpdesk, gadgetdrop, forgotten-kanji, educate360, utdb)
- `/resume` : print-friendly HTML resume + Download PDF button
- `/about` : personal page
- `404` : simple not-found page

---

## Phase 1: Scaffold and Base Layout

1. `npx create-next-app@latest` with TypeScript, Tailwind, App Router, ESLint. npm.
2. Configure `next.config.ts`: `output: 'export'`, `images.unoptimized: true`, trailing slash decision.
3. `git init`, first commit, create public GitHub repo and push.
4. Initialize shadcn/ui; install `next-themes`, `framer-motion` (required by Aceternity and Magic UI components).
5. Central site config file (`lib/site.ts`): name, title, email, URL placeholder, skills list, social links. Every component reads from here, nothing hardcoded twice.
6. Build the shared layout: navbar (Projects, Resume, About, theme toggle), footer, dark/light theme wiring.
7. Placeholder pages for every route so navigation works end to end.

Exit criteria: site runs locally, static export builds clean, nav and theme toggle work.

## Phase 2: Content Pipeline

1. Create the content convention:
   ```
   content/projects/<slug>/
     project-details.md   (frontmatter + markdown body)
     assets/              (screenshots, videos, posters)
   ```
2. Define the frontmatter schema: `title`, `slug`, `tagline`, `category` (personal | professional), `techStack[]`, `featured`, `inDevelopment`, `order`, `showcase` (primary media file), optional `links` (live, github).
3. Content loader in `lib/content.ts` using `gray-matter` + a markdown renderer. All pages consume this one loader (DRY).
4. Migrate `projects.md` into five `project-details.md` files, cleaning up copy per the writing rules in `project-scope.md` (no em dashes, no banned phrases, contractions, active voice).
5. Media prep scripts (run manually as assets arrive, documented in README):
   - `scripts/optimize-images.mjs`: sharp, resize to sane max widths, emit WebP.
   - `scripts/make-loops.sh`: ffmpeg, raw clip in, muted 1080p H.264 MP4 out at low bitrate, plus a poster JPEG from the first frame.
6. Move the existing CNH screenshots into `content/projects/utdb/assets/` and optimize.

Exit criteria: `getProjects()` returns all five projects with parsed frontmatter; adding a project requires zero code changes.

## Phase 3: Home Page and Design Checkpoint

1. Hero: Aceternity background-beams (or similar) backdrop, Magic UI Blur Fade entrance, name, title, 8+ years line, skills row, primary CTA ("View Projects") and secondary CTA ("Resume").
2. Featured spotlight: Helpdesk and Forgotten Kanji cards with showcase media, larger treatment than the grid.
3. Reusable `ProjectCard`: full-card link to `/projects/[slug]`, tagline, tech badges, "In Development" badge where flagged. Used everywhere cards appear.
4. Personal Projects section and Professional Projects section, each a grid of `ProjectCard`s.
5. About blurb section linking to `/about`.
6. Contact section: mailto button, copy-to-clipboard email, GitHub/LinkedIn links.
7. **Design checkpoint with Bryan**: review theme, accent color, fonts, hero components in the browser before styling anything further. Iterate here.

Exit criteria: home page approved visually; six-second impression test passes (name, title, skills, and a featured project visible without scrolling on desktop).

## Phase 4: Projects Pages

1. `/projects`: intro paragraph summarizing tech stacks and leadership skills, then both grids (reusing Phase 3 components).
2. `/projects/[slug]` via `generateStaticParams` from the content loader:
   - Header: title, tagline, tech stack badges, In Development badge, links.
   - Showcase media at top: looping video (autoplay muted loop playsinline + poster) or hero screenshot.
   - Markdown body rendered as the project description.
   - Thumbnail gallery for remaining media, opening a lightbox (shadcn Dialog + Carousel) with keyboard navigation. Looping clips autoplay in the gallery too.
3. Prev/next project navigation at the page bottom to keep recruiters moving.

Exit criteria: all five project pages render from content files alone; videos lazy-load (`preload="none"` outside the initial viewport) and loop cleanly.

## Phase 5: Resume Page

1. Bryan provides the resume source; convert to a clean HTML page using shared typography components.
2. Print stylesheet: white background regardless of theme, hide nav/footer/effects, sane margins, letter-size layout so Ctrl+P looks right.
3. "Download PDF" button linking to `/resume.pdf` (static file Bryan maintains in `public/`).

Exit criteria: page reads well on screen, prints to one or two clean pages, PDF downloads.

## Phase 6: About Page

1. Sections from `about.md` (cleaned up per writing rules): intro + photo, work philosophy, hobbies and philosophy degree, travel, Moose and Mochi.
2. Photo strip/grid component (reused image optimization pipeline). Blur Fade on scroll for warmth without weight.

Exit criteria: page complete with real photos.

## Phase 7: Polish and Performance

1. Per-page `metadata` exports: titles and descriptions for every route.
2. Open Graph images: one default card for the site, per-project cards from showcase screenshots (static files, no generation service).
3. 404 page, favicon set.
4. Accessibility pass: focus states, alt text from content frontmatter, reduced-motion media query for the animated components, color contrast in both themes.
5. Performance pass: Lighthouse on throttled mobile, target 90+ performance. Verify total home page weight, font loading (`next/font`, self-hosted), no layout shift from media (explicit dimensions everywhere).
6. Cross-browser and mobile spot check.

Exit criteria: Lighthouse 90+ on home and one project page; links paste with a proper preview card.

## Phase 8: Launch

1. Bryan buys `bryanmcneil.pro`, points it at the Hostinger site, enables free SSL.
2. Set the real URL in `lib/site.ts`, final `npm run build`.
3. Upload `out/` contents via hPanel File Manager or FTP.
4. Live smoke test: every route, videos, theme toggle, PDF download, mailto button, mobile.
5. Document the redeploy routine in README (build, upload, done).

Exit criteria: site live on the domain, README covers future updates and the eventual `.pro` to `.dev` migration (config change + redirect).

---

## Component Shopping List (evaluated at the design checkpoint, not before)

- Aceternity: background-beams (hero), card hover effects for project cards
- Magic UI: Blur Fade (entrances), possibly Marquee for the skills row, Shine/Border Beam for featured cards
- shadcn/ui: Button, Badge, Card, Dialog, Carousel, DropdownMenu (theme toggle)
- Rule: every flashy component must earn its bytes; if Lighthouse drops below target, flair loses to speed.
