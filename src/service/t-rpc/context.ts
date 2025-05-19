import { db } from './db';
import { initTRPC } from "@trpc/server";

export const createContext = () => ({ db });
type Context = ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;