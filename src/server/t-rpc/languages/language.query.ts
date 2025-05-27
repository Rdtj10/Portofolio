import { appRouter } from '@/server/t-rpc/root';
import { createCallerContext } from '@/server/t-rpc/context';
import { queryClient } from '@/utils/queryClient';

const caller = appRouter.createCaller(await createCallerContext());

export async function getAllLanguage() {
  const data = await queryClient.fetchQuery({
    queryKey: ['language.getAll'],
    queryFn: () => caller.language.getAll(), 
  });
  return data;
}

export async function getLanguageById(id: string) {
  const data = await queryClient.fetchQuery({
    queryKey: ['language.getById', id],
    queryFn: () => caller.language.getById(id),
  });
  return data;
}
