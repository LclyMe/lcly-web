import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

// Define the RecyclingCenter type
interface RecyclingCenter {
  id: number;
  site_name: string;
  address: string;
  post_code: string | null;
  location_type: string | null;
  site_type: string | null;
  latitude: number;
  longitude: number;
  distance_meters?: number;
  accepts_mixed_glass: boolean | null;
  accepts_paper: boolean | null;
  accepts_textiles: boolean | null;
  accepts_small_electrical: boolean | null;
  distance_km?: string;
  distance_miles?: string;
}

/**
 * Hook to fetch nearest recycling centers using Supabase directly
 */
export function useRecyclingCenters(
  latitude?: number,
  longitude?: number,
  limit: number = 3,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["recyclingCenters", latitude, longitude, limit],
    queryFn: async (): Promise<RecyclingCenter[]> => {
      if (!latitude || !longitude) {
        return [];
      }

      const supabase = createClient();

      // Call the RPC function to find nearest recycling centers
      const { data, error } = await supabase.rpc(
        "find_nearest_recycling_centers_by_coords",
        {
          search_lat: latitude,
          search_lng: longitude,
          limit_count: limit,
        }
      );

      if (error) {
        console.error("Error fetching recycling centers:", error);
        throw new Error("Failed to fetch recycling centers");
      }

      // Format the response with miles and kilometers
      const formattedData = data.map((center: RecyclingCenter) => ({
        ...center,
        distance_km: center.distance_meters
          ? (center.distance_meters / 1000).toFixed(2)
          : undefined,
        distance_miles: center.distance_meters
          ? (center.distance_meters / 1609.34).toFixed(2)
          : undefined,
      }));

      return formattedData;
    },
    enabled: Boolean(enabled && latitude && longitude),
  });
}

/**
 * Hook to fetch all recycling centers using Supabase directly
 */
export function useAllRecyclingCenters(enabled: boolean = true) {
  return useQuery({
    queryKey: ["allRecyclingCenters"],
    queryFn: async (): Promise<RecyclingCenter[]> => {
      const supabase = createClient();

      // Fetch all recycling centers with valid coordinates
      const { data, error } = await supabase
        .from("recycling_centres")
        .select("*")
        .not("latitude", "is", null)
        .not("longitude", "is", null);

      if (error) {
        console.error("Error fetching recycling centers:", error);
        throw new Error("Failed to fetch recycling centers");
      }

      // Filter out any centers with null latitude/longitude and cast to RecyclingCenter type
      const validCenters = data.filter(
        (center) => center.latitude !== null && center.longitude !== null
      ) as unknown as RecyclingCenter[];

      return validCenters;
    },
    enabled,
  });
}
