"use client";

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useState, useCallback, useEffect, useMemo } from "react";
import { MapControls } from "@/components/map/map-controls";
import { MAP_VIEWS } from "@/components/map/map-views";
import { TopBar } from "./top-bar";
import { useMapData, DataType, MapViewName } from "@/hooks/use-map-data";
import { PostcodeData } from "@/types/location";
import { motion } from "framer-motion";
// import { RecyclingCentersLayer } from "./recycling-centers-layer";

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
  savedLocation: PostcodeData | null;
  isTemporary?: boolean;
  profileLocation?: PostcodeData | null;
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
  const [enabledDataTypes, setEnabledDataTypes] = useState<DataType[]>([]);
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  const bounds = map.getBounds();
  const mapZoom = map.getZoom();
  const currentView = useMemo(() => {
    return Object.entries(MAP_VIEWS).find(([key, view]) => {
      return view.zoom === mapZoom;
    })?.[0] as MapViewName | undefined;
  }, [mapZoom]);

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
        <div class="p-2 z-[1000]">
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
    <>
      <MapControls
        selectedMapProvider={selectedMapProvider}
        setSelectedMapProvider={setSelectedMapProvider}
        enabledDataTypes={enabledDataTypes}
        onToggleDataType={handleToggleDataType}
      />
      {/* <RecyclingCentersLayer
        visible={enabledDataTypes.includes("recycling")}
        selectedMapProvider={selectedMapProvider}
      /> */}
    </>
  );
}

function TemporaryMarker({ location }: { location: PostcodeData }) {
  return (
    <Marker
      position={[location.latitude, location.longitude]}
      icon={L.divIcon({
        className: "rounded-full w-2 h-2",
        iconSize: [8, 8],
      })}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-medium">Temporary Location</h3>
          <p className="text-sm text-muted-foreground">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}

export default function InteractiveMap({
  savedLocation,
  isTemporary,
  profileLocation,
}: InteractiveMapProps) {
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative h-full w-full overflow-hidden flex-grow flex flex-col"
    >
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        className="h-full w-full flex-grow"
        maxBounds={[
          [UK_BOUNDS.south, UK_BOUNDS.west],
          [UK_BOUNDS.north, UK_BOUNDS.east],
        ]}
        minZoom={5}
        zoomControl={false}
        dragging={true}
        scrollWheelZoom={true}
        touchZoom={true}
        doubleClickZoom={true}
        attributionControl={false}
      >
        <TopBar
          selectedMapProvider={selectedMapProvider}
          savedLocation={savedLocation}
          isTemporary={isTemporary}
          profileLocation={profileLocation}
        />
        <TileLayer url={mapProviders[selectedMapProvider].url} />
        {isTemporary && savedLocation && (
          <TemporaryMarker location={savedLocation} />
        )}
        <DataLayer
          selectedMapProvider={selectedMapProvider}
          setSelectedMapProvider={setSelectedMapProvider}
        />
      </MapContainer>
    </motion.div>
  );
}
