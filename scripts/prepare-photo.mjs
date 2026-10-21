/**
 * Gets a phone photo ready for the website.
 *
 *   node scripts/prepare-photo.mjs <input> <output>
 *   node scripts/prepare-photo.mjs ~/Downloads/IMG_1234.jpeg public/pammi.jpg
 *
 * Phone photos carry hidden data, often including the GPS position they
 * were taken at — for a home business, that can be the family's address.
 * Anything in /public can be downloaded byte for byte, so that data has to
 * go before a photo does. Re-encoding through sharp drops all of it, and the
 * photo is turned upright and shrunk to a sensible size on the way.
 *
 * Run every photo through this before it goes in /public, gallery photos
 * included.
 */

import sharp from "sharp";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node scripts/prepare-photo.mjs <input> <output>");
  process.exit(1);
}

const info = await sharp(input)
  // Apply the phone's rotation flag to the pixels themselves, since the
  // flag is part of the data being removed.
  .rotate()
  .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
  // sharp writes no metadata unless asked, so the location goes here.
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(output);

console.log(
  `wrote ${output}: ${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB, metadata removed`,
);
