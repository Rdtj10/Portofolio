import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { fetcher, API_BASE_URL } from "@/utils/api";

export interface Role {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  short_description?: string;
  status: string;
  roleId: string;
  role: Role;
  period?: string;
  task?: string;
  site?: string;
  imageUrl?: string;
  languages: Language[];
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
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
  return useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: () => fetcher('/roles')
  });
};

export const useLanguages = () => {
  return useQuery<Language[]>({
    queryKey: ['languages'],
    queryFn: () => fetcher('/languages')
  });
};
