import Link from "next/link";
import { getSession } from "@/lib/session";
import { BrandMark } from "@/components/BrandMark";

export async function SiteFooter() {
  const session = await getSession();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <BrandMark height={40} alt="Szczep — Hub innowacji społecznych" />
          <p className="footer-lead">
            Biblioteka sprawdzonych innowacji społecznych dla gmin i organizacji z Małopolski.
          </p>
        </div>
        <nav className="footer-col" aria-label="Odkryj">
          <p className="footer-heading">Odkryj</p>
          <ul>
            <li>
              <Link href="/zasobnik">Ogłoszenia</Link>
            </li>
            <li>
              <Link href="/wyzwania">Wyzwania</Link>
            </li>
            <li>
              <Link href="/partnerstwa">Partnerstwa</Link>
            </li>
          </ul>
        </nav>
        <nav className="footer-col" aria-label="Pomoc">
          <p className="footer-heading">Pomoc</p>
          <ul>
            <li>
              <Link href="/tester">Jak to działa</Link>
            </li>
            <li>
              <Link href="/pomysl">Zgłoś pomysł</Link>
            </li>
            <li>
              <Link href="/nabor/subskrypcja">Nabory</Link>
            </li>
          </ul>
        </nav>
        <nav className="footer-col" aria-label="ROPS">
          <p className="footer-heading">ROPS</p>
          <ul>
            {session.isLoggedIn ? (
              <>
                {session.role === "ADMIN" && (
                  <li>
                    <Link href="/admin">Panel ROPS</Link>
                  </li>
                )}
                {session.role === "EXPERT" && (
                  <li>
                    <Link href="/ekspert">Panel eksperta</Link>
                  </li>
                )}
                <li>
                  <form action="/api/auth/logout" method="post">
                    <button type="submit" className="footer-logout">
                      Wyloguj
                    </button>
                  </form>
                </li>
              </>
            ) : (
              <li>
                <Link href="/logowanie">Dla pracowników ROPS</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ROPS Kraków — Małopolski Hub Innowacji Społecznych.</p>
        <p className="footer-meta">Prototyp pilotażowy. Bez danych osób trzecich. Bez logowania.</p>
      </div>
    </footer>
  );
}
