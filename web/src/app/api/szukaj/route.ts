import { NextResponse } from "next/server";
import { RagConfigError, RagUpstreamError, semanticSearch } from "@/lib/rag";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Niepoprawny JSON" }, { status: 400 });
  }

  const searchQuery =
    body && typeof body === "object" && "searchQuery" in body
      ? (body as { searchQuery: unknown }).searchQuery
      : undefined;

  if (typeof searchQuery !== "string" || searchQuery.trim().length === 0 || searchQuery.length > 2000) {
    return NextResponse.json(
      { error: "searchQuery musi być tekstem od 1 do 2000 znaków" },
      { status: 400 }
    );
  }

  try {
    const result = await semanticSearch(searchQuery.trim());
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof RagConfigError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    if (error instanceof RagUpstreamError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    throw error;
  }
}
