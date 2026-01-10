// import { ModeToggle } from "@/components/node-toggle";

// const Page = () => {
//   return (
//     <div className="flex items-center justify-end p-4">
//       <h1 className="text-sm font-medium text-right mr-4 text-red-400">
//         Change Dark / Light Mode
//       </h1>
//       <ModeToggle />
//     </div>
//   );
// };

// export default Page;

"use client"


import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { NodeToggle } from "@/components/node-toggle";

  const Page = () => {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);

  return (
    <>
      <div>
        {/* <UserButton afterSignOutUrl="/" /> */}
        <NodeToggle />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Button
          variant="destructive"
          className="hover:cursor-pointer hover:opacity-80"
          onClick={() => createProject({ name: "New Project", ownerId: "123" })}
        >
          Create Project
        </Button>
        {projects?.map((project) => (
          <div className="border rounded p-2 flex flex-col" key={project._id}>
            <p>{project.name}</p>
            <p>Owner Id: {project.ownerId}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;