// The picture and the score read the same clock: export timeline.js to JSON for the audio script.
import fs from 'node:fs';
import { TL } from '../src/timeline.js';
fs.writeFileSync(new URL('../audio/timeline.json', import.meta.url).pathname, JSON.stringify(TL, null, 2));
console.log('wrote audio/timeline.json');
