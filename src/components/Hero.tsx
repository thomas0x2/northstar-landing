import { hero } from "../content";
import { Button } from "./Button";
import { NavBar } from "./NavBar";
import { SpectrumField } from "./SpectrumField";

/** The hero is the spectrum star mark opened up to fill the screen: the spectrum field behind everything,
    and the glass star rising on the right, its misty trail spilling down behind the copy. */
export function Hero() {
  return (
    <SpectrumField as="main" className="hero hero-full hero-mark">
      <div className="wrap">
        <NavBar />
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="display">{hero.title}</h1>
            <p className="lead">{hero.lead}</p>
            <div className="btn-row">
              <Button href={hero.primary.href} variant="text">{hero.primary.label}</Button>
            </div>
          </div>
          <div className="hero-visual hero-star">
            <img
              src="/assets/hero-star-spectrum.svg"
              alt="The Northstar star: a milky glass star rising from below, trailing misty light"
              width={1200}
              height={1140}
            />
          </div>
        </div>
      </div>
    </SpectrumField>
  );
}
