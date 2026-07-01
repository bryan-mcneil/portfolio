#!/usr/bin/env node
/**
 * Copy content/projects/<slug>/assets/ into public/media/projects/<slug>/ so
 * the static export serves them. Runs automatically before `dev` and `build`
 * (see package.json); public/media/ is derived output and stays gitignored.
 *
 * The URL base here must match MEDIA_URL_BASE in lib/content.ts.
 */
import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content", "projects");
const publicDir = path.join(process.cwd(), "public", "media", "projects");

fs.rmSync(publicDir, { recursive: true, force: true });

let copied = 0;
for (const entry of fs.readdirSync(contentDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const assetsDir = path.join(contentDir, entry.name, "assets");
  if (!fs.existsSync(assetsDir)) continue;
  const dest = path.join(publicDir, entry.name);
  fs.cpSync(assetsDir, dest, { recursive: true });
  copied += fs.readdirSync(dest).length;
}

console.log(`Synced ${copied} asset file(s) to public/media/projects/`);
