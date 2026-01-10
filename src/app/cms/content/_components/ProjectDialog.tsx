"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/utils/trpc";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ProjectDialogProps {
  mode?: "create" | "edit";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project?: any;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export default function ProjectDialog({
  mode = "create",
  project,
  trigger,
  onSuccess,
}: ProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [status, setStatus] = useState("PLANNED");
  const [roleId, setRoleId] = useState("");
  const [period, setPeriod] = useState("");
  const [task, setTask] = useState("");
  const [site, setSite] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Queries
  const { data: roles } = trpc.role.getAll.useQuery();
  const { data: languages } = trpc.language.getAll.useQuery();
  const utils = trpc.useUtils();

  const createMutation = trpc.project.create.useMutation({
    onSuccess: () => {
      toast.success("Project created successfully");
      utils.project.getAll.invalidate();
      setOpen(false);
      onSuccess?.();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.project.update.useMutation({
    onSuccess: () => {
      toast.success("Project updated successfully");
      utils.project.getAll.invalidate();
      setOpen(false);
      onSuccess?.();
    },
    onError: (err) => toast.error(err.message),
  });

  useEffect(() => {
    if (project && mode === "edit") {
      setTitle(project.title);
      setDescription(project.description || "");
      setShortDescription(project.short_description || "");
      setStatus(project.status);
      setRoleId(project.roleId);
      setPeriod(project.period || "");
      setTask(project.task || "");
      setSite(project.site || "");
      setImageUrl(project.imageUrl || "");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setSelectedLanguages(project.languages?.map((l: any) => l.id) || []);
    }
  }, [project, mode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        title,
        description,
        short_description: shortDescription,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        status: status as any,
        roleId,
        period,
        task,
        site,
        imageUrl,
        languageIds: selectedLanguages,
      };

      if (mode === "create") {
        await createMutation.mutateAsync(data);
      } else {
        await updateMutation.mutateAsync({ id: project.id, ...data });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = (id: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Icon icon="solar:add-circle-bold" className="mr-2" />
            Add Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Project" : "Edit Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANNED">Planned</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={roleId} onValueChange={setRoleId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles?.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Period</Label>
              <Input
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="2023 - Present"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Summary (Short Description)</Label>
            <Textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Full Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label>Task / Contributions</Label>
            <Textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label>Website URL</Label>
              <Input
                value={site}
                onChange={(e) => setSite(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/images/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tech Stack</Label>
            <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-secondary/5">
              {languages?.map((lang) => (
                <div
                  key={lang.id}
                  onClick={() => toggleLanguage(lang.id)}
                  className={`cursor-pointer px-3 py-1 rounded-full text-sm flex items-center gap-2 border transition-all ${
                    selectedLanguages.includes(lang.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white border-border hover:bg-secondary/10"
                  }`}
                >
                  <Icon icon={lang.icon} />
                  {lang.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Icon icon="eos-icons:loading" className="mr-2 animate-spin" />
              ) : null}
              {mode === "create" ? "Create Project" : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
