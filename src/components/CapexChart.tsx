import { useLayoutEffect, useRef, type CSSProperties, type RefObject } from "react";
import { thesisPage } from "../content";

const b = thesisPage.buildout;
const totals = b.years.map((y) => y.values.reduce((a, v) => a + v, 0));
const spent = totals.reduce((a, v) => a + v, 0);
const planned = totals.slice(0, -1).reduce((a, v) => a + v, 0) + b.plan2026;
const max = b.plan2026;
const n = b.years.length;

const billions = (v: number) => `$${Math.round(v)}B`;
const trillions = (v: number) => `$${(v / 1000).toFixed(2)}T`;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => t * t * (3 - 2 * t);
// Each bar grows over its own slice of the scroll, offset by `stagger`; the 2026 plan fills in over the last fifth.
const stagger = 0.08;
const barsEnd = 0.8;

/**
 * Ties the chart to scroll position. The chart is pinned while its tall track scrolls past, so the reader's
 * scrolling drives the bars to completion before the page moves on, and scrolling back up reverses them.
 * Writes CSS variables and counter text straight to the DOM, so scrolling never re-renders React.
 */
function useScrollProgress(track: RefObject<HTMLDivElement | null>, plot: RefObject<HTMLDivElement | null>, spentEl: RefObject<HTMLSpanElement | null>, plannedEl: RefObject<HTMLSpanElement | null>) {
  // Layout effect, so the first paint already shows the right scroll state rather than a flash of full bars.
  useLayoutEffect(() => {
    const trackEl = track.current, plotEl = plot.current;
    if (!trackEl || !plotEl) return;
    const cols = Array.from(plotEl.querySelectorAll<HTMLElement>(".capex-col"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const paint = (p: number) => {
      let sum = 0;
      cols.forEach((col, i) => {
        const t = clamp((p / barsEnd - i * stagger) / (1 - (n - 1) * stagger));
        col.style.setProperty("--t", String(ease(t)));
        sum += totals[i] * ease(t);
      });
      const tp = ease(clamp((p - barsEnd) / (1 - barsEnd)));
      cols[n - 1]?.style.setProperty("--tp", String(tp));
      if (spentEl.current) spentEl.current.textContent = trillions(sum);
      if (plannedEl.current) plannedEl.current.textContent = trillions(sum + (b.plan2026 - totals[n - 1]) * tp);
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      if (reduced.matches) { paint(1); return; }
      // 0 when the track's top reaches the top of the viewport (the chart pins), 1 when its bottom does (it unpins).
      const r = trackEl.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      paint(travel > 0 ? clamp(-r.top / travel) : 1);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", onScroll);
    };
  }, [track, plot, spentEl, plannedEl]);
}

/**
 * The buildout section: big-tech capital spending by year. The chart pins in view while scrolling grows the bars
 * and counts up the cumulative total, then releases the page; scrolling back up reverses it.
 */
export function CapexChart() {
  const trackRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const spentRef = useRef<HTMLSpanElement>(null);
  const plannedRef = useRef<HTMLSpanElement>(null);
  useScrollProgress(trackRef, plotRef, spentRef, plannedRef);
  return (
    <section className="section capex" aria-labelledby="buildout-title">
      <div className="capex-track" ref={trackRef}>
        <div className="capex-pin">
          <div className="wrap capex-stage">
            <div className="section-head">
              <span className="label">{b.label}</span>
              <h2 className="display" id="buildout-title">{b.title}</h2>
            </div>
            <div className="capex-totals">
              <div className="capex-total">
                <span className="capex-total-value display" ref={spentRef} aria-label={trillions(spent)}>{trillions(spent)}</span>
                <p>{b.total}</p>
              </div>
              <div className="capex-total capex-total-plan">
                <span className="capex-total-value display" ref={plannedRef} aria-label={trillions(planned)}>{trillions(planned)}</span>
                <p>{b.planTotal}</p>
              </div>
            </div>

            <div className="capex-plot" ref={plotRef} role="img" aria-label={`Bar chart of yearly capital spending, rising from ${billions(totals[0])} in 2020 to ${billions(totals[n - 2])} in 2025, with ${billions(totals[n - 1])} in the first half of 2026 against a ${billions(b.plan2026)} plan.`}>
              {b.years.map((y, i) => {
                const total = totals[i];
                const isPartial = "partial" in y;
                // The spectrum spans the whole plot, so each bar shows its own slice of it.
                const style = {
                  "--h": total / max,
                  "--bg-x": `${(i / (n - 1)) * 100}%`,
                  "--bg-w": `${n * 100}%`,
                } as CSSProperties;
                return (
                  <div className="capex-col" key={y.year} style={style} tabIndex={0} aria-describedby={`capex-tip-${y.year}`}>
                    <div className="capex-stack">
                      {isPartial && (
                        <div className="capex-plan" style={{ "--plan": (b.plan2026 - total) / max } as CSSProperties}>
                          <span className="capex-label">{billions(b.plan2026)}<small>plan</small></span>
                        </div>
                      )}
                      <div className="capex-bar">
                        <span className="capex-label">{billions(total)}{isPartial && <small>{y.partial}</small>}</span>
                      </div>
                    </div>
                    <span className="capex-year">{y.year}</span>
                    <div className="capex-tip" role="tooltip" id={`capex-tip-${y.year}`}>
                      <strong>{y.year}{isPartial && `, ${y.partial}`}</strong>
                      <dl>
                        {b.companies.map((c, j) => (
                          <div key={c}><dt>{c}</dt><dd>{billions(y.values[j])}</dd></div>
                        ))}
                        <div className="capex-tip-total"><dt>Total</dt><dd>{billions(total)}</dd></div>
                        {isPartial && <div><dt>Full-year plan</dt><dd>{billions(b.plan2026)}</dd></div>}
                      </dl>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      <div className="wrap capex-after">
        <p className="capex-note">{b.note}{b.sources.map((id) => (
          <sup className="cite" key={id}><a href={`#source-${id}`} aria-label={`Source ${id}`}>{id}</a></sup>
        ))}</p>

        <details className="capex-data">
          <summary>Show the data</summary>
          <div className="capex-table-wrap">
            <table>
              <thead>
                <tr><th scope="col">Year</th>{b.companies.map((c) => <th scope="col" key={c}>{c}</th>)}<th scope="col">Total</th></tr>
              </thead>
              <tbody>
                {b.years.map((y, i) => (
                  <tr key={y.year}>
                    <th scope="row">{y.year}{"partial" in y && ` (${y.partial})`}</th>
                    {y.values.map((v, j) => <td key={j}>{v.toFixed(1)}</td>)}
                    <td>{totals[i].toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Billions of US dollars.</p>
          </div>
        </details>
      </div>
    </section>
  );
}
