// localhost:3000/demo

"use client";

import * as Sentry from "@sentry/nextjs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function () {

    const {userId} = useAuth();

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
        });        setLoading2(false);
    };

    // 1) Client error - throws in the browser
    const handleClientError = () => {
        Sentry.logger.info("User attempting to click on client function called Portsmouth FC.", { userId });
        throw new Error("Client error: Something went wrong in the browser!");
    };

    // 2) API error - triggers server-side error
    const handleApiError = async () => {
        await fetch("/api/demo/error", { method: "POST" });
    };

    // 3) Inngest error - triggers error in background job
    const handleInngestError = async () => {
        await fetch("/api/demo/inngest-error", { method: "POST" });
    };

    return ( 
        <div className="space-x-4 p-8">
            <Button disabled={loading} onClick={handleBlocking} variant="outline" className="hover:cursor-pointer hover:opacity-80 size-xs">
                {loading ? <Spinner className="size-4 animate-spin" /> : "Blocking"}
            </Button>
            <Button disabled={loading2} onClick={handleBackground} variant="outline" className="hover:cursor-pointer hover:opacity-80 size-xs">
                {loading2 ? <Spinner className="size-4 animate-spin" /> : "Background"}
            </Button>
            <Button
            onClick={handleClientError}
            variant="destructive"
            className="hover:cursor-pointer hover:opacity-80 size-xs"
            >
            Trigger Client Error
            </Button>
            <Button
            onClick={handleApiError}
            variant="destructive"
            className="hover:cursor-pointer hover:opacity-80 size-xs"
            >
            Trigger API Error
            </Button>
            <Button
            onClick={handleInngestError}
            variant="destructive"
            className="hover:cursor-pointer hover:opacity-80 size-xs"
            >
            Trigger Inngest Error
            </Button>
        </div>
     );
};