"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { Location } from "@/hooks/use-postcode";
import { useState, useCallback, useEffect } from "react";
import { MapControls } from "@/components/map/map-controls";
import { MAP_VIEWS } from "@/components/map/map-views";
import { TopBar } from "./top-bar";
import { useMapData, DataType, MapViewName } from "@/hooks/use-map-data";

interface ThoughtMarker {
  id: number;
  title: string;
  content: string;
  latitude: number;
  longitude: number;
}

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

interface DataLayerProps {
  selectedMapProvider: "dark" | "light" | "color";
  setSelectedMapProvider: (provider: "dark" | "light" | "color") => void;
}

function DataLayer({
  selectedMapProvider,
  setSelectedMapProvider,
}: DataLayerProps) {
  const map = useMap();
  const [enabledDataTypes, setEnabledDataTypes] = useState<DataType[]>([
    "thoughts",
  ]);
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  const bounds = map.getBounds();
  const currentView = Object.entries(MAP_VIEWS).find(
    ([_, view]) => view.zoom === map.getZoom()
  )?.[0] as MapViewName | undefined;

  const { data } = useMapData(
    bounds,
    currentView || "country",
    enabledDataTypes
  );

  const handleToggleDataType = useCallback((type: DataType) => {
    setEnabledDataTypes((current) =>
      current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type]
    );
  }, []);

  // Update markers when data changes
  useEffect(() => {
    // Remove existing markers
    markers.forEach((marker) => marker.remove());

    // Add new markers
    const newMarkers = ((data?.thoughts as ThoughtMarker[]) || []).map(
      (thought) => {
        const marker = L.marker([thought.latitude, thought.longitude], {
          icon: L.divIcon({
            className:
              "rounded-full w-2 h-2 " +
              (selectedMapProvider === "dark" ? "bg-white" : "bg-black"),
            iconSize: [8, 8],
          }),
        }).addTo(map);

        marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-medium">${thought.title}</h3>
          <p class="text-sm text-muted-foreground">${thought.content.substring(
            0,
            100
          )}${thought.content.length > 100 ? "..." : ""}</p>
        </div>
      `);

        return marker;
      }
    );

    setMarkers(newMarkers);

    // Cleanup on unmount
    return () => {
      newMarkers.forEach((marker) => marker.remove());
    };
  }, [data, map, selectedMapProvider]);

  return (
    <MapControls
      selectedMapProvider={selectedMapProvider}
      setSelectedMapProvider={setSelectedMapProvider}
      enabledDataTypes={enabledDataTypes}
      onToggleDataType={handleToggleDataType}
    />
  );
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
      <DataLayer
        selectedMapProvider={selectedMapProvider}
        setSelectedMapProvider={setSelectedMapProvider}
      />
    </MapContainer>
  );
}
