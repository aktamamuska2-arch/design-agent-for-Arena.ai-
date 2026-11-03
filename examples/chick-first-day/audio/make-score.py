#!/usr/bin/env python3
"""Score for "Si Kecil" — picture and sound share one clock (audio/timeline.json).

Everything is synthesised from scratch with numpy: no samples, no network, deterministic.
Run:  python3 audio/make-score.py   ->  audio/score.wav  (48 kHz, 16-bit, stereo)
"""
import json
import os
import wave

import numpy as np

SR = 48000
HERE = os.path.dirname(os.path.abspath(__file__))
TL = json.load(open(os.path.join(HERE, "timeline.json")))
DUR = TL["duration"]
N = int(DUR * SR)
EV = TL["events"]
BEAT = TL["beat"]

L = np.zeros(N, dtype=np.float64)
R = np.zeros(N, dtype=np.float64)
SEND = np.zeros(N, dtype=np.float64)  # reverb send


def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def place(buf, sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N:
        return
    n = min(len(sig), N - i)
    if n <= 0:
        return
    l = np.sqrt(0.5 * (1 - pan))
    r = np.sqrt(0.5 * (1 + pan))
    buf[0][i:i + n] += sig[:n] * gain * l
    buf[1][i:i + n] += sig[:n] * gain * r


def env_ad(n, a, d, curve=4.0):
    t = np.arange(n) / SR
    atk = np.clip(t / max(a, 1e-4), 0, 1)
    dec = np.exp(-t / max(d, 1e-4) * curve)
    return atk * dec


def sine(f, n, phase=0.0):
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(np.broadcast_to(f, n)) / SR + phase)


def noise(n, seed=0):
    rng = np.random.default_rng(seed)
    return rng.standard_normal(n)


def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.zeros_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a) * x[i] + a * acc
        y[i] = acc
    return y


def lp_fast(x, k=0.35):
    """Cheap one-pole low-pass via a vectorised exponential moving average approximation."""
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc += k * (x[i] - acc)
        y[i] = acc
    return y


def hp_fast(x, k=0.02):
    return x - lp_fast(x, k)


# --------------------------------------------------------------------------- instruments
def pluck(m, dur=0.7, amp=0.16, bright=1.0):
    n = int(dur * SR)
    f = midi(m)
    t = np.arange(n) / SR
    sig = (
        1.00 * np.sin(2 * np.pi * f * t)
        + 0.34 * bright * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 5)
        + 0.13 * bright * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t * 8)
        + 0.06 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t * 12)
    )
    return sig * env_ad(n, 0.004, dur * 0.36) * amp


def glock(m, dur=1.2, amp=0.13):
    n = int(dur * SR)
    f = midi(m)
    t = np.arange(n) / SR
    sig = (
        np.sin(2 * np.pi * f * t) * np.exp(-t * 3.1)
        + 0.5 * np.sin(2 * np.pi * 2.76 * f * t) * np.exp(-t * 7)
        + 0.22 * np.sin(2 * np.pi * 5.4 * f * t) * np.exp(-t * 12)
    )
    return sig * env_ad(n, 0.002, dur * 0.5) * amp


def pad(notes, dur, amp=0.05):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.zeros(n)
    for m in notes:
        f = midi(m)
        for h, w in ((1, 1.0), (2, 0.28), (3, 0.1)):
            sig += w * np.sin(2 * np.pi * f * h * t + h)
    sig /= max(1, len(notes))
    a = np.clip(t / 0.35, 0, 1)
    r = np.clip((dur - t) / 0.5, 0, 1)
    return sig * a * r * amp


def bass(m, dur, amp=0.13):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = midi(m)
    sig = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 2 * f * t)
    return sig * env_ad(n, 0.01, dur * 0.5) * amp


def shaker(t0=0.0, amp=0.05, seed=1):
    n = int(0.09 * SR)
    nz = hp_fast(noise(n, seed), 0.25)
    return nz * env_ad(n, 0.002, 0.03) * amp


# --------------------------------------------------------------------------- sound effects
def sfx_crack(strength=1.0, seed=3):
    n = int(0.18 * SR)
    nz = noise(n, seed) * env_ad(n, 0.001, 0.035, 6)
    body = sine(np.linspace(180, 90, n), n) * env_ad(n, 0.001, 0.05, 5)
    clicks = np.zeros(n)
    for k in (0, int(0.012 * SR), int(0.031 * SR)):
        clicks[k] += 1.0
    clicks = lp_fast(clicks, 0.6) * 3
    return (nz * 0.5 + body * 0.5 + clicks * 0.3) * strength


def sfx_pop(pitch0=900, pitch1=180, dur=0.16, amp=0.5):
    n = int(dur * SR)
    f = np.linspace(pitch0, pitch1, n) ** 1.0
    sig = sine(f, n) * env_ad(n, 0.002, dur * 0.3)
    sig += hp_fast(noise(n, 11), 0.4) * env_ad(n, 0.001, 0.02) * 0.4
    return sig * amp


def sfx_boing(f0=220, f1=520, dur=0.35, amp=0.22):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = f0 + (f1 - f0) * (t / dur) ** 0.6
    vib = 1 + 0.03 * np.sin(2 * np.pi * 18 * t)
    sig = np.sin(2 * np.pi * np.cumsum(f * vib) / SR)
    return sig * env_ad(n, 0.005, dur * 0.45) * amp


def sfx_thud(amp=0.55, dur=0.3, seed=5):
    n = int(dur * SR)
    t = np.arange(n) / SR
    body = np.sin(2 * np.pi * (70 * np.exp(-t * 6) + 38) * t)
    nz = lp_fast(noise(n, seed), 0.08) * env_ad(n, 0.001, 0.05, 6)
    return (body * 0.9 + nz * 0.8) * env_ad(n, 0.002, dur * 0.32) * amp


def sfx_chirp(m=88, dur=0.14, amp=0.2, seed=7):
    """A tiny two-note peep."""
    out = np.zeros(int(dur * SR))
    for k, mm in enumerate((m, m + 4)):
        seg = glock(mm, dur * 0.55, amp) * (1 if k == 0 else 0.8)
        i = int(k * dur * 0.36 * SR)
        out[i:i + len(seg)] += seg[:max(0, len(out) - i)]
    return out


def sfx_whoosh(dur=0.5, f0=300, f1=2200, amp=0.18, seed=9, up=True):
    n = int(dur * SR)
    t = np.arange(n) / SR
    nz = noise(n, seed)
    # sweep a band by crossfading low and high passed copies
    lo = lp_fast(nz, 0.05)
    hi = hp_fast(nz, 0.3)
    p = (t / dur) ** 0.8 if up else 1 - (t / dur) ** 0.8
    sig = lo * (1 - p) + hi * p
    shape = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 1.4
    return sig * shape * amp


def sfx_wind(dur, amp=0.12, seed=13):
    n = int(dur * SR)
    t = np.arange(n) / SR
    nz = noise(n, seed)
    band = lp_fast(hp_fast(nz, 0.02), 0.25)
    lfo = 0.55 + 0.45 * np.sin(2 * np.pi * 0.42 * t + 1.1)
    shape = np.clip(t / 0.6, 0, 1) * np.clip((dur - t) / 0.8, 0, 1)
    return band * lfo * shape * amp


def sfx_slide(dur=0.42, up=True, amp=0.16):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = np.linspace(420, 1500, n) if up else np.linspace(1500, 420, n)
    sig = np.sin(2 * np.pi * np.cumsum(f) / SR)
    sig += 0.15 * np.sin(2 * np.pi * np.cumsum(f * 2) / SR)
    return sig * env_ad(n, 0.01, dur * 0.5) * amp


def sfx_sparkle(m=96, amp=0.12, dur=0.9):
    out = np.zeros(int(dur * SR))
    for k, step in enumerate((0, 4, 7, 12, 16)):
        s = glock(m + step, dur * 0.6, amp * (1 - k * 0.12))
        i = int(k * 0.055 * SR)
        out[i:i + len(s)] += s[:max(0, len(out) - i)]
    return out


# --------------------------------------------------------------------------- arrangement
PENT = [0, 2, 4, 7, 9]  # major pentatonic offsets


def scale(root, degree):
    octv, idx = divmod(degree, len(PENT))
    return root + 12 * octv + PENT[idx]


BARS = [  # (start, chord root midi, chord notes)
    (0.0, 48, [60, 64, 67]),    # C
    (2.0, 45, [57, 60, 64]),    # Am
    (4.0, 41, [53, 57, 60]),    # F
    (6.0, 43, [55, 59, 62]),    # G
    (8.0, 48, [60, 64, 67]),    # C
    (10.0, 45, [57, 60, 64]),   # Am
    (12.0, 41, [53, 57, 60]),   # F
    (14.0, 43, [55, 59, 62]),   # G
    (16.0, 40, [52, 55, 59]),   # Em
    (18.0, 41, [53, 57, 60]),   # F
    (20.0, 48, [60, 64, 67]),   # C
    (22.0, 43, [55, 59, 62]),   # G
    (24.0, 45, [57, 60, 64]),   # Am  (the hang)
    (26.0, 41, [53, 57, 60]),   # F
    (28.0, 48, [60, 64, 67]),   # C   (the final frame)
]

# music drops out for the hang-time joke
SILENT = (24.42, 25.86)

bufL, bufR = np.zeros(N), np.zeros(N)


def mplace(sig, t, gain=1.0, pan=0.0, send=0.0):
    i = int(t * SR)
    if i >= N or i < 0:
        return
    n = min(len(sig), N - i)
    l = np.sqrt(0.5 * (1 - pan))
    r = np.sqrt(0.5 * (1 + pan))
    bufL[i:i + n] += sig[:n] * gain * l
    bufR[i:i + n] += sig[:n] * gain * r
    SEND[i:i + n] += sig[:n] * gain * send


def muted(t):
    return SILENT[0] <= t < SILENT[1]


# --- pads and bass
for start, root, notes in BARS:
    if muted(start + 0.1):
        continue
    mplace(pad(notes, 2.05, 0.055), start, 1.0, -0.15, 0.5)
    mplace(bass(root - 12, 0.9, 0.10), start, 1.0, 0.0, 0.15)
    mplace(bass(root - 12, 0.85, 0.075), start + 1.0, 1.0, 0.0, 0.15)

# --- shaker: 8ths from act 2 to the end, thin in the slow parts
for start, _, _ in BARS:
    if start < 6.0:
        continue
    for k in range(8):
        t = start + k * BEAT / 2
        if muted(t) or 16.4 < t < 17.1:
            continue
        amp = 0.035 + (0.02 if k % 2 else 0.0)
        if t > 26.0:
            amp *= 1.2
        mplace(shaker(amp=amp, seed=int(t * 97) % 9999), t, 1.0, 0.28 if k % 2 else -0.28, 0.05)

# --- melody (music box), written to the beat grid
MELODY = [
    # act 1 — small, patient, one idea at a time
    (0.50, 76, 0.5), (1.00, 72, 0.5), (1.75, 79, 0.5),
    (2.75, 84, 0.7), (3.25, 79, 0.4), (3.60, 76, 0.5),
    (4.05, 74, 0.5), (4.50, 76, 0.5), (5.00, 79, 0.7), (5.55, 76, 0.5),
    # act 2 — waddle rhythm
    (6.00, 72, 0.35), (6.50, 74, 0.35), (7.00, 76, 0.35), (7.50, 79, 0.5),
    (8.02, 77, 0.3), (8.52, 74, 0.3), (9.02, 72, 0.6), (9.60, 76, 0.4),
    (10.02, 79, 0.35), (10.52, 81, 0.35), (11.02, 79, 0.35), (11.52, 76, 0.5),
    (12.02, 74, 0.35), (12.52, 72, 0.6),
    # act 3 — the world opens up
    (13.00, 81, 0.5), (13.50, 84, 0.5), (14.00, 86, 0.4), (14.44, 88, 0.3),
    (15.00, 84, 0.4), (15.50, 81, 0.4), (16.00, 79, 0.5), (16.60, 77, 0.7),
    (17.20, 76, 0.4), (17.70, 79, 0.4), (18.20, 81, 0.5), (18.60, 84, 0.5),
    # act 4 — lift off, flight
    (19.20, 88, 0.4), (19.60, 91, 0.4), (20.00, 93, 0.4), (20.50, 91, 0.4),
    (21.00, 88, 0.4), (21.60, 86, 0.4), (22.00, 84, 0.4), (22.50, 86, 0.4),
    (22.96, 88, 0.4), (23.40, 91, 0.4), (23.90, 93, 0.5),
    # act 5 — the climb and the final frame
    (26.00, 84, 0.4), (26.40, 86, 0.35), (26.80, 88, 0.35), (27.20, 91, 0.35),
    (27.60, 93, 0.4), (27.98, 96, 0.6), (28.50, 91, 0.8), (29.10, 88, 1.4),
]
for t, m, d in MELODY:
    if muted(t):
        continue
    gain = 0.13 if t < 13 else (0.15 if t < 26 else 0.16)
    mplace(pluck(m, max(0.45, d * 1.9), gain), t, 1.0, 0.18, 0.45)
    if t >= 22 and t < 27:
        mplace(pluck(m - 12, d * 1.9, gain * 0.5), t, 1.0, -0.3, 0.3)

# --- SFX on the picture's events
def at(name):
    return EV[name]


mplace(sfx_crack(0.8, 3), at("crack1"), 0.85, -0.1)
mplace(sfx_crack(1.0, 4), at("crack2"), 1.0, 0.1)
mplace(sfx_pop(1100, 170, 0.18, 0.55), at("hatch"), 1.0, 0.0, 0.5)
mplace(sfx_thud(0.35, 0.22, 6), at("hatch") + 0.02, 1.0, 0.0, 0.3)
mplace(sfx_sparkle(100, 0.10, 1.1), at("hatch") + 0.04, 1.0, 0.25, 0.7)
mplace(sfx_crack(0.35, 8), at("capLand"), 0.5, 0.35)
mplace(sfx_chirp(84, 0.16, 0.20), at("peep"), 1.0, 0.05, 0.5)
mplace(sfx_chirp(88, 0.13, 0.14), at("peep") + 0.22, 1.0, 0.05, 0.5)
mplace(sfx_boing(300, 620, 0.22, 0.10), at("hopOut"), 1.0, 0.0, 0.3)
mplace(sfx_whoosh(0.5, 300, 1400, 0.10, 12), at("stretch") - 0.1, 1.0, 0.0, 0.3)

# waddle footsteps
for k in range(4):
    mplace(sfx_thud(0.10, 0.12, 20 + k), at("step1") + k * 0.44, 1.0, -0.2 + 0.1 * (k % 2), 0.15)
mplace(sfx_slide(0.4, True, 0.13), at("slip") - 0.28, 1.0, 0.0, 0.4)
mplace(sfx_thud(0.7, 0.4, 22), at("sitDown"), 1.0, 0.0, 0.45)
mplace(sfx_boing(180, 420, 0.3, 0.12), at("sitDown") + 0.02, 1.0, 0.1, 0.4)
for k in range(4):
    mplace(shaker(amp=0.05, seed=30 + k), at("shakeOff") + k * 0.1, 1.0, 0.3 if k % 2 else -0.3, 0.2)
for k, key in enumerate(("jumpTry1", "jumpTry2", "jumpTry3")):
    mplace(sfx_boing(260 + k * 60, 700 + k * 90, 0.26, 0.12), at(key), 1.0, 0.0, 0.35)
    mplace(sfx_thud(0.22, 0.2, 40 + k), at(key) + 0.44, 1.0, 0.0, 0.3)
mplace(sfx_whoosh(0.55, 200, 900, 0.14, 44, up=False), at("fallOut"), 1.0, 0.0, 0.35)
mplace(sfx_thud(0.75, 0.45, 46), at("landGrass"), 1.0, 0.0, 0.5)
mplace(sfx_whoosh(0.4, 800, 2600, 0.10, 48), at("landGrass") + 0.03, 1.0, 0.2, 0.4)

# the butterfly: a rising harp flutter
for k in range(9):
    mplace(glock(84 + (k % 4) * 3 + (k // 4) * 5, 0.5, 0.055), at("butterflyIn") + k * 0.11, 1.0, 0.35 * (1 if k % 2 else -1), 0.6)
mplace(sfx_pop(700, 1500, 0.1, 0.28), at("eyesPop"), 1.0, 0.1, 0.4)
mplace(sfx_whoosh(0.42, 500, 2600, 0.16, 52), at("pounce"), 1.0, 0.0, 0.35)
mplace(sfx_boing(520, 200, 0.2, 0.08), at("miss"), 1.0, 0.2, 0.3)
mplace(sfx_whoosh(0.5, 2600, 400, 0.12, 54, up=False), at("tumble"), 1.0, -0.1, 0.3)
mplace(sfx_thud(0.45, 0.3, 56), at("tumble") + 0.5, 1.0, 0.0, 0.35)
mplace(sfx_boing(900, 420, 0.5, 0.07), at("dizzy"), 1.0, 0.25, 0.5)

# the sad beat: a low, warm swell and one falling note
mplace(pad([48, 51, 55], 1.4, 0.055), at("sadBeat"), 1.0, -0.1, 0.7)
mplace(pluck(67, 1.6, 0.11), at("sadBeat") + 0.05, 1.0, 0.0, 0.7)
mplace(pluck(64, 1.6, 0.09), at("sadBeat") + 0.55, 1.0, 0.0, 0.7)
mplace(glock(79, 0.8, 0.07), at("determined2"), 1.0, 0.1, 0.6)

# the seed
mplace(sfx_sparkle(91, 0.07, 0.8), at("seedDrop"), 1.0, 0.3, 0.7)
mplace(sfx_whoosh(0.3, 300, 1200, 0.06, 58), at("grab"), 1.0, 0.0, 0.3)

# the wind: this is the big one
mplace(sfx_wind(3.2, 0.16, 13), at("liftOff") - 0.5, 1.0, -0.2, 0.4)
mplace(sfx_whoosh(0.9, 200, 1800, 0.20, 60), at("liftOff") - 0.1, 1.0, 0.0, 0.5)
mplace(sfx_whoosh(0.8, 1400, 300, 0.14, 62, up=False), at("swoopDown"), 1.0, 0.3, 0.4)
mplace(sfx_whoosh(0.7, 300, 2400, 0.18, 64), at("swoopUp"), 1.0, -0.3, 0.4)
mplace(sfx_slide(0.9, False, 0.10), at("seedSpinAway"), 1.0, 0.35, 0.5)

# hang time: total silence except a single high note hanging in the air
mplace(glock(100, 1.0, 0.05), at("hang"), 1.0, 0.0, 0.9)
mplace(sfx_slide(0.7, False, 0.13), at("fall"), 1.0, -0.15, 0.3)
mplace(sfx_whoosh(0.5, 100, 1000, 0.12, 66, up=False), at("fall") + 0.2, 1.0, 0.0, 0.3)
mplace(sfx_thud(0.30, 0.25, 68), at("catchAir"), 1.0, 0.0, 0.35)
mplace(sfx_whoosh(0.5, 400, 2000, 0.12, 70), at("catchAir") + 0.05, 1.0, 0.1, 0.4)

# flight flutters
for k in range(10):
    t = at("flap") + k * 0.22
    if muted(t):
        continue
    mplace(sfx_whoosh(0.16, 600, 1800, 0.05, 72 + k), t, 1.0, 0.3 * (1 if k % 2 else -1), 0.2)

# the climb: strings swell up into the cheer
for k, m in enumerate((60, 64, 67, 72, 76, 79)):
    mplace(pad([m], 1.6, 0.030), at("climb") + k * 0.13, 1.0, -0.3 + k * 0.12, 0.6)
mplace(sfx_sparkle(96, 0.16, 1.3), at("cheer"), 1.0, 0.0, 0.8)
mplace(glock(96, 1.6, 0.14), at("cheer") + 0.02, 1.0, 0.1, 0.9)
mplace(sfx_whoosh(0.7, 1500, 400, 0.10, 74, up=False), at("cheer") + 0.1, 1.0, 0.0, 0.5)

# the final frame: a warm cadence that resolves and breathes out
mplace(pad([60, 64, 67, 72], 2.6, 0.06), at("final") - 0.4, 1.0, 0.0, 0.8)
for k, m in enumerate((72, 76, 79, 84)):
    mplace(glock(m, 2.0, 0.09), at("final") + 0.05 + k * 0.12, 1.0, -0.2 + k * 0.14, 0.9)
mplace(bass(36, 2.0, 0.10), at("final"), 1.0, 0.0, 0.2)
mplace(sfx_sparkle(91, 0.05, 1.4), at("title"), 1.0, 0.0, 0.9)

# --------------------------------------------------------------------------- mix
mix = np.stack([bufL, bufR])

# reverb: three filtered taps on the send bus
def reverb(send):
    out = np.zeros((2, N))
    taps = [(0.061, 0.34, -0.3), (0.113, 0.24, 0.3), (0.181, 0.15, 0.0), (0.271, 0.09, -0.15)]
    for d, g, pan in taps:
        i = int(d * SR)
        wet = lp_fast(send, 0.28) * g
        l = np.sqrt(0.5 * (1 - pan))
        r = np.sqrt(0.5 * (1 + pan))
        out[0, i:] += wet[:N - i] * l
        out[1, i:] += wet[:N - i] * r
    return out


mix = mix + reverb(SEND) * 0.9

# gentle bus glue + soft knee, then normalise to a broadcast-ish loudness
mix = np.tanh(mix * 1.35) * 0.95
rms_pre = np.sqrt(np.mean(mix ** 2))
mix = mix * (10 ** (-18.0 / 20) / max(rms_pre, 1e-9))   # ~ -18 dBFS RMS
peak = np.max(np.abs(mix))
if peak > 0.94:                                        # soft limit, never clip
    mix = np.tanh(mix / peak * 1.6) * 0.94
peak = np.max(np.abs(mix))

# short fade at the very end so the file closes cleanly
fade = int(0.35 * SR)
mix[:, -fade:] *= np.linspace(1, 0, fade)

pcm = (np.clip(mix.T, -1, 1) * 32767).astype("<i2")
out = os.path.join(HERE, "score.wav")
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())

rms = np.sqrt(np.mean(mix ** 2))
print(f"wrote {out}  {len(pcm)/SR:.2f}s  peak={peak:.3f}  rms={20*np.log10(rms):.1f} dBFS")
