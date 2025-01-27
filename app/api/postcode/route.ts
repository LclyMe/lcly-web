import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const POSTCODE_API_URL = "https://api.postcodes.io/postcodes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get("postcode");

  if (!postcode) {
    return NextResponse.json(
      { error: "Postcode is required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  // Format postcode for comparison: remove spaces and convert to uppercase
  const formattedPostcode = postcode.replace(/\s+/g, "").toUpperCase();

  // Check if we have the postcode cached
  const { data: cachedLocation, error: cachedLocationError } = await supabase
    .from("postcode_locations")
    .select()
    .eq("postcode", formattedPostcode.replace(/^(.{3})/, "$1 ")) // Add space in the correct position for comparison
    .single();

  if (cachedLocationError) {
    console.error("Error fetching cached location:", cachedLocationError);
  }

  if (cachedLocation) {
    console.log("Cached location found");
    return NextResponse.json(cachedLocation);
  }

  // If not cached, fetch from postcodes.io
  try {
    const response = await fetch(
      `${POSTCODE_API_URL}/${encodeURIComponent(postcode)}`
    );
    const data = await response.json();

    if (!data.result) {
      return NextResponse.json({ error: "Invalid postcode" }, { status: 400 });
    }

    // Cache the result
    const { data: newLocation, error } = await supabase
      .from("postcode_locations")
      .insert({
        postcode: data.result.postcode,
        latitude: data.result.latitude,
        longitude: data.result.longitude,
        region: data.result.region,
        country: data.result.country,
        admin_district: data.result.admin_district,
        parliamentary_constituency: data.result.parliamentary_constituency,
        admin_ward: data.result.admin_ward,
      })
      .select()
      .single();

    if (error) {
      console.error("Error caching postcode:", error);
      // Return the data anyway even if caching failed
      return NextResponse.json({
        postcode: data.result.postcode,
        latitude: data.result.latitude,
        longitude: data.result.longitude,
        region: data.result.region,
        country: data.result.country,
        admin_district: data.result.admin_district,
        parliamentary_constituency: data.result.parliamentary_constituency,
        admin_ward: data.result.admin_ward,
      });
    }

    return NextResponse.json(newLocation);
  } catch (error) {
    console.error("Error validating postcode:", error);
    return NextResponse.json(
      { error: "Error validating postcode" },
      { status: 500 }
    );
  }
}
