import { getSupabaseStorageUrl } from "@/lib/utils";
import { Community } from "@/lib/server/communities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MapPin,
  CalendarDays,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/share-button";

interface CommunityHeaderProps {
  community: Community;
}

export function CommunityHeader({ community }: CommunityHeaderProps) {
  const getCommunityAvatarUrl = (path: string): string =>
    getSupabaseStorageUrl("community-avatars", path);

  const page = community.wikipedia_data as any;
  const imageUrl = community.avatar
    ? getCommunityAvatarUrl(community.avatar)
    : page?.thumbnail?.source;

  return (
    <div className="relative container mx-auto px-4 h-full min-h-[80vh] flex flex-col items-center justify-center">
      {/* Back Button */}
      <div className="absolute left-4 top-4 z-10">
        <Link href="/communities">
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center pb-6 pt-12">
        {/* Image */}
        <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-3xl border-4 border-background shadow-xl sm:h-40 sm:w-40">
          <img
            src={imageUrl || "/placeholder-community.jpg"}
            alt={community.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Community Info */}
        <div className="text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {community.name}
            </h1>
            <Badge variant="secondary" className="capitalize">
              {community.type}
            </Badge>
          </div>
          <p className="mx-auto max-w-2xl text-center text-muted-foreground">
            {page?.extract ||
              `Welcome to ${community.name}! Join our community to connect with locals and stay updated with what's happening.`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <ShareButton
            size="lg"
            title={`Join ${community.name} on Lcly`}
            text={`Check out the ${community.name} community on Lcly!`}
          />
          <Button size="lg" className="gap-2">
            <Users className="h-4 w-4" />
            Join Community
          </Button>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-8 grid w-full max-w-3xl grid-cols-2 gap-4 px-4 sm:grid-cols-4">
          <div className="p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5">
            <div className="flex flex-col items-center gap-2 text-center">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">2.4k</div>
                <div className="text-xs text-muted-foreground">Members</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5">
            <div className="flex flex-col items-center gap-2 text-center">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">
                  {community.population?.toLocaleString() || "N/A"}
                </div>
                <div className="text-xs text-muted-foreground">Population</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5">
            <div className="flex flex-col items-center gap-2 text-center">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground">Events</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5">
            <div className="flex flex-col items-center gap-2 text-center">
              <MessageSquare className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">Active</div>
                <div className="text-xs text-muted-foreground">Discussions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
