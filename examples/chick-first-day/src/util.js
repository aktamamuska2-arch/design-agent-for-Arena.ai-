export function mergeDeep(target, patch) {
  for (const [k, v] of Object.entries(patch)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if (typeof target[k] !== 'object' || target[k] === null) target[k] = {};
      mergeDeep(target[k], v);
    } else {
      target[k] = v;
    }
  }
  return target;
}

/** Smooth, deterministic 1D value noise in [-1,1] — for handheld camera wobble. */
export function wobble(t, seed = 0) {
  const s = (x) => Math.sin(x * 1.7 + seed * 12.9898) * 0.5 + Math.sin(x * 3.13 + seed * 4.14) * 0.3 + Math.sin(x * 0.71 + seed * 7.7) * 0.2;
  return s(t);
}
