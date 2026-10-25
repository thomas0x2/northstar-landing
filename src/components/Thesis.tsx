import { thesis } from "../content";

export function Thesis() {
  return (
    <section id="thesis" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="label">{thesis.label}</span>
          <h2 className="display">{thesis.title}</h2>
        </div>
        <div className="cards">
          {thesis.points.map((p, i) => (
            <article className="card" key={p.title}>
              <div className="num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
