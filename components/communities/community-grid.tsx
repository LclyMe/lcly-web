import Image from "next/image";
import Link from "next/link";
import { Database } from "@/types/database.types";
import { getSupabaseStorageUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

type Community = Database["public"]["Functions"]["get_community"]["Returns"][0];

interface WikipediaData {
  extract?: string;
  thumbnail?: {
    source: string;
  };
}

interface CommunityGridProps {
  communities: Community[];
}

export function CommunityGrid({ communities }: CommunityGridProps) {
  const getCommunityAvatarUrl = (path: string): string =>
    getSupabaseStorageUrl("community-avatars", path);

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {communities.map((community) => {
        const isNew = +oneMonthAgo < +new Date(community.created_at);
        const page = community.wikipedia_data as WikipediaData;

        return (
          <Link
            key={community.id}
            href={`/c/${community.slug}`}
            className="group"
          >
            <Card className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/25">
              <div className="aspect-[5/2] md:aspect-[16/9] relative overflow-hidden">
                <img
                  src={
                    community.avatar
                      ? getCommunityAvatarUrl(community.avatar)
                      : page?.thumbnail?.source || "/community-placeholder.jpg"
                  }
                  alt={community.name}
                  className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
                />
                {isNew && (
                  <Badge className="absolute left-4 top-4" variant="secondary">
                    New
                  </Badge>
                )}
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="flex items-center justify-between px-4 py-2 md:py-4 backdrop-blur-sm bg-background/40">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {community.name}
                    </h3>
                    <Button size="sm" className="font-semibold">
                      Visit
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
