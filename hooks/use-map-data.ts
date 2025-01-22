"use client";

import { useQuery } from "@tanstack/react-query";
import type { LatLngBounds } from "leaflet";
import { MAP_VIEWS } from "@/components/map/map-views";

export type DataType = "thoughts";
// | "people" | "homes";
export type MapViewName = keyof typeof MAP_VIEWS;

export function useMapData(
  bounds: LatLngBounds | null,
  viewName: MapViewName,
  enabledDataTypes: DataType[]
) {
  return useQuery({
    queryKey: ["map-data", bounds?.toBBoxString(), viewName, enabledDataTypes],
    queryFn: async () => {
      if (!bounds) return { thoughts: [] };

      const params = {
        bounds: {
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        },
        viewName,
        dataTypes: enabledDataTypes,
      };

      const response = await fetch("/api/map", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch map data");
      }

      return response.json();
    },
    enabled: !!bounds,
  });
}
