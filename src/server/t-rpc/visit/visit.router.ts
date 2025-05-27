import { publicProcedure, router } from '../context';
import { db } from '../db';
import { z } from "zod";

export const visitRouter = router({
  getAll: publicProcedure.query(() => db.visit.findMany({})),

  getIndexByIp: publicProcedure
    .query(async ({ ctx }) => {
      const req = ctx.req;

      const forwardedFor = req?.headers?.get("x-forwarded-for");
      const cfConnectingIp = req?.headers?.get("cf-connecting-ip");
      const xRealIp = req?.headers?.get("x-real-ip");

      const serverDetectedIp =
        (typeof forwardedFor === "string" ? forwardedFor.split(",")[0] : "") ||
        cfConnectingIp ||
        xRealIp ||
        "unknown";
      const allVisits = await db.visit.findMany({
        orderBy: { createdAt: 'asc' },
        select: { ip: true },
      });

      const index = allVisits.findIndex(v => v.ip === serverDetectedIp);

      return { index };
    }),

  create: publicProcedure
    .input(
      z.object({
        userAgent: z.string().optional(),
        url: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const req = ctx.req;

      const forwardedFor = req?.headers?.get("x-forwarded-for");
      const cfConnectingIp = req?.headers?.get("cf-connecting-ip");
      const xRealIp = req?.headers?.get("x-real-ip");

      const ip =
        (typeof forwardedFor === "string" ? forwardedFor.split(",")[0] : "") ||
        cfConnectingIp ||
        xRealIp ||
        "unknown";

      const userAgent = input.userAgent || req?.headers?.get("user-agent") || "unknown";
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