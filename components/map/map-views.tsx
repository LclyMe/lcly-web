import { Button } from "@/components/ui/button";
import { Location } from "@/hooks/use-postcode";
import { Map as MapIcon, Check } from "lucide-react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { cn } from "@/lib/utils";

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
  const [currentView, setCurrentView] =
    React.useState<keyof typeof MAP_VIEWS>("town");

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
    setCurrentView(view);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isDark ? "secondary" : "default"}
          className={cn("rounded-full shadow-lg h-10 w-10 sm:w-auto", {
            "bg-white/80 text-black hover:bg-white/90": isDark,
            "text-white bg-background/80 backdrop-blur-sm": !isDark,
          })}
        >
          <MapIcon className={"h-4 w-4 sm:mr-1"} />{" "}
          <span className="hidden sm:block">
            {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="z-[1000]">
        <DropdownMenuItem onClick={() => handleViewChange("country")}>
          Country View
          {currentView === "country" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleViewChange("council")}>
          Council View
          {currentView === "council" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleViewChange("town")}>
          Town View
          {currentView === "town" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleViewChange("local")}>
          Local Area
          {currentView === "local" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
