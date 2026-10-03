import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("v") || "1";
  const value = raw === "2" || raw === "3" ? raw : "1";
  const res = NextResponse.redirect(new URL(req.headers.get("referer") || "/", req.url));
  res.cookies.set("szczep_tekst", value, { path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
