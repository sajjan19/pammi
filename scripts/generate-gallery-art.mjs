/**
 * Draws the stand-in gallery artwork in /public/gallery.
 *
 * These are illustrations, not photographs of her work — the gallery on the
 * site describes them as such. Replace them with real photos when there are
 * some; this script exists so the stand-ins can be recoloured in one place
 * until then.
 *
 *   node scripts/generate-gallery-art.mjs
 */

import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "gallery");

/* ── Palette, matched to the logo ──────────────────────────── */

const C = {
  cream: "#fdf8f0",
  blush: "#fbe9ee",
  magenta: "#c51a68",
  magentaLight: "#e84f95",
  magentaDeep: "#9c0f4e",
  gold: "#d9a01a",
  goldBright: "#f5c842",
  goldSoft: "#fdf0cf",
};

/* ── Drawing helpers ───────────────────────────────────────── */

/** Fine crosshatch, so the background reads as woven cloth rather than paper. */
function weave(stroke) {
  const lines = [];
  for (let x = 0; x <= 600; x += 20) lines.push(`M${x} 0V800`);
  for (let y = 0; y <= 800; y += 20) lines.push(`M0 ${y}H600`);
  return `<g stroke="${stroke}" stroke-opacity="0.35" stroke-width="0.6" fill="none"><path d="${lines.join(" ")}"/></g>`;
}

/** The lotus from the logo, used as a corner motif and on borders. */
function lotus(cx, cy, s, fill, opacity = 1) {
  return `<g transform="translate(${cx} ${cy}) scale(${s})" fill="${fill}" fill-opacity="${opacity}">
    <path d="M0 -14 C6 -6 8 2 0 10 C-8 2 -6 -6 0 -14Z"/>
    <path d="M-13 -8 C-5 -6 0 0 0 10 C-10 8 -15 2 -13 -8Z"/>
    <path d="M13 -8 C5 -6 0 0 0 10 C10 8 15 2 13 -8Z"/>
    <path d="M-24 0 C-14 -2 -6 3 0 10 C-11 14 -21 9 -24 0Z"/>
    <path d="M24 0 C14 -2 6 3 0 10 C11 14 21 9 24 0Z"/>
  </g>`;
}

/** A run of embroidery dots between two points. */
function dotRun(x1, y1, x2, y2, count, r, fill) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    out += `<circle cx="${(x1 + (x2 - x1) * t).toFixed(1)}" cy="${(y1 + (y2 - y1) * t).toFixed(1)}" r="${r}" fill="${fill}"/>`;
  }
  return out;
}

/** Neckline placket with paired embroidery, as on the logo's kurta. */
function placket(cx, top, bottom, fill) {
  const w = 11;
  return `<g fill="${fill}">
    <rect x="${cx - w / 2}" y="${top}" width="${w}" height="${bottom - top}" rx="5" fill-opacity="0.9"/>
    ${dotRun(cx - 22, top + 8, cx - 34, bottom - 16, 7, 3.4, fill)}
    ${dotRun(cx + 22, top + 8, cx + 34, bottom - 16, 7, 3.4, fill)}
    ${dotRun(cx - 13, top + 14, cx - 20, bottom - 10, 6, 2.4, fill)}
    ${dotRun(cx + 13, top + 14, cx + 20, bottom - 10, 6, 2.4, fill)}
  </g>`;
}

/** The patterned band along a hem. */
function border(d, fill) {
  return `<path d="${d}" fill="${fill}"/>`;
}

/* ── Garment pieces ────────────────────────────────────────── */

const KAMEEZ_BODY = `M212 252 C240 244 268 240 300 240 C332 240 360 244 388 252
  L432 272 L462 386 L416 408 L386 338 L386 596 Q300 618 214 596 L214 338
  L184 408 L138 386 L168 272 Z`;

const KAMEEZ_HEM = `M214 556 Q300 578 386 556 L386 596 Q300 618 214 596 Z`;

const NECK = `M266 244 C272 302 328 302 334 244 C316 254 284 254 266 244 Z`;

const ANARKALI_BODY = `M212 252 C240 244 268 240 300 240 C332 240 360 244 388 252
  L432 272 L462 386 L416 408 L386 338 L386 430
  C450 470 486 580 500 706 L100 706 C114 580 150 470 214 430 L214 338
  L184 408 L138 386 L168 272 Z`;

const ANARKALI_HEM = `M104 664 C102 678 101 692 100 706 L500 706
  C499 692 498 678 496 664 C400 686 200 686 104 664 Z`;

const KURTI_BODY = `M212 252 C240 244 268 240 300 240 C332 240 360 244 388 252
  L432 272 L462 386 L416 408 L386 338 L404 620 Q300 642 196 620 L214 338
  L184 408 L138 386 L168 272 Z`;

const KURTI_HEM = `M199 582 Q300 604 401 582 L404 620 Q300 642 196 620 Z`;

/** A dupatta draped down the left-hand side. */
function dupatta(fill, borderFill) {
  return `<g>
    <path d="M150 268 C118 340 106 470 124 606 L86 620 C64 470 78 336 116 258 Z" fill="${fill}"/>
    <path d="M116 258 L150 268 C142 286 136 304 131 323 L96 312 C102 293 108 275 116 258 Z" fill="${borderFill}"/>
    <path d="M86 620 L124 606 C128 622 132 637 137 651 L100 664 C95 650 90 635 86 620 Z" fill="${borderFill}"/>
    ${lotus(107, 420, 0.85, borderFill, 0.85)}
    ${lotus(107, 510, 0.85, borderFill, 0.85)}
  </g>`;
}

/* ── Tiles ─────────────────────────────────────────────────── */

function tile({ bg, halo, cloth, trim, body, hem, extra = "", withDupatta }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800" role="img">
  <rect width="600" height="800" fill="${bg}"/>
  ${weave(trim)}
  <circle cx="300" cy="404" r="286" fill="${halo}"/>
  ${lotus(300, 68, 1.5, trim, 0.5)}
  ${lotus(300, 744, 1.5, trim, 0.5)}
  ${withDupatta ? dupatta(trim, cloth) : ""}
  ${extra}
  <path d="${body}" fill="${cloth}"/>
  ${border(hem, trim)}
  <path d="${NECK}" fill="${bg}"/>
  ${placket(300, 250, 430, trim)}
  <path d="M414 392 L458 374 L466 396 L420 414 Z" fill="${trim}"/>
  <path d="M186 392 L142 374 L134 396 L180 414 Z" fill="${trim}"/>
</svg>
`;
}

/** Bottoms peeking out below a shorter kameez. */
function legs(fill, { spread = 0, top = 590, bottom = 764 } = {}) {
  const l = `M236 ${top} L${216 - spread} ${bottom} L288 ${bottom} L292 ${top}Z`;
  const r = `M364 ${top} L${384 + spread} ${bottom} L312 ${bottom} L308 ${top}Z`;
  return `<g fill="${fill}"><path d="${l}"/><path d="${r}"/></g>`;
}

/** Deeply pleated Patiala salwar. */
function patiala(fill, shade) {
  let pleats = "";
  for (let i = 0; i < 7; i++) {
    const x = 206 + i * 27;
    pleats += `<path d="M${x} 588 C${x - 6} 660 ${x - 4} 716 ${x + 4} 762" stroke="${shade}" stroke-width="3" fill="none" stroke-opacity="0.55"/>`;
  }
  return `<g>
    <path d="M200 580 C176 660 180 720 196 766 L404 766 C420 720 424 660 400 580 Z" fill="${fill}"/>
    ${pleats}
  </g>`;
}

const tiles = [
  // 1 — Punjabi suit: pink kameez, gold trim, dupatta
  {
    file: "placeholder-1.svg",
    svg: tile({
      bg: C.cream,
      halo: C.blush,
      cloth: C.magenta,
      trim: C.goldBright,
      body: KAMEEZ_BODY,
      hem: KAMEEZ_HEM,
      withDupatta: true,
      extra: legs(C.goldBright),
    }),
  },
  // 2 — Patiala suit: gold kameez over a pleated pink salwar
  {
    file: "placeholder-2.svg",
    svg: tile({
      bg: C.cream,
      halo: C.goldSoft,
      cloth: C.goldBright,
      trim: C.magenta,
      body: KURTI_BODY,
      hem: KURTI_HEM,
      withDupatta: false,
      extra: patiala(C.magenta, C.magentaDeep),
    }),
  },
  // 3 — Anarkali: flared, magenta with gold
  {
    file: "placeholder-3.svg",
    svg: tile({
      bg: C.blush,
      halo: C.cream,
      cloth: C.magentaDeep,
      trim: C.goldBright,
      body: ANARKALI_BODY,
      hem: ANARKALI_HEM,
      withDupatta: false,
    }),
  },
  // 4 — Sharara: short kurti over wide legs
  {
    file: "placeholder-4.svg",
    svg: tile({
      bg: C.cream,
      halo: C.blush,
      cloth: C.magentaLight,
      trim: C.gold,
      body: KURTI_BODY,
      hem: KURTI_HEM,
      withDupatta: true,
      extra: legs(C.magentaDeep, { spread: 74, top: 600 }),
    }),
  },
  // 5 — Kurti on its own
  {
    file: "placeholder-5.svg",
    svg: tile({
      bg: C.goldSoft,
      halo: C.cream,
      cloth: C.magenta,
      trim: C.gold,
      body: KURTI_BODY,
      hem: KURTI_HEM,
      withDupatta: false,
    }),
  },
  // 6 — Palazzo suit
  {
    file: "placeholder-6.svg",
    svg: tile({
      bg: C.blush,
      halo: C.cream,
      cloth: C.gold,
      trim: C.magenta,
      body: KAMEEZ_BODY,
      hem: KAMEEZ_HEM,
      withDupatta: false,
      extra: legs(C.magenta, { spread: 52, top: 588 }),
    }),
  },
];

/* ── Headwear ──────────────────────────────────────────────── */

/** A folded length of cloth, shown under both headwear tiles. */
function foldedCloth(fill, band) {
  return `<g>
    <path d="M150 620 C240 594 360 594 450 620 L450 716 C360 690 240 690 150 716 Z" fill="${fill}"/>
    <path d="M150 620 C240 594 360 594 450 620 L450 646 C360 620 240 620 150 646 Z" fill="${band}"/>
    <path d="M150 690 C240 664 360 664 450 690 L450 716 C360 690 240 690 150 716 Z" fill="${band}"/>
  </g>`;
}

/**
 * A child's patka: a small square of cloth tied over the joora, with the
 * knot sitting on top and the corners knotted at the back.
 */
const patka = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800" role="img">
  <rect width="600" height="800" fill="${C.blush}"/>
  ${weave(C.magenta)}
  <circle cx="300" cy="380" r="268" fill="${C.cream}"/>
  ${lotus(300, 62, 1.4, C.magenta, 0.4)}

  <path d="M300 168 C284 168 274 180 274 194 C274 208 286 216 300 216
           C314 216 326 208 326 194 C326 180 316 168 300 168 Z" fill="${C.magentaDeep}"/>
  <path d="M300 210 C214 210 168 272 168 344 C168 396 190 434 212 460 L388 460
           C410 434 432 396 432 344 C432 272 386 210 300 210 Z" fill="${C.magenta}"/>
  <path d="M300 210 C232 222 194 268 182 330" fill="none" stroke="${C.goldBright}" stroke-width="8" stroke-linecap="round"/>
  <path d="M300 210 C368 222 406 268 418 330" fill="none" stroke="${C.goldBright}" stroke-width="8" stroke-linecap="round"/>
  <path d="M196 384 C240 360 360 360 404 384" fill="none" stroke="${C.goldBright}" stroke-width="7" stroke-linecap="round"/>

  <path d="M168 440 C136 452 120 476 118 506 L156 512 C158 494 168 480 186 472 Z" fill="${C.magentaLight}"/>
  <path d="M432 440 C464 452 480 476 482 506 L444 512 C442 494 432 480 414 472 Z" fill="${C.magentaLight}"/>

  <path d="M186 460 L414 460 L414 500 L186 500 Z" fill="${C.magentaDeep}"/>
  ${dotRun(212, 480, 388, 480, 9, 5, C.goldBright)}

  ${foldedCloth(C.magentaLight, C.goldBright)}
  ${lotus(300, 758, 1.2, C.magenta, 0.45)}
</svg>
`;

/** An adult turban — taller, layered wraps, with the front fan. */
const turban = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800" role="img">
  <rect width="600" height="800" fill="${C.cream}"/>
  ${weave(C.gold)}
  <circle cx="300" cy="368" r="272" fill="${C.goldSoft}"/>
  ${lotus(300, 58, 1.4, C.gold, 0.5)}

  <path d="M300 150 C186 150 120 232 120 330 C120 396 152 448 182 482 L418 482
           C448 448 480 396 480 330 C480 232 414 150 300 150 Z" fill="${C.magenta}"/>

  <path d="M300 150 C206 162 150 224 134 306" fill="none" stroke="${C.goldBright}" stroke-width="10" stroke-linecap="round"/>
  <path d="M300 162 C216 178 166 236 152 318" fill="none" stroke="${C.magentaDeep}" stroke-width="8" stroke-linecap="round" stroke-opacity="0.75"/>
  <path d="M300 150 C394 162 450 224 466 306" fill="none" stroke="${C.goldBright}" stroke-width="10" stroke-linecap="round"/>
  <path d="M300 162 C384 178 434 236 448 318" fill="none" stroke="${C.magentaDeep}" stroke-width="8" stroke-linecap="round" stroke-opacity="0.75"/>
  <path d="M156 372 C220 340 380 340 444 372" fill="none" stroke="${C.goldBright}" stroke-width="8" stroke-linecap="round"/>
  <path d="M162 416 C226 388 374 388 438 416" fill="none" stroke="${C.magentaDeep}" stroke-width="7" stroke-linecap="round" stroke-opacity="0.7"/>

  <path d="M262 214 L300 150 L338 214 C326 196 274 196 262 214 Z" fill="${C.goldBright}"/>

  <path d="M120 482 L480 482 L480 532 L120 532 Z" fill="${C.magentaDeep}"/>
  ${dotRun(150, 507, 450, 507, 13, 5.5, C.goldBright)}

  ${foldedCloth(C.magenta, C.goldBright)}
  ${lotus(300, 758, 1.2, C.gold, 0.55)}
</svg>
`;

/**
 * Repairs and hemming: a trouser leg with a fresh hem being stitched, the
 * needle still in it, and a pair of scissors. The one job that isn't a
 * finished garment, so it gets the tools rather than the clothes.
 */
const repair = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800" role="img">
  <rect width="600" height="800" fill="${C.cream}"/>
  ${weave(C.magenta)}
  <circle cx="300" cy="400" r="270" fill="${C.blush}"/>
  ${lotus(300, 62, 1.4, C.magenta, 0.4)}

  <path d="M214 170 L346 170 L372 600 L250 600 Z" fill="${C.magentaDeep}"/>
  <path d="M250 548 L370 548 L372 600 L250 600 Z" fill="${C.magenta}"/>
  <path d="M252 540 L369 540" stroke="${C.goldBright}" stroke-width="5"
        stroke-dasharray="12 9" stroke-linecap="round"/>
  <path d="M280 170 L286 450" stroke="${C.magenta}" stroke-width="3" stroke-opacity="0.6"/>

  <path d="M369 540 C420 520 448 470 440 400 C434 352 404 330 382 338"
        fill="none" stroke="${C.goldBright}" stroke-width="4" stroke-linecap="round"/>
  <path d="M376 344 L470 218" stroke="#8d7c86" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="465" cy="225" rx="3" ry="9" transform="rotate(37 465 225)" fill="${C.cream}"/>

  <g transform="translate(150 640) rotate(-18)">
    <circle cx="0" cy="0" r="26" fill="none" stroke="${C.gold}" stroke-width="9"/>
    <circle cx="54" cy="20" r="26" fill="none" stroke="${C.gold}" stroke-width="9"/>
    <path d="M18 -6 L170 -60 L176 -48 L36 6 Z" fill="#a89aa1"/>
    <path d="M38 30 L176 -32 L172 -18 L44 42 Z" fill="#8d7c86"/>
    <circle cx="34" cy="10" r="6" fill="${C.magentaDeep}"/>
  </g>

  ${lotus(300, 758, 1.2, C.magenta, 0.45)}
</svg>
`;

/* ── Men's and kids' suits ─────────────────────────────────── */

/** A men's kurta: straight, knee length, full sleeves, squarer shoulders. */
const MEN_KURTA = `M208 246 L392 246 L436 262 L470 478 L434 488 L398 330
  L398 642 L202 642 L202 330 L166 488 L130 478 L164 262 Z`;

/** Kurta with its band collar, buttoned placket, cuffs and hem band. */
function menKurta(cloth, trim) {
  return `<g>
    <path d="${MEN_KURTA}" fill="${cloth}"/>
    <path d="M202 620 H398 V642 H202 Z" fill="${trim}"/>
    <path d="M132 462 L168 472 L166 488 L130 478 Z" fill="${trim}"/>
    <path d="M468 462 L432 472 L434 488 L470 478 Z" fill="${trim}"/>
    <rect x="272" y="232" width="56" height="22" rx="6" fill="${trim}"/>
    <rect x="295" y="252" width="10" height="150" rx="4" fill="${trim}"/>
    ${dotRun(300, 272, 300, 384, 5, 4.5, cloth)}
  </g>`;
}

/** Straight pyjama legs showing below a knee-length kurta. */
function pyjama(fill) {
  return `<g fill="${fill}">
    <path d="M226 630 L218 772 L290 772 L294 630 Z"/>
    <path d="M374 630 L382 772 L310 772 L306 630 Z"/>
  </g>`;
}

const mensSuit = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800" role="img">
  <rect width="600" height="800" fill="${C.cream}"/>
  ${weave(C.gold)}
  <circle cx="300" cy="404" r="286" fill="${C.blush}"/>
  ${lotus(300, 68, 1.5, C.gold, 0.5)}
  ${lotus(300, 750, 1.3, C.gold, 0.5)}
  ${pyjama(C.goldBright)}
  ${menKurta(C.magentaDeep, C.goldBright)}
</svg>
`;

/**
 * Two small outfits side by side — a girl's suit and a boy's kurta pyjama —
 * drawn at full size and scaled down, so they match the adult drawings.
 */
const girlsSuit = `
  ${legs(C.goldBright)}
  <path d="${KAMEEZ_BODY}" fill="${C.magenta}"/>
  ${border(KAMEEZ_HEM, C.goldBright)}
  <path d="${NECK}" fill="${C.cream}"/>
  ${placket(300, 250, 430, C.goldBright)}
  <path d="M414 392 L458 374 L466 396 L420 414 Z" fill="${C.goldBright}"/>
  <path d="M186 392 L142 374 L134 396 L180 414 Z" fill="${C.goldBright}"/>`;

const boysSuit = `
  ${pyjama(C.magenta)}
  ${menKurta(C.goldBright, C.magentaDeep)}`;

const kidsSuits = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800" role="img">
  <rect width="600" height="800" fill="${C.blush}"/>
  ${weave(C.magenta)}
  <circle cx="300" cy="404" r="286" fill="${C.cream}"/>
  ${lotus(300, 68, 1.5, C.magenta, 0.4)}
  ${lotus(300, 750, 1.3, C.magenta, 0.4)}
  <g transform="translate(0 196) scale(0.56)">${girlsSuit}</g>
  <g transform="translate(264 196) scale(0.56)">${boysSuit}</g>
</svg>
`;

fs.mkdirSync(OUT, { recursive: true });
for (const { file, svg } of tiles) {
  fs.writeFileSync(path.join(OUT, file), svg);
}
fs.writeFileSync(path.join(OUT, "placeholder-7.svg"), patka);
fs.writeFileSync(path.join(OUT, "placeholder-8.svg"), turban);
fs.writeFileSync(path.join(OUT, "placeholder-9.svg"), repair);
fs.writeFileSync(path.join(OUT, "placeholder-10.svg"), mensSuit);
fs.writeFileSync(path.join(OUT, "placeholder-11.svg"), kidsSuits);

console.log(`wrote ${tiles.length + 5} illustrations to public/gallery`);
