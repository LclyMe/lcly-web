import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Define the RecyclingCenter type with distance fields
interface RecyclingCenterFromDB {
  id: number;
  site_name: string;
  address: string;
  post_code: string;
  location_type: string;
  site_type: string;
  latitude: number;
  longitude: number;
  distance_meters: number;
  accepts_mixed_glass: boolean;
  accepts_paper: boolean;
  accepts_textiles: boolean;
  accepts_small_electrical: boolean;
}

// Extended type with calculated distance fields
interface RecyclingCenterWithDistance extends RecyclingCenterFromDB {
  distance_km: string;
  distance_miles: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get latitude and longitude from query parameters
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    // Validate parameters
    if (!lat || !lng) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    // Parse parameters to numbers
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    // Validate parsed values
    if (isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json(
        { error: "Invalid latitude or longitude values" },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createClient();

    try {
      // Call the RPC function to find nearest recycling centers
      const { data, error } = await supabase.rpc(
        "find_nearest_recycling_centers_by_coords",
        {
          search_lat: latitude,
          search_lng: longitude,
          limit_count: 3,
        }
      );

      if (error) {
        console.error("Error fetching recycling centers:", error);
        // Return empty array instead of error to gracefully handle in UI
        return NextResponse.json([]);
      }

      // Format the response with miles and kilometers
      const formattedData = data.map((center: RecyclingCenterFromDB) => ({
        ...center,
        distance_km: (center.distance_meters / 1000).toFixed(2),
        distance_miles: (center.distance_meters / 1609.34).toFixed(2),
      }));

      return NextResponse.json(formattedData);
    } catch (rpcError) {
      console.error("RPC function error:", rpcError);
      // Return empty array for graceful UI handling
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json([], { status: 200 }); // Return empty array with 200 status
  }
}
