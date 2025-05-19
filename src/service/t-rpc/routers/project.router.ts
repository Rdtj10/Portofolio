// src/server/api/routers/project.ts
import { z } from 'zod';
import { publicProcedure,router } from '../context';
import { db } from '../db';

export const projectRouter = router({
  getAll: publicProcedure.query(() => db.project.findMany({
    include: { tasks: true, languages: true },
  })),

  getById: publicProcedure.input(z.string()).query(({ input }) =>
    db.project.findUnique({ where: { id: input }, include: { tasks: true, languages: true } })
  ),

  create: publicProcedure.input(z.object({
    name: z.string(),
    description: z.string().optional(),
    status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED']),
    languageIds: z.array(z.string()).optional(),
  })).mutation(async ({ input }) => {
    return db.project.create({
      data: {
        name: input.name,
        description: input.description,
        status: input.status,
        languages: {
          connect: input.languageIds?.map(id => ({ id })) || [],
        },
      },
    });
  }),

  update: publicProcedure.input(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED']),
    languageIds: z.array(z.string()).optional(),
  })).mutation(({ input }) =>
    db.project.update({
      where: { id: input.id },
      data: {
        name: input.name,
        description: input.description,
        status: input.status,
        languages: {
          set: input.languageIds?.map(id => ({ id })) || [],
        },
      },
    })
  ),

  delete: publicProcedure.input(z.string()).mutation(({ input }) =>
    db.project.delete({ where: { id: input } })
  ),
});
