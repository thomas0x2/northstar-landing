import { useEffect, useRef } from "react";

// In the cloud SVG's own space, so this layer lines up with glass-shards.svg.
const W = 1600;
const H = 600;
const SIZE = 46;
const SECONDS = 36; // one throw across the sky

type P = [number, number];

/** Where the star is at time t (0 to 1), and how near: thrown slowly from beyond the right edge, it rises
    through the clouds beside the heading and flattens out along the top as it leaves past the left edge,
    drifting away from us as it goes. It's offscreen when one throw ends and the next begins, so it loops. */
function path(t: number) {
  const x = W + 120 - t * (W + 240);
  // Rising and slowing, like a throw near the top of its arc: steep at first, level as it leaves.
  const y = 270 - 255 * (2 * t - t * t);
  return { pos: [x, y] as P, scale: 1.15 - 0.35 * t };
}

// The logo star's outline (logo-glass-transparent.svg): each point, preceded by the control point of the
// curved edge leading to it, recentred on the star's centre of mass so it spins true, and scaled to SIZE.
const LOGO: [number, number][] = [
  [462.3, 218.9], [494.5, 242.1], [589.0, 233.4], [720.4, 198.0], [603.4, 269.3], [526.6, 321.9],
  [594.2, 438.1], [700.0, 573.1], [525.9, 496.4], [374.7, 451.3], [272.6, 500.2], [137.1, 581.6],
  [234.1, 471.9], [289.2, 388.5], [255.5, 362.4], [184.7, 338.3], [288.4, 312.2], [362.3, 276.9],
  [402.8, 234.6], [438.8, 165.8],
];
const STAR = LOGO.map(([x, y]): [number, number] => [((x - 437.7) * SIZE) / 365, ((y - 376.7) * SIZE) / 365]);
const TURNS = 27; // spins per throw, a steady three quarters of a turn a second

/** The star in flight: the curved outline through its points. It spins flat and steady about its own
    centre, the axis square to its face, like a thrown star holding its spin. */
function star(t: number, [x, y]: P, scale: number) {
  const spin = -Math.PI * 2 * TURNS * t;
  const [s, c] = [Math.sin(spin) * scale, Math.cos(spin) * scale];
  const all = STAR.map(([px, py]): P => [x + px * c - py * s, y + px * s + py * c]);
  const f = (q: P) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  let d = `M${f(all[19])}`;
  for (let i = 0; i < 10; i++) d += ` Q${f(all[2 * i])} ${f(all[2 * i + 1])}`;
  return d + " Z";
}

/** A small glass star, like the logo, thrown slowly across the sky through the clouds. */
export function ThrownStar() {
  const svg = useRef<SVGSVGElement>(null);
  const body = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let visible = false;
    const start = performance.now();

    const frame = (now: number) => {
      const t = ((now - start) / 1000 / SECONDS) % 1;
      const { pos, scale } = path(t);
      body.current?.setAttribute("d", star(t, pos, scale));
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
    <svg ref={svg} className="field thrown-star" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <defs>
        {/* Sanded glass, as on the logo star: the shape thresholded to a solid body, faded, softened, then
            grained with fractal noise. */}
        <filter id="star-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="b" />
          <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -6" result="shape" />
          <feComponentTransfer in="shape" result="body"><feFuncA type="linear" slope="0.55" /></feComponentTransfer>
          <feGaussianBlur in="body" stdDeviation="2.5" result="bs" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="17" stitchTiles="stitch" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.8" result="m" />
          <feComposite in="bs" in2="m" operator="in" result="g" />
          <feComposite in="bs" in2="g" operator="arithmetic" k1="0" k2="0.6" k3="0.4" k4="0" />
        </filter>
      </defs>
      <path ref={body} opacity="0.9" filter="url(#star-glass)" fill="#fff" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
