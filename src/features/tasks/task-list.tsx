"use client";

import { useState, useTransition } from "react";
import { Check, Pencil, Trash2, X, CheckCheck, AlertCircle } from "lucide-react";
import { toggleTaskAction, updateTaskAction, deleteTaskAction } from "@/features/tasks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type TaskItemData = {
  id: string;
  title: string;
  description: string | null;
  status: "PENDING" | "COMPLETED";
  dailyRecurring: boolean;
};

type TaskListProps = {
  tasks: TaskItemData[];
  compact?: boolean;
};

function TaskItem({ task, compact }: { task: TaskItemData; compact?: boolean }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [editError, setEditError] = useState("");
  const [isPending, startTransition] = useTransition();

  const completed = task.status === "COMPLETED";

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString().trim();
    if (!title) {
      setEditError("Task title cannot be empty.");
      return;
    }
    setEditError("");
    startTransition(async () => {
      await updateTaskAction(task.id, formData);
      setIsEditing(false);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTaskAction(task.id);
      setIsConfirmingDelete(false);
    });
  };

  if (isEditing) {
    return (
      <div className="rounded-2xl border-2 border-primary/40 bg-card p-4 shadow-md transition-all animate-fade-in">
        <form onSubmit={handleUpdate} className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Edit Task</p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-lg"
              onClick={() => {
                setIsEditing(false);
                setEditError("");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor={`edit-title-${task.id}`} className="text-xs">Title</Label>
            <Input
              id={`edit-title-${task.id}`}
              name="title"
              defaultValue={task.title}
              className={cn("h-10 text-sm", editError && "border-red-500")}
              placeholder="Task title"
              onChange={() => setEditError("")}
              autoFocus
            />
            {editError && <p className="text-xs font-semibold text-red-500">{editError}</p>}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor={`edit-desc-${task.id}`} className="text-xs">Description (optional)</Label>
            <Textarea
              id={`edit-desc-${task.id}`}
              name="description"
              defaultValue={task.description ?? ""}
              placeholder="Optional notes or details"
              className="min-h-[70px] text-xs py-2"
            />
          </div>

          <label className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-secondary/20 p-2.5 text-xs font-medium cursor-pointer">
            <input
              type="checkbox"
              name="dailyRecurring"
              defaultChecked={task.dailyRecurring}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
            />
            Daily recurring routine
          </label>

          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 px-3 text-xs"
              onClick={() => {
                setIsEditing(false);
                setEditError("");
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-9 px-4 text-xs font-bold"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  if (isConfirmingDelete) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-destructive/40 bg-destructive/5 p-3.5 shadow-sm animate-fade-in">
        <div className="flex items-center gap-2 text-xs font-semibold text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Delete this task permanently?</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2.5 text-xs"
            onClick={() => setIsConfirmingDelete(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-8 px-3 text-xs font-bold"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex items-center gap-3 rounded-2xl border-2 border-border/50 bg-card p-3.5 shadow-sm transition-all hover-lift">
      <form action={() => toggleTaskAction(task.id, !completed)}>
        <Button
          aria-label={completed ? "Undo completion" : "Mark complete"}
          size="icon"
          variant={completed ? "secondary" : "outline"}
          className={cn(
            "rounded-xl h-10 w-10 shrink-0 transition-transform active:scale-95",
            completed && "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
          )}
        >
          {completed ? <Check className="h-5 w-5" /> : <div className="h-4 w-4 rounded-full border-2 border-current" />}
        </Button>
      </form>

      <div className="min-w-0 flex-1">
        <p className={cn("font-bold text-sm leading-snug", completed && "text-muted-foreground line-through opacity-70")}>
          {task.title}
        </p>
        {!compact && task.description ? (
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{task.description}</p>
        ) : null}
        {task.dailyRecurring ? (
          <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-wider text-primary">
            Daily
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-1 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="Edit task"
          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="Delete task"
          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => setIsConfirmingDelete(true)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

export function TaskList({ tasks, compact = false }: TaskListProps) {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-border/50 bg-secondary/30 p-8 text-center">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No tasks yet</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} compact={compact} />
      ))}
    </div>
  );
}
