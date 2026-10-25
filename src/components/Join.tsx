import { join } from "../content";
import { Button } from "./Button";

export function Join() {
  return (
    <section id="join" className="section">
      <div className="wrap join">
        <div className="join-copy">
          <h2 className="display">{join.title}</h2>
          <p>{join.body}</p>
        </div>
        <div className="contact">
          <Button href={join.contact.href}>{join.contact.label}</Button>
        </div>
      </div>
    </section>
  );
}
