#!/usr/bin/env python3
"""Contact sheet: N rendered frames in a grid, labelled with their timecode. Pure QC helper."""
import sys, os, glob
from PIL import Image, ImageDraw

def main():
    src, out = sys.argv[1], sys.argv[2]
    cols = int(sys.argv[3]) if len(sys.argv) > 3 else 4
    width = int(sys.argv[4]) if len(sys.argv) > 4 else 480
    files = sorted(glob.glob(os.path.join(src, '*.png')))
    if not files:
        print('no frames'); return
    im0 = Image.open(files[0]); ar = im0.height / im0.width
    tw, th = width, int(width * ar)
    rows = (len(files) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * tw, rows * th), (24, 16, 12))
    d = ImageDraw.Draw(sheet)
    for i, f in enumerate(files):
        im = Image.open(f).convert('RGB').resize((tw, th), Image.LANCZOS)
        x, y = (i % cols) * tw, (i // cols) * th
        sheet.paste(im, (x, y))
        name = os.path.basename(f).replace('.png', '')
        d.text((x + 8, y + 6), name, fill=(255, 245, 220))
        d.rectangle([x, y, x + tw - 1, y + th - 1], outline=(60, 40, 30))
    sheet.save(out)
    print('wrote', out, sheet.size)

main()
