// src/server/t-rpc/routers/auth.ts
import { z } from "zod";
import { publicProcedure, router } from "../context";

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ passphrase: z.string() }))
    .mutation(async ({ input }) => {
      if (input.passphrase === process.env.CMS_KEY) {
        return { success: true };
      }
      return { success: false, message: "Invalid passphrase" };
    }),
});
