import { getCurrentProfile } from "@/lib/server/profile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, CloudSun, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getUserFirstCommunity } from "@/lib/server/profile";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";

export default async function HomePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  const firstCommunity = await getUserFirstCommunity(profile.id);

  const headerTitle = (
    <>
      {profile.postcode && (
        <Button
          variant="secondary"
          size="sm"
          className="font-bold text-lg h-10"
        >
          <MapPin className="h-6 w-6" />
          {profile.postcode}
        </Button>
      )}
    </>
  );

  return (
    <div className="container max-w-lg mx-auto">
      <PageHeader title={headerTitle} showNotifications />

      {/* Main Cards */}
      <div className="space-y-4 px-3">
        {/* Community Card */}
        {firstCommunity ? (
          <Link href={`/c/${firstCommunity.slug}`}>
            <Card className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-lg mb-1">Your Community</h2>
                  <p className="text-muted-foreground text-sm mb-3">
                    {firstCommunity.name}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>View community</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          </Link>
        ) : (
          <Card className="p-4">
            <h2 className="font-semibold text-lg mb-2">Find Your Community</h2>
            <p className="text-muted-foreground text-sm mb-3">
              Join a local community to connect with people near you.
            </p>
            <Button asChild>
              <Link href="/communities">Explore Communities</Link>
            </Button>
          </Card>
        )}

        {/* Weather Card */}
        {profile.postcode_location && (
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-lg mb-1">Local Weather</h2>
                <div className="flex items-center">
                  <CloudSun className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="text-2xl font-medium">
                    {/* Add weather data here */}
                    12°C
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {profile.postcode_location.admin_ward}
                </p>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/map">
                  <MapPin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/map">
            <Card className="p-4 hover:bg-muted/50 transition-colors h-full">
              <MapPin className="h-6 w-6 mb-2 text-muted-foreground" />
              <h3 className="font-medium">Explore Map</h3>
              <p className="text-sm text-muted-foreground">
                Discover your area
              </p>
            </Card>
          </Link>
          <Link href="/local">
            <Card className="p-4 hover:bg-muted/50 transition-colors h-full">
              <Users className="h-6 w-6 mb-2 text-muted-foreground" />
              <h3 className="font-medium">Local Feed</h3>
              <p className="text-sm text-muted-foreground">
                See what's happening
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
