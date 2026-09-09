import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { BottomNav } from "@/components/layout/bottom-nav";
import { PwaRegister } from "@/components/pwa-register";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col">
      <main className="flex-1 px-4 pb-28 pt-6 sm:px-6">{children}</main>
      <BottomNav />
      <PwaRegister />
    </div>
  );
}
