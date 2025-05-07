import { createAdminClient, createClient } from "@/lib/supabase/server";
import { PostcodeData } from "@/types/location";
import { getMP, MPData, MPRecord } from "@/lib/server/mp";
import { getCouncillors } from "@/lib/server/councillors";

const POSTCODE_API_URL = "https://api.postcodes.io/postcodes";

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
      mpData = await getMP(cachedLocation.parliamentary_constituency);
    }

    // Fetch councillors for the ward
    const councillors = await getCouncillors(cachedLocation.admin_ward);

    // Fetch councillors for the CED if it exists
    // const cedCouncillors = cachedLocation.extra_information?.ced
    //   ? await getCouncillors(cachedLocation.extra_information.ced)
    //   : null;
    const cedCouncillors = null;

    // Return the cached location with MP and councillor data
    return {
      ...cachedLocation,
      mp_data: mpData,
      councillors: councillors,
      ced_councillors: cedCouncillors,
    } as PostcodeData;
  }

  // If not cached, fetch from postcodes.io
  const response = await fetch(
    `${POSTCODE_API_URL}/${encodeURIComponent(formattedWithSpace)}`
  );
  const data = await response.json();

  // Uncomment to log the fetched postcode data
  // console.log("postcode data", data);

  if (!data.result) {
    throw new Error("Invalid postcode");
  }

  // Fetch MP data if we have a parliamentary constituency
  let mpData = null;
  if (data.result.parliamentary_constituency) {
    mpData = await getMP(data.result.parliamentary_constituency);
  }

  // Fetch councillors for the ward
  const councillors = await getCouncillors(data.result.admin_ward);

  // Fetch councillors for the CED if it exists
  // const cedCouncillors = data.result.ced
  //   ? await getCouncillors(data.result.ced)
  //   : null;
  const cedCouncillors = null;
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

  // Cache the result (without MP or councillor data references)
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
      councillors: councillors,
      ced_councillors: cedCouncillors,
      extra_information: rest,
    } as PostcodeData;
  }

  return {
    ...newLocation,
    mp_data: mpData,
    councillors: councillors,
    ced_councillors: cedCouncillors,
  } as PostcodeData;
}
