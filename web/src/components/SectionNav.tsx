"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { linkIsCurrent, type NavLink } from "@/lib/nav";

export function SectionNav({ label, links }: { label: string; links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav className="section-nav" aria-label={label}>
      {links.map((link) => (
        <Link key={link.href} href={link.href} aria-current={linkIsCurrent(pathname, link.href, links) ? "page" : undefined}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
