import { Button } from "@/components/ui/button";
import { Location } from "@/hooks/use-postcode";
import { Map as MapIcon } from "lucide-react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const MAP_VIEWS = {
  country: {
    center: [54.5, -4] as L.LatLngExpression,
    zoom: 6,
  },
  council: {
    zoom: 13,
  },
  town: {
    zoom: 15,
  },
  local: {
    zoom: 18,
  },
} as const;

export function MapViews({
  savedLocation,
  isDark,
}: {
  savedLocation: Location | null;
  isDark: boolean;
}) {
  const map = useMap();
  const defaultLocation = MAP_VIEWS.country.center;

  const getCenter = () => {
    if (savedLocation) {
      return [
        savedLocation.latitude,
        savedLocation.longitude,
      ] as L.LatLngExpression;
    }
    return defaultLocation;
  };

  const handleViewChange = (view: keyof typeof MAP_VIEWS) => {
    const center = getCenter();
    map.setView(center, MAP_VIEWS[view].zoom);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isDark ? "secondary" : "default"}
          className="rounded-full shadow-lg h-10 w-10 sm:w-auto"
        >
          <MapIcon className={"h-4 w-4 sm:mr-1"} />{" "}
          <span className="hidden sm:block">View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[1000]">
        <DropdownMenuItem onClick={() => handleViewChange("country")}>
          Country View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleViewChange("council")}>
          Council View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleViewChange("town")}>
          Town View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleViewChange("local")}>
          Local Area
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
