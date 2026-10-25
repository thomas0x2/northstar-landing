import { test } from "../content";
import { SpectrumField } from "./SpectrumField";

/** "The test": a spectrum card sitting on the black page. */
export function TestBand() {
  return (
    <section id="test" className="section section-tight">
      <div className="wrap">
        <SpectrumField as="div" className="test-card">
          <div className="test-grid">
            <div className="test-head">
              <span className="label">{test.label}</span>
              <h2 className="display on-spectrum">{test.title}</h2>
            </div>
            <div className="questions">
              {test.questions.map((q) => (
                <div className="frost-panel" key={q.key}>
                  <span className="key">{q.key}</span>
                  <span className="q">{q.text}</span>
                </div>
              ))}
            </div>
          </div>
        </SpectrumField>
      </div>
    </section>
  );
}
