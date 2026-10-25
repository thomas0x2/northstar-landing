# Generates public/assets/glass-shards.svg: faceted sanded-glass shards with misty trails,
# drawn with the same filters as the glass logo star (logo-glass-transparent.svg).
import sys
out = sys.argv[1]
shards = [
    # (vertices, trail vector)
    ([(1180, 92), (1418, 58), (1542, 150), (1452, 252), (1232, 222)], (-420, 330)),
    ([(1058, 262), (1180, 222), (1236, 304), (1110, 338)], (-300, 240)),
    ([(1328, 386), (1500, 352), (1562, 442), (1402, 484)], (-340, 270)),
    ([(1468, 528), (1538, 510), (1562, 566), (1490, 582)], (-200, 160)),
]
def pts(p): return " ".join(f"{x:.1f},{y:.1f}" for x, y in p)
defs, trails, bodies = [], [], []
for i, (v, (dx, dy)) in enumerate(shards):
    cx = sum(x for x, _ in v) / len(v); cy = sum(y for _, y in v) / len(v)
    defs.append(f'<linearGradient id="trail{i}" gradientUnits="userSpaceOnUse" x1="{cx:.0f}" y1="{cy:.0f}" x2="{cx+dx:.0f}" y2="{cy+dy:.0f}"><stop offset="0" stop-color="#fff" stop-opacity="0.34"/><stop offset="0.45" stop-color="#fff" stop-opacity="0.13"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>')
    for a, b in zip(v, v[1:] + v[:1]):
        trails.append(f'<polygon fill="url(#trail{i})" points="{pts([a, b, (b[0]+dx, b[1]+dy), (a[0]+dx, a[1]+dy)])}"/>')
    # Two facets split along one diagonal: a bright plane facing the light and a quieter one.
    for f, part in (("faceHi", v[:3]), ("faceLo", [v[0]] + v[2:])):
        bodies.append(f'<polygon filter="url(#{f})" fill="#fff" stroke="#fff" stroke-width="3" stroke-linejoin="round" points="{pts(part)}"/>')
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
{face("faceHi", 0.34, 11)}
{face("faceLo", 0.22, 13)}
</defs>
<g filter="url(#grain)" opacity="0.8">
{chr(10).join(trails)}
</g>
{chr(10).join(bodies)}
</svg>
'''
open(out, "w").write(svg)
