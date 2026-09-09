# Personal OS Architecture

## Requirement Analysis

Personal OS combines daily accountability with structured learning. Version 1 is intentionally narrow: one primary user experience, durable database-backed data, mobile-first screens, and a Dutch learning path that prioritizes pronunciation and reading patterns before vocabulary.

## Folder Structure

```txt
src/
  app/
    (app)/              Protected application screens
    (auth)/             Login and signup screens
    api/auth/           Auth.js route handlers
  components/
    layout/             Bottom navigation
    ui/                 shadcn-style primitives
  features/
    auth/               Auth forms, validation, actions
    learning/           Curriculum, progress, lesson UI
    reflections/        Daily reflection action and form
    streaks/            Streak update service
    tasks/              Task actions, form, list
  lib/                  Prisma client and shared utilities
```

## Data Model

The Prisma schema supports future multi-user use by assigning user-owned records to `User`, while `LearningPath`, `LearningModule`, and `Lesson` are reusable curriculum content. User-specific learning state lives in `LessonProgress` and `LessonNote`.

## Implementation Plan

1. Scaffold the Next.js App Router project with TypeScript and Tailwind.
2. Define Prisma models for users, tasks, reflections, learning content, progress, notes, and streaks.
3. Add Auth.js credentials auth with sign up, login, logout, and protected routes.
4. Implement server actions for task creation/completion, reflection saving, lesson completion, notes, and streak updates.
5. Build mobile-first Home, Tasks, Learning, Lesson, and Profile screens.
6. Add manifest, icons, and service worker for installability and offline shell caching.

## AI Expansion

`generateCurriculum(language, learningStyle)` exists as the stable service boundary. Version 1 stores generated curriculum permanently and avoids repeat generation. A DeepSeek provider stub is isolated in `src/features/learning/services/deepseek-curriculum-provider.ts` so the future integration can replace the static provider without changing the UI or database relationships.
