// Regenerates app/apple-icon.png and app/favicon.ico from app/icon.svg.
// Run after changing the mark: node scripts/generate-icons.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const appDir = path.join(process.cwd(), "app");
const svg = fs.readFileSync(path.join(appDir, "icon.svg"));

/** Wrap a single PNG in the ICO container format (browsers accept PNG-in-ICO). */
function pngToIco(png, sizePx) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(sizePx === 256 ? 0 : sizePx, 0); // width
  entry.writeUInt8(sizePx === 256 ? 0 : sizePx, 1); // height
  entry.writeUInt8(0, 2); // palette colors
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // image size
  entry.writeUInt32LE(22, 12); // offset: 6 header + 16 entry

  return Buffer.concat([header, entry, png]);
}

const apple = await sharp(svg, { density: 300 }).resize(180, 180).png().toBuffer();
fs.writeFileSync(path.join(appDir, "apple-icon.png"), apple);

const favPng = await sharp(svg, { density: 300 }).resize(32, 32).png().toBuffer();
fs.writeFileSync(path.join(appDir, "favicon.ico"), pngToIco(favPng, 32));

console.log("Wrote app/apple-icon.png and app/favicon.ico from app/icon.svg");
