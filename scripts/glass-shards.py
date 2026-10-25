# Generates public/assets/glass-shards.svg: faceted sanded-glass shards with misty trails,
# drawn with the same filters as the glass logo star (logo-glass-transparent.svg).
import math, sys
out = sys.argv[1]
shards = [
    # (outline, trail vector): two crystalline clouds with many points and edges,
    # kept in the top third of the card (y < ~260 here).
    ([(1150, 64), (1240, 34), (1302, 52), (1390, 26), (1490, 60), (1452, 96),
      (1508, 130), (1400, 148), (1344, 176), (1250, 152), (1166, 164), (1198, 118)], (-420, 220)),
    ([(1366, 196), (1426, 172), (1476, 186), (1532, 168), (1570, 208), (1528, 238),
      (1462, 254), (1414, 234)], (-300, 150)),
]
# Facet shades, from the plane facing the light to the one turned away.
SHADES = ["face1", "face2", "face3", "face4"]
def pts(p): return " ".join(f"{x:.1f},{y:.1f}" for x, y in p)
defs, trails, bodies = [], [], []
for i, (v, (dx, dy)) in enumerate(shards):
    cx = sum(x for x, _ in v) / len(v); cy = sum(y for _, y in v) / len(v)
    # Trails: several sheets of glass stream off every edge, fanning out across and away from the
    # cloud like the glass star's trails. Each sheet is a curved wedge from an edge to a far point.
    fan = ((-16, 0.75), (0, 1.0), (14, 1.3), (28, 0.9))
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
def face(name, slope, seed):
    return f'''<filter id="{name}" filterUnits="userSpaceOnUse" x="0" y="0" width="1600" height="800" color-interpolation-filters="sRGB">
<feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
<feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -6" result="shape"/>
<feComponentTransfer in="shape" result="body"><feFuncA type="linear" slope="{slope}"/></feComponentTransfer>
<feGaussianBlur in="body" stdDeviation="2.5" result="bs"/>
<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="{seed}" stitchTiles="stitch" result="n"/>
<feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.8" result="m"/>
<feComposite in="bs" in2="m" operator="in" result="g"/>
<feComposite in="bs" in2="g" operator="arithmetic" k1="0" k2="0.6" k3="0.4" k4="0"/>
</filter>'''
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="800" viewBox="0 0 1600 800" preserveAspectRatio="xMaxYMin slice">
<title>Sanded glass shards drifting in the sky</title>
<defs>
{chr(10).join(defs)}
<filter id="grain" filterUnits="userSpaceOnUse" x="0" y="0" width="1600" height="800" color-interpolation-filters="sRGB">
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
