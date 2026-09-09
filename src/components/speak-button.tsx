"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { speakDutch } from "@/lib/speech";
import { cn } from "@/lib/utils";

export function SpeakButton({ text, variant = "icon" }: { text: string; variant?: "icon" | "pill" }) {
  const [pulse, setPulse] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPulse(true);
    speakDutch(text, () => setPulse(false));
  };

  return (
    <button
      aria-label={`Speak: ${text}`}
      className={cn(
        "shrink-0 inline-flex items-center justify-center transition-all duration-200 active:scale-95",
        variant === "icon" && "rounded-full h-8 w-8 text-primary bg-primary/10 hover:bg-primary/20 hover:scale-110",
        variant === "pill" && "rounded-full h-10 px-5 gap-2 bg-white/20 text-white font-semibold text-sm hover:bg-white/30",
        pulse && variant === "icon" && "animate-pulse-glow bg-primary/30 ring-2 ring-primary/40",
        pulse && variant === "pill" && "bg-white/30 ring-2 ring-white/50"
      )}
      onClick={handleClick}
      type="button"
    >
      <Volume2 className={cn("h-4 w-4", variant === "icon" && "h-3.5 w-3.5")} />
      {variant === "pill" && <span>Listen</span>}
    </button>
  );
}
