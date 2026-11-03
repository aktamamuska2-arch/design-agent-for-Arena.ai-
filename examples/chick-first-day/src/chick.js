// The chick rig. Origin = the ground contact point between its feet, so squash/stretch scales
// towards the floor the way weight actually behaves. Proportions: head r 132 vs body 224 wide —
// a big head is most of the "appeal" principle, and short legs are what makes a waddle read.
const n = (v) => Math.round(v * 100) / 100;

const HEAD = { cx: 0, cy: -384, r: 147 };
// body: a fat teardrop, widest low, tapering into the neck
const BODY = `M0,-284 C58,-284 98,-274 110,-244 C122,-208 124,-140 120,-100
  C114,-48 70,-14 0,-14 C-70,-14 -114,-48 -120,-100 C-124,-140 -122,-208 -110,-244
  C-98,-274 -58,-284 0,-284 Z`;
const WING = `M0,0 C24,-4 46,14 52,44 C56,64 52,80 46,92
  C40,84 34,86 32,96 C28,104 16,102 14,90 C8,96 -2,90 -2,78
  C-6,58 -4,24 0,0 Z`;

function leg(hipX, footX, footY, lift, w = 11) {
  const ankle = footY - lift - 6;
  const kneeX = hipX + (footX - hipX) * 0.4;
  const kneeY = -56 + (ankle + 56) * 0.52;
  const d = `M${n(hipX)},-58 Q${n(kneeX)},${n(kneeY)} ${n(footX)},${n(ankle)}`;
  const toes = `M${n(footX - 24)},${n(ankle + 6)} L${n(footX)},${n(ankle)} L${n(footX + 22)},${n(ankle + 6)}`;
  const back = `M${n(footX - 4)},${n(ankle + 1)} L${n(footX - 13)},${n(ankle + 7)}`;
  return `<g class="chick-leg" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="${d}" stroke="#2E1A10" stroke-width="${w + 7}"/>
    <path d="${d}" stroke="#F2A03C" stroke-width="${w}"/>
    <path d="${toes}" stroke="#2E1A10" stroke-width="14"/>
    <path d="${toes}" stroke="#F2A03C" stroke-width="7.5"/>
    <path d="${back}" stroke="#2E1A10" stroke-width="12"/>
    <path d="${back}" stroke="#F2A03C" stroke-width="5.5"/>
  </g>`;
}

function eye(cx, cy, rx, ry, p, side, lid = 0) {
  const open = Math.max(0.02, Math.min(1, p.eyeOpen));
  const mode = p.eyeMode;
  if (mode === 'happy') {
    return `<path d="M${n(cx - rx * 0.85)},${n(cy + ry * 0.1)} Q${n(cx)},${n(cy + ry * 0.95)} ${n(cx + rx * 0.85)},${n(cy + ry * 0.1)}"
      fill="none" stroke="#2E1A10" stroke-width="14" stroke-linecap="round"/>`;
  }
  if (mode === 'dizzy') {
    return `<g transform="translate(${n(cx)} ${n(cy)})">
      <path d="M0,0 m-${n(rx * 0.7)},0 a${n(rx * 0.7)},${n(ry * 0.7)} 0 1,1 ${n(rx * 1.1)},${n(ry * 0.2)}
        a${n(rx * 0.42)},${n(ry * 0.42)} 0 1,0 ${n(-rx * 0.7)},${n(ry * 0.1)}"
        fill="none" stroke="#2E1A10" stroke-width="11" stroke-linecap="round"/>
      <circle r="${n(rx * 0.16)}" fill="#2E1A10"/>
    </g>`;
  }
  const shock = mode === 'wide' ? 1 : 0;
  const pr = rx * (0.42 - shock * 0.14);
  const g = [];
  g.push(`<g transform="translate(${n(cx)} ${n(cy)}) scale(${n(1 + shock * 0.12)} ${n(open)})">`);
  g.push(`<ellipse rx="${n(rx)}" ry="${n(ry)}" fill="#FFFDF6" stroke="#2E1A10" stroke-width="6"/>`);
  // soft shadow under the upper lid gives the eye weight
  g.push(`<ellipse cy="${n(-ry * 0.42)}" rx="${n(rx * 0.92)}" ry="${n(ry * 0.5)}" fill="#EBD9C4" opacity="0.5"/>`);
  const lx = Math.max(-1, Math.min(1, p.pupilX + side * 0.05));
  const ly = Math.max(-1, Math.min(1, p.pupilY));
  g.push(`<ellipse cx="${n(lx * rx * 0.3)}" cy="${n(ly * ry * 0.26)}" rx="${n(pr)}" ry="${n(pr * 1.1)}" fill="#24150E"/>`);
  g.push(`<circle cx="${n(lx * rx * 0.3 - pr * 0.34)}" cy="${n(ly * ry * 0.26 - pr * 0.46)}" r="${n(pr * 0.38)}" fill="#FFFFFF" opacity="0.97"/>`);
  g.push(`<circle cx="${n(lx * rx * 0.3 + pr * 0.3)}" cy="${n(ly * ry * 0.26 + pr * 0.44)}" r="${n(pr * 0.18)}" fill="#FFFFFF" opacity="0.55"/>`);
  g.push('</g>');
  // lid crease
  if (open > 0.55) {
    g.push(`<path d="M${n(cx - rx * 1.02)},${n(cy - ry * 0.58)} Q${n(cx)},${n(cy - ry * 1.22)} ${n(cx + rx * 1.02)},${n(cy - ry * 0.58)}"
      fill="none" stroke="#2E1A10" stroke-width="4.5" opacity="0.22"/>`);
  }
  return g.join('');
}

export function drawChick(p) {
  if (p.opacity <= 0.004) return '';
  const root = `translate(${n(p.x)} ${n(p.y)}) rotate(${n(p.tilt + (p.roll || 0))}) scale(${n(p.sx)} ${n(p.sy)})`;
  const out = [];
  out.push(`<g class="chick" opacity="${n(p.opacity)}" transform="${root}">`);

  // legs
  if (p.showLegs > 0.01) {
    out.push(`<g opacity="${n(p.showLegs)}">${leg(-36, p.legL.fx, p.legL.fy, p.legL.lift)}${leg(36, p.legR.fx, p.legR.fy, p.legR.lift)}</g>`);
  }

  // far wing, behind the body
  out.push(`<g transform="translate(-96 -238) rotate(${n(-p.wingL - 8)}) scale(-1 1)" opacity="0.92">
    <path d="${WING}" fill="url(#gWing)" stroke="#2E1A10" stroke-width="10" stroke-linejoin="round"/>
  </g>`);

  // tail
  out.push(`<g transform="translate(-100 -238)">
    <path d="M-6,10 C-34,2 -56,-18 -60,-40 C-38,-36 -14,-16 -2,8 Z"
      fill="url(#gWing)" stroke="#2E1A10" stroke-width="9" stroke-linejoin="round"/>
    <path d="M0,26 C-26,26 -46,16 -58,0 C-36,-8 -12,6 -2,22 Z"
      fill="url(#gWing)" stroke="#2E1A10" stroke-width="9" stroke-linejoin="round"/>
  </g>`);

  // body first, then the head as its own outlined shape on top
  out.push(`<path d="${BODY}" fill="url(#gBody)" stroke="#2E1A10" stroke-width="12" stroke-linejoin="round"/>`);

  // volume: belly light, underside shade
  out.push(`<ellipse cx="10" cy="-124" rx="64" ry="56" fill="url(#gBelly)" opacity="0.8"/>`);
  out.push(`<path d="M-118,-96 C-106,-40 -58,-16 0,-16 C58,-16 106,-40 118,-96 C104,-50 60,-34 0,-34 C-60,-34 -104,-50 -118,-96 Z"
    fill="#D98E14" opacity="0.35"/>`);

  // near wing, in front
  out.push(`<g transform="translate(94 -232) rotate(${n(p.wingR + 8)})">
    <path d="${WING}" fill="url(#gWing)" stroke="#2E1A10" stroke-width="10" stroke-linejoin="round"/>
    <path d="M16,26 C32,38 40,58 36,74" fill="none" stroke="#E0A21F" stroke-width="4.5" opacity="0.55" stroke-linecap="round"/>
    <path d="M6,44 C22,52 30,64 28,76" fill="none" stroke="#E0A21F" stroke-width="4" opacity="0.4" stroke-linecap="round"/>
  </g>`);

  // ---- head ----
  out.push(`<g transform="translate(${n(p.headX)} ${n(p.headY)}) rotate(${n(p.headTilt)} ${HEAD.cx} ${HEAD.cy}) translate(${HEAD.cx} ${HEAD.cy}) scale(${n(p.headSX ?? 1)} ${n(p.headSY ?? 1)}) translate(${-HEAD.cx} ${-HEAD.cy})">`);
  // neck bridge: keeps head and body joined through head-lag and stretch
  out.push(`<rect x="-74" y="${HEAD.cy + 30}" width="148" height="200" rx="70" fill="url(#gBody)"/>`);
  out.push(`<circle cx="${HEAD.cx}" cy="${HEAD.cy}" r="${HEAD.r}" fill="url(#gHead)" stroke="#2E1A10" stroke-width="12"/>
    <path d="M-100,-424 A134,134 0 0 1 6,-510" fill="none" stroke="#FFF8D2" stroke-width="17"
      stroke-linecap="round" opacity="0.5" filter="url(#soft2)"/>`);

  out.push(`<ellipse cx="100" cy="-342" rx="24" ry="15" fill="#FF8FA0" opacity="${n(p.blush)}" filter="url(#soft2)"/>`);
  out.push(`<ellipse cx="-88" cy="-356" rx="20" ry="13" fill="#FF8FA0" opacity="${n(p.blush * 0.8)}" filter="url(#soft2)"/>`);

  out.push(eye(-70, -406, 37, 42, p, -1));
  out.push(eye(50, -400, 40, 45, p, 1));

  // beak
  const m = Math.max(0, Math.min(1, p.mouth));
  out.push(`<g class="beak">
    <path d="M54,-326 Q110,-322 146,-302 Q108,-286 56,-284 Z"
      fill="url(#gBeak)" stroke="#2E1A10" stroke-width="7.5" stroke-linejoin="round"/>
    <g transform="rotate(${n(m * 30)} 56 -284)">
      <path d="M56,-284 Q104,-284 142,-300 Q106,-266 58,-268 Z"
        fill="url(#gBeakLow)" stroke="#2E1A10" stroke-width="7.5" stroke-linejoin="round"/>
      ${m > 0.2 ? `<ellipse cx="90" cy="-280" rx="17" ry="${n(4 + m * 10)}" fill="#F06A78" opacity="0.9"/>` : ''}
    </g>
    <path d="M66,-312 Q90,-310 112,-304" fill="none" stroke="#2E1A10" stroke-width="5" opacity="0.45" stroke-linecap="round"/>
  </g>`);

  // fluff (hidden while the shell cap is still on the head)
  if (p.hatOn < 0.98) {
    out.push(`<g opacity="${n(1 - p.hatOn)}" transform="rotate(${n(p.tuftLag)} 0 -484)" stroke-linecap="round" fill="none">
      <path d="M-32,-482 C-48,-514 -36,-536 -14,-546" stroke="#2E1A10" stroke-width="16"/>
      <path d="M-32,-482 C-48,-514 -36,-536 -14,-546" stroke="#FFD84F" stroke-width="8.5"/>
      <path d="M4,-490 C10,-526 30,-540 50,-536" stroke="#2E1A10" stroke-width="16"/>
      <path d="M4,-490 C10,-526 30,-540 50,-536" stroke="#FFD84F" stroke-width="8.5"/>
      <path d="M-62,-466 C-78,-488 -78,-506 -66,-514" stroke="#2E1A10" stroke-width="15"/>
      <path d="M-62,-466 C-78,-488 -78,-506 -66,-514" stroke="#FFD84F" stroke-width="7.5"/>
    </g>`);
  }

  // eggshell cap
  if (p.hatOn > 0.01) {
    out.push(`<g opacity="${n(p.hatOn)}" transform="translate(${n(p.hatX)} ${n(p.hatY)}) translate(0 -520) scale(0.9) translate(0 520) rotate(${n(p.hatRot - 8)} 0 -520)">
      <path d="M-96,-486 C-96,-556 -50,-596 0,-596 C50,-596 96,-556 96,-486
               L72,-466 L52,-490 L30,-464 L6,-492 L-16,-464 L-40,-490 L-62,-466 Z"
        fill="url(#gEgg)" stroke="#2E1A10" stroke-width="10" stroke-linejoin="round"/>
      <ellipse cx="-36" cy="-536" rx="11" ry="7" fill="#D8B98F" opacity="0.85"/>
      <ellipse cx="30" cy="-556" rx="8" ry="6" fill="#D8B98F" opacity="0.7"/>
      <ellipse cx="46" cy="-508" rx="6" ry="5" fill="#D8B98F" opacity="0.6"/>
      <path d="M-64,-520 C-44,-552 -12,-566 14,-566" fill="none" stroke="#FFFFFF" stroke-width="12" opacity="0.6" stroke-linecap="round" filter="url(#soft2)"/>
    </g>`);
  }
  out.push('</g>'); // head
  out.push('</g>');
  return out.join('\n');
}
