import { notFound } from "next/navigation";
import { AdaptNotFoundError } from "@/lib/adapt";
import { getCatalogInnovation, listSurveys } from "@/lib/catalog";
import { RagConfigError, RagUpstreamError } from "@/lib/rag";
import { InnovationDetails } from "@/components/InnovationDetails";

export default async function InnowacjaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const innovation = await getCatalogInnovation(id);
    const surveys = await listSurveys(id);
    return <InnovationDetails innovation={innovation} surveys={surveys} />;
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
