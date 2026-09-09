import { auth } from "@/auth";
import { getDutchLearningPath } from "@/features/learning/services/curriculum-store";
import { summarizeLearning } from "@/features/learning/progress";
import { ModuleList } from "@/components/module-list";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export default async function LearningPage() {
  const session = await auth();
  const path = await getDutchLearningPath(session!.user.id);
  const summary = summarizeLearning(path);

  return (
    <div className="grid gap-6">
      {/* Hero header with gradient */}
      <Card variant="feature" className="animate-slide-up">
        <CardContent className="p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/70">Learning</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">{path.title}</h1>
          <p className="mt-2 text-sm leading-6 text-white/75">{path.description}</p>

          <div className="mt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">{summary.completedLessons} of {summary.totalLessons} lessons complete</span>
              <span className="font-bold text-white">{summary.percent}%</span>
            </div>
            <Progress className="mt-3 bg-white/20" value={summary.percent} />
          </div>
        </CardContent>
      </Card>

      {/* Learning path */}
      <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <ModuleList modules={path.modules} />
      </section>
    </div>
  );
}
