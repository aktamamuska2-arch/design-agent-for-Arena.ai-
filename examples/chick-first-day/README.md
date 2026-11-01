# Si Kecil — hari pertamanya

A 30-second cartoon short: a chick hatches, takes its first clumsy steps, chases a butterfly it can
never catch, catches a dandelion seed instead, and rides the wind into its first flight.

Built with this repository's pipeline (the HyperFrames / Design Agent production contract): brief →
storyboard → one seekable timeline → frames → encode → review. Everything you see is code — vector
art, motion, and a synthesised score. No stock footage, no samples, no generated bitmaps.

| | |
| --- | --- |
| Master | `renders/si-kecil.mp4` — 1920×1080, 30 fps, 900 frames, 30.000 s, H.264 + AAC |
| Score | `audio/score.wav` — 48 kHz stereo, synthesised by `audio/make-score.py` |
| Poster | `review/poster.png` (frame 858 / 28.6 s) |
| Contact sheet | `review/contact-sheet.png` (every 0.67 s) |

## The story in one sentence

A chick cracks out of its egg, stumbles through its first clumsy steps, chases a butterfly it cannot
catch, catches a dandelion seed instead — and the moment it loses the seed, it discovers it can fly.

**The turn:** the fall that should end the story is what teaches it to fly. **The motif:** the
eggshell cap it wears — it falls off in the tumble (15.0 s), and what is left is the fluffy, grown
bird of the final frame.

## Beat sheet

| t | beat |
| --- | --- |
| 0.0–2.7 | Egg breathing in the nest at dawn → rock → crack → a held crouch |
| 2.7–3.9 | **Hatch**: flash, cap flies on an arc, chick overshoots upward, lands, wobbles |
| 3.9–6.4 | Blinks, looks around, first *peep*, hops out of the shell, the big stretch |
| 6.4–9.4 | First steps → teeter → slip → **slapstick sit-down** inside the nest |
| 9.4–12.6 | Shakes it off, determined; fails twice to get out, makes it on the third, falls into the grass |
| 12.6–15.4 | Wide reveal → eyes pop → **pounce** at the butterfly → miss → tumble, cap flies off |
| 15.4–19.2 | Dizzy, the butterfly leaves, one sad beat, determination, grabs a drifting dandelion seed |
| 19.2–24.0 | **The wind**: lifted off, glide, swoop down over the meadow, pull up |
| 24.0–26.4 | The seed spins away → hang-time (the stillest, most silent moment) → the fall |
| 26.4–30.0 | It catches the air, flaps, climbs into the sunrise, cheers, lands on a calm final frame + title |

## The twelve principles, and where each one is

Everything below is load-bearing: the timecode, the mechanism, and the file that holds it.

| # | Principle | Where it plays | How it is built |
| --- | --- | --- | --- |
| 1 | **Squash & stretch** | 0.0–1.3 breathing; 2.7–3.1 hatch; 9.02 sit-down (`sx 1.62 / sy 0.56`); 25.9 the catch (`sy 0.78`) | `state.chick.sx/sy`, tweened against the floor pivot; the head carries a counter-scale (`headSX/headSY`) so it keeps its volume through each impact |
| 2 | **Anticipation** | 2.38–2.72 the egg gathers and **holds**; 14.26–14.44 crouch before the pounce; 11.20–11.50 the long wind-up on the third jump | a crouch tween, then a `set`/short hold, then the action — never the action alone |
| 3 | **Staging** | 13.0 the world pulls wide (zoom 0.82); 16.7 the camera pushes in for the sad beat; 28.4 the small chick against a huge sun | `addCamera()` frames the subject by screen *fraction*, not by raw coordinates, so nothing is ever cropped |
| 4 | **Pose to pose** | 12 poses per act (contact, breakdown, extreme) recorded in `STORYBOARD.md` | poses are keyed on absolute times in `scene.js`; breakdowns come from the `elastic/jelly` eases |
| 5 | **Follow through & overlapping** | head lags the body by 4–8 frames after every landing; the shell cap keeps travelling after the chick stops (2.72–3.34); wings trail the tumble; legs keep twitching at 15.48 | separate `headX/headY/headTilt` channels and delayed tweens on child rigs |
| 6 | **Slow in & slow out** | every move eases; the fall from 24.92 is `power2.in`, the landings are `elastic.out`, arrivals are `power3.out` | `E` ease table at the top of `scene.js` |
| 7 | **Arcs** | the pounce (14.44), the third jump (11.50), the cap's flight (2.72–3.34), the seed's spiral (17.9), the swoop (21.6–22.96) | horizontal travel is tweened `none` while vertical travel is up-then-down, which produces a real parabola instead of a straight line |
| 8 | **Secondary action** | blinks at 3.92 and 4.14; grass sway and the wind gust at 18.8; clouds drifting through the glide; pollen; dust puffs; the butterfly's wingbeat | deterministic `sin()` phases driven by the sampled time — never `Math.random`, so every render matches |
| 9 | **Timing** | the crack happens in **1 frame**; the sit-down in 3; the hang-time at 24.50–24.92 is the one true hold; the final frame holds 1.5 s | an absolute-time grid at 120 BPM (beat = 0.5 s) shared with the score |
| 10 | **Exaggeration** | eyes pop at 14.06; 1.62× squash; a full 360° tumble (15.0) and a 360° spin of joy (27.98); a 2.2× too-tall hatch stretch | values are deliberately pushed past realism, then recovered with `elastic.out` |
| 11 | **Solid drawing** | the head is a fully outlined circle sitting on the body; shared user-space gradients; the same volume at every angle; three-quarter face | `chick.js` — the rig is constructed from real volumes, not a flat sticker |
| 12 | **Appeal** | big eyes with two highlights, blush, the shell-cap hat, the tiny waddle, the fluff revealed when the cap falls off | `chick.js` proportions: head r 147 vs a 240-wide body, eyes at 40×45 |

## How it is built (and how that maps to HyperFrames)

The repo's contract: a composition is a seekable timeline sampled at `t = frame / fps`, registered once,
paused, deterministic, with a fixed root duration — then rendered frame by frame and encoded.

| Contract | This project |
| --- | --- |
| One paused timeline, `window.__timelines["<id>"]` | `src/scene.js` → `gsap.timeline({ paused: true })`, sampled with `tl.seek(t)` |
| Root `data-duration` / `data-width` / `data-height` | `src/timeline.js` — `duration: 30`, `1920×1080`, `fps: 30` |
| Seek-safe, no render clocks, no unseeded random | every frame is `tl.seek(f / 30)`; all "randomness" is a seeded hash (`rnd()` in `world.js`) |
| Media playback owned by the framework | the score is rendered offline from the same clock (`audio/timeline.json`) |
| Lint → check → snapshots → render | `scripts/preview.mjs` (single frames), `scripts/render-frames.mjs` (all frames), `scripts/sheet.py` (contact sheets), `scripts/encode.sh` |

**One deviation, stated plainly:** this sandbox has no Chromium and no system FFmpeg, so the DOM is not
rasterised by a browser. The same sampled state is drawn to SVG and rasterised with `resvg`, then encoded
with the FFmpeg bundled by `imageio-ffmpeg`. The timeline contract, the single clock, the determinism
rules and the gate order are unchanged; only the rasteriser differs. Nothing in `src/` depends on the
substitution — swap `drawFrame() → SVG` for a DOM renderer and the animation is identical.

## Build

```bash
npm install                      # gsap + @resvg/resvg-js
npm run frames                   # 900 PNGs -> renders/frames  (~3 min, 2 workers)
python3 audio/make-score.py      # -> audio/score.wav
node scripts/export-timeline.mjs # writes audio/timeline.json from src/timeline.js
bash scripts/encode.sh           # -> renders/si-kecil.mp4
# single frame, for authoring:
node scripts/preview.mjs review/x.png --at 14.6
```

Requires Node 22+, Python 3 with numpy, and `imageio-ffmpeg` (or set `FFMPEG` to any ffmpeg with libx264).

## Files

```
BRIEF.md              the ask, the message, the contract
STORYBOARD.md         beat sheet, pose keys, staging and sound plan
src/timeline.js       the single clock: fps, duration, every event time
src/state.js          every animatable number the picture reads
src/scene.js          the timeline: all twelve principles, tagged in comments
src/chick.js          the character rig
src/world.js          sky, sun, clouds, hills, meadow, nest, egg, butterfly, seed, particles
src/defs.js           gradients, soft shadows, grain tile
src/draw.js           assembles one frame from one sampled state
src/palette.js        every colour in the film
audio/make-score.py   the score: pad, bass, plucks, and 30 designed sound effects
scripts/              preview, render, contact sheet, encode, timeline export
renders/              frames + the master
review/               poster, contact sheets, QC frames
```

## QC notes

- **Pops** (frame-to-frame difference spikes) exist only where intended: the two cracks (1.93 s,
  2.30 s), the hatch (2.73–2.87 s) and the sit-down impact (9.03 s). Everything else moves inside a
  narrow band, so nothing snaps unintentionally.
- **The opening is never frozen**: the egg breathes, rocks and glows from frame **0**, and the camera is
  already moving.
- **Framing** is asserted per beat: the camera keys state where the subject's feet land on screen, so no
  pose is ever cropped, including the hatch overshoot.
- **Sound** peaks exactly on the picture's impacts and drops to near-silence for the hang-time at
  24.4–25.9 s — silence is the joke.
