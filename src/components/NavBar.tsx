import { nav } from "../content";

/** `current` is the href of the page being shown, marked for assistive tech. */
export function NavBar({ current }: { current?: string }) {
  return (
    <div className="nav">
      <a className="brand" href="/" aria-label="Northstar home">
        <img src="/assets/mark.svg" alt="" width={44} height={33} />
        <span className="wordmark">northstar</span>
      </a>
      <nav className="nav-links" aria-label="Main">
        {nav.links.map((l) => (
          <a key={l.label} href={l.href} aria-current={l.href === current ? "page" : undefined}>{l.label}</a>
        ))}
      </nav>
    </div>
  );
}
