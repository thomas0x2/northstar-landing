import { useEffect, useRef, useState, type CSSProperties } from "react";
import { thesisPage } from "../content";

const b = thesisPage.buildout;
const totals = b.years.map((y) => y.values.reduce((a, v) => a + v, 0));
const spent = totals.reduce((a, v) => a + v, 0);
const planned = totals.slice(0, -1).reduce((a, v) => a + v, 0) + b.plan2026;
const max = b.plan2026;
const n = b.years.length;

const billions = (v: number) => `$${Math.round(v)}B`;
const trillions = (v: number) => `$${(v / 1000).toFixed(2)}T`;

/** True once the element has scrolled into view (immediately when the reader prefers reduced motion). */
function useRevealed<T extends Element>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, revealed] as const;
}

/** A number that counts up from zero once `run` turns true. */
function CountUp({ to, run, format, duration = 1900 }: { to: number; run: boolean; format: (v: number) => string; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, duration]);
  return <>{format(v)}</>;
}

/** Big-tech capital spending by year: bars grow in on scroll while the cumulative total counts up. */
export function CapexChart() {
  const [ref, revealed] = useRevealed<HTMLDivElement>();
  return (
    <div className={`capex${revealed ? " is-revealed" : ""}`} ref={ref}>
      <div className="capex-totals">
        <div className="capex-total">
          <span className="capex-total-value display"><CountUp to={spent} run={revealed} format={trillions} /></span>
          <p>{b.total}</p>
        </div>
        <div className="capex-total capex-total-plan">
          <span className="capex-total-value display"><CountUp to={planned} run={revealed} format={trillions} duration={2600} /></span>
          <p>{b.planTotal}</p>
        </div>
      </div>

      <div className="capex-plot" role="img" aria-label={`Bar chart of yearly capital spending, rising from ${billions(totals[0])} in 2020 to ${billions(totals[n - 2])} in 2025, with ${billions(totals[n - 1])} in the first half of 2026 against a ${billions(b.plan2026)} plan.`}>
        {b.years.map((y, i) => {
          const total = totals[i];
          const isPartial = "partial" in y;
          // The spectrum spans the whole plot, so each bar shows its own slice of it.
          const style = {
            "--h": total / max,
            "--delay": `${i * 110}ms`,
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
  );
}
