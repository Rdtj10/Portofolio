import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { fetcher, API_BASE_URL } from "@/utils/api";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: FormData) => {
      const res = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useRoles = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any[]>({
    queryKey: ['roles'],
    queryFn: () => fetcher('/roles')
  });
};

export const useLanguages = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any[]>({
    queryKey: ['languages'],
    queryFn: () => fetcher('/languages')
  });
};
