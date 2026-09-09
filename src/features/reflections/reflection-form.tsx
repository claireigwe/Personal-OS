"use client";

import { useState } from "react";
import { Sparkles, Smile, Target, BookOpen, Lightbulb } from "lucide-react";
import { saveReflectionAction } from "@/features/reflections/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const MOODS = [
  { emoji: "🤩", label: "Great" },
  { emoji: "😊", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "🥱", label: "Tired" },
  { emoji: "😣", label: "Rough" }
];

const PROMPT_STARTERS = [
  { icon: Target, label: "Win today", text: "🎯 One win today: " },
  { icon: BookOpen, label: "Dutch learned", text: "🇳🇱 Dutch phrase learned: " },
  { icon: Lightbulb, label: "Tomorrow's focus", text: "💡 Tomorrow's focus: " }
];

export function ReflectionForm({ content }: { content?: string }) {
  // Parse existing mood from content if present, e.g. "[Mood: 😊]\n\n..."
  const initialMoodMatch = content?.match(/^\[Mood:\s*([^\s\]]+)\]\s*\n*/);
  const initialMood = initialMoodMatch ? initialMoodMatch[1] : "";
  const initialCleanContent = content
    ? content.replace(/^\[Mood:\s*([^\s\]]+)\]\s*\n*/, "")
    : "";

  const [selectedMood, setSelectedMood] = useState<string>(initialMood);
  const [text, setText] = useState<string>(initialCleanContent);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePromptClick = (promptText: string) => {
    setText((prev) => {
      if (!prev.trim()) return promptText;
      return `${prev.trim()}\n\n${promptText}`;
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please write something before saving.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    const fullContent = selectedMood ? `[Mood: ${selectedMood}]\n\n${text.trim()}` : text.trim();

    const formData = new FormData();
    formData.append("content", fullContent);

    try {
      await saveReflectionAction(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      {/* Mood Selector */}
      <div className="grid gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Smile className="h-3.5 w-3.5 text-primary" /> How was your day?
        </label>
        <div className="flex items-center gap-2">
          {MOODS.map((m) => {
            const isSelected = selectedMood === m.emoji;
            return (
              <button
                key={m.emoji}
                type="button"
                onClick={() => setSelectedMood(isSelected ? "" : m.emoji)}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center rounded-xl border-2 py-2 transition-all active:scale-95",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-sm scale-105"
                    : "border-border/50 bg-secondary/30 hover:border-border hover:bg-secondary/60 opacity-80 hover:opacity-100"
                )}
              >
                <span className="text-xl">{m.emoji}</span>
                <span className="text-[10px] font-semibold text-muted-foreground mt-0.5">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Guided Prompts */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-bold text-muted-foreground mr-1">Quick Prompts:</span>
        {PROMPT_STARTERS.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => handlePromptClick(p.text)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all active:scale-95"
            >
              <Icon className="h-3 w-3 text-primary" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Textarea */}
      <div className="grid gap-1.5">
        <Textarea
          name="content"
          placeholder="What did you learn today? What are you proud of?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
          className={cn("min-h-[110px]", error && "border-red-500 focus-visible:ring-red-500/20")}
        />
        {error && <p className="text-xs font-semibold text-red-500 animate-fade-in">{error}</p>}
      </div>

      <Button variant="secondary" className="w-full font-bold" disabled={isSubmitting}>
        <Sparkles className="mr-1.5 h-4 w-4" />
        {isSubmitting ? "Saving reflection..." : "Save reflection"}
      </Button>
    </form>
  );
}
