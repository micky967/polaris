import { ModeToggle } from "@/components/node-toggle";


const Page = () => {
  return ( 
    <div className="flex items-center justify-end p-4">
      <h1 className="text-sm font-medium text-right mr-4 text-red-400">Change Dark / Light Mode</h1>
      <ModeToggle />
    </div>
   );
};
 
export default Page;