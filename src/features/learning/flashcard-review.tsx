"use client";

import { useMemo, useState } from "react";
import { Sparkles, RotateCw, Check, X, Layers, RefreshCw } from "lucide-react";
import { SpeakButton } from "@/components/ui/speak-button";
import { Button } from "@/components/ui/button";
import { Portal } from "@/components/ui/portal";
import { cn } from "@/lib/utils";

export type FlashcardItem = {
  id: string;
  dutch: string;
  meaning: string;
  guide?: string;
  category?: string;
};

type FlashcardReviewProps = {
  cards: FlashcardItem[];
  triggerClassName?: string;
};

const DEFAULT_CARDS: FlashcardItem[] = [
  { id: "1", dutch: "Hallo", meaning: "Hello", guide: "hah-loh", category: "Greeting" },
  { id: "2", dutch: "Alsjeblieft", meaning: "Please / Here you go", guide: "als-yuh-bleeft", category: "Courtesy" },
  { id: "3", dutch: "Dank je wel", meaning: "Thank you very much", guide: "dahnk yuh vel", category: "Courtesy" },
  { id: "4", dutch: "Goedemorgen", meaning: "Good morning", guide: "khoo-duh-mor-khen", category: "Greeting" },
  { id: "5", dutch: "Tot ziens", meaning: "See you later / Goodbye", guide: "tot zeens", category: "Farewell" }
];

export function FlashcardReview({ cards, triggerClassName }: FlashcardReviewProps) {
  const initialCards = useMemo(() => (cards.length > 0 ? cards : DEFAULT_CARDS), [cards]);

  const [isOpen, setIsOpen] = useState(false);
  const [deck, setDeck] = useState<FlashcardItem[]>(initialCards);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const totalCards = initialCards.length;
  const current = deck[0];

  const handleNext = (mastered: boolean) => {
    setIsFlipped(false);

    if (mastered) {
      setNotification("Mastered! 🎯");
      setMasteredCount((prev) => prev + 1);

      if (deck.length <= 1) {
        setIsCompleted(true);
      } else {
        setDeck((prev) => prev.slice(1));
      }
    } else {
      // Review again: send this card to the back of the active queue so you see it again!
      setNotification("Moved to back of deck 🔁");
      if (deck.length > 1) {
        setDeck((prev) => [...prev.slice(1), prev[0]]);
      }
    }

    setTimeout(() => setNotification(null), 1800);
  };

  const handleReset = () => {
    setDeck(initialCards);
    setIsFlipped(false);
    setMasteredCount(0);
    setIsCompleted(false);
    setNotification(null);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          handleReset();
          setIsOpen(true);
        }}
        className={cn(
          "border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white font-bold gap-2",
          triggerClassName
        )}
      >
        <Layers className="h-4 w-4" />
        Flashcard Review ({totalCards})
      </Button>

      {/* Modal / Overlay teleported to body */}
      {isOpen && (
        <Portal>
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-md rounded-3xl border-2 border-white/20 dark:border-white/10 bg-card p-6 shadow-2xl animate-scale-up">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/40">
                <div className="flex items-center gap-2 text-xs font-bold text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span>Spaced Repetition Review</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {!isCompleted && current ? (
                <div className="py-5 grid gap-4">
                  {/* Progress bar and counter */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
                    <span>
                      Mastered <span className="text-primary font-bold">{masteredCount}</span> of {totalCards}
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold text-secondary-foreground">
                      {deck.length} left in review
                    </span>
                  </div>

                  <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (masteredCount / totalCards) * 100)}%` }}
                    />
                  </div>

                  {/* Feedback Notification Pill */}
                  <div className="min-h-[22px] flex items-center justify-center">
                    {notification ? (
                      <span className="animate-fade-in rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                        {notification}
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">
                        {current.category ?? "Dutch Vocabulary"}
                      </span>
                    )}
                  </div>

                  {/* 3D Flip Card */}
                  <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className={cn(
                      "relative min-h-[220px] w-full cursor-pointer rounded-2xl border-2 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 select-none shadow-card",
                      isFlipped
                        ? "border-primary/50 bg-primary/5"
                        : "border-border/60 bg-gradient-to-b from-card to-secondary/20 hover:border-primary/30"
                    )}
                  >
                    <span className="absolute top-3 right-3 text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                      <RotateCw className="h-3 w-3" /> Tap to flip
                    </span>

                    {!isFlipped ? (
                      <div className="grid gap-3 animate-fade-in text-center">
                        <p className="text-3xl font-extrabold text-foreground tracking-tight">
                          {current.dutch}
                        </p>
                        {current.guide && (
                          <p className="text-sm font-medium text-muted-foreground">
                            /{current.guide}/
                          </p>
                        )}
                        <div className="mt-2 flex justify-center" onClick={(e) => e.stopPropagation()}>
                          <SpeakButton text={current.dutch} size="md" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-2 animate-fade-in text-center">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">Meaning</p>
                        <p className="text-2xl font-bold text-foreground">{current.meaning}</p>
                        {current.guide && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Sounds like: <span className="font-semibold">{current.guide}</span>
                          </p>
                        )}
                        <p className="mt-2 text-sm font-semibold text-primary">{current.dutch}</p>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-900/40 dark:text-orange-400 dark:hover:bg-orange-950/20 font-bold h-11"
                      onClick={() => handleNext(false)}
                    >
                      <RefreshCw className="mr-1.5 h-4 w-4" /> Review Again
                    </Button>
                    <Button
                      type="button"
                      className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold h-11 shadow-sm"
                      onClick={() => handleNext(true)}
                    >
                      <Check className="mr-1.5 h-4 w-4" /> Mastered
                    </Button>
                  </div>
                </div>
              ) : (
                /* Review completed summary */
                <div className="py-8 text-center grid gap-4 animate-fade-in">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-3xl">
                    🎉
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">All Cards Mastered!</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Outstanding work! You cycled through and mastered all{" "}
                      <span className="font-bold text-foreground">{totalCards}</span> cards.
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1 font-bold" onClick={handleReset}>
                      Review Again
                    </Button>
                    <Button className="flex-1 font-bold" onClick={() => setIsOpen(false)}>
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
