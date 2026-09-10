"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { createTaskAction } from "@/features/tasks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatDateInputValue } from "@/lib/utils";

export function TaskForm() {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString().trim();
    if (!title) {
      e.preventDefault();
      setError("Please provide a title for your task.");
    } else {
      setError("");
    }
  };

  return (
    <form action={createTaskAction} onSubmit={handleSubmit} noValidate className="grid gap-3">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          name="title" 
          placeholder="Review Dutch sounds" 
          className={error ? "border-red-500 focus-visible:ring-red-500/20" : ""}
          onChange={() => setError("")}
        />
        {error && <p className="text-sm font-semibold text-red-500 animate-fade-in">{error}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Optional details" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="activeDate" className="text-xs font-semibold">Scheduled Date</Label>
          <Input
            id="activeDate"
            name="activeDate"
            type="date"
            defaultValue={formatDateInputValue(new Date())}
            className="h-10 text-sm"
          />
        </div>
        <div className="flex items-end">
          <label className="flex h-10 w-full items-center gap-2.5 rounded-xl border-2 border-border/50 bg-card px-3 text-xs font-semibold transition-all hover:border-border cursor-pointer">
            <input
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
              name="dailyRecurring"
              type="checkbox"
            />
            <span>Daily recurring routine</span>
          </label>
        </div>
      </div>
      <Button>
        <Plus aria-hidden="true" className="h-4 w-4" />
        Add task
      </Button>
    </form>
  );
}
