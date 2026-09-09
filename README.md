# Personal OS PWA

Mobile-first Progressive Web App for daily accountability, task management, reflections, and structured learning journeys. Version 1 ships with a Dutch learning path designed around pronunciation, sounds, reading patterns, sentence structure, vocabulary, and conversation.

## Architecture

- Next.js App Router with TypeScript
- Feature-based folders under `src/features`
- Prisma + PostgreSQL for persistent data
- Auth.js/NextAuth credentials auth with Prisma adapter
- Server actions for authenticated mutations
- Zustand for small client UI state
- React Hook Form + Zod on forms
- Installable PWA manifest and service worker

## Setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL`, `AUTH_SECRET`, and `AUTH_URL`.
3. Install dependencies with `npm install`.
4. Run `npm run prisma:migrate`.
5. Optional: seed the Dutch curriculum with `npm run prisma:seed`.
6. Start development with `npm run dev`.

## Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection string.
- `AUTH_SECRET`: long random secret used by Auth.js.
- `AUTH_URL`: app URL, usually `http://localhost:3000` locally.
- `DEEPSEEK_API_KEY`: optional future AI curriculum integration key.

## Future Expansion

- Add DeepSeek implementation in `src/features/learning/services/deepseek-curriculum-provider.ts`.
- Add learning paths by creating new `LearningPath` records with ordered modules and lessons.
- Add voice practice by extending `LessonProgress` with pronunciation attempts.
- Add spaced repetition with a dedicated review queue related to `Lesson`.
