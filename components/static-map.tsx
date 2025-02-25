"use client";

import { useEffect } from "react";
import { PostcodeData } from "@/types/location";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/leaflet-overrides.css";
import { TileLayer, useMap } from "react-leaflet";
import dynamic from "next/dynamic";

interface StaticMapProps {
  location: PostcodeData;
  className?: string;
  invertTheme?: boolean;
}

// Map providers
const mapProviders = {
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  },
  light: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  },
};

// Dynamic import of MapContainer to avoid SSR issues
const MapWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
);

// Component to handle map configuration using useMap
function MapController({
  location,
  theme,
}: {
  location: PostcodeData;
  theme: "dark" | "light";
}) {
  const map = useMap();

  useEffect(() => {
    // Set center and options
    map.setView([location.latitude, location.longitude], 13);
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();

    // Remove attribution and zoom controls if they exist
    if (map.attributionControl) {
      map.removeControl(map.attributionControl);
    }
    if (map.zoomControl) {
      map.removeControl(map.zoomControl);
    }

    return () => {
      // Cleanup if needed
    };
  }, [map, location.latitude, location.longitude]);

  return <TileLayer url={mapProviders[theme].url} attribution="" />;
}

export function StaticMap({
  location,
  className,
  invertTheme = false,
}: StaticMapProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const router = useRouter();

  // Handle click to navigate to full map
  const handleMapClick = () => {
    router.push(`/map?lat=${location.latitude}&lng=${location.longitude}`);
  };

  if (!mounted) {
    // Return placeholder while mounting
    return (
      <div
        className={`h-full w-full overflow-hidden rounded-2xl border border-border/30 ${className}`}
      >
        <div className="h-full w-full bg-muted animate-pulse" />
      </div>
    );
  }

  // Determine theme
  const realTheme = resolvedTheme === "dark" ? "dark" : "light";
  const theme = invertTheme
    ? realTheme === "dark"
      ? "light"
      : "dark"
    : realTheme;

  // Using Link component for better navigation handling
  return (
    <Link
      href={`/map?lat=${location.latitude}&lng=${location.longitude}`}
      className={`block h-full w-full z-0`}
    >
      <div
        className={`h-full w-full overflow-hidden rounded-2xl border border-border/30 cursor-pointer hover:opacity-90 transition-opacity ${className}`}
      >
        <MapWithNoSSR
          center={[location.latitude, location.longitude]}
          zoom={13}
          zoomControl={false}
          attributionControl={false}
          className="h-full w-full"
        >
          <MapController
            location={location}
            theme={theme as "dark" | "light"}
          />
        </MapWithNoSSR>
      </div>
    </Link>
  );
}
