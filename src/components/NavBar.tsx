import { nav } from "../content";

/** `current` is the href of the page being shown, marked for assistive tech. `links={false}` shows only the
    brand, for the home hero, which already points to the thesis. */
export function NavBar({ current, links = true }: { current?: string; links?: boolean }) {
  return (
    <div className="nav">
      <a className="brand" href="/" aria-label="Northstar home">
        <img src="/assets/mark.svg" alt="" width={44} height={33} />
        <span className="wordmark">northstar</span>
      </a>
      {links && <nav className="nav-links" aria-label="Main">
        {nav.links.map((l) => (
          <a key={l.label} href={l.href} aria-current={l.href === current ? "page" : undefined}>{l.label}</a>
        ))}
      </nav>}
    </div>
  );
}
