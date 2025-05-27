import { appRouter } from '@/server/t-rpc/root';
import { createCallerContext } from '@/server/t-rpc/context';

const caller = appRouter.createCaller(await createCallerContext());

export const getAllProjects = () => ({
  queryKey: ['project.getAll'],
  queryFn: () => caller.project.getAll(),
})

export const getProjectById = (id: string) => ({
  queryKey: ['project.getById', id],
  queryFn: () => caller.project.getById(id),
})
