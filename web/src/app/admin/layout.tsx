import Link from "next/link";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth-guard";
import { ADMIN_LINKS } from "@/lib/nav";
import { SectionNav } from "@/components/SectionNav";
import { prisma } from "@/lib/db";

async function markAdminNoticesRead() {
  "use server";
  await requireRole("ADMIN");
  await prisma.notification.updateMany({
    where: { role: "ADMIN", read: false },
    data: { read: true },
  });
  redirect("/admin");
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole("ADMIN");
  const notices = await prisma.notification.findMany({
    where: { role: "ADMIN", read: false },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <SectionNav label="Panel ROPS" links={ADMIN_LINKS} />
      {notices.length > 0 ? (
        <div className="admin-alert" role="status">
          <p style={{ margin: "0 0 0.5rem" }}>
            <strong>Nowe powiadomienie ({notices.length})</strong>
          </p>
          <ul style={{ margin: "0 0 0.75rem" }}>
            {notices.map((n) => (
              <li key={n.id}>
                {n.href ? <Link href={n.href}>{n.title}</Link> : n.title}
                {n.body ? ` — ${n.body}` : ""}
              </li>
            ))}
          </ul>
          <form action={markAdminNoticesRead}>
            <button className="btn btn-secondary" type="submit">
              Oznacz jako przeczytane
            </button>
          </form>
        </div>
      ) : null}
      {children}
    </div>
  );
}
