"use client";

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
  Cloud,
  Home,
  Flag,
  UserCheck,
  CircleUserRound,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/share-button";
import { weatherCodes } from "@/lib/utils/weather";
import { useJoinCommunity } from "@/hooks/use-join-community";

interface ExtendedCommunity extends Community {
  weather?: {
    temperature_2m: number;
    weather_code: number;
    time: string;
  };
  isMember: boolean;
}

interface CommunityHeaderProps {
  community: ExtendedCommunity;
}

export function CommunityHeader({ community }: CommunityHeaderProps) {
  const { joinCommunity, leaveCommunity, isLoading } = useJoinCommunity(
    community.id,
    community.isMember
  );
  const getCommunityAvatarUrl = (path: string): string =>
    getSupabaseStorageUrl("community-avatars", path);

  const page = community.wikipedia_data as any;
  const imageUrl = community.avatar
    ? getCommunityAvatarUrl(community.avatar)
    : page?.thumbnail?.source;

  const weatherInfo = community.weather
    ? weatherCodes[community.weather.weather_code]
    : null;

  const handleMembershipAction = () => {
    if (community.isMember) {
      leaveCommunity();
    } else {
      joinCommunity();
    }
  };

  return (
    <div className="relative container mx-auto px-6 h-full min-h-[80vh] flex flex-col items-center justify-center">
      {/* Back Button */}
      <div className="absolute left-4 top-8 z-10">
        <Link href="/communities">
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center pb-6 pt-12">
        {/* Image */}
        <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-3xl border-4 border-background shadow-xl sm:h-40 sm:w-40 animate-wobble">
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
          <Button
            size="lg"
            className="gap-2 min-w-[140px]"
            onClick={handleMembershipAction}
            disabled={isLoading}
            variant={community.isMember ? "outline" : "default"}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : community.isMember ? (
              <UserCheck className="h-4 w-4" />
            ) : (
              <Users className="h-4 w-4" />
            )}
            {isLoading
              ? community.isMember
                ? "Leaving..."
                : "Joining..."
              : community.isMember
              ? "Leave Community"
              : "Join Community"}
          </Button>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-8 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5">
            <div className="flex flex-col items-center gap-2 text-center h-full">
              <div className="flex-grow flex items-center justify-center">
                <CircleUserRound className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">Members</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5">
            <div className="flex flex-col items-center gap-2 text-center h-full">
              <div className="flex-grow flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {community.population && community.population !== 0
                    ? community.population?.toLocaleString()
                    : "?"}
                </div>
                <div className="text-xs text-muted-foreground">Population</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5">
            <div className="flex flex-col items-center gap-2 text-center h-full">
              <div className="flex-grow flex items-center justify-center">
                <Flag className="h-6 w-6 text-primary" />
              </div>
              <div>
                {community.parent_name ? (
                  <>
                    <Link
                      href={`/c/${community.parent_slug}`}
                      className="text-lg font-semibold hover:underline line-clamp-1"
                    >
                      {community.parent_name}
                    </Link>
                    <div className="text-xs text-muted-foreground">Part of</div>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-semibold">Independent</div>
                    <div className="text-xs text-muted-foreground">Status</div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5">
            <div className="flex flex-col items-center gap-2 text-center">
              {community.weather ? (
                <>
                  <div
                    className="text-4xl"
                    role="img"
                    aria-label={weatherInfo?.label}
                  >
                    {weatherInfo?.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {Math.round(community.weather.temperature_2m)}°C
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {weatherInfo?.label}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Cloud className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">--°C</div>
                    <div className="text-xs text-muted-foreground">Weather</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
