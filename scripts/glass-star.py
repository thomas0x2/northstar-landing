# Generates public/assets/glass-star.svg: the star in sanded glass, seen square-on, as a sprite for the star
# that flies across the sky card. ThrownStar.tsx turns it in 3D with CSS transforms, so the filter is rasterised
# once instead of on every frame.
# Usage: python3 scripts/glass-star.py public/assets/glass-star.svg
import math, sys
SIZE, HALF = 56, 80  # the tips sit SIZE from the centre; the sprite spans ±HALF to leave room for the blur
# The star seen square-on: a regular five-pointed star with gently curved sides, like the logo's. The logo's
# uneven arms are this star seen at a slant and close up, in perspective; ThrownStar.tsx recreates that view in
# 3D, so whichever arm swings toward us looks longest. One tip points straight down (toward us, once tilted).
INNER, BOW = 0.42, 0.06  # inner corners at INNER of the tip radius; sides bowed in by BOW of it
pts = []
for k in range(5):
    t0 = math.radians(90 + 72 * k)
    inner = t0 + math.radians(36)
    t1 = t0 + math.radians(72)
    # side from tip t0 to the inner corner, then from the corner to the next tip t1
    for a0, r0, a1, r1 in ((t0, 1, inner, INNER), (inner, INNER, t1, 1)):
        mx, my = (r0 * math.cos(a0) + r1 * math.cos(a1)) / 2, (r0 * math.sin(a0) + r1 * math.sin(a1)) / 2
        mr = math.hypot(mx, my)
        c = (mx * (1 - BOW / mr), my * (1 - BOW / mr))
        pts += [(c[0] * SIZE, c[1] * SIZE), (r1 * math.cos(a1) * SIZE, r1 * math.sin(a1) * SIZE)]
f = lambda p: f"{p[0]:.1f} {p[1]:.1f}"
# Each side is a control point then the corner it reaches; the path starts at the last corner, the first tip.
d = f"M{f(pts[-1])}" + "".join(f" Q{f(pts[2 * i])} {f(pts[2 * i + 1])}" for i in range(10)) + " Z"
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-HALF} {-HALF} {2 * HALF} {2 * HALF}" width="{2 * HALF}" height="{2 * HALF}">
  <!-- Sanded glass, as on the logo star: the shape thresholded to a solid body, faded, softened, then grained
       with fractal noise. -->
  <filter id="g" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="b"/>
    <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -6" result="shape"/>
    <feComponentTransfer in="shape" result="body"><feFuncA type="linear" slope="0.55"/></feComponentTransfer>
    <feGaussianBlur in="body" stdDeviation="2.5" result="bs"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="17" stitchTiles="stitch" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.8" result="m"/>
    <feComposite in="bs" in2="m" operator="in" result="gr"/>
    <feComposite in="bs" in2="gr" operator="arithmetic" k1="0" k2="0.6" k3="0.4" k4="0"/>
  </filter>
  <path d="{d}" filter="url(#g)" fill="#fff" stroke="#fff" stroke-width="2" stroke-linejoin="round" opacity="0.9"/>
</svg>
'''
open(sys.argv[1], "w").write(svg)
