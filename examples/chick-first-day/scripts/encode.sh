#!/usr/bin/env bash
# Encode the rendered frames + score into the delivery master.
# Picture and sound are already on the same clock (30.000 s / 900 frames), so no trim is needed.
set -euo pipefail
cd "$(dirname "$0")/.."

FF="${FFMPEG:-$(python3 -c 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())')}"
FRAMES="${1:-renders/frames}"
OUT="${2:-renders/si-kecil.mp4}"
AUDIO="${3:-audio/score.wav}"

COUNT=$(ls "$FRAMES"/f*.png | wc -l | tr -d ' ')
echo "encoding $COUNT frames -> $OUT"

"$FF" -y -hide_banner -loglevel warning \
  -framerate 30 -start_number 0 -i "$FRAMES/f%04d.png" \
  -i "$AUDIO" \
  -map 0:v:0 -map 1:a:0 \
  -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -profile:v high -level 4.1 \
  -x264-params "keyint=60:min-keyint=30:scenecut=0" \
  -c:a aac -b:a 192k -ar 48000 \
  -movflags +faststart -shortest \
  "$OUT"

echo "--- probe ---"
"$FF" -hide_banner -i "$OUT" 2>&1 | grep -E "Duration|Stream" || true
ls -lh "$OUT"
