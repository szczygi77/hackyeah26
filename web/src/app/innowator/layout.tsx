import { INNOVATOR_LINKS } from "@/lib/nav";
import { SectionNav } from "@/components/SectionNav";

export default function InnovatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SectionNav label="Panel innowatora" links={INNOVATOR_LINKS} />
      {children}
    </div>
  );
}
