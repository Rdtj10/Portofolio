"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/utils/trpc";
import ProjectTable from "./_components/ProjectTable";
import ProjectDialog from "./_components/ProjectDialog";

export default function Page() {
  const { data: projects} = trpc.project.getAll.useQuery();

  const completedProjects = projects?.filter((p) => p.status === "COMPLETED") || [];
  const inProgressProjects = projects?.filter((p) => p.status === "IN_PROGRESS") || [];
  const plannedProjects = projects?.filter((p) => p.status === "PLANNED") || [];

  return (
    <section className="w-full px-12 py-8 flex flex-col gap-6 h-screen overflow-hidden">
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-gray-600">
            Manage projects to be displayed on the website.
          </p>
        </div>
        <ProjectDialog />
      </div>

      <Tabs defaultValue="completed" className="w-full flex-1 flex flex-col overflow-hidden">
        <TabsList className="mb-4 w-fit">
          <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
          <TabsTrigger value="onprogress">On Progress ({inProgressProjects.length})</TabsTrigger>
          <TabsTrigger value="pending">Planned ({plannedProjects.length})</TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-auto pb-20">
          <TabsContent value="completed" className="mt-0 h-full">
             <ProjectTable projects={completedProjects} />
          </TabsContent>
          <TabsContent value="onprogress" className="mt-0 h-full">
             <ProjectTable projects={inProgressProjects} />
          </TabsContent>
          <TabsContent value="pending" className="mt-0 h-full">
             <ProjectTable projects={plannedProjects} />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
