// src/server/api/routers/language.ts
import { z } from 'zod';
import { publicProcedure, router } from '../context';
import { db } from '../db';

export const languageRouter = router({
  getAll: publicProcedure.query(() => db.language.findMany({ include: { projects: true } })),

  getById: publicProcedure.input(z.string()).query(({ input }) =>
    db.language.findUnique({ where: { id: input }, include: { projects: true } })
  ),

  create: publicProcedure.input(z.object({
    name: z.string(),
  })).mutation(({ input }) =>
    db.language.create({ data: { name: input.name } })
  ),

  update: publicProcedure.input(z.object({
    id: z.string(),
    name: z.string(),
  })).mutation(({ input }) =>
    db.language.update({ where: { id: input.id }, data: { name: input.name } })
  ),

  delete: publicProcedure.input(z.string()).mutation(({ input }) =>
    db.language.delete({ where: { id: input } })
  ),
});
