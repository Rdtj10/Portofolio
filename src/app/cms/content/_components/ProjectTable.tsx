"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { trpc } from "@/utils/trpc";
import { toast } from "react-toastify";
import ProjectDialog from "./ProjectDialog";
import Image from "next/image";

interface ProjectTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projects: any[];
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const utils = trpc.useUtils();
  
  const deleteMutation = trpc.project.delete.useMutation({
    onSuccess: () => {
      toast.success("Project deleted");
      utils.project.getAll.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  if (!projects?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-white rounded-lg border shadow-sm">
        <Icon icon="solar:folder-open-linear" className="text-6xl mb-4 opacity-20" />
        <p>No projects found in this category.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Tech Stack</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <div className="relative w-12 h-12 rounded bg-secondary/10 overflow-hidden">
                  <Image
                    src={project.imageUrl || "/images/hero-bg.png"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{project.title}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {project.short_description}
                  </span>
                </div>
              </TableCell>
              <TableCell>{project.role.name}</TableCell>
              <TableCell>
                <div className="flex -space-x-2">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {project.languages.slice(0, 3).map((lang: any) => (
                    <div
                      key={lang.id}
                      className="w-6 h-6 rounded-full bg-white border flex items-center justify-center p-1"
                      title={lang.name}
                    >
                      <Icon icon={lang.icon} />
                    </div>
                  ))}
                  {project.languages.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-secondary text-[10px] text-white flex items-center justify-center border-white border">
                      +{project.languages.length - 3}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    project.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : project.status === "IN_PROGRESS"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {project.status.replace("_", " ")}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <ProjectDialog
                    mode="edit"
                    project={project}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Icon icon="solar:pen-bold" className="text-blue-500" />
                      </Button>
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Icon icon="solar:trash-bin-trash-bold" className="text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
