import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/session";
import type { AccountKind } from "@/lib/nav";

export async function getAccountKind(): Promise<AccountKind> {
  const session = await getSession();
  if (session.isLoggedIn && session.role === "ADMIN") return "ADMIN";
  if (session.isLoggedIn && session.role === "EXPERT") return "EXPERT";

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (data.user) return "INNOVATOR";
  }
  return "GUEST";
}
