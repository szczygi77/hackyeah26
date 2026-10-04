import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { getAccountKind } from "@/lib/account";
import { signOutInnovator } from "@/lib/actions/sign-out-innovator";
import { CATALOG_LINKS, MORE_LINKS } from "@/lib/nav";

export async function SiteFooter() {
  const account = await getAccountKind();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <BrandMark height={40} alt="Szczep — Hub innowacji społecznych" />
          <p className="footer-lead">
            Biblioteka sprawdzonych innowacji społecznych dla gmin i organizacji z Małopolski.
          </p>
        </div>
        <nav className="footer-col" aria-label="Katalog">
          <p className="footer-heading">Katalog</p>
          <ul>
            {CATALOG_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-col" aria-label="Więcej">
          <p className="footer-heading">Więcej</p>
          <ul>
            {MORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-col" aria-label="Konto">
          <p className="footer-heading">Konto</p>
          <ul>
            {account === "ADMIN" && (
              <li>
                <Link href="/admin">Panel ROPS</Link>
              </li>
            )}
            {account === "EXPERT" && (
              <li>
                <Link href="/ekspert">Panel eksperta</Link>
              </li>
            )}
            {account === "INNOVATOR" && (
              <li>
                <Link href="/innowator/dashboard">Twoje innowacje</Link>
              </li>
            )}
            {account === "GUEST" && (
              <>
                <li>
                  <Link href="/logowanie">Pracownik ROPS</Link>
                </li>
                <li>
                  <Link href="/login">Innowator</Link>
                </li>
              </>
            )}
            {account === "ADMIN" || account === "EXPERT" ? (
              <li>
                <form action="/api/auth/logout" method="post">
                  <button type="submit" className="footer-logout">
                    Wyloguj
                  </button>
                </form>
              </li>
            ) : null}
            {account === "INNOVATOR" && (
              <li>
                <form action={signOutInnovator}>
                  <button type="submit" className="footer-logout">
                    Wyloguj
                  </button>
                </form>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="footer-bottom">
        <p className="footer-meta">Prototyp pilotażowy. Bez danych osób trzecich.</p>
      </div>
    </footer>
  );
}
