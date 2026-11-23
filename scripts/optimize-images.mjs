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

// Favicons and touch icons: the AAG mark (viewfinder + signal pulse) on
// Petrol Obsidian, matching src/components/ui/Logo.tsx exactly.
const markSvg = `
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#172B29"/>
    <path d="M10,32 V10 H32 M68,10 H90 V32 M90,68 V90 H68 M32,90 H10 V68"
      stroke="#D9D9C9" stroke-width="7" stroke-linecap="square" fill="none"/>
    <path d="M18,52 H34 L44,26 L56,74 L66,52 H82"
      stroke="#C4D65E" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`;
await mkdir('public/icons', { recursive: true });
for (const size of [32, 180, 192, 512]) {
  await sharp(Buffer.from(markSvg)).resize(size, size).png().toFile(`public/icons/icon-${size}.png`);
}
console.log('icons written to public/icons');

// Open Graph card: brand background, the mark, name, headline and the portrait.
const profile = await sharp(path.join(SRC, 'Profile img.png'))
  .resize({ width: 520, height: 630, fit: 'cover', position: 'top' })
  .png()
  .toBuffer();
const profileB64 = profile.toString('base64');
const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#172B29"/>
    <defs>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M48 0H0V48" fill="none" stroke="#D9D9C9" stroke-opacity="0.08"/>
      </pattern>
      <clipPath id="clip"><rect x="680" y="0" width="520" height="630" rx="4"/></clipPath>
    </defs>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <image href="data:image/png;base64,${profileB64}" x="680" y="0" width="520" height="630" clip-path="url(#clip)"/>
    <path d="M700,40 V10 H730 M700,590 V620 H730" stroke="#C4D65E" stroke-width="4" fill="none"/>
    <g transform="translate(64,64)">
      <path d="M0,44 V0 H44 M88,0 H132 V44 M132,88 V132 H88 M44,132 H0 V88"
        stroke="#D9D9C9" stroke-width="9" stroke-linecap="square" fill="none"/>
      <path d="M22,66 H44 L58,32 L74,100 L88,66 H110"
        stroke="#C4D65E" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </g>
    <text x="64" y="320" font-family="Arial, sans-serif" font-size="76" font-weight="800" fill="#D9D9C9" letter-spacing="-2">AHSAN AMIN</text>
    <text x="64" y="404" font-family="Arial, sans-serif" font-size="76" font-weight="800" fill="#D9D9C9" letter-spacing="-2">GORSI</text>
    <text x="64" y="460" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#C4D65E">Building Digital Products.</text>
    <text x="64" y="498" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#C4D65E">Engineering Ideas Into Reality.</text>
    <text x="64" y="552" font-family="monospace" font-size="20" fill="#93A099">Developer. Creator. Entrepreneur.</text>
  </svg>`;
await sharp(Buffer.from(ogSvg)).png().toFile('public/og-image.png');
console.log('og-image.png regenerated');
