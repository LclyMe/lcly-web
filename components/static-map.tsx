"use client";

import { useEffect, useRef } from "react";
import { PostcodeData } from "@/types/location";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/leaflet-overrides.css";
import { Marker } from "react-leaflet";
import { MapPin } from "lucide-react";

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

export function StaticMap({
  location,
  className,
  invertTheme = false,
}: StaticMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any | null>(null);
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const router = useRouter();

  // Handle click to navigate to full map
  const handleMapClick = () => {
    router.push(`/map?lat=${location.latitude}&lng=${location.longitude}`);
  };

  useEffect(() => {
    if (!mounted) return;

    // Dynamically import Leaflet to avoid SSR issues
    const loadMap = async () => {
      if (!mapRef.current) return;

      // Import Leaflet dynamically
      const L = (await import("leaflet")).default;

      // Import CSS - ignore TypeScript warning about missing type declarations
      // @ts-ignore
      await import("leaflet/dist/leaflet.css");

      // Clean up previous map instance if it exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Determine theme
      const realTheme = resolvedTheme === "dark" ? "dark" : "light";
      const theme = invertTheme
        ? realTheme === "dark"
          ? "light"
          : "dark"
        : realTheme;

      // Create map
      const map = L.map(mapRef.current, {
        center: [location.latitude, location.longitude],
        zoom: 13,
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
        attributionControl: false,
      });

      // Add tile layer
      L.tileLayer(mapProviders[theme].url).addTo(map);

      // Store map instance for cleanup
      mapInstanceRef.current = map;
    };

    loadMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location.latitude, location.longitude, mounted, resolvedTheme]);

  // Using Link component for better navigation handling
  return (
    <Link
      href={`/map?lat=${location.latitude}&lng=${location.longitude}`}
      className={`block h-full w-full z-0`}
    >
      <div
        className={`h-full w-full overflow-hidden rounded-2xl border border-border/30 cursor-pointer hover:opacity-90 transition-opacity ${className}`}
      >
        <div ref={mapRef} className="h-full w-full" />
      </div>
    </Link>
  );
}
