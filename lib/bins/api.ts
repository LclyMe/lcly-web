import { createClient } from "@/lib/supabase/server";
import type { PremiseAddress, BinCollection, BinMessage } from "./types";

export async function fetchUserPreference(
  userId: string,
  formattedPostcode: string
) {
  const supabase = await createClient();

  const { data: preference, error } = await supabase
    .from("user_bin_preferences")
    .select("*")
    .eq("user_id", userId)
    .eq("postcode", formattedPostcode)
    .single();

  if (error) {
    console.error("Error fetching user preference:", error);
  }

  return preference;
}

export async function fetchAddresses(
  formattedPostcode: string
): Promise<PremiseAddress[]> {
  try {
    const response = await fetch(
      `https://bins.azurewebsites.net/api/getaddress?postcode=${encodeURIComponent(
        formattedPostcode
      )}`,
      {
        headers: {
          accept: "*/*",
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (err) {
    console.error("Error fetching addresses:", err);
    return [];
  }
}

export async function fetchCollections(
  premiseId: number,
  localAuthority: string
): Promise<BinCollection[]> {
  try {
    const response = await fetch(
      `https://bins.azurewebsites.net/api/getcollections?premiseid=${premiseId}&localauthority=${encodeURIComponent(
        localAuthority
      )}`,
      {
        headers: {
          accept: "*/*",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (err) {
    console.error("Error fetching collections:", err);
    return [];
  }
}

export async function fetchMessages(
  formattedPostcode: string
): Promise<BinMessage | null> {
  try {
    const response = await fetch(
      `https://bins.azurewebsites.net/api/checkformessages?postcode=${encodeURIComponent(
        formattedPostcode
      )}`,
      {
        headers: {
          accept: "*/*",
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.MessageContentHTML) {
        return data;
      }
    }
    return null;
  } catch (err) {
    console.error("Error fetching messages:", err);
    return null;
  }
}
