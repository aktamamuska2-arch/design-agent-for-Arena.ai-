// Rasterises one SVG per message. Deterministic: the same SVG string always yields the same pixels.
import { parentPort } from 'node:worker_threads';
import { Resvg } from '@resvg/resvg-js';

const FONT = new URL('../../../fonts/', import.meta.url).pathname;
const opts = {
  font: {
    fontFiles: [`${FONT}Fraunces-Variable.ttf`, `${FONT}Inter-Variable.ttf`],
    loadSystemFonts: false,
    defaultFontFamily: 'Inter',
  },
  fitTo: { mode: 'width', value: 1920 },
  background: '#FFE7A8',
};

parentPort.on('message', (job) => {
  try {
    const r = new Resvg(job.svg, opts);
    const png = r.render().asPng();
    parentPort.postMessage({ ok: true, index: job.index, png });
  } catch (err) {
    parentPort.postMessage({ ok: false, index: job.index, error: String(err) });
  }
});
