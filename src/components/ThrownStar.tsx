import { useEffect, useRef } from "react";

// In the cloud SVG's own space, so this layer lines up with glass-shards.svg.
const W = 1600;
const H = 600;
const SIZE = 56;
const SECONDS = 30; // one flight across the sky

type P = [number, number];

// The flight, as in the Paramount intro: the star swoops in close from below the right edge and sweeps
// away from us along a long arc over the top, leaving small and far past the left edge. On screen that arc
// is this curve; its depth sets the star's size, and since the star moves at a steady speed through space,
// it races by while near and drifts once far away.
const ARC: P[] = [[1760, 600], [1240, 120], [640, -10], [-90, 40]];
const NEAR = 0.32, FAR = 2.3; // distance from us at the start and end of the arc

function onArc(u: number): P {
  const v = 1 - u;
  const [a, b, c, d] = ARC;
  const w = [v * v * v, 3 * v * v * u, 3 * v * u * u, u * u * u];
  return [w[0] * a[0] + w[1] * b[0] + w[2] * c[0] + w[3] * d[0], w[0] * a[1] + w[1] * b[1] + w[2] * c[1] + w[3] * d[1]];
}
const depth = (u: number) => NEAR + (FAR - NEAR) * Math.pow(u, 1.25);

// Time along the arc: each step on screen, scaled up by its depth, is the same distance through space.
const STEPS = 400;
const CLOCK = (() => {
  const c = [0];
  for (let i = 1; i <= STEPS; i++) {
    const [p, q] = [onArc((i - 1) / STEPS), onArc(i / STEPS)];
    c.push(c[i - 1] + Math.hypot(q[0] - p[0], q[1] - p[1]) * depth((i - 0.5) / STEPS));
  }
  return c.map((x) => x / c[STEPS]);
})();

/** Where the star is at time t (0 to 1): its place on screen, its size, which way it's heading, and how far
    it is banked into the curve. It's offscreen when one flight ends and the next begins, so it loops. */
function path(t: number) {
  let i = 1;
  while (i < STEPS && CLOCK[i] < t) i++;
  const u = (i - 1 + (t - CLOCK[i - 1]) / (CLOCK[i] - CLOCK[i - 1] || 1)) / STEPS;
  const [p, q] = [onArc(Math.max(0, u - 0.002)), onArc(Math.min(1, u + 0.002))];
  return {
    pos: onArc(u),
    scale: 0.85 / depth(u),
    heading: Math.atan2(q[1] - p[1], q[0] - p[0]),
    // Banked hard while it swings past us, settling nearly face-on as it recedes.
    bank: 0.95 - 0.7 * u,
  };
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
const TURNS = 8; // a slow, steady turn about its own centre over the whole flight

/** The star in flight, seen in perspective: the curved outline through its points. It turns slowly about
    the axis square to its face, and that face is banked about the line it's travelling along. */
function star(t: number, { pos: [x, y], scale, heading, bank }: ReturnType<typeof path>) {
  const spin = -Math.PI * 2 * TURNS * t;
  const [ss, cs, sb, cb, sh, ch] = [Math.sin(spin), Math.cos(spin), Math.sin(bank), Math.cos(bank), Math.sin(heading), Math.cos(heading)];
  const focal = SIZE * 6;
  const all = STAR.map(([px, py]): P => {
    [px, py] = [px * scale, py * scale];
    // Spin in the star's own plane, bank it about its direction of travel (here the x axis), then turn
    // the whole thing to face along its heading.
    [px, py] = [px * cs - py * ss, px * ss + py * cs];
    const pz = py * sb;
    py = py * cb;
    const s = focal / (focal + pz);
    [px, py] = [px * s, py * s];
    return [x + px * ch - py * sh, y + px * sh + py * ch];
  });
  const f = (q: P) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  let d = `M${f(all[19])}`;
  for (let i = 0; i < 10; i++) d += ` Q${f(all[2 * i])} ${f(all[2 * i + 1])}`;
  return d + " Z";
}

/** A small glass star, like the logo, swooping across the sky through the clouds. */
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
      body.current?.setAttribute("d", star(t, path(t)));
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
