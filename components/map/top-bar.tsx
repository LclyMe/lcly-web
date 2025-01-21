import { Location, usePostcode } from "@/hooks/use-postcode";
import { MapViews } from "./map-views";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export function TopBar({
  selectedMapProvider,
  savedLocation,
}: {
  selectedMapProvider: "dark" | "light" | "color";
  savedLocation: Location | null;
}) {
  const { postcodeData } = usePostcode();
  const isDark = selectedMapProvider === "dark";

  return (
    <div className="absolute left-4 top-4 z-[1000] flex gap-2 items-center">
      <Link href="/">
        <Button
          variant="ghost"
          size="icon"
          className={cn("", {
            "bg-white/80 text-black": isDark,
            "bg-background/80 backdrop-blur-sm text-white": !isDark,
          })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>
      <MapViews savedLocation={savedLocation} isDark={isDark} />
      {savedLocation && (
        <div
          className={cn("ml-2 flex items-center text-sm", {
            "text-white/80": isDark,
            "text-black/80": !isDark,
          })}
        >
          <span>
            {savedLocation.name} - {postcodeData?.postcode}
            {/* ({savedLocation.latitude}, {savedLocation.longitude}) */}
          </span>
        </div>
      )}
    </div>
  );
}
