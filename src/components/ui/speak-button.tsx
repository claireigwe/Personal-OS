"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { speakDutch } from "@/lib/speech";
import { cn } from "@/lib/utils";

type SpeakButtonProps = {
  text: string;
  className?: string;
  size?: "sm" | "md";
  label?: string;
};

export function SpeakButton({ text, className, size = "sm", label }: SpeakButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    const success = speakDutch(text, () => setIsPlaying(false));
    if (!success) {
      setIsPlaying(false);
    }
  };

  const isSmall = size === "sm";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label ?? `Listen to pronunciation of ${text}`}
      title="Listen to Dutch pronunciation"
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition-all active:scale-90",
        isSmall ? "h-8 w-8 p-1.5" : "h-10 w-10 p-2",
        isPlaying
          ? "bg-primary text-white shadow-glow scale-105"
          : "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30",
        className
      )}
    >
      <Volume2
        className={cn(
          "transition-transform",
          isSmall ? "h-4 w-4" : "h-5 w-5",
          isPlaying && "animate-pulse scale-110"
        )}
      />
    </button>
  );
}
