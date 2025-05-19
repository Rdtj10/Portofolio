import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/service/t-rpc/root';

export const trpc = createTRPCReact<AppRouter>();
