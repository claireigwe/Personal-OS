import { SpeakButton } from "@/components/speak-button";

export type LessonExample = {
  dutch: string;
  guide: string;
  meaning: string;
};

export type ExampleGroup = {
  label: string;
  items: LessonExample[];
};

export type SoundComparison = {
  english: string;
  dutch: string;
  pronunciation: string;
  note?: string;
};

export type LessonContentData = {
  objective: string;
  sections: Array<{ heading: string; body: string }>;
  practice: string[];
  groups?: ExampleGroup[];
  comparisons?: SoundComparison[];
};

function ExampleCard({ example }: { example: LessonExample }) {
  return (
    <div className="rounded-2xl border border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 p-3">
      <div className="flex items-center gap-1">
        <p className="font-semibold">{example.dutch}</p>
        <SpeakButton text={example.dutch} />
      </div>
      <p className="text-sm text-muted-foreground">{example.guide}</p>
      <p className="text-sm">{example.meaning}</p>
    </div>
  );
}

function ComparisonCard({ comp }: { comp: SoundComparison }) {
  return (
    <div className="rounded-2xl border border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 p-3">
      <p className="text-xs font-medium text-muted-foreground">English</p>
      <p className="font-semibold">{comp.english}</p>
      <div className="mt-3 border-t border-border pt-2">
        <p className="text-xs font-medium text-muted-foreground">Dutch</p>
        <div className="flex items-center gap-1">
          <p className="font-semibold text-primary">{comp.dutch}</p>
          <SpeakButton text={comp.dutch} />
        </div>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{comp.pronunciation}</p>
      {comp.note ? <p className="mt-1 text-xs">{comp.note}</p> : null}
    </div>
  );
}

export function LessonContent({
  content,
  examples,
}: {
  content: LessonContentData;
  examples?: LessonExample[];
}) {
  const groups = content.groups;
  const comparisons = content.comparisons;

  return (
    <div className="grid gap-5">
      <section className="rounded-2xl border border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 p-4">
        <p className="text-sm font-medium text-primary">Objective</p>
        <p className="mt-1 text-sm text-muted-foreground">{content.objective}</p>
      </section>

      {content.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-lg font-semibold">{section.heading}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{section.body}</p>
        </section>
      ))}

      {comparisons && comparisons.length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold">Sound Comparison</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comp, i) => (
              <ComparisonCard comp={comp} key={i} />
            ))}
          </div>
        </section>
      ) : null}

      {groups && groups.length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold">Examples</h2>
          <div className="mt-3 grid gap-5">
            {groups.map((group) => (
              <div key={group.label}>
                <h3 className="mb-2 font-medium text-primary">{group.label}</h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {group.items.map((example, i) => (
                    <ExampleCard example={example} key={`${example.dutch}-${i}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : examples && examples.length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold">Examples</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {examples.map((example) => (
              <ExampleCard example={example} key={`${example.dutch}-${example.meaning}`} />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="text-lg font-semibold">Practice</h2>
        <ul className="mt-3 grid gap-2">
          {content.practice.map((item) => (
            <li className="rounded-2xl border border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 px-3 py-2 text-sm" key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
