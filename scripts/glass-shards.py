# Generates public/assets/glass-shards.svg: stretched cloud banks of faceted sanded glass with misty trails,
# drawn with the same filters as the glass logo star (logo-glass-transparent.svg), around the card's copy.
# Also writes the banks' corner points for the roaming glass triangle (src/components/cloudPoints.ts).
# Usage: python3 scripts/glass-shards.py public/assets/glass-shards.svg src/components/cloudPoints.ts
import math, sys
out, points_out = sys.argv[1], sys.argv[2]
W, H = 1600, 600
def bank(x0, x1, y, thick, seed):
    """A stretched cloud bank: a long, flat sheet with a gently uneven top and tapered ends."""
    jit = [((seed * 37 + k * 53) % 11 - 5) / 5 for k in range(40)]
    n = max(3, round((x1 - x0) / 80))
    top = [(x0 + (x1 - x0) * k / n, y - thick * (0.55 + 0.35 * jit[k]) * (1 if 0 < k < n else 0)) for k in range(n + 1)]
    m = max(2, round((x1 - x0) / 120))
    bottom = [(x1 - (x1 - x0) * k / m - 18, y + thick * (0.45 + 0.15 * jit[k + 20])) for k in range(1, m)]
    return top + bottom

shards = [
    # (outline, trail vector, opacity), drawn at a fixed scale from the card's top left so they never cover
    # the copy: a thin band of banks along the top edge, above the heading (y < ~72), and more banks down
    # the right side, beyond the text column (x > ~1150). Right-side trails stay short so they don't reach it.
    (bank(-60, 520, 44, 36, 5), (-260, -6), 0.9),
    (bank(470, 1000, 40, 32, 6), (-240, -6), 0.8),
    (bank(950, 1660, 46, 40, 1), (-280, -6), 1.0),
    (bank(1150, 1660, 170, 60, 3), (-80, 0), 0.9),
    (bank(1240, 1660, 290, 50, 7), (-70, 0), 0.75),
    (bank(1180, 1640, 410, 44, 2), (-70, 0), 0.65),
    (bank(1300, 1660, 520, 36, 4), (-60, 0), 0.55),
]
# Facet shades, from the plane facing the light to the one turned away.
SHADES = ["face1", "face2", "face3", "face4"]
def pts(p): return " ".join(f"{x:.1f},{y:.1f}" for x, y in p)
defs, trails, bodies = [], [], []
for i, (v, (dx, dy), alpha) in enumerate(shards):
    bodies.append(f'<g opacity="{alpha}">'); trails.append(f'<g opacity="{alpha}">')
    cx = sum(x for x, _ in v) / len(v); cy = sum(y for _, y in v) / len(v)
    # Trails: several sheets of glass stream off every edge, fanning out across and away from the
    # cloud like the glass star's trails. Each sheet is a curved wedge from an edge to a far point.
    fan = ((-3, 0.8), (0, 1.0), (2, 1.3), (5, 0.9))
    for j, (deg, length) in enumerate(fan):
        t = math.radians(deg)
        fx, fy = (dx * math.cos(t) - dy * math.sin(t)) * length, (dx * math.sin(t) + dy * math.cos(t)) * length
        defs.append(f'<linearGradient id="trail{i}{j}" gradientUnits="userSpaceOnUse" x1="{cx:.0f}" y1="{cy:.0f}" x2="{cx+fx:.0f}" y2="{cy+fy:.0f}"><stop offset="0" stop-color="#fff" stop-opacity="0.3"/><stop offset="0.45" stop-color="#fff" stop-opacity="0.1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>')
        for k, (a, b) in enumerate(zip(v, v[1:] + v[:1])):
            if (k + j) % 2:
                continue
            mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
            far = (mx + fx, my + fy)
            ca = (a[0] + fx * 0.45, a[1] + fy * 0.55)
            cb = (b[0] + fx * 0.55, b[1] + fy * 0.45)
            trails.append(f'<path fill="url(#trail{i}{j})" d="M{a[0]:.1f} {a[1]:.1f} L{b[0]:.1f} {b[1]:.1f} Q{cb[0]:.1f} {cb[1]:.1f} {far[0]:.1f} {far[1]:.1f} Q{ca[0]:.1f} {ca[1]:.1f} {a[0]:.1f} {a[1]:.1f} Z"/>')
    # Facets: a zigzag strip across the outline, so every facet line runs between two edge points.
    tris, l, r, step = [], 0, len(v) - 1, 0
    while r - l > 1:
        if step % 2 == 0:
            tris.append((v[l], v[l + 1], v[r])); l += 1
        else:
            tris.append((v[l], v[r - 1], v[r])); r -= 1
        step += 1
    for k, tri in enumerate(tris):
        f = SHADES[(k * 3 + i) % len(SHADES)]
        bodies.append(f'<polygon filter="url(#{f})" fill="#fff" stroke="#fff" stroke-width="2" stroke-linejoin="round" points="{pts(tri)}"/>')
    bodies.append('</g>'); trails.append('</g>')
def face(name, slope, seed):
    return f'''<filter id="{name}" filterUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}" color-interpolation-filters="sRGB">
<feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
<feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -6" result="shape"/>
<feComponentTransfer in="shape" result="body"><feFuncA type="linear" slope="{slope}"/></feComponentTransfer>
<feGaussianBlur in="body" stdDeviation="2.5" result="bs"/>
<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="{seed}" stitchTiles="stitch" result="n"/>
<feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.8" result="m"/>
<feComposite in="bs" in2="m" operator="in" result="g"/>
<feComposite in="bs" in2="g" operator="arithmetic" k1="0" k2="0.6" k3="0.4" k4="0"/>
</filter>'''
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMin slice">
<title>Sanded glass shards drifting in the sky</title>
<defs>
{chr(10).join(defs)}
<filter id="grain" filterUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}" color-interpolation-filters="sRGB">
<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="soft"/>
<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" stitchTiles="stitch" result="noise"/>
<feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.8" result="mask"/>
<feComposite in="soft" in2="mask" operator="in" result="grained"/>
<feComposite in="soft" in2="grained" operator="arithmetic" k1="0" k2="0.6" k3="0.4" k4="0"/>
</filter>
{face("face1", 0.30, 11)}
{face("face2", 0.22, 13)}
{face("face3", 0.15, 17)}
{face("face4", 0.09, 19)}
</defs>
<g filter="url(#grain)" opacity="0.8">
{chr(10).join(trails)}
</g>
{chr(10).join(bodies)}
</svg>
'''
open(out, "w").write(svg)
corners = [p for v, _, _ in shards for p in v if 0 <= p[0] <= W]
open(points_out, "w").write("// Generated by scripts/glass-shards.py: corner points of the glass cloud banks, in the SVG's 1600x600 space.\n"
    "export const CLOUD_POINTS: [number, number][] = [\n" + "".join(f"  [{x:.0f}, {y:.0f}],\n" for x, y in corners) + "];\n")
