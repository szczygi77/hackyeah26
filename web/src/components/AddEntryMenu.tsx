import Link from "next/link";

export function AddEntryMenu() {
  return (
    <div className="add-entry">
      <button type="button" className="btn btn-accent btn-compact add-entry-trigger" aria-expanded="false" aria-haspopup="true">
        Dodaj
      </button>
      <div className="add-entry-panel" role="menu">
        <Link href="/#szukaj" role="menuitem">
          Mam problem
          <span className="hint">Szukaj dopasowanych innowacji</span>
        </Link>
        <Link href="/pomysl" role="menuitem">
          Mam pomysł
          <span className="hint">Złóż fiszkę / wniosek</span>
        </Link>
      </div>
    </div>
  );
}
