// src/server/api/routers/task.ts
import { z } from 'zod';
import { publicProcedure, router } from '../context';
import { db } from '../db';

export const taskRouter = router({
  getAll: publicProcedure.query(() => db.projectRole.findMany({ include: { project: true } })),

  getById: publicProcedure.input(z.string()).query(({ input }) =>
    db.projectRole.findUnique({ where: { id: input }, include: { project: true } })
  ),

  create: publicProcedure.input(z.object({
    name: z.string(),
    description: z.string().optional(),
    projectId: z.string(),
  })).mutation(({ input }) =>
    db.projectRole.create({
      data: {
        name: input.name,
      },
    })
  ),

  update: publicProcedure.input(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    projectId: z.string(),
  })).mutation(({ input }) =>
    db.projectRole.update({
      where: { id: input.id },
      data: {
        name: input.name,
      },
    })
  ),

  delete: publicProcedure.input(z.string()).mutation(({ input }) =>
    db.projectRole.delete({ where: { id: input } })
  ),
});
