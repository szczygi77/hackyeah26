"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";

const LINKS = [
  { href: "/zasobnik", label: "Ogłoszenia" },
  { href: "/wyzwania", label: "Wyzwania" },
  { href: "/partnerstwa", label: "Partnerstwa" },
  { href: "/tester", label: "Jak to działa" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-row">
        <Link href="/" className="brand" aria-label="Szczep — strona główna">
          <BrandMark alt="Szczep — Hub innowacji społecznych, ROPS Kraków" />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <nav id="main-nav" className="nav" aria-label="Główne" data-open={open ? "true" : undefined}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/#szukaj" className="header-cta" onClick={() => setOpen(false)}>
            Opisz problem
          </Link>
        </nav>
      </div>
    </header>
  );
}
