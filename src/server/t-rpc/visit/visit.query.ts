// import { appRouter } from '@/server/t-rpc/root';
// import { createContext } from '@/server/t-rpc/context';

// const caller = appRouter.createCaller(await createContext());

// export const getAllVisits = () => ({
//   queryKey: ['visit.getAll'],
//   queryFn: () => caller.visit.getAll(),
// });

// export const createVisit = (input: { ip: string; userAgent: string; url: string }) => ({
//   mutationKey: ['visit.create', input],
//   mutationFn: () => caller.visit.create(input),
// });