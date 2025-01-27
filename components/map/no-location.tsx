"use client";

import { PostcodeSearch } from "@/components/postcode-search";
import { useRouter } from "next/navigation";

export function NoLocation() {
  const router = useRouter();

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Location Not Found
        </h1>
        <p className="text-white/80 mb-8">
          We couldn't find that location. Try searching for another postcode:
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
          <a href="/map" className="underline hover:text-white">
            return to your saved location
          </a>
        </p>
      </div>
    </div>
  );
}
