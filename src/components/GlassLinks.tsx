import { useEffect, useRef } from "react";
import { CLOUD_POINTS } from "./cloudPoints";

// In the cloud SVG's own space, so this layer lines up with glass-shards.svg.
const W = 1600;
const H = 320;
const REACH = 190; // how far a sheet stretches from the triangle to a cloud corner
const SIZE = 30;
const SECONDS = 40; // one pass across the sky

type P = [number, number];
const smooth = (t: number) => t * t * (3 - 2 * t);
const cross = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
const pts = (ps: P[]) => ps.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/** One small glass triangle drifting through the clouds with the wind. As it passes, sheets of glass
    reach from its edges to the nearby cloud corners and let go again behind it. */
export function GlassLinks() {
  const svg = useRef<SVGSVGElement>(null);
  const layer = useRef<SVGGElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let visible = false;
    const start = performance.now();

    const frame = (now: number) => {
      const t = ((now - start) / 1000 / SECONDS) % 1;
      // Right to left, like the trails, gently rising and falling and turning as it goes.
      const x = W + 140 - t * (W + 280);
      const y = 150 + 70 * Math.sin(t * Math.PI * 5);
      const spin = t * Math.PI * 5;
      const tri = [0, 1, 2].map((k): P => {
        const a = spin + (k * 2 * Math.PI) / 3;
        return [x + SIZE * Math.cos(a), y + SIZE * 0.8 * Math.sin(a)];
      });
      const centre: P = [x, y];

      let out = "";
      for (const p of CLOUD_POINTS) {
        for (let k = 0; k < 3; k++) {
          const a = tri[k], b = tri[(k + 1) % 3];
          // Only the edges that face the corner, so a sheet never folds back over the triangle.
          // An edge turns away exactly when the sheet has no area left, so nothing pops.
          if (cross(a, b, p) * cross(a, b, centre) >= 0) continue;
          const d = Math.hypot((a[0] + b[0]) / 2 - p[0], (a[1] + b[1]) / 2 - p[1]);
          if (d >= REACH) continue;
          const w = smooth(1 - d / REACH);
          out += `<polygon points="${pts([a, b, p])}" fill-opacity="${(0.28 * w).toFixed(3)}" stroke-opacity="${(0.6 * w).toFixed(3)}"/>`;
        }
      }
      out += `<polygon points="${pts(tri)}" fill-opacity="0.4" stroke-opacity="0.8"/>`;
      if (layer.current) layer.current.innerHTML = out;
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
    <svg ref={svg} className="field glass-links" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <defs>
        {/* Sanded glass, like the logo star's trails: a light blur, then grain from fractal noise. */}
        <filter id="link-glass" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="soft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.8" result="mask" />
          <feComposite in="soft" in2="mask" operator="in" result="grained" />
          <feComposite in="soft" in2="grained" operator="arithmetic" k1="0" k2="0.6" k3="0.4" k4="0" />
        </filter>
      </defs>
      <g ref={layer} filter="url(#link-glass)" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
