/** The top bar: just the brand, linking home. Each page points to the thesis from its own copy. */
export function NavBar() {
  return (
    <div className="nav">
      <a className="brand" href="/" aria-label="Northstar home">
        <img src="/assets/mark.svg" alt="" width={44} height={33} />
        <span className="wordmark">northstar</span>
      </a>
    </div>
  );
}
