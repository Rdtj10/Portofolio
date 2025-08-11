import { publicProcedure, router } from '../context';
import { db } from '../db';
import { z } from "zod";
import { getISOWeek, getYear } from 'date-fns';

export const visitRouter = router({
  getAll: publicProcedure.query(() => db.visit.findMany({})),
  
  getWeeklyStats: publicProcedure.query(async () => {
    const visits = await db.visit.findMany({
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    // Kelompokkan berdasarkan tahun & minggu
    const weeklyMap: Record<string, number> = {};

    visits.forEach((visit) => {
      const date = new Date(visit.createdAt);
      const year = getYear(date);
      const week = getISOWeek(date);
      const key = `${year}-W${week}`;
      weeklyMap[key] = (weeklyMap[key] || 0) + 1;
    });

    // Ubah ke array hasil
    const result = Object.entries(weeklyMap).map(([week, count]) => ({
      week,
      count,
      avgPerDay: count / 7,
    }));

    return result;
  }),
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