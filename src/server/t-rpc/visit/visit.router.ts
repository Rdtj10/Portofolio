import { publicProcedure, router } from '../context';
import { db } from '../db';
import { z } from "zod";

export const visitRouter = router({
  getAll: publicProcedure.query(() => db.visit.findMany()),
  create: publicProcedure
    .input(
      z.object({
        ip: z.string().optional(),
        userAgent: z.string(),
        url: z.string(),
      })
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .mutation(async ({ input, ctx }: any) => {
      const req = ctx.req;
      const ip =
        input.ip ||
        (req?.headers?.["x-forwarded-for"] as string)?.split(",")[0] ||
        req?.socket?.remoteAddress ||
        "unknown";
      const userAgent =
        input.userAgent || req?.headers?.["user-agent"] || "unknown";
      const url = input.url || "unknown";

      const existing = await db.visit.findFirst({
        where: { ip },
      });

      if (existing) {
        return { success: false, message: "Already tracked." };
      }

      await db.visit.create({
        data: {
          ip,
          userAgent,
          url,
        },
      });

      return { success: true };
    }),
});