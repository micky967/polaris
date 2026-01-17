import { UserButton } from "@clerk/nextjs"
import { NodeToggle } from "./node-toggle"


export const Navbar = () => {
    return (
        <div className="flex items-center justify-between px-6 py-2 border-b sticky top-0 bg-background z-10">
            <UserButton afterSignOutUrl="/" />
            <NodeToggle />
        </div>
    );
};