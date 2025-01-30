"use client";

import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-6 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-foreground/10 p-4">
            <Search className="h-8 w-8 text-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Page not found
        </h1>
        <p className="text-foreground/80 mb-8">
          We couldn't find the page you're looking for. The page might have been
          removed, renamed, or doesn't exist.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button variant="secondary" onClick={() => window.history.back()}>
            Go back
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
