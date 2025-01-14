"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Layers, Map as MapIcon, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import L from "leaflet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import LclyLogo from "@/components/logos/LclyLogo";
import { Location, usePostcode } from "@/hooks/use-postcode";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

// UK bounds
const UK_BOUNDS = {
  north: 60,
  south: 48.5,
  west: -14,
  east: 5,
};

// Providers
const mapProviders = {
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  light: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  color: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

// Add these constants at the top with the UK_BOUNDS
const MAP_VIEWS = {
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

function MapViews({
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

function TopBar({
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

function MapControls({
  selectedMapProvider,
  setSelectedMapProvider,
}: {
  selectedMapProvider: "dark" | "light" | "color";
  setSelectedMapProvider: (provider: "dark" | "light" | "color") => void;
}) {
  const isDark = selectedMapProvider === "dark";
  const buttonVariant = isDark ? "secondary" : "default";

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-[1000]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={buttonVariant}
            size="icon"
            className="h-10 w-10 rounded-full shadow-lg"
          >
            <Layers className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[1000]" align="end">
          <DropdownMenuItem onClick={() => setSelectedMapProvider("dark")}>
            <Moon className="h-4 w-4" /> Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedMapProvider("light")}>
            <Sun className="h-4 w-4" /> Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedMapProvider("color")}>
            <MapIcon className="h-4 w-4" /> Color
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function InitialMapPosition({ lat, lng }: { lat?: number; lng?: number }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 15);
    }
  }, [map, lat, lng]);

  return null;
}

export default function MapPage() {
  const { savedLocation } = usePostcode();
  const searchParams = useSearchParams();
  const [selectedMapProvider, setSelectedMapProvider] = useState<
    "dark" | "light" | "color"
  >("dark");

  // Get coordinates from URL or saved location
  const urlLat = searchParams.get("lat");
  const urlLng = searchParams.get("lng");

  const initialCenter =
    urlLat && urlLng
      ? ([parseFloat(urlLat), parseFloat(urlLng)] as L.LatLngExpression)
      : savedLocation
      ? ([
          savedLocation.latitude,
          savedLocation.longitude,
        ] as L.LatLngExpression)
      : MAP_VIEWS.country.center;

  const initialZoom =
    (urlLat && urlLng) || savedLocation ? 15 : MAP_VIEWS.country.zoom;

  return (
    <div className="h-screen w-full bg-black md:pb-8 md:px-8">
      <div className="hidden sm:flex items-center gap-2 py-3 px-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/union-flag.png"
            alt="Union Flag"
            width={48}
            height={48}
            className="h-5 w-5 rounded-full"
          />
          <LclyLogo className="h-4 w-auto text-white/90 -mb-1.5" />
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-[100dvh] sm:h-[calc(100vh-76px)] w-full sm:rounded-3xl overflow-hidden sm:border border-border border-white/20 shadow-xl"
      >
        <MapContainer
          center={initialCenter}
          zoom={initialZoom}
          className="h-full w-full"
          maxBounds={[
            [UK_BOUNDS.south, UK_BOUNDS.west],
            [UK_BOUNDS.north, UK_BOUNDS.east],
          ]}
          minZoom={5}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          touchZoom={false}
          doubleClickZoom={false}
        >
          <TopBar
            selectedMapProvider={selectedMapProvider}
            savedLocation={savedLocation}
          />
          <TileLayer url={mapProviders[selectedMapProvider].url} />
          <MapControls
            selectedMapProvider={selectedMapProvider}
            setSelectedMapProvider={setSelectedMapProvider}
          />
          {urlLat && urlLng && (
            <InitialMapPosition
              lat={parseFloat(urlLat)}
              lng={parseFloat(urlLng)}
            />
          )}
        </MapContainer>
      </motion.div>
    </div>
  );
}
