import fs from 'node:fs';
import { C } from './palette.js';

// baked once, inline as a data URI so every frame is a standalone, self-contained SVG
const grain = `data:image/png;base64,${fs.readFileSync(new URL('./grain.png', import.meta.url)).toString('base64')}`;

export function defs() {
  const stops = (arr) =>
    arr.map((col, i) => `<stop offset="${(i / (arr.length - 1)).toFixed(3)}" stop-color="${col}"/>`).join('');

  return `
<defs>
  <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1">${stops(C.sky)}</linearGradient>
  <radialGradient id="gSun" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#FFFFFF"/><stop offset="0.55" stop-color="#FFF3BE"/>
    <stop offset="1" stop-color="#FFC24D"/>
  </radialGradient>
  <radialGradient id="gSunGlow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#FFE9A8" stop-opacity="0.95"/>
    <stop offset="0.45" stop-color="#FFC46B" stop-opacity="0.45"/>
    <stop offset="1" stop-color="#FF9E5E" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="gBody" gradientUnits="userSpaceOnUse" x1="-40" y1="-300" x2="46" y2="-8">${stops(C.body)}</linearGradient>
  <linearGradient id="gHead" gradientUnits="userSpaceOnUse" x1="-70" y1="-528" x2="40" y2="-232">${stops(C.head)}</linearGradient>
  <linearGradient id="gWing" x1="0" y1="0" x2="0.3" y2="1">${stops(C.wing)}</linearGradient>
  <linearGradient id="gBeak" x1="0" y1="0" x2="1" y2="0.6">${stops(C.beak)}</linearGradient>
  <linearGradient id="gBeakLow" x1="0" y1="0" x2="1" y2="0.6">${stops(['#F5891F', '#D96A0C'])}</linearGradient>
  <radialGradient id="gBelly" cx="0.4" cy="0.35" r="0.7">
    <stop offset="0" stop-color="#FFFBE0" stop-opacity="0.95"/>
    <stop offset="1" stop-color="#FFF3B8" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="gEgg" x1="0.1" y1="0" x2="0.4" y2="1">${stops([C.egg, C.eggShade])}</linearGradient>
  <linearGradient id="gNest" x1="0" y1="0" x2="0.3" y2="1">${stops([C.nestLight, C.nest, C.nestDark])}</linearGradient>
  <linearGradient id="gGrass" x1="0" y1="0" x2="0" y2="1">${stops([C.grassLight, C.grass, C.grassDark])}</linearGradient>
  <radialGradient id="gWashWarm" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#FFB36B" stop-opacity="0.9"/>
    <stop offset="0.6" stop-color="#FFB36B" stop-opacity="0.35"/>
    <stop offset="1" stop-color="#FFB36B" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="gWashCool" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#C973A8" stop-opacity="0.85"/>
    <stop offset="0.6" stop-color="#C973A8" stop-opacity="0.3"/>
    <stop offset="1" stop-color="#C973A8" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="gPoolLight" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#CFEBAE" stop-opacity="0.55"/>
    <stop offset="1" stop-color="#CFEBAE" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="gPoolDark" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#245D45" stop-opacity="0.55"/>
    <stop offset="1" stop-color="#245D45" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="gEggGlow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#FFE9A8" stop-opacity="0.85"/>
    <stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="gField" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#6BA189"/><stop offset="0.12" stop-color="#5C9683"/>
    <stop offset="0.45" stop-color="#4E8A6C"/><stop offset="1" stop-color="#3F7A5C"/>
  </linearGradient>
  <linearGradient id="gHazeTop" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#FFD9A0" stop-opacity="0"/>
    <stop offset="1" stop-color="#FFE9C2" stop-opacity="0.75"/>
  </linearGradient>
  <radialGradient id="gVignette" cx="0.5" cy="0.46" r="0.75">
    <stop offset="0.45" stop-color="#2E1A10" stop-opacity="0"/>
    <stop offset="1" stop-color="#2E1A10" stop-opacity="0.55"/>
  </radialGradient>
  <radialGradient id="gShadow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#3B1F14" stop-opacity="0.5"/>
    <stop offset="0.6" stop-color="#3B1F14" stop-opacity="0.24"/>
    <stop offset="1" stop-color="#3B1F14" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="gDust" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#FFF6DE" stop-opacity="0.85"/>
    <stop offset="1" stop-color="#FFD9A8" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="gTitleWash" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2A1208" stop-opacity="0"/>
    <stop offset="1" stop-color="#2A1208" stop-opacity="0.42"/>
  </linearGradient>

  <filter id="soft2" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="soft4" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="soft8" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter>
  <filter id="soft14" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="58"/></filter>
  <pattern id="pGrain" width="256" height="256" patternUnits="userSpaceOnUse">
    <image href="${grain}" width="256" height="256"/>
  </pattern>
</defs>`;
}
