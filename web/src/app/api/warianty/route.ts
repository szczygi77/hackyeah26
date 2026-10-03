import { NextResponse } from "next/server";
import { AdaptNotFoundError, generateAdaptationVariants, isInnovationId } from "@/lib/adapt";
import { RagConfigError, RagUpstreamError } from "@/lib/rag";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Niepoprawny JSON" }, { status: 400 });
  }

  const innovationId =
    body && typeof body === "object" && "innovationId" in body
      ? (body as { innovationId: unknown }).innovationId
      : undefined;

  if (!isInnovationId(innovationId)) {
    return NextResponse.json({ error: "innovationId musi być UUID" }, { status: 400 });
  }

  try {
    const variants = await generateAdaptationVariants(innovationId);
    return NextResponse.json(variants);
  } catch (error) {
    if (error instanceof AdaptNotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error instanceof RagConfigError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    if (error instanceof RagUpstreamError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    throw error;
  }
}
