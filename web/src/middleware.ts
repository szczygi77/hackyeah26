import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type PendingCookie = {
  name: string;
  value: string;
  options: CookieOptions;
};

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function redirectTo(
  request: NextRequest,
  pathname: string,
  cookies: PendingCookie[],
  headers: Record<string, string>
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const redirect = NextResponse.redirect(url);
  for (const cookie of cookies) {
    redirect.cookies.set(cookie.name, cookie.value, cookie.options);
  }
  for (const [key, value] of Object.entries(headers)) {
    redirect.headers.set(key, value);
  }
  return redirect;
}

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let response = NextResponse.next({ request });
  const pendingCookies: PendingCookie[] = [];
  let pendingHeaders: Record<string, string> = {};

  const supabase = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        pendingCookies.splice(0, pendingCookies.length, ...cookiesToSet);
        pendingHeaders = headers;
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
        for (const [key, value] of Object.entries(headers)) {
          response.headers.set(key, value);
        }
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;
  if (!userId) {
    if (isAdminPath(request.nextUrl.pathname) && request.cookies.get("szczep_session")?.value) {
      return NextResponse.next();
    }
    const dest = isAdminPath(request.nextUrl.pathname) ? "/logowanie" : "/login";
    return redirectTo(request, dest, pendingCookies, pendingHeaders);
  }

  if (isAdminPath(request.nextUrl.pathname)) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    if (profile?.role === "INNOVATOR") {
      return redirectTo(request, "/403", pendingCookies, pendingHeaders);
    }
  }

  return response;
}

export const config = {
  matcher: ["/innowator/:path*", "/admin/:path*"],
};
