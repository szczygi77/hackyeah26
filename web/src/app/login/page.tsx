import { getSession } from "@/lib/session";
import { createSupabaseServerClient, supabaseEnv } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const DEMO = {
  innovator: { email: "innowator@demo.szczep", password: "innowator-demo" },
  admin: { email: "admin@demo.szczep", password: "admin-demo" },
} as const;

async function signIn(email: string, password: string) {
  if (!supabaseEnv()) redirect("/login?error=config");

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/login?error=config");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) redirect("/login?error=1");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profile?.role === "ADMIN") {
    const session = await getSession();
    session.userId = data.user.id;
    session.email = email;
    session.name = "Admin Demo";
    session.role = "ADMIN";
    session.isLoggedIn = true;
    await session.save();
    redirect("/admin");
  }

  if (profile?.role === "INNOVATOR") redirect("/innowator/dashboard");
  redirect("/login?error=1");
}

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  await signIn(email, password);
}

async function loginAsInnovator() {
  "use server";
  await signIn(DEMO.innovator.email, DEMO.innovator.password);
}

async function loginAsAdmin() {
  "use server";
  await signIn(DEMO.admin.email, DEMO.admin.password);
}

const inputClass =
  "mt-1 w-full min-h-12 border-2 border-neutral-900 bg-white px-3 text-lg text-neutral-950 outline-none focus:ring-2 focus:ring-blue-600";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message =
    error === "config"
      ? "Brak SUPABASE_URL lub SUPABASE_ANON_KEY na serwerze."
      : error
        ? "Nieprawidłowy e-mail lub hasło."
        : null;

  return (
    <div className="mx-auto w-full max-w-md bg-white px-1 py-8 text-neutral-950">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">Logowanie</h1>
      <p className="mt-2 text-lg text-neutral-800">Panel innowatora i administratora.</p>

      {message && (
        <p className="mt-4 border-2 border-red-800 bg-red-50 px-3 py-2 text-red-950" role="alert">
          {message}
        </p>
      )}

      <form action={loginAction} className="mt-8">
        <div>
          <label className="text-base font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className={inputClass}
          />
        </div>
        <div className="mt-4">
          <label className="text-base font-semibold" htmlFor="password">
            Hasło
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={inputClass}
          />
        </div>
        <button
          className="mt-6 min-h-12 w-full bg-blue-800 px-4 text-lg font-semibold text-white focus:ring-2 focus:ring-blue-600"
          type="submit"
        >
          Zaloguj
        </button>
      </form>

      <section className="mt-10 border-t-2 border-neutral-900 pt-6" aria-labelledby="demo-login">
        <h2 id="demo-login" className="text-xl font-semibold">
          Szybkie logowanie testowe
        </h2>
        <div className="mt-4 grid gap-3">
          <form action={loginAsInnovator}>
            <button
              className="min-h-14 w-full border-2 border-neutral-900 bg-white px-4 text-lg font-semibold text-neutral-950 focus:ring-2 focus:ring-blue-600"
              type="submit"
            >
              [Zaloguj jako Innowator]
            </button>
          </form>
          <form action={loginAsAdmin}>
            <button
              className="min-h-14 w-full border-2 border-neutral-900 bg-neutral-950 px-4 text-lg font-semibold text-white focus:ring-2 focus:ring-blue-600"
              type="submit"
            >
              [Zaloguj jako Admin]
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
