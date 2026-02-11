import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher, API_BASE_URL } from '@/utils/api';

export interface Visit {
  id: string;
  ip: string;
  userAgent?: string;
  url: string;
  createdAt: string;
}

export interface WeeklyStat {
  count: number;
  avgPerDay: number;
}

export const useVisits = () => {
    return useQuery<Visit[]>({
        queryKey: ['visits'],
        queryFn: () => fetcher('/visits'),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export const useVisitStats = () => {
    return useQuery<WeeklyStat[]>({
        queryKey: ['visitStats'],
        queryFn: () => fetcher('/visits/stats/weekly')
    });
};

export const useVisitorIndex = (options?: { enabled?: boolean }) => {
    return useQuery<{ index: number }>({
        queryKey: ['visitorIndex'],
        queryFn: () => fetcher('/visits/index-by-ip'),
        ...options
    });
};

export const useCreateVisit = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: { userAgent: string; url: string }) => {
            const res = await fetch(`${API_BASE_URL}/visits`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        },
        onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ['visits'] });
             queryClient.invalidateQueries({ queryKey: ['visitorIndex'] });
             queryClient.invalidateQueries({ queryKey: ['visitStats'] });
        }
    });
};
