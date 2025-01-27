import { createClient } from "@/lib/supabase/server";

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
): Promise<PostcodeResponse> {
  const supabase = await createClient();
  const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase();

  // First check our database
  const { data: existingLocation } = await supabase
    .from("postcode_locations")
    .select("*")
    .eq("postcode", cleanPostcode)
    .single();

  if (existingLocation) {
    return {
      postcode: existingLocation.postcode,
      latitude: existingLocation.latitude,
      longitude: existingLocation.longitude,
      region: existingLocation.region,
      country: existingLocation.country,
    };
  }

  // If not found, fetch from API
  const response = await fetch(
    `https://api.postcodes.io/postcodes/${cleanPostcode}`
  );

  if (!response.ok) {
    throw new Error("Invalid postcode");
  }

  const data = await response.json();
  const location = {
    postcode: cleanPostcode,
    latitude: data.result.latitude,
    longitude: data.result.longitude,
    region: data.result.region,
    country: data.result.country,
  };

  // Save to our database
  await supabase.from("postcode_locations").insert([
    {
      postcode: location.postcode,
      latitude: location.latitude,
      longitude: location.longitude,
      region: location.region,
      country: location.country,
      admin_district: data.result.admin_district,
      admin_ward: data.result.admin_ward,
      parliamentary_constituency: data.result.parliamentary_constituency,
    },
  ]);

  return location;
}
