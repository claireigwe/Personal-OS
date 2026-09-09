import { saveLessonNoteAction } from "@/features/learning/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function LessonNoteForm({ lessonId, content }: { lessonId: string; content?: string }) {
  return (
    <form action={saveLessonNoteAction.bind(null, lessonId)} className="grid gap-3">
      <Textarea name="content" placeholder="Add pronunciation notes, questions, or reading patterns you noticed." defaultValue={content} />
      <Button variant="secondary">Save notes</Button>
    </form>
  );
}
