"use client";

import { PostcodeSearch } from "@/components/postcode-search";
import { useRouter } from "next/navigation";
import { Map } from "lucide-react";

export function NoLocationAuth() {
  const router = useRouter();

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-6 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-white/10 p-4">
            <Map className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-white mb-2">
          No Location Set
        </h1>
        <p className="text-white/80 mb-8">
          Sign in to save your location or search for a postcode:
        </p>
        <div className="max-w-sm mx-auto">
          <PostcodeSearch
            onSelect={(postcode) => {
              router.push(`/map?postcode=${postcode}`);
            }}
            placeholder="Search for a postcode..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            buttonClassName="bg-white/10 hover:bg-white/20 text-white"
          />
        </div>
        <p className="text-white/60 text-sm mt-4">
          Or{" "}
          <a href="/auth/login" className="underline hover:text-white">
            login/signup
          </a>{" "}
          to save your location
        </p>
      </div>
    </div>
  );
}
