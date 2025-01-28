"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-6 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-500/10 p-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-white mb-2">
          Something went wrong
        </h1>
        <p className="text-white/80 mb-8">
          An error occurred while loading this page. We've been notified and are
          looking into it.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button variant="secondary" onClick={() => reset()}>
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline">
              <Home className="h-4 w-4" />
              Go home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
