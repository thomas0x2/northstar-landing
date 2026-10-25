import { vision } from "../content";
import { NavBar } from "./NavBar";
import { SpectrumField } from "./SpectrumField";
import { Join } from "./Join";
import { Footer } from "./Footer";

/** The vision and mission page: a short spectrum header, then the case on black. */
export function VisionPage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <SpectrumField as="header" className="hero page-hero">
        <div className="wrap">
          <NavBar current="/vision/" />
          <div className="page-hero-copy">
            <span className="label">{vision.label}</span>
            <h1 className="display">{vision.title}</h1>
            <p className="lead">{vision.lead}</p>
          </div>
        </div>
      </SpectrumField>
      <main id="main">
        <section className="section" aria-label="Vision and mission">
          <div className="wrap statements">
            {vision.statements.map((s) => (
              <article className="statement" key={s.label}>
                <span className="label">{s.label}</span>
                <p className="display">{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-flush">
          <div className="wrap">
            <div className="section-head">
              <span className="label">{vision.why.label}</span>
              <h2 className="display">{vision.why.title}</h2>
            </div>
            <div className="prose">
              {vision.why.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <span className="label">{vision.lockins.label}</span>
              <h2 className="display">{vision.lockins.title}</h2>
            </div>
            <div className="cards cards-five">
              {vision.lockins.items.map((l, i) => (
                <article className="card" key={l.title}>
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{l.title}</h3>
                  <p><strong>Why they're stuck.</strong> {l.stuck}</p>
                  <p><strong>What we explore.</strong> {l.explore}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-flush">
          <div className="wrap">
            <div className="section-head">
              <span className="label">{vision.method.label}</span>
            </div>
            <div className="method">
              {vision.method.points.map((p) => (
                <div key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Join />
      </main>
      <Footer />
    </>
  );
}
