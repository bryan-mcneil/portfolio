@AGENTS.md

# Portfolio Site

Static portfolio site for Bryan McNeil (bmcneil.t@gmail.com), full-stack software engineer. Recruiters are the audience; fast load and a strong first six seconds are the priorities.

## Key documents
- `project-scope.md`: original scope and goals
- `implementation.md`: decision log and the 8-phase build plan. Check the decision log before proposing alternatives; those choices are settled.
- `projects.md` / `about.md`: raw source copy for site content

## Documentation lookups
Use the context7 MCP tools (`resolve-library-id` + `query-docs`) whenever working with or looking up docs for Next.js, Tailwind, shadcn/ui, Magic UI, Aceternity UI, motion/framer-motion, or any other library. Training data may be stale; prefer context7 over memory or web search. For Next.js specifics, the version-exact docs in `node_modules/next/dist/docs/` are also authoritative.

## Stack and constraints
- Next.js 16, App Router, TypeScript, Tailwind CSS v4, npm
- shadcn/ui for foundations; Magic UI and Aceternity UI for flair (flair must never cost Lighthouse points; target 90+ mobile)
- Fully static: `output: 'export'`, `images.unoptimized: true`. No server routes, no database, no analytics. Deploys as plain files to Hostinger.
- Dark theme default with light/dark toggle via next-themes
- Site-wide constants live in `lib/site.ts`; never hardcode name, email, URL, or skills elsewhere

## Content conventions
- Projects live in `content/projects/<slug>/` with `project-details.md` (frontmatter + markdown body) and an `assets/` folder. Pages generate from the content loader in `lib/content.ts`; adding a project must require zero code changes.
- Videos are GIF-style loops: `<video autoplay muted loop playsinline preload="none">` with poster frames. Prep raw clips with the scripts in `scripts/`.
- Images are pre-optimized (sharp to WebP) before shipping.

## Writing rules for all site copy
Follow the banned patterns in `project-scope.md` exactly. Highlights, zero exceptions:
- No em dashes (—) anywhere. Use a comma, a period, or restructure.
- Banned: "dive into", "game-changer", "worth noting", "seamless(ly)", "unleash", "unlock your", "elevate your", "robust" (as a feature adjective), "at the end of the day", "in today's world", "look no further", sentences opening with "Additionally," or "Furthermore,", passive "is designed to"
- Never open a sentence with "Overall" or "In conclusion"
- Use contractions, active voice, varied sentence length, no filler ("very", "really", "truly")

## Workflow
- Design decisions (colors, fonts, component picks) are provisional until Bryan approves them visually at the Phase 3 design checkpoint
- Build check: `npm run build` must produce a clean static `out/`
- Deploy: upload `out/` contents to Hostinger via hPanel or FTP (manual, documented in README)
