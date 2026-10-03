import type { ReactNode } from "react";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { CategoryGlyph } from "@/components/CategoryGlyph";
import type { EvidenceLevel, ConfidenceLabel } from "@/lib/types";

export type ListingCardProps = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  evidenceLevel: string;
  hasVideo?: boolean;
  confidence?: ConfidenceLabel | string;
  justification?: string;
  rank?: number;
  footer?: ReactNode;
};

function getCategoryImageUrl(category: string, slug?: string): string {
  // Custom gorgeous images for specific popular innovations
  if (slug === "asystent-cyfrowy-seniora" || slug === "asystent-cyfrowy-senior") {
    return "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80"; // helper and senior with phone
  }
  if (slug === "asysta-kulturowa-w-szkole") {
    return "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80"; // diversity classroom
  }
  if (slug === "bank-czasu-sasiedzkiego") {
    return "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80"; // happy chat / sharing time
  }
  if (slug === "mobilny-klub-seniora") {
    return "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"; // active elder group
  }
  if (slug === "telefon-na-dzien-dobry") {
    return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80"; // happy call
  }

  const cat = String(category).toLowerCase();
  if (cat.includes("intelekt") || cat.includes("niepełnosprawność intelektualna")) {
    return "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80"; // warm team supportive group
  }
  if (cat.includes("bezdomn") || cat.includes("bezdomności")) {
    return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80"; // supportive care soup/giving
  }
  if (cat.includes("cudzoziem") || cat.includes("migran")) {
    return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80"; // multiethnic student group
  }
  if (cat.includes("pracy") || cat.includes("zatrudn")) {
    return "https://images.unsplash.com/photo-1521791136368-1a46827d3ad4?auto=format&fit=crop&w=400&q=80"; // handshake job mentorship
  }
  if (cat.includes("medyc") || cat.includes("zdrowie")) {
    return "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80"; // health stethoscope
  }
  if (cat.includes("sensory") || cat.includes("wzrok") || cat.includes("słuch")) {
    return "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=400&q=80"; // sensory touch/ Braille
  }
  if (cat.includes("mobiln") || cat.includes("ruch")) {
    return "https://images.unsplash.com/photo-1508847154043-be12a3bc471c?auto=format&fit=crop&w=400&q=80"; // adaptive / physical assistance
  }
  if (cat.includes("dzieci") || cat.includes("młodzież") || cat.includes("rodzin")) {
    return "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?auto=format&fit=crop&w=400&q=80"; // family children
  }
  if (cat.includes("senior")) {
    return "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80"; // caring helper with elder
  }

  return "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=400&q=80"; // fallback warm network
}

export function ListingCard({
  slug,
  title,
  summary,
  category,
  evidenceLevel,
  hasVideo,
  confidence,
  justification,
  rank,
  footer,
}: ListingCardProps) {
  const imageUrl = getCategoryImageUrl(category, slug);

  return (
    <article className="listing-card">
      <Link href={`/karta/${slug}`} className="listing-card-media" aria-hidden="true" tabIndex={-1}>
        <img src={imageUrl} alt="" className="listing-card-image" />
        <div className="listing-card-glyph-badge" title={category}>
          <CategoryGlyph category={category} size={20} className="listing-card-badge-svg" />
        </div>
        {hasVideo ? <span className="listing-card-tag">Wideo</span> : null}
        {rank != null ? <span className="listing-card-rank">#{rank}</span> : null}
      </Link>
      <div className="listing-card-body">
        <div className="listing-card-meta">
          <EvidenceBadge level={evidenceLevel as EvidenceLevel} />
          {confidence ? <ConfidenceBadge value={confidence} /> : null}
          <span className="listing-card-cat">{category}</span>
        </div>
        <div>
          <h2 className="listing-card-title">
            <Link href={`/karta/${slug}`}>{title}</Link>
          </h2>
          <p className="listing-card-summary">{summary}</p>
        </div>
        {justification ? (
          <p className="hint listing-card-why">
            <strong>Dlaczego pasuje:</strong> {justification}
          </p>
        ) : null}
        {footer ? <div className="listing-card-footer">{footer}</div> : null}
      </div>
    </article>
  );
}
