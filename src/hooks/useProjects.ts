import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/utils/api';

export interface Project {
  id: string;
  title: string;
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED";
  period?: string;
  pending_reason?: string;
  ownStatus?: string;
  short_description?: string;
  description?: string;
  company_name?: string;
  company_logo?: string;
  site?: string;
  url?: string;
  imageUrl?: string;
  restricted_reason?: string;
  task?: string;
  roleId: string;
  role: {
    id: string;
    name: string;
  };
  languages: {
    id: string;
    name: string;
    icon: string;
  }[];
  colors: {
    id: string;
    name: string;
    hex: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export const useProjects = () => {
  return useQuery<Project[]>({
      queryKey: ['projects'],
      queryFn: () => fetcher('/projects')
  });
};

export const useProject = (id: string | undefined) => {
  return useQuery<Project>({
      queryKey: ['project', id],
      queryFn: () => fetcher(`/projects/${id}`),
      enabled: !!id
  });
};
