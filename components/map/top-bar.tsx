import { Location, usePostcode } from "@/hooks/use-postcode";
import { MapViews } from "./map-views";
import { cn } from "@/lib/utils";

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
    <div className="absolute left-4 top-4 z-[1000] flex gap-2">
      <MapViews savedLocation={savedLocation} isDark={isDark} />
      {savedLocation && (
        <div
          className={cn("ml-2 flex items-center text-sm", {
            "text-white/80": isDark,
            "text-black/80": !isDark,
          })}
        >
          <span>
            {savedLocation.name} - {postcodeData?.postcode} (
            {savedLocation.latitude}, {savedLocation.longitude})
          </span>
        </div>
      )}
    </div>
  );
}
