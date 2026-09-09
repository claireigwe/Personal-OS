"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { createTaskAction } from "@/features/tasks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
      <label className="flex items-center gap-3 rounded-xl border-2 border-border/50 bg-card p-4 text-sm font-semibold transition-all hover:border-border cursor-pointer">
        <input className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary" name="dailyRecurring" type="checkbox" />
        Daily recurring
      </label>
      <Button>
        <Plus aria-hidden="true" className="h-4 w-4" />
        Add task
      </Button>
    </form>
  );
}
