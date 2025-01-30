"use client";

import { useState, useEffect } from "react";
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
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch("/api/location");
        if (!response.ok) {
          throw new Error("Failed to fetch location");
        }
        const data = await response.json();
        setLocationData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to get location");
      } finally {
        setLoading(false);
      }
    }

    fetchLocation();
  }, []);

  return { locationData, error, loading };
}
