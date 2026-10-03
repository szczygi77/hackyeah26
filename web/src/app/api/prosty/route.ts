import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const on = req.nextUrl.searchParams.get("on") === "1";
  const res = NextResponse.redirect(new URL(req.headers.get("referer") || "/", req.url));
  res.cookies.set("szczep_prosty", on ? "1" : "0", { path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
