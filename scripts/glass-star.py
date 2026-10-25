# Generates public/assets/glass-star.svg: the logo star in sanded glass, as a sprite for the star that flies
# across the sky card (ThrownStar.tsx moves and turns it with CSS transforms, so the filter is rasterised once
# instead of on every frame).
#
# The logo shows the star at a slant: its five tips lie on an ellipse, the circle they share seen at an angle.
# The sprite is the star seen square-on, so its tips sit on one circle around the sprite's centre, and spinning
# it about that centre sends every tip round the same circle. ThrownStar.tsx tilts it back to the logo's slant
# with TILT, so at rest it is exactly the logo star.
# Usage: python3 scripts/glass-star.py public/assets/glass-star.svg
import sys
SIZE, HALF = 56, 80  # the tips all sit SIZE from the centre; the sprite spans ±HALF to leave room for the blur
# The logo star's outline (logo-glass-transparent.svg): each point, preceded by the control point of the
# curved edge leading to it.
LOGO = [
    (462.3, 218.9), (494.5, 242.1), (589.0, 233.4), (720.4, 198.0), (603.4, 269.3), (526.6, 321.9),
    (594.2, 438.1), (700.0, 573.1), (525.9, 496.4), (374.7, 451.3), (272.6, 500.2), (137.1, 581.6),
    (234.1, 471.9), (289.2, 388.5), (255.5, 362.4), (184.7, 338.3), (288.4, 312.2), (362.3, 276.9),
    (402.8, 234.6), (438.8, 165.8),
]
# The ellipse through the five tips (centre, semi-axes, and the unit vectors along them), solved as the conic
# through those points.
CX, CY = 462.281, 432.280
A1, A2 = 358.376, 257.516
U1, U2 = (0.883335, -0.468742), (0.468742, 0.883335)
# Square the star up: measure each point along the ellipse's axes and scale each axis to the circle's radius.
pts = [(((x - CX) * U1[0] + (y - CY) * U1[1]) * SIZE / A1, ((x - CX) * U2[0] + (y - CY) * U2[1]) * SIZE / A2) for x, y in LOGO]
for i in (3, 7, 11, 15, 19):
    assert abs((pts[i][0] ** 2 + pts[i][1] ** 2) ** 0.5 - SIZE) < 0.2, "every tip should be SIZE from the centre"
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
