import { hero } from "../content";
import { Button } from "./Button";
import { NavBar } from "./NavBar";
import { SpectrumField } from "./SpectrumField";

export function Hero() {
  return (
    <SpectrumField as="header" className="hero">
      <div className="wrap">
        <NavBar />
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="display on-spectrum">{hero.title}</h1>
            <p className="lead on-spectrum">{hero.lead}</p>
            <div className="btn-row">
              <Button href={hero.primary.href}>{hero.primary.label}</Button>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="/assets/hero-chrome-spectrum-transparent.svg"
              alt="The Northstar star, cut from polished chrome, reflecting the spectrum"
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </SpectrumField>
  );
}
