import { footer } from "../content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span className="footer-brand">
          <img src="/assets/mark.svg" alt="" width={32} height={24} />
          <span className="wordmark">northstar</span>
        </span>
        <span>{footer.place} · © {footer.year}</span>
      </div>
    </footer>
  );
}
