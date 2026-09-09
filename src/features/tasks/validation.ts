import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Task title is required.").max(120),
  description: z.string().max(500).optional(),
  dailyRecurring: z.coerce.boolean().default(false)
});
