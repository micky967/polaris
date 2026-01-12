// localhost:3000/demo

"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export default function () {

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const handleBlocking = async () => {
        setLoading(true);
        await fetch("/api/demo/blocking", {
            method: "POST",
        });
        setLoading(false);
    };

    const handleBackground = async () => {
        setLoading2(true);
        await fetch("/api/demo/background", {
            method: "POST",
        });
        setLoading2(false);
    };


    return ( 
        <div className="space-x-4 p-8">
            <Button disabled={loading} onClick={handleBlocking} variant="outline" className="hover:cursor-pointer hover:opacity-80 size-xs">
                {loading ? <Spinner className="size-4 animate-spin" /> : "Blocking"}
            </Button>
            <Button disabled={loading2} onClick={handleBackground} variant="outline" className="hover:cursor-pointer hover:opacity-80 size-xs">
                {loading2 ? <Spinner className="size-4 animate-spin" /> : "Background"}
            </Button>
        </div>
     );
};