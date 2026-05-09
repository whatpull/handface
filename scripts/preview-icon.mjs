import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

mkdirSync('preview-out', { recursive: true });
const svg = readFileSync('src/app/icon.svg');
for (const size of [16, 24, 32, 64, 128]) {
  const png = await sharp(svg).resize(size, size).png().toBuffer();
  writeFileSync(`preview-out/icon-${size}.png`, png);
  console.log(`generated preview-out/icon-${size}.png (${png.length} bytes)`);
}
