import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import type { Role } from "@/lib/types";

export async function requireRole(role: Role | Role[]) {
  const session = await getSession();
  const roles = Array.isArray(role) ? role : [role];
  if (!session.isLoggedIn || !session.role || !roles.includes(session.role)) {
    redirect("/logowanie");
  }
  return session;
}
