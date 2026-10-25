import { useEffect, useRef } from "react";
import { CLOUD_POINTS } from "./cloudPoints";

// In the cloud SVG's own space, so this layer lines up with glass-shards.svg.
const W = 1600;
const H = 600;
const REACH = 190; // how far a sheet stretches from the triangle to a cloud corner
const SIZE = 40;
const SECONDS = 40; // one pass across the sky

type P = [number, number];
const smooth = (t: number) => t * t * (3 - 2 * t);
const cross = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
const pts = (ps: P[]) => ps.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/** Where the star is at time t (0 to 1): rising through the clouds beside the heading, then right
    to left along the band of clouds above the copy, like the trails. */
function path(t: number): P {
  const x = W + 140 - t * (W + 280);
  const climb = smooth(Math.min(1, Math.max(0, (W + 140 - x) / 520)));
  const y = 250 - climb * 210 + 10 * Math.sin(t * Math.PI * 8);
  return [x, y];
}

// The logo star's outline (logo-glass-transparent.svg): each point, preceded by the control point of the
// curved edge leading to it, recentred on the star and scaled so its tips reach SIZE.
const LOGO: [number, number][] = [
  [462.3, 218.9], [494.5, 242.1], [589.0, 233.4], [720.4, 198.0], [603.4, 269.3], [526.6, 321.9],
  [594.2, 438.1], [700.0, 573.1], [525.9, 496.4], [374.7, 451.3], [272.6, 500.2], [137.1, 581.6],
  [234.1, 471.9], [289.2, 388.5], [255.5, 362.4], [184.7, 338.3], [288.4, 312.2], [362.3, 276.9],
  [402.8, 234.6], [438.8, 165.8],
];
const STAR = LOGO.map(([x, y]): [number, number] => [((x - 423) * SIZE) / 365, ((y - 354) * SIZE) / 365]);

/** The star tumbling in 3D (so its angles change as it turns) and seen in perspective: its ten points,
    the curved outline through them, and how squarely it faces us (1 face-on, 0 edge-on). */
function star(t: number, [x, y]: P) {
  const ax = t * Math.PI * 2 * 3.1, ay = t * Math.PI * 2 * 2.3, az = t * Math.PI * 2 * 1.3;
  const [sx, cx, sy, cy, sz, cz] = [Math.sin(ax), Math.cos(ax), Math.sin(ay), Math.cos(ay), Math.sin(az), Math.cos(az)];
  const focal = SIZE * 4;
  const all = STAR.map(([px, py]): P => {
    let pz = 0;
    [py, pz] = [py * cx - pz * sx, py * sx + pz * cx];
    [px, pz] = [px * cy + pz * sy, -px * sy + pz * cy];
    [px, py] = [px * cz - py * sz, px * sz + py * cz];
    const s = focal / (focal + pz);
    return [x + px * s, y + py * s];
  });
  const tips = all.filter((_, i) => i % 2 === 1);
  const f = (q: P) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  let d = `M${f(tips[9])}`;
  for (let i = 0; i < 10; i++) d += ` Q${f(all[2 * i])} ${f(all[2 * i + 1])}`;
  return { tips, d: d + " Z", facing: Math.abs(cx * cy) };
}

/** A small glass star, like the logo, tumbling through the clouds with the wind. As it passes, sheets of
    the clouds' sanded glass reach from its edges to the nearby cloud corners and let go again behind it,
    like the trails streaming off the logo star. */
export function GlassLinks() {
  const svg = useRef<SVGSVGElement>(null);
  const layer = useRef<SVGGElement>(null);
  const body = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let visible = false;
    const start = performance.now();

    const frame = (now: number) => {
      const t = ((now - start) / 1000 / SECONDS) % 1;
      const centre = path(t);
      const { tips, d: outline, facing } = star(t, centre);

      let out = "";
      for (const p of CLOUD_POINTS) {
        for (let k = 0; k < 10; k++) {
          const a = tips[(k + 9) % 10], b = tips[k];
          // Only the edges that face the corner, so a sheet never folds back over the star.
          // An edge turns away exactly when the sheet has no area left, so nothing pops.
          if (cross(a, b, p) * cross(a, b, centre) >= 0) continue;
          const d = Math.hypot((a[0] + b[0]) / 2 - p[0], (a[1] + b[1]) / 2 - p[1]);
          if (d >= REACH) continue;
          // Each sheet is a facet of the same sanded glass as the clouds, shaded by which edge it leaves from.
          out += `<polygon filter="url(#link-face${(k % 3) + 1})" opacity="${smooth(1 - d / REACH).toFixed(3)}" points="${pts([a, b, p])}"/>`;
        }
      }
      if (layer.current) layer.current.innerHTML = out;
      if (body.current) {
        body.current.setAttribute("d", outline);
        body.current.setAttribute("opacity", (0.6 + 0.4 * facing).toFixed(3));
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    // Only animate while the card is on screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    if (svg.current) io.observe(svg.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <svg ref={svg} className="field glass-links" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <defs>
        {/* The clouds' own sanded glass (glass-shards.svg, after the logo star): the shape thresholded to a
            solid body, faded by slope, softened, then grained with fractal noise. Three shades, one per edge. */}
        {[0.38, 0.3, 0.22].map((slope, i) => (
          <filter key={i} id={`link-face${i + 1}`} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -6" result="shape" />
            <feComponentTransfer in="shape" result="body"><feFuncA type="linear" slope={slope} /></feComponentTransfer>
            <feGaussianBlur in="body" stdDeviation="2.5" result="bs" />
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={11 + 2 * i} stitchTiles="stitch" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.8" result="m" />
            <feComposite in="bs" in2="m" operator="in" result="g" />
            <feComposite in="bs" in2="g" operator="arithmetic" k1="0" k2="0.6" k3="0.4" k4="0" />
          </filter>
        ))}
      </defs>
      <g fill="#fff" stroke="#fff" strokeWidth="2" strokeLinejoin="round">
        <g ref={layer} />
        <path ref={body} filter="url(#link-face1)" />
      </g>
    </svg>
  );
}
