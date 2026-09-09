"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Lock, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Module = {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Array<{
    id: string;
    title: string;
    summary: string;
    order: number;
    progress: Array<{ completedAt: Date | null }>;
  }>;
};

type LessonNode = {
  id: string;
  title: string;
  summary: string;
  moduleTitle: string;
  moduleId: string;
  status: "completed" | "current" | "locked";
  index: number;
};

/* ── Winding snake positions ── */
const SNAKE_OFFSETS = [0, 1, 2, 1, 0, -1, -2, -1] as const;

function getSnakeX(index: number): number {
  return SNAKE_OFFSETS[index % SNAKE_OFFSETS.length];
}

/* ── Tooltip popup (shown on tap/click) ── */
function NodePopup({ node, onClose }: { node: LessonNode; onClose: () => void }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-30 animate-fade-in">
      <div className="relative rounded-2xl border border-white/30 dark:border-white/[0.1] bg-white dark:bg-[hsl(262,18%,14%)] shadow-glow-lg p-4 min-w-[200px] max-w-[240px]">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">{node.moduleTitle}</p>
        <p className="mt-1 font-bold text-sm">{node.title}</p>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{node.summary}</p>
        <div className="mt-3 flex gap-2">
          {node.status !== "locked" && (
            <Link
              href={`/learning/lessons/${node.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl gradient-primary text-white text-xs font-bold h-9 px-3 hover:brightness-110 transition-all active:scale-95"
              onClick={(e) => e.stopPropagation()}
            >
              {node.status === "completed" ? "Review" : "Start"}
              <Sparkles className="h-3 w-3" />
            </Link>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="inline-flex items-center justify-center rounded-xl border border-border bg-secondary/50 text-xs font-semibold h-9 px-3 hover:bg-secondary transition-colors"
            type="button"
          >
            Close
          </button>
        </div>
        {/* Arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 bg-white dark:bg-[hsl(262,18%,14%)] border-r border-b border-white/30 dark:border-white/[0.1]" />
      </div>
    </div>
  );
}

/* ── Single circular node ── */
function PathNode({ node, onClick, isSelected }: { node: LessonNode; onClick: () => void; isSelected: boolean }) {
  const size = node.status === "current" ? "h-[76px] w-[76px]" : "h-[64px] w-[64px]";

  return (
    <div className="relative">
      {isSelected && <NodePopup node={node} onClose={onClick} />}

      {/* Mascot hovering over the current node */}
      {node.status === "current" && (
        <div className="absolute -top-[52px] -right-6 z-10 animate-bounce-subtle pointer-events-none">
          <img src="/mascot.png" alt="Mascot" className="w-[72px] h-[72px] drop-shadow-xl object-contain" />
        </div>
      )}

      <button
        onClick={onClick}
        type="button"
        className={cn(
          "relative flex items-center justify-center rounded-full transition-all duration-150 active:translate-y-[6px]",
          size,
          node.status === "completed" &&
            "bg-[#58cc02] text-white shadow-[0_6px_0_0_#46a302] hover:bg-[#61e002] active:shadow-[0_0px_0_0_#46a302]",
          node.status === "current" &&
            "gradient-primary text-white shadow-[0_6px_0_0_#6a1ce0] hover:brightness-110 active:shadow-[0_0px_0_0_#6a1ce0] ring-4 ring-primary/20 ring-offset-2 ring-offset-background",
          node.status === "locked" &&
            "bg-secondary dark:bg-secondary/50 text-muted-foreground/50 shadow-[0_6px_0_0_hsl(var(--border))] border-2 border-dashed border-muted-foreground/20 active:translate-y-0 active:shadow-[0_6px_0_0_hsl(var(--border))]"
        )}
        aria-label={`${node.title} - ${node.status}`}
      >
        {node.status === "completed" && <Check className="h-7 w-7 stroke-[4]" />}
        {node.status === "current" && <Star className="h-7 w-7 fill-white/40" />}
        {node.status === "locked" && <Lock className="h-5 w-5" />}
      </button>
    </div>
  );
}

/* ── Dashed connector SVG between nodes ── */
function DashedConnector({ fromX, toX }: { fromX: number; toX: number }) {
  const curveWidth = 120;
  const height = 40;
  const fromPx = (fromX / 2) * curveWidth;
  const toPx = (toX / 2) * curveWidth;

  const startX = 60 + fromPx;
  const endX = 60 + toPx;
  const midX = (startX + endX) / 2;

  return (
    <svg
      className="mx-auto text-primary/25 dark:text-primary/15"
      height={height}
      viewBox={`0 0 ${curveWidth * 2 + 120} ${height}`}
      width="100%"
      style={{ maxWidth: `${curveWidth * 2 + 120}px` }}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={`M ${startX} 0 Q ${midX} ${height} ${endX} ${height}`}
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="8 6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ── Main component ── */
export function ModuleList({ modules }: { modules: Module[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Flatten all lessons into a linear path with status
  const allNodes: LessonNode[] = [];
  let foundCurrent = false;

  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      const completed = lesson.progress.some((p) => p.completedAt);
      let status: LessonNode["status"];

      if (completed) {
        status = "completed";
      } else if (!foundCurrent) {
        status = "current";
        foundCurrent = true;
      } else {
        status = "locked";
      }

      allNodes.push({
        id: lesson.id,
        title: lesson.title,
        summary: lesson.summary,
        moduleTitle: mod.title,
        moduleId: mod.id,
        status,
        index: allNodes.length
      });
    }
  }

  // Group nodes by module for section headers
  const sections: Array<{ module: Module; nodes: LessonNode[] }> = [];
  for (const mod of modules) {
    const nodes = allNodes.filter((n) => n.moduleId === mod.id);
    if (nodes.length > 0) {
      sections.push({ module: mod, nodes });
    }
  }

  let globalIndex = 0;

  return (
    <div className="grid gap-2">
      {sections.map((section) => {
        const done = section.nodes.filter((n) => n.status === "completed").length;
        const total = section.nodes.length;
        const allDone = done === total;

        return (
          <div key={section.module.id}>
            {/* Module header badge */}
            <div className="flex items-center justify-center mb-2 mt-4 first:mt-0">
              <div className={cn(
                "inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold shadow-card",
                allDone
                  ? "bg-emerald-500 text-white"
                  : "bg-white dark:bg-[hsl(262,18%,14%)] border border-white/30 dark:border-white/[0.08] text-foreground"
              )}>
                {allDone && <Check className="h-4 w-4" />}
                {section.module.title}
                <span className={cn(
                  "text-xs font-semibold",
                  allDone ? "text-white/80" : "text-muted-foreground"
                )}>
                  {done}/{total}
                </span>
              </div>
            </div>

            {/* Path nodes */}
            <div className="flex flex-col items-center">
              {section.nodes.map((node, nodeIdx) => {
                const snakeX = getSnakeX(globalIndex);
                const prevSnakeX = globalIndex > 0 ? getSnakeX(globalIndex - 1) : snakeX;
                const isFirst = globalIndex === 0;
                globalIndex++;

                return (
                  <div key={node.id} className="flex flex-col items-center w-full">
                    {/* Dashed connector from previous node */}
                    {!isFirst && (
                      <DashedConnector fromX={prevSnakeX} toX={snakeX} />
                    )}

                    {/* Node circle with snake offset */}
                    <div
                      className="flex justify-center transition-all duration-500"
                      style={{ transform: `translateX(${snakeX * 50}px)` }}
                    >
                      <PathNode
                        node={node}
                        isSelected={selectedId === node.id}
                        onClick={() => setSelectedId(selectedId === node.id ? null : node.id)}
                      />
                    </div>

                    {/* Label below current node */}
                    {node.status === "current" && (
                      <div
                        className="mt-2 text-center transition-all duration-500"
                        style={{ transform: `translateX(${snakeX * 50}px)` }}
                      >
                        <p className="text-xs font-bold text-primary">{node.title}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
