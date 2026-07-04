# Bryan McNeil, Portfolio

Static portfolio site built with Next.js 16 (App Router, TypeScript, Tailwind CSS v4) and exported as plain files (`output: 'export'`). No server, no database.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into out/
```

`predev`/`prebuild` run `scripts/sync-assets.mjs` automatically, which copies `content/projects/<slug>/assets/` into `public/media/projects/<slug>/` so the export serves them. `public/media/` is derived output and stays out of git.

## Adding or editing a project

Projects are pure content; no code changes needed. Each one lives in:

```
content/projects/<slug>/
  project-details.md   # frontmatter + markdown body
  assets/              # optimized screenshots, videos, posters
```

Frontmatter fields:

| Field | Notes |
|---|---|
| `title`, `slug`, `tagline` | required |
| `category` | `personal` or `professional` |
| `techStack` | list shown as badges |
| `featured` | hero spotlight on the home page |
| `inDevelopment` | shows the In Development badge |
| `order` | sort order across grids |
| `showcase` | primary media filename inside `assets/` (optional) |
| `links` | optional `live` / `github` URLs |

`lib/content.ts` loads everything: it parses frontmatter, renders the markdown body to HTML, and lists `assets/` as gallery media. A video named `foo.mp4` picks up `foo-poster.jpg` as its poster automatically.

## Preparing media

Raw screenshots and clips go in `project-assets/` (not served). Optimize into the project's `assets/` folder as they arrive:

```bash
# Screenshots: resize (default max 1600px wide) and convert to WebP
node scripts/optimize-images.mjs --out content/projects/<slug>/assets <file.png> [...]

# Screen recordings: muted 1080p H.264 loop at low bitrate + first-frame poster JPEG
./scripts/make-loops.sh <raw-clip.mp4> content/projects/<slug>/assets [output-name]
```

`make-loops.sh` uses system ffmpeg when installed, otherwise the bundled `ffmpeg-static` binary from node_modules.

## Deploy

The site is plain static files. Every deploy is the same three steps:

```bash
npm run build          # regenerates out/
# upload the CONTENTS of out/ (not the folder) to the Hostinger public_html root
# hard-refresh the live site to confirm
```

Upload with either hPanel > File Manager (drag the contents of `out/` into `public_html`, overwrite) or FTP to the same directory. `out/.htaccess` ships with the upload and must land in `public_html`; it wires up the styled 404 page, forces `image/png` on the extensionless Open Graph routes so link previews render, and sets long cache headers on the fingerprinted `_next/static` assets.

Absolute URLs (canonical, `og:url`, `og:image`) are baked in at build time from `site.url` in `lib/site.ts`. If the domain ever changes, edit that one constant, rebuild, and re-upload; nothing else references the domain.

### First-time launch (one-time)

1. Buy the domain and point it at the Hostinger site; enable free SSL in hPanel and turn on **Force HTTPS** (leave HTTP→HTTPS and www canonicalization to hPanel, not `.htaccess`, to avoid redirect loops).
2. Confirm `site.url` in `lib/site.ts` matches the live domain, then `npm run build`.
3. Upload the contents of `out/` to `public_html`.
4. Smoke test on the live domain: every route, video autoplay, theme toggle, resume PDF download, the mailto button, a shared link preview (LinkedIn), and mobile.

### Future `.pro` → `.dev` migration

Change `site.url`, rebuild, re-upload, and add a 301 redirect from the old domain in hPanel.
