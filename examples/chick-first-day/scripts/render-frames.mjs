// Render every frame of the film. The composition is sampled from ONE paused timeline:
// frame i is tl.seek(i / fps) — no clocks, no randomness, re-running gives the same pixels.
// usage: node scripts/render-frames.mjs [--from 0] [--to 900] [--every 1] [--out renders/frames]
import fs from 'node:fs';
import path from 'node:path';
import { Worker } from 'node:worker_threads';
import { buildScene } from '../src/scene.js';
import { drawFrame } from '../src/draw.js';
import { TL } from '../src/timeline.js';

const arg = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : dflt;
};

const from = Number(arg('from', 0));
const to = Number(arg('to', Math.round(TL.duration * TL.fps)));
const every = Number(arg('every', 1));
const outDir = arg('out', 'renders/frames');
fs.mkdirSync(outDir, { recursive: true });

const { tl, st } = buildScene();
const frames = [];
for (let f = from; f < to; f += every) frames.push(f);

const WORKERS = Math.min(4, Math.max(1, Number(arg('workers', 2))));
const queue = frames.slice();
const total = frames.length;
let done = 0;
const t0 = Date.now();

const startWorker = () =>
  new Promise((resolve, reject) => {
    const w = new Worker(new URL('./raster-worker.mjs', import.meta.url));
    const feed = () => {
      const f = queue.shift();
      if (f === undefined) {
        w.terminate();
        return resolve();
      }
      const t = f / TL.fps;
      tl.seek(t, false); // <-- the one and only clock
      const svg = drawFrame(st, t);
      w.postMessage({ index: f, svg });
    };
    w.on('message', (msg) => {
      if (!msg.ok) return reject(new Error(`frame ${msg.index}: ${msg.error}`));
      fs.writeFileSync(path.join(outDir, `f${String(msg.index).padStart(4, '0')}.png`), Buffer.from(msg.png));
      done++;
      if (done % 30 === 0 || done === total) {
        const el = (Date.now() - t0) / 1000;
        process.stdout.write(`\r  ${done}/${total} frames  ${(done / el).toFixed(1)} fps  ${el.toFixed(0)}s   `);
      }
      feed();
    });
    w.on('error', reject);
    feed();
  });

await Promise.all(Array.from({ length: WORKERS }, startWorker));
const el = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`\n  done: ${total} frames in ${el}s -> ${outDir}`);
fs.writeFileSync(path.join(outDir, '..', 'render-meta.json'), JSON.stringify({ fps: TL.fps, duration: TL.duration, frames: total, renderedAt: new Date().toISOString() }, null, 2));
