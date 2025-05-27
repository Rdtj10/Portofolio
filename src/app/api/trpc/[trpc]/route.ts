// src/app/api/trpc/[trpc]/route.ts
import { appRouter } from '@/server/t-rpc/root';
import { createContext } from '@/server/t-rpc/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext,
  });
};

export { handler as GET, handler as POST };
