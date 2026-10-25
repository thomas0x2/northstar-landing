import { nav } from "../content";
import { Button } from "./Button";

export function NavBar() {
  return (
    <div className="nav">
      <a className="brand" href="#" aria-label="Northstar home">
        <img src="/assets/mark.svg" alt="" width={44} height={33} />
        <span className="wordmark">northstar</span>
      </a>
      <nav className="nav-links" aria-label="Main">
        {nav.links.map((l) => (
          <a key={l.label} href={l.href}>{l.label}</a>
        ))}
        <Button href={nav.cta.href} variant="frost">{nav.cta.label}</Button>
      </nav>
    </div>
  );
}
