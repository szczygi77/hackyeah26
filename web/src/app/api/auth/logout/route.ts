import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

async function logout(req: NextRequest) {
  const session = await getSession();
  session.destroy();
  const host = req.headers.get("host") || req.nextUrl.host;
  const proto = req.headers.get("x-forwarded-proto") || "http";
  return NextResponse.redirect(`${proto}://${host}/`, 303);
}

export async function POST(req: NextRequest) {
  return logout(req);
}
