import { db } from './db';
import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export const createContext = ({ req }: FetchCreateContextFnOptions) => ({ db, req });
export const createCallerContext = async () => {
  const dummyReq = new Request('http://localhost');

  return { db, req: dummyReq };
};
type Context = ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;