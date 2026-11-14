// Generates WebP derivatives of the original assets in public/source/images.
// Originals are never renamed, moved or overwritten.
// Run: npm run images
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'public/source/images';
const OUT = 'public/images/optimized';

/** [original filename, output slug, widths, optional crop {left, top, width, height}] */
const jobs = [
  ['Profile img.png', 'profile', [480, 960]],
  ['Hero img.jpg', 'workspace-1', [640, 1280]],
  ['Hero img 2.jpg', 'workspace-2', [640, 1280]],
  ['Award.jpeg', 'eic25-award', [640, 1280]],
  ['eic-award-stage.jpg', 'eic25-award-stage', [480]],
  ['E-Gala 2026.jpeg', 'egala-2026-stage', [640, 1280]],
  ['E-Gala 2026 {Apprication Certificate ).jpeg', 'egala-2026-certificate', [640, 1280]],
  ['EIC-25 Team Graphics.jpg', 'eic25-graphics-team', [640, 1024]],
  ['SEC MEDIA TEAM 2024.jpg', 'sec-2024-media-team', [640, 1040]],
  // The logo PNG has large transparent margins; crop to the mark itself.
  ['AAG Logo.png', 'aag-logo', [200, 600], { left: 0, top: 290, width: 1020, height: 410 }],
];

await mkdir(OUT, { recursive: true });
for (const [file, slug, widths, crop] of jobs) {
  for (const w of widths) {
    let img = sharp(path.join(SRC, file)).rotate();
    if (crop) img = img.extract(crop);
    const out = path.join(OUT, `${slug}-${w}.webp`);
    const info = await img.resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
    console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  }
}

// Favicons and touch icons: the AAG mark on the brand background.
const mark = await sharp(path.join(SRC, 'AAG Logo.png'))
  .extract({ left: 0, top: 290, width: 1020, height: 410 })
  .resize({ width: 400 })
  .toBuffer();
await mkdir('public/icons', { recursive: true });
for (const size of [32, 180, 192, 512]) {
  const inner = await sharp(mark).resize({ width: Math.round(size * 0.8) }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#080D18' } })
    .composite([{ input: inner, gravity: 'centre' }])
    .png()
    .toFile(`public/icons/icon-${size}.png`);
}
console.log('icons written to public/icons');
