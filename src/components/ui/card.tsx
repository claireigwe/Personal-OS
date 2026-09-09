import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "gradient" | "feature" }) {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-card transition-all duration-200 hover-lift",
        variant === "default" && "border border-white/30 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.05] backdrop-blur-xl text-card-foreground",
        variant === "gradient" && "gradient-card text-white border-0",
        variant === "feature" && "gradient-feature text-white border-0",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 p-5 pb-2", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-bold leading-none tracking-tight", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-0", className)} {...props} />;
}
