import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { parseJsonArray } from "@/lib/json";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Wymagane konto admin demo" }, { status: 401 });
  }

  const cards = await prisma.innovation.findMany({
    include: { prerequisites: true },
    orderBy: { title: "asc" },
  });

  const data = cards.map((c) => ({
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    category: c.category,
    problems: parseJsonArray(c.problemsJson),
    targets: parseJsonArray(c.targetGroupsJson),
    elements: parseJsonArray(c.elementsJson),
    challenges: parseJsonArray(c.challengeAreasJson),
    evidenceLevel: c.evidenceLevel,
    evidenceNote: c.evidenceNote,
    authorContact: c.authorContact,
    status: c.status,
    version: c.version,
    prerequisites: c.prerequisites.map((p) => ({
      type: p.type,
      weight: p.weight,
      description: p.description,
      origin: p.origin,
    })),
  }));

  return NextResponse.json(
    { exportedAt: new Date().toISOString(), count: data.length, cards: data },
    { headers: { "Content-Disposition": 'attachment; filename="szczep-karty.json"' } }
  );
}
