"use client";

import { useState } from "react";
import Image from "next/image";
import { Volume2 } from "lucide-react";
import { speakDutch } from "@/lib/speech";
import { cn } from "@/lib/utils";

type MascotBubbleProps = {
  userName?: string | null;
  streakCount: number;
  remainingTasks: number;
  currentLessonTitle?: string;
};

export function MascotBubble({
  userName,
  streakCount,
  remainingTasks,
  currentLessonTitle
}: MascotBubbleProps) {
  const getContextualPhrases = () => {
    const hour = new Date().getHours();
    const greetings =
      hour < 12
        ? { dutch: "Goedemorgen!", en: "Good morning! Ready for today?" }
        : hour < 18
        ? { dutch: "Goedemiddag!", en: "Good afternoon! Lekker bezig (doing great)!" }
        : { dutch: "Goedenavond!", en: "Good evening! Time to reflect on the day?" };

    const pool = [
      {
        text: greetings.dutch,
        subtext: greetings.en,
        dutchToSpeak: greetings.dutch
      },
      {
        text: streakCount >= 3 ? `🔥 ${streakCount}-day streak! Geweldig!` : "🔥 Consistency is your superpower!",
        subtext: "Every small step counts towards fluency.",
        dutchToSpeak: "Geweldig gedaan!"
      },
      remainingTasks === 0
        ? {
            text: "🎉 All tasks done today!",
            subtext: "Uitstekend werk! You conquered your list.",
            dutchToSpeak: "Uitstekend werk!"
          }
        : {
            text: `🎯 ${remainingTasks} task${remainingTasks === 1 ? "" : "s"} left today`,
            subtext: "Take them one at a time, you've got this!",
            dutchToSpeak: "Zet hem op!"
          },
      {
        text: "🇳🇱 Dutch word: 'Gezellig'",
        subtext: "Untranslatable: cozy, warm, and nice company.",
        dutchToSpeak: "Gezellig"
      },
      {
        text: "💡 Pronunciation tip:",
        subtext: "In Dutch, 'g' and 'ch' come from the throat!",
        dutchToSpeak: "Goedemorgen"
      }
    ];

    if (currentLessonTitle) {
      pool.push({
        text: `📚 Lesson: ${currentLessonTitle}`,
        subtext: "Review your sounds & practice speaking out loud.",
        dutchToSpeak: "Veel succes!"
      });
    }

    return pool;
  };

  const phrases = getContextualPhrases();
  const [index, setIndex] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);

  const current = phrases[index % phrases.length];

  const handleNext = () => {
    setIsWiggling(true);
    setIndex((prev) => (prev + 1) % phrases.length);
    setTimeout(() => setIsWiggling(false), 500);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (current.dutchToSpeak) {
      speakDutch(current.dutchToSpeak);
    }
  };

  return (
    <section className="animate-slide-up flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
      <div className="flex-1">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Today</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Hello, {userName ?? "there"} <span className="inline-block animate-bounce-subtle">👋</span>
        </h1>

        {/* Mascot Interactive Speech Bubble */}
        <div
          onClick={handleNext}
          title="Click mascot or bubble for next tip!"
          className="mt-2.5 inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-primary/20 bg-primary/5 px-3.5 py-2 shadow-sm transition-all hover:bg-primary/10 hover:border-primary/40 active:scale-[0.98] group"
        >
          <div className="h-2 w-2 rounded-full bg-primary animate-ping shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-primary mr-1.5">{current.text}</span>
            <span className="text-muted-foreground">{current.subtext}</span>
          </div>

          {current.dutchToSpeak && (
            <button
              type="button"
              onClick={handleSpeak}
              title="Hear Dutch pronunciation"
              className="ml-1 rounded-lg p-1 text-primary hover:bg-primary/20 transition-colors"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mascot Image with click animation */}
      <div
        onClick={handleNext}
        className={cn(
          "relative shrink-0 -mb-2 cursor-pointer transition-transform duration-300 self-end sm:self-auto",
          isWiggling && "scale-110 rotate-6"
        )}
        title="Tap me for tips!"
      >
        <Image
          src="/mascot.png"
          alt="Personal OS Mascot"
          width={92}
          height={92}
          className="object-contain drop-shadow-xl hover:scale-105 transition-transform select-none"
          priority
        />
      </div>
    </section>
  );
}
