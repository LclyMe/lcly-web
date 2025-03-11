"use client";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/types/database.types";

type Community = Database["public"]["Tables"]["communities"]["Row"];

interface LocationData {
  geo: {
    city?: string;
    country?: string;
    countryRegion?: string;
    latitude?: number;
    longitude?: number;
    region?: string;
  };
  community: Community;
}

export function useLocation() {
  // Fetch location data using React Query
  const {
    data: locationData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["location"],
    queryFn: async () => {
      const response = await fetch("/api/location");
      if (!response.ok) {
        throw new Error("Failed to fetch location");
      }
      return response.json() as Promise<LocationData>;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
    retry: 2,
  });

  // Convert error to string format to maintain the same API
  const errorMessage =
    error instanceof Error
      ? error.message
      : error
      ? "Failed to get location"
      : null;

  return {
    locationData,
    error: errorMessage,
    loading: isLoading,
  };
}
