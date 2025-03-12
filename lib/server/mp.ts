export interface MPOffice {
  moffice_id: string;
  dept: string;
  position: string;
  from_date: string;
  to_date: string;
  person: string;
  source: string;
}

export interface MPData {
  member_id: string;
  house: string;
  constituency: string;
  party: string;
  entered_house: string;
  left_house: string;
  entered_reason: string;
  left_reason: string;
  person_id: string;
  lastupdate: string;
  title: string;
  given_name: string;
  family_name: string;
  full_name: string;
  url: string;
  image: string;
  image_height: number;
  image_width: number;
  office: MPOffice[];
}

export type MPRecord = Database["public"]["Tables"]["mps"]["Row"];

import { createAdminClient } from "@/lib/supabase/server";
import { Database, Json } from "@/types/database.types";

/**
 * Fetch MP data from TheyWorkForYou API
 */
export async function fetchMPFromAPI(constituency: string): Promise<MPData> {
  const response = await fetch(
    `https://www.theyworkforyou.com/api/getMP?constituency=${encodeURIComponent(
      constituency
    )}&output=json&key=${process.env.TWFY_API_KEY}`,
    { next: { revalidate: 86400 } } // Cache for 24 hours
  );

  if (!response.ok) {
    throw new Error("Failed to fetch MP data");
  }

  const data = await response.json();
  return data;
}

/**
 * Get MP data from database or API, caching results in the database
 */
export async function getMP(constituency: string): Promise<MPRecord | null> {
  if (!constituency) return null;

  const supabase = createAdminClient();

  // Check if the MP data is more than a week old
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const { data: cachedMPs, error: cachedMPError } = await supabase
    .from("mps")
    .select()
    .eq("constituency", constituency)
    .gt("last_updated", oneWeekAgo.toISOString())
    .limit(1);

  if (cachedMPError) {
    console.log("Error fetching cached MP data:", cachedMPError.message);
  }

  // If we have cached data that's recent enough, return it
  if (cachedMPs && cachedMPs.length > 0) {
    const cachedMP = cachedMPs[0];
    return cachedMP;
  }

  try {
    // Fetch from API
    const mpData = await fetchMPFromAPI(constituency);

    // Uncomment to log the fetched MP data
    // console.log("Fetched MP data from API: ", mpData);

    // First check if a record with this constituency already exists
    const { data: existingMPs } = await supabase
      .from("mps")
      .select("id")
      .eq("constituency", constituency);

    // Extract the fields we specifically store in columns
    const {
      person_id,
      constituency: mpConstituency,
      full_name,
      party,
      entered_house,
      title,
      given_name,
      family_name,
      office,
      ...extraInformation
    } = mpData;

    // Prepare the MP data for upsert
    const mpRecord = {
      person_id,
      constituency: mpConstituency,
      full_name,
      party,
      entered_house,
      title,
      given_name,
      family_name,
      office: office as unknown as Json,
      extra_information: extraInformation as unknown as Json,
      last_updated: new Date().toISOString(),
    };

    let error;
    let savedMP;

    // If a record exists, update it using its ID
    if (existingMPs && existingMPs.length > 0) {
      const { data: updatedMP, error: updateError } = await supabase
        .from("mps")
        .update(mpRecord)
        .eq("id", existingMPs[0].id)
        .select()
        .single();

      error = updateError;
      savedMP = updatedMP;
    } else {
      // Otherwise insert a new record
      const { data: newMP, error: insertError } = await supabase
        .from("mps")
        .insert(mpRecord)
        .select()
        .single();

      error = insertError;
      savedMP = newMP;
    }

    if (error) {
      console.error("Error caching MP data:", error);
    }

    return savedMP;
  } catch (error) {
    console.error("Error fetching MP data:", error);
    return null;
  }
}
