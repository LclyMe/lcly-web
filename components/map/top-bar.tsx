import { MapViews } from "./map-views";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { PostcodeData } from "@/types/location";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BackButton } from "../ui/back-button";

export function TopBar({
  selectedMapProvider,
  savedLocation,
  isTemporary,
  profileLocation,
}: {
  selectedMapProvider: "dark" | "light" | "color";
  savedLocation: PostcodeData | null;
  isTemporary?: boolean;
  profileLocation?: PostcodeData | null;
}) {
  const isDark = selectedMapProvider === "dark";
  const showHomeButton = isTemporary && profileLocation;

  return (
    <div className="absolute left-4 top-4 z-[1000] flex gap-2 items-center">
      <BackButton
        className={cn("", {
          "bg-white/80 text-black": isDark,
          "bg-background/80 backdrop-blur-sm text-white": !isDark,
        })}
      />
      {showHomeButton && (
        <Link href="/map">
          <Button
            variant="ghost"
            size="icon"
            className={cn("", {
              "bg-white/80 text-black": isDark,
              "bg-background/80 backdrop-blur-sm text-white": !isDark,
            })}
          >
            <Home className="h-4 w-4" />
          </Button>
        </Link>
      )}
      <MapViews savedLocation={savedLocation} isDark={isDark} />
      {savedLocation && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn("ml-2 flex items-center text-sm cursor-help", {
                  "text-white/80": isDark,
                  "text-black/80": !isDark,
                })}
              >
                <span>
                  {savedLocation.admin_ward || savedLocation.admin_district} -{" "}
                  {savedLocation.postcode}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-sm z-[1000]">
              <div className="space-y-1.5">
                <p className="font-medium">{savedLocation.postcode}</p>
                {savedLocation.admin_ward && (
                  <p className="text-sm text-muted-foreground">
                    Ward: {savedLocation.admin_ward}
                  </p>
                )}
                {savedLocation.admin_district && (
                  <p className="text-sm text-muted-foreground">
                    District: {savedLocation.admin_district}
                  </p>
                )}
                {savedLocation.parliamentary_constituency && (
                  <p className="text-sm text-muted-foreground">
                    Constituency: {savedLocation.parliamentary_constituency}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Region: {savedLocation.region}
                </p>
                <p className="text-sm text-muted-foreground">
                  Country: {savedLocation.country}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {savedLocation.latitude.toFixed(4)},{" "}
                  {savedLocation.longitude.toFixed(4)}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
