import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { AlertCircleIcon, Loader2Icon, GlobeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { useProjects } from "../hooks/use-projects";
import { Doc } from "../../../../convex/_generated/dataModel";


interface ProjectsCommandDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const getProjectIcon = (project: Doc<"projects">) => {
  if (project.importStatus === "completed") {
    return <FaGithub className="size-4 text-green-500" />;
  }

  if (project.importStatus === "failed") {
    return <AlertCircleIcon className="size-4 text-rose-500" />;
  }

  if (project.importStatus === "importing") {
    return <Loader2Icon className="size-4 text-yellow-500 animate-spin" />;
  }
  return <GlobeIcon className="size-4 text-muted-foreground" />;
};

export const ProjectsCommandDialog = ({
    open,
    onOpenChange,

}: ProjectsCommandDialogProps) => {
    const router = useRouter();
    const projects = useProjects();

    const handleSelect = (projectId: string) => {
        router.push(`/projects/${projectId}`);
        onOpenChange(false);
};
    return (
        <CommandDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Search projects"
        description="Search and navigate to your projects"
        >
            <CommandInput placeholder="Search projects..." />
            <CommandList>
            <CommandEmpty>No projects found</CommandEmpty>
            <CommandGroup heading="Projects">
                {projects?.map((project) => (
                    <CommandItem 
                    key={project._id} 
                    value={`${project.name}-${project._id}`} 
                    onSelect={() => handleSelect(project._id)}
                    >
                        {getProjectIcon(project)}
                        <span>{project.name}</span>
                    </CommandItem>
                ))}
            </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};