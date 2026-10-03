export function BrandMark({
  height = 52,
  className = "brand-logo",
  alt = "",
}: {
  height?: number;
  className?: string;
  alt?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-szczep.png" alt={alt} height={height} className={className} />
  );
}
