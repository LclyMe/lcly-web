"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CommunityGrid } from "@/components/communities/community-grid";
import { CommunityFilters } from "@/components/communities/community-filters";
import { Community } from "@/lib/server/communities";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

async function fetchCommunities(search?: string, type?: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (type && type !== "all") params.set("type", type);

  const response = await fetch(`/api/communities?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch communities");
  }
  return response.json() as Promise<Community[]>;
}

function CommunitySkeletons() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i}>
          <div className="overflow-hidden rounded-3xl">
            <Skeleton className="aspect-[5/2] md:aspect-[16/9] w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: communities = [], isLoading } = useQuery({
    queryKey: ["communities", debouncedSearch, selectedType],
    queryFn: () => fetchCommunities(debouncedSearch, selectedType),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative mb-8">
          <Link href="/">
            <Button variant="secondary" size="icon" className="">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Communities</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover and connect with local communities across the UK
        </p>
      </div>
      <CommunityFilters
        onSearch={setSearchQuery}
        onTypeChange={setSelectedType}
      />
      <div className="h-8" />
      {isLoading ? (
        <CommunitySkeletons />
      ) : (
        <CommunityGrid communities={communities} />
      )}
    </div>
  );
}
