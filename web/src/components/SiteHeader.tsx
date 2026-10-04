"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { signOutInnovator } from "@/lib/actions/sign-out-innovator";
import {
  ADMIN_LINKS,
  CATALOG_LINKS,
  EXPERT_LINKS,
  INNOVATOR_LINKS,
  MORE_LINKS,
  linkIsCurrent,
  type AccountKind,
  type NavLink,
} from "@/lib/nav";

function NavMenu({
  label,
  links,
  onNavigate,
  extra,
}: {
  label: string;
  links: NavLink[];
  onNavigate: () => void;
  extra?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  const active = links.some((link) => linkIsCurrent(pathname, link.href, links));

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="nav-menu" ref={rootRef}>
      <button
        type="button"
        className="nav-menu-button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={active ? "page" : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </button>
      {open && (
        <div id={panelId} className="nav-menu-panel" role="group" aria-label={label}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={linkIsCurrent(pathname, link.href, links) ? "page" : undefined}
              onClick={() => {
                setOpen(false);
                onNavigate();
              }}
            >
              {link.label}
            </Link>
          ))}
          {extra}
        </div>
      )}
    </div>
  );
}

function LogoutForm({ action, onNavigate }: { action: string | (() => void); onNavigate: () => void }) {
  if (typeof action === "string") {
    return (
      <form action={action} method="post">
        <button type="submit" onClick={onNavigate}>
          Wyloguj
        </button>
      </form>
    );
  }
  return (
    <form action={action}>
      <button type="submit" onClick={onNavigate}>
        Wyloguj
      </button>
    </form>
  );
}

export function SiteHeader({ account }: { account: AccountKind }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  const accountLinks =
    account === "ADMIN" ? ADMIN_LINKS : account === "EXPERT" ? EXPERT_LINKS : account === "INNOVATOR" ? INNOVATOR_LINKS : [];
  const accountLabel =
    account === "ADMIN" ? "Panel ROPS" : account === "EXPERT" ? "Panel eksperta" : account === "INNOVATOR" ? "Twoje innowacje" : "Zaloguj";

  return (
    <header className="site-header">
      <div className="site-header-row">
        <Link href="/" className="brand" aria-label="Szczep — strona główna" onClick={close}>
          <BrandMark alt="Szczep — Hub innowacji społecznych, ROPS Kraków" />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <nav id="main-nav" className="nav" aria-label="Główne" data-open={open ? "true" : undefined}>
          <p className="nav-label">Katalog</p>
          {CATALOG_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={linkIsCurrent(pathname, link.href, CATALOG_LINKS) ? "page" : undefined}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
          <p className="nav-label">Więcej</p>
          <NavMenu label="Więcej" links={MORE_LINKS} onNavigate={close} />
          <Link href="/#szukaj" className="header-cta" onClick={close}>
            Opisz problem
          </Link>
          <p className="nav-label">Konto</p>
          {account === "GUEST" ? (
            <NavMenu
              label="Zaloguj"
              links={[
                { href: "/logowanie", label: "Pracownik ROPS" },
                { href: "/login", label: "Innowator" },
              ]}
              onNavigate={close}
            />
          ) : (
            <NavMenu
              label={accountLabel}
              links={accountLinks}
              onNavigate={close}
              extra={
                <LogoutForm
                  action={account === "INNOVATOR" ? signOutInnovator : "/api/auth/logout"}
                  onNavigate={close}
                />
              }
            />
          )}
        </nav>
      </div>
    </header>
  );
}
