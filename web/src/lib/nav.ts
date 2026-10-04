export type NavLink = { href: string; label: string };

export const CATALOG_LINKS: NavLink[] = [
  { href: "/", label: "Start" },
  { href: "/zasobnik", label: "Ogłoszenia" },
  { href: "/wyzwania", label: "Wyzwania" },
];

export const MORE_LINKS: NavLink[] = [
  { href: "/partnerstwa", label: "Partnerstwa" },
  { href: "/pomysl", label: "Zgłoś pomysł" },
  { href: "/nabor/subskrypcja", label: "Alert naboru" },
  { href: "/tester", label: "Testuj" },
];

export const ADMIN_LINKS: NavLink[] = [
  { href: "/admin", label: "Pulpit" },
  { href: "/admin/queue", label: "Kolejka" },
  { href: "/admin/karty", label: "Karty" },
  { href: "/admin/karta/nowa", label: "Nowa karta" },
  { href: "/admin/nabory", label: "Nabory" },
];

export const INNOVATOR_LINKS: NavLink[] = [
  { href: "/innowator/dashboard", label: "Twoje innowacje" },
  { href: "/zasobnik", label: "Katalog" },
];

export const EXPERT_LINKS: NavLink[] = [{ href: "/ekspert", label: "Panel eksperta" }];

export type AccountKind = "GUEST" | "ADMIN" | "EXPERT" | "INNOVATOR";

export function linkIsCurrent(pathname: string, href: string, links: NavLink[]): boolean {
  if (href === "/" || href === "/admin") return pathname === href;
  const matches = pathname === href || pathname.startsWith(`${href}/`);
  if (!matches) return false;
  return !links.some(
    (other) =>
      other.href !== href &&
      other.href.length > href.length &&
      (pathname === other.href || pathname.startsWith(`${other.href}/`))
  );
}
