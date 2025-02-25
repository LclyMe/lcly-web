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

import { createAdminClient } from "@/lib/supabase/server";
import { Json } from "@/types/database.types";

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
 * Convert Json to MPOffice array safely
 */
function convertJsonToMPOffice(jsonData: Json | null): MPOffice[] {
  if (!jsonData) return [];

  try {
    // If it's already an array, try to convert it
    if (Array.isArray(jsonData)) {
      return jsonData.map((item) => {
        // Ensure item is an object
        if (typeof item !== "object" || item === null) {
          return {
            moffice_id: "",
            dept: "",
            position: "",
            from_date: "",
            to_date: "",
            person: "",
            source: "",
          };
        }

        // Now we can safely access properties
        const typedItem = item as Record<string, unknown>;
        return {
          moffice_id:
            typeof typedItem.moffice_id === "string"
              ? typedItem.moffice_id
              : "",
          dept: typeof typedItem.dept === "string" ? typedItem.dept : "",
          position:
            typeof typedItem.position === "string" ? typedItem.position : "",
          from_date:
            typeof typedItem.from_date === "string" ? typedItem.from_date : "",
          to_date:
            typeof typedItem.to_date === "string" ? typedItem.to_date : "",
          person: typeof typedItem.person === "string" ? typedItem.person : "",
          source: typeof typedItem.source === "string" ? typedItem.source : "",
        };
      });
    }

    return [];
  } catch (error) {
    console.error("Error converting JSON to MPOffice:", error);
    return [];
  }
}

/**
 * Get MP data from database or API, caching results in the database
 */
export async function getMP(constituency: string): Promise<MPData | null> {
  if (!constituency) return null;

  const supabase = createAdminClient();

  // Check if we have the MP data cached and it's not too old (less than 7 days old)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const { data: cachedMP, error: cachedMPError } = await supabase
    .from("mps")
    .select()
    .eq("constituency", constituency)
    .gt("last_updated", oneWeekAgo.toISOString())
    .single();

  if (cachedMPError) {
    console.log(
      "No cached MP data found or it's too old:",
      cachedMPError.message
    );
  }

  // If we have cached data that's recent enough, return it
  if (cachedMP) {
    return {
      member_id: cachedMP.person_id,
      house: "commons",
      constituency: cachedMP.constituency,
      party: cachedMP.party,
      entered_house: cachedMP.entered_house || "",
      left_house: "",
      entered_reason: "",
      left_reason: "",
      person_id: cachedMP.person_id,
      lastupdate: cachedMP.last_updated || new Date().toISOString(),
      title: cachedMP.title || "",
      given_name: cachedMP.given_name || "",
      family_name: cachedMP.family_name || "",
      full_name: cachedMP.full_name,
      url: "",
      image: "",
      image_height: 0,
      image_width: 0,
      office: convertJsonToMPOffice(cachedMP.office),
    };
  }

  try {
    // Fetch from API
    const mpData = await fetchMPFromAPI(constituency);

    // Cache the result
    const { data: newMP, error } = await supabase
      .from("mps")
      .upsert({
        person_id: mpData.person_id,
        constituency: mpData.constituency,
        full_name: mpData.full_name,
        party: mpData.party,
        entered_house: mpData.entered_house,
        title: mpData.title,
        given_name: mpData.given_name,
        family_name: mpData.family_name,
        office: mpData.office as unknown as Json,
        last_updated: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error caching MP data:", error);
    }

    return mpData;
  } catch (error) {
    console.error("Error fetching MP data:", error);
    return null;
  }
}

/**
 * Update the MP data for a constituency in the database
 */
export async function updateMPData(
  constituency: string
): Promise<MPData | null> {
  try {
    const mpData = await fetchMPFromAPI(constituency);
    const supabase = createAdminClient();

    // Update the database
    const { data: updatedMP, error } = await supabase
      .from("mps")
      .upsert({
        person_id: mpData.person_id,
        constituency: mpData.constituency,
        full_name: mpData.full_name,
        party: mpData.party,
        entered_house: mpData.entered_house,
        title: mpData.title,
        given_name: mpData.given_name,
        family_name: mpData.family_name,
        office: mpData.office as unknown as Json,
        last_updated: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error updating MP data:", error);
      return null;
    }

    return mpData;
  } catch (error) {
    console.error("Error fetching MP data for update:", error);
    return null;
  }
}
