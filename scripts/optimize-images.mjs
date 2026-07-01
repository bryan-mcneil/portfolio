#!/usr/bin/env node
/**
 * Optimize screenshots for the site: resize to a sane max width and emit WebP.
 *
 * Usage:
 *   node scripts/optimize-images.mjs --out content/projects/<slug>/assets [--width 1600] <images...>
 *
 * Output filenames are the input names kebab-cased with a .webp extension,
 * e.g. CNH_Homepage.png -> cnh-homepage.webp
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const inputs = [];
let outDir;
let maxWidth = 1600;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--out") outDir = args[++i];
  else if (args[i] === "--width") maxWidth = Number(args[++i]);
  else inputs.push(args[i]);
}

if (!outDir || inputs.length === 0) {
  console.error(
    "Usage: node scripts/optimize-images.mjs --out <dir> [--width 1600] <images...>",
  );
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

function kebabCase(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

for (const input of inputs) {
  const base = kebabCase(path.basename(input, path.extname(input)));
  const outPath = path.join(outDir, `${base}.webp`);
  const { width, height } = await sharp(input).metadata();
  await sharp(input)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outPath);
  const inKb = (fs.statSync(input).size / 1024).toFixed(0);
  const outKb = (fs.statSync(outPath).size / 1024).toFixed(0);
  console.log(`${input} (${width}x${height}, ${inKb} KB) -> ${outPath} (${outKb} KB)`);
}
