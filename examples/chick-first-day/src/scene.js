// One paused, seekable GSAP timeline. The picture is a pure function of `tl.seek(t)`.
// Times come from timeline.js — never typed twice, never from a render clock.
//
// The twelve principles are tagged in comments as [SQ] squash & stretch, [AN] anticipation,
// [ST] staging, [PP] pose to pose, [FT] follow through & overlapping, [SL] slow in / slow out,
// [AR] arcs, [SA] secondary action, [TM] timing, [EX] exaggeration, [SD] solid drawing, [AP] appeal.
import gsap from 'gsap';
import { TL } from './timeline.js';
import { createState } from './state.js';

const E = {
  pop: 'back.out(2.1)',
  soft: 'power2.out',
  silk: 'power3.out',
  in2: 'power2.in',
  in4: 'power4.in',
  io: 'power2.inOut',
  snap: 'power4.out',
  jelly: 'elastic.out(1, 0.42)',
  tiny: 'back.out(1.3)',
};

const NEST_X = 930;
const RIM = 868; // feet height standing on the nest rim
const BOWL = 902; // feet height down inside the bowl
const GROUND = 1000; // feet height out on the meadow

export function buildScene() {
  const st = createState();
  const ev = TL.events;
  const tl = gsap.timeline({ paused: true });

  const T = (target, t, dur, vars, ease = E.soft, extra = {}) =>
    tl.to(target, { ...vars, duration: dur, ease, ...extra }, t);
  const S = (target, t, vars) => tl.set(target, vars, t);

  // ---------------------------------------------------------------- camera
  // Built LAST, from a two-pass read of where the chick actually is, so framing never clips the
  // subject: each key states the zoom and the screen fraction its feet should land on (fx, fy).
  const addCamera = () => {
    const KEYS = [
      // t,    zoom, fx,   fy,   ease
      [0.00, 1.26, 0.50, 0.76, 'none'],
      [2.30, 1.30, 0.50, 0.76, 'sine.inOut'],
      [2.72, 1.26, 0.50, 0.90, 'power3.out', 884],
      [3.40, 1.18, 0.50, 0.84, 'power2.out', 884],
      [5.90, 1.22, 0.50, 0.80, 'sine.inOut'],
      [6.90, 1.16, 0.44, 0.80, 'sine.inOut'],
      [8.40, 1.16, 0.40, 0.78, 'sine.inOut'],
      [9.10, 1.18, 0.46, 0.74, 'power2.out'],
      [10.20, 1.12, 0.46, 0.78, 'sine.inOut'],
      [12.20, 1.06, 0.46, 0.78, 'sine.inOut'],
      [12.70, 1.00, 0.52, 0.80, 'sine.inOut'],
      [13.40, 0.82, 0.48, 0.76, 'sine.inOut'],
      [14.10, 0.85, 0.52, 0.76, 'sine.inOut'],
      [14.50, 0.87, 0.50, 0.66, 'power2.out'],
      [15.10, 0.92, 0.50, 0.72, 'sine.inOut'],
      [16.20, 0.98, 0.50, 0.74, 'sine.inOut'],
      [16.70, 1.10, 0.50, 0.74, 'sine.inOut'],
      [17.40, 1.06, 0.48, 0.74, 'sine.inOut'],
      [18.20, 1.02, 0.50, 0.76, 'sine.inOut'],
      [18.70, 1.06, 0.50, 0.76, 'power2.out'],
      [19.30, 0.96, 0.50, 0.74, 'sine.inOut'],
      [20.20, 0.94, 0.48, 0.62, 'sine.inOut'],
      [21.60, 0.90, 0.52, 0.68, 'sine.inOut'],
      [22.90, 0.93, 0.50, 0.62, 'sine.inOut'],
      [23.90, 0.98, 0.48, 0.56, 'sine.inOut'],
      [24.60, 1.06, 0.48, 0.48, 'sine.inOut'],
      [25.40, 1.02, 0.50, 0.60, 'sine.inOut'],
      [26.00, 0.98, 0.50, 0.64, 'sine.inOut'],
      [26.80, 0.94, 0.50, 0.64, 'sine.inOut'],
      [27.70, 0.92, 0.48, 0.60, 'sine.inOut'],
      [28.40, 0.82, 0.53, 0.56, 'sine.inOut'],
      [30.00, 0.80, 0.53, 0.56, 'sine.inOut'],
    ];
    const pts = KEYS.map(([t, z, fx, fy, , anchorY]) => {
      tl.seek(t, false);
      const ay = anchorY ?? st.chick.y;
      return [st.chick.x - (fx * 1920 - 960) / z, ay - (fy * 1080 - 540) / z];
    });
    tl.seek(0, false);
    KEYS.forEach(([t, z, , , ease], i) => {
      const [x, y] = pts[i];
      if (i === 0) tl.set(st.cam, { x, y, zoom: z }, 0);
      else {
        const pt = KEYS[i - 1][0];
        tl.to(st.cam, { x, y, zoom: z, duration: Math.max(0.1, t - pt), ease }, pt);
      }
    });
  };

  // ================================================================ ACT 1 — the egg
  // [SA] breathing while nothing else moves: the egg is alive before it is visible as a character
  const breathe = (t0, amp = 1) => {
    for (let k = 0; k < 4; k++) {
      T(st.egg, t0 + k * 0.5, 0.25, { sy: 1.055 * amp, sx: 0.965 }, 'sine.inOut');
      T(st.egg, t0 + k * 0.5 + 0.25, 0.25, { sy: 0.975, sx: 1.022 }, 'sine.inOut');
    }
  };
  breathe(0.02);
  // a slow rock and a warm pulse: frame 0 is already moving, before anything "happens"
  T(st.egg, 0, 0.9, { roll: 1.6 }, 'sine.inOut');
  T(st.egg, 0.9, 0.9, { roll: -1.4 }, 'sine.inOut');
  T(st.egg, 0, 13, { glow: 0.35 }, 'none');
  T(st.egg, 0, 1.4, { y: -4 }, 'sine.inOut');
  T(st.egg, 1.4, 1.0, { y: 0 }, 'sine.inOut');
  T(st.sun, 0, 30, { y: 330, r: 178 }, 'none'); // sunrise across the whole film [SA]

  // [AN] the egg rocks before it commits to cracking
  T(st.egg, ev.wobble, 0.22, { roll: -7, sy: 1.02, sx: 0.97 }, E.io);
  T(st.egg, ev.wobble + 0.22, 0.2, { roll: 6 }, E.io);
  T(st.egg, ev.wobble + 0.42, 0.2, { roll: -4 }, E.io);
  T(st.egg, ev.crack1 - 0.06, 0.1, { roll: 0 }, E.io);
  T(st.egg, ev.crack1 - 0.3, 0.3, { glow: 0.85 }, E.soft);

  // [TM] first crack: a hard, fast event with a light flash
  T(st.egg, ev.crack1, 0.14, { crack: 0.55 }, E.snap);
  T(st.sky, ev.crack1, 0.1, { flash: 0.3 }, E.snap);
  T(st.sky, ev.crack1 + 0.08, 0.3, { flash: 0 }, E.soft);
  T(st.egg, ev.crack2 - 0.1, 0.12, { roll: 5, sx: 1.03, sy: 0.97 }, E.io);
  T(st.egg, ev.crack2, 0.2, { crack: 1 }, E.snap);
  T(st.sky, ev.crack2, 0.09, { flash: 0.34 }, E.snap);
  T(st.sky, ev.crack2 + 0.08, 0.26, { flash: 0 }, E.soft);

  // [AN] the biggest anticipation in the film: the whole egg gathers itself, then holds
  T(st.egg, ev.anticipate, 0.24, { sx: 1.16, sy: 0.84, roll: -2, y: 10 }, E.in2);
  T(st.egg, ev.anticipate + 0.24, 0.1, { sx: 1.2, sy: 0.8, y: 14 }, 'none');
  T(st.egg, ev.hatch - 0.02, 0.06, { sx: 1.08, sy: 0.92, y: 4 }, E.soft);

  // [EX][TM] HATCH — one frame of white, the cap flies, the chick overshoots
  S(st.egg, ev.hatch, { opacity: 0, baseOn: 1 });
  S(st.egg, ev.hatch, { capOn: 1, capX: 0, capY: 0, capRot: 0 });
  S(st.chick, ev.hatch, { opacity: 1, y: BOWL - 10, sx: 0.62, sy: 0.72, eyeMode: 'wide', eyeOpen: 0.2 });
  T(st.sky, ev.hatch, 0.06, { flash: 0.62 }, E.snap);
  T(st.sky, ev.hatch + 0.06, 0.22, { flash: 0 }, E.soft);
  tl.to(st.cam, { sx: 16, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, ev.hatch);
  tl.to(st.cam, { sy: 12, duration: 0.06, repeat: 3, yoyo: true, ease: 'none' }, ev.hatch + 0.04);

  tl.to(st.cam, { sx: 16, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, ev.hatch);
  tl.to(st.cam, { sy: 12, duration: 0.06, repeat: 3, yoyo: true, ease: 'none' }, ev.hatch + 0.04);
  T(st.chick, ev.hatch + 0.02, 0.3, { y: RIM - 104, sy: 1.16, sx: 0.88, tilt: -3, headSY: 0.88, headSX: 1.1 }, E.pop); // [SD][EX] stretch
  T(st.chick, ev.hatch + 0.34, 0.42, { y: RIM - 40, sy: 0.88, sx: 1.14, headSY: 1.1, headSX: 0.94 }, E.jelly); // [SQ] settle
  T(st.chick, ev.hatch + 0.76, 0.3, { y: RIM, sy: 1, sx: 1, headSY: 1, headSX: 1 }, E.soft);
  T(st.chick, ev.hatch + 0.1, 0.5, { eyeOpen: 1 }, E.tiny);
  T(st.chick, ev.hatch + 0.3, 0.6, { eyeMode: 'open' }, 'none');
  T(st.chick, ev.hatch, 0.28, { headY: -18 }, E.pop); // [FT] head lags the body
  T(st.chick, ev.hatch + 0.3, 0.55, { headY: 0 }, E.jelly);

  // the cap flies off on an arc and lands on the rim
  T(st.egg, ev.hatch, 0.62, { capX: 250, capY: -260, capRot: 210 }, E.soft); // [AR]
  T(st.egg, ev.hatch + 0.62, 0.34, { capY: -30, capRot: 340 }, E.in2); // [SL] gravity
  T(st.egg, ev.capLand - 0.06, 0.12, { capY: -54, capRot: 352 }, E.soft);
  T(st.egg, ev.capLand + 0.06, 0.24, { capY: -30, capRot: 348 }, E.tiny); // [FT] bounce
  T(st.egg, ev.hatch, 0.02, { capOn: 1 }, 'none');
  T(st.egg, ev.capLand + 0.7, 0.4, { capOn: 0 }, E.soft);

  // fragments: seeded arcs, own delays, own spin — [AR][SA]
  st.frags.forEach((f, i) => {
    const a = (i / st.frags.length) * Math.PI * 2 + 0.4;
    const dist = 170 + (i % 4) * 90;
    const dx = Math.cos(a) * dist;
    const dy = Math.sin(a) * dist * 0.55;
    const startY = 690 + (i % 3) * 26;
    S(st.frags[i], ev.hatch, { on: 1, x: NEST_X + dx * 0.12, y: startY, roll: 0 });
    T(st.frags[i], ev.hatch + 0.04, 0.6, { x: NEST_X + dx, y: startY + dy - 150, roll: (i % 2 ? 1 : -1) * 260 }, E.soft);
    T(st.frags[i], ev.hatch + 0.64, 0.34 + i * 0.03, { y: startY + dy + 150, roll: (i % 2 ? 1 : -1) * 420 }, E.in2);
    T(st.frags[i], ev.hatch + 1.1, 0.5, { on: 0 }, E.soft);
  });
  T(st.fx, ev.hatch, 0.5, { dust: 0.95, dustX: NEST_X, dustY: RIM - 30 }, E.snap);
  T(st.fx, ev.hatch + 0.5, 0.6, { dust: 0 }, E.soft);

  // [AP][SA] two blinks, then the first look around — the character wakes up
  const blink = (t) => {
    T(st.chick, t, 0.07, { eyeOpen: 0.05 }, E.in2);
    T(st.chick, t + 0.07, 0.1, { eyeOpen: 1 }, E.soft);
  };
  blink(ev.blink1);
  blink(ev.blink1 + 0.22);
  T(st.chick, ev.lookAround, 0.28, { pupilX: -0.9, headTilt: -5, headX: -6 }, E.io);
  T(st.chick, ev.lookAround + 0.3, 0.3, { pupilX: 0.85, headTilt: 4, headX: 6 }, E.io); // [AR] head travels in an arc
  T(st.chick, ev.lookAround + 0.62, 0.3, { pupilX: 0.2, headTilt: 0, headX: 0, pupilY: 0.1 }, E.io);

  // [EX][TM] the first peep
  T(st.chick, ev.peep - 0.12, 0.1, { sy: 1.12, sx: 0.92, headY: -14 }, E.in2);
  T(st.chick, ev.peep - 0.02, 0.06, { sy: 0.9, sx: 1.1 }, E.snap);
  T(st.chick, ev.peep, 0.14, { mouth: 1, sy: 1.06, sx: 0.96, headY: -18, wingR: -22, wingL: -22 }, E.snap);
  T(st.chick, ev.peep + 0.14, 0.34, { mouth: 0, sy: 1, sx: 1, headY: 0, wingR: 0, wingL: 0 }, E.jelly);
  T(st.fx, ev.peep, 0.4, { sparkle: 0.9, sparkleX: NEST_X + 90, sparkleY: RIM - 220 }, E.snap);
  T(st.fx, ev.peep + 0.4, 0.5, { sparkle: 0 }, E.soft);

  // [AN][AR] hop out of the shell cup onto the rim
  T(st.chick, ev.hopOut - 0.16, 0.16, { sy: 0.84, sx: 1.16, y: RIM + 10 }, E.in2);
  T(st.chick, ev.hopOut, 0.26, { y: RIM - 60, sy: 1.12, sx: 0.9, wingR: -50, wingL: -50 }, E.soft);
  T(st.chick, ev.hopOut + 0.26, 0.18, { y: RIM, sy: 1, sx: 1 }, E.in2);
  T(st.chick, ev.hopOut + 0.44, 0.26, { sy: 0.82, sx: 1.2 }, E.snap); // [SQ] landing
  T(st.chick, ev.hopOut + 0.7, 0.4, { sy: 1, sx: 1, wingR: 0, wingL: 0 }, E.jelly);

  // [EX] the big morning stretch — the silhouette changes completely
  T(st.chick, ev.stretch - 0.14, 0.14, { sy: 0.9, sx: 1.1 }, E.in2);
  T(st.chick, ev.stretch, 0.42, { sy: 1.22, sx: 0.86, headY: -34, headTilt: -8, wingR: -105, wingL: -105, mouth: 0.5, eyeOpen: 0.25 }, E.silk);
  T(st.chick, ev.stretch + 0.46, 0.4, { sy: 1, sx: 1, headY: 0, headTilt: 0, wingR: 0, wingL: 0, mouth: 0, eyeOpen: 1 }, E.jelly);
  blink(ev.stretch + 0.9);

  // ================================================================ ACT 2 — first steps

  // [PP][SL] a waddle: contact, down, passing, up — twice, then the wobble
  const stepCycle = (t0, dir = 1, amp = 1) => {
    // down + weight shift
    T(st.chick, t0, 0.12, { y: RIM + 6 * amp, sy: 0.94, sx: 1.06, tilt: -4 * dir }, E.soft);
    T(st.chick.legL, t0, 0.12, { lift: 14 * amp }, E.soft);
    T(st.chick.legR, t0 + 0.12, 0.14, { lift: 10 * amp, fx: 46 + 16 * dir }, E.soft);
    // up + travel
    T(st.chick, t0 + 0.16, 0.18, { y: RIM - 8 * amp, sy: 1.04, sx: 0.97, tilt: 3 * dir, x: st.chick.x }, E.soft);
    T(st.chick.legL, t0 + 0.16, 0.16, { lift: 0 }, E.soft);
    T(st.chick.legR, t0 + 0.26, 0.16, { lift: 0, fx: 46 }, E.soft);
    // [FT] head trails the body
    T(st.chick, t0 + 0.02, 0.16, { headY: 6, headTilt: 3 * dir }, E.soft);
    T(st.chick, t0 + 0.2, 0.24, { headY: 0, headTilt: 0 }, E.soft);
  };
  T(st.chick, ev.step1 - 0.3, 0.3, { x: NEST_X + 18, y: RIM, tilt: 0 }, E.io);
  stepCycle(ev.step1, 1, 1);
  stepCycle(ev.step1 + 0.44, 1, 1.15);
  T(st.chick, ev.step1, 0.9, { x: NEST_X + 74 }, E.io); // travel is a separate, slower channel

  // [EX][FT] the teeter: one foot up, wings windmilling, everything off balance
  T(st.chick, ev.wobbleBig - 0.1, 0.2, { tilt: -16, headTilt: -10, eyeMode: 'wide', wingR: -95, wingL: 70 }, E.snap);
  T(st.chick.legR, ev.wobbleBig, 0.1, { lift: 46, fx: 86 }, E.soft);
  T(st.chick, ev.wobbleBig + 0.2, 0.26, { tilt: 13, wingR: 60, wingL: -90, headTilt: 9 }, E.io);
  T(st.chick, ev.wobbleBig + 0.46, 0.3, { tilt: -9, wingR: -80, wingL: 65 }, E.io);
  T(st.chick.legR, ev.wobbleBig + 0.3, 0.2, { lift: 0, fx: 46 }, E.soft);
  T(st.chick, ev.wobbleBig + 0.76, 0.3, { tilt: 0, wingR: 0, wingL: 0, headTilt: 0 }, E.jelly);

  // [TM][EX] the slip: velocity into the cut, then a full-body freeze "oh no"
  T(st.chick, ev.slip - 0.26, 0.26, { x: NEST_X + 130, roll: -1 }, E.in2);
  T(st.chick, ev.slip, 0.12, { tilt: -22, x: NEST_X + 168, y: RIM - 12, sx: 1.14, sy: 0.9, eyeMode: 'wide', mouth: 0.55, legL: { fy: 0 }, headTilt: -14 }, E.snap);
  T(st.chick, ev.slip + 0.12, 0.5, { tilt: -34, roll: 0 }, E.in2);

  // [SQ] slapstick sit: the biggest squash in the film
  T(st.chick, ev.sitDown - 0.16, 0.16, { y: BOWL + 46, tilt: 0, roll: 0, sx: 0.82, sy: 1.2, x: NEST_X + 150 }, E.in2);
  T(st.chick, ev.sitDown, 0.1, { y: BOWL + 40, sx: 1.62, sy: 0.56, headY: 22, headSX: 0.78, headSY: 1.3 }, E.snap);
  T(st.chick, ev.sitDown + 0.1, 0.5, { sx: 1.28, sy: 0.82 }, E.jelly);
  T(st.chick, ev.sitDown + 0.5, 0.4, { sx: 1, sy: 1, headY: 0, headSX: 1, headSY: 1, eyeMode: 'dizzy', eyeOpen: 1 }, E.soft);
  tl.to(st.cam, { sx: 20, duration: 0.05, repeat: 4, yoyo: true, ease: 'none' }, ev.sitDown);
  T(st.sky, ev.sitDown, 0.1, { flash: 0.2 }, E.snap);
  T(st.sky, ev.sitDown + 0.1, 0.3, { flash: 0 }, E.soft);
  T(st.fx, ev.sitDown, 0.4, { dust: 1, dustX: NEST_X + 150, dustY: BOWL + 40 }, E.snap);
  T(st.fx, ev.sitDown + 0.4, 0.6, { dust: 0 }, E.soft);

  // [SA] shake it off, then [AP] the determined face
  const shake = (t, n = 4) => {
    for (let i = 0; i < n; i++) {
      T(st.chick, t + i * 0.1, 0.05, { headTilt: i % 2 ? 15 : -15 }, E.io);
    }
    T(st.chick, t + n * 0.1, 0.16, { headTilt: 0 }, E.jelly);
  };
  shake(ev.shakeOff);
  T(st.chick, ev.shakeOff + 0.2, 0.4, { eyeMode: 'open', pupilY: 0.1 }, E.soft);
  T(st.chick, ev.determined, 0.3, { eyeOpen: 0.62, tilt: 6, mouth: 0.12, sx: 1.04, sy: 0.98 }, E.silk);
  T(st.chick, ev.determined, 0.3, { pupilY: -0.15 }, E.silk);

  // [AN][TM] rule of three: two failures that teach, one that works
  const attempt = (t, height, back) => {
    T(st.chick, t - 0.18, 0.18, { sy: 0.74, sx: 1.24, y: BOWL + 48 }, E.in2);
    T(st.chick, t, 0.24, { y: BOWL + 48 - height, sy: 1.24, sx: 0.84, wingR: -70, wingL: -70 }, E.soft);
    T(st.chick, t + 0.24, 0.2, { y: back, sy: 0.95, sx: 1.05 }, E.in2);
    T(st.chick, t + 0.44, 0.24, { sy: 0.8, sx: 1.18, wingR: 0, wingL: 0 }, E.snap);
    T(st.chick, t + 0.68, 0.3, { sy: 1, sx: 1 }, E.jelly);
  };
  attempt(ev.jumpTry1, 90, BOWL + 46);
  attempt(ev.jumpTry2, 140, BOWL + 46);

  // the third one: the hold before the leap is longer, the arc higher, and it clears the rim
  T(st.chick, ev.jumpTry3 - 0.3, 0.26, { sy: 0.7, sx: 1.28, y: BOWL + 52, eyeOpen: 1, mouth: 0.2 }, E.in2);
  T(st.chick, ev.jumpTry3 - 0.04, 0.06, { sy: 0.66, sx: 1.32 }, 'none');
  T(st.chick, ev.jumpTry3, 0.6, { x: NEST_X + 330 }, 'none');
  T(st.chick, ev.jumpTry3, 0.34, { y: RIM - 220, sy: 1.12, sx: 0.9, headSY: 0.92, wingR: -80, wingL: -80, mouth: 0.5 }, E.soft);
  T(st.chick, ev.jumpTry3 + 0.34, 0.26, { y: RIM - 30, x: NEST_X + 330, sy: 0.94, sx: 1.08 }, E.in2);
  T(st.chick, ev.onRim - 0.04, 0.14, { y: RIM, sy: 0.86, sx: 1.16, wingR: -30, wingL: -30 }, E.snap);
  T(st.chick, ev.onRim + 0.1, 0.3, { sy: 1, sx: 1 }, E.jelly);

  // [EX][FT] it makes the rim, teeters, and the wind does the rest
  T(st.chick, ev.onRim + 0.12, 0.5, { tilt: -12, headTilt: -8, eyeMode: 'wide', wingR: -60, wingL: 55 }, E.io);
  T(st.chick, ev.onRim + 0.62, 0.3, { tilt: 14, wingR: 65, wingL: -70 }, E.io);
  T(st.world, ev.fallOut - 0.3, 0.5, { windAmp: 1.5, windX: 26 }, E.soft);
  T(st.chick, ev.fallOut, 0.34, { tilt: -46, x: NEST_X + 470, y: RIM - 44, roll: -34, sy: 1.14, sx: 0.9, wingR: -110, wingL: -110, eyeMode: 'wide', mouth: 0.7 }, E.in2);
  T(st.chick, ev.landGrass - 0.12, 0.16, { y: GROUND - 40, x: NEST_X + 540 }, E.in2);
  T(st.chick, ev.landGrass, 0.1, { y: GROUND, roll: -34, tilt: 6, sx: 1.55, sy: 0.58, headY: 18, headSX: 0.8, headSY: 1.28 }, E.snap);
  T(st.chick, ev.landGrass + 0.1, 0.34, { sx: 1.2, sy: 0.84 }, E.jelly);
  T(st.chick, ev.landGrass + 0.44, 0.36, { sx: 1, sy: 1, headY: 0, roll: 0, headSX: 1, headSY: 1 }, E.soft);
  T(st.world, ev.landGrass, 0.4, { grassRipple: 1 }, E.snap);
  T(st.world, ev.landGrass + 0.4, 0.8, { grassRipple: 0 }, E.soft);
  T(st.fx, ev.landGrass, 0.5, { dust: 1, dustX: NEST_X + 540, dustY: GROUND }, E.snap);
  T(st.fx, ev.landGrass + 0.5, 0.7, { dust: 0 }, E.soft);
  tl.to(st.cam, { sx: 18, duration: 0.05, repeat: 4, yoyo: true, ease: 'none' }, ev.landGrass);
  T(st.chick, ev.landGrass, 0.2, { groundY: GROUND }, E.soft);

  // ================================================================ ACT 3 — the world
  T(st.chick, ev.landGrass + 0.4, 0.6, { y: GROUND, x: NEST_X + 540, eyeMode: 'open', tilt: 0 }, E.soft);
  T(st.chick, ev.landGrass + 0.9, 0.4, { x: NEST_X + 560 }, E.io);

  // [ST] staging: pull wide so the world reads as big and the chick as small
  T(st.world, ev.revealWide, 1.2, { windAmp: 0.9, windX: 10 }, E.soft);

  // [AR][SA] the butterfly arrives on a sine path
  S(st.world, ev.butterflyIn - 0.2, { bfOn: 1, bfX: 420, bfY: 620, bfRot: 0 });
  T(st.world, ev.butterflyIn, 0.9, { bfX: 760, bfY: 540, bfRot: -12 }, E.io);
  T(st.world, ev.butterflyIn + 0.9, 0.9, { bfX: 980, bfY: 640, bfRot: 10 }, E.io);
  T(st.world, ev.butterflyIn + 1.8, 0.5, { bfX: 1120, bfY: 600, bfRot: -6 }, E.io);

  // [EX] the eyes pop, and the head follows the butterfly in an arc
  T(st.chick, ev.eyesPop, 0.2, { eyeMode: 'wide', mouth: 0.4, headTilt: -10, headY: -8, pupilX: -0.9, pupilY: -0.5, sy: 1.05, sx: 0.97 }, E.pop);
  T(st.chick, ev.eyesPop + 0.2, 0.5, { headTilt: 6, pupilX: 0.9, pupilY: -0.3 }, E.io);

  // [AN] crouch, [AR] pounce along a parabola, [TM] and the miss is one frame later than expected
  T(st.chick, ev.pounce - 0.18, 0.18, { sy: 0.72, sx: 1.28, y: GROUND, wingR: -40, wingL: -40 }, E.in2);
  T(st.chick, ev.pounce, 0.62, { x: NEST_X + 660 }, 'none'); // constant forward speed
  T(st.chick, ev.pounce, 0.3, { y: GROUND - 212, headSY: 0.9, sy: 1.1, sx: 0.94, wingR: -74, wingL: -74, headTilt: 12, mouth: 0.8, headSY: 0.9 }, E.soft);
  S(st.world, ev.miss, { bfY: 520 });
  T(st.world, ev.miss, 0.4, { bfY: 380, bfX: 1200, bfRot: -20 }, E.silk);
  T(st.chick, ev.miss, 0.16, { y: GROUND - 230, sy: 1.1, sx: 0.94, eyeMode: 'wide', mouth: 1 }, E.snap);
  T(st.chick, ev.miss + 0.16, 0.3, { y: GROUND - 120, headTilt: 0 }, E.in2);

  // [EX][FT] the tumble: rotation, squash on every contact, wings trailing
  T(st.chick, ev.tumble, 0.5, { x: NEST_X + 620 }, 'none');
  T(st.chick, ev.tumble, 0.5, { y: GROUND, roll: 320, tilt: -8, sy: 1, sx: 1, wingR: -60, wingL: 40 }, E.in2);
  T(st.chick, ev.tumble + 0.5, 0.1, { sx: 1.4, sy: 0.66, roll: 360, headSX: 0.85, headSY: 1.2 }, E.snap);
  T(st.chick, ev.tumble + 0.6, 0.4, { sx: 1, sy: 1, headSX: 1, headSY: 1 }, E.jelly);
  T(st.chick, ev.tumble + 0.04, 0.16, { hatOn: 0, hatY: -70, hatRot: 140 }, E.snap);
  T(st.fx, ev.tumble + 0.06, 0.4, { sparkle: 0.85, sparkleX: 1560, sparkleY: 780 }, E.snap);
  T(st.fx, ev.tumble + 0.46, 0.4, { sparkle: 0 }, E.soft);
  T(st.chick, ev.dizzy - 0.1, 0.2, { roll: 360, eyeMode: 'dizzy', tilt: 0, mouth: 0 }, E.soft);
  T(st.chick, ev.dizzy, 0.3, { tilt: -5, headTilt: -12 }, E.io);
  T(st.chick, ev.dizzy + 0.3, 0.3, { tilt: 5, headTilt: 10 }, E.io);
  T(st.chick, ev.dizzy + 0.6, 0.3, { tilt: 0, headTilt: 0 }, E.io);
  S(st.chick, ev.dizzy + 0.2, { roll: 0 });
  T(st.chick.legL, ev.dizzy, 0.2, { lift: 16 }, E.io); // [SA] legs twitch
  T(st.chick.legL, ev.dizzy + 0.2, 0.2, { lift: 0 }, E.io);

  // [TM][SL] the butterfly leaves and the film takes its one breath of sadness
  T(st.world, ev.butterflyAway, 1.0, { bfX: 1700, bfY: 220, bfRot: -30 }, E.silk);
  T(st.world, ev.butterflyAway + 1.0, 0.5, { bfOn: 0 }, E.soft);
  T(st.chick, ev.butterflyAway, 0.6, { pupilX: 0.5, pupilY: -0.9, headTilt: -6, eyeMode: 'open' }, E.silk);
  T(st.chick, ev.sadBeat, 0.5, { sy: 0.94, tilt: 3, headY: 10, headTilt: 14, eyeOpen: 0.55, pupilY: 0.5, mouth: 0, wingR: 14, wingL: 14 }, E.silk);
  T(st.chick, ev.sadBeat + 0.7, 0.5, { eyeOpen: 0.4 }, E.io);

  // [AP] determination: it stands up, chest out
  T(st.chick, ev.determined2, 0.34, { sy: 1.08, sx: 0.95, headY: -6, headTilt: -4, eyeOpen: 0.7, tilt: -2, wingR: -12, wingL: -12 }, E.tiny);
  T(st.chick, ev.determined2 + 0.34, 0.3, { sy: 1, sx: 1, pupilY: -0.2, mouth: 0.15 }, E.soft);

  // [AR][SA] the dandelion seed drifts down, spiralling
  S(st.world, ev.seedDrop, { seedOn: 1, seedX: 1400, seedY: 340, seedR: 0 });
  T(st.world, ev.seedDrop, 0.7, { seedX: 1300, seedY: 520, seedR: 120 }, E.io);
  T(st.world, ev.seedDrop + 0.7, 0.6, { seedX: 1400, seedY: 720, seedR: 260 }, E.io);
  T(st.world, ev.grab - 0.3, 0.3, { seedX: 1300, seedY: 860, seedR: 340 }, E.io);
  T(st.chick, ev.grab - 0.24, 0.2, { sy: 0.86, sx: 1.14 }, E.in2);
  T(st.chick, ev.grab, 0.24, { y: GROUND - 120, x: NEST_X + 700, sy: 1.14, sx: 0.9, wingR: -100, wingL: -100 }, E.soft);
  S(st.world, ev.grab + 0.22, { seedOn: 1 });
  T(st.chick, ev.grab + 0.24, 0.3, { y: GROUND - 10, sy: 0.9, sx: 1.1 }, E.in2);
  T(st.chick, ev.grab + 0.54, 0.3, { y: GROUND, sy: 1, sx: 1, wingR: -40, wingL: -40 }, E.jelly);
  // the seed is now held, so it lives in the chick's hands
  T(st.world, ev.grab + 0.24, 0.2, { seedX: NEST_X + 700, seedY: GROUND - 190, seedR: 360 }, E.soft);

  // ================================================================ ACT 4 — the wind
  // [AN] the gust announces itself in the grass before it touches the chick
  T(st.world, ev.liftOff - 0.5, 0.5, { windAmp: 3.4, windX: 40 }, E.in2);
  T(st.fx, ev.liftOff - 0.5, 0.5, { lines: 0.35 }, E.soft);
  T(st.chick, ev.liftOff - 0.5, 0.3, { eyeMode: 'wide', mouth: 0.6, headTilt: -8 }, E.snap);
  T(st.chick, ev.liftOff, 0.5, { y: GROUND - 260, sy: 1.08, sx: 0.95, wingR: -130, wingL: -130, mouth: 1, tilt: -8 }, E.soft);
  T(st.chick, ev.liftOff + 0.5, 0.7, { y: GROUND - 430, x: NEST_X + 660, tilt: -4 }, E.io);
  T(st.chick.legL, ev.liftOff, 0.3, { fy: 34, fx: -30 }, E.soft);
  T(st.chick.legR, ev.liftOff, 0.3, { fy: 30, fx: 30 }, E.soft);

  // [AR] the glide: one long rising arc with the camera travelling with it
  T(st.chick, ev.glide, 1.6, { y: 300, x: 1240, roll: -3, tilt: -6 }, E.io);
  T(st.world, ev.glide, 1.6, { seedY: 160 }, E.io);
  T(st.clouds, ev.glide, 6, { drift: 900 }, E.in2); // [SA] clouds slide past, speed tells the story
  T(st.fx, ev.glide, 0.6, { lines: 0.7 }, E.soft);

  // wings flap in a repeating beat while gliding [SA]
  for (let i = 0; i < 7; i++) {
    const t = ev.glide + 0.1 + i * 0.34;
    T(st.chick, t, 0.16, { wingR: -78, wingL: -78 }, E.io);
    T(st.chick, t + 0.17, 0.17, { wingR: -8, wingL: -8 }, E.io);
  }

  // [AR][EX] the swoop: down over the meadow, then a hard pull up
  T(st.chick, ev.swoopDown, 0.8, { y: 780, x: 1560, roll: 8, tilt: 10, sy: 1, sx: 1, eyeMode: 'happy' }, E.io);
  T(st.world, ev.swoopDown, 0.8, { seedY: 640 }, E.io);
  T(st.world, ev.swoopDown, 0.8, { grassRipple: 0 }, E.soft);
  T(st.chick, ev.swoopUp, 0.7, { y: 240, x: 1820, roll: -6, tilt: -8 }, E.io);
  T(st.world, ev.swoopUp, 0.7, { seedY: 120 }, E.io);
  T(st.fx, ev.swoopUp - 0.1, 0.5, { lines: 1 }, E.soft);
  T(st.fx, ev.swoopUp + 0.6, 0.6, { lines: 0.4 }, E.soft);
  for (let i = 0; i < 4; i++) {
    const t = ev.swoopDown + i * 0.4;
    T(st.chick, t, 0.18, { wingR: -85, wingL: -85 }, E.io);
    T(st.chick, t + 0.2, 0.2, { wingR: -10, wingL: -10 }, E.io);
  }

  // [TM] the seed spins out of its grip — the joke is that it never needed the seed
  T(st.world, ev.seedSpinAway, 0.9, { seedX: 2040, seedY: 60, seedR: 900 }, E.in2);
  T(st.world, ev.seedSpinAway + 0.9, 0.4, { seedOn: 0 }, E.soft);
  T(st.chick, ev.seedSpinAway, 0.3, { eyeMode: 'wide', mouth: 0.7, headTilt: -12 }, E.snap);

  // [TM][SL] HANG TIME: nothing moves for two beats — the stillest frame in the film
  T(st.chick, ev.hang - 0.12, 0.12, { y: 200, roll: 0, tilt: 0, sy: 1, sx: 1, wingR: -108, wingL: -108, mouth: 0.4 }, E.soft);
  T(st.fx, ev.hang, 0.3, { lines: 0 }, E.soft);

  // [SQ][SL] and then gravity remembers
  T(st.chick, ev.fall, 0.7, { y: 760, sy: 1.16, sx: 0.88, headSY: 0.9, headSY: 0.86, roll: 3, tilt: -16, wingR: -140, wingL: -140, mouth: 1, eyeMode: 'wide' }, E.in2);
  T(st.fx, ev.fall, 0.4, { lines: 0.5 }, E.soft);

  // [FT][SD] it catches the air: the fall becomes a glide
  T(st.chick, ev.catchAir, 0.2, { sy: 0.78, sx: 1.16, y: 720, tilt: 4, roll: 0, wingR: -30, wingL: -30, eyeMode: 'open', mouth: 0.2 }, E.snap);
  T(st.chick, ev.catchAir + 0.2, 0.4, { sy: 1, sx: 1, headY: -6 }, E.jelly);
  T(st.fx, ev.catchAir, 0.3, { lines: 0.2 }, E.soft);
  T(st.chick.legL, ev.catchAir, 0.3, { fy: 26 }, E.soft);
  T(st.chick.legR, ev.catchAir, 0.3, { fy: 22 }, E.soft);

  // ================================================================ ACT 5 — flight
  T(st.chick, ev.flap, 1.0, { y: 560, x: 1720, tilt: -4 }, E.io);
  for (let i = 0; i < 5; i++) {
    const t = ev.flap + i * 0.22;
    T(st.chick, t, 0.1, { wingR: -95, wingL: -95 }, E.io);
    T(st.chick, t + 0.11, 0.11, { wingR: -4, wingL: -4 }, E.io);
  }

  T(st.chick, ev.climb, 1.0, { y: 420, x: 1560, tilt: -10, eyeMode: 'happy' }, E.io);
  for (let i = 0; i < 4; i++) {
    const t = ev.climb + i * 0.24;
    T(st.chick, t, 0.11, { wingR: -100, wingL: -100 }, E.io);
    T(st.chick, t + 0.12, 0.12, { wingR: 0, wingL: 0 }, E.io);
  }

  // [EX][AP] the cheer: a full spin, wings out, sparkles
  T(st.chick, ev.cheer - 0.14, 0.14, { sy: 0.9, sx: 1.1, wingR: -40, wingL: -40 }, E.in2);
  T(st.chick, ev.cheer, 0.6, { roll: 360, y: 350, sy: 1.06, sx: 0.97, mouth: 1, wingR: -120, wingL: -120, eyeMode: 'happy' }, E.silk);
  T(st.fx, ev.cheer, 0.7, { sparkle: 1, sparkleX: 1560, sparkleY: 360 }, E.snap);
  T(st.fx, ev.cheer + 0.7, 0.6, { sparkle: 0 }, E.soft);
  T(st.chick, ev.cheer + 0.6, 0.3, { roll: 360, mouth: 0.3 }, E.soft);
  S(st.chick, ev.cheer + 0.95, { roll: 0 });

  // [ST][SL] the final frame: small against a huge sunrise, held calm
  T(st.chick, ev.final, 0.8, { x: 1440, y: 420, tilt: -2, wingR: -105, wingL: -105, eyeMode: 'happy', mouth: 0.25, sy: 1, sx: 1 }, E.silk);
  T(st.chick, ev.final + 0.8, 1.6, { y: 404, wingR: -116, wingL: -116 }, E.io); // the smallest possible life
  T(st.sun, ev.final, 2.0, { y: 470, r: 210, glow: 1.25 }, E.soft);
  T(st.sky, ev.final, 2.0, { warm: 1 }, E.soft);
  T(st.clouds, ev.final, 1.2, { opacity: 0.55 }, E.soft);
  T(st.egg, ev.final, 0.8, { baseOn: 0.9 }, E.soft);
  T(st.title, ev.title, 0.9, { on: 1, y: 0 }, E.silk);
  T(st.title, ev.title + 0.35, 0.7, { sub: 1 }, E.soft);
  // final hold: only breathing, earned [SA]
  T(st.chick, ev.title + 0.4, 0.5, { sy: 1.02, sx: 0.99 }, 'sine.inOut');
  T(st.chick, ev.title + 0.9, 0.5, { sy: 1, sx: 1 }, 'sine.inOut');

  addCamera();

  // act-1 world bookkeeping that must start from nothing
  S(st.egg, 0, { baseOn: 0 });
  S(st.world, 0, { bfOn: 0, seedOn: 0 });
  S(st.fx, 0, { dust: 0, sparkle: 0, lines: 0 });
  S(st.title, 0, { on: 0, sub: 0 });

  return { tl, st, duration: TL.duration };
}
