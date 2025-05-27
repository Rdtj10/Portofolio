import { publicProcedure, router } from '../context';
import { db } from '../db';
import { z } from "zod";

export const visitRouter = router({
  getAll: publicProcedure.query(() => db.visit.findMany()),
  create: publicProcedure
    .input(
      z.object({
        userAgent: z.string().optional(), // Jadikan opsional di input
        url: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => { // Perbaiki typing jika bisa
      const req = ctx.req; // Ini adalah objek Request

      // --- Perubahan ada di sini ---
      const forwardedFor = req?.headers?.get("x-forwarded-for");
      const cfConnectingIp = req?.headers?.get("cf-connecting-ip");
      const xRealIp = req?.headers?.get("x-real-ip"); // Tambahkan ini untuk Vercel

      // Log untuk debugging
      console.log("Headers:", req?.headers);
      console.log("x-forwarded-for:", forwardedFor);
      console.log("cf-connecting-ip:", cfConnectingIp);
      console.log("x-real-ip:", xRealIp);

      const ip =
        (typeof forwardedFor === "string" ? forwardedFor.split(",")[0] : "") ||
        cfConnectingIp ||
        xRealIp || // Prioritaskan x-real-ip jika ada
        "unknown";

      const userAgent = input.userAgent || req?.headers?.get("user-agent") || "unknown";
      const url = input.url || "unknown"; // Pastikan input.url selalu ada jika tidak opsional di schema

      console.log("Resolved IP for DB:", ip); // Log IP yang akan disimpan

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