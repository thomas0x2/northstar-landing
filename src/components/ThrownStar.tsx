import { useEffect, useRef } from "react";

// In the cloud SVG's own space, so this layer lines up with glass-shards.svg.
const W = 1600; // the cloud SVG is 1600 x 600
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

const TURNS = 8; // a slow, steady turn about its own centre over the whole flight
const SPRITE = 160; // glass-star.svg's span, in the sky's units, at scale 1
const MAX_SCALE = 0.85 / NEAR; // the sprite is laid out this big, so it's only ever scaled down and stays sharp

/** The star's CSS transform at time t, with k CSS pixels to one sky unit. It turns slowly about the axis
    square to its face, and that face is banked about the line it's travelling along (its foreshortening
    across the heading), then the whole thing is turned to face along its heading and put in place. */
function transform(t: number, k: number) {
  const { pos: [x, y], scale, heading, bank } = path(t);
  const spin = -Math.PI * 2 * TURNS * t;
  const [ss, cs, cb, sh, ch] = [Math.sin(spin), Math.cos(spin), Math.cos(bank), Math.sin(heading), Math.cos(heading)];
  const m = scale / MAX_SCALE;
  // heading rotation · bank squash · spin rotation, scaled
  const [a, b, c, d] = [
    m * (ch * cs - sh * cb * ss), m * (sh * cs + ch * cb * ss),
    m * (-ch * ss - sh * cb * cs), m * (-sh * ss + ch * cb * cs),
  ];
  return `matrix(${a.toFixed(4)},${b.toFixed(4)},${c.toFixed(4)},${d.toFixed(4)},${(x * k).toFixed(1)},${(y * k).toFixed(1)})`;
}

/** A small glass star, like the logo, swooping across the sky through the clouds. The star is one
    pre-rendered image moved only by its transform, so the page never repaints while it flies. */
export function ThrownStar() {
  const field = useRef<HTMLDivElement>(null);
  const sprite = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !field.current || !sprite.current) return;
    const [box, img] = [field.current, sprite.current];
    let raf = 0;
    let visible = false;
    let k = 1;
    const start = performance.now();

    const fit = () => {
      k = box.clientWidth / W;
      const size = SPRITE * MAX_SCALE * k;
      Object.assign(img.style, { width: `${size}px`, height: `${size}px`, left: `${-size / 2}px`, top: `${-size / 2}px` });
    };
    const frame = (now: number) => {
      img.style.transform = transform(((now - start) / 1000 / SECONDS) % 1, k);
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    fit();
    img.hidden = false;
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    // Only animate while the card is on screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(box);
    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={field} className="field thrown-star" aria-hidden="true">
      <img ref={sprite} src="/assets/glass-star.svg" alt="" hidden />
    </div>
  );
}
