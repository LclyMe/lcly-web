"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { type Json } from "@/types/database.types";

interface Community {
  id: string;
  name: string;
  slug: string;
  type: string;
  avatar: string | null;
  wikipedia_data: Json;
}

async function fetchUserCommunities() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: memberships } = await supabase
    .from("community_members")
    .select(
      `
      community:communities (
        id,
        name,
        slug,
        type,
        avatar,
        wikipedia_data
      )
    `
    )
    .eq("user_id", user.id)
    .order("createdat", { ascending: false });

  return memberships?.map((m) => m.community) || [];
}

export function CommunityList() {
  const { data: communities = [], isLoading } = useQuery({
    queryKey: ["user-communities"],
    queryFn: fetchUserCommunities,
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-8 w-[100px]" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            My Communities
          </h2>
          <p className="text-sm text-muted-foreground">
            Communities you're a member of
          </p>
        </div>
        <Link href="/communities">
          <Button variant="outline" size="sm" className="gap-2">
            Find More
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {communities.length === 0 ? (
        <div className="text-center py-8">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="font-medium text-lg mb-2">No Communities Yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Join communities to connect with locals and stay updated
          </p>
          <Link href="/communities">
            <Button>Browse Communities</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {communities.map((community: Community) => (
            <Link
              key={community.id}
              href={`/c/${community.slug}`}
              className="group"
            >
              <Card className="overflow-hidden">
                <div className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    {community.avatar ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/community-avatars/${community.avatar}`}
                        alt={community.name}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      <Users className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{community.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {community.type}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    View
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
