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

`npm run build`, then upload the contents of `out/` to Hostinger via hPanel File Manager or FTP. Full launch steps land in Phase 8 of `implementation.md`.
