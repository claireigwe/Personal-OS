import { AuthForm } from "@/features/auth/auth-form";
import { loginAction } from "@/features/auth/actions";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-10">
      <section className="w-full max-w-sm rounded-2xl border border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 p-6">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Personal OS</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Continue your tasks, streak, and Dutch learning path.</p>
        </div>
        <AuthForm mode="login" action={loginAction} />
      </section>
    </main>
  );
}
