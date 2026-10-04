import { requireRole } from "@/lib/auth-guard";
import { ADMIN_LINKS } from "@/lib/nav";
import { SectionNav } from "@/components/SectionNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole("ADMIN");
  return (
    <div>
      <SectionNav label="Panel ROPS" links={ADMIN_LINKS} />
      {children}
    </div>
  );
}
