import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { compareSync } from "bcryptjs";
import { redirect } from "next/navigation";

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !compareSync(password, user.passwordHash)) {
    redirect("/logowanie?error=1");
  }
  const session = await getSession();
  session.userId = user.id;
  session.email = user.email;
  session.name = user.name;
  session.role = user.role as "ADMIN" | "EXPERT";
  session.isLoggedIn = true;
  await session.save();
  redirect(user.role === "ADMIN" ? "/admin" : "/ekspert");
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="rise" style={{ maxWidth: "28rem" }}>
      <h1>Logowanie</h1>
      <p className="lead">Konto pracowników ROPS i ekspertów Hubu.</p>
      {error && (
        <p role="alert" style={{ color: "var(--low)" }}>
          Nieprawidłowy e-mail lub hasło.
        </p>
      )}
      <form action={loginAction} className="panel">
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" required autoComplete="username" />
        </div>
        <div className="field">
          <label htmlFor="password">Hasło</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        <button className="btn" type="submit">
          Zaloguj
        </button>
      </form>
      <p className="hint">
        W pilotażu: <code>admin@demo.szczep</code> / <code>demo1234</code> (admin) oraz{" "}
        <code>ekspert@demo.szczep</code> / <code>demo1234</code> (ekspert).
      </p>
    </div>
  );
}
