import { getCurrentProfile } from "@/lib/server/profile";
import { Button } from "@/components/ui/button";
import { MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getUserFirstCommunity } from "@/lib/server/profile";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { getWeather } from "@/lib/utils/weather";
import { weatherCodes } from "@/lib/utils/weather";
import { cn, getSupabaseStorageUrl } from "@/lib/utils";
import { WikipediaData } from "@/types/community";

export default async function HomePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  const firstCommunity = await getUserFirstCommunity(profile.id);

  // Fetch weather if we have a postcode location
  let weather;
  if (profile.postcode_location) {
    weather = await getWeather(
      profile.postcode_location.latitude,
      profile.postcode_location.longitude,
      true
    );
  }

  const headerTitle = (
    <>
      {profile.postcode && (
        <Button
          variant="secondary"
          size="sm"
          className="font-semibold text-foreground/80 text-lg h-10"
          asChild
        >
          <Link href={`/postcode/${profile.postcode}`}>
            <MapPin className="h-7 w-7" />
            {profile.postcode}
          </Link>
        </Button>
      )}
    </>
  );

  return (
    <div className="container max-w-2xl w-full mx-auto">
      <PageHeader title={headerTitle} showNotifications />

      {/* Main Cards */}
      <div className="flex flex-col gap-4 px-3">
        {/* Weather Card */}
        {profile.postcode_location && weather && (
          <div
            className={cn(
              "p-6 rounded-3xl bg-black text-white dark:bg-black/90 border border-border/50",
              "backdrop-blur-sm shadow-sm"
            )}
          >
            <div className="flex flex-col gap-4">
              {/* Current Weather */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">
                    {weatherCodes[weather.weather_code]?.icon || "🌦️"}
                  </div>
                  <div>
                    <div className="text-4xl font-semibold">
                      {Math.round(weather.temperature_2m)}°
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl">
                    {weatherCodes[weather.weather_code]?.label || "Weather"}
                  </div>
                  <div className="text-gray-400">
                    {profile.postcode_location.admin_ward || "Unknown"}
                  </div>
                </div>
              </div>

              {/* Hourly Forecast */}
              <div className="flex justify-between">
                {[...Array(6)].map((_, i) => {
                  const hour = new Date().getHours() + i + 1;
                  const displayHour = hour % 24;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="text-sm text-gray-400">
                        {displayHour === 12
                          ? "12 PM"
                          : displayHour === 0
                          ? "12 AM"
                          : displayHour > 12
                          ? `${displayHour - 12} PM`
                          : `${displayHour} AM`}
                      </div>
                      <div className="text-2xl">
                        {weatherCodes[weather.weather_code]?.icon || "🌦️"}
                      </div>
                      <div className="text-sm">
                        {Math.round(weather.temperature_2m - i)}°
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Community Card */}
        {firstCommunity ? (
          <Link href={`/c/${firstCommunity.slug}`}>
            <div
              className={cn(
                "p-6 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50",
                "backdrop-blur-sm shadow-sm hover:bg-white/95 dark:hover:bg-black/95 transition-colors"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="relative h-20 aspect-square rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={
                        firstCommunity.avatar
                          ? getSupabaseStorageUrl(
                              "community-avatars",
                              firstCommunity.avatar || ""
                            )
                          : (firstCommunity.wikipedia_data as WikipediaData)
                              ?.thumbnail?.source ||
                            "/avatars/default-community.jpg"
                      }
                      alt={firstCommunity.name}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg mb-1">
                      Your Community
                    </h2>
                    <p className="text-muted-foreground text-sm mb-2">
                      {firstCommunity.name}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>View community</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </Link>
        ) : (
          <div
            className={cn(
              "p-6 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50",
              "backdrop-blur-sm shadow-sm"
            )}
          >
            <h2 className="font-semibold text-lg mb-2">Find Your Community</h2>
            <p className="text-muted-foreground text-sm mb-3">
              Join a local community to connect with people near you.
            </p>
            <Button asChild>
              <Link href="/communities">Explore Communities</Link>
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/map">
            <div
              className={cn(
                "p-6 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50",
                "backdrop-blur-sm shadow-sm h-full hover:bg-white/95 dark:hover:bg-black/95 transition-colors"
              )}
            >
              <MapPin className="h-6 w-6 mb-2 text-muted-foreground" />
              <h3 className="font-medium">Explore Map</h3>
              <p className="text-sm text-muted-foreground">
                Discover your area
              </p>
            </div>
          </Link>
          <Link href="/local">
            <div
              className={cn(
                "p-6 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50",
                "backdrop-blur-sm shadow-sm h-full hover:bg-white/95 dark:hover:bg-black/95 transition-colors"
              )}
            >
              <Users className="h-6 w-6 mb-2 text-muted-foreground" />
              <h3 className="font-medium">Local Feed</h3>
              <p className="text-sm text-muted-foreground">
                See what's happening
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
