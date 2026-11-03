// Render one frame of the film (sampled from the timeline) for eyeballing while authoring.
// usage: node scripts/preview.mjs out.png --at 12.5 [--patch '{"cam":{"zoom":1.4}}']
import fs from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import { createState } from '../src/state.js';
import { buildScene } from '../src/scene.js';
import { drawFrame } from '../src/draw.js';
import { mergeDeep } from '../src/util.js';

const FONT = new URL('../../../fonts/', import.meta.url).pathname;
const args = process.argv.slice(2);
const flag = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i > -1 ? args[i + 1] : d;
};

const outPath = args[0] || 'review/preview.png';
const t = Number(flag('at', 0));
const patch = JSON.parse(flag('patch', '{}'));

let st;
if (flag('at', null) === null && patch && Object.keys(patch).length) {
  st = createState();
  mergeDeep(st, patch);
} else {
  const scene = buildScene();
  scene.tl.seek(t, false);
  st = scene.st;
  if (Object.keys(patch).length) mergeDeep(st, patch);
}

const svg = drawFrame(st, t);
fs.mkdirSync(new URL('../review/', import.meta.url).pathname, { recursive: true });
fs.writeFileSync(outPath.replace(/\.png$/, '.svg'), svg);
const r = new Resvg(svg, {
  font: { fontFiles: [`${FONT}Fraunces-Variable.ttf`, `${FONT}Inter-Variable.ttf`], loadSystemFonts: false, defaultFontFamily: 'Inter' },
  fitTo: { mode: 'width', value: 1920 },
});
fs.writeFileSync(outPath, r.render().asPng());
console.log('wrote', outPath, '@', t + 's');
