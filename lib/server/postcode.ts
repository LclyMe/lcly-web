import { createClient } from "@/lib/supabase/server";
import { PostcodeData } from "@/types/location";
import { getMP, MPData } from "@/lib/server/mp";

const POSTCODE_API_URL = "https://api.postcodes.io/postcodes";

export interface PostcodeLocation {
  id: string;
  postcode: string;
  latitude: number;
  longitude: number;
  region: string;
  country: string;
  created_at: string;
  mp_data?: MPData | null;
}

export interface PostcodeResponse {
  postcode: string;
  latitude: number;
  longitude: number;
  region: string;
  country: string;
  mp_data?: MPData | null;
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

  // If we have a cached location
  if (cachedLocation) {
    // Fetch MP data if we have a parliamentary constituency
    let mpData = null;
    if (cachedLocation.parliamentary_constituency) {
      mpData = await getMP(cachedLocation.parliamentary_constituency);
    }

    // Return the cached location with MP data
    return {
      ...cachedLocation,
      mp_data: mpData,
    } as PostcodeData;
  }

  // If not cached, fetch from postcodes.io
  const response = await fetch(
    `${POSTCODE_API_URL}/${encodeURIComponent(formattedWithSpace)}`
  );
  const data = await response.json();

  if (!data.result) {
    throw new Error("Invalid postcode");
  }

  // Fetch MP data if we have a parliamentary constituency
  let mpData = null;
  if (data.result.parliamentary_constituency) {
    mpData = await getMP(data.result.parliamentary_constituency);
  }

  // Cache the result (without MP data reference)
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
      mp_data: mpData,
    } as PostcodeData;
  }

  return {
    ...newLocation,
    mp_data: mpData,
  } as PostcodeData;
}
