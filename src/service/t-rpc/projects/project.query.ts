import { appRouter } from '@/service/t-rpc/root';
import { createContext } from '@/service/t-rpc/context';

const caller = appRouter.createCaller(await createContext());

export const getAllProjects = () => ({
  queryKey: ['project.getAll'],
  queryFn: () => caller.project.getAll(),
})

export const getProjectById = (id: string) => ({
  queryKey: ['project.getById', id],
  queryFn: () => caller.project.getById(id),
})
