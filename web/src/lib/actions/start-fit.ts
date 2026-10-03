"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function startFitFromCard(formData: FormData) {
  const innovationId = String(formData.get("innovationId") || "");
  const queryText = String(formData.get("queryText") || "sprawdzenie z karty");
  if (!innovationId) redirect("/zasobnik");

  const m = await prisma.match.create({
    data: {
      innovationId,
      queryText,
      rank: 1,
      score: 1,
      confidence: "MEDIUM",
      justification: "Uruchomiono z karty ogłoszenia — dopasowanie do weryfikacji lokalnej.",
      quote: "",
    },
  });
  redirect(`/sprawdz/${m.id}`);
}
