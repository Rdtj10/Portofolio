import type { FetchQueryOptions } from '@tanstack/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import React from 'react';

type TProps = {
  children: React.ReactNode;
  prefetchQuery: FetchQueryOptions<unknown, Error, unknown, readonly unknown[], never>[];
};

export default async function HydrationQuery({ children, prefetchQuery }: TProps) {
  await Promise.all(prefetchQuery.map((query) => queryClient.prefetchQuery(query)));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
