import { appRouter } from '@/service/t-rpc/root';
import { createContext } from '@/service/t-rpc/context';
import { queryClient } from '@/utils/queryClient';

const caller = appRouter.createCaller(await createContext());

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
