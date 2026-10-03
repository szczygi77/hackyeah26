import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Wymagane konto admin demo" }, { status: 401 });
  }

  const subs = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
    select: {
      publicId: true,
      type: true,
      status: true,
      title: true,
      body: true,
      possibleGap: true,
      area: true,
      challengeSlug: true,
      createdAt: true,
      innovationId: true,
    },
  });

  return NextResponse.json(
    { exportedAt: new Date().toISOString(), count: subs.length, submissions: subs },
    { headers: { "Content-Disposition": 'attachment; filename="szczep-zgloszenia.json"' } }
  );
}
