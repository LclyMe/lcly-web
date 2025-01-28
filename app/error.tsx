"use client";

import { AlertCircle } from "lucide-react";
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
        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md w-full max-w-[200px] transition-colors"
          >
            Try again
          </button>
          <div className="block">
            <a
              href="/"
              className="inline-block px-4 py-2 bg-white text-black hover:bg-white/90 rounded-md w-full max-w-[200px] transition-colors"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
