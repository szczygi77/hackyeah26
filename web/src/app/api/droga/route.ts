import { NextRequest, NextResponse } from "next/server";

const ALLOWED = new Set(["pomoc", "gmina", "pomysl"]);

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("v") || "gmina";
  const value = ALLOWED.has(raw) ? raw : "gmina";
  const dest = value === "pomysl" ? "/pomysl" : req.headers.get("referer") || "/";
  const res = NextResponse.redirect(new URL(dest, req.url));
  res.cookies.set("szczep_droga", value, { path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
