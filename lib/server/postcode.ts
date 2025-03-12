import { createAdminClient, createClient } from "@/lib/supabase/server";
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
  const supabase = await createAdminClient();

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
      console.log("fetching mp data (cached)");
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

  console.log("postcode data", data);

  if (!data.result) {
    throw new Error("Invalid postcode");
  }

  // Fetch MP data if we have a parliamentary constituency
  let mpData = null;
  if (data.result.parliamentary_constituency) {
    console.log("fetching mp data (not cached)");
    mpData = await getMP(data.result.parliamentary_constituency);
  }

  const {
    latitude,
    longitude,
    region,
    country,
    admin_district,
    parliamentary_constituency,
    admin_ward,
    ...rest
  } = data.result;

  // Cache the result (without MP data reference)
  const { data: newLocation, error } = await supabase
    .from("postcode_locations")
    .insert({
      postcode: postcode || "",
      latitude: latitude,
      longitude: longitude,
      region: region || "",
      country: country || "",
      admin_district: admin_district || "",
      parliamentary_constituency: parliamentary_constituency || "",
      admin_ward: admin_ward || "",
      extra_information: rest,
    })
    .select()
    .single();

  if (error) {
    console.error("Error caching postcode:", error);
    // Return the data anyway even if caching failed
    return {
      id: "temp",
      created_at: new Date().toISOString(),
      postcode: postcode,
      latitude: latitude,
      longitude: longitude,
      region: region,
      country: country,
      admin_district: admin_district,
      parliamentary_constituency: parliamentary_constituency,
      admin_ward: admin_ward,
      mp_data: mpData,
      extra_information: rest,
    } as PostcodeData;
  }

  return {
    ...newLocation,
    mp_data: mpData,
  } as PostcodeData;
}
