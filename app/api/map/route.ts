import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { MapViewName } from "@/hooks/use-map-data";
import { Database } from "@/types/database.types";

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapQueryParams {
  bounds: MapBounds;
  viewName: MapViewName;
  dataTypes: string[];
}

export async function POST(request: Request) {
  try {
    const { bounds, dataTypes } = (await request.json()) as MapQueryParams;
    const supabase = await createClient();

    const results: Record<
      string,
      Database["public"]["Functions"]["get_thoughts_in_bounds"]["Returns"]
    > = {};

    if (dataTypes.includes("thoughts")) {
      const { data: thoughts, error } = await supabase.rpc(
        "get_thoughts_in_bounds",
        {
          west: bounds.west,
          south: bounds.south,
          east: bounds.east,
          north: bounds.north,
        }
      );

      if (error) throw error;
      results.thoughts = thoughts;
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching map data:", error);
    return NextResponse.json(
      { error: "Failed to fetch map data" },
      { status: 500 }
    );
  }
}
