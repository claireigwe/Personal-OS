"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CheckSquare, Home, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/learning", label: "Learn", icon: BookOpen },
  { href: "/profile", label: "Profile", icon: UserCircle }
];

export function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/learning/lessons/")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/20 dark:border-white/[0.06] bg-white/80 dark:bg-[hsl(262,18%,11%)]/90 backdrop-blur-2xl">
      <div className="mx-auto grid h-[72px] max-w-3xl grid-cols-4 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 rounded-2xl text-xs font-medium transition-all duration-200",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              href={item.href}
              key={item.href}
            >
              <div className={cn(
                "flex items-center justify-center rounded-xl p-1.5 transition-all duration-200",
                active && "bg-primary/10 dark:bg-primary/20 scale-110"
              )}>
                <Icon aria-hidden="true" className={cn("h-5 w-5 transition-all", active && "h-[22px] w-[22px]")} />
              </div>
              <span className={cn("transition-all", active && "font-bold")}>{item.label}</span>
              {active && (
                <span className="absolute -bottom-0.5 h-1 w-6 rounded-full gradient-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
