# Generates public/assets/glass-star.svg: the logo star in sanded glass, centred on its centre of mass, as a
# sprite for the star that flies across the sky card (ThrownStar.tsx moves and turns it with CSS transforms,
# so the filter is rasterised once instead of on every frame).
# Usage: python3 scripts/glass-star.py public/assets/glass-star.svg
import sys
SIZE, HALF = 56, 80  # tips reach SIZE from the centre; the sprite spans ±HALF to leave room for the blur
# The logo star's outline (logo-glass-transparent.svg): each point, preceded by the control point of the
# curved edge leading to it.
LOGO = [
    (462.3, 218.9), (494.5, 242.1), (589.0, 233.4), (720.4, 198.0), (603.4, 269.3), (526.6, 321.9),
    (594.2, 438.1), (700.0, 573.1), (525.9, 496.4), (374.7, 451.3), (272.6, 500.2), (137.1, 581.6),
    (234.1, 471.9), (289.2, 388.5), (255.5, 362.4), (184.7, 338.3), (288.4, 312.2), (362.3, 276.9),
    (402.8, 234.6), (438.8, 165.8),
]
pts = [((x - 437.7) * SIZE / 365, (y - 376.7) * SIZE / 365) for x, y in LOGO]
f = lambda p: f"{p[0]:.1f} {p[1]:.1f}"
d = f"M{f(pts[19])}" + "".join(f" Q{f(pts[2 * i])} {f(pts[2 * i + 1])}" for i in range(10)) + " Z"
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
