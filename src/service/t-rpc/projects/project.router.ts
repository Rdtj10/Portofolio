// src/server/api/routers/project.ts
import { z } from 'zod';
import { publicProcedure, router } from '../context';
import { db } from '../db';

const statusEnum = z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED']);

export const projectRouter = router({
  getAll: publicProcedure.query(() =>
    db.project.findMany({
      include: { role: true, languages: true },
      orderBy: { createdAt: 'desc' },
    })
  ),

  getById: publicProcedure.input(z.string()).query(({ input }) =>
    db.project.findUnique({
      where: { id: input },
      include: { role: true, languages: true, colors: true }
    })
  ),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        short_description: z.string().optional(),
        status: statusEnum,
        roleId: z.string(),
        ownStatus: z.string().optional(),
        pending_reason: z.string().optional(),
        restricted_reason: z.string().optional(),
        site: z.string().optional(),
        url: z.string().optional(),
        imageUrl: z.string().optional(),
        languageIds: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      return db.project.create({
        data: {
          title: input.title,
          description: input.description,
          short_description: input.short_description,
          status: input.status,
          roleId: input.roleId,
          ownStatus: input.ownStatus,
          pending_reason: input.pending_reason,
          restricted_reason: input.restricted_reason,
          site: input.site,
          url: input.url,
          imageUrl: input.imageUrl,
          languages: {
            connect: input.languageIds?.map(id => ({ id })) || [],
          },
        },
        include: { role: true, languages: true },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        short_description: z.string().optional(),
        status: statusEnum,
        roleId: z.string(),
        ownStatus: z.string().optional(),
        pending_reason: z.string().optional(),
        restricted_reason: z.string().optional(),
        site: z.string().optional(),
        url: z.string().optional(),
        imageUrl: z.string().optional(),
        languageIds: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      return db.project.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          short_description: input.short_description,
          status: input.status,
          roleId: input.roleId,
          ownStatus: input.ownStatus,
          pending_reason: input.pending_reason,
          restricted_reason: input.restricted_reason,
          site: input.site,
          url: input.url,
          imageUrl: input.imageUrl,
          languages: {
            set: input.languageIds?.map(id => ({ id })) || [],
          },
        },
        include: { role: true, languages: true },
      });
    }),

  delete: publicProcedure.input(z.string()).mutation(({ input }) =>
    db.project.delete({ where: { id: input } })
  ),
});
