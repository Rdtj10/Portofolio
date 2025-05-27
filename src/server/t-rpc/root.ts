// server/trpc/root.ts
import { router } from './context';
import { projectRouter } from './projects/project.router';
import { taskRouter } from './roles/role.router';
import { languageRouter } from './languages/language.router';
import { visitRouter } from './visit/visit.router';

export const appRouter = router({
  project: projectRouter,
  task: taskRouter,
  language: languageRouter,
  visit: visitRouter,
});

export type AppRouter = typeof appRouter;
