import type { LIBRARY_CATEGORIES } from "@/lib/taxonomy";

type Category = (typeof LIBRARY_CATEGORIES)[number] | string;

/** Proste piktogramy Biblioteki — ręczne SVG */
export function CategoryGlyph({
  category,
  size = 48,
  className,
}: {
  category: Category;
  size?: number;
  className?: string;
}) {
  const paths = glyphPaths(category);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={className}
    >
      {paths}
    </svg>
  );
}

function glyphPaths(category: Category) {
  switch (category) {
    case "niepełnosprawność intelektualna":
      return (
        <>
          <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M12 40c2-8 8-12 12-12s10 4 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 22h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "kryzys bezdomności":
      return (
        <>
          <path d="M8 28 L24 12 L40 28" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 26v14h24V26" stroke="currentColor" strokeWidth="2" />
          <path d="M20 40V30h8v10" stroke="currentColor" strokeWidth="2" />
        </>
      );
    case "cudzoziemcy":
      return (
        <>
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="24" cy="24" rx="6" ry="14" stroke="currentColor" strokeWidth="2" />
          <path d="M10 24h28M12 16h24M12 32h24" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "rynek pracy":
      return (
        <>
          <rect x="8" y="16" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M18 16v-4h12v4" stroke="currentColor" strokeWidth="2" />
          <path d="M8 26h32" stroke="currentColor" strokeWidth="2" />
        </>
      );
    case "zdrowie i medycyna":
      return (
        <>
          <rect x="20" y="8" width="8" height="32" rx="1" fill="currentColor" />
          <rect x="8" y="20" width="32" height="8" rx="1" fill="currentColor" />
        </>
      );
    case "niepełnosprawność sensoryczna":
      return (
        <>
          <path
            d="M8 24c6-10 12-14 16-14s10 4 16 14c-6 10-12 14-16 14S14 34 8 24Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2" />
        </>
      );
    case "ograniczona mobilność":
      return (
        <>
          <circle cx="24" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M24 16v10M18 22h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="36" r="8" stroke="currentColor" strokeWidth="2" />
          <path d="M16 36h16" stroke="currentColor" strokeWidth="2" />
        </>
      );
    case "dzieci, młodzież i rodziny":
      return (
        <>
          <circle cx="16" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="28" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M8 40c1-7 5-10 8-10M40 40c-1-7-5-10-8-10M16 40c1-6 4-8 8-8s7 2 8 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      );
    case "seniorzy":
      return (
        <>
          <circle cx="22" cy="14" r="6" stroke="currentColor" strokeWidth="2" />
          <path d="M12 40c1-10 6-14 10-14s9 4 10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M30 22c6 2 10 8 10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    default:
      return (
        <>
          <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2" />
          <path d="M24 14v12l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      );
  }
}

export function EmptyFilterIllustration({ className }: { className?: string }) {
  return (
    <svg className={className} width="120" height="80" viewBox="0 0 120 80" fill="none" aria-hidden>
      <rect x="8" y="16" width="104" height="48" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M28 40h64M40 28v24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <circle cx="78" cy="48" r="14" stroke="currentColor" strokeWidth="2" />
      <path d="M88 58l14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
