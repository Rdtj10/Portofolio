import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/t-rpc/root';

export const trpc = createTRPCReact<AppRouter>();