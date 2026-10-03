import { notFound } from "next/navigation";
import { AdaptNotFoundError } from "@/lib/adapt";
import { getCatalogInnovation } from "@/lib/catalog";
import { RagConfigError, RagUpstreamError } from "@/lib/rag";
import { InnovationCard } from "@/components/InnovationCard";

export default async function InnowacjaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const innovation = await getCatalogInnovation(id);
    return <InnovationCard innovation={innovation} />;
  } catch (error) {
    if (error instanceof AdaptNotFoundError) notFound();
    const message =
      error instanceof RagConfigError || error instanceof RagUpstreamError
        ? error.message
        : "Nie udało się wczytać karty.";
    return (
      <p className="mx-auto max-w-3xl py-10 text-lg text-[var(--low)]" role="alert">
        {message}
      </p>
    );
  }
}
