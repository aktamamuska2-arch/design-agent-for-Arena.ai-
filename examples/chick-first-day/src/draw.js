import { defs } from './defs.js';
import { drawChick } from './chick.js';
import * as W from './world.js';

const n = (v) => Math.round(v * 100) / 100;

export function drawFrame(st, t) {
  const cam = st.cam;
  const out = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">`);
  out.push(defs());

  // ---------- far layers (parallax) ----------
  out.push(W.sky(st, t));
  out.push(`<g transform="${W.layerTransform(cam, 0.12)}">${W.sun(st)}</g>`);
  out.push(`<g transform="${W.layerTransform(cam, 0.22)}">${W.clouds(st, t)}</g>`);
  out.push(W.hills(st, t));
  out.push(`<g transform="${W.layerTransform(cam, 0.8)}">${W.meadow(st, t)}</g>`);

  // ---------- the stage: everything the camera rides with ----------
  out.push(`<g class="stage" transform="${W.layerTransform(cam, 1)}">`);
  out.push(W.nest(st, t));

  // contact shadow: derived from height above the ground so jumps read
  const ck = st.chick;
  const gy = ck.groundY ?? 884;
  const lift = Math.max(0, gy - ck.y);
  const k = Math.max(0.3, 1 - lift / 900);
  if (ck.opacity > 0.01) {
    out.push(`<ellipse cx="${n(ck.x + 12)}" cy="${n(gy)}" rx="${n(158 * k)}" ry="${n(40 * k)}"
      fill="url(#gShadow)" opacity="${n(ck.shadow.opacity * k)}"/>`);
  }

  out.push(`<g transform="translate(0 ${n(st.world.nestY)})">${W.egg(st, t)}</g>`);
  out.push(W.seed(st));
  out.push(W.butterfly(st, t));
  out.push(`<g transform="translate(0 ${n(st.world.nestY)})">${drawChick(st.chick)}</g>`);
  out.push(W.nestFront(st, t));
  out.push(W.dust(st.fx.dustX, st.fx.dustY, 1 + st.fx.dust * 1.6, st.fx.dust, t));
  if (st.fx.sparkle > 0.01) {
    out.push(W.sparkle(st.fx.sparkleX, st.fx.sparkleY - 40, 1 + st.fx.sparkle * 0.9, st.fx.sparkle, st.fx.sparkle * 90));
  }
  out.push(W.pollen(st, t, 18, { x0: -200, x1: 2100, y0: 200, y1: 900 }));
  out.push(`</g>`);

  // ---------- in front ----------
  out.push(W.foregroundGrass(st, t, 0.95));
  out.push(`<g transform="${W.layerTransform(cam, 0.25)}">${W.pollen(st, t, 10, { x0: -200, x1: 2100, y0: -100, y1: 600 })}</g>`);
  out.push(W.speedLines(st, t, st.fx.lineX ?? 960, st.fx.lineY ?? 800, 2400, 900));

  // ---------- grade ----------
  if (st.sky.flash > 0.01) {
    out.push(`<rect width="1920" height="1080" fill="#FFF6DC" opacity="${n(st.sky.flash)}"/>`);
  }
  if (st.sky.warm > 0.01) {
    out.push(`<rect width="1920" height="1080" fill="#FFB25E" opacity="${n(st.sky.warm * 0.16)}" style="mix-blend-mode:screen"/>`);
  }
  out.push(`<rect width="1920" height="1080" fill="url(#gVignette)" opacity="${n(0.28 + st.sky.haze * 0.5)}"/>`);
  out.push(`<rect width="1920" height="1080" fill="url(#pGrain)" opacity="0.55"/>`);
  out.push(W.title(st, 'Fraunces'));
  out.push('</svg>');
  return out.join('\n');
}
