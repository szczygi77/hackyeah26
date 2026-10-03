import { redirect } from "next/navigation";

async function headerSearchAction(formData: FormData) {
  "use server";
  const q = String(formData.get("q") || "").trim();
  if (!q) redirect("/#szukaj");
  redirect(`/wyniki?q=${encodeURIComponent(q)}`);
}

export function HeaderSearch() {
  return (
    <form action={headerSearchAction} className="header-search" role="search">
      <label htmlFor="header-q" className="sr-only">
        Szukaj innowacji lub opisz problem
      </label>
      <input
        id="header-q"
        name="q"
        type="search"
        placeholder="Szukaj innowacji lub opisz problem…"
        autoComplete="off"
      />
      <button type="submit" className="btn btn-compact">
        Szukaj
      </button>
    </form>
  );
}
