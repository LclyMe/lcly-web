"use client";

import { useEffect } from "react";
import { PostcodeData } from "@/types/location";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/leaflet-overrides.css";
import { Marker, TileLayer, useMap } from "react-leaflet";
import dynamic from "next/dynamic";
import L from "leaflet";

interface StaticMapProps {
  latitude: number;
  longitude: number;
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

// Custom blinking marker icon
const createBlinkingMarkerIcon = (theme: "dark" | "light") => {
  return L.divIcon({
    html: `<div class="blinking-marker ${
      theme === "dark" ? "blinking-marker-dark" : "blinking-marker-light"
    }"></div>`,
    className: "blinking-marker-container",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Component to handle map configuration using useMap
function MapController({
  latitude,
  longitude,
  theme,
}: {
  latitude: number;
  longitude: number;
  theme: "dark" | "light";
}) {
  const map = useMap();

  useEffect(() => {
    // Set center and options
    map.setView([latitude, longitude], 13);
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
  }, [map, latitude, longitude]);

  const markerIcon = createBlinkingMarkerIcon(theme);

  return (
    <>
      <TileLayer url={mapProviders[theme].url} attribution="" />
      <Marker position={[latitude, longitude]} icon={markerIcon} />
    </>
  );
}

export function StaticMap({
  latitude,
  longitude,
  className,
  invertTheme = false,
}: StaticMapProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const router = useRouter();

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
      href={`/map?lat=${latitude}&lng=${longitude}`}
      className={`block h-full w-full z-0`}
    >
      <div
        className={`h-full w-full overflow-hidden rounded-2xl border border-border/30 cursor-pointer hover:opacity-90 transition-opacity ${className}`}
      >
        <style jsx global>{`
          .blinking-marker-container {
            background: transparent;
            border: none;
          }

          .blinking-marker {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            position: relative;
            animation: pulse 1.5s ease-in-out infinite;
          }

          .blinking-marker::after {
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .blinking-marker-light {
            background: rgba(59, 130, 246, 0.5);
          }

          .blinking-marker-light::after {
            background: #3b82f6;
          }

          .blinking-marker-dark {
            background: rgba(96, 165, 250, 0.5);
          }

          .blinking-marker-dark::after {
            background: #60a5fa;
          }

          @keyframes pulse {
            0% {
              transform: scale(0.5);
              opacity: 1;
            }
            70% {
              transform: scale(1.5);
              opacity: 0;
            }
            100% {
              transform: scale(0.5);
              opacity: 0;
            }
          }
        `}</style>
        <MapWithNoSSR
          center={[latitude, longitude]}
          zoom={13}
          zoomControl={false}
          attributionControl={false}
          className="h-full w-full"
        >
          <MapController
            latitude={latitude}
            longitude={longitude}
            theme={theme as "dark" | "light"}
          />
        </MapWithNoSSR>
      </div>
    </Link>
  );
}
