import { footer } from "../content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span className="wordmark">northstar</span>
        <span>{footer.place} · © {footer.year}</span>
      </div>
    </footer>
  );
}
