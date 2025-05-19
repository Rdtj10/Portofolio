// server/trpc/root.ts
import { router } from './context';
import { projectRouter } from './routers/project.router';
import { taskRouter } from './routers/task.router';
import { languageRouter } from './routers/language.router';

export const appRouter = router({
  project: projectRouter,
  task: taskRouter,
  language: languageRouter,
});

export type AppRouter = typeof appRouter;
