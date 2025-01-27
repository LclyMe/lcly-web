import { createClient } from "@/lib/supabase/server";
import { PostcodeData } from "@/types/location";

const POSTCODE_API_URL = "https://api.postcodes.io/postcodes";

export interface PostcodeLocation {
  id: string;
  postcode: string;
  latitude: number;
  longitude: number;
  region: string;
  country: string;
  created_at: string;
}

export interface PostcodeResponse {
  postcode: string;
  latitude: number;
  longitude: number;
  region: string;
  country: string;
}

export async function getPostcodeLocation(
  postcode: string
): Promise<PostcodeData> {
  const supabase = await createClient();

  // Format postcode for comparison: remove spaces and convert to uppercase
  const formattedPostcode = postcode.replace(/\s+/g, "").toUpperCase();
  const formattedWithSpace = formattedPostcode.replace(
    /^(.+?)([A-Z0-9]{3})$/,
    "$1 $2"
  );

  // Check if we have the postcode cached
  const { data: cachedLocation, error: cachedLocationError } = await supabase
    .from("postcode_locations")
    .select()
    .eq("postcode", formattedWithSpace)
    .single();

  if (cachedLocationError) {
    console.error("Error fetching cached location:", cachedLocationError);
  }

  if (cachedLocation) {
    console.log("Cached location found");
    return cachedLocation;
  }

  // If not cached, fetch from postcodes.io
  const response = await fetch(
    `${POSTCODE_API_URL}/${encodeURIComponent(formattedWithSpace)}`
  );
  const data = await response.json();

  if (!data.result) {
    throw new Error("Invalid postcode");
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
    return {
      id: "temp",
      created_at: new Date().toISOString(),
      postcode: data.result.postcode,
      latitude: data.result.latitude,
      longitude: data.result.longitude,
      region: data.result.region,
      country: data.result.country,
      admin_district: data.result.admin_district,
      parliamentary_constituency: data.result.parliamentary_constituency,
      admin_ward: data.result.admin_ward,
    } as PostcodeData;
  }

  return newLocation;
}
