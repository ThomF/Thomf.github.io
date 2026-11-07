"""Turn assets/face.jpg into assets/face.js (ASCII art the page loads). macOS only (uses `sips`), no pip installs.
Usage: python3 tools/make_ascii.py [columns]"""
import json, os, struct, subprocess, sys, tempfile

COLS = int(sys.argv[1]) if len(sys.argv) > 1 else 140
RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|/tjfrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
here = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(here, "..", "assets", "face.jpg")
out = os.path.join(here, "..", "assets", "face.js")

w0, h0 = [int(x.split(":")[1]) for x in subprocess.check_output(
    ["sips", "-g", "pixelWidth", "-g", "pixelHeight", src], text=True).split("\n")[1:3]]
rows = round(h0 / w0 * COLS * 0.55)  # monospace cells are ~1.8x taller than wide
bmp = os.path.join(tempfile.mkdtemp(), "f.bmp")
subprocess.run(["sips", "-s", "format", "bmp", "-z", str(rows), str(COLS), src, "--out", bmp],
               check=True, capture_output=True)

d = open(bmp, "rb").read()
off, = struct.unpack_from("<I", d, 10)
W, H = struct.unpack_from("<ii", d, 18)
bpp, = struct.unpack_from("<H", d, 28)
step = bpp // 8
stride = (W * step + 3) & ~3
flip = H > 0; H = abs(H)

def px(x, y):
    yy = H - 1 - y if flip else y
    i = off + yy * stride + x * step
    b, g, r = d[i], d[i + 1], d[i + 2]
    return r, g, b

def inside(x, y):
    """Rough silhouette of the cut-out head (in 0..1 image coords) so the table vanishes."""
    u, v = (x + .5) / W, (y + .5) / H
    dx, dy = (u - .49) / .47, (v - .51) / (.46 if v < .51 else .47)
    if dy > 0: dx /= (1 - .22 * dy * dy)          # taper toward the chin
    head = abs(dx) ** 2.3 + abs(dy) ** 2.3 <= 1
    eu = min(abs(u - .03), abs(u - .97))
    ears = (eu / .045) ** 2 + ((v - .455) / .095) ** 2 <= 1
    return head or ears

cells = [[None] * W for _ in range(H)]
vals = []
for y in range(H):
    for x in range(W):
        if inside(x, y):
            r, g, b = px(x, y)
            cells[y][x] = (0.299 * r + 0.587 * g + 0.114 * b) / 255
            vals.append(cells[y][x])
vals.sort()
def rank(l):  # histogram-equalise so every shade of the ramp gets used
    lo, hi = 0, len(vals)
    while lo < hi:
        m = (lo + hi) // 2
        if vals[m] < l: lo = m + 1
        else: hi = m
    return lo / len(vals)

lines = []
for y in range(H):
    row = ""
    for x in range(W):
        l = cells[y][x]
        if l is None: row += " "; continue
        t = rank(l) ** 1.45   # >1 keeps shadows (eyes, mouth) dark
        row += RAMP[max(1, int(t * (len(RAMP) - 1)))]
    lines.append(row.rstrip())
while lines and not lines[0].strip(): lines.pop(0)
while lines and not lines[-1].strip(): lines.pop()
open(out, "w").write("window.FACE_ASCII = " + json.dumps("\n".join(lines)) + ";\n")
print(f"wrote {out} ({W}x{H})")
