import { thesisPage } from "../content";
import { NavBar } from "./NavBar";
import { SpectrumField } from "./SpectrumField";
import { Join } from "./Join";
import { Footer } from "./Footer";
import { CapexChart } from "./CapexChart";

/** A superscript link to an entry in the sources list at the foot of the page. */
function Cite({ id }: { id: number }) {
  return <sup className="cite"><a href={`#source-${id}`} aria-label={`Source ${id}`}>{id}</a></sup>;
}

function Head({ label, title }: { label: string; title?: string }) {
  return (
    <div className="section-head">
      <span className="label">{label}</span>
      {title && <h2 className="display">{title}</h2>}
    </div>
  );
}

const num = (i: number) => String(i + 1).padStart(2, "0");

/** The thesis page: a spectrum header, vision and mission, a numbers band, the buildout chart, then the case on black. */
export function ThesisPage() {
  const v = thesisPage;
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <SpectrumField as="header" className="hero page-hero">
        <div className="wrap">
          <NavBar current="/thesis/" />
          <div className="page-hero-copy">
            <span className="label">{v.label}</span>
            <h1 className="display">{v.title}</h1>
            <p className="lead">{v.lead}</p>
          </div>
        </div>
      </SpectrumField>
      <main id="main">
        <section className="section" aria-label="Vision and mission">
          <div className="wrap statements">
            {v.statements.map((s) => (
              <article className="card statement" key={s.label}>
                <span className="label">{s.label}</span>
                <p className="display">{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-tight" aria-labelledby="numbers-title">
          <div className="wrap">
            <SpectrumField as="div" className="test-card">
              <div className="numbers">
                <div className="section-head">
                  <span className="label">{v.numbers.label}</span>
                  <h2 className="display" id="numbers-title">{v.numbers.title}</h2>
                </div>
                <div className="stats">
                  {v.numbers.stats.map((s) => (
                    <div className="stat" key={s.value}>
                      <span className="stat-value">{s.value}<Cite id={s.source} /></span>
                      <p>{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SpectrumField>
          </div>
        </section>

        <section className="section" aria-labelledby="buildout-title">
          <div className="wrap">
            <div className="section-head">
              <span className="label">{v.buildout.label}</span>
              <h2 className="display" id="buildout-title">{v.buildout.title}</h2>
            </div>
            <CapexChart />
          </div>
        </section>

        <section className="section section-flush">
          <div className="wrap">
            <Head label={v.thesis.label} title={v.thesis.title} />
            <div className="cards">
              {v.thesis.layers.map((l, i) => (
                <article className="card" key={l.title}>
                  <div className="num">{num(i)}</div>
                  <h3>{l.title}</h3>
                  <p>{l.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-flush">
          <div className="wrap">
            <Head label={v.bet.label} title={v.bet.title} />
            <div className="prose">
              {v.bet.body.map((p, i) => <p key={p}>{p}{i === 0 && <Cite id={1} />}</p>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Head label={v.lockins.label} title={v.lockins.title} />
            <div className="cards cards-four">
              {v.lockins.items.map((l, i) => (
                <article className="card" key={l.title}>
                  <div className="num">{num(i)}</div>
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
            <Head label={v.edge.label} />
            <div className="method">
              {v.edge.points.map((p) => (
                <div key={p.title}><h3>{p.title}</h3><p>{p.body}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Head label={v.approach.label} title={v.approach.title} />
            <div className="method">
              {v.approach.points.map((p) => (
                <div key={p.title}><h3>{p.title}</h3><p>{p.body}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-flush">
          <div className="wrap">
            <Head label={v.test.label} title={v.test.title} />
            <div className="cards cards-four">
              {v.test.questions.map((q) => (
                <article className="card" key={q.key}>
                  <div className="num">{q.key}</div>
                  <h3>{q.text}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Head label={v.loop.label} title={v.loop.title} />
            <p className="prose-lead">{v.loop.intro}<Cite id={v.loop.source} /></p>
            <ol className="loop">
              {v.loop.steps.map((s, i) => (
                <li key={s}><span className="num">{num(i)}</span><span>{s}</span></li>
              ))}
            </ol>
            <p className="prose-lead">{v.loop.outro}</p>
          </div>
        </section>

        <section className="section section-flush">
          <div className="wrap split">
            <div>
              <Head label={v.alignment.label} title={v.alignment.title} />
              <p className="body-muted">{v.alignment.body}</p>
            </div>
            <div>
              <Head label={v.europe.label} title={v.europe.title} />
              <p className="body-muted">{v.europe.body}<Cite id={1} /><Cite id={6} /></p>
            </div>
          </div>
        </section>

        {/* Back on the spectrum, with the blue read as clear sky after a storm. */}
        <section className="section section-tight">
          <div className="wrap">
            <SpectrumField as="div" className="test-card agency-card">
              <div className="sky" aria-hidden="true">
                {[1, 2, 3, 4].map((n) => <span key={n} className={`cloud cloud-${n}`} />)}
                <div className="flock">
                  {[1, 2, 3, 4, 5].map((n) => <span key={n} className={`bird bird-${n}`} />)}
                </div>
              </div>
              <div className="agency">
                <Head label={v.agency.label} title={v.agency.title} />
                <div className="prose">
                  {v.agency.body.map((p) => <p key={p}>{p}</p>)}
                </div>
                <p className="agency-close display">{v.agency.close}</p>
              </div>
            </SpectrumField>
          </div>
        </section>

        <Join />

        <section className="section section-flush" aria-labelledby="sources-title">
          <div className="wrap">
            <h2 className="label" id="sources-title">Sources</h2>
            <ol className="sources">
              {v.sources.map((s) => (
                <li key={s.id} id={`source-${s.id}`}><a href={s.href} target="_blank" rel="noreferrer">{s.text}</a></li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
