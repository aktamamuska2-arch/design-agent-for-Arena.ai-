# BRIEF — "Si Kecil / Hari Pertamanya"

| Field | Value |
| --- | --- |
| Core message | Every life begins with a shaky step — and the courage to take the next one. |
| Audience | Everyone; plays first as a social/portfolio loop (muted autoplay safe). |
| Length | Exactly 30.000 s, 30 fps, 900 frames, 1920×1080 (16:9). |
| Style | Cartoon: bold warm outlines, candy palette, exaggerated squash & stretch. |
| Sound | Music-led score (120 BPM grid) + designed SFX on every picture event. No voiceover (universal). |
| Final frame | Chick silhouetted mid-air against a huge sunrise, title "SI KECIL" + "hari pertamanya", held calm. |
| Claims ledger | No factual claims; purely illustrative fiction. |

## The one sentence

A chick cracks out of its egg, stumbles through its first clumsy steps, chases a butterfly it cannot
catch, catches a dandelion seed instead, and rides the wind into its very first flight.

## The turn

The fall that should end the story (losing the seed mid-air) becomes the thing that teaches it to
fly — the moment it stops holding on, it flies.

## Must-includes

- All 12 principles of animation, each visible and documented in `README.md` with timecodes.
- Cartoon exaggeration and dynamic camera; nothing static for longer than ~0.6 s except the final hold.
- Readable with sound off: the story has to work as pure pantomime.

## Technical contract (HyperFrames-shaped, renderer-neutral)

- One paused, seekable timeline: `window.__timelines["chick-first-day"]`, sampled at `t = frame / fps`.
- Root duration `data-duration="30"`, `data-width="1920"`, `data-height="1080"`, fps 30.
- Deterministic: no render-time clocks, no unseeded randomness, no hover/scroll/input.
- This sandbox has no Chromium and no system FFmpeg, so the DOM is rasterised through a vector
  renderer (resvg) that consumes the same sampled state, and encoded with a bundled FFmpeg. The
  timeline contract, single clock (`timeline.json`) and gate order match the repo's skill pipeline.
