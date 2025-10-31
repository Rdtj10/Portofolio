import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <section className="w-full px-12 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-gray-600">
          Manage projects to be displayed on the website.
        </p>
      </div>
      <Tabs defaultValue="completed" className="w-full">
        <TabsList className="mb-4 space-x-8">
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="onprogress">On Progress</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <div>Project management interface goes here.</div>
        </TabsContent>
        <TabsContent value="settings">
          <div>Settings interface goes here.</div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
