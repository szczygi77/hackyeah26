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

const CARD_PHOTOS = [
  "photo-1529156069898-49953e39b3ac",
  "photo-1469571486292-0ba58a3f068b",
  "photo-1559027615-cd4628902d4a",
  "photo-1582213782179-e0d53f98f2ca",
  "photo-1573496359142-b8d87734a5a2",
  "photo-1517048676732-d65bc937f952",
  "photo-1543269865-cbf427effbad",
  "photo-1523240795612-9a054b0db644",
  "photo-1573497019940-1c28c88b4f3e",
  "photo-1488521787991-ed7bbaae773c",
  "photo-1503676260728-1c00da094a0b",
  "photo-1544025162-d76694265947",
  "photo-1516627145497-ae6968895b74",
  "photo-1489659639091-8b687bc4386e",
  "photo-1521737711867-e3b97375f902",
  "photo-1576091160399-112ba8d25d1d",
  "photo-1522071820081-009f0129c71c",
  "photo-1551836022-d5d88e9218df",
  "photo-1600880292203-757bb62b4baf",
  "photo-1531482615713-2afd69097998",
  "photo-1427504494785-3a9ca7044f45",
  "photo-1509062522246-3755977927d7",
  "photo-1491438590914-bc09fcaaf77a",
  "photo-1511632765486-a01980e01a18",
  "photo-1593113598332-cd288d649433",
  "photo-1517245386807-bb43f82c33c4",
  "photo-1573497019236-17f8177b81e8",
  "photo-1454165804606-c3d57bc86b40",
  "photo-1522202176988-66273c2fd55f",
  "photo-1576765608535-5f04d1e3f289",
  "photo-1517486808906-6ca8b3f04846",
  "photo-1531206715517-5c0ba140b2b8",
  "photo-1505751172876-fa1923c5c528",
  "photo-1581579438747-1dc8d17bbce4",
  "photo-1475721027785-f74eccf877e2",
  "photo-1509099836639-18ba1795216d",
  "photo-1544716278-ca5e3f4abd8c",
  "photo-1438761681033-6461ffad8d80",
  "photo-1500648767791-00dcc994a43e",
  "photo-1524504388940-b1c1722653e1",
];

const KNOWN_SLUGS = [
  "telefon-na-dzien-dobry",
  "klub-seniora-mobilny",
  "asystent-cyfrowy-senior",
  "mieszkanie-treningowe-start",
  "kolo-wsparcia-rodzicow",
  "nocleg-pomost-mlodzi",
  "szafa-pierwsza-pomoc",
  "asysta-kulturowa-szkola",
  "kurs-jezyka-branzoowego",
  "zatrudnienie-wspomagane",
  "spoldzielnia-sasiedzka",
  "grupa-wsparcia-opiekunow",
  "pierwsza-pomoc-psychiczna-szkola",
  "powrot-do-pracy-po-kryzysie",
  "tlumacz-migowy-mobilny",
  "audiodeskrypcja-lokalna",
  "transport-sasiedzki",
  "dom-bez-barier-doradztwo",
  "rodzina-zastepcza-tandem",
  "swietlica-pomost",
  "bank-czasu-sasiedzkiego",
  "punkt-informacji-uchodzczej",
  "trener-zatrudnienia-wspomaganego",
  "punkt-interwencji-kryzysowej",
  "wsparcie-traumy-w-pieczy",
  "partnerstwo-uslug-es",
];

const SLUG_PHOTO = Object.fromEntries(KNOWN_SLUGS.map((slug, index) => [slug, CARD_PHOTOS[index]]));

function photoUrl(id: string): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
}

function getCategoryImageUrl(category: string, slug?: string): string {
  const assigned = slug ? SLUG_PHOTO[slug] : undefined;
  if (assigned) return photoUrl(assigned);
  const key = slug || category;
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return photoUrl(CARD_PHOTOS[hash % CARD_PHOTOS.length]);
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
        <img src={imageUrl} alt="" className="listing-card-image" referrerPolicy="no-referrer" />
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
