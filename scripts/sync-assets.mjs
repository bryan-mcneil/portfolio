#!/usr/bin/env node
/**
 * Copy content assets into public/media/ so the static export serves them:
 *   content/projects/<slug>/assets/ -> public/media/projects/<slug>/
 *   content/about/assets/           -> public/media/about/
 * Runs automatically before `dev` and `build` (see package.json);
 * public/media/ is derived output and stays gitignored.
 *
 * The URL bases here must match MEDIA_URL_BASE in lib/content.ts and the
 * about-page image paths in app/about/page.tsx.
 */
import fs from "node:fs";
import path from "node:path";

const mediaDir = path.join(process.cwd(), "public", "media");
const contentDir = path.join(process.cwd(), "content", "projects");
const aboutAssetsDir = path.join(process.cwd(), "content", "about", "assets");

fs.rmSync(mediaDir, { recursive: true, force: true });

let copied = 0;
for (const entry of fs.readdirSync(contentDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const assetsDir = path.join(contentDir, entry.name, "assets");
  if (!fs.existsSync(assetsDir)) continue;
  const dest = path.join(mediaDir, "projects", entry.name);
  fs.cpSync(assetsDir, dest, { recursive: true });
  copied += fs.readdirSync(dest).length;
}

if (fs.existsSync(aboutAssetsDir)) {
  const dest = path.join(mediaDir, "about");
  fs.cpSync(aboutAssetsDir, dest, { recursive: true });
  copied += fs.readdirSync(dest).length;
}

console.log(`Synced ${copied} asset file(s) to public/media/`);
