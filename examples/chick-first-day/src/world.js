import { C } from './palette.js';

const n = (v) => Math.round(v * 100) / 100;
const rnd = (i, s = 1) => {
  // deterministic pseudo-random in [0,1) — seeded hash, never Math.random
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453123;
  return x - Math.floor(x);
};

export const NEST = { x: 930, y: 884, rx: 268, ry: 82 };

/** Screen-space camera transform for one parallax layer (k=1 rides the camera fully). */
export function layerTransform(cam, k = 1) {
  // cam = the world point pinned to the screen centre; k = how much this layer rides the camera.
  const z = 1 + (cam.zoom - 1) * k;
  const cx = 960 + (cam.x - 960) * k;
  const cy = 540 + (cam.y - 540) * k;
  const shx = (cam.sx || 0) * k, shy = (cam.sy || 0) * k;
  return `translate(${n(960 + shx)} ${n(540 + shy)}) rotate(${n(cam.rot * k)}) scale(${n(z)}) translate(${n(-cx)} ${n(-cy)})`;
}

export function sky(st, t) {
  const out = [];
  out.push(`<rect x="-900" y="-900" width="3720" height="2880" fill="url(#gSky)"/>`);
  // warm band hugging the horizon
  out.push(`<rect x="-900" y="470" width="3720" height="520" fill="url(#gHazeTop)" opacity="0.55"/>`);
  // slow drifting colour wash so the sky is never frozen
  const w = 0.5 + 0.5 * Math.sin(t * 0.35);
  out.push(`<ellipse cx="${n(1180 + w * 120)}" cy="${n(560 - w * 40)}" rx="1150" ry="470"
     fill="url(#gWashWarm)" opacity="${n(0.20 + w * 0.10)}"/>`);
  out.push(`<ellipse cx="${n(520 - w * 90)}" cy="380" rx="800" ry="560" fill="url(#gWashCool)"
     opacity="${n(0.35 - w * 0.12)}"/>`);
  return out.join('');
}

export function sun(st) {
  const { x, y, r, glow } = st.sun;
  return `<g class="sun">
    <circle cx="${n(x)}" cy="${n(y)}" r="${n(r * 3.4)}" fill="url(#gSunGlow)" opacity="${n(0.3 * glow)}"/>
    <circle cx="${n(x)}" cy="${n(y)}" r="${n(r * 1.9)}" fill="url(#gSunGlow)" opacity="${n(0.45 * glow)}"/>
    <circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="url(#gSun)"/>
  </g>`;
}

export function clouds(st, t) {
  const drift = st.clouds.drift;
  const list = [
    { x: 240, y: 210, s: 1.15, o: 0.85, k: 0.0 },
    { x: 780, y: 150, s: 0.85, o: 0.7, k: 0.6 },
    { x: 1280, y: 260, s: 1.0, o: 0.8, k: 0.3 },
    { x: 1720, y: 170, s: 0.72, o: 0.62, k: 0.85 },
    { x: 560, y: 330, s: 0.6, o: 0.5, k: 0.45 },
  ];
  return list
    .map((cl, i) => {
      const bob = Math.sin(t * 0.5 + i) * 6;
      const x = cl.x + drift * (0.6 + cl.k) + Math.sin(t * 0.12 + i * 2) * 18;
      const y = cl.y + bob;
      const s = cl.s;
      return `<g transform="translate(${n(x)} ${n(y)}) scale(${n(s)})" opacity="${n(cl.o * st.clouds.opacity)}">
        <g filter="url(#soft4)">
          <ellipse cx="0" cy="0" rx="120" ry="52" fill="${C.cloud}"/>
          <ellipse cx="-72" cy="16" rx="78" ry="38" fill="${C.cloud}"/>
          <ellipse cx="70" cy="14" rx="88" ry="40" fill="${C.cloud}"/>
          <ellipse cx="18" cy="-30" rx="62" ry="46" fill="${C.cloud}"/>
          <ellipse cx="0" cy="30" rx="150" ry="26" fill="${C.cloudShade}" opacity="0.55"/>
        </g>
      </g>`;
    })
    .join('');
}

function hillsPath(pts, baseline) {
  let d = `M${pts[0][0]},${baseline}`;
  for (let i = 0; i < pts.length; i++) d += ` T${pts[i][0]},${pts[i][1]}`;
  return d;
}

export function hills(st, t) {
  const f = st.hills;
  const far = [];
  far.push(`<path d="M-700,900 L-700,640 Q-380,520 -40,660 T640,590 T1240,700 T1860,560 T2600,660 L2600,1420 L-700,1420 Z"
    fill="${C.hillFar}" opacity="0.9"/>`);
  far.push(`<path d="M-700,640 Q-380,520 -40,660 T640,590 T1240,700 T1860,560 T2600,660"
    fill="none" stroke="${C.hillFarLit}" stroke-width="7" opacity="0.65"/>`);

  // mid hills: trees sit behind the crest, then the hill mass covers their roots
  const mid = [];
  for (let i = 0; i < 8; i++) {
    const tx = -560 + i * 430 + rnd(i, 3) * 120;
    const crest = 726 + Math.sin(i * 1.3) * 30;
    const th = 76 + rnd(i, 5) * 46;
    const sway = Math.sin(t * 1.05 + i) * 3;
    mid.push(`<g transform="translate(${n(tx)} ${n(crest + 72)})" opacity="0.9">
      <ellipse cx="${n(sway)}" cy="${n(-th * 0.34)}" rx="${n(th * 0.52)}" ry="${n(th * 0.42)}" fill="${C.hillMid}"/>
      <ellipse cx="${n(sway - th * 0.14)}" cy="${n(-th * 0.46)}" rx="${n(th * 0.3)}" ry="${n(th * 0.24)}" fill="${C.hillMidLit}" opacity="0.6"/>
      <ellipse cx="${n(sway + th * 0.3)}" cy="${n(-th * 0.2)}" rx="${n(th * 0.26)}" ry="${n(th * 0.22)}" fill="${C.hillMid}"/>
    </g>`);
  }
  mid.push(`<path d="M-700,900 L-700,740 Q-300,650 120,760 T940,700 T1700,790 T2600,700 L2600,1420 L-700,1420 Z"
    fill="${C.hillMid}"/>`);
  mid.push(`<path d="M-700,740 Q-300,650 120,760 T940,700 T1700,790 T2600,700"
    fill="none" stroke="${C.hillMidLit}" stroke-width="8" opacity="0.7"/>`);
  return `<g class="hills-far" transform="${layerTransform(st.cam, 0.35)}">${far.join('')}</g>
    <g class="hills-mid" transform="${layerTransform(st.cam, 0.55)}">${mid.join('')}</g>`;
}

function blade(x, baseY, h, lean, w, fill) {
  const tipX = x + lean;
  const tipY = baseY - h;
  return `<path d="M${n(x - w / 2)},${n(baseY)}
    C${n(x - w * 0.62 + lean * 0.3)},${n(baseY - h * 0.5)} ${n(tipX - lean * 0.18 - w * 0.2)},${n(baseY - h * 0.82)} ${n(tipX)},${n(tipY)}
    C${n(tipX - lean * 0.12 + w * 0.34)},${n(baseY - h * 0.6)} ${n(x + w * 0.62 + lean * 0.25)},${n(baseY - h * 0.34)} ${n(x + w / 2)},${n(baseY)} Z"
    fill="${fill}"/>`;
}

export function meadow(st, t) {
  const out = [];
  // solid ground so the horizon never leaks sky into the foreground
  out.push(`<path d="M-900,830 Q-300,790 320,806 T1180,782 T1960,806 T2700,790 L2700,1420 L-900,1420 Z" fill="url(#gField)"/>`);
    // warm light pooling on the field
  out.push(`<ellipse cx="1520" cy="1020" rx="900" ry="340" fill="url(#gPoolLight)" opacity="0.75"/>`);
  out.push(`<ellipse cx="300" cy="1030" rx="700" ry="330" fill="url(#gPoolDark)" opacity="0.8"/>`);
  // a soft sunlit crest where the field meets the hills
  out.push(`<path d="M-700,830 Q-200,782 320,812 T1180,790 T1960,812 T2600,796"
    fill="none" stroke="${C.hillMidLit}" stroke-width="26" opacity="0.30" filter="url(#soft4)"/>`);

  // grass tufts along the band
  const amp = st.world.windAmp;
  const wind = st.world.windX;
  for (let i = 0; i < 46; i++) {
    const x = -680 + i * 68 + rnd(i, 11) * 30;
    const baseY = 806 + Math.sin(i * 0.7) * 10 + rnd(i, 13) * 22;
    const h = 22 + rnd(i, 17) * 34;
    const sway = Math.sin(t * 1.9 + i * 0.55) * 5 * amp + wind * (0.2 + rnd(i, 19) * 0.4);
    const fill = i % 3 === 0 ? C.grassLight : i % 3 === 1 ? C.grass : C.grassDark;
    const w = 5 + rnd(i, 23) * 4;
    out.push(blade(x, baseY, h, sway, w, fill));
    if (i % 2 === 0) out.push(blade(x + 9, baseY + 3, h * 0.72, sway * 1.15 - 6, w * 0.85, i % 4 ? C.grass : C.grassDark));
  }
  // tiny flowers
  for (let i = 0; i < 9; i++) {
    const x = -520 + i * 260 + rnd(i, 29) * 90;
    const y = 806 + rnd(i, 31) * 40;
    const sw = Math.sin(t * 1.6 + i) * 5 * amp;
    out.push(`<g transform="translate(${n(x)} ${n(y)})">
      <path d="M0,0 Q${n(sw)} ${n(-26)} ${n(sw * 1.4)} ${n(-52)}" stroke="${C.grassDark}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g transform="translate(${n(sw * 1.4)} ${n(-52)})">
        ${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-9" rx="7" ry="11" fill="${i % 2 ? '#FFD166' : '#FFB4C8'}" transform="rotate(${a})"/>`).join('')}
        <circle r="5" fill="#FFF3C4"/>
      </g>
    </g>`);
  }
  return out.join('');
}

/** Grass that sits in FRONT of the action, for depth. Blades start below frame and lean in. */
export function foregroundGrass(st, t, opacity = 1) {
  const amp = st.world.windAmp;
  const out = [];
  const spots = [-160, -120, -70, -20, 40, 120, 250, 300, 350, 430, 520, 700, 1160, 1200, 1500, 1540, 1580, 1620, 1670, 1700, 1760, 1800, 1850, 1890, 1950, 2010, 2070];
  for (let i = 0; i < spots.length; i++) {
    const x = spots[i] + rnd(i, 37) * 46;
    const baseY = 1190 + rnd(i, 41) * 80;
    const h = 170 + rnd(i, 43) * 150;
    const sway = Math.sin(t * 1.55 + i * 0.9) * 11 * amp + st.world.windX * 7;
    out.push(`<g opacity="${n(0.94 * opacity)}">
      ${blade(x, baseY, h, sway, 7 + rnd(i, 47) * 4, '#255E42')}
      ${blade(x + 10, baseY + 8, h * 0.84, sway * 1.15 + 16, 6, '#1E5038')}
      ${blade(x - 9, baseY + 4, h * 0.68, sway * 0.9 - 13, 5.5, '#2D6B4A')}
    </g>`);
  }
  return `<g class="fg-grass" transform="${layerTransform(st.cam, 1.18)}">${out.join('')}</g>`;
}

export function nest(st, t) {
  const { x, y, rx, ry } = NEST;
  const ny = y + st.world.nestY;
  const out = [];
  out.push(`<g class="nest" transform="translate(${n(x)} ${n(ny)})">`);
  // contact shadow on the meadow
  out.push(`<ellipse cx="8" cy="${n(ry * 0.72)}" rx="${n(rx * 1.18)}" ry="${n(ry * 0.72)}" fill="url(#gShadow)" opacity="1"/>`);
  out.push(`<ellipse cx="8" cy="${n(ry * 1.02)}" rx="${n(rx * 0.95)}" ry="${n(ry * 0.42)}" fill="#245D45" opacity="0.35"/>`);
  // bowl seen from a high three-quarter angle
  out.push(`<path d="M${-rx},0 C${-rx + 26},${n(ry * 1.9)} ${rx - 26},${n(ry * 1.9)} ${rx},0
     C${rx * 0.6},${n(ry * 0.9)} ${-rx * 0.6},${n(ry * 0.9)} ${-rx},0 Z"
     fill="url(#gNest)" stroke="${C.nestDark}" stroke-width="9" stroke-linejoin="round"/>`);
  // rim ring
  out.push(`<ellipse cx="0" cy="0" rx="${rx}" ry="${ry}" fill="${C.nest}" stroke="${C.nestDark}" stroke-width="10"/>`);
  out.push(`<ellipse cx="0" cy="-4" rx="${rx - 20}" ry="${ry - 16}" fill="#5E3A1D"/>`);
  // straw texture inside the bowl
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2;
    const rr = 0.45 + rnd(i, 201) * 0.5;
    const px = Math.cos(a) * (rx - 26) * rr;
    const py = Math.sin(a) * (ry - 20) * rr - 4;
    out.push(`<path d="M${n(px)},${n(py)} q${n(24 + rnd(i, 203) * 26)},${n(-6 + rnd(i, 205) * 12)} ${n(48 + rnd(i, 207) * 30)},${n(-2 + rnd(i, 209) * 8)}"
      stroke="${i % 2 ? C.nest : C.nestLight}" stroke-width="${n(5 + rnd(i, 211) * 4)}" stroke-linecap="round" fill="none" opacity="0.75"/>`);
  }
  // woven straws lying along the rim (tangential, overlapping — reads as a braid)
  for (let i = 0; i < 62; i++) {
    const a = (i / 62) * Math.PI * 2;
    const px = Math.cos(a) * rx;
    const py = Math.sin(a) * ry;
    const tx = -Math.sin(a) * rx;
    const ty = Math.cos(a) * ry;
    const tl = Math.hypot(tx, ty) || 1;
    const len = 26 + rnd(i, 219) * 30;
    const jr = (rnd(i, 229) - 0.5) * 10;
    const dx = (tx / tl) * len * 0.5;
    const dy = (ty / tl) * len * 0.5;
    const off = 1 + jr * 0.004;
    out.push(`<path d="M${n(px - dx + Math.cos(a) * jr)},${n(py - dy + Math.sin(a) * jr)}
        Q${n(px + Math.cos(a) * (jr + 6))},${n(py + Math.sin(a) * (jr + 5))}
         ${n(px + dx + Math.cos(a) * jr)},${n(py + dy + Math.sin(a) * jr)}"
      stroke="${i % 3 === 0 ? C.nestLight : i % 3 === 1 ? C.nest : C.nestDark}"
      stroke-width="${n(7 + rnd(i, 233) * 5)}" stroke-linecap="round" fill="none" opacity="0.95"/>`);
  }
  // side tufts only — the front stays clean so the chick reads
  for (let i = 0; i < 16; i++) {
    const a = Math.PI + (i / 15) * Math.PI * 2;
    const px = Math.cos(a) * rx;
    const py = Math.sin(a) * ry;
    if (Math.sin(a) > 0.45) continue;
    const k = 12 + rnd(i, 241) * 22;
    out.push(`<path d="M${n(px)},${n(py)} q${n(Math.cos(a) * k * 0.6)},${n(Math.sin(a) * k * 0.4)} ${n(Math.cos(a) * k)},${n(Math.sin(a) * k * 0.7)}"
      stroke="${i % 2 ? C.nestLight : C.nest}" stroke-width="${n(7 + rnd(i, 243) * 4)}" stroke-linecap="round" fill="none"/>`);
  }
  // a few straws drooping over the front lip
  for (let i = 0; i < 9; i++) {
    const px = -rx * 0.82 + i * (rx * 1.64 / 8);
    const droop = 18 + rnd(i, 219) * 34;
    const wob = Math.sin(t * 1.5 + i * 1.3) * 3;
    out.push(`<path d="M${n(px)},${n(ry * 0.62)} q${n(6 + rnd(i, 221) * 14)},${n(droop * 0.55)} ${n(4 + rnd(i, 223) * 16 + wob)},${n(droop)}"
      stroke="${i % 2 ? C.nestLight : C.nest}" stroke-width="${n(7 + rnd(i, 227) * 4)}" stroke-linecap="round" fill="none"/>`);
  }
  // a sprig tucked into the rim
  out.push(`<g transform="translate(${n(-rx * 0.72)} ${n(-ry * 0.52)}) rotate(-18)">
    <path d="M0,0 Q-30,-26 -66,-40" stroke="${C.grassDark}" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${[0.35, 0.6, 0.85].map((k, i) => `<ellipse cx="${n(-66 * k)}" cy="${n(-40 * k)}" rx="15" ry="8" fill="${i % 2 ? C.grassLight : C.grass}" transform="rotate(${n(-30 - i * 12)} ${n(-66 * k)} ${n(-40 * k)})"/>`).join('')}
  </g>`);
  out.push('</g>');
  return out.join('');
}

/** The front lip of the nest, drawn AFTER the chick so legs disappear into the bowl. */
export function nestFront(st, t) {
  const { x, y, rx, ry } = NEST;
  const ny = y + st.world.nestY;
  const out = [];
  out.push(`<g class="nest-front" transform="translate(${n(x)} ${n(ny)})">`);
  out.push(`<path d="M${-rx},0 A${rx},${ry} 0 0 0 ${rx},0" fill="none" stroke="${C.nestDark}" stroke-width="46" stroke-linecap="round"/>`);
  out.push(`<path d="M${-rx},0 A${rx},${ry} 0 0 0 ${rx},0" fill="none" stroke="${C.nest}" stroke-width="34" stroke-linecap="round"/>`);
  for (let i = 0; i < 26; i++) {
    const a = Math.PI * (0.06 + (i / 25) * 0.88);
    const px = Math.cos(a) * rx;
    const py = Math.sin(a) * ry;
    const tx = -Math.sin(a) * rx;
    const ty = Math.cos(a) * ry;
    const tl2 = Math.hypot(tx, ty) || 1;
    const len = 18 + rnd(i, 251) * 22;
    const dx = (tx / tl2) * len * 0.5;
    const dy = (ty / tl2) * len * 0.5;
    out.push(`<path d="M${n(px - dx)},${n(py - dy)} L${n(px + dx)},${n(py + dy)}"
      stroke="${i % 3 === 0 ? C.nestLight : i % 3 === 1 ? C.nest : C.nestDark}"
      stroke-width="${n(6 + rnd(i, 253) * 4)}" stroke-linecap="round"/>`);
  }
  out.push('</g>');
  return out.join('');
}

export function egg(st, t) {
  const e = st.egg;
  if (e.opacity <= 0.004) return '';
  const out = [];
  out.push(`<g class="egg" opacity="${n(e.opacity)}"
     transform="translate(${n(e.x)} ${n(NEST.y + st.world.nestY - 96 + e.y)}) rotate(${n(e.roll)}) scale(${n(e.sx)} ${n(e.sy)})">`);

  // glow when it is alive
  if (e.glow > 0.01) {
    out.push(`<ellipse cx="0" cy="-118" rx="210" ry="240" fill="url(#gEggGlow)" opacity="${n(0.9 * e.glow)}"/>`);
  }

  const BODY = `M0,-250 C74,-250 122,-176 122,-96 C122,-30 74,4 0,4 C-74,4 -122,-30 -122,-96 C-122,-176 -74,-250 0,-250 Z`;
  if (e.baseOn > 0.01) {
    // the bottom half stays in the nest after the hatch
    out.push(`<path d="M-118,-92 C-118,-34 -70,4 0,4 C70,4 118,-34 118,-92 L86,-84 L64,-104 L40,-82 L14,-108 L-12,-82 L-38,-104 L-62,-84 L-86,-102 Z"
      fill="url(#gEgg)" stroke="#2E1A10" stroke-width="10" stroke-linejoin="round" opacity="${n(e.baseOn)}"/>`);
  }
  out.push(`<path d="${BODY}" fill="url(#gEgg)" stroke="#2E1A10" stroke-width="11"/>`);

  // speckles
  const spots = [
    [-52, -170, 12, 9], [34, -196, 9, 7], [62, -128, 11, 8], [-26, -104, 8, 6],
    [-70, -128, 7, 5], [10, -220, 7, 5], [-8, -66, 9, 7], [84, -172, 6, 5],
  ];
  spots.forEach(([sx, sy, srx, sry], i) => {
    out.push(`<ellipse cx="${sx}" cy="${sy}" rx="${srx}" ry="${sry}" fill="${C.eggSpeck}" opacity="0.85"/>`);
  });
  // inner shading
  out.push(`<ellipse cx="44" cy="-92" rx="70" ry="88" fill="#E8CDA6" opacity="0.35" filter="url(#soft4)"/>`);
  out.push(`<ellipse cx="-42" cy="-176" rx="46" ry="34" fill="#FFFFFF" opacity="0.6" filter="url(#soft2)" transform="rotate(-24 -42 -176)"/>`);

  // crack
  const c = e.crack;
  if (c > 0.001) {
    const zig = `M-96,-150 L-64,-166 L-44,-140 L-14,-160 L10,-134 L38,-158 L62,-136 L92,-152`;
    const dash = 420;
    out.push(`<path d="${zig}" fill="none" stroke="#7A5638" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"
      stroke-dasharray="${dash}" stroke-dashoffset="${n(dash * (1 - Math.min(1, c)))}" opacity="0.95"/>`);
    if (c > 0.6) {
      out.push(`<path d="M-30,-140 L-18,-108 L4,-124" fill="none" stroke="#7A5638" stroke-width="6" stroke-linecap="round"
        opacity="${n((c - 0.6) / 0.4)}"/>`);
      out.push(`<path d="M44,-142 L56,-108" fill="none" stroke="#7A5638" stroke-width="6" stroke-linecap="round"
        opacity="${n((c - 0.75) / 0.25)}"/>`);
    }
  }
  out.push('</g>');

  // the cap that flies off
  if (e.capOn > 0.01) {
    out.push(`<g opacity="${n(e.capOn)}" transform="translate(${n(e.x + e.capX)} ${n(NEST.y + st.world.nestY - 96 + e.y + e.capY)}) rotate(${n(e.capRot)}) scale(${n(e.sx)} ${n(e.sy)})">
      <path d="M-118,-92 C-118,-186 -70,-250 0,-250 C70,-250 118,-186 118,-92
        L86,-84 L64,-106 L40,-84 L14,-110 L-12,-84 L-38,-106 L-62,-86 L-86,-104 Z"
        fill="url(#gEgg)" stroke="#2E1A10" stroke-width="11" stroke-linejoin="round"/>
      <ellipse cx="-44" cy="-186" rx="30" ry="22" fill="#FFFFFF" opacity="0.7" filter="url(#soft2)" transform="rotate(-20 -44 -186)"/>
      <ellipse cx="40" cy="-150" rx="10" ry="8" fill="${C.eggSpeck}" opacity="0.8"/>
      <ellipse cx="-12" cy="-212" rx="8" ry="6" fill="${C.eggSpeck}" opacity="0.7"/>
    </g>`);
  }

  // shell fragments
  st.frags.forEach((f) => {
    if (f.on <= 0.01) return;
    out.push(`<g opacity="${n(f.on)}" transform="translate(${n(f.x)} ${n(f.y)}) rotate(${n(f.roll)})">
      <path d="M-18,-12 L14,-16 L20,8 L-8,14 Z" fill="url(#gEgg)" stroke="#2E1A10" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-6,-12 L2,10" stroke="${C.eggSpeck}" stroke-width="4" opacity="0.6"/>
    </g>`);
  });
  return out.join('');
}

export function butterfly(st, t) {
  const b = st.world;
  if (b.bfOn <= 0.004) return '';
  const flap = 0.5 + 0.5 * Math.abs(Math.sin(t * 13));
  const wing = (cx, cy, rx, ry, rot, fill, op) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx * (0.72 + flap * 0.4)}" ry="${ry}" fill="${fill}" opacity="${op}"
      stroke="#2E1A10" stroke-width="4.5" transform="rotate(${rot} ${cx} ${cy})"/>`;
  return `<g class="butterfly" opacity="${n(b.bfOn)}" transform="translate(${n(b.bfX)} ${n(b.bfY)}) rotate(${n(b.bfRot)}) scale(1.55)">
    ${wing(-19, -18, 27, 20, -34, C.butterfly[0], 0.96)}
    ${wing(19, -18, 27, 20, 34, C.butterfly[0], 0.96)}
    ${wing(-15, 14, 19, 15, -14, C.butterfly[1], 0.96)}
    ${wing(15, 14, 19, 15, 14, C.butterfly[1], 0.96)}
    <circle cx="-20" cy="-18" r="4.5" fill="${C.butterfly[2]}"/>
    <circle cx="20" cy="-18" r="4.5" fill="${C.butterfly[2]}"/>
    <ellipse cx="0" cy="0" rx="4.6" ry="17" fill="#2E1A10"/>
    <circle cx="0" cy="-17" r="5" fill="#2E1A10"/>
    <path d="M-2,-21 Q-9,-32 -16,-35 M2,-21 Q9,-32 16,-35" stroke="#2E1A10" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="-16" cy="-35" r="2.6" fill="#2E1A10"/><circle cx="16" cy="-35" r="2.6" fill="#2E1A10"/>
  </g>`;
}

export function seed(st) {
  const w = st.world;
  if (w.seedOn <= 0.004) return '';
  return `<g class="seed" opacity="${n(w.seedOn)}" transform="translate(${n(w.seedX)} ${n(w.seedY)}) rotate(${n(w.seedR)})">
    <path d="M0,0 L0,34" stroke="${C.seedStem}" stroke-width="4" stroke-linecap="round"/>
    <g opacity="0.95">
      ${[0, 45, 90, 135, 180, 225, 270, 315]
        .map((a) => `<path d="M0,0 L${n(Math.cos((a * Math.PI) / 180) * 30)},${n(Math.sin((a * Math.PI) / 180) * 30 - 4)}"
          stroke="${C.seed}" stroke-width="5" stroke-linecap="round" opacity="0.9"/>`)
        .join('')}
      ${[0, 60, 120, 180, 240, 300]
        .map((a) => `<ellipse cx="${n(Math.cos((a * Math.PI) / 180) * 20)}" cy="${n(Math.sin((a * Math.PI) / 180) * 20 - 4)}" rx="9" ry="7"
          fill="${C.seed}" opacity="0.75" transform="rotate(${a} ${n(Math.cos((a * Math.PI) / 180) * 20)} ${n(Math.sin((a * Math.PI) / 180) * 20 - 4)})"/>`)
        .join('')}
    </g>
    <circle cy="-4" r="7" fill="#B9A88A"/>
  </g>`;
}

export function pollen(st, t, count = 26, area = { x0: -200, x1: 2100, y0: -200, y1: 900 }) {
  const out = [];
  const amp = 1 + st.world.windX * 0.02;
  for (let i = 0; i < count; i++) {
    const speed = 10 + rnd(i, 79) * 26;
    const x = area.x0 + ((rnd(i, 83) * (area.x1 - area.x0) + t * speed * 1.4 * amp) % (area.x1 - area.x0));
    const y = area.y0 + rnd(i, 89) * (area.y1 - area.y0) + Math.sin(t * 0.9 + i) * 16;
    const r = 1.6 + rnd(i, 97) * 3.4;
    out.push(`<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="#FFF6D8" opacity="${n(0.25 + rnd(i, 101) * 0.45)}"/>`);
  }
  return `<g class="pollen">${out.join('')}</g>`;
}

export function speedLines(st, t, x, y, w, h) {
  if (st.fx.lines <= 0.01) return '';
  const out = [];
  for (let i = 0; i < 16; i++) {
    const ly = y - h / 2 + rnd(i, 103) * h;
    const len = 120 + rnd(i, 107) * 340;
    const lx = x - w / 2 + ((t * 2600 * (0.6 + rnd(i, 109)) + rnd(i, 113) * w) % (w + 400)) - 200;
    out.push(`<path d="M${n(lx)},${n(ly)} l${n(len)},0" stroke="#FFF6E0" stroke-width="${n(3 + rnd(i, 127) * 5)}"
      stroke-linecap="round" opacity="${n(0.35 * st.fx.lines)}"/>`);
  }
  return `<g class="speed">${out.join('')}</g>`;
}

export function dust(x, y, scale, opacity, t, seedI = 0) {
  if (opacity <= 0.01) return '';
  const out = [];
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + seedI;
    const d = (30 + rnd(i, 131) * 60) * scale * (1 + t * 0.0);
    out.push(`<circle cx="${n(x + Math.cos(a) * d)}" cy="${n(y + Math.sin(a) * d * 0.42)}"
      r="${n(((26 + rnd(i, 137) * 30) * scale))}" fill="url(#gDust)" opacity="${n(opacity)}"/>`);
  }
  return `<g class="dust">${out.join('')}</g>`;
}

export function sparkle(x, y, size, opacity, rot = 0) {
  if (opacity <= 0.01) return '';
  return `<g transform="translate(${n(x)} ${n(y)}) rotate(${n(rot)}) scale(${n(size)})" opacity="${n(opacity)}">
    <path d="M0,-40 Q6,-6 40,0 Q6,6 0,40 Q-6,6 -40,0 Q-6,-6 0,-40 Z" fill="#FFF8D6"/>
    <circle r="7" fill="#FFFFFF"/>
  </g>`;
}

export function title(st, fontFamily) {
  if (st.title.on <= 0.004) return '';
  const y = 880 + st.title.y;
  return `<g class="title" opacity="${n(st.title.on)}">
    <rect x="0" y="660" width="1920" height="420" fill="url(#gTitleWash)"/>
    <text x="960" y="${n(y)}" text-anchor="middle" font-family="${fontFamily}" font-size="130" font-weight="700"
      letter-spacing="12" fill="#2A1208" opacity="0.35" transform="translate(3 5)">SI KECIL</text>
    <text x="960" y="${n(y)}" text-anchor="middle" font-family="${fontFamily}" font-size="130" font-weight="700"
      letter-spacing="12" fill="#FFF6E0">SI KECIL</text>
    <text x="960" y="${n(y + 74)}" text-anchor="middle" font-family="Inter" font-size="34" font-weight="400"
      letter-spacing="14" fill="#FFE2B0" opacity="${n(0.85 * st.title.sub)}">HARI PERTAMANYA</text>
    <path d="M700,${n(y + 34)} L1220,${n(y + 34)}" stroke="#FFE2B0" stroke-width="2" opacity="${n(0.35 * st.title.sub)}"/>
  </g>`;
}
