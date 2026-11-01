// Default pose. Every animatable number the picture reads lives here, so the timeline can
// tween any of them and the renderer stays a pure function of the sampled state.
export function createState() {
  return {
    cam: { x: 960, y: 540, zoom: 1, rot: 0, sx: 0, sy: 0 },
    sky: { haze: 0.2, warm: 0, flash: 0 },
    sun: { x: 1430, y: 620, r: 130, glow: 1 },
    clouds: { drift: 0, opacity: 1 },
    hills: { far: 0, mid: 0, near: 0 },
    world: { windX: 0, windAmp: 0.35, blurBack: 0, nestY: 0, seedX: 0, seedY: 0, seedR: 0, seedSpin: 0, seedOn: 0, bfX: 0, bfY: 0, bfOn: 0, bfRot: 0, bfFlap: 0, grassRipple: 0 },
    ground: 900,
    egg: { x: 930, y: 0, roll: 0, sx: 1, sy: 1, on: 0, opacity: 1, crack: 0, capOn: 0, capX: 0, capY: 0, capRot: 0, capVX: 0, glow: 0, baseOn: 0 },
    frags: [],
    chick: {
      x: 930, y: 884, sx: 1, sy: 1, tilt: 0, roll: 0, opacity: 0, groundY: 884,
      headX: 0, headY: 0, headTilt: 0, headSX: 1, headSY: 1,
      eyeOpen: 1, eyeMode: 'open', pupilX: 0, pupilY: 0,
      mouth: 0, wingL: 0, wingR: 0, blush: 0.42, tuftLag: 0,
      hatOn: 1, hatX: 0, hatY: 0, hatRot: 0,
      showLegs: 1,
      legL: { fx: -46, fy: 0, lift: 0 },
      legR: { fx: 46, fy: 0, lift: 0 },
      shadow: { opacity: 0.55 },
    },
    fx: { dust: 0, dustX: 0, dustY: 0, sparkle: 0, sparkleX: 0, sparkleY: 0, lines: 0, impact: 0, trail: 0 },
    title: { on: 0, y: 40, sub: 0 },
  };
}
