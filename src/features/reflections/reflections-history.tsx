"use client";

import { useState } from "react";
import { Calendar, ChevronDown, ChevronUp, Sparkles, MessageSquareQuote } from "lucide-react";
import { Button } from "@/components/ui/button";

type ReflectionItem = {
  id: string;
  entryDate: Date | string;
  content: string;
  createdAt: Date | string;
};

type ReflectionsHistoryProps = {
  reflections: ReflectionItem[];
};

function formatEntryDate(dateInput: Date | string): { label: string; dateStr: string } {
  const date = new Date(dateInput);
  const now = new Date();

  // Normalize to local day boundaries
  const startOfTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  const diffDays = Math.round((startOfToday - startOfTarget) / oneDay);

  let label = "";
  if (diffDays === 0) label = "Today";
  else if (diffDays === 1) label = "Yesterday";
  else if (diffDays > 1 && diffDays < 7) label = `${diffDays} days ago`;

  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined
  });

  return { label, dateStr };
}

export function ReflectionsHistory({ reflections }: ReflectionsHistoryProps) {
  const [showAll, setShowAll] = useState(false);

  if (!reflections.length) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-border/50 bg-secondary/30 p-8 text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <p className="text-sm font-bold text-foreground">No reflections yet</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Write your first daily reflection on the Home dashboard to track your thoughts over time!
        </p>
      </div>
    );
  }

  const displayed = showAll ? reflections : reflections.slice(0, 4);

  return (
    <div className="grid gap-3">
      {displayed.map((item) => {
        const { label, dateStr } = formatEntryDate(item.entryDate);
        const moodMatch = item.content.match(/^\[Mood:\s*([^\s\]]+)\]\s*\n*/);
        const mood = moodMatch ? moodMatch[1] : null;
        const cleanContent = moodMatch
          ? item.content.replace(/^\[Mood:\s*([^\s\]]+)\]\s*\n*/, "")
          : item.content;

        return (
          <div
            key={item.id}
            className="group relative rounded-2xl border-2 border-border/50 bg-card p-4 shadow-sm transition-all hover-lift"
          >
            <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2 mb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{dateStr}</span>
                </div>
                {mood ? (
                  <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-sm" title="Logged mood">
                    {mood}
                  </span>
                ) : null}
              </div>
              {label ? (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {label}
                </span>
              ) : null}
            </div>

            <div className="flex items-start gap-2.5">
              <MessageSquareQuote className="h-4 w-4 shrink-0 text-muted-foreground/60 mt-0.5" />
              <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed font-medium">
                {cleanContent}
              </p>
            </div>
          </div>
        );
      })}

      {reflections.length > 4 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs font-bold text-muted-foreground hover:text-foreground"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              <ChevronUp className="mr-1.5 h-3.5 w-3.5" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="mr-1.5 h-3.5 w-3.5" />
              Show all ({reflections.length} reflections)
            </>
          )}
        </Button>
      )}
    </div>
  );
}
