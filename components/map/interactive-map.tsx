"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Location } from "@/hooks/use-postcode";
import { useState } from "react";
import { MapControls } from "@/components/map/map-controls";
import { MAP_VIEWS } from "@/components/map/map-views";
import { TopBar } from "./top-bar";

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

interface InteractiveMapProps {
  savedLocation: Location | null;
}

export default function InteractiveMap({ savedLocation }: InteractiveMapProps) {
  const [selectedMapProvider, setSelectedMapProvider] = useState<
    "dark" | "light" | "color"
  >("dark");

  const initialCenter = savedLocation
    ? ([savedLocation.latitude, savedLocation.longitude] as L.LatLngExpression)
    : MAP_VIEWS.country.center;

  const initialZoom = savedLocation
    ? MAP_VIEWS.town.zoom
    : MAP_VIEWS.country.zoom;

  return (
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
    </MapContainer>
  );
}
