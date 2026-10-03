import { NextRequest, NextResponse } from "next/server";

function back(req: NextRequest) {
  const host = req.headers.get("host") || req.nextUrl.host;
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const referer = req.headers.get("referer");
  if (referer) {
    try {
      const url = new URL(referer);
      if (url.host === host) return referer;
    } catch {
      /* ignore */
    }
  }
  return `${proto}://${host}/`;
}

export async function GET(req: NextRequest) {
  const dark = req.nextUrl.searchParams.get("v") === "ciemny";
  const res = NextResponse.redirect(back(req), 303);
  res.cookies.set("szczep_motyw", dark ? "ciemny" : "jasny", { path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
